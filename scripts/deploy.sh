#!/bin/bash
#
# Local Deployment Script
# Mirrors the GitHub Action deployment workflow for local testing
#
# Usage:
#   ./scripts/deploy.sh                    # Standard deployment
#   ./scripts/deploy.sh --force            # Force restart (teardown + rebuild)
#   ./scripts/deploy.sh --dry-run          # Show what would be done without executing
#
# Required Environment Variables (set in .env.deploy or export):
#   SSH_HOST        - Server IP or hostname
#   SSH_USERNAME    - SSH user
#   SSH_PRIVATE_KEY - Path to private key file (default: ~/.ssh/id_rsa)
#   SSH_PORT        - SSH port (default: 22)
#
# Optional:
#   PROJECT_PATH    - Deployment path on server (default: /projects/<repo-name>)
#   ENV_FILE        - Path to .env file to deploy (optional)
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Parse arguments
FORCE_RESTART=false
DRY_RUN=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --force|-f)
            FORCE_RESTART=true
            shift
            ;;
        --dry-run|-n)
            DRY_RUN=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --force, -f     Force restart (teardown and rebuild all containers)"
            echo "  --dry-run, -n   Show what would be done without executing"
            echo "  --help, -h      Show this help message"
            echo ""
            echo "Environment Variables:"
            echo "  SSH_HOST        Server IP or hostname (required)"
            echo "  SSH_USERNAME    SSH user (required)"
            echo "  SSH_PRIVATE_KEY Path to private key file (default: ~/.ssh/id_rsa)"
            echo "  SSH_PORT        SSH port (default: 22)"
            echo "  PROJECT_PATH    Deployment path (default: /projects/<repo-name>)"
            echo "  ENV_FILE        Path to .env file to deploy"
            echo ""
            echo "Example:"
            echo "  SSH_HOST=192.168.1.100 SSH_USERNAME=ubuntu ./scripts/deploy.sh"
            echo ""
            echo "Or create .env.deploy file with these variables."
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            exit 1
            ;;
    esac
done

# Load environment from .env.deploy if exists
if [ -f "$PROJECT_ROOT/.env.deploy" ]; then
    echo -e "${BLUE}Loading environment from .env.deploy${NC}"
    set -a
    source "$PROJECT_ROOT/.env.deploy"
    set +a
fi

# ==========================================
# Configuration Validation
# ==========================================

echo ""
echo "=========================================="
echo "  Local Deployment Script"
echo "=========================================="
echo ""

VALIDATION_PASSED=true
MISSING_VARS=""

echo "[Checking] SSH_HOST..."
if [ -n "$SSH_HOST" ]; then
    echo -e "  ${GREEN}✓${NC} SSH_HOST: $SSH_HOST"
else
    echo -e "  ${RED}✗${NC} SSH_HOST: MISSING"
    MISSING_VARS="${MISSING_VARS}\n  - SSH_HOST"
    VALIDATION_PASSED=false
fi

echo "[Checking] SSH_USERNAME..."
if [ -n "$SSH_USERNAME" ]; then
    echo -e "  ${GREEN}✓${NC} SSH_USERNAME: $SSH_USERNAME"
else
    echo -e "  ${RED}✗${NC} SSH_USERNAME: MISSING"
    MISSING_VARS="${MISSING_VARS}\n  - SSH_USERNAME"
    VALIDATION_PASSED=false
fi

echo "[Checking] SSH_PRIVATE_KEY..."
SSH_PRIVATE_KEY="${SSH_PRIVATE_KEY:-$HOME/.ssh/id_rsa}"
if [ -f "$SSH_PRIVATE_KEY" ]; then
    echo -e "  ${GREEN}✓${NC} SSH_PRIVATE_KEY: $SSH_PRIVATE_KEY"
else
    echo -e "  ${RED}✗${NC} SSH_PRIVATE_KEY: File not found at $SSH_PRIVATE_KEY"
    MISSING_VARS="${MISSING_VARS}\n  - SSH_PRIVATE_KEY (file not found)"
    VALIDATION_PASSED=false
fi

