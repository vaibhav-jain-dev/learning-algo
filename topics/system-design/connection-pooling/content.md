# Connection Pooling

## Overview

Connection pooling is a technique that maintains a cache of reusable connections to databases, HTTP servers, or other network resources. Instead of creating a new connection for each request (expensive), applications borrow a connection from the pool, use it, and return it.

## The Intuitive Mental Model: Car Rental Company

Think of connection pooling like a car rental company:

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 24px 0;">
  <div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; border: 1px solid #f8514933;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
      <div style="width: 12px; height: 12px; background: #f85149; border-radius: 50%;"></div>
      <span style="color: #f85149; font-weight: 600; font-size: 16px;">Without Pooling (Manufacturing on Demand)</span>
    </div>
    <div style="font-family: monospace; font-size: 13px;">
      <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 12px;">
        <span style="background: #21262d; padding: 8px 14px; border-radius: 6px; color: #58a6ff;">Customer needs car</span>
        <span style="color: #8b949e;">-></span>
        <span style="background: #f8514933; padding: 8px 14px; border-radius: 6px; color: #f85149;">Factory builds car</span>
        <span style="color: #8b949e;">-></span>
        <span style="background: #21262d; padding: 8px 14px; border-radius: 6px; color: #c9d1d9;">Customer uses car</span>
      </div>
      <div style="display: flex; justify-content: center; gap: 80px; color: #8b949e; font-size: 12px; margin: 8px 0;">
        <span style="color: #f85149;">[30 minutes]</span>
        <span>[2 hours]</span>
      </div>
      <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; margin-top: 12px;">
        <span style="background: #21262d; padding: 8px 14px; border-radius: 6px; color: #c9d1d9;">Customer returns</span>
        <span style="color: #8b949e;">-></span>
        <span style="background: #f8514933; padding: 8px 14px; border-radius: 6px; color: #f85149;">Factory scraps car</span>
      </div>
      <div style="text-align: center; color: #f85149; font-size: 12px; margin-top: 8px;">[5 minutes]</div>
    </div>
    <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #30363d; text-align: center;">
      <span style="color: #f85149; font-weight: 600;">Total overhead: 35 minutes per trip!</span>
    </div>
  </div>
  <div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; border: 1px solid #7ee78733;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
      <div style="width: 12px; height: 12px; background: #7ee787; border-radius: 50%;"></div>
      <span style="color: #7ee787; font-weight: 600; font-size: 16px;">With Pooling (Car Rental)</span>
    </div>
    <div style="font-family: monospace; font-size: 13px;">
      <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 12px;">
        <span style="background: #21262d; padding: 8px 14px; border-radius: 6px; color: #58a6ff;">Customer needs car</span>
        <span style="color: #8b949e;">-></span>
        <span style="background: #23863633; padding: 8px 14px; border-radius: 6px; color: #7ee787;">Pick from fleet</span>
        <span style="color: #8b949e;">-></span>
        <span style="background: #21262d; padding: 8px 14px; border-radius: 6px; color: #c9d1d9;">Customer uses car</span>
      </div>
      <div style="display: flex; justify-content: center; gap: 80px; color: #8b949e; font-size: 12px; margin: 8px 0;">
        <span style="color: #7ee787;">[30 seconds]</span>
        <span>[2 hours]</span>
      </div>
      <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; margin-top: 12px;">
        <span style="background: #21262d; padding: 8px 14px; border-radius: 6px; color: #c9d1d9;">Customer done</span>
        <span style="color: #8b949e;">-></span>
        <span style="background: #23863633; padding: 8px 14px; border-radius: 6px; color: #7ee787;">Return to fleet</span>
      </div>
      <div style="text-align: center; color: #7ee787; font-size: 12px; margin-top: 8px;">[30 seconds]</div>
    </div>
    <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #30363d; text-align: center;">
      <span style="color: #7ee787; font-weight: 600;">Total overhead: 1 minute per trip!</span>
    </div>
  </div>
</div>

### Mapping the Metaphor

| Car Rental | Connection Pool | Purpose |
|------------|-----------------|---------|
| Fleet of cars | Pool of connections | Available resources |
| Rental counter | Pool manager | Manages checkout/return |
| Customer queue | Wait queue | Requests waiting for resources |
| Car maintenance | Health checks | Validate resource is usable |
| Fleet size | Pool size | How many resources to maintain |
| Max rental period | Connection timeout | Prevent resource hogging |

---

## 20-Year Insight: What Experience Teaches

### What Junior Developers Think:
> "Connection pooling is just about reusing connections. Set pool size = 100 and we're good."

### What Senior Developers Know:
> "Pool sizing is one of the most counterintuitive performance decisions. A smaller pool often outperforms a larger one. The real skill is understanding wait times, Little's Law, and connection lifecycle."

### The Deeper Truth:
After 20+ years of database performance tuning:
1. **More is not better** - A pool of 1000 connections often performs worse than 10
2. **The pool hides latency** - Until it doesn't, then everything explodes
3. **Connection leaks are silent killers** - One missing `close()` takes down production
4. **Database connection != HTTP connection** - Sizing strategies are completely different

---

## Why Pooling Matters: The Numbers

