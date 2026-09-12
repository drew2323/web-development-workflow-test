# Web Platform Standard

Projekt používá bez výjimky sdílený standard z `/home/david/Projects/mini-team/standards/WEB_PLATFORM.md` ve stavu platném při bootstrapu 2026-09-12.

## Platforma

- Next.js a TypeScript
- Payload CMS
- PostgreSQL
- GitHub
- Coolify na `vpswebfarma`
- Tailwind CSS a design tokeny pro produktové UI

## Delivery contract

- `pnpm build` sestaví aplikaci bez změny DB.
- `pnpm start` spustí aplikaci na `0.0.0.0:3000`.
- Migrace jsou verzované a spouští je `scripts/migrate.sh` přes `scripts/pre-deploy.sh`.
- `/api/health` ověřuje aplikaci i databázi.
- `scripts/verify.sh <base-url>` ověřuje homepage a health zvenčí.
- Každá implementační změna: branch → commit → PR → Coolify preview → lidské schválení → merge → production.
- Preview a production mají oddělené databáze a secrets.

## Odpovědnosti

- Team Agent vlastní WHAT, scope a acceptance criteria.
- `web-architecture` vlastní high-level strukturu a výjimky.
- `project-bootstrap` instancuje a ověřuje infrastrukturu.
- Codex jako coding worker rozhoduje HOW až podle schváleného Development Handoffu.

Při konfliktu má přednost schválené `ARCHITECTURE.md`, poté tento projektový výtah a následně obecná preference workeru.
