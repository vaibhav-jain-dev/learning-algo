"""
Middle of the Linked List

Given the head of a singly linked list, return the middle node.
If there are two middle nodes, return the second middle node.

Time Complexity: O(n)
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
    def middleNode_two_pointer(self, head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Find middle node using slow and fast pointer technique.

        When fast reaches the end, slow is at the middle.
        For even-length lists, returns the second middle.

        Time: O(n), Space: O(1)
        """
        slow = head
        fast = head

        # Move slow by 1, fast by 2
        # When fast reaches end, slow is at middle
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        return slow

    def middleNode_two_pass(self, head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Find middle node using two-pass approach.

        First count all nodes, then traverse to middle.

        Time: O(n), Space: O(1)
        """
        # First pass: count nodes
        length = 0
        current = head
        while current:
            length += 1
            current = current.next

        # Calculate middle index
        middle_index = length // 2

        # Second pass: go to middle
        current = head
        for _ in range(middle_index):
            current = current.next

        return current

    def middleNode_array(self, head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Find middle node by storing all nodes in an array.

        Time: O(n), Space: O(n)
        """
        nodes = []
        current = head

        while current:
            nodes.append(current)
            current = current.next

        return nodes[len(nodes) // 2]


# ==================== TEST CASES ====================

def test_middle_of_linked_list():
    solution = Solution()

    print("=" * 60)
    print("MIDDLE OF THE LINKED LIST - TEST CASES")
    print("=" * 60)

    # Test case 1: Odd length list
    print("\nTest 1: Odd length list [1, 2, 3, 4, 5]")
    head = create_linked_list([1, 2, 3, 4, 5])
    print(f"  Input: {print_linked_list(head)}")
    result = solution.middleNode_two_pointer(head)
    print(f"  Middle node value: {result.val}")
    print(f"  From middle: {print_linked_list(result)}")
    assert result.val == 3
    print("  PASSED!")

    # Test case 2: Even length list
    print("\nTest 2: Even length list [1, 2, 3, 4, 5, 6]")
    head = create_linked_list([1, 2, 3, 4, 5, 6])
    print(f"  Input: {print_linked_list(head)}")
    result = solution.middleNode_two_pointer(head)
    print(f"  Middle node value: {result.val} (second middle)")
    print(f"  From middle: {print_linked_list(result)}")
    assert result.val == 4
    print("  PASSED!")

    # Test case 3: Single node
    print("\nTest 3: Single node [1]")
    head = create_linked_list([1])
    print(f"  Input: {print_linked_list(head)}")
    result = solution.middleNode_two_pointer(head)
    print(f"  Middle node value: {result.val}")
    assert result.val == 1
    print("  PASSED!")

    # Test case 4: Two nodes
    print("\nTest 4: Two nodes [1, 2]")
    head = create_linked_list([1, 2])
    print(f"  Input: {print_linked_list(head)}")
    result = solution.middleNode_two_pointer(head)
    print(f"  Middle node value: {result.val} (second middle)")
    assert result.val == 2
    print("  PASSED!")

    # Test case 5: Two-pass approach
    print("\nTest 5: Two-pass approach on [1, 2, 3, 4, 5]")
    head = create_linked_list([1, 2, 3, 4, 5])
    print(f"  Input: {print_linked_list(head)}")
    result = solution.middleNode_two_pass(head)
    print(f"  Middle node value: {result.val}")
    assert result.val == 3
    print("  PASSED!")

    # Test case 6: Array approach
    print("\nTest 6: Array approach on [1, 2, 3, 4, 5, 6]")
    head = create_linked_list([1, 2, 3, 4, 5, 6])
    print(f"  Input: {print_linked_list(head)}")
    result = solution.middleNode_array(head)
    print(f"  Middle node value: {result.val}")
    assert result.val == 4
    print("  PASSED!")

    # Test case 7: Three nodes
    print("\nTest 7: Three nodes [1, 2, 3]")
    head = create_linked_list([1, 2, 3])
    print(f"  Input: {print_linked_list(head)}")
    result = solution.middleNode_two_pointer(head)
    print(f"  Middle node value: {result.val}")
    assert result.val == 2
    print("  PASSED!")

    # Test case 8: Four nodes
    print("\nTest 8: Four nodes [1, 2, 3, 4]")
    head = create_linked_list([1, 2, 3, 4])
    print(f"  Input: {print_linked_list(head)}")
    result = solution.middleNode_two_pointer(head)
    print(f"  Middle node value: {result.val} (second middle)")
    assert result.val == 3
    print("  PASSED!")

    # Test case 9: Longer list
    print("\nTest 9: Longer list [1, 2, 3, 4, 5, 6, 7, 8, 9]")
    head = create_linked_list([1, 2, 3, 4, 5, 6, 7, 8, 9])
    print(f"  Input: {print_linked_list(head)}")
    result = solution.middleNode_two_pointer(head)
    print(f"  Middle node value: {result.val}")
    assert result.val == 5
    print("  PASSED!")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    test_middle_of_linked_list()
