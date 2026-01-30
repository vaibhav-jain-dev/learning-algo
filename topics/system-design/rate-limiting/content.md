# Rate Limiting

## Overview

Rate limiting controls how many requests a client can make to your API within a specific time window. Think of it like a bouncer at a club - they let people in at a controlled pace to prevent overcrowding, regardless of how many people are waiting in line.

When a client exceeds their limit, the server responds with HTTP 429 (Too Many Requests) and typically includes headers indicating when they can retry.

---

## Why This Matters

### Real Company Examples

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Companies Using Rate Limiting</h4>
<div style="display: grid; gap: 16px;">
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e293b; font-weight: 600;">Twitter/X - API Access</div>
<div style="color: #475569; font-size: 14px; margin-top: 8px;">Twitter's API has strict rate limits (15-900 requests per 15-minute window depending on endpoint). This prevents bots from scraping all tweets and ensures fair access for legitimate developers.</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #10b981;">
<div style="color: #1e293b; font-weight: 600;">Stripe - Payment APIs</div>
<div style="color: #475569; font-size: 14px; margin-top: 8px;">Stripe rate limits API requests to protect against runaway scripts that could create thousands of charges. Different endpoints have different limits based on cost and risk.</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
<div style="color: #1e293b; font-weight: 600;">GitHub - API and Git Operations</div>
<div style="color: #475569; font-size: 14px; margin-top: 8px;">GitHub limits authenticated users to 5,000 requests/hour. During CI/CD spikes, this prevents a single user's pipeline from overwhelming shared infrastructure.</div>
</div>
</div>
</div>

**Why Rate Limit?**
- **Protect infrastructure**: Prevent a single user from consuming all server resources
- **Ensure fairness**: Give all users equitable access to limited resources
- **Control costs**: Limit expensive operations (AI inference, third-party API calls)
- **Prevent abuse**: Make brute-force attacks and scraping impractical
- **Enforce business models**: Differentiate free vs paid tier capabilities

---

## How It Works

### Rate Limiting Flow

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Request Processing with Rate Limiting</h4>

<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">1</div>
<div style="flex: 1; background: #eff6ff; border-radius: 8px; padding: 12px;">
<div style="color: #1e40af; font-weight: 600;">Identify Client</div>
<div style="color: #3730a3; font-size: 13px;">Extract identifier: API key, user ID, IP address, or combination</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">2</div>
<div style="flex: 1; background: #eff6ff; border-radius: 8px; padding: 12px;">
<div style="color: #1e40af; font-weight: 600;">Check Limit</div>
<div style="color: #3730a3; font-size: 13px;">Query rate limiter for current usage against allowed limit</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">3a</div>
<div style="flex: 1; background: #ecfdf5; border-radius: 8px; padding: 12px;">
<div style="color: #065f46; font-weight: 600;">Under Limit: Allow</div>
<div style="color: #047857; font-size: 13px;">Increment counter, process request, return response with rate headers</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #ef4444; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">3b</div>
<div style="flex: 1; background: #fef2f2; border-radius: 8px; padding: 12px;">
<div style="color: #991b1b; font-weight: 600;">Over Limit: Reject</div>
<div style="color: #7f1d1d; font-size: 13px;">Return 429 Too Many Requests with Retry-After header</div>
</div>
</div>
</div>
</div>

### Rate Limit Response Headers

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Standard Rate Limit Headers</h4>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 13px;">
<div style="color: #1e293b;"><span style="color: #3b82f6;">X-RateLimit-Limit:</span> 100</div>
<div style="color: #475569; font-size: 12px; margin-bottom: 8px;">Maximum requests allowed in window</div>

<div style="color: #1e293b;"><span style="color: #3b82f6;">X-RateLimit-Remaining:</span> 45</div>
<div style="color: #475569; font-size: 12px; margin-bottom: 8px;">Requests remaining in current window</div>

