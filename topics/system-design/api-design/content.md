# API Design

## Overview

API Design is the process of creating interfaces that allow different software systems to communicate with each other. A well-designed API is intuitive, consistent, and enables developers to build reliable integrations quickly. Poor API design leads to confused developers, integration bugs, and mounting technical debt that haunts you for years.

## Why This Matters (Real-World Context)

### Why Do Companies Need This?

APIs are the contracts between systems. Once published, they become dependencies that hundreds or thousands of external developers rely on. Breaking changes destroy trust and can cost millions in lost partnerships.

**Real Example: Stripe's API Success**

Stripe became a $95 billion company largely because of their API design. They invested heavily in:
- Consistent naming conventions across all endpoints
- Comprehensive error messages with actionable solutions
- Idempotency keys to handle network failures safely
- Versioning that lets old integrations work for years

Compare this to early payment APIs that required developers to parse cryptic error codes and had no retry safety, leading to double-charges and support nightmares.

### What Problems Does It Solve?

- **Integration Speed**: Good APIs reduce integration time from weeks to hours
- **Developer Experience**: Clear APIs reduce support tickets by 80%+
- **System Reliability**: Idempotent APIs prevent duplicate operations during retries
- **Evolution**: Versioned APIs let you improve without breaking existing users
- **Security**: Well-designed auth flows prevent common vulnerabilities

## Core Concepts

### The Restaurant Menu Analogy

Imagine you're at a restaurant. A good menu (like a good API) has:

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <div style="display: flex; flex-wrap: wrap; gap: 24px; justify-content: center;">
    <div style="flex: 1; min-width: 280px; background: #fee2e2; border-radius: 8px; padding: 16px; border-left: 4px solid #ef4444;">
      <h4 style="color: #b91c1c; margin: 0 0 12px 0;">Bad Menu (Bad API)</h4>
      <div style="color: #1e293b; font-size: 14px;">
        <div>Item #47 - $12.99</div>
        <div>Item #48 - $14.99</div>
        <div style="font-style: italic; color: #64748b;">(Ask server for details)</div>
        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #fca5a5; color: #991b1b; font-size: 12px;">
          Note: Prices may change<br>
          Note: Some items unavailable Tuesdays<br>
          Note: See other menu for drinks
        </div>
      </div>
    </div>
    <div style="flex: 1; min-width: 280px; background: #dcfce7; border-radius: 8px; padding: 16px; border-left: 4px solid #22c55e;">
      <h4 style="color: #15803d; margin: 0 0 12px 0;">Good Menu (Good API)</h4>
      <div style="color: #1e293b; font-size: 14px;">
        <div style="font-weight: 600; color: #1e40af;">APPETIZERS</div>
        <div>Soup of the Day <span style="color: #15803d;">(V)(GF)</span> ... $8.99</div>
        <div style="color: #64748b; font-size: 12px; margin-left: 8px;">Today: Tomato basil with crusty bread</div>
        <div style="font-weight: 600; color: #1e40af; margin-top: 8px;">MAINS</div>
        <div>Grilled Salmon <span style="color: #15803d;">(GF)</span> ... $24.99</div>
        <div style="color: #64748b; font-size: 12px; margin-left: 8px;">Atlantic salmon, lemon butter, vegetables</div>
        <div style="color: #991b1b; font-size: 11px; margin-left: 8px;">Allergens: Fish, Dairy</div>
      </div>
    </div>
  </div>
</div>

### Mapping Menu to API

| Restaurant Menu | API Design | Why It Matters |
|----------------|------------|----------------|
| Categories (Appetizers, Mains) | Resource grouping | Organization and discoverability |
| Item names | Endpoint names | Developers can guess what things do |
| Descriptions | Documentation | Understanding without trial and error |
| Prices | Response schemas | Know what you'll get back |
| Allergen info | Error codes | Debug problems quickly |
| Symbols (V, GF) | Query parameters | Filter and customize requests |

