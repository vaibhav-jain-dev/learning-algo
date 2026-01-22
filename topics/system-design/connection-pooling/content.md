# Connection Pooling

## Overview

Connection pooling is a technique that maintains a cache of reusable database or network connections. Instead of creating a new connection for each request (which is expensive), your application borrows a connection from the pool, uses it, and returns it.

Think of it like a **car rental company**: Instead of manufacturing a car for each customer and scrapping it when they're done, you maintain a fleet of cars that customers can rent and return.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Without vs With Connection Pooling</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div>
      <div style="color: #dc2626; font-weight: 600; margin-bottom: 12px;">Without Pooling</div>
      <div style="background: #fef2f2; padding: 16px; border-radius: 8px; border: 1px solid #fecaca; font-size: 14px;">
        <div style="margin-bottom: 8px;"><strong style="color: #1e293b;">For each request:</strong></div>
        <ol style="color: #475569; margin: 0; padding-left: 20px;">
          <li>Create new TCP connection (30-50ms)</li>
          <li>TLS handshake (10-50ms)</li>
          <li>Database authentication (5-20ms)</li>
          <li>Execute query (5ms)</li>
          <li>Close connection (5ms)</li>
        </ol>
        <div style="margin-top: 12px; color: #dc2626; font-weight: 600;">Total: 55-130ms per request!</div>
      </div>
    </div>
    <div>
      <div style="color: #16a34a; font-weight: 600; margin-bottom: 12px;">With Pooling</div>
      <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; border: 1px solid #bbf7d0; font-size: 14px;">
        <div style="margin-bottom: 8px;"><strong style="color: #1e293b;">For each request:</strong></div>
        <ol style="color: #475569; margin: 0; padding-left: 20px;">
          <li>Borrow connection from pool (0.1ms)</li>
          <li>Execute query (5ms)</li>
          <li>Return connection to pool (0.1ms)</li>
        </ol>
        <div style="margin-top: 12px; color: #16a34a; font-weight: 600;">Total: ~5ms per request!</div>
      </div>
    </div>
  </div>
</div>

---

## Why This Matters

### Real Company Examples

**Uber** processes millions of database queries per second. Without connection pooling, they would need to create millions of TCP connections per second, overwhelming their database servers.

**Netflix** uses connection pooling to maintain thousands of connections to their Cassandra clusters. Each connection can handle many queries, enabling their massive scale.

**Stripe** pools connections to their PostgreSQL databases. During payment spikes (like Black Friday), pooling prevents database connection exhaustion.

**Shopify** experienced major outages early on due to connection pool exhaustion. They now use PgBouncer to efficiently pool connections across thousands of application servers.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Connection Creation Cost</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <div style="background: #f1f5f9; padding: 16px; border-radius: 8px;">
      <strong style="color: #1e293b;">Database Connection (PostgreSQL)</strong>
      <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
        <li>TCP handshake: 0.5-50ms</li>
        <li>TLS handshake: 10-50ms</li>
        <li>Authentication: 5-50ms</li>
        <li>Session setup: 2-5ms</li>
      </ul>
      <div style="margin-top: 12px; color: #dc2626; font-size: 13px;">Total: 18-155ms per connection</div>
    </div>
    <div style="background: #f1f5f9; padding: 16px; border-radius: 8px;">
      <strong style="color: #1e293b;">HTTP Connection (with TLS)</strong>
      <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
        <li>DNS lookup: 20-200ms</li>
        <li>TCP handshake: 30ms (1 RTT)</li>
        <li>TLS handshake: 60ms (2 RTTs)</li>
      </ul>
      <div style="margin-top: 12px; color: #dc2626; font-size: 13px;">Total: 110-290ms before first byte!</div>
    </div>
  </div>
</div>

---

## How It Works

