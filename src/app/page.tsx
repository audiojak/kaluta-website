import Image from "next/image";
import Link from "next/link";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import FeatureAnimation from "@/components/FeatureAnimation";
import { GITHUB_URL } from "@/lib/site";

const principles = [
  {
    title: "No backend",
    body: "Mail goes from Google to your Mac and nowhere else. No Kaluta server sees your mail, and the app has no accounts and collects no telemetry.",
  },
  {
    title: "Agents get tools, not your mailbox",
    body: "An agent searches locally and reads only what it asks for. Every access is logged, and email content is treated as untrusted input.",
  },
  {
    title: "You approve anything that leaves",
    body: "Sending, forwarding and deleting are proposals you review. Archive, labels and drafts are reversible.",
  },
  {
    title: "Bring your own AI",
    body: "Works with the Claude Code and Codex CLIs you already use. Kaluta never sees your AI credentials.",
  },
];

const features = [
  {
    title: "Turn email into tasks, ready for agents",
    body: "Press t on an email, or ⇧T on many. Claude suggests a title, a category, a due day and why; you accept or edit. Tasks stay on your Mac, and Gmail only sees a Task label.",
  },
  {
    title: "Let an agent action the task",
    body: "Ask Claude or Codex to gather what's needed, draft the reply or file the thread. Anything that would leave your Mac is a proposal you approve or reject.",
  },
  {
    title: "Mail routines, on your Mac or in Claude's cloud",
    body: "Sort automated mail into labels you check daily, weekly or monthly. Run a routine locally, or publish it as a Claude Code cloud routine through your own Claude login.",
  },
];

const trySteps = [
  {
    title: "Get the code and the tools",
    code: `git clone ${GITHUB_URL}
cd kaluta
./scripts/bootstrap.sh`,
    note: "Installs Rust and XcodeGen with Homebrew, and checks for Xcode.",
  },
  {
    title: "Build the app",
    code: "scripts/test-macos.sh build",
    note: "The first build takes a few minutes.",
  },
  {
    title: "Open it with the demo mailbox",
    code: "open build/DerivedData/Build/Products/Debug/Kaluta.app --args -KalutaDemo YES",
    note: "No agent CLI installed? Add -KalutaFakeAgents YES to the end to try the agent panel with a stand-in.",
  },
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

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pt-16 pb-12 text-center sm:pt-24">
        <Image
          src="/img/icon.png"
          alt="Kaluta app icon: a kaluta, a small marsupial, drawn in black ink"
          width={96}
          height={96}
          priority
          className="mx-auto mb-8"
        />
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          The open-source Gmail client built for your AI agents
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted text-balance">
          Kaluta is a local-first, native macOS email client. Turn email into
          tasks, let Claude Code or Codex work through them, and sort your
          inbox on a schedule.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#try"
            className="rounded-lg bg-accent px-5 py-2.5 font-medium text-white hover:opacity-90 dark:text-background"
          >
            Try it on your Mac
          </a>
          <a
            href={GITHUB_URL}
            className="rounded-lg border border-border px-5 py-2.5 font-medium hover:bg-surface"
          >
            View on GitHub
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <Shot
          src="/img/hero-tasks-agent.png"
          alt="Kaluta's task list next to an email, with Claude proposing a reply that waits for the user to approve or reject it"
          width={1800}
          height={954}
          priority
        />
        <p className="mt-3 text-center text-sm text-muted">
          Your tasks, the email behind each one, and Claude working on it.
          Nothing is sent until you approve.
        </p>
      </section>

      <section id="try" className="mx-auto max-w-5xl scroll-mt-8 px-5 pb-24">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Try it with a demo mailbox
          </h2>
          <p className="mt-3 max-w-3xl text-muted">
            There is no download yet, so for now you build Kaluta from source.
            The demo mailbox is made-up mail that lives only on your Mac: you
            can explore everything without connecting an account.
          </p>

          <h3 className="mt-6 font-semibold">Before you start</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
            <li>A Mac with Apple Silicon, on macOS 26 or later</li>
            <li>Xcode 27, from the App Store</li>
            <li>
              <a href="https://brew.sh" className="underline hover:text-foreground">
                Homebrew
              </a>
            </li>
            <li>
              Optional, for real agents: Claude Code 2.1+ or Codex CLI 0.145+,
              logged in
            </li>
          </ul>

          <ol className="mt-6 space-y-5">
            {trySteps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-background">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{step.title}</div>
                  <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-background p-4 font-mono text-sm">
                    {step.code}
                  </pre>
                  <p className="mt-2 text-sm text-muted">{step.note}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-xl border border-border bg-warn-soft p-5">
            <h3 className="font-semibold">Pre-alpha: what to expect</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              <li>
                The mail client, tasks, agent integration and routines are
                implemented and tested against a demo mailbox, a fake Gmail and
                fake agent CLIs.
              </li>
              <li>
                The built-in Google sign-in is still in Google&apos;s testing
                mode, which only admits approved test accounts. To connect your
                own Gmail today,{" "}
                <a
                  href={`${GITHUB_URL}/blob/main/docs/google-oauth-client.md`}
                  className="underline hover:text-foreground"
                >
                  use your own Google OAuth client
                </a>
                .
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-5xl scroll-mt-8 px-5 pb-24">
        <h2 className="text-center text-2xl font-semibold tracking-tight">
          From inbox to done, with an agent at your side
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
          Three things Kaluta does that other mail clients don&apos;t.
        </p>
        <div className="mt-8">
          <FeatureAnimation />
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <div key={f.title}>
              <div className="font-mono text-sm text-accent">0{i + 1}</div>
              <h3 className="mt-1 font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted">{f.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/features"
            className="rounded-lg border border-border px-5 py-2.5 font-medium hover:bg-surface"
          >
            See the features in detail →
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-16 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title}>
              <h2 className="font-semibold">{p.title}</h2>
              <p className="mt-2 text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-20">
        <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
        <p className="mt-3 max-w-3xl text-muted">
          Kaluta is a native Mac app: SwiftUI and AppKit over a Rust core. Your
          mail lives in a local database on your Mac, and the only way an agent
          reaches it is through the app&apos;s own mail tools.
        </p>
        <ArchitectureDiagram />
      </section>

      <section id="maintainers" className="mx-auto max-w-5xl scroll-mt-8 px-5 pb-20">
        <div className="rounded-xl border-2 border-accent bg-accent-soft p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            We&apos;re looking for maintainers
          </h2>
          <p className="mt-3 max-w-3xl text-muted">
            Kaluta is MIT-licensed and built in the open. We&apos;re looking
            for people who want to help run it: reviewing pull requests,
            triaging issues, and owning parts of the app. It&apos;s a Swift
            (SwiftUI and AppKit) app over a Rust core, with agent integration
            through MCP — experience with any of these helps.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`}
              className="rounded-lg bg-accent px-5 py-2.5 font-medium text-white hover:opacity-90 dark:text-background"
            >
              Read the contributing guide
            </a>
            <a
              href={`${GITHUB_URL}/issues`}
              className="rounded-lg border border-border bg-background px-5 py-2.5 font-medium hover:bg-surface"
            >
              Introduce yourself in an issue
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
