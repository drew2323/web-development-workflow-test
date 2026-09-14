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
- `scripts/start.sh` spustí verzované migrace přes `scripts/migrate.sh` a poté aplikaci na `0.0.0.0:3000`.
- Coolify pre-deploy command je prázdný; první deployment nesmí záviset na starém kontejneru. `scripts/migrate.sh` serializuje souběžné starty PostgreSQL advisory lockem; při horizontálním škálování je preferovaný samostatný migrační job.
- `/api/health` ověřuje aplikaci i databázi.
- `scripts/preflight.sh` ověří vstupy, `scripts/quality.sh` spustí lokální gates, `scripts/verify.sh <base-url>` ověří deployment a `scripts/verify-preview.sh` uzavře preview gate.
- Každá implementační změna: branch → commit → PR → Coolify preview → lidské schválení → merge → production.
- Preview a production mají oddělené databáze a secrets.

## Odpovědnosti

- Team Agent vlastní WHAT, scope a acceptance criteria.
- `web-architecture` vlastní high-level strukturu a výjimky.
- `project-bootstrap` instancuje a ověřuje infrastrukturu.
- Codex jako coding worker rozhoduje HOW až podle schváleného Development Handoffu.

Při konfliktu má přednost schválené `ARCHITECTURE.md`, poté tento projektový výtah a následně obecná preference workeru.
