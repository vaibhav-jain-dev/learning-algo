# Latency and Throughput

## Overview

Latency and throughput are the two fundamental performance metrics that determine how fast and how much work a system can handle. Latency measures how long it takes to complete a single operation (response time), while throughput measures how many operations can be completed per unit of time (capacity). Understanding these metrics and their trade-offs is essential for designing systems that meet performance requirements.

## Why This Matters (Real-World Context)

### Why do companies care about latency and throughput?

**Revenue Impact**: Amazon found that every 100ms of latency costs them 1% in sales. Google discovered that a 500ms delay in search results caused a 20% drop in traffic. At scale, these numbers translate to billions of dollars.

**User Experience**: Studies show users perceive anything under 100ms as "instant." Between 100-300ms feels "fast." Above 1 second, users notice the delay. Above 10 seconds, users abandon the task entirely.

**Real Example**: Netflix serves over 200 million subscribers streaming video simultaneously. They need:
- Low latency for the play button to respond instantly
- High throughput to deliver millions of video streams concurrently
- Understanding that improving one metric might hurt the other

### What problems do these metrics solve?

1. **Capacity Planning**: "Can our system handle Black Friday traffic?" (throughput question)
2. **User Experience**: "Why does our checkout page feel slow?" (latency question)
3. **Cost Optimization**: "Are we over-provisioning servers?" (both metrics)
4. **SLA Compliance**: "Are we meeting our 99.9% under 200ms guarantee?" (latency percentiles)

## Core Concepts

### Understanding Latency (The Simple Analogy)

Think of latency like ordering food at a restaurant:

**Latency = Total time from placing your order until food arrives**

This includes:
- **Network latency**: Time for waiter to walk to kitchen (travel time)
- **Queuing latency**: Your order waiting while chef finishes previous orders
- **Processing latency**: Actual cooking time
- **Response latency**: Waiter bringing food back to your table

Just like a restaurant, if ANY of these steps is slow, your total wait time suffers.

### Understanding Throughput (The Simple Analogy)

Using the same restaurant:

**Throughput = How many meals the restaurant can serve per hour**

A restaurant might have:
- 50 meals/hour capacity with one chef
- 150 meals/hour with three chefs
- But adding more chefs doesn't help if there's only one stove (bottleneck)

### The Critical Relationship

Here's the key insight most engineers miss: **Latency and throughput are connected, but not always in the way you'd expect.**

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0; font-size: 1.1em;">Little's Law: The Universal Truth</h4>
  <div style="background: #dbeafe; border-radius: 8px; padding: 20px; text-align: center; margin: 16px 0;">
    <span style="color: #1e40af; font-size: 1.4em; font-family: monospace; font-weight: bold;">L = lambda x W</span>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; margin-top: 16px;">
    <div style="background: #dcfce7; padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 140px;">
      <div style="color: #166534; font-weight: bold;">L (Concurrency)</div>
      <div style="color: #15803d; font-size: 0.9em;">Items in system</div>
    </div>
    <div style="background: #fef3c7; padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 140px;">
      <div style="color: #92400e; font-weight: bold;">lambda (Throughput)</div>
      <div style="color: #a16207; font-size: 0.9em;">Items per second</div>
    </div>
    <div style="background: #f3e8ff; padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 140px;">
      <div style="color: #6b21a8; font-weight: bold;">W (Latency)</div>
      <div style="color: #7c3aed; font-size: 0.9em;">Time per item</div>
    </div>
  </div>
  <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
    <div style="color: #334155; font-size: 0.95em;">
      <strong style="color: #1e40af;">Example:</strong> If you have 100 concurrent requests (L) and each takes 50ms (W = 0.05s):<br>
      <span style="font-family: monospace; color: #0f766e;">Throughput = 100 / 0.05 = 2,000 requests/second</span>
    </div>
  </div>
</div>