<div style="color: #1e293b;"><span style="color: #3b82f6;">X-RateLimit-Reset:</span> 1642089600</div>
<div style="color: #475569; font-size: 12px; margin-bottom: 8px;">Unix timestamp when window resets</div>

<div style="color: #1e293b;"><span style="color: #ef4444;">Retry-After:</span> 30</div>
<div style="color: #475569; font-size: 12px;">Seconds until client can retry (only on 429)</div>
</div>
</div>

---

## Rate Limiting Algorithms

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Algorithm Comparison</h4>

<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Algorithm</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Allows Bursts</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Memory</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Accuracy</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Best For</th>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Token Bucket</td>
<td style="padding: 12px; color: #10b981;">Yes (controlled)</td>
<td style="padding: 12px; color: #475569;">O(1)</td>
<td style="padding: 12px; color: #475569;">Good</td>
<td style="padding: 12px; color: #475569;">APIs with burst tolerance</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Leaky Bucket</td>
<td style="padding: 12px; color: #ef4444;">No</td>
<td style="padding: 12px; color: #475569;">O(n)</td>
<td style="padding: 12px; color: #475569;">Good</td>
<td style="padding: 12px; color: #475569;">Smooth output rate</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Fixed Window</td>
<td style="padding: 12px; color: #f59e0b;">Edge bursts</td>
<td style="padding: 12px; color: #475569;">O(1)</td>
<td style="padding: 12px; color: #475569;">Low</td>
<td style="padding: 12px; color: #475569;">Simple use cases</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Sliding Window Log</td>
<td style="padding: 12px; color: #ef4444;">No</td>
<td style="padding: 12px; color: #475569;">O(n)</td>
<td style="padding: 12px; color: #475569;">High</td>
<td style="padding: 12px; color: #475569;">Precise tracking</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Sliding Window Counter</td>
<td style="padding: 12px; color: #f59e0b;">Weighted</td>
<td style="padding: 12px; color: #475569;">O(1)</td>
<td style="padding: 12px; color: #475569;">High</td>
<td style="padding: 12px; color: #475569;">Production APIs</td>
</tr>
</table>
</div>
</div>

### Fixed Window Problem

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Why Fixed Windows Have Edge Burst Problems</h4>

<div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #991b1b; font-weight: 600; margin-bottom: 12px;">The Problem</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 13px;">
<div style="background: #fee2e2; padding: 12px; border-radius: 4px 0 0 4px; text-align: center;">
<div style="color: #7f1d1d; font-weight: 600;">Window 1 (0:00-1:00)</div>
<div style="color: #991b1b; margin-top: 8px;">90 requests at 0:59</div>
</div>
<div style="background: #fee2e2; padding: 12px; border-radius: 0 4px 4px 0; text-align: center;">
<div style="color: #7f1d1d; font-weight: 600;">Window 2 (1:00-2:00)</div>
<div style="color: #991b1b; margin-top: 8px;">100 requests at 1:01</div>
</div>
</div>
<div style="background: #fecaca; padding: 12px; border-radius: 8px; margin-top: 12px; text-align: center;">
<div style="color: #991b1b; font-weight: 600;">190 requests in 2 seconds - nearly 2x the intended limit!</div>
</div>
</div>

<div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 16px;">
<div style="color: #065f46; font-weight: 600; margin-bottom: 8px;">Solution: Sliding Window Counter</div>
<div style="color: #047857; font-size: 13px;">
      Weight the previous window based on how much of it overlaps with the current sliding window.
<div style="margin-top: 8px; font-family: monospace; background: #d1fae5; padding: 8px; border-radius: 4px;">
        count = prev_window * (1 - progress) + curr_window<br>
          count = 90 * 0.75 + 10 = 77.5 (under 100 limit)
</div>
</div>
</div>
</div>

  ---

  ## Real-Life Failure Story

  ### The Cloudflare Rate Limiting Incident (2020)

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">What Happened</h4>

