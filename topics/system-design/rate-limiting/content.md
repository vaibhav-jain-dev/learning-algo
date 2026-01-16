# Rate Limiting

## Overview

Rate limiting is a technique to control the rate of requests a client can make to an API or service. It protects systems from abuse, ensures fair usage, and maintains service stability during traffic spikes.

## Key Concepts

### Why Rate Limiting?

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

1. **Prevent Abuse**: Stop malicious users or bots
2. **Fair Usage**: Ensure all users get reasonable access
3. **Cost Control**: Limit expensive operations
4. **Stability**: Protect backend services from overload
5. **Compliance**: Meet contractual SLA limits

</div>

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                      WHY RATE LIMITING?                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   WITHOUT RATE LIMITING:                                                   │
│                                                                             │
│   ┌────────┐  1000 req/s  ┌──────────────┐                                │
│   │ Bot    │─────────────►│              │                                │
│   └────────┘              │   YOUR API   │  💥 CRASHED!                   │
│   ┌────────┐  1000 req/s  │              │                                │
│   │ Abuser │─────────────►│              │                                │
│   └────────┘              └──────────────┘                                │
│   ┌────────┐  10 req/s                                                     │
│   │ Normal │─────────────► ✗ Service Unavailable                          │
│   └────────┘                                                               │
│                                                                             │
│   WITH RATE LIMITING:                                                      │
│                                                                             │
│   ┌────────┐              ┌──────────────┐                                │
│   │ Bot    │───► BLOCKED  │              │                                │
│   └────────┘   (429)      │              │                                │
│   ┌────────┐              │   YOUR API   │  ✓ Healthy!                    │
│   │ Abuser │───► BLOCKED  │              │                                │
│   └────────┘   (429)      │              │                                │
│   ┌────────┐  10 req/s    └──────────────┘                                │
│   │ Normal │─────────────► ✓ Success!                                     │
│   └────────┘                                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

### Rate Limiting Headers

```http
# Response headers
X-RateLimit-Limit: 100        # Max requests allowed
X-RateLimit-Remaining: 45     # Requests remaining
X-RateLimit-Reset: 1642089600 # When limit resets (Unix timestamp)
Retry-After: 30               # Seconds until retry (when limited)
```

## Rate Limiting Algorithms

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RATE LIMITING ALGORITHMS                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Algorithm           │ Allows Bursts │ Memory │ Accuracy │ Complexity      │
│  ────────────────────┼───────────────┼────────┼──────────┼──────────────── │
│  Token Bucket        │ Yes           │ O(1)   │ Good     │ Simple          │
│  Leaky Bucket        │ No            │ O(n)   │ Good     │ Medium          │
│  Fixed Window        │ Edge bursts   │ O(1)   │ Low      │ Simple          │
│  Sliding Window Log  │ No            │ O(n)   │ High     │ Medium          │
│  Sliding Window Cnt  │ Weighted      │ O(1)   │ High     │ Medium          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

### 1. Token Bucket

Tokens accumulate at fixed rate, each request consumes a token.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TOKEN BUCKET                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Capacity: 10 tokens, Refill: 2 tokens/second                             │
│                                                                             │
│              ┌───────────────────┐                                         │
│              │   Token Bucket    │                                         │
│              │ ┌─┬─┬─┬─┬─┬─┬─┬─┐ │                                         │
│   Refill ───►│ │●│●│●│●│●│●│ │ │ │◄─── Requests consume tokens            │
│   2/sec      │ └─┴─┴─┴─┴─┴─┴─┴─┘ │                                         │
│              │   6 tokens        │                                         │
│              └───────────────────┘                                         │
│                                                                             │
│   Timeline:                                                                │
│   ─────────────────────────────────────────────────────────────────────    │
│   t=0    Bucket: ●●●●●●●●●● (10/10)                                       │
│          │                                                                  │
│          ▼ 5 requests arrive                                               │
│   t=0.1  Bucket: ●●●●●      (5/10)  → All ALLOWED                         │
│          │                                                                  │
│          ▼ 1 second passes, +2 tokens                                      │
│   t=1.0  Bucket: ●●●●●●●    (7/10)                                        │
│          │                                                                  │
│          ▼ 10 requests arrive (burst!)                                     │
│   t=1.1  Bucket:            (0/10)  → 7 ALLOWED, 3 REJECTED               │
│                                                                             │
│   ✓ Allows controlled bursts up to capacity                               │
│   ✓ Smooth average rate over time                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

