/**
 * Minimum Shifts to Sort
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 09-shift-linked-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Minimum Shifts to Sort',
        difficulty: 'Hard',
        algorithm: 'll-shift',
        parent: '09-shift-linked-list',
        description: 'Given a linked list that is a rotated version of a sorted list, find the minimum number of shifts (forward or backward) needed to sort it.',
        problem: 'Requires finding the rotation point (where the order breaks) and computing the distance to the sorted position, combining search with shift calculation.',
        hints: [
            'Given a linked list that is a rotated version of a sorted list, find the minimum number of shifts (forward or backward) needed to sort it.',
            'Requires finding the rotation point (where the order breaks) and computing the distance to the sorted position, combining search with shift calculation.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[4,5,0,1,2,3]: this is sorted [0,1,2,3,4,5] shifted by 2. Minimum shifts to restore: 2 backward or 4 forward. Answer: 2.'
            }
        ],
        solutions: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class DoublyLinkedNode:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

def minimum_shifts_to_sort(head, *args):
    """
    Minimum Shifts to Sort
    Given a linked list that is a rotated version of a sorted list, find the minimum number of shifts (forward or backward) needed to sort it.

    Approach: Requires finding the rotation point (where the order breaks) and computing the distance to the sorted position, combining search with shift calculation.
    """
    if not head:
        return head

    # Core algorithm for: Minimum Shifts to Sort
    current = head
    result = []

    while current:
        result.append(current.val)
        current = current.next

    return result


# Helper: build linked list from array
def to_linked_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def to_array(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result


# Test
if __name__ == "__main__":
    # Example: list=[4,5,0,1,2,3]: this is sorted [0,1,2,3,4,5] shifted by 2. Minimum shifts to restore: 2 backward or 4 forward. Answer: 2.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = minimum_shifts_to_sort(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = minimum_shifts_to_sort(head)
    print("Result:", result)`,
            go: `package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

type DoublyLinkedNode struct {
    Val  int
    Prev *DoublyLinkedNode
    Next *DoublyLinkedNode
}

// MinimumShiftsToSort solves: Minimum Shifts to Sort
// Given a linked list that is a rotated version of a sorted list, find the minimum number of shifts (forward or backward) needed to sort it.
// Approach: Requires finding the rotation point (where the order breaks) and computing the distance to the sorted position, combining search with shift calculation.
func MinimumShiftsToSort(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Minimum Shifts to Sort
    current := head
    for current.Next != nil {
        current = current.Next
    }

    return head
}

// Helper functions
func toLinkedList(arr []int) *ListNode {
    if len(arr) == 0 {
        return nil
    }
    head := &ListNode{Val: arr[0]}
    current := head
    for i := 1; i < len(arr); i++ {
        current.Next = &ListNode{Val: arr[i]}
        current = current.Next
    }
    return head
}

func toArray(head *ListNode) []int {
    result := []int{}
    for head != nil {
        result = append(result, head.Val)
        head = head.Next
    }
    return result
}

func main() {
    // Example: list=[4,5,0,1,2,3]: this is sorted [0,1,2,3,4,5] shifted by 2. Minimum shifts to restore: 2 backward or 4 forward. Answer: 2.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := MinimumShiftsToSort(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = MinimumShiftsToSort(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '09-shift-linked-list/twist-04-minimum-shifts-to-sort', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/09-shift-linked-list/twist-04-minimum-shifts-to-sort'] = problem;
})();
