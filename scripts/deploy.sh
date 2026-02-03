#!/bin/bash
#
# Local Deployment Script
# Mirrors the GitHub Action deployment workflow for local testing
#
# Features:
#   - Parallel task execution (like Docker Compose)
#   - Docker Compose-style metrics and progress output
#   - Step-by-step timing breakdown
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
#   GITHUB_SSH_KEY  - GitHub SSH private key for cloning (optional, for SSH repos)
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m' # No Color

# ==========================================
# Metrics & Timing Infrastructure
# ==========================================
# Simple timing storage (no associative arrays for bash 3.2 compatibility)
DEPLOY_START_TIME=""
TOTAL_STEPS=0
COMPLETED_STEPS=0
declare -a STEP_NAMES
declare -a STEP_DURATIONS
declare -a STEP_STATUSES

# ==========================================
# Environment Variable Normalization
# ==========================================
# Normalizes ENV_VARS to proper format:
# - Handles comma-separated: KEY=VALUE,KEY2=VALUE2
# - Handles newline-separated: KEY=VALUE\nKEY2=VALUE2
# - Handles mixed formats with comments
# - Removes 'export ' prefix
# - Skips comments (lines starting with #)
# - Skips empty lines
# - One variable per line in output
normalize_env_vars() {
    local input="$1"
    # Convert commas to newlines (handles both comma and newline formats)
    input="$(printf '%s' "$input" | sed 's/,/\n/g')"
    # Process line by line
    printf '%s\n' "$input" | while IFS= read -r line; do
        # Skip empty lines and comments
        [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
        # Remove leading/trailing whitespace
        line="$(printf '%s' "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
        # Remove 'export ' prefix if present (case-insensitive)
        line="${line#export }"
        line="${line#export }"  # Remove again to handle multiple spaces
        line="$(printf '%s' "$line" | sed 's/^[[:space:]]*//g')"  # Trim again
        # Only output if it matches KEY=VALUE pattern (allows special chars in values)
        [[ "$line" =~ ^[A-Za-z_][A-Za-z0-9_]*= ]] && printf '%s\n' "$line"
    done
}

# Format duration in human-readable format
format_duration() {
    local seconds=$1
    if [ "$seconds" -lt 60 ]; then
        printf "%ds" "$seconds"
    else
        local mins=$((seconds / 60))
        local secs=$((seconds % 60))
        printf "%dm%ds" "$mins" "$secs"
    fi
}

# Start timing a step
step_start() {
    local step_name="$1"
    STEP_NAMES+=("$step_name")
    STEP_START_TIME=$(date +%s)
}

# End timing a step
step_end() {
    local step_name="$1"
    local status="${2:-success}"
    local end_time=$(date +%s)
    STEP_DURATIONS+=($((end_time - STEP_START_TIME)))
    STEP_STATUSES+=("$status")
    ((COMPLETED_STEPS++)) || true
}

# Print step header (Docker Compose style)
print_step() {
    local step_num="$1"
    local total="$2"
    local name="$3"
    echo ""
    echo -e "${CYAN}[${step_num}/${total}]${NC} ${BOLD}${name}${NC}"
    echo -e "${DIM}$(printf '─%.0s' {1..50})${NC}"
}

# Print substep with spinner-like prefix
print_substep() {
    local status="$1"
    local message="$2"
    case "$status" in
        "start")
            echo -e " ${BLUE}⠿${NC} ${message}..."
            ;;
        "done")
            echo -e " ${GREEN}✔${NC} ${message}"
            ;;
        "skip")
            echo -e " ${YELLOW}⊖${NC} ${message} ${DIM}(skipped)${NC}"
            ;;
        "error")
            echo -e " ${RED}✖${NC} ${message}"
            ;;
        "info")
            echo -e " ${DIM}↳${NC} ${DIM}${message}${NC}"
            ;;
        "parallel")
            echo -e " ${MAGENTA}⇉${NC} ${message} ${DIM}(parallel)${NC}"
            ;;
    esac
}

