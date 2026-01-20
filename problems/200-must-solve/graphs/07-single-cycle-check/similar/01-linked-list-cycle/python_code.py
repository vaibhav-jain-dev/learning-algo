"""
Linked List Cycle Detection - Python Solution

Detect if a linked list has a cycle using Floyd's algorithm.

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import Optional


class ListNode:
    """Definition for singly-linked list node."""

    def __init__(self, val: int = 0, next: 'ListNode' = None):
        self.val = val
        self.next = next


def has_cycle(head: Optional[ListNode]) -> bool:
    """
    Detect if linked list has a cycle using Floyd's algorithm.

    Args:
        head: Head of the linked list

    Returns:
        True if cycle exists, False otherwise
    """
    if not head or not head.next:
        return False

    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False


def has_cycle_hash_set(head: Optional[ListNode]) -> bool:
    """
    Alternative solution using hash set (O(n) space).

    Args:
        head: Head of the linked list

    Returns:
        True if cycle exists, False otherwise
    """
    visited = set()

    current = head
    while current:
        if current in visited:
            return True
        visited.add(current)
        current = current.next

    return False


def detect_cycle_start(head: Optional[ListNode]) -> Optional[ListNode]:
    """
    Find the node where the cycle begins.

    Args:
        head: Head of the linked list

    Returns:
        Node where cycle begins, or None if no cycle
    """
    if not head or not head.next:
        return None

    slow = head
    fast = head

    # Detect cycle
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            break
    else:
        return None

    # Find cycle start
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next

    return slow


def cycle_length(head: Optional[ListNode]) -> int:
    """
    Find the length of the cycle.

    Args:
        head: Head of the linked list

    Returns:
        Length of cycle, or 0 if no cycle
    """
    if not head or not head.next:
        return 0

    slow = head
    fast = head

    # Detect cycle
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            break
    else:
        return 0

    # Count cycle length
    length = 1
    current = slow.next
    while current != slow:
        length += 1
        current = current.next

    return length


# Helper function to create linked list with cycle
def create_list_with_cycle(values: list, pos: int) -> Optional[ListNode]:
    """Create a linked list with optional cycle."""
    if not values:
        return None

    nodes = [ListNode(val) for val in values]

    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]

    if pos >= 0:
        nodes[-1].next = nodes[pos]

    return nodes[0]


# Test cases
if __name__ == "__main__":
    # Test 1: Cycle exists
    head1 = create_list_with_cycle([3, 2, 0, -4], 1)
    result1 = has_cycle(head1)
    print(f"Test 1: {result1}")
    assert result1 == True, f"Expected True, got {result1}"

    # Test 2: Cycle at head
    head2 = create_list_with_cycle([1, 2], 0)
    result2 = has_cycle(head2)
    print(f"Test 2: {result2}")
    assert result2 == True, f"Expected True, got {result2}"

    # Test 3: No cycle
    head3 = create_list_with_cycle([1], -1)
    result3 = has_cycle(head3)
    print(f"Test 3: {result3}")
    assert result3 == False, f"Expected False, got {result3}"

    # Test 4: Empty list
    result4 = has_cycle(None)
    print(f"Test 4: {result4}")
    assert result4 == False, f"Expected False, got {result4}"

    # Test 5: Hash set approach
    head5 = create_list_with_cycle([3, 2, 0, -4], 1)
    result5 = has_cycle_hash_set(head5)
    print(f"Test 5 (Hash Set): {result5}")
    assert result5 == True

    # Test 6: Detect cycle start
    head6 = create_list_with_cycle([3, 2, 0, -4], 1)
    cycle_start = detect_cycle_start(head6)
    print(f"Test 6: Cycle starts at node with value {cycle_start.val if cycle_start else None}")
    assert cycle_start.val == 2

    # Test 7: Cycle length
    head7 = create_list_with_cycle([3, 2, 0, -4], 1)
    length = cycle_length(head7)
    print(f"Test 7: Cycle length = {length}")
    assert length == 3  # 2 -> 0 -> -4 -> 2

    print("\nAll tests passed!")