echo "[Checking] SSH_PORT..."
SSH_PORT="${SSH_PORT:-22}"
echo -e "  ${GREEN}○${NC} SSH_PORT: $SSH_PORT"

echo "[Checking] PROJECT_PATH..."
REPO_NAME=$(basename "$PROJECT_ROOT")
PROJECT_PATH="${PROJECT_PATH:-/projects/$REPO_NAME}"
echo -e "  ${GREEN}○${NC} PROJECT_PATH: $PROJECT_PATH"

echo "[Checking] ENV_FILE..."
if [ -n "$ENV_FILE" ] && [ -f "$ENV_FILE" ]; then
    echo -e "  ${GREEN}✓${NC} ENV_FILE: $ENV_FILE"
    HAS_ENV_FILE=true
elif [ -n "$ENV_FILE" ]; then
    echo -e "  ${YELLOW}⚠${NC} ENV_FILE: File not found at $ENV_FILE"
    HAS_ENV_FILE=false
else
    echo -e "  ${GREEN}○${NC} ENV_FILE: Not configured (optional)"
    HAS_ENV_FILE=false
fi

echo ""
echo "=========================================="

if [ "$VALIDATION_PASSED" = "false" ]; then
    echo ""
    echo -e "${RED}❌ VALIDATION FAILED${NC}"
    echo ""
    echo "Missing required configuration:"
    echo -e "$MISSING_VARS"
    echo ""
    echo "=========================================="
    echo "📋 HOW TO FIX:"
    echo "=========================================="
    echo ""
    echo "Option 1: Export environment variables"
    echo "  export SSH_HOST=your-server-ip"
    echo "  export SSH_USERNAME=your-username"
    echo "  export SSH_PRIVATE_KEY=~/.ssh/your_key"
    echo ""
    echo "Option 2: Create .env.deploy file"
    echo "  cp .env.deploy.example .env.deploy"
    echo "  # Edit .env.deploy with your values"
    echo ""
    echo "=========================================="
    exit 1
fi

echo ""
echo -e "${GREEN}✅ All required configuration present${NC}"

# Get current branch and repo URL
CURRENT_BRANCH=$(git -C "$PROJECT_ROOT" rev-parse --abbrev-ref HEAD)
REPO_URL=$(git -C "$PROJECT_ROOT" remote get-url origin)

echo ""
echo "Deployment Configuration:"
echo "  Server: $SSH_USERNAME@$SSH_HOST:$SSH_PORT"
echo "  Project: $PROJECT_PATH"
echo "  Branch: $CURRENT_BRANCH"
echo "  Force Restart: $FORCE_RESTART"
echo ""

# Dry run check
if [ "$DRY_RUN" = "true" ]; then
    echo -e "${YELLOW}=== DRY RUN MODE ===${NC}"
    echo "Would execute deployment with above configuration."
    echo "Remove --dry-run to execute."
    exit 0
fi

# Confirmation
read -p "Continue with deployment? [y/N] " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

# ==========================================
# SSH Connection Test
# ==========================================

echo ""
echo "=========================================="
echo "  Testing SSH Connection"
echo "=========================================="

ssh -o BatchMode=yes \
    -o ConnectTimeout=10 \
    -o StrictHostKeyChecking=no \
    -i "$SSH_PRIVATE_KEY" \
    -p "$SSH_PORT" \
    "$SSH_USERNAME@$SSH_HOST" \
    "echo 'SSH connection successful'; uname -a" || {
    echo -e "${RED}SSH Connection FAILED${NC}"
    echo ""
    echo "Troubleshooting tips:"
    echo "1. Verify SSH_HOST is correct and reachable"
    echo "2. Verify SSH_USERNAME has SSH access"
    echo "3. Verify SSH_PRIVATE_KEY matches the public key on the server"
    echo "4. Check if the server allows SSH on port $SSH_PORT"
    exit 1
}

echo -e "${GREEN}Connection test PASSED${NC}"

# ==========================================
# Deployment
# ==========================================

echo ""
echo "=========================================="
echo "  Starting Deployment"
echo "  $(date)"
echo "=========================================="

