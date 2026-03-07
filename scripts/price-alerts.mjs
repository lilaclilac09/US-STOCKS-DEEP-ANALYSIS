import fs from 'fs';
import path from 'path';

const root = process.cwd();
const companiesPath = path.join(root, 'data/companies.json');
const alertsPath = path.join(root, 'data/price-alert-state.json');

const THRESHOLD_PCT = Number(process.env.PRICE_ALERT_THRESHOLD_PCT || '5');

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function parsePrice(price) {
  const cleaned = String(price || '').replace(/[$,]/g, '').trim();
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

async function postWebhook(webhookUrl, thresholdPct, alerts) {
  const body = {
    timestamp: new Date().toISOString(),
    thresholdPct,
    count: alerts.length,
    alerts,
    text: `Price alert: ${alerts.length} symbol(s) crossed ${thresholdPct}%`,
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Webhook post failed with status ${response.status}`);
  }
}

async function main() {
  const companies = readJson(companiesPath, { companies: [] });
  const previous = readJson(alertsPath, { bySymbol: {} });
  const next = { bySymbol: {} };

  const alerts = [];

  for (const company of companies.companies) {
    const symbol = company.symbol;
    const current = parsePrice(company.currentPrice);
    const prior = previous.bySymbol[symbol];

    if (current !== null && typeof prior === 'number' && prior > 0) {
      const pct = ((current - prior) / prior) * 100;
      if (Math.abs(pct) >= THRESHOLD_PCT) {
        alerts.push({ symbol, prior, current, pct: Number(pct.toFixed(2)) });
      }
    }

    if (current !== null) {
      next.bySymbol[symbol] = current;
    }
  }

  writeJson(alertsPath, next);

  if (!alerts.length) {
    console.log(`No alerts above ${THRESHOLD_PCT}% threshold.`);
    return;
  }

  console.log(`Price alerts above ${THRESHOLD_PCT}%:`);
  for (const alert of alerts) {
    console.log(`${alert.symbol}: ${alert.prior} -> ${alert.current} (${alert.pct}%)`);
  }

  if (process.env.PRICE_ALERT_WEBHOOK) {
    await postWebhook(process.env.PRICE_ALERT_WEBHOOK, THRESHOLD_PCT, alerts);
    console.log('Webhook notification delivered.');
  } else {
    console.log('No webhook configured; alerts only logged to console.');
  }
}

main().catch((error) => {
  console.error(`Price alert run failed: ${error.message}`);
  process.exit(1);
});
