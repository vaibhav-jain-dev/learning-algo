# SSH Setup Guide

Simple guide to set up SSH for deployments.

```mermaid
flowchart LR
    subgraph Local["Local PC"]
        A[Generate Key]
    end

    subgraph Server["Server"]
        B[authorized_keys]
    end

    subgraph GitHub["GitHub"]
        C[Secrets]
        D[Deploy Keys]
    end

    A -->|Public Key| B
    A -->|Private Key| C
    B -->|Allows| C
    D -->|Allows Server| GitHub
```

---

## 1. On Your Local PC (Laptop)

### 1.1 Generate SSH Key

```bash
ssh-keygen -t ed25519 -f ~/.ssh/deploy_key
# Press Enter twice (no passphrase)
```

### 1.2 Get Keys for Later Steps

```bash
# Public key (needed for server)
cat ~/.ssh/deploy_key.pub

# Private key (needed for GitHub secrets)
cat ~/.ssh/deploy_key
```

---

## 2. On Server

### 2.1 Allow Local PC to SSH

Add your public key to the server:

```bash
# From your local PC, run:
ssh-copy-id -i ~/.ssh/deploy_key.pub username@your-server-ip
```

Or manually on the server:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "PASTE_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 2.2 Allow GitHub Actions to SSH

Same as above - the public key from step 1.1 must be in `~/.ssh/authorized_keys` on the server.

GitHub Actions will use the private key (stored in GitHub Secrets) to authenticate.

### 2.3 Allow Server to Pull from GitHub

If your server needs to pull/clone from GitHub:

```bash
# On server, generate a key for GitHub access
ssh-keygen -t ed25519 -f ~/.ssh/github_key

# View the public key
cat ~/.ssh/github_key.pub
```

Then add this public key to GitHub (see section 3.2).

---

## 3. On GitHub

### 3.1 Add Secrets (for GitHub Actions to deploy)

Go to: **Repository → Settings → Secrets and variables → Actions → New repository secret**

Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `SSH_PRIVATE_KEY` | Content of `~/.ssh/deploy_key` (include `-----BEGIN` and `-----END` lines) |
| `SSH_HOST` | Your server IP or hostname |
| `SSH_USERNAME` | Your SSH username |

### 3.2 Add Deploy Key (for server to pull from GitHub)

Go to: **Repository → Settings → Deploy keys → Add deploy key**

- **Title:** Server deploy key
- **Key:** Paste the public key from server (`~/.ssh/github_key.pub`)
- **Allow write access:** Check only if server needs to push

---

## Quick Test

```bash
# Test local to server
ssh -i ~/.ssh/deploy_key username@your-server-ip "echo 'Connected!'"

# Test server to GitHub (run on server)
ssh -T git@github.com
```
