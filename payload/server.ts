import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

dotenv.config({
  path: path.resolve(dirname, '.env.local'),
});

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

// Local CORS for Vite dev servers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

const repoRoot = path.resolve(dirname, '..');

function readJson(relativePath: string) {
  const filePath = path.join(repoRoot, relativePath);
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mode: 'local-api' });
});

// Frontend-compatible companies endpoint
app.get('/api/companies', (req, res) => {
  try {
    const companiesDoc = readJson('data/companies.json');
    const docs = (companiesDoc.companies || []).map((c: any) => ({
      symbol: c.symbol,
      fullName: c.fullName,
      sector: c.sector,
      currentPrice: c.currentPrice,
      mainBusiness: c.mainBusiness || '',
      financials: c.financials || {
        revenue: '',
        netProfit: '',
        cashFlow: '',
        period: '',
      },
      indicators: c.indicators || {
        roic: '',
        roe: '',
        cashFlow: '',
        debt: '',
        currentRatio: '',
      },
      latestDevelopments: (c.latestDevelopments || []).map((d: string) => ({ development: d })),
    }));

    res.json({ docs, totalDocs: docs.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load companies' });
  }
});

// Frontend-compatible cislunar endpoint
app.get('/api/cislunar-companies', (req, res) => {
  try {
    const cislunarDoc = readJson('data/cislunar.json');
    const docs = Object.entries(cislunarDoc.missions || {}).map(([name, mission]: [string, any]) => ({
      name,
      tier: mission.tier && ['1', '2', '3'].includes(String(mission.tier)) ? String(mission.tier) : '2',
      tierName: 'Contracted Implementers',
      riskProfile: mission.status || 'Active',
      trl: 'Mixed TRL',
      characteristics: mission.latest_info || 'Lunar mission operator',
      description: mission.latest_info || `${name} active in cislunar market`,
      segment: mission.segment || 'Cislunar Provider',
    }));

    res.json({ docs, totalDocs: docs.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load cislunar companies' });
  }
});

// Price refresh endpoint (called by cron job)
app.post('/api/refresh-prices', async (req, res) => {
  try {
    // This will be implemented to accept price updates
    // Called by external service or GitHub Actions cron
    console.log('Price refresh endpoint called');
    res.json({ success: true, message: 'Price refresh triggered' });
  } catch (err) {
    console.error('Price refresh error:', err);
    res.status(500).json({ error: 'Price refresh failed' });
  }
});

// Start server
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Local API server running at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
