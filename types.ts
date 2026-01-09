
export interface Financials {
  revenue: string;
  netProfit: string;
  cashFlow: string;
  period: string;
}

export interface Indicators {
  occupancy?: string;
  roic: string;
  roe?: string;
  cashFlow?: string;
  debt: string;
  currentRatio: string;
  leverageNote?: string;
  margin?: string;
  buildup?: string;
  pipeline?: string;
  buyback?: string;
}

export interface StockData {
  symbol: string;
  fullName: string;
  mainBusiness: string;
  financials: Financials;
  indicators: Indicators;
  latestDevelopments: string[];
  currentPrice: string;
}
