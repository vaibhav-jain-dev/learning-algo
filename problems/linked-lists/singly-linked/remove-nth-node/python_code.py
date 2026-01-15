"""
Remove Nth Node From End of List

Given the head of a linked list, remove the nth node from the end
of the list and return its head.

Time Complexity: O(L) where L is list length
Space Complexity: O(1)
"""

from typing import Optional, List


class ListNode:
    """Definition for singly-linked list node."""

    def __init__(self, val: int = 0, next: 'ListNode' = None):
        self.val = val
        self.next = next

    def __repr__(self):
        return f"ListNode({self.val})"


# ==================== HELPER FUNCTIONS ====================

def create_linked_list(values: List[int]) -> Optional[ListNode]:
    """Create a linked list from a list of values."""
    if not values:
        return None

    head = ListNode(values[0])
    current = head

    for val in values[1:]:
        current.next = ListNode(val)
        current = current.next

    return head


def linked_list_to_list(head: Optional[ListNode]) -> List[int]:
    """Convert a linked list to a Python list for easy comparison."""
    result = []
    current = head

    while current:
        result.append(current.val)
        current = current.next

    return result


def print_linked_list(head: Optional[ListNode]) -> str:
    """Return string representation of linked list."""
    if not head:
        return "null"

    values = []
    current = head

    while current:
        values.append(str(current.val))
        current = current.next

    return " -> ".join(values) + " -> null"


# ==================== SOLUTION ====================

class Solution:
    def removeNthFromEnd_one_pass(
        self,
        head: Optional[ListNode],
        n: int
    ) -> Optional[ListNode]:
        """
        Remove nth node from end using two-pointer technique (one pass).

        Uses a dummy node and maintains gap of n+1 between pointers.

        Time: O(L), Space: O(1)
        """
        # Dummy node helps handle edge case of removing head
        dummy = ListNode(0)
        dummy.next = head

        first = dummy
        second = dummy

        # Move first pointer n+1 steps ahead
        for _ in range(n + 1):
            first = first.next

        # Move both pointers until first reaches null
        while first:
            first = first.next
            second = second.next

        # second is now right before the node to remove
        second.next = second.next.next

        return dummy.next

    def removeNthFromEnd_two_pass(
        self,
        head: Optional[ListNode],
        n: int
    ) -> Optional[ListNode]:
        """
        Remove nth node from end using two-pass approach.

        First pass counts length, second pass removes the node.

        Time: O(L), Space: O(1)
        """
        # First pass: count nodes
        length = 0
        current = head
        while current:
            length += 1
            current = current.next

        # Calculate position from start (0-indexed)
        pos_to_remove = length - n

        # Edge case: removing head
        if pos_to_remove == 0:
            return head.next

        # Second pass: find node before the one to remove
        current = head
        for _ in range(pos_to_remove - 1):
            current = current.next

        # Remove the node
        current.next = current.next.next

        return head


# ==================== TEST CASES ====================

def test_remove_nth_from_end():
    solution = Solution()

    print("=" * 60)
    print("REMOVE NTH NODE FROM END OF LIST - TEST CASES")
    print("=" * 60)

    # Test case 1: Remove 2nd from end
    print("\nTest 1: Remove 2nd from end of [1, 2, 3, 4, 5]")
    head = create_linked_list([1, 2, 3, 4, 5])
    print(f"  Input: {print_linked_list(head)}, n = 2")
    result = solution.removeNthFromEnd_one_pass(head, 2)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [1, 2, 3, 5]
    print("  PASSED!")

    # Test case 2: Remove only node
    print("\nTest 2: Remove only node from [1]")
    head = create_linked_list([1])
    print(f"  Input: {print_linked_list(head)}, n = 1")
    result = solution.removeNthFromEnd_one_pass(head, 1)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == []
    print("  PASSED!")

    # Test case 3: Remove last node
    print("\nTest 3: Remove last node from [1, 2]")
    head = create_linked_list([1, 2])
    print(f"  Input: {print_linked_list(head)}, n = 1")
    result = solution.removeNthFromEnd_one_pass(head, 1)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [1]
    print("  PASSED!")

    # Test case 4: Remove head (first node)
    print("\nTest 4: Remove head from [1, 2]")
    head = create_linked_list([1, 2])
    print(f"  Input: {print_linked_list(head)}, n = 2")
    result = solution.removeNthFromEnd_one_pass(head, 2)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [2]
    print("  PASSED!")

    # Test case 5: Two-pass approach
    print("\nTest 5: Two-pass approach on [1, 2, 3, 4, 5], n = 2")
    head = create_linked_list([1, 2, 3, 4, 5])
    print(f"  Input: {print_linked_list(head)}, n = 2")
    result = solution.removeNthFromEnd_two_pass(head, 2)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [1, 2, 3, 5]
    print("  PASSED!")

    # Test case 6: Remove middle node
    print("\nTest 6: Remove middle node from [1, 2, 3]")
    head = create_linked_list([1, 2, 3])
    print(f"  Input: {print_linked_list(head)}, n = 2")
    result = solution.removeNthFromEnd_one_pass(head, 2)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [1, 3]
    print("  PASSED!")

    # Test case 7: Longer list
    print("\nTest 7: Longer list [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], n = 5")
    head = create_linked_list([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    print(f"  Input: {print_linked_list(head)}")
    print(f"  n = 5 (remove node with value 6)")
    result = solution.removeNthFromEnd_one_pass(head, 5)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [1, 2, 3, 4, 5, 7, 8, 9, 10]
    print("  PASSED!")

    # Test case 8: Remove head using two-pass
    print("\nTest 8: Remove head using two-pass approach")
    head = create_linked_list([1, 2, 3])
    print(f"  Input: {print_linked_list(head)}, n = 3")
    result = solution.removeNthFromEnd_two_pass(head, 3)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [2, 3]
    print("  PASSED!")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    test_remove_nth_from_end()
