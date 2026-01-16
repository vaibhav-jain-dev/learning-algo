# Rate Limiter

**Difficulty:** Medium (L2 - Practical Design Problem)
**Category:** Data Structures, Sliding Window, System Design
**Companies:** Stripe, Cloudflare, Google, Amazon, Facebook, Netflix, Uber

## Problem Statement

Design a rate limiter that limits the number of requests a user can make within a time window.

Implement the `RateLimiter` class:
- `RateLimiter(limit: int, window_seconds: int)` - Initialize with max requests allowed per window
- `allow_request(user_id: str, timestamp: int) -> bool` - Returns True if request is allowed, False if rate limited

## Why This Problem Matters

Rate limiting is EVERYWHERE in production systems:
- **API Protection** - Prevent abuse, DDoS attacks
- **Fair Usage** - Ensure resources are shared fairly
- **Cost Control** - Limit expensive operations
- **Compliance** - Meet SLA requirements

Understanding rate limiting helps you:
- Design scalable APIs
- Understand Redis use cases
- Think about distributed systems
- Handle real-world production challenges

## Examples

### Example 1: Basic Rate Limiting
```
limiter = RateLimiter(limit=3, window_seconds=10)

limiter.allow_request("user1", 1)   # True  (1st request)
limiter.allow_request("user1", 2)   # True  (2nd request)
limiter.allow_request("user1", 3)   # True  (3rd request)
limiter.allow_request("user1", 4)   # False (limit reached!)
limiter.allow_request("user1", 11)  # True  (window slides, 1st request cleared)
```

### Example 2: Multiple Users
```
limiter = RateLimiter(limit=2, window_seconds=5)

limiter.allow_request("alice", 1)   # True
limiter.allow_request("bob", 1)     # True  (different user)
limiter.allow_request("alice", 2)   # True
limiter.allow_request("alice", 3)   # False (alice hit limit)
limiter.allow_request("bob", 3)     # True  (bob still has quota)
```

### Example 3: Sliding Window
```
limiter = RateLimiter(limit=3, window_seconds=10)

limiter.allow_request("user", 1)    # True  [1]
limiter.allow_request("user", 5)    # True  [1, 5]
limiter.allow_request("user", 9)    # True  [1, 5, 9]
limiter.allow_request("user", 10)   # False [1, 5, 9] - still 3 in window
limiter.allow_request("user", 12)   # True  [5, 9, 12] - timestamp 1 expired
```

## Constraints

- `1 <= limit <= 10^6`
- `1 <= window_seconds <= 3600`
- `1 <= timestamp <= 10^9`
- Timestamps are given in non-decreasing order
- User IDs are non-empty strings

## Mental Model & Thinking Process

### Key Insight #1: Sliding Window

The rate limit window "slides" with time. At any moment, we count requests in the last `window_seconds`.

```
Time: 0----1----2----3----4----5----6----7----8----9----10---11---12
      |____________Window (10s)_____________|
                    |____________Window (10s)_____________|
```

### Key Insight #2: Per-User Tracking

Each user has their own rate limit. We need to track request timestamps per user.

```
Data Structure:
{
    "alice": [1, 2, 5, 8],      # Alice's request timestamps
    "bob":   [3, 7],            # Bob's request timestamps
    "charlie": [1, 2, 3, 4, 5]  # Charlie's request timestamps
}
```

### Key Insight #3: Cleanup Old Requests

When checking rate limit:
1. Remove timestamps older than (current_time - window)
2. Count remaining timestamps
3. If count < limit, allow and add new timestamp

## Different Approaches

### Approach 1: Sliding Window Log (This Problem)
**Time: O(n) per request | Space: O(n) per user**

Store all timestamps, clean up old ones on each request.

```
Pros: Precise, accurate
Cons: Memory grows with request rate
```

### Approach 2: Fixed Window Counter
**Time: O(1) | Space: O(1) per user**

```
window_start = timestamp // window_seconds
if window_start changed: reset counter
if counter < limit: allow
```

```
Pros: Simple, constant memory
Cons: Can allow 2x burst at window boundaries
```

### Approach 3: Sliding Window Counter (Approximation)
**Time: O(1) | Space: O(1) per user**

```
Weighted average of current and previous window.
Example: 70% through current window
         count = prev_count * 0.3 + curr_count * 1.0
```

```
Pros: Smooth, constant memory
Cons: Approximation, not exact
```

### Approach 4: Token Bucket
**Time: O(1) | Space: O(1) per user**

```
Tokens regenerate over time.
Each request consumes a token.
If no tokens, request blocked.
```

```
Pros: Allows controlled bursts
Cons: More complex to tune
```

## Hints

<details>
<summary>Hint 1: Data Structure Choice</summary>

Use a dictionary to map user_id -> list of timestamps.
A deque (double-ended queue) is efficient for removing old timestamps from the front.
</details>

<details>
<summary>Hint 2: Cleanup Strategy</summary>

Before counting, remove timestamps where `timestamp <= current_time - window`.
Then count remaining timestamps.
</details>

<details>
<summary>Hint 3: Edge Cases</summary>

- First request for a user
- Exactly at window boundary
- Many requests at same timestamp
</details>

## Complexity Analysis

| Approach | Time (per request) | Space (per user) | Precision |
|----------|-------------------|------------------|-----------|
| Sliding Log | O(requests in window) | O(requests in window) | Exact |
| Fixed Window | O(1) | O(1) | Approximate |
| Sliding Counter | O(1) | O(1) | Approximate |
| Token Bucket | O(1) | O(1) | Exact (different semantics) |

## Real-World Considerations

### Distributed Systems
In production, rate limiters often use Redis:

```python
# Redis-based rate limiter (pseudocode)
def allow_request_redis(user_id, timestamp):
    key = f"ratelimit:{user_id}"

    # Remove old entries (O(log N) in Redis sorted set)
    redis.zremrangebyscore(key, 0, timestamp - window)

    # Count current window
    count = redis.zcard(key)

    if count < limit:
        redis.zadd(key, {str(timestamp): timestamp})
        redis.expire(key, window)  # Auto-cleanup
        return True
    return False
```

### Rate Limit Headers
Production APIs return headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 42
X-RateLimit-Reset: 1640995200
```

### Graceful Degradation
```
if rate_limited:
    return 429 Too Many Requests
    with Retry-After header
```

## Common Mistakes to Avoid

1. **Not cleaning up old timestamps** - Memory leak
2. **Using wall clock vs logical time** - Testing becomes hard
3. **Off-by-one at boundaries** - Is timestamp=10 in window [1,10]?
4. **Not considering concurrent requests** - Race conditions
5. **Forgetting edge cases** - First request, empty window

## Variations

1. **Leaky Bucket** - Fixed processing rate
2. **Token Bucket** - Allow bursts up to bucket size
3. **Hierarchical Rate Limiting** - Different limits for different resources
4. **Adaptive Rate Limiting** - Adjust limits based on load

## Related Problems

- LRU Cache (Medium)
- Design Hit Counter (Medium)
- Logger Rate Limiter (Easy)
- Design In-Memory File System (Hard)

## Interview Tips

1. **Clarify requirements** - Distributed? Exact or approximate? Burst allowed?
2. **Start simple** - Fixed window, then improve to sliding window
3. **Discuss trade-offs** - Memory vs precision vs complexity
4. **Mention production concerns** - Redis, distributed, headers
5. **Test edge cases** - First request, boundary, multiple users
