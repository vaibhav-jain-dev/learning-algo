# Rate Limiting

## Understanding Rate Limiting from First Principles

### The Problem: Unbounded Request Rates

Imagine you run a popular API. On a normal day, you handle 1,000 requests per second. Your servers are sized for this load. Then one day:

- A developer accidentally puts your API call in an infinite loop
- A competitor launches a denial-of-service attack
- A viral tweet sends 100x normal traffic to your service
- A single customer's bot hammers your expensive AI endpoint

Without protection, your servers crash. ALL users suffer, including paying customers. Your revenue drops, your reputation takes a hit.

**Rate limiting** is your bouncer at the door. It says: "You've made too many requests. Please wait before trying again."

### What Is Rate Limiting?

Rate limiting restricts how many requests a client can make within a time window. When exceeded, the server rejects additional requests with HTTP 429 (Too Many Requests).

But this simple definition hides important questions:

- **How do you identify a "client"?** By IP address? By API key? By user account?
- **What's the time window?** Per second? Per minute? Per day?
- **How do you count?** Fixed windows? Sliding windows?
- **What happens at the limit?** Hard reject? Queue requests? Degrade gracefully?

### Why Does Rate Limiting Matter?

**1. Protecting Your Infrastructure**

Every server has a maximum capacity. Rate limiting prevents a single bad actor from consuming ALL your capacity, ensuring normal users can still access the service.

**2. Ensuring Fairness**

If one customer uses 90% of your resources, other customers suffer. Rate limiting enforces equitable access across all users.

**3. Managing Costs**

If you pay per API call to a downstream service (like OpenAI or AWS), a runaway client could rack up enormous bills overnight.

**4. Preventing Abuse**

Web scraping, brute force attacks, spam—all rely on making many requests quickly. Rate limiting makes these attacks impractical.

**5. Enforcing Business Models**

"Free tier: 100 requests/day. Pro tier: 10,000 requests/day." Rate limiting is how you enforce your pricing tiers.

### Rate Limiting Headers

```http
# Response headers
X-RateLimit-Limit: 100        # Max requests allowed
X-RateLimit-Remaining: 45     # Requests remaining
X-RateLimit-Reset: 1642089600 # When limit resets (Unix timestamp)
Retry-After: 30               # Seconds until retry (when limited)
```

## Rate Limiting Algorithms

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">RATE LIMITING ALGORITHMS</h3>
  <div style="display: grid; gap: 8px;">
    <!-- Header -->
    <div style="display: grid; grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr 1fr; gap: 12px; padding: 12px 16px; background: rgba(88, 166, 255, 0.1); border-radius: 8px;">
      <div style="color: #58a6ff; font-weight: 600; font-size: 13px;">Algorithm</div>
      <div style="color: #58a6ff; font-weight: 600; font-size: 13px;">Allows Bursts</div>
      <div style="color: #58a6ff; font-weight: 600; font-size: 13px;">Memory</div>
      <div style="color: #58a6ff; font-weight: 600; font-size: 13px;">Accuracy</div>
      <div style="color: #58a6ff; font-weight: 600; font-size: 13px;">Complexity</div>
    </div>
    <!-- Token Bucket -->
    <div style="display: grid; grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr 1fr; gap: 12px; padding: 12px 16px; background: rgba(35, 134, 54, 0.1); border: 1px solid rgba(35, 134, 54, 0.3); border-radius: 8px;">
      <div style="color: #7ee787; font-weight: 600; font-size: 13px;">Token Bucket</div>
      <div style="color: #7ee787; font-size: 13px;">Yes</div>
      <div style="color: #c9d1d9; font-size: 13px;">O(1)</div>
      <div style="color: #c9d1d9; font-size: 13px;">Good</div>
      <div style="color: #7ee787; font-size: 13px;">Simple</div>
    </div>
    <!-- Leaky Bucket -->
    <div style="display: grid; grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr 1fr; gap: 12px; padding: 12px 16px; background: rgba(31, 111, 235, 0.1); border: 1px solid rgba(31, 111, 235, 0.3); border-radius: 8px;">
      <div style="color: #58a6ff; font-weight: 600; font-size: 13px;">Leaky Bucket</div>
      <div style="color: #f85149; font-size: 13px;">No</div>
      <div style="color: #f0883e; font-size: 13px;">O(n)</div>
      <div style="color: #c9d1d9; font-size: 13px;">Good</div>
      <div style="color: #f0883e; font-size: 13px;">Medium</div>
    </div>
    <!-- Fixed Window -->
    <div style="display: grid; grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr 1fr; gap: 12px; padding: 12px 16px; background: rgba(240, 136, 62, 0.1); border: 1px solid rgba(240, 136, 62, 0.3); border-radius: 8px;">
      <div style="color: #f0883e; font-weight: 600; font-size: 13px;">Fixed Window</div>
      <div style="color: #f0883e; font-size: 13px;">Edge bursts</div>
      <div style="color: #c9d1d9; font-size: 13px;">O(1)</div>
      <div style="color: #f85149; font-size: 13px;">Low</div>
      <div style="color: #7ee787; font-size: 13px;">Simple</div>
    </div>
    <!-- Sliding Window Log -->
    <div style="display: grid; grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr 1fr; gap: 12px; padding: 12px 16px; background: rgba(137, 87, 229, 0.1); border: 1px solid rgba(137, 87, 229, 0.3); border-radius: 8px;">
      <div style="color: #a371f7; font-weight: 600; font-size: 13px;">Sliding Window Log</div>
      <div style="color: #f85149; font-size: 13px;">No</div>
      <div style="color: #f0883e; font-size: 13px;">O(n)</div>
      <div style="color: #7ee787; font-size: 13px;">High</div>
      <div style="color: #f0883e; font-size: 13px;">Medium</div>
    </div>
    <!-- Sliding Window Counter -->
    <div style="display: grid; grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr 1fr; gap: 12px; padding: 12px 16px; background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.3); border-radius: 8px;">
      <div style="color: #7ee787; font-weight: 600; font-size: 13px;">Sliding Window Cnt</div>
      <div style="color: #f0883e; font-size: 13px;">Weighted</div>
      <div style="color: #c9d1d9; font-size: 13px;">O(1)</div>
      <div style="color: #7ee787; font-size: 13px;">High</div>
      <div style="color: #f0883e; font-size: 13px;">Medium</div>
    </div>
  </div>
