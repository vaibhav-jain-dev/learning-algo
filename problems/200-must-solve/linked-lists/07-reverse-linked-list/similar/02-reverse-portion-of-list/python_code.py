"""
Reverse Linked List II (Reverse Portion) - Python Solutions

Reverse nodes from position left to right in a linked list.

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
# APPROACH 1: One-Pass with Insert at Front - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - single pass
# Space Complexity: O(1) - constant extra space
#
# WHY THIS IS BEST:
# - Single pass, no need to find boundaries first
# - Clean in-place modification
# - Easy to understand once you see the pattern
# ============================================================================


def reverse_between_insert(
    head: Optional[ListNode], left: int, right: int
) -> Optional[ListNode]:
    """
    Reverse portion using "insert at front" technique.

    Key Insight: Instead of traditional reversal, repeatedly move
    the node after 'start' to right after 'prev'.

    Visual (left=2, right=4):
        Start: 1 -> [2] -> 3 -> 4 -> 5
                    start
        Step 1: Move 3 after 1: 1 -> [3] -> 2 -> 4 -> 5
        Step 2: Move 4 after 1: 1 -> [4] -> 3 -> 2 -> 5
        Done! Reversed 2,3,4 -> 4,3,2
    """
    if not head or left == right:
        return head

    # Dummy node handles edge case when left = 1
    dummy = ListNode(next=head)
    prev = dummy

    # Move prev to node before position left
    for _ in range(left - 1):
        prev = prev.next

    # 'start' is the first node to reverse (will end up last in reversed portion)
    start = prev.next

    # Perform (right - left) insertions
    for _ in range(right - left):
        # Node to move is start.next
        then = start.next

        # Remove 'then' from its current position
        start.next = then.next

        # Insert 'then' right after prev
        then.next = prev.next
        prev.next = then

    return dummy.next


# ============================================================================
# APPROACH 2: Standard Reversal with Boundaries
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHEN TO USE:
# - When you prefer traditional reverse logic
# - More explicit boundary handling
# ============================================================================


def reverse_between_standard(
    head: Optional[ListNode], left: int, right: int
) -> Optional[ListNode]:
    """
    Reverse portion using standard reversal technique.

    Steps:
    1. Find the node before 'left' (connection point)
    2. Standard reversal for (right - left + 1) nodes
    3. Reconnect the reversed portion
    """
    if not head or left == right:
        return head

    dummy = ListNode(next=head)

    # Step 1: Find connection point (node before left)
    prev_left = dummy
    for _ in range(left - 1):
        prev_left = prev_left.next

    # Step 2: Standard reversal
    # 'first' will become the last node after reversal
    first = prev_left.next
    prev = None
    curr = first

    for _ in range(right - left + 1):
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node

    # Step 3: Reconnect
    # prev is now the new head of reversed portion
    # curr is the node after 'right'
    prev_left.next = prev  # Connect before to new head
    first.next = curr  # Connect old first (now last) to rest

    return dummy.next


# ============================================================================
# APPROACH 3: Recursive
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) - recursion stack
#
# WHEN TO USE:
# - Educational purposes
# - When recursive thinking is preferred
# ============================================================================


def reverse_between_recursive(
    head: Optional[ListNode], left: int, right: int
) -> Optional[ListNode]:
    """
    Reverse portion using recursion.

    Recursively reach position 'left', then reverse until 'right'.
    """
    if not head or left == right:
        return head

    # Successor is the node after the reversed portion
    successor = [None]

    def reverse_n(node: ListNode, n: int) -> ListNode:
        """Reverse first n nodes of the list."""
        if n == 1:
            successor[0] = node.next
            return node

        last = reverse_n(node.next, n - 1)
        node.next.next = node
        node.next = successor[0]
        return last

    if left == 1:
        return reverse_n(head, right)

    # Recursively reach position left
    head.next = reverse_between_recursive(head.next, left - 1, right - 1)
    return head


# ============================================================================
# APPROACH 4: Two-Pointer Explicit
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHEN TO USE:
# - Most explicit about what's happening
# ============================================================================


def reverse_between_explicit(
    head: Optional[ListNode], left: int, right: int
) -> Optional[ListNode]:
    """
    Two-pointer approach with explicit position tracking.
    """
    if not head or left == right:
        return head

    dummy = ListNode(next=head)
    curr = dummy
    position = 0

    # Move to position before left
    while position < left - 1:
        curr = curr.next
        position += 1

    # Now curr is at position left-1
    before_reverse = curr
    start_reverse = curr.next

    # Collect nodes to reverse
    curr = start_reverse
    prev = None

    while position < right:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
        position += 1

    # Reconnect
    before_reverse.next = prev
    start_reverse.next = curr

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
        # (input, left, right, expected, description)
        ([1, 2, 3, 4, 5], 2, 4, [1, 4, 3, 2, 5], "Middle portion"),
        ([5], 1, 1, [5], "Single node"),
        ([1, 2, 3, 4, 5], 1, 5, [5, 4, 3, 2, 1], "Entire list"),
        ([1, 2, 3, 4, 5], 1, 2, [2, 1, 3, 4, 5], "First two nodes"),
        ([1, 2, 3, 4, 5], 4, 5, [1, 2, 3, 5, 4], "Last two nodes"),
        ([1, 2, 3, 4, 5], 3, 4, [1, 2, 4, 3, 5], "Two middle nodes"),
        ([1, 2], 1, 2, [2, 1], "Two nodes"),
    ]

    approaches = [
        ("Insert at Front (Recommended)", reverse_between_insert),
        ("Standard Reversal", reverse_between_standard),
        ("Recursive", reverse_between_recursive),
        ("Explicit Two-Pointer", reverse_between_explicit),
    ]

    print("=" * 70)
    print("REVERSE LINKED LIST II (PORTION) - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for input_vals, left, right, expected, desc in test_cases:
            # Create fresh list for each test
            head = create_list(input_vals)
            result = func(head, left, right)
            result_array = list_to_array(result)

            passed = result_array == expected
            status = "PASS" if passed else "FAIL"
            if not passed:
                all_passed = False

            print(f"  [{status}] {desc}")
            print(f"         Input:    {input_vals}, left={left}, right={right}")
            print(f"         Expected: {expected}")
            print(f"         Got:      {result_array}")

        if all_passed:
            print("  All tests passed!")


if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("VISUAL DEMONSTRATION")
    print("=" * 70)

    demo = [1, 2, 3, 4, 5]
    left, right = 2, 4
    print(f"\nInput: ", end="")
    print_list(create_list(demo))
    print(f"left = {left}, right = {right}")
    print(f"Reverse positions {left} to {right}: [{demo[left-1:right]}]")

    result = reverse_between_insert(create_list(demo), left, right)
    print("Output: ", end="")
    print_list(result)
