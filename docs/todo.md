# TODO List – finance.aileena.xyz

## 🚀 Immediate Setup (Before Live)
- [ ] Add GitHub Secrets in repo Settings > Secrets and variables > Actions:
  - [ ] `FMP_API_KEY` – Financial Modeling Prep API key
  - [ ] `ALPHA_VANTAGE_API_KEY` – Alpha Vantage API key
  - [ ] `POLYGON_API_KEY` – Polygon.io API key
  - [ ] `PRICE_ALERT_WEBHOOK` (optional) – Slack/Discord webhook URL for threshold alerts
- [ ] Configure GitHub Pages (Settings > Pages):
  - [ ] Source: **GitHub Actions**
  - [ ] Confirm deploy-pages workflow ran successfully
- [ ] Set up DNS CNAME record at domain registrar:
  - [ ] Name: `finance`
  - [ ] Value: `lilaclilac09.github.io`
  - [ ] Verify with `dig finance.aileena.xyz` (wait 5 min to 24 hrs)

## ✅ Verification
- [ ] Visit `https://finance.aileena.xyz` and confirm page loads
- [ ] Verify asset paths resolve correctly (CSS, JS, icons)
- [ ] Test local CLI: `npm run content -- --help`
- [ ] Test data validation: `npm run validate:data`
- [ ] Test build: `npm run build:prod`

## 📅 Scheduled Operations (Once Live)
- [ ] **Weekdays 11:00 UTC** — `data-refresh.yml` runs
  - Fetches prices from enabled sources (FMP, Alpha Vantage, Polygon)
  - Auto-commits price updates to `data/companies.json`
  - Confirm first run in Actions tab
- [ ] **Weekdays 13:30–20:00 UTC (every 30 min)** — `price-alerts.yml` runs
  - Detects threshold breaches (default 5%)
  - Sends webhook notifications if configured
  - Confirm first run in Actions tab

## 🔧 Operational Maintenance
- [ ] Monitor GitHub Actions workflows for failures
- [ ] Check `operations.md` incident handling guide if any workflow fails
- [ ] Example: enable a source for automated pulls:
  - `npm run content -- enable-source --id fmp`
  - `git add . && git commit -m "ops: enable FMP price feed" && git push`
- [ ] Add new companies as needed:
  - `npm run content -- add-company --symbol NVDA --name "NVIDIA" --sector "Semiconductors" --price "$950"`
  - Validate, build, commit, push

## 🔐 Security Hardening (Future)
- [ ] Migrate Gemini API key from frontend to backend proxy
- [ ] Add role-based access control (RBAC) for content edits
- [ ] Set up audit logging for operator actions
- [ ] Document incident response procedures

## 📊 Data & Automation (Optional Enhancements)
- [ ] Extend data schema: add `fundamentals` field (P/E, dividend yield, market cap)
- [ ] Add more data sources (IEX Cloud, Twelve Data, Alphavantage premium tier)
- [ ] Implement local caching layer for API responses
- [ ] Add per-ticker refresh interval customization in `data/sources.json`
- [ ] Set up email digest for weekly/monthly price summaries

## 📚 Documentation
- [ ] Review and test all docs:
  - [ ] `deployment.md` — deployment cookbook
  - [ ] `workflow.md` — day-to-day change workflow
  - [ ] `content-workflow.md` — content governance
  - [ ] `agent-workflow.md` — agent/copilot integration
  - [ ] `operations.md` — incident runbook
- [ ] Add troubleshooting FAQ section

## 🎯 Agent/Copilot Integration
- [ ] Test future agent workflows against `.instructions.md` rules
- [ ] Verify agent can use `npm run content` CLI safely
- [ ] Set up price alert trigger for agent notifications
- [ ] Document example agent requests and expected outputs

## 📈 Monitoring & Observability
- [ ] Set up GitHub Actions failure notifications
- [ ] Add uptime monitoring (Pingdom, UptimeRobot, or similar)
- [ ] Log workflow execution times and data quality metrics
- [ ] Create dashboard for price refresh health

## 🏁 Launch Checklist
- [ ] All secrets configured ✅
- [ ] DNS CNAME active ✅
- [ ] Site accessible at `https://finance.aileena.xyz` ✅
- [ ] First manual content edit tested (add/update company) ✅
- [ ] First scheduled workflow execution verified ✅
- [ ] Webhook alerts tested (if using) ✅
- [ ] Docs reviewed and understood ✅
- [ ] Incident response plan acknowledged ✅
