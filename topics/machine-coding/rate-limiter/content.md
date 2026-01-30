# Rate Limiter

## Problem Statement

Design a rate limiter that controls the rate of requests a client can make to an API. Support configurable limits like "100 requests per minute per user" with distributed deployment, multiple rate limiting strategies, and comprehensive observability.

## Requirements

### Functional Requirements
- Limit requests per time window (per-user, per-IP, per-API-key, global)
- Support multiple algorithms (token bucket, sliding window, leaky bucket)
- Return remaining quota and reset time in response headers
- Handle concurrent requests safely
- Support tiered rate limits (free/premium/enterprise)

### Non-Functional Requirements
- Sub-millisecond latency for rate limit decisions
- Horizontally scalable across multiple servers
- Graceful degradation when rate limit storage is unavailable
- Support for burst traffic patterns
- Accurate tracking across distributed nodes

---

## Core Concepts Deep Dive

### Why Rate Limiting Exists

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

**Protection Layers:**

| Threat Vector | Rate Limiting Defense | Alternative Mitigations |
|---------------|----------------------|------------------------|
| **DoS/DDoS Attacks** | Per-IP limits, global limits | WAF, CDN, IP blocklists |
| **Credential Stuffing** | Per-IP on login endpoints | CAPTCHA, account lockout |
| **API Abuse** | Per-API-key limits | Usage quotas, billing |
| **Resource Exhaustion** | Per-resource limits | Circuit breakers, queuing |
| **Scraping** | Per-user agent patterns | Bot detection, fingerprinting |

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Key Insight**: Rate limiting is a defense-in-depth measure, not a complete security solution. It buys time and reduces blast radius.</span>

</div>

#### Interview Questions: Rate Limiting Fundamentals

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0;">

**Level 1: Where should rate limiting be implemented in a microservices architecture?**

Rate limiting can be implemented at multiple layers:

1. **API Gateway Layer** (Recommended primary location)
   - Centralized enforcement before requests reach services
   - Single point of policy management
   - Can terminate bad requests early, saving downstream resources
   - Examples: Kong, AWS API Gateway, Nginx

2. **Service Mesh Sidecar**
   - Per-service rate limiting with [[service-mesh]](/topics/system-design/service-mesh) sidecars
   - Envoy proxy with rate limit service
   - Service-to-service rate limiting

3. **Application Layer**
   - Business logic-aware rate limiting
   - Can consider request cost (expensive queries vs cheap)
   - Last line of defense

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Trade-off**: Gateway rate limiting is efficient but coarse-grained. Application-level is precise but adds latency to every service.</span>

---

**Level 2: How do you handle rate limiting when the rate limiter storage (Redis) becomes unavailable?**

This is a critical availability vs. security trade-off:

**Option 1: Fail Open (Allow all requests)**
```python
def check_rate_limit(key: str) -> bool:
    try:
        return redis_client.check_limit(key)
    except RedisConnectionError:
        logger.warning(f"Rate limiter unavailable, allowing request for {key}")
        return True  # Fail open
```
- **Pro**: Service remains available
- **Con**: Vulnerable to abuse during outage

**Option 2: Fail Closed (Deny all requests)**
```python
def check_rate_limit(key: str) -> bool:
    try:
        return redis_client.check_limit(key)
    except RedisConnectionError:
        logger.error(f"Rate limiter unavailable, denying request for {key}")
        return False  # Fail closed
```
- **Pro**: Maintains security posture
- **Con**: Complete service outage

**Option 3: Local Fallback with Degraded Limits (Recommended)**
```python
class RateLimiterWithFallback:
    def __init__(self):
        self.redis_limiter = RedisRateLimiter()
        self.local_limiter = LocalTokenBucket(
            rate=10,  # Conservative local limit
            capacity=20
        )
        self.local_mode_start = None

    def check_rate_limit(self, key: str) -> RateLimitResult:
        try:
            result = self.redis_limiter.check(key)
            self.local_mode_start = None  # Reset fallback
            return result
        except RedisConnectionError:
            self._enter_local_mode()
            # Use local rate limiter with stricter limits
            local_result = self.local_limiter.allow(key)
            return RateLimitResult(
                allowed=local_result,
                degraded=True,
                message="Operating in degraded mode"
            )

    def _enter_local_mode(self):
        if self.local_mode_start is None:
            self.local_mode_start = time.time()
            alert_ops_team("Rate limiter in local fallback mode")
```

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Design Choice**: Local fallback provides availability with reduced but consistent protection. The stricter local limits prevent complete abuse while the distributed system recovers.</span>

---

**Level 3: How would you implement request cost-based rate limiting where different endpoints consume different amounts of quota?**

This requires weighted token consumption where expensive operations cost more:

```python
from dataclasses import dataclass
from typing import Dict
from enum import Enum

class EndpointCost(Enum):
    CHEAP = 1       # GET /users/{id}
    STANDARD = 5    # POST /users
    EXPENSIVE = 20  # POST /reports/generate
    VERY_EXPENSIVE = 100  # POST /batch-import

@dataclass
class RequestContext:
    user_id: str
    endpoint: str
    method: str
    payload_size: int

class CostBasedRateLimiter:
    """
    Rate limiter that considers request cost.

    Design considerations:
    1. Different endpoints have different computational costs
    2. Large payloads should cost more
    3. Batch operations should be weighted by batch size
    4. Read vs write operations have different costs
    """

    def __init__(self, tokens_per_minute: int, bucket_capacity: int):
        self.tokens_per_minute = tokens_per_minute
        self.bucket_capacity = bucket_capacity
        self.endpoint_costs: Dict[str, int] = {}
        self.token_bucket = TokenBucket(
            rate=tokens_per_minute / 60,
            capacity=bucket_capacity
        )

    def register_endpoint_cost(self, pattern: str, cost: EndpointCost):
        """Register cost for endpoint pattern."""
        self.endpoint_costs[pattern] = cost.value

    def calculate_request_cost(self, ctx: RequestContext) -> int:
        """
        Calculate total cost for a request.

        Cost factors:
        1. Base endpoint cost
        2. Payload size multiplier
        3. Batch size multiplier (if applicable)
        """
        # Get base cost from endpoint pattern matching
        base_cost = self._match_endpoint_cost(ctx.endpoint, ctx.method)

        # Add payload size penalty (1 extra token per 10KB)
        payload_penalty = ctx.payload_size // 10240

        # Calculate final cost
        total_cost = base_cost + payload_penalty

        return max(1, total_cost)  # Minimum cost is 1

    def _match_endpoint_cost(self, endpoint: str, method: str) -> int:
        """Match endpoint to cost using pattern matching."""
        # Priority: exact match > pattern match > default
        key = f"{method}:{endpoint}"

        if key in self.endpoint_costs:
            return self.endpoint_costs[key]

        # Pattern matching for path parameters
        for pattern, cost in self.endpoint_costs.items():
            if self._matches_pattern(key, pattern):
                return cost

        # Default costs by method
        default_costs = {
            'GET': 1,
            'POST': 5,
            'PUT': 5,
            'DELETE': 3,
            'PATCH': 3
        }
        return default_costs.get(method, 5)

    def check_rate_limit(self, ctx: RequestContext) -> RateLimitResult:
        """Check if request is allowed and consume appropriate tokens."""
        cost = self.calculate_request_cost(ctx)

        result = self.token_bucket.allow(ctx.user_id, tokens=cost)

        return RateLimitResult(
            allowed=result.allowed,
            remaining=result.remaining,
            cost_charged=cost if result.allowed else 0,
            reset_at=result.reset_at
        )

# Usage example
limiter = CostBasedRateLimiter(tokens_per_minute=1000, bucket_capacity=200)
limiter.register_endpoint_cost("GET:/users/*", EndpointCost.CHEAP)
limiter.register_endpoint_cost("POST:/reports/generate", EndpointCost.EXPENSIVE)
limiter.register_endpoint_cost("POST:/batch/*", EndpointCost.VERY_EXPENSIVE)
```

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Assumption**: Request cost can be determined before execution. For operations where cost is only known after execution (like database queries), consider post-execution accounting with rollback capabilities.</span>

</div>

---

## Token Bucket Algorithm

### Internal Mechanism

<div style="background: #eff6ff; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">

<div style="text-align: center; margin-bottom: 20px;">
<div style="display: inline-block; background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 20px 40px;">
<div style="color: #fff; font-weight: bold; font-size: 16px; margin-bottom: 16px;">Token Bucket State Machine</div>

<div style="display: flex; align-items: center; justify-content: center; gap: 30px;">

<div style="text-align: center;">
<div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin-bottom: 8px;">
<div style="font-size: 12px; color: #8b949e; margin-bottom: 8px;">Bucket State</div>
<div style="display: flex; gap: 4px; justify-content: center; flex-wrap: wrap; max-width: 100px;">
<div style="background: #238636; width: 14px; height: 14px; border-radius: 50%;"></div>
<div style="background: #238636; width: 14px; height: 14px; border-radius: 50%;"></div>
<div style="background: #238636; width: 14px; height: 14px; border-radius: 50%;"></div>
<div style="background: #238636; width: 14px; height: 14px; border-radius: 50%;"></div>
<div style="background: #f8fafc; width: 14px; height: 14px; border-radius: 50%; border: 2px dashed #e2e8f0;"></div>
<div style="background: #f8fafc; width: 14px; height: 14px; border-radius: 50%; border: 2px dashed #e2e8f0;"></div>
</div>
<div style="color: #7ee787; font-size: 11px; margin-top: 8px;">4/6 tokens</div>
</div>
<div style="color: #a5d6ff; font-size: 11px;">capacity = 6</div>
</div>

<div style="color: #8b949e; font-size: 24px;">+</div>

<div style="text-align: center;">
<div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin-bottom: 8px;">
<div style="font-size: 12px; color: #8b949e; margin-bottom: 8px;">Refill Rate</div>
<div style="color: #58a6ff; font-size: 18px; font-weight: bold;">2/sec</div>
</div>
<div style="color: #a5d6ff; font-size: 11px;">rate = 2.0</div>
</div>

<div style="color: #8b949e; font-size: 24px;">+</div>

<div style="text-align: center;">
<div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin-bottom: 8px;">
<div style="font-size: 12px; color: #8b949e; margin-bottom: 8px;">Last Update</div>
<div style="color: #f0883e; font-size: 14px; font-weight: bold;">1706012345.123</div>
</div>
<div style="color: #a5d6ff; font-size: 11px;">Unix timestamp</div>
</div>

</div>
</div>
</div>

**Core State Variables:**
```
struct TokenBucket {
    tokens: f64,        // Current token count (can be fractional during calculation)
    capacity: f64,      // Maximum tokens the bucket can hold
    rate: f64,          // Tokens added per second
    last_update: f64,   // Unix timestamp of last token calculation
}
```

