# Operations Runbook

## Current Security Posture
- Gemini key is frontend-injected for speed.
- Risk: key can be extracted from client bundle.
- Mitigation target (future): backend proxy with server-side key storage.

## Secrets
Use GitHub repository secrets for automation workflows:
- `PRICE_ALERT_WEBHOOK` (optional)
- `FMP_API_KEY` (when enabling FMP source)
- `ALPHA_VANTAGE_API_KEY` (when enabling Alpha Vantage source)

## Scheduled Jobs
- Data refresh: weekdays at market-open-aligned schedule
- Price alerts: weekdays, recurring interval

## Incident Handling
### Data refresh failed
1. Check workflow logs (`data-refresh.yml`)
2. Confirm source status in `data/sources.json`
3. Re-run workflow manually
4. If provider down, disable source and open issue

### Price alerts failed
1. Check webhook secret exists
2. Re-run `price-alerts.yml`
3. Confirm thresholds and price payload parsing

## Manual Recovery
- Revert last bad commit
- Re-run deployment pipeline
- Validate live site on `finance.aileena.xyz`

## Future Hardening Backlog
- Move Gemini calls behind backend/API route
- Add schema validation with AJV or Zod
- Add integration tests for source mappers
