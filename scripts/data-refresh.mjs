import fs from 'fs';
import path from 'path';

const root = process.cwd();
const sourcesPath = path.join(root, 'data/sources.json');
const companiesPath = path.join(root, 'data/companies.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function parsePrice(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function formatUsd(num) {
  return `$${num.toFixed(2)}`;
}

function getApiKeyForSource(source) {
  const envVar = source.apiKeyEnv || `${String(source.id || '').toUpperCase()}_API_KEY`;
  return process.env[envVar] || '';
}

async function fetchFromFmp(source, symbols) {
  const apiKey = getApiKeyForSource(source);
  if (!apiKey) {
    throw new Error('Missing API key env for FMP source');
  }

  const url = `${source.endpoint}/quote/${symbols.join(',')}?apikey=${encodeURIComponent(apiKey)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`FMP request failed: ${response.status}`);
  }

  const payload = await response.json();
  const prices = new Map();
  for (const item of payload) {
    const symbol = String(item.symbol || '').toUpperCase();
    const price = parsePrice(item.price);
    if (symbol && price !== null) {
      prices.set(symbol, price);
    }
  }
  return prices;
}

async function fetchFromAlphaVantage(source, symbols) {
  const apiKey = getApiKeyForSource(source);
  if (!apiKey) {
    throw new Error('Missing API key env for Alpha Vantage source');
  }

  const prices = new Map();
  for (const symbol of symbols) {
    const url = `${source.endpoint}?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Alpha Vantage request failed for ${symbol}: ${response.status}`);
    }
    const payload = await response.json();
    const quote = payload['Global Quote'] || {};
    const price = parsePrice(quote['05. price']);
    if (price !== null) {
      prices.set(symbol, price);
    }
  }

  return prices;
}

async function fetchFromPolygon(source, symbols) {
  const apiKey = getApiKeyForSource(source);
  if (!apiKey) {
    throw new Error('Missing API key env for Polygon source');
  }

  const prices = new Map();
  for (const symbol of symbols) {
    const url = `${source.endpoint}/aggs/ticker/${encodeURIComponent(symbol)}/prev?adjusted=true&apiKey=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Polygon request failed for ${symbol}: ${response.status}`);
    }
    const payload = await response.json();
    if (payload.results && payload.results.length > 0) {
      const close = parsePrice(payload.results[0].c);
      if (close !== null) {
        prices.set(symbol, close);
      }
    }
  }

  return prices;
}

async function fetchPricesForSource(source, symbols) {
  if (source.id === 'fmp') {
    return fetchFromFmp(source, symbols);
  }
  if (source.id === 'alpha_vantage') {
    return fetchFromAlphaVantage(source, symbols);
  }
  if (source.id === 'polygon') {
    return fetchFromPolygon(source, symbols);
  }

  throw new Error(`No connector implemented for source id: ${source.id}`);
}

async function main() {
  const sources = readJson(sourcesPath);
  const companies = readJson(companiesPath);

  const activeSources = sources.sources.filter((s) => s.enabled && s.status !== 'deprecated');
  const refreshedAt = new Date().toISOString();
  const activeCompanies = companies.companies.filter((company) => company.status !== 'inactive');
  const symbols = activeCompanies.map((company) => String(company.symbol).toUpperCase());

  const mergedPrices = new Map();
  const refreshLog = [];

  for (const source of activeSources) {
    try {
      const sourcePrices = await fetchPricesForSource(source, symbols);
      for (const [symbol, price] of sourcePrices.entries()) {
        if (!mergedPrices.has(symbol)) {
          mergedPrices.set(symbol, {
            price,
            sourceId: source.id,
          });
        }
      }
      refreshLog.push(`${source.id}: ok (${sourcePrices.size} symbols)`);
    } catch (error) {
      refreshLog.push(`${source.id}: failed (${error.message})`);
    }
  }

  for (const company of companies.companies) {
    const update = mergedPrices.get(String(company.symbol).toUpperCase());
    if (update) {
      company.currentPrice = formatUsd(update.price);
      company.lastPriceSource = update.sourceId;
    }
    company.lastRefreshedAt = refreshedAt;
  }

  writeJson(companiesPath, companies);

  console.log(`Data refresh completed at ${refreshedAt}`);
  console.log(`Active sources: ${activeSources.map((s) => s.id).join(', ') || 'none'}`);
  console.log(`Updated prices for ${mergedPrices.size} symbols`);
  if (refreshLog.length) {
    console.log(refreshLog.join('\n'));
  }
}

main().catch((error) => {
  console.error(`Data refresh failed: ${error.message}`);
  process.exit(1);
});
