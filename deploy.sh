#!/bin/bash

# ==============================================================================
# Tyotrack Enterprise Workforce Platform - Deployment Script
# ==============================================================================

# Ensure script stops on error
set -e

echo "🚀 Initializing Tyotrack Corporate Deployment..."

# 1. Check dependencies
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed."
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Error: Docker Compose is not installed."
    exit 1
fi

# 2. Zero-Config Secret Generation
SECRETS_FILE=".secrets.env"

if [ ! -f "$SECRETS_FILE" ]; then
    echo "🔐 Generating cryptographically secure secrets..."
    
    JWT_SECRET=$(openssl rand -hex 64)
    POSTGRES_PASSWORD=$(openssl rand -hex 24)
    REDIS_PASSWORD=$(openssl rand -hex 24)
    SUPER_ADMIN_PASSWORD=$(openssl rand -hex 12)
    
    cat <<EOF > "$SECRETS_FILE"
POSTGRES_USER=tyo_admin
POSTGRES_DB=tyotrack
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
REDIS_PASSWORD=$REDIS_PASSWORD
JWT_SECRET=$JWT_SECRET
SUPER_ADMIN_EMAIL=admin@tyotrack.enterprise
SUPER_ADMIN_PASSWORD=$SUPER_ADMIN_PASSWORD
DATABASE_URL=postgresql+asyncpg://tyo_admin:$POSTGRES_PASSWORD@db:5432/tyotrack
EOF
    
    echo "✅ Secrets generated and secured in $SECRETS_FILE"
    echo "----------------------------------------------------------------"
    echo "💎 SUPER ADMIN CREDENTIALS (SAVE THESE)"
    echo "Email: admin@tyotrack.enterprise"
    echo "Password: $SUPER_ADMIN_PASSWORD"
    echo "----------------------------------------------------------------"
else
    echo "✅ Using existing secrets from $SECRETS_FILE"
fi

# 3. Pull and Build
echo "🏗️ Building and starting services..."
docker compose --env-file "$SECRETS_FILE" up --build -d

echo "📊 System Status:"
docker compose ps

echo "🎉 Deployment Successful!"
echo "📍 Platform Access: http://localhost:3000"
echo "🛠️ API Documentation: http://localhost:8000/docs"
