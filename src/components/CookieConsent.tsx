"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const GA_ID = "G-Q2C8E7ZQXH";
const STORAGE_KEY = "kaluta-analytics-consent";
const REGION_KEY = "kaluta-consent-required";
const CHANGE_EVENT = "kaluta:consent-change";
const OPEN_EVENT = "kaluta:open-cookie-settings";

type Consent = "granted" | "denied";

function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

// Asks /api/region once per browser session whether this visitor's country
// needs opt-in consent. Any failure counts as yes.
async function fetchConsentRequired(): Promise<boolean> {
  try {
    const cached = sessionStorage.getItem(REGION_KEY);
    if (cached !== null) return cached === "true";
  } catch {}
  let required = true;
  try {
    const response = await fetch("/api/region");
    if (response.ok) required = (await response.json()).consentRequired !== false;
  } catch {}
  try {
    sessionStorage.setItem(REGION_KEY, String(required));
  } catch {}
  return required;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// Google Analytics sets _ga and _ga_<id> on the site's top-level domain.
function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

function saveConsent(consent: Consent, analyticsLoaded: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // Storage is blocked: the choice lasts for this page view only.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
  if (analyticsLoaded && consent === "denied") {
    // gtag.js is already running; drop its cookies and reload without it.
    clearAnalyticsCookies();
    location.reload();
  }
}

/**
 * Loads Google Analytics. Visitors in the EU, EEA and UK must opt in first;
 * elsewhere it loads by default and "Cookie settings" turns it off.
 */
export function CookieConsent() {
  // "unset" on the server and in the static HTML, so nothing loads before hydration.
  const stored = useSyncExternalStore<Consent | null | "unset">(
    subscribe,
    readConsent,
    () => "unset",
  );
  const [consentRequired, setConsentRequired] = useState<boolean>();
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    fetchConsentRequired().then(setConsentRequired);
    const open = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  // Wait for both the stored choice and the region before deciding anything.
  const consent =
    stored === "unset" || consentRequired === undefined
      ? "unset"
      : (stored ?? (consentRequired ? null : "granted"));
  const showBanner = consent === null || (reopened && consent !== "unset");
  const choose = (choice: Consent) => {
    setReopened(false);
    saveConsent(choice, consent === "granted");
  };

  return (
    <>
      {consent === "granted" && <GoogleAnalytics gaId={GA_ID} />}
      {showBanner && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background shadow-[0_-8px_24px_rgba(0,0,0,0.08)]"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              {consentRequired
                ? "May we use Google Analytics cookies to count visits to this website? It\u2019s off unless you say yes."
                : "This website uses Google Analytics cookies to count visits. You can turn them off."}{" "}
              The Kaluta app itself collects no analytics.{" "}
              <a href="/privacy#this-website" className="underline hover:text-foreground">
                Details
              </a>
            </p>
            <div className="flex shrink-0 gap-3 text-sm">
              <button
                type="button"
                onClick={() => choose("denied")}
                className="rounded-lg border border-border px-4 py-2 font-medium hover:bg-surface"
              >
                No thanks
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="rounded-lg bg-accent px-4 py-2 font-medium text-white hover:opacity-90 dark:text-background"
              >
                Allow analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Reopens the cookie banner so a visitor can change their choice. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
