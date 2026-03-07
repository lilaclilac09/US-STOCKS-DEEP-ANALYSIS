# Content Workflow

## Source of Truth
- Companies: `data/companies.json`
- Indexes: `data/indexes.json`
- Data sources: `data/sources.json`

## Rules
- Keep ticker symbols uppercase.
- Never delete historical context abruptly; prefer `status: inactive`.
- Add concise notes when changing business-critical entries.
- Data source entries must include endpoint, refresh schedule, and mapping notes.

## Review Gates
Before merge/deploy:
1. `npm run validate:data`
2. `npm run build:prod`
3. Check workflow status in GitHub Actions

## Change Categories
- Minor: price update, note update, status toggle
- Medium: add company/index/source
- Major: source migration, schema changes, automated refresh logic updates

## Audit Trail
Use commit message prefixes:
- `content:` for company/index updates
- `source:` for data-source registry updates
- `ops:` for automation/workflow changes

Example:
- `content: add NVDA to tracked companies`
- `source: register polygon planned connector`
