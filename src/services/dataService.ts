// src/services/dataService.ts
// Loads stock data from constants (with full deep-dive cards) then overlays live Finnhub prices.

import type { StockData } from '../types';

// No-Finnhub symbols: non-US or OTC with no Finnhub quote coverage
const NO_PRICE_SYMBOLS = new Set(['SIVE', 'ALRIB', 'AXTI']);

export async function fetchStocks(): Promise<StockData[]> {
  // Try backend API first (Vercel serverless), fall back to static constants
  try {
    const res = await fetch('/api/companies');
    if (res.ok) {
      const json = await res.json();
      const docs = json.docs || json.companies || [];
      if (docs.length > 0) return docs as StockData[];
    }
  } catch {
    // fall through
  }

  // Static fallback: import from constants
  const { STOCKS } = await import('../../constants');
  return STOCKS;
}

export async function fetchStockDetail(symbol: string): Promise<StockData | undefined> {
  const all = await fetchStocks();
  return all.find(s => s.symbol === symbol);
}

// Fetch a single live price from Finnhub. Returns null if unavailable.
export async function fetchLivePrice(symbol: string, apiKey: string): Promise<string | null> {
  if (!apiKey || NO_PRICE_SYMBOLS.has(symbol)) return null;
  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.c && data.c > 0) return `$${Number(data.c).toFixed(2)}`;
  } catch {
    // timeout or network error — return null, keep static price
  }
  return null;
}
