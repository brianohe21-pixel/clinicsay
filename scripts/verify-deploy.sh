#!/usr/bin/env bash
set -euo pipefail

BACKEND_URL="${1:-http://localhost:3000}"
PATIENT_ID="mock-patient-ana-torres-001"

echo "Checking health..."
curl -sf "$BACKEND_URL/health" | grep -q '"status":"ok"'

echo "Checking patient alerts..."
curl -sf "$BACKEND_URL/patients/$PATIENT_ID/alerts" | grep -q '\['

echo "Deploy verification passed for $BACKEND_URL"
