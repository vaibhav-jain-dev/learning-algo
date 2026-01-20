"""
Linked List Construction - Python Solution

Implement a doubly linked list with various operations.

Time Complexity: O(1) for most operations, O(n) for search/remove by value
Space Complexity: O(1) for all operations
"""

from __future__ import annotations
from typing import Optional


class Node:
    """Node for a doubly linked list."""

    def __init__(self, value: int) -> None:
        self.value = value
        self.prev: Optional[Node] = None
        self.next: Optional[Node] = None


class DoublyLinkedList:
    """
    Doubly linked list implementation with comprehensive operations.

    Supports setHead, setTail, insertBefore, insertAfter, insertAtPosition,
    removeNodesWithValue, remove, and containsNodeWithValue.
    """

    def __init__(self) -> None:
        self.head: Optional[Node] = None
        self.tail: Optional[Node] = None

    def set_head(self, node: Node) -> None:
        """
        Set the given node as the head of the list.

        If node is already in the list, it's moved to the head position.
        Time: O(1)
        """
        if self.head == node:
            return

        self.insert_before(self.head, node)

    def set_tail(self, node: Node) -> None:
        """
        Set the given node as the tail of the list.

        If node is already in the list, it's moved to the tail position.
        Time: O(1)
        """
        if self.tail == node:
            return

        self.insert_after(self.tail, node)

    def insert_before(self, node: Optional[Node], node_to_insert: Node) -> None:
        """
        Insert nodeToInsert before node.

        If nodeToInsert is already in the list, it's moved.
        Time: O(1)
        """
        # Don't insert node before itself
        if node_to_insert == node:
            return

        # Remove from current position if in list
        self.remove(node_to_insert)

        # If list is empty or node is None, set as head and tail
        if node is None:
            self.head = node_to_insert
            self.tail = node_to_insert
            return

        # Update pointers
        node_to_insert.prev = node.prev
        node_to_insert.next = node

        if node.prev is None:
            # node was the head
            self.head = node_to_insert
        else:
            node.prev.next = node_to_insert

        node.prev = node_to_insert

    def insert_after(self, node: Optional[Node], node_to_insert: Node) -> None:
        """
        Insert nodeToInsert after node.

        If nodeToInsert is already in the list, it's moved.
        Time: O(1)
        """
        # Don't insert node after itself
        if node_to_insert == node:
            return

        # Remove from current position if in list
        self.remove(node_to_insert)

        # If list is empty or node is None, set as head and tail
        if node is None:
            self.head = node_to_insert
            self.tail = node_to_insert
            return

        # Update pointers
        node_to_insert.prev = node
        node_to_insert.next = node.next

        if node.next is None:
            # node was the tail
            self.tail = node_to_insert
        else:
            node.next.prev = node_to_insert

        node.next = node_to_insert

    def insert_at_position(self, position: int, node_to_insert: Node) -> None:
        """
        Insert nodeToInsert at the given 1-indexed position.

        Time: O(p) where p is the position
        """
        if position == 1:
            self.set_head(node_to_insert)
            return

        # Find the node at that position
        current = self.head
        current_position = 1

        while current is not None and current_position < position:
            current = current.next
            current_position += 1

        if current is not None:
            self.insert_before(current, node_to_insert)
        else:
            # Position is beyond list length, insert at tail
            self.set_tail(node_to_insert)

    def remove_nodes_with_value(self, value: int) -> None:
        """
        Remove all nodes with the given value.

        Time: O(n)
        """
        current = self.head

        while current is not None:
            next_node = current.next
            if current.value == value:
                self.remove(current)
            current = next_node

    def remove(self, node: Node) -> None:
        """
        Remove the given node from the list.

        Time: O(1)
        """
        if node is None:
            return

        # Update head/tail if necessary
        if self.head == node:
            self.head = node.next
        if self.tail == node:
            self.tail = node.prev

        # Update neighbors' pointers
        if node.prev is not None:
            node.prev.next = node.next
        if node.next is not None:
            node.next.prev = node.prev

        # Clear node's pointers
        node.prev = None
        node.next = None

    def contains_node_with_value(self, value: int) -> bool:
        """
        Check if any node in the list has the given value.

        Time: O(n)
        """
        current = self.head

        while current is not None:
            if current.value == value:
                return True
            current = current.next

        return False

    def to_list(self) -> list[int]:
        """Convert linked list to Python list for testing."""
        result = []
        current = self.head
        while current is not None:
            result.append(current.value)
            current = current.next
        return result

    def __repr__(self) -> str:
        """String representation of the list."""
        return " <-> ".join(str(x) for x in self.to_list())


