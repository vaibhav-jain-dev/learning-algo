"""
LRU Cache Implementation

Two approaches:
1. Manual implementation with HashMap + Doubly Linked List
2. Python's OrderedDict (simpler but less educational)
"""

from collections import OrderedDict


# ============================================================
# Approach 1: Manual Implementation (Interview-style)
# ============================================================

class Node:
    """Doubly linked list node."""

    def __init__(self, key: int = 0, value: int = 0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCache:
    """
    LRU Cache with O(1) get and put.

    Data Structures:
    - HashMap: key -> Node (for O(1) lookup)
    - Doubly Linked List: for O(1) order tracking

    List order:
    - Head -> Least Recently Used (to evict)
    - Tail -> Most Recently Used (just accessed)
    """

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> Node

        # Sentinel nodes (dummy head and tail)
        # Simplifies edge cases - never need null checks
        self.head = Node()  # LRU end
        self.tail = Node()  # MRU end
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node: Node) -> None:
        """Remove node from doubly linked list. O(1)"""
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    def _add_to_tail(self, node: Node) -> None:
        """Add node just before tail (most recent position). O(1)"""
        prev_node = self.tail.prev
        prev_node.next = node
        node.prev = prev_node
        node.next = self.tail
        self.tail.prev = node

    def _move_to_tail(self, node: Node) -> None:
        """Move existing node to most recent position. O(1)"""
        self._remove(node)
        self._add_to_tail(node)

    def get(self, key: int) -> int:
        """
        Get value by key. Returns -1 if not found.
        Updates recency (moves to tail).
        Time: O(1)
        """
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._move_to_tail(node)  # Update recency
        return node.value

    def put(self, key: int, value: int) -> None:
        """
        Add or update key-value pair.
        Evicts LRU if over capacity.
        Time: O(1)
        """
        if key in self.cache:
            # Update existing
            node = self.cache[key]
            node.value = value
            self._move_to_tail(node)
        else:
            # Add new
            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add_to_tail(new_node)

            # Evict if over capacity
            if len(self.cache) > self.capacity:
                # Remove from head (LRU)
                lru_node = self.head.next
                self._remove(lru_node)
                del self.cache[lru_node.key]


# ============================================================
# Approach 2: Using OrderedDict (Pythonic way)
# ============================================================

class LRUCacheOrderedDict:
    """
    LRU Cache using Python's OrderedDict.
    Simpler but less educational for interviews.
    """

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        # move_to_end is O(1) in OrderedDict
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value

        if len(self.cache) > self.capacity:
            # popitem(last=False) removes first item (LRU)
            self.cache.popitem(last=False)


# ============================================================
# Tests
# ============================================================

def test_lru_cache(cache_class, name):
    """Test LRU cache implementation."""
    print(f"Testing {name}")
    print("=" * 50)

    cache = cache_class(2)

    # Test sequence from problem
    tests = [
        ("put", 1, 1, None),
        ("put", 2, 2, None),
        ("get", 1, None, 1),
        ("put", 3, 3, None),  # Evicts 2
        ("get", 2, None, -1),  # 2 was evicted
        ("put", 4, 4, None),  # Evicts 1
        ("get", 1, None, -1),  # 1 was evicted
        ("get", 3, None, 3),
        ("get", 4, None, 4),
    ]

    for op, key, value, expected in tests:
        if op == "put":
            cache.put(key, value)
            print(f"  put({key}, {value})")
        else:
            result = cache.get(key)
            status = "PASS" if result == expected else "FAIL"
            print(f"  [{status}] get({key}) = {result} (expected {expected})")

    print()


def test_edge_cases():
    """Test edge cases."""
    print("Testing Edge Cases")
    print("=" * 50)

    # Capacity 1
    cache = LRUCache(1)
    cache.put(1, 1)
    cache.put(2, 2)  # Evicts 1
    result = cache.get(1)
    print(f"  [{'PASS' if result == -1 else 'FAIL'}] Capacity 1: get(1) after eviction = {result}")

    # Update existing key
    cache = LRUCache(2)
    cache.put(1, 1)
    cache.put(1, 10)  # Update, not insert
    result = cache.get(1)
    print(f"  [{'PASS' if result == 10 else 'FAIL'}] Update value: get(1) = {result}")

    # Get updates recency
    cache = LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    cache.get(1)  # 1 is now most recent
    cache.put(3, 3)  # Should evict 2, not 1
    result1 = cache.get(1)
    result2 = cache.get(2)
    print(f"  [{'PASS' if result1 == 1 and result2 == -1 else 'FAIL'}] Get updates recency")

    print()


if __name__ == "__main__":
    test_lru_cache(LRUCache, "Manual Implementation")
    test_lru_cache(LRUCacheOrderedDict, "OrderedDict Implementation")
    test_edge_cases()
    print("All tests completed!")
