# Docker Compose Deployment via SSH

A GitHub Action workflow for automated deployment of Docker Compose applications to remote servers.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Setup Guide](#setup-guide)
  - [Step 1: Server Preparation](#step-1-server-preparation)
  - [Step 2: SSH Key Generation](#step-2-ssh-key-generation) | [**Detailed SSH Guide**](./SSH-SETUP-GUIDE.md)
  - [Step 3: GitHub Configuration](#step-3-github-configuration)
- [Workflow Features](#workflow-features)
- [Usage](#usage)
- [Cloudflare Integration](#cloudflare-integration)
- [External Services Configuration](#external-services-configuration)
- [Troubleshooting](#troubleshooting)

> **New to SSH Keys?** See the [Complete SSH Key Setup Guide](./SSH-SETUP-GUIDE.md) for detailed step-by-step instructions with all commands.

---

## Overview

This workflow automates the deployment process from GitHub to your server:

```mermaid
flowchart LR
    A[📝 Push Code] --> B[🔍 Validate Config]
    B --> C[🔐 Test SSH]
    C --> D[📦 Deploy]
    D --> E[🐳 Docker Compose Up]
    E --> F[✅ Health Check]
```

---

## Architecture

```mermaid
flowchart TB
    subgraph GitHub["☁️ GitHub"]
        GH_REPO[("📂 Repository")]
        GH_SECRETS["🔐 Secrets<br/>SSH_PRIVATE_KEY<br/>ENV_FILE"]
        GH_VARS["📋 Variables<br/>SSH_HOST<br/>SSH_USERNAME<br/>SSH_PORT"]
        GH_ACTION["⚙️ GitHub Action"]
    end

    subgraph Server["🖥️ Remote Server"]
        SSH_DAEMON["🔑 SSH Daemon"]
        AUTH_KEYS["📜 authorized_keys"]
        GIT["📥 Git"]
        DOCKER["🐳 Docker Engine"]
        PROJECT["📁 /projects/repo"]
    end

    GH_REPO --> GH_ACTION
    GH_SECRETS --> GH_ACTION
    GH_VARS --> GH_ACTION
    GH_ACTION -->|"SSH Connection"| SSH_DAEMON
    SSH_DAEMON --> AUTH_KEYS
    AUTH_KEYS -->|"✓ Authenticated"| GIT
    GIT -->|"Clone/Pull"| PROJECT
    PROJECT --> DOCKER
```

---

## Prerequisites

Before setting up the workflow, ensure your server meets these requirements:

### Server Requirements Checklist

| Requirement | Command to Verify | Installation |
|------------|-------------------|--------------|
| **SSH Server** | `systemctl status sshd` | Pre-installed on most servers |
| **Git** | `git --version` | `sudo apt install git` |
| **Docker** | `docker --version` | [Install Docker](https://docs.docker.com/engine/install/) |
| **Docker Compose** | `docker compose version` | Included with Docker Desktop / `sudo apt install docker-compose-plugin` |

### Git Global Configuration

The server must have Git configured for the deployment user:

```bash
# Set git user identity (required for git operations)
git config --global user.name "Deploy Bot"
git config --global user.email "deploy@yourdomain.com"

# Verify configuration
git config --global --list
```

---

## Setup Guide

### Step 1: Server Preparation

#### 1.1 Create Deployment User (Optional but Recommended)

```bash
# On your server - create a dedicated deployment user
sudo useradd -m -s /bin/bash deployer
sudo usermod -aG docker deployer  # Allow docker access without sudo
```

#### 1.2 Configure Git on Server

```bash
# Login as deployment user
sudo su - deployer

# Configure git identity
git config --global user.name "GitHub Deploy"
git config --global user.email "deploy@example.com"

# Configure git to use HTTPS for GitHub (avoids SSH key for repo cloning)
git config --global url."https://github.com/".insteadOf "git@github.com:"
```

#### 1.3 Create Project Directory

```bash
# Create the projects directory
sudo mkdir -p /projects
sudo chown deployer:deployer /projects
```

---

### Step 2: SSH Key Generation

> **Detailed Guide Available:** For comprehensive instructions with troubleshooting, see the [**Complete SSH Key Setup Guide**](./SSH-SETUP-GUIDE.md)

```mermaid
sequenceDiagram
    participant L as 💻 Your Local Machine
    participant G as ☁️ GitHub Secrets
    participant S as 🖥️ Remote Server

    L->>L: Generate SSH Key Pair
    Note over L: ssh-keygen creates<br/>private + public key
    L->>G: Copy Private Key
    Note over G: Store as SSH_PRIVATE_KEY
    L->>S: Copy Public Key
    Note over S: Add to authorized_keys
    G->>S: GitHub Action connects
    Note over G,S: Private key authenticates<br/>against public key
```

#### Quick Start Commands

```bash
# 1. Generate key pair (on your local machine)
ssh-keygen -t ed25519 -C "deploy-key" -f ~/.ssh/deploy_key
# Press Enter for no passphrase (required for automation)

# 2. Copy public key to server
ssh-copy-id -i ~/.ssh/deploy_key.pub username@your-server-ip

# 3. Test connection
ssh -i ~/.ssh/deploy_key username@your-server-ip "echo 'Success!'"

# 4. View private key (for GitHub Secrets)
cat ~/.ssh/deploy_key
```

#### Key Files Created

| File | Location | Purpose | Goes To |
|------|----------|---------|---------|
| Private Key | `~/.ssh/deploy_key` | Authentication | GitHub Secrets / `.env.deploy` |
| Public Key | `~/.ssh/deploy_key.pub` | Authorization | Server `~/.ssh/authorized_keys` |

> **Need help?** See [SSH-SETUP-GUIDE.md](./SSH-SETUP-GUIDE.md) for detailed troubleshooting, permission fixes, and best practices.

---

### Step 3: GitHub Configuration

#### 3.1 Navigate to Repository Settings

```
Repository → Settings → Secrets and variables → Actions
```

```mermaid
flowchart LR
    A[Repository] --> B[Settings]
    B --> C[Secrets and variables]
    C --> D[Actions]
    D --> E[New repository secret]
    D --> F[New repository variable]
```

#### 3.2 Add Required Secrets

Go to **Secrets** tab and add:

| Secret Name | Value | How to Get |
|-------------|-------|------------|
| `SSH_PRIVATE_KEY` | Full private key content | `cat ~/.ssh/github_deploy_key` |
| `ENV_FILE` | Your `.env` file content | `cat /path/to/your/.env` |

##### Adding SSH_PRIVATE_KEY

1. Click **"New repository secret"**
2. Name: `SSH_PRIVATE_KEY`
3. Value: Paste the **entire** private key including headers:

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtz
c2gtZWQyNTUxOQAAACBmMGk3bXhYcGRUMHVWM0ZGZE1kVGpCOE5EMklYdGpIbUFB
...
-----END OPENSSH PRIVATE KEY-----
```

> **⚠️ Critical**: Include the `-----BEGIN` and `-----END` lines. Copy the entire output without modifications.

##### Adding ENV_FILE (Optional)

1. Click **"New repository secret"**
2. Name: `ENV_FILE`
3. Value: Your application's environment variables:

```env
DATABASE_URL=postgres://user:pass@localhost:5432/db
API_KEY=your-secret-api-key
NODE_ENV=production
```

#### 3.3 Add Variables

Go to **Variables** tab and add:

| Variable Name | Value | Example |
|---------------|-------|---------|
| `SSH_HOST` | Server IP or hostname | `192.168.1.100` or `deploy.example.com` |
| `SSH_USERNAME` | SSH username | `deployer` or `ubuntu` |
| `SSH_PORT` | SSH port (optional) | `22` or `2222` |

```mermaid
flowchart TB
    subgraph Secrets["🔐 Secrets (Sensitive)"]
        S1["SSH_PRIVATE_KEY<br/><i>Required</i>"]
        S2["ENV_FILE<br/><i>Optional</i>"]
    end

    subgraph Variables["📋 Variables (Non-Sensitive)"]
        V1["SSH_HOST<br/><i>Required</i>"]
        V2["SSH_USERNAME<br/><i>Required</i>"]
        V3["SSH_PORT<br/><i>Optional, default: 22</i>"]
    end
```

#### 3.4 Complete Configuration Checklist

```
✅ Server has Git installed and configured
✅ Server has Docker and Docker Compose installed
✅ SSH key pair generated
✅ Public key added to server's ~/.ssh/authorized_keys
✅ SSH connection tested successfully
✅ GitHub Secret: SSH_PRIVATE_KEY added
✅ GitHub Variable: SSH_HOST added
✅ GitHub Variable: SSH_USERNAME added
✅ (Optional) GitHub Secret: ENV_FILE added
✅ (Optional) GitHub Variable: SSH_PORT added
```

---

## Workflow Features

### Deployment Flow

```mermaid
flowchart TB
    subgraph Validate["🔍 Job 1: Validate"]
        V1[Check SSH_HOST] --> V2[Check SSH_USERNAME]
        V2 --> V3[Check SSH_PRIVATE_KEY]
        V3 --> V4[Check Key Format]
        V4 --> V5{All Valid?}
    end

    subgraph Test["🔐 Job 2: Test Connection"]
        T1[Setup SSH Key] --> T2[Add to known_hosts]
        T2 --> T3[Verbose SSH Test]
        T3 --> T4{Connected?}
    end

    subgraph Deploy["📦 Job 3: Deploy"]
        D1[Setup Directory] --> D2{Repo Exists?}
        D2 -->|No| D3[Git Clone]
        D2 -->|Yes| D4[Git Pull]
        D3 --> D5[Create .env]
        D4 --> D5
        D5 --> D6{Force Restart?}
        D6 -->|Yes| D7[Docker Compose Down]
        D6 -->|No| D8[Docker Compose Up]
        D7 --> D8
        D8 --> D9[Health Check]
    end

    V5 -->|Yes| Test
    V5 -->|No| FAIL1[❌ Fail]
    T4 -->|Yes| Deploy
    T4 -->|No| FAIL2[❌ Fail]
    D9 --> SUCCESS[✅ Success]
```

### Feature Summary

| Feature | Description |
|---------|-------------|
| **Validation** | Checks all required config before deployment |
| **SSH Testing** | Verbose connection test with debugging |
| **Auto Clone/Pull** | Clones new repos or updates existing |
| **Environment Management** | Deploys `.env` from GitHub Secrets |
| **Force Restart** | Optional full teardown and rebuild |
| **Health Checks** | Post-deployment container verification |
| **Cloudflare Integration** | Auto-configure tunnel routes |

---

## Usage

### Local Deployment (Recommended for Testing)

Use the local deployment script to test deployments without triggering GitHub Actions:

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
SSH_HOST=your-server SSH_USERNAME=ubuntu ./scripts/deploy.sh
```

#### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SSH_HOST` | Server IP or hostname | `192.168.1.100` |
| `SSH_USERNAME` | SSH user | `ubuntu` |
| `SSH_PRIVATE_KEY` | Path to private key | `~/.ssh/id_rsa` (default) |
| `SSH_PORT` | SSH port | `22` (default) |

#### Optional Variables

| Variable | Description |
|----------|-------------|
| `PROJECT_PATH` | Custom deployment path |
| `ENV_FILE` | Path to .env file to deploy |

```mermaid
flowchart LR
    subgraph Local["💻 Local Machine"]
        SCRIPT["./scripts/deploy.sh"]
        ENV[".env.deploy"]
        KEY["SSH Private Key"]
    end

    subgraph Server["🖥️ Remote Server"]
        SSH["SSH Daemon"]
        DEPLOY["Deployment"]
    end

    ENV --> SCRIPT
    KEY --> SCRIPT
    SCRIPT -->|"SSH"| SSH
    SSH --> DEPLOY
```

### GitHub Actions (Manual Trigger)

> **Note:** Automatic deployment on push is disabled. Use manual trigger or local script.

1. Go to **Actions** tab in your repository
2. Select **"Deploy Docker Compose"** workflow
3. Click **"Run workflow"**
4. Configure options:
   - **Force restart**: Check to perform full container teardown
   - **Custom project path**: Override default `/projects/<repo-name>`

```mermaid
flowchart LR
    A[Actions Tab] --> B[Deploy Docker Compose]
    B --> C[Run workflow]
    C --> D{Options}
    D --> E[Force restart: false]
    D --> F[Project path: default]
    E --> G[🚀 Run]
    F --> G
```

---

## Cloudflare Integration

### Auto-Configuration

The workflow automatically configures Cloudflare Tunnel routes by scanning your `docker-compose.yml` for special labels.

**Domain Pattern:** `{subdomain}.arvaibhav.cloud`

### Adding Cloudflare Labels

```yaml
services:
  webapp:
    image: nginx
    labels:
      - "cloudflare:learn.arvaibhav.cloud:8080"
    ports:
      - "8080:8080"

  api:
    image: node:18
    labels:
      - "cloudflare:learn-api.arvaibhav.cloud:8080"
    ports:
      - "8080:8080"
```

### Label Format

```
cloudflare:<subdomain>.arvaibhav.cloud:<port>
```

| Component | Description | Example |
|-----------|-------------|---------|
| `subdomain` | Your subdomain | `learn`, `learn-api` |
| `domain` | Base domain | `arvaibhav.cloud` |
| `port` | Container's internal port | `8080` |

### Current Configured Routes

| Subdomain | URL | Port |
|-----------|-----|------|
| Frontend | `https://learn.arvaibhav.cloud` | 8080 |
| API | `https://learn-api.arvaibhav.cloud` | 8080 |

### Requirements

- `cloudflared` installed on server
- Tunnel configured at `/etc/cloudflared/config.yml`
- Tunnel service running

---

## External Services Configuration

The application supports external Redis, PostgreSQL, and Elasticsearch services via environment variables. By default, it uses the local Docker services.

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

# Kibana (optional)
KIBANA_URL=https://your-kibana-host.com:5601

# CORS Origins (optional - customize allowed domains)
ALLOWED_ORIGINS=https://learn.arvaibhav.cloud,https://learn-api.arvaibhav.cloud,https://*.arvaibhav.cloud
```

### Using External Services Only

If using only external services, you can start without local dependencies:

```bash
# Start app without local Redis/Postgres/Elasticsearch
docker compose up dsalgo-learn-app --no-deps
```

Or modify `docker-compose.yml` to remove `depends_on` for external services.

```mermaid
flowchart TB
    subgraph Docker["🐳 Docker Compose"]
        APP["📱 App Container"]
    end

    subgraph External["☁️ External Services"]
        PG["🐘 PostgreSQL"]
        ES["🔍 Elasticsearch"]
        REDIS["📦 Redis"]
    end

    subgraph EnvVars["📋 Environment Variables"]
        DB_URL["DB_HOST, DB_PORT, etc."]
        ES_URL_VAR["ES_URL"]
        REDIS_URL_VAR["REDIS_URL"]
    end

    EnvVars --> APP
    APP -->|"DB_HOST"| PG
    APP -->|"ES_URL"| ES
    APP -->|"REDIS_URL"| REDIS
```

---

## Troubleshooting

### Common Issues

#### SSH Connection Failed

```mermaid
flowchart TB
    A[SSH Failed] --> B{Check Host}
    B -->|Invalid| B1[Verify SSH_HOST value]
    B -->|Valid| C{Check Port}
    C -->|Blocked| C1[Check firewall rules]
    C -->|Open| D{Check Key}
    D -->|Invalid| D1[Regenerate SSH key pair]
    D -->|Valid| E{Check authorized_keys}
    E -->|Missing| E1[Add public key to server]
    E -->|Present| F[Check key permissions]
    F --> F1[chmod 600 authorized_keys]
```

#### Permission Denied

```bash
# On server - fix SSH directory permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 644 ~/.ssh/known_hosts  # if exists

# Fix ownership
chown -R $USER:$USER ~/.ssh
```

#### Git Pull Fails

```bash
# On server - ensure git is configured
git config --global user.name "Deploy"
git config --global user.email "deploy@example.com"

# If using private repo, configure credentials
git config --global credential.helper store
```

#### Docker Permission Denied

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Apply changes (or logout/login)
newgrp docker

# Verify
docker ps
```

### Debug Checklist

| Check | Command | Expected |
|-------|---------|----------|
| SSH Port Open | `nc -zv server-ip 22` | Connection succeeded |
| Key Permissions | `ls -la ~/.ssh/` | 600 for keys, 700 for dir |
| Public Key Added | `cat ~/.ssh/authorized_keys` | Contains your public key |
| Git Installed | `git --version` | git version x.x.x |
| Docker Running | `docker ps` | No permission errors |
| Docker Compose | `docker compose version` | Docker Compose version x.x.x |

### Viewing Workflow Logs

1. Go to **Actions** tab
2. Click on the failed workflow run
3. Expand each job to see detailed logs
4. Look for error messages in red

---

## Security Best Practices

1. **Use dedicated deployment keys** - Don't reuse personal SSH keys
2. **Limit key permissions** - Use `command=` restriction in `authorized_keys` if possible
3. **Rotate keys regularly** - Update SSH keys periodically
4. **Use secrets for sensitive data** - Never commit credentials to the repository
5. **Restrict branch triggers** - Only deploy from protected branches

---

## Support

- **Workflow Issues**: Check the [GitHub Actions logs](../../actions)
- **SSH Problems**: Review the [Troubleshooting](#troubleshooting) section
- **Feature Requests**: Open an issue in this repository
