// src/services/dataService.ts
// 纯静态 + 任意数据中心一键切换（你随便加 key 就行）

import mockStocks from '../../data/companies.json';
import type { StockData } from '../types';

const PROVIDER = import.meta.env.VITE_ACTIVE_DATA_PROVIDER || 'mock';

console.log(`🚀 当前数据源：${PROVIDER}`);

// ================ 未来随便加新数据中心，就在这里加一个 case ================
async function fetchFromProvider(): Promise<StockData[]> {
  switch (PROVIDER) {
    case 'polygon':
      return fetchPolygonData();
    case 'finnhub':
      return fetchFinnhubData();
    case 'alphavantage':
      return fetchAlphaVantageData();
    case 'yahoo':
      return fetchYahooData();
    // case 'new_datacenter':
    //   return fetchNewDatacenterData();
    default:
      console.log('使用纯静态 mock 数据（零 key）');
      return mockStocks as StockData[];
  }
}

// ==================== 各数据源实现模板（已写好 Polygon 示例） ====================
async function fetchPolygonData(): Promise<StockData[]> {
  const apiKey = import.meta.env.VITE_POLYGON_API_KEY;
  if (!apiKey) throw new Error('缺少 VITE_POLYGON_API_KEY');
  // 示例：拉取多只股票快照（你可改成你需要的 endpoint）
  const symbols = ['AAPL', 'TSLA', 'NVDA']; // 可从你的 watchlist 动态取
  const res = await fetch(
    `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=${apiKey}`
  );
  const data = await res.json();
  // 这里你可写转换逻辑（把 Polygon 数据转成你的 StockData 类型）
  return transformToStockData(data.tickers || []);
}

async function fetchFinnhubData(): Promise<StockData[]> {
  const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;
  if (!apiKey) throw new Error('缺少 VITE_FINNHUB_API_KEY');
  // 写你的 Finnhub 请求...
  console.log('Finnhub 数据源已接入');
  return mockStocks as StockData[]; // 临时返回 mock，后面你补真实转换
}

// 其他数据源同理（Alpha Vantage / Yahoo / 任意数据中心）...
async function fetchAlphaVantageData() { /* 同上模板 */ return mockStocks as StockData[]; }
async function fetchYahooData() { /* 同上模板 */ return mockStocks as StockData[]; }

// 转换函数（你以后可完善）
function transformToStockData(raw: any[]): StockData[] {
  return raw.map(item => ({
    symbol: item.ticker || item.symbol,
    fullName: item.name || '',
    currentPrice: item.lastQuote?.price || item.price || 0,
    // ... 其他字段你根据实际 API 补
    indicators: {},
    klineData: [],
  }));
}

// ==================== 对外暴露接口（App.tsx 等直接调用） ====================
export async function fetchStocks(): Promise<StockData[]> {
  return fetchFromProvider();
}

export async function fetchStockDetail(symbol: string): Promise<StockData> {
  const all = await fetchStocks();
  return all.find(s => s.symbol === symbol) || all[0];
}

// 一键切换函数（可选）
export function switchDataProvider(provider: string) {
  // 你可以在设置页面调用这个（后面可加）
  console.log(`切换到 ${provider} 数据源，重启项目生效`);
}
