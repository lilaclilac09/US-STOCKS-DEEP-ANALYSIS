# Security

A practical audit of how this app handles secrets and untrusted input. Read this before adding a new API key or a new serverless endpoint.

## Architecture in one paragraph

This is a Vite + React static frontend deployed to GitHub Pages and/or Vercel. When deployed on Vercel, the `api/` directory becomes serverless functions (Node runtime). Optional Supabase provides watchlist persistence. Optional PayloadCMS (in `payload/`) is a separate Node backend that can host editable content.

## Public vs secret

| Tier | Where the value lives at runtime | Examples |
|------|----------------------------------|----------|
| **Public** | Inlined into the JavaScript bundle (anyone can `view-source`) | Anything prefixed `VITE_*` in `.env.example` |
| **Server-only** | Read from `process.env` inside a Vercel serverless function or the Payload backend | `RESEND_API_KEY`, `PAYLOAD_SECRET`, `DATABASE_URL` |

The Vite docs are explicit about this — `VITE_*` is the contract for "this is OK to expose publicly." Never put a value behind `VITE_*` unless you are fine with the entire internet reading it. Provider-restricted keys (e.g., Finnhub free tier, Supabase anon keys with RLS) are reasonable to expose. API keys with billing or PII access are not.

## Known issues to fix

### 1. Gemini key is wired wrong (latent bug)

`src/services/analysisService.ts` (post-refactor location) reads `process.env.API_KEY` directly. That code runs in the browser, where `process.env` does not exist — the key resolves to `undefined` at runtime, and the Gemini call silently fails. So either:

- **Recommended:** add `api/gemini-proxy.ts` as a serverless function. The browser POSTs the prompt to that endpoint; the function reads the real Gemini key from `process.env.GEMINI_API_KEY` (server-side, never bundled) and forwards to Gemini. The browser never sees the key.
- **Quick & insecure:** rename to `VITE_GEMINI_API_KEY` and accept that the key is public. Only acceptable if the key has tight per-domain quotas and you understand the abuse exposure.

### 2. `api/send-alert-email.ts` has hardcoded values

The `from` address (`alert@yourdomain.com`) and `to` address (`your-email@example.com`) are placeholders that will fail in production. Move both to env vars (`ALERT_FROM_EMAIL`, `ALERT_TO_EMAIL`) and validate they are set at function start.

### 3. Serverless functions have no auth or rate limit

`api/companies.ts` reads a local file and is read-only, so it is fine. `api/send-alert-email.ts` triggers an outbound email per POST with no rate limit and no auth — anyone who finds the URL can use your Resend quota to spam an arbitrary recipient. Either:

- Add a shared-secret header check (set `ALERT_TRIGGER_SECRET` server-side, compare against an `x-trigger-secret` header), or
- Move alert triggering to a scheduled CI job in `.github/workflows/price-alerts.yml` and remove the public endpoint entirely.

### 4. Supabase row-level security is assumed, not verified

`src/clients/supabase.ts` uses the anon key from the browser, which is the intended pattern — but only if every table the frontend touches has RLS enabled. There is no test or CI check that enforces this. Document the RLS expectations per table in `payload/README.md` or a dedicated `docs/data-model.md`.

## What is fine as-is

- `VITE_FINNHUB_API_KEY` in the bundle. Finnhub's free tier is rate-limited per IP and the key cannot be used to take destructive action.
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` (anon key) in the bundle, *provided* RLS is on — see issue 4.
- `VITE_PAYLOAD_API_URL` — public URL by design.

## Setting secrets in production (Vercel)

`.env.local` is for local development only and is gitignored. For deployed environments:

1. Vercel project → Settings → Environment Variables.
2. Add each non-`VITE_*` variable with scope "Production" (and "Preview" if needed).
3. Redeploy.

A redeploy is required for env var changes to take effect, including for serverless functions.

## Reporting

If you discover a vulnerability in this repo, open a private GitHub Security Advisory rather than a public issue.
