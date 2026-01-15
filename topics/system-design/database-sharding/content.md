# Database Sharding

## Overview

Database sharding is a horizontal scaling technique that partitions data across multiple database instances (shards). Each shard holds a subset of the total data, allowing the system to handle more data and traffic than a single database can manage.

## Key Concepts

### Why Sharding?

1. **Horizontal Scalability**: Distribute data across many machines
2. **Improved Performance**: Queries only hit relevant shards
3. **Higher Availability**: Failure of one shard doesn't affect others
4. **Geographic Distribution**: Place data closer to users

### Sharding vs Replication

| Sharding | Replication |
|----------|-------------|
| Splits data across nodes | Copies same data to multiple nodes |
| Increases write capacity | Increases read capacity |
| Each shard has unique data | All replicas have same data |
| Complex queries across shards | Simple failover |

## Sharding Strategies

### 1. Range-Based Sharding

Partition data by ranges of a key value.

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

**Pros**: Simple, efficient range queries
**Cons**: Uneven distribution (hotspots), requires rebalancing

### 2. Hash-Based Sharding

Use hash function to determine shard.

```python
import hashlib

def get_shard_by_hash(user_id, num_shards):
    hash_value = int(hashlib.md5(str(user_id).encode()).hexdigest(), 16)
    return f"shard_{hash_value % num_shards}"
```

**Pros**: Even distribution
**Cons**: Range queries require hitting all shards, resharding is expensive

### 3. Consistent Hashing

Minimizes data movement when adding/removing shards.

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

### Good Shard Key Properties
1. **High Cardinality**: Many unique values
2. **Even Distribution**: Avoids hotspots
3. **Query Patterns**: Matches common access patterns

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

### Scatter-Gather Pattern

Query all shards and aggregate results.

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

### Online Resharding Steps

1. **Add new shards** - Provision new database instances
2. **Double-write** - Write to both old and new locations
3. **Backfill** - Copy existing data to new shards
4. **Verify** - Ensure data consistency
5. **Switch reads** - Direct reads to new shards
6. **Remove double-write** - Write only to new locations
7. **Cleanup** - Remove data from old shards

## Common Interview Questions

1. **How do you handle joins across shards?**
   - Denormalize data
   - Application-level joins
   - Use reference tables replicated to all shards

2. **How do you maintain auto-increment IDs?**
   - UUID/GUID
   - Centralized ID service
   - Shard prefix + local sequence

3. **What happens when a shard fails?**
   - Each shard should have replicas
   - Automatic failover to replica
   - Circuit breaker for failed shards

4. **How do you choose the number of shards?**
   - Start with more shards than needed
   - Consider data growth projections
   - Balance between overhead and flexibility

## Best Practices

1. **Choose shard key carefully** - It's hard to change later
2. **Plan for resharding** - Use consistent hashing
3. **Keep shards balanced** - Monitor data distribution
4. **Replicate each shard** - For high availability
5. **Avoid cross-shard transactions** - Design for single-shard operations
6. **Use connection pooling** - Manage connections efficiently

## Related Topics

- [Database Replication](/topic/system-design/database-replication)
- [CAP Theorem](/topic/system-design/cap-theorem)
- [Consistent Hashing](/topic/system-design/load-balancing)
