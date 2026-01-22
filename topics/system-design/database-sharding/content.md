# Database Sharding

## Overview

**Simple Explanation**: Database sharding is like dividing a huge library into multiple smaller libraries, each holding books for different topics or authors. Instead of one enormous library that becomes impossible to manage, you have several smaller, faster libraries. In databases, sharding splits your data across multiple database servers, where each server (shard) holds a portion of the total data.

The key insight: a single database has limits (disk space, CPU, memory, connections). Sharding breaks through those limits by distributing data horizontally.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">THE SHARDING CONCEPT</div>
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; align-items: center; margin-bottom: 24px;">
    <div style="text-align: center;">
      <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 24px; border: 2px solid #3b82f6;">
        <div style="color: #1e40af; font-weight: 600; font-size: 16px;">100 Million Users</div>
        <div style="color: #3b82f6; font-size: 13px; margin-top: 4px;">Single Database</div>
        <div style="color: #dc2626; font-size: 12px; margin-top: 8px; font-weight: 500;">Struggling!</div>
      </div>
    </div>
    <div style="color: #6366f1; font-size: 28px;">--></div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 12px 20px; border: 1px solid #86efac; text-align: center;">
        <div style="color: #166534; font-weight: 500;">Shard 1</div>
        <div style="color: #22c55e; font-size: 11px;">Users A-G (33M)</div>
      </div>
      <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 12px 20px; border: 1px solid #86efac; text-align: center;">
        <div style="color: #166534; font-weight: 500;">Shard 2</div>
        <div style="color: #22c55e; font-size: 11px;">Users H-P (33M)</div>
      </div>
      <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 12px 20px; border: 1px solid #86efac; text-align: center;">
        <div style="color: #166534; font-weight: 500;">Shard 3</div>
        <div style="color: #22c55e; font-size: 11px;">Users Q-Z (34M)</div>
      </div>
    </div>
  </div>
  <div style="text-align: center; background: rgba(34, 197, 94, 0.15); border-radius: 8px; padding: 12px; border: 1px solid #86efac;">
    <span style="color: #166534;">Each shard handles 1/3 of the load - 3x the capacity!</span>
  </div>
</div>

## Why It Matters: Real Company Examples

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

**Instagram** shards user data by user_id. With 2 billion users, a single database is impossible. They use thousands of PostgreSQL shards, each holding millions of users. When you view a profile, the app routes to the exact shard holding that user.

**Discord** shards messages by guild_id (server). Each Discord server's messages live on a specific shard. This means reading/writing messages for a conversation only touches one database, enabling their 150 million monthly users to chat in real-time.

