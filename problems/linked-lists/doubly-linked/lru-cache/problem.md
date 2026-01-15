# LRU Cache

## Problem Description

Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the `LRUCache` class:

- `LRUCache(int capacity)` - Initialize the LRU cache with positive size capacity.
- `int get(int key)` - Return the value of the key if it exists, otherwise return -1.
- `void put(int key, int value)` - Update the value of the key if it exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity, **evict the least recently used key**.

The functions `get` and `put` must each run in **O(1)** average time complexity.

## Examples

### Example 1
```
Input:
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]

Output:
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation:
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1, cache is {2=2, 1=1} (1 moved to most recent)
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {3=3, 4=4}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3, cache is {4=4, 3=3}
lRUCache.get(4);    // return 4, cache is {3=3, 4=4}
```

### Example 2
```
Input:
["LRUCache", "put", "get", "put", "get", "get"]
[[1], [2, 1], [2], [3, 2], [2], [3]]

Output: [null, null, 1, null, -1, 2]

Explanation:
LRUCache cache = new LRUCache(1); // capacity 1
cache.put(2, 1);  // cache is {2=1}
cache.get(2);     // return 1
cache.put(3, 2);  // evicts 2, cache is {3=2}
cache.get(2);     // return -1 (evicted)
cache.get(3);     // return 2
```

## Constraints

- 1 <= capacity <= 3000
- 0 <= key <= 10^4
- 0 <= value <= 10^5
- At most 2 * 10^5 calls will be made to get and put

## Hints

<details>
<summary>Hint 1</summary>
You need two data structures: one for O(1) lookup by key (hash map) and one for O(1) removal/insertion for LRU ordering.
</details>

<details>
<summary>Hint 2</summary>
A doubly linked list allows O(1) removal from middle (if you have the node reference) and O(1) insertion at ends.
</details>

<details>
<summary>Hint 3</summary>
Store key-to-node mapping in the hash map. The doubly linked list maintains usage order (most recent at one end, least recent at the other).
</details>

<details>
<summary>Hint 4</summary>
Use dummy head and tail nodes to simplify edge cases when adding/removing nodes.
</details>

## Approach

### Hash Map + Doubly Linked List

The key insight is combining two data structures:

1. **Hash Map**: Maps key -> Node reference
   - Provides O(1) access to any cache entry

2. **Doubly Linked List**: Maintains usage order
   - Head side = Most Recently Used (MRU)
   - Tail side = Least Recently Used (LRU)
   - O(1) move to front (on access)
   - O(1) remove from tail (on eviction)

**Node Structure:**
```
class Node:
    key: int      # Needed to remove from hashmap on eviction
    value: int
    prev: Node
    next: Node
```

**Operations:**

**get(key):**
1. If key not in map, return -1
2. Get node from map
3. Move node to head (most recently used)
4. Return node.value

**put(key, value):**
1. If key exists:
   - Update value
   - Move to head
2. If key doesn't exist:
   - Create new node
   - Add to map
   - Add to head of list
   - If over capacity, remove tail node and delete from map

**Helper Functions:**
- `add_to_head(node)`: Insert after dummy head
- `remove_node(node)`: Remove from current position
- `move_to_head(node)`: remove_node + add_to_head
- `pop_tail()`: Remove and return the LRU node

**Time Complexity:** O(1) for both get and put
**Space Complexity:** O(capacity) for storing nodes

## Visual Representation

```
HashMap: {1: Node1, 3: Node3, 4: Node4}

Doubly Linked List (with dummy head/tail):

[DummyHead] <-> [Node4: MRU] <-> [Node3] <-> [Node1: LRU] <-> [DummyTail]

On get(3): Move Node3 to front
[DummyHead] <-> [Node3: MRU] <-> [Node4] <-> [Node1: LRU] <-> [DummyTail]

On put(5, value) with full capacity: Remove Node1 (LRU), add Node5
[DummyHead] <-> [Node5: MRU] <-> [Node3] <-> [Node4: LRU] <-> [DummyTail]
```

## Common Mistakes

1. Forgetting to store key in node (needed for map cleanup on eviction)
2. Not updating node value on put if key exists
3. Forgetting to move node to front on get (it's an access!)
4. Incorrect pointer updates when removing/inserting nodes
5. Not handling capacity = 1 edge case properly
