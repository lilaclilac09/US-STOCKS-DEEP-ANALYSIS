<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# US Stocks Deep Analysis

This is a Vite + React + TypeScript app for US growth-stock analysis and cislunar ecosystem mapping.

## Local Run

**Prerequisites:** Node.js 20+

1. Install dependencies: `npm install`
2. Set `GEMINI_API_KEY` in `.env.local`
3. Start development server: `npm run dev`

## Production Target

This repository is prepared for static hosting on GitHub Pages with a custom domain:
- `finance.aileena.xyz`

See `DEPLOYMENT.md` for full release and DNS steps.

## Content Management

Structured content and source registry are under `data/`:
- `data/companies.json`
- `data/indexes.json`
- `data/sources.json`

Validate content schema:
- `npm run validate:data`

Run the admin CLI:
- `npm run content -- --help`

Workflow docs:
- `WORKFLOW.md`
- `CONTENT_WORKFLOW.md`
- `AGENT_WORKFLOW.md`
- `OPERATIONS.md`

## Automation

CI and scheduled automation files are in `.github/workflows/`:
- `content-governance.yml`
- `deploy-pages.yml`
- `data-refresh.yml`
- `price-alerts.yml`

## Security Note

`GEMINI_API_KEY` is currently injected into the frontend build for speed. This is convenient but not secure for high-risk production workloads. See `OPERATIONS.md` for migration guidance to a backend proxy.
