# In-Memory Database Design

## Problem Statement

Design an in-memory key-value database with support for transactions, TTL (time-to-live), and basic data types. This system should provide Redis-like functionality with GET, SET, DELETE operations, plus transaction support with BEGIN, COMMIT, and ROLLBACK.

This is a popular interview question at companies like Amazon, Google, and database companies. It tests your understanding of data structures, transaction management, and concurrent programming.

---

## Requirements Clarification

### Functional Requirements

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Core Operations</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

- **GET(key)**: Retrieve value by key
- **SET(key, value, ttl?)**: Store key-value pair with optional TTL
- **DELETE(key)**: Remove a key
- **BEGIN**: Start a new transaction
- **COMMIT**: Save transaction changes
- **ROLLBACK**: Discard transaction changes
- **Multiple data types**: Strings, Lists, Hashes, Sets

</div>
</div>

### Non-Functional Requirements

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">System Constraints</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

- **Thread safety**: Support concurrent access
- **O(1) operations**: GET/SET should be constant time
- **Nested transactions**: Support transaction within transaction
- **Automatic expiration**: Clean up expired keys
- **Memory efficient**: Don't store expired data

</div>
</div>

### Key Questions to Ask

1. Do we need persistence (save to disk)?
2. Should transactions be isolated from each other?
3. What happens to TTL during transactions?
4. Maximum number of keys to support?
5. Should we support pub/sub?

---

## Architecture Diagram

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Database Architecture</h4>

<div style="display: flex; flex-direction: column; gap: 20px;">

<!-- Main Storage -->
<div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
<div style="color: #1e40af; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">Main Storage Layer</div>
<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #dbeafe; border: 1px solid #93c5fd; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 12px;">Data Store</div>
<div style="color: #3b82f6; font-size: 11px;">Dict[key, Entry]</div>
</div>
<div style="background: #dcfce7; border: 1px solid #86efac; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #166534; font-weight: bold; font-size: 12px;">TTL Index</div>
<div style="color: #22c55e; font-size: 11px;">Heap[expiry, key]</div>
</div>
<div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #92400e; font-weight: bold; font-size: 12px;">Type Index</div>
<div style="color: #d97706; font-size: 11px;">Dict[key, type]</div>
</div>
</div>
</div>

<!-- Transaction Layer -->
<div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
<div style="color: #7c3aed; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">Transaction Layer</div>
<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #f3e8ff; border: 2px solid #c084fc; padding: 14px; border-radius: 8px; text-align: center;">
<div style="color: #7c3aed; font-weight: bold; font-size: 12px;">Transaction Stack</div>
<div style="color: #a855f7; font-size: 10px;">Nested transactions</div>
</div>
<div style="background: #fce7f3; border: 2px solid #f472b6; padding: 14px; border-radius: 8px; text-align: center;">
<div style="color: #be185d; font-weight: bold; font-size: 12px;">Snapshot Store</div>
<div style="color: #ec4899; font-size: 10px;">Original values</div>
</div>
<div style="background: #fee2e2; border: 2px solid #fca5a5; padding: 14px; border-radius: 8px; text-align: center;">
<div style="color: #991b1b; font-weight: bold; font-size: 12px;">Operations Log</div>
<div style="color: #dc2626; font-size: 10px;">For rollback</div>
</div>
</div>
</div>

<!-- Data Types -->
<div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
<div style="color: #1e293b; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">Supported Data Types</div>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #ecfdf5; padding: 10px 16px; border-radius: 6px;">
<div style="color: #166534; font-weight: bold; font-size: 11px;">STRING</div>
</div>
<div style="background: #eff6ff; padding: 10px 16px; border-radius: 6px;">
<div style="color: #1e40af; font-weight: bold; font-size: 11px;">LIST</div>
</div>
<div style="background: #fefce8; padding: 10px 16px; border-radius: 6px;">
<div style="color: #854d0e; font-weight: bold; font-size: 11px;">HASH</div>
</div>
<div style="background: #fdf2f8; padding: 10px 16px; border-radius: 6px;">
<div style="color: #9d174d; font-weight: bold; font-size: 11px;">SET</div>
</div>
</div>
</div>

