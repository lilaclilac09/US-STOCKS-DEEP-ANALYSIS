# US Stocks Deep Analysis

A Vite + React + TypeScript app for US growth-stock analysis, AI-assisted research, watchlist workflows, and cislunar (lunar economy) ecosystem mapping.

## Live

- Production: <https://finance.aileena.xyz>

## Features

- Stock cards with fundamentals, indicators, KLine charts, and price alerts
- Watchlist with drag-and-drop ordering, category grouping, and per-symbol notes
- Cislunar ecosystem map: tier 1/2/3 space companies with TRL and risk profiles
- Optional PayloadCMS backend for editable content (auto-falls back to local JSON when offline)
- Data refresh via Python + Node scripts (fundamentals, prices, generated markdown)

## Local run

Requires Node.js 20+.

```bash
npm install
npm run dev          # frontend only — Vite on :3000
# or
npm run dev:all      # frontend + PayloadCMS backend together
```

Full local-dev walkthrough (PayloadCMS, fallback verification, admin UI): see [docs/quickstart.md](docs/quickstart.md).

## Environment

Copy `.env.example` to `.env.local` and fill in only what you need.

| Var | Purpose | Required |
|-----|---------|----------|
| `VITE_ACTIVE_DATA_PROVIDER` | `mock` (default) / `polygon` / `finnhub` / `alphavantage` / `yahoo` | yes — defaults to `mock` |
| `VITE_POLYGON_API_KEY` / `VITE_FINNHUB_API_KEY` / `VITE_ALPHAVANTAGE_API_KEY` / `VITE_YAHOO_API_KEY` | Provider-specific price data | only the one you select |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | Watchlist + stock cache persistence | only if using Supabase |
| `VITE_RESEND_API_KEY` | Outbound email for price alerts (server-side via `api/send-alert-email.ts`) | only if using alerts |

## Data

Content lives in `data/`:

- `data/companies.json` — equity universe (fundamentals, indicators, narrative)
- `data/indexes.json` — index definitions
- `data/sources.json` — data source registry

Tooling:

```bash
npm run validate:data         # schema-validate JSON content
npm run content -- --help     # admin CLI for content edits
npm run update:all            # python refreshers (fundamentals + cislunar + markdown)
```

## Deploy

Two supported targets:

- **GitHub Pages** at `finance.aileena.xyz` — runbook in [docs/deployment.md](docs/deployment.md)
- **Vercel** — `vercel.json` plus serverless functions under `api/`; trigger with `./deploy-vercel.sh`

## Security

The app currently bakes `VITE_*` env vars into the static bundle, which means **any value in a `VITE_*` variable is publicly visible** in the deployed JavaScript. Treat this repo as a public demo until the keys are moved behind serverless proxies in `api/`. A full audit will land in `docs/security.md`.

## Docs

| Doc | When to read |
|-----|--------------|
| [quickstart.md](docs/quickstart.md) | First-time local setup with PayloadCMS |
| [how-to.md](docs/how-to.md) | Common day-to-day tasks |
| [deployment.md](docs/deployment.md) | Release runbook |
| [workflow.md](docs/workflow.md) | Change workflow & branching |
| [content-workflow.md](docs/content-workflow.md) | Content governance & edit flow |
| [agent-workflow.md](docs/agent-workflow.md) | AI agent integration notes |
| [operations.md](docs/operations.md) | Incident handling |
| [payloadcms-implementation.md](docs/payloadcms-implementation.md) | Backend architecture |
| [todo.md](docs/todo.md) | Launch checklist |
