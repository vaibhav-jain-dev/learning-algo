# DSAlgo Learning Platform - AI Model Context

> **Purpose**: This document provides complete project context for AI models to understand the codebase, architecture, features, and implementation details.

---

## Project Overview

**DSAlgo Learning Platform** is a high-performance, interactive code execution and learning platform for Data Structures, Algorithms, System Design, and Database technologies. Built with Go and HTMX, it provides instant code execution through persistent kernel pools and hands-on database playgrounds.

### Core Value Proposition

1. **Lightning-fast code execution** (<100ms) via pre-warmed Jupyter kernel pools
2. **Interactive learning** with real SQL, Redis, and Elasticsearch environments
3. **Lightweight architecture** - runs on 2GB RAM with HTMX (no heavy JS frameworks)
4. **Comprehensive content** - 84+ DS/Algo problems + system design topics + database tutorials

---

## Architecture

### High-Level Design

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │ HTTP/HTMX/WebSocket
         ▼
┌─────────────────────────────────┐
│   Fiber Web Server (Go)         │
│   - Route handling              │
│   - Template rendering          │
│   - HTMX partial updates        │
└────┬──────────┬─────────┬───────┘
     │          │         │
     ▼          ▼         ▼
┌─────────┐ ┌─────────┐ ┌──────────────┐
│ Kernel  │ │Database │ │   Topic      │
│ Pools   │ │Handlers │ │   Indexer    │
└────┬────┘ └────┬────┘ └──────────────┘
     │           │
     ▼           ▼
┌──────────┐ ┌──────────────────────┐
│ Python/  │ │ PostgreSQL           │
│ Go       │ │ Elasticsearch        │
│ Kernels  │ │ Redis                │
└──────────┘ └──────────────────────┘
```

### Technology Stack

| Layer | Technology | Why Chosen |
|-------|------------|------------|
| **Backend** | Go + Fiber framework | High performance, low memory, fast compilation, excellent concurrency |
| **Frontend** | HTMX + Server-rendered HTML | No JS bundle overhead, instant page updates, progressive enhancement |
| **Code Execution** | Jupyter Kernel Protocol | Industry-standard, supports multiple languages, proper process isolation |
| **Databases** | PostgreSQL, Redis, Elasticsearch | Cover SQL, NoSQL, and search use cases for comprehensive learning |
| **Container** | Docker + Docker Compose | Easy deployment, consistent environments, resource isolation |
| **Content** | Markdown (Goldmark parser) | Version-controllable, readable, easy to contribute |
| **Validation** | GitHub Actions + Shell scripts | Automated quality checks, enforce standards |

---

## Core Components

### 1. Kernel Pool System (Code Execution Engine)

**Location**: `backend/internal/kernel/`

**Purpose**: Execute Python and Go code with sub-100ms latency through persistent kernel pools.

#### Architecture

```go
ExecutionManager
    ├── PythonPool (3 kernels × 256MB)
    │   ├── Kernel 1 (pre-warmed)
    │   ├── Kernel 2 (pre-warmed)
    │   └── Kernel 3 (pre-warmed)
    └── GoPool (2 kernels × 256MB)
        ├── Kernel 1 (pre-warmed)
        └── Kernel 2 (pre-warmed)
```

#### How It Works

1. **Pre-warming**: Kernels start on-demand and remain alive for 5 minutes
2. **Code Submission**: User submits code via API/WebSocket
3. **Kernel Assignment**: Available kernel claimed from pool
4. **Execution**: Code runs in isolated kernel process
5. **Result Capture**: Output, errors, and metrics captured
6. **Kernel Return**: Kernel returned to pool (not killed)
7. **Idle Cleanup**: Unused kernels shut down after 5 min

#### Python Execution Requirements

```python
# REQUIRED: main() function that returns a value
def main():
    result = solve_problem()
    return result  # Must return, not just print
