"""
Insert into a Sorted Circular Linked List

Insert a value into a sorted circular linked list maintaining sorted order.

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import Optional, List


class Node:
    """Definition for a circular linked list node."""

    def __init__(self, val: int = 0, next: 'Node' = None):
        self.val = val
        self.next = next

    def __repr__(self):
        return f"Node({self.val})"


# ==================== HELPER FUNCTIONS ====================

def create_circular_list(values: List[int]) -> Optional[Node]:
    """Create a circular linked list from a list of values."""
    if not values:
        return None

    head = Node(values[0])
    current = head

    for val in values[1:]:
        current.next = Node(val)
        current = current.next

    # Make it circular
    current.next = head

    return head


def circular_list_to_list(head: Optional[Node]) -> List[int]:
    """Convert a circular linked list to a Python list."""
    if not head:
        return []

    result = [head.val]
    current = head.next

    while current and current != head:
        result.append(current.val)
        current = current.next

    return result


def print_circular_list(head: Optional[Node]) -> str:
    """Return string representation of circular linked list."""
    if not head:
        return "null"

    values = circular_list_to_list(head)
    return " -> ".join(map(str, values)) + " -> (cycle)"


def get_sorted_order(head: Optional[Node]) -> List[int]:
    """Get values in sorted order starting from minimum."""
    if not head:
        return []

    values = circular_list_to_list(head)
    # Find minimum and rotate
    min_idx = values.index(min(values))
    return values[min_idx:] + values[:min_idx]


# ==================== SOLUTION ====================

class Solution:
    def insert(self, head: Optional[Node], insertVal: int) -> Node:
        """
        Insert a value into a sorted circular linked list.

        Handles three cases:
        1. Normal insertion between two nodes
        2. Insertion at break point (max/min boundary)
        3. All same values or full traversal (insert anywhere)

        Time: O(n), Space: O(1)
        """
        new_node = Node(insertVal)

        # Case: Empty list
        if not head:
            new_node.next = new_node  # Point to itself
            return new_node

        prev = head
        curr = head.next

        while True:
            # Case 1: Normal insertion - value fits between prev and curr
            if prev.val <= insertVal <= curr.val:
                break

            # Case 2: At break point (where max meets min)
            if prev.val > curr.val:
                # Insert if value is >= max or <= min
                if insertVal >= prev.val or insertVal <= curr.val:
                    break

            # Move to next pair
            prev = curr
            curr = curr.next

            # Case 3: Completed full loop, insert anywhere
            if prev == head:
                break

        # Insert new node between prev and curr
        prev.next = new_node
        new_node.next = curr

        return head


# ==================== TEST CASES ====================

def test_insert_sorted_circular():
    solution = Solution()

    print("=" * 60)
    print("INSERT INTO SORTED CIRCULAR LINKED LIST - TEST CASES")
    print("=" * 60)

    # Test case 1: Insert in middle
    print("\nTest 1: Insert 2 into [3, 4, 1]")
    head = create_circular_list([3, 4, 1])
    print(f"  Input: {print_circular_list(head)}")
    print(f"  Sorted order: {get_sorted_order(head)}")
    result = solution.insert(head, 2)
    print(f"  After insert(2): {print_circular_list(result)}")
    print(f"  Sorted order: {get_sorted_order(result)}")
    values = circular_list_to_list(result)
    assert sorted(values) == [1, 2, 3, 4]
    print("  PASSED!")

    # Test case 2: Empty list
    print("\nTest 2: Insert 1 into empty list")
    result = solution.insert(None, 1)
    print(f"  After insert(1): {print_circular_list(result)}")
    assert circular_list_to_list(result) == [1]
    assert result.next == result  # Should point to itself
    print("  PASSED!")

    # Test case 3: Single node
    print("\nTest 3: Insert 0 into [1]")
    head = create_circular_list([1])
    print(f"  Input: {print_circular_list(head)}")
    result = solution.insert(head, 0)
    print(f"  After insert(0): {print_circular_list(result)}")
    values = circular_list_to_list(result)
    assert sorted(values) == [0, 1]
    print("  PASSED!")

    # Test case 4: Insert larger than max
    print("\nTest 4: Insert 6 into [3, 5, 1]")
    head = create_circular_list([3, 5, 1])
    print(f"  Input: {print_circular_list(head)}")
    print(f"  Sorted order: {get_sorted_order(head)}")
    result = solution.insert(head, 6)
    print(f"  After insert(6): {print_circular_list(result)}")
    print(f"  Sorted order: {get_sorted_order(result)}")
    values = circular_list_to_list(result)
    assert sorted(values) == [1, 3, 5, 6]
    print("  PASSED!")

    # Test case 5: Insert smaller than min
    print("\nTest 5: Insert 0 into [3, 5, 1]")
    head = create_circular_list([3, 5, 1])
    print(f"  Input: {print_circular_list(head)}")
    result = solution.insert(head, 0)
    print(f"  After insert(0): {print_circular_list(result)}")
    print(f"  Sorted order: {get_sorted_order(result)}")
    values = circular_list_to_list(result)
    assert sorted(values) == [0, 1, 3, 5]
    print("  PASSED!")

    # Test case 6: All same values
    print("\nTest 6: Insert 5 into [3, 3, 3]")
    head = create_circular_list([3, 3, 3])
    print(f"  Input: {print_circular_list(head)}")
    result = solution.insert(head, 5)
    print(f"  After insert(5): {print_circular_list(result)}")
    values = circular_list_to_list(result)
    assert sorted(values) == [3, 3, 3, 5]
    print("  PASSED!")

    # Test case 7: Insert duplicate value
    print("\nTest 7: Insert 3 into [1, 3, 5]")
    head = create_circular_list([1, 3, 5])
    print(f"  Input: {print_circular_list(head)}")
    result = solution.insert(head, 3)
    print(f"  After insert(3): {print_circular_list(result)}")
    values = circular_list_to_list(result)
    assert sorted(values) == [1, 3, 3, 5]
    print("  PASSED!")

    # Test case 8: Insert into larger list
    print("\nTest 8: Insert 7 into [2, 4, 6, 8, 10]")
    head = create_circular_list([2, 4, 6, 8, 10])
    print(f"  Input: {print_circular_list(head)}")
    result = solution.insert(head, 7)
    print(f"  After insert(7): {print_circular_list(result)}")
    print(f"  Sorted order: {get_sorted_order(result)}")
    values = circular_list_to_list(result)
    assert sorted(values) == [2, 4, 6, 7, 8, 10]
    print("  PASSED!")

    # Test case 9: List starting at min
    print("\nTest 9: Insert 4 into [1, 2, 3, 5]")
    head = create_circular_list([1, 2, 3, 5])
    print(f"  Input: {print_circular_list(head)}")
    result = solution.insert(head, 4)
    print(f"  After insert(4): {print_circular_list(result)}")
    values = circular_list_to_list(result)
    assert sorted(values) == [1, 2, 3, 4, 5]
    print("  PASSED!")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    test_insert_sorted_circular()