### REST Principles (Like a 12-Year-Old Would Understand)

Think of REST like a library:

1. **Resources are books**: Each URL is like a book's catalog number (`/books/978-0-13-468599-1`)
2. **HTTP methods are actions**: GET = read the book, POST = donate a new book, PUT = replace a book, DELETE = remove a book
3. **Stateless means no memory**: The librarian doesn't remember you, so bring your library card (auth token) every time
4. **Consistent format**: Every book is cataloged the same way, so you always know where to find the author's name

## How It Works

### API Request Flow

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin: 0 0 20px 0; text-align: center;">API Request Lifecycle</h4>
  <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px;">
    <div style="background: #dbeafe; padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="color: #1e40af; font-weight: 600;">Client</div>
      <div style="color: #64748b; font-size: 11px;">Mobile/Web</div>
    </div>
    <div style="color: #1e40af; font-weight: bold;">-></div>
    <div style="background: #fef3c7; padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="color: #92400e; font-weight: 600;">Auth</div>
      <div style="color: #64748b; font-size: 11px;">Validate token</div>
    </div>
    <div style="color: #1e40af; font-weight: bold;">-></div>
    <div style="background: #f3e8ff; padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="color: #7c3aed; font-weight: 600;">Rate Limit</div>
      <div style="color: #64748b; font-size: 11px;">Check quota</div>
    </div>
    <div style="color: #1e40af; font-weight: bold;">-></div>
    <div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="color: #15803d; font-weight: 600;">Validate</div>
      <div style="color: #64748b; font-size: 11px;">Check input</div>
    </div>
    <div style="color: #1e40af; font-weight: bold;">-></div>
    <div style="background: #dbeafe; padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="color: #1e40af; font-weight: 600;">Process</div>
      <div style="color: #64748b; font-size: 11px;">Business logic</div>
    </div>
    <div style="color: #1e40af; font-weight: bold;">-></div>
    <div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="color: #15803d; font-weight: 600;">Response</div>
      <div style="color: #64748b; font-size: 11px;">JSON + status</div>
    </div>
  </div>
</div>

### Versioning Strategies

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin: 0 0 16px 0;">API Versioning Approaches</h4>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <div style="flex: 1; min-width: 200px; background: #dcfce7; padding: 16px; border-radius: 8px;">
      <div style="color: #15803d; font-weight: 600; margin-bottom: 8px;">URL Path (Recommended)</div>
      <code style="background: #166534; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">/v1/users/123</code>
      <div style="color: #1e293b; font-size: 12px; margin-top: 8px;">Explicit, cacheable, easy to route</div>
    </div>
    <div style="flex: 1; min-width: 200px; background: #fef3c7; padding: 16px; border-radius: 8px;">
      <div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Header Versioning</div>
      <code style="background: #92400e; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Accept: application/vnd.api.v2+json</code>
      <div style="color: #1e293b; font-size: 12px; margin-top: 8px;">Clean URLs, harder to test</div>
    </div>
    <div style="flex: 1; min-width: 200px; background: #fee2e2; padding: 16px; border-radius: 8px;">
      <div style="color: #b91c1c; font-weight: 600; margin-bottom: 8px;">Query Parameter</div>
      <code style="background: #b91c1c; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">/users/123?version=2</code>
      <div style="color: #1e293b; font-size: 12px; margin-top: 8px;">Easy to forget, caching issues</div>
    </div>
  </div>
</div>

