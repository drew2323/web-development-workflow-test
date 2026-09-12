#!/bin/sh
set -eu

BASE_URL=${1:-${BASE_URL:-}}
if [ -z "$BASE_URL" ]; then
  echo "Usage: $0 <base-url>" >&2
  exit 2
fi

BASE_URL=${BASE_URL%/}
curl --fail --silent --show-error --max-time 15 "$BASE_URL/api/health" >/dev/null
curl --fail --silent --show-error --max-time 15 "$BASE_URL/" >/dev/null
printf 'verified: %s\n' "$BASE_URL"
