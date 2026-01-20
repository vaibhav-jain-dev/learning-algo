"""
LRU Cache - Python Solution

Implement a Least Recently Used (LRU) Cache with O(1) get and put operations.

Time Complexity: O(1) for both get and put
Space Complexity: O(capacity)
"""

from typing import Optional


class DoublyLinkedNode:
    """Node for the doubly linked list."""

    def __init__(self, key: str = "", value: int = 0):
        self.key = key
        self.value = value
        self.prev: Optional['DoublyLinkedNode'] = None
        self.next: Optional['DoublyLinkedNode'] = None


class LRUCache:
    """
    LRU Cache implementation using Hash Map + Doubly Linked List.

    The doubly linked list maintains the order:
    - Head side: Most recently used
    - Tail side: Least recently used
    """

    def __init__(self, max_size: int):
        """
        Initialize the LRU cache.

        Args:
            max_size: Maximum number of items the cache can hold
        """
        self.capacity = max(1, max_size)  # Ensure at least 1
        self.cache: dict[str, DoublyLinkedNode] = {}

        # Dummy head and tail to simplify edge cases
        self.head = DoublyLinkedNode()
        self.tail = DoublyLinkedNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: str) -> int:
        """
        Get value by key.

        Args:
            key: The key to look up

        Returns:
            int: The value if found, -1 otherwise
        """
        if key not in self.cache:
            return -1

        # Move to head (mark as most recently used)
        node = self.cache[key]
        self._move_to_head(node)

        return node.value

    def put(self, key: str, value: int) -> None:
        """
        Insert or update a key-value pair.

        Args:
            key: The key
            value: The value to store
        """
        if key in self.cache:
            # Update existing node
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            # Create new node
            new_node = DoublyLinkedNode(key, value)

            # Add to cache and list
            self.cache[key] = new_node
            self._add_to_head(new_node)

            # Check capacity
            if len(self.cache) > self.capacity:
                # Remove least recently used (tail)
                removed = self._remove_tail()
                del self.cache[removed.key]

    def _add_to_head(self, node: DoublyLinkedNode) -> None:
        """Add a node right after the dummy head."""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node: DoublyLinkedNode) -> None:
        """Remove a node from its current position."""
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node: DoublyLinkedNode) -> None:
        """Move an existing node to the head."""
        self._remove_node(node)
        self._add_to_head(node)

    def _remove_tail(self) -> DoublyLinkedNode:
        """Remove and return the tail node (least recently used)."""
        node = self.tail.prev
        self._remove_node(node)
        return node

    def __repr__(self) -> str:
        """String representation showing order from most to least recent."""
        items = []
        current = self.head.next
        while current != self.tail:
            items.append(f"{current.key}={current.value}")
            current = current.next
        return f"LRUCache([{', '.join(items)}])"


class LRUCacheSimple:
    """
    Simplified LRU Cache using Python's OrderedDict.

    This is more Pythonic but less educational for understanding the algorithm.
    """

    def __init__(self, max_size: int):
        from collections import OrderedDict
        self.capacity = max(1, max_size)
        self.cache: 'OrderedDict[str, int]' = OrderedDict()

    def get(self, key: str) -> int:
        if key not in self.cache:
            return -1
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: str, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            # Remove oldest (first) item
            self.cache.popitem(last=False)


# Test cases
if __name__ == "__main__":
    print("=== LRU Cache Tests ===\n")

    # Test 1: Basic operations
    print("Test 1: Basic operations")
    cache1 = LRUCache(3)
    cache1.put("a", 1)
    cache1.put("b", 2)
    cache1.put("c", 3)
    print(f"After inserting a=1, b=2, c=3: {cache1}")
    print(f"get('a') = {cache1.get('a')}")
    print(f"After accessing 'a': {cache1}")
    # Expected: a is now most recent

    # Test 2: Eviction
    print("\nTest 2: Eviction")
    cache1.put("d", 4)  # Should evict 'b' (least recently used)
    print(f"After inserting d=4: {cache1}")
    print(f"get('b') = {cache1.get('b')}")  # Should be -1
    # Expected: b was evicted

    # Test 3: Update existing key
    print("\nTest 3: Update existing key")
    cache2 = LRUCache(2)
    cache2.put("x", 10)
    cache2.put("y", 20)
    print(f"Initial: {cache2}")
    cache2.put("x", 100)  # Update x
    print(f"After updating x=100: {cache2}")
    cache2.put("z", 30)  # Should evict y
    print(f"After inserting z=30: {cache2}")
    print(f"get('y') = {cache2.get('y')}")  # Should be -1
    # Expected: x was updated and moved to front, y evicted

    # Test 4: Capacity 1
    print("\nTest 4: Capacity 1")
    cache3 = LRUCache(1)
    cache3.put("only", 42)
    print(f"After inserting only=42: {cache3}")
    cache3.put("new", 99)
    print(f"After inserting new=99: {cache3}")
    print(f"get('only') = {cache3.get('only')}")  # Should be -1
    print(f"get('new') = {cache3.get('new')}")    # Should be 99

    # Test 5: Access pattern affects eviction
    print("\nTest 5: Access pattern affects eviction")
    cache4 = LRUCache(3)
    cache4.put("1", 1)
    cache4.put("2", 2)
    cache4.put("3", 3)
    print(f"Initial: {cache4}")
    cache4.get("1")  # Access 1, making it most recent
    cache4.get("2")  # Access 2, making it most recent
    print(f"After accessing 1 then 2: {cache4}")
    cache4.put("4", 4)  # Should evict 3 (least recently used)
    print(f"After inserting 4: {cache4}")
    print(f"get('3') = {cache4.get('3')}")  # Should be -1

    # Test 6: OrderedDict implementation
    print("\nTest 6: OrderedDict implementation")
    cache5 = LRUCacheSimple(3)
    cache5.put("a", 1)
    cache5.put("b", 2)
    cache5.put("c", 3)
    print(f"get('a') = {cache5.get('a')}")
    cache5.put("d", 4)
    print(f"get('b') = {cache5.get('b')}")  # Should be -1 (evicted)

    # Test 7: Multiple gets
    print("\nTest 7: Multiple gets on same key")
    cache6 = LRUCache(2)
    cache6.put("p", 100)
    cache6.put("q", 200)
    for _ in range(5):
        cache6.get("p")  # Multiple accesses to p
    cache6.put("r", 300)  # Should evict q
    print(f"get('p') = {cache6.get('p')}")  # Should be 100
    print(f"get('q') = {cache6.get('q')}")  # Should be -1

    print("\nAll tests completed!")
