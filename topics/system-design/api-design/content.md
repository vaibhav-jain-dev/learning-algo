# API Design Best Practices

## Overview

API design determines how developers interact with your service. Good APIs are intuitive, consistent, and resilient. Bad APIs create support tickets, integration failures, and technical debt.

## The Intuitive Mental Model: Restaurant Menu

Think of API design like a restaurant menu:

```
Bad Menu (Bad API):
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Item #47 - $12.99                                              │
│  Item #48 - $14.99                                              │
│  (Ask server for details)                                       │
│                                                                 │
│  Note: Prices subject to change without notice                  │
│  Note: Some items unavailable on Tuesdays                       │
│  Note: See other menu for drinks                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Good Menu (Good API):
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  APPETIZERS                                                     │
│  ───────────                                                    │
│  Soup of the Day (V) (GF) ...................... $8.99          │
│    Today: Tomato basil, served with crusty bread                │
│                                                                 │
│  MAINS                                                          │
│  ─────                                                          │
│  Grilled Salmon (GF) ........................... $24.99         │
│    Atlantic salmon, lemon butter, seasonal vegetables           │
│    Allergens: Fish, Dairy                                       │
│                                                                 │
│  (V) = Vegetarian  (GF) = Gluten Free                          │
│  Prices include tax. Substitutions available on request.        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Mapping the Metaphor

| Restaurant Menu | API Design | Purpose |
|-----------------|------------|---------|
| Categories (Appetizers, Mains) | Resource grouping | Organization |
| Item names | Endpoint names | Discoverability |
| Descriptions | Documentation | Understanding |
| Prices | Response schemas | Expectations |
| Allergen info | Error codes | Safety/debugging |
| Symbols (V, GF) | Query parameters | Filtering |

---

## 20-Year Insight: What Experience Teaches

### What Junior Developers Think:
> "API design is just choosing between REST and GraphQL."

### What Senior Developers Know:
> "API design is a contract. Once published, you own it forever. Every quirk becomes someone's critical dependency. Design for the next decade, not the next sprint."

### The Deeper Truth:
After 20+ years of building and consuming APIs:
1. **Consistency beats perfection** - A consistent 'wrong' choice is better than inconsistent 'right' ones
2. **Versioning is not optional** - You will break things; plan for it
3. **Idempotency saves lives** - Network failures happen; make retries safe
4. **Pagination is complex** - Every approach has trade-offs

---

## API Versioning Strategies

### 1. URL Path Versioning (Recommended)

```
GET /v1/users/123
GET /v2/users/123
```

**Pros**: Explicit, cacheable, easy to route
**Cons**: URL proliferation

```python
# Flask example
from flask import Blueprint

api_v1 = Blueprint('v1', __name__, url_prefix='/v1')
api_v2 = Blueprint('v2', __name__, url_prefix='/v2')

@api_v1.route('/users/<int:user_id>')
def get_user_v1(user_id):
    return serialize_v1(get_user(user_id))

@api_v2.route('/users/<int:user_id>')
def get_user_v2(user_id):
    return serialize_v2(get_user(user_id))  # New format
```

### 2. Header Versioning

```
GET /users/123
Accept: application/vnd.myapi.v2+json
```

**Pros**: Clean URLs, content negotiation
**Cons**: Harder to test, not visible in logs

```python
from flask import request

@app.route('/users/<int:user_id>')
def get_user(user_id):
    version = request.headers.get('Accept', '')

    if 'v2' in version:
        return serialize_v2(get_user(user_id))
    else:
        return serialize_v1(get_user(user_id))
```

### 3. Query Parameter Versioning

```
GET /users/123?version=2
```

**Pros**: Easy to use, visible
**Cons**: Can be accidentally omitted, caching complexity

### Version Deprecation Strategy

```python
from datetime import datetime
from functools import wraps

# Deprecation decorator
def deprecated(sunset_date: str, replacement: str = None):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            response = f(*args, **kwargs)

            # Add deprecation headers
            response.headers['Deprecation'] = 'true'
            response.headers['Sunset'] = sunset_date
            if replacement:
                response.headers['Link'] = f'<{replacement}>; rel="successor-version"'

            return response
        return wrapper
    return decorator