**The Fundamental Equation:**
```
new_tokens = min(capacity, old_tokens + (current_time - last_update) * rate)
```

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Critical Implementation Detail**: Tokens are calculated lazily on each request, not continuously refilled. This is essential for efficiency - we don't need background threads or timers.</span>

</div>

### Token Bucket: Step-by-Step Execution

<div style="background: #f5f3ff; border-radius: 12px; padding: 24px; margin: 20px 0;">

**Scenario**: Rate = 10 tokens/sec, Capacity = 20 tokens

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 20px 0;">

<div style="background: rgba(31, 111, 235, 0.2); border-radius: 8px; padding: 16px; border-left: 3px solid #1f6feb;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 8px;">t=0.000s: Initial State</div>
<div style="color: #c9d1d9; font-size: 13px;">
tokens = 20 (full bucket)<br>
last_update = 0.000
</div>
</div>

<div style="background: rgba(31, 111, 235, 0.2); border-radius: 8px; padding: 16px; border-left: 3px solid #1f6feb;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 8px;">t=0.001s: Burst of 15 requests</div>
<div style="color: #c9d1d9; font-size: 13px;">
tokens = 20 - 15 = 5<br>
All 15 requests ALLOWED
</div>
</div>

<div style="background: rgba(35, 134, 54, 0.2); border-radius: 8px; padding: 16px; border-left: 3px solid #238636;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 8px;">t=0.500s: Request arrives</div>
<div style="color: #c9d1d9; font-size: 13px;">
elapsed = 0.499s<br>
refill = 0.499 * 10 = 4.99<br>
tokens = min(20, 5 + 4.99) = 9.99<br>
After request: 8.99 tokens
</div>
</div>

<div style="background: rgba(248, 81, 73, 0.2); border-radius: 8px; padding: 16px; border-left: 3px solid #f85149;">
<div style="color: #ff7b72; font-weight: bold; margin-bottom: 8px;">t=0.501s: 10 more requests</div>
<div style="color: #c9d1d9; font-size: 13px;">
tokens = 8.99<br>
Only 8 requests ALLOWED<br>
2 requests DENIED (429)
</div>
</div>

</div>

**Why Token Bucket Handles Bursts Well:**

The bucket "saves up" unused capacity. If a user has been quiet for a while, they can legitimately burst up to capacity. This matches real-world usage patterns where users might be idle, then suddenly need several quick operations.

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Trade-off**: Burst allowance improves user experience but can overwhelm downstream services if all users burst simultaneously. Consider combining with a global rate limiter.</span>

</div>

### Token Bucket Implementation with Full Edge Case Handling

```python
import time
import threading
from dataclasses import dataclass
from typing import Optional, Dict
from contextlib import contextmanager
import logging

logger = logging.getLogger(__name__)

@dataclass(frozen=True)
class RateLimitResult:
    """Immutable result of a rate limit check."""
    allowed: bool
    remaining: int
    reset_at: float  # Unix timestamp when bucket will be full
    retry_after: Optional[float]  # Seconds until request might succeed
    limit: int  # Total limit for context

    def to_headers(self) -> Dict[str, str]:
        """Convert to standard rate limit headers."""
        headers = {
            'X-RateLimit-Limit': str(self.limit),
            'X-RateLimit-Remaining': str(self.remaining),
            'X-RateLimit-Reset': str(int(self.reset_at)),
        }
        if self.retry_after is not None:
            headers['Retry-After'] = str(int(self.retry_after) + 1)
        return headers


class TokenBucket:
    """
    Thread-safe token bucket implementation.

    Key design decisions:
    1. Lazy refill: Tokens calculated on demand, not continuously
    2. Float tokens: Internal precision, integer for external API
    3. Monotonic time: Use monotonic clock to avoid issues with clock adjustments
    4. Lock granularity: Per-bucket lock for maximum concurrency
    """

    __slots__ = ('rate', 'capacity', '_tokens', '_last_update', '_lock', '_created_at')

    def __init__(self, rate: float, capacity: int):
        """
        Initialize token bucket.

        Args:
            rate: Tokens added per second
            capacity: Maximum tokens bucket can hold

        Raises:
            ValueError: If rate <= 0 or capacity <= 0
        """
        if rate <= 0:
            raise ValueError(f"Rate must be positive, got {rate}")
        if capacity <= 0:
            raise ValueError(f"Capacity must be positive, got {capacity}")

        self.rate = float(rate)
        self.capacity = int(capacity)
        self._tokens = float(capacity)  # Start full
        self._last_update = time.monotonic()
        self._lock = threading.Lock()
        self._created_at = time.time()

    def _refill(self, now: float) -> None:
        """
        Refill tokens based on elapsed time.

        IMPORTANT: Must be called while holding _lock.
        """
        elapsed = now - self._last_update
        if elapsed > 0:
            self._tokens = min(
                self.capacity,
                self._tokens + elapsed * self.rate
            )
            self._last_update = now

    def allow(self, tokens: int = 1) -> RateLimitResult:
        """
        Check if request is allowed and consume tokens if so.

        Args:
            tokens: Number of tokens to consume (default 1)

        Returns:
            RateLimitResult with allowed status and metadata
        """
        if tokens <= 0:
            raise ValueError(f"Tokens must be positive, got {tokens}")
        if tokens > self.capacity:
            # Request can never succeed - it exceeds bucket capacity
            return RateLimitResult(
                allowed=False,
                remaining=0,
                reset_at=time.time() + self.capacity / self.rate,
                retry_after=None,  # Will never succeed
                limit=self.capacity
            )

        with self._lock:
            now = time.monotonic()
            self._refill(now)

            current_time = time.time()

            if self._tokens >= tokens:
                self._tokens -= tokens

                # Calculate when bucket will be full again
                tokens_needed = self.capacity - self._tokens
                reset_at = current_time + (tokens_needed / self.rate)

                return RateLimitResult(
                    allowed=True,
                    remaining=int(self._tokens),
                    reset_at=reset_at,
                    retry_after=None,
                    limit=self.capacity
                )

            # Request denied - calculate retry time
            tokens_needed = tokens - self._tokens
            retry_after = tokens_needed / self.rate

            return RateLimitResult(
                allowed=False,
                remaining=0,
                reset_at=current_time + (self.capacity / self.rate),
                retry_after=retry_after,
                limit=self.capacity
            )

    def peek(self) -> int:
        """Get current token count without modifying state."""
        with self._lock:
            now = time.monotonic()
            elapsed = now - self._last_update
            tokens = min(self.capacity, self._tokens + elapsed * self.rate)
            return int(tokens)

    def __repr__(self) -> str:
        return f"TokenBucket(rate={self.rate}, capacity={self.capacity}, tokens={self.peek()})"


class RateLimiter:
    """
    Multi-key rate limiter with automatic cleanup.

    Manages a collection of token buckets, one per key (user, IP, etc).
    Includes background cleanup of stale buckets to prevent memory leaks.
    """

    def __init__(
        self,
        rate: float,
        capacity: int,
        cleanup_interval: float = 60.0,
        bucket_ttl: float = 3600.0
    ):
        self.rate = rate
        self.capacity = capacity
        self.bucket_ttl = bucket_ttl

        self._buckets: Dict[str, TokenBucket] = {}
        self._bucket_last_access: Dict[str, float] = {}
        self._lock = threading.RLock()

        # Start cleanup thread
        self._cleanup_interval = cleanup_interval
        self._shutdown = threading.Event()
        self._cleanup_thread = threading.Thread(
            target=self._cleanup_loop,
            daemon=True,
            name="RateLimiter-Cleanup"
        )
        self._cleanup_thread.start()

    def _get_bucket(self, key: str) -> TokenBucket:
        """Get or create bucket for key."""
        with self._lock:
            now = time.time()
            self._bucket_last_access[key] = now

            if key not in self._buckets:
                self._buckets[key] = TokenBucket(self.rate, self.capacity)

            return self._buckets[key]

    def allow(self, key: str, tokens: int = 1) -> RateLimitResult:
        """Check rate limit for given key."""
        bucket = self._get_bucket(key)
        return bucket.allow(tokens)

    def _cleanup_loop(self) -> None:
        """Background thread to clean up stale buckets."""
        while not self._shutdown.wait(self._cleanup_interval):
            self._cleanup_stale_buckets()

    def _cleanup_stale_buckets(self) -> None:
        """Remove buckets that haven't been accessed recently."""
        now = time.time()
        cutoff = now - self.bucket_ttl

        with self._lock:
            stale_keys = [
                key for key, last_access in self._bucket_last_access.items()
                if last_access < cutoff
            ]

            for key in stale_keys:
                del self._buckets[key]
                del self._bucket_last_access[key]

            if stale_keys:
                logger.debug(f"Cleaned up {len(stale_keys)} stale rate limit buckets")

    def shutdown(self) -> None:
        """Gracefully shutdown cleanup thread."""
        self._shutdown.set()
        self._cleanup_thread.join(timeout=5.0)

    def stats(self) -> Dict:
        """Get current rate limiter statistics."""
        with self._lock:
            return {
                'active_buckets': len(self._buckets),
                'rate': self.rate,
                'capacity': self.capacity
            }
```

#### Interview Questions: Token Bucket

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**Level 1: Why do we use monotonic time instead of wall clock time in the token bucket implementation?**

Wall clock time (`time.time()`) can jump forward or backward due to:
- NTP synchronization adjusting the clock
- Daylight saving time changes
- Manual clock adjustments
- VM migrations or suspend/resume

**Problems with wall clock:**
```python
# Scenario: Clock jumps backward by 5 seconds during NTP sync
last_update = 1706012345.0  # 10:00:00
current_time = 1706012340.0  # Clock jumped back to 09:59:55

elapsed = current_time - last_update  # -5 seconds!
# This would result in NEGATIVE token refill
tokens = tokens + elapsed * rate  # tokens decrease!
```

**Solution using monotonic time:**
```python
# Monotonic time only moves forward, regardless of wall clock
last_update = 12345.678  # Arbitrary monotonic value
current_time = 12350.123  # Always >= last_update

elapsed = current_time - last_update  # Always >= 0
```

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Trade-off**: Monotonic time is only valid within a single process. For distributed rate limiting, you must use wall clock time with tolerance for small errors.</span>

---

**Level 2: How do you handle the "thundering herd" problem when many requests arrive exactly when the bucket refills?**

The thundering herd occurs when many blocked clients retry simultaneously after their rate limits reset:

