import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FeatureAnimation from "@/components/FeatureAnimation";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Work through each day's mail one thing at a time, turn email into tasks, let Claude Code or Codex action them in a writing style learned from your own mail, and sort mail with routines.",
};

const buckets = [
  { label: "1-Daily", cadence: "Daily", color: "bg-red-500" },
  { label: "2-Weekly-Newsletters", cadence: "Weekly", color: "bg-blue-500" },
  { label: "3-Weekly-Events", cadence: "Weekly", color: "bg-green-500" },
  { label: "4-Weekly-Finance", cadence: "Weekly", color: "bg-orange-500" },
  { label: "5-Monthly-Pitches", cadence: "Monthly", color: "bg-gray-400" },
];

function Shot({
  src,
  alt,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-xl shadow-black/10">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="w-full"
      />
    </div>
  );
}

const workflows = [
  {
    name: "Triage",
    dot: "bg-indigo-500",
    src: "/img/workflow-triage.jpg",
    height: 760,
    alt: "Triage, 1 of 9: Sam Rivera's email asking whether Thursday at 2 works for board prep, as it was sent, with Open the email (O) and Open in Gmail (G); above it Kaluta's suggestion, Quick reply · about 20 seconds, its reason, and the conversation's task. Buttons: Reply (Return), Make a task (T), Archive (E), Leave in Inbox (L), Skip for now (S)",
    text: "Every new conversation, people first, with Kaluta's suggestion and its reason: a quick reply when the answer takes 30 seconds or less, with up to three answers ready to pick; a task when it takes longer, filled in on the same screen; archive; or leave it in the Inbox. The suggestion is marked on its own button and the keys never move, so Return is always Reply. A long newsletter or report shows Kaluta's short summary instead, and if you already wrote to the sender in another thread, Triage says so.",
  },
  {
    name: "Replies",
    dot: "bg-teal-600",
    src: "/img/workflow-replies.jpg",
    height: 733,
    alt: "Replies, 1 of 6: Avery Kim asks whether launch goes ahead on Tuesday or moves to Thursday, then What do you want to say? Kaluta writes the email from it, for you to read and change before it goes; starters Go for Tuesday and Push to Thursday; buttons Write it with Kaluta, Use my words and Cancel",
    text: "Conversations that ask you something and have no task. Kaluta asks what you want to say, with starters drawn from the email's questions, and writes nothing until you have said something; Use my words makes what you typed the email, with no draft. Sending archives the conversation, Archive (E) is there when no reply is needed, and ⌘Z puts it back.",
  },
  {
    name: "Tasks",
    dot: "bg-orange-600",
    src: "/img/workflow-tasks.jpg",
    height: 733,
    alt: "Tasks, 1 of 3: Update the card on Example Cloud, Admin, carried over from yesterday, with the reason and the billing email below; a rail lists the day's three tasks and a pill says 2 more later this week. Buttons: Done (E), Tomorrow (L), Skip for now (S)",
    text: "Today's tasks one at a time, carried-over ones first, with the email below and the day's set in a rail. A task that ends in a reply asks what you decided, then Send and finish the task completes it and archives the email. Tomorrow moves one on without penalty; one finished elsewhere shows as done.",
  },
  {
    name: "Waiting on others",
    dot: "bg-purple-600",
    src: "/img/workflow-waiting.jpg",
    height: 733,
    alt: "Waiting on others, 1 of 14: Waiting on Casey Tanaka · 13 days, because the email asks them something, above what you wrote; a rail lists who owes an answer and for how long. Buttons: Nudge (Return), Let it go (E), Check again (L), Skip for now (S)",
    text: "Once a day Kaluta reads the mail you sent and works out which expects an answer, labelling it Waiting so Gmail sees it too. After three days with no reply (a setting) it joins the list, longest first. Nudge picks from up to three follow-ups written ahead, Let it go takes the label off, and Check again hides it for a day, three days or a week.",
  },
  {
    name: "Weekly reading",
    dot: "bg-amber-700",
    src: "/img/workflow-reading.jpg",
    height: 733,
    alt: "Weekly reading, 1 of 3, in the Needs action soon label: Degraded performance in us-east from Status Alerts, shown as Kaluta's one-line summary; a rail lists the label's three unread emails. Buttons: Read, next (E), Open in full (O), Keep for later (L), Back to the Inbox (I), Clear the bucket (⌘E)",
    text: "What your sorting routine filed, on the day each label is due: daily ones every day, weekly ones on Friday or a day you choose, monthly ones on the 1st. A short report comes first, then each label one email at a time as Kaluta's summary, written when the routine sorted it. Reading and clearing mark mail read and keep the label; sending one back to the Inbox has Kaluta propose a change to the routine.",
  },
  {
    name: "Agents",
    dot: "bg-slate-600",
    src: "/img/workflow-agents.jpg",
    height: 733,
    alt: "Agents, 1 of 2: a verification code from Example Journals to an agent mailbox, research-scout@demo.primitive.email, shown large as 482 913 with when it expires. Buttons: Copy the code (C), Done (E), Skip for now (S)",
    text: "Everything your agents are waiting on you for, across accounts: a send an agent proposed, opened on the email itself to edit and send or not; a verification code that arrived in an agent mailbox, shown large with Copy the code; and this morning's sorting run, to keep or undo. A pill says what agent mailboxes sent on their own.",
  },
  {
    name: "Teach Kaluta",
    dot: "bg-green-700",
    src: "/img/workflow-teach.jpg",
    height: 733,
    alt: "Teach Kaluta, 1 of 7: a proposed rule, Never write 'circle back', from learning your sent mail, with how it is checked and The messages that show it (O); a rail lists the rest, rules, a guideline, a change and facts. Buttons: Accept (E), Edit… (W), Reject, Show the evidence (O), Skip for now (S)",
    text: "What Kaluta has learned and wants you to approve, one proposal at a time: writing-guide rules, facts about you, and changes to the sorting routine. Each shows the change it makes, with its evidence on O. Accept, edit or reject each one; there is no Accept All, and ⌘Z undoes a decision and its change together.",
  },
];