@api_v1.route('/users/<int:user_id>')
@deprecated(sunset_date='2024-12-31', replacement='/v2/users/{id}')
def get_user_v1(user_id):
    return serialize_v1(get_user(user_id))
```

---

## Pagination Patterns

### 1. Offset-Based Pagination (Simple)

```
GET /users?offset=0&limit=20
GET /users?offset=20&limit=20
GET /users?offset=40&limit=20
```

```python
@app.route('/users')
def list_users():
    offset = request.args.get('offset', 0, type=int)
    limit = min(request.args.get('limit', 20, type=int), 100)

    users = db.query("SELECT * FROM users ORDER BY id LIMIT %s OFFSET %s",
                    (limit, offset))
    total = db.query("SELECT COUNT(*) FROM users")[0][0]

    return {
        'data': [serialize(u) for u in users],
        'pagination': {
            'offset': offset,
            'limit': limit,
            'total': total,
            'has_more': offset + len(users) < total,
        }
    }
```

**Problems with offset pagination**:
- Page drift when items are added/deleted
- Performance degrades at high offsets (O(n) skip)
- Not suitable for real-time data

### 2. Cursor-Based Pagination (Recommended for Large Datasets)

```
GET /users?limit=20
GET /users?cursor=eyJpZCI6MTAwfQ&limit=20
```

```python
import base64
import json

def encode_cursor(data: dict) -> str:
    return base64.urlsafe_b64encode(json.dumps(data).encode()).decode()

def decode_cursor(cursor: str) -> dict:
    return json.loads(base64.urlsafe_b64decode(cursor))


@app.route('/users')
def list_users():
    limit = min(request.args.get('limit', 20, type=int), 100)
    cursor = request.args.get('cursor')

    if cursor:
        cursor_data = decode_cursor(cursor)
        last_id = cursor_data['id']
        users = db.query(
            "SELECT * FROM users WHERE id > %s ORDER BY id LIMIT %s",
            (last_id, limit + 1)  # Fetch one extra to check has_more
        )
    else:
        users = db.query(
            "SELECT * FROM users ORDER BY id LIMIT %s",
            (limit + 1,)
        )

    has_more = len(users) > limit
    users = users[:limit]

    next_cursor = None
    if has_more and users:
        next_cursor = encode_cursor({'id': users[-1]['id']})

    return {
        'data': [serialize(u) for u in users],
        'pagination': {
            'next_cursor': next_cursor,
            'has_more': has_more,
        }
    }
```

**Cursor pagination benefits**:
- Stable results even with concurrent inserts/deletes
- Constant time performance (uses index)
- No page drift

### 3. Keyset Pagination (Multi-Column Sorting)

```
GET /posts?sort=created_at:desc,id:desc&limit=20
GET /posts?after_created_at=2024-01-15T10:00:00Z&after_id=123&limit=20
```

```python
@app.route('/posts')
def list_posts():
    limit = min(request.args.get('limit', 20, type=int), 100)
    after_created = request.args.get('after_created_at')
    after_id = request.args.get('after_id', type=int)

    if after_created and after_id:
        # Keyset condition for (created_at DESC, id DESC)
        posts = db.query("""
            SELECT * FROM posts
            WHERE (created_at, id) < (%s, %s)
            ORDER BY created_at DESC, id DESC
            LIMIT %s
        """, (after_created, after_id, limit + 1))
    else:
        posts = db.query("""
            SELECT * FROM posts
            ORDER BY created_at DESC, id DESC
            LIMIT %s
        """, (limit + 1,))

    has_more = len(posts) > limit
    posts = posts[:limit]

    next_params = None
    if has_more and posts:
        last = posts[-1]
        next_params = {
            'after_created_at': last['created_at'].isoformat(),
            'after_id': last['id'],
        }

    return {
        'data': posts,
        'pagination': {
            'next': next_params,
            'has_more': has_more,
        }
    }
```

### Pagination Comparison

| Approach | Performance | Consistency | Complexity | Best For |
|----------|-------------|-------------|------------|----------|
| Offset | O(n) skip | Poor (drift) | Simple | Small datasets |
| Cursor | O(1) | Good | Medium | Large datasets |
| Keyset | O(1) | Excellent | Complex | Real-time feeds |

---

## Idempotency

### The Problem

```
Client → POST /payments → Server processes → Response lost → Client retries
                                                              ↓
                                          Customer charged twice!
