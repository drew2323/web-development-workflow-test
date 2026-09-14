# Development Handoff

```text
TASK: Hello World stránka – test initial implementation
STATUS: HANDOFF_READY
APPROVED BY: David Brázda (2026-09-14)

SCOPE:
- Veřejná kořenová stránka zobrazí text „Hello world“.
- Stránka ostane použitelná na mobilu a notebooku (bez vodorovného overflow).
- Readiness endpoint `/api/health` zůstane funkční a bude ověřovat aplikaci i databázi.
- Postupující lokální gates (lint, typecheck, testy, produkční build) zverované přes `scripts/quality.sh`.
- Změna na samostatné feature branchi, commit a pull request.

ACCEPTANCE CRITERIA:
- Na kořenové URL je viditelný přesný text `Hello world` (HTTP 200).
- Stránka nemá zjevný horizontální overflow při běžné mobilní ani desktopové šířce.
- `/api/health` vrací HTTP 200 pouze při dostupné aplikaci a databázi.
- Relevantní testy, lint, typecheck a produkční build projdou.
- Coolify poskytne samostatnou HTTPS preview URL pro pull request.

INPUTS:
- SPEC.md (STATUS: SPEC_READY, schváleno 2026-09-12)
- ARCHITECTURE.md (STATUS: ARCHITECTURE_READY, schváleno 2026-09-12)
- WEB_PLATFORM.md
- PROJECT-INFRASTRUCTURE.md (STATUS: INFRASTRUCTURE_READY)
- AGENTS.md

TARGET:
- repository: https://github.com/drew2323/web-development-workflow-test
- branch: feat/hello-world

WORKER:
- Codex CLI (headless, `--sandbox danger-full-access`)

EXPECTED RESULT:
- implementation „Hello world“ na kořenové stránce
- lokálne gates green přes `scripts/quality.sh`
- CI green
- commit a pull request
- Coolify preview URL, nebo explicit blocker

OUT OF SCOPE:
- Změna deployment mechanismu, Dockerfile, deploy hooků, healthcheck u webhooku.
- Změna sdílené webové platformy či architektury.
- Merge implementačního PR do produkce bez lidského schválení preview.
- `scripts/preflight.sh --infrastructure` — infrastrukturní gate zodpovědnosti Team Agent/Hermes, worker ho neprovádí.
```

Stav je `HANDOFF_READY` po explicitním schválení scope a architektury Davidem (SPEC `SPEC_READY`, ARCHITECTURE `ARCHITECTURE_READY`, oba 2026-09-12; tato continuation schváluje start implementace 2026-09-14). Založeno podle `WEB_DELIVERY_WORKFLOW.md` (`HANDOFF_READY`): Codex dostane pouze tento schválený handoff, neprovisionuje infrastrukturu ani nemění deployment mechanismus.