</div>
</div>

---

## Class Design

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px;">Class Structure</h4>

```
+-------------------+       +------------------+       +-------------------+
|     DataType      |       |      Entry       |       |   Transaction     |
+-------------------+       +------------------+       +-------------------+
| STRING            |       | value: Any       |       | operations: List  |
| LIST              |       | data_type: Enum  |       | snapshot: Dict    |
| HASH              |       | expires_at: float|       +-------------------+
| SET               |       +------------------+       | + record()        |
+-------------------+       | + is_expired()   |       | + rollback()      |
                            +------------------+       +-------------------+
                                    |
                                    v
+------------------------------------------------------------------------+
|                           InMemoryDB                                    |
+------------------------------------------------------------------------+
| - data: Dict[str, Entry]      - transactions: List[Transaction]        |
| - lock: RLock                 - ttl_heap: List                         |
+------------------------------------------------------------------------+
| + get(key) -> Any             + begin() -> None                        |
| + set(key, value, ttl)        + commit() -> bool                       |
| + delete(key) -> bool         + rollback() -> bool                     |
| + lpush/rpush/lpop/rpop       + hset/hget/hgetall                      |
+------------------------------------------------------------------------+
```
</div>

---

## API Design

### Core Operations

```python
class InMemoryDB:
    # String operations
    def get(self, key: str) -> Optional[Any]:
        """Get value by key. Returns None if not found or expired."""

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """Set key-value pair with optional TTL in seconds."""

    def delete(self, key: str) -> bool:
        """Delete key. Returns True if key existed."""

    # Transaction operations
    def begin(self) -> None:
        """Start a new transaction (can be nested)."""

    def commit(self) -> bool:
        """Commit current transaction. Returns False if no active transaction."""

    def rollback(self) -> bool:
        """Rollback current transaction. Returns False if no active transaction."""

    # List operations
    def lpush(self, key: str, *values) -> int:
        """Push values to the left of list. Returns new length."""

    def rpop(self, key: str) -> Optional[Any]:
        """Pop from right of list."""

    # Hash operations
    def hset(self, key: str, field: str, value: Any) -> bool:
        """Set field in hash."""

    def hget(self, key: str, field: str) -> Optional[Any]:
        """Get field from hash."""
```

---

## Code Implementation

### Python Implementation

