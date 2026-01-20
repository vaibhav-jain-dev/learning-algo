"""
Sum of Linked Lists - Python Solution

Add two numbers represented as linked lists (digits in reverse order).

Time Complexity: O(max(n, m))
Space Complexity: O(max(n, m))
"""

from typing import Optional


class LinkedList:
    def __init__(self, value: int):
        self.value = value
        self.next: Optional['LinkedList'] = None


def sum_of_linked_lists(
    linked_list_one: Optional[LinkedList],
    linked_list_two: Optional[LinkedList]
) -> Optional[LinkedList]:
    """
    Add two numbers represented as linked lists.

    Digits are stored in reverse order (least significant first).

    Args:
        linked_list_one: First number as linked list
        linked_list_two: Second number as linked list

    Returns:
        LinkedList: Sum as a linked list
    """
    # Dummy head simplifies edge cases
    dummy_head = LinkedList(0)
    current = dummy_head
    carry = 0

    # Traverse both lists
    node_one = linked_list_one
    node_two = linked_list_two

    while node_one is not None or node_two is not None or carry > 0:
        # Get values (0 if list exhausted)
        value_one = node_one.value if node_one else 0
        value_two = node_two.value if node_two else 0

        # Calculate sum and carry
        total = value_one + value_two + carry
        carry = total // 10
        digit = total % 10

        # Create new node for this digit
        current.next = LinkedList(digit)
        current = current.next

        # Move to next nodes
        if node_one:
            node_one = node_one.next
        if node_two:
            node_two = node_two.next

    return dummy_head.next


def sum_of_linked_lists_recursive(
    node_one: Optional[LinkedList],
    node_two: Optional[LinkedList],
    carry: int = 0
) -> Optional[LinkedList]:
    """Recursive approach to sum linked lists."""
    # Base case: both lists exhausted and no carry
    if node_one is None and node_two is None and carry == 0:
        return None

    # Get values
    value_one = node_one.value if node_one else 0
    value_two = node_two.value if node_two else 0

    # Calculate sum
    total = value_one + value_two + carry
    new_carry = total // 10
    digit = total % 10

    # Create result node
    result = LinkedList(digit)

    # Recurse for next digit
    next_one = node_one.next if node_one else None
    next_two = node_two.next if node_two else None
    result.next = sum_of_linked_lists_recursive(next_one, next_two, new_carry)

    return result


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


def linked_list_to_number(head: Optional[LinkedList]) -> int:
    """Convert linked list to actual number (for verification)."""
    result = 0
    multiplier = 1
    current = head
    while current:
        result += current.value * multiplier
        multiplier *= 10
        current = current.next
    return result


# Test cases
if __name__ == "__main__":
    # Test 1: 1742 + 549 = 2291
    ll1 = create_linked_list([2, 4, 7, 1])  # 1742
    ll2 = create_linked_list([9, 4, 5])      # 549
    print(f"Test 1: {linked_list_to_number(ll1)} + {linked_list_to_number(ll2)}")
    result1 = sum_of_linked_lists(ll1, ll2)
    print(f"  Output: {linked_list_to_array(result1)} = {linked_list_to_number(result1)}")
    # Expected: [1, 9, 2, 2] = 2291

    # Test 2: 999 + 1 = 1000 (carry propagation)
    ll3 = create_linked_list([9, 9, 9])  # 999
    ll4 = create_linked_list([1])         # 1
    print(f"\nTest 2: {linked_list_to_number(ll3)} + {linked_list_to_number(ll4)}")
    result2 = sum_of_linked_lists(ll3, ll4)
    print(f"  Output: {linked_list_to_array(result2)} = {linked_list_to_number(result2)}")
    # Expected: [0, 0, 0, 1] = 1000

    # Test 3: 365 + 248 = 613
    ll5 = create_linked_list([5, 6, 3])  # 365
    ll6 = create_linked_list([8, 4, 2])  # 248
    print(f"\nTest 3: {linked_list_to_number(ll5)} + {linked_list_to_number(ll6)}")
    result3 = sum_of_linked_lists(ll5, ll6)
    print(f"  Output: {linked_list_to_array(result3)} = {linked_list_to_number(result3)}")
    # Expected: [3, 1, 6] = 613

    # Test 4: Different length lists - 9999 + 1 = 10000
    ll7 = create_linked_list([9, 9, 9, 9])  # 9999
    ll8 = create_linked_list([1])            # 1
    print(f"\nTest 4: {linked_list_to_number(ll7)} + {linked_list_to_number(ll8)}")
    result4 = sum_of_linked_lists(ll7, ll8)
    print(f"  Output: {linked_list_to_array(result4)} = {linked_list_to_number(result4)}")
    # Expected: [0, 0, 0, 0, 1] = 10000

    # Test 5: Single digits - 5 + 5 = 10
    ll9 = create_linked_list([5])
    ll10 = create_linked_list([5])
    print(f"\nTest 5: {linked_list_to_number(ll9)} + {linked_list_to_number(ll10)}")
    result5 = sum_of_linked_lists(ll9, ll10)
    print(f"  Output: {linked_list_to_array(result5)} = {linked_list_to_number(result5)}")
    # Expected: [0, 1] = 10

    # Test 6: Recursive approach - 123 + 456 = 579
    ll11 = create_linked_list([3, 2, 1])  # 123
    ll12 = create_linked_list([6, 5, 4])  # 456
    print(f"\nTest 6 (Recursive): {linked_list_to_number(ll11)} + {linked_list_to_number(ll12)}")
    result6 = sum_of_linked_lists_recursive(ll11, ll12)
    print(f"  Output: {linked_list_to_array(result6)} = {linked_list_to_number(result6)}")
    # Expected: [9, 7, 5] = 579

    print("\nAll tests completed!")