### Cost of Creating a New Connection

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 24px 0;">
  <div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; border: 1px solid #58a6ff33;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
      <div style="width: 12px; height: 12px; background: #58a6ff; border-radius: 50%;"></div>
      <span style="color: #58a6ff; font-weight: 600; font-size: 16px;">Database Connection (PostgreSQL)</span>
    </div>
    <div style="font-family: monospace; font-size: 13px; line-height: 2.2;">
      <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
        <span>1. TCP Handshake</span>
        <span style="color: #f0883e;">~0.5ms - ~50ms</span>
      </div>
      <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
        <span>2. TLS Handshake</span>
        <span style="color: #f0883e;">~10ms</span>
      </div>
      <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
        <span>3. Authentication</span>
        <span style="color: #f0883e;">~5ms - ~50ms</span>
      </div>
      <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
        <span>4. Session Setup</span>
        <span style="color: #f0883e;">~2ms</span>
      </div>
      <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
        <span>5. pg_stat tracking</span>
        <span style="color: #f0883e;">~1ms</span>
      </div>
    </div>
    <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #30363d;">
      <div style="color: #f85149; font-weight: 600; text-align: center;">Total: 18-113ms per connection!</div>
      <div style="color: #8b949e; font-size: 12px; text-align: center; margin-top: 8px;">If your query takes 5ms, you're spending 80%+ on setup</div>
    </div>
  </div>
  <div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; border: 1px solid #d2a8ff33;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
      <div style="width: 12px; height: 12px; background: #d2a8ff; border-radius: 50%;"></div>
      <span style="color: #d2a8ff; font-weight: 600; font-size: 16px;">HTTP Connection (with TLS)</span>
    </div>
    <div style="font-family: monospace; font-size: 13px; line-height: 2.2;">
      <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
        <span>1. DNS Lookup</span>
        <span style="color: #f0883e;">~20ms - ~200ms</span>
      </div>
      <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
        <span>2. TCP Handshake</span>
        <span style="color: #f0883e;">~30ms (RTT)</span>
      </div>
      <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
        <span>3. TLS Handshake</span>
        <span style="color: #f0883e;">~60ms (2 RTTs)</span>
      </div>
    </div>
    <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #30363d;">
      <div style="color: #f85149; font-weight: 600; text-align: center;">Total: 110-290ms before first byte!</div>
      <div style="background: #23863633; padding: 10px 16px; border-radius: 6px; margin-top: 12px; text-align: center;">
        <span style="color: #7ee787;">With HTTP/2 keep-alive: ~0ms (reuse existing)</span>
      </div>
    </div>
  </div>
</div>

---

## Pool Sizing: The Science

### Little's Law

```
L = λ × W

Where:
  L = Average number of items in system (pool size needed)
  λ = Arrival rate (requests per second)
  W = Average time in system (connection hold time)

Example:
  λ = 100 requests/second
  W = 50ms (0.05 seconds) average query time

  L = 100 × 0.05 = 5 connections needed!

Wait... 5 connections for 100 RPS? Yes!
```

### The Pool Sizing Formula

```python
def calculate_optimal_pool_size(
    requests_per_second: float,
    avg_connection_hold_time_ms: float,
    target_wait_time_ms: float = 0,
    safety_factor: float = 1.5
) -> int:
    """
    Calculate optimal pool size using queueing theory.

    Note: This is for STEADY STATE. Burst traffic needs more headroom.
    """
    # Little's Law: L = λ × W
    hold_time_seconds = avg_connection_hold_time_ms / 1000
    base_pool_size = requests_per_second * hold_time_seconds

    # Add safety factor for variance
    optimal = int(base_pool_size * safety_factor)

    return max(optimal, 1)  # At least 1 connection


# Examples
print(calculate_optimal_pool_size(100, 50))   # 100 RPS, 50ms → 8 connections
print(calculate_optimal_pool_size(1000, 10))  # 1000 RPS, 10ms → 15 connections
print(calculate_optimal_pool_size(50, 200))   # 50 RPS, 200ms → 15 connections
```

