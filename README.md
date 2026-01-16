# DSAlgo Learning Platform

A blazing-fast, lightweight platform for mastering Data Structures, Algorithms, System Design, and practical coding skills. Built with performance in mind, featuring instant code execution and an intuitive learning experience.

## 🚀 Why This Platform?

- **⚡ Lightning Fast**: Pre-warmed kernel pools execute code in milliseconds, not seconds
- **🎯 Focused Learning**: 84+ curated problems across 13+ categories with clear explanations
- **💡 Interactive**: Real-time code execution with immediate feedback
- **🪶 Lightweight**: HTMX-powered UI - no bloated JavaScript frameworks, runs smoothly on 2GB RAM
- **🔧 Practical**: SQL, Redis, and Elasticsearch playgrounds for hands-on database learning
- **📊 System Design**: Comprehensive topics with diagrams and real-world examples
- **🎨 Design Patterns**: Learn proven software design solutions with working examples

## 📚 What You'll Learn

### Data Structures & Algorithms
- **Arrays & Strings**: Manipulation, sliding window, two pointers
- **Linked Lists**: Traversal, reversal, cycle detection
- **Trees & Graphs**: DFS, BFS, shortest paths, spanning trees
- **Dynamic Programming**: Memoization, tabulation, optimization
- **Sorting & Searching**: Binary search, quicksort, merge sort variations
- **Heaps & Priority Queues**: Min/max heaps, k-way merge
- **Hash Tables**: Collision resolution, consistent hashing
- **Stacks & Queues**: Monotonic stacks, circular queues
- **Bit Manipulation**: XOR tricks, bit masking
- **Backtracking**: Permutations, combinations, constraint satisfaction

### Database Technologies
- **SQL**: Query optimization, indexing strategies, ACID properties
- **Redis**: Caching patterns, data structures, pub/sub
- **Elasticsearch**: Full-text search, aggregations, analyzers

### System Design
- Load balancing, caching strategies, database sharding
- Microservices architecture, message queues
- Rate limiting, API design, scalability patterns

### Design Patterns
- Creational, Structural, and Behavioral patterns
- Real-world applications and use cases

## 🛠️ Technology Stack

| Component | Technology | Why? |
|-----------|------------|------|
| **Backend** | Go + Fiber | Ultra-fast, minimal memory footprint |
| **Frontend** | HTMX + Server-rendered HTML | Instant page loads, no JS framework overhead |
| **Code Execution** | Persistent kernel pools | Sub-100ms execution time |
| **Containerization** | Docker | Easy deployment, isolated environment |
| **Databases** | PostgreSQL, Redis, Elasticsearch | Cover SQL, NoSQL, and search use cases |

## 🎯 Quick Start

### Prerequisites
- Docker & Docker Compose (recommended)
- OR Go 1.21+ and Python 3.11+ for local development

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/vaibhav-jain-dev/learning-algo.git
cd learning-algo

# Start all services (app + databases)
docker-compose up --build

# Access the platform
open http://localhost:8080
```

**Services started:**
- Main app: http://localhost:8080
- PostgreSQL: localhost:5432
- Redis: localhost:6379
- Elasticsearch: localhost:9200

### Option 2: Local Development

```bash
# Install dependencies
go mod download
pip install jupyter ipykernel

# Start the backend
cd backend
go run ./cmd/server