### Pagination Comparison

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin: 0 0 16px 0;">Pagination Strategies</h4>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr style="background: #e2e8f0;">
      <th style="padding: 12px; text-align: left; color: #1e293b;">Approach</th>
      <th style="padding: 12px; text-align: left; color: #1e293b;">Performance</th>
      <th style="padding: 12px; text-align: left; color: #1e293b;">Consistency</th>
      <th style="padding: 12px; text-align: left; color: #1e293b;">Best For</th>
    </tr>
    <tr style="background: #f8fafc;">
      <td style="padding: 12px; color: #1e293b;"><strong>Offset</strong><br><code>?offset=20&limit=10</code></td>
      <td style="padding: 12px; color: #b91c1c;">O(n) - slow at high offsets</td>
      <td style="padding: 12px; color: #b91c1c;">Poor - page drift</td>
      <td style="padding: 12px; color: #1e293b;">Small datasets, admin UIs</td>
    </tr>
    <tr style="background: #ffffff;">
      <td style="padding: 12px; color: #1e293b;"><strong>Cursor</strong><br><code>?cursor=eyJpZCI6MTAwfQ</code></td>
      <td style="padding: 12px; color: #15803d;">O(1) - constant time</td>
      <td style="padding: 12px; color: #15803d;">Good - stable results</td>
      <td style="padding: 12px; color: #1e293b;">Large datasets, feeds</td>
    </tr>
    <tr style="background: #f8fafc;">
      <td style="padding: 12px; color: #1e293b;"><strong>Keyset</strong><br><code>?after_id=100&after_date=2024-01</code></td>
      <td style="padding: 12px; color: #15803d;">O(1) - uses indexes</td>
      <td style="padding: 12px; color: #15803d;">Excellent - no drift</td>
      <td style="padding: 12px; color: #1e293b;">Real-time feeds, timelines</td>
    </tr>
  </table>
</div>

## Real-Life Failure Story

### Twitter's API Rate Limit Disaster (2012)

**What Happened:**
Twitter changed their API rate limits and authentication requirements with only 6 weeks notice. Third-party Twitter clients that millions of people used suddenly stopped working or were severely limited.

**Root Cause:**
- No versioning strategy - changes applied to all users immediately
- Rate limits changed from per-user to per-app, breaking apps with many users
- Required OAuth for endpoints that previously allowed anonymous access
- Poor communication with developer ecosystem

**The Impact:**
- Popular apps like Tweetbot and Twitterrific had to redesign their entire architecture
- Some apps shut down entirely (UberTwitter had 3 million users)
- Developer trust in Twitter's platform collapsed
- Ecosystem shifted away from Twitter to other platforms

**How They Should Have Fixed It:**
- Grandfather existing apps under old rate limits
- Version the API (`/v1.1/` vs `/v2/`) instead of changing in place
- Give 6-12 months deprecation notice for breaking changes
- Provide migration tools and clear upgrade paths

**Lessons Learned:**
1. Your API is a contract - breaking it breaks trust
2. Always version your APIs from day one
3. Deprecation timelines should be measured in months, not weeks
4. Communicate changes through multiple channels (email, dashboard, docs)

## What to Watch Out For (Common Pitfalls)

### 1. Changing Field Types Without Versioning
```json
// Before
{"created_at": 1705320000}

// After (BREAKING!)
{"created_at": "2024-01-15T10:00:00Z"}
```
Mobile apps expecting integers will crash. Always add a new field instead.

### 2. Inconsistent Naming Conventions
```
GET /users/123          // snake_case in response
GET /getUserById/123    // camelCase in URL
POST /user-create       // kebab-case action
```
Pick one convention and stick to it everywhere.

### 3. Not Using Idempotency Keys for Mutations
When a payment POST times out, the client retries. Without idempotency keys, the customer gets charged twice.

### 4. Returning Different Structures for Errors vs Success
```json
// Success: nested data
{"data": {"user": {...}}}

// Error: flat structure
{"error": "Not found", "code": 404}
```
Clients have to handle two completely different shapes.

### 5. Pagination That Breaks on Updates
Offset pagination shows duplicates or skips items when new records are inserted between page fetches.

### 6. Exposing Internal IDs and Structures
```json
// Leaks database schema
{"_id": "507f1f77bcf86cd799439011", "mongo_created_at": ...}
```
Use stable external IDs and transform internal structures.

### 7. Missing or Useless Error Messages
```json
// Useless
{"error": "Invalid request"}

// Helpful
{"error": "VALIDATION_ERROR", "message": "Email format invalid", "field": "email", "hint": "Must contain @ symbol"}
```