### Latency Numbers Every Engineer Must Know

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Memory Hierarchy Latencies</h4>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 6px; min-width: 180px; font-weight: 500;">L1 Cache Reference</div>
      <div style="color: #166534; font-weight: bold;">0.5 ns</div>
      <div style="color: #64748b; font-size: 0.85em;">Baseline</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 6px; min-width: 180px; font-weight: 500;">L2 Cache Reference</div>
      <div style="color: #166534; font-weight: bold;">7 ns</div>
      <div style="color: #64748b; font-size: 0.85em;">14x L1</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 6px; min-width: 180px; font-weight: 500;">Main Memory (RAM)</div>
      <div style="color: #92400e; font-weight: bold;">100 ns</div>
      <div style="color: #64748b; font-size: 0.85em;">200x L1</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="background: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 6px; min-width: 180px; font-weight: 500;">SSD Random Read</div>
      <div style="color: #991b1b; font-weight: bold;">150 us</div>
      <div style="color: #64748b; font-size: 0.85em;">300,000x L1</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="background: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 6px; min-width: 180px; font-weight: 500;">HDD Seek</div>
      <div style="color: #991b1b; font-weight: bold;">10 ms</div>
      <div style="color: #64748b; font-size: 0.85em;">20,000,000x L1</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="background: #f3e8ff; color: #6b21a8; padding: 8px 16px; border-radius: 6px; min-width: 180px; font-weight: 500;">Same Datacenter RTT</div>
      <div style="color: #6b21a8; font-weight: bold;">0.5 ms</div>
      <div style="color: #64748b; font-size: 0.85em;">1,000,000x L1</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="background: #f3e8ff; color: #6b21a8; padding: 8px 16px; border-radius: 6px; min-width: 180px; font-weight: 500;">Cross-Continent RTT</div>
      <div style="color: #6b21a8; font-weight: bold;">150 ms</div>
      <div style="color: #64748b; font-size: 0.85em;">300,000,000x L1</div>
    </div>
  </div>
</div>

## How It Works

### Latency Breakdown of a Web Request

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Request Latency Components</h4>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <div style="background: #fee2e2; color: #991b1b; padding: 12px 20px; border-radius: 8px; min-width: 140px; text-align: center; font-weight: 600;">DNS Lookup</div>
      <div style="flex: 1; min-width: 200px; background: #fee2e2; height: 24px; border-radius: 4px; display: flex; align-items: center; padding: 0 12px;">
        <span style="color: #991b1b; font-size: 0.85em;">~50ms (cached: 0ms)</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <div style="background: #fef3c7; color: #92400e; padding: 12px 20px; border-radius: 8px; min-width: 140px; text-align: center; font-weight: 600;">TCP Handshake</div>
      <div style="flex: 1; min-width: 200px; background: #fef3c7; height: 24px; border-radius: 4px; display: flex; align-items: center; padding: 0 12px;">
        <span style="color: #92400e; font-size: 0.85em;">1 RTT (round trip)</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <div style="background: #f3e8ff; color: #6b21a8; padding: 12px 20px; border-radius: 8px; min-width: 140px; text-align: center; font-weight: 600;">TLS Handshake</div>
      <div style="flex: 1; min-width: 200px; background: #f3e8ff; height: 24px; border-radius: 4px; display: flex; align-items: center; padding: 0 12px;">
        <span style="color: #6b21a8; font-size: 0.85em;">1-2 RTT</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <div style="background: #dbeafe; color: #1e40af; padding: 12px 20px; border-radius: 8px; min-width: 140px; text-align: center; font-weight: 600;">Request Transfer</div>
      <div style="flex: 1; min-width: 200px; background: #dbeafe; height: 24px; border-radius: 4px; display: flex; align-items: center; padding: 0 12px;">
        <span style="color: #1e40af; font-size: 0.85em;">payload_size / bandwidth</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <div style="background: #dcfce7; color: #166534; padding: 12px 20px; border-radius: 8px; min-width: 140px; text-align: center; font-weight: 600;">Server Processing</div>
      <div style="flex: 1; min-width: 200px; background: #dcfce7; height: 24px; border-radius: 4px; display: flex; align-items: center; padding: 0 12px;">
        <span style="color: #166534; font-size: 0.85em;">10ms - 1000ms+ (varies widely)</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <div style="background: #e0e7ff; color: #3730a3; padding: 12px 20px; border-radius: 8px; min-width: 140px; text-align: center; font-weight: 600;">Response Transfer</div>
      <div style="flex: 1; min-width: 200px; background: #e0e7ff; height: 24px; border-radius: 4px; display: flex; align-items: center; padding: 0 12px;">
        <span style="color: #3730a3; font-size: 0.85em;">payload_size / bandwidth</span>
      </div>
    </div>
  </div>
  <div style="background: #f1f5f9; padding: 12px; border-radius: 8px; margin-top: 16px; text-align: center;">
    <span style="color: #1e40af; font-weight: 600;">Total Latency = Sum of all components</span>
  </div>
