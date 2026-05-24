# Deployment Runbook (GitHub Pages + finance.aileena.xyz)

## Goal
Deploy this app to GitHub Pages and serve it from `https://finance.aileena.xyz` without Vercel.

## Pre-Deploy Checklist
- `npm install`

- `npm run validate:data`
- `npm run build:prod`

## Domain Model
This repo is configured for custom-domain root hosting (not a path subfolder):
- Host: `finance.aileena.xyz`
- Vite base path default: `/`
- `public/CNAME` contains `finance.aileena.xyz`

If you later move to subpath hosting, set `VITE_BASE_PATH` to something like `/stocks/` before build.

## GitHub Pages Setup
1. Push `main` to GitHub.
2. In repo settings, open Pages.
3. Source: `GitHub Actions`.
4. Ensure workflow `deploy-pages` (in `.github/workflows/deploy-pages.yml`) can run on `workflow_dispatch` and main pushes.
5. `data-refresh-and-deploy` (in `.github/workflows/data-refresh.yml`) is schedule/manual for data updates.

## DNS Setup
At your DNS provider for `aileena.xyz`:
- Add `CNAME` record:
  - Name/Host: `finance`
  - Value/Target: `<your-github-username>.github.io`

Wait for propagation, then verify:
- `dig finance.aileena.xyz`
- open `https://finance.aileena.xyz`

## Release Procedure
1. Pull latest main.
2. Update content via CLI (`npm run content -- ...`) or direct data edits.
3. Run local checks:
   - `npm run validate:data`
   - `npm run build:prod`
4. Commit and push.
5. Confirm GitHub Actions passed.
6. Validate live page after deployment.

## Rollback
- Revert to previous commit on `main`.
- Push revert.
- Confirm Pages redeploy succeeded.

## Known Risk

