# LRU Cache

**Difficulty:** Medium (L2 - Classic Interview Problem)
**Category:** Data Structures, Linked List, Hash Map, Design
**Companies:** Amazon, Google, Facebook, Microsoft, Netflix, Uber, LinkedIn

## Problem Statement

Design a data structure that implements a Least Recently Used (LRU) cache.

Implement the `LRUCache` class:
- `LRUCache(capacity: int)` - Initialize with positive capacity
- `get(key: int) -> int` - Return value if key exists, else -1
- `put(key: int, value: int) -> None` - Update value or add key. Evict LRU item if at capacity.

Both operations must be **O(1)** average time complexity.

## Why This Problem Matters

LRU Cache is fundamental to understanding:
- **CPU Caches** - L1/L2/L3 use LRU-like policies
- **Database Buffer Pool** - Pages cached in memory
- **Web Caching** - CDNs, browser cache
- **Operating Systems** - Page replacement algorithms
- **Redis** - Default eviction policy

This tests your ability to:
- Combine multiple data structures
- Achieve O(1) with space/time tradeoffs
- Design clean APIs
- Handle edge cases

## Examples

### Example 1
```
cache = LRUCache(2)  # capacity = 2

cache.put(1, 1)      # cache: {1=1}
cache.put(2, 2)      # cache: {1=1, 2=2}
cache.get(1)         # returns 1, cache: {2=2, 1=1} (1 is now most recent)
cache.put(3, 3)      # evicts key 2, cache: {1=1, 3=3}
cache.get(2)         # returns -1 (not found)
cache.put(4, 4)      # evicts key 1, cache: {3=3, 4=4}
cache.get(1)         # returns -1 (not found)
cache.get(3)         # returns 3
cache.get(4)         # returns 4
```

### Example 2: Order Matters
```
cache = LRUCache(3)

cache.put(1, 10)     # [1]
cache.put(2, 20)     # [1, 2]
cache.put(3, 30)     # [1, 2, 3]
cache.get(1)         # [2, 3, 1] - 1 moves to end (most recent)
cache.put(4, 40)     # [3, 1, 4] - evicts 2 (least recent)
```

## Constraints

- `1 <= capacity <= 3000`
- `0 <= key <= 10^4`
- `0 <= value <= 10^5`
- At most `2 * 10^5` calls to `get` and `put`

## Mental Model & Thinking Process

### Key Insight #1: Why O(1) is Hard

```
Challenge: We need O(1) for:
1. get(key) - Find by key
2. put(key) - Insert/update by key
3. Eviction - Remove LEAST recently used

Problem breakdown:
- HashMap gives O(1) lookup by key
- But how do we track "recency" in O(1)?
- Array? Moving to end is O(n)
- Sorted container? Insert is O(log n)
```

### Key Insight #2: Doubly Linked List

```
Doubly Linked List allows O(1) removal and insertion!

LRU ←→ [node1] ←→ [node2] ←→ [node3] ←→ MRU
 ↑                                        ↑
Least                                   Most
Recent                                 Recent

Operations:
- Add to tail: O(1)
- Remove from head: O(1)
- Remove arbitrary node: O(1) if we have the reference
- Move to tail: Remove + Add = O(1)
```

### Key Insight #3: Combine HashMap + Doubly Linked List

```
HashMap: key → Node reference
Doubly Linked List: Tracks recency order

get(key):
    1. Look up node in HashMap        O(1)
    2. Move node to tail (most recent) O(1)
    3. Return value                    O(1)

put(key, value):
    1. If key exists: update value, move to tail  O(1)
    2. If new: create node, add to tail            O(1)
    3. If over capacity: remove head, delete from HashMap O(1)
```

### Visual Diagram

```
HashMap                    Doubly Linked List
┌───────────────┐
│ key → node    │         HEAD ←→ [A] ←→ [B] ←→ [C] ←→ TAIL
│   1 → ●───────┼──────────────────┼────────────────────↑
│   2 → ●───────┼──────────────────┼
│   3 → ●───────┼──────────────────↓
└───────────────┘         (LRU)              (MRU)

After get(1): [A] moves to end
HEAD ←→ [B] ←→ [C] ←→ [A] ←→ TAIL
```

## Hints

<details>
<summary>Hint 1: Data Structures</summary>

You need two data structures working together:
- HashMap for O(1) key lookup
- Something for O(1) order tracking

What data structure allows O(1) removal from the middle?
</details>

<details>
<summary>Hint 2: Doubly Linked List</summary>

Use a doubly linked list where:
- Head = Least Recently Used
- Tail = Most Recently Used

Why doubly? Because we need to remove nodes from the middle in O(1).
</details>

<details>
<summary>Hint 3: Sentinel Nodes</summary>

Use dummy head and tail nodes to simplify edge cases:
- Never check if head/tail is null
- Always have nodes to link to/from
</details>

<details>
<summary>Hint 4: Move to End Operation</summary>

"Move to end" = Remove + Add to tail
Both are O(1) with doubly linked list.
</details>

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| get | O(1) | O(1) |
| put | O(1) | O(1) |
| Overall | O(1) | O(capacity) |

## Common Mistakes to Avoid

1. **Forgetting to update HashMap** when evicting
2. **Wrong order** - head should be LRU, tail should be MRU
3. **Not updating on get()** - get() should also update recency!
4. **Null pointer exceptions** - use sentinel nodes
5. **Memory leaks** - remove evicted nodes from HashMap

## Variations

1. **LFU Cache** - Least Frequently Used (harder)
2. **TTL Cache** - Time-based expiration
3. **Thread-Safe LRU** - With locking or lock-free
4. **Size-based LRU** - Based on bytes, not count

## Language-Specific Tips

### Python
```python
# Use OrderedDict for simpler implementation:
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)  # Built-in O(1)!
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove first (LRU)
```

### Go
Go doesn't have OrderedDict, so implement with map + container/list.

## Related Problems

- LFU Cache (Hard)
- Design In-Memory File System (Hard)
- Design Twitter (Medium)
- All O(1) Data Structure (Hard)

## Interview Tips

1. **Clarify requirements** - Capacity? Thread-safe? TTL?
2. **Start with brute force** - O(n) is fine to mention, then optimize
3. **Draw the data structure** - Interviewers love visual explanations
4. **Handle edge cases** - Capacity 0? Duplicate keys?
5. **Discuss trade-offs** - Memory vs CPU, simplicity vs performance
