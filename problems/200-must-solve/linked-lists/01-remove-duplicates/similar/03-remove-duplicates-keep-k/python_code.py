"""
Remove Duplicates Keeping At Most K Occurrences - Python Solutions

Given a sorted linked list and k, keep at most k occurrences of each value.

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
# APPROACH 1: Single Pass with Counter - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - single traversal
# Space Complexity: O(1) - only counters and pointers
#
# WHY THIS IS BEST:
# - Single pass through the list
# - Elegant counting logic
# - No extra data structures
# ============================================================================


def remove_duplicates_keep_k(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    """
    Keep at most k occurrences of each value.

    Key Insight: Track count for current value, reset when value changes.

    Visual for [1,1,1,2,2,3] with k=2:
        1(#1) -> 1(#2) -> 1(#3) -> 2(#1) -> 2(#2) -> 3(#1)
         keep     keep     skip     keep     keep     keep

        Result: 1 -> 1 -> 2 -> 2 -> 3
    """
    if not head or k == 0:
        return None if k == 0 else head

    dummy = ListNode(next=head)
    prev = dummy

    # Track count of current value
    count = 0
    current_val: Optional[int] = None

    while prev.next:
        node = prev.next

        # Check if this is a new value
        if current_val is None or current_val != node.val:
            count = 1
            current_val = node.val
        else:
            count += 1

        # Decide whether to keep or skip
        if count <= k:
            prev = prev.next  # Keep node, move forward
        else:
            prev.next = node.next  # Skip node

    return dummy.next


# ============================================================================
# APPROACH 2: Cleaner Implementation with Explicit State
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# This version is easier to understand for interviews.
# ============================================================================


def remove_duplicates_keep_k_clear(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    """
    A cleaner implementation using group processing.

    Process each group of same-value nodes together.
    """
    if not head or k == 0:
        return None if k == 0 else head

    dummy = ListNode(next=head)
    prev = dummy
    current = head

    while current:
        count = 1

        # Count consecutive duplicates
        while current.next and current.val == current.next.val:
            count += 1
            current = current.next

        # Now current is the last node of this value group
        # We need to keep min(count, k) nodes

        # Start from the first node of this group
        node = prev.next
        kept = 0
        while kept < k and kept < count:
            prev = node
            node = node.next
            kept += 1

        # Skip remaining nodes with this value
        prev.next = current.next
        current = current.next

    return dummy.next


# ============================================================================
# APPROACH 3: Two Pointer Look-Ahead
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# Alternative approach looking k nodes ahead.
# ============================================================================


def remove_duplicates_keep_k_lookahead(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    """
    Use look-ahead technique to check if we have more than k duplicates.

    If the k-th node ahead has the same value, we have too many duplicates.
    """
    if not head or k == 0:
        return None if k == 0 else head

    dummy = ListNode(next=head)
    prev = dummy

    while prev.next:
        current = prev.next

        # Look k nodes ahead
        ahead = current
        for _ in range(k):
            if ahead is None:
                break
            ahead = ahead.next

        # If k-th node ahead has same value, we have > k duplicates
        # Skip current node
        if ahead and ahead.val == current.val:
            prev.next = current.next
        else:
            prev = prev.next

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
        # (input, k, expected, description)
        ([1, 1, 1, 2, 2, 3], 2, [1, 1, 2, 2, 3], "k=2, some over limit"),
        ([1, 1, 1, 1, 2, 2, 2], 1, [1, 2], "k=1, unique only"),
        ([1, 2, 3, 3, 3, 3, 4], 3, [1, 2, 3, 3, 3, 4], "k=3, one over limit"),
        ([1, 1, 1], 5, [1, 1, 1], "k > count, keep all"),
        ([1, 2, 3], 2, [1, 2, 3], "No duplicates"),
        ([1], 1, [1], "Single node"),
        ([], 2, [], "Empty list"),
        ([1, 1, 2, 2, 3, 3], 1, [1, 2, 3], "All have duplicates, k=1"),
    ]

    approaches = [
        ("Counter-based (Recommended)", remove_duplicates_keep_k),
        ("Clear Implementation", remove_duplicates_keep_k_clear),
        ("Look-Ahead", remove_duplicates_keep_k_lookahead),
    ]

    print("=" * 70)
    print("REMOVE DUPLICATES KEEPING K - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for input_vals, k, expected, desc in test_cases:
            head = create_list(input_vals)
            result = func(head, k)
            result_array = list_to_array(result)

            passed = result_array == expected
            status = "PASS" if passed else "FAIL"
            if not passed:
                all_passed = False

            print(f"  [{status}] {desc} (k={k})")
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

    demo = [1, 1, 1, 2, 2, 3]
    k = 2
    print(f"\nInput: k={k}")
    print("List:  ", end="")
    print_list(create_list(demo))

    result = remove_duplicates_keep_k(create_list(demo), k)
    print("Output: ", end="")
    print_list(result)
