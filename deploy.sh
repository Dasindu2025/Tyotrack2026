#!/bin/bash

# ==============================================================================
# Tyotrack 2026: Military-Grade Deployment Protocol
# ==============================================================================

set -e

echo "⚔️ Initializing Tyotrack Secure Enclave..."

# 1. Dependency Validation
declare -a DEPS=("docker" "docker-compose" "openssl")
for dep in "${DEPS[@]}"; do
    if ! command -v "$dep" &> /dev/null; then
        echo "❌ Critical Error: $dep is not in PATH."
        exit 1
    fi
done

# 2. Cryptographic Secret Generation (Zero-Config)
SECRETS_FILE=".secrets.env"
if [ ! -f "$SECRETS_FILE" ]; then
    echo "🔐 Generating high-entropy cryptographic keys..."
    
    JWT_SECRET=$(openssl rand -hex 64)
    POSTGRES_PASSWORD=$(openssl rand -hex 32)
    REDIS_PASSWORD=$(openssl rand -hex 32)
    SUPER_ADMIN_PASSWORD=$(openssl rand -hex 16)
    
    cat <<EOF > "$SECRETS_FILE"
POSTGRES_USER=tyo_commander
POSTGRES_DB=tyotrack_secure
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
REDIS_PASSWORD=$REDIS_PASSWORD
JWT_SECRET=$JWT_SECRET
SUPER_ADMIN_EMAIL=commander@tyotrack.enterprise
SUPER_ADMIN_PASSWORD=$SUPER_ADMIN_PASSWORD
DATABASE_URL=postgresql+asyncpg://tyo_commander:$POSTGRES_PASSWORD@db:5432/tyotrack_secure
EOF
    
    chmod 600 "$SECRETS_FILE"
    echo "✅ Enclave secrets locked in $SECRETS_FILE"
    echo "----------------------------------------------------------------"
    echo "🎖️ COMMANDER ACCESS CREDENTIALS"
    echo "Login: commander@tyotrack.enterprise"
    echo "Pass:  $SUPER_ADMIN_PASSWORD"
    echo "----------------------------------------------------------------"
fi

# 3. Infrastructure Orchestration (Sequential Build for stability on 1-CPU VPS)
echo "🏗️ Scaling secure containers..."

# Pull base images first
docker compose --env-file "$SECRETS_FILE" pull db redis flower

# Build and start baseline infra
docker compose --env-file "$SECRETS_FILE" up -d db redis flower

# Build and start API components (Linearly to save CPU/RAM)
echo "⚡ Building Secure API Layer..."
docker compose --env-file "$SECRETS_FILE" up --build -d api

echo "⚡ Building Intelligence Dashboard (Next.js)..."
docker compose --env-file "$SECRETS_FILE" up --build -d web

echo "⚡ Building Background Workers..."
docker compose --env-file "$SECRETS_FILE" up --build -d worker

# 4. Post-Deployment Health Check
echo "📡 Verifying system integrity..."
MAX_RETRIES=12
COUNT=0
until $(curl -sf http://localhost:8000/health > /dev/null); do
    if [ $COUNT -eq $MAX_RETRIES ]; then
      echo "❌ Deployment failure: API heartbeat not detected."
      exit 1
    fi
    echo -n "."
    sleep 5
    ((COUNT++))
done

echo -e "\n🎉 MISSION SUCCESSFUL!"
echo "📍 Secure Access: http://localhost:3000"
echo "🛠️ API Spec:      http://localhost:8000/api/v1/docs"
echo "🌸 Worker Mon:    http://localhost:5555"
