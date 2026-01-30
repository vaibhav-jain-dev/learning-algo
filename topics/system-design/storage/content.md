# Storage

## Overview

Storage is the foundation of every software system - it determines how your data is organized, accessed, and protected. The choice of storage technology affects your system's performance, scalability, cost, and reliability. Understanding storage options is essential for making informed architectural decisions.

Think of storage like different types of containers for your belongings: a filing cabinet (relational database), a warehouse with labeled bins (key-value store), or a library with books organized by subject (document store). Each serves different purposes and access patterns.

---

## Why This Matters

### Real Company Examples

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Companies and Their Storage Choices</h4>
<div style="display: grid; gap: 16px;">
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e293b; font-weight: 600;">Netflix - Cassandra for Viewing History</div>
<div style="color: #475569; font-size: 14px; margin-top: 8px;">Netflix uses Cassandra to store billions of viewing records. The wide-column store handles their write-heavy workload (every play, pause, seek) while providing fast reads for "Continue Watching" across 230+ million subscribers.</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #10b981;">
<div style="color: #1e293b; font-weight: 600;">Uber - PostgreSQL + Redis Hybrid</div>
<div style="color: #475569; font-size: 14px; margin-top: 8px;">Uber uses PostgreSQL for transactional data (rides, payments) requiring ACID compliance, and Redis for real-time driver location caching. The hybrid approach balances consistency needs with low-latency requirements.</div>
</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
<div style="color: #1e293b; font-weight: 600;">Airbnb - S3 for Images + Elasticsearch for Search</div>
<div style="color: #475569; font-size: 14px; margin-top: 8px;">Airbnb stores millions of property images in S3 (object storage) for cost and scalability, while using Elasticsearch for fast full-text search across listings with complex filters and geo-queries.</div>
</div>
</div>
</div>

**Key Storage Decisions:**
- **Performance vs Cost**: SSDs are faster but costlier than HDDs
- **Consistency vs Availability**: CAP theorem trade-offs
- **Scalability**: Vertical (bigger machine) vs horizontal (more machines)
- **Query patterns**: Read-heavy vs write-heavy workloads
- **Data structure**: Structured (SQL) vs semi-structured (JSON) vs unstructured (files)

---

## How It Works

### Storage Hierarchy

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Memory and Storage Pyramid</h4>

<div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
<div style="background: #ef4444; color: white; padding: 12px 24px; border-radius: 8px; width: 150px; text-align: center;">
<div style="font-weight: 600;">CPU Cache</div>
<div style="font-size: 12px;">~1ns | KB | $$$$</div>
</div>
<div style="background: #f59e0b; color: white; padding: 12px 24px; border-radius: 8px; width: 200px; text-align: center;">
<div style="font-weight: 600;">RAM</div>
<div style="font-size: 12px;">~100ns | GB | $$$</div>
</div>
<div style="background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; width: 250px; text-align: center;">
<div style="font-weight: 600;">SSD</div>
<div style="font-size: 12px;">~100us | TB | $$</div>
</div>
<div style="background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; width: 300px; text-align: center;">
<div style="font-weight: 600;">HDD</div>
<div style="font-size: 12px;">~10ms | TB | $</div>
</div>
<div style="background: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; width: 350px; text-align: center;">
<div style="font-weight: 600;">Network/Cloud Storage</div>
<div style="font-size: 12px;">10-100ms | PB | Variable</div>
</div>
</div>

<div style="text-align: center; margin-top: 16px; color: #64748b; font-size: 13px;">
    Faster and smaller at top, slower and larger at bottom
</div>
</div>

### Latency Numbers Every Developer Should Know

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Storage Latency Reference</h4>

