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
  - [Step 3: GitHub Configuration](#step-3-github-configuration)
- [Workflow Features](#workflow-features)
- [Usage](#usage)
- [Cloudflare Integration](#cloudflare-integration)
- [Troubleshooting](#troubleshooting)

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

#### 2.1 Generate SSH Key Pair

Run these commands on your **local machine** (not the server):

```bash
# Generate a new SSH key pair specifically for deployment
ssh-keygen -t ed25519 -C "github-deploy-key" -f ~/.ssh/github_deploy_key

# This creates two files:
#   ~/.ssh/github_deploy_key       (Private Key - goes to GitHub)
#   ~/.ssh/github_deploy_key.pub   (Public Key - goes to Server)
```

> **⚠️ Important**: When prompted for a passphrase, press Enter for no passphrase (required for automated deployment).

#### 2.2 Add Public Key to Server

Copy the public key to your server's `authorized_keys`:

```bash
# Option A: Using ssh-copy-id (easiest)
ssh-copy-id -i ~/.ssh/github_deploy_key.pub deployer@your-server-ip

# Option B: Manual method
# First, display the public key
cat ~/.ssh/github_deploy_key.pub

# Then on the server, add it to authorized_keys
ssh deployer@your-server-ip
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "YOUR_PUBLIC_KEY_CONTENT" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

#### 2.3 Verify SSH Connection

Test the connection before configuring GitHub:

```bash
# Test SSH connection with the new key
ssh -i ~/.ssh/github_deploy_key deployer@your-server-ip "echo 'Connection successful!'"
```

#### 2.4 Get the Private Key for GitHub

```bash
# Display the private key (you'll copy this to GitHub)
cat ~/.ssh/github_deploy_key

# Output will look like:
# -----BEGIN OPENSSH PRIVATE KEY-----
# b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAA...
# ...many more lines...
# -----END OPENSSH PRIVATE KEY-----
```

> **🔒 Security Note**: The private key is sensitive. Never share it publicly or commit it to a repository.

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

### Automatic Deployment

Push to `main` or `master` branch to trigger deployment:

```bash
git push origin main
```

### Manual Deployment

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

### Adding Cloudflare Labels

```yaml
services:
  webapp:
    image: nginx
    labels:
      - "cloudflare:myapp.example.com:80"
    ports:
      - "80:80"

  api:
    image: node:18
    labels:
      - "cloudflare:api.example.com:3000"
    ports:
      - "3000:3000"
```

### Label Format

```
cloudflare:<subdomain>:<port>
```

| Component | Description | Example |
|-----------|-------------|---------|
| `subdomain` | Your Cloudflare subdomain | `myapp.example.com` |
| `port` | Container's internal port | `80`, `3000`, `8080` |

### Requirements

- `cloudflared` installed on server
- Tunnel configured at `/etc/cloudflared/config.yml`
- Tunnel service running

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
