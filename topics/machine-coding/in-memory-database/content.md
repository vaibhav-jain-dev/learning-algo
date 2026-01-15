# In-Memory Database

## Problem Statement

Design an in-memory key-value database with support for transactions, TTL (time-to-live), and basic data types like strings, lists, and hashes.

## Requirements

- GET, SET, DELETE operations
- TTL support for keys
- Transaction support (BEGIN, COMMIT, ROLLBACK)
- Multiple data types
- Thread-safe operations

## Solution

### Python

```python
import time
import threading
from typing import Any, Optional, Dict, List
from collections import defaultdict
from dataclasses import dataclass, field
from enum import Enum


class DataType(Enum):
    STRING = "string"
    LIST = "list"
    HASH = "hash"
    SET = "set"


@dataclass
class Entry:
    value: Any
    data_type: DataType
    expires_at: Optional[float] = None

    def is_expired(self) -> bool:
        if self.expires_at is None:
            return False
        return time.time() > self.expires_at


class Transaction:
    def __init__(self):
        self.operations: List[tuple] = []  # (operation, key, value, old_value)
        self.snapshot: Dict[str, Entry] = {}


class InMemoryDB:
    def __init__(self):
        self.data: Dict[str, Entry] = {}
        self.lock = threading.RLock()
        self.transactions: Dict[int, Transaction] = {}  # thread_id -> Transaction

        # Start cleanup thread for expired keys
        self._start_cleanup_thread()

    def _start_cleanup_thread(self):
        def cleanup():
            while True:
                time.sleep(1)
                self._cleanup_expired()

        thread = threading.Thread(target=cleanup, daemon=True)
        thread.start()

    def _cleanup_expired(self):
        with self.lock:
            expired_keys = [k for k, v in self.data.items() if v.is_expired()]
            for key in expired_keys:
                del self.data[key]

    def _get_entry(self, key: str) -> Optional[Entry]:
        entry = self.data.get(key)
        if entry and entry.is_expired():
            del self.data[key]
            return None
        return entry

    def _current_transaction(self) -> Optional[Transaction]:
        thread_id = threading.current_thread().ident
        return self.transactions.get(thread_id)

    # String operations
    def set(self, key: str, value: str, ttl: Optional[int] = None) -> bool:
        with self.lock:
            expires_at = time.time() + ttl if ttl else None
            old_entry = self._get_entry(key)

            txn = self._current_transaction()
            if txn:
                txn.operations.append(('SET', key, value, old_entry))

            self.data[key] = Entry(value, DataType.STRING, expires_at)
            return True

    def get(self, key: str) -> Optional[str]:
        with self.lock:
            entry = self._get_entry(key)
            if entry and entry.data_type == DataType.STRING:
                return entry.value
            return None

    def delete(self, key: str) -> bool:
        with self.lock:
            entry = self._get_entry(key)
            if entry:
                txn = self._current_transaction()
                if txn:
                    txn.operations.append(('DELETE', key, None, entry))
                del self.data[key]
                return True
            return False

    def exists(self, key: str) -> bool:
        with self.lock:
            return self._get_entry(key) is not None

    def expire(self, key: str, ttl: int) -> bool:
        with self.lock:
            entry = self._get_entry(key)
            if entry:
                entry.expires_at = time.time() + ttl
                return True
            return False

    def ttl(self, key: str) -> int:
        with self.lock:
            entry = self._get_entry(key)
            if not entry:
                return -2  # Key doesn't exist
            if entry.expires_at is None:
                return -1  # No expiration
            return max(0, int(entry.expires_at - time.time()))

    # List operations
    def lpush(self, key: str, *values) -> int:
        with self.lock:
            entry = self._get_entry(key)
            if entry is None:
                self.data[key] = Entry(list(values), DataType.LIST)
                return len(values)
            elif entry.data_type == DataType.LIST:
                entry.value = list(values) + entry.value
                return len(entry.value)
            raise TypeError("Value is not a list")

    def rpush(self, key: str, *values) -> int:
        with self.lock:
            entry = self._get_entry(key)
            if entry is None:
                self.data[key] = Entry(list(values), DataType.LIST)
                return len(values)
            elif entry.data_type == DataType.LIST:
                entry.value.extend(values)
                return len(entry.value)
            raise TypeError("Value is not a list")

    def lpop(self, key: str) -> Optional[str]:
        with self.lock:
            entry = self._get_entry(key)
            if entry and entry.data_type == DataType.LIST and entry.value:
                return entry.value.pop(0)
            return None

    def rpop(self, key: str) -> Optional[str]:
        with self.lock:
            entry = self._get_entry(key)
            if entry and entry.data_type == DataType.LIST and entry.value:
                return entry.value.pop()
            return None

    def lrange(self, key: str, start: int, stop: int) -> List:
        with self.lock:
            entry = self._get_entry(key)
            if entry and entry.data_type == DataType.LIST:
                return entry.value[start:stop + 1]
            return []

    def llen(self, key: str) -> int:
        with self.lock:
            entry = self._get_entry(key)
            if entry and entry.data_type == DataType.LIST:
                return len(entry.value)
            return 0

    # Hash operations
    def hset(self, key: str, field: str, value: str) -> int:
        with self.lock:
            entry = self._get_entry(key)
            if entry is None:
                self.data[key] = Entry({field: value}, DataType.HASH)
                return 1
            elif entry.data_type == DataType.HASH:
                is_new = field not in entry.value
                entry.value[field] = value
                return 1 if is_new else 0
            raise TypeError("Value is not a hash")

    def hget(self, key: str, field: str) -> Optional[str]:
        with self.lock:
            entry = self._get_entry(key)
            if entry and entry.data_type == DataType.HASH:
                return entry.value.get(field)
            return None

    def hgetall(self, key: str) -> Dict[str, str]:
        with self.lock:
            entry = self._get_entry(key)
            if entry and entry.data_type == DataType.HASH:
                return dict(entry.value)
            return {}

    def hdel(self, key: str, field: str) -> int:
        with self.lock:
            entry = self._get_entry(key)
            if entry and entry.data_type == DataType.HASH:
                if field in entry.value:
                    del entry.value[field]
                    return 1
            return 0

    # Set operations
    def sadd(self, key: str, *members) -> int:
        with self.lock:
            entry = self._get_entry(key)
            if entry is None:
                self.data[key] = Entry(set(members), DataType.SET)
                return len(members)
            elif entry.data_type == DataType.SET:
                before = len(entry.value)
                entry.value.update(members)
                return len(entry.value) - before
            raise TypeError("Value is not a set")

    def smembers(self, key: str) -> set:
        with self.lock:
            entry = self._get_entry(key)
            if entry and entry.data_type == DataType.SET:
                return set(entry.value)
            return set()

    def sismember(self, key: str, member: str) -> bool:
        with self.lock:
            entry = self._get_entry(key)
            if entry and entry.data_type == DataType.SET:
                return member in entry.value
            return False

    # Transaction operations
    def begin(self):
        thread_id = threading.current_thread().ident
        with self.lock:
            self.transactions[thread_id] = Transaction()

    def commit(self) -> bool:
        thread_id = threading.current_thread().ident
        with self.lock:
            if thread_id in self.transactions:
                del self.transactions[thread_id]
                return True
            return False

    def rollback(self) -> bool:
        thread_id = threading.current_thread().ident
        with self.lock:
            txn = self.transactions.get(thread_id)
            if txn:
                # Reverse operations
                for op, key, value, old_entry in reversed(txn.operations):
                    if op == 'SET':
                        if old_entry:
                            self.data[key] = old_entry
                        else:
                            del self.data[key]
                    elif op == 'DELETE':
                        if old_entry:
                            self.data[key] = old_entry
                del self.transactions[thread_id]
                return True
            return False

    # Utility
    def keys(self, pattern: str = "*") -> List[str]:
        import fnmatch
        with self.lock:
            return [k for k in self.data.keys()
                    if not self.data[k].is_expired() and fnmatch.fnmatch(k, pattern)]

    def dbsize(self) -> int:
        with self.lock:
            return len([k for k in self.data.keys() if not self.data[k].is_expired()])


# Usage
db = InMemoryDB()

# String operations
db.set("name", "Alice")
db.set("session", "abc123", ttl=60)
print(f"name: {db.get('name')}")
print(f"session TTL: {db.ttl('session')}s")

# List operations
db.rpush("queue", "task1", "task2", "task3")
print(f"queue: {db.lrange('queue', 0, -1)}")
print(f"popped: {db.lpop('queue')}")

# Hash operations
db.hset("user:1", "name", "Bob")
db.hset("user:1", "email", "bob@example.com")
print(f"user:1: {db.hgetall('user:1')}")

# Set operations
db.sadd("tags", "python", "redis", "database")
print(f"tags: {db.smembers('tags')}")

# Transaction
db.begin()
db.set("counter", "1")
db.set("temp", "value")
db.rollback()
print(f"counter after rollback: {db.get('counter')}")

db.begin()
db.set("counter", "1")
db.commit()
print(f"counter after commit: {db.get('counter')}")
```

