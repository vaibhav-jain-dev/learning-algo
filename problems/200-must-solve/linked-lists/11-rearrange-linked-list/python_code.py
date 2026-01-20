"""
Rearrange Linked List - Python Solution

Partition a linked list around a value k, preserving relative order.

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import Optional


class LinkedList:
    def __init__(self, value: int):
        self.value = value
        self.next: Optional['LinkedList'] = None


def rearrange_linked_list(head: Optional[LinkedList], k: int) -> Optional[LinkedList]:
    """
    Rearrange linked list so all nodes < k come before nodes = k,
    which come before nodes > k.

    Preserves relative order within each group.

    Args:
        head: Head of linked list
        k: The pivot value

    Returns:
        LinkedList: Head of rearranged list
    """
    if head is None:
        return None

    # Create dummy heads for three chains
    less_head = LinkedList(0)    # Nodes with value < k
    equal_head = LinkedList(0)   # Nodes with value == k
    greater_head = LinkedList(0) # Nodes with value > k

    # Tail pointers for each chain
    less_tail = less_head
    equal_tail = equal_head
    greater_tail = greater_head

    # Traverse and partition
    current = head
    while current is not None:
        if current.value < k:
            less_tail.next = current
            less_tail = less_tail.next
        elif current.value == k:
            equal_tail.next = current
            equal_tail = equal_tail.next
        else:  # current.value > k
            greater_tail.next = current
            greater_tail = greater_tail.next

        current = current.next

    # Connect the three chains
    # greater_tail is the end of the final list
    greater_tail.next = None

    # Connect equal_tail to greater chain
    equal_tail.next = greater_head.next

    # Connect less_tail to equal chain
    less_tail.next = equal_head.next

    # Return head of the less chain (skip dummy)
    return less_head.next


def rearrange_linked_list_two_pointers(
    head: Optional[LinkedList],
    k: int
) -> Optional[LinkedList]:
    """
    Alternative approach: separate into two groups (< k and >= k),
    then handle equals within the >= k group.

    This is simpler but creates two partitions instead of three.
    """
    if head is None:
        return None

    # Two chains: smaller and greater-or-equal
    small_head = LinkedList(0)
    large_head = LinkedList(0)

    small_tail = small_head
    large_tail = large_head

    current = head
    while current is not None:
        if current.value < k:
            small_tail.next = current
            small_tail = small_tail.next
        else:
            large_tail.next = current
            large_tail = large_tail.next
        current = current.next

    large_tail.next = None
    small_tail.next = large_head.next

    return small_head.next


def rearrange_in_zigzag(head: Optional[LinkedList]) -> Optional[LinkedList]:
    """
    Bonus: Rearrange list in zigzag pattern.
    Result: a < b > c < d > e ...

    This is a related but different problem.
    """
    if head is None or head.next is None:
        return head

    current = head
    # Flag: True means current should be less than next
    should_be_less = True

    while current.next is not None:
        if should_be_less:
            if current.value > current.next.value:
                # Swap values
                current.value, current.next.value = current.next.value, current.value
        else:
            if current.value < current.next.value:
                # Swap values
                current.value, current.next.value = current.next.value, current.value

        should_be_less = not should_be_less
        current = current.next

    return head


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
    # Test 1: Standard case
    ll1 = create_linked_list([3, 0, 5, 2, 1, 4])
    print(f"Test 1: k=3")
    print(f"  Input:  {linked_list_to_array(ll1)}")
    result1 = rearrange_linked_list(ll1, 3)
    print(f"  Output: {linked_list_to_array(result1)}")
    # Expected: [0, 2, 1, 3, 5, 4]

    # Test 2: Multiple nodes equal to k
    ll2 = create_linked_list([1, 4, 3, 2, 5, 2])
    print(f"\nTest 2: k=3")
    print(f"  Input:  {linked_list_to_array(ll2)}")
    result2 = rearrange_linked_list(ll2, 3)
    print(f"  Output: {linked_list_to_array(result2)}")
    # Expected: [1, 2, 2, 3, 4, 5]

    # Test 3: k not in list
    ll3 = create_linked_list([5, 1, 8, 0])
    print(f"\nTest 3: k=3 (not in list)")
    print(f"  Input:  {linked_list_to_array(ll3)}")
    result3 = rearrange_linked_list(ll3, 3)
    print(f"  Output: {linked_list_to_array(result3)}")
    # Expected: [1, 0, 5, 8]

    # Test 4: All elements smaller than k
    ll4 = create_linked_list([1, 2, 3, 4])
    print(f"\nTest 4: k=10 (all smaller)")
    print(f"  Input:  {linked_list_to_array(ll4)}")
    result4 = rearrange_linked_list(ll4, 10)
    print(f"  Output: {linked_list_to_array(result4)}")
    # Expected: [1, 2, 3, 4]

    # Test 5: All elements greater than k
    ll5 = create_linked_list([5, 6, 7, 8])
    print(f"\nTest 5: k=1 (all greater)")
    print(f"  Input:  {linked_list_to_array(ll5)}")
    result5 = rearrange_linked_list(ll5, 1)
    print(f"  Output: {linked_list_to_array(result5)}")
    # Expected: [5, 6, 7, 8]

    # Test 6: Single element
    ll6 = create_linked_list([5])
    print(f"\nTest 6: Single element, k=5")
    print(f"  Input:  {linked_list_to_array(ll6)}")
    result6 = rearrange_linked_list(ll6, 5)
    print(f"  Output: {linked_list_to_array(result6)}")
    # Expected: [5]

    # Test 7: Two elements
    ll7 = create_linked_list([5, 1])
    print(f"\nTest 7: Two elements, k=3")
    print(f"  Input:  {linked_list_to_array(ll7)}")
    result7 = rearrange_linked_list(ll7, 3)
    print(f"  Output: {linked_list_to_array(result7)}")
    # Expected: [1, 5]

    # Test 8: Alternative two-pointer approach
    ll8 = create_linked_list([3, 0, 5, 2, 1, 4])
    print(f"\nTest 8 (Two-pointer): k=3")
    print(f"  Input:  {linked_list_to_array(ll8)}")
    result8 = rearrange_linked_list_two_pointers(ll8, 3)
    print(f"  Output: {linked_list_to_array(result8)}")
    # Expected: [0, 2, 1, 3, 5, 4]

    # Test 9: Zigzag rearrangement (bonus)
    ll9 = create_linked_list([4, 3, 7, 8, 6, 2, 1])
    print(f"\nTest 9 (Zigzag):")
    print(f"  Input:  {linked_list_to_array(ll9)}")
    result9 = rearrange_in_zigzag(ll9)
    print(f"  Output: {linked_list_to_array(result9)}")
    # Pattern: a < b > c < d > e ...

    print("\nAll tests completed!")