<div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin: 16px 0;">
<div style="display: flex; align-items: center; gap: 20px;">
<div style="text-align: center; flex: 1;">
<div style="color: #f85149; font-size: 12px; margin-bottom: 8px;">All clients blocked</div>
<div style="background: #f85149; height: 8px; border-radius: 4px;"></div>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">t=0</div>
</div>
<div style="color: #8b949e;">...</div>
<div style="text-align: center; flex: 1;">
<div style="color: #ffa657; font-size: 12px; margin-bottom: 8px;">All retry at reset</div>
<div style="background: linear-gradient(90deg, #ffa657 80%, #238636 80%); height: 8px; border-radius: 4px;"></div>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">t=reset</div>
</div>
<div style="color: #8b949e;">...</div>
<div style="text-align: center; flex: 1;">
<div style="color: #f85149; font-size: 12px; margin-bottom: 8px;">Spike overloads system</div>
<div style="background: #f85149; height: 8px; border-radius: 4px;"></div>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">t=reset+1ms</div>
</div>
</div>
</div>

**Mitigation Strategies:**

1. **Jittered Retry-After Header:**
```python
import random

def calculate_retry_after(base_retry: float) -> float:
    """Add jitter to spread out retries."""
    # Add 0-25% random jitter
    jitter = random.uniform(0, base_retry * 0.25)
    return base_retry + jitter
```

2. **Exponential Backoff with Jitter (Client-side):**
```python
def retry_with_backoff(attempt: int, base: float = 1.0, cap: float = 60.0) -> float:
    """Calculate backoff with full jitter."""
    temp = min(cap, base * (2 ** attempt))
    return random.uniform(0, temp)
```

3. **Token Drip Instead of Reset:**
```python
# Instead of resetting to full capacity at reset time,
# tokens drip in continuously. This naturally spreads load.
# Token bucket already does this - it's a feature!
```

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Key Insight**: Token bucket's continuous refill naturally mitigates thundering herd compared to fixed window. Returning a jittered Retry-After header helps further.</span>

---

**Level 3: How would you implement a token bucket that supports "borrowing" from future tokens for premium users while maintaining rate guarantees?**

This is a sophisticated requirement for premium users who need occasional burst beyond capacity with guaranteed future repayment:

```python
from dataclasses import dataclass
from typing import Optional
import time
import threading

@dataclass
class BorrowingResult:
    allowed: bool
    tokens_consumed: int
    tokens_borrowed: int
    debt_remaining: int
    repayment_complete_at: Optional[float]

class BorrowingTokenBucket:
    """
    Token bucket that allows borrowing from future allocation.

    Design:
    - Users can borrow up to `max_debt` tokens beyond current balance
    - Debt is repaid automatically as tokens refill
    - No new tokens available until debt is fully repaid
    - Premium feature with strict limits to prevent abuse

    Use case: User needs to upload 50 files but only has 20 tokens.
    They can borrow 30 tokens and will be rate-limited until debt is repaid.
    """

    def __init__(
        self,
        rate: float,
        capacity: int,
        max_debt: int,
        debt_interest_rate: float = 0.0
    ):
        """
        Args:
            rate: Tokens per second
            capacity: Maximum tokens
            max_debt: Maximum tokens that can be borrowed
            debt_interest_rate: Extra cost per borrowed token (0.1 = 10% extra)
        """
        self.rate = rate
        self.capacity = capacity
        self.max_debt = max_debt
        self.debt_interest_rate = debt_interest_rate

        self._tokens = float(capacity)
        self._debt = 0.0  # Current debt (positive = owes tokens)
        self._last_update = time.monotonic()
        self._lock = threading.Lock()

    def _refill(self, now: float) -> None:
        """Refill tokens, paying debt first."""
        elapsed = now - self._last_update
        if elapsed <= 0:
            return

        new_tokens = elapsed * self.rate
        self._last_update = now

        # Pay debt first before adding to available tokens
        if self._debt > 0:
            debt_payment = min(new_tokens, self._debt)
            self._debt -= debt_payment
            new_tokens -= debt_payment

        # Add remaining to available tokens
        self._tokens = min(self.capacity, self._tokens + new_tokens)

    def allow(
        self,
        tokens: int = 1,
        allow_borrowing: bool = False
    ) -> BorrowingResult:
        """
        Check rate limit with optional borrowing.

        Args:
            tokens: Tokens needed
            allow_borrowing: Whether to allow borrowing if insufficient
        """
        with self._lock:
            now = time.monotonic()
            self._refill(now)

            # Check if in debt - no requests allowed while in debt
            if self._debt > 0 and not allow_borrowing:
                return BorrowingResult(
                    allowed=False,
                    tokens_consumed=0,
                    tokens_borrowed=0,
                    debt_remaining=int(self._debt),
                    repayment_complete_at=time.time() + (self._debt / self.rate)
                )

            # Normal case: enough tokens available
            if self._tokens >= tokens:
                self._tokens -= tokens
                return BorrowingResult(
                    allowed=True,
                    tokens_consumed=tokens,
                    tokens_borrowed=0,
                    debt_remaining=int(self._debt),
                    repayment_complete_at=None
                )

            # Borrowing case
            if allow_borrowing:
                available = self._tokens
                needed_from_debt = tokens - available

                # Apply interest to borrowed amount
                debt_with_interest = needed_from_debt * (1 + self.debt_interest_rate)

                # Check if borrowing is allowed
                potential_total_debt = self._debt + debt_with_interest
                if potential_total_debt <= self.max_debt:
                    self._tokens = 0
                    self._debt = potential_total_debt

                    repayment_time = time.time() + (self._debt / self.rate)

                    return BorrowingResult(
                        allowed=True,
                        tokens_consumed=int(available),
                        tokens_borrowed=int(needed_from_debt),
                        debt_remaining=int(self._debt),
                        repayment_complete_at=repayment_time
                    )

            # Cannot fulfill request
            return BorrowingResult(
                allowed=False,
                tokens_consumed=0,
                tokens_borrowed=0,
                debt_remaining=int(self._debt),
                repayment_complete_at=time.time() + (self._debt / self.rate) if self._debt > 0 else None
            )

# Usage example
bucket = BorrowingTokenBucket(
    rate=10,           # 10 tokens/sec
    capacity=50,       # Max 50 tokens
    max_debt=100,      # Can borrow up to 100 tokens
    debt_interest_rate=0.2  # 20% interest on borrowed tokens
)

# User needs 80 tokens but only has 50
result = bucket.allow(tokens=80, allow_borrowing=True)
# Result: allowed=True, consumed=50, borrowed=30, debt=36 (30 * 1.2)
# User will be rate-limited for 3.6 seconds while debt is repaid
```

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Design Choice**: Interest on borrowed tokens creates economic incentive to avoid borrowing except when necessary. This self-regulates the feature usage without hard blocking premium users.</span>

</div>

---

## Sliding Window Algorithm

### Why Sliding Window Exists

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ff6b6b;">

**The Fixed Window Boundary Problem:**

<div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin: 16px 0;">
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="display: flex; align-items: center; gap: 8px;">
<div style="width: 100px; color: #8b949e; font-size: 12px;">Limit: 100/min</div>
<div style="flex: 1; display: flex;">
<div style="flex: 1; background: linear-gradient(90deg, transparent 90%, #f85149 90%); height: 24px; border: 1px solid #e2e8f0; border-right: none; display: flex; align-items: center; justify-content: flex-end; padding-right: 4px;">
<span style="color: #f85149; font-size: 10px;">100 req</span>
</div>
<div style="flex: 1; background: linear-gradient(90deg, #f85149 10%, transparent 10%); height: 24px; border: 1px solid #e2e8f0; display: flex; align-items: center; padding-left: 4px;">
<span style="color: #f85149; font-size: 10px;">100 req</span>
</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div style="width: 100px;"></div>
<div style="flex: 1; display: flex; justify-content: center;">
<div style="background: #f85149; color: #fff; padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: bold;">
200 requests in ~2 seconds!
</div>
</div>
</div>
<div style="color: #8b949e; font-size: 11px; text-align: center;">
Window 1 (00:00-01:00) | Window 2 (01:00-02:00)
</div>
</div>
</div>

**Result**: User sends 100 requests at 00:59, then 100 more at 01:01. Both are allowed because they're in different windows, but effectively they've sent 200 requests in 2 seconds - double the intended rate!

</div>

### Sliding Window Counter: The Weighted Average Solution

<div style="background: #f5f3ff; border-radius: 12px; padding: 24px; margin: 20px 0;">

**The Key Insight**: Instead of storing every request timestamp, approximate the count using a weighted average of the current and previous window.

<div style="background: #eff6ff; border-radius: 8px; padding: 20px; margin: 16px 0;">

**Visual: Sliding Window at 25% into Current Window**

<div style="display: flex; align-items: center; margin: 16px 0;">
<div style="width: 120px; color: #8b949e; font-size: 12px;">Previous Window</div>
<div style="flex: 1; position: relative;">
<div style="display: flex; height: 40px;">
<div style="flex: 3; background: linear-gradient(90deg, rgba(139, 148, 158, 0.1) 0%, rgba(139, 148, 158, 0.3) 100%); border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center;">
<span style="color: #d2a8ff; font-size: 12px;">84 requests (75% weight)</span>
</div>
<div style="flex: 1; background: rgba(136, 87, 229, 0.3); border: 1px solid #8957e5; display: flex; align-items: center; justify-content: center;">
<span style="color: #d2a8ff; font-size: 12px;">36 req</span>
</div>
</div>
<div style="position: absolute; left: 75%; top: 50%; transform: translate(-50%, -50%); background: #8957e5; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 10px;">
NOW
</div>
</div>
</div>

**Calculation:**
```
window_size = 60 seconds
current_position = 15 seconds into current window
progress = 15 / 60 = 0.25 (25%)

previous_window_count = 84
current_window_count = 36

weighted_count = previous × (1 - progress) + current × 1.0
               = 84 × 0.75 + 36 × 1.0
               = 63 + 36
               = 99

Limit = 100, weighted_count = 99 → ALLOWED
```

</div>

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Trade-off**: Sliding window counter is an approximation. In worst case, it can allow up to ~6% more requests than the limit. If you need exact counting, use sliding window log (stores all timestamps).</span>

</div>

### Sliding Window Implementation

