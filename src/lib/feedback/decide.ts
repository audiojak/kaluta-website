// What the reviewer's Approve and Reject do, and what closing an issue does.

import { screenshotIn, type Screenshot } from "./archive";
import { BUG_ADDRESS, IDEA_ADDRESS, MAX_SCREENSHOT_BYTES } from "./config";
import { createIssue, type PublishedIssue } from "./github";
import { discardContent, downloadAttachments, getEmail, sendMail, type StoredEmail } from "./primitive";
import { issueBody, kindFor, labelFor, parseReport, type Report } from "./report";
import {
  claim,
  decisionFor,
  publishScreenshot,
  recordDecision,
  release,
  removeScreenshot,
  type Decision,
} from "./store";

export interface Loaded {
  email: StoredEmail;
  report: Report;
  screenshot: Screenshot | null;
}

/** A stored report, read back from Primitive; null when it is not one of ours or is gone. */
export async function load(emailId: string): Promise<Loaded | null> {
  const email = await getEmail(emailId);
  const kind = kindFor(email.to_email ? [email.to_email] : []);
  if (!kind || email.content_discarded_at) return null;
  const archive = await downloadAttachments(emailId);
  return {
    email,
    report: parseReport(kind, email.subject, email.body_text),
    screenshot: archive ? screenshotIn(archive, MAX_SCREENSHOT_BYTES) : null,
  };
}

export type Outcome =
  | { state: "published"; issue: PublishedIssue; senderTold: boolean }
  | { state: "rejected"; discarded: boolean }
  | { state: "already"; decision: Decision | "pending" }
  | { state: "gone" };

async function tell(email: StoredEmail, kind: Report["kind"], subject: string, text: string, key: string): Promise<boolean> {
  if (!email.from_email) return false;
  try {
    await sendMail({
      // From the address they wrote to, so their mail program threads it.
      from: `Kaluta <${kind === "bug" ? BUG_ADDRESS : IDEA_ADDRESS}>`,
      to: email.from_email,
      subject,
      bodyText: text,
      inReplyTo: email.message_id,
      idempotencyKey: key,
    });
    return true;
  } catch (error) {
    // The report is published either way; the page says the sender was not told.
    console.error("feedback reply failed:", error instanceof Error ? error.message : "unknown error");
    return false;
  }
}

export async function approve(emailId: string): Promise<Outcome> {
  if (!(await claim(emailId))) {
    return { state: "already", decision: (await decisionFor(emailId)) ?? "pending" };
  }
  let screenshotUrl: string | null = null;
  try {
    const loaded = await load(emailId);
    if (!loaded) {
      await release(emailId);
      return { state: "gone" };
    }
    const { email, report, screenshot } = loaded;
    if (screenshot) screenshotUrl = await publishScreenshot(emailId, screenshot);
    const issue = await createIssue(report.title, issueBody(report, emailId, screenshotUrl), labelFor(report.kind));
    await recordDecision(emailId, { state: "approved", issueNumber: issue.number, issueUrl: issue.url });
    const senderTold = await tell(
      email,
      report.kind,
      `Re: ${report.title}`,
      [
        `Thanks for the ${report.kind === "bug" ? "bug report" : "suggestion"}. It is now on Kaluta's issue tracker:`,
        "",
        issue.url,
        "",
        "Your email address is not shown there. You will get one more note from this address when the issue is closed.",
      ].join("\n"),
      `feedback-published-${emailId}`,
    );
    return { state: "published", issue, senderTold };
  } catch (error) {
    // Nothing was published: leave no screenshot behind and let the review be tried again.
    if (screenshotUrl) await removeScreenshot(screenshotUrl).catch(() => {});
    await release(emailId).catch(() => {});
    throw error;
  }
}

export async function reject(emailId: string): Promise<Outcome> {
  if (!(await claim(emailId))) {
    return { state: "already", decision: (await decisionFor(emailId)) ?? "pending" };
  }
  try {
    await recordDecision(emailId, { state: "rejected" });
    return { state: "rejected", discarded: await discardContent(emailId) };
  } catch (error) {
    await release(emailId).catch(() => {});
    throw error;
  }
}

/** A published issue was closed: tell the sender once, then drop their mail. */
export async function closed(emailId: string, issueUrl: string, issueTitle: string): Promise<void> {
  const email = await getEmail(emailId);
  const kind = kindFor(email.to_email ? [email.to_email] : []);
  if (!kind) return;
  await tell(
    email,
    kind,
    `Re: ${issueTitle}`,
    [`The issue for your ${kind === "bug" ? "bug report" : "suggestion"} has been closed:`, "", issueUrl].join("\n"),
    `feedback-closed-${emailId}`,
  );
  await discardContent(emailId);
}