<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Operation</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Latency</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Notes</th>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b;">L1 cache reference</td>
<td style="padding: 12px; color: #10b981; font-weight: 600;">0.5 ns</td>
<td style="padding: 12px; color: #64748b;">Fastest possible</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b;">L2 cache reference</td>
<td style="padding: 12px; color: #10b981; font-weight: 600;">7 ns</td>
<td style="padding: 12px; color: #64748b;">14x L1</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b;">RAM access</td>
<td style="padding: 12px; color: #f59e0b; font-weight: 600;">100 ns</td>
<td style="padding: 12px; color: #64748b;">In-memory databases</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b;">SSD random read</td>
<td style="padding: 12px; color: #f59e0b; font-weight: 600;">150 us</td>
<td style="padding: 12px; color: #64748b;">1500x RAM</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b;">HDD seek</td>
<td style="padding: 12px; color: #ef4444; font-weight: 600;">10 ms</td>
<td style="padding: 12px; color: #64748b;">Physical movement</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b;">Network same DC</td>
<td style="padding: 12px; color: #ef4444; font-weight: 600;">0.5 ms</td>
<td style="padding: 12px; color: #64748b;">Redis, databases</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b;">Network cross-continent</td>
<td style="padding: 12px; color: #ef4444; font-weight: 600;">150 ms</td>
<td style="padding: 12px; color: #64748b;">Speed of light limit</td>
</tr>
</table>
</div>
</div>

### Storage Types

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Block vs File vs Object Storage</h4>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 16px;">
<div style="color: #1e40af; font-weight: 600; margin-bottom: 8px;">Block Storage</div>
<div style="color: #1e3a8a; font-size: 13px;">
<div style="margin-bottom: 8px;">Fixed-size blocks with IDs</div>
<div style="font-weight: 600;">Best for:</div>
<div>- Databases</div>
<div>- Virtual machines</div>
<div>- High IOPS workloads</div>
<div style="margin-top: 8px; font-size: 12px; color: #3b82f6;">AWS EBS, Azure Disk</div>
</div>
</div>

<div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 16px;">
<div style="color: #065f46; font-weight: 600; margin-bottom: 8px;">File Storage</div>
<div style="color: #047857; font-size: 13px;">
<div style="margin-bottom: 8px;">Hierarchical directory structure</div>
<div style="font-weight: 600;">Best for:</div>
<div>- Shared file access</div>
<div>- Content management</div>
<div>- Home directories</div>
<div style="margin-top: 8px; font-size: 12px; color: #10b981;">AWS EFS, NFS, SMB</div>
</div>
</div>

<div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px;">
<div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Object Storage</div>
<div style="color: #78350f; font-size: 13px;">
<div style="margin-bottom: 8px;">Objects with metadata and keys</div>
<div style="font-weight: 600;">Best for:</div>
<div>- Static assets (images)</div>
<div>- Backups, archives</div>
<div>- Data lakes</div>
<div style="margin-top: 8px; font-size: 12px; color: #f59e0b;">AWS S3, Azure Blob, GCS</div>
</div>
</div>
</div>
</div>

  ---

  ## Database Types

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">When to Use Which Database</h4>

<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Type</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Examples</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Best For</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Trade-offs</th>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Relational (SQL)</td>
<td style="padding: 12px; color: #475569;">PostgreSQL, MySQL</td>
<td style="padding: 12px; color: #475569;">Transactions, complex queries, joins</td>
<td style="padding: 12px; color: #475569;">Harder to scale horizontally</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Document</td>
<td style="padding: 12px; color: #475569;">MongoDB, CouchDB</td>
<td style="padding: 12px; color: #475569;">Flexible schemas, nested data</td>
<td style="padding: 12px; color: #475569;">Weaker transactions</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Key-Value</td>
<td style="padding: 12px; color: #475569;">Redis, DynamoDB</td>
<td style="padding: 12px; color: #475569;">Caching, sessions, simple lookups</td>
<td style="padding: 12px; color: #475569;">No complex queries</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Wide-Column</td>
<td style="padding: 12px; color: #475569;">Cassandra, HBase</td>
<td style="padding: 12px; color: #475569;">Time-series, write-heavy workloads</td>
<td style="padding: 12px; color: #475569;">Limited query flexibility</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Graph</td>
<td style="padding: 12px; color: #475569;">Neo4j, Neptune</td>
<td style="padding: 12px; color: #475569;">Social networks, recommendations</td>
<td style="padding: 12px; color: #475569;">Specialized use cases</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; font-weight: 600;">Search</td>
<td style="padding: 12px; color: #475569;">Elasticsearch, Solr</td>
<td style="padding: 12px; color: #475569;">Full-text search, analytics</td>
<td style="padding: 12px; color: #475569;">Not a primary data store</td>
</tr>
</table>
</div>
</div>

