"""
Remove Kth Node From End - Python Solution

Remove the kth node from the end of a singly linked list.

Time Complexity: O(n) where n is the length of the list
Space Complexity: O(1)
"""

from __future__ import annotations
from typing import Optional


class LinkedList:
    """Node for a singly linked list."""

    def __init__(self, value: int) -> None:
        self.value = value
        self.next: Optional[LinkedList] = None


def remove_kth_node_from_end(head: LinkedList, k: int) -> None:
    """
    Remove the kth node from the end of the linked list in place.

    Uses two-pointer technique:
    1. Move first pointer k nodes ahead
    2. Move both pointers until first reaches end
    3. Second pointer is now at the node before the one to remove

    Args:
        head: Head of the linked list
        k: Position from the end to remove (1-indexed from end)
    """
    # Use two pointers
    first = head
    second = head

    # Move first pointer k nodes ahead
    for _ in range(k):
        first = first.next

    # Edge case: if first is None, we need to remove the head
    # Since we can't actually remove the head node (we don't have access to
    # the pointer to head), we copy the next node's value and remove the next node
    if first is None:
        head.value = head.next.value
        head.next = head.next.next
        return

    # Move both pointers until first reaches the last node
    while first.next is not None:
        first = first.next
        second = second.next

    # second is now pointing to the node before the one to remove
    # Remove the next node
    second.next = second.next.next


def remove_kth_node_from_end_with_counter(head: LinkedList, k: int) -> None:
    """
    Alternative approach: first count the list length, then remove.

    Args:
        head: Head of the linked list
        k: Position from the end to remove (1-indexed from end)
    """
    # Count the length
    length = 0
    current = head
    while current is not None:
        length += 1
        current = current.next

    # Position from the beginning (0-indexed)
    position_from_start = length - k

    # Edge case: removing the head
    if position_from_start == 0:
        head.value = head.next.value
        head.next = head.next.next
        return

    # Traverse to the node before the one to remove
    current = head
    for _ in range(position_from_start - 1):
        current = current.next

    # Remove the node
    current.next = current.next.next


def build_linked_list(values: list[int]) -> Optional[LinkedList]:
    """Build a linked list from a list of values."""
    if not values:
        return None

    head = LinkedList(values[0])
    current = head
    for value in values[1:]:
        current.next = LinkedList(value)
        current = current.next

    return head


def linked_list_to_list(head: Optional[LinkedList]) -> list[int]:
    """Convert a linked list to a Python list."""
    result = []
    current = head
    while current is not None:
        result.append(current.value)
        current = current.next
    return result


def print_linked_list(head: Optional[LinkedList]) -> str:
    """Get string representation of linked list."""
    values = linked_list_to_list(head)
    return " -> ".join(str(v) for v in values)


# Test cases
if __name__ == "__main__":
    # Test 1: Example from problem
    head1 = build_linked_list([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    print(f"Original: {print_linked_list(head1)}")
    remove_kth_node_from_end(head1, 4)
    print(f"After removing 4th from end: {print_linked_list(head1)}")
    assert linked_list_to_list(head1) == [0, 1, 2, 3, 4, 5, 7, 8, 9]

    # Test 2: Remove the head (kth from end where k == length)
    head2 = build_linked_list([1, 2, 3])
    print(f"\nOriginal: {print_linked_list(head2)}")
    remove_kth_node_from_end(head2, 3)
    print(f"After removing 3rd from end (head): {print_linked_list(head2)}")
    assert linked_list_to_list(head2) == [2, 3]

    # Test 3: Remove the tail (k=1)
    head3 = build_linked_list([1, 2, 3, 4, 5])
    print(f"\nOriginal: {print_linked_list(head3)}")
    remove_kth_node_from_end(head3, 1)
    print(f"After removing 1st from end (tail): {print_linked_list(head3)}")
    assert linked_list_to_list(head3) == [1, 2, 3, 4]

    # Test 4: Remove second to last (k=2)
    head4 = build_linked_list([1, 2, 3, 4, 5])
    print(f"\nOriginal: {print_linked_list(head4)}")
    remove_kth_node_from_end(head4, 2)
    print(f"After removing 2nd from end: {print_linked_list(head4)}")
    assert linked_list_to_list(head4) == [1, 2, 3, 5]

    # Test 5: Two-node list, remove tail
    head5 = build_linked_list([1, 2])
    print(f"\nOriginal: {print_linked_list(head5)}")
    remove_kth_node_from_end(head5, 1)
    print(f"After removing 1st from end: {print_linked_list(head5)}")
    assert linked_list_to_list(head5) == [1]

    # Test 6: Two-node list, remove head
    head6 = build_linked_list([1, 2])
    print(f"\nOriginal: {print_linked_list(head6)}")
    remove_kth_node_from_end(head6, 2)
    print(f"After removing 2nd from end (head): {print_linked_list(head6)}")
    assert linked_list_to_list(head6) == [2]

    # Test with counter approach
    print("\n--- Testing Counter Approach ---")
    head7 = build_linked_list([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    remove_kth_node_from_end_with_counter(head7, 4)
    print(f"Counter approach result: {print_linked_list(head7)}")
    assert linked_list_to_list(head7) == [0, 1, 2, 3, 4, 5, 7, 8, 9]

    print("\nAll tests passed!")
