# Logger Library Design

## Problem Statement

Design a production-grade logging library that supports multiple log levels, asynchronous logging, structured logging, log rotation, and pluggable output sinks. The system should handle high-throughput scenarios, provide thread-safe operations, and maintain minimal performance overhead when logging is disabled.

This problem tests your understanding of concurrency patterns, I/O optimization, the Strategy pattern, and designing extensible APIs. It is commonly asked at companies building distributed systems, observability platforms, and infrastructure tooling.

---

## Core Concepts Deep Dive

### 1. Log Levels: Severity Classification System

<div style="background: #f8fafc; border-left: 4px solid #8b5cf6; border-radius: 16px; padding: 24px; margin: 20px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 18px; margin-bottom: 16px;">The Log Level Hierarchy</div>
<div style="color: #1e293b; font-size: 14px; line-height: 1.8;">

Log levels form a **severity hierarchy** where each level implies all levels above it. This design enables **level-based filtering** at multiple points in the logging pipeline: at the logger, at individual handlers, and through filter chains.

</div>
</div>

#### Internal Mechanism

Log levels are implemented as **integer values** with intentional gaps between them (10, 20, 30, 40, 50). This spacing allows users to define custom intermediate levels without modifying the core enum:

```python
class LogLevel(IntEnum):
    TRACE = 5       # Custom: More verbose than DEBUG
    DEBUG = 10      # Development diagnostics
    INFO = 20       # Operational messages
    NOTICE = 25     # Custom: Significant but normal
    WARNING = 30    # Potential issues
    ERROR = 40      # Errors that don't halt execution
    CRITICAL = 50   # System failures requiring intervention
    SILENT = 100    # Suppress all logging
```

<div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; margin-bottom: 8px;">Design Decision: Integer Gaps</div>
<div style="color: #78350f; font-size: 14px;">
The 10-unit gaps between standard levels allow frameworks to inject domain-specific levels (e.g., SECURITY = 35 between WARNING and ERROR) without breaking existing level comparisons. This is why Python's logging uses 10, 20, 30... rather than 1, 2, 3.
</div>
</div>

#### Level Checking Optimization

A critical performance optimization is **early level checking**. The logger checks if the message will be processed before performing any expensive operations:

```python
def info(self, message: str, *args, **kwargs) -> None:
    # FAST PATH: Skip everything if level too low
    if self.level > LogLevel.INFO:
        return  # No string formatting, no record creation

    # SLOW PATH: Only executed when message will be logged
    self._log(LogLevel.INFO, message, *args, **kwargs)
```

<div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: bold; margin-bottom: 8px;">Assumption: Level Stability</div>
<div style="color: #14532d; font-size: 14px;">
We assume log levels are set once at startup and rarely modified at runtime. This allows caching the effective level rather than recomputing it through the logger hierarchy on every log call. If dynamic level changes are frequent, consider using atomic integers and invalidation callbacks.
</div>
</div>

#### Effective Level Resolution

In hierarchical logger systems, a logger's **effective level** is determined by walking up the parent chain:

```python
def get_effective_level(self) -> LogLevel:
    """Traverse hierarchy to find first explicitly set level."""
    logger = self
    while logger is not None:
        if logger._level_explicitly_set:
            return logger.level
        logger = logger.parent
    return LogLevel.WARNING  # Root default
```

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 16px; margin-bottom: 20px;">Log Level Flow</div>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #dbeafe; padding: 14px 20px; border-radius: 10px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; font-size: 12px;">logger.info()</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #fef3c7; padding: 14px 20px; border-radius: 10px; border: 2px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; font-size: 12px;">Level Check</div>
<div style="color: #a16207; font-size: 10px;">INFO >= effective_level?</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #dcfce7; padding: 14px 20px; border-radius: 10px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: bold; font-size: 12px;">Pass</div>
<div style="color: #15803d; font-size: 10px;">Continue processing</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-left: 40px;">
<div style="background: #fee2e2; padding: 14px 20px; border-radius: 10px; border: 2px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; font-size: 12px;">Fail</div>
<div style="color: #b91c1c; font-size: 10px;">Return immediately</div>
</div>
<div style="color: #64748b; font-size: 14px; margin-left: 8px;">No allocation, no formatting</div>
</div>

</div>
</div>

#### Interview Questions: Log Levels (3 Levels Deep)

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 12px;">Level 1: Fundamentals</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">

**Q1: Why use integers for log levels instead of an enum with sequential values?**

Integer gaps (10, 20, 30...) allow insertion of custom levels without modifying the core library. A user can define `SECURITY = 35` without breaking existing code that compares `level >= WARNING`. Sequential enums would require library modifications for custom levels.

**Q2: Where should level filtering occur - at the logger or handler level?**

Both. Logger-level filtering provides **early termination** (avoiding record creation entirely), while handler-level filtering enables **routing** (e.g., only ERROR+ to PagerDuty, all levels to file). The two-tier approach optimizes both performance and flexibility.

</div>
</div>

<div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; margin-bottom: 12px;">Level 2: Implementation Depth</div>
<div style="color: #78350f; font-size: 14px; line-height: 1.8;">

**Q2.1: How does Python's logging module handle the effective level calculation, and what's the performance implication?**

Python caches the effective level but must invalidate it when any ancestor's level changes. The module uses a `manager.loggerDict` that maintains weak references to loggers. When a level is set, `Logger.setLevel()` iterates through all loggers to clear cached effective levels. This O(n) invalidation is acceptable because level changes are rare. In high-performance systems, consider thread-local caching with version numbers.

**Q2.2: How would you implement log level inheritance in a concurrent system where levels can change at runtime?**

Use atomic compare-and-swap for level updates with a generation counter. Each logger caches its effective level plus the generation number. On log calls, compare local generation with global; if mismatched, recompute effective level. This bounds the cost of level changes to the first log call per thread post-change rather than eagerly invalidating all caches.

</div>
</div>

<div style="background: #fee2e2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; margin-bottom: 12px;">Level 3: System Design Implications</div>
<div style="color: #7f1d1d; font-size: 14px; line-height: 1.8;">

**Q2.1.1: In a microservices architecture, how would you implement dynamic log level changes across services without restarts?**

Implement a **control plane** for log levels using a configuration service (e.g., etcd, Consul) with watches. Each service subscribes to its log level configuration. On change notification: (1) validate the new level, (2) atomically update the level with a memory barrier, (3) optionally confirm the change back to the control plane. Include rate limiting on level changes to prevent oscillation attacks. Consider implementing "temporary level escalation" that auto-reverts after a TTL for debugging production issues.

**Q2.2.1: What happens if a log level comparison races with a level update? Is this a data race, and does it matter?**

On most architectures, integer reads/writes are atomic at the word level, making this a **benign race** rather than undefined behavior. The worst case is logging one extra message or missing one - both acceptable. However, if level is stored in a non-word-aligned field or the check involves multiple fields, use atomic operations. The key insight is that log level filtering is **best-effort** - occasional inconsistency is acceptable, while locking on every log call is not.

**Q2.2.2: How would you implement sampling-based log level escalation (e.g., "log 1% of DEBUG messages in production")?**

```python
class SampledLevel:
    def __init__(self, base_level: LogLevel, sample_rates: dict):
        self.base = base_level
        self.rates = sample_rates  # {DEBUG: 0.01, INFO: 0.1}

    def should_log(self, level: LogLevel) -> bool:
        if level >= self.base:
            return True
        rate = self.rates.get(level, 0)
        return random.random() < rate  # Thread-local RNG
```

Include the sampling decision in the log record so downstream systems know a message was sampled. This enables proper extrapolation when aggregating metrics from logs.

</div>
</div>

---

### 2. Asynchronous Logging: Decoupling Production from I/O

<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 18px; margin-bottom: 16px;">Why Async Logging Matters</div>
<div style="color: #1e293b; font-size: 14px; line-height: 1.8;">

Synchronous logging blocks the calling thread during I/O operations. A single slow network write to a log aggregator can cascade into request latency spikes. Async logging **decouples** log production (application threads) from log consumption (I/O threads), converting variable I/O latency into bounded queue insertion time.

</div>
</div>

#### Architecture: The Producer-Consumer Model

```python
import threading
import queue
from typing import Optional

class AsyncHandler(Handler):
    """
    Non-blocking handler using a bounded queue and background thread.

    Trade-offs:
    - Pro: Calling thread never blocks on I/O
    - Pro: Batching opportunities reduce syscall overhead
    - Con: Logs may be lost on crash (configurable durability)
    - Con: Memory pressure under burst logging
    """

    def __init__(self,
                 delegate: Handler,
                 queue_size: int = 10000,
                 overflow_policy: str = "drop_oldest"):
        super().__init__()
        self.delegate = delegate
        self.queue: queue.Queue = queue.Queue(maxsize=queue_size)
        self.overflow_policy = overflow_policy
        self._shutdown = threading.Event()
        self._worker = threading.Thread(target=self._process_loop, daemon=True)
        self._worker.start()

    def emit(self, formatted: str, record: LogRecord) -> None:
        """Non-blocking enqueue - never blocks the caller."""
        try:
            self.queue.put_nowait((formatted, record))
        except queue.Full:
            self._handle_overflow(formatted, record)

    def _handle_overflow(self, formatted: str, record: LogRecord) -> None:
        """Policy-based overflow handling."""
        if self.overflow_policy == "drop_oldest":
            try:
                self.queue.get_nowait()  # Discard oldest
                self.queue.put_nowait((formatted, record))
            except queue.Empty:
                pass
        elif self.overflow_policy == "drop_newest":
            pass  # Simply don't enqueue
        elif self.overflow_policy == "block":
            self.queue.put((formatted, record))  # Blocking put

    def _process_loop(self) -> None:
        """Background thread consuming from queue."""
        batch = []
        while not self._shutdown.is_set():
            try:
                # Drain with timeout for graceful shutdown
                item = self.queue.get(timeout=0.1)
                batch.append(item)

                # Opportunistic batching
                while len(batch) < 100:
                    try:
                        batch.append(self.queue.get_nowait())
                    except queue.Empty:
                        break

                # Batch write
                for formatted, record in batch:
                    self.delegate.emit(formatted, record)
                batch.clear()

            except queue.Empty:
                continue

    def close(self) -> None:
        """Graceful shutdown with queue drain."""
        self._shutdown.set()
        self._worker.join(timeout=5.0)

        # Drain remaining messages
        while not self.queue.empty():
            try:
                formatted, record = self.queue.get_nowait()
                self.delegate.emit(formatted, record)
            except queue.Empty:
                break

        self.delegate.close()
```

<div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; margin-bottom: 8px;">Trade-off: Queue Sizing</div>
<div style="color: #78350f; font-size: 14px;">
A 10,000-entry queue with 1KB average log records consumes ~10MB memory. Too small and you drop logs under burst; too large and you risk OOM under sustained overload. Consider adaptive sizing: start small, grow under pressure, shrink during idle periods. Monitor queue depth as a metric.
</div>
</div>

#### Shutdown Semantics: The Durability Spectrum

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 16px; margin-bottom: 20px;">Durability vs. Latency Trade-offs</div>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; align-items: stretch; gap: 16px; flex-wrap: wrap;">
<div style="flex: 1; min-width: 200px; background: #dcfce7; padding: 16px; border-radius: 10px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: bold; font-size: 13px; margin-bottom: 8px;">Fire-and-Forget</div>
<div style="color: #15803d; font-size: 11px; line-height: 1.6;">
Daemon thread, no shutdown drain. Fastest, loses all queued logs on crash. Use for DEBUG in production.
</div>
</div>

<div style="flex: 1; min-width: 200px; background: #fef3c7; padding: 16px; border-radius: 10px; border: 2px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">Best-Effort Drain</div>
<div style="color: #a16207; font-size: 11px; line-height: 1.6;">
Timeout-bounded shutdown drain. Balances latency and durability. Standard for most apps.
</div>
</div>

<div style="flex: 1; min-width: 200px; background: #fee2e2; padding: 16px; border-radius: 10px; border: 2px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; font-size: 13px; margin-bottom: 8px;">Full Durability</div>
<div style="color: #b91c1c; font-size: 11px; line-height: 1.6;">
Block shutdown until queue empty + fsync. Slowest, guarantees no log loss. Use for audit logs.
</div>
</div>
</div>

</div>
</div>

#### Lock-Free Alternatives

For extreme throughput (millions of logs/second), consider lock-free ring buffers:

```python
class LockFreeAsyncHandler:
    """
    MPSC (Multi-Producer Single-Consumer) ring buffer.

    Uses atomic operations instead of locks. Suitable for
    latency-sensitive applications where queue contention
    would cause jitter.
    """

    def __init__(self, capacity: int = 65536):
        # Power of 2 for fast modulo via bitwise AND
        self.capacity = capacity
        self.mask = capacity - 1
        self.buffer = [None] * capacity
        self.head = AtomicInt(0)  # Write position
        self.tail = AtomicInt(0)  # Read position

    def try_publish(self, record: LogRecord) -> bool:
        """
        Lock-free publish using CAS loop.
        Returns False if buffer full.
        """
        while True:
            head = self.head.get()
            next_head = (head + 1) & self.mask

            if next_head == self.tail.get():
                return False  # Full

            if self.head.compare_and_swap(head, next_head):
                self.buffer[head] = record
                return True
```

See [[lock-free-data-structures]](/topics/concurrency/lock-free) for implementation details.

#### Interview Questions: Async Logging (3 Levels Deep)

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 12px;">Level 1: Fundamentals</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">

**Q1: What's the primary benefit of async logging over sync logging?**

Async logging transforms variable I/O latency into bounded enqueue latency. A 50ms network hiccup that would block the calling thread in sync mode becomes a ~100ns queue insertion in async mode. This prevents logging-induced latency spikes from affecting request processing.

**Q2: What happens to logs in the queue when the application crashes?**

They are lost. The queue exists only in process memory. For critical logs (audit, financial), consider: (1) synchronous flushing for high-severity levels, (2) memory-mapped queues that survive crashes, or (3) write-ahead logging to disk before enqueuing.

</div>
</div>

<div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; margin-bottom: 12px;">Level 2: Implementation Depth</div>
<div style="color: #78350f; font-size: 14px; line-height: 1.8;">

**Q2.1: How do you handle queue overflow in async logging? What are the trade-offs of different policies?**