### Go

```go
package main

import (
	"fmt"
	"strings"
	"sync"
	"time"
)

type DataType int

const (
	TypeString DataType = iota
	TypeList
	TypeHash
	TypeSet
)

type Entry struct {
	Value     interface{}
	Type      DataType
	ExpiresAt *time.Time
}

func (e *Entry) IsExpired() bool {
	if e.ExpiresAt == nil {
		return false
	}
	return time.Now().After(*e.ExpiresAt)
}

type Transaction struct {
	Operations []Operation
}

type Operation struct {
	Op       string
	Key      string
	Value    interface{}
	OldEntry *Entry
}

type InMemoryDB struct {
	data         map[string]*Entry
	transactions map[int64]*Transaction
	mu           sync.RWMutex
}

func NewInMemoryDB() *InMemoryDB {
	db := &InMemoryDB{
		data:         make(map[string]*Entry),
		transactions: make(map[int64]*Transaction),
	}
	go db.cleanupLoop()
	return db
}

func (db *InMemoryDB) cleanupLoop() {
	ticker := time.NewTicker(time.Second)
	for range ticker.C {
		db.cleanupExpired()
	}
}

func (db *InMemoryDB) cleanupExpired() {
	db.mu.Lock()
	defer db.mu.Unlock()

	for key, entry := range db.data {
		if entry.IsExpired() {
			delete(db.data, key)
		}
	}
}

func (db *InMemoryDB) getEntry(key string) *Entry {
	entry, exists := db.data[key]
	if !exists {
		return nil
	}
	if entry.IsExpired() {
		delete(db.data, key)
		return nil
	}
	return entry
}

// String operations
func (db *InMemoryDB) Set(key, value string, ttl time.Duration) bool {
	db.mu.Lock()
	defer db.mu.Unlock()

	var expiresAt *time.Time
	if ttl > 0 {
		t := time.Now().Add(ttl)
		expiresAt = &t
	}

	db.data[key] = &Entry{
		Value:     value,
		Type:      TypeString,
		ExpiresAt: expiresAt,
	}
	return true
}

func (db *InMemoryDB) Get(key string) (string, bool) {
	db.mu.RLock()
	defer db.mu.RUnlock()

	entry := db.getEntry(key)
	if entry == nil || entry.Type != TypeString {
		return "", false
	}
	return entry.Value.(string), true
}

func (db *InMemoryDB) Delete(key string) bool {
	db.mu.Lock()
	defer db.mu.Unlock()

	if _, exists := db.data[key]; exists {
		delete(db.data, key)
		return true
	}
	return false
}

func (db *InMemoryDB) Exists(key string) bool {
	db.mu.RLock()
	defer db.mu.RUnlock()
	return db.getEntry(key) != nil
}

func (db *InMemoryDB) TTL(key string) int {
	db.mu.RLock()
	defer db.mu.RUnlock()

	entry := db.getEntry(key)
	if entry == nil {
		return -2
	}
	if entry.ExpiresAt == nil {
		return -1
	}
	return int(time.Until(*entry.ExpiresAt).Seconds())
}

// List operations
func (db *InMemoryDB) RPush(key string, values ...string) int {
	db.mu.Lock()
	defer db.mu.Unlock()

	entry := db.getEntry(key)
	if entry == nil {
		db.data[key] = &Entry{
			Value: values,
			Type:  TypeList,
		}
		return len(values)
	}

	if entry.Type != TypeList {
		return -1
	}

	list := entry.Value.([]string)
	list = append(list, values...)
	entry.Value = list
	return len(list)
}

func (db *InMemoryDB) LPop(key string) (string, bool) {
	db.mu.Lock()
	defer db.mu.Unlock()

	entry := db.getEntry(key)
	if entry == nil || entry.Type != TypeList {
		return "", false
	}

	list := entry.Value.([]string)
	if len(list) == 0 {
		return "", false
	}

	value := list[0]
	entry.Value = list[1:]
	return value, true
}

func (db *InMemoryDB) LRange(key string, start, stop int) []string {
	db.mu.RLock()
	defer db.mu.RUnlock()

	entry := db.getEntry(key)
	if entry == nil || entry.Type != TypeList {
		return nil
	}

	list := entry.Value.([]string)
	if start < 0 {
		start = len(list) + start
	}
	if stop < 0 {
		stop = len(list) + stop
	}
	if start < 0 {
		start = 0
	}
	if stop >= len(list) {
		stop = len(list) - 1
	}
	if start > stop {
		return nil
	}

	return list[start : stop+1]
}

// Hash operations
func (db *InMemoryDB) HSet(key, field, value string) int {
	db.mu.Lock()
	defer db.mu.Unlock()

	entry := db.getEntry(key)
	if entry == nil {
		db.data[key] = &Entry{
			Value: map[string]string{field: value},
			Type:  TypeHash,
		}
		return 1
	}

	if entry.Type != TypeHash {
		return -1
	}

	hash := entry.Value.(map[string]string)
	_, exists := hash[field]
	hash[field] = value
	if exists {
		return 0
	}
	return 1
}

func (db *InMemoryDB) HGet(key, field string) (string, bool) {
	db.mu.RLock()
	defer db.mu.RUnlock()

	entry := db.getEntry(key)
	if entry == nil || entry.Type != TypeHash {
		return "", false
	}

	hash := entry.Value.(map[string]string)
	value, exists := hash[field]
	return value, exists
}

func (db *InMemoryDB) HGetAll(key string) map[string]string {
	db.mu.RLock()
	defer db.mu.RUnlock()

	entry := db.getEntry(key)
	if entry == nil || entry.Type != TypeHash {
		return nil
	}

	hash := entry.Value.(map[string]string)
	result := make(map[string]string)
	for k, v := range hash {
		result[k] = v
	}
	return result
}

// Set operations
func (db *InMemoryDB) SAdd(key string, members ...string) int {
	db.mu.Lock()
	defer db.mu.Unlock()

	entry := db.getEntry(key)
	if entry == nil {
		set := make(map[string]struct{})
		for _, m := range members {
			set[m] = struct{}{}
		}
		db.data[key] = &Entry{
			Value: set,
			Type:  TypeSet,
		}
		return len(members)
	}

	if entry.Type != TypeSet {
		return -1
	}

	set := entry.Value.(map[string]struct{})
	added := 0
	for _, m := range members {
		if _, exists := set[m]; !exists {
			set[m] = struct{}{}
			added++
		}
	}
	return added
}

func (db *InMemoryDB) SMembers(key string) []string {
	db.mu.RLock()
	defer db.mu.RUnlock()

	entry := db.getEntry(key)
	if entry == nil || entry.Type != TypeSet {
		return nil
	}

	set := entry.Value.(map[string]struct{})
	result := make([]string, 0, len(set))
	for m := range set {
		result = append(result, m)
	}
	return result
}

// Utility
func (db *InMemoryDB) Keys(pattern string) []string {
	db.mu.RLock()
	defer db.mu.RUnlock()

	var result []string
	for key, entry := range db.data {
		if !entry.IsExpired() && matchPattern(pattern, key) {
			result = append(result, key)
		}
	}
	return result
}

func matchPattern(pattern, key string) bool {
	if pattern == "*" {
		return true
	}
	pattern = strings.ReplaceAll(pattern, "*", "")
	return strings.Contains(key, pattern)
}

func (db *InMemoryDB) DBSize() int {
	db.mu.RLock()
	defer db.mu.RUnlock()

	count := 0
	for _, entry := range db.data {
		if !entry.IsExpired() {
			count++
		}
	}
	return count
}

func main() {
	db := NewInMemoryDB()

	// String operations
	db.Set("name", "Alice", 0)
	db.Set("session", "abc123", 60*time.Second)
	name, _ := db.Get("name")
	fmt.Printf("name: %s\n", name)
	fmt.Printf("session TTL: %ds\n", db.TTL("session"))

	// List operations
	db.RPush("queue", "task1", "task2", "task3")
	fmt.Printf("queue: %v\n", db.LRange("queue", 0, -1))
	popped, _ := db.LPop("queue")
	fmt.Printf("popped: %s\n", popped)

	// Hash operations
	db.HSet("user:1", "name", "Bob")
	db.HSet("user:1", "email", "bob@example.com")
	fmt.Printf("user:1: %v\n", db.HGetAll("user:1"))

	// Set operations
	db.SAdd("tags", "go", "redis", "database")
	fmt.Printf("tags: %v\n", db.SMembers("tags"))

	fmt.Printf("DB size: %d\n", db.DBSize())
}
```

## Data Structure Summary

| Type | Operations | Use Case |
|------|-----------|----------|
| String | GET, SET, INCR | Counters, cache |
| List | LPUSH, RPUSH, LPOP, RPOP | Queues, logs |
| Hash | HSET, HGET, HGETALL | Objects, user profiles |
| Set | SADD, SMEMBERS, SINTER | Tags, unique items |

## Interview Tips

- Explain HashMap + LinkedList for O(1) operations
- Discuss memory management and eviction policies
- Consider persistence options (AOF, RDB)
- Handle concurrent access with proper locking
- Mention Redis as production reference