function Workflows() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-block rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
          New · preview
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance">
          Your day&apos;s mail, one thing at a time
        </h2>
        <p className="mt-4 text-muted text-balance">
          Kaluta opens on <strong className="text-foreground">What&apos;s Next</strong>:
          how long today&apos;s mail will take, the job to start with, the
          people you know who wrote, and what is worth a look first. Seven
          workflows each take one daily job, one item at a time from a set
          fixed when you start, with a key on every button and Undo instead of
          confirmation dialogs. Esc goes back to your mail and comes back to
          the same place; mail that arrives meanwhile waits for the end.
        </p>
      </div>
      <div className="mt-10">
        <Shot
          src="/img/workflows-start.jpg"
          alt="What's Next: Thursday, October 15; About 32 minutes of mail today. A large card, Triage what's new, 9 new conversations, from Taylor Chen, Avery Kim, Drew Haddad, Sam Rivera and 2 others you know, with three worth a look and why (answers you, asks you something, to you alone), starts on Return; smaller cards for Replies (6 waiting on your answer), Tasks (3 for today, 2 later this week), Waiting on others (14 with no answer), Weekly reading (3 due today), Agents (2 waiting on you) and Teach Kaluta (7 to decide)"
          width={1200}
          height={760}
        />
      </div>
      <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2">
        {workflows.map((w) => (
          <div key={w.name}>
            <Shot src={w.src} alt={w.alt} width={1200} height={w.height} />
            <h3 className="mt-5 flex items-center gap-2.5 text-xl font-semibold tracking-tight">
              <span className={`size-2.5 rounded-full ${w.dot}`} />
              {w.name}
            </h3>
            <p className="mt-2 text-muted">{w.text}</p>
          </div>
        ))}
        <div className="self-center">
          <h3 className="text-xl font-semibold tracking-tight">
            Kaluta writes after you
          </h3>
          <p className="mt-2 text-muted">
            Kaluta drafts only once you have said what you want, typed or
            dictated, or, where the answer is short and predictable, offers up
            to three to pick from. Every email it writes ends on an editable
            screen: who it goes to, what you said above it, Shorter, Warmer or a
            change in your own words, then Send. Reply all is A when others are
            on the email.
          </p>
        </div>
      </div>
      <div className="mt-16 grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-muted">
            The suggestions, summaries, answers and nudges come from your own
            agent, Claude Code or Codex, working read-only in the background.
            Emails show as they were sent, and open in their own window (O) or
            in Gmail (G). Ending a set closes a ring and plays a short
            chord. There are no streaks or red counts, and work from an earlier
            day is carried over, never overdue.
          </p>
          <p className="mt-3 text-muted">
            Workflows are a preview. Once Kaluta finds Claude Code or Codex on
            your Mac, the Inbox offers to turn them on; you can also turn on{" "}
            <span className="text-foreground">Open on the start screen</span> in
            Settings › General.
          </p>
          <div className="mt-5 w-fit overflow-hidden rounded-lg border border-border bg-white shadow-lg shadow-black/10">
            <Image
              src="/img/workflows-tip.png"
              alt="The Inbox's tip: Daily Workflows. Kaluta can turn your mail into short daily workflows: triage, replies, tasks, follow-ups and reading. It uses your agent in the background. Buttons: Turn On, Not Now"
              width={460}
              height={157}
            />
          </div>
        </div>
        <Shot
          src="/img/workflow-replies-write.jpg"
          alt="Replies: under Avery's email, To: Avery Kim, You said: Go for Tuesday. I'll have the pricing copy to you by Monday noon, with Change; the reply Kaluta wrote from it, editable; Shorter, Warmer and Tell Kaluta what to change; and Send (⌘Return), Change what I said (Esc), Discard (⌘.)"
          width={1200}
          height={733}
        />
      </div>
    </section>
  );
}

