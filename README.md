# DSAlgo Learning Platform

A high-performance learning platform for Data Structures, Algorithms, System Design, and practical coding skills. Built with Go/Fiber backend and HTMX-powered frontend.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              BROWSER                                     │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  HTMX + Server-Rendered HTML (No heavy JS frameworks)           │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         GO + FIBER BACKEND                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│  │   Handlers   │  │   Kernel     │  │   Topics     │                  │
│  │  (HTTP/WS)   │  │   Pools      │  │   Indexer    │                  │
│  └──────────────┘  └──────────────┘  └──────────────┘                  │
│         │                 │                 │                           │
│         ▼                 ▼                 ▼                           │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │              Go HTML Templates (layouts + pages + partials)       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   PostgreSQL     │  │     Redis        │  │  Elasticsearch   │
│   (SQL lessons)  │  │   (Caching)      │  │   (Search)       │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

## Project Structure

```
learning-algo/
├── backend/
│   ├── cmd/server/
│   │   └── main.go                 # Application entry, routes registration
│   └── internal/
│       ├── handlers/
│       │   └── handlers.go         # HTTP handlers for all routes
│       ├── kernel/                 # Code execution engine (Python/Go)
│       ├── topics/                 # Topic content indexing
│       ├── db/                     # PostgreSQL integration
│       ├── redis/                  # Redis client
│       └── elasticsearch/          # ES client
│
├── frontend/
│   ├── templates/
│   │   ├── layouts/
│   │   │   └── main.html           # Base layout with nav, footer
│   │   ├── pages/                  # Full page templates
│   │   │   ├── home.html
│   │   │   ├── practice.html
│   │   │   ├── interview-questions/  # System design topic pages
│   │   │   │   ├── url-shortener.html
│   │   │   │   ├── food-ordering.html
│   │   │   │   └── ...
│   │   │   └── ...
│   │   └── partials/               # HTMX partial templates
│   └── static/
│       └── css/
│           ├── styles.css          # Global styles
│           ├── clean-ui.css        # UI components
│           ├── interview-questions.css  # System design pages styling
│           └── ...
│
├── problems/                       # DSA problems (markdown)
│   ├── arrays/
│   ├── graphs/
│   └── ...
│
├── topics/                         # Learning content (markdown)
│   ├── system-design/
│   ├── design-patterns/
│   └── ...
│
├── docker-compose.yml              # Production setup
├── Dockerfile                      # Production image
└── Dockerfile.dev                  # Development with hot reload
```

## Quick Start

### Using Docker (Recommended)

```bash
# Start all services
docker-compose up --build

# Access at http://localhost:8080
```

### Local Development

```bash
# Install Go dependencies
go mod download

# Run the server
cd backend && go run ./cmd/server

# Access at http://localhost:8080
```

## How to Add New Pages

### Step 1: Create the HTML Template

Create a new HTML file in `frontend/templates/pages/`:

```html
<!-- frontend/templates/pages/my-new-page.html -->
<link rel="stylesheet" href="/static/css/my-styles.css">

<div class="page-container">
    <h1>My New Page</h1>
    <p>Content goes here...</p>
</div>
```

**For nested pages** (like interview questions topics):

```html
<!-- frontend/templates/pages/interview-questions/new-topic.html -->
<link rel="stylesheet" href="/static/css/interview-questions.css">

<div class="interview-topic-layout">
    <a href="/interview-question" class="back-to-dashboard">← Back to All Topics</a>

    <h1>New System Design Topic</h1>

    <!-- Your content sections -->
    <div class="stage-section" id="section-1">
        <h2>Section 1</h2>
        <!-- Content -->
    </div>
</div>
```

### Step 2: Add Handler Function

Add a handler in `backend/internal/handlers/handlers.go`:

```go
// MyNewPage renders the new page
func (h *Handlers) MyNewPage(c *fiber.Ctx) error {
    return c.Render("pages/my-new-page", fiber.Map{
        "Title": "My New Page Title",
    })
}
```

**For dynamic topic pages** (like interview questions):

```go
func (h *Handlers) InterviewQuestionTopic(c *fiber.Ctx) error {
    topic := c.Params("topic")

    // Map topics to display names
    topicNames := map[string]string{
        "url-shortener":  "URL Shortener System Design",
        "food-ordering":  "Food Ordering System Design",
        "new-topic":      "New Topic System Design",  // Add your topic here
        // ...
    }

    title, exists := topicNames[topic]
    if !exists {
        return c.Status(404).SendString("Topic not found")
    }

    return c.Render("pages/interview-questions/"+topic, fiber.Map{
        "Title": title,
        "Topic": topic,
    })
}
```

### Step 3: Register the Route

Add the route in `backend/cmd/server/main.go`:

```go
// In the routes section:
app.Get("/my-new-page", h.MyNewPage)

// For parameterized routes:
app.Get("/interview-question/:topic", h.InterviewQuestionTopic)
```

### Step 4: Add CSS (if needed)

Create or update CSS in `frontend/static/css/`:

```css
/* frontend/static/css/my-styles.css */
.page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
}
```