Three common policies:
- **Drop oldest**: Preserves recent context, loses historical causation. Good for debugging.
- **Drop newest**: Preserves the beginning of an incident. Good for root cause analysis.
- **Block**: Converts async to sync under pressure. Prevents log loss but defeats the purpose.

The best approach is often **drop + count**: drop with a counter, then log "X messages dropped" when space becomes available. This preserves the most important logs while signaling data loss.

**Q2.2: How would you implement backpressure from a slow downstream sink without blocking producers?**

Use a **circuit breaker** pattern: when the queue exceeds 80% capacity, start sampling (log 1 in N messages). At 95%, switch to ERROR-only mode. At 100%, drop with counting. The circuit breaker state itself becomes a log event. This degrades gracefully while preserving signal for high-severity issues.

</div>
</div>

<div style="background: #fee2e2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; margin-bottom: 12px;">Level 3: System Design Implications</div>
<div style="color: #7f1d1d; font-size: 14px; line-height: 1.8;">

**Q2.1.1: How do LMAX Disruptor-style ring buffers improve on traditional blocking queues for logging?**

LMAX Disruptor uses a pre-allocated ring buffer with sequence numbers instead of object allocation. Key optimizations:
1. **Cache-line padding**: Prevents false sharing between producer/consumer pointers
2. **Batched publication**: Multiple messages published with single memory barrier
3. **Wait strategies**: Busy-spin for lowest latency, blocking for CPU efficiency

For logging, the Disruptor pattern eliminates GC pressure from queue node allocation and reduces cache coherency traffic through mechanical sympathy with CPU architecture.

**Q2.2.1: In a Kubernetes environment with multiple pods logging to a shared sink, how do you prevent one pod's log burst from affecting others?**

Implement **per-pod rate limiting** at the sink level using token buckets. Each pod gets a burst allowance (e.g., 1000 logs) and a sustained rate (e.g., 100 logs/sec). When exhausted, the sink returns backpressure signals that trigger the pod's local circuit breaker. Additionally, use separate queues per severity level to ensure ERROR logs are never blocked by DEBUG floods from other pods. Consider a **priority queue** where high-severity messages can preempt lower-severity ones.

**Q2.2.2: How would you implement exactly-once log delivery in a distributed async logging system?**

True exactly-once is impossible due to the Two Generals Problem. Instead, implement **effectively-once** through:
1. Assign monotonic sequence numbers at the source
2. Store the last-seen sequence per source at the sink
3. On duplicate detection, deduplicate silently
4. On gap detection, request retransmission from a persistent local buffer

The local buffer must be persistent (memory-mapped or WAL) to survive crashes. This converts the at-most-once async system to effectively-once at the cost of local I/O. See [[exactly-once-semantics]](/topics/distributed-systems/exactly-once) for more.

</div>
</div>

---

### 3. Structured Logging: From Text to Data

<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 18px; margin-bottom: 16px;">The Evolution from Printf to Structured Data</div>
<div style="color: #1e293b; font-size: 14px; line-height: 1.8;">

Traditional logging treats messages as opaque strings. Structured logging treats them as **queryable data**. The difference is transformative: instead of regex-parsing "User alice logged in from 192.168.1.1", you query `{"user": "alice", "ip": "192.168.1.1", "event": "login"}`. This enables log aggregation, metric extraction, and anomaly detection at scale.

</div>
</div>

#### The LogRecord as a First-Class Data Structure

```python
@dataclass
class StructuredLogRecord:
    """
    Immutable log record designed for machine processing.

    Key design choices:
    - Timestamp as epoch nanos (not string) for sorting/arithmetic
    - Separate 'message' (human) and 'data' (machine) fields
    - Explicit schema version for evolution
    """

    schema_version: int = 1
    timestamp_nanos: int = field(default_factory=lambda: time.time_ns())
    level: LogLevel = LogLevel.INFO
    logger_name: str = ""
    message: str = ""
    data: Dict[str, Any] = field(default_factory=dict)

    # Contextual fields (typically set once per request)
    trace_id: Optional[str] = None
    span_id: Optional[str] = None
    service_name: Optional[str] = None
    host: Optional[str] = None

    # Error handling
    exception_type: Optional[str] = None
    exception_message: Optional[str] = None
    stack_trace: Optional[str] = None

    def to_json(self) -> str:
        """Serialize to JSON with consistent field ordering."""
        return json.dumps(self._to_dict(), sort_keys=True, default=str)

    def _to_dict(self) -> dict:
        result = {
            "@version": self.schema_version,
            "@timestamp": datetime.fromtimestamp(
                self.timestamp_nanos / 1e9
            ).isoformat() + "Z",
            "level": self.level.name,
            "logger": self.logger_name,
            "message": self.message,
            **self.data
        }

        # Only include optional fields if set
        for field_name in ["trace_id", "span_id", "service_name", "host"]:
            value = getattr(self, field_name)
            if value is not None:
                result[field_name] = value

        if self.exception_type:
            result["error"] = {
                "type": self.exception_type,
                "message": self.exception_message,
                "stack_trace": self.stack_trace
            }

        return result
```

#### Context Propagation: The Thread-Local Pattern

Structured logging shines when combined with **automatic context injection**. Request-scoped data (trace IDs, user IDs) should flow through without explicit passing:

```python
import contextvars

# Context variables for automatic propagation
_trace_context: contextvars.ContextVar[dict] = contextvars.ContextVar(
    'trace_context',
    default={}
)

class ContextualLogger:
    """
    Logger that automatically enriches records with context.

    Uses contextvars for async-safe context propagation in
    Python 3.7+. Falls back to threading.local for sync code.
    """

    def __init__(self, name: str, base_logger: Logger):
        self.name = name
        self.base = base_logger

    @staticmethod
    @contextmanager
    def context(**kwargs):
        """Add fields to context for duration of block."""
        current = _trace_context.get().copy()
        current.update(kwargs)
        token = _trace_context.set(current)
        try:
            yield
        finally:
            _trace_context.reset(token)

    def info(self, message: str, **data):
        """Log with automatic context injection."""
        enriched_data = {
            **_trace_context.get(),  # Automatic context
            **data                    # Explicit data
        }
        self.base.info(message, extra=enriched_data)


# Usage
async def handle_request(request):
    with ContextualLogger.context(
        trace_id=request.trace_id,
        user_id=request.user_id,
        request_path=request.path
    ):
        logger.info("Request started")  # Automatically includes context
        result = await process(request)
        logger.info("Request completed", duration_ms=result.duration)
```

<div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: bold; margin-bottom: 8px;">Assumption: Context Immutability</div>
<div style="color: #14532d; font-size: 14px;">
We assume context data is immutable once set. Mutating context mid-request would create inconsistent logs. The `context()` context manager creates a new dict rather than modifying in place, ensuring child spans see the parent's context at the time of their creation.
</div>
</div>

#### JSON Formatting Edge Cases

```python
class RobustJsonFormatter(Formatter):
    """
    Production-grade JSON formatter handling edge cases.
    """

    def __init__(self,
                 max_field_size: int = 10000,
                 max_depth: int = 10,
                 redact_patterns: List[str] = None):
        self.max_field_size = max_field_size
        self.max_depth = max_depth
        self.redact_patterns = [
            re.compile(p) for p in (redact_patterns or [
                r'password', r'secret', r'token', r'api_key', r'auth'
            ])
        ]

    def format(self, record: LogRecord) -> str:
        data = self._sanitize(record.to_dict(), depth=0)

        try:
            return json.dumps(data, default=self._serialize_unknown)
        except (ValueError, TypeError) as e:
            # Fallback for truly unserializable data
            return json.dumps({
                "level": record.level.name,
                "message": record.message,
                "_serialization_error": str(e)
            })

    def _sanitize(self, obj: Any, depth: int) -> Any:
        """Recursively sanitize object for JSON serialization."""
        if depth > self.max_depth:
            return "[MAX_DEPTH_EXCEEDED]"

        if isinstance(obj, dict):
            return {
                self._redact_key(k): self._sanitize(v, depth + 1)
                for k, v in obj.items()
            }
        elif isinstance(obj, (list, tuple)):
            return [self._sanitize(item, depth + 1) for item in obj]
        elif isinstance(obj, str):
            if len(obj) > self.max_field_size:
                return obj[:self.max_field_size] + f"[TRUNCATED:{len(obj)}]"
            return obj
        elif isinstance(obj, bytes):
            return f"[BYTES:{len(obj)}]"
        else:
            return obj

    def _redact_key(self, key: str) -> str:
        """Redact sensitive field values."""
        for pattern in self.redact_patterns:
            if pattern.search(key.lower()):
                return key  # Keep key, value will be redacted
        return key

    def _serialize_unknown(self, obj: Any) -> str:
        """Handle non-serializable types."""
        if hasattr(obj, '__dict__'):
            return f"[{type(obj).__name__}]"
        return str(obj)
```

#### Interview Questions: Structured Logging (3 Levels Deep)

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 12px;">Level 1: Fundamentals</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">

**Q1: What's the difference between structured and unstructured logging?**

Unstructured: `"User alice logged in from 192.168.1.1 at 2024-01-15 10:30:00"`
Structured: `{"event": "login", "user": "alice", "ip": "192.168.1.1", "ts": 1705315800}`

Structured logs are machine-parseable without regex, enabling queries like "all logins from this IP range in the last hour." The key insight is separating the **message template** from the **data**.

**Q2: How does structured logging improve observability?**

1. **Searchability**: Query by any field without regex
2. **Aggregation**: Count events by field values (error rates by endpoint)
3. **Correlation**: Join logs by trace_id across services
4. **Alerting**: Threshold on numeric fields (latency > 500ms)
5. **Dashboards**: Real-time metrics derived from log data

</div>
</div>

<div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; margin-bottom: 12px;">Level 2: Implementation Depth</div>
<div style="color: #78350f; font-size: 14px; line-height: 1.8;">

**Q2.1: How do you handle sensitive data in structured logs?**

Implement **defense in depth**:
1. **Field-level redaction**: Pattern-match on field names (password, token, ssn)
2. **Value-level masking**: Detect patterns in values (credit card regex)
3. **Type-based handling**: Special serialization for known sensitive types
4. **Schema enforcement**: Allowlist of loggable fields per context

The redaction should happen **at serialization time**, not at ingestion, to prevent sensitive data from ever leaving the process in plaintext.

**Q2.2: How do you handle schema evolution in structured logs?**

Include a schema version field (`@version`). Consumers check this version and apply appropriate parsing logic. For breaking changes:
1. Increment major version
2. Run old and new versions in parallel during migration
3. Use schema registry (like Kafka Schema Registry) for formal contracts
4. Prefer additive changes (new fields) over modifications or deletions

</div>
</div>

<div style="background: #fee2e2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; margin-bottom: 12px;">Level 3: System Design Implications</div>
<div style="color: #7f1d1d; font-size: 14px; line-height: 1.8;">

**Q2.1.1: How would you implement PII detection in structured logs at scale without impacting logging latency?**

Two-phase approach:
1. **Inline fast-path**: Bloom filter of known sensitive field names. O(1) check, minimal latency impact. Fields matching bloom filter get masked immediately.
2. **Async deep scan**: Queue logs for background ML-based PII detection. If PII found post-hoc, generate alert, update bloom filter, and optionally trigger deletion in log storage.

The bloom filter should be trained on historical data and updated periodically. False positives (masking non-PII) are acceptable; false negatives (missing PII) are not.

**Q2.2.1: How do you handle high-cardinality fields that could explode your log aggregation costs?**

High-cardinality fields (user IDs, request IDs) can cause **cardinality explosion** in log indexing systems. Strategies:
1. **Separate storage tiers**: Index low-cardinality fields, store high-cardinality as unindexed payload
2. **Sampling with sticky sessions**: Sample 1% of users but include all logs for sampled users
3. **Hash bucketing**: Hash high-cardinality values into buckets for coarse-grained queries
4. **Dedicated trace storage**: Route trace_id-heavy logs to tracing backends (Jaeger) rather than log backends (Elasticsearch)

See [[log-aggregation-architecture]](/topics/observability/log-aggregation) for system design patterns.

**Q2.2.2: Design a system for correlating logs across microservices with different structured logging schemas.**

Implement a **correlation envelope** that wraps service-specific payloads:

```json
{
  "correlation": {
    "trace_id": "abc123",
    "span_id": "def456",
    "parent_span_id": "ghi789",
    "timestamp": 1705315800000000000,
    "service": "order-service",
    "version": "1.2.3"
  },
  "payload": {
    // Service-specific structured log
  }
}
```

The correlation envelope follows a strict schema; payloads are schema-free. Query correlation fields across services, drill down into payload per service. Use [[distributed-tracing]](/topics/observability/distributed-tracing) context propagation (W3C Trace Context) for trace_id/span_id.

</div>
</div>

---

### 4. Log Rotation: Managing Unbounded Growth

<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 18px; margin-bottom: 16px;">The Disk Space Paradox</div>
<div style="color: #1e293b; font-size: 14px; line-height: 1.8;">

Logs grow without bound. A high-traffic service can generate gigabytes per hour. Without rotation, logs will eventually fill the disk, causing the application (and often the entire system) to fail. Log rotation transforms an unbounded resource consumption problem into a bounded one.

</div>
</div>

#### Rotation Strategies

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 16px; margin-bottom: 20px;">Rotation Trigger Comparison</div>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; gap: 16px; flex-wrap: wrap;">

<div style="flex: 1; min-width: 250px; background: #dbeafe; padding: 20px; border-radius: 12px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; font-size: 14px; margin-bottom: 12px;">Size-Based</div>
<div style="color: #1e3a8a; font-size: 12px; line-height: 1.6;">
<strong>Trigger:</strong> File exceeds max_bytes<br/>
<strong>Pros:</strong> Predictable disk usage<br/>
<strong>Cons:</strong> Unpredictable file counts<br/>
<strong>Use when:</strong> Disk space is primary constraint
</div>
</div>

<div style="flex: 1; min-width: 250px; background: #dcfce7; padding: 20px; border-radius: 12px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: bold; font-size: 14px; margin-bottom: 12px;">Time-Based</div>
<div style="color: #14532d; font-size: 12px; line-height: 1.6;">
<strong>Trigger:</strong> Midnight, hourly, etc.<br/>
<strong>Pros:</strong> Aligned with human time, easy shipping<br/>
<strong>Cons:</strong> Variable file sizes<br/>
<strong>Use when:</strong> Log shipping/archival matters
</div>
</div>