### Why Larger Pools Can Be Slower

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 24px 32px; margin: 24px 0; border: 1px solid #30363d;">
  <div style="text-align: center; color: #8b949e; margin-bottom: 20px;">Scenario: Database with <span style="color: #58a6ff; font-weight: 600;">4 CPU cores</span></div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div style="background: #23863622; border: 1px solid #23863666; border-radius: 12px; padding: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
        <div style="width: 12px; height: 12px; background: #7ee787; border-radius: 50%;"></div>
        <span style="color: #7ee787; font-weight: 600; font-size: 16px;">Pool Size = 10</span>
      </div>
      <div style="font-family: monospace; font-size: 12px; line-height: 2;">
        <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
          <span>Queries in parallel</span>
          <span style="color: #7ee787;">4 at a time</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
          <span>CPU utilization</span>
          <span style="color: #7ee787;">100% (all cores busy)</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
          <span>Memory per connection</span>
          <span>~10MB</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
          <span>Total memory</span>
          <span style="color: #7ee787;">100MB</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
          <span>Query time</span>
          <span style="color: #7ee787;">10ms</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: #c9d1d9; padding-top: 8px; border-top: 1px solid #30363d; margin-top: 8px;">
          <span style="font-weight: 600;">Throughput</span>
          <span style="color: #7ee787; font-weight: 600;">400 queries/sec</span>
        </div>
      </div>
    </div>
    <div style="background: #f8514922; border: 1px solid #f8514966; border-radius: 12px; padding: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
        <div style="width: 12px; height: 12px; background: #f85149; border-radius: 50%;"></div>
        <span style="color: #f85149; font-weight: 600; font-size: 16px;">Pool Size = 200</span>
      </div>
      <div style="font-family: monospace; font-size: 12px; line-height: 2;">
        <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
          <span>Queries in parallel</span>
          <span style="color: #f85149;">200 competing for 4 cores</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
          <span>CPU utilization</span>
          <span style="color: #f0883e;">100% (context switching!)</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
          <span>Memory per connection</span>
          <span>~10MB</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
          <span>Total memory</span>
          <span style="color: #f85149;">2GB (may swap)</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: #c9d1d9;">
          <span>Query time</span>
          <span style="color: #f85149;">50ms</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: #c9d1d9; padding-top: 8px; border-top: 1px solid #30363d; margin-top: 8px;">
          <span style="font-weight: 600;">Throughput</span>
          <span style="color: #f85149; font-weight: 600;">80 queries/sec (SLOWER!)</span>
        </div>
      </div>
    </div>
  </div>
</div>

### The HikariCP Formula (Production Proven)

```
connections = (core_count * 2) + effective_spindle_count

For SSD:
  connections = (CPU cores * 2) + 1

Example:
  8-core database server with SSD
  connections = (8 * 2) + 1 = 17 connections

This has been validated by real-world PostgreSQL benchmarking.
```

---

## Database Connection Pool Implementation

### Python - Production Database Pool

