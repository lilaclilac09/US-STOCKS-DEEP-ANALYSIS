#!/bin/bash
# 自动化 Vercel 部署脚本
# 用法：sh scripts/deploy-vercel.sh

set -e

# 构建前端
npm install
npm run build

# 部署到 Vercel（需先登录 vercel CLI）
vercel --prod --confirm
