import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { CookieConsent, CookieSettingsButton } from "@/components/CookieConsent";
import { GITHUB_URL, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kaluta — the open-source Gmail client for your AI agents",
    template: "%s · Kaluta",
  },
  description:
    "A local-first, native macOS Gmail client: turn email into tasks, let Claude Code or Codex work through them, and sort your inbox on a schedule.",
  openGraph: {
    title: "Kaluta",
    description:
      "The open-source, local-first Gmail client for macOS: turn email into tasks, let your AI agents work on them, and sort mail with routines.",
    url: SITE_URL,
    siteName: "Kaluta",
    images: ["/img/hero-tasks-agent.png"],
  },
};

// GitHub's mark (Octicons mark-github), in the text colour.
function GitHubMark() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 fill-current">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
    </svg>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-border">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
            <Link href="/" className="flex items-center gap-2.5 font-semibold">
              <Image
                src="/img/kaluta-mark.svg"
                alt=""
                width={34}
                height={25}
                unoptimized
                className="dark:invert"
              />
              Kaluta
            </Link>
            <div className="flex items-center gap-5 whitespace-nowrap text-sm text-muted">
              <Link href="/#try" className="hover:text-foreground">
                Try it
              </Link>
              <Link href="/features" className="hover:text-foreground">
                Features
              </Link>
              <Link href="/#how" className="hover:text-foreground max-sm:hidden">
                How it works
              </Link>
              <Link href="/privacy" className="hover:text-foreground max-sm:hidden">
                Privacy
              </Link>
              <a href={GITHUB_URL} className="inline-flex items-center gap-1.5 hover:text-foreground">
                <GitHubMark />
                GitHub
              </a>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border text-sm text-muted">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 sm:flex-row sm:justify-between">
            <p>
              Kaluta is MIT-licensed open source, sponsored by{" "}
              <a href="https://actual.ai" className="underline hover:text-foreground">
                Actual AI
              </a>
              . Named after the kaluta, a small marsupial of the Australian
              desert. It was called OpenAGC until October 2026.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy policy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="/compare/mailstrom" className="hover:text-foreground">
                vs Mailstrom
              </Link>
              <Link href="/compare/superhuman" className="hover:text-foreground">
                vs Superhuman
              </Link>
              <Link href="/compare/gmail" className="hover:text-foreground">
                with Gmail
              </Link>
              <Link href="/compare/apple-mail" className="hover:text-foreground">
                vs Apple Mail
              </Link>
              <a href={GITHUB_URL} className="hover:text-foreground">
                Source
              </a>
              <CookieSettingsButton className="hover:text-foreground" />
            </div>
          </div>
        </footer>
        <CookieConsent />
      </body>
    </html>
  );
}