### Pool Lifecycle

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Connection Pool States</h4>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>
      <div style="flex: 1; background: #eff6ff; padding: 12px 16px; border-radius: 8px;">
        <strong style="color: #1e293b;">Initialization</strong>
        <span style="color: #475569; font-size: 14px;"> - Create minimum number of connections at startup</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>
      <div style="flex: 1; background: #eff6ff; padding: 12px 16px; border-radius: 8px;">
        <strong style="color: #1e293b;">Checkout</strong>
        <span style="color: #475569; font-size: 14px;"> - Application requests connection, pool provides an idle one</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>
      <div style="flex: 1; background: #eff6ff; padding: 12px 16px; border-radius: 8px;">
        <strong style="color: #1e293b;">In Use</strong>
        <span style="color: #475569; font-size: 14px;"> - Application executes queries on the borrowed connection</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</div>
      <div style="flex: 1; background: #eff6ff; padding: 12px 16px; border-radius: 8px;">
        <strong style="color: #1e293b;">Return</strong>
        <span style="color: #475569; font-size: 14px;"> - Application returns connection to pool for reuse</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">5</div>
      <div style="flex: 1; background: #eff6ff; padding: 12px 16px; border-radius: 8px;">
        <strong style="color: #1e293b;">Maintenance</strong>
        <span style="color: #475569; font-size: 14px;"> - Validate connections, evict stale ones, maintain min/max</span>
      </div>
    </div>
  </div>
</div>

### Pool Sizing: The Counterintuitive Truth

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #92400e; margin-top: 0;">Smaller Pools Are Often Faster</h4>
  <p style="color: #78350f; margin: 0 0 16px 0;">More connections does NOT mean better performance. Here's why:</p>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #16a34a;">Pool Size = 10</strong>
      <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
        <li>4 queries run in parallel (4 CPU cores)</li>
        <li>6 queries wait in queue</li>
        <li>Each query: 10ms</li>
        <li>No context switching overhead</li>
        <li><strong>Throughput: 400 queries/sec</strong></li>
      </ul>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #dc2626;">Pool Size = 200</strong>
      <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
        <li>200 queries competing for 4 cores</li>
        <li>Massive context switching</li>
        <li>Each query: 50ms (5x slower)</li>
        <li>2GB memory for connections</li>
        <li><strong>Throughput: 80 queries/sec</strong></li>
      </ul>
    </div>
  </div>
</div>

### The HikariCP Formula (Production Proven)

```
optimal_connections = (CPU_cores * 2) + effective_spindle_count

For SSD: connections = (CPU_cores * 2) + 1

Example: 8-core database with SSD
connections = (8 * 2) + 1 = 17 connections
```

This formula has been validated by extensive real-world PostgreSQL benchmarking.

---

## Real-Life Failure Story

### The Shopify Black Friday Outage (2014)

**What Happened:** During Black Friday, Shopify's entire platform went down for hours. Merchants couldn't process sales during the biggest shopping day of the year.

**The Timeline:**
1. Traffic spiked 10x normal as Black Friday began
2. Application servers needed more database connections
3. Each server opened maximum allowed connections
4. PostgreSQL hit max_connections limit (typically 100-300)
5. New application server instances launched (auto-scaling)
6. New servers couldn't get database connections
7. Existing connections were held too long waiting for slow queries
8. Connection timeout cascade brought down the entire platform

**Root Cause:** No connection pooler between application and database. Each application server managed its own connections, and they couldn't share.

**How They Fixed It:**
1. **Immediate:** Increased PostgreSQL max_connections (temporary fix)
2. **Short-term:** Deployed PgBouncer as connection pooler
3. **Long-term:**
   - Transaction-mode pooling (connections released after each transaction)
   - Connection limits per application
   - Query timeouts to release stuck connections
   - Sharding to distribute load

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #92400e; margin-top: 0;">The Math That Failed</h4>
  <ul style="color: #78350f; margin: 0; padding-left: 20px;">
    <li>20 application servers x 20 connections each = 400 connections</li>
    <li>PostgreSQL max_connections = 200</li>
    <li>Auto-scaling added 30 more servers</li>
    <li>50 servers x 20 connections = 1000 connections needed</li>
    <li>Result: Complete connection exhaustion</li>
  </ul>
</div>

---

## Implementation

### Python - Production Connection Pool

