# Change Request – Modern responsive dashboard aplikace (demo režim)

```text
TASK: Na existující testovacím webu vybudovat moderný responzívny dashboard pro
řízení malé zakázkové firmy a osobních financí, nezávislý na existující
landing-page frontendu, s veřejným ukázkovým režimem a smyšlenými daty.
Vizuálně inspirováno referencí https://demo.epowoodbros.cz/demo/personal
(EpoFlow) – používá se jen její vizuální jazyk, ne obsah ani branding.

STATUS: APPROVED FOR DEVELOPMENT
APPROVED BY: David Brázda
DATE: 2026-09-14

SCOPE:
- Dashboard dostupný na samostatných routách: /dashboard, /analytics,
  /activity, /personal, /settings (App Router, route groups).
- Existující landing-page frontend (/) a Payload Pages kolekce půstanou
  neporušeny; dashboard žije jako dodatek vedle nich.
- Stack: Next.js 16, App Router, TypeScript, React Server Components jako
  default, Client Components jen pro grafy/interaktivitu, Tailwind CSS 4,
  Lucide React (ikony), Recharts (grafy), next/font (Inter + Fraunces).
  Žádný velký UI framework (MUI/Ant/PrimeReact), žádný shadcn/Radix bez důvodu.
- Design tokeny jako CSS variables (--background, --surface, --surface-muted,
  --foreground, --muted, --border, --primary, --success, --warning, --danger,
  --accent); žádné random hardcoded barvy.
- Layout: desktop = persistentní levý sidebar + content; mobile = dole fixed
  bottom navigation (4–5 položek), sidebar zmizí, žádný horizontální overflow.
- Znovupoužitelné malé komponenty (AppShell, Sidebar, BottomNavigation,
  PageHeader, MetricCard, Panel, ChartCard, NavigationItem, EmptyState);
  žádné předčasné abstrakce.
- Obsah dashboardu (3–4 KPI karty, donut/pie, monthly bar chart, recent
  activity, category breakdown, progress/target card) s realistickými mock data.
- Business sekce: přehled firmy, zákázky a stavy, nabídky, obchodní příležitosti,
  databáze zákazníkov, faktury a platby, přehled DPH, poznámky, kalkulačka
  spotřeby a ceny epoxidu.
- Osobní sekce: přehled financí, evidence/kategorizace výdajov, měsíční/roční
  souhrny, grafy podle měsíců a kategorií, majetek a zůstatky, seznam věci na
  kúpu.
- Data statická, definována server-side; bez backendu a bez databázi nových.
- Architektura pripravená tak, aby později šlo snadno připojit PostgreSQL /
  Payload CMS / API.

ACCEPTANCE CRITERIA:
- /dashboard, /analytics, /activity, /personal, /settings vracajú HTTP 200 a
  zobrazujú dashboard UI.
- Existující routy landing-page (/, [slug]) a /api/health půstanú funkční.
- Dashboard má desktop sidebar a mobile bottom nav; bez horizontálního overflowu
  při 375px a 1366px.
- Existující lokálne gates (lint, typecheck, test:int, build, test:e2e) projdú.
- Veřejný ukázkový režim evidentní (mock data + neaktivní akce).
- Implementace na samostatní branchi a pull requestu; Coolify preview URL.

INPUTS:
- Toto DEVELOPMENT-HANDOFF.md (scope)
- ARCHITECTURE.md (ARCHITECTURE_READY)
- WEB_PLATFORM.md
- PROJECT-INFRASTRUCTURE.md (INFRASTRUCTURE_READY)
- AGENTS.md

TARGET:
- repository: https://github.com/drew2323/web-development-workflow-test
- branch: feat/dashboard

WORKER:
- Codex CLI (headless)

EXPECTED RESULT:
- Dashboard UI na roudách /dashboard, /analytics, /activity, /personal, /settings
- mock data server-side, design tokeny, responzivní layout
- lokálne gates green (scripts/quality.sh → LOCAL_OK), CI green
- commit a PR, Coolify preview URL, nebo explicit blocker

OUT OF SCOPE:
- Změna deployment mechanismu, Dockerfile, deploy hooků, healthchecku ani webhooku.
- Změna sdílené webové platformy či existující landing-page/Payload architektury.
- Nový backend, nová databázi nebo nové kolekce/globals v Payload.
- Skutečná e-commerce/fakturácia logika; jen ukázkový režim.
- Změna produkčné data; merge do produkce pouze po lidském schválení preview.
- scripts/preflight.sh --infrastructure (infrastrukturní gate zodpovědnosti
  Team Agenta, worker neprovádí).
```

Contentorizácia: Toto je change request na existujíci projekt; dashboard je
frontend-only dodatek na existující Next.js štandard. Predpokladá už hotový
skeleton deployment a preview pipeline. POZOR: existující (frontend) routy
landing-page používají Payload; nové dashboard routy MUSÍ byt oddělené route
group (napr. pod (dashboard)/...) a nesmí konfliktovat s Pages slug routou.
Worker rozváže HOW (struktura rout, Tailwind setup v existující Next.js 16
projektu, design tokeny, komponenty), při zachování stručnosti a min. závislostí.
Před vytvořením PRu spusť lokálne gates (pnpm lint, typecheck, test:int, build,
test:e2e) a oprav všechny chyby.