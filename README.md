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


### 环境变量（纯静态版）

本项目现在是**纯静态展示**，**不需要任何 API key**！

以后你要接入其他数据源（如 Polygon.io、Finnhub 等），只需：
1. 在 `.env.local` 添加你的 key（示例见下面）
2. 修改 `src/services/dataService.ts` 中的 `fetchRealData()` 函数

.env.example（复制改名成 .env.local）
```
VITE_POLYGON_API_KEY=your_polygon_key_here
VITE_FINNHUB_API_KEY=your_finnhub_key_here
VITE_YAHOO_API_KEY=your_yahoo_key_here
# 其他数据中心 key 随便加
```

## Local Run

**Prerequisites:** Node.js 20+

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`

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