<div style="background: #fef2f2; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #991b1b; font-weight: 600;">The Incident</div>
<div style="color: #7f1d1d; font-size: 14px; margin-top: 8px;">
        A misconfigured rate limiter caused Cloudflare to reject legitimate traffic during a major DDoS attack. The rate limiting rules were too aggressive and didn't distinguish between attack traffic and legitimate users, causing a 27-minute outage affecting millions of websites.
</div>
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #1e293b; font-weight: 600;">Root Cause</div>
<div style="color: #475569; font-size: 14px; margin-top: 8px;">
<div style="padding: 4px 0;">Rate limiting was applied at IP level only</div>
<div style="padding: 4px 0;">Many legitimate users share IPs (corporate NAT, mobile carriers)</div>
<div style="padding: 4px 0;">Attack traffic triggered limits that blocked legitimate users</div>
<div style="padding: 4px 0;">No fallback mechanism or graceful degradation</div>
</div>
</div>

<div style="background: #ecfdf5; border-radius: 8px; padding: 16px;">
<div style="color: #065f46; font-weight: 600;">How They Fixed It</div>
<div style="color: #047857; font-size: 14px; margin-top: 8px;">
<div>1. Multi-dimensional rate limiting (IP + User-Agent + behavior patterns)</div>
<div>2. Implemented "fail open" mode for rate limiter failures</div>
<div>3. Added progressive rate limiting (warn, slow, then block)</div>
<div>4. Better monitoring with alerts on high rejection rates</div>
</div>
</div>
</div>

  ---

  ## Implementation

  ### Token Bucket Algorithm

  ```python
  import time
  from threading import Lock
  from dataclasses import dataclass
  from typing import Tuple, Dict, Optional


  @dataclass
  class TokenBucketConfig:
  """Configuration for a token bucket rate limiter."""
  rate: float          # Tokens added per second
  capacity: int        # Maximum tokens (burst size)


  class TokenBucket:
  """
  Token bucket rate limiter.

  Tokens are added at a fixed rate up to a maximum capacity.
  Each request consumes one token. Requests are rejected when
  no tokens are available.

  Allows controlled bursts up to capacity, then enforces average rate.
  """

  def __init__(self, rate: float, capacity: int):
  self.rate = rate              # Tokens per second
  self.capacity = capacity      # Maximum tokens
  self.tokens = capacity        # Current tokens
  self.last_update = time.time()
  self.lock = Lock()

  def allow(self, tokens_required: int = 1) -> Tuple[bool, dict]:
  """
  Check if request is allowed and consume tokens if so.

  Returns (allowed, metadata) where metadata includes
  remaining tokens and reset time.
  """
  with self.lock:
  now = time.time()

  # Add tokens based on elapsed time
  elapsed = now - self.last_update
  self.tokens = min(
  self.capacity,
  self.tokens + elapsed * self.rate
  )
  self.last_update = now

  if self.tokens >= tokens_required:
  self.tokens -= tokens_required
  return True, {
  'remaining': int(self.tokens),
  'limit': self.capacity,
  'reset': now + (self.capacity - self.tokens) / self.rate
  }

  # Calculate when enough tokens will be available
  wait_time = (tokens_required - self.tokens) / self.rate

  return False, {
  'remaining': 0,
  'limit': self.capacity,
  'reset': now + wait_time,
  'retry_after': wait_time
  }


  class TokenBucketRateLimiter:
  """
  Rate limiter managing multiple token buckets by client ID.
  """

  def __init__(self, rate: float, capacity: int):
  self.rate = rate
  self.capacity = capacity
  self.buckets: Dict[str, TokenBucket] = {}
  self.lock = Lock()

  def allow(self, client_id: str) -> Tuple[bool, dict]:
  """Check if request from client is allowed."""
  with self.lock:
  if client_id not in self.buckets:
  self.buckets[client_id] = TokenBucket(
  self.rate, self.capacity
  )

  return self.buckets[client_id].allow()

  def cleanup_expired(self, max_age_seconds: float = 3600):
  """Remove buckets that haven't been used recently."""
  now = time.time()
  with self.lock:
  expired = [
  cid for cid, bucket in self.buckets.items()
  if now - bucket.last_update > max_age_seconds
  ]
  for cid in expired:
  del self.buckets[cid]
  ```

  ### Sliding Window Counter

  ```python
  import time
  from threading import Lock
  from typing import Tuple, Dict


  class SlidingWindowCounter:
  """
  Sliding window counter rate limiter.

  Combines the memory efficiency of fixed windows with the
  accuracy of sliding windows by weighting the previous window.

  Formula: count = prev_count * (1 - window_progress) + curr_count
  """

  def __init__(self, limit: int, window_seconds: int):
  self.limit = limit
  self.window_seconds = window_seconds
  self.counters: Dict[str, Dict[int, int]] = {}
  self.lock = Lock()

  def allow(self, client_id: str) -> Tuple[bool, dict]:
  """Check if request from client is allowed."""
  now = time.time()
  current_window = int(now // self.window_seconds)
  previous_window = current_window - 1

  # Progress through current window (0.0 to 1.0)
  window_progress = (now % self.window_seconds) / self.window_seconds

  with self.lock:
  if client_id not in self.counters:
  self.counters[client_id] = {}

  client = self.counters[client_id]

  # Get counts for current and previous windows
  prev_count = client.get(previous_window, 0)
  curr_count = client.get(current_window, 0)

  # Calculate weighted count
  weighted_count = prev_count * (1 - window_progress) + curr_count

  if weighted_count >= self.limit:
  # Calculate when limit resets
  reset_time = (current_window + 1) * self.window_seconds

  return False, {
  'remaining': 0,
  'limit': self.limit,
  'reset': reset_time,
  'retry_after': reset_time - now
  }

  # Increment current window counter
  client[current_window] = curr_count + 1

  # Cleanup old windows
  old_windows = [w for w in client if w < previous_window]
  for w in old_windows:
  del client[w]

  remaining = int(self.limit - weighted_count - 1)
  reset_time = (current_window + 1) * self.window_seconds

  return True, {
  'remaining': max(0, remaining),
  'limit': self.limit,
  'reset': reset_time
  }
  ```

  ### Distributed Rate Limiter with Redis

  ```python
  import redis
  import time
  from typing import Tuple


  class RedisRateLimiter:
  """
  Distributed rate limiter using Redis.

  Uses Lua scripts for atomic operations to ensure
  consistency across multiple application instances.
  """

  def __init__(self, redis_client: redis.Redis,
  limit: int, window_seconds: int):
  self.redis = redis_client
  self.limit = limit
  self.window_seconds = window_seconds

  def allow(self, client_id: str) -> Tuple[bool, dict]:
  """
  Check if request is allowed using sliding window counter.

  Uses a Lua script for atomic check-and-increment.
  """
  now = time.time()
  current_window = int(now // self.window_seconds)
  previous_window = current_window - 1
  window_progress = (now % self.window_seconds) / self.window_seconds

  # Keys for current and previous windows
  curr_key = f"ratelimit:{client_id}:{current_window}"
  prev_key = f"ratelimit:{client_id}:{previous_window}"

  # Lua script for atomic operation
  lua_script = """
  local curr_key = KEYS[1]
  local prev_key = KEYS[2]
  local limit = tonumber(ARGV[1])
  local window_seconds = tonumber(ARGV[2])
  local window_progress = tonumber(ARGV[3])

  local prev_count = tonumber(redis.call('GET', prev_key) or '0')
  local curr_count = tonumber(redis.call('GET', curr_key) or '0')

  local weighted_count = prev_count * (1 - window_progress) + curr_count

  if weighted_count >= limit then
  return {0, curr_count, prev_count}
  end

  local new_count = redis.call('INCR', curr_key)
  redis.call('EXPIRE', curr_key, window_seconds * 2)

  return {1, new_count, prev_count}
  """

  result = self.redis.eval(
  lua_script, 2, curr_key, prev_key,
  self.limit, self.window_seconds, window_progress
  )

  allowed = bool(result[0])
  curr_count = result[1]
  prev_count = result[2]

  weighted_count = prev_count * (1 - window_progress) + curr_count
  remaining = max(0, int(self.limit - weighted_count))
  reset_time = (current_window + 1) * self.window_seconds

  metadata = {
  'remaining': remaining,
  'limit': self.limit,
  'reset': reset_time
  }

  if not allowed:
  metadata['retry_after'] = reset_time - now

  return allowed, metadata


  class RedisTokenBucket:
  """
  Distributed token bucket using Redis.
  """

  def __init__(self, redis_client: redis.Redis,
  rate: float, capacity: int):
  self.redis = redis_client
  self.rate = rate
  self.capacity = capacity

  def allow(self, client_id: str) -> Tuple[bool, dict]:
  """
  Check if request is allowed using token bucket algorithm.
  """
  key = f"tokenbucket:{client_id}"
  now = time.time()

  lua_script = """
  local key = KEYS[1]
  local rate = tonumber(ARGV[1])
  local capacity = tonumber(ARGV[2])
  local now = tonumber(ARGV[3])
  local requested = tonumber(ARGV[4])

  local data = redis.call('HMGET', key, 'tokens', 'last_update')
  local tokens = tonumber(data[1]) or capacity
  local last_update = tonumber(data[2]) or now

  -- Add tokens based on elapsed time
  local elapsed = now - last_update
  tokens = math.min(capacity, tokens + elapsed * rate)

  local allowed = 0
  if tokens >= requested then
  tokens = tokens - requested
  allowed = 1
  end

  -- Update bucket state
  redis.call('HMSET', key, 'tokens', tokens, 'last_update', now)
  redis.call('EXPIRE', key, 3600)

  return {allowed, tokens}
  """

  result = self.redis.eval(lua_script, 1, key, self.rate,
  self.capacity, now, 1)

  allowed = bool(result[0])
  remaining_tokens = result[1]

  metadata = {
  'remaining': int(remaining_tokens),
  'limit': self.capacity,
  'reset': now + (self.capacity - remaining_tokens) / self.rate
  }

  if not allowed:
  metadata['retry_after'] = (1 - remaining_tokens) / self.rate

  return allowed, metadata
  ```

  ### HTTP Middleware

  ```python
  from functools import wraps
  from flask import Flask, request, jsonify, Response


  def rate_limit_middleware(limiter, get_client_id=None):
  """
  Decorator for rate limiting Flask routes.

  Args:
  limiter: Rate limiter instance
  get_client_id: Function to extract client ID from request
  """
  if get_client_id is None:
  def get_client_id(req):
  # Default: use API key or IP address
  return req.headers.get('X-API-Key') or req.remote_addr

  def decorator(f):
  @wraps(f)
  def wrapped(*args, **kwargs):
  client_id = get_client_id(request)
  allowed, metadata = limiter.allow(client_id)

  # Always include rate limit headers
  response_headers = {
  'X-RateLimit-Limit': str(metadata['limit']),
  'X-RateLimit-Remaining': str(metadata['remaining']),
  'X-RateLimit-Reset': str(int(metadata['reset']))
  }

  if not allowed:
  response = jsonify({
  'error': 'Rate limit exceeded',
  'retry_after': metadata.get('retry_after', 60)
  })
  response.status_code = 429
  response.headers['Retry-After'] = str(
  int(metadata.get('retry_after', 60))
  )
  for key, value in response_headers.items():
  response.headers[key] = value
  return response

  # Process the request
  response = f(*args, **kwargs)

  # Add rate limit headers to successful response
  if isinstance(response, Response):
  for key, value in response_headers.items():
  response.headers[key] = value
  elif isinstance(response, tuple):
  resp_data, status = response[:2]
  response = jsonify(resp_data)
  response.status_code = status
  for key, value in response_headers.items():
  response.headers[key] = value

  return response

  return wrapped
  return decorator


  # Usage Example
  app = Flask(__name__)
  limiter = SlidingWindowCounter(limit=100, window_seconds=60)


  @app.route('/api/resource')
  @rate_limit_middleware(limiter)
  def get_resource():
  return {'data': 'resource content'}


  # Per-endpoint rate limiting
  expensive_limiter = SlidingWindowCounter(limit=10, window_seconds=60)


  @app.route('/api/expensive-operation')
  @rate_limit_middleware(expensive_limiter)
  def expensive_operation():
  return {'result': 'expensive computation'}
  ```

  ---

  ## Interview Questions

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

    ### Q1: How would you implement rate limiting in a distributed system?

    **Answer:** Use a centralized store (Redis) with atomic operations to ensure consistency across multiple application instances.

    Key considerations:
    1. **Atomic operations**: Use Lua scripts in Redis to check and increment atomically
    2. **Clock synchronization**: Use server time from Redis, not application servers
    3. **Failover strategy**: Decide between "fail open" (allow on Redis failure) or "fail closed"
    4. **Local caching**: Cache rate limit state locally for performance, sync periodically

    ```python
    # Hybrid approach: local + Redis
    class HybridRateLimiter:
    def allow(self, client_id):
    # Fast path: check local cache
    if self.local_cache.definitely_over_limit(client_id):
    return False

    # Slow path: check Redis for accurate count
    return self.redis_limiter.allow(client_id)
    ```

    ### Q2: Token bucket vs sliding window - when to use each?

    **Answer:**

    **Token Bucket:**
    - Allows controlled bursts (users can make many requests quickly, then wait)
    - Good for APIs where burst behavior is acceptable
    - Memory efficient (just stores token count and timestamp)
    - Example: Twitter API allows bursts during viral tweets

    **Sliding Window Counter:**
    - Stricter limiting, prevents bursts
    - Better for protecting resources with hard capacity limits
    - More accurate rate enforcement
    - Example: Payment APIs where you truly want X requests per minute max

    ### Q3: How do you handle rate limiting for users behind shared IPs (NAT)?

    **Answer:** Use multiple identification dimensions:

    1. **Primary**: API key or user ID (authenticated requests)
    2. **Secondary**: IP address + User-Agent hash
    3. **Behavioral**: Request patterns, endpoints accessed

    ```python
    def get_client_id(request):
    if request.headers.get('X-API-Key'):
    return f"api:{request.headers['X-API-Key']}"

    # Fallback: IP + User-Agent hash for anonymous users
    ua_hash = hashlib.md5(
    request.headers.get('User-Agent', '').encode()
    ).hexdigest()[:8]

    return f"anon:{request.remote_addr}:{ua_hash}"
    ```

    Also consider higher limits for known shared IPs (corporate proxies, cloud providers).

    ### Q4: What happens when your rate limiter fails?

    **Answer:** Design for failure with a clear strategy:

    **Fail Open (Allow):**
    - Requests proceed when rate limiter is unavailable
    - Protects user experience
    - Risk: Potential overload during outages
    - Use for: Non-critical rate limits

    **Fail Closed (Block):**
    - Reject requests when rate limiter fails
    - Protects backend systems
    - Risk: Availability impact
    - Use for: Critical protection (DDoS, expensive operations)

    **Best Practice:** Implement circuit breaker pattern with fallback to local rate limiting.

    ### Q5: How would you design rate limiting for different pricing tiers?

    **Answer:**

    ```python
    TIER_LIMITS = {
    'free': {'requests_per_minute': 60, 'burst': 10},
    'pro': {'requests_per_minute': 600, 'burst': 100},
    'enterprise': {'requests_per_minute': 6000, 'burst': 1000}
    }

    class TieredRateLimiter:
    def __init__(self):
    self.limiters = {}

    def get_limiter(self, user):
    tier = user.subscription_tier
    config = TIER_LIMITS[tier]

    if user.id not in self.limiters:
    self.limiters[user.id] = TokenBucket(
    rate=config['requests_per_minute'] / 60,
    capacity=config['burst']
    )

    return self.limiters[user.id]

    def allow(self, user):
    limiter = self.get_limiter(user)
    return limiter.allow()
    ```

    Also consider: endpoint-specific limits, daily/monthly quotas, and overage billing.

