# Supabase 数据库表结构建议

## 1. watchlist（自选股）
| 字段名   | 类型      | 说明         |
|----------|-----------|--------------|
| id       | int8      | 主键         |
| symbol   | text      | 股票代码     |
| meta     | jsonb     | 其他元数据   |
| order    | int4      | 排序         |
| created_at | timestamptz | 创建时间 |

## 2. stock_cache（行情与指标缓存）
| 字段名   | 类型      | 说明         |
|----------|-----------|--------------|
| id       | int8      | 主键         |
| symbol   | text      | 股票代码     |
| data     | jsonb     | 缓存内容     |
| updated_at | timestamptz | 更新时间 |

---
请在 Supabase 控制台建表，字段可根据实际 UI 需求扩展。
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# US Stocks Deep Analysis

This is a Vite + React + TypeScript app for US growth-stock analysis and cislunar ecosystem mapping.

## Local Run

**Prerequisites:** Node.js 20+

1. Install dependencies: `npm install`
2. Set `GEMINI_API_KEY` in `.env.local`
3. Start development server: `npm run dev`

## Production Target

This repository is prepared for static hosting on GitHub Pages with a custom domain:
- `finance.aileena.xyz`

See `DEPLOYMENT.md` for full release and DNS steps.

## Content Management

Structured content and source registry are under `data/`:
- `data/companies.json`
- `data/indexes.json`
- `data/sources.json`

Validate content schema:
- `npm run validate:data`

Run the admin CLI:
- `npm run content -- --help`

Workflow docs:
- **[HOW_TO.md](HOW_TO.md)** — Quick start guide for common tasks
- `DEPLOYMENT.md` — Full deployment runbook
- `WORKFLOW.md` — Day-to-day operations
- `CONTENT_WORKFLOW.md` — Content governance
- `AGENT_WORKFLOW.md` — Agent integration
- `OPERATIONS.md` — Incident handling
- `TODO.md` — Launch checklist

## Automation

CI and scheduled automation files are in `.github/workflows/`:
- `content-governance.yml`
- `deploy-pages.yml`
- `data-refresh.yml`
- `price-alerts.yml`

## Security Note

`GEMINI_API_KEY` is currently injected into the frontend build for speed. This is convenient but not secure for high-risk production workloads. See `OPERATIONS.md` for migration guidance to a backend proxy.
