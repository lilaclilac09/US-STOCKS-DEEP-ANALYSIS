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

## Automated Data Pipeline

The pipeline automatically fetches and updates equity fundamentals and cislunar mission data, generating Markdown files for each company.

### Schedule (GitHub Actions)
- **Daily at 12 PM UTC** (weekdays): Price refresh from enabled sources
- **Weekly (Monday 8 AM UTC)**: Full fundamentals refresh (RCL, MU, LLY, MAR, HLT) + Markdown generation
- **Monthly (1st day 9 AM UTC)**: Cislunar mission data refresh + Markdown generation

### Manual Trigger
1. **Run full refresh locally**:
	```bash
	python3 scripts/fetch-fundamentals.py  # Fetch all equity data
	python3 scripts/fetch-cislunar.py      # Fetch NASA CLPS missions
	python3 scripts/generate-markdown.py   # Generate content/*.md files
	```

2. **Refresh single equity data**:
	```bash
	python3 scripts/fetch-fundamentals.py --ticker RCL --output data/fundamentals.json
	```

3. **Trigger GitHub Actions manually**:
	- Go to Actions tab → "data-refresh-and-deploy" → "Run workflow"
	- This will run all fetchers, generate Markdown, and commit changes

4. **Advanced: Custom pipeline**:
	```bash
	# Fetch fresh data
	python3 scripts/fetch-fundamentals.py
	python3 scripts/fetch-cislunar.py
   
	# Generate Markdown from updated data
	python3 scripts/generate-markdown.py --output-dir content/
   
	# Review changes and commit
	git diff content/
	git add content/ data/
	git commit -m "docs: update equity and cislunar content"
	git push
	```

### Output Structure
- **Fundamentals**: `data/fundamentals.json` (revenue, EPS, guidance, latest news)
- **Cislunar**: `data/cislunar.json` (mission providers, landing sites, 2026 targets)
- **Equity Docs**: `content/equities/{ticker}.md` (auto-generated from fundamentals)
- **Cislunar Docs**: `content/cislunar/tier{1,2,3}/*.md` (mission providers by tier)

### Editing Generated Content
- Markdown files are AI-editable; Cursor/Claude can regenerate or tweak
- React app reads from JSON (`data/companies.json`, `constants.ts`), not Markdown
- To update live app data, modify JSON files or use `npm run content` CLI

## Publish Release
1. `npm run validate:data`
2. `npm run build:prod`
3. Push to `main`
4. Watch Actions workflow status
5. Verify production: `https://finance.aileena.xyz`

## Notes
- For major updates, open a PR first.
- Keep each commit focused (company update vs source update vs docs).
- If data refresh workflow fails, check `operations.md` incident section.
