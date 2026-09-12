# Project Infrastructure

**Status:** DRAFT
**Project:** Test vývojového workflow webu
**Owner:** David Brázda

## Workspace and repository

- Local workspace: `/home/david/Projects/web-development-workflow-test`
- GitHub repository: `https://github.com/drew2323/web-development-workflow-test`
- Default branch: `main`
- Bootstrap commit: TBD

## Environments

| Environment | Domain                                             | Coolify application                                         | Database                   | Source       |
| ----------- | -------------------------------------------------- | ----------------------------------------------------------- | -------------------------- | ------------ |
| Production  | `https://workflow-test.2.56.97.3.sslip.io`         | Coolify project `th4zol2jzegenk8kubxw5pzx`; application TBD | `ba0eroqzaoj2dwfkgxzfjxkd` | `main`       |
| Preview     | `https://pr-<id>.workflow-test.2.56.97.3.sslip.io` | PR deployments stejné aplikace; application TBD             | `rd5k244j7kvrpcmnepjkltpl` | pull request |

Preview database strategy: `shared-preview`. Současně smí běžet jen jedna změna s migrací.

## Deployment contract

- Build: `corepack pnpm build`
- Start: `corepack pnpm start`
- Migrations: `./scripts/migrate.sh`
- Pre-deploy: `./scripts/pre-deploy.sh`
- Verification: `./scripts/verify.sh <base-url>`
- Internal port: `3000`
- Health endpoint: `/api/health`
- Coolify build pack: `Dockerfile`

## Persistent resources

- PostgreSQL production: TBD
- PostgreSQL preview: TBD
- Upload/file storage: lokální kontejnerové úložiště; uploady nejsou součástí testu
- Backup policy: bez uživatelských dat; před datovou změnou Coolify/PostgreSQL backup
- Restore test: pro tento bezdatový test nahrazen ověřeným aplikačním rollbackem

Secrets jsou uloženy mimo Git v Coolify nebo lokálním necommitovaném `.env`.

## First deployment proof

- Skeleton commit: TBD
- Production deployment URL: TBD
- Preview PR: TBD
- Preview deployment URL: TBD
- HTTPS verified: TBD
- Healthcheck verified: TBD
- Git webhook verified: TBD
- Rollback verified: TBD
- Evidence/log link: TBD

Status lze změnit na `INFRASTRUCTURE READY` pouze po úspěšném průchodu Git → Coolify → VPS → HTTPS a ověření preview z testovacího PR.
