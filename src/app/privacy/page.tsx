import type { Metadata } from "next";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { GITHUB_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Kaluta handles your Google account data and your email, what happens to a bug report or suggestion you send, and how this website uses analytics.",
};

const LAST_UPDATED = "November 12, 2026";

export default function Privacy() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mt-4 [&_p]:text-muted [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-muted [&_a]:underline">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy policy</h1>
      <p>Last updated {LAST_UPDATED}</p>

      <p>
        Kaluta is an open-source macOS email client. It runs entirely on your
        Mac. This policy explains what data the app accesses, where that data
        goes, and what it is used for.
      </p>

      <h2>Summary</h2>
      <ul>
        <li>
          Your email is stored only on your Mac. It never passes through servers
          operated by Kaluta or Actual AI.
        </li>
        <li>
          The one thing the project receives is feedback you choose to send: a
          bug report or suggestion is an email to the project, and a maintainer
          reviews it before any of it is public.
        </li>
        <li>
          The Kaluta app has no user accounts and collects no telemetry or
          analytics.
        </li>
        <li>
          This website uses Google Analytics. Visitors in the EU, EEA and UK are
          asked first; everyone can turn it off with Cookie settings.
        </li>
        <li>
          Your mail is shared with an AI agent only when you connect one, and
          only through the tools you allow.
        </li>
      </ul>

      <h2>Data the app accesses</h2>
      <p>
        When you sign in with Google, Kaluta asks for full access to your Gmail
        (<code>mail.google.com</code>), which downloading mail over IMAP needs,
        and for the <code>gmail.modify</code> scope, so the app still works
        over the Gmail API if you untick full access on Google&apos;s consent
        screen. It also asks for <code>openid</code> and <code>profile</code>,
        to show which account is signed in, with your name and picture.
      </p>
      <p>
        With that access the app downloads your messages, labels and
        attachments directly from Google to your Mac, and sends the actions you
        take — sending, archiving, labelling, deleting — directly back to Google.
      </p>
      <p>
        Google Calendar is optional and never asked for at sign-in. If you
        choose <em>Connect Google Calendar</em> in Settings › Accounts, Kaluta
        asks for <code>calendar.freebusy</code>, to see when you are busy (never
        what your events are), and <code>calendar.events.owned</code>, to add
        and remove the tentative holds you ask for on calendars you own. Holds
        invite no one. Agents are given free times only, never event titles,
        attendees or descriptions. <em>Stop Using the Calendar</em> forgets it.
      </p>

      <h2>Where your data is stored</h2>
      <ul>
        <li>
          Mail is kept in a local database on your Mac, in the app&apos;s own
          container.
        </li>
        <li>
          Google sign-in tokens are stored in the macOS Keychain.
        </li>
        <li>
          Signing out of an account in Kaluta deletes its sign-in tokens and its local mail database. You
          can also revoke Kaluta&apos;s access at any time at{" "}
          <a href="https://myaccount.google.com/permissions">
            myaccount.google.com/permissions
          </a>
          .
        </li>
      </ul>

      <h2>AI agents</h2>
      <p>
        Kaluta can connect to AI agent tools already installed on your Mac,
        such as Claude Code or Codex, using your own login with those providers.
        Kaluta never sees your AI provider credentials.
      </p>
      <p>
        When you ask an agent to work on your mail, the agent can use a limited
        set of mail tools. The content it reads through those tools is sent to
        your AI provider under your agreement with them — Kaluta does not
        control how that provider handles it. Every access is recorded in a
        local log you can review. Sending, forwarding and deleting always require
        your approval in the app.
      </p>
      <p>
        If you choose to set up a Claude cloud routine, it is created in your own
        Claude account and uses Anthropic&apos;s own Gmail connector, subject to
        Anthropic&apos;s terms.
      </p>

      <h2 id="feedback">Bug reports and suggestions</h2>
      <p>
        You can report a bug by writing to{" "}
        <a href="mailto:bug@support.kaluta.org">bug@support.kaluta.org</a> and
        suggest a feature at{" "}
        <a href="mailto:idea@support.kaluta.org">idea@support.kaluta.org</a>.
        A report is an ordinary email from your own account. Nothing is sent
        unless you send it.
      </p>
      <ul>
        <li>
          <strong>What the project receives.</strong> The email: its subject,
          what you wrote, anything you attached, and your name and email
          address as your mail program sent them.
        </li>
        <li>
          <strong>Where it goes.</strong> The mail is received and stored by{" "}
          <a href="https://www.primitive.dev">Primitive</a>, the mail service
          the project uses for these two addresses. This website, hosted at
          Vercel, is told that it arrived and emails a copy, with the first
          picture attached, to a maintainer.
        </li>
        <li>
          <strong>Review before anything is public.</strong> A maintainer
          reads every report and looks at its picture before deciding. A
          rejected report is not published, and you are not told.
        </li>
        <li>
          <strong>What is published.</strong> An approved report becomes a
          public issue on <a href={`${GITHUB_URL}/issues`}>GitHub</a>: its
          title, your description, any app details and log lines in it, and
          the first PNG or JPEG you attached, which is stored at a public
          address at Vercel. Your name and email address are never published.
          Write a report as if anyone could read it, and leave out anything
          private.
        </li>
        <li>
          <strong>What you get back.</strong> One email with the issue&apos;s
          link when it is published, and one when the issue is closed. Your
          address is used for nothing else.
        </li>
        <li>
          <strong>How long it is kept.</strong> Your email stays at Primitive
          while its issue is open, and is deleted there after the issue is
          closed or the report is rejected. The maintainer&apos;s review copy
          stays in their mailbox. A published issue and its picture stay
          public.
        </li>
        <li>
          <strong>Mail that is not a report.</strong> Mail that looks like
          spam, or that fails the checks showing it came from the address it
          names, is not forwarded or published. It stays at Primitive until
          it is deleted there.
        </li>
        <li>
          <strong>Removing it.</strong> To have a report, an issue or a
          picture removed, write to the address you sent it to. A maintainer
          reads everything sent there.
        </li>
      </ul>

      <h2>Google API Services User Data Policy</h2>
      <p>
        Kaluta&apos;s use and transfer of information received from Google APIs
        adheres to the{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy">
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements. Google user data is used only
        to provide the email features you use in the app. It is not sold, not
        used for advertising, and not used to train AI models by Kaluta or
        Actual AI.
      </p>

      <h2 id="this-website">This website</h2>
      <p>
        This section covers kaluta.org, not the app. The site uses Google
        Analytics to count visits and see which pages are read.
      </p>
      <ul>
        <li>
          If you visit from the EU, the EEA or the UK, the site asks first.
          Google Analytics loads only if you choose &ldquo;Allow
          analytics&rdquo; in the cookie banner; until then the script is not
          loaded and no analytics cookies are set.
        </li>
        <li>
          Elsewhere, Google Analytics loads when you open the site, and you can
          turn it off at any time.
        </li>
        <li>
          To tell which applies, the site uses the country our host, Vercel,
          works out from your IP address. Only a yes or no (&ldquo;ask
          first?&rdquo;) reaches your browser, which keeps it until you close
          the tab; the site does not store your country or IP address. If the
          country can&apos;t be determined, the site asks.
        </li>
        <li>
          If you allow it, Google Analytics sets cookies (<code>_ga</code> and{" "}
          <code>_ga_*</code>) and sends Google details of your visit, such as
          the pages you view, your browser and device type, and your
          approximate location. Google handles that data under the{" "}
          <a href="https://policies.google.com/privacy">Google Privacy Policy</a>.
        </li>
        <li>
          Your choice is saved in your browser&apos;s local storage, so the
          banner doesn&apos;t ask again. It is not a cookie and is never sent
          to a server.
        </li>
        <li>
          You can change your choice at any time with{" "}
          <CookieSettingsButton className="underline" /> in the footer. Turning
          analytics off removes its cookies.
        </li>
        <li>
          Nothing you do on this website is connected to your mail or to the
          Kaluta app.
        </li>
      </ul>

      <h2>Who is responsible</h2>
      <p>
        Kaluta is an independent open-source project sponsored by Actual AI,
        which is the developer named on the signed app and on Google&apos;s
        OAuth consent screen. The app has no backend, so neither the project
        nor Actual AI holds any of your email or account data, apart from
        feedback you choose to send, described above.
      </p>

      <h2>Changes and contact</h2>
      <p>
        Changes to this policy are published on this page and in the project&apos;s
        public source history. Questions can be raised on{" "}
        <a href={`${GITHUB_URL}/issues`}>GitHub</a>.
      </p>
    </article>
  );
}
