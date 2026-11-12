// Which received mail is a report worth a reviewer's time.

import { SPAM_SCORE_LIMIT } from "./config";
import type { ReceivedEvent } from "./primitive";
import { kindFor } from "./report";

/** Why a received email is not a report to review; null when it is one. */
export function reasonToIgnore(event: ReceivedEvent): string | null {
  if (event.event !== "email.received") return "not a received email";
  const email = event.email;
  if (!email?.id) return "no email";
  if (!kindFor(email.smtp?.rcpt_to ?? [])) return "not addressed to bug@ or idea@";
  if (email.automated) return "automatic mail";
  if (email.analysis?.sender?.authenticated !== true) return "sender not authenticated";
  if ((email.analysis?.spamassassin?.score ?? 0) >= SPAM_SCORE_LIMIT) return "spam score";
  return null;
}
