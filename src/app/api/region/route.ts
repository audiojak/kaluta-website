// Tells the cookie banner whether the visitor is somewhere that needs
// opt-in consent for analytics cookies: the EU and EEA (ePrivacy Directive)
// and the UK (PECR). Vercel sets x-vercel-ip-country from the request's IP
// address; nothing is stored.
const CONSENT_COUNTRIES = new Set([
  // EU member states
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
  // EU territories with their own country codes
  "AX", "GF", "GP", "MQ", "RE", "YT", "MF",
  // EEA
  "IS", "LI", "NO",
  // UK, the Crown Dependencies and Gibraltar
  "GB", "GG", "JE", "IM", "GI",
]);

export function GET(request: Request) {
  const country = request.headers.get("x-vercel-ip-country");
  // No country (local dev, or Vercel couldn't place the IP): ask, to be safe.
  const consentRequired = !country || CONSENT_COUNTRIES.has(country.toUpperCase());
  return Response.json(
    { consentRequired },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