```python
import time
import threading
import logging
from queue import Queue, Empty, Full
from dataclasses import dataclass, field
from typing import Optional, Callable, Any, List
from contextlib import contextmanager
import psycopg2
from psycopg2 import pool as pg_pool

logger = logging.getLogger(__name__)


@dataclass
class PoolConfig:
    """Connection pool configuration."""
    min_connections: int = 2
    max_connections: int = 10
    connection_timeout_seconds: float = 30.0
    idle_timeout_seconds: float = 600.0  # 10 minutes
    max_lifetime_seconds: float = 1800.0  # 30 minutes
    validation_interval_seconds: float = 30.0
    validation_query: str = "SELECT 1"


@dataclass
class PooledConnection:
    """Wrapper around a database connection."""
    connection: Any
    created_at: float = field(default_factory=time.time)
    last_used_at: float = field(default_factory=time.time)
    last_validated_at: float = field(default_factory=time.time)
    in_use: bool = False

    def is_expired(self, max_lifetime: float) -> bool:
        return time.time() - self.created_at > max_lifetime

    def is_idle_too_long(self, idle_timeout: float) -> bool:
        return time.time() - self.last_used_at > idle_timeout

    def needs_validation(self, validation_interval: float) -> bool:
        return time.time() - self.last_validated_at > validation_interval


@dataclass
class PoolMetrics:
    """Pool metrics for monitoring."""
    total_connections: int = 0
    active_connections: int = 0
    idle_connections: int = 0
    waiting_threads: int = 0
    total_checkouts: int = 0
    total_timeouts: int = 0
    total_validations: int = 0
    total_evictions: int = 0


class ConnectionPool:
    """
    Production-grade database connection pool.

    Features:
    - Connection validation (test before use)
    - Idle connection eviction
    - Maximum lifetime enforcement
    - Metrics and monitoring
    - Thread-safe operations
    """

    def __init__(self,
                 connection_factory: Callable[[], Any],
                 config: PoolConfig = None):
        self.connection_factory = connection_factory
        self.config = config or PoolConfig()
        self.metrics = PoolMetrics()

        self._pool: List[PooledConnection] = []
        self._lock = threading.Lock()
        self._not_empty = threading.Condition(self._lock)

        self._closed = False
        self._maintenance_thread: Optional[threading.Thread] = None

        # Initialize minimum connections
        self._initialize_pool()
        self._start_maintenance()

    def _initialize_pool(self):
        """Create minimum connections on startup."""
        for _ in range(self.config.min_connections):
            try:
                conn = self._create_connection()
                self._pool.append(conn)
            except Exception as e:
                logger.error(f"Failed to create initial connection: {e}")

    def _create_connection(self) -> PooledConnection:
        """Create a new pooled connection."""
        raw_conn = self.connection_factory()
        return PooledConnection(connection=raw_conn)

    def _validate_connection(self, pooled_conn: PooledConnection) -> bool:
        """Validate that connection is still usable."""
        try:
            cursor = pooled_conn.connection.cursor()
            cursor.execute(self.config.validation_query)
            cursor.fetchone()
            cursor.close()
            pooled_conn.last_validated_at = time.time()
            self.metrics.total_validations += 1
            return True
        except Exception as e:
            logger.warning(f"Connection validation failed: {e}")
            return False

    def _close_connection(self, pooled_conn: PooledConnection):
        """Close and cleanup a connection."""
        try:
            pooled_conn.connection.close()
        except Exception as e:
            logger.warning(f"Error closing connection: {e}")
        self.metrics.total_evictions += 1

    def get_connection(self, timeout: float = None) -> Any:
        """
        Get a connection from the pool.

        Args:
            timeout: Max seconds to wait. None uses config default.

        Returns:
            A database connection.

        Raises:
            TimeoutError: If no connection available within timeout.
        """
        if self._closed:
            raise RuntimeError("Pool is closed")

        timeout = timeout or self.config.connection_timeout_seconds
        deadline = time.time() + timeout

        with self._not_empty:
            while True:
                # Try to find an idle connection
                for pooled_conn in self._pool:
                    if not pooled_conn.in_use:
                        # Check if connection is still valid
                        if pooled_conn.is_expired(self.config.max_lifetime_seconds):
                            self._close_connection(pooled_conn)
                            self._pool.remove(pooled_conn)
                            continue

                        if pooled_conn.needs_validation(
                            self.config.validation_interval_seconds
                        ):
                            if not self._validate_connection(pooled_conn):
                                self._close_connection(pooled_conn)
                                self._pool.remove(pooled_conn)
                                continue

                        # Connection is good, mark as in-use
                        pooled_conn.in_use = True
                        pooled_conn.last_used_at = time.time()
                        self.metrics.total_checkouts += 1
                        self._update_metrics()
                        return pooled_conn.connection

                # No idle connection, can we create one?
                if len(self._pool) < self.config.max_connections:
                    try:
                        new_conn = self._create_connection()
                        new_conn.in_use = True
                        self._pool.append(new_conn)
                        self.metrics.total_checkouts += 1
                        self._update_metrics()
                        return new_conn.connection
                    except Exception as e:
                        logger.error(f"Failed to create connection: {e}")

                # Must wait for a connection
                remaining = deadline - time.time()
                if remaining <= 0:
                    self.metrics.total_timeouts += 1
                    raise TimeoutError(
                        f"Could not get connection within {timeout}s"
                    )

                self.metrics.waiting_threads += 1
                try:
                    self._not_empty.wait(timeout=remaining)
                finally:
                    self.metrics.waiting_threads -= 1

    def return_connection(self, connection: Any, is_healthy: bool = True):
        """Return a connection to the pool."""
        with self._not_empty:
            for pooled_conn in self._pool:
                if pooled_conn.connection is connection:
                    if is_healthy:
                        pooled_conn.in_use = False
                        pooled_conn.last_used_at = time.time()
                    else:
                        # Connection is broken, remove it
                        self._close_connection(pooled_conn)
                        self._pool.remove(pooled_conn)

                    self._update_metrics()
                    self._not_empty.notify()
                    return

            # Connection not from this pool (should not happen)
            logger.warning("Returned connection not from this pool")

    @contextmanager
    def connection(self):
        """Context manager for connection checkout/return."""
        conn = None
        is_healthy = True
        try:
            conn = self.get_connection()
            yield conn
        except Exception as e:
            is_healthy = False
            raise
        finally:
            if conn:
                self.return_connection(conn, is_healthy)

    def _update_metrics(self):
        """Update pool metrics."""
        active = sum(1 for c in self._pool if c.in_use)
        self.metrics.total_connections = len(self._pool)
        self.metrics.active_connections = active
        self.metrics.idle_connections = len(self._pool) - active

    def _start_maintenance(self):
        """Start background maintenance thread."""
        def maintenance_loop():
            while not self._closed:
                time.sleep(60)  # Run every minute
                self._run_maintenance()

        self._maintenance_thread = threading.Thread(
            target=maintenance_loop, daemon=True
        )
        self._maintenance_thread.start()

    def _run_maintenance(self):
        """Evict idle and expired connections."""
        with self._lock:
            to_remove = []
            for pooled_conn in self._pool:
                if pooled_conn.in_use:
                    continue

                # Check expiration
                if pooled_conn.is_expired(self.config.max_lifetime_seconds):
                    to_remove.append(pooled_conn)
                    continue

                # Check idle timeout (but keep minimum)
                idle_count = sum(1 for c in self._pool if not c.in_use)
                if (idle_count > self.config.min_connections and
                    pooled_conn.is_idle_too_long(self.config.idle_timeout_seconds)):
                    to_remove.append(pooled_conn)

            for pooled_conn in to_remove:
                self._close_connection(pooled_conn)
                self._pool.remove(pooled_conn)

            self._update_metrics()

    def get_metrics(self) -> dict:
        """Get current pool metrics."""
        with self._lock:
            self._update_metrics()
            return {
                "total_connections": self.metrics.total_connections,
                "active_connections": self.metrics.active_connections,
                "idle_connections": self.metrics.idle_connections,
                "waiting_threads": self.metrics.waiting_threads,
                "total_checkouts": self.metrics.total_checkouts,
                "total_timeouts": self.metrics.total_timeouts,
                "total_validations": self.metrics.total_validations,
                "total_evictions": self.metrics.total_evictions,
                "pool_utilization": (
                    self.metrics.active_connections / self.config.max_connections
                    if self.config.max_connections > 0 else 0
                ),
            }

    def close(self):
        """Close all connections and shutdown pool."""
        self._closed = True
        with self._lock:
            for pooled_conn in self._pool:
                self._close_connection(pooled_conn)
            self._pool.clear()


# ============ Usage Examples ============

def create_postgres_pool():
    """Create a PostgreSQL connection pool."""
    def connection_factory():
        return psycopg2.connect(
            host="localhost",
            port=5432,
            database="mydb",
            user="myuser",
            password="mypassword",
            connect_timeout=10,
        )

    pool = ConnectionPool(
        connection_factory=connection_factory,
        config=PoolConfig(
            min_connections=2,
            max_connections=10,
            connection_timeout_seconds=5.0,
            idle_timeout_seconds=300.0,  # 5 minutes
            max_lifetime_seconds=1800.0,  # 30 minutes
        )
    )
    return pool


# Usage with context manager
pool = create_postgres_pool()

with pool.connection() as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()

# Connection automatically returned to pool


# Manual usage (not recommended)
conn = pool.get_connection()
try:
    # Use connection
    pass
finally:
    pool.return_connection(conn)
```

