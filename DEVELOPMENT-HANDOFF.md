# Change Request – Editable homepage via Payload Pages collection

```text
TASK: Zobrazit a upravit „první stranku“ v Payload admin + homepage čítá z Pages
STATUS: HANDOFF_READY
APPROVED BY: David Brázda (2026-09-14, posláno do vývoje; preview – commit čeká lidské potvrzenie)

SCOPE:
- Nová Payload kolekce `Pages` (slug: pages), viditelná ve sidebarn adminu vedle Users a Media.
- Kolekce obsahuje minimálně polí: title a editačný obsah (rich text) pro stránku.
- Domovská (kořenová) stránka čítá obsah z kolekce Pages; výchozí/zálohovaný obsah je text „Hello world“.
- Kdy v adminu pán upraví obsah Page, změna se odrazí na veřejné domovske stránce.
- Registrace kolekce v `src/payload.config.ts`.
- Nová versovaná migrace, která vytvoří `pages` tabulku (a rels) v DB; migrace se spustí automaticky přes `scripts/start.sh`.

ACCEPTANCE CRITERIA:
- Po přihlášení do `/admin` je ve sidebarnu kolekce „Pages“ (vedle Users a Media).
- Domovská URL vrací HTTP 200 a zobrazuje obsah domovske Page; bez žiadné Page existuje fallback „Hello world“.
- Stránka nemá zjevný horizontálny overflow při běžné mobilní (375px) ani desktopové (1366px) šířce.
- `/api/health` vrací HTTP 200 (aplikace + DB).
- Lokálne gates projdou přes `scripts/quality.sh` (LOCAL_OK).
- CI green a Coolify preview URL existuje.
- Implementace na samostatní branchi a pull requestu.

INPUTS:
- SPEC.md (SPEC_READY)
- ARCHITECTURE.md (ARCHITECTURE_READY)
- WEB_PLATFORM.md
- PROJECT-INFRASTRUCTURE.md (INFRASTRUCTURE_READY)
- DEVELOPMENT-HANDOFF.md (HANDOFF_READY)
- AGENTS.md

TARGET:
- repository: https://github.com/drew2323/web-development-workflow-test
- branch: feat/pages-collection

WORKER:
- Codex CLI (headless)

EXPECTED RESULT:
- Pages kolekce v adminu
- homepage čítá z Pages s fallback „Hello world“
- lokálne gates green (`scripts/quality.sh`), CI green
- commit a PR
- Coolify preview URL, nebo explicit blocker

OUT OF SCOPE:
- Změna deployment mechanismu, Dockerfile, deploy hooků, healthcheck u webhooku.
- Změna sdílené webové platformy či architektury.
- Změna produkčné data.
- Merge do produkce a nasazení bez lidského schválení preview.
- `scripts/preflight.sh --infrastructure` (gate zodpovědnosti Team Agenta, worker neprovádí).
```

Contentorizácia: Toto je change request na existujíci projekt; používá existující Payload platformu. Worker navede přesně WHAT/acceptance; HOW (pole, migrace, spiritu) rozhoduje Codex podle repozitáře a AGENTS.md.