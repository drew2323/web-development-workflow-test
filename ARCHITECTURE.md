# Architecture

**Status:** APPROVED
**Owner:** David Brázda
**Last updated:** 2026-09-12

## System purpose

Minimální web pro ověření standardního agentního vývojového a doručovacího workflow.

## Context and constraints

- Product/spec source: `SPEC.md`
- Existing system or migration source: žádný; nový testovací projekt
- Important constraints: standardní platforma bez výjimek; oddělené production a preview prostředí a databáze; žádná produkční data

## High-level architecture

```text
[Návštěvník] → [Next.js + Payload aplikace] → [PostgreSQL]
                         ↓
                 [health/readiness]
```

- Frontend/application: Next.js a TypeScript
- Content management: Payload CMS jako součást aplikace
- Data store: PostgreSQL
- External services: GitHub pro source/PR; Coolify na `vpswebfarma` pro build, HTTPS, preview a deployment

## Data and integrations

| Integration / data | Direction     | Purpose                          | Owner           | Failure handling                                                  |
| ------------------ | ------------- | -------------------------------- | --------------- | ----------------------------------------------------------------- |
| PostgreSQL         | aplikace ↔ DB | Payload persistence a readiness  | projekt/Coolify | health endpoint vrátí 503; deployment se nepovažuje za připravený |
| GitHub             | Git → Coolify | source, PR a deployment trigger  | David           | neúspěšný webhook/deploy je blocker                               |
| Coolify            | image → VPS   | build, routing, HTTPS a rollback | David           | zachovat předchozí release a zdokumentovat selhání                |

## Environments and delivery

- Repository: `https://github.com/drew2323/web-development-workflow-test`
- Production domain: `https://workflow-test.2.56.97.3.sslip.io`
- Coolify application/project: bude doplněno v `PROJECT-INFRASTRUCTURE.md`
- Preview strategy: Coolify pull-request deployment; `https://pr-<id>.workflow-test.2.56.97.3.sslip.io`
- Health check: `/api/health`, včetně dosažitelnosti databáze
- Backup and rollback: bez uživatelských dat; Coolify rollback na předchozí release, DB změny pouze verzovanými migracemi

## Security and privacy

- Authentication/authorization: Payload admin zůstává dostupný, ale není součástí testovaného veřejného toku
- Sensitive data: žádná business ani osobní data
- Secret storage: pouze Coolify environment/secrets; lokálně necommitovaný `.env`
- Relevant compliance constraints: žádné nad rámec standardního omezení secrets a logů

## Platform deviations

`None.`

## Architectural decisions

- 2026-09-12 — David schválil použití standardní architektury a kompletního workflow pro tento test.
- 2026-09-12 — Domény používají `sslip.io`, aby test nevyžadoval změnu vlastněné DNS zóny.
- 2026-09-12 — Codex CLI je jediný coding worker initial implementation.

## Open questions

- Žádné před bootstrapem; skutečné Coolify identifikátory budou zapsány read-backem.