---

## Real-Life Failure Story

### The Instagram Migration (2012)

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">How Instagram Scaled Their Storage</h4>

<div style="background: #fef2f2; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #991b1b; font-weight: 600;">The Challenge</div>
<div style="color: #7f1d1d; font-size: 14px; margin-top: 8px;">
      Instagram grew from 0 to 14 million users in one year with just 3 engineers. Their initial PostgreSQL setup couldn't handle the write load from millions of photo uploads and likes. Database replication lag grew to minutes, and users saw inconsistent data.
</div>
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #1e293b; font-weight: 600;">Original Architecture Problems</div>
<div style="color: #475569; font-size: 14px; margin-top: 8px;">
<div style="padding: 4px 0;">Single PostgreSQL master for all writes</div>
<div style="padding: 4px 0;">Photos stored in filesystem, metadata in DB</div>
<div style="padding: 4px 0;">No caching layer - every read hit the database</div>
<div style="padding: 4px 0;">Vertical scaling limits reached</div>
</div>
</div>

<div style="background: #ecfdf5; border-radius: 8px; padding: 16px;">
<div style="color: #065f46; font-weight: 600;">Solution: Multi-Layer Storage Architecture</div>
<div style="color: #047857; font-size: 14px; margin-top: 8px;">
<div>1. <strong>Photos:</strong> Moved to S3 with CDN (CloudFront)</div>
<div>2. <strong>Caching:</strong> Added Redis for sessions and frequently accessed data</div>
<div>3. <strong>Database:</strong> Sharded PostgreSQL by user ID</div>
<div>4. <strong>Feed:</strong> Precomputed and cached in Redis</div>
<div style="margin-top: 8px; font-weight: 600;">Result: Handled 300M+ users with same small team</div>
</div>
</div>
</div>

  ---

  ## Implementation

  ### Choosing the Right Storage