**Uber** shards trip data geographically. Trips in New York hit different shards than trips in San Francisco. This reduces latency (data is closer to users) and isolates failures (NYC outage doesn't affect SF).

**Slack** shards by workspace. Each company's Slack workspace lives on dedicated shards, providing data isolation and predictable performance regardless of how large other workspaces grow.

</div>

## How It Works

### Sharding vs Replication

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">SHARDING vs REPLICATION</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; border: 1px solid #93c5fd;">
      <div style="color: #1e40af; font-weight: 600; margin-bottom: 12px; text-align: center;">SHARDING (Split Data)</div>
      <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 12px;">
        <div style="background: white; border-radius: 6px; padding: 8px; text-align: center; border: 1px solid #93c5fd;">
          <div style="color: #1e40af; font-size: 12px; font-weight: 500;">Shard 1</div>
          <div style="color: #3b82f6; font-size: 10px;">Users A-M</div>
        </div>
        <div style="background: white; border-radius: 6px; padding: 8px; text-align: center; border: 1px solid #93c5fd;">
          <div style="color: #1e40af; font-size: 12px; font-weight: 500;">Shard 2</div>
          <div style="color: #3b82f6; font-size: 10px;">Users N-Z</div>
        </div>
      </div>
      <div style="color: #1e293b; font-size: 13px; line-height: 1.6;">
        <div>Different data on each node</div>
        <div>Increases write capacity</div>
        <div>Scales horizontally</div>
      </div>
    </div>
    <div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 12px; padding: 20px; border: 1px solid #d8b4fe;">
      <div style="color: #7c3aed; font-weight: 600; margin-bottom: 12px; text-align: center;">REPLICATION (Copy Data)</div>
      <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 12px;">
        <div style="background: white; border-radius: 6px; padding: 8px; text-align: center; border: 1px solid #d8b4fe;">
          <div style="color: #7c3aed; font-size: 12px; font-weight: 500;">Replica 1</div>
          <div style="color: #a78bfa; font-size: 10px;">ALL Users</div>
        </div>
        <div style="background: white; border-radius: 6px; padding: 8px; text-align: center; border: 1px solid #d8b4fe;">
          <div style="color: #7c3aed; font-size: 12px; font-weight: 500;">Replica 2</div>
          <div style="color: #a78bfa; font-size: 10px;">ALL Users</div>
        </div>
      </div>
      <div style="color: #1e293b; font-size: 13px; line-height: 1.6;">
        <div>Same data on each node</div>
        <div>Increases read capacity</div>
        <div>Provides redundancy</div>
      </div>
    </div>
  </div>
  <div style="margin-top: 20px; background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 12px; text-align: center;">
    <span style="color: #4f46e5;">In practice: Sharding + Replication together. Each shard has replicas for HA.</span>
  </div>
</div>

### Sharding Strategies Comparison

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <thead>
        <tr style="border-bottom: 2px solid #cbd5e1;">
          <th style="padding: 12px; text-align: left; color: #1e40af;">Strategy</th>
          <th style="padding: 12px; text-align: center; color: #1e40af;">Distribution</th>
          <th style="padding: 12px; text-align: center; color: #1e40af;">Range Queries</th>
          <th style="padding: 12px; text-align: center; color: #1e40af;">Resharding</th>
          <th style="padding: 12px; text-align: left; color: #1e40af;">Best For</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; color: #1e293b; font-weight: 500;">Range-Based</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #d97706;">Uneven</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a;">Excellent</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #d97706;">Medium</span></td>
          <td style="padding: 12px; color: #64748b;">Time-series, logs</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; color: #1e293b; font-weight: 500;">Hash-Based</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a;">Even</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #dc2626;">Poor</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #dc2626;">Hard</span></td>
          <td style="padding: 12px; color: #64748b;">User data, sessions</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; color: #1e293b; font-weight: 500;">Consistent Hash</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a;">Even</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #dc2626;">Poor</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a;">Easy</span></td>
          <td style="padding: 12px; color: #64748b;">Dynamic clusters</td>
        </tr>
        <tr>
          <td style="padding: 12px; color: #1e293b; font-weight: 500;">Directory-Based</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #3b82f6;">Flexible</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a;">Good</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a;">Easy</span></td>
          <td style="padding: 12px; color: #64748b;">Custom routing</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### 1. Range-Based Sharding

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">RANGE-BASED SHARDING</div>
  <div style="text-align: center; margin-bottom: 16px;">
    <span style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); color: #1e40af; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-family: monospace; border: 1px solid #93c5fd;">user_id = 1,500,000</span>
  </div>
  <div style="text-align: center; color: #6366f1; font-size: 20px; margin-bottom: 16px;">|</div>
  <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
    <div style="color: #3b82f6; font-weight: 600; font-size: 14px; margin-bottom: 12px; text-align: center;">ROUTING LOGIC</div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-family: monospace; font-size: 13px;">
      <div style="color: #64748b;">if id &lt; 1,000,000</div><div style="color: #1e293b;">--> Shard 1</div>
      <div style="color: #64748b;">if id &lt; 2,000,000</div><div style="color: #16a34a; font-weight: 600;">--> Shard 2 (match!)</div>
      <div style="color: #64748b;">if id &lt; 3,000,000</div><div style="color: #1e293b;">--> Shard 3</div>
      <div style="color: #64748b;">else</div><div style="color: #1e293b;">--> Shard 4</div>
    </div>
  </div>
  <div style="text-align: center; color: #6366f1; font-size: 20px; margin-bottom: 16px;">|</div>
  <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
    <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 14px; min-width: 90px; text-align: center; border: 1px solid #cbd5e1;">
      <div style="color: #475569; font-weight: 500;">Shard 1</div>
      <div style="color: #64748b; font-size: 11px;">0-1M</div>
    </div>
    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 10px; padding: 14px; min-width: 90px; text-align: center; border: 2px solid #22c55e;">
      <div style="color: #166534; font-weight: 600;">Shard 2</div>
      <div style="color: #22c55e; font-size: 11px;">1M-2M</div>
    </div>
    <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 14px; min-width: 90px; text-align: center; border: 1px solid #cbd5e1;">
      <div style="color: #475569; font-weight: 500;">Shard 3</div>
      <div style="color: #64748b; font-size: 11px;">2M-3M</div>
    </div>
    <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 14px; min-width: 90px; text-align: center; border: 1px solid #cbd5e1;">
      <div style="color: #475569; font-weight: 500;">Shard 4</div>
      <div style="color: #64748b; font-size: 11px;">3M+</div>
    </div>
  </div>
  <div style="margin-top: 16px; background: rgba(234, 179, 8, 0.15); border-radius: 8px; padding: 12px; text-align: center; border: 1px solid #fcd34d;">
    <span style="color: #92400e; font-weight: 500;">Hotspot Warning:</span>
    <span style="color: #1e293b;"> New users (high IDs) always hit the last shard!</span>
  </div>
