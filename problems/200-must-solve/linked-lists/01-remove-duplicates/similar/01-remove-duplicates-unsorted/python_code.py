"""
Remove Duplicates from Unsorted Linked List - Python Solutions

Given an unsorted linked list, remove all duplicates keeping first occurrence.

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
# APPROACH 1: Hash Set (Single Pass) - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - single traversal
# Space Complexity: O(n) - hash set for unique values
#
# WHY THIS IS BEST:
# - O(1) lookup to check if value seen before
# - Single pass through the list
# - Clean and Pythonic implementation
# ============================================================================


def remove_duplicates_hash_set(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Remove duplicates using a hash set.

    Key Insight: Track seen values in a set, skip nodes with repeated values.

    Visual:
        Input:  3 -> 2 -> 2 -> 1 -> 3 -> 4
                          ^       ^
                      duplicate  duplicate

        Output: 3 -> 2 -> 1 -> 4
    """
    if not head:
        return None

    seen: set[int] = {head.val}
    current = head

    while current.next:
        if current.next.val in seen:
            # Skip the duplicate node
            current.next = current.next.next
        else:
            # New value, add to set and move forward
            seen.add(current.next.val)
            current = current.next

    return head


# ============================================================================
# APPROACH 2: Two Pointers (No Extra Space)
# ============================================================================
# Time Complexity:  O(n^2) - for each node, scan remaining list
# Space Complexity: O(1) - no extra data structures
#
# WHEN TO USE:
# - Memory is extremely constrained
# - List is small enough that O(n^2) is acceptable
# ============================================================================


def remove_duplicates_two_pointers(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Remove duplicates without extra space using two pointers.

    For each node, scan ahead and remove all nodes with same value.

    Visual:
        For node with value 2:
        3 -> [2] -> 2 -> 1 -> 3 -> 2 -> 4
              ^     ^              ^
            outer  runner scans and removes these
    """
    if not head:
        return None

    current = head

    # For each node, remove all future duplicates
    while current:
        runner = current

        # Scan ahead and remove duplicates of current value
        while runner.next:
            if runner.next.val == current.val:
                # Remove duplicate
                runner.next = runner.next.next
            else:
                runner = runner.next

        current = current.next

    return head


# ============================================================================
# APPROACH 3: Using Dummy Node (Clean Edge Case Handling)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - Cleaner handling of edge cases
# - More uniform code structure
# ============================================================================


def remove_duplicates_with_dummy(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Remove duplicates using a dummy node for cleaner code.

    The dummy node eliminates edge cases when head needs to be removed.
    """
    if not head:
        return None

    # Dummy node simplifies edge cases
    dummy = ListNode(next=head)
    seen: set[int] = set()

    prev = dummy
    current = head

    while current:
        if current.val in seen:
            # Skip this node
            prev.next = current.next
        else:
            # Keep this node
            seen.add(current.val)
            prev = current

        current = current.next

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
        ([3, 2, 2, 1, 3, 2, 4], [3, 2, 1, 4], "Multiple duplicates"),
        ([1, 1, 1, 1], [1], "All same values"),
        ([5, 4, 3, 2, 1], [5, 4, 3, 2, 1], "No duplicates"),
        ([1, 2, 1, 2, 1, 2], [1, 2], "Alternating duplicates"),
        ([1], [1], "Single node"),
        ([], [], "Empty list"),
    ]

    approaches = [
        ("Hash Set (Recommended)", remove_duplicates_hash_set),
        ("Two Pointers", remove_duplicates_two_pointers),
        ("Dummy Node", remove_duplicates_with_dummy),
    ]

    print("=" * 70)
    print("REMOVE DUPLICATES FROM UNSORTED LIST - TEST RESULTS")
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

    demo = [3, 2, 2, 1, 3, 2, 4]
    print("\nInput:  ", end="")
    print_list(create_list(demo))

    result = remove_duplicates_hash_set(create_list(demo))
    print("Output: ", end="")
    print_list(result)