<div style="flex: 1; min-width: 250px; background: #fef3c7; padding: 20px; border-radius: 12px; border: 2px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; font-size: 14px; margin-bottom: 12px;">Hybrid</div>
<div style="color: #78350f; font-size: 12px; line-height: 1.6;">
<strong>Trigger:</strong> Size OR time, whichever first<br/>
<strong>Pros:</strong> Best of both worlds<br/>
<strong>Cons:</strong> More complex implementation<br/>
<strong>Use when:</strong> Both constraints matter
</div>
</div>

</div>
</div>
</div>

#### Implementation: Robust Rotating File Handler

```python
import os
import gzip
import shutil
from datetime import datetime, timedelta

class RotatingFileHandler(Handler):
    """
    Production-grade rotating file handler.

    Features:
    - Size and time-based rotation
    - Optional compression of rotated files
    - Atomic rotation (no log loss during rotation)
    - Automatic cleanup of old files
    """

    def __init__(self,
                 filename: str,
                 max_bytes: int = 100 * 1024 * 1024,  # 100MB
                 backup_count: int = 10,
                 rotate_at_midnight: bool = False,
                 compress: bool = True,
                 level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.base_filename = filename
        self.max_bytes = max_bytes
        self.backup_count = backup_count
        self.rotate_at_midnight = rotate_at_midnight
        self.compress = compress

        self._current_file: Optional[IO] = None
        self._current_size: int = 0
        self._rotation_time: Optional[datetime] = None
        self._open_file()

    def _open_file(self) -> None:
        """Open the current log file, creating directories as needed."""
        os.makedirs(os.path.dirname(self.base_filename) or ".", exist_ok=True)

        # Get current file size if exists
        if os.path.exists(self.base_filename):
            self._current_size = os.path.getsize(self.base_filename)
        else:
            self._current_size = 0

        self._current_file = open(self.base_filename, "a", encoding="utf-8")

        if self.rotate_at_midnight:
            self._rotation_time = self._next_midnight()

    def _next_midnight(self) -> datetime:
        """Calculate next midnight for time-based rotation."""
        now = datetime.now()
        return (now + timedelta(days=1)).replace(
            hour=0, minute=0, second=0, microsecond=0
        )

    def _should_rotate(self) -> bool:
        """Check if rotation is needed."""
        if self._current_size >= self.max_bytes:
            return True
        if self.rotate_at_midnight and datetime.now() >= self._rotation_time:
            return True
        return False

    def _rotate(self) -> None:
        """
        Perform atomic rotation.

        The rotation is atomic from the perspective of log writers:
        we close, rename, and reopen in a single locked operation.
        """
        if self._current_file:
            self._current_file.close()

        # Shift existing backups: .9 -> .10, .8 -> .9, ...
        for i in range(self.backup_count - 1, 0, -1):
            src = self._get_backup_name(i)
            dst = self._get_backup_name(i + 1)
            if os.path.exists(src):
                shutil.move(src, dst)

        # Move current to .1
        if os.path.exists(self.base_filename):
            backup_name = self._get_backup_name(1)
            shutil.move(self.base_filename, backup_name)

            # Async compression of rotated file
            if self.compress:
                self._compress_async(backup_name)

        # Delete oldest if exceeds backup_count
        self._cleanup_old_backups()

        # Reopen fresh file
        self._open_file()

    def _get_backup_name(self, index: int) -> str:
        """Generate backup filename with index."""
        suffix = ".gz" if self.compress and index > 1 else ""
        return f"{self.base_filename}.{index}{suffix}"

    def _compress_async(self, filename: str) -> None:
        """Compress rotated file in background thread."""
        def do_compress():
            gz_name = filename + ".gz"
            with open(filename, 'rb') as f_in:
                with gzip.open(gz_name, 'wb') as f_out:
                    shutil.copyfileobj(f_in, f_out)
            os.remove(filename)

        threading.Thread(target=do_compress, daemon=True).start()

    def _cleanup_old_backups(self) -> None:
        """Remove backups exceeding backup_count."""
        for i in range(self.backup_count + 1, self.backup_count + 100):
            for suffix in ["", ".gz"]:
                path = f"{self.base_filename}.{i}{suffix}"
                if os.path.exists(path):
                    os.remove(path)
                else:
                    break

    def emit(self, formatted: str, record: LogRecord) -> None:
        """Write log and check rotation."""
        if self._current_file:
            line = formatted + "\n"
            self._current_file.write(line)
            self._current_file.flush()
            self._current_size += len(line.encode("utf-8"))

            if self._should_rotate():
                self._rotate()

    def close(self) -> None:
        """Clean shutdown."""
        if self._current_file:
            self._current_file.flush()
            os.fsync(self._current_file.fileno())
            self._current_file.close()
            self._current_file = None
```

<div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; margin-bottom: 8px;">Trade-off: In-Process vs. External Rotation</div>
<div style="color: #78350f; font-size: 14px;">
In-process rotation (shown above) is simple but couples the application to rotation logic. External rotation (logrotate) is more flexible but requires coordination: the app must respond to SIGHUP to reopen files, and there's a race window during rotation. Docker/Kubernetes environments often prefer external log drivers that handle rotation transparently.
</div>
</div>

#### The Rename-and-Reopen Problem

```python
class SignalAwareFileHandler(FileHandler):
    """
    File handler that responds to external log rotation.

    When logrotate renames the current file, we need to:
    1. Detect the rename (inode changed)
    2. Close the old file descriptor
    3. Open a new file at the same path

    This is triggered either by SIGHUP or by inode monitoring.
    """

    def __init__(self, filename: str, **kwargs):
        super().__init__(filename, **kwargs)
        self._original_inode = self._get_inode()
        signal.signal(signal.SIGHUP, self._handle_sighup)

    def _get_inode(self) -> int:
        """Get current file's inode number."""
        try:
            return os.stat(self.base_filename).st_ino
        except FileNotFoundError:
            return -1

    def _handle_sighup(self, signum, frame):
        """Reopen file on SIGHUP signal."""
        with self.lock:
            self._reopen()

    def _reopen(self) -> None:
        """Close and reopen the log file."""
        if self._current_file:
            self._current_file.close()
        self._open_file()
        self._original_inode = self._get_inode()

    def emit(self, formatted: str, record: LogRecord) -> None:
        """Check for rotation before each write."""
        # Detect external rotation by inode change
        current_inode = self._get_inode()
        if current_inode != self._original_inode:
            self._reopen()

        super().emit(formatted, record)
```

#### Interview Questions: Log Rotation (3 Levels Deep)

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 12px;">Level 1: Fundamentals</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">

**Q1: Why is log rotation necessary?**

Without rotation, log files grow indefinitely until disk is full. A full disk causes: (1) application crashes when writes fail, (2) system instability when /var fills up, (3) inability to log the actual failure. Rotation bounds disk usage to a predictable maximum: `max_size * backup_count`.

**Q2: What's the difference between size-based and time-based rotation?**

Size-based rotates when file exceeds a threshold (e.g., 100MB). Time-based rotates at fixed intervals (e.g., midnight). Size-based provides predictable disk usage but variable file counts. Time-based provides predictable file counts aligned with human time but variable sizes. Production systems often use both: "rotate at 100MB OR midnight, whichever comes first."

</div>
</div>

<div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; margin-bottom: 12px;">Level 2: Implementation Depth</div>
<div style="color: #78350f; font-size: 14px; line-height: 1.8;">

**Q2.1: How do you handle the race condition when rotating while the application is writing?**

Two approaches:
1. **Lock during rotation**: Hold a mutex during the close-rename-open sequence. Writers block briefly but no logs are lost.
2. **Copy-truncate**: Copy current file to backup, then truncate original. No rename means no writer disruption, but brief window of duplicate logs.

The lock approach is preferred when log latency spikes are acceptable. Copy-truncate is preferred when writer blocking is unacceptable (real-time systems).

**Q2.2: How does logrotate work with long-running applications?**

Logrotate uses the **copytruncate** or **create** directive:
- `copytruncate`: Copy file, then truncate original. Application continues writing to same fd.
- `create`: Rename file, create new empty file. Application must reopen on SIGHUP.

The SIGHUP approach is more reliable (no duplicate logs) but requires application cooperation. `copytruncate` is transparent but can lose logs written between copy and truncate.

</div>
</div>

<div style="background: #fee2e2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; margin-bottom: 12px;">Level 3: System Design Implications</div>
<div style="color: #7f1d1d; font-size: 14px; line-height: 1.8;">

**Q2.1.1: How do you implement zero-loss log rotation under high write rates?**

Implement a **double-buffer strategy**:
1. Maintain two file handles: `current` and `standby`
2. Before rotation, open `standby` pointing to new file
3. Atomically swap `current` and `standby` references
4. Close old file in background

Writers always have a valid file handle. The swap is a single pointer update (atomic on most architectures). This eliminates the close-reopen window entirely.

```python
def atomic_rotate(self):
    standby = open(self._new_filename(), "a")
    # Atomic swap
    old, self._current = self._current, standby
    # Background close
    threading.Thread(target=old.close).start()
```

**Q2.2.1: In a containerized environment, how do you handle log rotation when the container's filesystem is ephemeral?**

Container logs should never rely on in-container rotation:
1. **Log to stdout**: Let Docker/Kubernetes handle rotation via `json-file` or `local` drivers
2. **Configure container runtime**: `--log-opt max-size=100m --log-opt max-file=5`
3. **Use sidecar pattern**: Fluent Bit sidecar tails logs and ships to external storage
4. **Leverage CSI volumes**: Persistent volume with rotation handled by storage layer

The key insight is separating log **production** (container) from log **management** (orchestrator). See [[container-logging-patterns]](/topics/devops/container-logging).

**Q2.2.2: How would you implement log rotation in a distributed application where multiple instances write to network storage?**

Distributed rotation requires coordination:
1. **Leader election**: One instance owns rotation responsibility (via [[distributed-locking]](/topics/system-design/distributed-locking))
2. **Instance-prefixed files**: Each instance writes to `app.{instance_id}.log`, no coordination needed
3. **Time-partitioned directories**: All instances write to `/logs/2024/01/15/12/` (hourly dirs), old dirs are archived

Option 2 is simplest but creates many files. Option 3 is cleanest for log aggregation but requires clock synchronization. Option 1 is complex and introduces a SPOF. Most systems choose instance-prefixed files with external aggregation.

</div>
</div>

---

### 5. Sink Abstraction: The Handler Pattern

<div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<div style="color: #334155; font-weight: bold; font-size: 18px; margin-bottom: 16px;">Decoupling Log Production from Log Destination</div>
<div style="color: #475569; font-size: 14px; line-height: 1.8;">

A **sink** (or handler) is an abstraction over log destinations. By defining a common interface, the logging library can output to console, files, network, databases, or any custom destination without the logger knowing the details. This is the [[Strategy Pattern]](/topics/design-patterns/strategy) applied to log output.

</div>
</div>

#### The Handler Interface

```python
from abc import ABC, abstractmethod

class Handler(ABC):
    """
    Abstract base class for log output handlers.

    The Handler interface provides:
    - Level filtering (skip records below threshold)
    - Formatting (convert LogRecord to string)
    - Thread-safe emission (lock around I/O)
    - Resource management (close/flush)

    Subclasses implement emit() for destination-specific I/O.
    """

    def __init__(self, level: LogLevel = LogLevel.DEBUG):
        self.level = level
        self.formatter: Formatter = TextFormatter()
        self.filters: List[Filter] = []
        self._lock = threading.RLock()  # Reentrant for nested logging

    def set_level(self, level: LogLevel) -> 'Handler':
        """Set minimum level for this handler."""
        self.level = level
        return self

    def set_formatter(self, formatter: Formatter) -> 'Handler':
        """Set the formatter for this handler."""
        self.formatter = formatter
        return self

    def add_filter(self, filter_obj: Filter) -> 'Handler':
        """Add a filter to this handler."""
        self.filters.append(filter_obj)
        return self

    def should_handle(self, record: LogRecord) -> bool:
        """Check if this handler should process the record."""
        if record.level < self.level:
            return False
        return all(f.filter(record) for f in self.filters)

    def handle(self, record: LogRecord) -> None:
        """
        Process a log record.

        Template method pattern: common logic here,
        destination-specific logic in emit().
        """
        if not self.should_handle(record):
            return

        try:
            formatted = self.formatter.format(record)
            with self._lock:
                self.emit(formatted, record)
        except Exception as e:
            self.handle_error(record, e)

    @abstractmethod
    def emit(self, formatted: str, record: LogRecord) -> None:
        """
        Output the formatted log message.

        Subclasses must implement this for destination-specific I/O.
        This method is called with the handler's lock held.
        """
        pass

    def handle_error(self, record: LogRecord, exception: Exception) -> None:
        """Handle errors during emission (prevent logging loops)."""
        # Write to stderr to avoid recursive logging
        sys.stderr.write(f"Logging error: {exception}\n")

    def flush(self) -> None:
        """Flush any buffered output."""
        pass

    def close(self) -> None:
        """Release resources held by this handler."""
        pass
```

#### Handler Implementations

