# Docker Compose Deployment via SSH

A GitHub Action workflow for automated deployment of Docker Compose applications to remote servers.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Setup Guide](#setup-guide)
  - [Step 1: Server Preparation](#step-1-server-preparation)
  - [Step 2: SSH Key Generation](#step-2-ssh-key-generation)
  - [Step 3: GitHub SSH Setup (For Private Repos)](#step-3-github-ssh-setup-for-private-repos)
  - [Step 4: GitHub Actions Configuration](#step-4-github-actions-configuration)
- [Cloudflare Tunnel Setup](#cloudflare-tunnel-setup)
- [Service Management](#service-management)
- [Usage](#usage)
- [External Services Configuration](#external-services-configuration)
- [Troubleshooting](#troubleshooting)

> **New to SSH Keys?** See the [Complete SSH Key Setup Guide](./SSH-SETUP-GUIDE.md) for detailed step-by-step instructions with all commands.

---

## Overview

This workflow automates the deployment process from GitHub to your server:

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Push Code   │───▶│   Validate   │───▶│   Test SSH   │───▶│    Deploy    │───▶│ Health Check │
│              │    │    Config    │    │  Connection  │    │   to Server  │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              GITHUB                                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │   Repository    │  │     Secrets     │  │    Variables    │              │
│  │                 │  │ SSH_PRIVATE_KEY │  │    SSH_HOST     │              │
│  │                 │  │    ENV_FILE     │  │  SSH_USERNAME   │              │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘              │
│           └────────────────────┼────────────────────┘                        │
│                                ▼                                             │
│                    ┌─────────────────────┐                                   │
│                    │   GitHub Actions    │                                   │
│                    └──────────┬──────────┘                                   │
└───────────────────────────────┼──────────────────────────────────────────────┘
                                │ SSH Connection
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           REMOTE SERVER                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │   SSH Daemon    │  │  authorized_keys │  │    Git Clone   │              │
│  │   (Port 22)     │  │    (pub key)     │  │  /projects/    │              │
│  └────────┬────────┘  └─────────────────┘  └────────┬────────┘              │
│           │                                          │                       │
│           ▼                                          ▼                       │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │                    Docker Compose                            │            │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐│            │
│  │  │ App     │  │ Postgres│  │  Redis  │  │  Elasticsearch  ││            │
│  │  │ :8080   │  │ :5432   │  │  :6379  │  │     :9200       ││            │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────────────┘│            │
│  └─────────────────────────────────────────────────────────────┘            │
│                                │                                             │
│                                ▼                                             │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │              Cloudflare Tunnel (cloudflared)                 │            │
│  │         learn.arvaibhav.cloud ──▶ localhost:8080             │            │
│  └─────────────────────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

### Server Requirements Checklist

| Requirement | Command to Verify | Installation |
|------------|-------------------|--------------|
| **SSH Server** | `systemctl status sshd` | Pre-installed on most servers |
| **Git** | `git --version` | `sudo apt install git` |
| **Docker** | `docker --version` | [Install Docker](#install-docker) |
| **Docker Compose** | `docker compose version` | Included with Docker |
| **Cloudflared** | `cloudflared --version` | [Install Cloudflared](#install-cloudflared) |

---

## Setup Guide

### Step 1: Server Preparation

#### 1.1 Create Deployment User with Full Access

```bash
# ============================================================
# Run these commands as root or with sudo on your server
# ============================================================

# Create deployment user
sudo useradd -m -s /bin/bash deployer

# Set password (you'll be prompted)
sudo passwd deployer

# Add to required groups
sudo usermod -aG docker deployer      # Docker access (no sudo needed)
sudo usermod -aG sudo deployer        # Sudo access (optional but useful)

# Create projects directory
sudo mkdir -p /projects
sudo chown deployer:deployer /projects

# Verify user creation
id deployer
# Output: uid=1001(deployer) gid=1001(deployer) groups=1001(deployer),998(docker),27(sudo)
```

#### 1.2 Install Docker and Docker Compose

```bash
# ============================================================
# Install Docker (Ubuntu/Debian)
# ============================================================

# Remove old versions
sudo apt-get remove docker docker-engine docker.io containerd runc 2>/dev/null

# Install prerequisites
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release

# Add Docker GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Verify installation
docker --version
docker compose version
```

#### 1.3 Enable BuildKit for Fast Builds (IMPORTANT)

BuildKit provides **parallel builds**, **better caching**, and **50%+ faster** build times.

```bash
# ============================================================
# Enable BuildKit permanently (one-time setup)
# ============================================================

# Create Docker daemon config
echo '{"features":{"buildkit":true}}' | sudo tee /etc/docker/daemon.json

# Restart Docker to apply
sudo systemctl restart docker

# Verify BuildKit is enabled
docker buildx version
```

**Why BuildKit?**
| Feature | Without BuildKit | With BuildKit |
|---------|-----------------|---------------|
| Build speed | Sequential layers | Parallel layer builds |
| Caching | Basic | Advanced multi-stage caching |
| Build output | Verbose | Clean, progressive output |
| Build context | Full transfer | Only changed files |

#### 1.4 Configure Git on Server

```bash
# Switch to deployment user
sudo su - deployer

# Configure git identity (REQUIRED)
git config --global user.name "GitHub Deploy"
git config --global user.email "deploy@example.com"

# Verify
git config --global --list
```

---

### Step 2: SSH Key Generation

Generate SSH keys for GitHub Actions to connect to your server.

```
┌────────────────────┐         ┌────────────────────┐         ┌────────────────────┐
│   LOCAL MACHINE    │         │      GITHUB        │         │   REMOTE SERVER    │
│                    │         │                    │         │                    │
│  Generate Key Pair │         │                    │         │                    │
│  ┌──────────────┐  │         │                    │         │                    │
│  │ Private Key  │──┼────────▶│  SSH_PRIVATE_KEY   │         │                    │
│  │ Public Key   │──┼─────────┼───────────────────▶│  authorized_keys    │
│  └──────────────┘  │         │                    │         │                    │
└────────────────────┘         └────────────────────┘         └────────────────────┘
```

#### Generate and Deploy SSH Keys

```bash
# ============================================================
# On your LOCAL machine (not the server!)
# ============================================================

# 1. Generate SSH key pair for deployment
ssh-keygen -t ed25519 -C "github-deploy-key" -f ~/.ssh/github_deploy_key
# Press Enter twice for no passphrase (required for automation)

# 2. Copy public key to server
ssh-copy-id -i ~/.ssh/github_deploy_key.pub deployer@YOUR_SERVER_IP

# 3. Test SSH connection
ssh -i ~/.ssh/github_deploy_key deployer@YOUR_SERVER_IP "echo 'SSH Connection Successful!'"

# 4. Display private key (copy this to GitHub Secrets)
echo "=== COPY EVERYTHING BELOW TO GITHUB SSH_PRIVATE_KEY SECRET ==="
cat ~/.ssh/github_deploy_key
echo "=== END OF PRIVATE KEY ==="
```

---

### Step 3: GitHub SSH Setup (For Private Repos)

If your repository is **private**, the server needs SSH access to GitHub to clone/pull.

```
┌────────────────────┐         ┌────────────────────┐         ┌────────────────────┐
│   REMOTE SERVER    │         │      GITHUB        │         │    PRIVATE REPO    │
│                    │         │                    │         │                    │
│  Generate Key Pair │         │                    │         │                    │
│  ┌──────────────┐  │         │                    │         │                    │
│  │ Private Key  │──┼────────▶│  (stays on server) │         │                    │
│  │ Public Key   │──┼────────▶│  Deploy Keys       │────────▶│  Read Access       │
│  └──────────────┘  │         │  (repo settings)   │         │                    │
└────────────────────┘         └────────────────────┘         └────────────────────┘
```

#### 3.1 Generate GitHub Deploy Key on Server

```bash
# ============================================================
# Run these commands ON THE SERVER as deployer user
# ============================================================

# Switch to deployer user
sudo su - deployer

# Generate SSH key for GitHub access
ssh-keygen -t ed25519 -C "server-github-deploy" -f ~/.ssh/github_key
# Press Enter twice for no passphrase

# Display the public key (copy this)
echo "=== ADD THIS PUBLIC KEY TO GITHUB DEPLOY KEYS ==="
cat ~/.ssh/github_key.pub
echo "=== END OF PUBLIC KEY ==="
```

#### 3.2 Add Deploy Key to GitHub Repository

1. Go to your GitHub repository
2. Navigate to **Settings** → **Deploy keys**
3. Click **Add deploy key**
4. Title: `Server Deploy Key`
5. Key: Paste the public key from above
6. Check ✅ **Allow write access** (if you need push capability)
7. Click **Add key**

#### 3.3 Configure SSH to Use the Key for GitHub

```bash
# ============================================================
# ON THE SERVER - Configure SSH for GitHub
# ============================================================

# Create/edit SSH config
cat >> ~/.ssh/config << 'EOF'
# GitHub SSH Configuration
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_key
    IdentitiesOnly yes
EOF

# Set correct permissions
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/github_key
chmod 644 ~/.ssh/github_key.pub

# Add GitHub to known_hosts (prevents "authenticity" prompt)
ssh-keyscan github.com >> ~/.ssh/known_hosts 2>/dev/null

# Test GitHub SSH connection
ssh -T git@github.com
# Expected output: "Hi username! You've successfully authenticated..."
```

#### 3.4 Test Git Clone

```bash
# Test cloning your private repo
cd /projects
git clone git@github.com:YOUR_USERNAME/YOUR_REPO.git test-clone
ls test-clone/
rm -rf test-clone  # Clean up test
```

---

### Step 4: GitHub Actions Configuration

#### 4.1 Navigate to Repository Settings

```
Repository → Settings → Secrets and variables → Actions
```

#### 4.2 Add Required Secrets

Go to **Secrets** tab and add:

| Secret Name | Value | How to Get |
|-------------|-------|------------|
| `SSH_PRIVATE_KEY` | Full private key content | `cat ~/.ssh/github_deploy_key` (from local machine) |
| `ENV_FILE` | Your `.env` file content | Optional - application environment variables |

**Important:** Include the entire key with headers:
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAAB...
-----END OPENSSH PRIVATE KEY-----
```

#### 4.3 Add Variables

Go to **Variables** tab and add:

| Variable Name | Value | Example |
|---------------|-------|---------|
| `SSH_HOST` | Server IP or hostname | `192.168.1.100` |
| `SSH_USERNAME` | SSH username | `deployer` |
| `SSH_PORT` | SSH port (optional) | `22` |

#### 4.4 Configuration Checklist

```
✅ Server: deployer user created with docker group access
✅ Server: Docker and Docker Compose installed
✅ Server: Git installed and configured
✅ Server: GitHub SSH key generated and added to repo Deploy Keys
✅ Server: SSH config points to GitHub key
✅ Server: GitHub SSH connection tested successfully
✅ Local: SSH key pair generated for GitHub Actions
✅ Local: Public key copied to server's authorized_keys
✅ GitHub: SSH_PRIVATE_KEY secret added
✅ GitHub: SSH_HOST variable added
✅ GitHub: SSH_USERNAME variable added
```

---

## Cloudflare Tunnel Setup

### Install Cloudflared

```bash
# ============================================================
# ON THE SERVER - Install Cloudflared
# ============================================================

# Download and install
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
rm cloudflared.deb

# Verify installation
cloudflared --version
```

### Configure Tunnel

```bash
# Login to Cloudflare (opens browser for authentication)
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create dsalgo-learn

# Note the Tunnel ID from output (e.g., a1b2c3d4-...)

# Create config file
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

**Tunnel Config (`/etc/cloudflared/config.yml`):**

```yaml
tunnel: YOUR_TUNNEL_ID
credentials-file: /root/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  # Main application
  - hostname: learn.arvaibhav.cloud
    service: http://localhost:8080

  # API endpoint (same service, different subdomain)
  - hostname: learn-api.arvaibhav.cloud
    service: http://localhost:8080

  # Catch-all (required)
  - service: http_status:404
```

### Install as System Service

```bash
# Install service
sudo cloudflared service install

# Start and enable
sudo systemctl start cloudflared
sudo systemctl enable cloudflared

# Check status
sudo systemctl status cloudflared
```

### Add DNS Records

In Cloudflare Dashboard:
1. Go to your domain's DNS settings
2. Add CNAME records:
   - `learn` → `YOUR_TUNNEL_ID.cfargotunnel.com`
   - `learn-api` → `YOUR_TUNNEL_ID.cfargotunnel.com`

---

## Service Management

### Restart Services After Changes

```bash
# ============================================================
# ON THE SERVER - Service restart commands
# ============================================================

# Restart Docker Compose services (preserves data)
cd /projects/learning-algo
docker compose restart

# Full restart (recreates containers)
docker compose down && docker compose up -d

# Rebuild and restart (after code changes)
docker compose up -d --build

# Force recreate all containers
docker compose up -d --force-recreate
```

### Restart Cloudflare Tunnel (After Config Changes)

```bash
# Restart cloudflared after editing /etc/cloudflared/config.yml
sudo systemctl restart cloudflared

# Check logs for errors
sudo journalctl -u cloudflared -f --no-pager -n 50

# Validate config before restart
cloudflared tunnel ingress validate
```

### Update Ingress Rules

```bash
# 1. Edit tunnel config
sudo nano /etc/cloudflared/config.yml

# 2. Validate the config
cloudflared tunnel ingress validate

# 3. Restart tunnel to apply changes
sudo systemctl restart cloudflared

# 4. Verify new routes
cloudflared tunnel info YOUR_TUNNEL_ID
```

### Common Service Commands

| Action | Command |
|--------|---------|
| View running containers | `docker compose ps` |
| View container logs | `docker compose logs -f` |
| View specific service logs | `docker compose logs -f dsalgo-learn-app` |
| Stop all services | `docker compose down` |
| Stop and remove volumes | `docker compose down -v` |
| Pull latest images | `docker compose pull` |
| Check cloudflared status | `sudo systemctl status cloudflared` |
| View cloudflared logs | `sudo journalctl -u cloudflared -f` |

---

## Usage

### Local Deployment (Recommended for Testing)

```bash
# 1. Copy the example config
cp .env.deploy.example .env.deploy

# 2. Edit with your server details
nano .env.deploy

# 3. Run deployment
./scripts/deploy.sh

# Or with force restart
./scripts/deploy.sh --force

# Dry run (show what would happen)
./scripts/deploy.sh --dry-run
```

#### Quick One-liner

```bash
SSH_HOST=your-server SSH_USERNAME=deployer ./scripts/deploy.sh
```

### GitHub Actions (Manual Trigger)

1. Go to **Actions** tab in your repository
2. Select **"Deploy Docker Compose"** workflow
3. Click **"Run workflow"**
4. Configure options:
   - **Force restart**: Check to perform full container teardown
   - **Custom project path**: Override default `/projects/<repo-name>`

---

## External Services Configuration

### Environment Variables

Set these in your `.env` file or GitHub Secrets (`ENV_FILE`):

```bash
# PostgreSQL - External Database
DB_HOST=your-postgres-host.com
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database

# Elasticsearch - External Service
ES_URL=https://your-elasticsearch-host.com:9200

# Redis - External Service
REDIS_URL=redis://your-redis-host.com:6379

# CORS Origins (customize allowed domains)
ALLOWED_ORIGINS=https://learn.arvaibhav.cloud,https://learn-api.arvaibhav.cloud
```

### Using External Services Only

```bash
# Start app without local Redis/Postgres/Elasticsearch
docker compose up dsalgo-learn-app --no-deps
```

---

## Troubleshooting

### SSH Connection Failed

```bash
# Test SSH connection with verbose output
ssh -vvv -i ~/.ssh/github_deploy_key deployer@YOUR_SERVER_IP

# Check if SSH service is running on server
sudo systemctl status sshd

# Check firewall
sudo ufw status
sudo ufw allow 22/tcp
```

### Permission Denied

```bash
# On server - fix SSH directory permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/github_key
chmod 600 ~/.ssh/config
chown -R $USER:$USER ~/.ssh
```

### Git Clone Fails (Private Repo)

```bash
# Test GitHub SSH connection
ssh -T git@github.com

# If it fails, check:
# 1. Deploy key added to repo settings
# 2. ~/.ssh/config has correct GitHub config
# 3. ~/.ssh/github_key permissions are 600
```

### Docker Permission Denied

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Apply changes (logout/login or run)
newgrp docker

# Verify
docker ps
```

### Cloudflare Tunnel Not Working

```bash
# Check tunnel status
sudo systemctl status cloudflared

# View logs
sudo journalctl -u cloudflared -f

# Validate config
cloudflared tunnel ingress validate

# Test local service
curl http://localhost:8080
```

### Debug Checklist

| Check | Command | Expected |
|-------|---------|----------|
| SSH Port Open | `nc -zv server-ip 22` | Connection succeeded |
| Key Permissions | `ls -la ~/.ssh/` | 600 for keys, 700 for dir |
| Public Key Added | `cat ~/.ssh/authorized_keys` | Contains your public key |
| Git Installed | `git --version` | git version x.x.x |
| GitHub SSH | `ssh -T git@github.com` | "Hi username! You've..." |
| Docker Running | `docker ps` | No permission errors |
| Docker Compose | `docker compose version` | Docker Compose version x.x.x |
| Cloudflared | `sudo systemctl status cloudflared` | active (running) |

---

## Security Best Practices

1. **Use dedicated deployment keys** - Don't reuse personal SSH keys
2. **Limit key permissions** - Use `command=` restriction in `authorized_keys` if possible
3. **Rotate keys regularly** - Update SSH keys periodically
4. **Use secrets for sensitive data** - Never commit credentials to the repository
5. **Restrict branch triggers** - Only deploy from protected branches
6. **Use read-only deploy keys** - Unless push access is required

---

## Quick Reference

### Complete Server Setup (Copy-Paste)

```bash
# ============================================================
# COMPLETE SERVER SETUP - Run as root or with sudo
# ============================================================

# 1. Create user and install dependencies
sudo useradd -m -s /bin/bash deployer
sudo passwd deployer
sudo usermod -aG docker,sudo deployer
sudo mkdir -p /projects
sudo chown deployer:deployer /projects

# 2. Install Docker (if not installed)
curl -fsSL https://get.docker.com | sudo sh
sudo systemctl enable docker

# 3. Enable BuildKit for fast builds (IMPORTANT!)
echo '{"features":{"buildkit":true}}' | sudo tee /etc/docker/daemon.json
sudo systemctl restart docker

# 4. Switch to deployer and configure
sudo su - deployer

# 5. Configure Git
git config --global user.name "GitHub Deploy"
git config --global user.email "deploy@example.com"

# 6. Generate GitHub SSH key
ssh-keygen -t ed25519 -C "server-github" -f ~/.ssh/github_key -N ""

# 7. Configure SSH for GitHub
cat >> ~/.ssh/config << 'EOF'
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_key
    IdentitiesOnly yes
EOF
chmod 600 ~/.ssh/config ~/.ssh/github_key
ssh-keyscan github.com >> ~/.ssh/known_hosts

# 8. Display public key (add to GitHub Deploy Keys)
echo "Add this to GitHub repo → Settings → Deploy keys:"
cat ~/.ssh/github_key.pub

# 9. Test (after adding deploy key to GitHub)
ssh -T git@github.com
```