</div>

```python
def get_shard_by_range(user_id: int) -> str:
    """Route based on ID ranges."""
    ranges = [
        (0, 1_000_000, "shard_1"),
        (1_000_000, 2_000_000, "shard_2"),
        (2_000_000, 3_000_000, "shard_3"),
    ]

    for start, end, shard in ranges:
        if start <= user_id < end:
            return shard
    return "shard_4"  # Default for overflow
```

### 2. Hash-Based Sharding

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">HASH-BASED SHARDING</div>
  <div style="text-align: center; margin-bottom: 16px;">
    <span style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); color: #1e40af; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-family: monospace; border: 1px solid #93c5fd;">user_id = "user_12345"</span>
  </div>
  <div style="text-align: center; color: #6366f1; font-size: 20px; margin-bottom: 16px;">|</div>
  <div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #d8b4fe;">
    <div style="color: #7c3aed; font-weight: 600; font-size: 14px; margin-bottom: 12px; text-align: center;">HASH FUNCTION</div>
    <div style="font-family: monospace; font-size: 13px; text-align: center; color: #1e293b;">
      <div>hash("user_12345") = <span style="color: #7c3aed;">2,045,678,901</span></div>
      <div style="margin-top: 8px;">shard = 2,045,678,901 % 4 = <span style="color: #16a34a; font-weight: bold;">1</span></div>
    </div>
  </div>
  <div style="text-align: center; color: #6366f1; font-size: 20px; margin-bottom: 16px;">|</div>
  <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
    <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 14px; min-width: 90px; text-align: center; border: 1px solid #cbd5e1;">
      <div style="color: #475569; font-weight: 500;">Shard 0</div>
      <div style="color: #64748b; font-size: 11px;">~25%</div>
    </div>
    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 10px; padding: 14px; min-width: 90px; text-align: center; border: 2px solid #22c55e;">
      <div style="color: #166534; font-weight: 600;">Shard 1</div>
      <div style="color: #22c55e; font-size: 11px;">~25%</div>
    </div>
    <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 14px; min-width: 90px; text-align: center; border: 1px solid #cbd5e1;">
      <div style="color: #475569; font-weight: 500;">Shard 2</div>
      <div style="color: #64748b; font-size: 11px;">~25%</div>
    </div>
    <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 14px; min-width: 90px; text-align: center; border: 1px solid #cbd5e1;">
      <div style="color: #475569; font-weight: 500;">Shard 3</div>
      <div style="color: #64748b; font-size: 11px;">~25%</div>
    </div>
  </div>
  <div style="margin-top: 16px; background: rgba(34, 197, 94, 0.15); border-radius: 8px; padding: 12px; text-align: center; border: 1px solid #86efac;">
    <span style="color: #166534;">Even distribution! But adding shards moves ~all data.</span>
  </div>
</div>

```python
import hashlib

def get_shard_by_hash(user_id: str, num_shards: int) -> str:
    """Hash-based routing for even distribution."""
    hash_val = int(hashlib.md5(str(user_id).encode()).hexdigest(), 16)
    shard_index = hash_val % num_shards
    return f"shard_{shard_index}"

# Problem: When num_shards changes, most keys remap!
# 4 shards: hash % 4 = 1
# 5 shards: hash % 5 = 2  <- Different shard!
```

