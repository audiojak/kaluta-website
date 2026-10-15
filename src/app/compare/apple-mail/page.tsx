import type { Metadata } from "next";
import ComparisonPage, { type Comparison } from "@/components/Comparison";

export const metadata: Metadata = {
  title: "Kaluta vs Apple Mail",
  description:
    "How Kaluta compares with the Mail app on macOS: accounts, Apple Intelligence, agents, tasks, clean-up and privacy.",
};

const c: Comparison = {
  name: "Apple Mail",
  url: "https://support.apple.com/guide/mail/welcome/mac",
  tagline:
    "Both are native Mac mail clients that keep your mail on your machine. Apple Mail is built in, works with any account and has Apple Intelligence; Kaluta is Gmail-only, open source, and built to put your own AI agents to work.",
  intro:
    "Apple Mail is the client most Mac users already have: free, fast, any account type, and since macOS 26 with categories, priority messages, summaries and Smart Reply from Apple Intelligence, processed on the Mac or in Apple's Private Cloud Compute. Kaluta is narrower and goes further in one direction. It speaks only Gmail, but it lets Claude Code or Codex work on your mail through approved tools, turns email into tasks, learns how you write from your sent mail, runs routines that sort mail every hour, and can give an agent an address of its own.",
  checked: "8 October 2026",
  rows: [
    {
      feature: "What it is",
      openagc: { text: "An open-source Mac email client for Gmail, built for your AI agents" },
      other: { text: "The mail client built into macOS, iOS and iPadOS" },
    },
    {
      feature: "Runs on",
      openagc: { verdict: "partial", text: "macOS 26 or later, Apple Silicon" },
      other: { verdict: "yes", text: "Every Mac, iPhone and iPad; Apple Intelligence needs a recent model" },
    },
    {
      feature: "Mail accounts",
      openagc: { verdict: "partial", text: "Gmail; agent mailboxes" },
      other: { verdict: "yes", text: "iCloud, Gmail, Exchange, Outlook, Yahoo, AOL and any IMAP account" },
    },
    {
      feature: "Where your mail is processed",
      openagc: {
        verdict: "yes",
        text: "On your Mac only. Mail an agent reads goes to your own AI provider under your agreement with them",
      },
      other: {
        verdict: "yes",
        text: "On your Mac; Apple Intelligence runs on the device or in Private Cloud Compute, where Apple says your data is never stored",
      },
    },
    {
      feature: "Price",
      openagc: { verdict: "yes", text: "Free, MIT licence. You bring your own Claude Code or Codex subscription" },
      other: { verdict: "yes", text: "Free, included with macOS" },
    },
    {
      feature: "Source code",
      openagc: { verdict: "yes", text: "Open, on GitHub" },
      other: { verdict: "no", text: "Proprietary" },
    },
    {
      feature: "AI model",
      openagc: {
        verdict: "yes",
        text: "The agents you already use, Claude Code or Codex, under your own login; the app makes no model calls of its own",
      },
      other: { verdict: "yes", text: "Apple Intelligence, built in; not available on every Mac, language or region" },
    },
    {
      feature: "Summaries and priority",
      openagc: { verdict: "partial", text: "Ask the agent to summarise a thread; Gmail's Important marker" },
      other: { verdict: "yes", text: "A summary under each unread email, Summarize for long threads, Priority Messages at the top" },
    },
    {
      feature: "AI writing help",
      openagc: {
        verdict: "yes",
        text: "Writing help in the composer and agent drafts, following a writing guide learned from your sent mail; in workflows, up to three answers to pick or a draft from what you say",
      },
      other: { verdict: "yes", text: "Smart Reply and Writing Tools: proofread, rewrite, summarise" },
    },
    {
      feature: "Agents act on your mail",
      openagc: {
        verdict: "yes",
        text: "A local MCP server with tools for search, read, label, draft, task and routine work; sending, forwarding and deleting wait for your approval",
      },
      other: { verdict: "no", text: "Apple Intelligence suggests; nothing outside Mail can drive it" },
    },
    {
      feature: "Sorting",
      openagc: {
        verdict: "yes",
        text: "Gmail's categories, plus routines: an agent sorts automated mail into daily, weekly and monthly labels, locally or in Claude's cloud; Weekly reading brings each label back on the day it's due (preview)",
      },
      other: { verdict: "yes", text: "Categories (Primary, Transactions, Updates, Promotions), rules, Smart Mailboxes" },
    },
    {
      feature: "Tasks from email",
      openagc: {
        verdict: "yes",
        text: "Press t: Claude suggests the task, category and due day; a task list with the email behind each one",
      },
      other: { verdict: "partial", text: "Remind Me brings an email back later; no task list" },
    },
    {
      feature: "Daily workflows",
      openagc: {
        verdict: "yes",
        text: "Preview: seven workflows (Triage, Replies, Tasks, Waiting on others, Weekly reading, Agents, Teach Kaluta), one item at a time; Triage shows Kaluta's suggested action and its reason for each new conversation",
      },
      other: { verdict: "no", text: "None described in Mail's guide; Categories sort the inbox and suggested actions add a reminder or event" },
    },
    {
      feature: "Follow-ups on unanswered mail",
      openagc: {
        verdict: "yes",
        text: "Preview: Waiting on others finds sent mail that expects an answer, labels it Waiting, and after 3 days offers up to three follow-ups written ahead",
      },
      other: { verdict: "yes", text: "Follow Up Suggestions move a sent email with no response in 3 days back to the top of the inbox; you write the follow-up" },
    },
    {
      feature: "Learns how you write",
      openagc: {
        verdict: "yes",
        text: "A writing guide built from your sent mail with evidence you review, kept up to date from your edits; facts about you with use-freely, ask-first or never-share",
      },
      other: { verdict: "partial", text: "Writing Tools match tone on request; a style match is in beta on the newest macOS" },
    },
    {
      feature: "Bulk clean-up and unsubscribe",
      openagc: {
        verdict: "yes",
        text: "Clean Up: group by sender, list, time or size; archive thousands at once with one Undo; unsubscribe",
      },
      other: { verdict: "partial", text: "Unsubscribe banner on list mail, block senders; no grouping or bulk window" },
    },
    {
      feature: "An email address for your agent",
      openagc: { verdict: "yes", text: "Agent mailboxes on Primitive or AgentMail, each a full account" },
      other: { verdict: "no", text: "None" },
    },
    {
      feature: "Undo send, send later",
      openagc: { verdict: "partial", text: "Undo Send; no scheduled send yet" },
      other: { verdict: "yes", text: "Undo Send and Send Later" },
    },
    {
      feature: "Maturity",
      openagc: { verdict: "partial", text: "Pre-alpha; build from source; tested against a fake Gmail" },
      other: { verdict: "yes", text: "Shipping with every Mac" },
    },
  ],
  theirStrengths: [
    "Any account: iCloud, Exchange, Outlook, any IMAP server, in one app, with the same app on iPhone and iPad.",
    "Nothing to install or build; it is already on your Mac and fully supported.",
    "Apple Intelligence summaries, priority messages and Smart Reply with no AI subscription, processed on the device or in Private Cloud Compute.",
    "Send Later, Remind Me and years of polish.",
  ],
  ourStrengths: [
    "Your own agents, Claude Code or Codex, working on your mail through a small set of approved tools, with your approval before anything is sent. Apple Mail cannot be driven by an outside agent.",
    "Tasks from email, a writing guide learned from your sent mail with evidence you can see, and facts the agent may use.",
    "Routines that sort automated mail every hour, locally or in Claude's cloud, and a Clean Up window for the big tidy.",
    "Open source: you can read exactly what the agent is allowed to do.",
  ],
  choose: {
    them: "if you have accounts other than Gmail, want mail on your iPhone and iPad from the same app, or want summaries and smart replies without an AI subscription.",
    us: "if you use Gmail on a Mac, already pay for Claude Code or Codex, and want agents that can actually work your mail rather than only summarise it. Be ready to build it from source for now.",
  },
  sources: [
    { label: "Mail User Guide for Mac", url: "https://support.apple.com/guide/mail/welcome/mac" },
    { label: "Apple Intelligence (Apple)", url: "https://www.apple.com/apple-intelligence/" },
    { label: "Use Apple Intelligence in Mail on Mac (Mac User Guide)", url: "https://support.apple.com/guide/mac-help/mchlb2dbea8f/mac" },
    { label: "Mail User Guide: Mark emails to revisit later", url: "https://support.apple.com/guide/mail/mark-emails-to-revisit-later-mlhlp1052/mac" },
    { label: "Kaluta specification", url: "https://github.com/audiojak/kaluta/blob/main/docs/SPECIFICATION.md" },
  ],
};

export default function Page() {
  return <ComparisonPage c={c} />;
}
