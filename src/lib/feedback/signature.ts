// Signatures: Primitive's and GitHub's on their webhooks, and ours on
// review links.

import { createHmac, timingSafeEqual } from "node:crypto";

function hmacHex(secret: string, message: string | Buffer): string {
  return createHmac("sha256", secret).update(message).digest("hex");
}

function sameHex(a: string, b: string): boolean {
  if (!/^[0-9a-f]+$/i.test(a) || a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}

/**
 * `Primitive-Signature: t=<unix seconds>,v1=<hex>` over `<t>.<raw body>`,
 * HMAC-SHA256 with the account's webhook secret used as it is (it looks
 * like base64 and must not be decoded).
 */
export function verifyPrimitiveSignature(
  rawBody: string,
  header: string | null,
  secret: string,
  nowSeconds: number,
  toleranceSeconds: number,
): boolean {
  if (!header) return false;
  const parts = new Map(
    header.split(",").map((part) => {
      const at = part.indexOf("=");
      return [part.slice(0, at).trim(), part.slice(at + 1).trim()] as const;
    }),
  );
  const timestamp = parts.get("t");
  const signature = parts.get("v1");
  if (!timestamp || !signature || !/^\d+$/.test(timestamp)) return false;
  if (Math.abs(nowSeconds - Number(timestamp)) > toleranceSeconds) return false;
  return sameHex(signature, hmacHex(secret, `${timestamp}.${rawBody}`));
}

/** `X-Hub-Signature-256: sha256=<hex>` over the raw body. */
export function verifyGithubSignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header?.startsWith("sha256=")) return false;
  return sameHex(header.slice("sha256=".length), hmacHex(secret, rawBody));
}

/** What a review link carries: the Primitive email id and when it stops working. */
export interface ReviewToken {
  emailId: string;
  expires: number;
  signature: string;
}

function reviewMessage(emailId: string, expires: number): string {
  return `review.${emailId}.${expires}`;
}

export function signReview(emailId: string, expires: number, secret: string): ReviewToken {
  return { emailId, expires, signature: hmacHex(secret, reviewMessage(emailId, expires)) };
}

export function verifyReview(token: ReviewToken, secret: string, nowSeconds: number): boolean {
  if (!Number.isFinite(token.expires) || token.expires < nowSeconds) return false;
  return sameHex(token.signature, hmacHex(secret, reviewMessage(token.emailId, token.expires)));
}
