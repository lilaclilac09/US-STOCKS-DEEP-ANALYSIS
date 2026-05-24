
import { GoogleGenAI, Type } from "@google/genai";
import { StockData } from "../types";

export const analyzeStock = async (ticker: string): Promise<StockData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Perform a deep equity analysis for the stock ticker: ${ticker.toUpperCase()}. 
  The analysis must be as of January 2026 (projected based on current trends).
  Return the analysis in a strictly structured JSON format matching this schema:
  {
    "symbol": "TICKER",
    "fullName": "Company Full Name",
    "mainBusiness": "100-150 word business description",
    "financials": {
      "revenue": "latest revenue value",
      "netProfit": "latest net profit/income",
      "cashFlow": "Free/Op Cash flow info",
      "period": "Q3/Q4 2025 or similar"
    },
    "indicators": {
      "roic": "percentage",
      "roe": "percentage",
      "cashFlow": "Brief description of cash flow health/status",
      "debt": "value or status",
      "currentRatio": "value",
      "margin": "operating or specific margin",
      "pipeline": "optional project pipeline info",
      "buyback": "optional yield info"
    },
    "latestDevelopments": ["array of 2-3 recent milestones"],
    "currentPrice": "Estimated stock price as of Jan 2026"
  }
  Ensure the tone is professional, like a Wall Street analyst. Focus on 2026 projected ROE and Cash flow dynamics.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          symbol: { type: Type.STRING },
          fullName: { type: Type.STRING },
          mainBusiness: { type: Type.STRING },
          financials: {
            type: Type.OBJECT,
            properties: {
              revenue: { type: Type.STRING },
              netProfit: { type: Type.STRING },
              cashFlow: { type: Type.STRING },
              period: { type: Type.STRING },
            },
            required: ["revenue", "netProfit", "cashFlow", "period"],
          },
          indicators: {
            type: Type.OBJECT,
            properties: {
              roic: { type: Type.STRING },
              roe: { type: Type.STRING },
              cashFlow: { type: Type.STRING },
              debt: { type: Type.STRING },
              currentRatio: { type: Type.STRING },
              margin: { type: Type.STRING },
              pipeline: { type: Type.STRING },
              buyback: { type: Type.STRING },
            },
            required: ["roic", "roe", "cashFlow", "debt", "currentRatio"],
          },
          latestDevelopments: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          currentPrice: { type: Type.STRING },
        },
        required: ["symbol", "fullName", "mainBusiness", "financials", "indicators", "latestDevelopments", "currentPrice"],
      },
    },
  });

  try {
    const data = JSON.parse(response.text || "{}");
    return data as StockData;
  } catch (e) {
    throw new Error("Failed to parse analysis data. Please try again.");
  }
};
