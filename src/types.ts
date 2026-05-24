
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
  [key: string]: string | undefined;
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface StockData {
  symbol: string;
  fullName: string;
  mainBusiness: string;
  financials: Financials;
  indicators: Indicators;
  latestDevelopments: string[];
  currentPrice: string;
  category?: string;
  thesisExplainer?: string;
  thesisImage?: string;
  tags?: string[];
  klineData?: CandleData[];
  livePriceFetched?: boolean;
}

export interface CisLunarCompany {
  name: string;
  tier: 1 | 2 | 3;
  tierName: 'Execution Anchors' | 'Contracted Implementers' | 'Disruptive Innovators';
  riskProfile: string;
  trl: string;
  characteristics: string;
  description: string;
  segment?: string; // e.g., "Earth-to-Lunar Access", "Power & Energy", etc.
}

export interface CisLunarTier {
  tier: number;
  name: string;
  riskProfile: string;
  trl: string;
  characteristics: string;
  companies: CisLunarCompany[];
}
