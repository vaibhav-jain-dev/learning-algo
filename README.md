# DSAlgo Learning Platform

A fast and lightweight code runner for practicing Data Structures, Algorithms, System Design, and Machine Coding problems.

## Features

- **Fast Code Execution**: Pre-warmed kernel pools for instant code execution with minimal delay
- **Multi-Language Support**: Python 3 and Go with proper return value handling
- **Lightweight UI**: HTMX-powered interface with no heavy JavaScript frameworks
- **Low Memory Footprint**: Optimized to run within 2GB memory including all kernels
- **84+ Problems**: DS/Algo problems across 13+ categories
- **Content Standards**: Validated markdown format with GitHub Actions

## Technology Stack

| Component | Technology |
|-----------|------------|
| Backend | Go with Fiber |
| Frontend | HTMX + Server-rendered HTML |
| Code Execution | Persistent kernel pools |
| Container | Docker |

## Quick Start

### Using Docker (Recommended)

```bash
# Build and run
docker-compose up --build

# Access at http://localhost:8080
```

### Local Development

```bash
# Install Go 1.21+
# Install Python 3.11+

# Run backend
cd backend
go run ./cmd/server

# Access at http://localhost:8080
```

## Code Execution Model

The platform uses **persistent kernel pools** for fast code execution:

### Python Requirements

- Code **must define** a `main()` function
- All logic must be inside `main()`
- `main()` must return a value

```python
def main():
    # Your code here
    result = [1, 2, 3]
    return result
```

**Supported return types:**
- Numbers, strings, booleans
- List, tuple, dictionary
- Nested combinations

### Go Requirements

- Code **must include** a `main()` function in `package main`
- Output is captured from stdout

```go
package main

import "fmt"

func main() {
    result := []int{1, 2, 3}
    fmt.Println(result)
}
```

## Project Structure

```
learning-algo/
├── backend/
│   ├── cmd/server/         # Main server entry point
│   └── internal/
│       ├── handlers/       # HTTP handlers
│       ├── kernel/         # Kernel pool management
│       └── models/         # Data models
├── frontend/
│   ├── templates/          # Go HTML templates
│   └── static/css/         # Stylesheets
├── problems/               # 84+ DS/Algo problems
│   ├── arrays/
│   ├── graphs/
│   ├── strings/
│   └── ...
├── standards.md            # Content format standards
├── scripts/
│   └── validate-markdown.sh
└── .github/workflows/      # CI/CD
```

## Content Standards

All problems follow a standardized markdown format. See [standards.md](standards.md) for:

- DS/Algo problem format
- Machine Coding problem format
- System Design topic format
- Validation rules

### Running Validation Locally

```bash
./scripts/validate-markdown.sh
```

## Resource Limits

| Resource | Limit |
|----------|-------|
| Total Memory | 2 GB |
| Python Kernels | 3 (256MB each) |
| Go Kernels | 2 (256MB each) |
| Execution Timeout | 10 seconds |
| CPU | 2 cores |

## API Endpoints

### Pages (HTMX)

| Route | Description |
|-------|-------------|
| `GET /` | Home page |
| `GET /practice` | Code runner |
| `GET /system-design` | System design topics |
| `GET /design-patterns` | Design patterns |
| `GET /machine-coding` | Machine coding problems |

### API

| Route | Description |
|-------|-------------|
| `GET /api/problems` | List all problems |
| `GET /api/problem/{path}` | Get problem content |
| `POST /api/run` | Execute code |

### HTMX Partials

| Route | Description |
|-------|-------------|
| `GET /htmx/problem-tree` | Problem navigation tree |
| `GET /htmx/problem-content/{path}` | Problem description |
| `POST /htmx/execute` | Execute code (returns HTML) |

## Security

This platform is designed for **internal or semi-trusted users**:

- Code execution is restricted by memory, CPU, and time limits
- Non-root container user
- No privilege escalation
- Isolated execution environments

**Not suitable for:**
- Anonymous public access
- Untrusted code execution

## Contributing

1. Fork the repository
2. Follow the [standards.md](standards.md) format
3. Run validation: `./scripts/validate-markdown.sh`
4. Submit a pull request

## License

MIT
