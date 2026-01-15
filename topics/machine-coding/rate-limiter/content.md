# Rate Limiter

## Problem Statement

Design a rate limiter that controls the rate of requests a client can make to an API. Support configurable limits like "100 requests per minute per user".

## Requirements

- Limit requests per time window
- Support per-user/per-IP limits
- Return remaining quota
- Handle concurrent requests

## Algorithms

### 1. Token Bucket

Tokens accumulate at fixed rate. Each request consumes a token.

### 2. Sliding Window Counter

Count requests in a sliding time window.

### 3. Fixed Window Counter

Count requests in fixed time intervals.

## Solution

### Python - Token Bucket

```python
import time
import threading
from dataclasses import dataclass

@dataclass
class RateLimitResult:
    allowed: bool
    remaining: int
    reset_at: float


class TokenBucket:
    def __init__(self, rate: float, capacity: int):
        self.rate = rate  # tokens per second
        self.capacity = capacity
        self.tokens = capacity
        self.last_update = time.time()
        self.lock = threading.Lock()

    def allow(self, tokens: int = 1) -> RateLimitResult:
        with self.lock:
            now = time.time()

            # Refill tokens
            elapsed = now - self.last_update
            self.tokens = min(self.capacity, self.tokens + elapsed * self.rate)
            self.last_update = now

            if self.tokens >= tokens:
                self.tokens -= tokens
                return RateLimitResult(
                    allowed=True,
                    remaining=int(self.tokens),
                    reset_at=now + (self.capacity - self.tokens) / self.rate
                )

            return RateLimitResult(
                allowed=False,
                remaining=0,
                reset_at=now + (tokens - self.tokens) / self.rate
            )


class RateLimiter:
    def __init__(self, rate: float, capacity: int):
        self.rate = rate
        self.capacity = capacity
        self.buckets = {}
        self.lock = threading.Lock()

    def _get_bucket(self, key: str) -> TokenBucket:
        with self.lock:
            if key not in self.buckets:
                self.buckets[key] = TokenBucket(self.rate, self.capacity)
            return self.buckets[key]

    def allow(self, key: str, tokens: int = 1) -> RateLimitResult:
        bucket = self._get_bucket(key)
        return bucket.allow(tokens)


# Usage
limiter = RateLimiter(rate=10, capacity=20)  # 10 req/sec, burst 20

for i in range(25):
    result = limiter.allow("user:123")
    print(f"Request {i+1}: {'✓' if result.allowed else '✗'} (remaining: {result.remaining})")
```

### Python - Sliding Window Counter

```python
import time
import threading
from collections import defaultdict

class SlidingWindowLimiter:
    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window_seconds = window_seconds
        self.counters = defaultdict(lambda: defaultdict(int))
        self.lock = threading.Lock()

    def allow(self, key: str) -> tuple[bool, int, float]:
        now = time.time()
        current_window = int(now // self.window_seconds)
        previous_window = current_window - 1
        window_progress = (now % self.window_seconds) / self.window_seconds

        with self.lock:
            prev_count = self.counters[key].get(previous_window, 0)
            curr_count = self.counters[key].get(current_window, 0)

            # Weighted count
            weighted = prev_count * (1 - window_progress) + curr_count

            if weighted >= self.limit:
                reset_at = (current_window + 1) * self.window_seconds
                return False, 0, reset_at

            self.counters[key][current_window] = curr_count + 1

            # Cleanup old windows
            for window in list(self.counters[key].keys()):
                if window < previous_window:
                    del self.counters[key][window]

            remaining = int(self.limit - weighted - 1)
            reset_at = (current_window + 1) * self.window_seconds
            return True, remaining, reset_at
```

### Go - Token Bucket with Redis

```go
package main

import (
	"sync"
	"time"
)

type TokenBucket struct {
	rate       float64
	capacity   float64
	tokens     float64
	lastUpdate time.Time
	mu         sync.Mutex
}

func NewTokenBucket(rate, capacity float64) *TokenBucket {
	return &TokenBucket{
		rate:       rate,
		capacity:   capacity,
		tokens:     capacity,
		lastUpdate: time.Now(),
	}
}

func (tb *TokenBucket) Allow(tokens float64) bool {
	tb.mu.Lock()
	defer tb.mu.Unlock()

	now := time.Now()
	elapsed := now.Sub(tb.lastUpdate).Seconds()

	tb.tokens = min(tb.capacity, tb.tokens+elapsed*tb.rate)
	tb.lastUpdate = now

	if tb.tokens >= tokens {
		tb.tokens -= tokens
		return true
	}
	return false
}

func (tb *TokenBucket) Remaining() int {
	tb.mu.Lock()
	defer tb.mu.Unlock()
	return int(tb.tokens)
}

type RateLimiter struct {
	rate     float64
	capacity float64
	buckets  map[string]*TokenBucket
	mu       sync.RWMutex
}

func NewRateLimiter(rate, capacity float64) *RateLimiter {
	return &RateLimiter{
		rate:     rate,
		capacity: capacity,
		buckets:  make(map[string]*TokenBucket),
	}
}

func (rl *RateLimiter) Allow(key string) bool {
	rl.mu.Lock()
	bucket, exists := rl.buckets[key]
	if !exists {
		bucket = NewTokenBucket(rl.rate, rl.capacity)
		rl.buckets[key] = bucket
	}
	rl.mu.Unlock()

	return bucket.Allow(1)
}

func min(a, b float64) float64 {
	if a < b {
		return a
	}
	return b
}

func main() {
	limiter := NewRateLimiter(5, 10) // 5 req/sec, burst 10

	for i := 0; i < 15; i++ {
		if limiter.Allow("user:123") {
			println("Request", i+1, "allowed")
		} else {
			println("Request", i+1, "denied")
		}
	}
}
```

## Algorithm Comparison

| Algorithm | Pros | Cons |
|-----------|------|------|
| Token Bucket | Allows bursts, smooth | Memory per client |
| Sliding Window | Accurate | More computation |
| Fixed Window | Simple | Boundary issues |

## Interview Tips

- Discuss trade-offs between algorithms
- Consider distributed rate limiting (Redis)
- Handle edge cases (clock skew, concurrent requests)
- Mention rate limit headers (X-RateLimit-*)