## Interview Deep Dive

### Common Interview Questions

1. **"How would you design the API for a URL shortener?"**
2. **"Explain REST vs GraphQL - when would you use each?"**
3. **"How do you handle backward compatibility?"**
4. **"Design the pagination for a social media feed"**
5. **"How would you rate limit your API?"**

### How to Explain API Design in 2 Minutes

"API design is about creating contracts between systems that are intuitive, consistent, and evolvable. The key principles are:

First, use **RESTful conventions** - nouns for resources, HTTP verbs for actions. GET `/users/123` is immediately understandable.

Second, **version from day one** with URL paths like `/v1/`. This lets you evolve without breaking existing clients.

Third, implement **idempotency** for any operation that changes state. This makes your API safe to retry during network failures.

Fourth, use **cursor-based pagination** for any list that might grow large - offset pagination gets slow and inconsistent.

Finally, design your **error responses** to be actionable - include error codes, human-readable messages, and the specific field that failed validation."

### Follow-up Questions Interviewers Ask

- "What happens if you need to remove a field from a response?"
- "How do you handle authentication for both mobile and server-to-server?"
- "How would you document this API?"
- "What metrics would you track to know if your API is well-designed?"
- "How do you handle long-running operations?"

### Edge Cases to Mention

- Rate limiting per user vs per API key vs per IP
- Handling partial failures in batch operations
- Timezone handling in date fields
- Unicode and emoji in string fields
- Maximum payload sizes and streaming for large responses

## Code Implementation

### Python - Complete REST API with Best Practices

