# Payload CMS Backend

This directory contains the Payload CMS backend for US Stocks Deep Analysis.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env.local
# Edit .env.local and set PAYLOAD_SECRET
nano .env.local
```

### 3. Start Development Server
```bash
npm run dev
```

Access the admin panel at: **http://localhost:3001/admin**

## Structure

```
payload/
├── collections/          # Data collections (Companies, CisLunar, etc)
│   ├── Users.ts          # Authentication
│   ├── Companies.ts      # Stock data
│   ├── CisLunarCompanies.ts
│   ├── DataSources.ts    # Price refresh sources
│   └── Indexes.ts        # Market indexes
├── payload.config.ts     # Main Payload configuration
├── server.ts             # Express server setup
├── package.json
├── tsconfig.json
└── .env.example
```

## Collections Overview

### Companies
Stores stock company data with financials, indicators, and pricing.
- Fields: symbol, fullName, sector, mainBusiness, financials, indicators, etc.
- Primary: symbol (unique)

### CisLunarCompanies
Space economy companies organized by tier.
- Fields: name, tier (1-3), tierName, riskProfile, trl, description, segment
- Tier 1: Execution Anchors
- Tier 2: Contracted Implementers
- Tier 3: Disruptive Innovators

### DataSources
Registry of price/data sources for automation.
- Fields: id, name, type, endpoint, enabled, status, apiKeyEnv, refreshCron
- Used by price-refresh automation

### Indexes
Market index tracking (Dow Jones, S&P 500, etc).
- Fields: id, name, provider, status, description

### Users
Authentication and admin access control.
- Fields: email, role (admin/editor/viewer)

## API Endpoints

### Get Companies
```
GET /api/companies?limit=1000
```

### Get CisLunar Companies
```
GET /api/cislunar-companies?limit=1000
```

### Price Refresh (Automated)
```
POST /api/refresh-prices
Authorization: Bearer YOUR_API_KEY
```

### Health Check
```
GET /api/health
```

## Environment Variables

Required:
- `PAYLOAD_SECRET` - Secret key for authentication (change in production!)
- `DATABASE_URL` - SQLite path or PostgreSQL connection string

Optional:
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - For CORS configuration
- `FMP_API_KEY` - Financial Modeling Prep
- `ALPHA_VANTAGE_API_KEY` - Alpha Vantage
- `POLYGON_API_KEY` - Polygon.io

## Data Migration

From the root directory, run:
```bash
npm run migrate:data
```

This imports data from JSON files into Payload collections.

## Development

### Run with Frontend (parallel)
```bash
# Terminal 1: Payload backend
npm run payload:dev

# Terminal 2: Vite frontend
npm run dev
```

### Generate TypeScript Types
```bash
npm run generate:types
```

Output: `payload-types.ts`

## Production

### Build
```bash
npm run build
```

### Start Server
```bash
npm start
```

### Deploy to Railway
1. Create `.env.production` with production values
2. Connect your Railway PostgreSQL database
3. Deploy via Railway dashboard

## API Key Setup (for Automation)

1. Create admin user in Payload admin UI
2. Navigate to Users → API Keys
3. Create new API key with:
   - Name: "GitHub Actions" or "Price Refresh Bot"
   - Access: Companies (read/write), DataSources (read)
4. Store secret key in GitHub Actions secrets

## Troubleshooting

### Payload won't start
- Check Database URL in .env.local
- Ensure PAYLOAD_SECRET is set
- Check port 3001 isn't already in use

### CORS errors
- Update `frontend URL` in payload.config.ts
- Ensure frontend doesn't have old API URLs cached

### Admin UI slow/not loading
- Check browser console for errors
- Verify localhost:3001/api/health returns 200
- Try clearing browser cache

---

**See root `.todos.md` for migration checklist**