### Go - Production Connection Pool

```go
package pool

import (
	"context"
	"database/sql"
	"errors"
	"sync"
	"time"

	_ "github.com/lib/pq"
)

var (
	ErrPoolClosed  = errors.New("pool is closed")
	ErrPoolTimeout = errors.New("connection pool timeout")
)

// Config holds pool configuration
type Config struct {
	MinConnections       int
	MaxConnections       int
	ConnectionTimeout    time.Duration
	IdleTimeout          time.Duration
	MaxLifetime          time.Duration
	ValidationInterval   time.Duration
	ValidationQuery      string
}

// DefaultConfig returns sensible defaults
func DefaultConfig() Config {
	return Config{
		MinConnections:       2,
		MaxConnections:       10,
		ConnectionTimeout:    30 * time.Second,
		IdleTimeout:          10 * time.Minute,
		MaxLifetime:          30 * time.Minute,
		ValidationInterval:   30 * time.Second,
		ValidationQuery:      "SELECT 1",
	}
}

// PooledConn wraps a database connection
type PooledConn struct {
	conn          *sql.Conn
	createdAt     time.Time
	lastUsedAt    time.Time
	lastValidated time.Time
	inUse         bool
}

// Metrics holds pool metrics
type Metrics struct {
	TotalConnections int64
	ActiveConns      int64
	IdleConns        int64
	WaitingCount     int64
	TotalCheckouts   int64
	TotalTimeouts    int64
	TotalEvictions   int64
}

// Pool implements a connection pool
type Pool struct {
	db      *sql.DB
	config  Config
	metrics Metrics

	pool   []*PooledConn
	mu     sync.Mutex
	cond   *sync.Cond
	closed bool
}

// New creates a new connection pool
func New(dsn string, config Config) (*Pool, error) {
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, err
	}

	// Configure underlying sql.DB pool
	db.SetMaxOpenConns(config.MaxConnections)
	db.SetMaxIdleConns(config.MinConnections)
	db.SetConnMaxLifetime(config.MaxLifetime)
	db.SetConnMaxIdleTime(config.IdleTimeout)

	p := &Pool{
		db:     db,
		config: config,
		pool:   make([]*PooledConn, 0, config.MaxConnections),
	}
	p.cond = sync.NewCond(&p.mu)

	// Initialize minimum connections
	if err := p.initialize(); err != nil {
		return nil, err
	}

	// Start maintenance goroutine
	go p.maintenance()

	return p, nil
}

func (p *Pool) initialize() error {
	ctx := context.Background()
	for i := 0; i < p.config.MinConnections; i++ {
		conn, err := p.createConnection(ctx)
		if err != nil {
			return err
		}
		p.pool = append(p.pool, conn)
	}
	return nil
}

func (p *Pool) createConnection(ctx context.Context) (*PooledConn, error) {
	conn, err := p.db.Conn(ctx)
	if err != nil {
		return nil, err
	}

	return &PooledConn{
		conn:          conn,
		createdAt:     time.Now(),
		lastUsedAt:    time.Now(),
		lastValidated: time.Now(),
		inUse:         false,
	}, nil
}

func (p *Pool) validateConnection(ctx context.Context, pc *PooledConn) bool {
	err := pc.conn.PingContext(ctx)
	if err != nil {
		return false
	}
	pc.lastValidated = time.Now()
	return true
}

// Get acquires a connection from the pool
func (p *Pool) Get(ctx context.Context) (*sql.Conn, error) {
	p.mu.Lock()
	defer p.mu.Unlock()

	if p.closed {
		return nil, ErrPoolClosed
	}

	deadline, hasDeadline := ctx.Deadline()
	if !hasDeadline {
		deadline = time.Now().Add(p.config.ConnectionTimeout)
	}

	for {
		// Check context
		select {
		case <-ctx.Done():
			p.metrics.TotalTimeouts++
			return nil, ctx.Err()
		default:
		}

		// Try to find idle connection
		for i, pc := range p.pool {
			if pc.inUse {
				continue
			}

			// Check expiration
			if time.Since(pc.createdAt) > p.config.MaxLifetime {
				p.evictConnection(i)
				continue
			}

			// Validate if needed
			if time.Since(pc.lastValidated) > p.config.ValidationInterval {
				if !p.validateConnection(ctx, pc) {
					p.evictConnection(i)
					continue
				}
			}

			pc.inUse = true
			pc.lastUsedAt = time.Now()
			p.metrics.TotalCheckouts++
			p.updateMetrics()
			return pc.conn, nil
		}

		// Can we create a new connection?
		if len(p.pool) < p.config.MaxConnections {
			conn, err := p.createConnection(ctx)
			if err == nil {
				conn.inUse = true
				p.pool = append(p.pool, conn)
				p.metrics.TotalCheckouts++
				p.updateMetrics()
				return conn.conn, nil
			}
		}

		// Wait for connection
		if time.Now().After(deadline) {
			p.metrics.TotalTimeouts++
			return nil, ErrPoolTimeout
		}

		p.metrics.WaitingCount++
		p.cond.Wait()
		p.metrics.WaitingCount--
	}
}

// Put returns a connection to the pool
func (p *Pool) Put(conn *sql.Conn, healthy bool) {
	p.mu.Lock()
	defer p.mu.Unlock()

	for i, pc := range p.pool {
		if pc.conn == conn {
			if healthy {
				pc.inUse = false
				pc.lastUsedAt = time.Now()
			} else {
				p.evictConnection(i)
			}
			p.updateMetrics()
			p.cond.Signal()
			return
		}
	}
}

func (p *Pool) evictConnection(index int) {
	pc := p.pool[index]
	pc.conn.Close()
	p.pool = append(p.pool[:index], p.pool[index+1:]...)
	p.metrics.TotalEvictions++
}

func (p *Pool) updateMetrics() {
	active := int64(0)
	for _, pc := range p.pool {
		if pc.inUse {
			active++
		}
	}
	p.metrics.TotalConnections = int64(len(p.pool))
	p.metrics.ActiveConns = active
	p.metrics.IdleConns = int64(len(p.pool)) - active
}

func (p *Pool) maintenance() {
	ticker := time.NewTicker(time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		p.mu.Lock()
		if p.closed {
			p.mu.Unlock()
			return
		}

		// Evict expired and idle connections
		for i := len(p.pool) - 1; i >= 0; i-- {
			pc := p.pool[i]
			if pc.inUse {
				continue
			}

			shouldEvict := time.Since(pc.createdAt) > p.config.MaxLifetime

			idleCount := 0
			for _, c := range p.pool {
				if !c.inUse {
					idleCount++
				}
			}

			if !shouldEvict && idleCount > p.config.MinConnections {
				shouldEvict = time.Since(pc.lastUsedAt) > p.config.IdleTimeout
			}

			if shouldEvict {
				p.evictConnection(i)
			}
		}

		p.updateMetrics()
		p.mu.Unlock()
	}
}

// GetMetrics returns current pool metrics
func (p *Pool) GetMetrics() Metrics {
	p.mu.Lock()
	defer p.mu.Unlock()
	p.updateMetrics()
	return p.metrics
}

// Close shuts down the pool
func (p *Pool) Close() error {
	p.mu.Lock()
	defer p.mu.Unlock()

	p.closed = true
	for _, pc := range p.pool {
		pc.conn.Close()
	}
	p.pool = nil
	p.cond.Broadcast()

	return p.db.Close()
}
```

