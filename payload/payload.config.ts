import { buildConfig } from 'payload/config';
import path from 'path';
import { fileURLToPath } from 'url';

// Collections
import Companies from './collections/Companies.js';
import CisLunarCompanies from './collections/CisLunarCompanies.js';
import DataSources from './collections/DataSources.js';
import Indexes from './collections/Indexes.js';
import Users from './collections/Users.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      title: 'Stocks Deep Analysis',
      favicon: '/favicon.ico',
    },
  },
  collections: [Users, Companies, CisLunarCompanies, DataSources, Indexes],
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-this',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: {
    adapter: 'sqlite',
    url: process.env.DATABASE_URL || `file:${path.resolve(dirname, './data.sqlite')}`,
  },
  cors: {
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.FRONTEND_URL || 'http://localhost:3000',
    ],
  },
});
