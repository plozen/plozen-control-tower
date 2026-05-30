# PLOZEN Ops Console Agent Rules

## Identity

This repository is the public clean-start operations dashboard for PLOZEN. It is not the legacy `plozen-console` repository.

## Public Boundary

- Keep the repository public-safe by default.
- Do not copy code, logs, credentials, or private assumptions from the legacy console.
- Do not commit `.env`, `.env.local`, `.env.*.local`, private tokens, n8n credentials, Discord bot tokens, or raw Obsidian vault content.
- Use `.env.example` only for variable names and safe placeholders.

## Product Direction

Initial product target:

- Central operations console for public-safe AI operation visibility.
- First MVP focuses on PLOZEN Knowledge API read-only workflows.
- Write/ingest/admin actions are a later phase after the read-only search dashboard is validated.

## Design Workflow

- Use `design-kit/` for design planning and visual proof.
- Treat `design-kit/DESIGN.md` as the design kit source for visual generation until a root product `DESIGN.md` is created.
- Keep `design-kit/pub/` as raw publishing/artboard source.
- Do not place device mockups, thumbnails, or composite exports inside raw `pub/` pages.

## Verification

Before commit or push:

- `npm run design-kit:doctor`
- `git diff --check`
- secret scan if `gitleaks` or another scanner is available locally