```python
import time
import threading
from collections import defaultdict
from dataclasses import dataclass
from typing import Dict, Tuple, Optional

@dataclass
class SlidingWindowResult:
    allowed: bool
    remaining: int
    reset_at: float
    current_count: int
    window_size: int

class SlidingWindowCounter:
    """
    Sliding window counter rate limiter.

    Memory efficient: Only stores 2 counters per key (current + previous window).
    Time efficient: O(1) per operation.

    Trade-off: Approximate counting, can allow ~6% over limit in worst case.
    """

    def __init__(self, limit: int, window_seconds: int):
        """
        Args:
            limit: Maximum requests per window
            window_seconds: Window size in seconds
        """
        if limit <= 0:
            raise ValueError(f"Limit must be positive, got {limit}")
        if window_seconds <= 0:
            raise ValueError(f"Window must be positive, got {window_seconds}")

        self.limit = limit
        self.window_seconds = window_seconds

        # counters[key][window_number] = count
        self._counters: Dict[str, Dict[int, int]] = defaultdict(lambda: defaultdict(int))
        self._lock = threading.Lock()

    def _get_window_number(self, timestamp: float) -> int:
        """Get window number for a given timestamp."""
        return int(timestamp // self.window_seconds)

    def _get_window_progress(self, timestamp: float) -> float:
        """Get progress through current window (0.0 to 1.0)."""
        return (timestamp % self.window_seconds) / self.window_seconds

    def _calculate_weighted_count(
        self,
        key: str,
        current_window: int,
        progress: float
    ) -> float:
        """Calculate weighted request count across windows."""
        previous_window = current_window - 1

        prev_count = self._counters[key].get(previous_window, 0)
        curr_count = self._counters[key].get(current_window, 0)

        # Weight previous window by remaining time, current by full weight
        weighted = prev_count * (1 - progress) + curr_count

        return weighted

    def allow(self, key: str) -> SlidingWindowResult:
        """
        Check if request is allowed and increment counter if so.

        Args:
            key: Identifier for rate limit bucket (user ID, IP, etc.)
        """
        now = time.time()
        current_window = self._get_window_number(now)
        progress = self._get_window_progress(now)

        with self._lock:
            # Calculate current weighted count
            weighted_count = self._calculate_weighted_count(key, current_window, progress)

            # Check if over limit
            if weighted_count >= self.limit:
                # Calculate when window will reset
                reset_at = (current_window + 1) * self.window_seconds

                return SlidingWindowResult(
                    allowed=False,
                    remaining=0,
                    reset_at=reset_at,
                    current_count=int(weighted_count),
                    window_size=self.limit
                )

            # Increment counter for current window
            self._counters[key][current_window] += 1

            # Cleanup old windows (keep only current and previous)
            self._cleanup_old_windows(key, current_window)

            # Calculate remaining (approximate)
            remaining = max(0, int(self.limit - weighted_count - 1))
            reset_at = (current_window + 1) * self.window_seconds

            return SlidingWindowResult(
                allowed=True,
                remaining=remaining,
                reset_at=reset_at,
                current_count=int(weighted_count) + 1,
                window_size=self.limit
            )

    def _cleanup_old_windows(self, key: str, current_window: int) -> None:
        """Remove windows older than previous window."""
        previous_window = current_window - 1

        stale_windows = [
            w for w in self._counters[key].keys()
            if w < previous_window
        ]

        for window in stale_windows:
            del self._counters[key][window]

    def get_current_count(self, key: str) -> int:
        """Get approximate current request count for a key."""
        now = time.time()
        current_window = self._get_window_number(now)
        progress = self._get_window_progress(now)

        with self._lock:
            return int(self._calculate_weighted_count(key, current_window, progress))
```

### Sliding Window Log: Exact Counting

```python
import time
import threading
from collections import defaultdict, deque
from dataclasses import dataclass
from typing import Dict, Deque

@dataclass
class SlidingLogResult:
    allowed: bool
    remaining: int
    reset_at: float
    requests_in_window: int

class SlidingWindowLog:
    """
    Exact request counting using timestamp log.

    Stores every request timestamp within the window.
    Most accurate but O(n) space where n = requests per window per key.

    Use when:
    - Accuracy is critical (compliance, billing)
    - Request volume is low to moderate
    - Memory is not a concern

    Avoid when:
    - High request volume (millions/minute)
    - Memory constrained environment
    - Sub-millisecond latency required
    """

    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window_seconds = window_seconds

        # logs[key] = deque of timestamps
        self._logs: Dict[str, Deque[float]] = defaultdict(deque)
        self._lock = threading.Lock()

    def allow(self, key: str) -> SlidingLogResult:
        """Check rate limit with exact counting."""
        now = time.time()
        cutoff = now - self.window_seconds

        with self._lock:
            log = self._logs[key]

            # Remove expired timestamps (O(k) where k = expired entries)
            while log and log[0] <= cutoff:
                log.popleft()

            count = len(log)

            if count >= self.limit:
                # Find when oldest request will expire
                oldest = log[0] if log else now
                reset_at = oldest + self.window_seconds

                return SlidingLogResult(
                    allowed=False,
                    remaining=0,
                    reset_at=reset_at,
                    requests_in_window=count
                )

            # Add new request timestamp
            log.append(now)

            # Calculate reset time (when first request in window expires)
            reset_at = log[0] + self.window_seconds

            return SlidingLogResult(
                allowed=True,
                remaining=self.limit - count - 1,
                reset_at=reset_at,
                requests_in_window=count + 1
            )

    def get_request_count(self, key: str) -> int:
        """Get exact count of requests in current window."""
        now = time.time()
        cutoff = now - self.window_seconds

        with self._lock:
            log = self._logs[key]
            # Count non-expired timestamps
            return sum(1 for ts in log if ts > cutoff)
```

#### Interview Questions: Sliding Window

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0;">

**Level 1: What's the maximum error rate of sliding window counter compared to sliding window log?**

The sliding window counter approximates the true count. In the worst case:

**Worst Case Scenario:**
- Window size: 60 seconds, Limit: 100
- At t=0: Previous window had 100 requests all at t=-1 second
- At t=0.01 (1% into current window): weighted = 100 × 0.99 + 0 = 99
- User makes request #100 at t=0.01: weighted = 99, allowed!
- At t=0.02: weighted = 100 × 0.98 + 1 = 99, another request allowed!

**Maximum Over-limit:**
```
In the absolute worst case, sliding window counter can allow approximately:
- Up to 2× - 1 requests in a window of size W
- For limit=100, worst case ≈ 106 requests
- Error rate ≈ 6%
```

**Why this happens:**
The counter assumes requests are uniformly distributed within each window. When requests cluster at window boundaries, the approximation breaks down.

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Assumption**: In real-world traffic, requests are typically well-distributed, making the approximation very accurate (usually <1% error). The 6% worst case requires adversarial request patterns.</span>

---

**Level 2: How would you implement sliding window with sub-second precision without storing every timestamp?**

Use **sub-windows** (also called micro-batching) to get better precision with bounded memory:

```python
class PreciseSlidingWindow:
    """
    Sliding window with configurable precision.

    Instead of 1 counter per window, use N sub-windows.
    More sub-windows = better precision but more memory.

    Example: 60-second window with 60 sub-windows (1-second precision)
    Only stores 60 integers instead of potentially millions of timestamps.
    """

    def __init__(
        self,
        limit: int,
        window_seconds: int,
        precision_seconds: float = 1.0
    ):
        self.limit = limit
        self.window_seconds = window_seconds
        self.precision_seconds = precision_seconds

        # Number of sub-windows
        self.num_subwindows = int(window_seconds / precision_seconds)

        # Store count per sub-window
        # subwindows[key] = {subwindow_number: count}
        self._subwindows: Dict[str, Dict[int, int]] = defaultdict(dict)
        self._lock = threading.Lock()

    def _get_subwindow(self, timestamp: float) -> int:
        """Get sub-window number for timestamp."""
        return int(timestamp / self.precision_seconds)

    def _calculate_count(self, key: str, now: float) -> float:
        """
        Calculate weighted count across all relevant sub-windows.

        For each sub-window that overlaps with [now - window_seconds, now]:
        - Calculate what fraction of that sub-window is within our window
        - Multiply count by that fraction
        """
        window_start = now - self.window_seconds
        current_subwindow = self._get_subwindow(now)
        start_subwindow = self._get_subwindow(window_start)

        total = 0.0
        subwindows = self._subwindows[key]

        for sw in range(start_subwindow, current_subwindow + 1):
            count = subwindows.get(sw, 0)
            if count == 0:
                continue

            # Calculate weight for this sub-window
            sw_start = sw * self.precision_seconds
            sw_end = sw_start + self.precision_seconds

            # Clamp to our window
            overlap_start = max(sw_start, window_start)
            overlap_end = min(sw_end, now)

            # Weight is fraction of sub-window that overlaps
            weight = (overlap_end - overlap_start) / self.precision_seconds
            total += count * weight

        return total

    def allow(self, key: str) -> bool:
        now = time.time()
        current_subwindow = self._get_subwindow(now)

        with self._lock:
            count = self._calculate_count(key, now)

            if count >= self.limit:
                return False

            # Increment current sub-window
            if current_subwindow not in self._subwindows[key]:
                self._subwindows[key][current_subwindow] = 0
            self._subwindows[key][current_subwindow] += 1

            # Cleanup old sub-windows
            self._cleanup(key, current_subwindow)

            return True

    def _cleanup(self, key: str, current_subwindow: int) -> None:
        """Remove sub-windows outside our window."""
        cutoff = current_subwindow - self.num_subwindows - 1

        stale = [sw for sw in self._subwindows[key] if sw < cutoff]
        for sw in stale:
            del self._subwindows[key][sw]
```

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Trade-off**: With 1-second precision for a 60-second window, you store 60 integers (~240 bytes) per key instead of potentially thousands of timestamps. Error is bounded by precision_seconds / window_seconds.</span>

---

**Level 3: How would you implement rate limiting that considers request "weight" where some requests consume more quota than others, while still using sliding window?**

This requires tracking total weight consumed rather than just request count:

```python
from dataclasses import dataclass
from typing import List, Tuple
from collections import deque

@dataclass
class WeightedRequest:
    timestamp: float
    weight: int

class WeightedSlidingWindow:
    """
    Sliding window that tracks request weights.

    Instead of counting requests, we sum their weights.
    Useful for:
    - Different API endpoints having different costs
    - Batch operations consuming proportional quota
    - Resource-based rate limiting (CPU time, memory, etc.)
    """

    def __init__(self, max_weight: int, window_seconds: int):
        """
        Args:
            max_weight: Maximum total weight allowed per window
            window_seconds: Window size
        """
        self.max_weight = max_weight
        self.window_seconds = window_seconds

        # Store (timestamp, weight) tuples
        self._requests: Dict[str, deque] = defaultdict(deque)
        self._current_weight: Dict[str, int] = defaultdict(int)
        self._lock = threading.Lock()

    def _cleanup_expired(self, key: str, now: float) -> None:
        """Remove expired requests and update current weight."""
        cutoff = now - self.window_seconds
        requests = self._requests[key]

        while requests and requests[0].timestamp <= cutoff:
            expired = requests.popleft()
            self._current_weight[key] -= expired.weight

    def allow(self, key: str, weight: int = 1) -> Tuple[bool, int, float]:
        """
        Check if request with given weight is allowed.

        Args:
            key: Rate limit key
            weight: Cost of this request

        Returns:
            (allowed, remaining_weight, reset_at)
        """
        if weight <= 0:
            raise ValueError(f"Weight must be positive, got {weight}")
        if weight > self.max_weight:
            # Single request exceeds limit - will never succeed
            return (False, 0, float('inf'))

        now = time.time()

        with self._lock:
            self._cleanup_expired(key, now)

            current = self._current_weight[key]

            if current + weight > self.max_weight:
                # Find when enough weight will expire
                requests = self._requests[key]
                weight_needed = current + weight - self.max_weight

                accumulated = 0
                reset_at = now + self.window_seconds

                for req in requests:
                    accumulated += req.weight
                    if accumulated >= weight_needed:
                        reset_at = req.timestamp + self.window_seconds
                        break

                return (False, max(0, self.max_weight - current), reset_at)

            # Add request
            self._requests[key].append(WeightedRequest(now, weight))
            self._current_weight[key] += weight

            remaining = self.max_weight - self._current_weight[key]

            # Reset at is when first request expires
            reset_at = now + self.window_seconds
            if self._requests[key]:
                reset_at = self._requests[key][0].timestamp + self.window_seconds

            return (True, remaining, reset_at)

    def get_available_weight(self, key: str) -> int:
        """Get currently available weight for a key."""
        now = time.time()

        with self._lock:
            self._cleanup_expired(key, now)
            return max(0, self.max_weight - self._current_weight[key])

# Usage example
limiter = WeightedSlidingWindow(max_weight=1000, window_seconds=60)

# Cheap read operation (weight 1)
allowed, remaining, reset = limiter.allow("user:123", weight=1)

# Expensive report generation (weight 50)
allowed, remaining, reset = limiter.allow("user:123", weight=50)

# Very expensive batch import (weight 200)
allowed, remaining, reset = limiter.allow("user:123", weight=200)
```

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Design Choice**: Storing individual weighted requests gives exact accounting but uses O(n) memory. For approximate weighted rate limiting with bounded memory, use the sub-window approach where each sub-window stores total weight instead of count.</span>

