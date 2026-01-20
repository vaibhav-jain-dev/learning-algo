"""
Swapping Nodes in a Linked List - Python Solutions

Given a linked list and k, swap the k-th node from start with k-th node from end.

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
# APPROACH 1: Two Pointers (Single Pass) - RECOMMENDED
# ============================================================================
# Time Complexity:  O(n) - single pass
# Space Complexity: O(1) - constant extra space
#
# WHY THIS IS BEST:
# - Find both nodes in one traversal
# - Constant space
# - Elegant two-pointer technique
# ============================================================================


def swap_nodes_two_pointers(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    """
    Swap values using two pointers in single pass.

    Key Insight:
    - First pointer moves k steps to find k-th from start
    - Then both pointers move until first reaches end
    - Second pointer will be at k-th from end

    Visual (k=2):
        Find node1: advance k steps -> at position k
        Find node2: start second at head, move both until first hits null
                    second is now k positions from end
        Swap values of node1 and node2
    """
    if not head:
        return None

    # Step 1: Find k-th node from start
    first = head
    for _ in range(k - 1):
        first = first.next

    node_from_start = first  # Save this node

    # Step 2: Find k-th node from end
    # Move first to end while second starts from head
    second = head
    while first.next:
        first = first.next
        second = second.next

    node_from_end = second  # This is k-th from end

    # Step 3: Swap values (not the nodes themselves)
    node_from_start.val, node_from_end.val = node_from_end.val, node_from_start.val

    return head


# ============================================================================
# APPROACH 2: Count Length First
# ============================================================================
# Time Complexity:  O(n) - two passes
# Space Complexity: O(1) - constant extra space
#
# WHEN TO USE:
# - More explicit logic
# - When you need the length for other purposes
# ============================================================================


def swap_nodes_count_length(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    """
    Swap values by counting length first.

    Two passes:
    1. Count total nodes to find positions
    2. Traverse to both positions and swap

    Visual:
        Length = 5, k = 2
        Position from start: 2 (index 1)
        Position from end: 5 - 2 + 1 = 4 (index 3)
    """
    if not head:
        return None

    # Pass 1: Count length
    length = 0
    current = head
    while current:
        length += 1
        current = current.next

    # Calculate positions (1-indexed to 0-indexed)
    pos_from_start = k - 1
    pos_from_end = length - k

    # Pass 2: Find both nodes
    node1 = node2 = head

    for i in range(max(pos_from_start, pos_from_end)):
        if i < pos_from_start:
            node1 = node1.next
        if i < pos_from_end:
            node2 = node2.next

    # Swap values
    node1.val, node2.val = node2.val, node1.val

    return head


# ============================================================================
# APPROACH 3: Store Nodes in List
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) - stores all nodes
#
# WHEN TO USE:
# - When you need random access to nodes
# - Simplest logic but uses extra space
# ============================================================================


def swap_nodes_array(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    """
    Swap values using array for O(1) index access.

    Store all nodes in list, then access by index.
    """
    if not head:
        return None

    # Collect all nodes
    nodes: list[ListNode] = []
    current = head
    while current:
        nodes.append(current)
        current = current.next

    # Swap values (k is 1-indexed)
    n = len(nodes)
    node1 = nodes[k - 1]          # k-th from start
    node2 = nodes[n - k]          # k-th from end

    node1.val, node2.val = node2.val, node1.val

    return head


# ============================================================================
# APPROACH 4: Recursive
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) - recursion stack
#
# WHEN TO USE:
# - Educational purposes
# ============================================================================


def swap_nodes_recursive(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    """
    Swap values using recursion to find k-th from end.
    """
    if not head:
        return None

    # Find k-th from start iteratively
    node_from_start = head
    for _ in range(k - 1):
        node_from_start = node_from_start.next

    # Use recursion to find k-th from end
    count = [0]  # Use list to allow modification in nested function
    node_from_end = [None]

    def find_kth_from_end(node: Optional[ListNode]) -> int:
        if not node:
            return 0

        pos = find_kth_from_end(node.next) + 1

        if pos == k:
            node_from_end[0] = node

        return pos

    find_kth_from_end(head)

    # Swap values
    if node_from_end[0]:
        node_from_start.val, node_from_end[0].val = (
            node_from_end[0].val,
            node_from_start.val,
        )

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
        ([1, 2, 3, 4, 5], 2, [1, 4, 3, 2, 5], "Swap 2nd from start/end"),
        ([7, 9, 6, 6, 7, 8, 3, 0, 9, 5], 5, [7, 9, 6, 6, 8, 7, 3, 0, 9, 5], "Swap 5th"),
        ([1], 1, [1], "Single node"),
        ([1, 2], 1, [2, 1], "Swap first and last"),
        ([1, 2], 2, [2, 1], "Swap at k=2 for length 2"),
        ([1, 2, 3], 2, [1, 2, 3], "Middle node swaps with itself"),
        ([1, 2, 3, 4], 1, [4, 2, 3, 1], "Swap first and last"),
    ]

    approaches = [
        ("Two Pointers (Recommended)", swap_nodes_two_pointers),
        ("Count Length", swap_nodes_count_length),
        ("Array Storage", swap_nodes_array),
        ("Recursive", swap_nodes_recursive),
    ]

    print("=" * 70)
    print("SWAPPING NODES IN LINKED LIST - TEST RESULTS")
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

    demo = [1, 2, 3, 4, 5]
    k = 2
    print(f"\nInput: ", end="")
    print_list(create_list(demo))
    print(f"k = {k}")
    print(f"Swap {k}-th from start (value {demo[k-1]}) with {k}-th from end (value {demo[-k]})")

    result = swap_nodes_two_pointers(create_list(demo), k)
    print("Output: ", end="")
    print_list(result)
