# Coastal Key Master Orchestrator

## What This Is
AI operations platform for Coastal Key Treasure Coast Asset Management. Three modules:
- **Module A (Project Sentinel)**: Outbound sales — 6-touch, 14-day campaign across 10 zones, 5 segments
- **Module B (Social Automation)**: Content brief → Nemotron draft → CEO review → Buffer publish
- **Module C (Content Production)**: Video scripts, podcasts, repurposing engine (1 asset → 8 derivatives)

## Architecture
- **AI Engine**: `@cf/nvidia/nemotron-3-120b-a12b` via Cloudflare Workers AI. Fallback: `claude-sonnet-4-20250514`
- **Data Layer**: Airtable (16 tables, schema in `schemas/airtable-tables.json`)
- **Orchestration**: Zapier (19 workflows, WF-1 through WF-19 in `zapier-workflows/`)
- **Front-end**: Nanobanana bot interface
- **Validation**: Brand voice linter, pricing drift detector, zone validator (Cloudflare Workers)

## Key Files
- `master-orchestrator.txt` — canonical system specification
- `governance/` — brand rules, pricing reference (single source of truth), service zones, compliance config
- `cloudflare-workers/` — 4 Workers with wrangler configs
- `zapier-workflows/` — 19 workflow definitions (WF-1 core, WF-8+ automation tiers)
- `automations/` — 8 automation scripts + 3 security watchdog modules
- `schemas/airtable-tables.json` — all 16 Airtable table definitions
- `dashboards/kpi-dashboard-config.json` — real-time KPI dashboard layout
- `.env.example` — all required environment variables documented

## Pricing (never deviate)
Weekly: $395/mo | Biweekly: $295/mo | Monthly: $195/mo | Oversight: from $95/mo
STR: 10% gross rental income | Pre-Storm: $295/event | Post-Storm: $500/event
First Inspection: Complimentary

## Service Zones
Vero Beach, Sebastian, Fort Pierce, Port Saint Lucie, Jensen Beach, Palm City, Stuart, Hobe Sound, Jupiter, North Palm Beach

## Deploying Workers
```bash
cp .env.example .env  # fill in real values
npm run deploy:all
```

Set secrets per worker: `cd cloudflare-workers && wrangler secret put AIRTABLE_API_KEY`

## Authorization Gate
All systems staged in DRAFT. Nothing goes live until CEO sends: `AUTHORIZE MASTER ORCHESTRATOR`
This triggers WF-10 which activates Atlas, all workflows, production Nemotron routing, and Slack notification.