```python
import time
import threading
import heapq
from typing import Any, Optional, Dict, List, Set
from dataclasses import dataclass, field
from enum import Enum
from collections import defaultdict


class DataType(Enum):
    STRING = "string"
    LIST = "list"
    HASH = "hash"
    SET = "set"


@dataclass
class Entry:
    """Represents a database entry with value and metadata."""
    value: Any
    data_type: DataType
    expires_at: Optional[float] = None

    def is_expired(self) -> bool:
        if self.expires_at is None:
            return False
        return time.time() > self.expires_at


class Transaction:
    """Represents an active transaction with snapshot for rollback."""

    def __init__(self):
        self.operations: List[tuple] = []  # (op_type, key, old_value)
        self.snapshot: Dict[str, Optional[Entry]] = {}

    def record(self, op_type: str, key: str, old_value: Optional[Entry]):
        """Record an operation for potential rollback."""
        # Only record first change to each key
        if key not in self.snapshot:
            self.snapshot[key] = old_value
        self.operations.append((op_type, key, old_value))


class InMemoryDB:
    """
    In-memory key-value database with transactions and TTL support.

    Features:
    - O(1) GET/SET/DELETE operations
    - Nested transaction support
    - TTL with lazy expiration
    - Multiple data types (string, list, hash, set)
    """

    def __init__(self):
        self.data: Dict[str, Entry] = {}
        self.transactions: List[Transaction] = []
        self.lock = threading.RLock()
        self.ttl_heap: List[tuple] = []  # (expires_at, key)

    def _is_expired(self, key: str) -> bool:
        """Check if key is expired and clean up if so."""
        entry = self.data.get(key)
        if entry and entry.is_expired():
            del self.data[key]
            return True
        return False

    def _cleanup_expired(self):
        """Lazy cleanup of expired keys from TTL heap."""
        current_time = time.time()
        while self.ttl_heap and self.ttl_heap[0][0] <= current_time:
            _, key = heapq.heappop(self.ttl_heap)
            if key in self.data and self.data[key].is_expired():
                del self.data[key]

    def _record_operation(self, op_type: str, key: str):
        """Record operation for active transaction."""
        if self.transactions:
            old_value = self.data.get(key)
            self.transactions[-1].record(op_type, key, old_value)

    # ==================== String Operations ====================

    def get(self, key: str) -> Optional[Any]:
        """Get value by key."""
        with self.lock:
            if self._is_expired(key):
                return None
            entry = self.data.get(key)
            return entry.value if entry else None

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """Set key-value with optional TTL in seconds."""
        with self.lock:
            self._record_operation("SET", key)

            expires_at = None
            if ttl is not None:
                expires_at = time.time() + ttl
                heapq.heappush(self.ttl_heap, (expires_at, key))

            self.data[key] = Entry(
                value=value,
                data_type=DataType.STRING,
                expires_at=expires_at
            )
            return True

    def delete(self, key: str) -> bool:
        """Delete key."""
        with self.lock:
            if key not in self.data or self._is_expired(key):
                return False

            self._record_operation("DELETE", key)
            del self.data[key]
            return True

    def exists(self, key: str) -> bool:
        """Check if key exists."""
        with self.lock:
            return key in self.data and not self._is_expired(key)

    def ttl(self, key: str) -> int:
        """Get remaining TTL in seconds. Returns -1 if no TTL, -2 if not found."""
        with self.lock:
            entry = self.data.get(key)
            if not entry or self._is_expired(key):
                return -2
            if entry.expires_at is None:
                return -1
            return max(0, int(entry.expires_at - time.time()))

    # ==================== Transaction Operations ====================

    def begin(self) -> None:
        """Start a new transaction (supports nesting)."""
        with self.lock:
            self.transactions.append(Transaction())

    def commit(self) -> bool:
        """Commit current transaction."""
        with self.lock:
            if not self.transactions:
                return False

            # Simply remove the transaction - changes are already in data
            completed = self.transactions.pop()

            # If there's a parent transaction, merge snapshots
            if self.transactions:
                parent = self.transactions[-1]
                for key, old_value in completed.snapshot.items():
                    if key not in parent.snapshot:
                        parent.snapshot[key] = old_value

            return True

    def rollback(self) -> bool:
        """Rollback current transaction."""
        with self.lock:
            if not self.transactions:
                return False

            transaction = self.transactions.pop()

            # Restore original values
            for key, old_entry in transaction.snapshot.items():
                if old_entry is None:
                    # Key didn't exist before
                    self.data.pop(key, None)
                else:
                    # Restore original value
                    self.data[key] = old_entry

            return True

    def in_transaction(self) -> bool:
        """Check if currently in a transaction."""
        return len(self.transactions) > 0

    # ==================== List Operations ====================

    def lpush(self, key: str, *values) -> int:
        """Push values to left of list."""
        with self.lock:
            self._record_operation("LPUSH", key)

            if key not in self.data:
                self.data[key] = Entry(value=[], data_type=DataType.LIST)
            elif self.data[key].data_type != DataType.LIST:
                raise TypeError(f"Key {key} is not a list")

            for value in values:
                self.data[key].value.insert(0, value)

            return len(self.data[key].value)

    def rpush(self, key: str, *values) -> int:
        """Push values to right of list."""
        with self.lock:
            self._record_operation("RPUSH", key)

            if key not in self.data:
                self.data[key] = Entry(value=[], data_type=DataType.LIST)
            elif self.data[key].data_type != DataType.LIST:
                raise TypeError(f"Key {key} is not a list")

            self.data[key].value.extend(values)
            return len(self.data[key].value)

    def lpop(self, key: str) -> Optional[Any]:
        """Pop from left of list."""
        with self.lock:
            entry = self.data.get(key)
            if not entry or entry.data_type != DataType.LIST:
                return None

            self._record_operation("LPOP", key)
            if entry.value:
                return entry.value.pop(0)
            return None

    def rpop(self, key: str) -> Optional[Any]:
        """Pop from right of list."""
        with self.lock:
            entry = self.data.get(key)
            if not entry or entry.data_type != DataType.LIST:
                return None

            self._record_operation("RPOP", key)
            if entry.value:
                return entry.value.pop()
            return None

    def lrange(self, key: str, start: int, stop: int) -> List[Any]:
        """Get range of elements from list."""
        with self.lock:
            entry = self.data.get(key)
            if not entry or entry.data_type != DataType.LIST:
                return []
            return entry.value[start:stop + 1]

    # ==================== Hash Operations ====================

    def hset(self, key: str, field: str, value: Any) -> bool:
        """Set field in hash."""
        with self.lock:
            self._record_operation("HSET", key)

            if key not in self.data:
                self.data[key] = Entry(value={}, data_type=DataType.HASH)
            elif self.data[key].data_type != DataType.HASH:
                raise TypeError(f"Key {key} is not a hash")

            is_new = field not in self.data[key].value
            self.data[key].value[field] = value
            return is_new

    def hget(self, key: str, field: str) -> Optional[Any]:
        """Get field from hash."""
        with self.lock:
            entry = self.data.get(key)
            if not entry or entry.data_type != DataType.HASH:
                return None
            return entry.value.get(field)

    def hgetall(self, key: str) -> Dict[str, Any]:
        """Get all fields from hash."""
        with self.lock:
            entry = self.data.get(key)
            if not entry or entry.data_type != DataType.HASH:
                return {}
            return dict(entry.value)

    def hdel(self, key: str, *fields) -> int:
        """Delete fields from hash. Returns number deleted."""
        with self.lock:
            entry = self.data.get(key)
            if not entry or entry.data_type != DataType.HASH:
                return 0

            self._record_operation("HDEL", key)
            deleted = 0
            for field in fields:
                if field in entry.value:
                    del entry.value[field]
                    deleted += 1
            return deleted

    # ==================== Set Operations ====================

    def sadd(self, key: str, *members) -> int:
        """Add members to set. Returns number added."""
        with self.lock:
            self._record_operation("SADD", key)

            if key not in self.data:
                self.data[key] = Entry(value=set(), data_type=DataType.SET)
            elif self.data[key].data_type != DataType.SET:
                raise TypeError(f"Key {key} is not a set")

            before = len(self.data[key].value)
            self.data[key].value.update(members)
            return len(self.data[key].value) - before

    def smembers(self, key: str) -> Set[Any]:
        """Get all members of set."""
        with self.lock:
            entry = self.data.get(key)
            if not entry or entry.data_type != DataType.SET:
                return set()
            return set(entry.value)

    def sismember(self, key: str, member: Any) -> bool:
        """Check if member exists in set."""
        with self.lock:
            entry = self.data.get(key)
            if not entry or entry.data_type != DataType.SET:
                return False
            return member in entry.value


# Example usage
if __name__ == "__main__":
    db = InMemoryDB()

    # String operations
    print("=== String Operations ===")
    db.set("name", "Alice")
    db.set("age", 30, ttl=5)  # Expires in 5 seconds
    print(f"name: {db.get('name')}")
    print(f"age TTL: {db.ttl('age')} seconds")

    # Transaction example
    print("\n=== Transaction Demo ===")
    db.set("balance", 100)
    print(f"Initial balance: {db.get('balance')}")

    db.begin()
    db.set("balance", 50)
    print(f"During transaction: {db.get('balance')}")
    db.rollback()
    print(f"After rollback: {db.get('balance')}")

    # List operations
    print("\n=== List Operations ===")
    db.rpush("tasks", "task1", "task2", "task3")
    print(f"Tasks: {db.lrange('tasks', 0, -1)}")
    print(f"Pop: {db.lpop('tasks')}")

    # Hash operations
    print("\n=== Hash Operations ===")
    db.hset("user:1", "name", "Bob")
    db.hset("user:1", "email", "bob@example.com")
    print(f"User: {db.hgetall('user:1')}")
```

