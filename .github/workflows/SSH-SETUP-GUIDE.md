# SSH Key Setup Guide for Deployment

Complete guide to setting up SSH key authentication for automated deployments.

---

## Table of Contents

- [Overview](#overview)
- [How SSH Key Authentication Works](#how-ssh-key-authentication-works)
- [Step-by-Step Setup](#step-by-step-setup)
  - [Step 1: Generate SSH Key Pair](#step-1-generate-ssh-key-pair)
  - [Step 2: Add Public Key to Server](#step-2-add-public-key-to-server)
  - [Step 3: Test Connection](#step-3-test-connection)
  - [Step 4: Configure for Deployment](#step-4-configure-for-deployment)
- [Key Management Best Practices](#key-management-best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

SSH key authentication allows secure, passwordless access to your server. This is required for automated deployments via GitHub Actions or local scripts.

```mermaid
flowchart LR
    subgraph Local["💻 Your Machine"]
        PRIV["🔐 Private Key<br/><i>~/.ssh/deploy_key</i>"]
    end

    subgraph Server["🖥️ Remote Server"]
        AUTH["📜 authorized_keys<br/><i>~/.ssh/authorized_keys</i>"]
        PUB["🔑 Public Key"]
    end

    PRIV -->|"Authentication Request"| AUTH
    PUB -->|"Stored in"| AUTH
    AUTH -->|"✓ Match = Access Granted"| Server
```

---

## How SSH Key Authentication Works

```mermaid
sequenceDiagram
    participant L as 💻 Local Machine
    participant S as 🖥️ Server

    Note over L: Has Private Key
    Note over S: Has Public Key in authorized_keys

    L->>S: 1. Connection Request
    S->>L: 2. Send Challenge (encrypted with public key)
    L->>L: 3. Decrypt with Private Key
    L->>S: 4. Send Response
    S->>S: 5. Verify Response
    S->>L: 6. ✓ Access Granted
```

| Component | Location | Purpose |
|-----------|----------|---------|
| **Private Key** | Your local machine (`~/.ssh/`) | Proves your identity (NEVER share) |
| **Public Key** | Server (`~/.ssh/authorized_keys`) | Allows server to verify your identity |

---

## Step-by-Step Setup

### Step 1: Generate SSH Key Pair

Run these commands on your **local machine** (laptop/desktop, NOT the server):

#### Option A: ED25519 (Recommended - More Secure)

```bash
# Generate ED25519 key pair
ssh-keygen -t ed25519 -C "deploy-key-$(date +%Y%m%d)" -f ~/.ssh/deploy_key

# Output:
# Generating public/private ed25519 key pair.
# Enter passphrase (empty for no passphrase): [Press Enter]
# Enter same passphrase again: [Press Enter]
# Your identification has been saved in /home/user/.ssh/deploy_key
# Your public key has been saved in /home/user/.ssh/deploy_key.pub
```

#### Option B: RSA (Wider Compatibility)

```bash
# Generate RSA 4096-bit key pair
ssh-keygen -t rsa -b 4096 -C "deploy-key-$(date +%Y%m%d)" -f ~/.ssh/deploy_key

# Output similar to above
```

> **Important:** When prompted for passphrase, press **Enter** for no passphrase. Automated deployments require passphrase-less keys.

#### Verify Keys Created

```bash
# List your new keys
ls -la ~/.ssh/deploy_key*

# Output:
# -rw-------  1 user user  411 Jan 18 10:00 /home/user/.ssh/deploy_key      # Private key
# -rw-r--r--  1 user user   98 Jan 18 10:00 /home/user/.ssh/deploy_key.pub  # Public key
```

#### View Your Public Key

```bash
# Display public key (this goes to the server)
cat ~/.ssh/deploy_key.pub

# Output (example):
# ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGMwaTdteHhYcGRUMHVWM0ZGZE1kVGpCOE5EMklYdGpIbUFB deploy-key-20240118
```

#### View Your Private Key

```bash
# Display private key (this goes to GitHub Secrets or .env.deploy)
cat ~/.ssh/deploy_key

# Output (example):
# -----BEGIN OPENSSH PRIVATE KEY-----
# b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtz
# c2gtZWQyNTUxOQAAACBmMGk3bXhYcGRUMHVWM0ZGZE1kVGpCOE5EMklYdGpIbUFB
# ... (more lines) ...
# -----END OPENSSH PRIVATE KEY-----
```

---

### Step 2: Add Public Key to Server

You need to add your **public key** to the server's `authorized_keys` file.

```mermaid
flowchart TB
    subgraph Local["💻 Local Machine"]
        PUB["📄 deploy_key.pub"]
    end

    subgraph Server["🖥️ Server"]
        SSH_DIR["📁 ~/.ssh/"]
        AUTH["📜 authorized_keys"]
    end

    PUB -->|"Copy content"| AUTH
    SSH_DIR --> AUTH
```

#### Method 1: Using ssh-copy-id (Easiest)

```bash
# Copy public key to server automatically
ssh-copy-id -i ~/.ssh/deploy_key.pub username@your-server-ip

# You'll be prompted for password (one last time)
# Output:
# /usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s)
# username@your-server-ip's password: [Enter your password]
# Number of key(s) added: 1
```

#### Method 2: Manual Copy (If ssh-copy-id not available)

```bash
# Step 2a: Copy the public key content
cat ~/.ssh/deploy_key.pub
# Copy the output to clipboard

# Step 2b: SSH into server with password
ssh username@your-server-ip
# Enter password when prompted

# Step 2c: On the server, create .ssh directory if needed
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Step 2d: Add public key to authorized_keys
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys

# Or use nano/vim to edit
nano ~/.ssh/authorized_keys
# Paste the public key on a new line, save and exit

# Step 2e: Set correct permissions
chmod 600 ~/.ssh/authorized_keys

# Step 2f: Exit server
exit
```

#### Method 3: One-liner (Advanced)

```bash
# Copy public key to server in one command
cat ~/.ssh/deploy_key.pub | ssh username@your-server-ip "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

---

### Step 3: Test Connection

Verify that key-based authentication works:

```bash
# Test SSH connection with the new key
ssh -i ~/.ssh/deploy_key username@your-server-ip "echo 'SSH Key Authentication Successful!'"

# Expected output:
# SSH Key Authentication Successful!
```

#### If Connection Fails

```bash
# Verbose mode for debugging
ssh -v -i ~/.ssh/deploy_key username@your-server-ip

# Very verbose mode
ssh -vvv -i ~/.ssh/deploy_key username@your-server-ip
```

---

### Step 4: Configure for Deployment

#### For Local Deployment Script

Create `.env.deploy` file in your project root:

```bash
# Copy the example
cp .env.deploy.example .env.deploy

# Edit with your values
nano .env.deploy
```

Add your configuration:

```bash
# .env.deploy
SSH_HOST=your-server-ip-or-hostname
SSH_USERNAME=your-username
SSH_PRIVATE_KEY=~/.ssh/deploy_key
SSH_PORT=22
```

#### For GitHub Actions

Add secrets to your repository:

```mermaid
flowchart LR
    A["Repository"] --> B["Settings"]
    B --> C["Secrets and variables"]
    C --> D["Actions"]
    D --> E["New repository secret"]
```

| Secret Name | How to Get Value |
|-------------|------------------|
| `SSH_PRIVATE_KEY` | `cat ~/.ssh/deploy_key` (copy entire output including headers) |
| `SSH_HOST` | Your server IP or hostname |
| `SSH_USERNAME` | Your SSH username |

**Adding SSH_PRIVATE_KEY to GitHub:**

1. Go to **Repository → Settings → Secrets and variables → Actions**
2. Click **"New repository secret"**
3. Name: `SSH_PRIVATE_KEY`
4. Value: Run this command and copy the **ENTIRE** output:
   ```bash
   cat ~/.ssh/deploy_key
   ```
5. Paste including the `-----BEGIN` and `-----END` lines:
   ```
   -----BEGIN OPENSSH PRIVATE KEY-----
   b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtz
   ... (all lines) ...
   -----END OPENSSH PRIVATE KEY-----
   ```

---

## Key Management Best Practices

### Do's ✓

| Practice | Command/Example |
|----------|-----------------|
| Use dedicated deploy keys | `ssh-keygen -f ~/.ssh/deploy_key` |
| Set restrictive permissions | `chmod 600 ~/.ssh/deploy_key` |
| Use descriptive comments | `-C "github-deploy-myproject"` |
| Rotate keys periodically | Generate new keys every 6-12 months |
| Use ED25519 when possible | `-t ed25519` |

### Don'ts ✗

| Avoid | Why |
|-------|-----|
| Sharing private keys | Compromises security |
| Using personal SSH keys for CI/CD | Harder to revoke, shared risk |
| Adding passphrases for automation | Breaks automated scripts |
| Committing keys to git | They become public |
| Using the same key everywhere | Single point of failure |

### Recommended Key Naming

```bash
# For different purposes
~/.ssh/deploy_key_production     # Production deployments
~/.ssh/deploy_key_staging        # Staging deployments
~/.ssh/github_personal           # Personal GitHub access
~/.ssh/id_ed25519                # Default personal key
```

---

## Troubleshooting

### Common Issues

```mermaid
flowchart TB
    A["SSH Connection Failed"] --> B{Check Host}
    B -->|"Host unreachable"| B1["Verify IP/hostname<br/>Check firewall"]
    B -->|"Host reachable"| C{Check Key}

    C -->|"Permission denied"| C1["Verify key in authorized_keys<br/>Check file permissions"]
    C -->|"Key accepted"| D{Check User}

    D -->|"User invalid"| D1["Verify username exists<br/>Check spelling"]
    D -->|"User valid"| E["Check server SSH config"]
```

### Permission Denied (publickey)

```bash
# Problem: Server rejects your key
# Solution 1: Check authorized_keys on server
ssh username@server "cat ~/.ssh/authorized_keys"
# Verify your public key is there

# Solution 2: Fix permissions on server
ssh username@server "chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"

# Solution 3: Check SELinux (if applicable)
ssh username@server "restorecon -Rv ~/.ssh"
```

### Key Format Issues

```bash
# Problem: GitHub says key is invalid
# Solution: Ensure you copied the ENTIRE key

# Check your key starts and ends correctly:
head -1 ~/.ssh/deploy_key
# Should show: -----BEGIN OPENSSH PRIVATE KEY-----

tail -1 ~/.ssh/deploy_key
# Should show: -----END OPENSSH PRIVATE KEY-----
```

### Wrong Permissions

```bash
# Problem: SSH refuses to use key with wrong permissions
# Error: "Permissions 0644 for '~/.ssh/deploy_key' are too open"

# Solution: Fix local permissions
chmod 600 ~/.ssh/deploy_key
chmod 644 ~/.ssh/deploy_key.pub
chmod 700 ~/.ssh
```

### Server Rejected Key

```bash
# Check server SSH logs (run on server)
sudo tail -f /var/log/auth.log        # Ubuntu/Debian
sudo tail -f /var/log/secure          # CentOS/RHEL

# Common issues in logs:
# - "Authentication refused: bad ownership or modes for file"
# - "User not in AllowUsers list"
# - "AuthorizedKeysFile not found"
```

### Quick Diagnostic Commands

```bash
# Test SSH connection with verbose output
ssh -v -i ~/.ssh/deploy_key user@server

# Check key fingerprint
ssh-keygen -lf ~/.ssh/deploy_key.pub

# List keys loaded in ssh-agent
ssh-add -l

# Verify server's SSH configuration (on server)
sudo sshd -T | grep -E "pubkeyauth|authorizedkeys"
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────┐
│                    SSH KEY QUICK REFERENCE                       │
├─────────────────────────────────────────────────────────────────┤
│  GENERATE KEY:                                                   │
│    ssh-keygen -t ed25519 -C "comment" -f ~/.ssh/deploy_key      │
│                                                                  │
│  COPY TO SERVER:                                                 │
│    ssh-copy-id -i ~/.ssh/deploy_key.pub user@server             │
│                                                                  │
│  TEST CONNECTION:                                                │
│    ssh -i ~/.ssh/deploy_key user@server "echo OK"               │
│                                                                  │
│  VIEW PUBLIC KEY:                                                │
│    cat ~/.ssh/deploy_key.pub                                    │
│                                                                  │
│  VIEW PRIVATE KEY (for GitHub):                                  │
│    cat ~/.ssh/deploy_key                                        │
│                                                                  │
│  FIX PERMISSIONS:                                                │
│    chmod 700 ~/.ssh                                             │
│    chmod 600 ~/.ssh/deploy_key                                  │
│    chmod 644 ~/.ssh/deploy_key.pub                              │
│    chmod 600 ~/.ssh/authorized_keys  (on server)                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Related Documentation

- [Main Deployment README](./DOCKER-DEPLOY-README.md) - Full deployment workflow documentation
- [Local Deploy Script](../../scripts/deploy.sh) - Local deployment script usage
