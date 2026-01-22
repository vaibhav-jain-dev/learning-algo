# System Design Fundamentals

## Overview

System design is the process of defining the architecture, components, modules, interfaces, and data flow of a system to satisfy specified requirements. It's the art of making deliberate trade-offs to build systems that are scalable, reliable, and maintainable. Understanding these fundamentals is essential for every software engineer, whether you're building a small startup MVP or architecting systems that serve billions of users.

**Tags:** System Design, Architecture, Fundamentals, Scalability, Interviews

---

## Why This Matters

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #cbd5e1;">
<div style="color: #0f172a; font-size: 15px; line-height: 1.8;">

**For Interviews:** System design questions are gatekeepers at top tech companies. They reveal how you think about complex problems, communicate trade-offs, and handle ambiguity.

**For Your Career:** These skills separate senior engineers from juniors. Understanding fundamentals lets you make decisions that save companies millions in infrastructure costs and prevent catastrophic failures.

**For Real Systems:** Every outage at Facebook, every slow day at Twitter, every data loss incident traces back to fundamental design decisions. Master these, and you'll build systems that survive the real world.

</div>
</div>

---

## Core Concepts with Analogies

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #0f172a; margin: 0 0 24px 0; text-align: center; font-size: 18px; font-weight: 700;">THE RESTAURANT ANALOGY FOR SYSTEM DESIGN</h4>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">

<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #059669; font-weight: 700; margin-bottom: 12px; font-size: 15px;">Scalability = More Customers</div>
<div style="color: #475569; font-size: 14px; line-height: 1.6;">
When your restaurant gets popular, you can either get a bigger kitchen (vertical scaling) or open more locations (horizontal scaling). Each approach has trade-offs in cost, complexity, and capacity limits.
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #2563eb; font-weight: 700; margin-bottom: 12px; font-size: 15px;">Reliability = Consistent Experience</div>
<div style="color: #475569; font-size: 14px; line-height: 1.6;">
Customers expect their favorite dish to taste the same every visit. Reliability means your system behaves correctly even when things go wrong - a chef calls in sick, the oven breaks, or there's a rush.
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 12px; font-size: 15px;">Availability = Always Open</div>
<div style="color: #475569; font-size: 14px; line-height: 1.6;">
A restaurant that's closed when customers arrive loses business. Availability is the percentage of time your system is operational. 99.9% uptime still means 8+ hours of downtime per year.
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #7c3aed; font-weight: 700; margin-bottom: 12px; font-size: 15px;">Latency = Wait Time</div>
<div style="color: #475569; font-size: 14px; line-height: 1.6;">
How long from ordering to food arriving? Low latency means quick service. Some dishes (complex queries) naturally take longer, but customers expect reasonable wait times.
</div>
</div>

</div>
</div>

---

## The System Design Building Blocks

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #0f172a; margin: 0 0 24px 0; text-align: center; font-size: 18px; font-weight: 700;">SYSTEM DESIGN CONCEPT MAP</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">

<div>
<div style="color: #059669; font-weight: 700; margin-bottom: 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Foundational Concepts</div>
<div style="display: flex; flex-direction: column; gap: 10px;">
<div style="background: #ecfdf5; padding: 14px 16px; border-radius: 8px; border-left: 4px solid #059669;">
<div style="color: #0f172a; font-weight: 600; font-size: 14px;">Client-Server Model</div>
<div style="color: #64748b; font-size: 13px; margin-top: 4px;">Request-response communication pattern</div>
</div>
<div style="background: #ecfdf5; padding: 14px 16px; border-radius: 8px; border-left: 4px solid #059669;">
<div style="color: #0f172a; font-weight: 600; font-size: 14px;">Network Protocols</div>
<div style="color: #64748b; font-size: 13px; margin-top: 4px;">HTTP, TCP/UDP, WebSocket, gRPC</div>
</div>
<div style="background: #ecfdf5; padding: 14px 16px; border-radius: 8px; border-left: 4px solid #059669;">
<div style="color: #0f172a; font-weight: 600; font-size: 14px;">Storage Systems</div>
<div style="color: #64748b; font-size: 13px; margin-top: 4px;">Databases, file systems, caches</div>
</div>
</div>
</div>