```

### The Solution: Idempotency Keys

```python
import hashlib
from functools import wraps

class IdempotencyStore:
    """Store idempotency results (use Redis in production)."""

    def __init__(self, redis_client, ttl: int = 86400):
        self.redis = redis_client
        self.ttl = ttl

    def get(self, key: str) -> dict | None:
        data = self.redis.get(f"idempotency:{key}")
        return json.loads(data) if data else None

    def set(self, key: str, result: dict, status_code: int):
        self.redis.setex(
            f"idempotency:{key}",
            self.ttl,
            json.dumps({'result': result, 'status_code': status_code})
        )

    def set_in_progress(self, key: str) -> bool:
        """Mark request as in-progress (returns False if already in progress)."""
        return self.redis.set(
            f"idempotency:{key}:lock",
            "processing",
            nx=True,
            ex=60  # 60 second lock
        )

    def clear_in_progress(self, key: str):
        self.redis.delete(f"idempotency:{key}:lock")


def idempotent(store: IdempotencyStore):
    """Decorator for idempotent endpoints."""
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            idempotency_key = request.headers.get('Idempotency-Key')

            if not idempotency_key:
                return {'error': 'Idempotency-Key header required'}, 400

            # Check for existing result
            existing = store.get(idempotency_key)
            if existing:
                response = make_response(existing['result'])
                response.status_code = existing['status_code']
                response.headers['Idempotent-Replayed'] = 'true'
                return response

            # Check if request is in progress
            if not store.set_in_progress(idempotency_key):
                return {'error': 'Request already in progress'}, 409

            try:
                # Execute the actual function
                result, status_code = f(*args, **kwargs)

                # Store result
                store.set(idempotency_key, result, status_code)

                return result, status_code
            finally:
                store.clear_in_progress(idempotency_key)

        return wrapper
    return decorator


# Usage
@app.route('/payments', methods=['POST'])
@idempotent(idempotency_store)
def create_payment():
    data = request.json

    # Process payment (only runs once per idempotency key)
    payment = payment_gateway.charge(
        amount=data['amount'],
        customer_id=data['customer_id'],
    )

    return {'payment_id': payment.id}, 201
```

### Idempotency Key Generation

```python
# Client-side: Generate deterministic key
import hashlib

def generate_idempotency_key(user_id: int, action: str, data: dict) -> str:
    """Generate deterministic idempotency key."""
    payload = f"{user_id}:{action}:{json.dumps(data, sort_keys=True)}"
    return hashlib.sha256(payload.encode()).hexdigest()


# Usage
key = generate_idempotency_key(
    user_id=123,
    action="create_payment",
    data={"amount": 99.99, "currency": "USD"}
)
# Same inputs always produce same key → safe to retry
```

---

## Error Handling

### Standard Error Response Format

```python
from dataclasses import dataclass
from typing import Optional, List


@dataclass
class APIError:
    code: str           # Machine-readable: "VALIDATION_ERROR"
    message: str        # Human-readable: "Invalid email format"
    field: str = None   # Which field: "email"
    details: dict = None


def error_response(
    status_code: int,
    code: str,
    message: str,
    errors: List[APIError] = None
) -> tuple:
    """Create standard error response."""
    body = {
        'error': {
            'code': code,
            'message': message,
            'request_id': request.headers.get('X-Request-ID'),
        }
    }

    if errors:
        body['error']['errors'] = [
            {
                'code': e.code,
                'message': e.message,
                'field': e.field,
                'details': e.details,
            }
            for e in errors
        ]

    return body, status_code


# Error codes enum
class ErrorCode:
    # Client errors (4xx)
    VALIDATION_ERROR = "VALIDATION_ERROR"
    INVALID_REQUEST = "INVALID_REQUEST"
    AUTHENTICATION_REQUIRED = "AUTHENTICATION_REQUIRED"
    PERMISSION_DENIED = "PERMISSION_DENIED"
    RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND"
    RESOURCE_CONFLICT = "RESOURCE_CONFLICT"
    RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED"

    # Server errors (5xx)
    INTERNAL_ERROR = "INTERNAL_ERROR"
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE"
    DEPENDENCY_FAILED = "DEPENDENCY_FAILED"


