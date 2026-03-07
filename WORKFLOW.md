# Website Change Workflow

This file is your day-to-day workflow for upgrading the site whenever you want to publish new finance content.

## Common Actions

### Add a company
1. Run: `npm run content -- add-company --symbol NVDA --name "NVIDIA" --sector "Semiconductors" --price "$950.00"`
2. Validate: `npm run validate:data`
3. Build test: `npm run build:prod`
4. Commit + push

### Update a company price
1. Run: `npm run content -- update-company-price --symbol HLT --price "$305.11"`
2. Validate and build
3. Commit + push

### Remove/deactivate a company
1. Run: `npm run content -- deactivate-company --symbol XYZ`
2. Validate and build
3. Commit + push

### Add or update an index
1. Add: `npm run content -- add-index --id dowjones --name "Dow Jones Industrial Average" --provider "S&P Dow Jones"`
2. Validate and build
3. Commit + push

### Register new data source
1. Run: `npm run content -- add-source --id polygon --name Polygon --type price_and_fundamentals --endpoint "https://api.polygon.io"`
2. Edit extra fields in `data/sources.json` (cron, mapping, notes)
3. Enable source: `npm run content -- enable-source --id polygon`
4. Validate and build

### Run scheduled jobs locally
1. Refresh prices from enabled providers: `npm run data:refresh`
2. Run threshold alerts: `npm run alerts:check`

## Publish Release
1. `npm run validate:data`
2. `npm run build:prod`
3. Push to `main`
4. Watch Actions workflow status
5. Verify production: `https://finance.aileena.xyz`

## Notes
- For major updates, open a PR first.
- Keep each commit focused (company update vs source update vs docs).
- If data refresh workflow fails, check `OPERATIONS.md` incident section.