<div>
<div style="color: #2563eb; font-weight: 700; margin-bottom: 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Performance Metrics</div>
<div style="display: flex; flex-direction: column; gap: 10px;">
<div style="background: #eff6ff; padding: 14px 16px; border-radius: 8px; border-left: 4px solid #2563eb;">
<div style="color: #0f172a; font-weight: 600; font-size: 14px;">Latency</div>
<div style="color: #64748b; font-size: 13px; margin-top: 4px;">Time to complete a single operation (p50, p95, p99)</div>
</div>
<div style="background: #eff6ff; padding: 14px 16px; border-radius: 8px; border-left: 4px solid #2563eb;">
<div style="color: #0f172a; font-weight: 600; font-size: 14px;">Throughput</div>
<div style="color: #64748b; font-size: 13px; margin-top: 4px;">Number of operations per time unit (QPS, TPS)</div>
</div>
<div style="background: #eff6ff; padding: 14px 16px; border-radius: 8px; border-left: 4px solid #2563eb;">
<div style="color: #0f172a; font-weight: 600; font-size: 14px;">Availability</div>
<div style="color: #64748b; font-size: 13px; margin-top: 4px;">Percentage of time system is operational</div>
</div>
</div>
</div>

</div>

<div style="margin-top: 24px;">
<div style="color: #7c3aed; font-weight: 700; margin-bottom: 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Scaling Strategies</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px;">
<div style="background: #f5f3ff; padding: 14px; border-radius: 8px; text-align: center; border: 1px solid #ddd6fe;">
<div style="color: #7c3aed; font-weight: 600; font-size: 13px;">Load Balancing</div>
</div>
<div style="background: #f5f3ff; padding: 14px; border-radius: 8px; text-align: center; border: 1px solid #ddd6fe;">
<div style="color: #7c3aed; font-weight: 600; font-size: 13px;">Caching</div>
</div>
<div style="background: #f5f3ff; padding: 14px; border-radius: 8px; text-align: center; border: 1px solid #ddd6fe;">
<div style="color: #7c3aed; font-weight: 600; font-size: 13px;">Sharding</div>
</div>
<div style="background: #f5f3ff; padding: 14px; border-radius: 8px; text-align: center; border: 1px solid #ddd6fe;">
<div style="color: #7c3aed; font-weight: 600; font-size: 13px;">Replication</div>
</div>
</div>
</div>
</div>

---

## Horizontal vs Vertical Scaling

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #0f172a; margin: 0 0 24px 0; text-align: center; font-size: 18px; font-weight: 700;">SCALING STRATEGIES COMPARED</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">

<div style="background: #ecfdf5; border-radius: 12px; padding: 24px; border: 2px solid #059669;">
<div style="color: #059669; font-weight: 700; font-size: 16px; margin-bottom: 16px;">VERTICAL SCALING (Scale Up)</div>
<div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
<div style="background: #059669; width: 50px; height: 35px; border-radius: 6px; margin-bottom: 8px;"></div>
<div style="color: #059669; font-size: 20px;">arrow_downward</div>
<div style="background: #059669; width: 70px; height: 50px; border-radius: 6px; margin-top: 8px;"></div>
</div>
<ul style="color: #0f172a; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
<li>Add more CPU, RAM, storage</li>
<li>Simple to implement</li>
<li>Hardware limits exist</li>
<li>Single point of failure</li>
<li>Requires downtime for upgrades</li>
</ul>
</div>

<div style="background: #eff6ff; border-radius: 12px; padding: 24px; border: 2px solid #2563eb;">
<div style="color: #2563eb; font-weight: 700; font-size: 16px; margin-bottom: 16px;">HORIZONTAL SCALING (Scale Out)</div>
<div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;">
<div style="background: #2563eb; width: 35px; height: 35px; border-radius: 6px;"></div>
<div style="color: #2563eb; align-self: center; font-size: 20px;">arrow_forward</div>
<div style="background: #2563eb; width: 35px; height: 35px; border-radius: 6px;"></div>
<div style="background: #2563eb; width: 35px; height: 35px; border-radius: 6px;"></div>
<div style="background: #2563eb; width: 35px; height: 35px; border-radius: 6px;"></div>
</div>
<ul style="color: #0f172a; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
<li>Add more machines</li>
<li>Better fault tolerance</li>
<li>Theoretically unlimited</li>
<li>More complex architecture</li>
<li>Zero downtime possible</li>
</ul>
</div>

</div>
</div>

### When to Use Each

