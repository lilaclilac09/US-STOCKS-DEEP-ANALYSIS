# Quick Start: Run PayloadCMS + Frontend Locally

**Time**: ~15 minutes | **Difficulty**: Beginner

---

## ⚡ 3-Step Setup

### Step 1: Install Payload (2 min)
```bash
cd /Users/aileen/finance/US-STOCKS-DEEP-ANALYSIS

npm run setup:payload
```

✓ This installs dependencies and creates `.env.local` file

### Step 2: Start Both Servers (2 min)

**Terminal 1 - Payload Backend:**
```bash
npm run payload:dev
```

Wait for: `Payload listening on port 3001`

**Terminal 2 - Vite Frontend:**
```bash
npm run dev
```

Wait for: `Local: http://localhost:5173`

### Step 3: See It Work (2 min)

1. Open http://localhost:5173 in browser
2. Look at **browser console** (F12 → Console tab)
3. You should see: `✓ Loaded data from Payload CMS`
4. Companies appear on page automatically

---

## 🎯 What's Happening

```
Browser → Frontend fetches data → Gets it from Payload ✓
```

The frontend tries to load from Payload first. If Payload is down or slow, it automatically falls back to the JSON files (still works, just not live-updating).

---

## ✅ Quick Verification

### Is Payload Running?
```bash
curl http://localhost:3001/api/health
# Should return: {"status":"ok"}
```

### Is Frontend Seeing Payload?
1. Open http://localhost:5173
2. Press F12 (Dev Tools)
3. Go to Console tab
4. Look for: `✓ Loaded data from Payload CMS` (good!)
   or `Using JSON fallback data` (Payload not running)

### Are Companies Showing?
- Scroll down the page
- Should see: RCL, MU, LLY, MAR, etc. with prices
- Try the search box: type "NVDA"

---

## 🔧 Populate Payload with Real Data

After backend is running, in another terminal:

```bash
npm run migrate:data
```

This reads the JSON files and imports all data into Payload.

Then check Payload admin: http://localhost:3001/admin

---

## 🛑 Troubleshooting

### "Port 3001 is already in use"
```bash
# Kill the process on port 3001
lsof -i :3001
kill -9 <PID>
```

### "npm install fails in payload/"
```bash
# Try manual install
cd payload && npm install --legacy-peer-deps && cd ..
```

### "Getting 'Cannot find module' errors"
```bash
# Reinstall everything
cd payload && rm -rf node_modules && npm install && cd ..
npm run dev
```

### "Admin UI shows blank/error"
1. Check browser console (F12 → Console)
2. Check terminal for error messages
3. Try: localhost:3001/api/health (should return ok)

---

## 📊 See Payloadin Admin Panel

1. Go to http://localhost:3001/admin
2. Click "Create New Account" (first time only)
3. Email: `admin@example.com`
4. Password: anything
5. Create account
6. Login
7. See Collections: Companies, CisLunarCompanies, DataSources, etc.

---

## 🎮 Test JSON Fallback

To see the automatic fallback in action:

```bash
# Terminal 1: Press Ctrl+C to stop Payload
# Browser: Click refresh button
# Console: Should now show "Using JSON fallback data"
# Page: Companies still appear (from JSON files)

# Terminal 1: Start Payload again  
npm run payload:dev
# Browser: Refresh again
# Console: Back to "✓ Loaded data from Payload CMS"
```

---

## 🚀 Next Steps

Once this is working:
1. Read `.todos.md` for the full implementation plan
2. Check `PAYLOADCMS_IMPLEMENTATION.md` for architecture details
3. Continue with Phase 3 (price refresh automation)

---

## 📝 Commands Reference

```bash
# Setup
npm run setup:payload              # One-time: install dependencies

# Development (run in separate terminals)
npm run payload:dev                # Start Payload backend
npm run dev                        # Start Vite frontend

# Data
npm run migrate:data               # Import JSON → Payload
npm run validate:data              # Validate existing JSON

# Build (when ready for production)
npm run build:prod                 # Build for production
```

---

## ✨ You're Done!

If you see companies loading in the browser and `"✓ Loaded data from Payload CMS"` in the console, **everything is working correctly!**

For questions, check:
- `.todos.md` - Detailed checklist
- `payload/README.md` - Backend docs  
- `PAYLOADCMS_IMPLEMENTATION.md` - Full architecture

🎉 **Congrats! PayloadCMS is running locally.**