```python
class ConsoleHandler(Handler):
    """
    Output logs to stdout/stderr.

    Design choice: ERROR and above go to stderr by default,
    matching Unix convention for error output.
    """

    def __init__(self,
                 stream: Optional[IO] = None,
                 error_stream: Optional[IO] = None,
                 level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.stream = stream or sys.stdout
        self.error_stream = error_stream or sys.stderr

    def emit(self, formatted: str, record: LogRecord) -> None:
        stream = self.error_stream if record.level >= LogLevel.ERROR else self.stream
        stream.write(formatted + "\n")
        stream.flush()


class HttpHandler(Handler):
    """
    Send logs to HTTP endpoint (log aggregator, webhook, etc.).

    Features:
    - Batching to reduce HTTP overhead
    - Retry with exponential backoff
    - Circuit breaker to prevent cascade failures
    """

    def __init__(self,
                 url: str,
                 batch_size: int = 100,
                 flush_interval: float = 5.0,
                 timeout: float = 10.0,
                 level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.url = url
        self.batch_size = batch_size
        self.flush_interval = flush_interval
        self.timeout = timeout

        self._batch: List[str] = []
        self._last_flush = time.time()
        self._circuit_open = False
        self._failure_count = 0

    def emit(self, formatted: str, record: LogRecord) -> None:
        self._batch.append(formatted)

        should_flush = (
            len(self._batch) >= self.batch_size or
            time.time() - self._last_flush >= self.flush_interval
        )

        if should_flush:
            self._flush_batch()

    def _flush_batch(self) -> None:
        if not self._batch or self._circuit_open:
            return

        batch, self._batch = self._batch, []
        self._last_flush = time.time()

        try:
            response = requests.post(
                self.url,
                json={"logs": batch},
                timeout=self.timeout
            )
            response.raise_for_status()
            self._failure_count = 0
        except Exception as e:
            self._failure_count += 1
            if self._failure_count >= 5:
                self._open_circuit()
            # Re-queue failed batch (with limit to prevent memory growth)
            self._batch = batch[:1000] + self._batch

    def _open_circuit(self) -> None:
        """Open circuit breaker - stop sending for a while."""
        self._circuit_open = True
        # Schedule circuit close
        threading.Timer(60.0, self._close_circuit).start()

    def _close_circuit(self) -> None:
        """Close circuit breaker - resume sending."""
        self._circuit_open = False
        self._failure_count = 0

    def flush(self) -> None:
        self._flush_batch()

    def close(self) -> None:
        self.flush()


class MemoryHandler(Handler):
    """
    Buffer logs in memory, flush to delegate on trigger.

    Use cases:
    - Capture logs during test execution
    - Buffer debug logs, flush only on error
    - Rate-limit downstream handler
    """

    def __init__(self,
                 capacity: int = 1000,
                 delegate: Optional[Handler] = None,
                 flush_level: LogLevel = LogLevel.ERROR,
                 level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.capacity = capacity
        self.delegate = delegate
        self.flush_level = flush_level
        self._buffer: List[Tuple[str, LogRecord]] = []

    def emit(self, formatted: str, record: LogRecord) -> None:
        self._buffer.append((formatted, record))

        # Trim oldest if over capacity
        if len(self._buffer) > self.capacity:
            self._buffer = self._buffer[-self.capacity:]

        # Flush on high-severity record
        if record.level >= self.flush_level:
            self.flush()

    def flush(self) -> None:
        if self.delegate and self._buffer:
            for formatted, record in self._buffer:
                self.delegate.emit(formatted, record)
            self._buffer.clear()
            self.delegate.flush()

    def get_buffer(self) -> List[Tuple[str, LogRecord]]:
        """Retrieve buffered logs (for testing)."""
        return list(self._buffer)
```

#### Fan-Out Handler: Multiple Destinations

```python
class FanOutHandler(Handler):
    """
    Dispatch logs to multiple handlers.

    This enables scenarios like:
    - Console + File simultaneously
    - Debug to file, Error+ to PagerDuty
    - All logs to aggregator, sampled to metrics
    """

    def __init__(self, handlers: List[Handler], level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.handlers = handlers

    def emit(self, formatted: str, record: LogRecord) -> None:
        # Note: Each handler may re-format, so pass record
        # and let each handler format according to its own formatter
        pass

    def handle(self, record: LogRecord) -> None:
        """Override to dispatch to all handlers."""
        if not self.should_handle(record):
            return

        for handler in self.handlers:
            try:
                handler.handle(record)
            except Exception as e:
                self.handle_error(record, e)

    def flush(self) -> None:
        for handler in self.handlers:
            handler.flush()

    def close(self) -> None:
        for handler in self.handlers:
            handler.close()
```

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 16px; margin-bottom: 20px;">Handler Architecture</div>

<div style="display: flex; flex-direction: column; gap: 20px;">

<div style="display: flex; justify-content: center; align-items: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #dbeafe; padding: 16px 24px; border-radius: 12px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; font-size: 13px;">Logger</div>
<div style="color: #3b82f6; font-size: 11px;">log.info(...)</div>
</div>
<div style="color: #64748b; font-size: 24px;">&#8594;</div>
<div style="background: #f3e8ff; padding: 16px 24px; border-radius: 12px; border: 2px solid #a855f7;">
<div style="color: #7c3aed; font-weight: bold; font-size: 13px;">FanOut</div>
<div style="color: #a855f7; font-size: 11px;">dispatch</div>
</div>
</div>

<div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="color: #64748b; font-size: 20px;">&#8595;</div>
<div style="background: #dcfce7; padding: 14px 20px; border-radius: 10px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: bold; font-size: 12px;">Console</div>
<div style="color: #22c55e; font-size: 10px;">ColorFormatter</div>
</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="color: #64748b; font-size: 20px;">&#8595;</div>
<div style="background: #fef3c7; padding: 14px 20px; border-radius: 10px; border: 2px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; font-size: 12px;">Rotating File</div>
<div style="color: #f59e0b; font-size: 10px;">JsonFormatter</div>
</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="color: #64748b; font-size: 20px;">&#8595;</div>
<div style="background: #fee2e2; padding: 14px 20px; border-radius: 10px; border: 2px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; font-size: 12px;">HTTP (Datadog)</div>
<div style="color: #ef4444; font-size: 10px;">BatchFormatter</div>
</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="color: #64748b; font-size: 20px;">&#8595;</div>
<div style="background: #dbeafe; padding: 14px 20px; border-radius: 10px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; font-size: 12px;">Memory</div>
<div style="color: #3b82f6; font-size: 10px;">Test capture</div>
</div>
</div>
</div>

</div>
</div>

#### Interview Questions: Sink Abstraction (3 Levels Deep)

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 12px;">Level 1: Fundamentals</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">

**Q1: What is the purpose of the Handler abstraction?**

Handlers decouple **what** is logged from **where** it goes. The Logger focuses on record creation and level filtering; Handlers focus on destination-specific I/O. This separation enables: (1) multiple simultaneous outputs, (2) per-destination formatting, (3) destination changes without logger code changes.

**Q2: Why does each handler have its own level and formatter?**

Handler-level settings enable **output routing**: ERROR+ to PagerDuty, DEBUG+ to file, INFO+ to console. Handler-level formatters enable **format specialization**: colored text for console, JSON for aggregators, compact for metrics. Without per-handler settings, you'd need separate logger instances.

</div>
</div>

<div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; margin-bottom: 12px;">Level 2: Implementation Depth</div>
<div style="color: #78350f; font-size: 14px; line-height: 1.8;">

**Q2.1: How do you handle failures in a handler without affecting other handlers or the application?**

Wrap each handler's emit in try/except. On failure: (1) log to stderr (not through the logging system - avoid loops), (2) track failure count, (3) implement circuit breaker for repeated failures. Never let handler failures propagate to the application - logging is best-effort, not critical path.

**Q2.2: How would you implement a handler that buffers logs and only flushes them if an error occurs?**

The MemoryHandler pattern: buffer all logs in a ring buffer, flush to delegate only when a record exceeds `flush_level`. This provides context for errors (preceding debug logs) without the overhead of always writing debug logs. Set capacity to limit memory usage; oldest logs are dropped when buffer is full.

</div>
</div>

<div style="background: #fee2e2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; margin-bottom: 12px;">Level 3: System Design Implications</div>
<div style="color: #7f1d1d; font-size: 14px; line-height: 1.8;">

**Q2.1.1: How do you design a handler that needs to maintain exactly-once delivery semantics to an external system?**

Exactly-once requires:
1. **Idempotency keys**: Assign unique ID to each log record at creation
2. **Persistent send buffer**: Write-ahead log before attempting send
3. **Acknowledgment tracking**: Mark records complete only after sink confirms
4. **Deduplication at sink**: Sink must reject duplicate IDs

This is expensive - typically reserved for audit logs. Regular logs use at-most-once (fire-and-forget) or at-least-once (retry on failure, sink deduplicates).

**Q2.2.1: Design a handler architecture for a system that needs to route logs to different sinks based on content (e.g., security events to SIEM, errors to PagerDuty, all to archive).**

Implement a **routing handler**:

```python
class RoutingHandler(Handler):
    def __init__(self, routes: List[Tuple[Callable[[LogRecord], bool], Handler]]):
        self.routes = routes
        self.default_handler = None

    def handle(self, record):
        matched = False
        for predicate, handler in self.routes:
            if predicate(record):
                handler.handle(record)
                matched = True
        if not matched and self.default_handler:
            self.default_handler.handle(record)
```

Routes are evaluated in order; multiple routes can match (fan-out). Predicates can check level, logger name, extra fields, or message content. This pattern enables content-based routing without modifying logging call sites.

**Q2.2.2: How would you implement handler hot-reloading without restarting the application?**

1. **Handler registry**: Store handlers in a dict, reference by name
2. **Configuration watcher**: Monitor config file for changes (inotify, polling)
3. **Atomic swap**: Build new handler set, then atomically swap into registry
4. **Graceful shutdown**: Close old handlers after pending logs drain

```python
def reload_handlers(self, new_config):
    new_handlers = self._build_handlers(new_config)
    old_handlers, self._handlers = self._handlers, new_handlers
    # Drain and close old handlers in background
    threading.Thread(
        target=lambda: [h.close() for h in old_handlers]
    ).start()
```

Include configuration versioning to handle rapid config changes. See [[configuration-management]](/topics/system-design/configuration) for patterns.

</div>
</div>

---

## Complete Implementation