| Aspect | Vertical Scaling | Horizontal Scaling |
|--------|------------------|-------------------|
| **Cost** | Expensive hardware | Commodity hardware |
| **Complexity** | Low | High |
| **Downtime** | Required for upgrades | Zero downtime possible |
| **Limit** | Hardware ceiling | Virtually unlimited |
| **Best for** | Databases, legacy apps | Stateless services, web apps |

---

## Real-Life Failure Stories

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #dc2626;">
<h4 style="color: #dc2626; margin: 0 0 16px 0;">The S3 Outage That Broke the Internet (2017)</h4>
<div style="color: #0f172a; font-size: 14px; line-height: 1.8;">

**What Happened:** A single typo during routine debugging took down a significant portion of the internet. An engineer ran a command to remove a small number of servers but accidentally removed a larger set of servers that supported critical S3 subsystems.

**The Cascade:** The billing system went down, which prevented new servers from being added. Other AWS services that depended on S3 (including the AWS status dashboard!) failed. Websites across the internet - Slack, Trello, IFTTT - went dark.

**The Lesson:**
- **Blast radius matters** - One component's failure should be contained
- **Dependencies are dangerous** - Even your monitoring system shouldn't depend on what it monitors
- **Human error is inevitable** - Build systems that limit the damage humans can do

</div>
</div>

<div style="background: #fffbeb; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #f59e0b;">
<h4 style="color: #b45309; margin: 0 0 16px 0;">Knight Capital: $440 Million in 45 Minutes (2012)</h4>
<div style="color: #0f172a; font-size: 14px; line-height: 1.8;">

**What Happened:** A deployment error left old, test code running on one of eight servers. This code executed millions of unintended trades, losing $440 million before anyone could stop it.

**Root Cause:**
- Manual deployment process with no automated checks
- Reused a configuration flag that triggered old behavior
- No circuit breakers or kill switches
- Monitoring didn't catch the anomaly fast enough

**The Lesson:**
- **Automate deployments** - Humans make mistakes under pressure
- **Use feature flags carefully** - Old flags become landmines
- **Build kill switches** - You need to stop runaway processes instantly
- **Test in production-like environments** - The bug only appeared with real market data

</div>
</div>

---

## Back-of-the-Envelope Calculations

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #0f172a; margin: 0 0 24px 0; text-align: center; font-size: 18px; font-weight: 700;">QUICK REFERENCE NUMBERS</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">

<div>
<div style="color: #059669; font-weight: 700; margin-bottom: 12px; font-size: 14px;">LATENCY NUMBERS</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 13px; border: 1px solid #e2e8f0;">
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #64748b;">L1 cache</span><span style="color: #059669; font-weight: 600;">0.5 ns</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #64748b;">L2 cache</span><span style="color: #059669; font-weight: 600;">7 ns</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #64748b;">RAM access</span><span style="color: #059669; font-weight: 600;">100 ns</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #64748b;">SSD read</span><span style="color: #2563eb; font-weight: 600;">150 us</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #64748b;">HDD seek</span><span style="color: #f59e0b; font-weight: 600;">10 ms</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #64748b;">Same datacenter RTT</span><span style="color: #2563eb; font-weight: 600;">0.5 ms</span></div>
<div style="display: flex; justify-content: space-between;"><span style="color: #64748b;">Cross-continent RTT</span><span style="color: #dc2626; font-weight: 600;">150 ms</span></div>
</div>
</div>

<div>
<div style="color: #2563eb; font-weight: 700; margin-bottom: 12px; font-size: 14px;">DATA SIZE & TIME</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 13px; border: 1px solid #e2e8f0;">
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #64748b;">1 KB</span><span style="color: #059669; font-weight: 600;">1,000 bytes</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #64748b;">1 MB</span><span style="color: #059669; font-weight: 600;">1,000 KB</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #64748b;">1 GB</span><span style="color: #059669; font-weight: 600;">1,000 MB</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #64748b;">1 TB</span><span style="color: #2563eb; font-weight: 600;">1,000 GB</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #64748b;">Seconds/day</span><span style="color: #7c3aed; font-weight: 600;">86,400</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #64748b;">Seconds/month</span><span style="color: #7c3aed; font-weight: 600;">~2.5M</span></div>
<div style="display: flex; justify-content: space-between;"><span style="color: #64748b;">Requests/day @ 1 QPS</span><span style="color: #7c3aed; font-weight: 600;">86,400</span></div>
</div>
</div>

