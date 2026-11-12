// The Blob store (kaluta-feedback): approved screenshots, and one small
// record per reviewed report so a report is decided once. The store is
// public, so a record holds nothing private: a decision and an issue link,
// under the report's unguessable Primitive email id.

import { BlobNotFoundError, del, head, put } from "@vercel/blob";
import type { Screenshot } from "./archive";

export type Decision =
  | { state: "approved"; issueNumber: number; issueUrl: string }
  | { state: "rejected" };

const claimPath = (emailId: string) => `decisions/${emailId}.claim`;
const decisionPath = (emailId: string) => `decisions/${emailId}.json`;

/** True for the first caller only: a blob that exists is not overwritten. */
export async function claim(emailId: string): Promise<boolean> {
  try {
    await put(claimPath(emailId), new Date().toISOString(), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: "text/plain",
    });
    return true;
  } catch (error) {
    if (await exists(claimPath(emailId))) return false;
    throw error;
  }
}

/** Give a claim back after a failure, so the review can be tried again. */
export async function release(emailId: string): Promise<void> {
  await del(claimPath(emailId));
}

async function exists(path: string): Promise<boolean> {
  try {
    await head(path);
    return true;
  } catch (error) {
    if (error instanceof BlobNotFoundError) return false;
    throw error;
  }
}

export async function recordDecision(emailId: string, decision: Decision): Promise<void> {
  await put(decisionPath(emailId), JSON.stringify(decision), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

/** What was decided; "pending" while a claim is held and nothing is recorded yet. */
export async function decisionFor(emailId: string): Promise<Decision | "pending" | null> {
  try {
    const found = await head(decisionPath(emailId));
    const response = await fetch(found.url, { cache: "no-store" });
    if (response.ok) return (await response.json()) as Decision;
  } catch (error) {
    if (!(error instanceof BlobNotFoundError)) throw error;
  }
  return (await exists(claimPath(emailId))) ? "pending" : null;
}

/** Publish a screenshot; its address goes in the issue. */
export async function publishScreenshot(emailId: string, screenshot: Screenshot): Promise<string> {
  const stored = await put(`screenshots/${emailId}.${screenshot.extension}`, screenshot.data, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: screenshot.contentType,
  });
  return stored.url;
}

export async function removeScreenshot(url: string): Promise<void> {
  await del(url);
}