```python
from flask import Flask, request, jsonify, make_response
from functools import wraps
from datetime import datetime
import hashlib
import json
import redis
import uuid

app = Flask(__name__)
redis_client = redis.Redis()

# --- Idempotency Implementation ---
class IdempotencyStore:
    """Store for idempotency results using Redis."""

    def __init__(self, redis_client, ttl=86400):
        self.redis = redis_client
        self.ttl = ttl

    def get(self, key):
        """Get cached result for idempotency key."""
        data = self.redis.get(f"idempotency:{key}")
        return json.loads(data) if data else None

    def set(self, key, result, status_code):
        """Store result for idempotency key."""
        self.redis.setex(
            f"idempotency:{key}",
            self.ttl,
            json.dumps({'result': result, 'status_code': status_code})
        )

    def lock(self, key):
        """Acquire lock for concurrent request protection."""
        return self.redis.set(
            f"idempotency:{key}:lock",
            "processing",
            nx=True,  # Only set if not exists
            ex=60     # 60 second timeout
        )

    def unlock(self, key):
        """Release lock."""
        self.redis.delete(f"idempotency:{key}:lock")

idempotency_store = IdempotencyStore(redis_client)

def idempotent(f):
    """Decorator for idempotent endpoints."""
    @wraps(f)
    def wrapper(*args, **kwargs):
        idempotency_key = request.headers.get('Idempotency-Key')

        if not idempotency_key:
            return error_response(400, 'MISSING_IDEMPOTENCY_KEY',
                                  'Idempotency-Key header is required')

        # Check for existing result
        existing = idempotency_store.get(idempotency_key)
        if existing:
            response = make_response(jsonify(existing['result']))
            response.status_code = existing['status_code']
            response.headers['Idempotent-Replayed'] = 'true'
            return response

        # Acquire lock for concurrent requests
        if not idempotency_store.lock(idempotency_key):
            return error_response(409, 'CONCURRENT_REQUEST',
                                  'Request with this idempotency key is already processing')

        try:
            result, status_code = f(*args, **kwargs)
            idempotency_store.set(idempotency_key, result, status_code)
            return jsonify(result), status_code
        finally:
            idempotency_store.unlock(idempotency_key)

    return wrapper

# --- Error Response Standard ---
def error_response(status_code, code, message, field=None, details=None):
    """Create standardized error response."""
    body = {
        'error': {
            'code': code,
            'message': message,
            'request_id': request.headers.get('X-Request-ID', str(uuid.uuid4()))
        }
    }
    if field:
        body['error']['field'] = field
    if details:
        body['error']['details'] = details

    return jsonify(body), status_code

# --- Pagination Implementation ---
def paginate_cursor(query, limit, cursor=None):
    """Cursor-based pagination helper."""
    import base64

    if cursor:
        cursor_data = json.loads(base64.urlsafe_b64decode(cursor))
        query = query.filter(User.id > cursor_data['last_id'])

    # Fetch one extra to check if there are more
    items = query.order_by(User.id).limit(limit + 1).all()
    has_more = len(items) > limit
    items = items[:limit]

    next_cursor = None
    if has_more and items:
        cursor_data = {'last_id': items[-1].id}
        next_cursor = base64.urlsafe_b64encode(
            json.dumps(cursor_data).encode()
        ).decode()

    return items, next_cursor, has_more

# --- API Endpoints ---
@app.route('/v1/users', methods=['GET'])
def list_users():
    """List users with cursor pagination."""
    limit = min(request.args.get('limit', 20, type=int), 100)
    cursor = request.args.get('cursor')

    users, next_cursor, has_more = paginate_cursor(
        User.query, limit, cursor
    )

    return jsonify({
        'data': [serialize_user(u) for u in users],
        'pagination': {
            'next_cursor': next_cursor,
            'has_more': has_more,
            'limit': limit
        }
    })

@app.route('/v1/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get single user by ID."""
    user = User.query.get(user_id)
    if not user:
        return error_response(404, 'USER_NOT_FOUND',
                              f'User with ID {user_id} not found')

    return jsonify({'data': serialize_user(user)})

@app.route('/v1/users', methods=['POST'])
@idempotent
def create_user():
    """Create a new user (idempotent)."""
    data = request.json

    # Validate required fields
    errors = []
    if not data.get('email'):
        errors.append({'field': 'email', 'message': 'Email is required'})
    if not data.get('name'):
        errors.append({'field': 'name', 'message': 'Name is required'})

    if errors:
        return {'error': {'code': 'VALIDATION_ERROR', 'errors': errors}}, 400

    # Check for duplicate email
    if User.query.filter_by(email=data['email']).first():
        return {'error': {'code': 'DUPLICATE_EMAIL',
                         'message': 'Email already registered'}}, 409

    user = User(email=data['email'], name=data['name'])
    db.session.add(user)
    db.session.commit()

    return {'data': serialize_user(user)}, 201

def serialize_user(user):
    """Serialize user to API response format."""
    return {
        'id': user.id,
        'email': user.email,
        'name': user.name,
        'created_at': user.created_at.isoformat() + 'Z'
    }
```

### Go - Production-Grade REST API

