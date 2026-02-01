# DSAlgo Backend

## Running the Server

**IMPORTANT:** The server MUST be run from the **project root directory**, not from the `backend/` directory.

### Correct way (from project root):

```bash
# From /home/user/learning-algo/
go run backend/cmd/server/main.go

# Or build and run:
go build -o server backend/cmd/server
./server
```

### Incorrect way (will cause "file not found" errors):

```bash
# ❌ DON'T do this - won't find topics, problems, frontend files
cd backend
go run cmd/server/main.go
```

## Why?

The server expects these directories at `./`:
- `./topics/` - Topic markdown content for PDF generation
- `./problems/` - Problem sets
- `./frontend/` - Frontend templates and static files
- `./docs/` - Documentation

When running from `backend/`, these paths don't exist, causing:
- PDF generation to fail with "no such file or directory"
- Template rendering errors
- Static file 404s

## Development

```bash
# Install dependencies
cd backend
go mod download

# Run from project root
cd ..
go run backend/cmd/server/main.go
```

## Docker

In Docker, the working directory is `/app` with all files copied there, so paths work correctly:

```dockerfile
WORKDIR /app
COPY topics/ ./topics/
COPY frontend/ ./frontend/
...
CMD ["./server"]
```

## Environment Variables

```bash
# Optional - customize PDF storage
export PDF_DIR="/tmp/pdf-exports"  # Default: /tmp/pdf-exports

# Optional - base URL for links
export BASE_URL="http://localhost:8080"  # Default: http://localhost:8080
```
