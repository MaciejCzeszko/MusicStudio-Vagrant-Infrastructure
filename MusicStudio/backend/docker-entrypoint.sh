#!/bin/sh
set -e

DB_HOST=192.168.56.103
DB_PORT=5432

echo "Waiting for postgres at $DB_HOST:$DB_PORT..."
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 0.1
done
echo "PostgreSQL started"

echo "Running migrations..."
npx prisma migrate deploy

echo "Generating Prisma Client..."
npx prisma generate

echo "Running seed..."
npx prisma db seed || echo "Seed failed or already run"

echo "Starting application..."
exec "$@"