</div>

### Understanding Percentiles (P50, P95, P99)

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Why Averages Lie and Percentiles Tell the Truth</h4>
  <div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; margin: 20px 0;">
    <div style="background: #dcfce7; padding: 20px; border-radius: 12px; text-align: center; min-width: 120px;">
      <div style="color: #166534; font-weight: bold; font-size: 1.2em;">P50</div>
      <div style="color: #166534; font-size: 1.5em; font-weight: bold;">20ms</div>
      <div style="color: #15803d; font-size: 0.85em;">Median - 50% of requests</div>
    </div>
    <div style="background: #fef3c7; padding: 20px; border-radius: 12px; text-align: center; min-width: 120px;">
      <div style="color: #92400e; font-weight: bold; font-size: 1.2em;">P95</div>
      <div style="color: #92400e; font-size: 1.5em; font-weight: bold;">100ms</div>
      <div style="color: #a16207; font-size: 0.85em;">95% of requests</div>
    </div>
    <div style="background: #fee2e2; padding: 20px; border-radius: 12px; text-align: center; min-width: 120px;">
      <div style="color: #991b1b; font-weight: bold; font-size: 1.2em;">P99</div>
      <div style="color: #991b1b; font-size: 1.5em; font-weight: bold;">500ms</div>
      <div style="color: #b91c1c; font-size: 0.85em;">99% of requests</div>
    </div>
  </div>
  <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
    <div style="color: #92400e;">
      <strong>Why P99 Matters:</strong> If you have 1 million daily users and P99 = 500ms, that means 10,000 users experience half-second delays every day. These are often your most valuable power users making multiple requests.
    </div>
  </div>
</div>

### The Latency-Throughput Trade-off Curve

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">System Behavior Under Load</h4>
  <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; align-items: center;">
    <div style="background: white; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; min-width: 280px;">
      <div style="color: #64748b; font-size: 0.9em; text-align: center; margin-bottom: 12px;">Latency vs Throughput</div>
      <div style="position: relative; height: 150px; border-left: 2px solid #64748b; border-bottom: 2px solid #64748b; margin: 20px;">
        <div style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); color: #64748b; font-size: 0.8em;">Throughput</div>
        <div style="position: absolute; left: -60px; top: 50%; transform: translateY(-50%) rotate(-90deg); color: #64748b; font-size: 0.8em;">Latency</div>
        <div style="position: absolute; bottom: 10px; left: 20px; width: 60%; height: 2px; background: #22c55e;"></div>
        <div style="position: absolute; bottom: 10px; right: 20px; width: 20%; height: 100px; border: 2px solid #ef4444; border-bottom: none; border-left: none; border-radius: 0 100px 0 0;"></div>
        <div style="position: absolute; bottom: 40px; left: 40%; color: #22c55e; font-size: 0.75em;">Optimal Zone</div>
        <div style="position: absolute; top: 20px; right: 10px; color: #ef4444; font-size: 0.75em;">Saturated</div>
      </div>
    </div>
    <div style="max-width: 300px;">
      <div style="background: #dcfce7; padding: 12px; border-radius: 8px; margin-bottom: 8px;">
        <span style="color: #166534;"><strong>Optimal Zone:</strong> Low, stable latency even as throughput increases</span>
      </div>
      <div style="background: #fee2e2; padding: 12px; border-radius: 8px;">
        <span style="color: #991b1b;"><strong>Saturated Zone:</strong> Latency spikes exponentially as system approaches capacity</span>
      </div>
    </div>
  </div>
</div>

## Real-Life Failure Story

### Amazon Prime Day 2018: When Latency Killed Sales

