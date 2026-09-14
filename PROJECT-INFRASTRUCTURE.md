# Project Infrastructure

**Status:** DRAFT
**Project:** Test vývojového workflow webu
**Owner:** David Brázda

## Workspace and repository

- Local workspace: `/home/david/Projects/web-development-workflow-test`
- GitHub repository: `https://github.com/drew2323/web-development-workflow-test`
- Default branch: `main`
- Bootstrap commit: `646057374d0811096cc61d131c0acc69aec0c8ce`

## Environments

| Environment | Domain                                             | Coolify application                                         | Database                   | Source       |
| ----------- | -------------------------------------------------- | ----------------------------------------------------------- | -------------------------- | ------------ |
| Production  | `https://workflow-test.2.56.97.3.sslip.io`         | project `th4zol2jzegenk8kubxw5pzx`; app `cx6oiehvhog4l2yf2keordmr` | `ba0eroqzaoj2dwfkgxzfjxkd` | `main`       |
| Preview     | `https://pr-<id>.workflow-test.2.56.97.3.sslip.io` | PR deployments app `cx6oiehvhog4l2yf2keordmr`                    | `rd5k244j7kvrpcmnepjkltpl` | pull request |

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

- PostgreSQL production: `ba0eroqzaoj2dwfkgxzfjxkd` (`running:healthy`)
- PostgreSQL preview: `rd5k244j7kvrpcmnepjkltpl` (`running:healthy`)
- Upload/file storage: lokální kontejnerové úložiště; uploady nejsou součástí testu
- Backup policy: bez uživatelských dat; před datovou změnou Coolify/PostgreSQL backup
- Restore test: pro tento bezdatový test nahrazen ověřeným aplikačním rollbackem

Secrets jsou uloženy mimo Git v Coolify nebo lokálním necommitovaném `.env`.

## First deployment proof

- Skeleton commit: `646057374d0811096cc61d131c0acc69aec0c8ce`
- Production deployment URL: `https://workflow-test.2.56.97.3.sslip.io`
- Preview PR: `https://github.com/drew2323/web-development-workflow-test/pull/1` (uzavřený infrastrukturní test)
- Preview deployment URL: `https://pr-1.workflow-test.2.56.97.3.sslip.io`
- HTTPS verified: ano, production i preview
- Healthcheck verified: ano, `scripts/verify.sh`
- Git webhook verified: ano; GitHub `ping`, `push` a `pull_request` deliveries vrátily 200
- Runtime-only secrets verified: ano; production i preview `is_buildtime=false`, `is_runtime=true`
- First deployment migration verified: původní deadlock reprodukován; opravený `scripts/start.sh` ověřen lokálně na čisté DB, při opakovaném startu i při dvou souběžných kontejnerech (`CONCURRENT_START_OK`, jedna migration row); vzdálený důkaz čeká na commit
- Preview teardown verified: ano; po zavření PR nezůstal preview kontejner
- Rollback verified: TBD
- Evidence: GitHub CI run `34686989715`; Coolify production deployment `cqbfr8cernnbhu3wiqfoepkq`; automatický preview deployment `cggde505vmlauyz0wwmirs6b`

Status lze změnit na `INFRASTRUCTURE_READY` pouze po úspěšném průchodu Git → Coolify → VPS → HTTPS a ověření preview z testovacího PR.