---

## HTTP Connection Pooling

### Python - HTTP Pool with Retry

```python
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


def create_http_session(
    max_retries: int = 3,
    backoff_factor: float = 0.5,
    pool_connections: int = 10,
    pool_maxsize: int = 10,
    pool_block: bool = True,
) -> requests.Session:
    """
    Create an HTTP session with connection pooling and retry.

    Args:
        max_retries: Number of retries for failed requests
        backoff_factor: Exponential backoff factor
        pool_connections: Number of connection pools to cache
        pool_maxsize: Maximum connections per pool
        pool_block: Block when pool is full (vs creating new connections)
    """
    session = requests.Session()

    retry_strategy = Retry(
        total=max_retries,
        backoff_factor=backoff_factor,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["HEAD", "GET", "PUT", "DELETE", "OPTIONS", "TRACE"],
    )

    adapter = HTTPAdapter(
        max_retries=retry_strategy,
        pool_connections=pool_connections,
        pool_maxsize=pool_maxsize,
        pool_block=pool_block,
    )

    session.mount("http://", adapter)
    session.mount("https://", adapter)

    return session


# Global session for reuse (important!)
_http_session = None

def get_http_session() -> requests.Session:
    global _http_session
    if _http_session is None:
        _http_session = create_http_session()
    return _http_session


# Usage
def fetch_user(user_id: int) -> dict:
    session = get_http_session()  # Reuse session!
    response = session.get(
        f"https://api.example.com/users/{user_id}",
        timeout=10,
    )
    response.raise_for_status()
    return response.json()
```

### Go - HTTP Client with Connection Pool