```python
import time
from threading import Lock

class TokenBucket:
    def __init__(self, rate: float, capacity: int):
        self.rate = rate          # Tokens per second
        self.capacity = capacity  # Max tokens
        self.tokens = capacity    # Current tokens
        self.last_update = time.time()
        self.lock = Lock()

    def allow(self) -> bool:
        with self.lock:
            now = time.time()

            # Add tokens based on elapsed time
            elapsed = now - self.last_update
            self.tokens = min(
                self.capacity,
                self.tokens + elapsed * self.rate
            )
            self.last_update = now

            if self.tokens >= 1:
                self.tokens -= 1
                return True

            return False


# Usage: 10 requests/second, burst up to 20
limiter = TokenBucket(rate=10, capacity=20)

for i in range(25):
    if limiter.allow():
        print(f"Request {i}: Allowed")
    else:
        print(f"Request {i}: Rate limited")
```

**Pros**: Allows bursts, smooth rate
**Cons**: Requires state per client

### 2. Leaky Bucket

Requests enter a queue and are processed at fixed rate.

```python
from collections import deque
import threading
import time

class LeakyBucket:
    def __init__(self, rate: float, capacity: int):
        self.rate = rate          # Requests per second
        self.capacity = capacity  # Queue size
        self.queue = deque()
        self.lock = Lock()

        # Start leak thread
        threading.Thread(target=self._leak, daemon=True).start()

    def allow(self) -> bool:
        with self.lock:
            if len(self.queue) < self.capacity:
                self.queue.append(time.time())
                return True
            return False

    def _leak(self):
        interval = 1.0 / self.rate
        while True:
            time.sleep(interval)
            with self.lock:
                if self.queue:
                    self.queue.popleft()


# Usage
limiter = LeakyBucket(rate=5, capacity=10)
```

**Pros**: Smooth output rate
**Cons**: May delay requests, queue overhead

### 3. Fixed Window Counter

Count requests in fixed time windows.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                       FIXED WINDOW COUNTER                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Limit: 100 requests per minute                                           │
│                                                                             │
│   │ Window 1 (0:00-1:00) │ Window 2 (1:00-2:00) │ Window 3 (2:00-3:00) │  │
│   │                      │                      │                      │  │
│   │  ███████░░░ 70/100   │  █████████░ 90/100   │  ██░░░░░░░ 20/100   │  │
│   │  Requests            │  Requests            │  Requests            │  │
│   └──────────────────────┴──────────────────────┴──────────────────────┘  │
│                                                                             │
│   ⚠️ PROBLEM: Burst at window boundary!                                    │
│                                                                             │
│   │      Window 1        │      Window 2        │                          │
│   │                      │                      │                          │
│   │              ████████│████████              │                          │
│   │              90 req  │100 req               │                          │
│   │         at 0:59      │at 1:00               │                          │
│   └──────────────────────┴──────────────────────┘                          │
│                                                                             │
│   In 2 seconds (0:59 to 1:01): 190 requests allowed!                       │
│   This is nearly 2x the intended rate!                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

```python
import time
from collections import defaultdict

class FixedWindowCounter:
    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window_seconds = window_seconds
        self.counters = defaultdict(int)
        self.lock = Lock()

    def _get_window(self) -> int:
        return int(time.time() // self.window_seconds)

    def allow(self, client_id: str) -> bool:
        window = self._get_window()
        key = f"{client_id}:{window}"

        with self.lock:
            if self.counters[key] >= self.limit:
                return False

            self.counters[key] += 1

            # Cleanup old windows
            current_window = window
            old_keys = [k for k in self.counters if int(k.split(':')[1]) < current_window - 1]
            for k in old_keys:
                del self.counters[k]

            return True


# Usage: 100 requests per minute
limiter = FixedWindowCounter(limit=100, window_seconds=60)
```

**Pros**: Simple, low memory
**Cons**: Burst at window boundaries

### 4. Sliding Window Log

Track timestamp of each request, count requests in sliding window.

