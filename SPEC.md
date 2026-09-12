# Zadání – test vývojového workflow

**Status:** APPROVED
**Owner:** David Brázda
**Schváleno:** 2026-09-12

## Cíl

Ověřit celý vývojový proces na nejmenším možném webu: zadání → architektura → bootstrap infrastruktury → Development Handoff → implementace Codexem → PR → Coolify preview.

## Scope

- Veřejná stránka zobrazí text „Hello world“.
- Stránka bude použitelná na mobilu i notebooku.
- Nasazená aplikace bude mít funkční readiness endpoint.
- Výsledek bude dostupný přes HTTPS preview vytvořené pro implementační pull request.

## Acceptance criteria

- Na kořenové URL je viditelný přesný text `Hello world`.
- Stránka vrací HTTP 200 a nemá zjevný horizontální overflow při běžné mobilní ani desktopové šířce.
- `/api/health` vrací HTTP 200 pouze při dostupné aplikaci a databázi.
- Relevantní testy, lint, typecheck a produkční build projdou.
- Implementace vznikne na samostatné branchi, commitu a pull requestu.
- Coolify poskytne samostatnou HTTPS preview URL pro pull request.

## Out of scope

- Přihlášení návštěvníků, vlastní obsahový model, externí integrace a analytika.
- Vlastní vizuální identita nebo komplexní design systém.
- Změna sdílené webové platformy či deployment mechanismu.
- Merge implementačního PR do produkce bez lidského schválení preview.
