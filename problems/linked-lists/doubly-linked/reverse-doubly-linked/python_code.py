"""
Reverse a Doubly Linked List

Reverse a doubly linked list by swapping prev and next pointers.

Time Complexity: O(n)
Space Complexity: O(1) for iterative, O(n) for recursive
"""

from typing import Optional, List


class DLLNode:
    """Definition for doubly linked list node."""

    def __init__(self, val: int = 0):
        self.val = val
        self.prev: Optional['DLLNode'] = None
        self.next: Optional['DLLNode'] = None

    def __repr__(self):
        return f"Node({self.val})"


# ==================== HELPER FUNCTIONS ====================

def create_doubly_linked_list(values: List[int]) -> Optional[DLLNode]:
    """Create a doubly linked list from a list of values."""
    if not values:
        return None

    head = DLLNode(values[0])
    current = head

    for val in values[1:]:
        new_node = DLLNode(val)
        current.next = new_node
        new_node.prev = current
        current = new_node

    return head


def dll_to_list(head: Optional[DLLNode]) -> List[int]:
    """Convert a doubly linked list to a Python list (forward traversal)."""
    result = []
    current = head

    while current:
        result.append(current.val)
        current = current.next

    return result


def dll_to_list_reverse(head: Optional[DLLNode]) -> List[int]:
    """Convert by traversing backwards from tail."""
    if not head:
        return []

    # Find tail
    current = head
    while current.next:
        current = current.next

    # Traverse backwards
    result = []
    while current:
        result.append(current.val)
        current = current.prev

    return result


def print_dll(head: Optional[DLLNode]) -> str:
    """Return string representation of doubly linked list."""
    if not head:
        return "null"

    values = []
    current = head

    while current:
        values.append(str(current.val))
        current = current.next

    return "null <-> " + " <-> ".join(values) + " <-> null"


def verify_dll(head: Optional[DLLNode]) -> bool:
    """Verify that prev/next pointers are consistent."""
    if not head:
        return True

    # First node's prev should be None
    if head.prev is not None:
        return False

    current = head
    while current.next:
        if current.next.prev != current:
            return False
        current = current.next

    return True


# ==================== SOLUTION ====================

class Solution:
    def reverse_iterative(self, head: Optional[DLLNode]) -> Optional[DLLNode]:
        """
        Reverse doubly linked list by swapping prev and next pointers.

        For each node, swap its prev and next pointers.
        The last processed node becomes the new head.

        Time: O(n), Space: O(1)
        """
        if not head:
            return None

        current = head
        new_head = None

        while current:
            # Save original next before swapping
            original_next = current.next

            # Swap prev and next
            current.next = current.prev
            current.prev = original_next

            # Track new head (will be the last non-null node)
            new_head = current

            # Move to next node (which is now in prev due to swap)
            current = original_next

        return new_head

    def reverse_recursive(self, head: Optional[DLLNode]) -> Optional[DLLNode]:
        """
        Reverse doubly linked list using recursion.

        Swaps prev and next at each node, then recurses.

        Time: O(n), Space: O(n) due to recursion stack
        """
        # Base case: empty list
        if not head:
            return None

        # Swap prev and next for current node
        head.prev, head.next = head.next, head.prev

        # If this was the last node (head.prev is now None, meaning original next was None)
        # Then this is the new head
        if head.prev is None:
            return head

        # Recursively reverse the rest (use prev since we swapped)
        return self.reverse_recursive(head.prev)

    def reverse_simple(self, head: Optional[DLLNode]) -> Optional[DLLNode]:
        """
        Alternative: Simply swap prev and next for all nodes.

        Cleaner implementation with explicit pointer management.

        Time: O(n), Space: O(1)
        """
        if not head:
            return None

        current = head

        while current:
            # Swap prev and next pointers
            current.prev, current.next = current.next, current.prev

            # Move to next node (now accessed via prev since we swapped)
            if current.prev is None:
                # This means original next was None, so current is the new head
                return current

            current = current.prev

        return head  # Should not reach here


# ==================== TEST CASES ====================

