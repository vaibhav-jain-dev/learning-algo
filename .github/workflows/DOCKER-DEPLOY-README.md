# Docker Compose Deployment Guide

Simple 4-step setup for deploying via GitHub Actions or locally.

---

## Step 1: Server Setup

Run these commands on your server to create a deployment user with all required access.

```bash
# ============================================================
# COMPLETE SERVER SETUP (run as root or with sudo)
# ============================================================

# 1. Create deployer user with password
sudo useradd -m -s /bin/bash deployer
sudo passwd deployer

# 2. Add to docker and sudo groups
sudo usermod -aG docker,sudo deployer

# 3. Create projects directory
sudo mkdir -p /projects
sudo chown deployer:deployer /projects

# 4. Install Docker
curl -fsSL https://get.docker.com | sudo sh
sudo systemctl enable docker
sudo systemctl start docker

# 5. Enable BuildKit for faster builds
echo '{"features":{"buildkit":true}}' | sudo tee /etc/docker/daemon.json
sudo systemctl restart docker

# 6. Install Cloudflared
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb && rm cloudflared.deb

# 7. Switch to deployer user for remaining setup
sudo su - deployer

# 8. Configure Git
git config --global user.name "Deploy"
git config --global user.email "deploy@example.com"

# 9. Generate SSH key for GitHub
ssh-keygen -t ed25519 -f ~/.ssh/github_key -N ""

# 10. Configure SSH for GitHub
cat >> ~/.ssh/config << 'EOF'
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_key
    IdentitiesOnly yes
EOF
chmod 600 ~/.ssh/config ~/.ssh/github_key
ssh-keyscan github.com >> ~/.ssh/known_hosts

# 11. Show public key (you'll need this for Step 2)
echo ""
echo "=========================================="
echo "COPY THIS KEY FOR GITHUB DEPLOY KEYS:"
echo "=========================================="
cat ~/.ssh/github_key.pub
echo "=========================================="
```

### What deployer user can do:
| Access | Purpose |
|--------|---------|
| `docker` group | Run docker/docker-compose without sudo |
| `sudo` group | Edit cloudflared config, restart services |
| SSH key | Clone/pull from GitHub |

### Cloudflare Tunnel Config

Edit `/etc/cloudflared/config.yml`:

```yaml
tunnel: YOUR_TUNNEL_ID
credentials-file: /root/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  - hostname: learn.arvaibhav.cloud
    service: http://localhost:8080
  - hostname: learn-api.arvaibhav.cloud
    service: http://localhost:8080
  - service: http_status:404
```

Restart after editing: `sudo systemctl restart cloudflared`

---

## Step 2: GitHub Deploy Key Setup

Add the server's public key to GitHub so it can clone/pull your repo.

1. Go to your GitHub repo → **Settings** → **Deploy keys**
2. Click **Add deploy key**
3. **Title:** `Server Deploy Key`
4. **Key:** Paste the public key from Step 1 (output of `cat ~/.ssh/github_key.pub`)
5. ☑️ Check **Allow write access** (optional, only if you need push)
6. Click **Add key**

### Test on Server

```bash
# Test GitHub connection (run as deployer)
ssh -T git@github.com
# Expected: "Hi username! You've successfully authenticated..."

# Test clone
cd /projects
git clone git@github.com:YOUR_USERNAME/YOUR_REPO.git
```

---

## Step 3: GitHub Actions Secrets & Variables

Go to: **Repository** → **Settings** → **Secrets and variables** → **Actions**

### 🔐 SECRETS (Sensitive - click "New repository secret")

| Name | Type | Value | How to Get |
|------|------|-------|------------|
| `SSH_PRIVATE_KEY` | **Secret** | Private key for SSH to server | See below |
| `ENV_FILE` | **Secret** | Environment variables for app | Optional - see below |

#### Getting SSH_PRIVATE_KEY

Generate a NEW key pair on your **local machine** (not the server):

