"""
Detect Cycle in Linked List (Floyd's Algorithm)

Given the head of a linked list, determine if it has a cycle using
Floyd's Tortoise and Hare algorithm.

Time Complexity: O(n)
Space Complexity: O(1) for Floyd's, O(n) for hash set approach
"""

from typing import Optional, List, Set


class ListNode:
    """Definition for singly-linked list node."""

    def __init__(self, val: int = 0, next: 'ListNode' = None):
        self.val = val
        self.next = next

    def __repr__(self):
        return f"ListNode({self.val})"


# ==================== HELPER FUNCTIONS ====================

def create_linked_list_with_cycle(values: List[int], pos: int) -> Optional[ListNode]:
    """
    Create a linked list with optional cycle.
    pos indicates where the tail connects (-1 means no cycle).
    """
    if not values:
        return None

    # Create all nodes
    nodes = [ListNode(val) for val in values]

    # Connect nodes
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]

    # Create cycle if pos is valid
    if pos >= 0 and pos < len(nodes):
        nodes[-1].next = nodes[pos]

    return nodes[0]


def print_linked_list(head: Optional[ListNode], max_nodes: int = 20) -> str:
    """
    Return string representation of linked list.
    Limits output to max_nodes to handle cycles.
    """
    if not head:
        return "null"

    values = []
    current = head
    seen = set()
    count = 0

    while current and count < max_nodes:
        if id(current) in seen:
            values.append(f"[cycle to {current.val}]")
            break
        seen.add(id(current))
        values.append(str(current.val))
        current = current.next
        count += 1

    if current and count >= max_nodes:
        values.append("...")

    return " -> ".join(values)


# ==================== SOLUTION ====================

class Solution:
    def hasCycle_floyd(self, head: Optional[ListNode]) -> bool:
        """
        Detect cycle using Floyd's Tortoise and Hare algorithm.

        Two pointers move at different speeds. If they meet, there's a cycle.

        Time: O(n), Space: O(1)
        """
        if not head or not head.next:
            return False

        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next          # Move 1 step
            fast = fast.next.next     # Move 2 steps

            if slow == fast:
                return True

        return False

    def hasCycle_hashset(self, head: Optional[ListNode]) -> bool:
        """
        Detect cycle using a hash set to track visited nodes.

        Time: O(n), Space: O(n)
        """
        visited: Set[int] = set()
        current = head

        while current:
            node_id = id(current)
            if node_id in visited:
                return True
            visited.add(node_id)
            current = current.next

        return False

    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Find the node where the cycle begins (if any).

        Uses Floyd's algorithm to detect cycle, then finds the start.

        Time: O(n), Space: O(1)
        """
        if not head or not head.next:
            return None

        # Phase 1: Detect if cycle exists
        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

            if slow == fast:
                # Phase 2: Find cycle start
                # Reset one pointer to head, move both at same speed
                slow = head
                while slow != fast:
                    slow = slow.next
                    fast = fast.next
                return slow

        return None


# ==================== TEST CASES ====================

def test_detect_cycle():
    solution = Solution()

    print("=" * 60)
    print("DETECT CYCLE IN LINKED LIST - TEST CASES")
    print("=" * 60)

    # Test case 1: List with cycle at position 1
    print("\nTest 1: List [3, 2, 0, -4] with cycle at pos 1")
    head = create_linked_list_with_cycle([3, 2, 0, -4], 1)
    print(f"  List: {print_linked_list(head)}")
    result = solution.hasCycle_floyd(head)
    print(f"  Has cycle: {result}")
    assert result == True
    print("  PASSED!")

    # Test case 2: List with cycle at position 0 (head)
    print("\nTest 2: List [1, 2] with cycle at pos 0")
    head = create_linked_list_with_cycle([1, 2], 0)
    print(f"  List: {print_linked_list(head)}")
    result = solution.hasCycle_floyd(head)
    print(f"  Has cycle: {result}")
    assert result == True
    print("  PASSED!")

    # Test case 3: List without cycle
    print("\nTest 3: List [1] without cycle (pos = -1)")
    head = create_linked_list_with_cycle([1], -1)
    print(f"  List: {print_linked_list(head)}")
    result = solution.hasCycle_floyd(head)
    print(f"  Has cycle: {result}")
    assert result == False
    print("  PASSED!")

    # Test case 4: Empty list
    print("\nTest 4: Empty list")
    head = create_linked_list_with_cycle([], -1)
    print(f"  List: {print_linked_list(head)}")
    result = solution.hasCycle_floyd(head)
    print(f"  Has cycle: {result}")
    assert result == False
    print("  PASSED!")

    # Test case 5: Longer list without cycle
    print("\nTest 5: Longer list [1, 2, 3, 4, 5] without cycle")
    head = create_linked_list_with_cycle([1, 2, 3, 4, 5], -1)
    print(f"  List: {print_linked_list(head)}")
    result = solution.hasCycle_floyd(head)
    print(f"  Has cycle: {result}")
    assert result == False
    print("  PASSED!")

    # Test case 6: Hash set approach
    print("\nTest 6: Hash set approach on [3, 2, 0, -4] with cycle")
    head = create_linked_list_with_cycle([3, 2, 0, -4], 1)
    print(f"  List: {print_linked_list(head)}")
    result = solution.hasCycle_hashset(head)
    print(f"  Has cycle: {result}")
    assert result == True
    print("  PASSED!")

    # Test case 7: Find cycle start node
    print("\nTest 7: Find cycle start node in [3, 2, 0, -4] at pos 1")
    head = create_linked_list_with_cycle([3, 2, 0, -4], 1)
    print(f"  List: {print_linked_list(head)}")
    cycle_start = solution.detectCycle(head)
    print(f"  Cycle starts at node with value: {cycle_start.val if cycle_start else None}")
    assert cycle_start is not None and cycle_start.val == 2
    print("  PASSED!")

    # Test case 8: Self-loop (single node pointing to itself)
    print("\nTest 8: Self-loop (single node)")
    head = create_linked_list_with_cycle([1], 0)
    print(f"  List: {print_linked_list(head)}")
    result = solution.hasCycle_floyd(head)
    print(f"  Has cycle: {result}")
    assert result == True
    print("  PASSED!")

    # Test case 9: Long cycle
    print("\nTest 9: Longer list with cycle at middle")
    head = create_linked_list_with_cycle([1, 2, 3, 4, 5, 6, 7, 8], 3)
    print(f"  List: {print_linked_list(head)}")
    result = solution.hasCycle_floyd(head)
    cycle_start = solution.detectCycle(head)
    print(f"  Has cycle: {result}")
    print(f"  Cycle starts at value: {cycle_start.val if cycle_start else None}")
    assert result == True
    assert cycle_start is not None and cycle_start.val == 4
    print("  PASSED!")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    test_detect_cycle()
