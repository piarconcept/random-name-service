#!/usr/bin/env bash
set -e

echo "=== Installing dependencies ==="
npm install

echo "=== Building service ==="
npm run build

echo "=== Invoking function locally ==="
cat <<EOF > event.json
{
  "body": "{\"country\":\"ES\",\"minAge\":25,\"maxAge\":40,\"sex\":\"F\"}"
}
EOF

npx serverless invoke local --function generateName --path event.json
rm event.json