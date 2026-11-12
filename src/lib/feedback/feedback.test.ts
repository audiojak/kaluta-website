import { createHmac, createVerify, generateKeyPairSync } from "node:crypto";
import { gzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import { imageType, screenshotIn, untar } from "./archive";
import { reasonToIgnore } from "./filter";
import { appJwt } from "./github";
import type { ReceivedEvent } from "./primitive";
import { bareAddress, emailIdIn, issueBody, kindFor, parseReport, publishable } from "./report";
import { signReview, verifyGithubSignature, verifyPrimitiveSignature, verifyReview } from "./signature";

const PNG = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(40, 7)]);
const JPEG = Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(40, 9)]);

function tarEntry(name: string, data: Buffer): Buffer {
  const header = Buffer.alloc(512);
  header.write(name, 0, 100, "utf8");
  header.write("0000644\0", 100);
  header.write(data.length.toString(8).padStart(11, "0") + "\0", 124);
  header.write("0", 156);
  header.write("ustar\0", 257);
  const padded = Buffer.alloc(Math.ceil(data.length / 512) * 512);
  data.copy(padded);
  return Buffer.concat([header, padded]);
}

function archive(...entries: [string, Buffer][]): Buffer {
  return gzipSync(Buffer.concat([...entries.map(([name, data]) => tarEntry(name, data)), Buffer.alloc(1024)]));
}

describe("Primitive's signature", () => {
  const secret = "XNHBBW8VqoBjRfNs1tkZj11jTk";
  const body = '{"event":"email.received"}';
  const sign = (t: number, b = body) => `t=${t},v1=${createHmac("sha256", secret).update(`${t}.${b}`).digest("hex")}`;

  it("accepts a fresh signature over the raw body", () => {
    expect(verifyPrimitiveSignature(body, sign(1000), secret, 1010, 300)).toBe(true);
  });
  it("refuses a changed body, a wrong secret, an old timestamp and a missing header", () => {
    expect(verifyPrimitiveSignature(body + " ", sign(1000), secret, 1010, 300)).toBe(false);
    expect(verifyPrimitiveSignature(body, sign(1000), "other", 1010, 300)).toBe(false);
    expect(verifyPrimitiveSignature(body, sign(1000), secret, 2000, 300)).toBe(false);
    expect(verifyPrimitiveSignature(body, null, secret, 1010, 300)).toBe(false);
    expect(verifyPrimitiveSignature(body, "t=1000,v1=zz", secret, 1010, 300)).toBe(false);
  });
});

describe("GitHub's signature", () => {
  it("accepts sha256 over the raw body and nothing else", () => {
    const header = `sha256=${createHmac("sha256", "s").update("{}").digest("hex")}`;
    expect(verifyGithubSignature("{}", header, "s")).toBe(true);
    expect(verifyGithubSignature("{ }", header, "s")).toBe(false);
    expect(verifyGithubSignature("{}", header.replace("sha256=", "sha1="), "s")).toBe(false);
    expect(verifyGithubSignature("{}", null, "s")).toBe(false);
  });
});

describe("a review link", () => {
  it("works until it expires, for its own report only", () => {
    const token = signReview("0a1b2c3d-0000", 5000, "link-secret");
    expect(verifyReview(token, "link-secret", 4999)).toBe(true);
    expect(verifyReview(token, "link-secret", 5001)).toBe(false);
    expect(verifyReview({ ...token, emailId: "ffffffff-0000" }, "link-secret", 4999)).toBe(false);
    expect(verifyReview({ ...token, expires: 9000 }, "link-secret", 4999)).toBe(false);
    expect(verifyReview(token, "other", 4999)).toBe(false);
  });
});