```python
import time
import threading
import logging
from queue import Queue, Empty
from dataclasses import dataclass, field
from typing import Optional, Callable, Any, List
from contextlib import contextmanager
from enum import Enum

logger = logging.getLogger(__name__)


class ConnectionState(Enum):
    IDLE = "idle"
    IN_USE = "in_use"
    INVALID = "invalid"


@dataclass
class PoolConfig:
    """Connection pool configuration."""
    min_connections: int = 2
    max_connections: int = 10
    connection_timeout: float = 30.0  # Max wait time to get connection
    idle_timeout: float = 600.0  # Close connections idle this long
    max_lifetime: float = 1800.0  # Max age of connection
    validation_interval: float = 30.0  # Validate idle connections
    validation_query: str = "SELECT 1"


@dataclass
class PooledConnection:
    """Wrapper around a database connection with metadata."""
    connection: Any
    created_at: float = field(default_factory=time.time)
    last_used_at: float = field(default_factory=time.time)
    last_validated_at: float = field(default_factory=time.time)
    state: ConnectionState = ConnectionState.IDLE
    use_count: int = 0

    def is_expired(self, max_lifetime: float) -> bool:
        """Check if connection has exceeded max lifetime."""
        return time.time() - self.created_at > max_lifetime

    def is_idle_too_long(self, idle_timeout: float) -> bool:
        """Check if connection has been idle too long."""
        return time.time() - self.last_used_at > idle_timeout

    def needs_validation(self, interval: float) -> bool:
        """Check if connection needs validation."""
        return time.time() - self.last_validated_at > interval


@dataclass
class PoolStats:
    """Pool statistics for monitoring."""
    total_connections: int = 0
    active_connections: int = 0
    idle_connections: int = 0
    pending_requests: int = 0
    total_checkouts: int = 0
    total_timeouts: int = 0
    total_validations: int = 0
    total_creations: int = 0
    total_evictions: int = 0
    avg_checkout_time_ms: float = 0.0


class ConnectionPool:
    """
    Production-grade connection pool.

    Features:
    - Connection validation before use
    - Idle connection eviction
    - Maximum lifetime enforcement
    - Health monitoring
    - Thread-safe operations
    """

    def __init__(self,
                 connection_factory: Callable[[], Any],
                 config: Optional[PoolConfig] = None):
        self.connection_factory = connection_factory
        self.config = config or PoolConfig()

        self._pool: List[PooledConnection] = []
        self._lock = threading.Lock()
        self._available = threading.Condition(self._lock)
        self._closed = False

        self._stats = PoolStats()
        self._checkout_times: List[float] = []

        # Initialize pool
        self._initialize()

        # Start maintenance thread
        self._maintenance_thread = threading.Thread(
            target=self._maintenance_loop,
            daemon=True
        )
        self._maintenance_thread.start()

    def _initialize(self):
        """Create minimum connections at startup."""
        for _ in range(self.config.min_connections):
            try:
                conn = self._create_connection()
                self._pool.append(conn)
            except Exception as e:
                logger.error(f"Failed to create initial connection: {e}")

    def _create_connection(self) -> PooledConnection:
        """Create a new pooled connection."""
        raw_conn = self.connection_factory()
        self._stats.total_creations += 1
        return PooledConnection(connection=raw_conn)

    def _validate_connection(self, pooled: PooledConnection) -> bool:
        """Test if connection is still valid."""
        try:
            cursor = pooled.connection.cursor()
            cursor.execute(self.config.validation_query)
            cursor.fetchone()
            cursor.close()
            pooled.last_validated_at = time.time()
            self._stats.total_validations += 1
            return True
        except Exception as e:
            logger.warning(f"Connection validation failed: {e}")
            return False

    def _close_connection(self, pooled: PooledConnection):
        """Close and remove a connection."""
        try:
            pooled.connection.close()
        except Exception as e:
            logger.warning(f"Error closing connection: {e}")
        self._stats.total_evictions += 1

    def get(self, timeout: Optional[float] = None) -> Any:
        """
        Get a connection from the pool.

        Args:
            timeout: Max seconds to wait. Uses config default if None.

        Returns:
            A database connection.

        Raises:
            TimeoutError: If no connection available within timeout.
        """
        if self._closed:
            raise RuntimeError("Pool is closed")

        timeout = timeout or self.config.connection_timeout
        start_time = time.time()
        deadline = start_time + timeout

        with self._available:
            while True:
                # Try to find a valid idle connection
                for pooled in self._pool:
                    if pooled.state != ConnectionState.IDLE:
                        continue

                    # Check expiration
                    if pooled.is_expired(self.config.max_lifetime):
                        pooled.state = ConnectionState.INVALID
                        continue

                    # Validate if needed
                    if pooled.needs_validation(self.config.validation_interval):
                        if not self._validate_connection(pooled):
                            pooled.state = ConnectionState.INVALID
                            continue

                    # Found a good connection
                    pooled.state = ConnectionState.IN_USE
                    pooled.last_used_at = time.time()
                    pooled.use_count += 1

                    self._stats.total_checkouts += 1
                    checkout_time = (time.time() - start_time) * 1000
                    self._record_checkout_time(checkout_time)
                    self._update_stats()

                    return pooled.connection

                # Remove invalid connections
                self._pool = [p for p in self._pool
                             if p.state != ConnectionState.INVALID]

                # Can we create a new connection?
                if len(self._pool) < self.config.max_connections:
                    try:
                        new_conn = self._create_connection()
                        new_conn.state = ConnectionState.IN_USE
                        new_conn.use_count = 1
                        self._pool.append(new_conn)

                        self._stats.total_checkouts += 1
                        checkout_time = (time.time() - start_time) * 1000
                        self._record_checkout_time(checkout_time)
                        self._update_stats()

                        return new_conn.connection
                    except Exception as e:
                        logger.error(f"Failed to create connection: {e}")

                # Wait for a connection to become available
                remaining = deadline - time.time()
                if remaining <= 0:
                    self._stats.total_timeouts += 1
                    raise TimeoutError(
                        f"Could not get connection within {timeout}s. "
                        f"Pool size: {len(self._pool)}, "
                        f"Active: {self._stats.active_connections}"
                    )

                self._stats.pending_requests += 1
                self._available.wait(timeout=remaining)
                self._stats.pending_requests -= 1

    def release(self, connection: Any, is_valid: bool = True):
        """
        Return a connection to the pool.

        Args:
            connection: The connection to return.
            is_valid: Whether the connection is still usable.
        """
        with self._available:
            for pooled in self._pool:
                if pooled.connection is connection:
                    if is_valid:
                        pooled.state = ConnectionState.IDLE
                        pooled.last_used_at = time.time()
                    else:
                        pooled.state = ConnectionState.INVALID

                    self._update_stats()
                    self._available.notify()
                    return

            # Connection not from this pool
            logger.warning("Returned connection not from this pool")

    @contextmanager
    def connection(self):
        """
        Context manager for safe connection checkout/release.

        Usage:
            with pool.connection() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM users")
        """
        conn = None
        is_valid = True
        try:
            conn = self.get()
            yield conn
        except Exception as e:
            is_valid = False
            raise
        finally:
            if conn is not None:
                self.release(conn, is_valid)

    def _record_checkout_time(self, time_ms: float):
        """Record checkout time for statistics."""
        self._checkout_times.append(time_ms)
        # Keep only last 1000 measurements
        if len(self._checkout_times) > 1000:
            self._checkout_times = self._checkout_times[-1000:]

        if self._checkout_times:
            self._stats.avg_checkout_time_ms = (
                sum(self._checkout_times) / len(self._checkout_times)
            )

    def _update_stats(self):
        """Update pool statistics."""
        active = sum(1 for p in self._pool if p.state == ConnectionState.IN_USE)
        idle = sum(1 for p in self._pool if p.state == ConnectionState.IDLE)

        self._stats.total_connections = len(self._pool)
        self._stats.active_connections = active
        self._stats.idle_connections = idle

    def _maintenance_loop(self):
        """Background maintenance: evict idle/expired connections."""
        while not self._closed:
            time.sleep(60)  # Run every minute

            if self._closed:
                break

            with self._lock:
                to_evict = []

                for pooled in self._pool:
                    if pooled.state != ConnectionState.IDLE:
                        continue

                    # Check expiration
                    if pooled.is_expired(self.config.max_lifetime):
                        to_evict.append(pooled)
                        continue

                    # Check idle timeout (but keep minimum)
                    idle_count = sum(1 for p in self._pool
                                   if p.state == ConnectionState.IDLE)
                    if (idle_count > self.config.min_connections and
                        pooled.is_idle_too_long(self.config.idle_timeout)):
                        to_evict.append(pooled)

                for pooled in to_evict:
                    self._close_connection(pooled)
                    self._pool.remove(pooled)

                # Replenish to minimum
                while len(self._pool) < self.config.min_connections:
                    try:
                        conn = self._create_connection()
                        self._pool.append(conn)
                    except Exception as e:
                        logger.error(f"Failed to replenish pool: {e}")
                        break

                self._update_stats()

    def get_stats(self) -> dict:
        """Get current pool statistics."""
        with self._lock:
            self._update_stats()
            return {
                "total_connections": self._stats.total_connections,
                "active_connections": self._stats.active_connections,
                "idle_connections": self._stats.idle_connections,
                "pending_requests": self._stats.pending_requests,
                "total_checkouts": self._stats.total_checkouts,
                "total_timeouts": self._stats.total_timeouts,
                "total_creations": self._stats.total_creations,
                "total_evictions": self._stats.total_evictions,
                "avg_checkout_time_ms": self._stats.avg_checkout_time_ms,
                "utilization": (
                    self._stats.active_connections / self.config.max_connections
                    if self.config.max_connections > 0 else 0
                )
            }

    def close(self):
        """Close all connections and shutdown pool."""
        self._closed = True

        with self._lock:
            for pooled in self._pool:
                try:
                    pooled.connection.close()
                except Exception:
                    pass
            self._pool.clear()
            self._available.notify_all()


# HTTP Connection Pool Example
class HTTPConnectionPool:
    """
    HTTP connection pool using requests Session.

    Reuses TCP connections for multiple HTTP requests.
    """

    def __init__(self,
                 base_url: str,
                 pool_connections: int = 10,
                 pool_maxsize: int = 10,
                 max_retries: int = 3):
        import requests
        from requests.adapters import HTTPAdapter
        from urllib3.util.retry import Retry

        self.base_url = base_url.rstrip('/')

        # Configure retry strategy
        retry_strategy = Retry(
            total=max_retries,
            backoff_factor=0.5,
            status_forcelist=[429, 500, 502, 503, 504],
        )

        # Configure connection pool
        adapter = HTTPAdapter(
            pool_connections=pool_connections,
            pool_maxsize=pool_maxsize,
            max_retries=retry_strategy,
            pool_block=True  # Block when pool exhausted
        )

        self.session = requests.Session()
        self.session.mount("http://", adapter)
        self.session.mount("https://", adapter)

    def get(self, path: str, **kwargs) -> dict:
        """Make GET request using pooled connection."""
        response = self.session.get(f"{self.base_url}{path}", **kwargs)
        response.raise_for_status()
        return response.json()

    def post(self, path: str, data: dict, **kwargs) -> dict:
        """Make POST request using pooled connection."""
        response = self.session.post(f"{self.base_url}{path}", json=data, **kwargs)
        response.raise_for_status()
        return response.json()

    def close(self):
        """Close all connections."""
        self.session.close()


# Usage example
def create_database_pool():
    """Create a PostgreSQL connection pool."""
    import psycopg2

    def connection_factory():
        return psycopg2.connect(
            host="localhost",
            port=5432,
            database="mydb",
            user="myuser",
            password="mypassword",
            connect_timeout=10
        )

    return ConnectionPool(
        connection_factory=connection_factory,
        config=PoolConfig(
            min_connections=2,
            max_connections=10,
            connection_timeout=5.0,
            idle_timeout=300.0,
            max_lifetime=1800.0
        )
    )


# Using the pool
pool = create_database_pool()

# With context manager (recommended)
with pool.connection() as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()
# Connection automatically returned

# Check pool health
stats = pool.get_stats()
print(f"Pool utilization: {stats['utilization']:.1%}")
print(f"Active connections: {stats['active_connections']}")
```

