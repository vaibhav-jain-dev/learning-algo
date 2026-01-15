# Rate Limiter

## Problem Statement

Design a rate limiter that controls the rate of requests a client can make to an API. Support configurable limits like "100 requests per minute per user".

**Difficulty:** L2 - Intermediate (Requires understanding of distributed systems)
**Common In:** System Design Interviews, Machine Coding Rounds
**Companies:** Stripe, Cloudflare, AWS, Google, Uber, Netflix

---

## Intuitive Understanding

<div class="metaphor-card">
  <div class="metaphor-icon">🚰</div>
  <div class="metaphor-title">Think of a Water Tank with a Tap</div>
  <div class="metaphor-description">
    Imagine a water tank (Token Bucket) with:
    - A steady drip filling it (tokens added at fixed rate)
    - A maximum capacity (bucket can't overflow)
    - People taking cups of water (requests consuming tokens)

    If someone tries to take water when the tank is empty, they must wait.
    If they wait long enough, more water drips in. The tank smooths out bursty demand.
  </div>
  <div class="metaphor-mapping">
    <div class="mapping-item">
      <span class="real">Water in tank</span>
      <span class="arrow">→</span>
      <span class="concept">Available tokens</span>
    </div>
    <div class="mapping-item">
      <span class="real">Drip rate</span>
      <span class="arrow">→</span>
      <span class="concept">Refill rate (tokens/sec)</span>
    </div>
    <div class="mapping-item">
      <span class="real">Tank capacity</span>
      <span class="arrow">→</span>
      <span class="concept">Bucket capacity (burst limit)</span>
    </div>
    <div class="mapping-item">
      <span class="real">Taking a cup</span>
      <span class="arrow">→</span>
      <span class="concept">Consuming a token</span>
    </div>
    <div class="mapping-item">
      <span class="real">Tank empty - must wait</span>
      <span class="arrow">→</span>
      <span class="concept">Rate limited - 429 response</span>
    </div>
  </div>
</div>

### The 20-Year Insight

**Novice thinks:** "Just count requests and reject if over limit"

**Expert knows:** "Rate limiting is about **fairness, predictability, and graceful degradation**. The algorithm choice affects user experience. Token bucket allows bursts for interactive users. Sliding window prevents gaming at boundaries. In distributed systems, you're trading off accuracy vs latency vs consistency."

```
┌────────────────────────────────────────────────────────────────────┐
│  The Real Challenges of Production Rate Limiting                   │
│                                                                    │
│  1. DISTRIBUTED STATE                                              │
│     └─ How do 50 servers agree on a user's request count?          │
│                                                                    │
│  2. CLOCK SYNCHRONIZATION                                          │
│     └─ Different servers have slightly different clocks            │
│                                                                    │
│  3. RACE CONDITIONS                                                │
│     └─ 1000 requests hit different servers simultaneously          │
│                                                                    │
│  4. PERFORMANCE                                                    │
│     └─ Rate limiter can't be slower than the request itself        │
│                                                                    │
│  5. FAILURE MODES                                                  │
│     └─ What happens when Redis is down?                            │
└────────────────────────────────────────────────────────────────────┘
```

---

## Requirements

### Functional Requirements
- Limit requests per time window (e.g., 100 req/min)
- Support per-user, per-IP, per-API-key limits
- Return remaining quota and reset time
- Handle concurrent requests correctly

### Non-Functional Requirements
- Low latency (< 1ms overhead)
- High availability (can't block all requests if limiter fails)
- Accurate (minimize over/under counting)
- Scalable (millions of users)

---

## Algorithms Deep Dive

### 1. Token Bucket

**How it works:**
- Bucket holds tokens up to a maximum capacity
- Tokens added at a fixed rate (e.g., 10/second)
- Each request consumes one or more tokens
- If not enough tokens, request is rejected

```
Time 0:     [████████████] 10 tokens (full)
Request 1:  [███████████-] 9 tokens
Request 2:  [██████████--] 8 tokens
...
Request 10: [------------] 0 tokens
Request 11: REJECTED (no tokens)
After 1s:   [██████████--] 10 new tokens added
```

**Pros:**
- Allows bursts (great for interactive users)
- Smooth rate limiting
- Memory efficient (just store count + timestamp)

**Cons:**
- Burst can overwhelm downstream services
- Complex to implement distributed version

**Best for:** APIs where occasional bursts are acceptable

### 2. Leaky Bucket

**How it works:**
- Requests enter a queue (bucket)
- Requests "leak" out at a fixed rate
- If queue is full, requests are rejected

```
Queue: [R1][R2][R3][R4][  ][  ] capacity=6

Processing: R1 leaks out every 100ms (10 req/s)
            ↓
            [R2][R3][R4][  ][  ][  ]

New request arrives:
            [R2][R3][R4][R5][  ][  ]
```

**Pros:**
- Constant output rate (smooth traffic)
- Protects downstream services

**Cons:**
- Doesn't allow bursts
- Requests may wait in queue

**Best for:** When downstream service needs constant traffic rate

### 3. Fixed Window Counter

**How it works:**
- Divide time into fixed windows (e.g., 1-minute windows)
- Count requests in current window
- Reset count at window boundary

```
Window 1 (00:00-00:59): 45/100 requests
Window 2 (01:00-01:59): 0/100 requests
Window 3 (02:00-02:59): 78/100 requests
```

**Pros:**
- Simple to implement
- Memory efficient (one counter per window)

**Cons:**
- Boundary problem: 100 requests at 00:59, 100 more at 01:00 = 200 in 1 minute

**Best for:** Simple use cases, internal services

### 4. Sliding Window Log

**How it works:**
- Store timestamp of each request
- Count requests in last N seconds by filtering timestamps
- Remove old timestamps

```python
timestamps = [10:00:01, 10:00:15, 10:00:45, 10:01:02, 10:01:30]

Current time: 10:01:45
Window: 1 minute

Requests in window: [10:00:45, 10:01:02, 10:01:30] = 3 requests
(10:00:01 and 10:00:15 are outside window)
```

**Pros:**
- Most accurate
- No boundary problem

**Cons:**
- Memory intensive (store all timestamps)
- Expensive computation

**Best for:** When accuracy is critical, low-volume APIs

### 5. Sliding Window Counter (Hybrid)

**How it works:**
- Combine fixed window efficiency with sliding window accuracy
- Weighted count based on position in current window

```
Previous window: 42 requests
Current window: 18 requests
Current position: 30% into window

Weighted count = 42 * 0.7 + 18 * 1.0 = 29.4 + 18 = 47.4 requests
```

**Pros:**
- Memory efficient
- Good accuracy
- Simple to implement

**Cons:**
- Approximation, not exact

**Best for:** Most production use cases (best balance)

---

## Algorithm Comparison Matrix

| Algorithm | Accuracy | Memory | Burst Handling | Complexity | Distributed |
|-----------|----------|--------|----------------|------------|-------------|
| Token Bucket | Good | O(1) | ✅ Allows | Medium | Hard |
| Leaky Bucket | Good | O(1) | ❌ Smooths | Medium | Hard |
| Fixed Window | Fair | O(1) | ⚠️ Edge case | Easy | Easy |
| Sliding Log | Exact | O(n) | ❌ None | Easy | Medium |
| Sliding Counter | Good | O(1) | ⚠️ Partial | Medium | Easy |

---

## Implementation

### Python - Production-Grade Token Bucket

```python
import time
import threading
from dataclasses import dataclass
from typing import Dict, Optional, Tuple
from abc import ABC, abstractmethod
import logging

logger = logging.getLogger(__name__)


@dataclass
class RateLimitResult:
    """Result of a rate limit check."""
    allowed: bool
    remaining: int
    reset_at: float
    retry_after: Optional[float] = None


class RateLimitStrategy(ABC):
    """Abstract base for rate limiting algorithms."""

    @abstractmethod
    def allow(self, key: str, tokens: int = 1) -> RateLimitResult:
        pass

    @abstractmethod
    def get_state(self, key: str) -> dict:
        pass


class TokenBucket:
    """
    Thread-safe token bucket implementation.

    Allows bursts up to capacity, refills at a steady rate.
    """

    def __init__(self, rate: float, capacity: int):
        """
        Args:
            rate: Tokens added per second
            capacity: Maximum tokens in bucket
        """
        self.rate = rate
        self.capacity = capacity
        self.tokens = float(capacity)
        self.last_update = time.time()
        self.lock = threading.Lock()

    def _refill(self, now: float) -> None:
        """Add tokens based on elapsed time."""
        elapsed = now - self.last_update
        self.tokens = min(self.capacity, self.tokens + elapsed * self.rate)
        self.last_update = now

    def allow(self, tokens: int = 1) -> RateLimitResult:
        """
        Attempt to consume tokens.

        Returns:
            RateLimitResult with allowed status and metadata
        """
        with self.lock:
            now = time.time()
            self._refill(now)

            if self.tokens >= tokens:
                self.tokens -= tokens
                return RateLimitResult(
                    allowed=True,
                    remaining=int(self.tokens),
                    reset_at=now + (self.capacity - self.tokens) / self.rate
                )

            # Calculate when enough tokens will be available
            tokens_needed = tokens - self.tokens
            wait_time = tokens_needed / self.rate

            return RateLimitResult(
                allowed=False,
                remaining=0,
                reset_at=now + wait_time,
                retry_after=wait_time
            )

    def get_state(self) -> dict:
        """Return current bucket state for debugging."""
        with self.lock:
            now = time.time()
            self._refill(now)
            return {
                "tokens": self.tokens,
                "capacity": self.capacity,
                "rate": self.rate,
            }


class SlidingWindowCounter:
    """
    Sliding window counter implementation.

    More accurate than fixed window, more efficient than sliding log.
    """

    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window_seconds = window_seconds
        self.prev_count = 0
        self.curr_count = 0
        self.curr_window_start = 0
        self.lock = threading.Lock()

    def allow(self, tokens: int = 1) -> RateLimitResult:
        with self.lock:
            now = time.time()
            current_window = int(now // self.window_seconds)

            # Rotate windows if needed
            if current_window != self.curr_window_start:
                if current_window == self.curr_window_start + 1:
                    self.prev_count = self.curr_count
                else:
                    self.prev_count = 0  # Gap in requests
                self.curr_count = 0
                self.curr_window_start = current_window

            # Calculate weighted count
            window_progress = (now % self.window_seconds) / self.window_seconds
            weighted_count = self.prev_count * (1 - window_progress) + self.curr_count

            reset_at = (current_window + 1) * self.window_seconds

            if weighted_count + tokens > self.limit:
                retry_after = reset_at - now
                return RateLimitResult(
                    allowed=False,
                    remaining=0,
                    reset_at=reset_at,
                    retry_after=retry_after
                )

            self.curr_count += tokens
            remaining = max(0, int(self.limit - weighted_count - tokens))

            return RateLimitResult(
                allowed=True,
                remaining=remaining,
                reset_at=reset_at
            )

    def get_state(self) -> dict:
        with self.lock:
            now = time.time()
            window_progress = (now % self.window_seconds) / self.window_seconds
            weighted = self.prev_count * (1 - window_progress) + self.curr_count
            return {
                "prev_count": self.prev_count,
                "curr_count": self.curr_count,
                "weighted_count": weighted,
                "limit": self.limit,
            }


class LeakyBucket:
    """
    Leaky bucket implementation.

    Smooths traffic to a constant rate, queuing excess requests.
    """

    def __init__(self, rate: float, capacity: int):
        """
        Args:
            rate: Requests processed per second
            capacity: Maximum queue size
        """
        self.rate = rate
        self.capacity = capacity
        self.water = 0.0  # Current water level (pending requests)
        self.last_leak = time.time()
        self.lock = threading.Lock()

    def _leak(self, now: float) -> None:
        """Remove water based on elapsed time."""
        elapsed = now - self.last_leak
        leaked = elapsed * self.rate
        self.water = max(0, self.water - leaked)
        self.last_leak = now

    def allow(self, tokens: int = 1) -> RateLimitResult:
        with self.lock:
            now = time.time()
            self._leak(now)

            if self.water + tokens <= self.capacity:
                self.water += tokens
                remaining = int(self.capacity - self.water)
                leak_time = self.water / self.rate
                return RateLimitResult(
                    allowed=True,
                    remaining=remaining,
                    reset_at=now + leak_time
                )

            # Bucket full - calculate when space available
            overflow = self.water + tokens - self.capacity
            wait_time = overflow / self.rate

            return RateLimitResult(
                allowed=False,
                remaining=0,
                reset_at=now + wait_time,
                retry_after=wait_time
            )


# ============================================================
# RATE LIMITER SERVICE
# ============================================================

class RateLimiter:
    """
    Production-grade rate limiter service.

    Features:
    - Multiple algorithm support
    - Per-key limiting
    - Configurable rules
    - Metrics collection
    """

    def __init__(
        self,
        algorithm: str = "token_bucket",
        default_rate: float = 10.0,
        default_capacity: int = 20,
        default_window: int = 60,
        default_limit: int = 100
    ):
        self.algorithm = algorithm
        self.default_rate = default_rate
        self.default_capacity = default_capacity
        self.default_window = default_window
        self.default_limit = default_limit

        self.buckets: Dict[str, RateLimitStrategy] = {}
        self.lock = threading.Lock()
        self.metrics = {
            "allowed": 0,
            "rejected": 0,
            "by_key": {}
        }

    def _create_bucket(self, key: str) -> RateLimitStrategy:
        """Create rate limit bucket for key."""
        if self.algorithm == "token_bucket":
            return TokenBucket(self.default_rate, self.default_capacity)
        elif self.algorithm == "sliding_window":
            return SlidingWindowCounter(self.default_limit, self.default_window)
        elif self.algorithm == "leaky_bucket":
            return LeakyBucket(self.default_rate, self.default_capacity)
        else:
            return TokenBucket(self.default_rate, self.default_capacity)

    def _get_bucket(self, key: str) -> RateLimitStrategy:
        """Get or create bucket for key."""
        with self.lock:
            if key not in self.buckets:
                self.buckets[key] = self._create_bucket(key)
            return self.buckets[key]

    def allow(self, key: str, tokens: int = 1) -> RateLimitResult:
        """
        Check if request is allowed.

        Args:
            key: Unique identifier (user ID, IP, API key)
            tokens: Number of tokens to consume (default 1)

        Returns:
            RateLimitResult with decision and metadata
        """
        bucket = self._get_bucket(key)
        result = bucket.allow(tokens)

        # Update metrics
        if result.allowed:
            self.metrics["allowed"] += 1
        else:
            self.metrics["rejected"] += 1

        if key not in self.metrics["by_key"]:
            self.metrics["by_key"][key] = {"allowed": 0, "rejected": 0}
        self.metrics["by_key"][key]["allowed" if result.allowed else "rejected"] += 1

        return result

    def get_metrics(self) -> dict:
        """Return limiter metrics."""
        return dict(self.metrics)

    def cleanup_old_buckets(self, max_idle_seconds: int = 3600) -> int:
        """Remove buckets that haven't been used recently."""
        # In production, would check last access time
        return 0


# ============================================================
# HTTP MIDDLEWARE
# ============================================================

def rate_limit_middleware(limiter: RateLimiter, key_extractor):
    """
    Create rate limiting middleware for web frameworks.

    Example:
        limiter = RateLimiter()
        middleware = rate_limit_middleware(limiter, lambda req: req.user_id)
    """
    def middleware(request):
        key = key_extractor(request)
        result = limiter.allow(key)

        # Set rate limit headers
        headers = {
            "X-RateLimit-Limit": str(limiter.default_limit),
            "X-RateLimit-Remaining": str(result.remaining),
            "X-RateLimit-Reset": str(int(result.reset_at)),
        }

        if not result.allowed:
            headers["Retry-After"] = str(int(result.retry_after or 1))
            return {
                "status": 429,
                "headers": headers,
                "body": {"error": "Rate limit exceeded"}
            }

        return {"headers": headers, "continue": True}

    return middleware


# ============================================================
# USAGE EXAMPLES
# ============================================================

if __name__ == "__main__":
    # Token Bucket example
    print("=== Token Bucket ===")
    limiter = RateLimiter(algorithm="token_bucket", default_rate=5, default_capacity=10)

    for i in range(15):
        result = limiter.allow("user:123")
        status = "✓" if result.allowed else "✗"
        print(f"Request {i+1:2d}: {status} | Remaining: {result.remaining}")

    print(f"\nMetrics: {limiter.get_metrics()}")

    # Sliding Window example
    print("\n=== Sliding Window ===")
    limiter2 = RateLimiter(algorithm="sliding_window", default_limit=5, default_window=10)

    for i in range(8):
        result = limiter2.allow("api_key:abc")
        status = "✓" if result.allowed else "✗"
        retry = f"(retry in {result.retry_after:.1f}s)" if result.retry_after else ""
        print(f"Request {i+1}: {status} | Remaining: {result.remaining} {retry}")

    print(f"\nMetrics: {limiter2.get_metrics()}")
```

### Go - Distributed Rate Limiter with Redis

```go
package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

// ============================================================
// PRODUCTION RATE LIMITER IN GO
// Features: Multiple algorithms, distributed support, metrics
// ============================================================

type RateLimitResult struct {
	Allowed    bool
	Remaining  int
	ResetAt    time.Time
	RetryAfter time.Duration
}

type RateLimiter interface {
	Allow(key string, tokens int) RateLimitResult
	GetState(key string) map[string]interface{}
}

// ============================================================
// TOKEN BUCKET
// ============================================================

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

func (tb *TokenBucket) refill(now time.Time) {
	elapsed := now.Sub(tb.lastUpdate).Seconds()
	tb.tokens = min(tb.capacity, tb.tokens+elapsed*tb.rate)
	tb.lastUpdate = now
}

func (tb *TokenBucket) Allow(tokens int) RateLimitResult {
	tb.mu.Lock()
	defer tb.mu.Unlock()

	now := time.Now()
	tb.refill(now)

	tokensF := float64(tokens)
	if tb.tokens >= tokensF {
		tb.tokens -= tokensF
		resetTime := now.Add(time.Duration((tb.capacity-tb.tokens)/tb.rate) * time.Second)
		return RateLimitResult{
			Allowed:   true,
			Remaining: int(tb.tokens),
			ResetAt:   resetTime,
		}
	}

	tokensNeeded := tokensF - tb.tokens
	waitTime := time.Duration(tokensNeeded/tb.rate*1000) * time.Millisecond

	return RateLimitResult{
		Allowed:    false,
		Remaining:  0,
		ResetAt:    now.Add(waitTime),
		RetryAfter: waitTime,
	}
}

// ============================================================
// SLIDING WINDOW COUNTER
// ============================================================

type SlidingWindowCounter struct {
	limit           int
	windowSeconds   int
	prevCount       int
	currCount       int
	currWindowStart int64
	mu              sync.Mutex
}

func NewSlidingWindowCounter(limit, windowSeconds int) *SlidingWindowCounter {
	return &SlidingWindowCounter{
		limit:         limit,
		windowSeconds: windowSeconds,
	}
}

func (sw *SlidingWindowCounter) Allow(tokens int) RateLimitResult {
	sw.mu.Lock()
	defer sw.mu.Unlock()

	now := time.Now()
	nowSec := now.Unix()
	currentWindow := nowSec / int64(sw.windowSeconds)

	// Rotate windows
	if currentWindow != sw.currWindowStart {
		if currentWindow == sw.currWindowStart+1 {
			sw.prevCount = sw.currCount
		} else {
			sw.prevCount = 0
		}
		sw.currCount = 0
		sw.currWindowStart = currentWindow
	}

	// Calculate weighted count
	windowProgress := float64(nowSec%int64(sw.windowSeconds)) / float64(sw.windowSeconds)
	weightedCount := float64(sw.prevCount)*(1-windowProgress) + float64(sw.currCount)

	resetAt := time.Unix((currentWindow+1)*int64(sw.windowSeconds), 0)

	if int(weightedCount)+tokens > sw.limit {
		retryAfter := resetAt.Sub(now)
		return RateLimitResult{
			Allowed:    false,
			Remaining:  0,
			ResetAt:    resetAt,
			RetryAfter: retryAfter,
		}
	}

	sw.currCount += tokens
	remaining := max(0, sw.limit-int(weightedCount)-tokens)

	return RateLimitResult{
		Allowed:   true,
		Remaining: remaining,
		ResetAt:   resetAt,
	}
}

// ============================================================
// DISTRIBUTED RATE LIMITER (with simulated Redis)
// ============================================================

type DistributedRateLimiter struct {
	store         sync.Map // Simulates Redis
	limit         int
	windowSeconds int
	mu            sync.Mutex
}

func NewDistributedRateLimiter(limit, windowSeconds int) *DistributedRateLimiter {
	return &DistributedRateLimiter{
		limit:         limit,
		windowSeconds: windowSeconds,
	}
}

func (d *DistributedRateLimiter) Allow(key string, tokens int) RateLimitResult {
	now := time.Now()
	currentWindow := now.Unix() / int64(d.windowSeconds)
	windowKey := fmt.Sprintf("%s:%d", key, currentWindow)
	prevWindowKey := fmt.Sprintf("%s:%d", key, currentWindow-1)

	// Atomic increment (in Redis: INCR)
	d.mu.Lock()

	// Get previous window count
	prevCount := 0
	if val, ok := d.store.Load(prevWindowKey); ok {
		prevCount = val.(int)
	}

	// Get current window count
	currCount := 0
	if val, ok := d.store.Load(windowKey); ok {
		currCount = val.(int)
	}

	// Calculate weighted
	windowProgress := float64(now.Unix()%int64(d.windowSeconds)) / float64(d.windowSeconds)
	weightedCount := float64(prevCount)*(1-windowProgress) + float64(currCount)

	resetAt := time.Unix((currentWindow+1)*int64(d.windowSeconds), 0)

	if int(weightedCount)+tokens > d.limit {
		d.mu.Unlock()
		return RateLimitResult{
			Allowed:    false,
			Remaining:  0,
			ResetAt:    resetAt,
			RetryAfter: resetAt.Sub(now),
		}
	}

	// Increment counter
	d.store.Store(windowKey, currCount+tokens)
	d.mu.Unlock()

	remaining := max(0, d.limit-int(weightedCount)-tokens)
	return RateLimitResult{
		Allowed:   true,
		Remaining: remaining,
		ResetAt:   resetAt,
	}
}

// ============================================================
// RATE LIMITER SERVICE
// ============================================================

type RateLimiterService struct {
	algorithm    string
	buckets      sync.Map
	rate         float64
	capacity     float64
	limit        int
	windowSecs   int

	// Metrics
	allowed  int64
	rejected int64
	mu       sync.Mutex
}

func NewRateLimiterService(algorithm string, options map[string]interface{}) *RateLimiterService {
	s := &RateLimiterService{
		algorithm:  algorithm,
		rate:       10.0,
		capacity:   20.0,
		limit:      100,
		windowSecs: 60,
	}

	if v, ok := options["rate"].(float64); ok {
		s.rate = v
	}
	if v, ok := options["capacity"].(float64); ok {
		s.capacity = v
	}
	if v, ok := options["limit"].(int); ok {
		s.limit = v
	}
	if v, ok := options["window"].(int); ok {
		s.windowSecs = v
	}

	return s
}

func (s *RateLimiterService) Allow(key string) RateLimitResult {
	// Get or create limiter for key
	limiter, _ := s.buckets.LoadOrStore(key, s.createLimiter())

	var result RateLimitResult
	switch l := limiter.(type) {
	case *TokenBucket:
		result = l.Allow(1)
	case *SlidingWindowCounter:
		result = l.Allow(1)
	}

	// Update metrics
	s.mu.Lock()
	if result.Allowed {
		s.allowed++
	} else {
		s.rejected++
	}
	s.mu.Unlock()

	return result
}

func (s *RateLimiterService) createLimiter() interface{} {
	switch s.algorithm {
	case "sliding_window":
		return NewSlidingWindowCounter(s.limit, s.windowSecs)
	default:
		return NewTokenBucket(s.rate, s.capacity)
	}
}

func (s *RateLimiterService) GetMetrics() map[string]int64 {
	s.mu.Lock()
	defer s.mu.Unlock()
	return map[string]int64{
		"allowed":  s.allowed,
		"rejected": s.rejected,
	}
}

// ============================================================
// HTTP MIDDLEWARE
// ============================================================

type RateLimitMiddleware struct {
	limiter      *RateLimiterService
	keyExtractor func(r interface{}) string
}

func NewRateLimitMiddleware(
	limiter *RateLimiterService,
	keyExtractor func(r interface{}) string,
) *RateLimitMiddleware {
	return &RateLimitMiddleware{
		limiter:      limiter,
		keyExtractor: keyExtractor,
	}
}

func (m *RateLimitMiddleware) Handle(request interface{}) (map[string]string, bool) {
	key := m.keyExtractor(request)
	result := m.limiter.Allow(key)

	headers := map[string]string{
		"X-RateLimit-Remaining": fmt.Sprintf("%d", result.Remaining),
		"X-RateLimit-Reset":     fmt.Sprintf("%d", result.ResetAt.Unix()),
	}

	if !result.Allowed {
		headers["Retry-After"] = fmt.Sprintf("%d", int(result.RetryAfter.Seconds()))
	}

	return headers, result.Allowed
}

// ============================================================
// USAGE
// ============================================================

func main() {
	ctx := context.Background()
	_ = ctx // Would use for cancellation in production

	// Token bucket example
	fmt.Println("=== Token Bucket ===")
	service := NewRateLimiterService("token_bucket", map[string]interface{}{
		"rate":     5.0,
		"capacity": 10.0,
	})

	for i := 0; i < 15; i++ {
		result := service.Allow("user:123")
		status := "✓"
		if !result.Allowed {
			status = "✗"
		}
		fmt.Printf("Request %2d: %s | Remaining: %d\n", i+1, status, result.Remaining)
	}

	fmt.Printf("Metrics: %v\n", service.GetMetrics())

	// Sliding window example
	fmt.Println("\n=== Sliding Window ===")
	service2 := NewRateLimiterService("sliding_window", map[string]interface{}{
		"limit":  5,
		"window": 10,
	})

	for i := 0; i < 8; i++ {
		result := service2.Allow("api:xyz")
		status := "✓"
		retryInfo := ""
		if !result.Allowed {
			status = "✗"
			retryInfo = fmt.Sprintf(" (retry in %.1fs)", result.RetryAfter.Seconds())
		}
		fmt.Printf("Request %d: %s | Remaining: %d%s\n", i+1, status, result.Remaining, retryInfo)
	}
}

func min(a, b float64) float64 {
	if a < b {
		return a
	}
	return b
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
```

---

## Production War Stories

<div class="war-story">
  <div class="war-story-header">
    <span class="war-story-icon">💥</span>
    <span class="war-story-title">The Rate Limiter That Blocked Everyone</span>
  </div>
  <div class="war-story-content">
    <p><strong>Company:</strong> API-first startup</p>
    <p><strong>The Setup:</strong> Redis-based rate limiter. When Redis was slow, the check timed out.</p>
    <p><strong>The Bug:</strong> On timeout, the code threw an exception which was caught by a generic handler that returned 429 (rate limited) instead of letting the request through.</p>

```python
# BEFORE: Timeout = block everyone
def check_rate_limit(key):
    try:
        return redis.check(key, timeout=100ms)
    except TimeoutError:
        raise RateLimitException()  # BUG: Blocks everyone!

# AFTER: Fail open for availability
def check_rate_limit(key):
    try:
        return redis.check(key, timeout=100ms)
    except TimeoutError:
        logger.warning("Rate limit check timed out, allowing request")
        return RateLimitResult(allowed=True, degraded=True)
```

    <p><strong>Lesson:</strong> Rate limiters should "fail open" - when in doubt, let the request through. Better to occasionally exceed limits than block legitimate traffic.</p>
  </div>
</div>

<div class="war-story">
  <div class="war-story-header">
    <span class="war-story-icon">🔥</span>
    <span class="war-story-title">The Fixed Window Exploit</span>
  </div>
  <div class="war-story-content">
    <p><strong>The Setup:</strong> Simple fixed window: 100 requests per minute.</p>
    <p><strong>The Exploit:</strong> Attacker discovered window boundaries. Sent 100 requests at 11:59:59, then 100 more at 12:00:00. Result: 200 requests in 2 seconds.</p>

```python
# BEFORE: Fixed window with boundary exploit
def check(key):
    window = int(time.time() / 60)  # 1-minute windows
    count = redis.incr(f"{key}:{window}")
    return count <= 100

# AFTER: Sliding window counter
def check(key):
    now = time.time()
    current_window = int(now / 60)
    prev_window = current_window - 1
    window_progress = (now % 60) / 60

    prev_count = redis.get(f"{key}:{prev_window}") or 0
    curr_count = redis.get(f"{key}:{current_window}") or 0

    weighted = prev_count * (1 - window_progress) + curr_count
    if weighted >= 100:
        return False

    redis.incr(f"{key}:{current_window}")
    return True
```

    <p><strong>Lesson:</strong> Fixed window is vulnerable at boundaries. Use sliding window for public APIs.</p>
  </div>
</div>

---

## Distributed Rate Limiting

### The Challenge

```
┌────────────────────────────────────────────────────────────────────┐
│  Server A                    Server B                              │
│  ┌─────────┐                 ┌─────────┐                          │
│  │ Count=5 │                 │ Count=4 │   <- Different counts!   │
│  └─────────┘                 └─────────┘                          │
│                                                                    │
│  User sends requests load-balanced between servers                 │
│  Each server thinks user is under limit                           │
│  Combined: 9 requests, limit was 5!                               │
└────────────────────────────────────────────────────────────────────┘
```

### Solution: Centralized Counter

```python
# Redis Lua script for atomic rate limiting
SLIDING_WINDOW_LUA = """
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

local current_window = math.floor(now / window)
local prev_window = current_window - 1
local window_progress = (now % window) / window

local curr_key = key .. ":" .. current_window
local prev_key = key .. ":" .. prev_window

local prev_count = tonumber(redis.call('GET', prev_key) or 0)
local curr_count = tonumber(redis.call('GET', curr_key) or 0)

local weighted = prev_count * (1 - window_progress) + curr_count

if weighted >= limit then
    return {0, math.ceil(limit - weighted), (current_window + 1) * window}
end

redis.call('INCR', curr_key)
redis.call('EXPIRE', curr_key, window * 2)

return {1, math.ceil(limit - weighted - 1), (current_window + 1) * window}
"""

class DistributedRateLimiter:
    def __init__(self, redis_client, limit, window_seconds):
        self.redis = redis_client
        self.limit = limit
        self.window = window_seconds
        self.script = redis_client.register_script(SLIDING_WINDOW_LUA)

    def allow(self, key: str) -> RateLimitResult:
        now = time.time()
        result = self.script(
            keys=[key],
            args=[self.limit, self.window, now]
        )
        allowed, remaining, reset_at = result
        return RateLimitResult(
            allowed=bool(allowed),
            remaining=remaining,
            reset_at=reset_at
        )
```

### Trade-offs in Distributed Systems

| Approach | Accuracy | Latency | Availability |
|----------|----------|---------|--------------|
| Centralized Redis | Exact | +1-5ms | Single point |
| Redis Cluster | Exact | +2-10ms | High |
| Local + Periodic Sync | Approximate | +0ms | Very High |
| Sticky Sessions | Per-server accurate | +0ms | High |

---

## Expert-Level FAQs

<details>
<summary><strong>Q: How do you handle rate limiting for APIs with different costs?</strong></summary>

**A:** Use weighted tokens. A complex query costs more tokens than a simple one.

```python
class WeightedRateLimiter:
    ENDPOINT_WEIGHTS = {
        "GET /users": 1,
        "POST /search": 5,
        "POST /export": 20,
        "GET /analytics": 10,
    }

    def check(self, key: str, endpoint: str) -> bool:
        weight = self.ENDPOINT_WEIGHTS.get(endpoint, 1)
        return self.bucket.allow(key, tokens=weight)
```
</details>

<details>
<summary><strong>Q: How do you implement graduated rate limiting?</strong></summary>

**A:** Apply different limits based on user tier or behavior.

```python
class GraduatedRateLimiter:
    TIER_LIMITS = {
        "free": {"rate": 10, "capacity": 20},
        "basic": {"rate": 50, "capacity": 100},
        "premium": {"rate": 200, "capacity": 500},
        "enterprise": {"rate": 1000, "capacity": 2000},
    }

    def get_limits(self, user_id: str) -> dict:
        tier = self.user_service.get_tier(user_id)
        return self.TIER_LIMITS.get(tier, self.TIER_LIMITS["free"])

    def check(self, user_id: str) -> RateLimitResult:
        limits = self.get_limits(user_id)
        bucket = self.get_or_create_bucket(user_id, limits)
        return bucket.allow(1)
```
</details>

<details>
<summary><strong>Q: How do you handle rate limit bursting for mobile apps?</strong></summary>

**A:** Mobile apps often batch requests. Allow larger bursts but maintain average rate.

```python
# Standard API: 10/s rate, 20 capacity (2s burst)
api_limiter = TokenBucket(rate=10, capacity=20)

# Mobile API: 10/s rate, 100 capacity (10s burst)
# Same average rate, but allows batching
mobile_limiter = TokenBucket(rate=10, capacity=100)
```
</details>

<details>
<summary><strong>Q: How do you prevent API key sharing/abuse?</strong></summary>

**A:** Implement multiple limits and anomaly detection.

```python
class MultiLayerRateLimiter:
    def check(self, api_key: str, ip: str, user_agent: str) -> bool:
        # Layer 1: Per API key
        if not self.api_key_limiter.allow(api_key):
            return False

        # Layer 2: Per IP per API key (detect shared keys)
        ip_key = f"{api_key}:{ip}"
        if not self.ip_limiter.allow(ip_key):
            return False

        # Layer 3: Track unique IPs per key (anomaly detection)
        unique_ips = self.track_unique_ip(api_key, ip)
        if unique_ips > 100:  # Too many IPs = shared key
            self.flag_for_review(api_key)

        return True
```
</details>

---

## Interview Tips

1. **Start simple:** Begin with fixed window, then discuss limitations
2. **Know the trade-offs:** Memory vs accuracy vs latency
3. **Discuss distribution:** How to handle multiple servers
4. **Consider edge cases:** What if Redis is down? Clock skew?
5. **Mention headers:** X-RateLimit-Limit, X-RateLimit-Remaining, Retry-After
6. **Think about UX:** Gradual degradation vs hard cutoff

## Related Topics

- [Caching](/topic/system-design/caching)
- [Load Balancing](/topic/system-design/load-balancing)
- [Circuit Breaker](/topic/system-design/circuit-breaker)
- [API Gateway](/topic/system-design/api-gateway)