# Usage examples
@app.errorhandler(ValidationError)
def handle_validation_error(e):
    errors = [
        APIError(
            code=ErrorCode.VALIDATION_ERROR,
            message=err.message,
            field=err.field,
        )
        for err in e.errors
    ]
    return error_response(
        status_code=400,
        code=ErrorCode.VALIDATION_ERROR,
        message="Request validation failed",
        errors=errors,
    )


@app.errorhandler(404)
def handle_not_found(e):
    return error_response(
        status_code=404,
        code=ErrorCode.RESOURCE_NOT_FOUND,
        message="The requested resource was not found",
    )


@app.errorhandler(429)
def handle_rate_limit(e):
    response = error_response(
        status_code=429,
        code=ErrorCode.RATE_LIMIT_EXCEEDED,
        message="Too many requests. Please retry after the specified time.",
    )
    response[0]['error']['retry_after'] = e.retry_after
    return response
```

### HTTP Status Code Guide

```python
# 2xx Success
200  # OK - GET, PUT, PATCH success
201  # Created - POST success with resource creation
202  # Accepted - Async processing started
204  # No Content - DELETE success

# 3xx Redirect
301  # Moved Permanently - Resource URL changed
304  # Not Modified - Conditional GET, use cache

# 4xx Client Error
400  # Bad Request - Malformed request
401  # Unauthorized - Authentication required
403  # Forbidden - Authenticated but not authorized
404  # Not Found - Resource doesn't exist
405  # Method Not Allowed - Wrong HTTP method
409  # Conflict - Resource state conflict (e.g., duplicate)
410  # Gone - Resource permanently deleted
422  # Unprocessable Entity - Semantic validation error
429  # Too Many Requests - Rate limited

# 5xx Server Error
500  # Internal Server Error - Unexpected error
502  # Bad Gateway - Upstream service failed
503  # Service Unavailable - Temporary unavailability
504  # Gateway Timeout - Upstream timeout
```

---

## Rate Limiting Headers

```python
from flask import request, make_response
from functools import wraps
import time


class RateLimiter:
    def __init__(self, redis_client):
        self.redis = redis_client

    def check(self, key: str, limit: int, window: int) -> dict:
        """
        Check rate limit and return status.

        Returns:
            {
                'allowed': bool,
                'limit': int,
                'remaining': int,
                'reset': int (timestamp),
                'retry_after': int (seconds) or None
            }
        """
        now = int(time.time())
        window_start = now - (now % window)
        window_key = f"ratelimit:{key}:{window_start}"

        current = self.redis.incr(window_key)
        if current == 1:
            self.redis.expire(window_key, window)

        reset_at = window_start + window
        remaining = max(0, limit - current)

        return {
            'allowed': current <= limit,
            'limit': limit,
            'remaining': remaining,
            'reset': reset_at,
            'retry_after': reset_at - now if current > limit else None,
        }


def rate_limit(limiter: RateLimiter, limit: int, window: int, key_func=None):
    """Rate limiting decorator with standard headers."""
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            # Get rate limit key
            if key_func:
                key = key_func()
            else:
                key = request.remote_addr

            # Check rate limit
            result = limiter.check(key, limit, window)

            # Add rate limit headers to all responses
            def add_headers(response):
                response.headers['X-RateLimit-Limit'] = str(result['limit'])
                response.headers['X-RateLimit-Remaining'] = str(result['remaining'])
                response.headers['X-RateLimit-Reset'] = str(result['reset'])
                return response

            if not result['allowed']:
                response = make_response(error_response(
                    429,
                    ErrorCode.RATE_LIMIT_EXCEEDED,
                    "Rate limit exceeded",
                ))
                response.headers['Retry-After'] = str(result['retry_after'])
                return add_headers(response)

            response = make_response(f(*args, **kwargs))
            return add_headers(response)

        return wrapper
    return decorator


# Usage
@app.route('/api/expensive-operation', methods=['POST'])
@rate_limit(limiter, limit=10, window=60)  # 10 requests per minute
def expensive_operation():
    return {'result': 'success'}


# Different limits for different endpoints
@app.route('/api/search')
@rate_limit(limiter, limit=100, window=60)  # 100/min for reads
def search():
    return {'results': []}


@app.route('/api/write')
@rate_limit(limiter, limit=10, window=60)  # 10/min for writes
def write():
    return {'status': 'created'}, 201
