# DSAlgo Learn Platform - Dockerfile
# Optimized multi-stage build for minimal image size
# Target: < 150MB compressed

# =============================================================================
# Stage 1: Build Go backend
# =============================================================================
FROM golang:1.21-alpine AS go-builder

WORKDIR /build

# Install build dependencies
RUN apk add --no-cache git

# Copy go.mod first for better layer caching
COPY backend/go.mod ./

# Copy backend source
COPY backend/cmd ./cmd
COPY backend/internal ./internal

# Download dependencies and generate go.sum
RUN go mod tidy

# Build the binary with maximum optimizations
# -ldflags="-w -s" strips debug info, reduces ~30% size
# CGO_ENABLED=0 creates static binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
    -ldflags="-w -s" \
    -o server ./cmd/server

# =============================================================================
# Stage 2: Extract Go toolchain for code execution (minimal)
# =============================================================================
FROM golang:1.21-alpine AS go-extractor

# Copy only essential Go files needed for compilation
RUN mkdir -p /go-minimal/bin /go-minimal/src /go-minimal/pkg && \
    cp /usr/local/go/bin/go /go-minimal/bin/ && \
    cp /usr/local/go/bin/gofmt /go-minimal/bin/ && \
    cp -r /usr/local/go/src /go-minimal/ && \
    cp -r /usr/local/go/pkg /go-minimal/

# =============================================================================
# Stage 3: Minimal Python runtime
# =============================================================================
FROM python:3.12-alpine AS runtime

# Labels
LABEL maintainer="dsalgo-learn"
LABEL app.name="dsalgo-learn-platform"

# Install minimal dependencies only
RUN apk add --no-cache \
    ca-certificates \
    wget \
    && rm -rf /var/cache/apk/* /tmp/*

# Copy minimal Go toolchain from extractor
COPY --from=go-extractor /go-minimal /usr/local/go

# Set Go environment
ENV GOROOT="/usr/local/go"
ENV GOPATH="/go"
ENV GOCACHE="/app/.go-cache"
ENV PATH="/usr/local/go/bin:${GOPATH}/bin:${PATH}"

# Set working directory
WORKDIR /app

# Copy built server binary from builder
COPY --from=go-builder /build/server ./server

# Copy frontend, problems, and topics
COPY frontend/ ./frontend/
COPY problems/ ./problems/
COPY topics/ ./topics/

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
