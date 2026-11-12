// The report as Kaluta writes it into an email, and as it is published.
//
// The email (the app's side is ../kaluta, spec §17):
//   To       bug@support.kaluta.org or idea@support.kaluta.org
//   Subject  the title
//   Body     the description, then optional blocks:
//
//     --- Kaluta report ---
//     App: 0.1.0 (1)
//     macOS: 26.1
//     Account: gmail
//     --- end ---
//
//     --- Kaluta log ---
//     ...scrubbed lines...
//     --- end ---
//
//   One PNG or JPEG attachment: the screenshot.

import { BUG_ADDRESS, BUG_LABEL, FEATURE_LABEL, IDEA_ADDRESS } from "./config";

export type ReportKind = "bug" | "feature";

export interface Report {
  kind: ReportKind;
  title: string;
  description: string;
  /** The context block's lines, as written. */
  context: string;
  log: string;
}

/** Without case, display name or `+tag`. */
export function bareAddress(address: string): string {
  const angled = address.match(/<([^>]+)>/);
  const plain = (angled ? angled[1] : address).trim().toLowerCase();
  const at = plain.lastIndexOf("@");
  if (at < 0) return plain;
  return `${plain.slice(0, at).split("+")[0]}@${plain.slice(at + 1)}`;
}

/** Which kind of report mail to these recipients is; none if it is not for us. */
export function kindFor(recipients: readonly string[]): ReportKind | null {
  const bare = recipients.map(bareAddress);
  if (bare.includes(BUG_ADDRESS)) return "bug";
  if (bare.includes(IDEA_ADDRESS)) return "feature";
  return null;
}

export function labelFor(kind: ReportKind): string {
  return kind === "bug" ? BUG_LABEL : FEATURE_LABEL;
}

function takeBlock(text: string, name: string): { rest: string; block: string } {
  const pattern = new RegExp(`^--- ${name} ---[ \\t]*\\r?\\n([\\s\\S]*?)^--- end ---[ \\t]*$`, "m");
  const found = text.match(pattern);
  if (!found) return { rest: text, block: "" };
  return { rest: text.replace(found[0], ""), block: found[1].trim() };
}

export function parseReport(kind: ReportKind, subject: string | null | undefined, body: string | null | undefined): Report {
  const report = takeBlock((body ?? "").replace(/\r\n/g, "\n"), "Kaluta report");
  const log = takeBlock(report.rest, "Kaluta log");
  return {
    kind,
    title: (subject ?? "").replace(/\s+/g, " ").trim().slice(0, 200) || (kind === "bug" ? "Bug report" : "Feature request"),
    description: log.rest.trim(),
    context: report.block,
    log: log.block,
  };
}

const MARKER = /<!-- kaluta-feedback:([0-9a-f-]{8,64}) -->/i;

/** The Primitive email id a published issue came from. */
export function emailIdIn(issueBody: string | null | undefined): string | null {
  return issueBody?.match(MARKER)?.[1] ?? null;
}

/**
 * A reporter's words, safe to publish as Markdown: no mentions that would
 * notify people, no comments that could pass for our marker, no raw HTML.
 */
export function publishable(text: string): string {
  return text
    .replace(/<!--/g, "&lt;!--")
    .replace(/</g, "&lt;")
    .replace(/@(?=[A-Za-z0-9])/g, "@​");
}

function fenced(text: string): string {
  const longest = Math.max(2, ...Array.from(text.matchAll(/`+/g), (m) => m[0].length));
  const fence = "`".repeat(longest + 1);
  return `${fence}\n${text}\n${fence}`;
}

export function issueBody(report: Report, emailId: string, screenshotUrl: string | null): string {
  const parts = [publishable(report.description) || "_No description._"];
  if (screenshotUrl) parts.push(`![Screenshot](${screenshotUrl})`);
  if (report.context) parts.push(`<details><summary>Context</summary>\n\n${fenced(report.context)}\n\n</details>`);
  if (report.log) parts.push(`<details><summary>Log</summary>\n\n${fenced(report.log)}\n\n</details>`);
  parts.push(`_Sent from Kaluta's ${report.kind === "bug" ? "Report a Bug" : "Suggest a Feature"} window and reviewed before publishing._`);
  parts.push(`<!-- kaluta-feedback:${emailId} -->`);
  return parts.join("\n\n");
}
