import type { Metadata } from "next";
import Link from "next/link";
import { GITHUB_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms for using the Kaluta app and this website.",
};

const LAST_UPDATED = "September 25, 2026";

export default function Terms() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mt-4 [&_p]:text-muted [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-muted [&_a]:underline">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of service</h1>
      <p>Last updated {LAST_UPDATED}</p>

      <p>
        These terms apply to your use of the Kaluta app and of this website.
        By using either, you agree to them. If you do not agree, do not use
        Kaluta.
      </p>

      <h2>What Kaluta is</h2>
      <p>
        Kaluta is open-source software that runs on your Mac. It is not a
        hosted service: no server of ours sees your mail, and the project holds
        no accounts. The only data we receive is feedback you choose to send,
        as the <Link href="/privacy#feedback">privacy policy</Link> describes. Kaluta is an independent project sponsored by
        Actual AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;).
      </p>

      <h2>Licence</h2>
      <p>
        The Kaluta source code is released under the{" "}
        <a href={`${GITHUB_URL}/blob/main/LICENSE`}>MIT License</a>. You may use,
        copy, modify and distribute it under that licence. Where these terms and
        the MIT License differ on your rights in the software itself, the MIT
        License governs. The Kaluta name and icon are not licensed for use in a
        way that suggests your version is the official one.
      </p>

      <h2>Your accounts with other services</h2>
      <p>
        Kaluta connects to services you already use, under your own accounts:
      </p>
      <ul>
        <li>
          <strong className="text-foreground">Google.</strong> Your use of Gmail
          through Kaluta remains subject to Google&apos;s terms. You are
          responsible for the Google account you connect.
        </li>
        <li>
          <strong className="text-foreground">AI providers.</strong> Agents such
          as Claude Code or Codex run under your own subscription and your
          agreement with that provider. Mail content an agent reads is sent to
          that provider. We are not a party to that agreement and do not control
          how the provider handles your data.
        </li>
      </ul>

      <h2>Using AI agents with your mail</h2>
      <p>
        AI agents can make mistakes, misread messages, or be misled by
        instructions hidden in email content. Kaluta limits what an agent can
        do and asks for your approval before anything is sent, forwarded or
        deleted, but you remain responsible for:
      </p>
      <ul>
        <li>reviewing each proposal before you approve it;</li>
        <li>
          the actions agents take on your behalf, including reversible ones such
          as archiving, labelling and drafting;
        </li>
        <li>
          routines you set up, including Claude cloud routines, which run under
          your own Claude account.
        </li>
      </ul>

      <h2>Acceptable use</h2>
      <p>
        Do not use Kaluta to send spam, to access mail you are not authorised
        to access, or in any way that breaks the law or the terms of the
        services you connect it to.
      </p>

      <h2>Pre-release software</h2>
      <p>
        Kaluta is pre-alpha. Features may change or be removed, and it may
        contain bugs that affect your mail. Keep in mind that Gmail, not
        Kaluta, holds the authoritative copy of your mailbox.
      </p>

      <h2>No warranty</h2>
      <p>
        Kaluta and this website are provided &ldquo;as is&rdquo;, without
        warranty of any kind, express or implied, including warranties of
        merchantability, fitness for a particular purpose and
        non-infringement.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, neither the Kaluta
        contributors nor Actual AI are liable for any claim, damages or other
        liability arising from your use of Kaluta or this website — including
        lost, altered or wrongly sent email, or actions taken by an AI agent.
      </p>

      <h2>Privacy</h2>
      <p>
        How the app handles your data is described in the{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2>Changes and contact</h2>
      <p>
        We may update these terms. Changes are published on this page and in the
        project&apos;s public source history; continuing to use Kaluta after a
        change means you accept the updated terms. Questions can be raised on{" "}
        <a href={`${GITHUB_URL}/issues`}>GitHub</a>.
      </p>
    </article>
  );
}