```go
package main

import (
    "encoding/base64"
    "encoding/json"
    "net/http"
    "strconv"
    "sync"
    "time"

    "github.com/gorilla/mux"
)

// --- Standard Response Types ---

type APIResponse struct {
    Data       interface{}       `json:"data,omitempty"`
    Pagination *PaginationMeta   `json:"pagination,omitempty"`
    Error      *APIError         `json:"error,omitempty"`
}

type APIError struct {
    Code      string `json:"code"`
    Message   string `json:"message"`
    Field     string `json:"field,omitempty"`
    RequestID string `json:"request_id"`
}

type PaginationMeta struct {
    NextCursor string `json:"next_cursor,omitempty"`
    HasMore    bool   `json:"has_more"`
    Limit      int    `json:"limit"`
}

// --- Idempotency Store ---

type IdempotencyEntry struct {
    Result     interface{}
    StatusCode int
    ExpiresAt  time.Time
}

type IdempotencyStore struct {
    entries map[string]*IdempotencyEntry
    locks   map[string]bool
    mu      sync.RWMutex
}

func NewIdempotencyStore() *IdempotencyStore {
    store := &IdempotencyStore{
        entries: make(map[string]*IdempotencyEntry),
        locks:   make(map[string]bool),
    }
    // Background cleanup of expired entries
    go store.cleanup()
    return store
}

func (s *IdempotencyStore) Get(key string) (*IdempotencyEntry, bool) {
    s.mu.RLock()
    defer s.mu.RUnlock()

    entry, exists := s.entries[key]
    if !exists || time.Now().After(entry.ExpiresAt) {
        return nil, false
    }
    return entry, true
}

func (s *IdempotencyStore) Set(key string, result interface{}, statusCode int) {
    s.mu.Lock()
    defer s.mu.Unlock()

    s.entries[key] = &IdempotencyEntry{
        Result:     result,
        StatusCode: statusCode,
        ExpiresAt:  time.Now().Add(24 * time.Hour),
    }
}

func (s *IdempotencyStore) Lock(key string) bool {
    s.mu.Lock()
    defer s.mu.Unlock()

    if s.locks[key] {
        return false
    }
    s.locks[key] = true
    return true
}

func (s *IdempotencyStore) Unlock(key string) {
    s.mu.Lock()
    defer s.mu.Unlock()
    delete(s.locks, key)
}

func (s *IdempotencyStore) cleanup() {
    ticker := time.NewTicker(5 * time.Minute)
    for range ticker.C {
        s.mu.Lock()
        now := time.Now()
        for key, entry := range s.entries {
            if now.After(entry.ExpiresAt) {
                delete(s.entries, key)
            }
        }
        s.mu.Unlock()
    }
}

var idempotencyStore = NewIdempotencyStore()

// --- Response Helpers ---

func respondJSON(w http.ResponseWriter, status int, data interface{}) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(data)
}

func respondError(w http.ResponseWriter, status int, code, message string) {
    respondJSON(w, status, APIResponse{
        Error: &APIError{
            Code:      code,
            Message:   message,
            RequestID: w.Header().Get("X-Request-ID"),
        },
    })
}

// --- Idempotency Middleware ---

func IdempotencyMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        // Only apply to mutating methods
        if r.Method != "POST" && r.Method != "PUT" && r.Method != "PATCH" {
            next(w, r)
            return
        }

        key := r.Header.Get("Idempotency-Key")
        if key == "" {
            respondError(w, 400, "MISSING_IDEMPOTENCY_KEY",
                        "Idempotency-Key header is required")
            return
        }

        // Check for cached result
        if entry, exists := idempotencyStore.Get(key); exists {
            w.Header().Set("Idempotent-Replayed", "true")
            respondJSON(w, entry.StatusCode, entry.Result)
            return
        }

        // Try to acquire lock
        if !idempotencyStore.Lock(key) {
            respondError(w, 409, "CONCURRENT_REQUEST",
                        "Request with this idempotency key is processing")
            return
        }
        defer idempotencyStore.Unlock(key)

        // Capture response
        recorder := &responseRecorder{ResponseWriter: w, statusCode: 200}
        next(recorder, r)

        // Store result
        if recorder.body != nil {
            var result interface{}
            json.Unmarshal(recorder.body, &result)
            idempotencyStore.Set(key, result, recorder.statusCode)
        }
    }
}

type responseRecorder struct {
    http.ResponseWriter
    statusCode int
    body       []byte
}

func (r *responseRecorder) WriteHeader(code int) {
    r.statusCode = code
    r.ResponseWriter.WriteHeader(code)
}

func (r *responseRecorder) Write(b []byte) (int, error) {
    r.body = append(r.body, b...)
    return r.ResponseWriter.Write(b)
}

// --- Cursor Pagination ---

type Cursor struct {
    LastID int64 `json:"last_id"`
}

func encodeCursor(lastID int64) string {
    data, _ := json.Marshal(Cursor{LastID: lastID})
    return base64.URLEncoding.EncodeToString(data)
}

func decodeCursor(cursor string) (*Cursor, error) {
    data, err := base64.URLEncoding.DecodeString(cursor)
    if err != nil {
        return nil, err
    }
    var c Cursor
    err = json.Unmarshal(data, &c)
    return &c, err
}

// --- API Handlers ---

func ListUsersHandler(w http.ResponseWriter, r *http.Request) {
    // Parse pagination params
    limit := 20
    if l := r.URL.Query().Get("limit"); l != "" {
        if parsed, err := strconv.Atoi(l); err == nil && parsed <= 100 {
            limit = parsed
        }
    }

    cursor := r.URL.Query().Get("cursor")
    var afterID int64 = 0

    if cursor != "" {
        if c, err := decodeCursor(cursor); err == nil {
            afterID = c.LastID
        }
    }

    // Fetch users (simulated)
    users := fetchUsersAfter(afterID, limit+1)
    hasMore := len(users) > limit
    if hasMore {
        users = users[:limit]
    }

    var nextCursor string
    if hasMore && len(users) > 0 {
        nextCursor = encodeCursor(users[len(users)-1].ID)
    }

    respondJSON(w, 200, APIResponse{
        Data: users,
        Pagination: &PaginationMeta{
            NextCursor: nextCursor,
            HasMore:    hasMore,
            Limit:      limit,
        },
    })
}

func CreateUserHandler(w http.ResponseWriter, r *http.Request) {
    var input struct {
        Email string `json:"email"`
        Name  string `json:"name"`
    }

    if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
        respondError(w, 400, "INVALID_JSON", "Could not parse request body")
        return
    }

    // Validation
    if input.Email == "" {
        respondError(w, 400, "VALIDATION_ERROR", "Email is required")
        return
    }

    // Create user (simulated)
    user := createUser(input.Email, input.Name)

    respondJSON(w, 201, APIResponse{Data: user})
}

func main() {
    r := mux.NewRouter()

    // API v1 routes
    v1 := r.PathPrefix("/v1").Subrouter()
    v1.HandleFunc("/users", ListUsersHandler).Methods("GET")
    v1.HandleFunc("/users", IdempotencyMiddleware(CreateUserHandler)).Methods("POST")

    http.ListenAndServe(":8080", r)
}
```

