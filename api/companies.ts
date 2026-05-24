import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const filePath = join(process.cwd(), 'data', 'companies.json');
    const raw = readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    const companies = data.companies || [];

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate'); // 5 min CDN cache
    return res.status(200).json({ docs: companies, totalDocs: companies.length });
  } catch (err) {
    console.error('Failed to load companies.json:', err);
    return res.status(500).json({ error: 'Failed to load companies' });
  }
}
