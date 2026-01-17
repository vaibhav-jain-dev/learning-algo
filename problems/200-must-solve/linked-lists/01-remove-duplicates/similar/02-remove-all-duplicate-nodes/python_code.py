"""
Remove All Nodes with Duplicate Values - Python Solutions

Given a sorted linked list, delete ALL nodes that have duplicate values.
Keep only distinct values from the original list.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from __future__ import annotations
from typing import Optional
from collections import Counter


class ListNode:
    """Represents a node in a singly linked list."""

    def __init__(self, val: int = 0, next: Optional[ListNode] = None):
        self.val = val
        self.next = next


# ============================================================================
# APPROACH 1: Dummy Node with Skip Pattern - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - single pass
# Space Complexity: O(1) - only pointers
#
# WHY THIS IS BEST:
# - Handles head deletion cleanly with dummy node
# - Single pass through the list
# - Constant extra space
# ============================================================================


def delete_all_duplicates(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Remove ALL nodes with duplicate values.

    Key Insight: When we find duplicates, skip ALL nodes with that value.

    Visual:
        Input:  1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5
                          ^^^^^^    ^^^^^^
                          skip all  skip all

        Output: 1 -> 2 -> 5
    """
    if not head:
        return None

    # Dummy node handles case where head needs to be deleted
    dummy = ListNode(next=head)
    prev = dummy

    while prev.next:
        current = prev.next

        # Check if current starts a duplicate sequence
        if current.next and current.val == current.next.val:
            # Skip ALL nodes with this value
            dup_val = current.val
            while prev.next and prev.next.val == dup_val:
                prev.next = prev.next.next
        else:
            # No duplicate, move prev forward
            prev = prev.next

    return dummy.next


# ============================================================================
# APPROACH 2: Two Pass (Count then Remove)
# ============================================================================
# Time Complexity:  O(n) - two passes
# Space Complexity: O(n) - dictionary to store counts
#
# WHEN TO USE:
# - When logic clarity is more important
# - When you want to easily debug/verify counts
# ============================================================================


def delete_all_duplicates_two_pass(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Use counting first, then removal.

    This approach is more intuitive and easier to debug.
    """
    if not head:
        return None

    # First pass: count occurrences using Counter
    counts: Counter[int] = Counter()
    current = head
    while current:
        counts[current.val] += 1
        current = current.next

    # Second pass: remove nodes with count > 1
    dummy = ListNode(next=head)
    prev = dummy

    while prev.next:
        if counts[prev.next.val] > 1:
            # Skip this node
            prev.next = prev.next.next
        else:
            prev = prev.next

    return dummy.next


# ============================================================================
# APPROACH 3: Recursive Solution
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) - recursion stack
#
# WHEN TO USE:
# - When recursive thinking is preferred
# - For educational purposes
# ============================================================================


def delete_all_duplicates_recursive(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Solve the problem recursively.

    Base case: empty or single node list
    Recursive case: check if head is part of duplicate sequence
    """
    if not head or not head.next:
        return head

    # Check if head is part of a duplicate sequence
    if head.val == head.next.val:
        # Skip all nodes with this value
        dup_val = head.val
        current = head
        while current and current.val == dup_val:
            current = current.next
        # Recursively process the rest
        return delete_all_duplicates_recursive(current)

    # Head is unique, keep it and process rest
    head.next = delete_all_duplicates_recursive(head.next)
    return head


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
        ([1, 2, 3, 3, 4, 4, 5], [1, 2, 5], "Multiple duplicate groups"),
        ([1, 1, 1, 2, 3], [2, 3], "Duplicates at head"),
        ([1, 1, 2, 2], [], "All duplicates"),
        ([1, 2, 3, 4, 5], [1, 2, 3, 4, 5], "No duplicates"),
        ([1, 1], [], "Only duplicates"),
        ([1], [1], "Single node"),
        ([], [], "Empty list"),
        ([1, 2, 2, 3, 3, 4, 5, 5], [1, 4], "Alternating duplicates"),
    ]

    approaches = [
        ("Dummy + Skip (Recommended)", delete_all_duplicates),
        ("Two Pass", delete_all_duplicates_two_pass),
        ("Recursive", delete_all_duplicates_recursive),
    ]

    print("=" * 70)
    print("REMOVE ALL DUPLICATE NODES - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for input_vals, expected, desc in test_cases:
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

    demo = [1, 2, 3, 3, 4, 4, 5]
    print("\nInput:  ", end="")
    print_list(create_list(demo))

    result = delete_all_duplicates(create_list(demo))
    print("Output: ", end="")
    print_list(result)

    print("\nNote: Both 3 and 4 appeared multiple times, so ALL their occurrences")
    print("      were removed, not just the extras!")