**What Happened:**
On Prime Day 2018, Amazon's website experienced significant slowdowns and outages. The homepage intermittently displayed error pages, product searches timed out, and the checkout process crawled. The event was supposed to be Amazon's biggest shopping day of the year.

**Root Cause:**
The database layer couldn't handle the massive spike in traffic. While Amazon had scaled their web servers horizontally, the database connections became saturated. Each slow database query created a backlog, causing latency to spike from milliseconds to seconds. This triggered cascading timeouts across dependent services.

The specific chain of events:
1. Traffic spiked 3x beyond projections in the first hour
2. Database connection pools exhausted
3. Requests started queuing (increased latency)
4. Queued requests timed out, triggering retries
5. Retries doubled the load (retry storms)
6. System entered a death spiral

**How They Fixed It:**
- Implemented circuit breakers to fail fast instead of queuing
- Added request shedding to reject excess traffic gracefully
- Increased database connection pool limits with proper back-pressure
- Deployed more aggressive caching for read-heavy operations
- Added load testing that simulated 10x normal traffic

**Lessons Learned:**
1. **Latency is your canary**: Rising P99 latency is an early warning sign
2. **Retries amplify problems**: Without exponential backoff and jitter, retries cause thundering herds
3. **Test beyond expected peaks**: Prime Day traffic exceeded "worst case" projections
4. **Fail fast, fail gracefully**: Better to reject 10% of requests than slow down 100%

## What to Watch Out For (Common Pitfalls)

### 1. Measuring Only Averages
**The Problem:** Average latency hides outliers. If 99 requests take 10ms and 1 takes 10 seconds, the average is 109ms - but that one user waited 10 seconds!

**The Fix:** Always measure P50, P95, P99, and P99.9. Set alerts on tail latencies.

### 2. Ignoring Tail Latency Amplification
**The Problem:** When a request fans out to N services, the slowest service determines the total latency. With 100 parallel calls, each at P99 = 10ms, probability that ALL complete under 10ms is only 37%.

**The Fix:** Use hedged requests, set aggressive timeouts, or reduce fan-out.

### 3. Confusing Bandwidth with Throughput
**The Problem:** "We have 10Gbps bandwidth!" doesn't mean you can handle 10Gbps of requests. Throughput depends on request size, processing time, and protocol overhead.

**The Fix:** Measure actual requests per second under load, not theoretical bandwidth.

### 4. Over-optimizing for Throughput
**The Problem:** Batching improves throughput but increases latency. If you batch 100 requests and process them together, the first 99 wait for the 100th.

**The Fix:** Use adaptive batching with time limits, not just size limits.

### 5. Not Accounting for Queuing Delays
**The Problem:** Your service processes requests in 10ms, but users experience 500ms latency. The difference is time spent waiting in queues.

**The Fix:** Monitor queue depths. Use Little's Law to predict queuing delays.

### 6. Synchronous Calls in Critical Paths
**The Problem:** Making synchronous calls to slow services blocks your threads and limits throughput.

**The Fix:** Use async I/O, message queues, or timeout-and-retry for non-critical dependencies.

### 7. No Back-Pressure Mechanisms
**The Problem:** When downstream services are slow, your service accepts more requests than it can handle, consuming memory until it crashes.

**The Fix:** Implement back-pressure: reject requests when queues are full, use circuit breakers.

## Interview Deep Dive

### Common Interview Questions

**Q1: "How would you reduce latency for a slow API endpoint?"**

Structure your answer:
1. **Measure first**: Profile to find the bottleneck (DB? Network? CPU?)
2. **Quick wins**: Add caching, connection pooling, query optimization
3. **Architecture changes**: Async processing, CDN, read replicas
4. **Trade-offs**: Discuss what you'd sacrifice (consistency, cost, complexity)

**Q2: "Explain the difference between latency and response time."**

Response time = Latency + Processing time. Latency is the delay before processing starts (network, queuing). Some use them interchangeably, but in interviews, show you understand the nuance.

**Q3: "How would you improve throughput of a database-bound application?"**

- Read replicas for read scaling
- Caching layer (Redis) to reduce DB load
- Connection pooling to reduce connection overhead
- Query optimization and proper indexing
- Sharding for write scaling
- Async writes for non-critical data

