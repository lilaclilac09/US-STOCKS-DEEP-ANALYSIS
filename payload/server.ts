import express from 'express';
import payload from 'payload';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

dotenv.config({
  path: path.resolve(dirname, '.env.local'),
});

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-this',
  express: app,
  onInit: async () => {
    console.log('Payload initialized successfully');
  },
}).catch(err => {
  console.error('Failed to initialize Payload:', err);
  process.exit(1);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
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
    await payload.init();
    app.listen(PORT, () => {
      console.log(`Payload CMS running on http://localhost:${PORT}/admin`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