```python
import time
from collections import defaultdict

class SlidingWindowLog:
    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window_seconds = window_seconds
        self.logs = defaultdict(list)
        self.lock = Lock()

    def allow(self, client_id: str) -> bool:
        now = time.time()
        window_start = now - self.window_seconds

        with self.lock:
            # Remove old entries
            self.logs[client_id] = [
                ts for ts in self.logs[client_id]
                if ts > window_start
            ]

            if len(self.logs[client_id]) >= self.limit:
                return False

            self.logs[client_id].append(now)
            return True


# Usage
limiter = SlidingWindowLog(limit=100, window_seconds=60)
```

**Pros**: Accurate, no boundary issues
**Cons**: High memory usage

### 5. Sliding Window Counter

Combines fixed window efficiency with sliding window accuracy.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                      SLIDING WINDOW COUNTER                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Limit: 100 requests per minute                                           │
│   Current time: 1:15 (15 seconds into Window 2)                           │
│                                                                             │
│   │    Window 1 (0:00-1:00)    │    Window 2 (1:00-2:00)    │              │
│   │                            │                            │              │
│   │  ████████████ 84 requests │  ██████░░░░ 36 requests   │              │
│   │                            │                            │              │
│   └────────────────────────────┴────────────────────────────┘              │
│                                │◄─────────────────────────►│              │
│                                        15 seconds                          │
│                                        (25% of window)                     │
│                                                                             │
│   Weighted count = prev_window × (1 - progress) + curr_window              │
│                  = 84 × (1 - 0.25) + 36                                    │
│                  = 84 × 0.75 + 36                                          │
│                  = 63 + 36                                                 │
│                  = 99 requests                                             │
│                                                                             │
│   99 < 100 → ALLOW next request                                            │
│                                                                             │
│   ✓ No boundary burst problem                                             │
│   ✓ Memory efficient (only 2 counters per user)                           │
│   ✓ Approximation is very accurate in practice                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

```python
import time
from collections import defaultdict

class SlidingWindowCounter:
    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window_seconds = window_seconds
        self.counters = {}  # client_id -> {window: count}
        self.lock = Lock()

    def allow(self, client_id: str) -> bool:
        now = time.time()
        current_window = int(now // self.window_seconds)
        previous_window = current_window - 1

        # Position in current window (0.0 to 1.0)
        window_progress = (now % self.window_seconds) / self.window_seconds

        with self.lock:
            if client_id not in self.counters:
                self.counters[client_id] = {}

            client = self.counters[client_id]

            # Calculate weighted count
            prev_count = client.get(previous_window, 0)
            curr_count = client.get(current_window, 0)

            # Weight previous window by remaining portion
            weighted_count = prev_count * (1 - window_progress) + curr_count

            if weighted_count >= self.limit:
                return False

            client[current_window] = curr_count + 1

            # Cleanup old windows
            old_windows = [w for w in client if w < previous_window]
            for w in old_windows:
                del client[w]

            return True


# Usage
limiter = SlidingWindowCounter(limit=100, window_seconds=60)
```

**Pros**: Accurate, memory efficient
**Cons**: Slightly more complex

## Distributed Rate Limiting

### Redis-Based Implementation

```python
import redis
import time

class DistributedRateLimiter:
    def __init__(self, redis_client: redis.Redis, limit: int, window_seconds: int):
        self.redis = redis_client
        self.limit = limit
        self.window_seconds = window_seconds

    def allow(self, client_id: str) -> tuple[bool, dict]:
        now = time.time()
        window = int(now // self.window_seconds)
        key = f"ratelimit:{client_id}:{window}"

        # Use Lua script for atomicity
        script = """
        local current = redis.call('INCR', KEYS[1])
        if current == 1 then
            redis.call('EXPIRE', KEYS[1], ARGV[1])
        end
        return current
        """

        current = self.redis.eval(script, 1, key, self.window_seconds)

        allowed = current <= self.limit
        remaining = max(0, self.limit - current)
        reset_time = (window + 1) * self.window_seconds

        return allowed, {
            'limit': self.limit,
            'remaining': remaining,
            'reset': reset_time
        }


# Token bucket with Redis
class DistributedTokenBucket:
    def __init__(self, redis_client: redis.Redis, rate: float, capacity: int):
        self.redis = redis_client
        self.rate = rate
        self.capacity = capacity

    def allow(self, client_id: str) -> bool:
        key = f"tokenbucket:{client_id}"

        # Lua script for atomic token bucket
        script = """
        local tokens_key = KEYS[1] .. ':tokens'
        local timestamp_key = KEYS[1] .. ':ts'

        local rate = tonumber(ARGV[1])
        local capacity = tonumber(ARGV[2])
        local now = tonumber(ARGV[3])
        local requested = tonumber(ARGV[4])

        local last_tokens = tonumber(redis.call('GET', tokens_key)) or capacity
        local last_ts = tonumber(redis.call('GET', timestamp_key)) or now

        local elapsed = now - last_ts
        local new_tokens = math.min(capacity, last_tokens + elapsed * rate)

        if new_tokens >= requested then
            new_tokens = new_tokens - requested
            redis.call('SET', tokens_key, new_tokens)
            redis.call('SET', timestamp_key, now)
            redis.call('EXPIRE', tokens_key, 3600)
            redis.call('EXPIRE', timestamp_key, 3600)
            return 1
        end

        return 0
        """

        result = self.redis.eval(
            script, 1, key,
            self.rate, self.capacity, time.time(), 1
        )

        return result == 1
```

