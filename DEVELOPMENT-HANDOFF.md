# Change Request – Multi-page "success site" s editovatelným obsahom

```text
TASK: Z předvyplněného testovacího webu vytvořit vizuálně krásný, moderný landing-page web „velice úspěšné stránky"
STATUS: APPROVED FOR DEVELOPMENT
APPROVED BY: David Brázda (2026-09-14)

SCOPE:
- Publicní frontend se změní z jedné prázdné stránky na moderný, vizuálně polsky
  landing-page (estetika úspěšné SaaS/marketing stránky – moderný hero, produkťové
  sekcie, čistý typografie, responzivní), o pár stránkách (home + 1–2 podstránky).
- Vše obsah, který má zobrazovat návštěvník (titul, podtitul, hero, sekce, text
  podstranek), pochádí z existující Payload kolekce `Pages` a je editovatelný v `/admin`.
- Page má nové pole `slug` pro adresovatelnost v URL (napr. `/`, `/features`, `/about`),
  aby šlo o pár stránkách.
- Dvě stranky budou předvyplněné kvalitným textem (seed data přes verzovanou migraciu/seed
  script) – jedna doma, jedna podstránka.
- Zachovat existující fallback, když neexistuje žiadna Page (vizualní varianta „Hello world").
- Pokrýt nové routy a editovatelný obsah testami (e2e/integration) a zachovat existující gates zelené.

ACCEPTANCE CRITERIA:
- Domovska URL (/) vrací HTTP 200 a zobrazuje moderný landing design čítající obsah z Pages (fallback, když Pages prázdné).
- Přinejmenně jedna podstránka (URL podle slug) vrací 200 a zobrazuje předvyplněný obsah.
- Dvě Page dokumenty existují v DB (seed) a oba jsou zobrazitelné na veřejné stranky.
- Kdy v adminu pán upraví obsah Page (title/content), změní se na zodpovídající veřejné stranky.
- V `/admin` je v EDIT: kolekce `Pages` s polami slug, title, content (rich text).
- Stránky nemajú viditelný horizontálny overflow při 375px a 1366px.
- `/api/health` vrací HTTP 200.
- Lokálne gates projdou přes `scripts/quality.sh` (LOCAL_OK).
- CI green a Coolify preview URL existuje a prošel verify.
- Implementace na samostatní branchi a pull requestu.

INPUTS:
- SPEC.md (SPEC_READY)
- ARCHITECTURE.md (ARCHITECTURE_READY)
- WEB_PLATFORM.md
- PROJECT-INFRASTRUCTURE.md (INFRASTRUCTURE_READY)
- DEVELOPMENT-HANDOFF.md (APPROVED FOR DEVELOPMENT)
- AGENTS.md

TARGET:
- repository: https://github.com/drew2323/web-development-workflow-test
- branch: feat/landing-pages (worker môže zvolit konvariantní název)

WORKER:
- Codex CLI (headless)

EXPECTED RESULT:
- Moderný multi-page landing web, obsah z Pages
- dvě seed Page dokumenty s textem
- routy: / (home) a podstránky podle slug
- lokálne gates green (`scripts/quality.sh`), CI green
- commit a PR
- Coolify preview URL, nebo explicit blocker

OUT OF SCOPE:
- Změna deployment mechanismu, Dockerfile, deploy hooků, healthcheck u webhooku.
- Změna sdílené webové platformy či architektury (jen frontend + Pages kolekce, žádné
  nové kolekce/globals/nepotřebné komponenty).
- Změna produkčné data (seed jen pro nové stranky, zálohovo fallback bez žiadné Page).
- Merge do produkce a nasazení bez lidského schválení preview.
- `scripts/preflight.sh --infrastructure` (gate zodpovědnosti Team Agenta, worker neprovádí).
```

Contentorizácia: Toto je change request na existujíci projekt; používá existující Payload `Pages` kolekce a standardní Next.js/Payload platformu. Worker navede WHAT/acceptance; HOW (design, struktura rout, pole/slug schema, seed mechanizmus) rozhoduje Codex podle repozitáře a AGENTS.md, při zachování stručnosti a bez rozsáhlých nových závislostí.