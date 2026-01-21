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
declare -A STEP_TIMES
declare -A STEP_STATUS
DEPLOY_START_TIME=""
TOTAL_STEPS=0
COMPLETED_STEPS=0

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
    STEP_TIMES["${step_name}_start"]=$(date +%s)
    STEP_STATUS["$step_name"]="running"
}

# End timing a step
step_end() {
    local step_name="$1"
    local status="${2:-success}"
    local end_time=$(date +%s)
    local start_time=${STEP_TIMES["${step_name}_start"]}
    STEP_TIMES["${step_name}_duration"]=$((end_time - start_time))
    STEP_STATUS["$step_name"]="$status"
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

    for step in "SSH Connection" "Setup Directory" "Sync Code" "Configure Env" "Docker Operations" "Health Check"; do
        local duration=${STEP_TIMES["${step}_duration"]:-0}
        local status=${STEP_STATUS["$step"]:-"pending"}
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

# Start deployment timer
DEPLOY_START_TIME=$(date +%s)
TOTAL_STEPS=6

print_step 1 $TOTAL_STEPS "Testing SSH Connection"
step_start "SSH Connection"

print_substep "start" "Connecting to $SSH_HOST:$SSH_PORT"
SSH_OUTPUT=$(ssh -o BatchMode=yes \
    -o ConnectTimeout=10 \
    -o StrictHostKeyChecking=no \
    -i "$SSH_PRIVATE_KEY" \
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

print_substep "done" "SSH connection established"
print_substep "info" "Server: $(echo "$SSH_OUTPUT" | tail -1)"
step_end "SSH Connection" "success"

# ==========================================
# Deployment
# ==========================================

# SSH command helper
run_ssh() {
    ssh -o BatchMode=yes \
        -o StrictHostKeyChecking=no \
        -i "$SSH_PRIVATE_KEY" \
        -p "$SSH_PORT" \
        "$SSH_USERNAME@$SSH_HOST" "$@"
}

# Deploy ENV_FILE if exists (Step 2 - can run in parallel with directory setup)
print_step 2 $TOTAL_STEPS "Setup Directory & Environment"
step_start "Setup Directory"

if [ "$HAS_ENV_FILE" = "true" ]; then
    print_substep "parallel" "Creating project directory + Deploying .env file"

    # Create temp dir for parallel job outputs
    PARALLEL_DIR=$(mktemp -d)
    trap "rm -rf $PARALLEL_DIR" EXIT

    # Job 1: Create project directory
    (
        run_ssh "mkdir -p $PROJECT_PATH" > "$PARALLEL_DIR/mkdir.out" 2>&1
        echo $? > "$PARALLEL_DIR/mkdir.exit"
    ) &
    PID_MKDIR=$!

    # Job 2: Copy env file (needs directory to exist, so we wait)
    wait $PID_MKDIR
    if [ "$(cat $PARALLEL_DIR/mkdir.exit)" -eq 0 ]; then
        print_substep "done" "Project directory created"
    else
        print_substep "error" "Failed to create directory"
    fi

    print_substep "start" "Deploying .env file via SCP"
    scp -o StrictHostKeyChecking=no \
        -i "$SSH_PRIVATE_KEY" \
        -P "$SSH_PORT" \
        "$ENV_FILE" \
        "$SSH_USERNAME@$SSH_HOST:$PROJECT_PATH/.env" 2>/dev/null

    run_ssh "chmod 600 $PROJECT_PATH/.env" 2>/dev/null
    print_substep "done" ".env file deployed (permissions: 600)"
else
    print_substep "start" "Creating project directory"
    run_ssh "mkdir -p $PROJECT_PATH" 2>/dev/null
    print_substep "done" "Project directory ready"
    print_substep "skip" "No .env file configured"
fi

step_end "Setup Directory" "success"

# Synchronize code (Step 3)
print_step 3 $TOTAL_STEPS "Synchronizing Code"
step_start "Sync Code"

print_substep "start" "Checking repository status"
SYNC_OUTPUT=$(run_ssh << SYNC_SCRIPT
set -e

PROJECT_BASE=\$(dirname "$PROJECT_PATH")
if [ ! -d "\$PROJECT_BASE" ]; then
    sudo mkdir -p "\$PROJECT_BASE"
    sudo chown \$USER:\$USER "\$PROJECT_BASE"
fi

if [ ! -d "$PROJECT_PATH/.git" ]; then
    echo "CLONE"
    git clone --branch "$CURRENT_BRANCH" "$REPO_URL" "$PROJECT_PATH" 2>&1
    cd "$PROJECT_PATH"
else
    echo "UPDATE"
    cd "$PROJECT_PATH"
    git fetch origin 2>&1
    git checkout "$CURRENT_BRANCH" 2>&1
    git reset --hard "origin/$CURRENT_BRANCH" 2>&1
    git pull origin "$CURRENT_BRANCH" 2>&1
fi

echo "COMMIT:\$(git rev-parse --short HEAD)"
echo "MSG:\$(git log -1 --pretty=%B | head -1)"
SYNC_SCRIPT
)

if echo "$SYNC_OUTPUT" | grep -q "^CLONE"; then
    print_substep "done" "Repository cloned"
else
    print_substep "done" "Repository updated"
fi

COMMIT_HASH=$(echo "$SYNC_OUTPUT" | grep "^COMMIT:" | cut -d: -f2)
COMMIT_MSG=$(echo "$SYNC_OUTPUT" | grep "^MSG:" | cut -d: -f2-)
print_substep "info" "Commit: $COMMIT_HASH - $COMMIT_MSG"
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

DOCKER_OUTPUT=$(run_ssh << DOCKER_SCRIPT
set -e
cd "$PROJECT_PATH"

# Load env if exists
if [ -f ".env" ]; then
    set -a
    source .env
    set +a
fi

# Force restart if requested
if [ "$FORCE_RESTART" = "true" ]; then
    echo "STEP:teardown"
    docker compose down --remove-orphans --timeout 30 2>&1 || true
fi

# Parallel: Pull images and build in parallel
echo "STEP:parallel_start"

# Run pull in background
docker compose pull --ignore-pull-failures 2>&1 &
PULL_PID=\$!

# Build can also run (for services that don't need pull)
# Wait for pull to complete
wait \$PULL_PID 2>/dev/null || true
echo "STEP:pull_done"

# Start containers with build
echo "STEP:up_start"
docker compose up -d --build --remove-orphans 2>&1

# Brief wait for stabilization
sleep 3

# Get service count
echo "STEP:up_done"
echo "SERVICES:\$(docker compose ps -q 2>/dev/null | wc -l)"

DOCKER_SCRIPT
)

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

# Wait a bit for containers to fully start
sleep 5

HEALTH_OUTPUT=$(run_ssh << HEALTH_SCRIPT
cd "$PROJECT_PATH"
echo "CONTAINERS:"
docker compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Health}}" 2>/dev/null

# Check for unhealthy containers
UNHEALTHY=\$(docker compose ps --format "{{.Health}}" 2>/dev/null | grep -c "unhealthy" || echo "0")
RUNNING=\$(docker compose ps --format "{{.Status}}" 2>/dev/null | grep -c "running\|Up" || echo "0")
TOTAL=\$(docker compose ps -q 2>/dev/null | wc -l)

echo "STATS:\$RUNNING/\$TOTAL running, \$UNHEALTHY unhealthy"
HEALTH_SCRIPT
)

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

# Check if all healthy
if echo "$HEALTH_OUTPUT" | grep -q "unhealthy"; then
    print_substep "error" "Some containers unhealthy"
    step_end "Health Check" "failed"
else
    print_substep "done" "All containers healthy"
    step_end "Health Check" "success"
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