```python
"""
Production-grade Logger Library Implementation.

Features:
- Hierarchical loggers with name-based inheritance
- Multiple handlers with per-handler levels and formatters
- Async logging with bounded queue and backpressure
- Structured logging with context propagation
- Size and time-based log rotation
- Thread-safe operations throughout

Usage:
    logger = LogManager.get_logger("myapp.module")
    logger.info("User logged in", user_id="alice", ip="192.168.1.1")
"""

import sys
import os
import json
import gzip
import shutil
import time
import queue
import signal
import threading
import contextvars
from abc import ABC, abstractmethod
from datetime import datetime, timedelta
from enum import IntEnum
from typing import Optional, Dict, Any, List, Callable, IO, Tuple
from dataclasses import dataclass, field
from contextlib import contextmanager


# ==================== Log Levels ====================

class LogLevel(IntEnum):
    """
    Log severity levels with gaps for custom levels.

    The 10-unit gaps allow inserting custom levels:
    TRACE = 5, NOTICE = 25, SECURITY = 35, etc.
    """
    DEBUG = 10
    INFO = 20
    WARNING = 30
    ERROR = 40
    CRITICAL = 50

    @classmethod
    def from_string(cls, name: str) -> 'LogLevel':
        """Parse level from string, case-insensitive."""
        return cls[name.upper()]


# ==================== Log Record ====================

@dataclass
class LogRecord:
    """
    Immutable record representing a single log event.

    Design choices:
    - Timestamp as float (epoch seconds) for arithmetic
    - Separate message (human) and extra (machine) fields
    - Optional exception info captured at creation time
    """
    level: LogLevel
    message: str
    logger_name: str
    timestamp: float = field(default_factory=time.time)
    extra: Dict[str, Any] = field(default_factory=dict)
    exc_info: Optional[Tuple] = None

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for JSON serialization."""
        result = {
            "level": self.level.name,
            "message": self.message,
            "logger": self.logger_name,
            "timestamp": datetime.fromtimestamp(self.timestamp).isoformat() + "Z",
            **self.extra
        }
        if self.exc_info:
            import traceback
            result["exception"] = {
                "type": self.exc_info[0].__name__ if self.exc_info[0] else None,
                "message": str(self.exc_info[1]) if self.exc_info[1] else None,
                "traceback": ''.join(traceback.format_exception(*self.exc_info))
            }
        return result


# ==================== Context Propagation ====================

_log_context: contextvars.ContextVar[Dict[str, Any]] = contextvars.ContextVar(
    'log_context',
    default={}
)


@contextmanager
def logging_context(**kwargs):
    """
    Add fields to logging context for the duration of the block.

    Usage:
        with logging_context(request_id="abc123", user_id="alice"):
            logger.info("Processing request")  # Includes request_id and user_id
    """
    current = _log_context.get().copy()
    current.update(kwargs)
    token = _log_context.set(current)
    try:
        yield
    finally:
        _log_context.reset(token)


def get_logging_context() -> Dict[str, Any]:
    """Get current logging context."""
    return _log_context.get().copy()


# ==================== Filters ====================

class Filter(ABC):
    """Base class for log filters."""

    @abstractmethod
    def filter(self, record: LogRecord) -> bool:
        """Return True if record should be logged."""
        pass


class LevelFilter(Filter):
    """Filter by minimum log level."""

    def __init__(self, min_level: LogLevel):
        self.min_level = min_level

    def filter(self, record: LogRecord) -> bool:
        return record.level >= self.min_level


class NameFilter(Filter):
    """Filter by logger name prefix."""

    def __init__(self, name_prefix: str):
        self.prefix = name_prefix

    def filter(self, record: LogRecord) -> bool:
        return record.logger_name.startswith(self.prefix)


class CallableFilter(Filter):
    """Filter using a custom predicate function."""

    def __init__(self, predicate: Callable[[LogRecord], bool]):
        self.predicate = predicate

    def filter(self, record: LogRecord) -> bool:
        return self.predicate(record)


class SamplingFilter(Filter):
    """Sample logs at a configurable rate per level."""

    def __init__(self, rates: Dict[LogLevel, float] = None):
        import random
        self.rates = rates or {}
        self.rng = random.Random()

    def filter(self, record: LogRecord) -> bool:
        rate = self.rates.get(record.level, 1.0)
        return self.rng.random() < rate


# ==================== Formatters ====================

class Formatter(ABC):
    """Base class for log formatters."""

    @abstractmethod
    def format(self, record: LogRecord) -> str:
        """Convert LogRecord to string representation."""
        pass


class TextFormatter(Formatter):
    """Plain text formatter with customizable template."""

    DEFAULT_FORMAT = "[{timestamp}] {level:8} {logger} - {message}"

    def __init__(self, fmt: str = None, datefmt: str = "%Y-%m-%d %H:%M:%S"):
        self.fmt = fmt or self.DEFAULT_FORMAT
        self.datefmt = datefmt

    def format(self, record: LogRecord) -> str:
        timestamp = datetime.fromtimestamp(record.timestamp).strftime(self.datefmt)
        result = self.fmt.format(
            timestamp=timestamp,
            level=record.level.name,
            logger=record.logger_name,
            message=record.message,
            **record.extra
        )
        if record.exc_info and record.exc_info[0]:
            import traceback
            result += "\n" + ''.join(traceback.format_exception(*record.exc_info))
        return result


class JsonFormatter(Formatter):
    """
    JSON formatter for structured logging.

    Features:
    - Configurable field redaction
    - Maximum field size limits
    - Safe serialization of unknown types
    """

    def __init__(self,
                 indent: int = None,
                 max_field_size: int = 10000,
                 redact_fields: List[str] = None):
        self.indent = indent
        self.max_field_size = max_field_size
        self.redact_patterns = [
            f.lower() for f in (redact_fields or ['password', 'secret', 'token', 'key'])
        ]

    def format(self, record: LogRecord) -> str:
        data = self._sanitize(record.to_dict())
        try:
            return json.dumps(data, indent=self.indent, default=str)
        except (ValueError, TypeError) as e:
            return json.dumps({
                "level": record.level.name,
                "message": record.message,
                "_error": f"Serialization failed: {e}"
            })

    def _sanitize(self, obj: Any, depth: int = 0) -> Any:
        """Recursively sanitize for JSON serialization."""
        if depth > 10:
            return "[MAX_DEPTH]"

        if isinstance(obj, dict):
            return {
                k: self._redact(k, self._sanitize(v, depth + 1))
                for k, v in obj.items()
            }
        elif isinstance(obj, (list, tuple)):
            return [self._sanitize(item, depth + 1) for item in obj]
        elif isinstance(obj, str) and len(obj) > self.max_field_size:
            return obj[:self.max_field_size] + f"[TRUNCATED:{len(obj)}]"
        elif isinstance(obj, bytes):
            return f"[BYTES:{len(obj)}]"
        return obj

    def _redact(self, key: str, value: Any) -> Any:
        """Redact sensitive field values."""
        if any(pattern in key.lower() for pattern in self.redact_patterns):
            return "[REDACTED]"
        return value


class ColoredFormatter(Formatter):
    """ANSI-colored console formatter."""

    COLORS = {
        LogLevel.DEBUG: "\033[36m",     # Cyan
        LogLevel.INFO: "\033[32m",      # Green
        LogLevel.WARNING: "\033[33m",   # Yellow
        LogLevel.ERROR: "\033[31m",     # Red
        LogLevel.CRITICAL: "\033[35;1m",# Bold Magenta
    }
    RESET = "\033[0m"

    def __init__(self, base_formatter: Formatter = None):
        self.base = base_formatter or TextFormatter()

    def format(self, record: LogRecord) -> str:
        color = self.COLORS.get(record.level, "")
        text = self.base.format(record)
        return f"{color}{text}{self.RESET}"


# ==================== Handlers ====================

class Handler(ABC):
    """
    Abstract base class for log output handlers.

    Provides:
    - Level filtering
    - Formatter application
    - Thread-safe emission
    - Error handling
    """

    def __init__(self, level: LogLevel = LogLevel.DEBUG):
        self.level = level
        self.formatter: Formatter = TextFormatter()
        self.filters: List[Filter] = []
        self._lock = threading.RLock()

    def set_level(self, level: LogLevel) -> 'Handler':
        self.level = level
        return self

    def set_formatter(self, formatter: Formatter) -> 'Handler':
        self.formatter = formatter
        return self

    def add_filter(self, filter_obj: Filter) -> 'Handler':
        self.filters.append(filter_obj)
        return self

    def should_handle(self, record: LogRecord) -> bool:
        if record.level < self.level:
            return False
        return all(f.filter(record) for f in self.filters)

    def handle(self, record: LogRecord) -> None:
        if not self.should_handle(record):
            return
        try:
            formatted = self.formatter.format(record)
            with self._lock:
                self.emit(formatted, record)
        except Exception as e:
            self._handle_error(record, e)

    def _handle_error(self, record: LogRecord, error: Exception) -> None:
        """Handle emission errors without causing loops."""
        sys.stderr.write(f"Logging error in {type(self).__name__}: {error}\n")

    @abstractmethod
    def emit(self, formatted: str, record: LogRecord) -> None:
        """Output the formatted log message."""
        pass

    def flush(self) -> None:
        """Flush buffered output."""
        pass

    def close(self) -> None:
        """Release handler resources."""
        pass


class ConsoleHandler(Handler):
    """Output logs to stdout/stderr."""

    def __init__(self,
                 stream: IO = None,
                 error_stream: IO = None,
                 level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.stream = stream or sys.stdout
        self.error_stream = error_stream or sys.stderr

    def emit(self, formatted: str, record: LogRecord) -> None:
        stream = self.error_stream if record.level >= LogLevel.ERROR else self.stream
        stream.write(formatted + "\n")
        stream.flush()


class FileHandler(Handler):
    """Output logs to a file."""

    def __init__(self,
                 filename: str,
                 mode: str = "a",
                 encoding: str = "utf-8",
                 level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.filename = filename
        self.mode = mode
        self.encoding = encoding
        self._file: Optional[IO] = None
        self._open()

    def _open(self) -> None:
        os.makedirs(os.path.dirname(self.filename) or ".", exist_ok=True)
        self._file = open(self.filename, self.mode, encoding=self.encoding)

    def emit(self, formatted: str, record: LogRecord) -> None:
        if self._file:
            self._file.write(formatted + "\n")
            self._file.flush()

    def flush(self) -> None:
        if self._file:
            self._file.flush()

    def close(self) -> None:
        if self._file:
            self._file.close()
            self._file = None


class RotatingFileHandler(Handler):
    """
    File handler with size and time-based rotation.

    Features:
    - Rotate on size threshold or at midnight
    - Configurable backup count
    - Optional compression of rotated files
    """

    def __init__(self,
                 filename: str,
                 max_bytes: int = 100 * 1024 * 1024,
                 backup_count: int = 10,
                 rotate_at_midnight: bool = False,
                 compress: bool = True,
                 level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.filename = filename
        self.max_bytes = max_bytes
        self.backup_count = backup_count
        self.rotate_at_midnight = rotate_at_midnight
        self.compress = compress

        self._file: Optional[IO] = None
        self._current_size: int = 0
        self._rotation_time: Optional[datetime] = None
        self._open()

    def _open(self) -> None:
        os.makedirs(os.path.dirname(self.filename) or ".", exist_ok=True)
        self._current_size = os.path.getsize(self.filename) if os.path.exists(self.filename) else 0
        self._file = open(self.filename, "a", encoding="utf-8")
        if self.rotate_at_midnight:
            self._rotation_time = self._next_midnight()

    def _next_midnight(self) -> datetime:
        now = datetime.now()
        return (now + timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)

    def _should_rotate(self) -> bool:
        if self._current_size >= self.max_bytes:
            return True
        if self.rotate_at_midnight and datetime.now() >= self._rotation_time:
            return True
        return False

    def _rotate(self) -> None:
        if self._file:
            self._file.close()

        # Shift backups
        for i in range(self.backup_count - 1, 0, -1):
            src = self._backup_name(i)
            dst = self._backup_name(i + 1)
            if os.path.exists(src):
                shutil.move(src, dst)

        # Rename current
        if os.path.exists(self.filename):
            shutil.move(self.filename, self._backup_name(1))
            if self.compress:
                self._compress_async(self._backup_name(1))

        self._cleanup_old()
        self._open()

    def _backup_name(self, index: int) -> str:
        suffix = ".gz" if self.compress and index > 1 else ""
        return f"{self.filename}.{index}{suffix}"

    def _compress_async(self, filename: str) -> None:
        def compress():
            gz_name = filename + ".gz"
            with open(filename, 'rb') as f_in:
                with gzip.open(gz_name, 'wb') as f_out:
                    shutil.copyfileobj(f_in, f_out)
            os.remove(filename)
        threading.Thread(target=compress, daemon=True).start()

    def _cleanup_old(self) -> None:
        for i in range(self.backup_count + 1, self.backup_count + 100):
            for suffix in ["", ".gz"]:
                path = f"{self.filename}.{i}{suffix}"
                if os.path.exists(path):
                    os.remove(path)

    def emit(self, formatted: str, record: LogRecord) -> None:
        if self._file:
            line = formatted + "\n"
            self._file.write(line)
            self._file.flush()
            self._current_size += len(line.encode("utf-8"))
            if self._should_rotate():
                self._rotate()

    def close(self) -> None:
        if self._file:
            self._file.close()
            self._file = None


class AsyncHandler(Handler):
    """
    Non-blocking handler using bounded queue and background thread.

    Trade-offs:
    - Pro: Never blocks calling thread
    - Con: Logs may be lost on crash
    """

    def __init__(self,
                 delegate: Handler,
                 queue_size: int = 10000,
                 overflow_policy: str = "drop_oldest",
                 level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.delegate = delegate
        self.overflow_policy = overflow_policy
        self._queue: queue.Queue = queue.Queue(maxsize=queue_size)
        self._shutdown = threading.Event()
        self._worker = threading.Thread(target=self._process_loop, daemon=True)
        self._worker.start()

    def emit(self, formatted: str, record: LogRecord) -> None:
        try:
            self._queue.put_nowait((formatted, record))
        except queue.Full:
            self._handle_overflow(formatted, record)

    def _handle_overflow(self, formatted: str, record: LogRecord) -> None:
        if self.overflow_policy == "drop_oldest":
            try:
                self._queue.get_nowait()
                self._queue.put_nowait((formatted, record))
            except queue.Empty:
                pass
        elif self.overflow_policy == "block":
            self._queue.put((formatted, record))
        # drop_newest: do nothing

    def _process_loop(self) -> None:
        while not self._shutdown.is_set():
            try:
                formatted, record = self._queue.get(timeout=0.1)
                self.delegate.emit(formatted, record)
            except queue.Empty:
                continue
            except Exception as e:
                sys.stderr.write(f"Async handler error: {e}\n")

    def flush(self) -> None:
        while not self._queue.empty():
            try:
                formatted, record = self._queue.get_nowait()
                self.delegate.emit(formatted, record)
            except queue.Empty:
                break
        self.delegate.flush()

    def close(self) -> None:
        self._shutdown.set()
        self._worker.join(timeout=5.0)
        self.flush()
        self.delegate.close()


class MemoryHandler(Handler):
    """
    Buffer logs in memory, flush to delegate on trigger.

    Use case: Buffer debug logs, flush only on error.
    """

    def __init__(self,
                 capacity: int = 1000,
                 delegate: Handler = None,
                 flush_level: LogLevel = LogLevel.ERROR,
                 level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.capacity = capacity
        self.delegate = delegate
        self.flush_level = flush_level
        self._buffer: List[Tuple[str, LogRecord]] = []

    def emit(self, formatted: str, record: LogRecord) -> None:
        self._buffer.append((formatted, record))
        if len(self._buffer) > self.capacity:
            self._buffer = self._buffer[-self.capacity:]
        if record.level >= self.flush_level:
            self.flush()

    def flush(self) -> None:
        if self.delegate and self._buffer:
            for formatted, record in self._buffer:
                self.delegate.emit(formatted, record)
            self._buffer.clear()
            self.delegate.flush()

    def get_buffer(self) -> List[Tuple[str, LogRecord]]:
        return list(self._buffer)


# ==================== Logger ====================

class Logger:
    """
    Main logger class supporting hierarchical names and multiple handlers.

    Logger names use dot-separated hierarchies (e.g., "app.db.queries").
    Child loggers inherit parent configuration unless overridden.
    """

    def __init__(self, name: str, level: LogLevel = None):
        self.name = name
        self._level = level
        self._level_set = level is not None
        self.handlers: List[Handler] = []
        self.filters: List[Filter] = []
        self.parent: Optional['Logger'] = None
        self.propagate = True

    @property
    def level(self) -> LogLevel:
        """Get effective level (inherit from parent if not set)."""
        if self._level_set:
            return self._level
        if self.parent:
            return self.parent.level
        return LogLevel.WARNING

    def set_level(self, level: LogLevel) -> 'Logger':
        self._level = level
        self._level_set = True
        return self

    def add_handler(self, handler: Handler) -> 'Logger':
        self.handlers.append(handler)
        return self

    def add_filter(self, filter_obj: Filter) -> 'Logger':
        self.filters.append(filter_obj)
        return self

    def _should_log(self, level: LogLevel) -> bool:
        return level >= self.level

    def _log(self, level: LogLevel, message: str, *args,
             exc_info: bool = False, **kwargs) -> None:
        if not self._should_log(level):
            return

        # Format message
        if args:
            message = message % args

        # Merge context and explicit kwargs
        extra = {**get_logging_context(), **kwargs}

        # Capture exception if requested
        exc = sys.exc_info() if exc_info else None

        record = LogRecord(
            level=level,
            message=message,
            logger_name=self.name,
            extra=extra,
            exc_info=exc
        )

        # Apply filters
        if not all(f.filter(record) for f in self.filters):
            return

        # Dispatch to handlers
        for handler in self.handlers:
            handler.handle(record)

        # Propagate to parent
        if self.propagate and self.parent:
            for handler in self.parent.handlers:
                handler.handle(record)

    def debug(self, message: str, *args, **kwargs) -> None:
        self._log(LogLevel.DEBUG, message, *args, **kwargs)

    def info(self, message: str, *args, **kwargs) -> None:
        self._log(LogLevel.INFO, message, *args, **kwargs)

    def warning(self, message: str, *args, **kwargs) -> None:
        self._log(LogLevel.WARNING, message, *args, **kwargs)

    def error(self, message: str, *args, **kwargs) -> None:
        self._log(LogLevel.ERROR, message, *args, **kwargs)

    def critical(self, message: str, *args, **kwargs) -> None:
        self._log(LogLevel.CRITICAL, message, *args, **kwargs)

    def exception(self, message: str, *args, **kwargs) -> None:
        """Log ERROR with exception info."""
        self._log(LogLevel.ERROR, message, *args, exc_info=True, **kwargs)


# ==================== LogManager ====================

class LogManager:
    """
    Global logger registry and factory.

    Thread-safe singleton that manages logger hierarchy.
    """

    _loggers: Dict[str, Logger] = {}
    _lock = threading.Lock()
    _root: Optional[Logger] = None

    @classmethod
    def get_logger(cls, name: str = "root") -> Logger:
        """Get or create a logger by name."""
        with cls._lock:
            if name in cls._loggers:
                return cls._loggers[name]

            logger = Logger(name)

            # Set up hierarchy
            if name != "root":
                if "." in name:
                    parent_name = name.rsplit(".", 1)[0]
                else:
                    parent_name = "root"
                logger.parent = cls.get_logger(parent_name)

            cls._loggers[name] = logger
            return logger

    @classmethod
    def get_root(cls) -> Logger:
        """Get the root logger."""
        return cls.get_logger("root")

    @classmethod
    def shutdown(cls) -> None:
        """Close all handlers and clean up."""
        with cls._lock:
            for logger in cls._loggers.values():
                for handler in logger.handlers:
                    handler.close()
            cls._loggers.clear()


# ==================== Convenience Functions ====================

def get_logger(name: str = "root") -> Logger:
    """Convenience function to get a logger."""
    return LogManager.get_logger(name)


def basic_config(level: LogLevel = LogLevel.INFO,
                 format: str = None,
                 filename: str = None,
                 handlers: List[Handler] = None) -> None:
    """
    Simple configuration for common use cases.

    Usage:
        basic_config(level=LogLevel.DEBUG)
        basic_config(filename="app.log", level=LogLevel.INFO)
    """
    root = LogManager.get_root()
    root.set_level(level)

    if handlers:
        for h in handlers:
            root.add_handler(h)
    elif filename:
        h = RotatingFileHandler(filename)
        if format:
            h.set_formatter(TextFormatter(format))
        root.add_handler(h)
    else:
        h = ConsoleHandler()
        if format:
            h.set_formatter(TextFormatter(format))
        else:
            h.set_formatter(ColoredFormatter())
        root.add_handler(h)
```

