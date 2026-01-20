"""
Reverse Linked List in Groups of K - Python Solutions

Reverse nodes in k-sized groups, leaving incomplete groups unchanged.

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
# APPROACH 1: Iterative with Dummy Node - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - each node visited twice (count + reverse)
# Space Complexity: O(1) - constant extra space
#
# WHY THIS IS BEST:
# - Constant space
# - Clear group management with dummy node
# - Easy to understand control flow
# ============================================================================


def reverse_k_group_iterative(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    """
    Reverse in groups of k using iterative approach.

    Key Insight: For each group:
    1. Check if k nodes exist
    2. Reverse k nodes
    3. Connect previous group's tail to new head
    4. Move to next group

    Visual (k=3):
        [1->2->3]->4->5->6->7->8
        [3->2->1]->4->5->6->7->8  (after reversing group 1)
        3->2->[1->6->5->4]->7->8  (after reversing group 2)
    """
    if not head or k == 1:
        return head

    # Dummy node simplifies edge cases
    dummy = ListNode(next=head)
    group_prev = dummy  # Node before current group

    while True:
        # Check if k nodes exist
        kth = get_kth(group_prev, k)
        if not kth:
            break

        group_next = kth.next  # Node after current group

        # Reverse the group
        prev, curr = kth.next, group_prev.next
        while curr != group_next:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node

        # Connect previous group to reversed group
        # group_prev.next was the old head, now it's the tail
        tmp = group_prev.next  # This becomes tail after reversal
        group_prev.next = kth  # kth is the new head
        group_prev = tmp  # Move to end of reversed group

    return dummy.next


def get_kth(curr: Optional[ListNode], k: int) -> Optional[ListNode]:
    """Get the k-th node from curr (1-indexed from curr)."""
    while curr and k > 0:
        curr = curr.next
        k -= 1
    return curr


# ============================================================================
# APPROACH 2: Recursive
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n/k) - recursion depth
#
# WHEN TO USE:
# - When recursive logic is clearer
# - When stack space is not a concern
# ============================================================================


def reverse_k_group_recursive(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    """
    Reverse in groups of k using recursion.

    Base case: less than k nodes remain, return head unchanged.
    Recursive case: reverse k nodes, connect to recursively processed rest.

    Visual:
        reverse_k_group([1,2,3,4,5], 2)
        = reverse([1,2]) + reverse_k_group([3,4,5], 2)
        = [2,1] + (reverse([3,4]) + reverse_k_group([5], 2))
        = [2,1] + ([4,3] + [5])
        = [2,1,4,3,5]
    """
    # Count if we have k nodes
    count = 0
    curr = head
    while curr and count < k:
        curr = curr.next
        count += 1

    # If less than k nodes, don't reverse
    if count < k:
        return head

    # Reverse k nodes
    prev = reverse_k_group_recursive(curr, k)  # Recursively process rest first
    current = head

    for _ in range(k):
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node

    return prev


# ============================================================================
# APPROACH 3: Stack-Based
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(k) - stack for each group
#
# WHEN TO USE:
# - Explicit reversal logic
# - When you're comfortable with stack operations
# ============================================================================


def reverse_k_group_stack(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    """
    Reverse in groups of k using a stack.

    Push k nodes to stack, pop to reverse, connect groups.
    """
    if not head or k == 1:
        return head

    dummy = ListNode(next=head)
    prev = dummy
    curr = head

    while True:
        # Try to fill stack with k nodes
        stack: list[ListNode] = []
        temp = curr

        for _ in range(k):
            if not temp:
                break
            stack.append(temp)
            temp = temp.next

        # If we don't have k nodes, we're done
        if len(stack) < k:
            prev.next = curr
            break

        # Pop from stack to reverse
        while stack:
            prev.next = stack.pop()
            prev = prev.next

        # Move to next group
        prev.next = temp
        curr = temp

    return dummy.next


# ============================================================================
# APPROACH 4: Two-Pass (Count then Reverse)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHEN TO USE:
# - When you prefer explicit length calculation
# ============================================================================


def reverse_k_group_two_pass(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    """
    Two-pass approach: count length first, then reverse.
    """
    if not head or k == 1:
        return head

    # Pass 1: Count total length
    length = 0
    curr = head
    while curr:
        length += 1
        curr = curr.next

    # Number of complete groups
    num_groups = length // k

    dummy = ListNode(next=head)
    group_prev = dummy

    for _ in range(num_groups):
        # Reverse k nodes
        prev = None
        curr = group_prev.next
        group_tail = curr  # First node becomes tail after reversal

        for _ in range(k):
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node

        # Connect groups
        group_prev.next = prev  # Connect to new head
        group_tail.next = curr  # Connect tail to next group
        group_prev = group_tail  # Move to next group's prev

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
        ([1, 2, 3, 4, 5], 2, [2, 1, 4, 3, 5], "k=2, 5 nodes"),
        ([1, 2, 3, 4, 5], 3, [3, 2, 1, 4, 5], "k=3, partial last group"),
        ([1, 2, 3, 4, 5, 6, 7, 8], 3, [3, 2, 1, 6, 5, 4, 7, 8], "k=3, 8 nodes"),
        ([1, 2, 3, 4, 5], 1, [1, 2, 3, 4, 5], "k=1, no change"),
        ([1, 2, 3, 4, 5], 5, [5, 4, 3, 2, 1], "k=n, reverse entire list"),
        ([1], 1, [1], "Single node"),
        ([1, 2], 2, [2, 1], "Two nodes, k=2"),
    ]

    approaches = [
        ("Iterative (Recommended)", reverse_k_group_iterative),
        ("Recursive", reverse_k_group_recursive),
        ("Stack-Based", reverse_k_group_stack),
        ("Two-Pass", reverse_k_group_two_pass),
    ]

    print("=" * 70)
    print("REVERSE LINKED LIST IN GROUPS OF K - TEST RESULTS")
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

    demo = [1, 2, 3, 4, 5, 6, 7, 8]
    k = 3
    print(f"\nInput: ", end="")
    print_list(create_list(demo))
    print(f"k = {k}")
    print(f"Groups: [{demo[0:3]}], [{demo[3:6]}], [{demo[6:8]}] (incomplete)")

    result = reverse_k_group_iterative(create_list(demo), k)
    print("Output: ", end="")
    print_list(result)
