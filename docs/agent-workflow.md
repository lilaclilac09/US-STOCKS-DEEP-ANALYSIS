# Agent Workflow

This repository supports future coding agents (Copilot/OpenClaw-style) using controlled operations.

## Agent Entry Points
1. Read `.instructions.md` before making edits.
2. Use `agent/admin-ops.yaml` as allowed-action contract.
3. Prefer `scripts/manage-content.mjs` for content edits.

## Allowed Edit Targets
- `data/*.json`
- `workflow.md`
- `content-workflow.md`
- `operations.md`
- `.github/workflows/*.yml`
- `scripts/*.mjs`

## Unsafe Changes (Require Human Approval)
- Changing authentication/security architecture
- Modifying API key handling
- Refactoring analysis prompt logic in `services/analysisService.ts`
- Any destructive rewrite of `constants.ts`

## Request Routing
Natural language request -> Agent action:
- "add company" -> `add_company`
- "change index" -> `add_index` or edit existing index record
- "add source" -> `register_source`
- "pause source" -> `deprecate_source`
- "turn source on" -> `enable-source`
- "turn source off" -> `disable-source`

## Required Checks After Agent Changes
- `npm run validate:data`
- `npm run build:prod`

If either fails, agent should stop and report exact error.
