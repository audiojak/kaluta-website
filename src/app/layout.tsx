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
              <a href={GITHUB_URL} className="hover:text-foreground">
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
