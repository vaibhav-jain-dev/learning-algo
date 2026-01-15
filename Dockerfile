# DSAlgo Learn Platform - Dockerfile
# Fast Code Runner with Go/Fiber backend and HTMX frontend
# Memory target: < 2GB total

# Build stage for Go backend
FROM golang:1.21-alpine AS builder

WORKDIR /build

# Copy go.mod first
COPY backend/go.mod ./

# Copy backend source
COPY backend/cmd ./cmd
COPY backend/internal ./internal

# Download dependencies and generate go.sum
RUN go mod tidy

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o server ./cmd/server

# Runtime stage
FROM python:3.11-slim

# Labels
LABEL maintainer="dsalgo-learn"
LABEL app.name="dsalgo-learn-platform"
LABEL app.description="Fast Code Runner with Go/Fiber and HTMX"

# Install Go runtime for code execution
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Go 1.21
RUN wget -q https://go.dev/dl/go1.21.5.linux-amd64.tar.gz \
    && tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz \
    && rm go1.21.5.linux-amd64.tar.gz

# Set Go environment
ENV PATH="/usr/local/go/bin:${PATH}"
ENV GOPATH="/go"
ENV PATH="${GOPATH}/bin:${PATH}"
ENV GOCACHE="/app/.go-cache"

# Set working directory
WORKDIR /app

# Copy built binary from builder
COPY --from=builder /build/server ./server

# Copy frontend and problems
COPY frontend/ ./frontend/
COPY problems/ ./problems/

# Create non-root user, state directory, Go cache, and kernel work directory
RUN useradd -m -s /bin/bash dsalgo && \
    mkdir -p /go /app/state /app/.go-cache /app/go-kernels && \
    chown -R dsalgo:dsalgo /app /tmp /go

USER dsalgo

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Run the server
CMD ["./server"]
