#!/bin/sh
set -eu

: "${DATABASE_URL:?DATABASE_URL is required}"

corepack pnpm run payload -- migrate
