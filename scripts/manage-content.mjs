import fs from 'fs';
import path from 'path';

const root = process.cwd();
const companiesPath = path.join(root, 'data/companies.json');
const indexesPath = path.join(root, 'data/indexes.json');
const sourcesPath = path.join(root, 'data/sources.json');

function usage() {
  console.log(`Usage:
  npm run content -- add-company --symbol NVDA --name "NVIDIA" --sector "Semiconductors" [--price "$950"]
  npm run content -- update-company-price --symbol HLT --price "$305"
  npm run content -- deactivate-company --symbol HLT
  npm run content -- add-index --id dowjones --name "Dow Jones" --provider "S&P Dow Jones"
  npm run content -- add-source --id polygon --name Polygon --type price_and_fundamentals --endpoint "https://api.polygon.io"
  npm run content -- enable-source --id fmp
  npm run content -- disable-source --id fmp
  npm run content -- deprecate-source --id alpha_vantage
  npm run content -- --help
`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function getArg(flag, fallback = '') {
  const idx = process.argv.indexOf(flag);
  if (idx === -1 || idx + 1 >= process.argv.length) {
    return fallback;
  }
  return process.argv[idx + 1];
}

function main() {
  const command = process.argv[2];
  if (!command || command === '--help' || command === 'help') {
    usage();
    return;
  }

  const companiesDoc = readJson(companiesPath);
  const indexesDoc = readJson(indexesPath);
  const sourcesDoc = readJson(sourcesPath);

  if (command === 'add-company') {
    const symbol = getArg('--symbol').toUpperCase();
    const fullName = getArg('--name');
    const sector = getArg('--sector');
    const currentPrice = getArg('--price', 'N/A');

    if (!symbol || !fullName || !sector) {
      throw new Error('add-company requires --symbol --name --sector');
    }

    const exists = companiesDoc.companies.some((c) => c.symbol === symbol);
    if (exists) {
      throw new Error(`Company already exists: ${symbol}`);
    }

    companiesDoc.companies.push({
      symbol,
      fullName,
      sector,
      currentPrice,
      status: 'active',
      tags: [],
      notes: 'Added via CLI',
    });

    writeJson(companiesPath, companiesDoc);
    console.log(`Added company ${symbol}`);
    return;
  }

  if (command === 'update-company-price') {
    const symbol = getArg('--symbol').toUpperCase();
    const price = getArg('--price');
    if (!symbol || !price) {
      throw new Error('update-company-price requires --symbol --price');
    }

    const company = companiesDoc.companies.find((c) => c.symbol === symbol);
    if (!company) {
      throw new Error(`Unknown company: ${symbol}`);
    }

    company.currentPrice = price;
    writeJson(companiesPath, companiesDoc);
    console.log(`Updated ${symbol} to ${price}`);
    return;
  }

  if (command === 'deactivate-company') {
    const symbol = getArg('--symbol').toUpperCase();
    if (!symbol) {
      throw new Error('deactivate-company requires --symbol');
    }

    const company = companiesDoc.companies.find((c) => c.symbol === symbol);
    if (!company) {
      throw new Error(`Unknown company: ${symbol}`);
    }

    company.status = 'inactive';
    writeJson(companiesPath, companiesDoc);
    console.log(`Deactivated ${symbol}`);
    return;
  }

  if (command === 'add-index') {
    const id = getArg('--id');
    const name = getArg('--name');
    const provider = getArg('--provider');
    if (!id || !name || !provider) {
      throw new Error('add-index requires --id --name --provider');
    }

    const exists = indexesDoc.indexes.some((idx) => idx.id === id);
    if (exists) {
      throw new Error(`Index already exists: ${id}`);
    }

    indexesDoc.indexes.push({
      id,
      name,
      provider,
      status: 'tracked',
      description: 'Added via CLI',
    });

    writeJson(indexesPath, indexesDoc);
    console.log(`Added index ${id}`);
    return;
  }

  if (command === 'add-source') {
    const id = getArg('--id');
    const name = getArg('--name');
    const type = getArg('--type');
    const endpoint = getArg('--endpoint');

    if (!id || !name || !type || !endpoint) {
      throw new Error('add-source requires --id --name --type --endpoint');
    }

    const exists = sourcesDoc.sources.some((source) => source.id === id);
    if (exists) {
      throw new Error(`Source already exists: ${id}`);
    }

    sourcesDoc.sources.push({
      id,
      name,
      type,
      endpoint,
      refreshCron: '0 11 * * 1-5',
      enabled: false,
      status: 'planned',
      auth: 'apiKey',
      mapping: {},
      healthNotes: 'Added via CLI',
    });

    writeJson(sourcesPath, sourcesDoc);
    console.log(`Added source ${id}`);
    return;
  }

  if (command === 'deprecate-source') {
    const id = getArg('--id');
    if (!id) {
      throw new Error('deprecate-source requires --id');
    }

    const source = sourcesDoc.sources.find((s) => s.id === id);
    if (!source) {
      throw new Error(`Unknown source: ${id}`);
    }

    source.status = 'deprecated';
    source.enabled = false;
    writeJson(sourcesPath, sourcesDoc);
    console.log(`Deprecated source ${id}`);
    return;
  }

  if (command === 'enable-source') {
    const id = getArg('--id');
    if (!id) {
      throw new Error('enable-source requires --id');
    }

    const source = sourcesDoc.sources.find((s) => s.id === id);
    if (!source) {
      throw new Error(`Unknown source: ${id}`);
    }

    source.enabled = true;
    if (source.status === 'deprecated') {
      source.status = 'planned';
    }

    writeJson(sourcesPath, sourcesDoc);
    console.log(`Enabled source ${id}`);
    return;
  }

  if (command === 'disable-source') {
    const id = getArg('--id');
    if (!id) {
      throw new Error('disable-source requires --id');
    }

    const source = sourcesDoc.sources.find((s) => s.id === id);
    if (!source) {
      throw new Error(`Unknown source: ${id}`);
    }

    source.enabled = false;
    writeJson(sourcesPath, sourcesDoc);
    console.log(`Disabled source ${id}`);
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  usage();
  process.exit(1);
}
