"""
Merge Linked Lists - Python Solution

Merge two sorted linked lists in place.

Time Complexity: O(n + m)
Space Complexity: O(1)
"""

from typing import Optional


class LinkedList:
    def __init__(self, value: int):
        self.value = value
        self.next: Optional['LinkedList'] = None


def merge_linked_lists(
    head_one: Optional[LinkedList],
    head_two: Optional[LinkedList]
) -> Optional[LinkedList]:
    """
    Merge two sorted linked lists in place.

    Args:
        head_one: Head of first sorted list
        head_two: Head of second sorted list

    Returns:
        LinkedList: Head of merged sorted list
    """
    # Handle edge cases
    if head_one is None:
        return head_two
    if head_two is None:
        return head_one

    # Determine which list has smaller head
    if head_one.value <= head_two.value:
        p1 = head_one
        p2 = head_two
    else:
        p1 = head_two
        p2 = head_one

    # p1 always points to the list with smaller current value
    head = p1
    prev = None

    while p1 is not None and p2 is not None:
        if p1.value <= p2.value:
            # p1 is smaller, just advance
            prev = p1
            p1 = p1.next
        else:
            # p2 is smaller, insert it before p1
            if prev is not None:
                prev.next = p2

            prev = p2
            p2 = p2.next
            prev.next = p1

    # If p2 still has elements, append them
    if p1 is None and p2 is not None:
        prev.next = p2

    return head


def merge_linked_lists_recursive(
    head_one: Optional[LinkedList],
    head_two: Optional[LinkedList]
) -> Optional[LinkedList]:
    """
    Recursive approach to merge two sorted linked lists.

    Note: Uses O(n + m) space due to recursion stack.
    """
    # Base cases
    if head_one is None:
        return head_two
    if head_two is None:
        return head_one

    # Choose smaller head and recurse
    if head_one.value <= head_two.value:
        head_one.next = merge_linked_lists_recursive(head_one.next, head_two)
        return head_one
    else:
        head_two.next = merge_linked_lists_recursive(head_one, head_two.next)
        return head_two


def merge_using_dummy_head(
    head_one: Optional[LinkedList],
    head_two: Optional[LinkedList]
) -> Optional[LinkedList]:
    """
    Alternative approach using a dummy head (simpler code, same complexity).
    """
    dummy = LinkedList(0)
    tail = dummy

    p1, p2 = head_one, head_two

    while p1 is not None and p2 is not None:
        if p1.value <= p2.value:
            tail.next = p1
            p1 = p1.next
        else:
            tail.next = p2
            p2 = p2.next
        tail = tail.next

    # Append remaining nodes
    tail.next = p1 if p1 is not None else p2

    return dummy.next


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
    # Test 1: Standard merge
    ll1 = create_linked_list([2, 6, 7, 8])
    ll2 = create_linked_list([1, 3, 4, 5, 9, 10])
    print(f"Test 1:")
    print(f"  List 1: {linked_list_to_array(ll1)}")
    print(f"  List 2: {linked_list_to_array(ll2)}")
    result1 = merge_linked_lists(ll1, ll2)
    print(f"  Merged: {linked_list_to_array(result1)}")
    # Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    # Test 2: Non-overlapping ranges
    ll3 = create_linked_list([1, 2, 3])
    ll4 = create_linked_list([4, 5, 6])
    print(f"\nTest 2:")
    print(f"  List 1: {linked_list_to_array(ll3)}")
    print(f"  List 2: {linked_list_to_array(ll4)}")
    result2 = merge_linked_lists(ll3, ll4)
    print(f"  Merged: {linked_list_to_array(result2)}")
    # Expected: [1, 2, 3, 4, 5, 6]

    # Test 3: Single element lists
    ll5 = create_linked_list([5])
    ll6 = create_linked_list([1, 2, 3])
    print(f"\nTest 3:")
    print(f"  List 1: {linked_list_to_array(ll5)}")
    print(f"  List 2: {linked_list_to_array(ll6)}")
    result3 = merge_linked_lists(ll5, ll6)
    print(f"  Merged: {linked_list_to_array(result3)}")
    # Expected: [1, 2, 3, 5]

    # Test 4: One empty list
    ll7 = create_linked_list([1, 2, 3])
    ll8 = None
    print(f"\nTest 4:")
    print(f"  List 1: {linked_list_to_array(ll7)}")
    print(f"  List 2: {linked_list_to_array(ll8)}")
    result4 = merge_linked_lists(ll7, ll8)
    print(f"  Merged: {linked_list_to_array(result4)}")
    # Expected: [1, 2, 3]

    # Test 5: Lists with duplicates
    ll9 = create_linked_list([1, 3, 5, 7])
    ll10 = create_linked_list([1, 2, 5, 8])
    print(f"\nTest 5 (with duplicates):")
    print(f"  List 1: {linked_list_to_array(ll9)}")
    print(f"  List 2: {linked_list_to_array(ll10)}")
    result5 = merge_linked_lists(ll9, ll10)
    print(f"  Merged: {linked_list_to_array(result5)}")
    # Expected: [1, 1, 2, 3, 5, 5, 7, 8]

    # Test 6: Recursive approach
    ll11 = create_linked_list([1, 4, 7])
    ll12 = create_linked_list([2, 5, 8])
    print(f"\nTest 6 (Recursive):")
    print(f"  List 1: {linked_list_to_array(ll11)}")
    print(f"  List 2: {linked_list_to_array(ll12)}")
    result6 = merge_linked_lists_recursive(ll11, ll12)
    print(f"  Merged: {linked_list_to_array(result6)}")
    # Expected: [1, 2, 4, 5, 7, 8]

    # Test 7: Dummy head approach
    ll13 = create_linked_list([0, 3, 6])
    ll14 = create_linked_list([1, 2, 4, 5])
    print(f"\nTest 7 (Dummy Head):")
    print(f"  List 1: {linked_list_to_array(ll13)}")
    print(f"  List 2: {linked_list_to_array(ll14)}")
    result7 = merge_using_dummy_head(ll13, ll14)
    print(f"  Merged: {linked_list_to_array(result7)}")
    # Expected: [0, 1, 2, 3, 4, 5, 6]

    print("\nAll tests completed!")