### How to Explain This in 2 Minutes

"Latency is how long one request takes - think of it as the speed of a single car. Throughput is how many requests we can handle per second - think of it as how many cars fit on the highway per hour.

The key insight is they're related but different. A highway can have high throughput with slow cars if there are many lanes. Or low throughput with fast cars if there's only one lane.

For users, latency matters most - they feel every millisecond. For the business, throughput matters for capacity planning. We measure latency with percentiles like P99 because averages hide outliers. We use Little's Law - concurrency equals throughput times latency - to plan capacity.

The trade-off is that optimizing for throughput often hurts latency and vice versa. Batching increases throughput but adds waiting time. The art is finding the right balance for your use case."

### Follow-up Questions Interviewers Ask

1. "What's tail latency amplification?" (Know the math: P99 with N parallel calls)
2. "How does caching affect both metrics?" (Improves both when cache hits)
3. "What's the queuing theory behind this?" (Little's Law, M/M/1 queues)
4. "How do you handle latency spikes?" (Circuit breakers, timeouts, shedding)

### Edge Cases to Mention

- Geographic distribution affects baseline latency (speed of light limits)
- Cold starts in serverless add latency spikes
- Garbage collection pauses cause latency outliers
- Virtualization and noisy neighbors add unpredictable latency

## Code Implementation

### Python - Latency and Throughput Measurement

```python
import time
import statistics
from collections import deque
from threading import Lock
from dataclasses import dataclass
from typing import List, Optional
import asyncio

@dataclass
class LatencyStats:
    """Statistics for latency measurements."""
    count: int
    p50: float
    p95: float
    p99: float
    mean: float
    min_val: float
    max_val: float

class LatencyTracker:
    """
    Track latency measurements with percentile calculations.
    Uses a sliding window to keep memory bounded.
    """
    def __init__(self, window_size: int = 10000):
        self.window_size = window_size
        self.measurements: deque = deque(maxlen=window_size)
        self.lock = Lock()

    def record(self, latency_ms: float) -> None:
        """Record a latency measurement in milliseconds."""
        with self.lock:
            self.measurements.append(latency_ms)

    def get_stats(self) -> Optional[LatencyStats]:
        """Calculate percentile statistics."""
        with self.lock:
            if not self.measurements:
                return None

            sorted_data = sorted(self.measurements)
            n = len(sorted_data)

            return LatencyStats(
                count=n,
                p50=sorted_data[int(n * 0.50)],
                p95=sorted_data[int(n * 0.95)],
                p99=sorted_data[int(n * 0.99)],
                mean=statistics.mean(sorted_data),
                min_val=sorted_data[0],
                max_val=sorted_data[-1]
            )

class ThroughputTracker:
    """
    Track throughput using a sliding window counter.
    Reports requests per second over the window period.
    """
    def __init__(self, window_seconds: int = 60):
        self.window_seconds = window_seconds
        self.timestamps: deque = deque()
        self.lock = Lock()

    def record(self) -> None:
        """Record a completed request."""
        now = time.time()
        with self.lock:
            self.timestamps.append(now)
            # Remove old timestamps outside window
            cutoff = now - self.window_seconds
            while self.timestamps and self.timestamps[0] < cutoff:
                self.timestamps.popleft()

    def get_throughput(self) -> float:
        """Get current requests per second."""
        now = time.time()
        with self.lock:
            cutoff = now - self.window_seconds
            while self.timestamps and self.timestamps[0] < cutoff:
                self.timestamps.popleft()

            if not self.timestamps:
                return 0.0

            # Calculate RPS over the actual time span
            time_span = now - self.timestamps[0]
            if time_span == 0:
                return 0.0

            return len(self.timestamps) / time_span

class PerformanceMonitor:
    """
    Combined latency and throughput monitoring.
    Use as a context manager or decorator.
    """
    def __init__(self):
        self.latency = LatencyTracker()
        self.throughput = ThroughputTracker()

    def __enter__(self):
        self._start_time = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        elapsed_ms = (time.perf_counter() - self._start_time) * 1000
        self.latency.record(elapsed_ms)
        self.throughput.record()
        return False

    def track(self, func):
        """Decorator to track function performance."""
        def wrapper(*args, **kwargs):
            with self:
                return func(*args, **kwargs)
        return wrapper

    def report(self) -> dict:
        """Get combined performance report."""
        stats = self.latency.get_stats()
        return {
            "throughput_rps": round(self.throughput.get_throughput(), 2),
            "latency_p50_ms": round(stats.p50, 2) if stats else None,
            "latency_p95_ms": round(stats.p95, 2) if stats else None,
            "latency_p99_ms": round(stats.p99, 2) if stats else None,
            "total_requests": stats.count if stats else 0
        }


# Example usage
if __name__ == "__main__":
    import random

    monitor = PerformanceMonitor()

    # Simulate requests with varying latencies
    for _ in range(1000):
        with monitor:
            # Simulate work - most fast, some slow (tail latency)
            if random.random() < 0.01:  # 1% slow requests
                time.sleep(random.uniform(0.1, 0.5))  # 100-500ms
            else:
                time.sleep(random.uniform(0.005, 0.02))  # 5-20ms

    print("Performance Report:")
    for key, value in monitor.report().items():
        print(f"  {key}: {value}")
```

### Go - Production-Ready Performance Tracking

```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
	"sync"
	"time"
)

// LatencyStats holds calculated percentile statistics
type LatencyStats struct {
	Count int
	P50   time.Duration
	P95   time.Duration
	P99   time.Duration
	Mean  time.Duration
	Min   time.Duration
	Max   time.Duration
}

// LatencyTracker tracks latency measurements with a sliding window
type LatencyTracker struct {
	measurements []time.Duration
	maxSize      int
	mu           sync.RWMutex
}

// NewLatencyTracker creates a new tracker with specified window size
func NewLatencyTracker(windowSize int) *LatencyTracker {
	return &LatencyTracker{
		measurements: make([]time.Duration, 0, windowSize),
		maxSize:      windowSize,
	}
}

// Record adds a latency measurement
func (lt *LatencyTracker) Record(d time.Duration) {
	lt.mu.Lock()
	defer lt.mu.Unlock()

	if len(lt.measurements) >= lt.maxSize {
		// Remove oldest measurement (simple sliding window)
		lt.measurements = lt.measurements[1:]
	}
	lt.measurements = append(lt.measurements, d)
}

// GetStats calculates and returns percentile statistics
func (lt *LatencyTracker) GetStats() *LatencyStats {
	lt.mu.RLock()
	defer lt.mu.RUnlock()

	if len(lt.measurements) == 0 {
		return nil
	}

	// Make a copy and sort
	sorted := make([]time.Duration, len(lt.measurements))
	copy(sorted, lt.measurements)
	sort.Slice(sorted, func(i, j int) bool {
		return sorted[i] < sorted[j]
	})

	n := len(sorted)
	var sum time.Duration
	for _, d := range sorted {
		sum += d
	}

	return &LatencyStats{
		Count: n,
		P50:   sorted[int(float64(n)*0.50)],
		P95:   sorted[int(float64(n)*0.95)],
		P99:   sorted[int(float64(n)*0.99)],
		Mean:  sum / time.Duration(n),
		Min:   sorted[0],
		Max:   sorted[n-1],
	}
}

// ThroughputTracker tracks requests per second
type ThroughputTracker struct {
	timestamps   []time.Time
	windowSecs   int
	mu           sync.Mutex
}

// NewThroughputTracker creates a new throughput tracker
func NewThroughputTracker(windowSeconds int) *ThroughputTracker {
	return &ThroughputTracker{
		timestamps: make([]time.Time, 0),
		windowSecs: windowSeconds,
	}
}

// Record records a completed request
func (tt *ThroughputTracker) Record() {
	now := time.Now()
	tt.mu.Lock()
	defer tt.mu.Unlock()

	// Remove old timestamps
	cutoff := now.Add(-time.Duration(tt.windowSecs) * time.Second)
	start := 0
	for i, ts := range tt.timestamps {
		if ts.After(cutoff) {
			start = i
			break
		}
		start = i + 1
	}
	tt.timestamps = tt.timestamps[start:]
	tt.timestamps = append(tt.timestamps, now)
}

// GetThroughput returns current requests per second
func (tt *ThroughputTracker) GetThroughput() float64 {
	now := time.Now()
	tt.mu.Lock()
	defer tt.mu.Unlock()

	if len(tt.timestamps) == 0 {
		return 0
	}

	// Clean old entries
	cutoff := now.Add(-time.Duration(tt.windowSecs) * time.Second)
	start := 0
	for i, ts := range tt.timestamps {
		if ts.After(cutoff) {
			start = i
			break
		}
		start = i + 1
	}
	tt.timestamps = tt.timestamps[start:]

	if len(tt.timestamps) == 0 {
		return 0
	}

	elapsed := now.Sub(tt.timestamps[0]).Seconds()
	if elapsed == 0 {
		return 0
	}

	return float64(len(tt.timestamps)) / elapsed
}

// PerformanceMonitor combines latency and throughput tracking
type PerformanceMonitor struct {
	Latency    *LatencyTracker
	Throughput *ThroughputTracker
}

// NewPerformanceMonitor creates a new monitor
func NewPerformanceMonitor() *PerformanceMonitor {
	return &PerformanceMonitor{
		Latency:    NewLatencyTracker(10000),
		Throughput: NewThroughputTracker(60),
	}
}

// Track wraps a function and records its performance
func (pm *PerformanceMonitor) Track(fn func()) {
	start := time.Now()
	fn()
	elapsed := time.Since(start)

	pm.Latency.Record(elapsed)
	pm.Throughput.Record()
}

// Report returns a formatted performance report
func (pm *PerformanceMonitor) Report() map[string]interface{} {
	stats := pm.Latency.GetStats()

	report := map[string]interface{}{
		"throughput_rps": fmt.Sprintf("%.2f", pm.Throughput.GetThroughput()),
	}

	if stats != nil {
		report["latency_p50"] = stats.P50.String()
		report["latency_p95"] = stats.P95.String()
		report["latency_p99"] = stats.P99.String()
		report["total_requests"] = stats.Count
	}

	return report
}

func main() {
	monitor := NewPerformanceMonitor()

	// Simulate 1000 requests with varying latencies
	for i := 0; i < 1000; i++ {
		monitor.Track(func() {
			// Simulate work - 1% slow requests (tail latency)
			if rand.Float64() < 0.01 {
				time.Sleep(time.Duration(100+rand.Intn(400)) * time.Millisecond)
			} else {
				time.Sleep(time.Duration(5+rand.Intn(15)) * time.Millisecond)
			}
		})
	}

	fmt.Println("Performance Report:")
	for key, value := range monitor.Report() {
		fmt.Printf("  %s: %v\n", key, value)
	}
}
```

## Quick Reference Card

### Key Formulas
- **Little's Law**: `L = lambda * W` (Concurrency = Throughput * Latency)
- **Throughput**: `Requests completed / Time period`
- **Latency percentile**: Sort all measurements, pick value at position `N * percentile`

### Critical Numbers to Memorize
| Operation | Latency |
|-----------|---------|
| L1 cache | 0.5 ns |
| RAM | 100 ns |
| SSD read | 150 us |
| Same-DC network | 0.5 ms |
| Cross-continent | 150 ms |

### Latency Optimization Checklist
1. Add caching (fastest win)
2. Use connection pooling
3. Optimize database queries
4. Move to async I/O
5. Use CDN for static content
6. Reduce payload sizes
7. Enable compression

### Throughput Optimization Checklist
1. Horizontal scaling (add servers)
2. Database read replicas
3. Request batching
4. Async processing for non-critical work
5. Load shedding under pressure
6. Connection pooling

### Red Flags in Production
- P99 > 10x P50 (too much variance)
- Throughput dropping while load increases (saturation)
- Latency increasing linearly with load (queuing)
- Memory growing with request count (no back-pressure)

### Interview Soundbites
- "Latency is about one user's experience; throughput is about system capacity"
- "Always measure P99, not just averages - averages hide the worst experiences"
- "Little's Law connects concurrency, throughput, and latency"
- "Tail latency amplification means your slowest dependency determines your speed"