# Deploy ENV_FILE if exists
if [ "$HAS_ENV_FILE" = "true" ]; then
    echo ""
    echo "[Step] Deploying .env file..."
    ssh -o BatchMode=yes \
        -o StrictHostKeyChecking=no \
        -i "$SSH_PRIVATE_KEY" \
        -p "$SSH_PORT" \
        "$SSH_USERNAME@$SSH_HOST" "mkdir -p $PROJECT_PATH"

    scp -o StrictHostKeyChecking=no \
        -i "$SSH_PRIVATE_KEY" \
        -P "$SSH_PORT" \
        "$ENV_FILE" \
        "$SSH_USERNAME@$SSH_HOST:$PROJECT_PATH/.env"

    ssh -o BatchMode=yes \
        -o StrictHostKeyChecking=no \
        -i "$SSH_PRIVATE_KEY" \
        -p "$SSH_PORT" \
        "$SSH_USERNAME@$SSH_HOST" "chmod 600 $PROJECT_PATH/.env"

    echo -e "${GREEN}.env file deployed${NC}"
fi

# Main deployment
ssh -o BatchMode=yes \
    -o StrictHostKeyChecking=no \
    -i "$SSH_PRIVATE_KEY" \
    -p "$SSH_PORT" \
    "$SSH_USERNAME@$SSH_HOST" << DEPLOY_SCRIPT

set -e

echo ""
echo "[1/5] Setting up project directory..."
echo "----------------------------------------"

PROJECT_BASE=\$(dirname "$PROJECT_PATH")
if [ ! -d "\$PROJECT_BASE" ]; then
    echo "Creating base directory: \$PROJECT_BASE"
    sudo mkdir -p "\$PROJECT_BASE"
    sudo chown \$USER:\$USER "\$PROJECT_BASE"
fi

echo ""
echo "[2/5] Synchronizing code..."
echo "----------------------------------------"

if [ ! -d "$PROJECT_PATH/.git" ]; then
    echo "Cloning repository..."
    git clone --branch "$CURRENT_BRANCH" "$REPO_URL" "$PROJECT_PATH"
    cd "$PROJECT_PATH"
else
    echo "Updating existing repository..."
    cd "$PROJECT_PATH"
    git fetch origin
    git checkout "$CURRENT_BRANCH"
    git reset --hard "origin/$CURRENT_BRANCH"
    git pull origin "$CURRENT_BRANCH"
fi

echo "Current commit: \$(git rev-parse --short HEAD)"
echo "Commit message: \$(git log -1 --pretty=%B | head -1)"

echo ""
echo "[3/5] Configuring environment..."
echo "----------------------------------------"

if [ -f ".env" ]; then
    echo "Loading environment variables..."
    set -a
    source .env
    set +a
    echo "Environment variables loaded"
else
    echo "No .env file present"
fi

echo ""
echo "[4/5] Managing Docker containers..."
echo "----------------------------------------"

echo "BEFORE - Running containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" || echo "No containers running"
echo ""

if [ "$FORCE_RESTART" = "true" ]; then
    echo "Force restart requested - performing full teardown..."
    docker compose down --remove-orphans --timeout 30 || true
    echo "Containers stopped and removed"
fi

echo "Pulling latest images..."
docker compose pull --ignore-pull-failures || true

echo "Starting containers..."
docker compose up -d --build --remove-orphans

echo ""
echo "Waiting for containers to stabilize..."
sleep 10

echo ""
echo "AFTER - Running containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "[5/5] Deployment Status"
echo "----------------------------------------"
echo "Project: $PROJECT_PATH"
echo "Branch: $CURRENT_BRANCH"
echo "Commit: \$(git rev-parse --short HEAD)"
echo "Time: \$(date)"
echo ""
echo "Container Health:"
docker compose ps

DEPLOY_SCRIPT

echo ""
echo "=========================================="
echo -e "${GREEN}  Deployment Complete!${NC}"
echo "=========================================="
echo ""
echo "Application URLs:"
echo "  https://learn.arvaibhav.cloud"
echo "  https://learn-api.arvaibhav.cloud"
echo ""
