"""
Flatten a Multilevel Doubly Linked List

Flatten a multilevel doubly linked list where nodes can have children
pointing to separate doubly linked lists.

Time Complexity: O(n)
Space Complexity: O(1) for iterative, O(d) for recursive where d is max depth
"""

from typing import Optional, List, Tuple


class Node:
    """Definition for a multilevel doubly linked list node."""

    def __init__(self, val: int = 0):
        self.val = val
        self.prev: Optional['Node'] = None
        self.next: Optional['Node'] = None
        self.child: Optional['Node'] = None

    def __repr__(self):
        return f"Node({self.val})"


# ==================== HELPER FUNCTIONS ====================

def create_multilevel_list(structure: List) -> Optional[Node]:
    """
    Create a multilevel doubly linked list from a nested structure.

    Structure format: [val, [child_structure], val, ...]
    Example: [1, 2, [7, 8, [11, 12], 9], 3, 4]
    Creates: 1 - 2 - 3 - 4
                 |
                 7 - 8 - 9
                     |
                     11 - 12

    Actually, let's use a simpler format with tuples:
    [(val, child_list), ...] where child_list is None or another list
    """
    if not structure:
        return None

    # First pass: create all nodes
    nodes = []
    for item in structure:
        if isinstance(item, tuple):
            val, child_structure = item
            node = Node(val)
            if child_structure:
                node.child = create_multilevel_list(child_structure)
            nodes.append(node)
        else:
            nodes.append(Node(item))

    # Connect nodes horizontally
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
        nodes[i + 1].prev = nodes[i]

    return nodes[0] if nodes else None


def flatten_to_list(head: Optional[Node]) -> List[int]:
    """Convert flattened list to Python list for testing."""
    result = []
    current = head
    visited = set()

    while current:
        if id(current) in visited:
            raise ValueError("Cycle detected!")
        visited.add(id(current))
        result.append(current.val)
        current = current.next

    return result


def print_multilevel_list(head: Optional[Node], level: int = 0) -> str:
    """Print multilevel list with indentation for children."""
    if not head:
        return "null"

    lines = []
    current = head
    values = []

    while current:
        values.append(str(current.val))
        if current.child:
            if values:
                lines.append("  " * level + " - ".join(values))
                child_start_idx = len(values) - 1
                lines.append("  " * level + " " * (child_start_idx * 4 + 1) + "|")
                lines.append(print_multilevel_list(current.child, level + 1))
                values = []
        current = current.next

    if values:
        lines.append("  " * level + " - ".join(values))

    return "\n".join(lines) if lines else "null"


def print_flat_list(head: Optional[Node]) -> str:
    """Print flattened list."""
    if not head:
        return "null"

    values = []
    current = head
    max_nodes = 50  # Safety limit

    while current and len(values) < max_nodes:
        values.append(str(current.val))
        current = current.next

    return " <-> ".join(values)


def verify_doubly_linked(head: Optional[Node]) -> bool:
    """Verify that all prev/next pointers are correct."""
    if not head:
        return True

    if head.prev is not None:
        return False

    current = head
    while current.next:
        if current.next.prev != current:
            return False
        current = current.next

    return True


# ==================== SOLUTION ====================

class Solution:
    def flatten_iterative(self, head: Optional[Node]) -> Optional[Node]:
        """
        Flatten multilevel list using iterative approach.

        When we find a child, splice the child list between current and next.

        Time: O(n), Space: O(1)
        """
        if not head:
            return None

        current = head

        while current:
            if current.child:
                child = current.child
                next_node = current.next

                # Find tail of child list
                tail = child
                while tail.next:
                    tail = tail.next

                # Connect current -> child
                current.next = child
                child.prev = current
                current.child = None  # Important: remove child pointer

                # Connect tail -> next_node
                if next_node:
                    tail.next = next_node
                    next_node.prev = tail

            current = current.next

        return head

    def flatten_recursive(self, head: Optional[Node]) -> Optional[Node]:
        """
        Flatten multilevel list using recursive approach.

        Time: O(n), Space: O(d) where d is max depth
        """
        if not head:
            return None

        def flatten_and_get_tail(node: Node) -> Node:
            """Flatten starting from node and return tail of flattened list."""
            current = node
            tail = node

            while current:
                next_node = current.next

                if current.child:
                    # Recursively flatten child
                    child_head = current.child
                    child_tail = flatten_and_get_tail(child_head)

                    # Connect current -> child
                    current.next = child_head
                    child_head.prev = current
                    current.child = None

                    # Connect child_tail -> next_node
                    if next_node:
                        child_tail.next = next_node
                        next_node.prev = child_tail

                    tail = child_tail
                else:
                    tail = current

                current = next_node

            return tail

        flatten_and_get_tail(head)
        return head


