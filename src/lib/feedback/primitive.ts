// Primitive (the mail service behind support.kaluta.org), as far as the
// feedback handler uses it. Kept in one file so the service can be changed.

import { settings } from "./config";

const API = "https://api.primitive.dev/v1";

export class PrimitiveError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

async function failure(response: Response): Promise<PrimitiveError> {
  let code = "unknown";
  let message = `Primitive answered ${response.status}`;
  try {
    const body = (await response.json()) as { error?: { code?: string; message?: string } };
    code = body.error?.code ?? code;
    message = body.error?.message ?? message;
  } catch {
    // Not JSON: the status is all there is.
  }
  return new PrimitiveError(response.status, code, message);
}

function authorized(init: RequestInit = {}): RequestInit {
  return { ...init, headers: { ...init.headers, Authorization: `Bearer ${settings.primitiveApiKey()}` } };
}

/** The part of a webhook's `email.received` event the handler reads. */
export interface ReceivedEvent {
  id?: string;
  event?: string;
  email?: {
    id?: string;
    automated?: boolean;
    smtp?: { mail_from?: string; rcpt_to?: string[] };
    headers?: { subject?: string | null; from?: string | null; message_id?: string | null };
    parsed?: {
      body_text?: string | null;
      attachments?: { filename?: string | null; content_type?: string; size_bytes?: number }[];
      attachments_download_url?: string | null;
    };
    analysis?: { spamassassin?: { score?: number }; sender?: { authenticated?: boolean } };
  };
}

/** A stored email (`GET /emails/{id}`): the fields the handler reads. */
export interface StoredEmail {
  id: string;
  message_id?: string | null;
  from_email?: string | null;
  to_email?: string | null;
  subject?: string | null;
  body_text?: string | null;
  content_discarded_at?: string | null;
}

export async function getEmail(id: string): Promise<StoredEmail> {
  const response = await fetch(`${API}/emails/${encodeURIComponent(id)}`, authorized());
  if (!response.ok) throw await failure(response);
  return ((await response.json()) as { data: StoredEmail }).data;
}

/** An email's attachments as a tar.gz; null when it has none or they are gone. */
export async function downloadAttachments(id: string): Promise<Buffer | null> {
  const response = await fetch(`${API}/emails/${encodeURIComponent(id)}/attachments.tar.gz`, authorized());
  if ([404, 409, 410].includes(response.status)) return null;
  if (!response.ok) throw await failure(response);
  return Buffer.from(await response.arrayBuffer());
}

export interface OutgoingMail {
  from: string;
  to: string;
  subject: string;
  bodyText: string;
  inReplyTo?: string | null;
  attachment?: { filename: string; contentType: string; data: Buffer };
  /** Sends with the same key are sent once. */
  idempotencyKey: string;
}

export async function sendMail(mail: OutgoingMail): Promise<void> {
  const body: Record<string, unknown> = {
    from: mail.from,
    to: mail.to,
    subject: mail.subject,
    body_text: mail.bodyText,
    // Our own notices are automatic mail: no auto-replies, please.
    headers: { "Auto-Submitted": "auto-generated", "X-Auto-Response-Suppress": "All" },
  };
  if (mail.inReplyTo) {
    body.in_reply_to = mail.inReplyTo;
    body.references = [mail.inReplyTo];
  }
  if (mail.attachment) {
    body.attachments = [
      {
        filename: mail.attachment.filename,
        content_type: mail.attachment.contentType,
        content_base64: mail.attachment.data.toString("base64"),
      },
    ];
  }
  const response = await fetch(
    `${API}/send-mail`,
    authorized({
      method: "POST",
      headers: { "Content-Type": "application/json", "Idempotency-Key": mail.idempotencyKey },
      body: JSON.stringify(body),
    }),
  );
  if (!response.ok) throw await failure(response);
}

/**
 * Delete an email's body and attachments at Primitive, keeping who sent it.
 * False when the account has not turned discarding on (Settings › Webhooks).
 */
export async function discardContent(id: string): Promise<boolean> {
  const response = await fetch(
    `${API}/emails/${encodeURIComponent(id)}/discard-content`,
    authorized({ method: "POST", headers: { "Idempotency-Key": `feedback-discard-${id}` } }),
  );
  if (response.status === 403 || response.status === 404) return false;
  if (!response.ok) throw await failure(response);
  return true;
}
