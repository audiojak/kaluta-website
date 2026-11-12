// Primitive calls this for every email that arrives at the account. A report
// sent from Kaluta (to bug@ or idea@support.kaluta.org) becomes a preview
// email to the reviewer, with a link to the review page. Nothing is stored
// here: Primitive keeps the mail.

import { screenshotIn } from "@/lib/feedback/archive";
import {
  MAX_SCREENSHOT_BYTES,
  MissingSetting,
  REVIEW_FROM,
  REVIEW_LINK_DAYS,
  SIGNATURE_TOLERANCE_SECONDS,
  settings,
} from "@/lib/feedback/config";
import { reasonToIgnore } from "@/lib/feedback/filter";
import { downloadAttachments, sendMail, type ReceivedEvent } from "@/lib/feedback/primitive";
import { kindFor, parseReport } from "@/lib/feedback/report";
import { signReview, verifyPrimitiveSignature } from "@/lib/feedback/signature";

export const maxDuration = 60;

/** Answered 2xx so Primitive does not retry mail we chose not to handle. */
function ignored(reason: string) {
  return Response.json({ ok: true, ignored: reason });
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const now = Math.floor(Date.now() / 1000);
  try {
    const signed = verifyPrimitiveSignature(
      rawBody,
      request.headers.get("primitive-signature"),
      settings.primitiveWebhookSecret(),
      now,
      SIGNATURE_TOLERANCE_SECONDS,
    );
    if (!signed) return Response.json({ ok: false, error: "bad signature" }, { status: 401 });

    const event = JSON.parse(rawBody) as ReceivedEvent;
    const reason = reasonToIgnore(event);
    if (reason) return ignored(reason);

    const email = event.email!;
    const emailId = email.id!;
    const kind = kindFor(email.smtp?.rcpt_to ?? [])!;
    const report = parseReport(kind, email.headers?.subject, email.parsed?.body_text);

    const archive = email.parsed?.attachments?.length ? await downloadAttachments(emailId) : null;
    const screenshot = archive ? screenshotIn(archive, MAX_SCREENSHOT_BYTES) : null;

    const token = signReview(emailId, now + REVIEW_LINK_DAYS * 24 * 60 * 60, settings.linkSecret());
    const link = new URL("/api/feedback/review", settings.baseUrl());
    link.searchParams.set("id", token.emailId);
    link.searchParams.set("exp", String(token.expires));
    link.searchParams.set("sig", token.signature);

    const lines = [
      `${kind === "bug" ? "Bug report" : "Feature request"} from ${email.headers?.from ?? email.smtp?.mail_from ?? "an unknown sender"}`,
      "",
      `Title: ${report.title}`,
      "",
      report.description || "(no description)",
      "",
      report.context ? `Context:\n${report.context}\n` : "",
      report.log ? `Log excerpt: ${report.log.split("\n").length} lines (shown on the review page)\n` : "",
      screenshot
        ? "The screenshot is attached. Check it for anything private before approving."
        : email.parsed?.attachments?.length
          ? "It had an attachment that is not a PNG or JPEG under 8 MB, so nothing will be published with it."
          : "No screenshot.",
      "",
      `Review, then approve or reject: ${link}`,
      "",
      "Nothing is public until you approve it.",
    ];

    await sendMail({
      from: REVIEW_FROM,
      to: settings.reviewer(),
      subject: `[Kaluta ${kind === "bug" ? "bug" : "idea"}] ${report.title}`,
      bodyText: lines.filter((line, index) => line !== "" || lines[index - 1] !== "").join("\n"),
      attachment: screenshot
        ? { filename: `screenshot.${screenshot.extension}`, contentType: screenshot.contentType, data: screenshot.data }
        : undefined,
      // A redelivered webhook sends the preview once.
      idempotencyKey: `feedback-review-${emailId}`,
    });
    return Response.json({ ok: true });
  } catch (error) {
    // Never the mail's content: only what went wrong.
    console.error("feedback inbound failed:", error instanceof Error ? error.message : "unknown error");
    const status = error instanceof MissingSetting ? 503 : 500;
    return Response.json({ ok: false }, { status });
  }
}
