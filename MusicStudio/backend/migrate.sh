echo "Waiting for PostgreSQL..."
while ! nc -z postgres 5432; do
  sleep 1
done
echo "PostgreSQL is ready!"

echo "Running database migrations..."
npx prisma migrate dev --name init

echo "Migrations complete!"