</div>
</div>

### Example Calculation: Twitter-like Service

```python
# Given assumptions
total_users = 500_000_000       # 500 million users
daily_active_users = 200_000_000  # 200 million DAU
tweets_per_user_per_day = 2
reads_per_user_per_day = 200
tweet_size_bytes = 500          # 280 chars + metadata

# Write Traffic Calculation
tweets_per_day = daily_active_users * tweets_per_user_per_day
# = 200M * 2 = 400M tweets/day

tweets_per_second = tweets_per_day / 86400
# = 400M / 86400 ≈ 4,600 tweets/sec

peak_tweets_per_second = tweets_per_second * 2
# ≈ 9,200 tweets/sec (assume 2x peak)

# Read Traffic Calculation
reads_per_day = daily_active_users * reads_per_user_per_day
# = 200M * 200 = 40B reads/day

reads_per_second = reads_per_day / 86400
# = 40B / 86400 ≈ 460,000 reads/sec

read_write_ratio = reads_per_second / tweets_per_second
# ≈ 100:1 (read-heavy system!)

# Storage Calculation (5 years)
daily_storage = tweets_per_day * tweet_size_bytes
# = 400M * 500 bytes = 200 GB/day

storage_5_years = daily_storage * 365 * 5
# = 200 GB * 365 * 5 = 365 TB

storage_with_replication = storage_5_years * 3
# ≈ 1 PB (with 3x replication)
```

---

## Interview Deep Dive

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #0f172a; margin: 0 0 24px 0; text-align: center; font-size: 18px; font-weight: 700;">SYSTEM DESIGN INTERVIEW FRAMEWORK</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #059669; color: #ffffff; padding: 10px 20px; border-radius: 8px; min-width: 160px; text-align: center; font-weight: 700;">1. Requirements</div>
<div style="color: #475569; font-size: 14px; flex: 1; min-width: 200px;">Ask clarifying questions. Define functional and non-functional requirements. (3-5 min)</div>
</div>

<div style="text-align: center; color: #94a3b8; font-size: 20px;">|</div>

<div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #2563eb; color: #ffffff; padding: 10px 20px; border-radius: 8px; min-width: 160px; text-align: center; font-weight: 700;">2. Estimation</div>
<div style="color: #475569; font-size: 14px; flex: 1; min-width: 200px;">Calculate scale: users, storage, bandwidth, QPS. Show your math. (3-5 min)</div>
</div>

<div style="text-align: center; color: #94a3b8; font-size: 20px;">|</div>

<div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #7c3aed; color: #ffffff; padding: 10px 20px; border-radius: 8px; min-width: 160px; text-align: center; font-weight: 700;">3. High-Level</div>
<div style="color: #475569; font-size: 14px; flex: 1; min-width: 200px;">Draw main components, data flow, APIs. Keep it simple first. (10-15 min)</div>
</div>

<div style="text-align: center; color: #94a3b8; font-size: 20px;">|</div>

<div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #f59e0b; color: #ffffff; padding: 10px 20px; border-radius: 8px; min-width: 160px; text-align: center; font-weight: 700;">4. Deep Dive</div>
<div style="color: #475569; font-size: 14px; flex: 1; min-width: 200px;">Detail specific components, database schema, algorithms. (15-20 min)</div>
</div>

<div style="text-align: center; color: #94a3b8; font-size: 20px;">|</div>

<div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #dc2626; color: #ffffff; padding: 10px 20px; border-radius: 8px; min-width: 160px; text-align: center; font-weight: 700;">5. Wrap Up</div>
<div style="color: #475569; font-size: 14px; flex: 1; min-width: 200px;">Discuss bottlenecks, scaling, monitoring, future improvements. (5 min)</div>
</div>

</div>
</div>

### Common Interview Questions & Answers

**Q: How do you handle a system that needs 99.99% availability?**

**A:** "Four nines means about 52 minutes of downtime per year. To achieve this, I would:
1. **Eliminate single points of failure** - Replicate every critical component
2. **Use multiple availability zones** - Survive datacenter failures
3. **Implement health checks and auto-recovery** - Detect and replace failed instances automatically
4. **Use blue-green deployments** - Zero-downtime releases
5. **Design for graceful degradation** - Serve cached content or reduced functionality rather than complete failure
6. **Chaos engineering** - Regularly test failure scenarios"