---

## 6. Distributed Tracing Integration

<div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 18px; margin-bottom: 16px;">Connecting Logs Across Service Boundaries</div>
<div style="color: #1e293b; font-size: 14px; line-height: 1.8;">

<span style="color: #90EE90; font-weight: bold;">Distributed tracing</span> correlates logs, metrics, and traces across microservices by propagating context identifiers through the entire request lifecycle. When a user action triggers calls across 10+ services, tracing lets you reconstruct the full story from a single trace ID.

</div>
</div>

### The Three Pillars Integration Model

Logs, metrics, and traces form the <span style="color: #22c55e; font-weight: bold;">three pillars of observability</span>. While each serves a different purpose, their power multiplies when unified:

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 16px; margin-bottom: 20px;">Observability Pillars Unified by Trace Context</div>

<div style="display: flex; flex-direction: column; gap: 20px;">

<div style="display: flex; justify-content: center; align-items: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #dbeafe; padding: 20px 28px; border-radius: 12px; border: 2px solid #3b82f6; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 14px;">Logs</div>
<div style="color: #3b82f6; font-size: 11px; margin-top: 4px;">What happened</div>
<div style="color: #64748b; font-size: 10px; margin-top: 2px;">Detail & Context</div>
</div>
<div style="background: #dcfce7; padding: 20px 28px; border-radius: 12px; border: 2px solid #22c55e; text-align: center;">
<div style="color: #166534; font-weight: bold; font-size: 14px;">Metrics</div>
<div style="color: #22c55e; font-size: 11px; margin-top: 4px;">How much/often</div>
<div style="color: #64748b; font-size: 10px; margin-top: 2px;">Aggregates & Trends</div>
</div>
<div style="background: #fef3c7; padding: 20px 28px; border-radius: 12px; border: 2px solid #f59e0b; text-align: center;">
<div style="color: #92400e; font-weight: bold; font-size: 14px;">Traces</div>
<div style="color: #f59e0b; font-size: 11px; margin-top: 4px;">Where it flowed</div>
<div style="color: #64748b; font-size: 10px; margin-top: 2px;">Causality & Latency</div>
</div>
</div>

<div style="display: flex; justify-content: center;">
<div style="background: #f3e8ff; padding: 16px 32px; border-radius: 12px; border: 2px solid #a855f7;">
<div style="color: #7c3aed; font-weight: bold; font-size: 13px; text-align: center;">Unified by Trace Context</div>
<div style="color: #a855f7; font-size: 11px; text-align: center; margin-top: 4px;">trace_id + span_id + baggage</div>
</div>
</div>

</div>
</div>

### W3C Trace Context Implementation

The <span style="color: #22c55e; font-weight: bold;">W3C Trace Context</span> standard defines how to propagate tracing information across service boundaries. Our logger integrates with this standard:

```python
import uuid
from typing import Optional, Dict
from dataclasses import dataclass

@dataclass
class TraceContext:
    """
    W3C Trace Context compatible context holder.

    The trace context travels with every request, enabling
    correlation of logs across all services involved in
    processing that request.
    """
    trace_id: str          # 32 hex chars - unique per trace
    span_id: str           # 16 hex chars - unique per span
    parent_span_id: Optional[str] = None
    trace_flags: int = 1   # 1 = sampled
    trace_state: str = ""  # Vendor-specific state

    @classmethod
    def generate(cls) -> 'TraceContext':
        """Generate new trace context for root span."""
        return cls(
            trace_id=uuid.uuid4().hex,
            span_id=uuid.uuid4().hex[:16]
        )

    @classmethod
    def from_headers(cls, headers: Dict[str, str]) -> Optional['TraceContext']:
        """
        Parse W3C traceparent header.

        Format: {version}-{trace_id}-{parent_id}-{flags}
        Example: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
        """
        traceparent = headers.get('traceparent', '')
        if not traceparent:
            return None

        try:
            parts = traceparent.split('-')
            if len(parts) != 4 or parts[0] != '00':
                return None
            return cls(
                trace_id=parts[1],
                parent_span_id=parts[2],
                span_id=uuid.uuid4().hex[:16],  # New span
                trace_flags=int(parts[3], 16)
            )
        except (ValueError, IndexError):
            return None

    def to_headers(self) -> Dict[str, str]:
        """Generate headers for outgoing requests."""
        return {
            'traceparent': f"00-{self.trace_id}-{self.span_id}-{self.trace_flags:02x}",
            'tracestate': self.trace_state
        }

    def child_span(self) -> 'TraceContext':
        """Create child span context."""
        return TraceContext(
            trace_id=self.trace_id,
            span_id=uuid.uuid4().hex[:16],
            parent_span_id=self.span_id,
            trace_flags=self.trace_flags,
            trace_state=self.trace_state
        )


# Context variable for async-safe trace propagation
_trace_context: contextvars.ContextVar[Optional[TraceContext]] = \
    contextvars.ContextVar('trace_context', default=None)


class TracingLogger:
    """
    Logger with automatic trace context injection.

    Every log message automatically includes trace_id and span_id
    from the current context, enabling cross-service correlation.
    """

    def __init__(self, base_logger: Logger):
        self.base = base_logger

    @staticmethod
    @contextmanager
    def span(name: str, **attributes):
        """
        Create a new span context.

        Usage:
            with TracingLogger.span("db_query", table="users"):
                logger.info("Executing query")
                result = db.query(...)
        """
        parent = _trace_context.get()

        if parent:
            ctx = parent.child_span()
        else:
            ctx = TraceContext.generate()

        # Record span start
        start_time = time.time_ns()
        token = _trace_context.set(ctx)

        try:
            yield ctx
        finally:
            # Record span end (could emit to tracing backend)
            duration_ns = time.time_ns() - start_time
            _trace_context.reset(token)

    def _enrich_with_trace(self, kwargs: dict) -> dict:
        """Add trace context to log extra fields."""
        ctx = _trace_context.get()
        if ctx:
            kwargs = {
                'trace_id': ctx.trace_id,
                'span_id': ctx.span_id,
                'parent_span_id': ctx.parent_span_id,
                **kwargs
            }
        return kwargs

    def info(self, message: str, **kwargs):
        self.base.info(message, **self._enrich_with_trace(kwargs))

    def error(self, message: str, **kwargs):
        self.base.error(message, **self._enrich_with_trace(kwargs))

    # ... other level methods
```

<div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: bold; margin-bottom: 8px;">Key Insight: Automatic vs. Manual Injection</div>
<div style="color: #14532d; font-size: 14px;">
The <span style="color: #22c55e; font-weight: bold;">TracingLogger</span> automatically injects trace context into every log. This eliminates the bug-prone pattern of manually passing trace IDs through every function call. When debugging, simply query logs by trace_id to see the complete request journey.
</div>
</div>

### OpenTelemetry Integration

For production systems, integrate with <span style="color: #22c55e; font-weight: bold;">OpenTelemetry</span> rather than building custom tracing. See [[distributed-tracing]](/topics/observability/distributed-tracing) for full integration patterns.

```python
from opentelemetry import trace
from opentelemetry.trace import Span, StatusCode

class OTelAwareHandler(Handler):
    """
    Handler that links logs to active OpenTelemetry spans.

    This enables clicking from a log line directly to
    the associated trace in your tracing UI (Jaeger, Zipkin, etc.)
    """

    def __init__(self, delegate: Handler, level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.delegate = delegate
        self.tracer = trace.get_tracer(__name__)

    def emit(self, formatted: str, record: LogRecord) -> None:
        # Get current span from OpenTelemetry context
        current_span = trace.get_current_span()

        if current_span and current_span.is_recording():
            span_context = current_span.get_span_context()

            # Enrich log record with span info
            record.extra['trace_id'] = format(span_context.trace_id, '032x')
            record.extra['span_id'] = format(span_context.span_id, '016x')

            # Add log as span event (appears in trace UI)
            current_span.add_event(
                record.message,
                attributes={
                    'log.level': record.level.name,
                    'log.logger': record.logger_name,
                    **{k: str(v) for k, v in record.extra.items()}
                }
            )

            # Mark span as error if logging error
            if record.level >= LogLevel.ERROR:
                current_span.set_status(StatusCode.ERROR, record.message)

        # Delegate actual output
        self.delegate.emit(formatted, record)
```

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 16px; margin-bottom: 20px;">Request Flow with Trace Context</div>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #dbeafe; padding: 14px 20px; border-radius: 10px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; font-size: 12px;">Client Request</div>
<div style="color: #3b82f6; font-size: 10px;">No trace context</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #dcfce7; padding: 14px 20px; border-radius: 10px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: bold; font-size: 12px;">API Gateway</div>
<div style="color: #15803d; font-size: 10px;">Generate trace_id: abc123</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-left: 40px;">
<div style="color: #64748b; font-size: 20px;">&#8595;</div>
<div style="color: #64748b; font-size: 11px;">traceparent: 00-abc123-span1-01</div>
</div>

<div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #fef3c7; padding: 14px 20px; border-radius: 10px; border: 2px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; font-size: 12px;">Order Service</div>
<div style="color: #a16207; font-size: 10px;">span_id: span2, parent: span1</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #fee2e2; padding: 14px 20px; border-radius: 10px; border: 2px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; font-size: 12px;">Payment Service</div>
<div style="color: #b91c1c; font-size: 10px;">span_id: span3, parent: span2</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #f3e8ff; padding: 14px 20px; border-radius: 10px; border: 2px solid #a855f7;">
<div style="color: #7c3aed; font-weight: bold; font-size: 12px;">Notification Service</div>
<div style="color: #a855f7; font-size: 10px;">span_id: span4, parent: span2</div>
</div>
</div>

<div style="background: #f1f5f9; padding: 12px 16px; border-radius: 8px; margin-top: 8px;">
<div style="color: #475569; font-size: 11px;">
All services log with trace_id=abc123 &#8594; Query <code>trace_id:abc123</code> shows complete request journey
</div>
</div>

</div>
</div>

### Baggage: Request-Scoped Metadata

<span style="color: #22c55e; font-weight: bold;">Baggage</span> carries application-specific metadata (user ID, tenant ID, feature flags) across service boundaries alongside trace context:

```python
@dataclass
class Baggage:
    """
    Request-scoped key-value pairs propagated across services.

    Unlike trace context (for correlation), baggage carries
    business data needed for request processing or logging.
    """
    items: Dict[str, str] = field(default_factory=dict)

    def set(self, key: str, value: str) -> 'Baggage':
        """Immutable set - returns new baggage."""
        new_items = self.items.copy()
        new_items[key] = value
        return Baggage(new_items)

    def get(self, key: str, default: str = None) -> Optional[str]:
        return self.items.get(key, default)

    def to_header(self) -> str:
        """Encode as W3C baggage header."""
        # Format: key1=value1,key2=value2
        return ','.join(f"{k}={v}" for k, v in self.items.items())

    @classmethod
    def from_header(cls, header: str) -> 'Baggage':
        """Parse W3C baggage header."""
        items = {}
        if header:
            for pair in header.split(','):
                if '=' in pair:
                    k, v = pair.split('=', 1)
                    items[k.strip()] = v.strip()
        return cls(items)


# Usage in middleware
async def tracing_middleware(request, call_next):
    # Extract trace context and baggage from incoming request
    trace_ctx = TraceContext.from_headers(request.headers) or TraceContext.generate()
    baggage = Baggage.from_header(request.headers.get('baggage', ''))

    # Add request-specific baggage
    baggage = baggage.set('user_id', request.user_id)
    baggage = baggage.set('tenant_id', request.tenant_id)

    # Set context for this request
    with TracingLogger.span("http_request", path=request.path):
        with logging_context(
            trace_id=trace_ctx.trace_id,
            user_id=baggage.get('user_id'),
            tenant_id=baggage.get('tenant_id')
        ):
            response = await call_next(request)

    # Propagate to outgoing requests
    # (HTTP client interceptor adds trace_ctx.to_headers() + baggage.to_header())
    return response
```

### Interview Questions: Distributed Tracing (3 Levels Deep)

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 12px;">Level 1: Fundamentals</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">

**Q1: What is the relationship between logging and distributed tracing?**

Logging captures <span style="color: #22c55e; font-weight: bold;">what happened</span> in detail at each service. Tracing captures <span style="color: #22c55e; font-weight: bold;">where requests flowed</span> and how long each step took. When unified by trace_id, you can click from a slow span in your trace to see the detailed logs from that exact operation. Without trace context, logs from different services are disconnected - you cannot reconstruct the full request journey.

**Q2: What is the W3C Trace Context standard and why does it matter?**

W3C Trace Context standardizes how tracing information propagates via HTTP headers (`traceparent`, `tracestate`). Before standardization, each vendor (Zipkin, Jaeger, AWS X-Ray) used incompatible formats. The standard enables interoperability: a request starting in a service using Jaeger can flow through services using different tracing backends while maintaining correlation. The `traceparent` format is: `{version}-{trace_id}-{parent_id}-{flags}`.

</div>
</div>

<div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; margin-bottom: 12px;">Level 2: Implementation Depth</div>
<div style="color: #78350f; font-size: 14px; line-height: 1.8;">

