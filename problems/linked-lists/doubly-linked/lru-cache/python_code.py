"""
LRU Cache

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
Operations get and put must run in O(1) time complexity.

Implementation uses:
- Hash Map for O(1) key lookup
- Doubly Linked List for O(1) LRU ordering operations

Time Complexity: O(1) for get and put
Space Complexity: O(capacity)
"""

from typing import Dict, Optional


class DLLNode:
    """Doubly Linked List Node for LRU Cache."""

    def __init__(self, key: int = 0, value: int = 0):
        self.key = key          # Key is stored to remove from hashmap on eviction
        self.value = value
        self.prev: Optional['DLLNode'] = None
        self.next: Optional['DLLNode'] = None

    def __repr__(self):
        return f"Node({self.key}:{self.value})"


class LRUCache:
    """
    LRU Cache implementation using Hash Map + Doubly Linked List.

    The doubly linked list maintains usage order:
    - Head side = Most Recently Used (MRU)
    - Tail side = Least Recently Used (LRU)
    """

    def __init__(self, capacity: int):
        """Initialize LRU cache with given capacity."""
        self.capacity = capacity
        self.cache: Dict[int, DLLNode] = {}  # key -> node

        # Dummy head and tail to simplify edge cases
        self.head = DLLNode()  # Dummy head (MRU side)
        self.tail = DLLNode()  # Dummy tail (LRU side)
        self.head.next = self.tail
        self.tail.prev = self.head

    def _add_to_head(self, node: DLLNode) -> None:
        """Add node right after dummy head (most recently used position)."""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node: DLLNode) -> None:
        """Remove node from its current position in the list."""
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    def _move_to_head(self, node: DLLNode) -> None:
        """Move existing node to head (mark as most recently used)."""
        self._remove_node(node)
        self._add_to_head(node)

    def _pop_tail(self) -> DLLNode:
        """Remove and return the LRU node (just before dummy tail)."""
        lru_node = self.tail.prev
        self._remove_node(lru_node)
        return lru_node

    def get(self, key: int) -> int:
        """
        Get value by key.

        Returns value if key exists (and moves to MRU), otherwise -1.
        """
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._move_to_head(node)  # Mark as recently used
        return node.value

    def put(self, key: int, value: int) -> None:
        """
        Put key-value pair into cache.

        If key exists, update value and move to MRU.
        If key doesn't exist, add new entry. Evict LRU if over capacity.
        """
        if key in self.cache:
            # Update existing node
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            # Create new node
            new_node = DLLNode(key, value)
            self.cache[key] = new_node
            self._add_to_head(new_node)

            # Check capacity and evict if necessary
            if len(self.cache) > self.capacity:
                lru_node = self._pop_tail()
                del self.cache[lru_node.key]

    def __str__(self) -> str:
        """String representation showing cache order (MRU to LRU)."""
        items = []
        current = self.head.next
        while current != self.tail:
            items.append(f"{current.key}:{current.value}")
            current = current.next
        return f"LRUCache([{' -> '.join(items)}])"


# ==================== TEST CASES ====================

def test_lru_cache():
    print("=" * 60)
    print("LRU CACHE - TEST CASES")
    print("=" * 60)

    # Test case 1: Basic operations from example
    print("\nTest 1: Basic operations (capacity=2)")
    cache = LRUCache(2)
    print(f"  Initial: {cache}")

    cache.put(1, 1)
    print(f"  put(1,1): {cache}")

    cache.put(2, 2)
    print(f"  put(2,2): {cache}")

    result = cache.get(1)
    print(f"  get(1)={result}: {cache}")
    assert result == 1, f"Expected 1, got {result}"

    cache.put(3, 3)  # Evicts key 2
    print(f"  put(3,3): {cache} (evicted key 2)")

    result = cache.get(2)
    print(f"  get(2)={result} (should be -1, was evicted)")
    assert result == -1, f"Expected -1, got {result}"

    cache.put(4, 4)  # Evicts key 1
    print(f"  put(4,4): {cache} (evicted key 1)")

    result = cache.get(1)
    print(f"  get(1)={result} (should be -1)")
    assert result == -1

    result = cache.get(3)
    print(f"  get(3)={result}")
    assert result == 3

    result = cache.get(4)
    print(f"  get(4)={result}")
    assert result == 4
    print("  PASSED!")

    # Test case 2: Capacity 1
    print("\nTest 2: Capacity 1")
    cache = LRUCache(1)

    cache.put(2, 1)
    print(f"  put(2,1): {cache}")

    result = cache.get(2)
    print(f"  get(2)={result}")
    assert result == 1

    cache.put(3, 2)
    print(f"  put(3,2): {cache} (evicted key 2)")

    result = cache.get(2)
    print(f"  get(2)={result} (should be -1)")
    assert result == -1

    result = cache.get(3)
    print(f"  get(3)={result}")
    assert result == 2
    print("  PASSED!")

    # Test case 3: Update existing key
    print("\nTest 3: Update existing key")
    cache = LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    print(f"  Initial: {cache}")

    cache.put(1, 10)  # Update key 1
    print(f"  put(1,10): {cache}")

    result = cache.get(1)
    print(f"  get(1)={result} (should be 10)")
    assert result == 10

    cache.put(3, 3)  # Should evict key 2, not key 1
    print(f"  put(3,3): {cache}")

    result = cache.get(2)
    print(f"  get(2)={result} (should be -1, was evicted)")
    assert result == -1
    print("  PASSED!")

    # Test case 4: Access pattern matters
    print("\nTest 4: Access pattern affects eviction")
    cache = LRUCache(3)
    cache.put(1, 1)
    cache.put(2, 2)
    cache.put(3, 3)
    print(f"  Initial: {cache}")

    cache.get(1)  # Access 1, making it MRU
    print(f"  get(1): {cache}")

    cache.get(2)  # Access 2, making it MRU
    print(f"  get(2): {cache}")

    cache.put(4, 4)  # Should evict 3 (LRU)
    print(f"  put(4,4): {cache} (evicted key 3)")

    result = cache.get(3)
    assert result == -1
    result = cache.get(1)
    assert result == 1
    result = cache.get(2)
    assert result == 2
    print("  PASSED!")

    # Test case 5: Larger capacity
    print("\nTest 5: Larger capacity (5)")
    cache = LRUCache(5)
    for i in range(5):
        cache.put(i, i * 10)
    print(f"  Initial: {cache}")

    # Access in specific order
    cache.get(0)
    cache.get(4)
    cache.get(2)
    print(f"  After accessing 0, 4, 2: {cache}")

    # Add new item, should evict 1 (LRU)
    cache.put(10, 100)
    print(f"  put(10,100): {cache}")

    result = cache.get(1)
    assert result == -1, "Key 1 should have been evicted"
    print(f"  get(1)={result} (evicted)")

    result = cache.get(3)
    assert result == 30, "Key 3 should still exist"
    print(f"  get(3)={result}")
    print("  PASSED!")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    test_lru_cache()