```python
from dataclasses import dataclass
from enum import Enum
from typing import List, Optional


class DataCharacteristic(Enum):
    """Characteristics that influence storage choice."""
    STRUCTURED = "structured"           # Fixed schema
    SEMI_STRUCTURED = "semi_structured" # JSON, XML
    UNSTRUCTURED = "unstructured"       # Files, images

    READ_HEAVY = "read_heavy"
    WRITE_HEAVY = "write_heavy"
    BALANCED = "balanced"

    TRANSACTIONAL = "transactional"     # ACID required
    EVENTUAL_OK = "eventual_ok"         # Eventual consistency acceptable

    RELATIONAL = "relational"           # Need JOINs
    HIERARCHICAL = "hierarchical"       # Nested data
    GRAPH = "graph"                     # Relationships are key


@dataclass
class StorageRequirements:
    """Capture requirements to recommend storage."""
    data_type: DataCharacteristic
    access_pattern: DataCharacteristic
    consistency: DataCharacteristic
    structure: DataCharacteristic
    estimated_size_gb: float
    queries_per_second: int
    latency_requirement_ms: float


def recommend_storage(requirements: StorageRequirements) -> List[str]:
    """
    Recommend storage solutions based on requirements.

    Returns list of recommended technologies with reasoning.
    """
    recommendations = []

    # Check for transactional requirements
    if requirements.consistency == DataCharacteristic.TRANSACTIONAL:
        if requirements.structure == DataCharacteristic.RELATIONAL:
            recommendations.append(
                "PostgreSQL - ACID compliance with complex queries"
            )
        else:
            recommendations.append(
                "PostgreSQL with JSONB - Transactions + flexible schema"
            )

    # High write throughput needs
    if requirements.access_pattern == DataCharacteristic.WRITE_HEAVY:
        if requirements.estimated_size_gb > 1000:
            recommendations.append(
                "Cassandra - Distributed write-optimized storage"
            )
        else:
            recommendations.append(
                "TimescaleDB - Time-series optimized PostgreSQL"
            )

    # Low latency requirements
    if requirements.latency_requirement_ms < 10:
        recommendations.append(
            "Redis - In-memory caching layer"
        )

    # Large unstructured data
    if requirements.data_type == DataCharacteristic.UNSTRUCTURED:
        recommendations.append(
            "S3/Object Storage - Scalable blob storage"
        )

    # Graph relationships
    if requirements.structure == DataCharacteristic.GRAPH:
        recommendations.append(
            "Neo4j - Native graph database"
        )

    # Semi-structured with flexible queries
    if requirements.data_type == DataCharacteristic.SEMI_STRUCTURED:
        if requirements.consistency == DataCharacteristic.EVENTUAL_OK:
            recommendations.append(
                "MongoDB - Flexible document storage"
            )

    # Default recommendation
    if not recommendations:
        recommendations.append(
            "PostgreSQL - Versatile, well-supported default choice"
        )

    return recommendations


# Usage Example
requirements = StorageRequirements(
    data_type=DataCharacteristic.STRUCTURED,
    access_pattern=DataCharacteristic.READ_HEAVY,
    consistency=DataCharacteristic.TRANSACTIONAL,
    structure=DataCharacteristic.RELATIONAL,
    estimated_size_gb=100,
    queries_per_second=1000,
    latency_requirement_ms=50
)

recommendations = recommend_storage(requirements)
for rec in recommendations:
    print(f"- {rec}")
```

  ### Database Connection Pooling

```python
import contextlib
from typing import Optional
import psycopg2
from psycopg2 import pool
import redis
from dataclasses import dataclass


@dataclass
class PoolConfig:
    """Connection pool configuration."""
    min_connections: int = 5
    max_connections: int = 20
    connection_timeout: float = 30.0


class DatabasePool:
    """
    PostgreSQL connection pool manager.

    Connection pooling is critical for performance:
    - Creating connections is expensive (~10-100ms)
    - Connections consume server memory
    - Too many connections overwhelm the database
    """

    def __init__(self, dsn: str, config: PoolConfig = None):
        self.config = config or PoolConfig()
        self.pool = pool.ThreadedConnectionPool(
            minconn=self.config.min_connections,
            maxconn=self.config.max_connections,
            dsn=dsn
        )

    @contextlib.contextmanager
    def get_connection(self):
        """
        Get a connection from the pool.

        Use as context manager to ensure connection is returned.
        """
        conn = None
        try:
            conn = self.pool.getconn()
            yield conn
            conn.commit()
        except Exception:
            if conn:
                conn.rollback()
            raise
        finally:
            if conn:
                self.pool.putconn(conn)

    def execute(self, query: str, params: tuple = None):
        """Execute a query and return results."""
        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                if cursor.description:
                    return cursor.fetchall()
                return None

    def close(self):
        """Close all connections in the pool."""
        self.pool.closeall()


class CacheLayer:
    """
    Redis caching layer for frequently accessed data.

    Caching reduces database load and improves latency:
    - Redis: ~0.1ms latency
    - PostgreSQL: ~1-10ms latency
    """

    def __init__(self, host: str = 'localhost', port: int = 6379):
        self.redis = redis.Redis(
            host=host,
            port=port,
            decode_responses=True
        )

    def get(self, key: str) -> Optional[str]:
        """Get value from cache."""
        return self.redis.get(key)

    def set(self, key: str, value: str, ttl_seconds: int = 3600):
        """Set value in cache with TTL."""
        self.redis.setex(key, ttl_seconds, value)

    def delete(self, key: str):
        """Delete key from cache."""
        self.redis.delete(key)

    def get_or_compute(self, key: str, compute_fn, ttl_seconds: int = 3600):
        """
        Cache-aside pattern: get from cache or compute and cache.
        """
        value = self.get(key)
        if value is not None:
            return value

        value = compute_fn()
        self.set(key, value, ttl_seconds)
        return value


class DataAccessLayer:
    """
    Combined data access with caching.

    Implements common patterns:
    - Cache-aside for reads
    - Write-through for writes
    """

    def __init__(self, db: DatabasePool, cache: CacheLayer):
        self.db = db
        self.cache = cache

    def get_user(self, user_id: int) -> Optional[dict]:
        """Get user with caching."""
        cache_key = f"user:{user_id}"

        # Try cache first
        cached = self.cache.get(cache_key)
        if cached:
            import json
            return json.loads(cached)

        # Cache miss - query database
        result = self.db.execute(
            "SELECT id, name, email FROM users WHERE id = %s",
            (user_id,)
        )

        if not result:
            return None

        user = {
            'id': result[0][0],
            'name': result[0][1],
            'email': result[0][2]
        }

        # Cache for future requests
        import json
        self.cache.set(cache_key, json.dumps(user), ttl_seconds=300)

        return user

    def update_user(self, user_id: int, name: str, email: str):
        """Update user with cache invalidation."""
        # Update database
        self.db.execute(
            "UPDATE users SET name = %s, email = %s WHERE id = %s",
            (name, email, user_id)
        )

        # Invalidate cache
        cache_key = f"user:{user_id}"
        self.cache.delete(cache_key)
```

  ### Data Sharding Strategy