### 3. Consistent Hashing

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">CONSISTENT HASHING - THE RING</div>
  <div style="text-align: center; color: #64748b; margin-bottom: 20px;">Keys and nodes map to positions on a ring (0 to 2^32)</div>
  <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
    <div style="text-align: center; font-family: monospace; font-size: 13px; color: #1e293b;">
      <div style="margin-bottom: 8px;">Ring: <span style="color: #3b82f6;">[A @ 0deg]</span> ... <span style="color: #16a34a;">[B @ 90deg]</span> ... <span style="color: #7c3aed;">[C @ 180deg]</span> ... <span style="color: #dc2626;">[D @ 270deg]</span></div>
      <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e2e8f0;">
        Key "user_123" hashes to <span style="color: #d97706;">45deg</span> --> Walks clockwise --> Lands on <span style="color: #16a34a; font-weight: 600;">Node B</span>
      </div>
    </div>
  </div>
  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 10px; padding: 16px; margin-bottom: 16px; border: 1px solid #fcd34d;">
    <div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Adding Node E at 67deg:</div>
    <div style="color: #1e293b; font-size: 13px;">
      <div>Before: Keys 45deg-90deg go to B</div>
      <div style="margin-top: 4px;">After: Keys 45deg-67deg go to <span style="color: #16a34a; font-weight: 600;">E</span>, Keys 67deg-90deg stay on B</div>
      <div style="margin-top: 8px; color: #d97706; font-weight: 500;">Only ~1/N of data moves (not all!)</div>
    </div>
  </div>
  <div style="background: rgba(34, 197, 94, 0.15); border-radius: 8px; padding: 12px; text-align: center; border: 1px solid #86efac;">
    <span style="color: #166534;">Minimal data movement when scaling! Used by DynamoDB, Cassandra, Riak.</span>
  </div>
</div>

```python
import hashlib
from bisect import bisect_right

class ConsistentHashRing:
    """Consistent hashing for minimal data movement during scaling."""

    def __init__(self, nodes: list, virtual_nodes: int = 150):
        self.virtual_nodes = virtual_nodes
        self.ring = []  # Sorted list of (hash, node)
        self.hash_to_node = {}

        for node in nodes:
            self.add_node(node)

    def _hash(self, key: str) -> int:
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def add_node(self, node: str):
        """Add node with virtual nodes for better distribution."""
        for i in range(self.virtual_nodes):
            virtual_key = f"{node}:vn{i}"
            hash_val = self._hash(virtual_key)
            self.ring.append(hash_val)
            self.hash_to_node[hash_val] = node
        self.ring.sort()

    def remove_node(self, node: str):
        """Remove node - only its keys will be redistributed."""
        for i in range(self.virtual_nodes):
            virtual_key = f"{node}:vn{i}"
            hash_val = self._hash(virtual_key)
            self.ring.remove(hash_val)
            del self.hash_to_node[hash_val]

    def get_node(self, key: str) -> str:
        """Find the node responsible for this key."""
        if not self.ring:
            return None

        hash_val = self._hash(key)
        idx = bisect_right(self.ring, hash_val)

        # Wrap around if past the end
        if idx == len(self.ring):
            idx = 0

        return self.hash_to_node[self.ring[idx]]


# Usage
ring = ConsistentHashRing(["shard1", "shard2", "shard3"])
print(ring.get_node("user:123"))  # -> shard2

# Add new shard - only ~33% of keys move
ring.add_node("shard4")
```

## Shard Key Selection

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">GOOD vs BAD SHARD KEYS</div>
  <div style="margin-bottom: 24px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <span style="color: #16a34a; font-size: 20px; font-weight: bold;">OK</span>
      <span style="color: #166534; font-weight: 600;">GOOD: user_id (high cardinality)</span>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 80px; height: 40px; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 6px;"></div>
      <div style="flex: 1; min-width: 80px; height: 40px; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 6px;"></div>
      <div style="flex: 1; min-width: 80px; height: 40px; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 6px;"></div>
      <div style="flex: 1; min-width: 80px; height: 40px; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 6px;"></div>
    </div>
    <div style="text-align: center; color: #16a34a; font-size: 12px; margin-top: 8px;">Even distribution across shards</div>
  </div>
  <div style="margin-bottom: 24px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <span style="color: #dc2626; font-size: 20px; font-weight: bold;">X</span>
      <span style="color: #991b1b; font-weight: 600;">BAD: country (low cardinality)</span>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <div style="flex: 3; min-width: 200px; height: 40px; background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
        <span style="color: #991b1b; font-size: 11px;">US - 90%</span>
      </div>
      <div style="flex: 0.3; min-width: 30px; height: 40px; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px;"></div>
      <div style="flex: 0.2; min-width: 20px; height: 40px; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px;"></div>
      <div style="flex: 0.1; min-width: 15px; height: 40px; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px;"></div>
    </div>
    <div style="text-align: center; color: #dc2626; font-size: 12px; margin-top: 8px;">Hotspot! US shard is overloaded</div>
  </div>
  <div>
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <span style="color: #dc2626; font-size: 20px; font-weight: bold;">X</span>
      <span style="color: #991b1b; font-weight: 600;">BAD: created_at (time-based)</span>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 70px; height: 40px; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
        <span style="color: #64748b; font-size: 10px;">Old</span>
      </div>
      <div style="flex: 1; min-width: 70px; height: 40px; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px;"></div>
      <div style="flex: 1; min-width: 70px; height: 40px; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px;"></div>
      <div style="flex: 1; min-width: 70px; height: 40px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 2px solid #f59e0b;">
        <span style="color: #92400e; font-size: 10px;">ALL writes!</span>
      </div>
    </div>
    <div style="text-align: center; color: #d97706; font-size: 12px; margin-top: 8px;">All new data hits one shard</div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">