```

#### Go Execution Requirements

```go
// REQUIRED: package main with main() function
package main
import "fmt"
func main() {
    fmt.Println(result)  // Output captured from stdout
}
```

#### Key Files

- `pool.go`: Generic kernel pool implementation
- `python.go`: Python kernel via Jupyter protocol
- `golang.go`: Go kernel via compile-and-run
- `manager.go`: Execution state management, WebSocket pub/sub

---

### 2. Web Server & Routing

**Location**: `backend/cmd/server/main.go`

**Framework**: Fiber (Express-like Go framework)

#### Route Structure

**Page Routes** (Server-rendered HTML):
```go
GET  /                    → Home page
GET  /practice            → DSA code editor
GET  /sql                 → SQL playground (unified)
GET  /redis               → Redis playground (unified)
GET  /elasticsearch       → Elasticsearch playground (unified)
GET  /system-design       → System design topics list
GET  /design-patterns     → Design patterns list
GET  /machine-coding      → Machine coding problems
GET  /golang              → Go tutorials
GET  /python-asyncio      → Python async tutorials
```

**API Routes** (JSON responses):
```go
GET  /api/problems        → List all DSA problems
GET  /api/problem/*       → Get problem content
POST /api/run             → Execute code (async)
GET  /api/execution/:id   → Get execution status
POST /api/execution/:id/stop → Stop running code
GET  /api/stats            → Kernel pool statistics
```

**HTMX Partials** (HTML fragments for dynamic updates):
```go
GET  /htmx/problem-tree     → Problem navigation tree
GET  /htmx/problem-content/* → Problem description
POST /htmx/execute          → Execute code (returns HTML)
```

**Database APIs**:
```go
# SQL
POST /api/sql/execute       → Run SQL query
GET  /api/sql/schema        → Get database schema
GET  /api/sql/er-diagram   → Get ER diagram

# Redis
POST /api/redis/execute     → Run Redis command
GET  /api/redis/keys        → List all keys
GET  /api/redis/info        → Server info

# Elasticsearch
POST /api/elasticsearch/execute → Run ES query
POST /api/elasticsearch/search  → Simple search
GET  /api/elasticsearch/mapping/:index → Get mapping
```

**WebSocket**:
```go
WS /ws/execute → Real-time code execution updates
```

---

### 3. Dashboard Components

#### SQL Dashboard (`/sql`)

**What It Does**:
- Interactive SQL query editor with syntax highlighting
- Execute queries against pre-loaded e-commerce database
- View results in formatted tables
- Explore database schema and relationships
- See query execution time and row counts
- Generate ER diagrams

**Database**: PostgreSQL with sample data (customers, orders, products, order_items)

**Sample Schema**:
```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    total_amount DECIMAL(10,2),
    order_date TIMESTAMP
);
```

**Use Cases**:
- Practice JOINs, aggregations, subqueries
- Learn query optimization with EXPLAIN
- Understand indexing strategies
- Explore window functions

**Technical Details**:
- Handler: `backend/internal/handlers/sql_handlers.go`
- Client: `backend/internal/db/`
- Migrations: `backend/db/migrations/`
- Connection pooling with graceful degradation if DB unavailable

---

#### Redis Dashboard (`/redis`)

**What It Does**:
- Execute Redis commands interactively
- Explore different data structures (strings, lists, sets, hashes, sorted sets)
- Practice caching patterns
- Learn pub/sub messaging
- View server info and statistics
- Pre-loaded with sample user and session data

**Sample Data**:
```redis
SET user:1000:name "John Doe"
SET user:1000:email "john@example.com"
LPUSH user:1000:notifications "New message"
ZADD leaderboard 1500 "player1" 2000 "player2"
HSET user:1000:profile age 30 city "New York"
```

**Use Cases**:
- Learn Redis data structures
- Practice caching strategies (LRU eviction)
- Understand expiration and TTL
- Explore atomic operations
- Learn rate limiting patterns

**Technical Details**:
- Handler: `backend/internal/handlers/redis_handlers.go`
- Client: `backend/internal/redis/`
- Sample data loader: `LoadSampleData()` method
- Max memory: 200MB with LRU eviction

---

#### Elasticsearch Dashboard (`/elasticsearch`)

**What It Does**:
- Write and execute Elasticsearch queries (JSON DSL)
- Full-text search across indexed documents
- Aggregations and analytics
- Analyze text with different analyzers
- View mappings and index settings
- Pre-loaded with test packages and Python test data

**Sample Indices**:
- `tests`: Python test frameworks and libraries
- `packages`: Python packages with descriptions

**Sample Query**:
```json
{
  "query": {
    "multi_match": {
      "query": "testing framework",
      "fields": ["name^2", "description"]
    }
  },
  "aggs": {
    "by_category": {
      "terms": { "field": "category.keyword" }
    }
  }
}
```

**Use Cases**:
- Learn full-text search
- Practice query DSL (match, bool, range, etc.)
- Understand analyzers and tokenization
- Learn aggregations for analytics
- Explore relevance scoring

**Technical Details**:
- Handler: `backend/internal/handlers/elasticsearch_handlers.go`
- Client: `backend/internal/elasticsearch/`
- Sample data: `samples_dataset/tests.json`, `packages.json`
- Kibana included for visualization (port 5601)

---

### 4. Problem Repository

**Location**: `problems/`

**Structure**:
```
problems/
├── arrays/
│   ├── two-pointers/
│   └── sliding-window/
├── strings/
├── linked-lists/
├── trees/
├── graphs/
├── dynamic-programming/
├── heaps-and-priority-queues/
├── hashing/
├── sorting-and-searching/
├── stacks-and-queues/
├── recursion-and-backtracking/
└── multi-concept/
```

**Each Problem Contains**:
- `problem.md`: Description, examples, constraints, approach
- `python_code.py`: Python solution with tests
- `golang_code.go`: Go solution with tests

**Format Standards**: See `standards.md` for validation rules

**Validation**: GitHub Actions enforce format on every PR

---

### 5. Topics & Learning Content

**Location**: `topics/`

**Categories**:

1. **System Design** (`topics/system-design/`)
   - Load balancing, caching, sharding
   - Microservices architecture
   - Rate limiting, API design
   - Message queues, pub/sub

2. **Design Patterns** (`topics/design-patterns/`)
   - Creational patterns (Singleton, Factory, Builder)
   - Structural patterns (Adapter, Decorator, Proxy)
   - Behavioral patterns (Observer, Strategy, Command)

3. **Machine Coding** (`topics/machine-coding/`)
   - LRU Cache, Rate Limiter
   - Task Scheduler, Parking Lot
   - Implementation-focused problems

4. **SQL Learning** (`topics/sql-learning/`)
   - Indexing strategies (B-tree, Hash, GiST)
   - Query optimization
   - Transaction isolation levels

**Content Format**: Markdown with code examples, diagrams, trade-offs

**Topic Indexer**: In-memory cache with 5-minute TTL (`backend/internal/topics/`)

---

## Request Flow Examples

### Code Execution Flow

```
1. User writes code in browser editor
2. Clicks "Run" button
3. HTMX/WebSocket sends code + language to server
4. ExecutionManager.Execute() called
5. Kernel claimed from appropriate pool (Python/Go)
6. Code sent to kernel via protocol (Jupyter/compile-run)
7. Kernel executes code in isolated process
8. Output/errors captured in real-time
9. Metrics collected (duration, memory, exit code)
10. Results sent back via WebSocket/HTTP
11. Browser updates output section dynamically
12. Kernel returned to pool for reuse
```

### SQL Query Flow

```
1. User writes SQL query in dashboard
2. POST /api/sql/execute with query
3. SQLHandlers.ExecuteSQL() called
4. Query validated (basic injection checks)
5. Executed via PostgreSQL connection pool
6. Results formatted as JSON with metadata
7. Response includes: rows, columns, execution time, affected rows
8. Frontend renders as table
```

### Problem Loading Flow

```
1. User navigates to /practice
2. HTMX loads /htmx/problem-tree
3. Handler scans problems/ directory
4. Builds tree structure with categories
5. Returns HTML fragment
6. User clicks problem
7. HTMX requests /htmx/problem-content/{path}
8. Markdown parsed with Goldmark
9. Code files read (python_code.py, golang_code.go)
10. HTML fragment with syntax-highlighted code returned
11. Dynamically inserted into page
```

---

## Resource Management

### Memory Allocation (2GB Total)

| Component | Memory | Notes |
|-----------|--------|-------|
| Go Server | ~200MB | Fiber + handlers + templates |
| Python Kernels | 768MB | 3 × 256MB (on-demand) |
| Go Kernels | 512MB | 2 × 256MB (on-demand) |
| PostgreSQL | 512MB | Connection pool + cache |
| Elasticsearch | 856MB | JVM heap (428MB × 2) |
| Redis | 256MB | In-memory with LRU |
| Kibana | 512MB | Optional visualization |
| Buffer | ~500MB | Temporary execution, caching |

### CPU Allocation

- **Server**: 2 cores (shared)
- **Databases**: 1 core each (burst to 2)
- **Kernels**: Use server CPU quota

### Timeouts

- **Code Execution**: 10 seconds
- **SQL Query**: 30 seconds
- **Redis Command**: 5 seconds
- **ES Query**: 30 seconds
- **Kernel Idle**: 5 minutes (auto-shutdown)

---

## Performance Characteristics

### Latency Benchmarks

| Operation | Cold Start | Warm Pool | Notes |
|-----------|-----------|-----------|-------|
| Python Exec | 1-2s | <100ms | Kernel startup vs reuse |
| Go Exec | 1-2s | <100ms | Compilation + run |
| SQL Query | <10ms | <10ms | Simple SELECT |
| Redis Cmd | <1ms | <1ms | In-memory |
| ES Search | 10-50ms | 10-50ms | Depends on query |
| Page Load | <50ms | <50ms | Server-rendered |
| HTMX Update | <20ms | <20ms | Partial HTML |

### Concurrency Limits

- **Simultaneous Python**: 3 executions
- **Simultaneous Go**: 2 executions
- **HTTP Connections**: 1000+
- **WebSocket Connections**: 100+
- **DB Connections**: 20 pool

---

## Security Considerations

### Implemented Protections

1. **Execution Isolation**
   - Each kernel runs in separate process
   - Memory limits enforced (256MB per kernel)
   - CPU quotas applied
   - 10-second timeout prevents infinite loops

2. **Container Security**
   - Non-root user (`nobody`)
   - No privilege escalation
   - Read-only filesystem for code
   - Tmpfs for temporary execution

3. **Network Isolation**
   - Kernels have no external network access
   - Internal network only

4. **Input Validation**
   - SQL injection prevention (parameterized queries)
   - Command injection checks
   - File path sanitization

### Security Scope

**Suitable For**:
- Internal learning platforms
- Educational institutions
- Interview preparation systems
- Small team practice environments

**NOT Suitable For**:
- Public internet with anonymous users
- Production-critical workloads
- Untrusted code execution at scale

---

## Data Flow & State

### Execution State Persistence

**Location**: `/app/state` (Docker volume)

**Purpose**: Survive container restarts

**Contents**:
- Recent execution history
- Kernel pool state
- WebSocket subscription mappings

**Format**: JSON files per execution ID

### Sample Data Loading

**Trigger**: First startup when databases are empty

**Process**:
1. Check if data exists (count query)
2. If empty, load from `samples_dataset/`
3. PostgreSQL: Run migration scripts
4. Elasticsearch: Index JSON documents
5. Redis: Execute LOAD script

**Files**:
- `samples_dataset/schema.sql`: PostgreSQL schema
- `samples_dataset/seed.sql`: Sample rows
- `samples_dataset/tests.json`: ES test documents
- `samples_dataset/packages.json`: ES package documents

---

## Development Workflow

### Local Development

```bash
# Option 1: Docker (full stack)
docker-compose up --build

# Option 2: Local Go (no DB features)
cd backend
go run ./cmd/server

# Option 3: Dev mode with hot reload
docker-compose -f docker-compose.dev.yml up
```

### Adding New Content

**DSA Problem**:
1. Create directory: `problems/{category}/{name}/`
2. Add `problem.md`, `python_code.py`, `golang_code.go`
3. Follow `standards.md` format
4. Run `./scripts/validate-markdown.sh`
5. Submit PR

**System Design Topic**:
1. Create directory: `topics/system-design/{name}/`
2. Add `content.md` with sections
3. Include diagrams (ASCII or Mermaid)
4. Validate and submit

**Database Feature**:
1. Update handler in `backend/internal/handlers/`
2. Add API route in `main.go`
3. Update template in `frontend/templates/`
4. Test with local database

---

## HTMX Integration Strategy

### Why HTMX?

1. **No Build Step**: No npm, webpack, babel
2. **Server-Rendered**: SEO-friendly, fast initial load
3. **Progressive Enhancement**: Works without JS
4. **Small Payload**: ~14KB vs React's ~120KB+
5. **Simple Deployment**: Static files only

### HTMX Usage Patterns

**Pattern 1: Lazy Loading**
```html
<!-- Load problem tree on page render -->
<div hx-get="/htmx/problem-tree" 
     hx-trigger="load" 
     hx-target="#tree-container">
</div>
```

**Pattern 2: Form Submission**
```html
<!-- Execute code -->
<form hx-post="/htmx/execute" 
      hx-target="#output">
  <textarea name="code"></textarea>
  <button type="submit">Run</button>
</form>
```

**Pattern 3: Dynamic Updates**
```html
<!-- Poll for execution status -->
<div hx-get="/htmx/output/123" 
     hx-trigger="every 1s"
     hx-target="this">
  Executing...
</div>
```

---

## Environment Variables

### Server Configuration
```bash
PORT=8080                    # HTTP server port
STATE_DIR=/app/state         # Execution state directory
PYTHON_KERNEL_COUNT=3        # Python kernel pool size
GO_KERNEL_COUNT=2            # Go kernel pool size
KERNEL_MEMORY_LIMIT=256M     # Per-kernel memory limit
```

### Database Connections
```bash
# PostgreSQL
DB_HOST=dsalgo-postgres
DB_PORT=5432
DB_USER=dsalgo
DB_PASSWORD=dsalgo_secret
DB_NAME=order_management

# Elasticsearch
ES_URL=http://dsalgo-elasticsearch:9200
KIBANA_URL=http://dsalgo-kibana:5601

# Redis
REDIS_URL=redis://dsalgo-redis:6379
```

---

## Monitoring & Observability

### Metrics Available

**Via `/api/stats` endpoint**:
```json
{
  "python_pool": {
    "active": 2,
    "idle": 1,
    "total_executions": 1234
  },
  "go_pool": {
    "active": 1,
    "idle": 1,
    "total_executions": 567
  },
  "executions": {
    "running": 3,
    "completed": 1789,
    "failed": 12
  }
}
```

**Via `/api/sql/health`, `/api/redis/health`, `/api/elasticsearch/health`**:
- Connection status
- Response time
- Error rate

### Logging

**Format**: Structured JSON logs

**Levels**:
- INFO: Normal operations
- WARN: Degraded performance, retries
- ERROR: Failures, exceptions

**Log Locations**:
- Docker: `docker-compose logs -f app`
- Local: stdout

---

## Common Use Cases

### Interview Preparation Platform

**Setup**: Full docker-compose stack

**Features Used**:
- Code execution for practice
- System design topics for study
- SQL/Redis/ES for database rounds

**Customization**:
- Add company-specific problems
- Include interview tips in topics
- Track user progress (future feature)

### Educational Institution

**Setup**: On-premise or cloud deployment

**Features Used**:
- Structured problem categories
- Code validation
- Learning paths

**Customization**:
- Add course-specific content
- Integrate with LMS
- Assignment submission (future)

### Self-Learning

**Setup**: Local Docker or lightweight deployment

**Features Used**:
- Practice problems
- Reference implementations
- Design pattern examples

**Customization**:
- Personal problem set
- Custom notes in topics
- Bookmark problems (future)

---

## Key Design Decisions

### Why Go (not Node.js/Python)?

- **Performance**: 10x faster request handling
- **Memory**: 1/10th the baseline memory
- **Concurrency**: Goroutines are lightweight
- **Deployment**: Single binary, no runtime
- **Stability**: Type-safe, compiled language

### Why Persistent Kernels (not containers)?

- **Startup**: 100ms vs 2-3s per execution
- **Resource**: Reuse vs create/destroy
- **Cost**: 5 kernels vs 100+ containers
- **Complexity**: Process pool vs orchestration

### Why HTMX (not React/Vue)?

- **Size**: 14KB vs 120KB+ framework + deps
- **Complexity**: HTML attrs vs component trees
- **Server-side**: Leverage Go templates
- **SEO**: Fully server-rendered
- **Learning**: Minimal JS knowledge needed

### Why PostgreSQL + ES + Redis?

- **Educational**: Cover all database types
- **Practical**: Real-world tech stack
- **Complementary**: SQL + NoSQL + Search
- **Popular**: High industry adoption

---

## Future Roadmap

### Planned Features

1. **User System**
   - Authentication (OAuth)
   - Progress tracking
   - Solution submissions
   - Leaderboards

2. **Enhanced Learning**
   - Video tutorials
   - Interactive diagrams
   - Hints system
   - Solution discussions

3. **Collaboration**
   - Pair programming mode
   - Code review system
   - Discussion forums

4. **Advanced Features**
   - Custom test cases
   - Performance profiling
   - Code quality metrics
   - AI-powered hints

5. **Monitoring**
   - Prometheus metrics
   - Grafana dashboards
   - Alert system

### Scalability Considerations

**Current Limits**: 10-20 concurrent users

**Scale to 100+ users**:
- Horizontal pod scaling (Kubernetes)
- External kernel pool service
- Redis for session/state
- Load balancer

**Scale to 1000+ users**:
- Distributed kernel pools
- Queue-based execution
- CDN for static assets
- Database read replicas

---

## Troubleshooting Guide

### Kernels Not Starting

**Symptoms**: Execution timeouts, "pool exhausted" errors

**Diagnosis**:
```bash
docker-compose logs -f app | grep kernel
docker stats dsalgo-learn-app
```

**Fixes**:
- Increase memory limit in docker-compose.yml
- Reduce kernel pool sizes
- Check Python/Go installation in container

### Database Connection Failures

**Symptoms**: SQL/Redis/ES features unavailable

**Diagnosis**:
```bash
docker-compose ps  # Check service health
curl http://localhost:9200/_cluster/health
redis-cli -h localhost ping
```

**Fixes**:
- Wait for health checks (60s for ES)
- Check network connectivity
- Verify environment variables
- Restart services

### High Memory Usage

**Symptoms**: OOM kills, slow performance

**Diagnosis**:
```bash
docker stats
go tool pprof http://localhost:8080/debug/pprof/heap
```

**Fixes**:
- Reduce kernel pool sizes
- Lower per-kernel memory limits
- Implement aggressive idle cleanup
- Disable unused databases

---

## Contributing Context

### Code Style

**Go**: Standard gofmt, golangci-lint

**Markdown**: Follow standards.md

**Templates**: Semantic HTML5, HTMX attributes

### Testing Requirements

**Unit Tests**: Handler logic, kernel pool

**Integration Tests**: Database connections, execution flow

**Validation**: `./scripts/validate-markdown.sh`

### CI/CD Pipeline

**GitHub Actions** (`.github/workflows/`):
1. Markdown validation
2. Go tests
3. Docker build
4. Linting (golangci-lint)

---

## Quick Reference

### Important Files

| File | Purpose |
|------|----------|
| `backend/cmd/server/main.go` | Server entry, routing |
| `backend/internal/kernel/pool.go` | Kernel pool logic |
| `backend/internal/handlers/handlers.go` | Page handlers |
| `docker-compose.yml` | Full stack definition |
| `standards.md` | Content format rules |
| `README.md` | User documentation |
| `CONTRIBUTING.md` | Contribution guide |

### Key Commands

```bash
# Start platform
docker-compose up

# Run tests
go test ./...

# Validate content
./scripts/validate-markdown.sh

# Check logs
docker-compose logs -f app

# Database access
psql -h localhost -U dsalgo -d order_management
redis-cli -h localhost
curl http://localhost:9200/_cat/indices
```

---

## Conclusion

This platform combines:
- **Performance** (Go, persistent kernels)
- **Simplicity** (HTMX, server-rendered)
- **Practicality** (Real databases, 84+ problems)
- **Quality** (Validated content, standardized format)

Designed for fast iteration, easy contribution, and effective learning. Built with modern best practices while avoiding unnecessary complexity.

**Last Updated**: January 16, 2026
**Version**: 1.0.0
**Maintained By**: vaibhav-jain-dev
