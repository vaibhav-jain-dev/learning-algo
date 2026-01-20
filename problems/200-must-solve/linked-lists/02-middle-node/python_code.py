"""
Middle Node of Linked List - Python Solution

Find the middle node of a linked list using the slow/fast pointer technique.

Time Complexity: O(n)
Space Complexity: O(1)
"""


class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


def middle_node(head):
    """
    Find the middle node of a linked list.

    Uses the slow/fast pointer technique:
    - Slow pointer moves 1 step at a time
    - Fast pointer moves 2 steps at a time
    - When fast reaches the end, slow is at the middle

    For even-length lists, returns the second middle node.

    Args:
        head: Head of the linked list

    Returns:
        LinkedList: The middle node of the linked list
    """
    if head is None:
        return None

    slow = head
    fast = head

    # Move fast two steps and slow one step
    # When fast reaches end, slow is at middle
    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next

    return slow


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
    # Test 1: Odd number of nodes
    ll1 = create_linked_list([1, 2, 3, 4, 5])
    print(f"Test 1 Input:  {linked_list_to_array(ll1)}")
    result1 = middle_node(ll1)
    print(f"Test 1 Output: {result1.value}")
    print(f"Test 1 Expected: 3")

    # Test 2: Even number of nodes (return second middle)
    ll2 = create_linked_list([1, 2, 3, 4, 5, 6])
    print(f"\nTest 2 Input:  {linked_list_to_array(ll2)}")
    result2 = middle_node(ll2)
    print(f"Test 2 Output: {result2.value}")
    print(f"Test 2 Expected: 4")

    # Test 3: Single node
    ll3 = create_linked_list([1])
    print(f"\nTest 3 Input:  {linked_list_to_array(ll3)}")
    result3 = middle_node(ll3)
    print(f"Test 3 Output: {result3.value}")
    print(f"Test 3 Expected: 1")

    # Test 4: Two nodes
    ll4 = create_linked_list([1, 2])
    print(f"\nTest 4 Input:  {linked_list_to_array(ll4)}")
    result4 = middle_node(ll4)
    print(f"Test 4 Output: {result4.value}")
    print(f"Test 4 Expected: 2")

    # Test 5: Three nodes
    ll5 = create_linked_list([1, 2, 3])
    print(f"\nTest 5 Input:  {linked_list_to_array(ll5)}")
    result5 = middle_node(ll5)
    print(f"Test 5 Output: {result5.value}")
    print(f"Test 5 Expected: 2")

    # Test 6: Longer list with odd count
    ll6 = create_linked_list([1, 2, 3, 4, 5, 6, 7, 8, 9])
    print(f"\nTest 6 Input:  {linked_list_to_array(ll6)}")
    result6 = middle_node(ll6)
    print(f"Test 6 Output: {result6.value}")
    print(f"Test 6 Expected: 5")

    # Test 7: Longer list with even count
    ll7 = create_linked_list([1, 2, 3, 4, 5, 6, 7, 8])
    print(f"\nTest 7 Input:  {linked_list_to_array(ll7)}")
    result7 = middle_node(ll7)
    print(f"Test 7 Output: {result7.value}")
    print(f"Test 7 Expected: 5")

    print("\nAll tests completed!")
