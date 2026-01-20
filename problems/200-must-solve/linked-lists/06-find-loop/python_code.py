"""
Find Loop - Python Solution

Find the node where a cycle begins in a linked list using Floyd's algorithm.

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import Optional


class LinkedList:
    def __init__(self, value: int):
        self.value = value
        self.next: Optional['LinkedList'] = None


def find_loop(head: LinkedList) -> LinkedList:
    """
    Find the node where the loop begins using Floyd's Cycle Detection.

    Args:
        head: Head of linked list (guaranteed to have a loop)

    Returns:
        LinkedList: The node where the loop starts
    """
    # Phase 1: Find the meeting point inside the loop
    slow = head
    fast = head

    # Move slow by 1, fast by 2 until they meet
    while True:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            break  # They've met inside the loop

    # Phase 2: Find the start of the loop
    # Reset slow to head, keep fast at meeting point
    slow = head

    # Move both by 1 until they meet at loop start
    while slow != fast:
        slow = slow.next
        fast = fast.next

    return slow  # This is the start of the loop


def has_cycle(head: Optional[LinkedList]) -> bool:
    """
    Check if a linked list has a cycle (bonus utility function).

    Args:
        head: Head of linked list

    Returns:
        bool: True if cycle exists, False otherwise
    """
    if head is None:
        return False

    slow = head
    fast = head

    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False


def get_loop_length(head: LinkedList) -> int:
    """
    Get the length of the loop (bonus utility function).

    Args:
        head: Head of linked list with a loop

    Returns:
        int: Number of nodes in the loop
    """
    loop_start = find_loop(head)

    # Count nodes in the loop
    count = 1
    current = loop_start.next
    while current != loop_start:
        count += 1
        current = current.next

    return count


def create_linked_list_with_loop(values: list[int], loop_index: int) -> LinkedList:
    """
    Helper to create a linked list with a loop.

    Args:
        values: List of values for nodes
        loop_index: Index of node that tail should point to (-1 for no loop)

    Returns:
        LinkedList: Head of the created list
    """
    if not values:
        return None

    head = LinkedList(values[0])
    current = head
    nodes = [head]

    for val in values[1:]:
        current.next = LinkedList(val)
        current = current.next
        nodes.append(current)

    # Create the loop
    if loop_index >= 0:
        current.next = nodes[loop_index]

    return head


def print_list_with_loop(head: LinkedList, max_nodes: int = 15) -> None:
    """Print linked list values (with protection against infinite loop)."""
    values = []
    current = head
    seen = set()

    while current and len(values) < max_nodes:
        if id(current) in seen:
            values.append(f"-> [{current.value}] (loop)")
            break
        seen.add(id(current))
        values.append(str(current.value))
        current = current.next

    print(" -> ".join(values))


# Test cases
if __name__ == "__main__":
    # Test 1: Loop in middle - 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> [3]
    ll1 = create_linked_list_with_loop([0, 1, 2, 3, 4, 5, 6], 3)
    print("Test 1:")
    print_list_with_loop(ll1)
    result1 = find_loop(ll1)
    print(f"Loop starts at node with value: {result1.value}")
    print(f"Loop length: {get_loop_length(ll1)}")
    # Expected: 3, Loop length: 4

    # Test 2: Loop at head - 1 -> 2 -> 3 -> 4 -> [1]
    ll2 = create_linked_list_with_loop([1, 2, 3, 4], 0)
    print("\nTest 2:")
    print_list_with_loop(ll2)
    result2 = find_loop(ll2)
    print(f"Loop starts at node with value: {result2.value}")
    print(f"Loop length: {get_loop_length(ll2)}")
    # Expected: 1, Loop length: 4

    # Test 3: Small loop - 5 -> 6 -> 7 -> [6]
    ll3 = create_linked_list_with_loop([5, 6, 7], 1)
    print("\nTest 3:")
    print_list_with_loop(ll3)
    result3 = find_loop(ll3)
    print(f"Loop starts at node with value: {result3.value}")
    print(f"Loop length: {get_loop_length(ll3)}")
    # Expected: 6, Loop length: 2

    # Test 4: Self loop - 1 -> 2 -> [2]
    ll4 = create_linked_list_with_loop([1, 2], 1)
    print("\nTest 4:")
    print_list_with_loop(ll4)
    result4 = find_loop(ll4)
    print(f"Loop starts at node with value: {result4.value}")
    print(f"Loop length: {get_loop_length(ll4)}")
    # Expected: 2, Loop length: 1

    # Test 5: Longer list with loop at end
    ll5 = create_linked_list_with_loop([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 7)
    print("\nTest 5:")
    print_list_with_loop(ll5)
    result5 = find_loop(ll5)
    print(f"Loop starts at node with value: {result5.value}")
    print(f"Loop length: {get_loop_length(ll5)}")
    # Expected: 7, Loop length: 3

    # Test 6: Verify has_cycle function
    ll6_with_cycle = create_linked_list_with_loop([1, 2, 3], 0)
    print(f"\nTest 6: has_cycle check")
    print(f"  List with cycle: {has_cycle(ll6_with_cycle)}")  # True

    # Create a list without cycle for comparison
    ll6_no_cycle = LinkedList(1)
    ll6_no_cycle.next = LinkedList(2)
    ll6_no_cycle.next.next = LinkedList(3)
    print(f"  List without cycle: {has_cycle(ll6_no_cycle)}")  # False

    print("\nAll tests completed!")
