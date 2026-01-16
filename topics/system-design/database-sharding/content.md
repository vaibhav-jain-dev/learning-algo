# Database Sharding

## Overview

Database sharding is a horizontal scaling technique that partitions data across multiple database instances (shards). Each shard holds a subset of the total data, allowing the system to handle more data and traffic than a single database can manage.

## Key Concepts

### Why Sharding?

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

1. **Horizontal Scalability**: Distribute data across many machines
2. **Improved Performance**: Queries only hit relevant shards
3. **Higher Availability**: Failure of one shard doesn't affect others
4. **Geographic Distribution**: Place data closer to users

</div>

### The Scaling Problem

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                    WHY SINGLE DATABASE DOESN'T SCALE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   VERTICAL SCALING (Scale Up)                                               │
│   ───────────────────────────                                               │
│                                                                             │
│   ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐      │
│   │   Small DB      │ ──► │   Bigger DB     │ ──► │  BIGGEST DB     │      │
│   │   8 CPU         │     │   32 CPU        │     │  128 CPU        │      │
│   │   32 GB RAM     │     │   256 GB RAM    │     │  1 TB RAM       │      │
│   │   1 TB Disk     │     │   10 TB SSD     │     │  100 TB SSD     │      │
│   └─────────────────┘     └─────────────────┘     └─────────────────┘      │
│                                                           │                 │
│                                                    ┌──────▼──────┐          │
│                                                    │   LIMIT!    │          │
│                                                    │  Can't buy  │          │
│                                                    │ bigger box  │          │
│                                                    └─────────────┘          │
│                                                                             │
│   HORIZONTAL SCALING (Scale Out) with Sharding                              │
│   ────────────────────────────────────────────                              │
│                                                                             │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     ┌──────────┐     │
│   │ Shard 1  │ │ Shard 2  │ │ Shard 3  │ │ Shard 4  │ ... │ Shard N  │     │
│   │ Users    │ │ Users    │ │ Users    │ │ Users    │     │ Users    │     │
│   │ 1-1M     │ │ 1M-2M    │ │ 2M-3M    │ │ 3M-4M    │     │ ...      │     │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘     └──────────┘     │
│        │            │            │            │                 │           │
│        └────────────┴────────────┴────────────┴─────────────────┘           │
│                                  │                                          │
│                           NO LIMIT! ∞                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

### Sharding vs Replication

<div style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

| Sharding | Replication |
|----------|-------------|
| Splits data across nodes | Copies same data to multiple nodes |
| Increases write capacity | Increases read capacity |
| Each shard has unique data | All replicas have same data |
| Complex queries across shards | Simple failover |

</div>

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                     SHARDING vs REPLICATION                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   SHARDING (Different Data)              REPLICATION (Same Data)            │
│   ─────────────────────────              ──────────────────────             │
│                                                                             │
│   ┌─────────────────────┐               ┌─────────────────────┐             │
│   │   All Users Data    │               │   All Users Data    │             │
│   └─────────────────────┘               └─────────────────────┘             │
│            │                                       │                        │
│    ┌───────┼───────┐                      ┌────────┼────────┐               │
│    ▼       ▼       ▼                      ▼        ▼        ▼               │
│ ┌──────┐┌──────┐┌──────┐              ┌──────┐┌──────┐┌──────┐              │
│ │Shard1││Shard2││Shard3│              │Copy 1││Copy 2││Copy 3│              │
│ │Users ││Users ││Users │              │ ALL  ││ ALL  ││ ALL  │              │
│ │A-M   ││N-S   ││T-Z   │              │Users ││Users ││Users │              │
│ └──────┘└──────┘└──────┘              └──────┘└──────┘└──────┘              │
│                                                                             │
│   Total capacity: 3x                   Read capacity: 3x                    │
│   Write capacity: 3x                   Write capacity: 1x                   │
│                                        (all writes go to all)               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