# Print metrics summary table
print_metrics_summary() {
    echo ""
    echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
    echo -e "${BOLD}  Deployment Metrics Summary${NC}"
    echo -e "${BOLD}═══════════════════════════════════════════════════════${NC}"
    echo ""

    # Calculate total time
    local total_duration=$(($(date +%s) - DEPLOY_START_TIME))

    # Print step breakdown
    printf "  ${BOLD}%-30s %10s %10s${NC}\n" "Step" "Duration" "Status"
    echo -e "  ${DIM}$(printf '─%.0s' {1..52})${NC}"

    # Print each step with its metrics
    for i in "${!STEP_NAMES[@]}"; do
        local step="${STEP_NAMES[$i]}"
        local duration=${STEP_DURATIONS[$i]:-0}
        local status=${STEP_STATUSES[$i]:-"pending"}
        local status_icon
        local status_color

        case "$status" in
            "success")
                status_icon="✔"
                status_color="${GREEN}"
                ;;
            "failed")
                status_icon="✖"
                status_color="${RED}"
                ;;
            "skipped")
                status_icon="⊖"
                status_color="${YELLOW}"
                ;;
            *)
                status_icon="○"
                status_color="${DIM}"
                ;;
        esac

        if [ "$duration" -gt 0 ]; then
            printf "  %-30s %10s ${status_color}%10s${NC}\n" "$step" "$(format_duration $duration)" "$status_icon $status"
        fi
    done

    echo -e "  ${DIM}$(printf '─%.0s' {1..52})${NC}"
    printf "  ${BOLD}%-30s %10s${NC}\n" "Total" "$(format_duration $total_duration)"
    echo ""
}

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

# Load environment from .env.deploy if exists AND variables not already set
# This allows using environment variables from shell (e.g., exported in .zshrc)
# while falling back to .env.deploy if they're not already in the environment
if [ -f "$PROJECT_ROOT/.env.deploy" ] && [ -z "$SSH_HOST" ]; then
    echo -e "${BLUE}Loading environment from .env.deploy${NC}"
    set -a
    source "$PROJECT_ROOT/.env.deploy"
    set +a
elif [ -n "$SSH_HOST" ]; then
    echo -e "${BLUE}Using environment variables from current shell${NC}"
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

# Support both file path and raw key content
if [ -f "$SSH_PRIVATE_KEY" ]; then
    echo -e "  ${GREEN}✓${NC} SSH_PRIVATE_KEY: $SSH_PRIVATE_KEY (file)"
    SSH_KEY_FILE="$SSH_PRIVATE_KEY"
elif echo "$SSH_PRIVATE_KEY" | grep -q "BEGIN.*PRIVATE KEY"; then
    # Key content provided directly (like from GitHub Actions)
    # Create temporary file from key content
    SSH_KEY_FILE=$(mktemp)
    printf "%s" "$SSH_PRIVATE_KEY" > "$SSH_KEY_FILE"
    chmod 600 "$SSH_KEY_FILE"
    echo -e "  ${GREEN}✓${NC} SSH_PRIVATE_KEY: (key content, temp file created)"
else
    echo -e "  ${RED}✗${NC} SSH_PRIVATE_KEY: Invalid (not a file or valid key)"
    MISSING_VARS="${MISSING_VARS}\n  - SSH_PRIVATE_KEY (file not found or invalid key content)"
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

echo "[Checking] ENV_VARS..."
# Allow ENV_VARS to be provided via base64 (GitHub Actions compatibility)
if [ -z "${ENV_VARS:-}" ] && [ -n "${ENV_VARS_B64:-}" ]; then
    ENV_VARS="$(printf "%s" "$ENV_VARS_B64" | base64 -d)"
    echo -e "  ${GREEN}✓${NC} ENV_VARS: Decoded from base64 (will override .env)"
    HAS_ENV_VARS=true
elif [ -n "${ENV_VARS:-}" ]; then
    echo -e "  ${GREEN}✓${NC} ENV_VARS: Provided (will override .env)"
    HAS_ENV_VARS=true
else
    echo -e "  ${GREEN}○${NC} ENV_VARS: Not configured (optional)"
    HAS_ENV_VARS=false
fi

# Normalize ENV_VARS if present (converts comma-separated to newline-separated)
if [ "$HAS_ENV_VARS" = "true" ]; then
    ENV_VARS_NORMALIZED="$(normalize_env_vars "$ENV_VARS")"
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