**Q: When would you choose SQL vs NoSQL?**

**A:** "It depends on the access patterns and consistency requirements:

**Choose SQL when:**
- You need ACID transactions (financial systems)
- Data has complex relationships (joins are common)
- Schema is well-defined and stable
- Strong consistency is required

**Choose NoSQL when:**
- Horizontal scaling is priority (massive write throughput)
- Schema flexibility is needed (evolving data models)
- Simple access patterns (key-value, document lookup)
- Eventual consistency is acceptable"

**Q: How do you identify bottlenecks in a system?**

**A:** "I follow a systematic approach:
1. **Measure first** - Use APM tools, distributed tracing
2. **Check the database** - Often the bottleneck (slow queries, missing indexes)
3. **Look at network calls** - External API latency, chatty microservices
4. **Examine memory/CPU** - Resource saturation
5. **Review logs** - Error rates, retry storms
6. **Load test** - Find the breaking point before users do"

---

## Python Code Examples

### Simple Rate Limiter

```python
import time
from collections import defaultdict
from threading import Lock
from typing import Dict


class TokenBucketRateLimiter:
    """
    Token bucket rate limiter for API endpoints.

    Use Case: Protect your API from abuse while allowing burst traffic.
    """

    def __init__(self, capacity: int, refill_rate: float):
        """
        Args:
            capacity: Maximum tokens (burst size)
            refill_rate: Tokens added per second
        """
        self.capacity = capacity
        self.refill_rate = refill_rate
        self.buckets: Dict[str, dict] = defaultdict(
            lambda: {'tokens': capacity, 'last_refill': time.time()}
        )
        self.lock = Lock()

    def _refill(self, bucket: dict) -> None:
        """Add tokens based on time elapsed."""
        now = time.time()
        elapsed = now - bucket['last_refill']
        tokens_to_add = elapsed * self.refill_rate
        bucket['tokens'] = min(self.capacity, bucket['tokens'] + tokens_to_add)
        bucket['last_refill'] = now

    def allow_request(self, client_id: str, tokens_needed: int = 1) -> bool:
        """
        Check if request should be allowed.

        Returns:
            True if request is allowed, False if rate limited
        """
        with self.lock:
            bucket = self.buckets[client_id]
            self._refill(bucket)

            if bucket['tokens'] >= tokens_needed:
                bucket['tokens'] -= tokens_needed
                return True
            return False

    def get_wait_time(self, client_id: str, tokens_needed: int = 1) -> float:
        """Return seconds until enough tokens are available."""
        with self.lock:
            bucket = self.buckets[client_id]
            self._refill(bucket)

            if bucket['tokens'] >= tokens_needed:
                return 0.0

            tokens_deficit = tokens_needed - bucket['tokens']
            return tokens_deficit / self.refill_rate


# Usage Example
limiter = TokenBucketRateLimiter(capacity=10, refill_rate=1.0)  # 10 burst, 1/sec

def handle_request(client_id: str) -> str:
    if limiter.allow_request(client_id):
        return "Request processed"
    else:
        wait_time = limiter.get_wait_time(client_id)
        return f"Rate limited. Retry after {wait_time:.2f} seconds"


# Simulate requests
for i in range(15):
    result = handle_request("user_123")
    print(f"Request {i+1}: {result}")
```

### Circuit Breaker Pattern

