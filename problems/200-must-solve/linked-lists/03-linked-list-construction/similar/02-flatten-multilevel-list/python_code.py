"""
Flatten a Multilevel Doubly Linked List - Python Solutions

Flatten a multilevel doubly linked list where nodes have child pointers.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from __future__ import annotations
from typing import Optional


class Node:
    """Represents a node in a multilevel doubly linked list."""

    def __init__(
        self,
        val: int = 0,
        prev: Optional[Node] = None,
        next: Optional[Node] = None,
        child: Optional[Node] = None,
    ):
        self.val = val
        self.prev = prev
        self.next = next
        self.child = child


# ============================================================================
# APPROACH 1: Iterative with Stack - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - visit each node once
# Space Complexity: O(depth) - stack stores nodes with children
#
# WHY THIS IS BEST:
# - Clear iterative logic
# - Stack naturally handles nesting
# - Easy to trace execution
# ============================================================================


def flatten_with_stack(head: Optional[Node]) -> Optional[Node]:
    """
    Flatten the list using a stack.

    Key Insight: When we see a child, push 'next' to stack, process child.
    When we reach the end, pop from stack to continue.

    Visual:
        1 -- 2 -- 3 -- 4        Stack: []
                  |
                  7 -- 8

        At 3: push 4 to stack, go to 7
        1 -- 2 -- 3 -- 7 -- 8   Stack: [4]

        At 8: pop 4, connect
        1 -- 2 -- 3 -- 7 -- 8 -- 4
    """
    if not head:
        return None

    # Stack to save nodes to revisit
    stack: list[Node] = []
    current = head

    while current:
        # If current has a child, process it
        if current.child:
            # Save next to stack if it exists
            if current.next:
                stack.append(current.next)

            # Connect current to child
            current.next = current.child
            current.child.prev = current
            current.child = None  # Clear child pointer

        # If no next but stack has nodes, pop and connect
        if not current.next and stack:
            next_node = stack.pop()
            current.next = next_node
            next_node.prev = current

        current = current.next

    return head


# ============================================================================
# APPROACH 2: Iterative without Stack
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1) - no extra data structures
#
# WHEN TO USE:
# - When space is critical
# - Slightly more complex logic
# ============================================================================


def flatten_no_stack(head: Optional[Node]) -> Optional[Node]:
    """
    Flatten without using a stack.

    Key Insight: When we find a child, find the tail of child list,
    then connect: current -> child, tail -> current.next
    """
    if not head:
        return None

    current = head

    while current:
        if current.child:
            # Find the tail of the child list
            tail = current.child
            while tail.next:
                tail = tail.next

            # Save next
            next_node = current.next

            # Connect current to child
            current.next = current.child
            current.child.prev = current
            current.child = None

            # Connect tail to saved next
            if next_node:
                tail.next = next_node
                next_node.prev = tail

        current = current.next

    return head


# ============================================================================
# APPROACH 3: Recursive DFS
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(depth) - recursion stack
#
# WHEN TO USE:
# - When recursive thinking is preferred
# - Elegant handling of nested structure
# ============================================================================


def flatten_recursive(head: Optional[Node]) -> Optional[Node]:
    """
    Use recursive DFS to flatten.

    The helper function returns the tail of the flattened portion.
    """
    if not head:
        return None

    def flatten_helper(node: Optional[Node]) -> Optional[Node]:
        """Returns the tail of the flattened list starting from node."""
        tail: Optional[Node] = None

        while node:
            next_node = node.next

            if node.child:
                # Recursively flatten child
                child_tail = flatten_helper(node.child)

                # Connect node to child
                node.next = node.child
                node.child.prev = node
                node.child = None

                # Connect child tail to next
                if next_node:
                    child_tail.next = next_node
                    next_node.prev = child_tail

                tail = child_tail
            else:
                tail = node

            node = next_node

        return tail

    flatten_helper(head)
    return head


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================


def create_test_list() -> Optional[Node]:
    """
    Create: 1-2-3-4-5-6 with 3->7-8-9-10 and 8->11-12

    Structure:
        1 -- 2 -- 3 -- 4 -- 5 -- 6
                  |
                  7 -- 8 -- 9 -- 10
                       |
                       11 -- 12
    """
    # Level 1
    n1 = Node(val=1)
    n2 = Node(val=2)
    n3 = Node(val=3)
    n4 = Node(val=4)
    n5 = Node(val=5)
    n6 = Node(val=6)

    n1.next = n2
    n2.prev = n1
    n2.next = n3
    n3.prev = n2
    n3.next = n4
    n4.prev = n3
    n4.next = n5
    n5.prev = n4
    n5.next = n6
    n6.prev = n5

    # Level 2
    n7 = Node(val=7)
    n8 = Node(val=8)
    n9 = Node(val=9)
    n10 = Node(val=10)

    n7.next = n8
    n8.prev = n7
    n8.next = n9
    n9.prev = n8
    n9.next = n10
    n10.prev = n9

    n3.child = n7

    # Level 3
    n11 = Node(val=11)
    n12 = Node(val=12)

    n11.next = n12
    n12.prev = n11

    n8.child = n11

    return n1


def create_simple_list() -> Optional[Node]:
    """Create 1-2 with 1->3 (child)."""
    n1 = Node(val=1)
    n2 = Node(val=2)
    n3 = Node(val=3)

    n1.next = n2
    n2.prev = n1
    n1.child = n3

    return n1


def list_to_array(head: Optional[Node]) -> list[int]:
    """Convert a flattened list to an array."""
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result


def print_list(head: Optional[Node]) -> None:
    """Print the flattened list."""
    if not head:
        print("empty")
        return

    values = []
    while head:
        values.append(str(head.val))
        head = head.next

    print(" <-> ".join(values))


# ============================================================================
# TEST CASES
# ============================================================================


def run_tests():
    """Run comprehensive tests for all approaches."""

    approaches = [
        ("Stack-based (Recommended)", flatten_with_stack),
        ("No Stack", flatten_no_stack),
        ("Recursive", flatten_recursive),
    ]

    test_cases = [
        # (create_function, expected, description)
        (create_test_list, [1, 2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6], "Standard 3-level"),
        (create_simple_list, [1, 3, 2], "Simple with child"),
        (lambda: None, [], "Empty list"),
        (lambda: Node(val=1), [1], "Single node"),
    ]

    print("=" * 70)
    print("FLATTEN MULTILEVEL DOUBLY LINKED LIST - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for create_fn, expected, desc in test_cases:
            head = create_fn()
            result = func(head)
            result_array = list_to_array(result)

            passed = result_array == expected
            status = "PASS" if passed else "FAIL"
            if not passed:
                all_passed = False

            print(f"  [{status}] {desc}")
            print(f"         Expected: {expected}")
            print(f"         Got:      {result_array}")

        if all_passed:
            print("  All tests passed!")


if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("VISUAL DEMONSTRATION")
    print("=" * 70)

    print("\nBefore flattening (conceptual):")
    print("  1 <-> 2 <-> 3 <-> 4 <-> 5 <-> 6")
    print("              |")
    print("              7 <-> 8 <-> 9 <-> 10")
    print("                    |")
    print("                    11 <-> 12")

    demo = create_test_list()
    result = flatten_with_stack(demo)
    print("\nAfter flattening: ", end="")
    print_list(result)