describe("the report format", () => {
  it("knows which address is which, whatever its case, name or tag", () => {
    expect(bareAddress("Kaluta <Bug+x@Support.Kaluta.org>")).toBe("bug@support.kaluta.org");
    expect(kindFor(["someone@example.com", "BUG@support.kaluta.org"])).toBe("bug");
    expect(kindFor(["idea+later@support.kaluta.org"])).toBe("feature");
    expect(kindFor(["feedback@support.kaluta.org"])).toBeNull();
  });

  it("splits the description from the context and log blocks", () => {
    const body = [
      "The list jumps when I archive.",
      "",
      "--- Kaluta report ---",
      "App: 0.1.0 (1)",
      "macOS: 26.1",
      "--- end ---",
      "",
      "--- Kaluta log ---",
      "sync: paused",
      "--- end ---",
      "",
    ].join("\r\n");
    const report = parseReport("bug", "  Archive   jumps ", body);
    expect(report.title).toBe("Archive jumps");
    expect(report.description).toBe("The list jumps when I archive.");
    expect(report.context).toBe("App: 0.1.0 (1)\nmacOS: 26.1");
    expect(report.log).toBe("sync: paused");
  });

  it("takes a plain email with no blocks, and names an untitled one", () => {
    const report = parseReport("feature", "", "Snooze until Monday, please.");
    expect(report.title).toBe("Feature request");
    expect(report.description).toBe("Snooze until Monday, please.");
    expect(report.context).toBe("");
  });

  it("publishes no mentions, HTML or forged markers from the reporter's words", () => {
    const text = publishable("ping @octocat <img src=x> <!-- kaluta-feedback:abcd1234 -->");
    expect(text).not.toContain("@octocat");
    expect(text).not.toContain("<img");
    expect(emailIdIn(text)).toBeNull();
  });

  it("writes an issue that carries its email id and never an address", () => {
    const report = parseReport("bug", "Crash", "It crashed.\n\n--- Kaluta report ---\nApp: 0.1.0\n--- end ---\n");
    const body = issueBody(report, "0a1b2c3d-4e5f-6789-abcd-ef0123456789", "https://example.test/s.png");
    expect(emailIdIn(body)).toBe("0a1b2c3d-4e5f-6789-abcd-ef0123456789");
    expect(body).toContain("![Screenshot](https://example.test/s.png)");
    expect(body).toContain("App: 0.1.0");
    expect(emailIdIn("no marker here")).toBeNull();
  });
});

describe("the attachments archive", () => {
  it("lists a tar's files", () => {
    const files = untar(Buffer.concat([tarEntry("a.txt", Buffer.from("hello")), tarEntry("b.bin", PNG), Buffer.alloc(1024)]));
    expect(files.map((file) => file.name)).toEqual(["a.txt", "b.bin"]);
    expect(files[0].data.toString()).toBe("hello");
  });

  it("goes by a file's bytes, not its name", () => {
    expect(imageType(PNG)?.extension).toBe("png");
    expect(imageType(JPEG)?.contentType).toBe("image/jpeg");
    expect(imageType(Buffer.from("<svg onload=alert(1)>"))).toBeNull();
  });

  it("finds the first real image and skips impostors and oversized files", () => {
    const found = screenshotIn(archive(["notes.png", Buffer.from("not an image")], ["shot.dat", JPEG]), 1024);
    expect(found?.extension).toBe("jpg");
    expect(screenshotIn(archive(["big.png", PNG]), 10)).toBeNull();
    expect(screenshotIn(Buffer.from("not gzip"), 1024)).toBeNull();
  });
});

describe("which mail is a report", () => {
  const good: ReceivedEvent = {
    event: "email.received",
    email: {
      id: "0a1b2c3d",
      smtp: { rcpt_to: ["bug@support.kaluta.org"] },
      analysis: { sender: { authenticated: true }, spamassassin: { score: 0.4 } },
    },
  };
  const withEmail = (change: Partial<NonNullable<ReceivedEvent["email"]>>): ReceivedEvent => ({
    ...good,
    email: { ...good.email, ...change },
  });

  it("takes authenticated mail to bug@ or idea@", () => {
    expect(reasonToIgnore(good)).toBeNull();
  });
  it("ignores other events, other addresses, automatic mail, unauthenticated senders and spam", () => {
    expect(reasonToIgnore({ ...good, event: "email.bounced" })).not.toBeNull();
    expect(reasonToIgnore(withEmail({ smtp: { rcpt_to: ["feedback@support.kaluta.org"] } }))).not.toBeNull();
    expect(reasonToIgnore(withEmail({ automated: true }))).not.toBeNull();
    expect(reasonToIgnore(withEmail({ analysis: { sender: { authenticated: false } } }))).not.toBeNull();
    expect(reasonToIgnore(withEmail({ analysis: { sender: { authenticated: true }, spamassassin: { score: 9 } } }))).not.toBeNull();
  });
});

describe("the App's token", () => {
  it("is an RS256 JWT for the App id that its public key verifies", () => {
    const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
    const jwt = appJwt("5721593", privateKey.export({ type: "pkcs1", format: "pem" }).toString(), 10_000);
    const [head, claims, signature] = jwt.split(".");
    expect(JSON.parse(Buffer.from(claims, "base64url").toString())).toEqual({ iat: 9970, exp: 10_300, iss: "5721593" });
    expect(createVerify("RSA-SHA256").update(`${head}.${claims}`).verify(publicKey, Buffer.from(signature, "base64url"))).toBe(true);
  });
});