## Sharding Strategies

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                      SHARDING STRATEGY COMPARISON                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Strategy          │ Distribution │ Range Queries │ Resharding │ Use Case  │
│  ──────────────────┼──────────────┼───────────────┼────────────┼───────────│
│  Range-Based       │ Uneven       │ Excellent     │ Medium     │ Time data │
│  Hash-Based        │ Even         │ Poor          │ Hard       │ Random    │
│  Consistent Hash   │ Even         │ Poor          │ Easy       │ Dynamic   │
│  Directory-Based   │ Flexible     │ Good          │ Easy       │ Custom    │
│  Geographic        │ By region    │ N/A           │ N/A        │ Multi-DC  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

### 1. Range-Based Sharding

Partition data by ranges of a key value.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                        RANGE-BASED SHARDING                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   user_id = 1,500,000                                                       │
│        │                                                                    │
│        ▼                                                                    │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │                     SHARD ROUTER                                │       │
│   │   if id < 1M      → Shard 1                                     │       │
│   │   if id < 2M      → Shard 2  ◄── This one!                      │       │
│   │   if id < 3M      → Shard 3                                     │       │
│   │   else            → Shard 4                                     │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│        │                                                                    │
│        ▼                                                                    │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                      │
│   │ Shard 1  │ │ Shard 2  │ │ Shard 3  │ │ Shard 4  │                      │
│   │  0-1M    │ │  1M-2M   │ │  2M-3M   │ │  3M+     │                      │
│   │          │ │    ✓     │ │          │ │          │                      │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘                      │
│                                                                             │
│   ⚠️ Problem: Hotspots!                                                     │
│   New users (high IDs) always hit the last shard                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

```python
def get_shard_by_range(user_id):
    if user_id < 1000000:
        return "shard_1"
    elif user_id < 2000000:
        return "shard_2"
    elif user_id < 3000000:
        return "shard_3"
    else:
        return "shard_4"
```

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px;">

**Pros**
- Simple to implement
- Efficient range queries (e.g., "get all users 1-1000")
- Data locality for related records

</div>

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px;">

**Cons**
- Uneven distribution (hotspots)
- Requires rebalancing when shards fill up
- New data hits one shard

</div>

</div>

### 2. Hash-Based Sharding

Use hash function to determine shard.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                         HASH-BASED SHARDING                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   user_id = "user_12345"                                                    │
│        │                                                                    │
│        ▼                                                                    │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │                      HASH FUNCTION                              │       │
│   │   hash("user_12345") = 0x7A3B... = 2,045,678,901               │       │
│   │   shard_index = 2,045,678,901 % 4 = 1                          │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│        │                                                                    │
│        ▼                                                                    │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                      │
│   │ Shard 0  │ │ Shard 1  │ │ Shard 2  │ │ Shard 3  │                      │
│   │ ~25%     │ │ ~25%  ✓  │ │ ~25%     │ │ ~25%     │                      │
│   │ of data  │ │ of data  │ │ of data  │ │ of data  │                      │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘                      │
│                                                                             │
│   ✓ Even distribution across all shards!                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

```python
import hashlib

def get_shard_by_hash(user_id, num_shards):
    hash_value = int(hashlib.md5(str(user_id).encode()).hexdigest(), 16)
    return f"shard_{hash_value % num_shards}"
```

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px;">

**Pros**
- Even distribution of data
- No hotspots
- Simple to implement

</div>

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px;">

**Cons**
- Range queries hit ALL shards
- Resharding moves ~all data
- Adding shards is expensive

</div>

</div>

### 3. Consistent Hashing

Minimizes data movement when adding/removing shards.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CONSISTENT HASHING                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│              The Hash Ring (0 to 2^32)                                      │
│                                                                             │
│                          0°                                                 │
│                          │                                                  │
│                    ●─────┼─────●                                            │
│                 Node A   │   Node B                                         │
│                   ╱      │      ╲                                           │
│                  ╱       │       ╲                                          │
│            270° ●        │        ● 90°                                     │
│               Node D     │     Node C                                       │
│                  ╲       │       ╱                                          │
│                   ╲      │      ╱                                           │
│                    ●─────┼─────●                                            │
│                        180°                                                 │
│                                                                             │
│   Key "user_123" → hash() = 45° → Find next node clockwise → Node B       │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ADDING A NEW NODE (E at 67°):                                            │
│                                                                             │
│   Before:  Keys 45°-90° go to Node B                                       │
│   After:   Keys 45°-67° go to Node E  ← Only these keys move!              │
│            Keys 67°-90° go to Node B                                       │
│                                                                             │
│   Only ~1/N of data moves (not all data like in hash-based!)               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

