#!/usr/bin/env bash
set -euo pipefail

export PATH="$HOME/.turso:$PATH"

DB_NAME="${1:-clinicsay-demo}"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"

if ! command -v turso >/dev/null 2>&1; then
  echo "Turso CLI not found. Install: curl -sSfL https://get.tur.so/install.sh | bash"
  exit 1
fi

WHOAMI="$(turso auth whoami 2>&1 || true)"
if [[ "$WHOAMI" == *"not logged in"* ]]; then
  echo "Not logged in. Run: turso auth login"
  exit 1
fi

if ! turso db show "$DB_NAME" >/dev/null 2>&1; then
  turso db create "$DB_NAME"
fi

DATABASE_URL="$(turso db show "$DB_NAME" --url)"
DATABASE_AUTH_TOKEN="$(turso db tokens create "$DB_NAME")"

if [[ ! "$DATABASE_URL" == libsql://* ]]; then
  echo "Invalid DATABASE_URL from Turso CLI"
  exit 1
fi

echo "DATABASE_URL=$DATABASE_URL"
echo "DATABASE_AUTH_TOKEN=$DATABASE_AUTH_TOKEN"
echo ""
echo "Applying migrations..."

MIGRATIONS_DIR="$BACKEND_DIR/prisma/migrations"
for migration_dir in "$MIGRATIONS_DIR"/*/; do
  migration_file="$migration_dir/migration.sql"
  if [[ -f "$migration_file" ]]; then
    migration_name="$(basename "$migration_dir")"
    echo "Applying $migration_name..."
    turso db shell "$DB_NAME" < "$migration_file"
  fi
done

cd "$BACKEND_DIR"
DATABASE_URL="$DATABASE_URL" DATABASE_AUTH_TOKEN="$DATABASE_AUTH_TOKEN" pnpm db:seed

echo ""
echo "Turso setup complete. Add DATABASE_URL and DATABASE_AUTH_TOKEN to Railway."