</div>

---

## Distributed Rate Limiting

### The Distributed Challenge

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

**Problem**: With multiple application servers, each server has its own rate limiter state. A user could send requests to different servers and effectively multiply their rate limit.

<div style="background: #eff6ff; border-radius: 8px; padding: 20px; margin: 16px 0;">

<div style="text-align: center; color: #8b949e; font-size: 14px; margin-bottom: 16px;">User with 100/min limit sends requests round-robin</div>

<div style="display: flex; justify-content: center; gap: 40px; margin-bottom: 16px;">
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); width: 60px; height: 60px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
<span style="color: #fff; font-size: 12px; font-weight: bold;">Server 1</span>
</div>
<div style="color: #7ee787; font-size: 12px;">50/100</div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); width: 60px; height: 60px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
<span style="color: #fff; font-size: 12px; font-weight: bold;">Server 2</span>
</div>
<div style="color: #7ee787; font-size: 12px;">50/100</div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); width: 60px; height: 60px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
<span style="color: #fff; font-size: 12px; font-weight: bold;">Server 3</span>
</div>
<div style="color: #7ee787; font-size: 12px;">50/100</div>
</div>
</div>

<div style="text-align: center; background: #f85149; color: #fff; padding: 8px 16px; border-radius: 4px; display: inline-block;">
Result: 150 requests/min with 100/min limit!
</div>

</div>

**Solutions:**

| Approach | Pros | Cons | Use When |
|----------|------|------|----------|
| **Centralized (Redis)** | Accurate, simple | Single point of failure, latency | Most cases |
| **Sticky Sessions** | No shared state | Uneven load, failover issues | Simple setups |
| **Gossip Protocol** | Highly available | Eventually consistent | Very high scale |
| **Hybrid** | Best of both | Complex | Large distributed systems |

</div>

### Redis Implementation: Atomic Token Bucket

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0;">

**Why Lua Scripts?**

Redis operations are atomic individually, but rate limiting requires multiple operations:
1. Read current token count
2. Calculate refill
3. Check if enough tokens
4. Decrement if allowed

Without atomicity, race conditions occur:
```
Thread A: Read tokens = 1
Thread B: Read tokens = 1
Thread A: Decrement to 0, allow request
Thread B: Decrement to 0, allow request  // BOTH allowed with 1 token!
```

**Lua Script for Atomic Token Bucket:**

```lua
-- KEYS[1] = rate limit key (e.g., "ratelimit:user:123")
-- ARGV[1] = rate (tokens per second)
-- ARGV[2] = capacity (max tokens)
-- ARGV[3] = current timestamp (with millisecond precision)
-- ARGV[4] = tokens requested
-- ARGV[5] = TTL for the key in seconds

local key = KEYS[1]
local rate = tonumber(ARGV[1])
local capacity = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local requested = tonumber(ARGV[4])
local ttl = tonumber(ARGV[5])

-- Get current state
local data = redis.call('HMGET', key, 'tokens', 'last_update')
local tokens = tonumber(data[1])
local last_update = tonumber(data[2])

-- Initialize if new key
if tokens == nil then
    tokens = capacity
    last_update = now
end

-- Calculate token refill
local elapsed = math.max(0, now - last_update)
local refill = elapsed * rate
tokens = math.min(capacity, tokens + refill)

-- Prepare response
local allowed = 0
local remaining = math.floor(tokens)
local retry_after = -1

if tokens >= requested then
    -- Allow request
    allowed = 1
    tokens = tokens - requested
    remaining = math.floor(tokens)
else
    -- Deny request - calculate retry time
    local tokens_needed = requested - tokens
    retry_after = tokens_needed / rate
end

-- Update state
redis.call('HMSET', key, 'tokens', tokens, 'last_update', now)
redis.call('EXPIRE', key, ttl)

-- Return: allowed (0/1), remaining tokens, retry_after seconds (-1 if allowed)
return {allowed, remaining, retry_after}
```

</div>

### Python Redis Rate Limiter

```python
import redis
import time
from dataclasses import dataclass
from typing import Optional
import hashlib

@dataclass
class DistributedRateLimitResult:
    allowed: bool
    remaining: int
    retry_after: Optional[float]
    limit: int
    reset_at: float

class RedisRateLimiter:
    """
    Distributed rate limiter using Redis.

    Features:
    - Atomic operations via Lua scripting
    - Millisecond precision
    - Automatic key expiration
    - Connection pooling
    - Graceful degradation on Redis failure
    """

    # Lua script for atomic token bucket
    TOKEN_BUCKET_SCRIPT = """
    local key = KEYS[1]
    local rate = tonumber(ARGV[1])
    local capacity = tonumber(ARGV[2])
    local now = tonumber(ARGV[3])
    local requested = tonumber(ARGV[4])
    local ttl = tonumber(ARGV[5])

    local data = redis.call('HMGET', key, 'tokens', 'last_update')
    local tokens = tonumber(data[1])
    local last_update = tonumber(data[2])

    if tokens == nil then
        tokens = capacity
        last_update = now
    end

    local elapsed = math.max(0, now - last_update)
    tokens = math.min(capacity, tokens + elapsed * rate)

    local allowed = 0
    local remaining = math.floor(tokens)
    local retry_after = -1

    if tokens >= requested then
        allowed = 1
        tokens = tokens - requested
        remaining = math.floor(tokens)
    else
        retry_after = (requested - tokens) / rate
    end

    redis.call('HMSET', key, 'tokens', tokens, 'last_update', now)
    redis.call('EXPIRE', key, ttl)

    return {allowed, remaining, retry_after}
    """

    def __init__(
        self,
        redis_client: redis.Redis,
        rate: float,
        capacity: int,
        key_prefix: str = "ratelimit:",
        ttl: int = 3600
    ):
        """
        Args:
            redis_client: Redis connection (should use connection pool)
            rate: Tokens per second
            capacity: Maximum tokens
            key_prefix: Prefix for Redis keys
            ttl: Key expiration in seconds
        """
        self.redis = redis_client
        self.rate = rate
        self.capacity = capacity
        self.key_prefix = key_prefix
        self.ttl = ttl

        # Register Lua script
        self._script = self.redis.register_script(self.TOKEN_BUCKET_SCRIPT)

    def _make_key(self, identifier: str) -> str:
        """Create Redis key for identifier."""
        # Hash long identifiers to keep key size bounded
        if len(identifier) > 100:
            identifier = hashlib.sha256(identifier.encode()).hexdigest()[:32]
        return f"{self.key_prefix}{identifier}"

    def allow(
        self,
        identifier: str,
        tokens: int = 1
    ) -> DistributedRateLimitResult:
        """
        Check rate limit for identifier.

        Args:
            identifier: Unique identifier (user ID, IP, API key)
            tokens: Number of tokens to consume
        """
        key = self._make_key(identifier)
        now = time.time()

        try:
            result = self._script(
                keys=[key],
                args=[self.rate, self.capacity, now, tokens, self.ttl]
            )

            allowed = bool(result[0])
            remaining = int(result[1])
            retry_after = float(result[2]) if result[2] > 0 else None

            # Calculate reset time
            if allowed:
                tokens_to_full = self.capacity - remaining
                reset_at = now + (tokens_to_full / self.rate)
            else:
                reset_at = now + retry_after if retry_after else now + self.ttl

            return DistributedRateLimitResult(
                allowed=allowed,
                remaining=remaining,
                retry_after=retry_after,
                limit=self.capacity,
                reset_at=reset_at
            )

        except redis.RedisError as e:
            # Graceful degradation - fail open with warning
            import logging
            logging.warning(f"Redis rate limiter error: {e}, failing open")

            return DistributedRateLimitResult(
                allowed=True,
                remaining=self.capacity,
                retry_after=None,
                limit=self.capacity,
                reset_at=now + (self.capacity / self.rate)
            )

    def get_status(self, identifier: str) -> dict:
        """Get current rate limit status without consuming tokens."""
        key = self._make_key(identifier)

        try:
            data = self.redis.hgetall(key)
            if not data:
                return {
                    'tokens': self.capacity,
                    'last_update': time.time(),
                    'exists': False
                }

            return {
                'tokens': float(data.get(b'tokens', self.capacity)),
                'last_update': float(data.get(b'last_update', time.time())),
                'exists': True
            }
        except redis.RedisError:
            return {'error': 'Redis unavailable'}


class RedisClusterRateLimiter:
    """
    Rate limiter for Redis Cluster deployment.

    Key consideration: In Redis Cluster, keys are distributed across shards.
    Lua scripts can only operate on keys in the same shard.

    Solution: Use hash tags to ensure related keys go to same shard.
    """

    def __init__(
        self,
        redis_cluster: redis.RedisCluster,
        rate: float,
        capacity: int
    ):
        self.redis = redis_cluster
        self.rate = rate
        self.capacity = capacity
        self._script = self.redis.register_script(
            RedisRateLimiter.TOKEN_BUCKET_SCRIPT
        )

    def _make_key(self, identifier: str) -> str:
        """
        Create key with hash tag for cluster.

        Hash tags ensure the key goes to specific shard.
        Format: ratelimit:{user_id}:bucket
        The {user_id} part determines the shard.
        """
        return f"ratelimit:{{{identifier}}}:bucket"

    def allow(self, identifier: str, tokens: int = 1) -> DistributedRateLimitResult:
        """Same as single-node implementation."""
        # Implementation identical to RedisRateLimiter.allow()
        # The hash tag in the key ensures cluster compatibility
        pass
```