---

## Interview Questions

### Q1: What's the optimal connection pool size?

**Answer:**
Use the HikariCP formula: `connections = (CPU_cores * 2) + effective_spindle_count`

For most modern systems with SSDs: `connections = (cores * 2) + 1`

Example: 8-core database server -> 17 connections

This seems counterintuitively small, but:
- Database can only execute `CPU_cores` queries in parallel
- More connections = more context switching = slower
- Memory overhead per connection (10-30MB)

Start small, increase only with evidence of wait time issues.

### Q2: How do you handle connection leaks?

**Answer:**
1. **Always use context managers**: `with pool.connection() as conn:`
2. **Set connection timeout**: Close connections held too long
3. **Monitoring**: Alert when active connections stay high
4. **Connection tracking**: Log where connections are checked out
5. **Periodic validation**: Test and evict stale connections

Common leak pattern:
```python
# BAD - leak if exception occurs
conn = pool.get()
cursor = conn.cursor()
cursor.execute(query)  # If this throws, connection never returned!

# GOOD - always returns connection
with pool.connection() as conn:
    cursor = conn.cursor()
    cursor.execute(query)
```

### Q3: Connection pool vs Connection multiplexer (like PgBouncer)?

**Answer:**
**Application Pool** (HikariCP, SQLAlchemy):
- Lives in your application
- One pool per application instance
- Good for single application

