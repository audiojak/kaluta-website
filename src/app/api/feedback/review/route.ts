// The reviewer's page for one report. The link in the preview email opens
// it (GET), which only shows the report: approving or rejecting takes a
// button press (POST), so a mail scanner or link preview that fetches the
// link decides nothing.

import { MissingSetting, settings } from "@/lib/feedback/config";
import { approve, load, reject, type Outcome } from "@/lib/feedback/decide";
import { PrimitiveError } from "@/lib/feedback/primitive";
import { issueBody } from "@/lib/feedback/report";
import { verifyReview, type ReviewToken } from "@/lib/feedback/signature";
import { decisionFor, type Decision } from "@/lib/feedback/store";

export const maxDuration = 60;

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function page(title: string, body: string, status = 200): Response {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>${escapeHtml(title)}</title>
<style>
body{font:16px/1.5 system-ui,sans-serif;max-width:46rem;margin:2rem auto;padding:0 1rem;color:#1c1c1c;background:#fff}
h1{font-size:1.3rem}pre{white-space:pre-wrap;background:#f4f4f2;padding:.8rem;border-radius:6px;overflow-wrap:anywhere}
img{max-width:100%;border:1px solid #ccc}button{font:inherit;padding:.5rem 1rem;margin-right:.6rem;border-radius:6px;border:1px solid #888;background:#fff;cursor:pointer}
button.go{background:#1c1c1c;color:#fff;border-color:#1c1c1c}.note{color:#555}
</style></head><body>${body}</body></html>`;
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex",
      "Content-Security-Policy": "default-src 'none'; img-src data:; style-src 'unsafe-inline'; form-action 'self'",
    },
  });
}

function tokenFrom(values: { get(name: string): unknown }): ReviewToken {
  const text = (name: string) => (typeof values.get(name) === "string" ? (values.get(name) as string) : "");
  return { emailId: text("id"), expires: Number(text("exp")), signature: text("sig") };
}

function valid(token: ReviewToken): boolean {
  return /^[0-9a-f-]{8,64}$/i.test(token.emailId) && verifyReview(token, settings.linkSecret(), Math.floor(Date.now() / 1000));
}

const badLink = () =>
  page("Link not valid", "<h1>This review link is not valid</h1><p>It may have expired or been cut short. Open it again from the preview email.</p>", 403);

function decided(decision: Decision | "pending"): string {
  if (decision === "pending") return "<p>This report is being published, or publishing it failed part-way. Wait a minute and reload.</p>";
  if (decision.state === "rejected") return "<p>This report was rejected. Nothing was published.</p>";
  return `<p>This report was approved and published as <a href="${escapeHtml(decision.issueUrl)}">issue #${decision.issueNumber}</a>.</p>`;
}

function failed(error: unknown): Response {
  console.error("feedback review failed:", error instanceof Error ? error.message : "unknown error");
  if (error instanceof MissingSetting) return page("Not set up", "<h1>The feedback handler is not set up</h1>", 503);
  if (error instanceof PrimitiveError && error.status === 404) {
    return page("Report not found", "<h1>This report is no longer stored</h1><p>Nothing was published.</p>", 404);
  }
  return page("Something went wrong", "<h1>Something went wrong</h1><p>Nothing was published. Reload to try again.</p>", 500);
}

export async function GET(request: Request) {
  try {
    const token = tokenFrom(new URL(request.url).searchParams);
    if (!valid(token)) return badLink();

    const decision = await decisionFor(token.emailId);
    if (decision) return page("Already reviewed", `<h1>Already reviewed</h1>${decided(decision)}`);

    const loaded = await load(token.emailId);
    if (!loaded) return page("Report not found", "<h1>This report is no longer stored</h1><p>Nothing was published.</p>", 404);
    const { email, report, screenshot } = loaded;

    const hidden = `<input type="hidden" name="id" value="${escapeHtml(token.emailId)}"><input type="hidden" name="exp" value="${token.expires}"><input type="hidden" name="sig" value="${escapeHtml(token.signature)}">`;
    const image = screenshot
      ? `<h2>Screenshot</h2><p class="note">This will be public. Look for mail, names and addresses.</p><img alt="The reporter's screenshot" src="data:${screenshot.contentType};base64,${screenshot.data.toString("base64")}">`
      : `<p class="note">No screenshot will be published.</p>`;
    return page(
      `Review: ${report.title}`,
      `<h1>${report.kind === "bug" ? "Bug report" : "Feature request"}: ${escapeHtml(report.title)}</h1>
<p class="note">From ${escapeHtml(email.from_email ?? "an unknown sender")}. The address is not published.</p>
<h2>What the issue will say</h2><pre>${escapeHtml(issueBody(report, token.emailId, screenshot ? "(the screenshot below)" : null))}</pre>
${image}
<form method="post" style="margin:1.5rem 0">${hidden}
<button class="go" name="action" value="approve">Approve and publish</button>
<button name="action" value="reject">Reject</button></form>
<p class="note">Approving creates a public issue on audiojak/kaluta and emails the sender its link. Rejecting publishes nothing and tells the sender nothing.</p>`,
    );
  } catch (error) {
    return failed(error);
  }
}

function outcomePage(outcome: Outcome): Response {
  switch (outcome.state) {
    case "published":
      return page(
        "Published",
        `<h1>Published</h1><p>It is now <a href="${escapeHtml(outcome.issue.url)}">issue #${outcome.issue.number}</a>.</p><p>${
          outcome.senderTold ? "The sender has been emailed the link." : "The sender could not be emailed the link."
        }</p>`,
      );
    case "rejected":
      return page(
        "Rejected",
        `<h1>Rejected</h1><p>Nothing was published.</p><p>${
          outcome.discarded
            ? "The report's text and screenshot have been deleted from the mail service."
            : "The report is still stored at the mail service: discarding is not turned on there (Settings › Webhooks)."
        }</p>`,
      );
    case "already":
      return page("Already reviewed", `<h1>Already reviewed</h1>${decided(outcome.decision)}`);
    case "gone":
      return page("Report not found", "<h1>This report is no longer stored</h1><p>Nothing was published.</p>", 404);
  }
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const token = tokenFrom(form);
    if (!valid(token)) return badLink();
    const action = form.get("action");
    if (action === "approve") return outcomePage(await approve(token.emailId));
    if (action === "reject") return outcomePage(await reject(token.emailId));
    return page("Unknown action", "<h1>Unknown action</h1>", 400);
  } catch (error) {
    return failed(error);
  }
}
