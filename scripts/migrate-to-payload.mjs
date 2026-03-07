/**
 * Migration script: JSON → Payload CMS
 * Imports existing data from JSON files into Payload collections
 * 
 * Usage: npm run migrate:data
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, '..');

dotenv.config({ path: path.resolve(rootDir, '.env.local') });

const PAYLOAD_API = process.env.PAYLOAD_API_URL || 'http://localhost:3001/api';
const API_KEY = process.env.PAYLOAD_API_KEY;

// Read JSON files
function readJsonFile(filePath) {
  const fullPath = path.resolve(rootDir, filePath);
  try {
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch (err) {
    console.warn(`Could not read ${filePath}:`, err.message);
    return null;
  }
}

// Fetch from Payload API
async function payloadFetch(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (API_KEY) {
    headers['Authorization'] = `Bearer ${API_KEY}`;
  }

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${PAYLOAD_API}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// Migrate companies
async function migrateCompanies() {
  console.log('\n📦 Migrating companies...');
  const data = readJsonFile('data/companies.json');
  if (!data || !data.companies) {
    console.warn('No companies data found');
    return;
  }

  for (const company of data.companies) {
    try {
      // Check if exists
      const existing = await payloadFetch(
        `/companies?where[symbol][equals]=${company.symbol}`
      );
      
      if (existing.docs.length === 0) {
        await payloadFetch('/companies', 'POST', {
          symbol: company.symbol,
          fullName: company.fullName,
          sector: company.sector || 'Unknown',
          mainBusiness: '',
          currentPrice: company.currentPrice || 'N/A',
          status: company.status || 'active',
          tags: company.tags || [],
          notes: company.notes || '',
          lastRefreshedAt: company.lastRefreshedAt,
          lastPriceSource: company.lastPriceSource,
          financials: {
            revenue: '',
            netProfit: '',
            cashFlow: '',
            period: '',
          },
          indicators: {
            roic: '',
            roe: '',
            cashFlow: '',
            debt: '',
            currentRatio: '',
          },
          latestDevelopments: [],
        });
        console.log(`✓ Created ${company.symbol}`);
      } else {
        console.log(`⊘ ${company.symbol} already exists`);
      }
    } catch (err) {
      console.error(`✗ Error migrating ${company.symbol}:`, err.message);
    }
  }
}

// Migrate indexes
async function migrateIndexes() {
  console.log('\n📊 Migrating indexes...');
  const data = readJsonFile('data/indexes.json');
  if (!data || !data.indexes) {
    console.warn('No indexes data found');
    return;
  }

  for (const index of data.indexes) {
    try {
      const existing = await payloadFetch(
        `/indexes?where[id][equals]=${index.id}`
      );
      
      if (existing.docs.length === 0) {
        await payloadFetch('/indexes', 'POST', {
          id: index.id,
          name: index.name,
          provider: index.provider,
          status: index.status || 'tracked',
          description: index.description || '',
        });
        console.log(`✓ Created index ${index.id}`);
      } else {
        console.log(`⊘ Index ${index.id} already exists`);
      }
    } catch (err) {
      console.error(`✗ Error migrating index ${index.id}:`, err.message);
    }
  }
}

// Migrate data sources
async function migrateDataSources() {
  console.log('\n🔌 Migrating data sources...');
  const data = readJsonFile('data/sources.json');
  if (!data || !data.sources) {
    console.warn('No sources data found');
    return;
  }

  for (const source of data.sources) {
    try {
      const existing = await payloadFetch(
        `/data-sources?where[id][equals]=${source.id}`
      );
      
      if (existing.docs.length === 0) {
        await payloadFetch('/data-sources', 'POST', {
          id: source.id,
          name: source.name,
          type: source.type || 'daily_prices',
          endpoint: source.endpoint,
          enabled: source.enabled || false,
          status: source.status || 'planned',
          auth: source.auth || 'apiKey',
          apiKeyEnv: source.apiKeyEnv || '',
          refreshCron: source.refreshCron || '',
          mapping: source.mapping || {},
          healthNotes: source.healthNotes || '',
        });
        console.log(`✓ Created source ${source.id}`);
      } else {
        console.log(`⊘ Source ${source.id} already exists`);
      }
    } catch (err) {
      console.error(`✗ Error migrating source ${source.id}:`, err.message);
    }
  }
}

// Migrate CisLunar companies from constants.ts (simplified)
async function migrateCisLunarCompanies() {
  console.log('\n🚀 Migrating CisLunar companies...');
  console.log('⚠️  Note: CisLunar companies need to be migrated from constants.ts');
  console.log('    Run: npm run migrate:cislunar to import from constants');
}

// Main migration
async function main() {
  console.log('🚀 Starting data migration to Payload CMS...\n');
  
  try {
    // Check Payload health
    console.log('Checking Payload API...');
    await payloadFetch('/health');
    console.log('✓ Payload API is running\n');

    // Run migrations
    await migrateCompanies();
    await migrateIndexes();
    await migrateDataSources();
    await migrateCisLunarCompanies();

    console.log('\n✅ Migration complete!');
    console.log('📝 Check Payload admin at http://localhost:3001/admin to verify data');
  } catch (err) {
    console.error('\n❌ Migration failed:', err.message);
    process.exit(1);
  }
}

main();