```go
package main

import (
	"context"
	"net"
	"net/http"
	"time"
)

// CreateHTTPClient creates an HTTP client with optimized connection pooling
func CreateHTTPClient() *http.Client {
	transport := &http.Transport{
		// Connection pool settings
		MaxIdleConns:        100,              // Total max idle connections
		MaxIdleConnsPerHost: 10,               // Max idle connections per host
		MaxConnsPerHost:     100,              // Max total connections per host
		IdleConnTimeout:     90 * time.Second, // How long to keep idle conns

		// Timeouts
		DialContext: (&net.Dialer{
			Timeout:   30 * time.Second, // Connection timeout
			KeepAlive: 30 * time.Second, // TCP keep-alive
		}).DialContext,
		TLSHandshakeTimeout:   10 * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
		ResponseHeaderTimeout: 30 * time.Second,

		// Performance
		DisableCompression: false,
		ForceAttemptHTTP2:  true,
	}

	return &http.Client{
		Transport: transport,
		Timeout:   60 * time.Second, // Overall request timeout
	}
}

// Global client (create once, reuse everywhere)
var httpClient = CreateHTTPClient()

// Usage
func fetchUser(ctx context.Context, userID int) (*User, error) {
	req, err := http.NewRequestWithContext(
		ctx,
		"GET",
		fmt.Sprintf("https://api.example.com/users/%d", userID),
		nil,
	)
	if err != nil {
		return nil, err
	}

	resp, err := httpClient.Do(req)  // Uses connection pool!
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var user User
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return nil, err
	}

	return &user, nil
}
```

---

## Production War Stories

### War Story 1: The "Pool" That Wasn't

**The Scenario**:
A Python application using SQLAlchemy reported connection issues under load. They had configured a pool of 20 connections.

**What Happened**:
```python
# The problematic code
def get_user(user_id):
    engine = create_engine(DATABASE_URL, pool_size=20)  # NEW ENGINE EVERY CALL!
    with engine.connect() as conn:
        return conn.execute(query)
```

Each function call created a NEW engine with its own pool. Under load, they had thousands of connections.

**The Fix**:
```python
# Singleton engine
_engine = None

def get_engine():
    global _engine
    if _engine is None:
        _engine = create_engine(
            DATABASE_URL,
            pool_size=5,
            max_overflow=10,
            pool_pre_ping=True,
        )
    return _engine

def get_user(user_id):
    with get_engine().connect() as conn:
        return conn.execute(query)
```

**20-Year Lesson**: Connection pools must be singletons. Creating a new pool per request defeats the entire purpose.

---

### War Story 2: The Leaky Pool

**The Scenario**:
A service ran fine for hours, then suddenly all requests started timing out. Restarting fixed it temporarily.

**What Happened**:
```python
# Connection leak
def process_order(order_id):
    conn = pool.get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM orders WHERE id = %s", (order_id,))
        if not cursor.fetchone():
            return None  # CONNECTION NEVER RETURNED!

        # Process order...
        cursor.close()
        pool.return_connection(conn)
```

The early return path didn't return the connection. Under load, connections leaked until the pool was exhausted.

**The Fix**:
```python
def process_order(order_id):
    with pool.connection() as conn:  # Context manager guarantees return
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT * FROM orders WHERE id = %s", (order_id,))
            row = cursor.fetchone()
            if not row:
                return None  # Connection still returned!
            # Process order...
            return result
        finally:
            cursor.close()
```

**20-Year Lesson**: ALWAYS use context managers for connections. Manual get/return is a leak waiting to happen.

---

### War Story 3: The Stale Connection

**The Scenario**:
Intermittent "connection reset" errors, usually after quiet periods (nights, weekends).

**What Happened**:
1. Connection pooled and idle
2. Network firewall times out idle TCP connections after 10 minutes
3. Connection still in pool (looks valid)
4. Application tries to use "dead" connection
5. TCP reset error

**The Fix**:
```python
pool_config = PoolConfig(
    # Validate connections before use
    validation_interval_seconds=30,
    validation_query="SELECT 1",

    # Evict connections that are idle too long
    idle_timeout_seconds=300,  # Less than firewall timeout

    # Force new connections periodically
    max_lifetime_seconds=1800,
)
```

**20-Year Lesson**: Network infrastructure can kill connections without telling you. Always validate before use and evict idle connections.

---

### War Story 4: The Pool Contention

**The Scenario**:
Database CPU at 20%, application response times through the roof.

**What Happened**:
1. Pool size = 100 (because "more is better")
2. 100 queries running simultaneously
3. Database had 8 cores
4. Massive context switching overhead
5. Each query took 10x longer due to contention

**The Fix**:
```python
# Before: pool_size=100 (terrible)
# After: pool_size=17 (optimal for 8-core DB)

# HikariCP formula: connections = (cores * 2) + 1
optimal_pool_size = (8 * 2) + 1  # 17 connections

pool_config = PoolConfig(
    max_connections=optimal_pool_size,
    connection_timeout_seconds=5,  # Fast fail if overloaded
)
```

Result: Throughput increased 5x with a SMALLER pool.

**20-Year Lesson**: Pool sizing is counterintuitive. Measure, don't guess. Start small, increase only with evidence.

---

## Monitoring & Alerting

### Key Metrics to Track