**Good Shard Key Properties**:
1. **High Cardinality** - Millions of unique values (user_id: good, country: bad)
2. **Even Distribution** - Values spread uniformly (hash of user_id: good, sequential ID: bad)
3. **Query Aligned** - Matches your access patterns (shard by user_id if you query by user)
4. **Immutable** - Never changes (email: bad, user_id: good)

</div>

## Code Examples

### Go - Sharded Database Router

```go
package main

import (
    "context"
    "crypto/sha256"
    "database/sql"
    "encoding/binary"
    "fmt"
    "sort"
    "sync"
)

type ShardRouter struct {
    shards     map[string]*sql.DB
    shardNames []string
    ring       []ringEntry
    mu         sync.RWMutex
}

type ringEntry struct {
    hash  uint64
    shard string
}

func NewShardRouter(configs map[string]string) (*ShardRouter, error) {
    router := &ShardRouter{
        shards:     make(map[string]*sql.DB),
        shardNames: make([]string, 0),
        ring:       make([]ringEntry, 0),
    }

    for name, dsn := range configs {
        db, err := sql.Open("postgres", dsn)
        if err != nil {
            return nil, err
        }
        db.SetMaxOpenConns(25)
        db.SetMaxIdleConns(5)

        router.shards[name] = db
        router.shardNames = append(router.shardNames, name)

        // Add 100 virtual nodes per shard
        for i := 0; i < 100; i++ {
            key := fmt.Sprintf("%s:vn%d", name, i)
            hash := router.hash(key)
            router.ring = append(router.ring, ringEntry{hash, name})
        }
    }

    sort.Slice(router.ring, func(i, j int) bool {
        return router.ring[i].hash < router.ring[j].hash
    })

    return router, nil
}

func (r *ShardRouter) hash(key string) uint64 {
    h := sha256.Sum256([]byte(key))
    return binary.BigEndian.Uint64(h[:8])
}

func (r *ShardRouter) GetShard(key string) string {
    r.mu.RLock()
    defer r.mu.RUnlock()

    hash := r.hash(key)
    idx := sort.Search(len(r.ring), func(i int) bool {
        return r.ring[i].hash >= hash
    })

    if idx == len(r.ring) {
        idx = 0
    }

    return r.ring[idx].shard
}

func (r *ShardRouter) ExecuteOnAll(ctx context.Context, query string) ([][]map[string]interface{}, error) {
    var wg sync.WaitGroup
    results := make([][]map[string]interface{}, len(r.shardNames))
    errors := make([]error, len(r.shardNames))

    for i, name := range r.shardNames {
        wg.Add(1)
        go func(idx int, shardName string) {
            defer wg.Done()
            db := r.shards[shardName]
            rows, err := db.QueryContext(ctx, query)
            if err != nil {
                errors[idx] = err
                return
            }
            defer rows.Close()
            results[idx] = scanRows(rows)
        }(i, name)
    }

    wg.Wait()
    return results, nil
}
```