## Implementation Example

### Go - Production Rate Limiter

```go
package main

import (
	"context"
	"sync"
	"time"

	"github.com/go-redis/redis/v8"
)

type RateLimitResult struct {
	Allowed   bool
	Limit     int
	Remaining int
	ResetAt   time.Time
}

type RateLimiter interface {
	Allow(ctx context.Context, key string) RateLimitResult
}

// In-memory sliding window counter
type SlidingWindowLimiter struct {
	limit         int
	windowSeconds int
	counters      map[string]map[int64]int
	mu            sync.RWMutex
}

func NewSlidingWindowLimiter(limit int, windowSeconds int) *SlidingWindowLimiter {
	return &SlidingWindowLimiter{
		limit:         limit,
		windowSeconds: windowSeconds,
		counters:      make(map[string]map[int64]int),
	}
}

func (l *SlidingWindowLimiter) Allow(ctx context.Context, key string) RateLimitResult {
	now := time.Now()
	currentWindow := now.Unix() / int64(l.windowSeconds)
	previousWindow := currentWindow - 1

	windowProgress := float64(now.Unix()%int64(l.windowSeconds)) / float64(l.windowSeconds)

	l.mu.Lock()
	defer l.mu.Unlock()

	if l.counters[key] == nil {
		l.counters[key] = make(map[int64]int)
	}

	prevCount := l.counters[key][previousWindow]
	currCount := l.counters[key][currentWindow]

	weightedCount := float64(prevCount)*(1-windowProgress) + float64(currCount)

	if weightedCount >= float64(l.limit) {
		return RateLimitResult{
			Allowed:   false,
			Limit:     l.limit,
			Remaining: 0,
			ResetAt:   time.Unix((currentWindow+1)*int64(l.windowSeconds), 0),
		}
	}

	l.counters[key][currentWindow] = currCount + 1

	// Cleanup
	delete(l.counters[key], previousWindow-1)

	remaining := l.limit - int(weightedCount) - 1

	return RateLimitResult{
		Allowed:   true,
		Limit:     l.limit,
		Remaining: remaining,
		ResetAt:   time.Unix((currentWindow+1)*int64(l.windowSeconds), 0),
	}
}

// Redis-based distributed limiter
type RedisRateLimiter struct {
	client        *redis.Client
	limit         int
	windowSeconds int
}

func NewRedisRateLimiter(client *redis.Client, limit int, windowSeconds int) *RedisRateLimiter {
	return &RedisRateLimiter{
		client:        client,
		limit:         limit,
		windowSeconds: windowSeconds,
	}
}

func (l *RedisRateLimiter) Allow(ctx context.Context, key string) RateLimitResult {
	now := time.Now()
	window := now.Unix() / int64(l.windowSeconds)
	redisKey := key + ":" + string(rune(window))

	script := redis.NewScript(`
		local current = redis.call('INCR', KEYS[1])
		if current == 1 then
			redis.call('EXPIRE', KEYS[1], ARGV[1])
		end
		return current
	`)

	result, err := script.Run(ctx, l.client, []string{redisKey}, l.windowSeconds).Int()
	if err != nil {
		// On error, allow request (fail open)
		return RateLimitResult{Allowed: true, Limit: l.limit, Remaining: l.limit}
	}

	allowed := result <= l.limit
	remaining := l.limit - result
	if remaining < 0 {
		remaining = 0
	}

	return RateLimitResult{
		Allowed:   allowed,
		Limit:     l.limit,
		Remaining: remaining,
		ResetAt:   time.Unix((window+1)*int64(l.windowSeconds), 0),
	}
}

// HTTP middleware
func RateLimitMiddleware(limiter RateLimiter, keyFunc func(*http.Request) string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			key := keyFunc(r)
			result := limiter.Allow(r.Context(), key)

			// Set headers
			w.Header().Set("X-RateLimit-Limit", strconv.Itoa(result.Limit))
			w.Header().Set("X-RateLimit-Remaining", strconv.Itoa(result.Remaining))
			w.Header().Set("X-RateLimit-Reset", strconv.FormatInt(result.ResetAt.Unix(), 10))

			if !result.Allowed {
				w.Header().Set("Retry-After", strconv.FormatInt(result.ResetAt.Unix()-time.Now().Unix(), 10))
				http.Error(w, "Rate limit exceeded", http.StatusTooManyRequests)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}

func main() {
	// In-memory limiter for single instance
	limiter := NewSlidingWindowLimiter(100, 60) // 100 req/min

	// Or distributed limiter
	// rdb := redis.NewClient(&redis.Options{Addr: "localhost:6379"})
	// limiter := NewRedisRateLimiter(rdb, 100, 60)

	mux := http.NewServeMux()
	mux.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	// Apply middleware
	handler := RateLimitMiddleware(limiter, func(r *http.Request) string {
		// Key by IP or API key
		if apiKey := r.Header.Get("X-API-Key"); apiKey != "" {
			return "apikey:" + apiKey
		}
		return "ip:" + r.RemoteAddr
	})(mux)

	http.ListenAndServe(":8080", handler)
}
```