```python
import hashlib
from typing import List, Any
from abc import ABC, abstractmethod


class ShardingStrategy(ABC):
    """Base class for sharding strategies."""

    @abstractmethod
    def get_shard(self, key: Any) -> int:
        """Determine which shard contains the key."""
        pass


class HashSharding(ShardingStrategy):
    """
    Hash-based sharding for even distribution.

    Pros: Even distribution, simple
    Cons: Resharding is expensive
    """

    def __init__(self, num_shards: int):
        self.num_shards = num_shards

    def get_shard(self, key: Any) -> int:
        key_bytes = str(key).encode()
        hash_value = int(hashlib.md5(key_bytes).hexdigest(), 16)
        return hash_value % self.num_shards


class RangeSharding(ShardingStrategy):
    """
    Range-based sharding for ordered access.

    Pros: Range queries stay on single shard
    Cons: Potential hotspots
    """

    def __init__(self, ranges: List[tuple]):
        # ranges: [(0, 'shard0'), (1000, 'shard1'), (2000, 'shard2')]
        self.ranges = sorted(ranges, key=lambda x: x[0])

    def get_shard(self, key: int) -> int:
        for i, (boundary, _) in enumerate(self.ranges):
            if key < boundary:
                return max(0, i - 1)
        return len(self.ranges) - 1


class ConsistentHashing(ShardingStrategy):
    """
    Consistent hashing for minimal reshuffling.

    When adding/removing nodes, only K/n keys need to move
    (K = total keys, n = number of nodes).
    """

    def __init__(self, nodes: List[str], virtual_nodes: int = 150):
        self.ring = {}
        self.sorted_keys = []
        self.virtual_nodes = virtual_nodes

        for node in nodes:
            self.add_node(node)

    def _hash(self, key: str) -> int:
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def add_node(self, node: str):
        """Add a node with virtual nodes for better distribution."""
        for i in range(self.virtual_nodes):
            virtual_key = f"{node}:{i}"
            hash_value = self._hash(virtual_key)
            self.ring[hash_value] = node
            self.sorted_keys.append(hash_value)

        self.sorted_keys.sort()

    def remove_node(self, node: str):
        """Remove a node and its virtual nodes."""
        for i in range(self.virtual_nodes):
            virtual_key = f"{node}:{i}"
            hash_value = self._hash(virtual_key)
            del self.ring[hash_value]
            self.sorted_keys.remove(hash_value)

    def get_shard(self, key: Any) -> str:
        """Find the node responsible for this key."""
        if not self.ring:
            return None

        hash_value = self._hash(str(key))

        # Find first node with hash >= key hash
        for node_hash in self.sorted_keys:
            if node_hash >= hash_value:
                return self.ring[node_hash]

        # Wrap around to first node
        return self.ring[self.sorted_keys[0]]


class ShardedDatabase:
    """
    Database client with sharding support.
    """

    def __init__(self, shard_connections: dict, strategy: ShardingStrategy):
        self.shards = shard_connections
        self.strategy = strategy

    def get(self, key: Any):
        """Get value from appropriate shard."""
        shard = self.strategy.get_shard(key)
        return self.shards[shard].get(key)

    def set(self, key: Any, value: Any):
        """Set value in appropriate shard."""
        shard = self.strategy.get_shard(key)
        return self.shards[shard].set(key, value)

    def scatter_gather(self, query_fn):
        """
        Execute query on all shards and combine results.

        Use for queries that can't be routed to single shard.
        """
        results = []
        for shard in self.shards.values():
            results.extend(query_fn(shard))
        return results
```

  ---

  ## Interview Questions

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

  ### Q1: How would you design storage for a social media feed?

  **Answer:**

  Use a **hybrid approach**:

  1. **User profiles**: PostgreSQL (ACID for account data)
  2. **Posts content**: PostgreSQL or MongoDB
  3. **Feed**: Precomputed in Redis (fan-out on write)
  4. **Images/Videos**: S3 with CDN
  5. **Search**: Elasticsearch

  Feed generation strategies:
  - **Fan-out on write**: Push to followers' feeds when posting (good for users with few followers)
  - **Fan-out on read**: Compute feed on request (good for celebrity accounts)
  - **Hybrid**: Push for regular users, pull for celebrities

  ### Q2: SQL vs NoSQL - how do you decide?

  **Answer:**

  **Choose SQL when:**
  - Need ACID transactions (financial systems)
  - Complex queries with JOINs
  - Data has clear relationships
  - Schema is well-defined and stable

  **Choose NoSQL when:**
  - Flexible/evolving schema needed
  - Horizontal scaling is priority
  - Simple access patterns (key-value, document)
  - Eventual consistency is acceptable

  **Common pattern:** Start with PostgreSQL, add specialized stores as needed:
  - Redis for caching
  - Elasticsearch for search
  - S3 for files

  ### Q3: How do you handle database scaling?

  **Answer:**

  **Vertical scaling (scale up):**
  - More CPU, RAM, faster SSDs
  - Simple but has limits
  - Good for: Small to medium workloads

  **Horizontal scaling (scale out):**

  1. **Read replicas**: Route reads to replicas, writes to primary
  2. **Sharding**: Partition data across multiple databases
  3. **Caching**: Reduce database load with Redis/Memcached

  **Sharding strategies:**
  - **Hash-based**: Even distribution, hard to range query
  - **Range-based**: Good for time-series, potential hotspots
  - **Directory-based**: Flexible but adds lookup latency

  ### Q4: What is the CAP theorem and how does it affect storage choices?

  **Answer:**

  CAP theorem states you can only have 2 of 3:
  - **Consistency**: All nodes see same data
  - **Availability**: Every request gets a response
  - **Partition tolerance**: System works despite network failures

  **In practice (CP vs AP):**

  | Database | Type | Trade-off |
  |----------|------|-----------|
  | PostgreSQL | CP | Consistency over availability |
  | MongoDB | CP (default) | Consistency, configurable |
  | Cassandra | AP | Availability, eventual consistency |
  | DynamoDB | Configurable | Choose per operation |

  **Real-world:** Most systems need partition tolerance, so the choice is really between consistency and availability.

  ### Q5: How do you design for disaster recovery?

  **Answer:**

  **RPO (Recovery Point Objective)**: How much data can you lose?
  **RTO (Recovery Time Objective)**: How fast must you recover?

  **Strategies by RPO/RTO:**

  | RPO | RTO | Strategy |
  |-----|-----|----------|
  | Days | Hours | Daily backups to S3 |
  | Hours | Minutes | Streaming replication |
  | Minutes | Seconds | Synchronous replication |
  | Zero | Zero | Multi-region active-active |

  **Implementation:**
  1. Regular automated backups
  2. Cross-region replication
  3. Periodic recovery testing
  4. Runbook documentation

