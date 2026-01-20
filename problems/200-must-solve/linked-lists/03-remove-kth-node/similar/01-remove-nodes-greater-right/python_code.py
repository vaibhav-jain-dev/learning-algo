"""
Remove Nodes With Greater Value on Right - Python Solutions

Given a linked list, remove all nodes that have a greater value anywhere to their right.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from __future__ import annotations
from typing import Optional


class ListNode:
    """Represents a node in a singly linked list."""

    def __init__(self, val: int = 0, next: Optional[ListNode] = None):
        self.val = val
        self.next = next


# ============================================================================
# APPROACH 1: Reverse, Filter, Reverse - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - three passes
# Space Complexity: O(1) - in-place modification
#
# WHY THIS IS BEST:
# - Constant extra space
# - Easy to understand: reverse makes "right" become "left"
# - After reverse, keep node if it's >= max seen so far
# ============================================================================


def remove_nodes_reverse(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Remove nodes by reversing, filtering, and reversing back.

    Key Insight: After reversing, "greater on right" becomes "greater on left".
    We can then filter in a single pass, keeping running maximum.

    Visual:
        Original: 5 -> 2 -> 13 -> 3 -> 8
        Reverse:  8 -> 3 -> 13 -> 2 -> 5
        Filter:   8 -> 13 (keep if val >= max_so_far)
        Reverse:  13 -> 8
    """
    if not head or not head.next:
        return head

    # Step 1: Reverse the list
    def reverse(node: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        current = node
        while current:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
        return prev

    head = reverse(head)

    # Step 2: Filter nodes - keep if value >= max seen so far
    max_val = head.val
    current = head

    while current.next:
        if current.next.val < max_val:
            # Remove this node
            current.next = current.next.next
        else:
            # Keep this node, update max
            max_val = current.next.val
            current = current.next

    # Step 3: Reverse back
    return reverse(head)


# ============================================================================
# APPROACH 2: Recursion (Process Right First)
# ============================================================================
# Time Complexity:  O(n) - visit each node once
# Space Complexity: O(n) - recursion stack
#
# WHEN TO USE:
# - Clean recursive logic
# - List not too long (stack depth limit)
# ============================================================================


def remove_nodes_recursive(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Remove nodes using recursion, processing from right to left.

    Key Insight: Recursively process the rest first, then decide about current.
    The recursive call returns the max value seen to the right.

    Visual (recursion unwinding):
        Process 8: return (8, max=8)
        Process 3: 3 < 8, remove, return (8, max=8)
        Process 13: 13 >= 8, keep, return (13->8, max=13)
        Process 2: 2 < 13, remove, return (13->8, max=13)
        Process 5: 5 < 13, remove, return (13->8, max=13)
    """
    if not head:
        return None

    # Process the rest of the list first
    head.next = remove_nodes_recursive(head.next)

    # If there's a greater value on the right, remove current
    if head.next and head.val < head.next.val:
        return head.next

    return head


# ============================================================================
# APPROACH 3: Stack-Based
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) - stack storage
#
# WHEN TO USE:
# - Prefer iterative over recursive
# - Clear stack-based logic
# ============================================================================


def remove_nodes_stack(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Remove nodes using a monotonic decreasing stack.

    Key Insight: Maintain a stack where values are non-increasing.
    When we see a larger value, pop smaller values from stack.
    """
    if not head:
        return None

    stack: list[ListNode] = []
    current = head

    # Process all nodes
    while current:
        # Pop nodes smaller than current (they have greater on right)
        while stack and stack[-1].val < current.val:
            stack.pop()

        stack.append(current)
        current = current.next

    # Rebuild list from stack
    for i in range(len(stack) - 1):
        stack[i].next = stack[i + 1]

    if stack:
        stack[-1].next = None

    return stack[0] if stack else None


# ============================================================================
# APPROACH 4: Using Dummy Node
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - Cleaner edge case handling with dummy node
# ============================================================================


def remove_nodes_dummy(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Stack-based with dummy node for cleaner code.
    """
    if not head:
        return None

    dummy = ListNode(val=float("inf"))  # Dummy with infinite value never removed
    dummy.next = head
    stack: list[ListNode] = [dummy]

    current = head
    while current:
        while stack[-1].val < current.val:
            stack.pop()

        stack[-1].next = current
        stack.append(current)
        current = current.next

    stack[-1].next = None
    return dummy.next


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================


def create_list(vals: list[int]) -> Optional[ListNode]:
    """Create a linked list from a list of values."""
    if not vals:
        return None

    head = ListNode(vals[0])
    current = head

    for val in vals[1:]:
        current.next = ListNode(val)
        current = current.next

    return head


def list_to_array(head: Optional[ListNode]) -> list[int]:
    """Convert a linked list to a list of values."""
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result


def print_list(head: Optional[ListNode]) -> None:
    """Print the linked list."""
    if not head:
        print("empty")
        return

    values = []
    while head:
        values.append(str(head.val))
        head = head.next

    print(" -> ".join(values))


# ============================================================================
# TEST CASES
# ============================================================================


def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (input, expected, description)
        ([5, 2, 13, 3, 8], [13, 8], "Mixed values"),
        ([1, 1, 1, 1], [1, 1, 1, 1], "All equal values"),
        ([5, 4, 3, 2, 1], [5, 4, 3, 2, 1], "Strictly decreasing"),
        ([1, 2, 3, 4, 5], [5], "Strictly increasing"),
        ([1], [1], "Single node"),
        ([2, 1], [2, 1], "Two nodes, decreasing"),
        ([1, 2], [2], "Two nodes, increasing"),
        ([], [], "Empty list"),
    ]

    approaches = [
        ("Reverse-Filter-Reverse (Recommended)", remove_nodes_reverse),
        ("Recursion", remove_nodes_recursive),
        ("Stack-Based", remove_nodes_stack),
        ("Dummy Node", remove_nodes_dummy),
    ]

    print("=" * 70)
    print("REMOVE NODES WITH GREATER VALUE ON RIGHT - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for input_vals, expected, desc in test_cases:
            # Create fresh list for each test
            head = create_list(input_vals)
            result = func(head)
            result_array = list_to_array(result)

            passed = result_array == expected
            status = "PASS" if passed else "FAIL"
            if not passed:
                all_passed = False

            print(f"  [{status}] {desc}")
            print(f"         Input:    {input_vals}")
            print(f"         Expected: {expected}")
            print(f"         Got:      {result_array}")

        if all_passed:
            print("  All tests passed!")


if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("VISUAL DEMONSTRATION")
    print("=" * 70)

    demo = [5, 2, 13, 3, 8]
    print("\nInput:  ", end="")
    print_list(create_list(demo))

    result = remove_nodes_reverse(create_list(demo))
    print("Output: ", end="")
    print_list(result)

    print("\nExplanation:")
    print("  5 removed: 13 > 5 exists on right")
    print("  2 removed: 13 > 2 exists on right")
    print("  13 kept: no greater value on right")
    print("  3 removed: 8 > 3 exists on right")
    print("  8 kept: no nodes on right")
