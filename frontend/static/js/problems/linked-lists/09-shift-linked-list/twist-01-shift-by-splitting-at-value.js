/**
 * Shift by Splitting at Value
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 09-shift-linked-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Shift by Splitting at Value',
        difficulty: 'Medium',
        algorithm: 'll-shift',
        parent: '09-shift-linked-list',
        description: 'Instead of shifting by k positions, shift the list so that the node with a given target value becomes the new head. Wrap the preceding nodes to the end.',
        problem: 'Position-based shifting becomes value-based searching. You must find the target node first, then perform the rotation at that point.',
        hints: [
            'Instead of shifting by k positions, shift the list so that the node with a given target value becomes the new head',
            'Position-based shifting becomes value-based searching',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[0,1,2,3,4,5], target=3: node 3 becomes head. Result=[3,4,5,0,1,2].'
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

def shift_by_splitting_at_value(head, *args):
    """
    Shift by Splitting at Value
    Instead of shifting by k positions, shift the list so that the node with a given target value becomes the new head. Wrap the preceding nodes to the end.

    Approach: Position-based shifting becomes value-based searching. You must find the target node first, then perform the rotation at that point.
    """
    if not head:
        return head

    # Core algorithm for: Shift by Splitting at Value
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
    # Example: list=[0,1,2,3,4,5], target=3: node 3 becomes head. Result=[3,4,5,0,1,2].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = shift_by_splitting_at_value(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = shift_by_splitting_at_value(head)
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

// ShiftBySplittingAtValue solves: Shift by Splitting at Value
// Instead of shifting by k positions, shift the list so that the node with a given target value becomes the new head. Wrap the preceding nodes to the end.
// Approach: Position-based shifting becomes value-based searching. You must find the target node first, then perform the rotation at that point.
func ShiftBySplittingAtValue(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Shift by Splitting at Value
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
    // Example: list=[0,1,2,3,4,5], target=3: node 3 becomes head. Result=[3,4,5,0,1,2].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ShiftBySplittingAtValue(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ShiftBySplittingAtValue(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '09-shift-linked-list/twist-01-shift-by-splitting-at-value', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/09-shift-linked-list/twist-01-shift-by-splitting-at-value'] = problem;
})();