function RoutineIllustration() {
  return (
    <div
      role="img"
      aria-label="A routine that sorts automated mail into daily, weekly and monthly labels, run on this Mac or published as a Claude cloud routine"
      className="rounded-xl border border-border bg-background p-5 shadow-xl shadow-black/10 sm:p-6"
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="font-semibold">Sort important mail</div>
        <div className="text-sm text-muted">Every hour</div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg border border-border px-3 py-2">
          <div className="font-medium">On this Mac</div>
          <div className="text-muted">Claude Code or Codex</div>
        </div>
        <div className="rounded-lg border-2 border-accent bg-accent-soft px-3 py-2">
          <div className="font-medium">Claude cloud routine</div>
          <div className="text-muted">Runs while your Mac sleeps</div>
        </div>
      </div>
      <ul className="mt-5 space-y-2 text-sm">
        {buckets.map((b) => (
          <li key={b.label} className="flex items-center gap-3">
            <span className={`size-2.5 shrink-0 rounded-full ${b.color}`} />
            <span className="font-mono">{b.label}</span>
            <span className="ml-auto text-muted">{b.cadence}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-border pt-4 text-sm text-muted">
        Leaves alone: mail from people, threads you replied to, starred mail.
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pt-16 pb-12 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-balance">
          From inbox to done, with an agent at your side
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted text-balance">
          Kaluta walks you through each day&apos;s mail one thing at a time,
          turns email into tasks, lets your own AI agent work through them in
          your own voice, keeps automated mail out of your way, gives
          an agent an address of its own, and clears years of mail in one go.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-24">
        <FeatureAnimation />
      </section>

      <Workflows />

      <section className="mx-auto max-w-5xl space-y-24 px-5 pb-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="font-mono text-sm text-accent">01</div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Turn email into tasks, ready for agents
            </h2>
            <p className="mt-3 text-muted">
              Press <kbd className="rounded border border-border px-1.5 font-mono text-sm">t</kbd>{" "}
              on an email, or{" "}
              <kbd className="rounded border border-border px-1.5 font-mono text-sm">⇧T</kbd>{" "}
              on many, and Claude reads them and suggests what you need to do:
              a title, a category like Reply, Decide or Schedule, a due day,
              and why. You accept or edit each one.
            </p>
            <p className="mt-3 text-muted">
              Tasks live on your Mac, grouped by when they&apos;re due. Gmail
              only sees a <span className="font-mono text-sm">Task</span> label,
              so your web and phone inboxes stay in step.
            </p>
          </div>
          <Shot
            src="/img/task-dialog.png"
            alt="The New Task dialog with Claude's suggested title, the Reply category, a due date of today and the reason: the sender is waiting for an answer"
            width={920}
            height={734}
          />
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="md:order-2">
            <div className="font-mono text-sm text-accent">02</div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Let an agent action the task
            </h2>
            <p className="mt-3 text-muted">
              Open a task and ask Claude or Codex to take it on: gather the
              information it needs, draft the reply, file the thread. The agent
              works through a small set of mail tools and proposes anything
              that would leave your Mac.
            </p>
            <p className="mt-3 text-muted">
              Nothing it writes goes out unseen: a send it proposes opens with{" "}
              <span className="text-foreground">Review and Send</span> on the
              email itself, in the composer, for you to change before it goes,
              or you reject it. Reply to a
              conversation with an open task yourself, from anywhere, and the
              composer names the task and offers{" "}
              <span className="text-foreground">Send and Finish Task</span> or{" "}
              <span className="text-foreground">Send, Keep Task Open</span>.
            </p>
          </div>
          <div className="md:order-1">
            <div className="mx-auto w-fit overflow-hidden rounded-lg border border-border bg-white shadow-lg shadow-black/10">
              <Image
                src="/img/agent-proposal.png"
                alt="Claude, asked to draft the reply Emerson is waiting for, proposes sending Re: Onboarding plan to emerson@example.org, with Reject and Review and Send buttons"
                width={460}
                height={270}
              />
            </div>
          </div>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="font-mono text-sm text-accent">03</div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Mail routines, on your Mac or in Claude&apos;s cloud
            </h2>
            <p className="mt-3 text-muted">
              Routines sort automated mail — alerts, newsletters, receipts,
              pitches — into labels you check daily, weekly or monthly, so your
              inbox holds only mail that needs a person.
            </p>
            <p className="mt-3 text-muted">
              Shape a routine in a structured editor and preview it, then run
              it locally with your own agent, or publish it as a Claude Code
              cloud routine through your own Claude login so it keeps going
              when your Mac is asleep.
            </p>
            <p className="mt-3 text-muted">
              The Weekly reading workflow then brings each label back on the
              day it is due, one email at a time as Kaluta&apos;s summary.
              Send one back to the Inbox and Kaluta proposes leaving that
              sender alone next time, for you to accept.
            </p>
          </div>
          <RoutineIllustration />
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="md:order-2">
            <div className="font-mono text-sm text-accent">04</div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              A writing guide learned from your own sent mail
            </h2>
            <p className="mt-3 text-muted">
              Choose how many of your recent sent messages to learn from. Your
              own agent reads them in a read-only session and proposes how you
              write — your voice, how you open and sign off, spelling, favourite
              phrases, how you treat different people — each with quotes from
              your mail as evidence. You accept, edit or reject every entry,
              and a short interview covers what mail can&apos;t show, like
              confidentiality and what to do when unsure.
            </p>
            <p className="mt-3 text-muted">
              Every AI that writes for you then follows the guide: writing help
              in the composer, the agent column and routines, with Claude Code
              or Codex. Drafts say who they&apos;re written for, rules are
              checked before you see a draft, and the agent asks rather than
              inventing a fact it doesn&apos;t have.
            </p>
          </div>
          <div className="space-y-4 md:order-1">
            <Shot
              src="/img/composer-task.jpg"
              alt="The composer replying to Sam Rivera about board prep: a line saying it answers the task Pick a time for board prep, with Send, Keep Task Open and Send and Finish Task buttons; Sam's message above the reply; and a bar that reads: Ask Claude to write or change this message"
              width={760}
              height={760}
            />
            <div className="mx-auto w-fit overflow-hidden rounded-lg border border-border bg-white shadow-lg shadow-black/10">
              <Image
                src="/img/guide-ready.png"
                alt="A sheet: Your Writing Guide Is Ready to Review. The analysis of your sent mail finished; 12 decisions are waiting for you. Buttons: Later, Review Now."
                width={460}
                height={143}
              />
            </div>
          </div>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="font-mono text-sm text-accent">05</div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              It keeps learning from your edits
            </h2>
            <p className="mt-3 text-muted">
              Once a day, Kaluta compares what the AI drafted with what you
              actually sent. Where your edits show the guide is wrong or
              missing something, it proposes a rule change, with the two
              versions side by side and the differing words marked. A pattern
              needs to show up in two or three messages before it&apos;s
              proposed. The Writing Guide&apos;s header says how many rules
              are waiting, and the Teach Kaluta workflow takes you through them
              one at a time with their evidence: accept, edit or reject each
              one, and every decision can be undone. What you tell Kaluta
              when it writes for you counts as evidence too, and a proposal can
              quote your words.
            </p>
            <p className="mt-3 text-muted">
              A <strong className="text-foreground">Facts</strong> page keeps
              what agents may say about you: your name, time zone, calendar
              link, role, the people you mention. Each fact is marked use
              freely, ask before using, or never share, and can be kept to one
              account or shared across all of them. New facts found in your
              sent mail arrive as proposals too. Passwords, card numbers,
              government IDs and other people&apos;s health details are never
              stored.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <Shot
              src="/img/guide-review.png"
              alt="The Writing Guide's list column: Learn from Sent Mail, the daily review's status with Run Now, a Review 3 Proposed Rules button, and the categories Voice and tone, Structure and Language, each row saying nothing yet"
              width={380}
              height={730}
            />
          </div>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="md:order-2">
            <div className="font-mono text-sm text-accent">06</div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              An email address of its own for your agent
            </h2>
            <p className="mt-3 text-muted">
              Give an agent its own mailbox, so it can sign up for services and
              write to people as itself rather than as you. Pick a service,
              name the agent, agree to the service&apos;s terms, and the
              address is created and open in a few seconds, with no agent
              involved in the setup. Verify it with your own email to raise its
              sending limits. Once you have one, adding another agent is just a
              name: they share the service account, its key and its
              verification, and on Primitive you can put them on a domain you
              own, with the DNS records listed and checked by the app.
            </p>
            <p className="mt-3 text-muted">
              Each agent mailbox is a full account: its own writing guide,
              facts, routines and undo. You read its mail and can send as the
              agent. Per mailbox you choose whether agents send freely (each
              message is checked against the mailbox&apos;s guide and logged)
              or ask before each send, as on your own accounts. Deleting mail
              always asks. Verification codes that arrive in an agent mailbox
              show up large in the Agents workflow, ready to copy. Two services are supported, both free to start:{" "}
              <a href="https://primitive.dev" className="underline hover:text-foreground">
                Primitive
              </a>{" "}
              and{" "}
              <a href="https://agentmail.to" className="underline hover:text-foreground">
                AgentMail
              </a>
              ; the app states each one&apos;s limits in its own words.
            </p>
          </div>
          <div className="space-y-4 md:order-1">
            <div className="mx-auto w-full max-w-sm">
              <Shot
                src="/img/agent-mailbox-inbox.png"
                alt="An agent mailbox's inbox with two messages, a banner saying that until it is verified the mailbox can only reply to people who wrote first, up to 10 an hour and 50 a day, and a Verify button"
                width={380}
                height={420}
              />
            </div>
            <div className="mx-auto w-fit overflow-hidden rounded-lg border border-border bg-white shadow-lg shadow-black/10">
              <Image
                src="/img/agent-mailbox-create.png"
                alt="The Create an Agent Mailbox sheet asking where the mailbox lives: Primitive, addresses for agents on a shared domain, or AgentMail, inboxes for agents at agentmail.to, each with a line on its free tier"
                width={460}
                height={287}
              />
            </div>
          </div>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="font-mono text-sm text-accent">07</div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Clean Up: clear years of mail in one go
            </h2>
            <p className="mt-3 text-muted">
              A window for the once-a-year tidy rather than the daily one. It
              groups a whole mailbox by sender, by people you&apos;ve written
              to, by subject, mailing list, time, size, or Gmail&apos;s Social
              and Promotions categories. Tick the groups you&apos;re done with
              and archive, move, trash or mark as spam every message in them,
              thousands at a time, with one Undo to bring them all back. It
              acts on messages, not threads, so a person&apos;s reply in a
              mixed thread stays where it is.
            </p>
            <p className="mt-3 text-muted">
              The Mailing Lists view can unsubscribe you: one request to the
              list&apos;s own site after a confirmation naming each list, or a
              filled-in message in the composer for you to send, never behind
              your back and never by an agent. A card at the foot tracks your
              progress towards Inbox Zero, with today&apos;s numbers and a
              month&apos;s trend.
            </p>
          </div>
          <div className="space-y-4">
            <Shot
              src="/img/cleanup.png"
              alt="The Clean Up window on the Sender view: senders listed with message counts, Weekly Digest ticked with 55 messages, and its messages listed on the right under toolbar buttons for archive, trash, spam and move"
              width={1180}
              height={760}
            />
            <div className="flex flex-wrap items-start justify-center gap-4">
              <div className="w-fit overflow-hidden rounded-lg border border-border bg-white shadow-lg shadow-black/10">
                <Image
                  src="/img/cleanup-unsubscribe.png"
                  alt="A confirmation: Unsubscribe from Weekly Digest? Kaluta asks weekly-digest.example.org once to take you off the list; nothing else is sent. An Archive Them Too checkbox, and Cancel and Unsubscribe buttons."
                  width={460}
                  height={210}
                />
              </div>
              <div className="w-fit overflow-hidden rounded-lg border border-border bg-white shadow-lg shadow-black/10">
                <Image
                  src="/img/cleanup-card.png"
                  alt="The Inbox Zero card: 63 percent, a falling sparkline, and today's numbers: At Midnight 940, Received Today 0, Removed Today minus 41, Now 899"
                  width={210}
                  height={190}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-24">
        <div className="rounded-2xl border border-border bg-surface p-6 text-center sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Try it with a demo mailbox
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Build Kaluta from source and explore all of this with made-up
            mail, without connecting an account.
          </p>
          <Link
            href="/#try"
            className="mt-6 inline-block rounded-lg bg-accent px-5 py-2.5 font-medium text-white hover:opacity-90 dark:text-background"
          >
            Try it on your Mac
          </Link>
          <p className="mt-6 text-sm text-muted">
            How it compares:{" "}
            <Link href="/compare/superhuman" className="underline hover:text-foreground">
              Kaluta vs Superhuman
            </Link>{" "}
            ·{" "}
            <Link href="/compare/mailstrom" className="underline hover:text-foreground">
              Kaluta vs Mailstrom
            </Link>{" "}
            ·{" "}
            <Link href="/compare/apple-mail" className="underline hover:text-foreground">
              Kaluta vs Apple Mail
            </Link>{" "}
            ·{" "}
            <Link href="/compare/gmail" className="underline hover:text-foreground">
              Kaluta with Gmail
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
