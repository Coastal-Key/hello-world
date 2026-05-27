# Coastal Key Master Orchestrator v2.0

Integrated AI Operations Platform for Coastal Key Treasure Coast Asset Management.

## Modules

| Module | Name | Function |
|--------|------|----------|
| A | Project Sentinel | 6-touch, 14-day outbound sales campaign across 10 zones |
| B | Social Automation | Content brief to multi-platform publish via Buffer |
| C | Content Production | Video, podcast, and 1-to-8 repurposing engine |

## Stack

| Component | Technology |
|-----------|-----------|
| AI Engine | @cf/nvidia/nemotron-3-120b-a12b via Cloudflare Workers AI |
| Fallback | claude-sonnet-4-20250514 via Anthropic API |
| Data | Airtable (16 tables) |
| Orchestration | Zapier (19 workflows) |
| Validation | 4 Cloudflare Workers (router, brand linter, pricing detector, zone validator) |
| Publishing | Buffer (Instagram, Facebook, LinkedIn, Alignable) |
| Dialing | Atlas + Retell AI |
| Security | 3 macOS watchdog modules (credential, data residency, app integrity) |

## Setup

```bash
cp .env.example .env    # Fill in credentials
npm run deploy:all      # Deploy all Cloudflare Workers
```

See `CLAUDE.md` for development context and `master-orchestrator.txt` for full specification.

## Authorization

All systems staged in DRAFT mode. To go live: `AUTHORIZE MASTER ORCHESTRATOR`

## Owner

David Hauer, Founder and CEO
Coastal Key Property Management LLC
1407 SE Legacy Cove Circle, Ste 100, Stuart, FL 34997
(772) 247-0982 | david@coastalkey-pm.com