## Rate Limiting Strategies

### Per-User Limiting

```python
# Different limits for different user tiers
TIER_LIMITS = {
    'free': {'limit': 100, 'window': 3600},      # 100/hour
    'pro': {'limit': 1000, 'window': 3600},      # 1000/hour
    'enterprise': {'limit': 10000, 'window': 3600}  # 10000/hour
}

def get_limit(user):
    tier = user.subscription_tier
    return TIER_LIMITS.get(tier, TIER_LIMITS['free'])
```

### Per-Endpoint Limiting

```python
ENDPOINT_LIMITS = {
    '/api/search': {'limit': 10, 'window': 60},    # Expensive
    '/api/users': {'limit': 100, 'window': 60},    # Normal
    '/api/health': {'limit': 1000, 'window': 60}   # Cheap
}
```

### Adaptive Rate Limiting

```python
class AdaptiveRateLimiter:
    def __init__(self, base_limit: int):
        self.base_limit = base_limit
        self.current_limit = base_limit
        self.error_rate = 0.0

    def update_limit(self, backend_error_rate: float):
        """Reduce limit when backend is struggling"""
        if backend_error_rate > 0.1:  # >10% errors
            self.current_limit = int(self.base_limit * 0.5)
        elif backend_error_rate > 0.05:
            self.current_limit = int(self.base_limit * 0.75)
        else:
            self.current_limit = self.base_limit
```

## Common Interview Questions

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **How do you rate limit in a distributed system?**
   - Centralized store (Redis)
   - Sticky sessions
   - Local + global limits

2. **What happens when rate limit is exceeded?**
   - Return 429 Too Many Requests
   - Include Retry-After header
   - Log for monitoring

3. **How do you prevent DDoS with rate limiting?**
   - Rate limit by IP at edge
   - Use CDN's DDoS protection
   - Implement CAPTCHAs

4. **Token bucket vs sliding window - when to use each?**
   - Token bucket: Allow bursts, smooth average
   - Sliding window: Strict limit, no bursts

</div>

## Best Practices

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **Return informative headers** - Let clients know their limits
2. **Fail open** - Allow requests if rate limiter fails
3. **Use multiple dimensions** - IP + user + endpoint
4. **Monitor and alert** - Track rate limit hits
5. **Provide quotas** - Let users check their usage
6. **Implement graceful degradation** - Reduce features under load

</div>

## Related Topics

- [API Gateway](/topic/system-design/api-gateway)
- [Load Balancing](/topic/system-design/load-balancing)
- [Caching](/topic/system-design/caching)