**Q2.1: How do you implement trace context propagation in an async Python application where requests may jump between threads/coroutines?**

Use <span style="color: #22c55e; font-weight: bold;">contextvars</span> (Python 3.7+), which are async-safe and automatically propagate across await boundaries. Unlike `threading.local`, contextvars correctly handle the case where a single request spawns multiple concurrent database queries - each coroutine sees the same trace context. For thread pool executors, explicitly copy context: `asyncio.get_event_loop().run_in_executor(None, contextvars.copy_context().run, func)`.

**Q2.2: What happens to trace context when a service uses message queues (Kafka, RabbitMQ) instead of synchronous HTTP?**

Trace context must be explicitly serialized into message headers. The consumer extracts and restores the context, creating a <span style="color: #22c55e; font-weight: bold;">link</span> (not parent-child) relationship since the consumer span starts after the producer span ends. Key considerations:
1. Message may be processed hours after production - timestamps matter
2. One message may fan out to multiple consumers - trace branches
3. Batch consumers should create one span per message, not per batch

See [[event-driven-architecture]](/topics/microservices/event-strategies) for patterns.

</div>
</div>

<div style="background: #fee2e2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; margin-bottom: 12px;">Level 3: System Design Implications</div>
<div style="color: #7f1d1d; font-size: 14px; line-height: 1.8;">

**Q2.1.1: How do you implement trace context propagation across language boundaries (e.g., Python service calling a Go service calling a Rust service)?**

This is exactly why W3C Trace Context exists. Each language's tracing library (OpenTelemetry SDK) speaks the same wire protocol:
1. Python service adds `traceparent` header to outgoing HTTP request
2. Go service extracts header, creates child span, logs with same trace_id
3. Rust service does the same

The key is <span style="color: #22c55e; font-weight: bold;">standard header names and formats</span>. If using gRPC, trace context propagates via gRPC metadata. For custom protocols, explicitly define where trace context lives in the message format.

**Q2.2.1: Design a system that maintains trace context through a complex workflow involving: HTTP API -> Kafka -> Worker -> Redis Cache -> External API -> Webhook callback.**

```
1. HTTP API receives request
   - Generate trace_id if not present
   - Create span: "api.receive_order"

2. Publish to Kafka
   - Serialize trace context to message headers
   - Record span event: "kafka.publish"

3. Worker consumes message
   - Extract trace context from headers
   - Create linked span: "worker.process_order"

4. Redis cache check
   - Create child span: "redis.get"
   - Include trace_id in Redis key for debugging

5. External API call
   - Propagate trace context in outgoing headers
   - Create child span: "external.payment_api"

6. External API calls webhook
   - Include trace_id in webhook payload
   - Webhook handler extracts and continues trace
```

<span style="color: #22c55e; font-weight: bold;">Critical insight</span>: The webhook is the hardest part. External APIs don't propagate your trace context automatically. Include trace_id in the payload you send them, and configure them to echo it back in the webhook. This creates a "logical" continuation even if the wire format doesn't support tracing.

**Q2.2.2: How do you handle trace context in a system with both synchronous request-response and fire-and-forget patterns?**

Distinguish between:
1. **Synchronous spans**: Parent-child relationship, child span ends before parent
2. **Async fire-and-forget spans**: Link relationship, independent lifecycle

For fire-and-forget (e.g., sending an email after order completion):
- Create a new root span with a <span style="color: #22c55e; font-weight: bold;">link</span> to the original trace
- The link says "this work was triggered by trace X" without implying timing
- Log correlation still works - query by either trace_id

```python
def send_async_email(order_id: str, original_trace_id: str):
    # New trace for async work, linked to original
    with tracer.start_as_current_span(
        "send_email",
        links=[Link(SpanContext(trace_id=original_trace_id, span_id="..."))]
    ):
        # Logs here have new trace_id but link preserves causality
        logger.info("Sending order confirmation",
                   order_id=order_id,
                   triggered_by_trace=original_trace_id)
```

See [[saga-pattern]](/topics/distributed-systems/saga-pattern) for complex workflow correlation.

</div>
</div>

---

## 7. Performance Optimization Deep Dive

<div style="background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 18px; margin-bottom: 16px;">Zero-Cost Abstraction Goals</div>
<div style="color: #1e293b; font-size: 14px; line-height: 1.8;">

Production logging must be <span style="color: #90EE90; font-weight: bold;">effectively free</span> when disabled. A log call at DEBUG level in production (where INFO is the minimum) should cost nanoseconds, not microseconds. This section covers techniques to achieve near-zero overhead.

</div>
</div>

### The Cost Hierarchy of Logging Operations

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 16px; margin-bottom: 20px;">Operation Costs (Approximate)</div>

<div style="display: flex; flex-direction: column; gap: 12px;">

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; min-width: 160px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: bold; font-size: 12px;">Level Check</div>
</div>
<div style="color: #64748b; font-size: 12px; flex: 1;">~1-5 ns</div>
<div style="color: #22c55e; font-size: 11px;">Integer comparison</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #dbeafe; padding: 12px 16px; border-radius: 8px; min-width: 160px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; font-size: 12px;">String Formatting</div>
</div>
<div style="color: #64748b; font-size: 12px; flex: 1;">~100-500 ns</div>
<div style="color: #3b82f6; font-size: 11px;">f-strings, % formatting</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #fef3c7; padding: 12px 16px; border-radius: 8px; min-width: 160px; border: 2px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; font-size: 12px;">LogRecord Creation</div>
</div>
<div style="color: #64748b; font-size: 12px; flex: 1;">~200-1000 ns</div>
<div style="color: #f59e0b; font-size: 11px;">Object allocation + timestamp</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #fee2e2; padding: 12px 16px; border-radius: 8px; min-width: 160px; border: 2px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; font-size: 12px;">File Write + Flush</div>
</div>
<div style="color: #64748b; font-size: 12px; flex: 1;">~1-10 μs</div>
<div style="color: #ef4444; font-size: 11px;">Syscall overhead</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f3e8ff; padding: 12px 16px; border-radius: 8px; min-width: 160px; border: 2px solid #a855f7;">
<div style="color: #7c3aed; font-weight: bold; font-size: 12px;">Network Write</div>
</div>
<div style="color: #64748b; font-size: 12px; flex: 1;">~50 μs - 50 ms</div>
<div style="color: #a855f7; font-size: 11px;">Variable, can spike</div>
</div>

</div>
</div>

### Lazy Evaluation Pattern

The key insight: <span style="color: #22c55e; font-weight: bold;">never format a message that won't be logged</span>.

```python
class LazyLogger:
    """
    Logger that defers expensive operations until necessary.
    """

    def debug(self, message: str, *args, **kwargs):
        # FAST PATH: Check level before ANY work
        if self.level > LogLevel.DEBUG:
            return  # Cost: ~5ns

        # SLOW PATH: Only reached if message will be logged
        if args:
            message = message % args  # Deferred formatting
        self._emit(LogLevel.DEBUG, message, kwargs)

    def debug_lazy(self, message_func: Callable[[], str], **kwargs):
        """
        For expensive message construction.

        Usage:
            logger.debug_lazy(lambda: f"Query result: {expensive_serialize(result)}")
        """
        if self.level > LogLevel.DEBUG:
            return  # Lambda never called
        self._emit(LogLevel.DEBUG, message_func(), kwargs)
```

<div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: bold; margin-bottom: 8px;">Python Gotcha: f-string Evaluation</div>
<div style="color: #14532d; font-size: 14px;">

```python
# BAD: f-string evaluates BEFORE is_enabled check
logger.debug(f"Result: {expensive_operation()}")  # Always runs!

# GOOD: % formatting defers until needed
logger.debug("Result: %s", expensive_operation())  # Deferred if DEBUG disabled

# GOOD: Explicit lazy
logger.debug_lazy(lambda: f"Result: {expensive_operation()}")
```

See [[python-performance]](/topics/languages/python-performance) for more optimization patterns.

</div>
</div>

### Lock-Free Hot Path

For extreme throughput, eliminate locks from the critical path using <span style="color: #22c55e; font-weight: bold;">lock-free data structures</span>:

```python
import ctypes
from typing import Optional

class AtomicCounter:
    """Lock-free counter using atomic operations."""

    def __init__(self, initial: int = 0):
        self._value = ctypes.c_long(initial)

    def increment(self) -> int:
        """Atomic increment, returns new value."""
        # On x86, LOCK XADD is atomic
        # Python's ctypes doesn't expose this directly,
        # so production code should use atomics library
        # This is illustrative
        pass


class LockFreeLogBuffer:
    """
    MPSC (Multi-Producer Single-Consumer) ring buffer.

    Multiple threads can log without contention.
    Single consumer thread drains to handlers.
    """

    def __init__(self, capacity: int = 65536):
        # Power of 2 for fast modulo
        assert capacity & (capacity - 1) == 0
        self.capacity = capacity
        self.mask = capacity - 1

        # Pre-allocated slots avoid GC pressure
        self.buffer = [None] * capacity

        # Atomic positions
        self.write_pos = AtomicCounter(0)
        self.read_pos = AtomicCounter(0)

    def try_write(self, record: LogRecord) -> bool:
        """
        Non-blocking write attempt.
        Returns False if buffer full.
        """
        while True:
            current_write = self.write_pos.get()
            next_write = (current_write + 1) & self.mask

            # Check if full
            if next_write == self.read_pos.get():
                return False

            # CAS to claim slot
            if self.write_pos.compare_and_swap(current_write, next_write):
                self.buffer[current_write] = record
                return True

    def try_read(self) -> Optional[LogRecord]:
        """
        Non-blocking read attempt.
        Returns None if empty.
        """
        current_read = self.read_pos.get()

        if current_read == self.write_pos.get():
            return None  # Empty

        record = self.buffer[current_read]
        self.buffer[current_read] = None  # Help GC
        self.read_pos.increment()
        return record
```

See [[lock-free-data-structures]](/topics/concurrency/lock-free) and [[disruptor-pattern]](/topics/concurrency/disruptor) for production implementations.

### Interview Questions: Performance (3 Levels Deep)

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 12px;">Level 1: Fundamentals</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">

**Q1: Why is early level checking critical for logging performance?**

Level checking is a <span style="color: #22c55e; font-weight: bold;">~5ns integer comparison</span>. String formatting is ~100-500ns. Record creation is ~200-1000ns. File I/O is ~1-10μs. By checking level first, we skip ALL subsequent work for disabled log calls. In a tight loop logging at DEBUG with INFO threshold, this is the difference between ~5ns/call and ~1μs/call - a 200x improvement.

**Q2: What is the performance impact of logging in a hot loop?**

Even with async logging and early level checks, logging in a hot loop can devastate performance:
- Each call still has function call overhead (~20ns)
- String literals still need construction (~10ns)
- If enabled, queue insertion adds contention

Solutions: (1) Sample logs in loops (`if i % 1000 == 0: log...`), (2) Aggregate metrics instead of individual logs, (3) Use conditional compilation/feature flags to eliminate logging code entirely in release builds.

</div>
</div>

<div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; margin-bottom: 12px;">Level 2: Implementation Depth</div>
<div style="color: #78350f; font-size: 14px; line-height: 1.8;">

**Q2.1: How does Python's logging module implement lazy message formatting, and what's the catch?**

Python's logging uses `%` style formatting: `logger.info("User %s logged in", username)`. The `username` argument is only substituted if the message will be logged. However, <span style="color: #22c55e; font-weight: bold;">the arguments are still evaluated</span> before being passed to the function. So `logger.debug("Data: %s", expensive_serialize(data))` ALWAYS calls `expensive_serialize`. Use lambdas or the `isEnabledFor()` check for truly lazy evaluation.

**Q2.2: How do you minimize GC pressure in a high-throughput logging system?**

Three strategies:
1. **Object pooling**: Pre-allocate LogRecord objects, reset and reuse them
2. **Ring buffer**: Fixed-size buffer avoids node allocation/deallocation
3. **Structural sharing**: Use immutable context dicts that share underlying data

The LMAX Disruptor pattern combines all three: pre-allocated ring buffer with object reuse. In Python, you can achieve similar effects with `__slots__` on LogRecord to reduce per-instance memory.

</div>
</div>

<div style="background: #fee2e2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; margin-bottom: 12px;">Level 3: System Design Implications</div>
<div style="color: #7f1d1d; font-size: 14px; line-height: 1.8;">

**Q2.1.1: Design a logging system that can handle 10 million logs/second with <1μs p99 latency impact on the application.**

Architecture for extreme throughput:

1. **Thread-local pre-serialization**: Each thread has a pre-allocated buffer. Log records are serialized into this buffer without locks.

2. **Lock-free handoff**: When buffer is full, atomically swap with empty buffer from pool. Consumer takes filled buffer.

3. **Batch I/O**: Consumer aggregates buffers, writes in large batches to minimize syscalls.

4. **Memory-mapped output**: Write to mmap'd file for zero-copy I/O.

```python
class UltraFastLogger:
    _thread_buffer = threading.local()

    def info(self, msg):
        if self.level > INFO:
            return
        buf = self._get_buffer()
        buf.write_record(msg)  # No locks, no allocation
        if buf.full():
            self._swap_buffer(buf)
```

The key insight: <span style="color: #22c55e; font-weight: bold;">separate the fast path (buffering) from the slow path (I/O)</span> with zero contention between them.

**Q2.2.1: How do you benchmark logging performance accurately without the benchmark itself affecting results?**

Logging benchmarks are notoriously misleading:

1. **Warm-up**: Run thousands of iterations before measuring to trigger JIT (if applicable) and warm caches

2. **Isolate I/O**: For measuring log overhead, use a null handler that discards output

3. **Prevent optimization**: Ensure the compiler can't elide log calls - use volatile or blackhole

4. **Measure tail latency**: Average is misleading; measure p99, p999. Async logging often has good average but terrible tail due to queue draining.

5. **Test contention**: Single-threaded benchmarks miss lock contention. Test with realistic concurrent load.

See [[microbenchmarking]](/topics/performance/microbenchmarking) for rigorous methodology.

</div>
</div>

---

## 8. Testing Logging Systems

<div style="background: #f8fafc; border-left: 4px solid #8b5cf6; border-radius: 16px; padding: 24px; margin: 20px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 18px; margin-bottom: 16px;">Verifying Invisible Infrastructure</div>
<div style="color: #1e293b; font-size: 14px; line-height: 1.8;">

