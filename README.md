# Web Development Workflow Test

Ověřovací skeleton standardního stacku Next.js + Payload CMS + PostgreSQL a delivery workflow GitHub → Coolify.

## Lokální spuštění

```sh
cp .env.example .env
docker compose up -d postgres
corepack pnpm install --frozen-lockfile
set -a; . ./.env; set +a
./scripts/migrate.sh
corepack pnpm dev
```

Aplikace běží na `http://localhost:3000`, health endpoint na `/api/health`.

## Ověření

```sh
./scripts/preflight.sh --infrastructure
PLAYWRIGHT_EXECUTABLE_PATH=/usr/bin/chromium ./scripts/quality.sh
```

Produkční kontejner spouští `scripts/start.sh`: PostgreSQL advisory lock → verzované migrace → Next.js server. Coolify pre-deploy command zůstává prázdný.

## Dokumentace

- `SPEC.md` — scope a acceptance criteria
- `ARCHITECTURE.md` — schválená architektura
- `PROJECT-INFRASTRUCTURE.md` — skutečné prostředky a ověřovací důkazy
- `WEB_PLATFORM.md` — projektový delivery kontrakt
