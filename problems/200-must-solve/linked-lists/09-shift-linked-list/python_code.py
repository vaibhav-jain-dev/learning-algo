"""
Shift Linked List - Python Solution

Shift (rotate) a linked list by k positions.

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import Optional


class LinkedList:
    def __init__(self, value: int):
        self.value = value
        self.next: Optional['LinkedList'] = None


def shift_linked_list(head: LinkedList, k: int) -> LinkedList:
    """
    Shift a linked list by k positions.

    Positive k: shift forward (last k nodes move to front)
    Negative k: shift backward (first |k| nodes move to end)

    Args:
        head: Head of linked list
        k: Number of positions to shift

    Returns:
        LinkedList: New head after shifting
    """
    # Edge case: single node or k = 0
    if head is None or head.next is None or k == 0:
        return head

    # Step 1: Find length and tail
    length = 1
    tail = head
    while tail.next is not None:
        tail = tail.next
        length += 1

    # Step 2: Normalize k
    # Convert to effective shift (handle negative and > length cases)
    k = k % length

    # If k is 0 after normalization, no shift needed
    if k == 0:
        return head

    # Step 3: Find new tail position
    # For forward shift by k, new tail is at position (length - k - 1)
    # New head is at position (length - k)
    new_tail_position = length - k

    # Traverse to find new tail
    new_tail = head
    for _ in range(new_tail_position - 1):
        new_tail = new_tail.next

    # Step 4: Reconnect
    new_head = new_tail.next  # New head is right after new tail
    new_tail.next = None      # Break the link
    tail.next = head          # Connect old tail to old head

    return new_head


def shift_linked_list_alternative(head: LinkedList, k: int) -> LinkedList:
    """
    Alternative approach: make circular, then break at right position.
    """
    if head is None or head.next is None or k == 0:
        return head

    # Find length and tail
    length = 1
    tail = head
    while tail.next is not None:
        tail = tail.next
        length += 1

    # Normalize k
    k = k % length
    if k == 0:
        return head

    # Make list circular
    tail.next = head

    # Find new tail (traverse length - k steps from head)
    steps_to_new_tail = length - k
    new_tail = head
    for _ in range(steps_to_new_tail - 1):
        new_tail = new_tail.next

    # Break circle and return new head
    new_head = new_tail.next
    new_tail.next = None

    return new_head


def create_linked_list(values: list[int]) -> Optional[LinkedList]:
    """Helper to create linked list from values."""
    if not values:
        return None
    head = LinkedList(values[0])
    current = head
    for val in values[1:]:
        current.next = LinkedList(val)
        current = current.next
    return head


def linked_list_to_array(head: Optional[LinkedList]) -> list[int]:
    """Helper to convert linked list to array."""
    result = []
    current = head
    while current:
        result.append(current.value)
        current = current.next
    return result


# Test cases
if __name__ == "__main__":
    # Test 1: Shift forward by 2
    ll1 = create_linked_list([0, 1, 2, 3, 4, 5])
    print(f"Test 1: Shift by k=2")
    print(f"  Input:  {linked_list_to_array(ll1)}")
    result1 = shift_linked_list(ll1, 2)
    print(f"  Output: {linked_list_to_array(result1)}")
    # Expected: [4, 5, 0, 1, 2, 3]

    # Test 2: Shift backward by 2 (negative k)
    ll2 = create_linked_list([0, 1, 2, 3, 4, 5])
    print(f"\nTest 2: Shift by k=-2")
    print(f"  Input:  {linked_list_to_array(ll2)}")
    result2 = shift_linked_list(ll2, -2)
    print(f"  Output: {linked_list_to_array(result2)}")
    # Expected: [2, 3, 4, 5, 0, 1]

    # Test 3: k larger than length
    ll3 = create_linked_list([1, 2, 3])
    print(f"\nTest 3: Shift by k=4 (length=3)")
    print(f"  Input:  {linked_list_to_array(ll3)}")
    result3 = shift_linked_list(ll3, 4)
    print(f"  Output: {linked_list_to_array(result3)}")
    # Expected: [3, 1, 2] (4 % 3 = 1)

    # Test 4: k = 0 (no shift)
    ll4 = create_linked_list([1, 2, 3, 4])
    print(f"\nTest 4: Shift by k=0")
    print(f"  Input:  {linked_list_to_array(ll4)}")
    result4 = shift_linked_list(ll4, 0)
    print(f"  Output: {linked_list_to_array(result4)}")
    # Expected: [1, 2, 3, 4]

    # Test 5: k = length (no effective shift)
    ll5 = create_linked_list([1, 2, 3, 4])
    print(f"\nTest 5: Shift by k=4 (equals length)")
    print(f"  Input:  {linked_list_to_array(ll5)}")
    result5 = shift_linked_list(ll5, 4)
    print(f"  Output: {linked_list_to_array(result5)}")
    # Expected: [1, 2, 3, 4]

    # Test 6: Shift by 1
    ll6 = create_linked_list([1, 2, 3, 4, 5])
    print(f"\nTest 6: Shift by k=1")
    print(f"  Input:  {linked_list_to_array(ll6)}")
    result6 = shift_linked_list(ll6, 1)
    print(f"  Output: {linked_list_to_array(result6)}")
    # Expected: [5, 1, 2, 3, 4]

    # Test 7: Single node
    ll7 = create_linked_list([42])
    print(f"\nTest 7: Single node, k=5")
    print(f"  Input:  {linked_list_to_array(ll7)}")
    result7 = shift_linked_list(ll7, 5)
    print(f"  Output: {linked_list_to_array(result7)}")
    # Expected: [42]

    # Test 8: Alternative approach
    ll8 = create_linked_list([0, 1, 2, 3, 4, 5])
    print(f"\nTest 8 (Alternative): Shift by k=2")
    print(f"  Input:  {linked_list_to_array(ll8)}")
    result8 = shift_linked_list_alternative(ll8, 2)
    print(f"  Output: {linked_list_to_array(result8)}")
    # Expected: [4, 5, 0, 1, 2, 3]

    # Test 9: Large negative k
    ll9 = create_linked_list([1, 2, 3, 4, 5])
    print(f"\nTest 9: Shift by k=-7 (length=5)")
    print(f"  Input:  {linked_list_to_array(ll9)}")
    result9 = shift_linked_list(ll9, -7)
    print(f"  Output: {linked_list_to_array(result9)}")
    # Expected: -7 % 5 = -2 -> 5-2=3 equivalent -> [3, 4, 5, 1, 2]

    print("\nAll tests completed!")
