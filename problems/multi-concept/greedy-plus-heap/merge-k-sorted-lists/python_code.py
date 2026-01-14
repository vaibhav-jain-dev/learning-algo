"""
Merge K Sorted Lists
Combines: Heap/Priority Queue + Linked List + Divide and Conquer
"""

import heapq
from typing import List, Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __lt__(self, other):
        return self.val < other.val


def mergeKLists_heap(lists: List[Optional[ListNode]]) -> Optional[ListNode]:
    """
    Min Heap approach - O(N log k)
    """
    # Min heap: (value, unique_id, node)
    heap = []
    counter = 0  # For tie-breaking

    # Add first node of each list
    for lst in lists:
        if lst:
            heapq.heappush(heap, (lst.val, counter, lst))
            counter += 1

    dummy = ListNode(0)
    current = dummy

    while heap:
        val, _, node = heapq.heappop(heap)
        current.next = node
        current = current.next

        if node.next:
            heapq.heappush(heap, (node.next.val, counter, node.next))
            counter += 1

    return dummy.next


def mergeKLists_divide_conquer(lists: List[Optional[ListNode]]) -> Optional[ListNode]:
    """
    Divide and Conquer approach - O(N log k)
    """
    if not lists:
        return None

    def merge_two(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        current = dummy

        while l1 and l2:
            if l1.val <= l2.val:
                current.next = l1
                l1 = l1.next
            else:
                current.next = l2
                l2 = l2.next
            current = current.next

        current.next = l1 or l2
        return dummy.next

    # Merge pairs until one list remains
    while len(lists) > 1:
        merged = []
        for i in range(0, len(lists), 2):
            l1 = lists[i]
            l2 = lists[i + 1] if i + 1 < len(lists) else None
            merged.append(merge_two(l1, l2))
        lists = merged

    return lists[0]


def mergeKLists_brute(lists: List[Optional[ListNode]]) -> Optional[ListNode]:
    """
    Brute Force - Collect all, sort, rebuild - O(N log N)
    """
    # Collect all values
    values = []
    for lst in lists:
        while lst:
            values.append(lst.val)
            lst = lst.next

    if not values:
        return None

    # Sort and build new list
    values.sort()

    dummy = ListNode(0)
    current = dummy
    for val in values:
        current.next = ListNode(val)
        current = current.next

    return dummy.next


# Helper functions
def create_list(values: List[int]) -> Optional[ListNode]:
    if not values:
        return None
    head = ListNode(values[0])
    current = head
    for val in values[1:]:
        current.next = ListNode(val)
        current = current.next
    return head


def list_to_array(head: Optional[ListNode]) -> List[int]:
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result


# Test cases
if __name__ == "__main__":
    test_cases = [
        ([[1, 4, 5], [1, 3, 4], [2, 6]], [1, 1, 2, 3, 4, 4, 5, 6]),
        ([], []),
        ([[]], []),
        ([[1], [0]], [0, 1]),
        ([[1, 2, 3], [4, 5, 6], [7, 8, 9]], [1, 2, 3, 4, 5, 6, 7, 8, 9]),
        ([[-1, 0, 1], [-2, 2]], [-2, -1, 0, 1, 2]),
    ]

    print("Merge K Sorted Lists")
    print("=" * 60)

    for i, (input_lists, expected) in enumerate(test_cases):
        # Create lists for each approach
        lists1 = [create_list(lst) for lst in input_lists]
        lists2 = [create_list(lst) for lst in input_lists]
        lists3 = [create_list(lst) for lst in input_lists]

        result1 = list_to_array(mergeKLists_heap(lists1))
        result2 = list_to_array(mergeKLists_divide_conquer(lists2))
        result3 = list_to_array(mergeKLists_brute(lists3))

        status1 = "PASS" if result1 == expected else "FAIL"
        status2 = "PASS" if result2 == expected else "FAIL"
        status3 = "PASS" if result3 == expected else "FAIL"

        print(f"\nTest {i + 1}: {input_lists}")
        print(f"  Heap:           {result1} [{status1}]")
        print(f"  Divide&Conquer: {result2} [{status2}]")
        print(f"  Brute Force:    {result3} [{status3}]")
        print(f"  Expected:       {expected}")
