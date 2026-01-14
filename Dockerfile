# DSAlgo Learn Platform - Dockerfile
# Unique naming: dsalgo-learn-*

FROM python:3.11-slim AS dsalgo-learn-base

# Labels for identification
LABEL maintainer="dsalgo-learn"
LABEL app.name="dsalgo-learn-platform"
LABEL app.description="DS/Algo Learning Platform with Python & Go support"

# Install system dependencies and Go
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    git \
    gcc \
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
ENV GOCACHE="/tmp/go-cache"

# Set working directory
WORKDIR /app

# Copy and install Python dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy application files
COPY backend/ ./backend/
COPY frontend/ ./frontend/
COPY problems/ ./problems/

# Create non-root user for security
RUN useradd -m -s /bin/bash dsalgo && \
    chown -R dsalgo:dsalgo /app /tmp

USER dsalgo

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Run the application
CMD ["python3", "backend/app.py"]
