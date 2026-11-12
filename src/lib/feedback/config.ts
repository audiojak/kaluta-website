// Settings for the feedback handler (in-app bug reports and feature
// requests, sent by email). Values come from the Vercel project's
// environment; nothing here has a default that would work in production.

import { SITE_URL } from "../site";

export const FEEDBACK_DOMAIN = "support.kaluta.org";
export const BUG_ADDRESS = `bug@${FEEDBACK_DOMAIN}`;
export const IDEA_ADDRESS = `idea@${FEEDBACK_DOMAIN}`;
/** Previews to the reviewer come from here; replies to it are dropped. */
export const REVIEW_FROM = `Kaluta Feedback <feedback@${FEEDBACK_DOMAIN}>`;

export const GITHUB_REPO = "audiojak/kaluta";
export const BUG_LABEL = "bug";
export const FEATURE_LABEL = "feature-request";

/** A screenshot larger than this is left out, and the report says so. */
export const MAX_SCREENSHOT_BYTES = 8 * 1024 * 1024;
/** SpamAssassin's own default threshold. */
export const SPAM_SCORE_LIMIT = 5;
/** How long a review link works. */
export const REVIEW_LINK_DAYS = 30;
/** How far a webhook's timestamp may be from now. */
export const SIGNATURE_TOLERANCE_SECONDS = 5 * 60;

export class MissingSetting extends Error {
  constructor(name: string) {
    super(`${name} is not set`);
  }
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new MissingSetting(name);
  return value;
}

export const settings = {
  primitiveApiKey: () => required("PRIMITIVE_API_KEY"),
  primitiveWebhookSecret: () => required("PRIMITIVE_WEBHOOK_SECRET"),
  linkSecret: () => required("FEEDBACK_LINK_SECRET"),
  reviewer: () => required("FEEDBACK_REVIEWER"),
  githubAppId: () => required("GITHUB_APP_ID"),
  githubInstallationId: () => required("GITHUB_APP_INSTALLATION_ID"),
  /** Vercel keeps the key's line breaks; a pasted one may have them escaped. */
  githubPrivateKey: () => required("GITHUB_APP_PRIVATE_KEY").replace(/\\n/g, "\n"),
  githubWebhookSecret: () => required("GITHUB_WEBHOOK_SECRET"),
  /** Where review links point. Set FEEDBACK_BASE_URL to test off production. */
  baseUrl: () => process.env.FEEDBACK_BASE_URL || SITE_URL,
};