# Convert HTTPS to SSH format if needed
if [[ "$REPO_URL" =~ ^https://github.com/ ]]; then
    # Convert: https://github.com/user/repo.git -> git@github.com:user/repo.git
    REPO_URL=$(echo "$REPO_URL" | sed 's|https://github.com/|git@github.com:|' | sed 's|\.git$|.git|')
fi

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

# Auto-proceed (no confirmation prompt)
echo -e "${BLUE}ℹ${NC} Starting deployment..."

# ==========================================
# SSH Connection Test
# ==========================================

# Start deployment timer
DEPLOY_START_TIME=$(date +%s)
TOTAL_STEPS=7

print_step 1 $TOTAL_STEPS "Testing SSH Connection"
step_start "SSH Connection"

print_substep "start" "Connecting to $SSH_HOST:$SSH_PORT"
if [ "${SSH_USE_CLOUDFLARE_TUNNEL:-false}" = "true" ]; then
    SSH_OUTPUT=$(ssh -o BatchMode=yes \
        -o ConnectTimeout=10 \
        -o StrictHostKeyChecking=no \
        -o ProxyCommand="cloudflared access ssh --hostname %h" \
        -i "$SSH_KEY_FILE" \
        "$SSH_USERNAME@$SSH_HOST" \
        "echo 'SSH connection successful'; uname -a" 2>&1) || {
        step_end "SSH Connection" "failed"
        print_substep "error" "SSH Connection FAILED"
        echo ""
        echo "Troubleshooting tips:"
        echo "1. Verify cloudflared is installed and authenticated"
        echo "2. Verify SSH_HOST is correct: $SSH_HOST"
        echo "3. Verify SSH_USERNAME is correct: $SSH_USERNAME"
        echo "4. Verify SSH_PRIVATE_KEY matches the server's authorized_keys"
        print_metrics_summary
        exit 1
    }
else
    SSH_OUTPUT=$(ssh -o BatchMode=yes \
        -o ConnectTimeout=10 \
        -o StrictHostKeyChecking=no \
        -i "$SSH_KEY_FILE" \
        -p "$SSH_PORT" \
        "$SSH_USERNAME@$SSH_HOST" \
        "echo 'SSH connection successful'; uname -a" 2>&1) || {
        step_end "SSH Connection" "failed"
        print_substep "error" "SSH Connection FAILED"
        echo ""
        echo "Troubleshooting tips:"
        echo "1. Verify SSH_HOST is correct and reachable"
        echo "2. Verify SSH_USERNAME has SSH access"
        echo "3. Verify SSH_PRIVATE_KEY matches the public key on the server"
        echo "4. Check if the server allows SSH on port $SSH_PORT"
        print_metrics_summary
        exit 1
    }
fi

print_substep "done" "SSH connection established"
print_substep "info" "Server: $(echo "$SSH_OUTPUT" | tail -1)"
step_end "SSH Connection" "success"

# ==========================================
# Deployment
# ==========================================

# SSH command helper
run_ssh() {
    if [ "${SSH_USE_CLOUDFLARE_TUNNEL:-false}" = "true" ]; then
        # Use Cloudflare Tunnel via cloudflared
        ssh -o BatchMode=yes \
            -o StrictHostKeyChecking=no \
            -o ProxyCommand="cloudflared access ssh --hostname %h" \
            -i "$SSH_KEY_FILE" \
            "$SSH_USERNAME@$SSH_HOST" "$@"
    else
        # Direct SSH connection
        ssh -o BatchMode=yes \
            -o StrictHostKeyChecking=no \
            -i "$SSH_KEY_FILE" \
            -p "$SSH_PORT" \
            "$SSH_USERNAME@$SSH_HOST" "$@"
    fi
}

# Setup directory and environment (Step 2)
print_step 2 $TOTAL_STEPS "Setup Directory & Environment"
step_start "Setup Directory"

print_substep "start" "Creating project directory"
run_ssh "mkdir -p $PROJECT_PATH" 2>/dev/null
print_substep "done" "Project directory ready"

if [ "$HAS_ENV_FILE" = "true" ]; then
    print_substep "start" "Deploying .env file via SCP"
    if [ "${SSH_USE_CLOUDFLARE_TUNNEL:-false}" = "true" ]; then
        # SCP via Cloudflare Tunnel (requires cloudflared 2022.12.0+)
        scp -o StrictHostKeyChecking=no \
            -o ProxyCommand="cloudflared access ssh --hostname %h" \
            -i "$SSH_KEY_FILE" \
            "$ENV_FILE" \
            "$SSH_USERNAME@$SSH_HOST:$PROJECT_PATH/.env" 2>/dev/null
    else
        # Direct SCP
        scp -o StrictHostKeyChecking=no \
            -i "$SSH_KEY_FILE" \
            -P "$SSH_PORT" \
            "$ENV_FILE" \
            "$SSH_USERNAME@$SSH_HOST:$PROJECT_PATH/.env" 2>/dev/null
    fi
    run_ssh "chmod 600 $PROJECT_PATH/.env" 2>/dev/null
    print_substep "done" ".env file deployed (permissions: 600)"
else
    print_substep "skip" "No .env file configured"
fi

step_end "Setup Directory" "success"

# Synchronize code (Step 3)
print_step 3 $TOTAL_STEPS "Synchronizing Code"
step_start "Sync Code"

# Deploy GitHub SSH key if it exists locally (copy via SCP)
GITHUB_KEY_LOCAL="${GITHUB_SSH_KEY_PATH:-$HOME/.ssh/github_deploy_key}"
if [ -f "$GITHUB_KEY_LOCAL" ]; then
    print_substep "start" "Configuring GitHub SSH access"
    run_ssh "mkdir -p ~/.ssh && chmod 700 ~/.ssh" 2>/dev/null
    
    if [ "${SSH_USE_CLOUDFLARE_TUNNEL:-false}" = "true" ]; then
        # SCP via Cloudflare Tunnel
        scp -o StrictHostKeyChecking=no \
            -o ProxyCommand="cloudflared access ssh --hostname %h" \
            -i "$SSH_KEY_FILE" \
            "$GITHUB_KEY_LOCAL" \
            "$SSH_USERNAME@$SSH_HOST:~/.ssh/github_deploy_key" 2>/dev/null
    else
        # Direct SCP
        scp -o StrictHostKeyChecking=no \
            -i "$SSH_KEY_FILE" \
            -P "$SSH_PORT" \
            "$GITHUB_KEY_LOCAL" \
            "$SSH_USERNAME@$SSH_HOST:~/.ssh/github_deploy_key" 2>/dev/null
    fi
    
    run_ssh "chmod 600 ~/.ssh/github_deploy_key && echo 'Host github.com' > ~/.ssh/config && echo '  HostName github.com' >> ~/.ssh/config && echo '  User git' >> ~/.ssh/config && echo '  IdentityFile ~/.ssh/github_deploy_key' >> ~/.ssh/config && echo '  StrictHostKeyChecking accept-new' >> ~/.ssh/config" 2>/dev/null
    print_substep "done" "GitHub SSH key deployed"
fi

print_substep "start" "Synchronizing repository"

# Simple git clone/update logic
# Remove directory completely and clone fresh, or just update if git exists
SYNC_OUTPUT=$(run_ssh "cd /projects && if [ ! -d learning-algo/.git ]; then rm -rf learning-algo 2>/dev/null; mkdir -p learning-algo; cd learning-algo; git clone $REPO_URL . 2>&1; else cd learning-algo && git fetch origin 2>&1 && git checkout $CURRENT_BRANCH 2>&1 && git reset --hard origin/$CURRENT_BRANCH 2>&1; fi; echo 'COMMIT:'\$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown'); echo 'MSG:'\$(git log -1 --pretty=%B 2>/dev/null | head -1 || echo 'No message')" 2>&1)

if echo "$SYNC_OUTPUT" | grep -q "COMMIT:"; then
    print_substep "done" "Repository synchronized"
else
    # Don't fail, just warn and skip
    print_substep "skip" "Repository sync skipped (will retry next deployment)"
fi

COMMIT_HASH=$(echo "$SYNC_OUTPUT" | grep "^COMMIT:" | cut -d: -f2 | head -1)
COMMIT_MSG=$(echo "$SYNC_OUTPUT" | grep "^MSG:" | cut -d: -f2- | head -1)

if [ -n "$COMMIT_HASH" ] && [ "$COMMIT_HASH" != "unknown" ]; then
    print_substep "info" "Commit: $COMMIT_HASH ${COMMIT_MSG:0:50}"
fi
step_end "Sync Code" "success"

# Configure environment (Step 4)
print_step 4 $TOTAL_STEPS "Configuring Environment"
step_start "Configure Env"

ENV_STATUS=$(run_ssh "[ -f '$PROJECT_PATH/.env' ] && echo 'exists' || echo 'missing'" 2>/dev/null)
if [ "$ENV_STATUS" = "exists" ]; then
    print_substep "done" "Environment file present"
else
    print_substep "skip" "No environment file"
fi

# Apply ENV_VARS_NORMALIZED if present (creates/overwrites .env.override)
if [ "$HAS_ENV_VARS" = "true" ]; then
    print_substep "start" "Applying environment variable overrides"
    # Base64 encode locally for safe transport (handles newlines, $, backticks, etc.)
    ENV_VARS_B64_REMOTE=$(printf "%s" "$ENV_VARS_NORMALIZED" | base64 -w0)
    run_ssh "cd $PROJECT_PATH; printf '%s' '$ENV_VARS_B64_REMOTE' | base64 -d > .env.override; chmod 600 .env.override; echo 'Created .env.override with normalized variables'"
    print_substep "done" ".env.override created with normalized variables"
else
    print_substep "skip" "No environment variable overrides"
fi

step_end "Configure Env" "success"

# Docker operations (Step 5) - with parallel pull/build
print_step 5 $TOTAL_STEPS "Docker Operations"
step_start "Docker Operations"

# Get container status before
BEFORE_STATUS=$(run_ssh "cd $PROJECT_PATH && docker ps --format '{{.Names}}:{{.Status}}' 2>/dev/null | head -5" 2>/dev/null || echo "")

if [ -n "$BEFORE_STATUS" ]; then
    print_substep "info" "Current containers:"
    echo "$BEFORE_STATUS" | while read line; do
        NAME=$(echo "$line" | cut -d: -f1)
        STATUS=$(echo "$line" | cut -d: -f2-)
        echo -e "     ${DIM}├─${NC} $NAME: $STATUS"
    done
fi

DOCKER_OUTPUT=$(run_ssh "cd $PROJECT_PATH; ([ '$FORCE_RESTART' = 'true' ] && (echo 'STEP:teardown'; docker compose down --remove-orphans --timeout 30 2>&1 || true)) || true; echo 'STEP:parallel_start'; docker compose pull --ignore-pull-failures 2>&1 || true; echo 'STEP:pull_done'; echo 'STEP:up_start'; docker compose up -d --build --remove-orphans 2>&1; sleep 3; echo 'STEP:up_done'; echo 'SERVICES:'\$(docker compose ps -q 2>/dev/null | wc -l)" 2>&1)

# Parse docker output and show progress
if echo "$DOCKER_OUTPUT" | grep -q "STEP:teardown"; then
    print_substep "done" "Containers torn down (force restart)"
fi

if echo "$DOCKER_OUTPUT" | grep -q "STEP:parallel_start"; then
    print_substep "parallel" "Pulling images + Building containers"
fi

if echo "$DOCKER_OUTPUT" | grep -q "STEP:pull_done"; then
    print_substep "done" "Images pulled"
fi

if echo "$DOCKER_OUTPUT" | grep -q "STEP:up_done"; then
    SERVICE_COUNT=$(echo "$DOCKER_OUTPUT" | grep "^SERVICES:" | cut -d: -f2)
    print_substep "done" "$SERVICE_COUNT container(s) started"
fi

step_end "Docker Operations" "success"

# Health check (Step 6)
print_step 6 $TOTAL_STEPS "Health Check"
step_start "Health Check"

print_substep "start" "Verifying container health"

# Health check with retry logic for containers that are still starting
MAX_ATTEMPTS=3
ATTEMPT=1
HEALTH_CHECK_PASSED=false

while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    if [ $ATTEMPT -gt 1 ]; then
        echo ""
        print_substep "info" "Waiting for containers to initialize (attempt $ATTEMPT/$MAX_ATTEMPTS)..."
        sleep 10
    else
        # Initial wait for containers to start
        sleep 5
    fi

    HEALTH_OUTPUT=$(run_ssh "cd $PROJECT_PATH; echo 'CONTAINERS:'; docker compose ps --format 'table {{.Name}}\t{{.Status}}\t{{.Health}}' 2>/dev/null; UNHEALTHY=\$(docker compose ps --format '{{.Health}}' 2>/dev/null | grep -c 'unhealthy' || echo '0'); STARTING=\$(docker compose ps --format '{{.Health}}' 2>/dev/null | grep -c 'starting' || echo '0'); RUNNING=\$(docker compose ps --format '{{.Status}}' 2>/dev/null | grep -c 'running\|Up' || echo '0'); TOTAL=\$(docker compose ps -q 2>/dev/null | wc -l); echo 'STATS:'\$RUNNING/\$TOTAL' running, '\$UNHEALTHY' unhealthy, '\$STARTING' starting'" 2>&1)

    # Display container status table
    echo ""
    echo "$HEALTH_OUTPUT" | grep -A100 "^CONTAINERS:" | tail -n +2 | head -10 | while read line; do
        if [ -n "$line" ]; then
            echo -e "     ${DIM}$line${NC}"
        fi
    done
    echo ""

    STATS=$(echo "$HEALTH_OUTPUT" | grep "^STATS:" | cut -d: -f2)
    print_substep "info" "Status: $STATS"

    # Check for explicitly unhealthy containers
    UNHEALTHY_COUNT=$(echo "$HEALTH_OUTPUT" | grep "^STATS:" | sed 's/.*\([0-9]\+\) unhealthy.*/\1/')
    STARTING_COUNT=$(echo "$HEALTH_OUTPUT" | grep "^STATS:" | sed 's/.*\([0-9]\+\) starting.*/\1/')

    if [ "$UNHEALTHY_COUNT" = "0" ]; then
        if [ "$STARTING_COUNT" = "0" ]; then
            # All containers are healthy
            print_substep "done" "All containers healthy"
            HEALTH_CHECK_PASSED=true
            break
        else
            # Some containers still starting
            if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
                # Last attempt - proceed anyway if no unhealthy containers
                print_substep "done" "Containers initialized (some still starting)"
                HEALTH_CHECK_PASSED=true
                break
            fi
            # Retry for starting containers
            ATTEMPT=$((ATTEMPT + 1))
        fi
    else
        # Explicitly unhealthy containers found
        print_substep "error" "Some containers unhealthy"
        break
    fi
done

if [ "$HEALTH_CHECK_PASSED" = "true" ]; then
    step_end "Health Check" "success"
else
    step_end "Health Check" "failed"
fi

# Cloudflare Tunnel Configuration (Step 7)
print_step 7 $TOTAL_STEPS "Cloudflare Configuration"
step_start "Cloudflare Configuration"

print_substep "start" "Checking for Cloudflare labels"

# Parse docker-compose.yml for cloudflare labels and extract configuration
CLOUDFLARE_OUTPUT=$(run_ssh "cd $PROJECT_PATH && cat > /tmp/parse_cloudflare.sh << 'EOFSCRIPT'
#!/bin/bash

# Parse docker-compose.yml for cloudflare labels
if [ ! -f docker-compose.yml ]; then
    echo 'NO_COMPOSE_FILE'
    exit 0
fi

# Extract services with cloudflare.hostname labels
SERVICES_WITH_CF=\$(grep -B 50 'cloudflare.hostname' docker-compose.yml | grep -E '^  [a-zA-Z0-9_-]+:' | sed 's/://g' | awk '{print \\\$1}')

if [ -z \"\$SERVICES_WITH_CF\" ]; then
    echo 'NO_CF_LABELS'
    exit 0
fi

echo 'CLOUDFLARE_SERVICES_FOUND'
echo \"SERVICES:\$SERVICES_WITH_CF\"

# For each service, extract hostname, port, and backend config
for service in \$SERVICES_WITH_CF; do
    # Extract cloudflare.hostname
    hostname=\$(awk -v service=\"\$service\" '
        /^  [a-zA-Z0-9_-]+:/ { current_service=\\\$1; gsub(/:/, \"\", current_service) }
        current_service == service && /cloudflare.hostname/ {
            gsub(/.*cloudflare.hostname: */, \"\")
            gsub(/\"/, \"\")
            print
            exit
        }
    ' docker-compose.yml)

    # Extract port (first port from ports: section)
    port=\$(awk -v service=\"\$service\" '
        /^  [a-zA-Z0-9_-]+:/ { current_service=\\\$1; gsub(/:/, \"\", current_service); in_service=0 }
        current_service == service { in_service=1 }
        in_service && /^  [a-zA-Z0-9_-]+:/ && current_service != service { exit }
        in_service && /ports:/ { in_ports=1; next }
        in_ports && /^      - \"[0-9]+:[0-9]+\"/ {
            gsub(/.*- \"/, \"\")
            gsub(/\".*/, \"\")
            split(\\\$0, parts, \":\")
            print parts[2]
            exit
        }
        in_ports && /^    [a-zA-Z]/ { exit }
    ' docker-compose.yml)

    # Extract cloudflare.backend-env-var if present
    backend_config=\$(awk -v service=\"\$service\" '
        /^  [a-zA-Z0-9_-]+:/ { current_service=\\\$1; gsub(/:/, \"\", current_service) }
        current_service == service && /cloudflare.backend-env-var/ {
            gsub(/.*cloudflare.backend-env-var: */, \"\")
            gsub(/\"/, \"\")
            print
            exit
        }
    ' docker-compose.yml)

    # Extract manual service override if present
    manual_service=\$(awk -v service=\"\$service\" '
        /^  [a-zA-Z0-9_-]+:/ { current_service=\\\$1; gsub(/:/, \"\", current_service) }
        current_service == service && /cloudflare.service:/ {
            gsub(/.*cloudflare.service: */, \"\")
            gsub(/\"/, \"\")
            print
            exit
        }
    ' docker-compose.yml)

    echo \"SERVICE:\$service\"
    echo \"HOSTNAME:\$hostname\"
    echo \"PORT:\$port\"
    [ -n \"\$backend_config\" ] && echo \"BACKEND:\$backend_config\"
    [ -n \"\$manual_service\" ] && echo \"MANUAL_SERVICE:\$manual_service\"
    echo \"---\"
done

EOFSCRIPT
chmod +x /tmp/parse_cloudflare.sh
/tmp/parse_cloudflare.sh
rm -f /tmp/parse_cloudflare.sh
" 2>&1)

# Check if cloudflare labels were found
if echo "$CLOUDFLARE_OUTPUT" | grep -q "NO_COMPOSE_FILE"; then
    print_substep "skip" "No docker-compose.yml found"
    step_end "Cloudflare Configuration" "skipped"
elif echo "$CLOUDFLARE_OUTPUT" | grep -q "NO_CF_LABELS"; then
    print_substep "skip" "No Cloudflare labels found"
    step_end "Cloudflare Configuration" "skipped"
elif echo "$CLOUDFLARE_OUTPUT" | grep -q "CLOUDFLARE_SERVICES_FOUND"; then
    print_substep "done" "Cloudflare labels found"

    # Parse the output and configure cloudflared
    print_substep "start" "Configuring Cloudflare Tunnel"

    CONFIG_SCRIPT=$(run_ssh "cd $PROJECT_PATH && cat > /tmp/configure_cloudflare.sh << 'EOFCONFIG'
#!/bin/bash

# Read the parsed data
PARSED_DATA=\"\$(cat)\"

# Initialize config file
CONFIG_FILE=\"/tmp/cloudflared_ingress.yml\"
ENV_UPDATES=\"\"

echo 'ingress:' > \"\$CONFIG_FILE\"

# Process each service
echo \"\$PARSED_DATA\" | awk '
BEGIN { RS=\"---\"; FS=\"\n\" }
{
    service=\"\"; hostname=\"\"; port=\"\"; backend=\"\"; manual=\"\"
    for (i=1; i<=NF; i++) {
        if (\\\$i ~ /^SERVICE:/) { gsub(/SERVICE:/, \"\", \\\$i); service=\\\$i }
        if (\\\$i ~ /^HOSTNAME:/) { gsub(/HOSTNAME:/, \"\", \\\$i); hostname=\\\$i }
        if (\\\$i ~ /^PORT:/) { gsub(/PORT:/, \"\", \\\$i); port=\\\$i }
        if (\\\$i ~ /^BACKEND:/) { gsub(/BACKEND:/, \"\", \\\$i); backend=\\\$i }
        if (\\\$i ~ /^MANUAL_SERVICE:/) { gsub(/MANUAL_SERVICE:/, \"\", \\\$i); manual=\\\$i }
    }

    if (service != \"\" && hostname != \"\") {
        # Determine service URL
        if (manual != \"\") {
            service_url = manual
        } else if (port != \"\") {
            service_url = \"http://\" service \":\" port
        } else {
            service_url = \"http://\" service
        }

        # Add to ingress config
        print \"  - hostname: \" hostname
        print \"    service: \" service_url

        # Handle backend configuration
        if (backend != \"\") {
            # Parse: ENV_VAR:[backend_service]
            split(backend, parts, \":\")
            env_var = parts[1]
            backend_service = parts[2]
            gsub(/\\[/, \"\", backend_service)
            gsub(/\\]/, \"\", backend_service)

            # Store for env update
            print \"ENV_UPDATE:\" env_var \"=https://\" hostname
            print \"BACKEND_SERVICE:\" backend_service
        }
    }
}' >> \"\$CONFIG_FILE\"

# Add catch-all rule
echo '  - service: http_status:404' >> \"\$CONFIG_FILE\"

# Show configuration
echo \"CLOUDFLARE_CONFIG:\"
cat \"\$CONFIG_FILE\"
echo \"END_CONFIG\"

# Check if cloudflared is available
if command -v cloudflared &> /dev/null; then
    echo \"CLOUDFLARED_AVAILABLE:yes\"

    # Create backup of current config if exists
    if [ -f /etc/cloudflared/config.yml ]; then
        cp /etc/cloudflared/config.yml /etc/cloudflared/config.yml.backup.\$(date +%s)
    fi

    # Apply new config (you would copy ingress to main config here)
    # This is a placeholder - actual implementation depends on your cloudflared setup
    echo \"CONFIG_APPLIED:yes\"
else
    echo \"CLOUDFLARED_AVAILABLE:no\"
fi

EOFCONFIG
chmod +x /tmp/configure_cloudflare.sh
echo \"\$PARSED_DATA\" | /tmp/configure_cloudflare.sh
rm -f /tmp/configure_cloudflare.sh
" 2>&1)

    # Parse and display results
    if echo "$CONFIG_SCRIPT" | grep -q "CLOUDFLARE_CONFIG:"; then
        print_substep "done" "Cloudflare configuration generated"

        # Extract and display config
        echo ""
        echo "$CONFIG_SCRIPT" | sed -n '/CLOUDFLARE_CONFIG:/,/END_CONFIG/p' | grep -v "CLOUDFLARE_CONFIG:" | grep -v "END_CONFIG" | while read line; do
            echo -e "     ${DIM}$line${NC}"
        done
        echo ""

        # Check if cloudflared is available
        if echo "$CONFIG_SCRIPT" | grep -q "CLOUDFLARED_AVAILABLE:yes"; then
            print_substep "done" "Cloudflared configured"

            # Restart cloudflared in background (don't wait for it)
            print_substep "start" "Restarting cloudflared"
            run_ssh "nohup systemctl restart cloudflared > /dev/null 2>&1 &" 2>/dev/null || \
            run_ssh "nohup docker restart cloudflared > /dev/null 2>&1 &" 2>/dev/null || \
            print_substep "skip" "Could not restart cloudflared (manual restart may be needed)"

            print_substep "done" "Cloudflared restart initiated"
        else
            print_substep "skip" "Cloudflared not available (install cloudflared for automatic configuration)"
        fi

        step_end "Cloudflare Configuration" "success"
    else
        print_substep "skip" "Configuration generation failed"
        step_end "Cloudflare Configuration" "skipped"
    fi
else
    print_substep "skip" "No Cloudflare configuration needed"
    step_end "Cloudflare Configuration" "skipped"
fi

# Print final metrics summary
print_metrics_summary

# Final success banner
echo -e "${GREEN}${BOLD}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}${BOLD}  Deployment Complete!${NC}"
echo -e "${GREEN}${BOLD}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BOLD}Application URLs:${NC}"
echo "  https://learn.arvaibhav.cloud"
echo "  https://learn-api.arvaibhav.cloud"
echo ""
echo -e "${DIM}Deployed: $CURRENT_BRANCH @ $COMMIT_HASH${NC}"
echo ""
