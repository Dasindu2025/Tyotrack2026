#!/bin/bash

# Tyotrack VPS Initialization Script (Military-Grade Hardening)
# Target: Ubuntu 24.04 LTS

set -e

echo "🚀 Initializing Tyotrack Secure Enclave on VPS..."

# 1. Update System
echo "📦 Updating system packages..."
apt-get update && apt-get upgrade -y

# 2. Install Docker & Compose
echo "🐳 Installing Docker & Docker Compose..."
apt-get install -y ca-certificates curl gnupg lsb-release unzip
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 2.1 Symlink for docker-compose compatibility
echo "🔗 Creating docker-compose symlink..."
ln -sf /usr/libexec/docker/cli-plugins/docker-compose /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 3. System Hardening (UFW)
echo "🛡️ Hardening Network Infrastructure..."
apt-get install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 8000/tcp
ufw allow 5555/tcp
ufw --force enable

# 4. Fail2Ban for SSH Protection
echo "🚫 Configuring Fail2Ban..."
apt-get install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

echo "✅ VPS Hardening Complete. Use Git or SFTP to transfer the Tyotrack directory."
echo "Once transferred, run: bash deploy.sh"
