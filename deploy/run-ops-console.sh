#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
CONTAINER_NAME=${OPS_CONSOLE_CONTAINER:-plozen-ops-console}
IMAGE_NAME=${OPS_CONSOLE_IMAGE:-plozen-ops-console:latest}
PORT=${OPS_CONSOLE_PORT:-3100}

docker build -t "$IMAGE_NAME" "$PROJECT_ROOT"

docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true

docker run -d \
  --name "$CONTAINER_NAME" \
  --restart unless-stopped \
  -p "$PORT:3000" \
  "$IMAGE_NAME"