# Access at http://localhost:8080
```

**Note**: Database features (SQL/Redis/Elasticsearch) require those services to be running separately.

### Option 3: Development Mode with Hot Reload

```bash
# Use the development Dockerfile with live reload
docker-compose -f docker-compose.dev.yml up
```

## 📖 How to Use

### 1. Practice Data Structures & Algorithms

1. Navigate to **Practice** from the home page
2. Browse problems by category in the left sidebar
3. Read the problem statement and constraints
4. Write your solution in Python or Go
5. Click **Run** to execute and see results instantly
6. Review output, errors, and execution metrics

**Pro Tip**: Use the keyboard shortcut `Cmd/Ctrl + Enter` to execute code quickly.

### 2. Learn SQL Interactively

1. Go to **SQL** from the navigation
2. Explore pre-loaded sample data (e-commerce database)
3. Write SQL queries in the editor
4. Execute and see results in a formatted table
5. Check query execution stats and performance
6. View ER diagrams to understand table relationships

**Sample Query**:
```sql
SELECT c.name, COUNT(o.id) as order_count, SUM(o.total_amount) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
ORDER BY total_spent DESC
LIMIT 10;
```

### 3. Experiment with Redis

1. Navigate to **Redis** section
2. Try different Redis commands and data structures
3. Explore caching patterns and use cases
4. Learn about strings, lists, sets, hashes, sorted sets
5. Practice pub/sub messaging

**Example Commands**:
```redis
SET user:1000:name "John Doe"
GET user:1000:name
LPUSH notifications "New message"
LRANGE notifications 0 -1
ZADD leaderboard 1500 "player1" 2000 "player2"
ZRANGE leaderboard 0 -1 WITHSCORES
```

### 4. Master Elasticsearch

1. Go to **Elasticsearch** section
2. Work with pre-indexed documents (products, tests)
3. Write search queries and aggregations
4. Analyze results and relevance scores
5. Understand analyzers and mappings

**Example Search**:
```json
{
  "query": {
    "multi_match": {
      "query": "python testing",
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

### 5. Study System Design & Patterns

1. Browse **System Design** or **Design Patterns**
2. Read detailed explanations with diagrams
3. Understand real-world applications
4. Learn trade-offs and best practices

## 📝 Code Execution Requirements

The platform uses **persistent kernel pools** for blazing-fast code execution. Follow these simple rules:

### Python Requirements

✅ **DO**: Define a `main()` function that returns the result

```python
def main():
    # Your solution here
    result = solve_problem()
    return result

def solve_problem():
    # Helper functions are fine
    return [1, 2, 3]
```

❌ **DON'T**: Write code without a main function

```python
# This won't work
result = [1, 2, 3]
print(result)
```

**Supported Return Types**:
- Primitives: `int`, `float`, `str`, `bool`, `None`
- Collections: `list`, `tuple`, `dict`, `set`
- Nested structures: `list[dict]`, `dict[str, list]`, etc.

### Go Requirements

✅ **DO**: Use `package main` with a `main()` function

```go
package main

import "fmt"

func main() {
    result := []int{1, 2, 3}
    fmt.Println(result)
}
```

❌ **DON'T**: Forget the package declaration

```go
// This won't compile
func main() {
    fmt.Println("Hello")
}
```

**Output Capturing**: The platform captures `stdout`, so use `fmt.Println()` or similar.

## 🗂️ Project Structure

```
learning-algo/
├── backend/
│   ├── cmd/
│   │   └── server/              # Main application entry point
│   │       └── main.go          # Server setup, routing, middleware
│   ├── internal/
│   │   ├── handlers/            # HTTP request handlers
│   │   │   ├── practice.go      # DSA problem handlers
│   │   │   ├── sql.go          # SQL execution handlers
│   │   │   ├── redis.go        # Redis command handlers
│   │   │   └── elasticsearch.go # ES query handlers
│   │   ├── kernel/              # Code execution engine
│   │   │   ├── pool.go         # Kernel pool management
│   │   │   ├── python.go       # Python execution
│   │   │   └── golang.go       # Go execution
│   │   ├── models/              # Data models
│   │   ├── db/                 # PostgreSQL integration
│   │   ├── redis/              # Redis client wrapper
│   │   └── elasticsearch/      # Elasticsearch client wrapper
│   └── db/
│       └── migrations/          # Database schema migrations
├── frontend/
│   ├── templates/               # Go HTML templates
│   │   ├── layouts/            # Base layouts
│   │   ├── pages/              # Full page templates
│   │   └── partials/           # HTMX partial templates
│   └── static/
│       └── css/                # Stylesheets
├── problems/                    # 84+ DSA problems (markdown)
│   ├── arrays/                 # Array problems
│   ├── graphs/                 # Graph problems
│   ├── trees/                  # Tree problems
│   ├── dynamic-programming/    # DP problems
│   └── .../                    # Other categories
├── topics/                      # Learning topics
│   ├── system-design/          # System design articles
│   ├── design-patterns/        # Design pattern guides
│   ├── machine-coding/         # Machine coding problems
│   ├── sql-learning/           # SQL deep dives
│   ├── redis-learning/         # Redis tutorials (if exists)
│   └── es-learning/            # ES tutorials (if exists)
├── samples_dataset/             # Sample data for databases
│   ├── schema.sql              # PostgreSQL schema
│   ├── seed.sql                # Sample SQL data
│   ├── tests.json              # Elasticsearch test data
│   └── packages.json           # Elasticsearch package data
├── scripts/
│   └── validate-markdown.sh    # Content validation script
├── .github/workflows/           # CI/CD pipelines
│   └── validate.yml            # Automated content validation
├── standards.md                 # Content formatting standards
├── Dockerfile                   # Production Docker image
├── Dockerfile.dev              # Development Docker image
├── docker-compose.yml          # Production compose config
└── README.md                   # This file
```

## 📏 Content Standards

All problems and topics follow a **strict markdown format** validated by GitHub Actions. This ensures consistency and quality.

### Problem Format

Every DSA problem must include:

```markdown
# Problem Title

## Description
Clear problem statement with examples

## Constraints
- Input constraints
- Time/space complexity expectations

## Examples

### Example 1
**Input**: `[1, 2, 3]`
**Output**: `6`
**Explanation**: Sum of array elements

## Approach
Explanation of the solution approach

## Complexity
- **Time**: O(n)
- **Space**: O(1)
```

### Topic Format

System design and learning topics must include:

```markdown
# Topic Title

## Overview
High-level introduction

## Key Concepts
Core ideas and terminology

## Deep Dive
Detailed explanation with examples

## Real-World Applications
Practical use cases

## Best Practices
Recommendations and patterns

## Common Pitfalls
What to avoid
```

See [standards.md](standards.md) for complete formatting guidelines.

### Validating Content

```bash
# Run validation locally
./scripts/validate-markdown.sh

# Validation runs automatically on:
# - Pull requests
# - Commits to main/master
```

## ⚙️ Configuration

### Environment Variables

```bash
# Server
PORT=8080                        # Server port (default: 8080)
STATE_DIR=/tmp/dsalgo-state     # Execution state persistence

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=dsalgo
DB_SSLMODE=disable

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# Elasticsearch
ES_HOST=http://localhost:9200
ES_USERNAME=
ES_PASSWORD=
```

### Resource Limits

| Resource | Limit | Purpose |
|----------|-------|--------|
| **Total Memory** | 2 GB | Entire application |
| **Python Kernels** | 3 × 256MB | Concurrent Python executions |
| **Go Kernels** | 2 × 256MB | Concurrent Go executions |
| **Execution Timeout** | 10 seconds | Prevent infinite loops |
| **Idle Kernel Timeout** | 5 minutes | Automatic cleanup |
| **CPU Cores** | 2 | Parallel execution |

**Memory Breakdown**:
- Main server: ~200MB
- Python kernels: 768MB (3 × 256MB)
- Go kernels: 512MB (2 × 256MB)
- Databases: Depends on external services
- Buffer: ~500MB

## 🔗 API Reference

### Page Routes (Browser)

| Route | Description |
|-------|-------------|
| `GET /` | Home page with platform overview |
| `GET /practice` | Interactive code editor for DSA |
| `GET /sql` | SQL playground with sample data |
| `GET /redis` | Redis command executor |
| `GET /elasticsearch` | Elasticsearch query interface |
| `GET /system-design` | System design topics |
| `GET /design-patterns` | Design pattern guides |
| `GET /machine-coding` | Machine coding challenges |
| `GET /golang` | Go language tutorials |
| `GET /python-asyncio` | Python async programming |

### API Endpoints (JSON)

#### Code Execution

```bash
# List all problems
GET /api/problems

# Get specific problem
GET /api/problem/arrays/two-sum.md

# Execute code
POST /api/run
Content-Type: application/json
{
  "code": "def main(): return [1,2,3]",
  "language": "python"
}

# Get execution status
GET /api/execution/:id

# Stop running execution
POST /api/execution/:id/stop

# Server statistics
GET /api/stats
```

#### SQL Operations

```bash
# Execute SQL query
POST /api/sql/execute
{ "query": "SELECT * FROM customers LIMIT 10" }

# Get database schema
GET /api/sql/schema

# Get table statistics
GET /api/sql/stats

# Reset database to initial state
POST /api/sql/reset

# Health check
GET /api/sql/health

# Get ER diagram
GET /api/sql/er-diagram
```

#### Redis Operations

```bash
# Execute Redis command
POST /api/redis/execute
{ "command": "GET user:1000" }

# List all keys
GET /api/redis/keys?pattern=*

# Get server info
GET /api/redis/info

# Health check
GET /api/redis/health

# Reset data
POST /api/redis/reset

# Load sample data
POST /api/redis/load-sample
```

#### Elasticsearch Operations

```bash
# Execute search query
POST /api/elasticsearch/execute
{ "index": "tests", "query": {...} }

# Simple search
POST /api/elasticsearch/search
{ "index": "tests", "q": "python" }

# Get cluster stats
GET /api/elasticsearch/stats

# Get index mapping
GET /api/elasticsearch/mapping/tests

# Get all mappings
GET /api/elasticsearch/mappings

# Analyze text
POST /api/elasticsearch/analyze
{ "text": "Quick brown fox", "analyzer": "standard" }

# Explain query
POST /api/elasticsearch/explain
{ "index": "tests", "id": "1", "query": {...} }

# Health check
GET /api/elasticsearch/health

# Reset indices
POST /api/elasticsearch/reset
```

### WebSocket (Real-time Updates)

```javascript
// Connect to WebSocket
const ws = new WebSocket('ws://localhost:8080/ws/execute');

// Execute code with real-time updates
ws.send(JSON.stringify({
  action: 'execute',
  code: 'def main(): return sum(range(100))',
  language: 'python'
}));

// Receive updates
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data.type, data.output);
};

// Stop execution
ws.send(JSON.stringify({
  action: 'stop',
  id: 'execution-id'
}));
```

## 🔒 Security Considerations

This platform is designed for **internal or semi-trusted environments**:

✅ **Implemented Protections**:
- Execution timeouts (10 seconds)
- Memory limits per kernel (256MB)
- CPU quotas (2 cores shared)
- Non-root container user
- No privilege escalation
- Isolated kernel processes
- State cleanup after idle timeout

⚠️ **Not Suitable For**:
- Anonymous public internet access
- Untrusted user code execution
- Production-critical workloads
- Environments requiring complete sandboxing

**Recommended Use Cases**:
- Internal learning platforms
- Interview preparation systems
- Educational institutions
- Small team practice environments

## 🧪 Testing

```bash
# Run backend tests
cd backend
go test ./... -v

# Run with coverage
go test ./... -cover -coverprofile=coverage.out
go tool cover -html=coverage.out

# Validate content format
./scripts/validate-markdown.sh

# Test code execution
curl -X POST http://localhost:8080/api/run \
  -H "Content-Type: application/json" \
  -d '{"code":"def main(): return 42","language":"python"}'
```

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

### Adding Problems

1. Fork the repository
2. Create a new problem file in `problems/<category>/`
3. Follow the format in [standards.md](standards.md)
4. Run validation: `./scripts/validate-markdown.sh`
5. Submit a pull request

### Adding Topics

1. Create a new markdown file in `topics/<category>/`
2. Include clear explanations, examples, and diagrams
3. Follow the topic format guidelines
4. Validate and submit PR

### Code Contributions

1. Fork and create a feature branch
2. Write clean, documented code
3. Add tests for new features
4. Ensure all tests pass
5. Submit PR with clear description

### Content Quality Standards

- Clear, concise explanations
- Working code examples
- Proper markdown formatting
- No spelling/grammar errors
- Accurate complexity analysis

## 🐛 Troubleshooting

### Kernels Not Starting

**Symptom**: Code execution hangs or times out

**Solutions**:
```bash
# Check if kernels are running
docker-compose ps

# View logs
docker-compose logs -f app

# Restart services
docker-compose restart
```

### Database Connection Failed

**Symptom**: SQL features unavailable

**Solutions**:
```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Test connection
docker-compose exec postgres psql -U postgres -d dsalgo -c "SELECT 1;"

# Check environment variables
echo $DB_HOST $DB_PORT
```

### Out of Memory

**Symptom**: Containers crashing or slow performance

**Solutions**:
```bash
# Check Docker memory allocation
docker stats

# Increase Docker memory (Docker Desktop)
# Settings → Resources → Memory → 4GB+

# Reduce kernel pool sizes in main.go
# pythonPool := kernel.NewPythonPool(2, 128*1024*1024, idleTimeout)
```

### Port Already in Use

**Symptom**: Cannot start server

**Solutions**:
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or change port
export PORT=3000
go run ./cmd/server
```

## 📊 Performance Benchmarks

| Metric | Value | Notes |
|--------|-------|-------|
| **Code Execution** | <100ms | With warm kernels |
| **First Execution** | 1-2s | Kernel warm-up time |
| **Page Load** | <50ms | HTMX partial updates |
| **Memory Usage** | ~1.5GB | All kernels active |
| **Concurrent Users** | 10-20 | With 2GB RAM limit |
| **SQL Query** | <10ms | Simple SELECT queries |
| **ES Search** | <50ms | Full-text search |

## 🎓 Learning Path Recommendation

### Beginners (0-6 months coding)
1. Start with **Arrays & Strings** problems
2. Practice **SQL** basics
3. Learn **Design Patterns** fundamentals
4. Try simple **System Design** topics

### Intermediate (6-18 months)
1. Master **Trees & Graphs**
2. Dive into **Dynamic Programming**
3. Explore **Redis** caching patterns
4. Study **Elasticsearch** search techniques
5. Advanced **System Design** topics

### Advanced (18+ months)
1. Complex **Graph Algorithms**
2. Advanced **DP** optimization
3. **Machine Coding** challenges
4. Design **Scalable Systems**
5. Contribute to platform development

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Fiber](https://gofiber.io/) - Express-inspired Go web framework
- UI powered by [HTMX](https://htmx.org/) - High-power tools for HTML
- Code execution via [Jupyter Kernel](https://jupyter.org/) - Interactive computing
- Styled with [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/vaibhav-jain-dev/learning-algo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/vaibhav-jain-dev/learning-algo/discussions)
- **Email**: [Create an issue](https://github.com/vaibhav-jain-dev/learning-algo/issues/new)

---

**Happy Learning! 🚀**

*Built with ❤️ for developers who want to master algorithms and system design*