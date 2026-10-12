import type { Metadata } from "next";
import ComparisonPage, { type Comparison } from "@/components/Comparison";

export const metadata: Metadata = {
  title: "Kaluta with Gmail",
  description:
    "Kaluta is a Gmail client, not a Gmail replacement. How it fits alongside Gmail on the web and your phone, and where each one is stronger.",
};

const c: Comparison = {
  name: "Gmail",
  url: "https://mail.google.com",
  tagline:
    "We love Gmail. Kaluta is built on it: a native Mac client for your Gmail account, to use alongside Gmail on the web and on your phone, not instead of them.",
  intro:
    "Everything Kaluta does happens in your Gmail account. Labels, archive, stars, read state, drafts and the Task label all sync both ways, so what you do on your Mac shows up in the Gmail app on your phone a moment later, and the other way round. Kaluta adds the parts Gmail does not have: your own AI agents working through approved tools, tasks from email, a writing guide learned from your sent mail, routines, Clean Up and mailboxes for your agents. Gmail keeps the parts it does best: being everywhere, search across everything, spam filtering, and Gemini for anyone who wants it.",
  checked: "8 October 2026",
  rows: [
    {
      feature: "What it is",
      openagc: { text: "A native macOS client for your Gmail account, built for your AI agents" },
      other: { text: "Google's email service, with web, Android and iOS apps" },
    },
    {
      feature: "Runs on",
      openagc: { verdict: "partial", text: "macOS 26 or later, Apple Silicon" },
      other: { verdict: "yes", text: "Any browser, Android, iOS" },
    },
    {
      feature: "Your mail and changes",
      openagc: {
        verdict: "yes",
        text: "The same account: every archive, label, star and draft syncs back to Gmail through its API",
      },
      other: { verdict: "yes", text: "The source of truth; everything Kaluta does shows here" },
    },
    {
      feature: "Where your mail is processed",
      openagc: {
        verdict: "yes",
        text: "Downloaded from Google to your Mac and kept there; no Kaluta server. Mail an agent reads goes to your own AI provider",
      },
      other: { verdict: "partial", text: "On Google's servers, under Google's terms" },
    },
    {
      feature: "Price",
      openagc: { verdict: "yes", text: "Free, MIT licence. You bring your own Claude Code or Codex subscription" },
      other: {
        verdict: "yes",
        text: "Free with 15 GB; Workspace plans for business; Gemini's inbox questions and Proofread need Google AI Pro ($19.99 a month) or Ultra",
      },
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
      other: { verdict: "yes", text: "Gemini, built in and opt-in" },
    },
    {
      feature: "AI writing help",
      openagc: {
        verdict: "yes",
        text: "Writing help in the composer and agent drafts, following a writing guide learned from your sent mail; in workflows, up to three answers to pick or a draft from what you say",
      },
      other: { verdict: "yes", text: "Help me write and Suggested Replies, free; Proofread with AI Pro" },
    },
    {
      feature: "Ask questions about your inbox",
      openagc: { verdict: "yes", text: "Ask Claude or Codex in the agent column; the list on screen is the context" },
      other: { verdict: "partial", text: "Gemini's inbox questions and AI Overviews, with AI Pro or Ultra, US English first" },
    },
    {
      feature: "Agents act on your mail",
      openagc: {
        verdict: "yes",
        text: "A local MCP server with tools for search, read, label, draft, task and routine work; sending, forwarding and deleting wait for your approval",
      },
      other: { verdict: "partial", text: "Gemini can propose organising; it does not change mail until you confirm" },
    },
    {
      feature: "Sorting",
      openagc: {
        verdict: "yes",
        text: "Gmail's categories, plus routines: an agent sorts automated mail into daily, weekly and monthly labels, locally or in Claude's cloud",
      },
      other: { verdict: "yes", text: "Categories, filters, Important, Priority Inbox" },
    },
    {
      feature: "Tasks from email",
      openagc: {
        verdict: "yes",
        text: "Press t: Claude suggests the task, category and due day; a task list on your Mac, with a Task label in Gmail so it shows on your phone",
      },
      other: { verdict: "partial", text: "Add to Google Tasks by hand; snooze and nudges" },
    },
    {
      feature: "Daily workflows",
      openagc: {
        verdict: "yes",
        text: "Preview: Triage, Replies, Tasks and Waiting on others, one item at a time; Triage shows Kaluta's suggested action and its reason for each new conversation",
      },
      other: { verdict: "partial", text: "AI Inbox (beta; US, English, with Google AI Plus, Pro or Ultra or Workspace Enterprise Plus) lists suggested to-dos with Reply or View; category tabs" },
    },
    {
      feature: "Follow-ups on unanswered mail",
      openagc: {
        verdict: "yes",
        text: "Preview: Waiting on others finds sent mail that expects an answer, labels it Waiting, and after 3 days offers up to three follow-ups written ahead",
      },
      other: { verdict: "yes", text: "Nudges show sent mail that may need a follow-up at the top of the inbox; you write the follow-up" },
    },
    {
      feature: "Learns how you write",
      openagc: {
        verdict: "yes",
        text: "A writing guide built from your sent mail with evidence you review, kept up to date from your edits; facts about you with use-freely, ask-first or never-share",
      },
      other: { verdict: "partial", text: "Suggested Replies match your style; nothing you can read or edit" },
    },
    {
      feature: "Bulk clean-up and unsubscribe",
      openagc: {
        verdict: "yes",
        text: "Clean Up: group by sender, list, time or size; archive thousands at once with one Undo; unsubscribe",
      },
      other: { verdict: "partial", text: "Select-all by search and unsubscribe links; no grouping by sender or size" },
    },
    {
      feature: "An email address for your agent",
      openagc: { verdict: "yes", text: "Agent mailboxes on Primitive or AgentMail, each a full account" },
      other: { verdict: "no", text: "A second Gmail account would be a person's account under Google's terms" },
    },
    {
      feature: "Search",
      openagc: { verdict: "partial", text: "Local full-text search of what is downloaded; Gmail's search for the rest" },
      other: { verdict: "yes", text: "Across everything, with Gmail's operators" },
    },
    {
      feature: "Spam and phishing protection",
      openagc: { verdict: "partial", text: "Gmail's, inherited; the app also treats mail as untrusted input for agents" },
      other: { verdict: "yes", text: "Google's filtering" },
    },
    {
      feature: "Maturity",
      openagc: { verdict: "partial", text: "Pre-alpha; build from source; tested against a fake Gmail" },
      other: { verdict: "yes", text: "Since 2004" },
    },
  ],
  theirStrengths: [
    "It is everywhere: any browser, Android and iOS, with nothing to build or install. Kaluta is a Mac app.",
    "Search across your whole mailbox, spam filtering and the account itself. Kaluta relies on all three.",
    "Gemini for anyone, with the writing help free and no separate AI subscription.",
    "Finished and supported. Kaluta is pre-alpha.",
  ],
  ourStrengths: [
    "Your own agents, Claude Code or Codex, working on your mail through a small set of approved tools, with your approval before anything is sent.",
    "Tasks from email, a writing guide learned from your sent mail with evidence you can see, and facts the agent may use.",
    "Routines that sort automated mail every hour, locally or in Claude's cloud, and a Clean Up window for the big tidy.",
    "Open source and local-first: your mail is kept on your Mac, and there is no server, account or telemetry in between you and Google.",
  ],
  titleJoin: "with",
  verdictTitle: "Use both",
  chooseLabels: { them: "Keep Gmail for", us: "Open Kaluta for" },
  choose: {
    them: "your phone, the browser, search across everything, and the account itself. Nothing about Kaluta asks you to give it up.",
    us: "working through mail on your Mac with your AI agents: tasks, drafts in your voice, routines and clean-up, all synced straight back to Gmail. Be ready to build it from source for now.",
  },
  sources: [
    { label: "Gemini in Gmail (Google support)", url: "https://support.google.com/mail/answer/14199860" },
    { label: "Google AI plans and pricing", url: "https://one.google.com/about/google-ai-plans/" },
    { label: "How to use Gemini in Gmail (Google blog)", url: "https://blog.google/products/gmail/how-to-use-gemini-gmail-app/" },
    { label: "Gmail Help: AI Inbox", url: "https://support.google.com/mail/answer/16845247" },
    { label: "Gmail Help: Reply to messages (nudges)", url: "https://support.google.com/mail/answer/6585" },
    { label: "Kaluta specification (Gmail integration, §7)", url: "https://github.com/audiojak/kaluta/blob/main/docs/SPECIFICATION.md" },
  ],
};

export default function Page() {
  return <ComparisonPage c={c} />;
}
