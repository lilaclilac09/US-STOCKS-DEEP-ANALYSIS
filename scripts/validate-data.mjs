import fs from 'fs';
import path from 'path';

const root = process.cwd();
const requiredFiles = [
  'data/companies.json',
  'data/indexes.json',
  'data/sources.json',
];

function readJson(relPath) {
  const fullPath = path.join(root, relPath);
  const raw = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(raw);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

try {
  requiredFiles.forEach((file) => {
    assert(fs.existsSync(path.join(root, file)), `Missing required file: ${file}`);
  });

  const companies = readJson('data/companies.json');
  const indexes = readJson('data/indexes.json');
  const sources = readJson('data/sources.json');

  assert(Array.isArray(companies.companies), 'companies.json must contain a companies array');
  assert(Array.isArray(indexes.indexes), 'indexes.json must contain an indexes array');
  assert(Array.isArray(sources.sources), 'sources.json must contain a sources array');

  const symbols = new Set();
  for (const company of companies.companies) {
    assert(company.symbol && typeof company.symbol === 'string', 'Each company must include symbol');
    assert(company.fullName && typeof company.fullName === 'string', 'Each company must include fullName');
    const symbol = company.symbol.toUpperCase();
    assert(!symbols.has(symbol), `Duplicate company symbol: ${symbol}`);
    symbols.add(symbol);
  }

  const indexIds = new Set();
  for (const index of indexes.indexes) {
    assert(index.id && typeof index.id === 'string', 'Each index must include id');
    assert(index.name && typeof index.name === 'string', 'Each index must include name');
    assert(index.provider && typeof index.provider === 'string', 'Each index must include provider');
    assert(!indexIds.has(index.id), `Duplicate index id: ${index.id}`);
    indexIds.add(index.id);
  }

  const sourceIds = new Set();
  for (const source of sources.sources) {
    assert(source.id && typeof source.id === 'string', 'Each source must include id');
    assert(source.name && typeof source.name === 'string', 'Each source must include name');
    assert(source.endpoint && typeof source.endpoint === 'string', 'Each source must include endpoint');
    assert(!sourceIds.has(source.id), `Duplicate source id: ${source.id}`);
    sourceIds.add(source.id);
  }

  console.log('Data validation passed.');
} catch (error) {
  console.error(`Data validation failed: ${error.message}`);
  process.exit(1);
}
