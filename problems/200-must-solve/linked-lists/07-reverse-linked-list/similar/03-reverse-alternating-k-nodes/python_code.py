"""
Reverse Alternating K Nodes - Python Solutions

Reverse k nodes, skip k nodes, reverse k nodes, and so on.

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
# APPROACH 1: Iterative with Toggle - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - single pass
# Space Complexity: O(1) - constant extra space
#
# WHY THIS IS BEST:
# - Single pass through the list
# - Constant space
# - Clear alternating logic with boolean toggle
# ============================================================================


def reverse_alternating_iterative(
    head: Optional[ListNode], k: int
) -> Optional[ListNode]:
    """
    Reverse alternating k nodes using iterative approach.

    Key Insight: Use a boolean flag to toggle between reverse and skip modes.
    Process k nodes at a time, alternating the operation.

    Visual (k=2):
        [1,2] reverse -> [2,1]
        [3,4] skip    -> [3,4]
        [5,6] reverse -> [6,5]
        [7,8] skip    -> [7,8]
        Result: 2->1->3->4->6->5->7->8
    """
    if not head or k == 1:
        return head

    dummy = ListNode(next=head)
    prev_tail = dummy  # Tail of previously processed segment
    should_reverse = True  # Start with reverse

    while prev_tail.next:
        if should_reverse:
            # Reverse up to k nodes
            prev_tail = reverse_k_nodes(prev_tail, k)
        else:
            # Skip up to k nodes
            prev_tail = skip_k_nodes(prev_tail, k)

        should_reverse = not should_reverse

    return dummy.next


def reverse_k_nodes(prev_tail: ListNode, k: int) -> ListNode:
    """
    Reverse up to k nodes starting after prev_tail.
    Returns the new tail of the reversed segment.
    """
    # Check if there are nodes to reverse
    if not prev_tail.next:
        return prev_tail

    # First node will become the tail after reversal
    first = prev_tail.next
    prev = None
    curr = first
    count = 0

    # Reverse k nodes (or until end)
    while curr and count < k:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
        count += 1

    # Connect: prev_tail -> new_head (prev), first (new tail) -> curr (rest)
    prev_tail.next = prev
    first.next = curr

    return first  # Return new tail


def skip_k_nodes(prev_tail: ListNode, k: int) -> ListNode:
    """
    Skip up to k nodes starting after prev_tail.
    Returns the last node in the skipped segment.
    """
    curr = prev_tail
    count = 0

    while curr.next and count < k:
        curr = curr.next
        count += 1

    return curr


# ============================================================================
# APPROACH 2: Recursive
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n/k) - recursion depth
#
# WHEN TO USE:
# - When recursive logic feels more natural
# ============================================================================


def reverse_alternating_recursive(
    head: Optional[ListNode], k: int
) -> Optional[ListNode]:
    """
    Reverse alternating k nodes using recursion.

    Process one cycle (reverse k, skip k), then recurse on rest.
    """
    if not head or k == 1:
        return head

    # Step 1: Reverse first k nodes
    prev = None
    curr = head
    count = 0

    while curr and count < k:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
        count += 1

    # 'head' is now the tail of reversed portion
    # 'prev' is the new head
    # 'curr' points to (k+1)th node

    # Step 2: Skip k nodes
    if head:  # Connect reversed tail to skip segment
        head.next = curr

    skip_count = 0
    tail = head  # Start from reversed tail

    while curr and skip_count < k:
        tail = curr
        curr = curr.next
        skip_count += 1

    # Step 3: Recurse on remaining
    if tail:
        tail.next = reverse_alternating_recursive(curr, k)

    return prev


# ============================================================================
# APPROACH 3: Using Helper for Reversal
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHEN TO USE:
# - When you want modular, reusable code
# ============================================================================


def reverse_alternating_modular(
    head: Optional[ListNode], k: int
) -> Optional[ListNode]:
    """
    Reverse alternating k nodes with modular helper functions.
    """
    if not head or k == 1:
        return head

    def reverse_segment(start: ListNode, count: int) -> tuple[ListNode, ListNode]:
        """
        Reverse 'count' nodes starting from 'start'.
        Returns (new_head, new_tail).
        """
        prev = None
        curr = start
        actual_count = 0

        while curr and actual_count < count:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
            actual_count += 1

        # start is now tail, prev is head, curr is next segment
        return prev, start, curr

    def skip_segment(start: ListNode, count: int) -> tuple[ListNode, ListNode]:
        """
        Skip 'count' nodes starting from 'start'.
        Returns (segment_head, segment_tail, next_start).
        """
        curr = start
        actual_count = 1

        while curr.next and actual_count < count:
            curr = curr.next
            actual_count += 1

        return start, curr, curr.next if curr else None

    dummy = ListNode(next=head)
    prev_end = dummy
    curr = head
    reverse_mode = True

    while curr:
        if reverse_mode:
            new_head, new_tail, next_start = reverse_segment(curr, k)
            prev_end.next = new_head
            new_tail.next = next_start
            prev_end = new_tail
            curr = next_start
        else:
            seg_head, seg_tail, next_start = skip_segment(curr, k)
            prev_end.next = seg_head
            prev_end = seg_tail
            curr = next_start

        reverse_mode = not reverse_mode

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
        # (input, k, expected, description)
        ([1, 2, 3, 4, 5, 6, 7, 8], 2, [2, 1, 3, 4, 6, 5, 7, 8], "k=2, 8 nodes"),
        (
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            3,
            [3, 2, 1, 4, 5, 6, 9, 8, 7, 10],
            "k=3, 10 nodes",
        ),
        ([1, 2, 3, 4, 5], 3, [3, 2, 1, 4, 5], "k=3, partial skip"),
        ([1, 2, 3, 4, 5], 2, [2, 1, 3, 4, 5], "k=2, 5 nodes"),
        ([1, 2, 3, 4], 2, [2, 1, 3, 4], "k=2, exact groups"),
        ([1], 1, [1], "Single node, k=1"),
        ([1, 2], 1, [1, 2], "k=1, no change"),
        ([1, 2, 3], 2, [2, 1, 3], "k=2, partial"),
    ]

    approaches = [
        ("Iterative Toggle (Recommended)", reverse_alternating_iterative),
        ("Recursive", reverse_alternating_recursive),
        ("Modular Helpers", reverse_alternating_modular),
    ]

    print("=" * 70)
    print("REVERSE ALTERNATING K NODES - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for input_vals, k, expected, desc in test_cases:
            # Create fresh list for each test
            head = create_list(input_vals)
            result = func(head, k)
            result_array = list_to_array(result)

            passed = result_array == expected
            status = "PASS" if passed else "FAIL"
            if not passed:
                all_passed = False

            print(f"  [{status}] {desc}")
            print(f"         Input:    {input_vals}, k={k}")
            print(f"         Expected: {expected}")
            print(f"         Got:      {result_array}")

        if all_passed:
            print("  All tests passed!")


if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("VISUAL DEMONSTRATION")
    print("=" * 70)

    demo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    k = 3
    print(f"\nInput: ", end="")
    print_list(create_list(demo))
    print(f"k = {k}")
    print(f"Operations:")
    print(f"  Reverse: [1,2,3] -> [3,2,1]")
    print(f"  Skip:    [4,5,6] -> [4,5,6]")
    print(f"  Reverse: [7,8,9] -> [9,8,7]")
    print(f"  Skip:    [10] -> [10]")

    result = reverse_alternating_iterative(create_list(demo), k)
    print("Output: ", end="")
    print_list(result)