# Test cases
if __name__ == "__main__":
    # Create nodes
    node1 = Node(1)
    node2 = Node(2)
    node3 = Node(3)
    node4 = Node(4)
    node5 = Node(5)
    node6 = Node(6)

    # Build initial list: 1 <-> 2 <-> 3 <-> 4 <-> 5
    dll = DoublyLinkedList()
    dll.set_head(node1)
    dll.insert_after(node1, node2)
    dll.insert_after(node2, node3)
    dll.insert_after(node3, node4)
    dll.insert_after(node4, node5)

    print(f"Initial list: {dll}")  # 1 <-> 2 <-> 3 <-> 4 <-> 5
    assert dll.to_list() == [1, 2, 3, 4, 5]

    # Test setHead - move node4 to head
    dll.set_head(node4)
    print(f"After setHead(4): {dll}")  # 4 <-> 1 <-> 2 <-> 3 <-> 5
    assert dll.to_list() == [4, 1, 2, 3, 5]

    # Test setTail - add node6 at tail
    dll.set_tail(node6)
    print(f"After setTail(6): {dll}")  # 4 <-> 1 <-> 2 <-> 3 <-> 5 <-> 6
    assert dll.to_list() == [4, 1, 2, 3, 5, 6]

    # Test insertBefore - move node3 before node6
    dll.insert_before(node6, node3)
    print(f"After insertBefore(6, 3): {dll}")  # 4 <-> 1 <-> 2 <-> 5 <-> 3 <-> 6
    assert dll.to_list() == [4, 1, 2, 5, 3, 6]

    # Test insertAfter - move node3 after node6
    dll.insert_after(node6, node3)
    print(f"After insertAfter(6, 3): {dll}")  # 4 <-> 1 <-> 2 <-> 5 <-> 6 <-> 3
    assert dll.to_list() == [4, 1, 2, 5, 6, 3]

    # Test insertAtPosition - move node3 to position 1
    dll.insert_at_position(1, node3)
    print(f"After insertAtPosition(1, 3): {dll}")  # 3 <-> 4 <-> 1 <-> 2 <-> 5 <-> 6
    assert dll.to_list() == [3, 4, 1, 2, 5, 6]

    # Test containsNodeWithValue
    assert dll.contains_node_with_value(5) is True
    assert dll.contains_node_with_value(99) is False
    print("containsNodeWithValue tests passed!")

    # Test removeNodesWithValue
    dll.remove_nodes_with_value(3)
    print(f"After removeNodesWithValue(3): {dll}")  # 4 <-> 1 <-> 2 <-> 5 <-> 6
    assert dll.to_list() == [4, 1, 2, 5, 6]

    # Test remove
    dll.remove(node2)
    print(f"After remove(2): {dll}")  # 4 <-> 1 <-> 5 <-> 6
    assert dll.to_list() == [4, 1, 5, 6]

    # Test edge case: single node
    single_list = DoublyLinkedList()
    single_node = Node(10)
    single_list.set_head(single_node)
    assert single_list.head == single_node
    assert single_list.tail == single_node
    print(f"Single node list: {single_list}")

    # Test edge case: remove only node
    single_list.remove(single_node)
    assert single_list.head is None
    assert single_list.tail is None
    print("Remove single node test passed!")

    # Test insertAtPosition beyond length
    new_list = DoublyLinkedList()
    new_node = Node(100)
    new_list.insert_at_position(5, new_node)  # Should just set as head/tail
    assert new_list.head == new_node
    assert new_list.tail == new_node
    print("Insert at position beyond length test passed!")

    print("\nAll tests passed!")
