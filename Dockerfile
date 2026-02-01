# DSAlgo Learn Platform - Dockerfile
# Optimized multi-stage build for minimal image size
# Target: < 150MB compressed
#
# DEPENDENCY CACHING STRATEGY:
# Uses BuildKit cache mounts to persist dependencies across builds.
# Go modules are cached in /go/pkg/mod, so even when layers rebuild,
# dependencies are already downloaded and verified.
#
# Build stages:
#   1. go-builder:      Compiles Go backend (go mod tidy with cache mount)
#   2. go-extractor:    Extracts minimal Go toolchain
#   3. frontend-builder: Builds frontend assets (package.json -> npm install -> source)
#   4. runtime:         Final image with Python + Go + app (requirements.txt -> pip)
#
# IMPORTANT: Requires Docker BuildKit (DOCKER_BUILDKIT=1 or Docker 23.0+)

# =============================================================================
# Stage 1: Build Go backend
# =============================================================================
FROM golang:1.24-alpine AS go-builder

WORKDIR /build

# Install build dependencies
RUN apk add --no-cache git

# DEPENDENCY CACHING: Copy go.mod and source for go mod tidy
# go.sum in repo is incomplete, so we generate it during build
COPY backend/go.mod ./
COPY backend/cmd ./cmd
COPY backend/internal ./internal

# Download dependencies and generate complete go.sum
# BuildKit cache mount persists modules across builds (fast even if layer rebuilds)
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod tidy

# Build the binary with maximum optimizations
# -ldflags="-w -s" strips debug info, reduces ~30% size
# CGO_ENABLED=0 creates static binary
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
    -ldflags="-w -s" \
    -o server ./cmd/server

# =============================================================================
# Stage 2: Extract Go toolchain for code execution (minimal)
# =============================================================================
FROM golang:1.24-alpine AS go-extractor

# Copy only essential Go files needed for compilation
RUN mkdir -p /go-minimal/bin /go-minimal/src /go-minimal/pkg && \
    cp /usr/local/go/bin/go /go-minimal/bin/ && \
    cp /usr/local/go/bin/gofmt /go-minimal/bin/ && \
    cp -r /usr/local/go/src /go-minimal/ && \
    cp -r /usr/local/go/pkg /go-minimal/

# =============================================================================
# Stage 3: Frontend builder (for npm dependencies if package.json exists)
# =============================================================================
FROM node:20-alpine AS frontend-builder

WORKDIR /frontend

# DEPENDENCY CACHING: Copy package files FIRST
# Only rebuilds when package.json or package-lock.json change
COPY frontend/package*.json ./

# Install dependencies (cached layer)
# Use || true to gracefully handle projects without package.json
RUN if [ -f package.json ]; then \
        npm ci --only=production 2>/dev/null || npm install --only=production; \
    fi

# Copy frontend source (changes here won't invalidate dependency cache)
COPY frontend/ ./

# Build frontend if build script exists
RUN if [ -f package.json ] && grep -q '"build"' package.json; then \
        npm run build; \
    fi

# =============================================================================
# Stage 4: Get wkhtmltopdf from official Alpine image
# =============================================================================
FROM surnet/alpine-wkhtmltopdf:3.20.3-0.12.6-full AS wkhtmltopdf

# =============================================================================
# Stage 5: Minimal Python runtime
# =============================================================================
FROM python:3.12-alpine AS runtime

# Labels
LABEL maintainer="dsalgo-learn"
LABEL app.name="dsalgo-learn-platform"

# Install minimal dependencies for wkhtmltopdf
RUN apk add --no-cache \
    ca-certificates \
    wget \
    fontconfig \
    libgcc \
    libstdc++ \
    libx11 \
    libxrender \
    libxext \
    libssl3 \
    libjpeg-turbo \
    && rm -rf /var/cache/apk/*

# Copy wkhtmltopdf from official Alpine image
COPY --from=wkhtmltopdf /bin/wkhtmltopdf /usr/local/bin/wkhtmltopdf
RUN wkhtmltopdf --version

# PYTHON DEPENDENCY CACHING: Copy requirements FIRST
# Only rebuilds when requirements.txt changes
WORKDIR /app
COPY requirements.txt ./

# Install Python dependencies (cached layer - only rebuilds when requirements.txt changes)
RUN pip install --no-cache-dir -r requirements.txt 2>/dev/null || true

# Copy minimal Go toolchain from extractor
COPY --from=go-extractor /go-minimal /usr/local/go

# Set Go environment
ENV GOROOT="/usr/local/go"
ENV GOPATH="/go"
ENV GOCACHE="/app/.go-cache"
ENV PATH="/usr/local/go/bin:${GOPATH}/bin:${PATH}"

# Python optimization
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Copy built server binary from builder
COPY --from=go-builder /build/server ./server

# Copy frontend (use built assets if available, otherwise source)
COPY --from=frontend-builder /frontend ./frontend/
COPY problems/ ./problems/
COPY topics/ ./topics/
COPY docs/ ./docs/

# Create non-root user and necessary directories
RUN adduser -D -s /bin/sh dsalgo && \
    mkdir -p /go /app/state /app/.go-cache /app/go-kernels /home/dsalgo/.go-kernels && \
    chown -R dsalgo:dsalgo /app /tmp /go /home/dsalgo

USER dsalgo

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Run the server
CMD ["./server"]