```

---

## Request/Response Design

### Request Body Best Practices

```python
from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime


class CreateUserRequest(BaseModel):
    """
    Well-designed request schema.
    """
    # Required fields with validation
    email: str = Field(..., description="User email address")
    name: str = Field(..., min_length=1, max_length=100)

    # Optional fields with defaults
    role: str = Field(default="user", description="User role")
    metadata: Optional[dict] = None

    # Constrained fields
    age: Optional[int] = Field(None, ge=0, le=150)

    @validator('email')
    def validate_email(cls, v):
        if '@' not in v:
            raise ValueError('Invalid email format')
        return v.lower()  # Normalize

    @validator('role')
    def validate_role(cls, v):
        allowed = ['user', 'admin', 'moderator']
        if v not in allowed:
            raise ValueError(f'Role must be one of: {allowed}')
        return v

    class Config:
        # Allow extra fields but ignore them
        extra = 'ignore'


# Usage
@app.route('/users', methods=['POST'])
def create_user():
    try:
        data = CreateUserRequest(**request.json)
    except ValidationError as e:
        return handle_validation_error(e)

    user = User.create(
        email=data.email,
        name=data.name,
        role=data.role,
    )
    return UserResponse.from_orm(user).dict(), 201
```

### Response Envelope Pattern

```python
from typing import Generic, TypeVar, Optional, List
from pydantic.generics import GenericModel

T = TypeVar('T')


class PaginationMeta(BaseModel):
    total: Optional[int] = None
    limit: int
    offset: Optional[int] = None
    next_cursor: Optional[str] = None
    has_more: bool


class APIResponse(GenericModel, Generic[T]):
    """
    Standard response envelope.
    """
    data: T
    meta: Optional[dict] = None


class PaginatedResponse(GenericModel, Generic[T]):
    """
    Paginated response envelope.
    """
    data: List[T]
    pagination: PaginationMeta
    meta: Optional[dict] = None


# Usage
@app.route('/users/<int:user_id>')
def get_user(user_id):
    user = User.get(user_id)
    if not user:
        return error_response(404, 'NOT_FOUND', 'User not found')

    return APIResponse(
        data=UserSchema.from_orm(user),
        meta={'request_id': request.headers.get('X-Request-ID')},
    ).dict()


@app.route('/users')
def list_users():
    users, pagination = paginate_query(User.query)

    return PaginatedResponse(
        data=[UserSchema.from_orm(u) for u in users],
        pagination=pagination,
    ).dict()
```

---

## Filtering, Sorting, and Field Selection

### Filtering

```python
@app.route('/users')
def list_users():
    query = User.query

    # Simple equality filters
    if 'status' in request.args:
        query = query.filter(User.status == request.args['status'])

    if 'role' in request.args:
        query = query.filter(User.role == request.args['role'])

    # Range filters
    if 'created_after' in request.args:
        query = query.filter(User.created_at >= request.args['created_after'])

    if 'created_before' in request.args:
        query = query.filter(User.created_at <= request.args['created_before'])

    # Search filter
    if 'q' in request.args:
        search_term = f"%{request.args['q']}%"
        query = query.filter(
            or_(
                User.name.ilike(search_term),
                User.email.ilike(search_term),
            )
        )

    return paginate(query)


# Example requests:
# GET /users?status=active&role=admin
# GET /users?created_after=2024-01-01&created_before=2024-12-31
# GET /users?q=john
```

### Sorting

```python
ALLOWED_SORT_FIELDS = {
    'created_at': User.created_at,
    'name': User.name,
    'email': User.email,
}


def apply_sorting(query, sort_param: str):
    """
    Apply sorting from parameter like 'name:asc,created_at:desc'
    """
    if not sort_param:
        return query.order_by(User.created_at.desc())

    for sort_spec in sort_param.split(','):
        parts = sort_spec.split(':')
        field = parts[0]
        direction = parts[1] if len(parts) > 1 else 'asc'

        if field not in ALLOWED_SORT_FIELDS:
            continue

        column = ALLOWED_SORT_FIELDS[field]
        if direction == 'desc':
            query = query.order_by(column.desc())
        else:
            query = query.order_by(column.asc())

    return query


