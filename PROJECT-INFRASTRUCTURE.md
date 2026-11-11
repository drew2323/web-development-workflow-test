# Project Infrastructure

**Status:** INFRASTRUCTURE_READY
**Project:** Test vývojového workflow webu
**Owner:** David Brázda

## Workspace and repository

- GitHub repository: `https://github.com/drew2323/web-development-workflow-test`
- Default branch: `main`
- Bootstrap commit: `646057374d0811096cc61d131c0acc69aec0c8ce`

## Environments

| Environment | Domain | Database | Source |
| --- | --- | --- | --- |
| Production | sslip.io doména z Coolify | samostatná production PostgreSQL | `main` |
| Preview | `pr-<id>.` doména z Coolify (URL v PR) | samostatná preview PostgreSQL | pull request |

Konkrétní instance (Coolify aplikace, databáze, server, interní URL) nejsou v repu: zjistí se v Coolify podle repa (`coolify where <app>`). Repo je public.

Preview database strategy: `shared-preview`. Současně smí běžet jen jedna změna s migrací.

## Deployment contract

- Preflight: `./scripts/preflight.sh --infrastructure`
- Local quality gate: `./scripts/quality.sh`
- Build: `corepack pnpm build`
- Start: `./scripts/start.sh`
- Migrations: `./scripts/migrate.sh` (`migrate.mjs`, advisory lock, `lock_timeout=120s`)
- Coolify pre-deploy: prázdný; migrace proběhne před startem serveru
- Verification: `./scripts/verify.sh <base-url>`
- Production gate: `PRODUCTION_HOST=<host> ./scripts/verify-production.sh <production-url>`
- Preview gate: `PREVIEW_HOST_SUFFIX=<host> ./scripts/verify-preview.sh <pr-number> <preview-url>`
- Internal port: `3000`
- Health endpoint: `/api/health`
- Coolify build pack: `Dockerfile`

## Persistent resources

- PostgreSQL production a preview: samostatné Coolify databáze
- Upload/file storage: lokální kontejnerové úložiště; uploady nejsou součástí testu
- Backup policy: bez uživatelských dat; před datovou změnou Coolify/PostgreSQL backup
- Restore test: pro tento bezdatový test nahrazen ověřeným aplikačním rollbackem

Secrets jsou uloženy mimo Git v Coolify nebo lokálním necommitovaném `.env`.

## First deployment proof

Ověřeno při bootstrapu (2026-09): Git → Coolify → HTTPS, healthcheck, webhook (`ping`, `push`, `pull_request`), runtime-only secrets, migrace při souběžném startu, preview z testovacího PR i jeho teardown, merge → production a rollback (vyžaduje plný commit SHA). Důkazy (ID deploymentů, CI běhy) jsou v Coolify a GitHubu, ne v repu.

Status lze změnit na `INFRASTRUCTURE_READY` pouze po úspěšném průchodu Git → Coolify → VPS → HTTPS a ověření preview z testovacího PR.