</div>

---

## Common Mistakes

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Storage Anti-Patterns</h4>

<div style="display: grid; gap: 12px;">
<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Storing blobs in the database</div>
<div style="color: #7f1d1d; font-size: 14px;">Large files (images, videos) should go in object storage (S3), not in PostgreSQL. Database storage is expensive and slows down queries.</div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Premature sharding</div>
<div style="color: #7f1d1d; font-size: 14px;">Sharding adds complexity (cross-shard queries, distributed transactions). Exhaust vertical scaling and read replicas first. Most apps never need sharding.</div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">No connection pooling</div>
<div style="color: #7f1d1d; font-size: 14px;">Creating new database connections is expensive (10-100ms). Use connection pools (PgBouncer, HikariCP) to reuse connections.</div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Missing indexes on query columns</div>
<div style="color: #7f1d1d; font-size: 14px;">Queries without indexes cause full table scans. Add indexes on columns used in WHERE, JOIN, and ORDER BY clauses.</div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">No backup testing</div>
<div style="color: #7f1d1d; font-size: 14px;">Backups that haven't been tested might not work when needed. Regularly restore backups to verify they're valid and practice recovery procedures.</div>
</div>

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Using database as a queue</div>
<div style="color: #7f1d1d; font-size: 14px;">Polling tables for jobs is inefficient. Use purpose-built queues (Redis, RabbitMQ, SQS) for job processing.</div>
</div>
</div>
</div>