```python
class ConsistentHashSharding:
    def __init__(self, shards, virtual_nodes=100):
        self.ring = []
        self.shard_map = {}

        for shard in shards:
            for i in range(virtual_nodes):
                hash_val = self._hash(f"{shard}:{i}")
                self.ring.append(hash_val)
                self.shard_map[hash_val] = shard

        self.ring.sort()

    def _hash(self, key):
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def get_shard(self, key):
        if not self.ring:
            return None

        hash_val = self._hash(str(key))

        # Binary search for first node >= hash_val
        for node_hash in self.ring:
            if hash_val <= node_hash:
                return self.shard_map[node_hash]

        return self.shard_map[self.ring[0]]
```

### 4. Directory-Based Sharding

Lookup table maps keys to shards.

```python
class DirectorySharding:
    def __init__(self):
        self.directory = {}  # key -> shard mapping
        self.shards = ["shard_1", "shard_2", "shard_3"]
        self.current_shard_idx = 0

    def get_shard(self, key):
        if key in self.directory:
            return self.directory[key]

        # Assign to shard (round-robin or by capacity)
        shard = self.shards[self.current_shard_idx]
        self.directory[key] = shard
        self.current_shard_idx = (self.current_shard_idx + 1) % len(self.shards)
        return shard
```

**Pros**: Flexible, easy to move data
**Cons**: Directory becomes single point of failure

### 5. Geographic Sharding

Partition by user location.

```python
def get_shard_by_region(user_region):
    region_shards = {
        "us-east": "shard_us_east",
        "us-west": "shard_us_west",
        "eu": "shard_eu",
        "asia": "shard_asia"
    }
    return region_shards.get(user_region, "shard_default")
```

## Shard Key Selection

The shard key is crucial for performance:

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SHARD KEY SELECTION                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   GOOD SHARD KEY: user_id                                                  │
│   ─────────────────────────                                                │
│                                                                             │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                          │
│   │████████ │ │████████ │ │████████ │ │████████ │  ← Even distribution!   │
│   │████████ │ │████████ │ │████████ │ │████████ │                          │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘                          │
│    Shard 1     Shard 2     Shard 3     Shard 4                             │
│                                                                             │
│   BAD SHARD KEY: country                                                   │
│   ──────────────────────                                                   │
│                                                                             │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                          │
│   │████████ │ │██       │ │█        │ │         │  ← Hotspot on US!       │
│   │████████ │ │         │ │         │ │         │                          │
│   │████████ │ │         │ │         │ │         │                          │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘                          │
│    US (90%)   EU (7%)    Asia (2%)   Other (1%)                            │
│                                                                             │
│   BAD SHARD KEY: created_at (time-based)                                   │
│   ──────────────────────────────────────                                   │
│                                                                             │
│   Time:  Day 1      Day 2      Day 3      Day 4                            │
│          ↓          ↓          ↓          ↓                                │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                          │
│   │████████ │ │         │ │         │ │         │                          │
│   │████████ │ │████████ │ │         │ │         │                          │
│   │████████ │ │████████ │ │████████ │ │         │                          │
│   │████████ │ │████████ │ │████████ │ │████████ │  ← All writes here!     │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘                          │
│    Jan 1-7    Jan 8-14   Jan 15-21   Jan 22-28 (current)                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

### Good Shard Key Properties

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

1. **High Cardinality**: Many unique values (user_id: millions, country: ~200)
2. **Even Distribution**: Data spreads evenly across shards
3. **Query Patterns**: Matches how you query (shard by user_id if you query by user)
4. **Immutable**: Shouldn't change (changing shard key = moving data!)

</div>

### Examples

