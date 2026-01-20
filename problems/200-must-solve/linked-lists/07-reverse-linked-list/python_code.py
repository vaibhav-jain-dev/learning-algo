"""
Reverse Linked List - Python Solution

Reverse a singly linked list in place.

Time Complexity: O(n)
Space Complexity: O(1) iterative, O(n) recursive
"""

class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


def reverse_linked_list(head):
    """
    Reverse linked list in place using iterative approach.

    Args:
        head: Head of linked list

    Returns:
        LinkedList: New head of reversed list
    """
    prev = None
    current = head

    while current is not None:
        next_node = current.next  # Save next
        current.next = prev       # Reverse link
        prev = current            # Move prev forward
        current = next_node       # Move current forward

    return prev


def reverse_linked_list_recursive(head):
    """Recursive approach to reverse linked list."""
    # Base case: empty list or single node
    if head is None or head.next is None:
        return head

    # Reverse the rest of the list
    new_head = reverse_linked_list_recursive(head.next)

    # Reverse the link between head and next
    head.next.next = head
    head.next = None

    return new_head


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
    """Helper to convert linked list to array."""
    result = []
    current = head
    while current:
        result.append(current.value)
        current = current.next
    return result


# Test cases
if __name__ == "__main__":
    # Test 1: Standard list
    ll1 = create_linked_list([0, 1, 2, 3, 4, 5])
    print(f"Test 1 Input:  {linked_list_to_array(ll1)}")
    result1 = reverse_linked_list(ll1)
    print(f"Test 1 Output: {linked_list_to_array(result1)}")
    # Expected: [5, 4, 3, 2, 1, 0]

    # Test 2: Two elements
    ll2 = create_linked_list([1, 2])
    print(f"\nTest 2 Input:  {linked_list_to_array(ll2)}")
    result2 = reverse_linked_list(ll2)
    print(f"Test 2 Output: {linked_list_to_array(result2)}")
    # Expected: [2, 1]

    # Test 3: Single element
    ll3 = create_linked_list([5])
    print(f"\nTest 3 Input:  {linked_list_to_array(ll3)}")
    result3 = reverse_linked_list(ll3)
    print(f"Test 3 Output: {linked_list_to_array(result3)}")
    # Expected: [5]

    # Test 4: Empty list
    ll4 = None
    print(f"\nTest 4 Input:  {linked_list_to_array(ll4)}")
    result4 = reverse_linked_list(ll4)
    print(f"Test 4 Output: {linked_list_to_array(result4)}")
    # Expected: []

    # Test 5: Recursive approach
    ll5 = create_linked_list([1, 2, 3, 4])
    print(f"\nTest 5 (Recursive) Input:  {linked_list_to_array(ll5)}")
    result5 = reverse_linked_list_recursive(ll5)
    print(f"Test 5 (Recursive) Output: {linked_list_to_array(result5)}")
    # Expected: [4, 3, 2, 1]

    # Test 6: Longer list
    ll6 = create_linked_list(list(range(10)))
    print(f"\nTest 6 Input:  {linked_list_to_array(ll6)}")
    result6 = reverse_linked_list(ll6)
    print(f"Test 6 Output: {linked_list_to_array(result6)}")
    # Expected: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

    print("\nAll tests completed!")
