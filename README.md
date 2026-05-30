# PLOZEN Ops Console

PLOZEN Ops Console is a public, clean-start dashboard for observing PLOZEN's AI operations, knowledge search, and automation status.

This repository replaces the idea of opening the legacy `plozen-console` codebase. The legacy console stays private because it may contain internal experiments, stale product code, and sensitive operational assumptions.

## Scope

First public MVP:

- Knowledge API health
- Document source list
- Chunk count and status
- Search input
- Search results
- Source and chunk detail panel

Out of scope:

- Polymarket features
- Coin systems
- Internal automation credentials
- Discord, n8n, or server secrets
- Private Obsidian source content
- Raw internal operation logs

## Security Boundary

Real values must stay out of git.

- Use `.env.local` for local secrets and internal endpoints.
- Keep only variable names and safe placeholders in `.env.example`.
- Do not commit credentials, private tokens, exported workflow credentials, or private vault content.

## Design Kit

The Plostack Design Kit is installed in `design-kit/` as a web-only `empty-raw` module.

```bash
npm run design-kit:local
npm run design-kit:doctor
```

Open the local design kit preview at `http://127.0.0.1:8095/`.

The design kit is a planning and visual proof workspace. Product implementation should start only after the public Ops Console scope and `DESIGN.md` direction are approved.
