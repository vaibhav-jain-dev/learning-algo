"""
Remove Duplicates From Linked List - Python Solution

Remove duplicate values from a sorted linked list in place.

Time Complexity: O(n)
Space Complexity: O(1)
"""

class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


def remove_duplicates_from_linked_list(linked_list):
    """
    Remove duplicate values from sorted linked list.

    Args:
        linked_list: Head of sorted linked list

    Returns:
        LinkedList: Head of modified linked list
    """
    current = linked_list

    while current is not None:
        # Skip all nodes with same value
        next_distinct = current.next
        while next_distinct is not None and next_distinct.value == current.value:
            next_distinct = next_distinct.next

        # Link current to next distinct node
        current.next = next_distinct
        current = next_distinct

    return linked_list


def create_linked_list(values):
    """Helper to create linked list from values."""
    if not values:
        return None
    head = LinkedList(values[0])
    current = head
    for val in values[1:]:
        current.next = LinkedList(val)
        current = current.next
    return head


def linked_list_to_array(head):
    """Helper to convert linked list to array for display."""
    result = []
    current = head
    while current:
        result.append(current.value)
        current = current.next
    return result


# Test cases
if __name__ == "__main__":
    # Test 1: Multiple duplicates
    ll1 = create_linked_list([1, 1, 3, 4, 4, 4, 5, 6, 6])
    print(f"Test 1 Input:  {linked_list_to_array(ll1)}")
    result1 = remove_duplicates_from_linked_list(ll1)
    print(f"Test 1 Output: {linked_list_to_array(result1)}")
    # Expected: [1, 3, 4, 5, 6]

    # Test 2: All same values
    ll2 = create_linked_list([1, 1, 1, 1, 1])
    print(f"\nTest 2 Input:  {linked_list_to_array(ll2)}")
    result2 = remove_duplicates_from_linked_list(ll2)
    print(f"Test 2 Output: {linked_list_to_array(result2)}")
    # Expected: [1]

    # Test 3: No duplicates
    ll3 = create_linked_list([1, 2, 3, 4, 5])
    print(f"\nTest 3 Input:  {linked_list_to_array(ll3)}")
    result3 = remove_duplicates_from_linked_list(ll3)
    print(f"Test 3 Output: {linked_list_to_array(result3)}")
    # Expected: [1, 2, 3, 4, 5]

    # Test 4: Single element
    ll4 = create_linked_list([5])
    print(f"\nTest 4 Input:  {linked_list_to_array(ll4)}")
    result4 = remove_duplicates_from_linked_list(ll4)
    print(f"Test 4 Output: {linked_list_to_array(result4)}")
    # Expected: [5]

    # Test 5: Two elements, duplicates
    ll5 = create_linked_list([1, 1])
    print(f"\nTest 5 Input:  {linked_list_to_array(ll5)}")
    result5 = remove_duplicates_from_linked_list(ll5)
    print(f"Test 5 Output: {linked_list_to_array(result5)}")
    # Expected: [1]

    # Test 6: Alternating duplicates
    ll6 = create_linked_list([1, 1, 2, 2, 3, 3, 4, 4])
    print(f"\nTest 6 Input:  {linked_list_to_array(ll6)}")
    result6 = remove_duplicates_from_linked_list(ll6)
    print(f"Test 6 Output: {linked_list_to_array(result6)}")
    # Expected: [1, 2, 3, 4]

    print("\nAll tests completed!")
