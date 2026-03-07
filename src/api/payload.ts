/**
 * API utilities for fetching data from Payload CMS
 * Supports fallback to JSON data during transition period
 */

const PAYLOAD_API_URL =
  process.env.VITE_PAYLOAD_API_URL || 'http://localhost:3001/api';

interface FetchOptions {
  useFallback?: boolean;
  timeout?: number;
}

/**
 * Fetch companies from Payload API
 * Falls back to constants if Payload unavailable (transition mode)
 */
export async function getCompanies(options: FetchOptions = {}) {
  const { useFallback = true, timeout = 5000 } = options;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${PAYLOAD_API_URL}/companies?limit=1000`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    
    // Transform Payload response to match StockData interface
    return data.docs.map((doc: any) => ({
      symbol: doc.symbol,
      fullName: doc.fullName,
      mainBusiness: doc.mainBusiness || '',
      financials: doc.financials || {
        revenue: '',
        netProfit: '',
        cashFlow: '',
        period: '',
      },
      indicators: doc.indicators || {
        roic: '',
        roe: '',
        cashFlow: '',
        debt: '',
        currentRatio: '',
      },
      latestDevelopments: (doc.latestDevelopments || []).map(
        (d: any) => d.development
      ),
      currentPrice: doc.currentPrice,
    }));
  } catch (error) {
    console.warn('Failed to fetch from Payload API:', error);

    if (useFallback) {
      console.log('Using JSON fallback for companies');
      // Will be handled by caller with constants
      return null;
    }

    throw error;
  }
}

/**
 * Fetch CisLunar companies from Payload API
 */
export async function getCisLunarCompanies(options: FetchOptions = {}) {
  const { useFallback = true, timeout = 5000 } = options;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${PAYLOAD_API_URL}/cislunar-companies?limit=1000`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    // Group by tier
    const tiers = [
      { tier: 1, name: 'Execution Anchors' },
      { tier: 2, name: 'Contracted Implementers' },
      { tier: 3, name: 'Disruptive Innovators' },
    ];

    return tiers.map(t => ({
      tier: t.tier,
      name: t.name,
      riskProfile: data.docs.find((d: any) => d.tier === String(t.tier))
        ?.riskProfile || '',
      trl: 'TRL varies',
      characteristics: data.docs.find((d: any) => d.tier === String(t.tier))
        ?.characteristics || '',
      companies: data.docs
        .filter((d: any) => d.tier === String(t.tier))
        .map((d: any) => ({
          name: d.name,
          tier: t.tier,
          tierName: d.tierName,
          riskProfile: d.riskProfile,
          trl: d.trl,
          characteristics: d.characteristics,
          description: d.description,
          segment: d.segment,
        })),
    }));
  } catch (error) {
    console.warn('Failed to fetch CisLunar companies from Payload:', error);

    if (useFallback) {
      console.log('Using JSON fallback for CisLunar companies');
      return null;
    }

    throw error;
  }
}

/**
 * Fetch indexes from Payload API
 */
export async function getIndexes(options: FetchOptions = {}) {
  const { useFallback = true, timeout = 5000 } = options;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${PAYLOAD_API_URL}/indexes?limit=100`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.warn('Failed to fetch indexes from Payload:', error);

    if (useFallback) {
      console.log('Using JSON fallback for indexes');
      return null;
    }

    throw error;
  }
}

/**
 * Check if Payload API is available
 */
export async function checkPayloadHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${PAYLOAD_API_URL}/health`, {
      timeout: 2000,
    });
    return response.ok;
  } catch {
    return false;
  }
}