---

## Edge Cases

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Critical Edge Cases</div>

| Scenario | Expected Behavior | Implementation |
|----------|-------------------|----------------|
| **Get expired key** | Return None | Check expiry in get() |
| **Rollback without begin** | Return False | Check transactions list |
| **Nested transactions** | Support with proper commit/rollback | Stack of transactions |
| **Type mismatch** | Raise TypeError | Validate data_type in operations |
| **TTL on non-existent key** | Return -2 | Check existence first |
| **Commit empty transaction** | Success, no-op | Allow empty commits |

</div>

---

## Testing Approach

### Unit Tests

```python
import unittest
import time


class TestInMemoryDB(unittest.TestCase):
    def setUp(self):
        self.db = InMemoryDB()

    def test_basic_set_get(self):
        self.db.set("key", "value")
        self.assertEqual(self.db.get("key"), "value")

    def test_delete(self):
        self.db.set("key", "value")
        self.assertTrue(self.db.delete("key"))
        self.assertIsNone(self.db.get("key"))

    def test_ttl_expiration(self):
        self.db.set("key", "value", ttl=1)
        self.assertEqual(self.db.get("key"), "value")
        time.sleep(1.1)
        self.assertIsNone(self.db.get("key"))

    def test_transaction_commit(self):
        self.db.set("x", 10)
        self.db.begin()
        self.db.set("x", 20)
        self.db.commit()
        self.assertEqual(self.db.get("x"), 20)

    def test_transaction_rollback(self):
        self.db.set("x", 10)
        self.db.begin()
        self.db.set("x", 20)
        self.db.rollback()
        self.assertEqual(self.db.get("x"), 10)

    def test_nested_transactions(self):
        self.db.set("x", 1)
        self.db.begin()
        self.db.set("x", 2)
        self.db.begin()
        self.db.set("x", 3)
        self.db.rollback()  # Inner rollback
        self.assertEqual(self.db.get("x"), 2)
        self.db.commit()  # Outer commit
        self.assertEqual(self.db.get("x"), 2)


if __name__ == "__main__":
    unittest.main()
```