# ==================== TEST CASES ====================

def test_flatten_multilevel_list():
    solution = Solution()

    print("=" * 60)
    print("FLATTEN MULTILEVEL DOUBLY LINKED LIST - TEST CASES")
    print("=" * 60)

    # Test case 1: Basic multilevel list
    print("\nTest 1: Basic multilevel list")
    # Structure: 1 - 2 - 3 - 4
    #                |
    #                5 - 6
    head = create_multilevel_list([1, (2, [5, 6]), 3, 4])
    print(f"  Input structure:")
    print(f"    1 - 2 - 3 - 4")
    print(f"        |")
    print(f"        5 - 6")
    result = solution.flatten_iterative(head)
    print(f"  Output: {print_flat_list(result)}")
    assert flatten_to_list(result) == [1, 2, 5, 6, 3, 4]
    assert verify_doubly_linked(result)
    print("  PASSED!")

    # Test case 2: Three levels deep
    print("\nTest 2: Three levels deep")
    # Structure: 1 - 2 - 3
    #                |
    #                4 - 5
    #                    |
    #                    6
    head = create_multilevel_list([1, (2, [(4, None), (5, [6])]), 3])
    print(f"  Input structure:")
    print(f"    1 - 2 - 3")
    print(f"        |")
    print(f"        4 - 5")
    print(f"            |")
    print(f"            6")
    result = solution.flatten_iterative(head)
    print(f"  Output: {print_flat_list(result)}")
    assert flatten_to_list(result) == [1, 2, 4, 5, 6, 3]
    assert verify_doubly_linked(result)
    print("  PASSED!")

    # Test case 3: Child at first node
    print("\nTest 3: Child at first node")
    head = create_multilevel_list([(1, [3, 4]), 2])
    print(f"  Input: 1 - 2 with child 3 - 4 at node 1")
    result = solution.flatten_iterative(head)
    print(f"  Output: {print_flat_list(result)}")
    assert flatten_to_list(result) == [1, 3, 4, 2]
    assert verify_doubly_linked(result)
    print("  PASSED!")

    # Test case 4: Empty list
    print("\nTest 4: Empty list")
    result = solution.flatten_iterative(None)
    print(f"  Output: {print_flat_list(result)}")
    assert result is None
    print("  PASSED!")

    # Test case 5: Single node
    print("\nTest 5: Single node")
    head = create_multilevel_list([1])
    result = solution.flatten_iterative(head)
    print(f"  Output: {print_flat_list(result)}")
    assert flatten_to_list(result) == [1]
    print("  PASSED!")

    # Test case 6: No children
    print("\nTest 6: No children (simple list)")
    head = create_multilevel_list([1, 2, 3, 4, 5])
    result = solution.flatten_iterative(head)
    print(f"  Output: {print_flat_list(result)}")
    assert flatten_to_list(result) == [1, 2, 3, 4, 5]
    assert verify_doubly_linked(result)
    print("  PASSED!")

    # Test case 7: Recursive approach
    print("\nTest 7: Recursive approach on complex structure")
    head = create_multilevel_list([1, (2, [5, (6, [8, 9]), 7]), 3, 4])
    print(f"  Input structure:")
    print(f"    1 - 2 - 3 - 4")
    print(f"        |")
    print(f"        5 - 6 - 7")
    print(f"            |")
    print(f"            8 - 9")
    result = solution.flatten_recursive(head)
    print(f"  Output: {print_flat_list(result)}")
    assert flatten_to_list(result) == [1, 2, 5, 6, 8, 9, 7, 3, 4]
    assert verify_doubly_linked(result)
    print("  PASSED!")

    # Test case 8: Child at end
    print("\nTest 8: Child at last node")
    head = create_multilevel_list([1, 2, (3, [4, 5])])
    print(f"  Input: 1 - 2 - 3 with child 4 - 5 at node 3")
    result = solution.flatten_iterative(head)
    print(f"  Output: {print_flat_list(result)}")
    assert flatten_to_list(result) == [1, 2, 3, 4, 5]
    assert verify_doubly_linked(result)
    print("  PASSED!")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    test_flatten_multilevel_list()