#### Interview Questions: Distributed Rate Limiting

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**Level 1: Why can't we just use Redis INCR with EXPIRE for rate limiting?**

The naive approach has several problems:

```python
# Naive implementation - DON'T DO THIS
def naive_rate_limit(redis, key, limit, window):
    current = redis.incr(key)
    if current == 1:
        redis.expire(key, window)
    return current <= limit
```

**Problems:**

1. **Race condition on EXPIRE**: If the process crashes between INCR and EXPIRE, the key never expires, blocking the user forever.

2. **Fixed window boundary issue**: Counter resets at arbitrary times based on when the first request arrived, not at consistent intervals.

3. **No burst control**: Can't allow bursts while maintaining average rate.

**Partial fix using SET with NX and EX:**
```python
def better_naive(redis, key, limit, window):
    # Atomic increment that sets expiry on creation
    pipe = redis.pipeline()
    pipe.incr(key)
    pipe.expire(key, window)
    current, _ = pipe.execute()
    return current <= limit
```

Still has fixed window problem. Token bucket or sliding window is better.

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Key Insight**: Simple INCR doesn't model time-based token replenishment. You need to track both count AND time to properly refill tokens.</span>

---

**Level 2: How do you handle clock skew between application servers when using distributed rate limiting?**

Clock skew occurs when different servers have slightly different system times. This can cause:
- Tokens being "refilled from the future" if server B's clock is ahead
- Tokens being consumed before they exist if server A's clock is behind

**Mitigation Strategies:**

1. **Use Redis Server Time:**
```lua
-- In Lua script, use Redis TIME command
local time_result = redis.call('TIME')
local now = tonumber(time_result[1]) + tonumber(time_result[2]) / 1000000
```
All calculations use Redis's clock, which is consistent.

2. **Bound the Skew:**
```python
def get_rate_limit_time() -> float:
    """Get time for rate limiting with skew protection."""
    local_time = time.time()

    # Fetch Redis time periodically (cache for 1 second)
    if needs_refresh():
        redis_time = get_redis_time()
        skew = redis_time - local_time

        # Alert if skew is significant
        if abs(skew) > 1.0:
            alert_ops(f"Clock skew detected: {skew}s")

        cache_skew(skew)

    # Apply cached skew adjustment
    return local_time + get_cached_skew()
```

3. **Monotonic Sequence Numbers:**
```python
class SkewResistantLimiter:
    """
    Use sequence numbers instead of timestamps.

    Each "tick" is a rate limit period, not a timestamp.
    Ticks are incremented by a single source (Redis).
    """

    def get_current_tick(self) -> int:
        """Get current tick from Redis."""
        # Redis INCR provides monotonic sequence
        # Tick changes every 'period' seconds
        period = self.window_seconds

        # Use Redis TIME for consistency
        redis_time = self.redis.time()
        return int(redis_time[0] // period)
```

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Trade-off**: Using Redis TIME adds a round trip. For high-throughput systems, accept small clock skew tolerance (few hundred ms) and use local time with periodic sync verification.</span>

---

**Level 3: How would you implement a hierarchical rate limiter that enforces limits at user, organization, and global levels simultaneously?**

This is a common enterprise requirement where:
- User: 100 req/min
- Organization (all users): 10,000 req/min
- Global (all organizations): 1,000,000 req/min

```python
from dataclasses import dataclass
from typing import List, Optional, Dict
from enum import Enum

class LimitLevel(Enum):
    USER = "user"
    ORGANIZATION = "org"
    GLOBAL = "global"

@dataclass
class HierarchicalLimit:
    level: LimitLevel
    rate: float
    capacity: int
    key_template: str  # e.g., "user:{user_id}", "org:{org_id}"

@dataclass
class HierarchicalResult:
    allowed: bool
    limiting_level: Optional[LimitLevel]
    limits: Dict[LimitLevel, dict]  # Status at each level

class HierarchicalRateLimiter:
    """
    Multi-level rate limiter.

    Design considerations:
    1. Check limits from most specific (user) to least specific (global)
    2. Early exit on first denial saves Redis calls
    3. Atomic consumption at all levels to prevent partial updates
    4. Rollback mechanism if higher level denies after lower allows
    """

    # Lua script that checks and consumes at all levels atomically
    HIERARCHICAL_SCRIPT = """
    -- KEYS: rate limit keys for each level (most specific first)
    -- ARGV: [rate, capacity, now, requested, ttl] repeated for each level

    local num_levels = #KEYS
    local args_per_level = 5

    local results = {}
    local all_allowed = true
    local first_denied_level = nil

    -- First pass: check all levels
    for i = 1, num_levels do
        local key = KEYS[i]
        local offset = (i - 1) * args_per_level
        local rate = tonumber(ARGV[offset + 1])
        local capacity = tonumber(ARGV[offset + 2])
        local now = tonumber(ARGV[offset + 3])
        local requested = tonumber(ARGV[offset + 4])
        local ttl = tonumber(ARGV[offset + 5])

        local data = redis.call('HMGET', key, 'tokens', 'last_update')
        local tokens = tonumber(data[1]) or capacity
        local last_update = tonumber(data[2]) or now

        local elapsed = math.max(0, now - last_update)
        tokens = math.min(capacity, tokens + elapsed * rate)

        results[i] = {
            key = key,
            tokens = tokens,
            last_update = now,
            rate = rate,
            capacity = capacity,
            ttl = ttl,
            requested = requested,
            allowed = tokens >= requested
        }

        if not results[i].allowed then
            all_allowed = false
            if first_denied_level == nil then
                first_denied_level = i
            end
        end
    end

    -- Second pass: consume tokens only if all levels allow
    if all_allowed then
        for i = 1, num_levels do
            local r = results[i]
            local new_tokens = r.tokens - r.requested
            redis.call('HMSET', r.key, 'tokens', new_tokens, 'last_update', r.last_update)
            redis.call('EXPIRE', r.key, r.ttl)
            results[i].remaining = math.floor(new_tokens)
        end
    else
        -- Return remaining without consuming
        for i = 1, num_levels do
            results[i].remaining = math.floor(results[i].tokens)
        end
    end

    -- Build response: [allowed (0/1), denied_level, level1_remaining, level2_remaining, ...]
    local response = {all_allowed and 1 or 0, first_denied_level or 0}
    for i = 1, num_levels do
        table.insert(response, results[i].remaining)
    end

    return response
    """

    def __init__(
        self,
        redis_client: redis.Redis,
        limits: List[HierarchicalLimit]
    ):
        """
        Args:
            redis_client: Redis connection
            limits: List of limits from most specific to least specific
        """
        self.redis = redis_client
        self.limits = limits
        self._script = redis_client.register_script(self.HIERARCHICAL_SCRIPT)

    def allow(
        self,
        identifiers: Dict[LimitLevel, str],
        tokens: int = 1
    ) -> HierarchicalResult:
        """
        Check rate limit at all levels.

        Args:
            identifiers: Map of level to identifier value
                e.g., {USER: "user123", ORGANIZATION: "org456", GLOBAL: "global"}
            tokens: Tokens to consume
        """
        now = time.time()

        keys = []
        args = []

        for limit in self.limits:
            identifier = identifiers.get(limit.level, "default")
            key = limit.key_template.format(**{limit.level.value: identifier})
            keys.append(f"ratelimit:{key}")

            args.extend([
                limit.rate,
                limit.capacity,
                now,
                tokens,
                3600  # TTL
            ])

        try:
            result = self._script(keys=keys, args=args)

            allowed = bool(result[0])
            denied_level_idx = result[1]
            remaining_values = result[2:]

            # Build detailed response
            limits_status = {}
            for i, limit in enumerate(self.limits):
                limits_status[limit.level] = {
                    'remaining': remaining_values[i],
                    'limit': limit.capacity,
                    'rate': limit.rate
                }

            limiting_level = None
            if not allowed and denied_level_idx > 0:
                limiting_level = self.limits[denied_level_idx - 1].level

            return HierarchicalResult(
                allowed=allowed,
                limiting_level=limiting_level,
                limits=limits_status
            )

        except redis.RedisError as e:
            # Fail open with all limits at capacity
            return HierarchicalResult(
                allowed=True,
                limiting_level=None,
                limits={l.level: {'remaining': l.capacity, 'limit': l.capacity}
                        for l in self.limits}
            )

# Usage
limiter = HierarchicalRateLimiter(
    redis_client=redis.Redis(),
    limits=[
        HierarchicalLimit(LimitLevel.USER, rate=100/60, capacity=100,
                          key_template="user:{user}"),
        HierarchicalLimit(LimitLevel.ORGANIZATION, rate=10000/60, capacity=10000,
                          key_template="org:{org}"),
        HierarchicalLimit(LimitLevel.GLOBAL, rate=1000000/60, capacity=100000,
                          key_template="global"),
    ]
)

result = limiter.allow(
    identifiers={
        LimitLevel.USER: "user123",
        LimitLevel.ORGANIZATION: "org456",
        LimitLevel.GLOBAL: "global"
    }
)
```

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Design Choice**: All-or-nothing consumption prevents partial state corruption. If global limit denies but user limit would allow, we don't consume user tokens - this prevents confusing scenarios where users see their quota decrease without successful requests.</span>

</div>

---

## Testing Strategies

### Unit Testing Rate Limiters

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0;">

**Key Testing Challenges:**

1. **Time-dependent behavior**: Tests must control time
2. **Concurrency**: Race conditions are hard to reproduce
3. **Boundary conditions**: Edge cases at limit boundaries
4. **Distributed state**: Testing Redis interactions

</div>

