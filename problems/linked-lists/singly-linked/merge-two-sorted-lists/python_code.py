"""
Merge Two Sorted Lists

Merge two sorted linked lists and return it as a sorted list.

Time Complexity: O(n + m) where n, m are list lengths
Space Complexity: O(1) for iterative, O(n + m) for recursive
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
    def mergeTwoLists_iterative(
        self,
        list1: Optional[ListNode],
        list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        """
        Merge two sorted lists using iterative approach with dummy node.

        Time: O(n + m), Space: O(1)
        """
        # Dummy node simplifies edge cases
        dummy = ListNode(0)
        tail = dummy

        # Compare and merge while both lists have nodes
        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next

        # Attach remaining nodes (at most one list has remaining nodes)
        tail.next = list1 if list1 else list2

        return dummy.next

    def mergeTwoLists_recursive(
        self,
        list1: Optional[ListNode],
        list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        """
        Merge two sorted lists using recursive approach.

        Time: O(n + m), Space: O(n + m) due to recursion stack
        """
        # Base cases
        if not list1:
            return list2
        if not list2:
            return list1

        # Choose smaller head and recursively merge the rest
        if list1.val <= list2.val:
            list1.next = self.mergeTwoLists_recursive(list1.next, list2)
            return list1
        else:
            list2.next = self.mergeTwoLists_recursive(list1, list2.next)
            return list2


# ==================== TEST CASES ====================

def test_merge_two_sorted_lists():
    solution = Solution()

    print("=" * 60)
    print("MERGE TWO SORTED LISTS - TEST CASES")
    print("=" * 60)

    # Test case 1: Normal merge
    print("\nTest 1: Normal merge")
    list1 = create_linked_list([1, 2, 4])
    list2 = create_linked_list([1, 3, 4])
    print(f"  List1: {print_linked_list(list1)}")
    print(f"  List2: {print_linked_list(list2)}")
    result = solution.mergeTwoLists_iterative(list1, list2)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [1, 1, 2, 3, 4, 4]
    print("  PASSED!")

    # Test case 2: Both empty
    print("\nTest 2: Both lists empty")
    list1 = create_linked_list([])
    list2 = create_linked_list([])
    print(f"  List1: {print_linked_list(list1)}")
    print(f"  List2: {print_linked_list(list2)}")
    result = solution.mergeTwoLists_iterative(list1, list2)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == []
    print("  PASSED!")

    # Test case 3: One empty
    print("\nTest 3: One list empty")
    list1 = create_linked_list([])
    list2 = create_linked_list([0])
    print(f"  List1: {print_linked_list(list1)}")
    print(f"  List2: {print_linked_list(list2)}")
    result = solution.mergeTwoLists_iterative(list1, list2)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [0]
    print("  PASSED!")

    # Test case 4: Non-overlapping ranges
    print("\nTest 4: Non-overlapping ranges")
    list1 = create_linked_list([1, 2, 3])
    list2 = create_linked_list([4, 5, 6])
    print(f"  List1: {print_linked_list(list1)}")
    print(f"  List2: {print_linked_list(list2)}")
    result = solution.mergeTwoLists_iterative(list1, list2)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [1, 2, 3, 4, 5, 6]
    print("  PASSED!")

    # Test case 5: Recursive approach
    print("\nTest 5: Recursive approach")
    list1 = create_linked_list([1, 3, 5, 7])
    list2 = create_linked_list([2, 4, 6, 8])
    print(f"  List1: {print_linked_list(list1)}")
    print(f"  List2: {print_linked_list(list2)}")
    result = solution.mergeTwoLists_recursive(list1, list2)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [1, 2, 3, 4, 5, 6, 7, 8]
    print("  PASSED!")

    # Test case 6: Different lengths
    print("\nTest 6: Different lengths")
    list1 = create_linked_list([1, 5])
    list2 = create_linked_list([2, 3, 4, 6, 7, 8])
    print(f"  List1: {print_linked_list(list1)}")
    print(f"  List2: {print_linked_list(list2)}")
    result = solution.mergeTwoLists_iterative(list1, list2)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [1, 2, 3, 4, 5, 6, 7, 8]
    print("  PASSED!")

    # Test case 7: Negative numbers
    print("\nTest 7: Negative numbers")
    list1 = create_linked_list([-3, -1, 2])
    list2 = create_linked_list([-2, 0, 3])
    print(f"  List1: {print_linked_list(list1)}")
    print(f"  List2: {print_linked_list(list2)}")
    result = solution.mergeTwoLists_iterative(list1, list2)
    print(f"  Output: {print_linked_list(result)}")
    assert linked_list_to_list(result) == [-3, -2, -1, 0, 2, 3]
    print("  PASSED!")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    test_merge_two_sorted_lists()