def test_reverse_doubly_linked():
    solution = Solution()

    print("=" * 60)
    print("REVERSE DOUBLY LINKED LIST - TEST CASES")
    print("=" * 60)

    # Test case 1: Normal list
    print("\nTest 1: Reverse [1, 2, 3, 4, 5]")
    head = create_doubly_linked_list([1, 2, 3, 4, 5])
    print(f"  Input: {print_dll(head)}")
    result = solution.reverse_iterative(head)
    print(f"  Output: {print_dll(result)}")
    assert dll_to_list(result) == [5, 4, 3, 2, 1]
    assert verify_dll(result)
    print("  PASSED!")

    # Test case 2: Two nodes
    print("\nTest 2: Reverse [1, 2]")
    head = create_doubly_linked_list([1, 2])
    print(f"  Input: {print_dll(head)}")
    result = solution.reverse_iterative(head)
    print(f"  Output: {print_dll(result)}")
    assert dll_to_list(result) == [2, 1]
    assert verify_dll(result)
    print("  PASSED!")

    # Test case 3: Single node
    print("\nTest 3: Reverse [1]")
    head = create_doubly_linked_list([1])
    print(f"  Input: {print_dll(head)}")
    result = solution.reverse_iterative(head)
    print(f"  Output: {print_dll(result)}")
    assert dll_to_list(result) == [1]
    assert verify_dll(result)
    print("  PASSED!")

    # Test case 4: Empty list
    print("\nTest 4: Reverse empty list")
    result = solution.reverse_iterative(None)
    print(f"  Output: {print_dll(result)}")
    assert result is None
    print("  PASSED!")

    # Test case 5: Recursive approach
    print("\nTest 5: Recursive approach on [1, 2, 3, 4, 5]")
    head = create_doubly_linked_list([1, 2, 3, 4, 5])
    print(f"  Input: {print_dll(head)}")
    result = solution.reverse_recursive(head)
    print(f"  Output: {print_dll(result)}")
    assert dll_to_list(result) == [5, 4, 3, 2, 1]
    assert verify_dll(result)
    print("  PASSED!")

    # Test case 6: Simple swap approach
    print("\nTest 6: Simple swap approach on [1, 2, 3]")
    head = create_doubly_linked_list([1, 2, 3])
    print(f"  Input: {print_dll(head)}")
    result = solution.reverse_simple(head)
    print(f"  Output: {print_dll(result)}")
    assert dll_to_list(result) == [3, 2, 1]
    assert verify_dll(result)
    print("  PASSED!")

    # Test case 7: Verify backward traversal works
    print("\nTest 7: Verify backward traversal after reversal")
    head = create_doubly_linked_list([1, 2, 3, 4])
    result = solution.reverse_iterative(head)
    forward = dll_to_list(result)
    backward = dll_to_list_reverse(result)
    print(f"  Forward traversal: {forward}")
    print(f"  Backward traversal (from tail): {backward}")
    assert forward == [4, 3, 2, 1]
    assert backward == [1, 2, 3, 4]
    print("  PASSED!")

    # Test case 8: Three nodes
    print("\nTest 8: Reverse [1, 2, 3]")
    head = create_doubly_linked_list([1, 2, 3])
    print(f"  Input: {print_dll(head)}")
    result = solution.reverse_iterative(head)
    print(f"  Output: {print_dll(result)}")
    assert dll_to_list(result) == [3, 2, 1]
    assert verify_dll(result)
    print("  PASSED!")

    # Test case 9: Negative numbers
    print("\nTest 9: Reverse [-3, -2, -1, 0, 1, 2, 3]")
    head = create_doubly_linked_list([-3, -2, -1, 0, 1, 2, 3])
    print(f"  Input: {print_dll(head)}")
    result = solution.reverse_iterative(head)
    print(f"  Output: {print_dll(result)}")
    assert dll_to_list(result) == [3, 2, 1, 0, -1, -2, -3]
    assert verify_dll(result)
    print("  PASSED!")

    # Test case 10: Double reverse should give original
    print("\nTest 10: Double reverse returns to original")
    head = create_doubly_linked_list([1, 2, 3, 4, 5])
    original = dll_to_list(head)
    print(f"  Original: {original}")
    reversed_once = solution.reverse_iterative(head)
    reversed_twice = solution.reverse_iterative(reversed_once)
    print(f"  After double reverse: {dll_to_list(reversed_twice)}")
    assert dll_to_list(reversed_twice) == original
    print("  PASSED!")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    test_reverse_doubly_linked()