```python
class PoolMonitor:
    """Export pool metrics to monitoring system."""

    def __init__(self, pool: ConnectionPool, name: str):
        self.pool = pool
        self.name = name

    def get_metrics(self) -> dict:
        metrics = self.pool.get_metrics()

        return {
            # Pool utilization (should stay < 80%)
            f"pool_utilization{{name=\"{self.name}\"}}":
                metrics["pool_utilization"],

            # Connection counts
            f"pool_connections_total{{name=\"{self.name}\"}}":
                metrics["total_connections"],
            f"pool_connections_active{{name=\"{self.name}\"}}":
                metrics["active_connections"],
            f"pool_connections_idle{{name=\"{self.name}\"}}":
                metrics["idle_connections"],

            # Wait queue (should be 0)
            f"pool_waiting_threads{{name=\"{self.name}\"}}":
                metrics["waiting_threads"],

            # Error rates
            f"pool_timeouts_total{{name=\"{self.name}\"}}":
                metrics["total_timeouts"],
            f"pool_evictions_total{{name=\"{self.name}\"}}":
                metrics["total_evictions"],
        }


# Alert rules (pseudo-config)
ALERT_RULES = """
- alert: PoolHighUtilization
  expr: pool_utilization > 0.8
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "Connection pool {{ $labels.name }} at {{ $value | humanizePercentage }} utilization"

- alert: PoolExhausted
  expr: pool_utilization >= 1.0
  for: 1m
  labels:
    severity: critical
  annotations:
    summary: "Connection pool {{ $labels.name }} is exhausted"

- alert: PoolWaitingThreads
  expr: pool_waiting_threads > 0
  for: 2m
  labels:
    severity: warning
  annotations:
    summary: "{{ $value }} threads waiting for connections in {{ $labels.name }}"

- alert: PoolHighTimeouts
  expr: rate(pool_timeouts_total[5m]) > 0.1
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "High timeout rate on pool {{ $labels.name }}"
"""
```

---

## Expert Configuration Guide

### Database Connection Pool Sizing by Workload

| Workload Type | Pool Size | Timeout | Idle Timeout | Rationale |
|---------------|-----------|---------|--------------|-----------|
| OLTP (fast queries) | cores * 2 + 1 | 5s | 5min | Low contention, fast turnover |
| OLAP (slow queries) | cores * 2 | 60s | 10min | Long queries need patience |
| Mixed | cores * 3 | 15s | 5min | Balance between types |
| Batch processing | cores | 120s | 30min | Sequential, patient |
| Web application | cores * 2 + 1 | 3s | 2min | Fast fail, user waiting |

### HTTP Connection Pool Sizing

```python
# For calling a single external service
HTTP_POOL_CONFIG = {
    "pool_connections": 10,    # Number of connection pools
    "pool_maxsize": 20,        # Max connections per host
    "pool_block": True,        # Block vs create new when full
}

# Why these numbers?
# - Most APIs can handle 10-20 concurrent connections per client
# - More connections can trigger rate limiting
# - Blocking prevents connection explosion under load
```

---

## Expert FAQs

### Q: Should I use one pool per database or one pool per service?

**A**: One pool per database connection string:
```python
pools = {
    "primary": create_pool("postgresql://primary/db"),
    "replica": create_pool("postgresql://replica/db"),
    "analytics": create_pool("postgresql://analytics/db"),
}

def read_user(user_id):
    with pools["replica"].connection() as conn:  # Use replica for reads
        return query_user(conn, user_id)

def write_user(user):
    with pools["primary"].connection() as conn:  # Use primary for writes
        return insert_user(conn, user)
```

### Q: How do I handle pool exhaustion gracefully?

**A**: Circuit breaker + queue + fallback:
```python
class ResilientPool:
    def __init__(self, pool: ConnectionPool):
        self.pool = pool
        self.circuit_breaker = CircuitBreaker("db-pool")
        self.request_queue = Queue(maxsize=100)

    def execute(self, query_func, *args, **kwargs):
        # Check circuit breaker first
        if not self.circuit_breaker.allow_request():
            return self._fallback(*args, **kwargs)

        try:
            with self.pool.connection() as conn:
                return query_func(conn, *args, **kwargs)
        except TimeoutError:
            self.circuit_breaker.record_failure(0)
            return self._fallback(*args, **kwargs)

    def _fallback(self, *args, **kwargs):
        # Return cached data, queue for later, or graceful error
        pass
```

### Q: What's the difference between connection timeout and query timeout?

**A**: Different timeouts for different things:
```python
pool_config = PoolConfig(
    connection_timeout_seconds=5,  # Max wait for pool checkout
)

# Query timeout is separate
def execute_query(conn, query, params, timeout=30):
    with conn.cursor() as cursor:
        cursor.execute(f"SET statement_timeout = {timeout * 1000}")  # ms
        cursor.execute(query, params)
        return cursor.fetchall()
```

### Q: How do I share a pool across multiple threads/processes?

**A**:
- **Threads**: Pools are thread-safe by design. Share the same pool instance.
- **Processes**: Each process needs its own pool (can't share connections across processes).

```python
# Multi-process application (e.g., Gunicorn with workers)
# Each worker process creates its own pool

from multiprocessing import current_process

_pools = {}

def get_pool():
    pid = current_process().pid
    if pid not in _pools:
        _pools[pid] = create_pool()
    return _pools[pid]
```

---

## Related Topics

- [Database Sharding](/topic/system-design/database-sharding)
- [Load Balancing](/topic/system-design/load-balancing)
- [Circuit Breaker](/topic/system-design/circuit-breaker)
- [Microservices](/topic/system-design/microservices)