# Example: GET /users?sort=name:asc,created_at:desc
```

### Field Selection (Sparse Fieldsets)

```python
@app.route('/users')
def list_users():
    # Allow client to request specific fields
    # GET /users?fields=id,name,email
    requested_fields = request.args.get('fields', '').split(',')

    users = User.query.all()

    if requested_fields and requested_fields[0]:
        # Only include requested fields
        allowed_fields = {'id', 'name', 'email', 'role', 'created_at'}
        fields = set(requested_fields) & allowed_fields

        return {
            'data': [
                {f: getattr(u, f) for f in fields}
                for u in users
            ]
        }
    else:
        # Return all fields
        return {
            'data': [UserSchema.from_orm(u).dict() for u in users]
        }
```

---

## Production War Stories

### War Story 1: The Breaking Change

**The Scenario**:
API returned dates as Unix timestamps. New requirement: return ISO 8601 strings.

**What Happened**:
```python
# Before
{"created_at": 1705320000}

# After (BREAKING!)
{"created_at": "2024-01-15T10:00:00Z"}
```

1000+ mobile apps crashed because they expected integers.

**The Fix**:
```python
# Version the change
@app.route('/v1/users/<int:user_id>')
def get_user_v1(user_id):
    return serialize_v1(user)  # Unix timestamp

@app.route('/v2/users/<int:user_id>')
def get_user_v2(user_id):
    return serialize_v2(user)  # ISO 8601

# Or use Accept header
def serialize_user(user, version: int):
    if version >= 2:
        return {'created_at': user.created_at.isoformat()}
    else:
        return {'created_at': int(user.created_at.timestamp())}
```

**20-Year Lesson**: Never change field types in place. Version everything.

---

### War Story 2: The N+1 Pagination

**The Scenario**:
`GET /orders` returned 20 orders per page. Each order had a `customer` field that was fetched separately.

**What Happened**:
```
One API call → 1 query for orders + 20 queries for customers = 21 queries!
Page 2 → another 21 queries
...
```

**The Fix**:
```python
# Bad: N+1 queries
@app.route('/orders')
def list_orders():
    orders = Order.query.limit(20).all()
    return {
        'data': [
            {
                **order.to_dict(),
                'customer': Customer.query.get(order.customer_id).to_dict()  # N queries!
            }
            for order in orders
        ]
    }


# Good: Eager loading
@app.route('/orders')
def list_orders():
    orders = Order.query.options(
        joinedload(Order.customer)  # Single JOIN query
    ).limit(20).all()

    return {
        'data': [
            {
                **order.to_dict(),
                'customer': order.customer.to_dict()  # Already loaded!
            }
            for order in orders
        ]
    }
```

**20-Year Lesson**: Always check query count. Use eager loading or GraphQL dataloaders.

---

### War Story 3: The Idempotency Oversight

**The Scenario**:
Payment API didn't have idempotency. Network timeout caused client to retry.

**What Happened**:
```
t0: Client → POST /charge → Server receives → Processes payment
t1: Network timeout, client doesn't receive response
t2: Client retries → POST /charge → Server processes AGAIN
Result: Customer charged $50 twice
```

**The Fix**: Implement idempotency keys (see Idempotency section above).

**20-Year Lesson**: All non-idempotent operations (POST, PATCH, DELETE) need idempotency keys for critical paths.

---

### War Story 4: The Offset Pagination Disaster

**The Scenario**:
Content feed using `?offset=0&limit=20`. Users scroll through thousands of posts.

**What Happened**:
1. User at offset=10000
2. New posts added
3. User scrolls to offset=10020
4. Same posts appear again (they shifted!)
5. User sees duplicates

**The Fix**: Cursor-based pagination (see Pagination section above).

**20-Year Lesson**: Offset pagination fails for dynamic data. Use cursors for feeds.

---

## API Documentation

### OpenAPI/Swagger Specification

```yaml
openapi: 3.0.3
info:
  title: User Management API
  version: 2.0.0
  description: |
    API for managing users in the system.

    ## Authentication
    All endpoints require Bearer token authentication.

    ## Rate Limiting
    - Standard endpoints: 100 requests/minute
    - Write endpoints: 10 requests/minute

    ## Versioning
    API version is in the URL path (e.g., /v2/users)

servers:
  - url: https://api.example.com/v2
    description: Production

