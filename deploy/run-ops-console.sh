#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
CONTAINER_NAME=${OPS_CONSOLE_CONTAINER:-plozen-ops-console}
PORT=${OPS_CONSOLE_PORT:-3100}

docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true

docker run -d \
  --name "$CONTAINER_NAME" \
  --restart unless-stopped \
  -p "$PORT:80" \
  -v "$PROJECT_ROOT/public:/usr/share/nginx/html:ro" \
  -v "$PROJECT_ROOT/design-kit/pub/web:/usr/share/nginx/design-kit:ro" \
  -v "$PROJECT_ROOT/deploy/nginx/default.conf:/etc/nginx/conf.d/default.conf:ro" \
  nginx:alpine
