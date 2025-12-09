#!/bin/bash

# Simple publish script for the monorepo
# Usage: ./scripts/publish-all.sh [dry-run]

set -e

echo "Build all packages..."
npm run build

if [ "$1" == "dry-run" ]; then
  echo "Publishing (DRY RUN)..."
  npm publish --workspaces --access public --dry-run
else
  echo "Publishing to registry..."
  # Note: This requires you to be logged in to npm
  npm publish --workspaces --access public
fi