paths:
  /users:
    get:
      summary: List users
      description: Returns a paginated list of users
      operationId: listUsers
      tags:
        - Users
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
          description: Maximum number of results to return
        - name: cursor
          in: query
          schema:
            type: string
          description: Pagination cursor from previous response
        - name: status
          in: query
          schema:
            type: string
            enum: [active, inactive, pending]
          description: Filter by user status
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserListResponse'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '429':
          $ref: '#/components/responses/RateLimited'

    post:
      summary: Create user
      operationId: createUser
      tags:
        - Users
      parameters:
        - name: Idempotency-Key
          in: header
          required: true
          schema:
            type: string
          description: Unique key to ensure idempotent request
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          description: User created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'
        '400':
          $ref: '#/components/responses/ValidationError'
        '409':
          description: User already exists
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          readOnly: true
        email:
          type: string
          format: email
        name:
          type: string
        role:
          type: string
          enum: [user, admin, moderator]
        status:
          type: string
          enum: [active, inactive, pending]
        created_at:
          type: string
          format: date-time
          readOnly: true

    CreateUserRequest:
      type: object
      required:
        - email
        - name
      properties:
        email:
          type: string
          format: email
        name:
          type: string
          minLength: 1
          maxLength: 100
        role:
          type: string
          enum: [user, admin, moderator]
          default: user

    ErrorResponse:
      type: object
      properties:
        error:
          type: object
          properties:
            code:
              type: string
            message:
              type: string
            request_id:
              type: string

  responses:
    Unauthorized:
      description: Authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'

    RateLimited:
      description: Rate limit exceeded
      headers:
        Retry-After:
          schema:
            type: integer
          description: Seconds to wait before retrying
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

security:
  - bearerAuth: []
```

---

## Expert FAQs

### Q: REST vs GraphQL vs gRPC?

**A**:
| Aspect | REST | GraphQL | gRPC |
|--------|------|---------|------|
| Best for | Public APIs | Complex queries | Internal microservices |
| Learning curve | Low | Medium | High |
| Flexibility | Fixed responses | Client defines shape | Fixed contracts |
| Performance | Good | Variable | Excellent |
| Caching | HTTP caching | Complex | Manual |

**Choose REST when**: Building public APIs, simple CRUD, caching is important
**Choose GraphQL when**: Complex relationships, mobile apps (bandwidth), varying client needs
**Choose gRPC when**: Internal services, high performance, streaming

### Q: How do I handle long-running operations?

**A**: Use async pattern:
```python
# 1. Start operation
@app.route('/reports', methods=['POST'])
def create_report():
    job_id = start_async_job(request.json)
    return {
        'job_id': job_id,
        'status': 'processing',
        'status_url': f'/jobs/{job_id}',
    }, 202  # Accepted

# 2. Poll for status
@app.route('/jobs/<job_id>')
def get_job_status(job_id):
    job = get_job(job_id)
    if job.status == 'completed':
        return {
            'status': 'completed',
            'result_url': f'/reports/{job.result_id}',
        }
    elif job.status == 'failed':
        return {'status': 'failed', 'error': job.error}, 500
    else:
        return {
            'status': 'processing',
            'progress': job.progress,
        }
```

### Q: How do I handle API key vs OAuth?

**A**:
- **API Keys**: Server-to-server, simple, long-lived
- **OAuth**: User authentication, delegated access, short-lived tokens

```python
# API Key (simple, for servers)
X-API-Key: sk_live_abc123

# OAuth (for users)
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

### Q: How do I version my API without breaking clients?

**A**: Follow these rules:
1. **Additive changes are safe**: New fields, new endpoints
2. **Never remove fields**: Deprecate, then remove after sunset period
3. **Never change field types**: Add new field instead
4. **Never change field semantics**: Create new endpoint

```python
# Safe: Add new field
{"id": 1, "name": "John", "display_name": "John D."}  # Added display_name

# Unsafe: Change type
{"created_at": 1705320000}  # Was integer
{"created_at": "2024-01-15"}  # Now string - BREAKING!

# Safe way: New field
{"created_at": 1705320000, "created_at_iso": "2024-01-15T10:00:00Z"}
```

---

## Related Topics

- [Rate Limiting](/topic/system-design/rate-limiting)
- [Authentication](/topic/system-design/authentication)
- [Microservices](/topic/system-design/microservices)
- [Message Queues](/topic/system-design/message-queues)
