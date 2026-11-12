// The "Kaluta Feedback" GitHub App: issues on audiojak/kaluta, nothing else.

import { createSign } from "node:crypto";
import { GITHUB_REPO, settings } from "./config";

const API = "https://api.github.com";

function base64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

/** A short-lived token that says "I am the App", signed with its key. */
export function appJwt(appId: string, privateKey: string, nowSeconds: number): string {
  const head = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(JSON.stringify({ iat: nowSeconds - 30, exp: nowSeconds + 300, iss: appId }));
  const signature = createSign("RSA-SHA256").update(`${head}.${claims}`).sign(privateKey);
  return `${head}.${claims}.${base64url(signature)}`;
}

async function github(path: string, token: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "kaluta-feedback",
      Authorization: `Bearer ${token}`,
      ...init.headers,
    },
  });
}

async function installationToken(): Promise<string> {
  const jwt = appJwt(settings.githubAppId(), settings.githubPrivateKey(), Math.floor(Date.now() / 1000));
  const response = await github(`/app/installations/${settings.githubInstallationId()}/access_tokens`, jwt, {
    method: "POST",
  });
  if (!response.ok) throw new Error(`GitHub would not issue a token (${response.status})`);
  return ((await response.json()) as { token: string }).token;
}

export interface PublishedIssue {
  number: number;
  url: string;
}

export async function createIssue(title: string, body: string, label: string): Promise<PublishedIssue> {
  const token = await installationToken();
  const create = (labels: string[]) =>
    github(`/repos/${GITHUB_REPO}/issues`, token, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, labels }),
    });
  let response = await create([label]);
  // A label the repository lacks must not lose the report.
  if (response.status === 422) response = await create([]);
  if (!response.ok) throw new Error(`GitHub would not create the issue (${response.status})`);
  const issue = (await response.json()) as { number: number; html_url: string };
  return { number: issue.number, url: issue.html_url };
}