```bash
# On your LOCAL machine
ssh-keygen -t ed25519 -f ~/.ssh/server_deploy_key -N ""

# Copy public key to server
ssh-copy-id -i ~/.ssh/server_deploy_key.pub deployer@YOUR_SERVER_IP

# Test connection
ssh -i ~/.ssh/server_deploy_key deployer@YOUR_SERVER_IP "echo Success"

# Display private key - COPY THIS ENTIRE OUTPUT to GitHub Secret
cat ~/.ssh/server_deploy_key
```

Copy the **entire** output including:
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUA...
-----END OPENSSH PRIVATE KEY-----
```

#### ENV_FILE (Optional)

If your app needs environment variables, create a secret named `ENV_FILE` with content like:

```env
DB_HOST=your-db-host.com
DB_PASSWORD=secret123
REDIS_URL=redis://localhost:6379
```

### 📋 VARIABLES (Non-sensitive - click "Variables" tab → "New repository variable")

| Name | Type | Value | Example |
|------|------|-------|---------|
| `SSH_HOST` | **Variable** | Server IP or hostname | `192.168.1.100` |
| `SSH_USERNAME` | **Variable** | SSH username | `deployer` |
| `SSH_PORT` | **Variable** | SSH port (optional) | `22` |

### Summary

```
SECRETS (🔐 sensitive, encrypted):
├── SSH_PRIVATE_KEY  → Private key to SSH into server
└── ENV_FILE         → App environment variables (optional)

VARIABLES (📋 non-sensitive, visible):
├── SSH_HOST         → Server IP/hostname
├── SSH_USERNAME     → deployer
└── SSH_PORT         → 22 (optional)
```

---

## Step 4: Local Deployment (Without GitHub Actions)

To deploy from your local machine directly:

### 4.1 Create `.env.deploy` file

```bash
# Copy example and edit
cp .env.deploy.example .env.deploy
nano .env.deploy
```

Contents of `.env.deploy`:

```bash
# Server connection
SSH_HOST=YOUR_SERVER_IP
SSH_USERNAME=deployer
SSH_PORT=22

# Path to your SSH private key (the one whose public key is in server's authorized_keys)
SSH_PRIVATE_KEY=~/.ssh/server_deploy_key

# Optional: Path to .env file to deploy
ENV_FILE=.env.production
```

### 4.2 Run Deployment

```bash
# Normal deployment
./scripts/deploy.sh

# Force restart (recreates all containers)
./scripts/deploy.sh --force

# Dry run (show what would happen)
./scripts/deploy.sh --dry-run
```

### 4.3 Quick One-liner

```bash
SSH_HOST=your-server SSH_USERNAME=deployer SSH_PRIVATE_KEY=~/.ssh/server_deploy_key ./scripts/deploy.sh
```

---

## Quick Reference

### Two SSH Keys Explained

| Key | Where Generated | Where Public Key Goes | Purpose |
|-----|-----------------|----------------------|---------|
| **Server → GitHub** | On server (`~/.ssh/github_key`) | GitHub Deploy Keys | Server can clone/pull repo |
| **Local/Actions → Server** | On local machine | Server's `~/.ssh/authorized_keys` | Deploy script can SSH to server |

### Common Commands on Server

```bash
# View running containers
docker compose ps

# View logs
docker compose logs -f dsalgo-learn-app

# Restart services
docker compose restart

# Rebuild and restart
docker compose up -d --build

# Restart cloudflare tunnel
sudo systemctl restart cloudflared

# View cloudflare logs
sudo journalctl -u cloudflared -f
```

### Troubleshooting

```bash
# Test GitHub SSH (on server)
ssh -T git@github.com

# Test server SSH (from local)
ssh -i ~/.ssh/server_deploy_key deployer@YOUR_SERVER_IP

# Check Docker access
docker ps

# Check cloudflared
sudo systemctl status cloudflared
```