```python
import unittest
from unittest.mock import Mock, patch, MagicMock
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

class MockTime:
    """Mock time for deterministic testing."""

    def __init__(self, start_time: float = 0.0):
        self._current_time = start_time
        self._monotonic_time = 0.0

    def time(self) -> float:
        return self._current_time

    def monotonic(self) -> float:
        return self._monotonic_time

    def sleep(self, seconds: float) -> None:
        self._current_time += seconds
        self._monotonic_time += seconds

    def advance(self, seconds: float) -> None:
        """Advance time without blocking."""
        self._current_time += seconds
        self._monotonic_time += seconds


class TestTokenBucket(unittest.TestCase):
    """Comprehensive token bucket tests."""

    def setUp(self):
        self.mock_time = MockTime(start_time=1000.0)
        self.time_patcher = patch('time.time', self.mock_time.time)
        self.monotonic_patcher = patch('time.monotonic', self.mock_time.monotonic)
        self.time_patcher.start()
        self.monotonic_patcher.start()

    def tearDown(self):
        self.time_patcher.stop()
        self.monotonic_patcher.stop()

    def test_initial_state_is_full(self):
        """Bucket should start at full capacity."""
        bucket = TokenBucket(rate=10, capacity=20)

        self.assertEqual(bucket.peek(), 20)

    def test_consume_reduces_tokens(self):
        """Consuming tokens should reduce available count."""
        bucket = TokenBucket(rate=10, capacity=20)

        result = bucket.allow(tokens=5)

        self.assertTrue(result.allowed)
        self.assertEqual(result.remaining, 15)

    def test_cannot_consume_more_than_available(self):
        """Request should be denied if not enough tokens."""
        bucket = TokenBucket(rate=10, capacity=5)

        result = bucket.allow(tokens=10)

        self.assertFalse(result.allowed)
        self.assertIsNotNone(result.retry_after)

    def test_tokens_refill_over_time(self):
        """Tokens should refill based on elapsed time and rate."""
        bucket = TokenBucket(rate=10, capacity=20)

        # Consume all tokens
        bucket.allow(tokens=20)
        self.assertEqual(bucket.peek(), 0)

        # Advance time by 1 second (should add 10 tokens)
        self.mock_time.advance(1.0)

        self.assertEqual(bucket.peek(), 10)

    def test_tokens_cap_at_capacity(self):
        """Tokens should not exceed capacity."""
        bucket = TokenBucket(rate=10, capacity=20)

        # Consume some tokens
        bucket.allow(tokens=5)
        self.assertEqual(bucket.peek(), 15)

        # Wait long enough to theoretically refill 100 tokens
        self.mock_time.advance(10.0)

        # Should be capped at 20
        self.assertEqual(bucket.peek(), 20)

    def test_fractional_refill(self):
        """Tokens should refill with fractional precision."""
        bucket = TokenBucket(rate=10, capacity=20)

        bucket.allow(tokens=20)

        # Advance 0.5 seconds (should add 5 tokens)
        self.mock_time.advance(0.5)

        result = bucket.allow(tokens=5)
        self.assertTrue(result.allowed)

        # Trying to consume 1 more should fail
        result = bucket.allow(tokens=1)
        self.assertFalse(result.allowed)

    def test_retry_after_calculation(self):
        """Retry-after should indicate when request can succeed."""
        bucket = TokenBucket(rate=10, capacity=20)

        bucket.allow(tokens=20)

        # Try to consume 5 tokens (need 0.5 seconds)
        result = bucket.allow(tokens=5)

        self.assertFalse(result.allowed)
        self.assertAlmostEqual(result.retry_after, 0.5, places=2)

    def test_burst_behavior(self):
        """Bucket should allow burst up to capacity."""
        bucket = TokenBucket(rate=1, capacity=100)  # 1/sec but burst of 100

        # Should allow 100 requests immediately
        for i in range(100):
            result = bucket.allow()
            self.assertTrue(result.allowed, f"Request {i+1} should be allowed")

        # Request 101 should be denied
        result = bucket.allow()
        self.assertFalse(result.allowed)

    def test_request_exceeding_capacity_never_succeeds(self):
        """Request larger than capacity should always fail."""
        bucket = TokenBucket(rate=10, capacity=5)

        result = bucket.allow(tokens=10)

        self.assertFalse(result.allowed)
        self.assertIsNone(result.retry_after)  # Will never succeed


class TestTokenBucketConcurrency(unittest.TestCase):
    """Test thread safety of token bucket."""

    def test_concurrent_consumption_is_safe(self):
        """Multiple threads consuming tokens should not cause over-consumption."""
        bucket = TokenBucket(rate=0, capacity=100)  # No refill

        successful_requests = []

        def try_consume():
            result = bucket.allow(tokens=1)
            return result.allowed

        with ThreadPoolExecutor(max_workers=200) as executor:
            futures = [executor.submit(try_consume) for _ in range(200)]
            results = [f.result() for f in as_completed(futures)]

        allowed_count = sum(results)

        # Exactly 100 should succeed
        self.assertEqual(allowed_count, 100)

    def test_concurrent_peek_is_consistent(self):
        """Peek should return consistent values under concurrency."""
        bucket = TokenBucket(rate=0, capacity=100)

        def peek_and_consume():
            before = bucket.peek()
            bucket.allow(tokens=1)
            after = bucket.peek()
            return before >= after  # Should always be true or equal

        with ThreadPoolExecutor(max_workers=50) as executor:
            futures = [executor.submit(peek_and_consume) for _ in range(100)]
            results = [f.result() for f in futures]

        self.assertTrue(all(results))


class TestSlidingWindow(unittest.TestCase):
    """Test sliding window rate limiter."""

    def setUp(self):
        self.mock_time = MockTime(start_time=1000.0)
        self.time_patcher = patch('time.time', self.mock_time.time)
        self.time_patcher.start()

    def tearDown(self):
        self.time_patcher.stop()

    def test_boundary_protection(self):
        """Sliding window should prevent boundary abuse."""
        limiter = SlidingWindowCounter(limit=100, window_seconds=60)

        # Consume at end of window 1
        self.mock_time._current_time = 1059.0  # 59 seconds in
        for _ in range(100):
            limiter.allow("user")

        # Move to start of window 2
        self.mock_time._current_time = 1060.0

        # Should not allow 100 more immediately
        # Because weighted count includes previous window
        allowed = 0
        for _ in range(100):
            if limiter.allow("user").allowed:
                allowed += 1

        # Should allow significantly fewer than 100
        self.assertLess(allowed, 10)


class TestRedisRateLimiter(unittest.TestCase):
    """Test Redis-based rate limiter with mocked Redis."""

    def test_lua_script_execution(self):
        """Test that Lua script is called with correct parameters."""
        mock_redis = MagicMock()
        mock_script = MagicMock()
        mock_script.return_value = [1, 19, -1]  # allowed, remaining, retry_after
        mock_redis.register_script.return_value = mock_script

        limiter = RedisRateLimiter(
            redis_client=mock_redis,
            rate=10,
            capacity=20,
            key_prefix="test:",
            ttl=3600
        )

        result = limiter.allow("user123")

        self.assertTrue(result.allowed)
        self.assertEqual(result.remaining, 19)

        # Verify script was called with correct key
        mock_script.assert_called_once()
        call_args = mock_script.call_args
        self.assertEqual(call_args[1]['keys'], ['test:user123'])

    def test_graceful_degradation_on_redis_error(self):
        """Should fail open when Redis is unavailable."""
        mock_redis = MagicMock()
        mock_script = MagicMock()
        mock_script.side_effect = redis.RedisError("Connection refused")
        mock_redis.register_script.return_value = mock_script

        limiter = RedisRateLimiter(
            redis_client=mock_redis,
            rate=10,
            capacity=20
        )

        result = limiter.allow("user123")

        # Should allow when Redis fails (fail open)
        self.assertTrue(result.allowed)


class TestRateLimiterIntegration(unittest.TestCase):
    """Integration tests with real Redis (requires running Redis)."""

    @unittest.skipUnless(
        os.environ.get('REDIS_TEST_HOST'),
        "Set REDIS_TEST_HOST to run Redis integration tests"
    )
    def test_distributed_consistency(self):
        """Multiple clients should see consistent rate limits."""
        redis_client = redis.Redis(
            host=os.environ['REDIS_TEST_HOST'],
            decode_responses=False
        )

        # Clean up before test
        redis_client.delete("ratelimit:integration_test")

        limiter1 = RedisRateLimiter(redis_client, rate=10, capacity=10)
        limiter2 = RedisRateLimiter(redis_client, rate=10, capacity=10)

        # Consume from both "servers"
        results = []
        for _ in range(5):
            results.append(limiter1.allow("integration_test"))
            results.append(limiter2.allow("integration_test"))

        allowed = sum(1 for r in results if r.allowed)

        # Exactly 10 should be allowed
        self.assertEqual(allowed, 10)
```

#### Interview Questions: Testing Strategies

<div style="background: linear-gradient(135deg, #4a3a5d 0%, #2d1f3d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**Level 1: How do you test time-dependent code without making tests slow or flaky?**

**The Problem:** Real time-based tests are:
- Slow (waiting for actual seconds/minutes)
- Flaky (timing variations cause intermittent failures)
- Non-deterministic (hard to reproduce failures)

**Solution: Time Abstraction**

```python
from abc import ABC, abstractmethod

class Clock(ABC):
    """Abstract clock interface for time operations."""

    @abstractmethod
    def now(self) -> float:
        """Return current timestamp."""
        pass

    @abstractmethod
    def monotonic(self) -> float:
        """Return monotonic time."""
        pass

class RealClock(Clock):
    """Production clock using system time."""

    def now(self) -> float:
        return time.time()

    def monotonic(self) -> float:
        return time.monotonic()

class FakeClock(Clock):
    """Fake clock for testing with controllable time."""

    def __init__(self, initial_time: float = 0.0):
        self._time = initial_time
        self._monotonic = 0.0

    def now(self) -> float:
        return self._time

    def monotonic(self) -> float:
        return self._monotonic

    def advance(self, seconds: float) -> None:
        """Advance time by given seconds."""
        self._time += seconds
        self._monotonic += seconds

    def set_time(self, timestamp: float) -> None:
        """Set absolute time."""
        self._time = timestamp

# Usage in rate limiter
class TokenBucket:
    def __init__(self, rate: float, capacity: int, clock: Clock = None):
        self.clock = clock or RealClock()
        # ... rest of init

    def allow(self, tokens: int = 1) -> RateLimitResult:
        now = self.clock.monotonic()
        # ... rest of implementation

# In tests
def test_token_refill():
    fake_clock = FakeClock()
    bucket = TokenBucket(rate=10, capacity=20, clock=fake_clock)

    bucket.allow(tokens=20)
    fake_clock.advance(1.0)  # Instant "time travel"

    result = bucket.allow(tokens=10)
    assert result.allowed
```

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Design Pattern**: Dependency injection of the clock makes tests deterministic while keeping production code simple. This is the "humble object" pattern from TDD.</span>

---

**Level 2: How do you test for race conditions in concurrent rate limiter implementations?**

Race conditions are notoriously hard to test because they depend on specific thread scheduling. Here are strategies:

**1. Stress Testing with High Contention:**
```python
def test_concurrent_safety():
    """Stress test for race conditions."""
    limiter = TokenBucket(rate=0, capacity=1000)  # No refill

    results = []
    barrier = threading.Barrier(100)  # Synchronize start

    def worker():
        barrier.wait()  # All threads start simultaneously
        local_results = []
        for _ in range(100):
            result = limiter.allow()
            local_results.append(result.allowed)
        return local_results

    with ThreadPoolExecutor(max_workers=100) as executor:
        futures = [executor.submit(worker) for _ in range(100)]
        for future in futures:
            results.extend(future.result())

    # With 100 threads × 100 requests = 10,000 attempts
    # Exactly 1000 should succeed
    allowed = sum(results)
    assert allowed == 1000, f"Got {allowed}, expected 1000"
```