```sql
-- Good: user_id (high cardinality, even distribution)
-- Table: orders
-- Shard key: user_id

-- Bad: country (low cardinality, uneven)
-- 90% of users might be in one country

-- Bad: created_at (time-based hotspot)
-- All new writes go to one shard
```

## Cross-Shard Operations

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ff6b6b;">

⚠️ **Cross-shard operations are expensive!** Design your schema to minimize them. If you frequently need to join data across shards, you may have chosen the wrong shard key.

</div>

### Scatter-Gather Pattern

Query all shards and aggregate results.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SCATTER-GATHER PATTERN                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Query: "SELECT * FROM orders WHERE product='iPhone' ORDER BY date"       │
│   (Can't use shard key - must query all shards!)                           │
│                                                                             │
│                    ┌────────────────────────┐                              │
│                    │      Coordinator       │                              │
│                    └────────────────────────┘                              │
│                              │                                              │
│                    1. SCATTER (parallel)                                   │
│                 ┌────────────┼────────────┐                                │
│                 ▼            ▼            ▼                                │
│           ┌──────────┐ ┌──────────┐ ┌──────────┐                          │
│           │ Shard 1  │ │ Shard 2  │ │ Shard 3  │                          │
│           │ Query... │ │ Query... │ │ Query... │                          │
│           │ 50 rows  │ │ 30 rows  │ │ 70 rows  │                          │
│           └──────────┘ └──────────┘ └──────────┘                          │
│                 │            │            │                                │
│                 └────────────┼────────────┘                                │
│                              │                                              │
│                     2. GATHER (merge)                                      │
│                              ▼                                              │
│                    ┌────────────────────────┐                              │
│                    │   Merge & Sort         │                              │
│                    │   150 total rows       │                              │
│                    │   Sort by date         │                              │
│                    └────────────────────────┘                              │
│                              │                                              │
│                              ▼                                              │
│                         Return to client                                   │
│                                                                             │
│   ⚠️ Latency = slowest shard + merge time                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

```python
async def search_all_shards(query):
    tasks = []
    for shard in shards:
        tasks.append(query_shard(shard, query))

    results = await asyncio.gather(*tasks)
    return merge_results(results)
```

### Distributed Transactions

Two-phase commit for cross-shard consistency.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TWO-PHASE COMMIT (2PC)                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Transaction: Transfer $100 from User A (Shard 1) to User B (Shard 2)    │
│                                                                             │
│                    ┌────────────────────────┐                              │
│                    │     Coordinator        │                              │
│                    └────────────────────────┘                              │
│                              │                                              │
│   ═══════════════════════════════════════════════════════════════════════  │
│   PHASE 1: PREPARE                                                         │
│   ═══════════════════════════════════════════════════════════════════════  │
│                              │                                              │
│            ┌─────────────────┼─────────────────┐                           │
│            ▼                 │                 ▼                           │
│   ┌────────────────┐         │        ┌────────────────┐                  │
│   │   Shard 1      │         │        │   Shard 2      │                  │
│   │   PREPARE      │         │        │   PREPARE      │                  │
│   │   -$100 from A │         │        │   +$100 to B   │                  │
│   │   Lock row     │         │        │   Lock row     │                  │
│   │   → VOTE YES ✓ │         │        │   → VOTE YES ✓ │                  │
│   └────────────────┘         │        └────────────────┘                  │
│            │                 │                 │                           │
│            └─────────────────┼─────────────────┘                           │
│                              │                                              │
│   ═══════════════════════════════════════════════════════════════════════  │
│   PHASE 2: COMMIT (if all voted YES)                                       │
│   ═══════════════════════════════════════════════════════════════════════  │
│                              │                                              │
│            ┌─────────────────┼─────────────────┐                           │
│            ▼                 │                 ▼                           │
│   ┌────────────────┐         │        ┌────────────────┐                  │
│   │   Shard 1      │         │        │   Shard 2      │                  │
│   │   COMMIT       │         │        │   COMMIT       │                  │
│   │   Apply -$100  │         │        │   Apply +$100  │                  │
│   │   Release lock │         │        │   Release lock │                  │
│   │   → ACK ✓      │         │        │   → ACK ✓      │                  │
│   └────────────────┘         │        └────────────────┘                  │
│                              │                                              │
│   ⚠️ If any shard votes NO → ABORT all (rollback)                         │
│   ⚠️ Blocking: If coordinator fails, shards wait forever!                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

```python
class TwoPhaseCommit:
    def execute(self, shards, operations):
        # Phase 1: Prepare
        prepared = []
        for shard, op in zip(shards, operations):
            if shard.prepare(op):
                prepared.append(shard)
            else:
                # Rollback all prepared
                for s in prepared:
                    s.rollback()
                return False

        # Phase 2: Commit
        for shard in prepared:
            shard.commit()
        return True
```

## Implementation Example

### Go - Sharded Database Router

```go
package main

import (
	"crypto/md5"
	"database/sql"
	"encoding/binary"
	"fmt"
	"sync"
)

type ShardRouter struct {
	shards    []*sql.DB
	numShards int
	mu        sync.RWMutex
}

func NewShardRouter(dsns []string) (*ShardRouter, error) {
	router := &ShardRouter{
		shards:    make([]*sql.DB, len(dsns)),
		numShards: len(dsns),
	}

	for i, dsn := range dsns {
		db, err := sql.Open("postgres", dsn)
		if err != nil {
			return nil, err
		}
		router.shards[i] = db
	}

	return router, nil
}

func (r *ShardRouter) GetShard(key string) *sql.DB {
	hash := md5.Sum([]byte(key))
	shardIdx := binary.BigEndian.Uint64(hash[:8]) % uint64(r.numShards)
	return r.shards[shardIdx]
}

func (r *ShardRouter) ExecuteOnShard(key string, query string, args ...interface{}) (*sql.Rows, error) {
	shard := r.GetShard(key)
	return shard.Query(query, args...)
}

func (r *ShardRouter) ExecuteOnAllShards(query string, args ...interface{}) ([][]map[string]interface{}, error) {
	var wg sync.WaitGroup
	results := make([][]map[string]interface{}, r.numShards)
	errors := make([]error, r.numShards)

	for i, shard := range r.shards {
		wg.Add(1)
		go func(idx int, db *sql.DB) {
			defer wg.Done()
			rows, err := db.Query(query, args...)
			if err != nil {
				errors[idx] = err
				return
			}
			defer rows.Close()

			results[idx] = scanRows(rows)
		}(i, shard)
	}

	wg.Wait()

	// Check for errors
	for _, err := range errors {
		if err != nil {
			return nil, err
		}
	}

	return results, nil
}

func scanRows(rows *sql.Rows) []map[string]interface{} {
	columns, _ := rows.Columns()
	var results []map[string]interface{}

	for rows.Next() {
		values := make([]interface{}, len(columns))
		pointers := make([]interface{}, len(columns))
		for i := range values {
			pointers[i] = &values[i]
		}

		rows.Scan(pointers...)

		row := make(map[string]interface{})
		for i, col := range columns {
			row[col] = values[i]
		}
		results = append(results, row)
	}

	return results
}

func main() {
	dsns := []string{
		"postgres://localhost:5432/shard1",
		"postgres://localhost:5433/shard2",
		"postgres://localhost:5434/shard3",
	}

	router, _ := NewShardRouter(dsns)

	// Query specific shard
	userID := "user123"
	shard := router.GetShard(userID)
	fmt.Printf("User %s routes to shard\n", userID)

	// Query all shards
	results, _ := router.ExecuteOnAllShards("SELECT COUNT(*) FROM users")
	fmt.Printf("Results from all shards: %v\n", results)
}
```

### Python - Sharding with SQLAlchemy

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import hashlib

class ShardedDatabase:
    def __init__(self, shard_configs):
        self.shards = {}
        self.shard_names = []

        for name, config in shard_configs.items():
            engine = create_engine(config['url'])
            Session = sessionmaker(bind=engine)
            self.shards[name] = {
                'engine': engine,
                'session': Session
            }
            self.shard_names.append(name)

    def get_shard_key(self, user_id):
        hash_val = int(hashlib.md5(str(user_id).encode()).hexdigest(), 16)
        idx = hash_val % len(self.shard_names)
        return self.shard_names[idx]

    def get_session(self, user_id):
        shard_name = self.get_shard_key(user_id)
        return self.shards[shard_name]['session']()

    def execute_on_all(self, query):
        results = []
        for shard in self.shards.values():
            session = shard['session']()
            try:
                result = session.execute(query)
                results.extend(result.fetchall())
            finally:
                session.close()
        return results


# Usage
db = ShardedDatabase({
    'shard1': {'url': 'postgresql://localhost:5432/shard1'},
    'shard2': {'url': 'postgresql://localhost:5433/shard2'},
})

# Get session for specific user
session = db.get_session(user_id=12345)
user = session.query(User).filter_by(id=12345).first()
```

## Resharding

When you need to add or remove shards:

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ONLINE RESHARDING (Zero Downtime)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Step 1: Add New Shards                                                   │
│   ──────────────────────                                                   │
│   ┌────────┐ ┌────────┐ ┌────────┐         ┌────────┐                     │
│   │Shard 1 │ │Shard 2 │ │Shard 3 │   +     │Shard 4 │  ← New empty shard  │
│   │████████│ │████████│ │████████│         │        │                     │
│   └────────┘ └────────┘ └────────┘         └────────┘                     │
│                                                                             │
│   Step 2: Double-Write (writes go to both old and new location)            │
│   ─────────────────────────────────────────────────────────────            │
│   New Write ─┬──► Shard 2 (old location)                                   │
│              └──► Shard 4 (new location)                                   │
│                                                                             │
│   Step 3: Backfill (copy existing data in background)                      │
│   ────────────────────────────────────────────────────                     │
│   ┌────────┐ ┌────────┐ ┌────────┐         ┌────────┐                     │
│   │████████│ │████░░░░│─────────────────►  │░░░░████│                     │
│   │████████│ │████████│ │████████│         │████████│  ← Backfilling...   │
│   └────────┘ └────────┘ └────────┘         └────────┘                     │
│                                                                             │
│   Step 4: Switch Reads (read from new location)                            │
│   ─────────────────────────────────────────────                            │
│   Read ──► Router ──► Shard 4 (new location)                              │
│                                                                             │
│   Step 5: Remove Double-Write & Cleanup                                    │
│   ─────────────────────────────────────                                    │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                             │
│   │████████│ │████    │ │████████│ │    ████│  ← Data redistributed!     │
│   │████████│ │████████│ │████████│ │████████│                             │
│   └────────┘ └────────┘ └────────┘ └────────┘                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

### Online Resharding Steps

1. **Add new shards** - Provision new database instances
2. **Double-write** - Write to both old and new locations
3. **Backfill** - Copy existing data to new shards
4. **Verify** - Ensure data consistency
5. **Switch reads** - Direct reads to new shards
6. **Remove double-write** - Write only to new locations
7. **Cleanup** - Remove data from old shards

## Common Interview Questions

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **How do you handle joins across shards?**
   - Denormalize data
   - Application-level joins
   - Use reference tables replicated to all shards

2. **How do you maintain auto-increment IDs?**
   - UUID/GUID
   - Centralized ID service (like Twitter's Snowflake)
   - Shard prefix + local sequence

3. **What happens when a shard fails?**
   - Each shard should have replicas
   - Automatic failover to replica
   - Circuit breaker for failed shards

4. **How do you choose the number of shards?**
   - Start with more shards than needed
   - Consider data growth projections
   - Balance between overhead and flexibility

</div>

## Best Practices

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **Choose shard key carefully** - It's hard to change later
2. **Plan for resharding** - Use consistent hashing
3. **Keep shards balanced** - Monitor data distribution
4. **Replicate each shard** - For high availability
5. **Avoid cross-shard transactions** - Design for single-shard operations
6. **Use connection pooling** - Manage connections efficiently

</div>

## Related Topics

- [Database Replication](/topic/system-design/database-replication)
- [CAP Theorem](/topic/system-design/cap-theorem)
- [Consistent Hashing](/topic/system-design/load-balancing)