---

## Interview Tips

<div style="background: #f0f9ff; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
<div style="color: #1e293b; font-weight: bold; font-size: 16px; margin-bottom: 16px;">How to Approach This in an Interview</div>

### Time Allocation (45 minutes)

| Phase | Time | Focus |
|-------|------|-------|
| Requirements | 5 min | Operations, transaction semantics |
| Data Structure | 10 min | Entry class, transaction design |
| Core Operations | 15 min | GET/SET/DELETE with TTL |
| Transactions | 10 min | BEGIN/COMMIT/ROLLBACK |
| Edge Cases | 5 min | Expiration, type checking |

### Key Points to Mention

1. **Hash Map for O(1)**: Core data store is a dictionary
2. **Snapshot for Rollback**: Save original values on first write
3. **Lazy Expiration**: Check TTL on access, not background thread
4. **Nested Transactions**: Use stack to support BEGIN inside BEGIN
5. **Thread Safety**: RLock for reentrant operations

### Common Follow-up Questions

- **How to handle persistence?** Write-ahead log (WAL), periodic snapshots
- **Distributed version?** Consistent hashing, Raft consensus
- **Memory pressure?** LRU eviction, memory limits
- **Concurrent transactions?** MVCC (Multi-Version Concurrency Control)

</div>

---

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| GET | O(1) | O(1) |
| SET | O(log n) for TTL heap | O(1) |
| DELETE | O(1) | O(1) |
| BEGIN | O(1) | O(1) |
| COMMIT | O(k) where k = modified keys | O(1) |
| ROLLBACK | O(k) where k = modified keys | O(k) |
| LPUSH/RPUSH | O(1) amortized | O(1) |
| HSET/HGET | O(1) | O(1) |
