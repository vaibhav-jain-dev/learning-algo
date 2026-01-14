FROM python:3.11-slim

# Install Go
RUN apt-get update && apt-get install -y \
    wget \
    git \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Go 1.21
RUN wget https://go.dev/dl/go1.21.5.linux-amd64.tar.gz \
    && tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz \
    && rm go1.21.5.linux-amd64.tar.gz

ENV PATH="/usr/local/go/bin:${PATH}"
ENV GOPATH="/go"
ENV PATH="${GOPATH}/bin:${PATH}"

# Set working directory
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 8080

# Run the application
CMD ["python", "server/app.py"]
