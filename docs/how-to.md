# How To Guide – finance.aileena.xyz

Quick reference for common operations and workflows.

## First-Time Setup

### 1. Configure GitHub Secrets
Repository Settings → Secrets and variables → Actions → New repository secret

Add these secrets:
```
FMP_API_KEY              Your Financial Modeling Prep API key
ALPHA_VANTAGE_API_KEY    Your Alpha Vantage API key
POLYGON_API_KEY          Your Polygon.io API key
PRICE_ALERT_WEBHOOK      (Optional) Slack/Discord webhook URL
```

### 2. Enable GitHub Pages
Repository Settings → Pages → Source: **GitHub Actions**

### 3. Configure DNS
At your domain registrar (for aileena.xyz):
- Record type: **CNAME**
- Name: **finance**
- Value: **lilaclilac09.github.io**

Verify: `dig finance.aileena.xyz` (allow 5 min to 24 hrs for propagation)

---

## Common Tasks

### Add a New Company
```bash
npm run content -- add-company \
  --symbol NVDA \
  --name "NVIDIA Corporation" \
  --sector "Semiconductors" \
  --price "$950.00"

npm run validate:data
git add . && git commit -m "content: add NVDA" && git push
```

### Update Company Price
```bash
npm run content -- update-company-price --symbol HLT --price "$305.50"
git add . && git commit -m "content: update HLT price" && git push
```

### Deactivate a Company
```bash
npm run content -- deactivate-company --symbol XYZ
git add . && git commit -m "content: deactivate XYZ" && git push
```

### Add a Data Source
```bash
npm run content -- add-source \
  --id iex \
  --name "IEX Cloud" \
  --type price_and_fundamentals \
  --endpoint "https://cloud.iexapis.com/stable"

# Edit data/sources.json to add apiKeyEnv, mapping, cron schedule
# Then enable it:
npm run content -- enable-source --id iex
git add . && git commit -m "source: add IEX Cloud connector" && git push
```

### Enable/Disable Data Sources
```bash
# Enable automated price pulls from a source
npm run content -- enable-source --id fmp

# Disable a source temporarily
npm run content -- disable-source --id fmp

# Permanently deprecate a source
npm run content -- deprecate-source --id alpha_vantage
```

### Run Scheduled Jobs Locally
```bash
# Test data refresh (uses enabled sources in data/sources.json)
npm run data:refresh

# Test price alerts (checks for threshold breaches)
npm run alerts:check
```

---

## Deployment

### Deploy Changes to Production
```bash
# Make your changes (add companies, update prices, etc.)
npm run validate:data        # Verify data integrity
npm run build:prod           # Test production build locally

git add .
git commit -m "content: your change description"
git push origin main         # Triggers auto-deploy
```

### Monitor Deployment
1. Go to GitHub repo → Actions tab
2. Watch `deploy-pages` workflow
3. Once complete (green checkmark), visit `https://finance.aileena.xyz`

### Rollback a Bad Deployment
```bash
git log --oneline -5         # Find last good commit hash
git revert HEAD              # Or: git reset --hard <commit-hash>
git push origin main         # Redeploys previous version
```

---

## Automation

### Scheduled Workflows

**Daily Market Data Refresh** (Weekdays 11:00 UTC)
- Fetches prices from enabled sources (FMP/Alpha Vantage/Polygon)
- Updates `data/companies.json`
- Auto-commits changes

**Price Alerts** (Weekdays 13:30–20:00 UTC, every 30 min)
- Detects threshold moves ≥5% (configurable via `PRICE_ALERT_THRESHOLD_PCT`)
- Sends webhook notification if `PRICE_ALERT_WEBHOOK` is set

### Manually Trigger Workflows
Repository → Actions → Select workflow → Run workflow button

---

## Troubleshooting

### Build Fails
```bash
npm run validate:data        # Check for schema errors
npm install                  # Reinstall dependencies
npm run build:prod           # Local test
```

Common issues:
- Duplicate company symbols → check `data/companies.json`
- Missing required fields → see error message
- Invalid JSON → use a JSON validator

### Data Refresh Fails
1. Check workflow logs in Actions tab
2. Verify API keys are set in Secrets
3. Check source status in `data/sources.json` (must be `enabled: true`)
4. Test locally: `npm run data:refresh`

### Price Alerts Not Working
- Verify `PRICE_ALERT_WEBHOOK` secret is set
- Check webhook URL is valid (test with curl)
- Confirm threshold is met (default 5%)
- Check workflow logs for error messages

### Site Not Loading
- Verify GitHub Pages is enabled (Settings → Pages)
- Check DNS CNAME is correct: `dig finance.aileena.xyz`
- Wait for DNS propagation (can take up to 24 hrs)
- Check `deploy-pages` workflow completed successfully

---

## Working with Agents/Copilot

### Agent-Safe Operations
Agents can safely perform these via CLI:
```bash
npm run content -- add-company --symbol ... --name ... --sector ...
npm run content -- update-company-price --symbol ... --price ...
npm run content -- enable-source --id ...
npm run content -- disable-source --id ...
```

### Agent Guardrails
See `.instructions.md` for full rules. Key constraints:
- Agents must run `npm run validate:data` after edits
- Agents must run `npm run build:prod` before committing
- Agents cannot modify security/auth architecture without approval
- Agents cannot delete historical content

### Request Mapping
Natural language → CLI command:
- "add NVDA stock" → `add-company --symbol NVDA ...`
- "update Tesla price" → `update-company-price --symbol TSLA ...`
- "turn on Polygon source" → `enable-source --id polygon`
- "pause FMP feed" → `disable-source --id fmp`

---

## File Structure Reference

```
data/
  companies.json       Company registry (symbol, name, price, status)
  indexes.json         Benchmark index tracking
  sources.json         Data provider configuration
  price-alert-state.json   Alert tracking state

scripts/
  manage-content.mjs   Content CLI (add/update/deactivate)
  validate-data.mjs    Schema validation
  data-refresh.mjs     Scheduled price fetching
  price-alerts.mjs     Threshold detection + webhook

.github/workflows/
  content-governance.yml   PR/push validation
  deploy-pages.yml         Production deployment
  data-refresh.yml         Scheduled data pulls
  price-alerts.yml         Scheduled threshold checks
```

---

## Quick Command Reference

```bash
# Content management
npm run content -- --help

# Data validation
npm run validate:data

# Build & deploy
npm run build:prod
npm run deploy:pages

# Local testing
npm run data:refresh
npm run alerts:check

# Development
npm run dev
```

---

## Getting Help

**Documentation:**
- `deployment.md` — Full deployment runbook
- `workflow.md` — Day-to-day change workflow
- `content-workflow.md` — Content governance rules
- `agent-workflow.md` — Agent integration guide
- `operations.md` — Incident handling
- `todo.md` — Launch checklist

**Common Issues:**
- Build errors → Check `npm run validate:data` output
- Workflow failures → Check Actions tab logs
- Data problems → Review schema in validation script
- DNS issues → Use `dig` to verify CNAME propagation

**Recovery:**
- Broken deploy → `git revert HEAD && git push`
- Bad data → Restore from git history: `git checkout HEAD~1 -- data/`
- Failed workflow → Re-run manually from Actions tab