</div>

  ---

  ## Common Mistakes

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Rate Limiting Anti-Patterns</h4>

<div style="display: grid; gap: 12px;">
<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Rate limiting only by IP address</div>
<div style="color: #7f1d1d; font-size: 14px;">Many users share IPs (corporate networks, mobile carriers). Use multiple identifiers or authenticated user IDs when possible.</div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Not returning rate limit headers</div>
<div style="color: #7f1d1d; font-size: 14px;">Clients need to know their limits to implement proper backoff. Always include X-RateLimit-* and Retry-After headers.</div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Hard-coded limits without configuration</div>
<div style="color: #7f1d1d; font-size: 14px;">Rate limits should be configurable per-endpoint, per-tier, and adjustable without deployment. Use configuration service.</div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">No monitoring or alerting</div>
<div style="color: #7f1d1d; font-size: 14px;">Track rejection rates, top limited clients, and limiter latency. Alert on unusual patterns that might indicate attacks or misconfigurations.</div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Applying rate limits after expensive operations</div>
<div style="color: #7f1d1d; font-size: 14px;">Check rate limits BEFORE processing requests. Place rate limiting middleware at the earliest point in the request pipeline.</div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Same limits for all endpoints</div>
<div style="color: #7f1d1d; font-size: 14px;">Expensive operations (AI inference, reports) need stricter limits than cheap ones (health checks). Differentiate by endpoint cost.</div>
</div>
</div>
</div>

  ---

  ## Quick Reference Card

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Rate Limiting Cheat Sheet</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Algorithm Selection</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;"><strong>Token Bucket:</strong> Allow bursts, smooth average</div>
<div style="padding: 4px 0;"><strong>Sliding Window:</strong> Strict limits, no bursts</div>
<div style="padding: 4px 0;"><strong>Fixed Window:</strong> Simple, edge burst problem</div>
<div style="padding: 4px 0;"><strong>Leaky Bucket:</strong> Smooth output rate</div>
</div>
</div>