</div>

### 1. Token Bucket

Tokens accumulate at fixed rate, each request consumes a token.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">TOKEN BUCKET</h3>
  <div style="color: #8b949e; text-align: center; margin-bottom: 24px; font-size: 14px;">Capacity: 10 tokens, Refill: 2 tokens/second</div>
  <!-- Bucket visualization -->
  <div style="display: flex; align-items: center; justify-content: center; gap: 32px; margin-bottom: 32px;">
    <div style="text-align: center;">
      <div style="color: #7ee787; font-size: 13px; margin-bottom: 8px;">Refill 2/sec</div>
      <div style="color: #7ee787; font-size: 24px;">→</div>
    </div>
    <div style="background: #21262d; border: 2px solid #30363d; border-radius: 12px; padding: 20px; text-align: center;">
      <div style="color: #c9d1d9; font-size: 13px; margin-bottom: 12px;">Token Bucket</div>
      <div style="display: flex; gap: 4px; justify-content: center; margin-bottom: 8px;">
        <span style="background: #7ee787; width: 16px; height: 16px; border-radius: 50%;"></span>
        <span style="background: #7ee787; width: 16px; height: 16px; border-radius: 50%;"></span>
        <span style="background: #7ee787; width: 16px; height: 16px; border-radius: 50%;"></span>
        <span style="background: #7ee787; width: 16px; height: 16px; border-radius: 50%;"></span>
        <span style="background: #7ee787; width: 16px; height: 16px; border-radius: 50%;"></span>
        <span style="background: #7ee787; width: 16px; height: 16px; border-radius: 50%;"></span>
        <span style="background: #30363d; width: 16px; height: 16px; border-radius: 50%;"></span>
        <span style="background: #30363d; width: 16px; height: 16px; border-radius: 50%;"></span>
      </div>
      <div style="color: #8b949e; font-size: 12px;">6 tokens</div>
    </div>
    <div style="text-align: center;">
      <div style="color: #f0883e; font-size: 13px; margin-bottom: 8px;">Requests consume</div>
      <div style="color: #f0883e; font-size: 24px;">←</div>
    </div>
  </div>
  <!-- Timeline -->
  <div style="color: #58a6ff; font-weight: 600; margin-bottom: 16px;">Timeline:</div>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center; gap: 16px; padding: 10px 16px; background: rgba(126, 231, 135, 0.1); border-radius: 8px;">
      <span style="color: #8b949e; font-weight: 600; min-width: 50px;">t=0</span>
      <span style="color: #7ee787; font-size: 13px;">Bucket: 10/10 (full)</span>
    </div>
    <div style="margin-left: 30px; color: #58a6ff; font-size: 12px;">↓ 5 requests arrive</div>
    <div style="display: flex; align-items: center; gap: 16px; padding: 10px 16px; background: rgba(126, 231, 135, 0.1); border-radius: 8px;">
      <span style="color: #8b949e; font-weight: 600; min-width: 50px;">t=0.1</span>
      <span style="color: #c9d1d9; font-size: 13px;">Bucket: 5/10</span>
      <span style="color: #7ee787; font-size: 13px; margin-left: auto;">→ All ALLOWED ✓</span>
    </div>
    <div style="margin-left: 30px; color: #58a6ff; font-size: 12px;">↓ 1 second passes, +2 tokens</div>
    <div style="display: flex; align-items: center; gap: 16px; padding: 10px 16px; background: rgba(88, 166, 255, 0.1); border-radius: 8px;">
      <span style="color: #8b949e; font-weight: 600; min-width: 50px;">t=1.0</span>
      <span style="color: #c9d1d9; font-size: 13px;">Bucket: 7/10</span>
    </div>
    <div style="margin-left: 30px; color: #f0883e; font-size: 12px;">↓ 10 requests arrive (burst!)</div>
    <div style="display: flex; align-items: center; gap: 16px; padding: 10px 16px; background: rgba(248, 81, 73, 0.1); border-radius: 8px;">
      <span style="color: #8b949e; font-weight: 600; min-width: 50px;">t=1.1</span>
      <span style="color: #c9d1d9; font-size: 13px;">Bucket: 0/10</span>
      <span style="font-size: 13px; margin-left: auto;"><span style="color: #7ee787;">7 ALLOWED</span>, <span style="color: #f85149;">3 REJECTED</span></span>
    </div>
  </div>
  <!-- Summary -->
  <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 20px;">
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 10px 16px;">
      <span style="color: #7ee787;">✓ Allows controlled bursts up to capacity</span>
    </div>
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 10px 16px;">
      <span style="color: #7ee787;">✓ Smooth average rate over time</span>
    </div>
  </div>
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

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">FIXED WINDOW COUNTER</h3>
  <div style="color: #8b949e; text-align: center; margin-bottom: 24px; font-size: 14px;">Limit: 100 requests per minute</div>
  <!-- Normal operation -->
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 32px;">
    <div style="background: rgba(35, 134, 54, 0.1); border: 1px solid rgba(35, 134, 54, 0.3); border-radius: 8px; padding: 16px;">
      <div style="color: #8b949e; font-size: 12px; margin-bottom: 8px;">Window 1 (0:00-1:00)</div>
      <div style="background: #21262d; border-radius: 4px; height: 20px; overflow: hidden; margin-bottom: 6px;">
        <div style="background: linear-gradient(90deg, #238636, #2ea043); width: 70%; height: 100%;"></div>
      </div>
      <div style="color: #7ee787; font-size: 13px;">70/100 Requests</div>
    </div>
    <div style="background: rgba(240, 136, 62, 0.1); border: 1px solid rgba(240, 136, 62, 0.3); border-radius: 8px; padding: 16px;">
      <div style="color: #8b949e; font-size: 12px; margin-bottom: 8px;">Window 2 (1:00-2:00)</div>
      <div style="background: #21262d; border-radius: 4px; height: 20px; overflow: hidden; margin-bottom: 6px;">
        <div style="background: linear-gradient(90deg, #f0883e, #f0883e); width: 90%; height: 100%;"></div>
      </div>
      <div style="color: #f0883e; font-size: 13px;">90/100 Requests</div>
    </div>
    <div style="background: rgba(88, 166, 255, 0.1); border: 1px solid rgba(88, 166, 255, 0.3); border-radius: 8px; padding: 16px;">
      <div style="color: #8b949e; font-size: 12px; margin-bottom: 8px;">Window 3 (2:00-3:00)</div>
      <div style="background: #21262d; border-radius: 4px; height: 20px; overflow: hidden; margin-bottom: 6px;">
        <div style="background: linear-gradient(90deg, #58a6ff, #58a6ff); width: 20%; height: 100%;"></div>
      </div>
      <div style="color: #58a6ff; font-size: 13px;">20/100 Requests</div>
    </div>
  </div>
  <!-- Problem illustration -->
  <div style="background: rgba(248, 81, 73, 0.1); border: 1px solid rgba(248, 81, 73, 0.3); border-radius: 12px; padding: 20px;">
    <div style="color: #f85149; font-weight: 600; margin-bottom: 16px;">⚠️ PROBLEM: Burst at window boundary!</div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 16px;">
      <div style="background: #21262d; border-radius: 8px 0 0 8px; padding: 16px; text-align: center;">
        <div style="color: #8b949e; font-size: 11px; margin-bottom: 8px;">Window 1</div>
        <div style="display: flex; justify-content: flex-end;">
          <div style="background: #f85149; width: 80%; height: 24px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 11px;">90 req at 0:59</span>
          </div>
        </div>
      </div>
      <div style="background: #21262d; border-radius: 0 8px 8px 0; padding: 16px; text-align: center;">
        <div style="color: #8b949e; font-size: 11px; margin-bottom: 8px;">Window 2</div>
        <div style="display: flex; justify-content: flex-start;">
          <div style="background: #f85149; width: 80%; height: 24px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 11px;">100 req at 1:00</span>
          </div>
        </div>
      </div>
    </div>
    <div style="background: rgba(248, 81, 73, 0.2); padding: 12px 16px; border-radius: 8px; text-align: center;">
      <span style="color: #f85149; font-weight: 600;">In 2 seconds (0:59 to 1:01): 190 requests allowed!</span>
      <div style="color: #f85149; font-size: 13px; margin-top: 4px;">This is nearly 2x the intended rate!</div>
    </div>
  </div>
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

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">SLIDING WINDOW COUNTER</h3>
  <div style="color: #8b949e; text-align: center; margin-bottom: 8px; font-size: 14px;">Limit: 100 requests per minute</div>
  <div style="color: #f0883e; text-align: center; margin-bottom: 24px; font-size: 13px;">Current time: 1:15 (15 seconds into Window 2)</div>
  <!-- Windows visualization -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 24px;">
    <div style="background: rgba(137, 87, 229, 0.1); border: 1px solid rgba(137, 87, 229, 0.3); border-radius: 8px 0 0 8px; padding: 16px;">
      <div style="color: #8b949e; font-size: 12px; margin-bottom: 8px;">Window 1 (0:00-1:00)</div>
      <div style="background: #21262d; border-radius: 4px; height: 24px; overflow: hidden; margin-bottom: 6px;">
        <div style="background: linear-gradient(90deg, #8957e5, #a371f7); width: 84%; height: 100%;"></div>
      </div>
      <div style="color: #a371f7; font-size: 14px; font-weight: 600;">84 requests</div>
    </div>
    <div style="background: rgba(35, 134, 54, 0.1); border: 1px solid rgba(35, 134, 54, 0.3); border-radius: 0 8px 8px 0; padding: 16px;">
      <div style="color: #8b949e; font-size: 12px; margin-bottom: 8px;">Window 2 (1:00-2:00)</div>
      <div style="background: #21262d; border-radius: 4px; height: 24px; overflow: hidden; margin-bottom: 6px;">
        <div style="background: linear-gradient(90deg, #238636, #2ea043); width: 36%; height: 100%;"></div>
      </div>
      <div style="color: #7ee787; font-size: 14px; font-weight: 600;">36 requests</div>
    </div>
  </div>
  <!-- Progress indicator -->
  <div style="text-align: center; margin-bottom: 24px;">
    <div style="color: #f0883e; font-size: 13px; margin-bottom: 4px;">← 15 seconds (25% of window) →</div>
  </div>
  <!-- Calculation -->
  <div style="background: rgba(88, 166, 255, 0.1); border: 1px solid rgba(88, 166, 255, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
    <div style="color: #58a6ff; font-weight: 600; margin-bottom: 12px;">Weighted count calculation:</div>
    <div style="font-family: monospace; font-size: 13px; color: #c9d1d9; line-height: 1.8;">
      <div>= prev_window x (1 - progress) + curr_window</div>
      <div>= <span style="color: #a371f7;">84</span> x (1 - 0.25) + <span style="color: #7ee787;">36</span></div>
      <div>= <span style="color: #a371f7;">84</span> x 0.75 + <span style="color: #7ee787;">36</span></div>
      <div>= 63 + 36</div>
      <div style="color: #7ee787; font-weight: 600; font-size: 15px; margin-top: 8px;">= 99 requests</div>
    </div>
  </div>
  <!-- Result -->
  <div style="background: rgba(126, 231, 135, 0.2); border: 1px solid #7ee787; border-radius: 8px; padding: 12px 20px; text-align: center; margin-bottom: 20px;">
    <span style="color: #7ee787; font-weight: 600; font-size: 15px;">99 &lt; 100 → ALLOW next request ✓</span>
  </div>
  <!-- Summary -->
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 10px 16px;">
      <span style="color: #7ee787;">✓ No boundary burst problem</span>
    </div>
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 10px 16px;">
      <span style="color: #7ee787;">✓ Memory efficient (only 2 counters per user)</span>
    </div>
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 10px 16px;">
      <span style="color: #7ee787;">✓ Approximation is very accurate in practice</span>
    </div>
  </div>
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
