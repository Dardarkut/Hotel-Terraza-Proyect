#!/usr/bin/env sh
if [ -z "$HUSKY" ]; then
  echo "husky - not running inside a Git hook"
  exit 0
fi

HOOK_NAME="$(basename "$0")"
HOOK_SCRIPT="$(dirname "$0")/../$HOOK_NAME"

if [ -f "$HOOK_SCRIPT" ]; then
  exec sh "$HOOK_SCRIPT" "$@"
else
  echo "husky - hook script not found: $HOOK_SCRIPT"
  exit 0
fi