Logging is <span style="color: #90EE90; font-weight: bold;">invisible infrastructure</span> - it doesn't affect business logic but is critical for operations. Testing logging ensures that when you need logs most (during incidents), they're actually there and useful.

</div>
</div>

### Capturing Logs in Tests

```python
import pytest
from typing import List

class LogCapture(Handler):
    """
    Test handler that captures logs for assertions.

    Usage in pytest:
        def test_login_logging(log_capture):
            service.login("alice", "password")
            assert log_capture.contains(level=INFO, message_contains="login")
            assert log_capture.contains(user_id="alice")
    """

    def __init__(self):
        super().__init__(level=LogLevel.DEBUG)
        self.records: List[LogRecord] = []

    def emit(self, formatted: str, record: LogRecord) -> None:
        self.records.append(record)

    def clear(self) -> None:
        self.records.clear()

    def contains(self,
                 level: LogLevel = None,
                 message_contains: str = None,
                 message_regex: str = None,
                 **extra_fields) -> bool:
        """Check if any captured record matches criteria."""
        import re

        for record in self.records:
            if level and record.level != level:
                continue
            if message_contains and message_contains not in record.message:
                continue
            if message_regex and not re.search(message_regex, record.message):
                continue

            # Check extra fields
            match = True
            for key, expected in extra_fields.items():
                actual = record.extra.get(key)
                if actual != expected:
                    match = False
                    break

            if match:
                return True
        return False

    def assert_logged(self, **kwargs):
        """Assert that a matching log exists."""
        assert self.contains(**kwargs), \
            f"Expected log not found. Criteria: {kwargs}\nCaptured: {self.records}"


@pytest.fixture
def log_capture():
    """Pytest fixture for capturing logs."""
    capture = LogCapture()
    root = LogManager.get_root()
    root.add_handler(capture)
    yield capture
    root.handlers.remove(capture)


# Test examples
class TestOrderService:
    def test_order_creation_logs_with_trace_context(self, log_capture):
        with logging_context(trace_id="test-trace-123"):
            order_service.create_order(user_id="alice", items=["book"])

        log_capture.assert_logged(
            level=LogLevel.INFO,
            message_contains="Order created",
            trace_id="test-trace-123",
            user_id="alice"
        )

    def test_payment_failure_logs_error_with_details(self, log_capture):
        with pytest.raises(PaymentError):
            order_service.process_payment(order_id="123", amount=100)

        log_capture.assert_logged(
            level=LogLevel.ERROR,
            message_contains="Payment failed",
            order_id="123"
        )
```

<div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: bold; margin-bottom: 8px;">Testing Philosophy: What to Assert</div>
<div style="color: #14532d; font-size: 14px;">

Test <span style="color: #22c55e; font-weight: bold;">semantic content</span>, not exact format:
- Good: `assert_logged(message_contains="Order created", order_id="123")`
- Bad: `assert logs[0] == "[2024-01-15 10:30:00] INFO order.service - Order created..."`

The first survives format changes; the second breaks constantly.

</div>
</div>

### Testing Async and Rotation

```python
class TestAsyncHandler:
    def test_logs_are_eventually_written(self):
        """Async handler should flush on close."""
        capture = LogCapture()
        async_handler = AsyncHandler(capture, queue_size=100)
        logger = Logger("test").add_handler(async_handler)

        for i in range(50):
            logger.info(f"Message {i}")

        # Logs may not be written yet
        assert len(capture.records) < 50

        # Close triggers flush
        async_handler.close()
        assert len(capture.records) == 50

    def test_overflow_policy_drop_oldest(self):
        """Queue overflow should drop oldest messages."""
        capture = LogCapture()
        async_handler = AsyncHandler(
            capture,
            queue_size=10,
            overflow_policy="drop_oldest"
        )
        logger = Logger("test").add_handler(async_handler)

        # Fill queue beyond capacity
        for i in range(20):
            logger.info(f"Message {i}")

        async_handler.close()

        # Should have recent messages, not oldest
        messages = [r.message for r in capture.records]
        assert "Message 0" not in messages  # Oldest dropped
        assert "Message 19" in messages     # Newest kept


class TestRotatingFileHandler:
    def test_rotates_at_size_limit(self, tmp_path):
        """File should rotate when size exceeded."""
        log_file = tmp_path / "test.log"
        handler = RotatingFileHandler(
            str(log_file),
            max_bytes=1000,
            backup_count=3,
            compress=False
        )
        logger = Logger("test").add_handler(handler)

        # Write until rotation
        for i in range(100):
            logger.info("X" * 50)  # ~60 bytes per line

        handler.close()

        # Check rotation occurred
        assert log_file.exists()
        assert (tmp_path / "test.log.1").exists()
```

---

## 9. Common Pitfalls & Interview Gotchas

<div style="background: #fee2e2; border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; font-size: 18px; margin-bottom: 16px;">Production Pitfalls to Discuss in Interviews</div>
<div style="color: #7f1d1d; font-size: 14px; line-height: 1.8;">

These are the "war stories" that demonstrate real-world experience. Interviewers love hearing about these because they show you've operated logging systems at scale.

</div>
</div>

### Pitfall 1: Logging Sensitive Data

```python
# DANGEROUS: Logging request bodies may include passwords
logger.info(f"Received request: {request.body}")

# DANGEROUS: Exception messages may contain sensitive data
try:
    authenticate(username, password)
except AuthError as e:
    logger.error(f"Auth failed: {e}")  # May log password!

# SAFE: Explicit field extraction
logger.info("Received request",
           path=request.path,
           method=request.method,
           content_length=len(request.body))
```

### Pitfall 2: Logging Loop Amplification

```python
# DANGEROUS: Logs inside retry loops
for attempt in range(100):
    try:
        result = flaky_operation()
        break
    except FlakyError:
        logger.warning(f"Attempt {attempt} failed")  # 100 logs!

# SAFE: Log summary
for attempt in range(100):
    try:
        result = flaky_operation()
        break
    except FlakyError:
        last_error = e
        continue
else:
    logger.error(f"All {attempt} attempts failed", last_error=str(last_error))
```

### Pitfall 3: Log-and-Throw Anti-Pattern

```python
# ANTI-PATTERN: Logs error twice (here and at catch site)
def process_order(order_id):
    try:
        validate(order_id)
    except ValidationError as e:
        logger.error(f"Validation failed: {e}")  # Logged here...
        raise  # ...and logged again when caught upstream

# BETTER: Let the catcher log
def process_order(order_id):
    validate(order_id)  # Let exception propagate

# Or log only at the top-level handler
@app.exception_handler(ValidationError)
def handle_validation_error(e):
    logger.error("Request validation failed", error=str(e))
    return {"error": "Invalid request"}
```

### Pitfall 4: Timestamp Synchronization

<div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: bold; margin-bottom: 8px;">Clock Skew Causes Correlation Failures</div>
<div style="color: #78350f; font-size: 14px;">
When Service A's clock is 5 seconds ahead of Service B, logs appear out of order even with correct trace_id correlation. Solutions:
1. Use NTP with monitoring for clock drift
2. Include <span style="color: #22c55e; font-weight: bold;">logical timestamps</span> (lamport clocks) alongside wall-clock time
3. In log analysis, sort by trace_id + span_id hierarchy, not timestamp

See [[distributed-time]](/topics/distributed-systems/time-synchronization) for clock synchronization patterns.
</div>
</div>

### Interview Quick-Fire Questions

<div style="background: #f3e8ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #a855f7;">
<div style="color: #7c3aed; font-weight: bold; margin-bottom: 12px;">Rapid-Fire Interview Questions</div>
<div style="color: #581c87; font-size: 14px; line-height: 2.0;">

**Q: Why use DEBUG, INFO, WARN, ERROR instead of just "log"?**
A: <span style="color: #22c55e; font-weight: bold;">Filtering</span>. Production runs at INFO, debugging at DEBUG. Different severity enables routing (ERROR to PagerDuty).

**Q: Sync vs async logging trade-off in one sentence?**
A: Sync guarantees durability but blocks; async provides throughput but may lose logs on crash.

**Q: Why is `logger.debug(f"Data: {expensive()}")` bad?**
A: f-string evaluates before the level check - `expensive()` runs even if DEBUG is disabled.

**Q: What's wrong with `catch (e) { log(e); throw e; }`?**
A: Error logged twice - once here, once at final handler. Creates duplicate alerts.

**Q: How do you correlate logs across microservices?**
A: <span style="color: #22c55e; font-weight: bold;">Trace context propagation</span> - inject trace_id into every log, propagate via W3C headers.

**Q: What happens to async logs if the app crashes?**
A: Lost. Queued logs exist only in memory. Critical logs need sync handlers or persistent queues.

**Q: Why compress rotated logs?**
A: Logs are highly compressible (5-10x). Compression reduces storage cost and speeds up shipping.

**Q: How do you prevent log injection attacks?**
A: Structured logging (JSON) instead of string templates. Never interpolate user input into log format strings.

</div>
</div>

---

## 10. Real-World Architecture Patterns

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 16px; margin-bottom: 20px;">Production Logging Architecture (ELK Stack)</div>

<div style="display: flex; flex-direction: column; gap: 20px;">

<div style="display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #dbeafe; padding: 16px 24px; border-radius: 12px; border: 2px solid #3b82f6; text-align: center; flex: 1; min-width: 120px;">
<div style="color: #1e40af; font-weight: bold; font-size: 13px;">App Pods</div>
<div style="color: #3b82f6; font-size: 10px; margin-top: 4px;">stdout/stderr</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #dcfce7; padding: 16px 24px; border-radius: 12px; border: 2px solid #22c55e; text-align: center; flex: 1; min-width: 120px;">
<div style="color: #166534; font-weight: bold; font-size: 13px;">Fluent Bit</div>
<div style="color: #22c55e; font-size: 10px; margin-top: 4px;">DaemonSet</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #fef3c7; padding: 16px 24px; border-radius: 12px; border: 2px solid #f59e0b; text-align: center; flex: 1; min-width: 120px;">
<div style="color: #92400e; font-weight: bold; font-size: 13px;">Kafka</div>
<div style="color: #f59e0b; font-size: 10px; margin-top: 4px;">Buffer</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #fee2e2; padding: 16px 24px; border-radius: 12px; border: 2px solid #ef4444; text-align: center; flex: 1; min-width: 120px;">
<div style="color: #991b1b; font-weight: bold; font-size: 13px;">Logstash</div>
<div style="color: #ef4444; font-size: 10px; margin-top: 4px;">Transform</div>
</div>
<div style="color: #64748b; font-size: 20px;">&#8594;</div>
<div style="background: #f3e8ff; padding: 16px 24px; border-radius: 12px; border: 2px solid #a855f7; text-align: center; flex: 1; min-width: 120px;">
<div style="color: #7c3aed; font-weight: bold; font-size: 13px;">Elasticsearch</div>
<div style="color: #a855f7; font-size: 10px; margin-top: 4px;">Index & Search</div>
</div>
</div>

<div style="display: flex; justify-content: flex-end;">
<div style="background: #e0f2fe; padding: 14px 20px; border-radius: 10px; border: 2px solid #0ea5e9;">
<div style="color: #0369a1; font-weight: bold; font-size: 12px;">Kibana / Grafana</div>
<div style="color: #0ea5e9; font-size: 10px;">Visualization & Alerting</div>
</div>
</div>

</div>
</div>

### Pattern: Log Levels by Environment

```python
# Configuration per environment
LOGGING_CONFIG = {
    "development": {
        "root_level": LogLevel.DEBUG,
        "handlers": [
            {"type": "console", "formatter": "colored"},
        ],
        "async": False,  # Easier debugging
    },
    "staging": {
        "root_level": LogLevel.DEBUG,
        "handlers": [
            {"type": "console", "formatter": "json"},
            {"type": "file", "path": "/var/log/app.log"},
        ],
        "async": True,
    },
    "production": {
        "root_level": LogLevel.INFO,  # No DEBUG in prod
        "handlers": [
            {"type": "console", "formatter": "json"},  # For K8s log collection
        ],
        "sampling": {
            LogLevel.DEBUG: 0.01,  # 1% sampling if enabled
        },
        "async": True,
    },
}
```

### Pattern: Correlation ID Middleware

```python
# FastAPI middleware example
from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware

class CorrelationMiddleware(BaseHTTPMiddleware):
    """
    Middleware that ensures every request has correlation context.

    - Extracts trace_id from incoming headers (or generates new)
    - Sets context for all logs within request
    - Propagates to outgoing requests
    """

    async def dispatch(self, request: Request, call_next):
        # Extract or generate trace context
        trace_ctx = TraceContext.from_headers(dict(request.headers))
        if not trace_ctx:
            trace_ctx = TraceContext.generate()

        # Set context for this request
        with logging_context(
            trace_id=trace_ctx.trace_id,
            span_id=trace_ctx.span_id,
            request_path=request.url.path,
            request_method=request.method,
            client_ip=request.client.host
        ):
            logger.info("Request started")

            try:
                response = await call_next(request)
                logger.info("Request completed",
                           status_code=response.status_code)
                return response
            except Exception as e:
                logger.exception("Request failed")
                raise


app = FastAPI()
app.add_middleware(CorrelationMiddleware)
```

See [[api-gateway]](/topics/system-design/api-gateway) for centralized correlation management and [[observability-patterns]](/topics/observability/patterns) for comprehensive monitoring strategies.

---

## Summary: Key Interview Takeaways

<div style="background: #f8fafc; border-left: 4px solid #8b5cf6; border-radius: 16px; padding: 24px; margin: 20px 0;">
<div style="color: #1e293b; font-weight: bold; font-size: 18px; margin-bottom: 16px;">What Interviewers Look For</div>
<div style="color: #1e293b; font-size: 14px; line-height: 1.8;">

1. <span style="color: #90EE90; font-weight: bold;">Performance awareness</span>: Early level checking, lazy evaluation, async I/O
2. <span style="color: #90EE90; font-weight: bold;">Reliability trade-offs</span>: Durability vs. latency, queue overflow policies
3. <span style="color: #90EE90; font-weight: bold;">Observability integration</span>: Trace context propagation, structured data
4. <span style="color: #90EE90; font-weight: bold;">Production readiness</span>: Rotation, sensitive data handling, error isolation
5. <span style="color: #90EE90; font-weight: bold;">Design patterns</span>: Strategy (handlers), Template Method (Handler.handle), Chain of Responsibility (filters)

</div>
</div>
