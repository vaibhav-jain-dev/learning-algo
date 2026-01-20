"""
Delete the Middle Node of a Linked List - Python Solutions

Given a linked list, delete the middle node and return the modified list.

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
# APPROACH 1: Fast and Slow Pointers - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - single pass
# Space Complexity: O(1) - constant extra space
#
# WHY THIS IS BEST:
# - Single traversal finds the middle
# - Slow pointer ends up at node BEFORE middle (using dummy)
# - Clean and efficient
# ============================================================================


def delete_middle_fast_slow(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Delete middle node using fast and slow pointers.

    Key Insight: Use a dummy node so slow stops at node BEFORE middle.
    - Fast moves 2 steps, slow moves 1 step
    - When fast reaches end, slow is at the node before middle

    Visual (7 nodes):
        D -> 1 -> 3 -> 4 -> 7 -> 1 -> 2 -> 6
                       ^slow          ^fast
        Delete slow.next (the middle node 7)
    """
    if not head or not head.next:
        return None

    # Dummy node helps slow stop at node BEFORE middle
    dummy = ListNode(next=head)
    slow = dummy
    fast = head

    # Move fast 2x speed of slow
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    # slow is now at node before middle, delete middle
    slow.next = slow.next.next

    return dummy.next


# ============================================================================
# APPROACH 2: Count Length First
# ============================================================================
# Time Complexity:  O(n) - two passes
# Space Complexity: O(1) - constant extra space
#
# WHEN TO USE:
# - When you need the length for other operations
# - More explicit about what's happening
# ============================================================================


def delete_middle_count(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Delete middle node by counting length first.

    Two passes:
    1. Count total nodes
    2. Traverse to middle-1, delete middle

    Visual (7 nodes, middle index = 3):
        Pass 1: Count = 7
        Pass 2: Stop at index 2 (node 4), delete next (node 7)
    """
    if not head or not head.next:
        return None

    # Pass 1: Count length
    length = 0
    current = head
    while current:
        length += 1
        current = current.next

    # Pass 2: Traverse to node before middle
    middle_index = length // 2
    current = head

    for _ in range(middle_index - 1):
        current = current.next

    # Delete middle node
    current.next = current.next.next

    return head


# ============================================================================
# APPROACH 3: Fast Slow with Prev Pointer
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHEN TO USE:
# - Alternative without dummy node
# - Track previous node explicitly
# ============================================================================


def delete_middle_with_prev(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Delete middle using fast/slow with explicit prev pointer.

    Track prev separately instead of using dummy node.
    """
    if not head or not head.next:
        return None

    slow = head
    fast = head
    prev = None

    while fast and fast.next:
        prev = slow
        slow = slow.next
        fast = fast.next.next

    # slow is now at middle, prev is before it
    if prev:
        prev.next = slow.next
    else:
        # Edge case: middle is head (shouldn't happen with n >= 2)
        return slow.next

    return head


# ============================================================================
# APPROACH 4: Recursive
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) - recursion stack
#
# WHEN TO USE:
# - Educational purposes
# - When recursion is preferred
# ============================================================================


def delete_middle_recursive(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Delete middle using recursion.

    Use two recursive traversals to find length and delete.
    """
    if not head or not head.next:
        return None

    # First, find length
    def get_length(node: Optional[ListNode]) -> int:
        if not node:
            return 0
        return 1 + get_length(node.next)

    length = get_length(head)
    middle = length // 2

    # Then, delete middle
    def delete_at(node: ListNode, index: int) -> ListNode:
        if index == middle - 1:
            node.next = node.next.next
            return node
        delete_at(node.next, index + 1)
        return node

    return delete_at(head, 0)


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
        print("(empty)")
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
        ([1, 3, 4, 7, 1, 2, 6], [1, 3, 4, 1, 2, 6], "7 nodes, delete index 3"),
        ([1, 2, 3, 4], [1, 2, 4], "4 nodes, delete index 2"),
        ([2, 1], [2], "2 nodes, delete index 1"),
        ([1], [], "1 node, delete it"),
        ([1, 2, 3, 4, 5], [1, 2, 4, 5], "5 nodes, delete index 2"),
        ([1, 2, 3], [1, 3], "3 nodes, delete index 1"),
    ]

    approaches = [
        ("Fast/Slow Pointers (Recommended)", delete_middle_fast_slow),
        ("Count Length First", delete_middle_count),
        ("With Prev Pointer", delete_middle_with_prev),
        ("Recursive", delete_middle_recursive),
    ]

    print("=" * 70)
    print("DELETE MIDDLE NODE - TEST RESULTS")
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

    demo = [1, 3, 4, 7, 1, 2, 6]
    print(f"\nInput ({len(demo)} nodes): ", end="")
    print_list(create_list(demo))
    print(f"Middle index: {len(demo) // 2} (value 7)")

    result = delete_middle_fast_slow(create_list(demo))
    print("Output: ", end="")
    print_list(result)

    print("\n--- Even length example ---")
    demo2 = [1, 2, 3, 4]
    print(f"\nInput ({len(demo2)} nodes): ", end="")
    print_list(create_list(demo2))
    print(f"Middle index: {len(demo2) // 2} (value 3)")

    result2 = delete_middle_fast_slow(create_list(demo2))
    print("Output: ", end="")
    print_list(result2)