```python
import time
from enum import Enum
from typing import Callable, Any
from functools import wraps
from threading import Lock


class CircuitState(Enum):
    CLOSED = "closed"      # Normal operation
    OPEN = "open"          # Failing, reject requests
    HALF_OPEN = "half_open"  # Testing if service recovered


class CircuitBreaker:
    """
    Circuit breaker to prevent cascade failures.

    When a service fails repeatedly, the circuit "opens" and
    fails fast without trying the service, giving it time to recover.
    """

    def __init__(
        self,
        failure_threshold: int = 5,
        recovery_timeout: float = 30.0,
        expected_exception: type = Exception
    ):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.expected_exception = expected_exception

        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.last_failure_time = 0.0
        self.lock = Lock()

    def _should_attempt(self) -> bool:
        """Check if we should attempt the call."""
        with self.lock:
            if self.state == CircuitState.CLOSED:
                return True

            if self.state == CircuitState.OPEN:
                # Check if recovery timeout has passed
                if time.time() - self.last_failure_time >= self.recovery_timeout:
                    self.state = CircuitState.HALF_OPEN
                    return True
                return False

            # HALF_OPEN: Allow one test request
            return True

    def _record_success(self) -> None:
        """Record successful call."""
        with self.lock:
            self.failure_count = 0
            self.state = CircuitState.CLOSED

    def _record_failure(self) -> None:
        """Record failed call."""
        with self.lock:
            self.failure_count += 1
            self.last_failure_time = time.time()

            if self.failure_count >= self.failure_threshold:
                self.state = CircuitState.OPEN

    def call(self, func: Callable, *args, **kwargs) -> Any:
        """Execute function with circuit breaker protection."""
        if not self._should_attempt():
            raise CircuitBreakerOpen(
                f"Circuit breaker is open. Retry after {self.recovery_timeout}s"
            )

        try:
            result = func(*args, **kwargs)
            self._record_success()
            return result
        except self.expected_exception as e:
            self._record_failure()
            raise

    def __call__(self, func: Callable) -> Callable:
        """Decorator usage."""
        @wraps(func)
        def wrapper(*args, **kwargs):
            return self.call(func, *args, **kwargs)
        return wrapper


class CircuitBreakerOpen(Exception):
    """Raised when circuit breaker is open."""
    pass


# Usage Example
payment_circuit = CircuitBreaker(failure_threshold=3, recovery_timeout=10.0)

@payment_circuit
def process_payment(amount: float) -> dict:
    """Simulated payment processing that might fail."""
    # In reality, this calls an external payment service
    import random
    if random.random() < 0.3:  # 30% failure rate
        raise ConnectionError("Payment service unavailable")
    return {"status": "success", "amount": amount}


# Test the circuit breaker
for i in range(10):
    try:
        result = process_payment(99.99)
        print(f"Payment {i+1}: {result}")
    except CircuitBreakerOpen as e:
        print(f"Payment {i+1}: Circuit open - {e}")
    except ConnectionError as e:
        print(f"Payment {i+1}: Failed - {e}")
    time.sleep(0.5)
```

---

## Quick Reference Card

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #0f172a; margin: 0 0 24px 0; text-align: center; font-size: 18px; font-weight: 700;">SYSTEM DESIGN CHEAT SHEET</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">

<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #059669; font-weight: 700; margin-bottom: 12px;">Availability Levels</div>
<div style="font-size: 13px; color: #475569; line-height: 1.8;">
<div><strong>99%</strong> = 3.65 days/year downtime</div>
<div><strong>99.9%</strong> = 8.76 hours/year downtime</div>
<div><strong>99.99%</strong> = 52 minutes/year downtime</div>
<div><strong>99.999%</strong> = 5 minutes/year downtime</div>
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #2563eb; font-weight: 700; margin-bottom: 12px;">Common Trade-offs</div>
<div style="font-size: 13px; color: #475569; line-height: 1.8;">
<div>Consistency vs Availability (CAP)</div>
<div>Latency vs Throughput</div>
<div>Simplicity vs Flexibility</div>
<div>Cost vs Performance</div>
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #7c3aed; font-weight: 700; margin-bottom: 12px;">When to Shard</div>
<div style="font-size: 13px; color: #475569; line-height: 1.8;">
<div>Single DB hitting limits</div>
<div>Read replicas not enough</div>
<div>Data too large for one machine</div>
<div>Geographic distribution needed</div>
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">Red Flags in Design</div>
<div style="font-size: 13px; color: #475569; line-height: 1.8;">
<div>Single point of failure</div>
<div>Synchronous external calls</div>
<div>No caching strategy</div>
<div>Missing monitoring/alerting</div>
</div>
</div>

</div>
</div>

---

## Summary

System design fundamentals are the foundation of building robust, scalable systems:

1. **Understand requirements** - Both functional and non-functional
2. **Estimate scale** - Back-of-envelope math guides decisions
3. **Know the trade-offs** - Every choice has costs and benefits
4. **Design for failure** - Assume everything can and will fail
5. **Start simple** - Complexity is easy to add, hard to remove
6. **Measure everything** - You can't improve what you don't measure

---

## Related Topics

- [Load Balancing](/topic/system-design/load-balancing)
- [Caching](/topic/system-design/caching)
- [Database Sharding](/topic/system-design/database-sharding)
- [Microservices](/topic/system-design/microservices)
- [CAP Theorem](/topic/system-design/cap-theorem)
