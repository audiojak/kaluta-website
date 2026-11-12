// GitHub calls this for issue events on audiojak/kaluta (the Kaluta
// Feedback App's webhook). When an issue that came from a report is closed,
// the sender is told and their mail is dropped from the mail service.

import { MissingSetting, settings } from "@/lib/feedback/config";
import { closed } from "@/lib/feedback/decide";
import { PrimitiveError } from "@/lib/feedback/primitive";
import { emailIdIn } from "@/lib/feedback/report";
import { verifyGithubSignature } from "@/lib/feedback/signature";

export const maxDuration = 60;

interface IssuesEvent {
  action?: string;
  issue?: { title?: string; body?: string | null; html_url?: string; user?: { type?: string } };
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  try {
    if (!verifyGithubSignature(rawBody, request.headers.get("x-hub-signature-256"), settings.githubWebhookSecret())) {
      return Response.json({ ok: false, error: "bad signature" }, { status: 401 });
    }
    if (request.headers.get("x-github-event") !== "issues") return Response.json({ ok: true, ignored: "not an issue event" });

    const event = JSON.parse(rawBody) as IssuesEvent;
    const issue = event.issue;
    // Only issues the App itself filed: anyone can type a marker into their own.
    const emailId = issue?.user?.type === "Bot" ? emailIdIn(issue.body) : null;
    if (event.action !== "closed" || !issue?.html_url || !emailId) {
      return Response.json({ ok: true, ignored: "not a closed report" });
    }
    await closed(emailId, issue.html_url, issue.title ?? "your report");
    return Response.json({ ok: true });
  } catch (error) {
    // The mail is already gone (told and dropped before): nothing left to do.
    if (error instanceof PrimitiveError && error.status === 404) return Response.json({ ok: true, ignored: "mail gone" });
    console.error("feedback github failed:", error instanceof Error ? error.message : "unknown error");
    return Response.json({ ok: false }, { status: error instanceof MissingSetting ? 503 : 500 });
  }
}