**External Pooler** (PgBouncer, ProxySQL):
- Separate process/service
- Shared across all application instances
- Essential for microservices/serverless

Use external pooler when:
- Many application instances (100+ servers)
- Serverless functions (Lambda, Cloud Functions)
- Need to share connections across services

### Q4: What causes "too many connections" errors?

**Answer:**
1. **Leaks**: Connections not returned to pool
2. **Pool too large**: Sum of all app pools > database max
3. **Long transactions**: Holding connections during slow operations
4. **Unbounded scaling**: Auto-scaling without connection limits
5. **No pooler**: Each serverless invocation opens new connection

Fix:
```python
# Limit total connections across instances
# If you have 10 app servers, each should have max_connections = 10
# Total: 100 < PostgreSQL default of 100

# Use external pooler for many instances
# PgBouncer: 10,000 client connections -> 100 database connections
```

### Q5: How do you monitor connection pool health?

**Answer:**
Key metrics:
1. **Utilization**: active/max (should be <80%)
2. **Wait time**: How long requests wait for connections
3. **Timeout count**: Requests that couldn't get connections
4. **Connection age**: Identify stale connections
5. **Creation rate**: High rate = possible leaks

Alert thresholds:
- Utilization > 80% for 5 minutes
- Wait time P99 > 100ms
- Any timeouts
- Connection age > max_lifetime