<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Standard Headers</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;"><strong>X-RateLimit-Limit:</strong> Maximum allowed</div>
<div style="padding: 4px 0;"><strong>X-RateLimit-Remaining:</strong> Remaining</div>
<div style="padding: 4px 0;"><strong>X-RateLimit-Reset:</strong> Reset timestamp</div>
<div style="padding: 4px 0;"><strong>Retry-After:</strong> Seconds to wait</div>
</div>
</div>

<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Client Identification</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;">1. API key (best)</div>
<div style="padding: 4px 0;">2. User ID (authenticated)</div>
<div style="padding: 4px 0;">3. IP + User-Agent (anonymous)</div>
<div style="padding: 4px 0;">4. Behavioral fingerprinting</div>
</div>
</div>

<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Failure Strategies</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;"><strong>Fail Open:</strong> Allow on failure (UX)</div>
<div style="padding: 4px 0;"><strong>Fail Closed:</strong> Block on failure (safety)</div>
<div style="padding: 4px 0;"><strong>Local Fallback:</strong> Use local cache</div>
<div style="padding: 4px 0;"><strong>Circuit Breaker:</strong> Graceful degradation</div>
</div>
</div>
</div>
</div>

  ---

  ## Related Topics

  - [API Gateway](/topic/system-design/api-gateway) - Centralized rate limiting
  - [Load Balancing](/topic/system-design/load-balancing) - Distributing traffic
  - [Caching](/topic/system-design/caching) - Reducing backend load
  - [Circuit Breaker](/topic/design-patterns/circuit-breaker) - Failure handling