## Quick Reference Card

### HTTP Methods Cheat Sheet
| Method | Purpose | Idempotent | Safe |
|--------|---------|------------|------|
| GET | Read resource | Yes | Yes |
| POST | Create resource | No* | No |
| PUT | Replace resource | Yes | No |
| PATCH | Partial update | No | No |
| DELETE | Remove resource | Yes | No |

*POST can be made idempotent with idempotency keys

### Status Codes to Know
- **200** OK - GET/PUT/PATCH success
- **201** Created - POST success
- **204** No Content - DELETE success
- **400** Bad Request - Validation error
- **401** Unauthorized - Missing/invalid auth
- **403** Forbidden - Valid auth, no permission
- **404** Not Found - Resource doesn't exist
- **409** Conflict - Duplicate or state conflict
- **429** Too Many Requests - Rate limited
- **500** Internal Error - Server bug
- **503** Service Unavailable - Temporary outage

### Naming Conventions
```
# Resources (nouns, plural)
GET    /users
GET    /users/123
POST   /users
PUT    /users/123
DELETE /users/123

# Sub-resources
GET    /users/123/orders
POST   /users/123/orders

# Actions (when REST doesn't fit)
POST   /users/123/actions/verify-email
POST   /orders/456/actions/cancel
```

### Essential Headers
```
# Request
Authorization: Bearer <token>
Content-Type: application/json
Idempotency-Key: <uuid>
X-Request-ID: <uuid>

# Response
Content-Type: application/json
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

### Pagination Response Shape
```json
{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTAwfQ",
    "has_more": true,
    "limit": 20
  }
}
```

### Error Response Shape
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email format is invalid",
    "field": "email",
    "request_id": "req_abc123"
  }
}
```
