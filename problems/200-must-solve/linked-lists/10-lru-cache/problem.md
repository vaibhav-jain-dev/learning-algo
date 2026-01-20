<div id="viz-config" style="display:none">
{"name":"LRU Cache","algorithm":"ll-lru-cache","complexity":{"time":"O(1) for get and put","space":"O(capacity)"},"examples":[{"input":{"capacity":3,"operations":[["put","a",1],["put","b",2],["put","c",3],["get","a"],["put","d",4],["get","b"],["get","c"],["put","e",5]]},"output":{"get_a":1,"get_b":-1,"get_c":3,"finalCache":["d","c","e"]},"inputRaw":"LRUCache(3), put(a,1), put(b,2), put(c,3), get(a), put(d,4), get(b), get(c), put(e,5)","outputRaw":"get(a)=1, get(b)=-1, get(c)=3, cache={d,c,e}"}]}
</div>

# LRU Cache

**Difficulty:** Hard

## Problem Statement

Implement an LRUCache (Least Recently Used Cache) class that supports the following operations:

- `LRUCache(int maxSize)`: Initialize the cache with a maximum capacity
- `int get(String key)`: Return the value associated with the key, or -1 if the key doesn't exist. Accessing a key makes it the most recently used.
- `void put(String key, int value)`: Insert or update the value for the key. If the cache reaches capacity, evict the least recently used item before inserting. Inserting/updating makes the key the most recently used.

The cache should support O(1) time complexity for both `get` and `put` operations.

## Examples

**Example:**
```
LRUCache cache = new LRUCache(3);

cache.put("a", 1);  // cache: {a=1}
cache.put("b", 2);  // cache: {a=1, b=2}
cache.put("c", 3);  // cache: {a=1, b=2, c=3}

cache.get("a");     // returns 1, cache: {b=2, c=3, a=1} (a is now most recent)

cache.put("d", 4);  // evicts "b", cache: {c=3, a=1, d=4}

cache.get("b");     // returns -1 (not found)
cache.get("c");     // returns 3, cache: {a=1, d=4, c=3}

cache.put("e", 5);  // evicts "a", cache: {d=4, c=3, e=5}
```

## Constraints

- 1 <= maxSize <= 10000
- Keys are strings, values are integers
- All operations should be O(1) time complexity
- Handle edge cases like maxSize = 1

## Hints

<details>
<summary>Hint 1</summary>
Use a hash map for O(1) lookups and a doubly linked list to maintain the order of usage.
</details>

<details>
<summary>Hint 2</summary>
The most recently used item should be at one end (e.g., head), and the least recently used at the other end (e.g., tail).
</details>

<details>
<summary>Hint 3</summary>
When accessing or updating a node, remove it from its current position and add it to the head. When evicting, remove from the tail.
</details>

## Approach

### Hash Map + Doubly Linked List

**Data Structures:**
- **Hash Map:** `key -> Node` for O(1) access to any node
- **Doubly Linked List:** Maintains order from most recent (head) to least recent (tail)

**Operations:**

1. **get(key):**
   - Look up node in hash map
   - If not found, return -1
   - Move node to head (most recently used)
   - Return value

2. **put(key, value):**
   - If key exists: update value, move to head
   - If key doesn't exist:
     - If at capacity: remove tail node, delete from hash map
     - Create new node, add to head, add to hash map

3. **Helper operations:**
   - `addToHead(node)`: Insert node right after dummy head
   - `removeNode(node)`: Remove node from its current position
   - `moveToHead(node)`: Remove then add to head

**Time Complexity:** O(1) for both get and put
**Space Complexity:** O(capacity) for storing the cache

---

## Similar Problems (Harder)

### 1. LFU Cache (Least Frequently Used)
**Difficulty:** Very Hard

Implement a cache that evicts the least frequently used item. If there's a tie, evict the least recently used among them.

### 2. Time-Based LRU Cache
**Difficulty:** Hard

Implement LRU cache where items also have a TTL (Time To Live) and expire automatically.

### 3. Thread-Safe LRU Cache
**Difficulty:** Very Hard

Implement an LRU cache that supports concurrent access from multiple threads safely.