**2. ThreadSanitizer / Race Detector:**
```bash
# Python with thread sanitizer (limited support)
# Better: Go has built-in race detector
go test -race ./...
```

**3. Deterministic Scheduling with Hypothesis:**
```python
from hypothesis import given, strategies as st, settings
from hypothesis.stateful import RuleBasedStateMachine, rule, Bundle

class RateLimiterStateMachine(RuleBasedStateMachine):
    """Property-based testing for rate limiter invariants."""

    def __init__(self):
        super().__init__()
        self.limiter = TokenBucket(rate=10, capacity=100)
        self.consumed = 0

    @rule(tokens=st.integers(min_value=1, max_value=10))
    def consume(self, tokens):
        result = self.limiter.allow(tokens)
        if result.allowed:
            self.consumed += tokens

        # Invariant: consumed should never exceed capacity
        assert self.consumed <= 100

TestRateLimiter = RateLimiterStateMachine.TestCase
```

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Key Insight**: Testing proves the presence of bugs, not their absence. For concurrent code, combine stress tests (find obvious races), property tests (find subtle invariant violations), and code review focused on critical sections.</span>

---

**Level 3: How would you implement chaos testing for a distributed rate limiter to verify it behaves correctly during partial failures?**

Chaos testing validates behavior during realistic failure scenarios:

```python
import random
from contextlib import contextmanager
from typing import Generator
from unittest.mock import patch

class ChaosProxy:
    """
    Proxy that injects failures into Redis operations.

    Failure modes:
    1. Connection failures
    2. Timeout/slow responses
    3. Partial failures (some keys fail)
    4. Data corruption (unlikely but testable)
    """

    def __init__(
        self,
        real_redis: redis.Redis,
        failure_rate: float = 0.1,
        latency_ms: tuple = (0, 100)
    ):
        self.real_redis = real_redis
        self.failure_rate = failure_rate
        self.latency_ms = latency_ms
        self.failure_count = 0
        self.success_count = 0

    def _maybe_fail(self) -> None:
        """Randomly inject failure."""
        if random.random() < self.failure_rate:
            self.failure_count += 1
            raise redis.RedisError("Chaos: Simulated failure")

    def _maybe_delay(self) -> None:
        """Randomly inject latency."""
        delay = random.uniform(*self.latency_ms) / 1000
        time.sleep(delay)

    def execute_command(self, *args, **kwargs):
        self._maybe_delay()
        self._maybe_fail()
        self.success_count += 1
        return self.real_redis.execute_command(*args, **kwargs)

    def __getattr__(self, name):
        """Proxy all other methods to real Redis."""
        attr = getattr(self.real_redis, name)
        if callable(attr):
            def wrapper(*args, **kwargs):
                self._maybe_delay()
                self._maybe_fail()
                return attr(*args, **kwargs)
            return wrapper
        return attr


class ChaosTestSuite:
    """
    Chaos test scenarios for distributed rate limiter.
    """

    def __init__(self, real_redis: redis.Redis):
        self.real_redis = real_redis

    @contextmanager
    def redis_failures(
        self,
        failure_rate: float
    ) -> Generator[ChaosProxy, None, None]:
        """Context manager for injecting Redis failures."""
        chaos = ChaosProxy(self.real_redis, failure_rate=failure_rate)
        yield chaos
        print(f"Chaos stats: {chaos.failure_count} failures, "
              f"{chaos.success_count} successes")

    def test_graceful_degradation(self):
        """
        Test: System should remain functional during partial Redis failures.

        Expected behavior:
        - Some requests may fail temporarily
        - System should not crash
        - Metrics should be available
        - Recovery should be automatic when Redis returns
        """
        with self.redis_failures(failure_rate=0.3) as chaos:
            limiter = RedisRateLimiter(chaos, rate=100, capacity=1000)

            results = {'allowed': 0, 'denied': 0, 'errors': 0}

            for _ in range(1000):
                try:
                    result = limiter.allow("test_user")
                    if result.allowed:
                        results['allowed'] += 1
                    else:
                        results['denied'] += 1
                except Exception as e:
                    results['errors'] += 1

            # Verify graceful degradation
            # - Should have some successful operations
            # - Errors should be bounded
            assert results['allowed'] > 0, "No requests succeeded"
            assert results['errors'] < 400, "Too many errors"

    def test_recovery_after_outage(self):
        """
        Test: Rate limiting should resume correctly after Redis recovers.
        """
        limiter = RedisRateLimiter(self.real_redis, rate=10, capacity=100)

        # Normal operation
        for _ in range(50):
            limiter.allow("recovery_test")

        # Simulate outage (patch Redis to fail)
        with patch.object(self.real_redis, 'execute_command',
                         side_effect=redis.RedisError("Outage")):
            # Requests during outage (fail open)
            for _ in range(100):
                result = limiter.allow("recovery_test")
                # Should fail open during outage

        # Recovery - Redis working again
        # State should be preserved from before outage
        result = limiter.allow("recovery_test")

        # Verify state continuity
        status = limiter.get_status("recovery_test")
        assert status.get('exists', False), "State lost after outage"

    def test_network_partition(self):
        """
        Test: Behavior when Redis is partitioned from some app servers.

        Simulates: Server A can reach Redis, Server B cannot.
        """
        limiter_a = RedisRateLimiter(self.real_redis, rate=10, capacity=100)

        # Server B has failing Redis
        failing_redis = ChaosProxy(self.real_redis, failure_rate=1.0)
        limiter_b = RedisRateLimiter(failing_redis, rate=10, capacity=100)

        # Both servers process requests
        results_a = [limiter_a.allow("partition_test").allowed for _ in range(50)]
        results_b = [limiter_b.allow("partition_test").allowed for _ in range(50)]

        # Server A should rate limit normally
        assert sum(results_a) <= 100

        # Server B should fail open (all allowed in degraded mode)
        assert sum(results_b) == 50  # All allowed when failing open

        # WARNING: This means user could exceed limit during partition!
        # This is acceptable trade-off for availability.

# Running chaos tests
def run_chaos_tests():
    redis_client = redis.Redis(host='localhost')
    suite = ChaosTestSuite(redis_client)

    print("Running graceful degradation test...")
    suite.test_graceful_degradation()

    print("Running recovery test...")
    suite.test_recovery_after_outage()

    print("Running partition test...")
    suite.test_network_partition()

    print("All chaos tests passed!")
```

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Production Reality**: Chaos testing reveals that distributed rate limiting has inherent CAP theorem trade-offs. During partitions, you must choose between accuracy (fail closed, potentially causing outage) or availability (fail open, potentially allowing abuse). Most systems choose availability.</span>

</div>

---

## Algorithm Comparison

<div style="background: #eff6ff; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">

| Algorithm | Time | Space | Accuracy | Burst | Best For |
|-----------|------|-------|----------|-------|----------|
| **Token Bucket** | O(1) | O(1)/key | High | Yes | API rate limiting |
| **Leaky Bucket** | O(1) | O(1)/key | High | No | Traffic shaping |
| **Fixed Window** | O(1) | O(1)/key | Low | N/A | Rough estimates |
| **Sliding Window Counter** | O(1) | O(1)/key | ~94% | N/A | Smooth rate limiting |
| **Sliding Window Log** | O(n) | O(n)/key | 100% | N/A | Compliance/billing |

**Memory Per Key:**
- Token Bucket: ~32 bytes (tokens + timestamp + padding)
- Sliding Window Counter: ~48 bytes (2 counters + 2 timestamps)
- Sliding Window Log: 8 bytes × requests in window

</div>

---

## Production Considerations

### HTTP Response Headers

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0;">

```http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1706012400
Retry-After: 30
Content-Type: application/json

{
    "error": "rate_limit_exceeded",
    "message": "Too many requests. Please retry after 30 seconds.",
    "documentation_url": "https://api.example.com/docs/rate-limits"
}
```

**Standard Headers:**
| Header | Description | Format |
|--------|-------------|--------|
| `X-RateLimit-Limit` | Maximum requests per window | Integer |
| `X-RateLimit-Remaining` | Remaining requests in window | Integer |
| `X-RateLimit-Reset` | When the limit resets | Unix timestamp |
| `Retry-After` | Seconds until retry (on 429) | Integer seconds |

</div>

### Monitoring and Alerting

```python
from dataclasses import dataclass
from typing import Dict
import prometheus_client as prom

# Prometheus metrics
rate_limit_requests = prom.Counter(
    'rate_limit_requests_total',
    'Total rate limit checks',
    ['key_type', 'result']  # result: allowed, denied
)

rate_limit_tokens = prom.Gauge(
    'rate_limit_tokens_remaining',
    'Current tokens remaining',
    ['key']
)

rate_limit_latency = prom.Histogram(
    'rate_limit_check_duration_seconds',
    'Time to check rate limit',
    buckets=[.001, .005, .01, .025, .05, .1]
)

class InstrumentedRateLimiter:
    """Rate limiter with observability."""

    def __init__(self, limiter: RedisRateLimiter, key_type: str = "user"):
        self.limiter = limiter
        self.key_type = key_type

    def allow(self, key: str, tokens: int = 1) -> DistributedRateLimitResult:
        with rate_limit_latency.time():
            result = self.limiter.allow(key, tokens)

        # Record metrics
        status = "allowed" if result.allowed else "denied"
        rate_limit_requests.labels(
            key_type=self.key_type,
            result=status
        ).inc()

        rate_limit_tokens.labels(key=key).set(result.remaining)

        return result
```

---

## Cross-References

- [[distributed-systems]](/topics/system-design/distributed-systems) - CAP theorem implications for rate limiting
- [[redis]](/topics/databases/redis) - Redis data structures and Lua scripting
- [[api-gateway]](/topics/system-design/api-gateway) - Gateway-level rate limiting
- [[caching]](/topics/system-design/caching) - Caching rate limit decisions
- [[circuit-breaker]](/topics/design-patterns/circuit-breaker) - Complementary resilience pattern
- [[load-balancing]](/topics/system-design/load-balancing) - Sticky sessions for local rate limiting

---

## Key Takeaways

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

1. **Algorithm Selection**: Token bucket for APIs (allows bursts), sliding window for strict enforcement, leaky bucket for traffic shaping

2. **Distributed Systems**: Use Redis with Lua scripts for atomicity; accept that CAP theorem means trade-offs during partitions

3. **Graceful Degradation**: Fail open with stricter local limits rather than complete denial during outages

4. **Testing**: Mock time for unit tests, use chaos testing for distributed scenarios, property-based tests for invariants

5. **Observability**: Track allowed/denied rates, latency percentiles, and set alerts for unusual patterns

<span style="background: linear-gradient(90deg, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0.1) 100%); padding: 2px 8px; border-radius: 4px; border-left: 3px solid #2ecc71;">**Interview Tip**: Always discuss the trade-offs. There's no perfect rate limiter - the right choice depends on consistency requirements, latency budget, and failure tolerance.</span>

</div>