### Step 5: Add Navigation Link (optional)

Update the navigation in `frontend/templates/layouts/main.html` or the relevant dashboard.

## Adding Interview Question Topics

The interview questions section follows a specific pattern:

### 1. Create Topic HTML

```bash
frontend/templates/pages/interview-questions/your-topic.html
```

Use the existing topics as templates. Key sections include:
- **Stage sections** (MVP, PAN-India, High Traffic, Global)
- **Requirements** (Functional, Non-Functional)
- **Architecture diagrams**
- **API endpoints**
- **Database schema**
- **CAP theorem analysis**

### 2. Register in Handler

Edit `backend/internal/handlers/handlers.go`:

```go
topicNames := map[string]string{
    "url-shortener":  "URL Shortener System Design",
    "your-topic":     "Your Topic System Design",  // Add here
}
```

### 3. Add to Dashboard

Edit `frontend/templates/pages/interview-questions-dashboard.html`:

```html
<a href="/interview-question/your-topic" class="topic-card">
    <span class="topic-icon">🎯</span>
    <h3>Your Topic</h3>
    <p>Brief description</p>
</a>
```

## CSS Architecture

| File | Purpose |
|------|---------|
| `styles.css` | Global styles, typography, base components |
| `clean-ui.css` | Reusable UI components (cards, buttons) |
| `interview-questions.css` | System design pages styling |
| `diagrams.css` | Architecture diagram styles |
| `animations.css` | Transitions and animations |
| `responsive-enhancements.css` | Mobile responsiveness |

### Key CSS Classes for Interview Questions

```css
/* Layout */
.interview-topic-layout    /* Main page wrapper */
.stage-section            /* MVP/Scale sections */
.feature-card             /* Content cards */
.diagram-container        /* For diagrams */

/* Components */
.alternatives-grid        /* Technology comparison grids */
.api-endpoint            /* API documentation blocks */
.code-example            /* Code snippets */

/* Styling */
.stage-badge             /* MVP, PAN-India badges */
.info-term               /* Terms linking to glossary */
```

## Template Engine

The project uses Go's `html/template` with Fiber's template rendering:

```go
// Render a full page (uses main.html layout automatically)
c.Render("pages/my-page", fiber.Map{
    "Title": "Page Title",
    "Data":  someData,
})

// Render a partial (no layout, for HTMX)
c.Render("partials/my-partial", fiber.Map{
    "Items": items,
}, "")  // Empty string = no layout
```

### Template Variables

```html
<!-- Access passed variables -->
<h1>{{.Title}}</h1>

<!-- Conditionals -->
{{if .ShowSection}}
    <div>Content</div>
{{end}}

<!-- Loops -->
{{range .Items}}
    <li>{{.Name}}</li>
{{end}}

<!-- Raw HTML (be careful with XSS) -->
{{.HTMLContent | safeHTML}}
```

## API Routes Reference

### Page Routes

| Route | Handler | Template |
|-------|---------|----------|
| `/` | `Home` | `pages/home.html` |
| `/practice` | `Practice` | `pages/practice.html` |
| `/interview-question` | `InterviewQuestions` | `pages/interview-questions-dashboard.html` |
| `/interview-question/:topic` | `InterviewQuestionTopic` | `pages/interview-questions/{topic}.html` |
| `/sql` | `SQL` | `pages/sql-unified.html` |
| `/redis` | `Redis` | `pages/redis-unified.html` |
| `/elasticsearch` | `Elasticsearch` | `pages/elasticsearch-unified.html` |
| `/system-design` | `SystemDesign` | `pages/system-design.html` |

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/run` | POST | Execute code |
| `/api/problems` | GET | List all problems |
| `/api/sql/execute` | POST | Execute SQL query |
| `/api/redis/execute` | POST | Execute Redis command |
| `/api/elasticsearch/execute` | POST | Execute ES query |

## Development Workflow

### Hot Reload (Development)

```bash
# Using Air for hot reload
docker-compose -f docker-compose.dev.yml up
```

### Adding Features

1. **Create branch**: `git checkout -b feature/my-feature`
2. **Make changes**: Templates, handlers, routes
3. **Test locally**: `docker-compose up`
4. **Commit**: Follow conventional commits
5. **Push & PR**: Create pull request

### Code Execution Requirements

**Python**: Must have a `main()` function that returns the result
```python
def main():
    return solve_problem()
```

**Go**: Standard `package main` with `main()` function
```go
package main

func main() {
    fmt.Println(result)
}
```

## Environment Variables

```bash
# Server
PORT=8080
BASE_URL=http://localhost:8080

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=dsalgo

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Elasticsearch
ES_HOST=http://localhost:9200
```

## Troubleshooting

### Page Not Found (404)

1. Check route is registered in `main.go`
2. Verify handler exists in `handlers.go`
3. Confirm template file exists at correct path

### Styles Not Loading

1. Check CSS link path in template
2. Verify CSS file exists in `frontend/static/css/`
3. Clear browser cache

### Template Errors

1. Check Go template syntax
2. Verify all variables are passed from handler
3. Check for unclosed tags

## License

MIT License
