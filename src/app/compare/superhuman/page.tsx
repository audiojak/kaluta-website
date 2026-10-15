import type { Metadata } from "next";
import ComparisonPage, { type Comparison } from "@/components/Comparison";

export const metadata: Metadata = {
  title: "Kaluta vs Superhuman",
  description:
    "How Kaluta compares with Superhuman Mail: AI features, agents and MCP, where your mail is processed, platforms and price.",
};

const c: Comparison = {
  name: "Superhuman",
  url: "https://superhuman.com/mail",
  tagline:
    "Both are AI email clients. Superhuman Mail is a polished, hosted, subscription product for Gmail and Outlook on every platform; Kaluta is a free, open-source Mac client that keeps your mail local and hands the AI work to the agents you already pay for.",
  intro:
    "Superhuman Mail is the best-known fast email client: split inbox, keyboard shortcuts, follow-up reminders, snippets, read statuses and team features, with Superhuman AI drafting replies, labelling mail and answering questions about your inbox. Since 2025 it also offers a hosted MCP server so Claude, ChatGPT or Cursor can read and send your mail. Kaluta approaches the same goal from the other side: no server of its own, no built-in model, and the agents you already use (Claude Code or Codex) working through a small set of mail tools, with your approval before anything is sent.",
  checked: "8 October 2026",
  rows: [
    {
      feature: "What it is",
      openagc: { text: "An open-source, local-first Mac email client built for your AI agents" },
      other: { text: "A hosted email client with built-in AI, from Superhuman (formerly Grammarly)" },
    },
    {
      feature: "Runs on",
      openagc: { verdict: "partial", text: "macOS 26 or later, Apple Silicon" },
      other: { verdict: "yes", text: "Mac, Windows, iOS, iPadOS, Android, and the web through a Chrome extension" },
    },
    {
      feature: "Mail accounts",
      openagc: { verdict: "partial", text: "Gmail; agent mailboxes" },
      other: { verdict: "yes", text: "Gmail and Outlook" },
    },
    {
      feature: "Where your mail is processed",
      openagc: {
        verdict: "yes",
        text: "On your Mac only. Mail an agent reads goes to your own AI provider under your agreement with them",
      },
      other: {
        verdict: "partial",
        text: "On Superhuman's servers; AI through LLM providers under a zero-day retention agreement; it says it does not train on your email",
      },
    },
    {
      feature: "Price",
      openagc: { verdict: "yes", text: "Free, MIT licence. You bring your own Claude Code or Codex subscription" },
      other: {
        text: "Starter $30 a month ($25 billed annually); Business $40 ($33 annually), which the AI drafting, Ask AI and MCP need; Enterprise by quote",
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
        text: "The agents you already use, Claude Code or Codex, under your own login. Kaluta never sees your AI credentials",
      },
      other: { verdict: "yes", text: "Superhuman AI, built in; opt-in, with its own LLM providers" },
    },
    {
      feature: "Agents through MCP",
      openagc: {
        verdict: "yes",
        text: "A local MCP server inside the app: tools for search, read, label, draft, task and routine work, every call checked by the permission engine",
      },
      other: {
        verdict: "yes",
        text: "Superhuman Mail MCP, a hosted server for Claude, ChatGPT and Cursor; Business plan and above",
      },
    },
    {
      feature: "Approval before sending",
      openagc: {
        verdict: "yes",
        text: "Always, for sending, forwarding and deleting on your own accounts; agent mailboxes can be set to send freely",
      },
      other: { verdict: "yes", text: "By default, every send through the MCP requires your approval" },
    },
    {
      feature: "AI drafts and replies",
      openagc: {
        verdict: "yes",
        text: "Writing help in the composer and agent drafts, following a writing guide learned from your own sent mail; in workflows, up to three answers to pick or a draft from what you say",
      },
      other: { verdict: "yes", text: "Instant Reply, auto drafts in your voice, Write with AI (Business for auto drafts)" },
    },
    {
      feature: "Ask questions about your inbox",
      openagc: { verdict: "yes", text: "Ask Claude or Codex in the agent column; the list on screen is the context" },
      other: { verdict: "yes", text: "Ask AI (Business)" },
    },
    {
      feature: "Sorting and labels",
      openagc: {
        verdict: "yes",
        text: "Routines: scheduled sorting into daily, weekly and monthly labels, locally or as a Claude cloud routine; Weekly reading brings each label back on the day it's due (preview); Gmail's categories",
      },
      other: { verdict: "yes", text: "Split Inbox and custom auto labels (Business)" },
    },
    {
      feature: "Tasks from email",
      openagc: {
        verdict: "yes",
        text: "Press t: Claude suggests the task, category and due day; a task list with the email behind each one",
      },
      other: { verdict: "partial", text: "Follow-up reminders and snoozing; no task list" },
    },
    {
      feature: "Daily workflows",
      openagc: {
        verdict: "yes",
        text: "Preview: seven workflows (Triage, Replies, Tasks, Waiting on others, Weekly reading, Agents, Teach Kaluta), one item at a time; Triage shows Kaluta's suggested action and its reason for each new conversation",
      },
      other: { verdict: "partial", text: "Split Inbox, auto labels and Get Me To Zero for working through the inbox; its help centre describes no one-at-a-time mode" },
    },
    {
      feature: "Follow-ups on unanswered mail",
      openagc: {
        verdict: "yes",
        text: "Preview: Waiting on others finds sent mail that expects an answer, labels it Waiting, and after 3 days offers up to three follow-ups written ahead",
      },
      other: { verdict: "yes", text: "Remind Me and Auto Reminders bring back mail with no reply; Auto Drafts writes the follow-up (Business)" },
    },
    {
      feature: "Learns how you write",
      openagc: {
        verdict: "yes",
        text: "A writing guide built from your sent mail with evidence you review, kept up to date from your edits; facts about you with use-freely, ask-first or never-share",
      },
      other: { verdict: "partial", text: "Drafts in your voice; how it learns is not published" },
    },
    {
      feature: "Bulk clean-up and unsubscribe",
      openagc: { verdict: "yes", text: "Clean Up: group by sender, list, time or size; archive thousands at once; unsubscribe" },
      other: { verdict: "partial", text: "Keyboard-driven triage; no bulk clean-up window" },
    },
    {
      feature: "An email address for your agent",
      openagc: { verdict: "yes", text: "Agent mailboxes on Primitive or AgentMail, each a full account" },
      other: { verdict: "no", text: "Agents act on your own address" },
    },
    {
      feature: "Team features",
      openagc: { verdict: "no", text: "None" },
      other: { verdict: "yes", text: "Shared conversations and comments, snippets shared with the team, read statuses, team analytics" },
    },
    {
      feature: "Calendar",
      openagc: { verdict: "no", text: "None" },
      other: { verdict: "yes", text: "Built in: see your calendar, turn emails into events, find free times" },
    },
    {
      feature: "Maturity",
      openagc: { verdict: "partial", text: "Pre-alpha; build from source; tested against a fake Gmail" },
      other: { verdict: "yes", text: "Shipping for years" },
    },
  ],
  theirStrengths: [
    "Every platform, Gmail and Outlook, with a finished, fast, keyboard-first client. Kaluta is Gmail on a Mac and still pre-alpha.",
    "Team features: shared threads, comments, shared snippets, read statuses and analytics.",
    "Calendar built in, and a hosted MCP that works from Claude or ChatGPT on any device with nothing installed.",
    "One subscription covers the AI; Kaluta needs a Claude Code or Codex login of your own.",
  ],
  ourStrengths: [
    "Your mail stays on your Mac. There is no Kaluta server, no account and no telemetry; Superhuman's AI and MCP run on its servers.",
    "Free and open source: you can read exactly what the agent is allowed to do, and the permission engine is the only path to your mail.",
    "Agents you already use: Claude Code or Codex, with your existing login and plan, and a local MCP server rather than a hosted one.",
    "Features Superhuman does not have: tasks from email, a writing guide learned from your sent mail with evidence you can see, routines that run in Claude's cloud, Clean Up, and mailboxes of their own for your agents.",
  ],
  choose: {
    them: "if you want a finished product today, work in a team, use Outlook, or need Windows, iOS or Android.",
    us: "if you use Gmail on a Mac, already pay for Claude Code or Codex, and want your mail and the AI's access to it to stay under your control. Be ready to build it from source for now.",
  },
  sources: [
    { label: "Superhuman Mail", url: "https://superhuman.com/mail" },
    { label: "Superhuman Mail pricing", url: "https://superhuman.com/mail/pricing" },
    { label: "Superhuman Mail MCP", url: "https://superhuman.com/mail/features/email-mcp" },
    { label: "Superhuman Mail MCP Server (help centre)", url: "https://help.superhuman.com/hc/en-us/articles/49810745762067" },
    { label: "Superhuman AI overview (data handling)", url: "https://help.superhuman.com/hc/en-us/articles/38456908110227" },
    { label: "Download Superhuman Mail (platforms)", url: "https://help.superhuman.com/hc/en-us/articles/38456031956243" },
    { label: "Superhuman: Auto Reminders & Auto Drafts", url: "https://help.superhuman.com/hc/en-us/articles/46005658551053-Auto-Reminders-Auto-Drafts" },
    { label: "Superhuman: Remind Me", url: "https://help.superhuman.com/hc/en-us/articles/46005666142733-Remind-Me" },
    { label: "Kaluta specification", url: "https://github.com/audiojak/kaluta/blob/main/docs/SPECIFICATION.md" },
  ],
};

export default function Page() {
  return <ComparisonPage c={c} />;
}