## Cross-Shard Operations

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">SCATTER-GATHER PATTERN</div>
  <div style="text-align: center; color: #64748b; margin-bottom: 16px; font-size: 13px;">Query without shard key must hit ALL shards</div>
  <div style="text-align: center; margin-bottom: 16px;">
    <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 10px; padding: 14px 24px; display: inline-block; border: 1px solid #93c5fd;">
      <span style="color: #1e40af; font-weight: 600;">Coordinator</span>
    </div>
  </div>
  <div style="text-align: center; color: #3b82f6; margin-bottom: 12px;">1. SCATTER (parallel)</div>
  <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 16px;">
    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 12px; min-width: 100px; text-align: center; border: 1px solid #86efac;">
      <div style="color: #166534; font-weight: 500;">Shard 1</div>
      <div style="color: #22c55e; font-size: 11px;">50 rows</div>
    </div>
    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 12px; min-width: 100px; text-align: center; border: 1px solid #86efac;">
      <div style="color: #166534; font-weight: 500;">Shard 2</div>
      <div style="color: #22c55e; font-size: 11px;">30 rows</div>
    </div>
    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 12px; min-width: 100px; text-align: center; border: 1px solid #86efac;">
      <div style="color: #166534; font-weight: 500;">Shard 3</div>
      <div style="color: #22c55e; font-size: 11px;">70 rows</div>
    </div>
  </div>
  <div style="text-align: center; color: #7c3aed; margin-bottom: 12px;">2. GATHER (merge & sort)</div>
  <div style="text-align: center; margin-bottom: 16px;">
    <div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 10px; padding: 14px 24px; display: inline-block; border: 1px solid #d8b4fe;">
      <span style="color: #7c3aed; font-weight: 600;">150 rows merged</span>
    </div>
  </div>
  <div style="background: rgba(234, 179, 8, 0.15); border-radius: 8px; padding: 12px; text-align: center; border: 1px solid #fcd34d;">
    <span style="color: #92400e;">Latency = max(shard latencies) + merge time. Avoid when possible!</span>
  </div>
</div>

## Common Pitfalls

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">

### 1. Wrong Shard Key
**Problem**: Chose country as shard key; 90% of users are in US.
**Solution**: Use high-cardinality keys (user_id, order_id); compound keys if needed.

### 2. Cross-Shard Joins
**Problem**: Need to join user data with order data, but they're on different shards.
**Solution**: Denormalize data, co-locate related data, or accept scatter-gather cost.

### 3. Sequential IDs
**Problem**: Auto-increment IDs from different shards collide.
**Solution**: Use UUIDs, shard-prefixed IDs (shard1_00001), or Snowflake IDs.

### 4. Hotspot Shards
**Problem**: Celebrity user causes one shard to receive 1000x traffic.
**Solution**: Further partition hot entities, use caching, rate limiting.

### 5. Resharding Downtime
**Problem**: Need to add shards but simple hash changes require moving all data.
**Solution**: Use consistent hashing from the start; implement online resharding.

</div>

## Interview Questions

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

### Fundamental Questions

1. **How do you choose a shard key?**
   - High cardinality (many unique values)
   - Even distribution (no hotspots)
   - Matches query patterns (queries include shard key)
   - Immutable (doesn't change)

2. **How do you handle cross-shard joins?**
   - Denormalize: Store related data together
   - Application-side joins: Query both shards, join in code
   - Reference tables: Replicate small tables to all shards
   - Avoid: Design schema to minimize cross-shard queries

3. **How do you generate unique IDs across shards?**
   - UUIDs (no coordination needed)
   - Snowflake IDs (timestamp + machine ID + sequence)
   - Shard-prefixed sequences (shard_1_00001)

4. **What happens when a shard gets full?**
   - Split the shard (range-based)
   - Add more shards (consistent hashing)
   - Each shard should have replicas for HA

### Advanced Questions

5. **Explain the resharding process.**
   - Add new empty shards
   - Enable double-writes (old + new location)
   - Backfill existing data in background
   - Verify data consistency
   - Switch reads to new routing
   - Disable double-writes and clean up

6. **What's the difference between hash and consistent hash sharding?**
   - Hash: key % num_shards - simple but resharding moves ~all data
   - Consistent hash: ring-based - only ~1/N data moves when scaling

</div>

## Best Practices

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

1. **Start with more shards than you need** - Easier to add capacity than reshard
2. **Use consistent hashing** - Plan for growth from day one
3. **Replicate each shard** - Shards need HA too (primary + replicas)
4. **Monitor shard balance** - Alert on uneven data distribution
5. **Avoid cross-shard operations** - Design schema for single-shard queries
6. **Test resharding in staging** - Before you need it in production
7. **Keep shard key in every table** - Enables co-located joins within shard

</div>

## Related Topics

- [Database Replication](/topic/system-design/database-replication)
- [Consistent Hashing](/topic/system-design/load-balancing)
- [CAP Theorem](/topic/system-design/cap-theorem)
