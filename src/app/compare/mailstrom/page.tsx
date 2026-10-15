import type { Metadata } from "next";
import ComparisonPage, { type Comparison } from "@/components/Comparison";

export const metadata: Metadata = {
  title: "Kaluta vs Mailstrom",
  description:
    "How Kaluta's Clean Up compares with Mailstrom for clearing a crowded inbox: grouping, unsubscribe, undo, privacy and price.",
};

const c: Comparison = {
  name: "Mailstrom",
  url: "https://mailstrom.co",
  tagline:
    "Both clear a crowded inbox by the thousand. Mailstrom is a paid web service that does it for any IMAP mailbox; Kaluta does it inside a free, open-source Mac mail client that also reads, writes and runs your AI agents.",
  intro:
    "Mailstrom is a bulk clean-up tool: it connects to your mailbox over IMAP, groups mail by sender, subject, date, size and list, and lets you delete, archive, move, unsubscribe or block in one go, with standing rules to keep the inbox clear. Kaluta's Clean Up window does the same grouping and bulk actions, but it is one part of a full email client. The rest of Kaluta (tasks, agents, a writing guide, routines) has no counterpart in Mailstrom, and Mailstrom's Block, Chill and Expire have no exact counterpart in Kaluta yet.",
  checked: "8 October 2026",
  rows: [
    {
      feature: "What it is",
      openagc: { text: "A native macOS email client with a Clean Up window for bulk tidying" },
      other: { text: "A web-based bulk clean-up service; not for day-to-day reading and writing" },
    },
    {
      feature: "Runs on",
      openagc: { text: "macOS 26 or later, Apple Silicon" },
      other: { text: "Any browser; Chuck Pro iOS app included for subscribers" },
    },
    {
      feature: "Mail accounts",
      openagc: { text: "Gmail (IMAP used for faster syncing); agent mailboxes" },
      other: { text: "Any IMAP provider: Gmail, Outlook, Yahoo, AOL, iCloud and more" },
    },
    {
      feature: "Where your mail is processed",
      openagc: {
        verdict: "yes",
        text: "On your Mac only. No Kaluta server exists; the project has no accounts and no telemetry",
      },
      other: {
        verdict: "partial",
        text: "On Mailstrom's servers over IMAP; it says it stores subject lines and metadata there",
      },
    },
    {
      feature: "Price",
      openagc: { verdict: "yes", text: "Free. MIT licence" },
      other: {
        text: "$9, $14 or $29.95 a month ($59.95, $99.95 or $199.95 a year) by accounts and inbox size; free trial acts on 25% of 5,000 messages",
      },
    },
    {
      feature: "Source code",
      openagc: { verdict: "yes", text: "Open, on GitHub" },
      other: { verdict: "no", text: "Proprietary" },
    },
    {
      feature: "Group mail by sender, subject, time, size, list",
      openagc: {
        verdict: "yes",
        text: "Sender, people you've written to, subject, mailing list, time, size, Gmail's Social and Promotions",
      },
      other: { verdict: "yes", text: "Sender, subject, date, size, mailing list, social, and combinations" },
    },
    {
      feature: "Bulk archive, move, trash, spam",
      openagc: { verdict: "yes", text: "Thousands at once; per message, so people's replies in a mixed thread stay" },
      other: { verdict: "yes", text: "Delete, archive or move in bulk" },
    },
    {
      feature: "Undo",
      openagc: { verdict: "yes", text: "One Undo reverses a whole action" },
      other: { verdict: "yes", text: "Every action has Undo; nothing is permanent" },
    },
    {
      feature: "Unsubscribe",
      openagc: {
        verdict: "yes",
        text: "One request to the list's own site, or a filled-in message for you to send, after a confirmation",
      },
      other: { verdict: "yes", text: "Sends an unsubscribe email, or opens the list's web page" },
    },
    {
      feature: "Block a sender; snooze or expire mail",
      openagc: { verdict: "no", text: "Not yet (snooze is not in the app either)" },
      other: { verdict: "yes", text: "Block, Chill and Expire, plus rules for future mail (subscribers)" },
    },
    {
      feature: "Scheduled sorting of automated mail",
      openagc: {
        verdict: "yes",
        text: "Routines: an agent sorts alerts, newsletters and receipts into daily, weekly and monthly labels, locally or in Claude's cloud; Weekly reading brings each label back on the day it's due (preview)",
      },
      other: { verdict: "partial", text: "Rules move future mail matching a sender or subject" },
    },
    {
      feature: "Daily workflows",
      openagc: {
        verdict: "yes",
        text: "Preview: seven workflows (Triage, Replies, Tasks, Waiting on others, Weekly reading, Agents, Teach Kaluta), one item at a time; Triage shows Kaluta's suggested action and its reason for each new conversation",
      },
      other: { verdict: "partial", text: "Bundles group related mail so you can act on many messages at once; no AI suggestions" },
    },
    {
      feature: "Follow-ups on unanswered mail",
      openagc: {
        verdict: "yes",
        text: "Preview: Waiting on others finds sent mail that expects an answer, labels it Waiting, and after 3 days offers up to three follow-ups written ahead",
      },
      other: { verdict: "no", text: "None described; Chill brings mail back on a date you pick, whether or not anyone replied (subscribers)" },
    },
    {
      feature: "Progress tracking",
      openagc: { verdict: "yes", text: "Inbox Zero card: percentage, today's numbers, a month's trend" },
      other: { verdict: "yes", text: "Inbox Zero stats, daily or weekly email reports" },
    },
    {
      feature: "AI and agents",
      openagc: {
        verdict: "yes",
        text: "Claude Code or Codex work on your mail through approved tools; tasks from email; drafts in your voice",
      },
      other: { verdict: "no", text: "None" },
    },
    {
      feature: "Maturity",
      openagc: { verdict: "partial", text: "Pre-alpha; build from source; tested against a fake Gmail" },
      other: { verdict: "yes", text: "Shipping for years" },
    },
  ],
  theirStrengths: [
    "Works with any IMAP mailbox and from any browser; Kaluta is Gmail on a Mac.",
    "Block, Chill and Expire: standing actions that keep a sender or subject out of the inbox, or bring mail back later.",
    "A mature, supported product with a free trial you can start in a minute. Kaluta has no release yet.",
    "Scans an inbox without downloading it to your machine.",
  ],
  ourStrengths: [
    "Your mail never leaves your Mac. Mailstrom reads it over IMAP from its servers and keeps metadata there.",
    "Free and open source, with no account and no subscription.",
    "Clean Up lives inside your mail client, so the tidy-up and the daily reading are one app, one undo stack.",
    "The rest of Kaluta: turn email into tasks, let your own AI agent work them, write in your voice, and run routines that sort mail every hour.",
  ],
  choose: {
    them: "if you need a quick, one-off clean of a non-Gmail mailbox, want it on Windows or in a browser, or rely on Block, Chill and Expire.",
    us: "if you use Gmail on a Mac, want your mail to stay on your machine, and want the clean-up as part of an email client that also works with your AI agents. Be ready to build it from source for now.",
  },
  sources: [
    { label: "Mailstrom home page", url: "https://mailstrom.co/" },
    { label: "Mailstrom pricing", url: "https://mailstrom.co/pricing" },
    { label: "Mailstrom FAQ (IMAP, data stored, Block, Chill, Expire, trial)", url: "https://mailstrom.co/faq" },
    { label: "Mailstrom privacy policy", url: "https://mailstrom.co/privacy" },
    { label: "Kaluta specification (Clean Up, §14.12)", url: "https://github.com/audiojak/kaluta/blob/main/docs/SPECIFICATION.md" },
  ],
};

export default function Page() {
  return <ComparisonPage c={c} />;
}