---

## Quick Reference Card

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Storage Selection Cheat Sheet</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">By Use Case</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;"><strong>Transactions:</strong> PostgreSQL</div>
<div style="padding: 4px 0;"><strong>Caching:</strong> Redis</div>
<div style="padding: 4px 0;"><strong>Search:</strong> Elasticsearch</div>
<div style="padding: 4px 0;"><strong>Time-series:</strong> TimescaleDB, InfluxDB</div>
<div style="padding: 4px 0;"><strong>Files:</strong> S3, GCS</div>
<div style="padding: 4px 0;"><strong>Graph:</strong> Neo4j</div>
</div>
</div>

<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Scaling Strategies</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;">1. Add caching layer (Redis)</div>
<div style="padding: 4px 0;">2. Add read replicas</div>
<div style="padding: 4px 0;">3. Vertical scaling (bigger machine)</div>
<div style="padding: 4px 0;">4. Shard by tenant/user ID</div>
<div style="padding: 4px 0;">5. Move to distributed DB</div>
</div>
</div>

<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Performance Checklist</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;">[ ] Connection pooling enabled</div>
<div style="padding: 4px 0;">[ ] Indexes on query columns</div>
<div style="padding: 4px 0;">[ ] Caching for hot data</div>
<div style="padding: 4px 0;">[ ] Query plans analyzed</div>
<div style="padding: 4px 0;">[ ] Monitoring in place</div>
</div>
</div>

<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Reliability Checklist</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;">[ ] Automated backups</div>
<div style="padding: 4px 0;">[ ] Backup restoration tested</div>
<div style="padding: 4px 0;">[ ] Replication configured</div>
<div style="padding: 4px 0;">[ ] Failover tested</div>
<div style="padding: 4px 0;">[ ] Monitoring alerts set</div>
</div>
</div>
</div>
</div>

---

## Related Topics

- [Database Sharding](/topic/system-design/database-sharding) - Horizontal partitioning
- [Caching](/topic/system-design/caching) - Reducing database load
- [CAP Theorem](/topic/system-design/cap-theorem) - Consistency trade-offs
- [Replication](/topic/system-design/replication) - Data durability