---

## Common Mistakes

<div style="background: #fef2f2; border: 2px solid #fecaca; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #991b1b; margin-top: 0;">Mistakes to Avoid</h4>
  <div style="display: grid; gap: 12px;">
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Creating pool per request</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Pool must be singleton. Creating new pool = creating new connections.</p>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Pool size = max_connections</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Leave headroom for admin connections and other applications.</p>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Holding connections during I/O</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Don't hold connection while calling external APIs or reading files.</p>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">No validation before use</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Network can kill idle connections. Validate before critical operations.</p>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Ignoring connection lifetime</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Connections accumulate state. Recycle them periodically.</p>
    </div>
  </div>
</div>

---

## Quick Reference Card

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Connection Pooling Cheat Sheet</h4>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div>
      <h5 style="color: #334155; margin-bottom: 8px;">Pool Sizing Guide</h5>
      <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
        <li>Formula: (cores * 2) + 1</li>
        <li>8-core DB: 17 connections</li>
        <li>Start small, measure, adjust</li>
        <li>Leave 20% headroom</li>
      </ul>
    </div>
    <div>
      <h5 style="color: #334155; margin-bottom: 8px;">Timeout Guidelines</h5>
      <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
        <li>Checkout timeout: 3-5 seconds</li>
        <li>Idle timeout: 5-10 minutes</li>
        <li>Max lifetime: 30 minutes</li>
        <li>Validation: every 30 seconds</li>
      </ul>
    </div>
  </div>

  <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
    <h5 style="color: #334155; margin-bottom: 8px;">Key Metrics</h5>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; font-size: 13px;">
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px; text-align: center;">
        <strong style="color: #1e293b;">Utilization</strong><br>
        <span style="color: #64748b;">&lt;80%</span>
      </div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px; text-align: center;">
        <strong style="color: #1e293b;">Wait Time</strong><br>
        <span style="color: #64748b;">&lt;10ms P99</span>
      </div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px; text-align: center;">
        <strong style="color: #1e293b;">Timeouts</strong><br>
        <span style="color: #64748b;">0</span>
      </div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px; text-align: center;">
        <strong style="color: #1e293b;">Leaks</strong><br>
        <span style="color: #64748b;">0</span>
      </div>
    </div>
  </div>

  <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
    <h5 style="color: #334155; margin-bottom: 8px;">Popular Poolers</h5>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px;">
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px;">
        <strong style="color: #1e293b;">HikariCP</strong> - Java standard
      </div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px;">
        <strong style="color: #1e293b;">PgBouncer</strong> - PostgreSQL
      </div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px;">
        <strong style="color: #1e293b;">SQLAlchemy</strong> - Python
      </div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px;">
        <strong style="color: #1e293b;">ProxySQL</strong> - MySQL
      </div>
    </div>
  </div>
</div>

---

## Related Topics

- [Database Sharding](/topic/system-design/database-sharding)
- [Load Balancing](/topic/system-design/load-balancing)
- [Circuit Breaker](/topic/design-patterns/circuit-breaker)
- [Database Replication](/topic/system-design/database-replication)
