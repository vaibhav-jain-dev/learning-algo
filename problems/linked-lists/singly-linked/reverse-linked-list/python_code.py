"""
Reverse Linked List

Given the head of a singly linked list, reverse the list and return the new head.

Time Complexity: O(n) - visit each node once
Space Complexity: O(1) for iterative, O(n) for recursive
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
    def reverseList_iterative(self, head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Reverse linked list using iterative approach.

        Uses three pointers to reverse the list in-place.

        Time: O(n), Space: O(1)
        """
        prev = None
        curr = head

        while curr:
            # Save next node before we change curr.next
            next_node = curr.next

            # Reverse the link
            curr.next = prev

            # Move pointers forward
            prev = curr
            curr = next_node

        # prev is now the new head
        return prev

    def reverseList_recursive(self, head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Reverse linked list using recursive approach.

        Time: O(n), Space: O(n) due to recursion stack
        """
        # Base case: empty list or single node
        if not head or not head.next:
            return head

        # Recursively reverse the rest of the list
        new_head = self.reverseList_recursive(head.next)

        # Make the next node point back to us
        head.next.next = head

        # Remove our forward pointer (we're now the tail)
        head.next = None

        return new_head


# ==================== TEST CASES ====================

def test_reverse_linked_list():
    solution = Solution()

    print("=" * 60)
    print("REVERSE LINKED LIST - TEST CASES")
    print("=" * 60)

    # Test case 1: Normal list
    print("\nTest 1: Normal list [1, 2, 3, 4, 5]")
    head = create_linked_list([1, 2, 3, 4, 5])
    print(f"  Input:  {print_linked_list(head)}")
    result = solution.reverseList_iterative(head)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [5, 4, 3, 2, 1]
    print("  PASSED!")

    # Test case 2: Two nodes
    print("\nTest 2: Two nodes [1, 2]")
    head = create_linked_list([1, 2])
    print(f"  Input:  {print_linked_list(head)}")
    result = solution.reverseList_iterative(head)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [2, 1]
    print("  PASSED!")

    # Test case 3: Empty list
    print("\nTest 3: Empty list")
    head = create_linked_list([])
    print(f"  Input:  {print_linked_list(head)}")
    result = solution.reverseList_iterative(head)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == []
    print("  PASSED!")

    # Test case 4: Single node
    print("\nTest 4: Single node [1]")
    head = create_linked_list([1])
    print(f"  Input:  {print_linked_list(head)}")
    result = solution.reverseList_iterative(head)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [1]
    print("  PASSED!")

    # Test case 5: Recursive approach
    print("\nTest 5: Recursive approach [1, 2, 3, 4, 5]")
    head = create_linked_list([1, 2, 3, 4, 5])
    print(f"  Input:  {print_linked_list(head)}")
    result = solution.reverseList_recursive(head)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [5, 4, 3, 2, 1]
    print("  PASSED!")

    # Test case 6: Negative numbers
    print("\nTest 6: Negative numbers [-1, -2, -3]")
    head = create_linked_list([-1, -2, -3])
    print(f"  Input:  {print_linked_list(head)}")
    result = solution.reverseList_iterative(head)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [-3, -2, -1]
    print("  PASSED!")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    test_reverse_linked_list()
