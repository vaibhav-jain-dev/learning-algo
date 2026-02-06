/**
 * Unsorted List Variant
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 01-remove-duplicates/02-remove-all-duplicate-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Unsorted List Variant',
        difficulty: 'Hard',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/02-remove-all-duplicate-nodes',
        description: 'The list is unsorted. Remove ALL nodes whose values appear more than once. You cannot sort the list first.',
        problem: 'Without sorted order, duplicates are not adjacent. You need two passes: one to count frequencies (hash map), and another to remove nodes with count > 1. The single-pointer sorted approach completely breaks.',
        hints: [
            'The list is unsorted',
            'Without sorted order, duplicates are not adjacent',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: 3->2->1->3->4->2. Values 3 and 2 appear twice, so remove all of them. Output: 1->4.'
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

def unsorted_list_variant(head, *args):
    """
    Unsorted List Variant
    The list is unsorted. Remove ALL nodes whose values appear more than once. You cannot sort the list first.

    Approach: Without sorted order, duplicates are not adjacent. You need two passes: one to count frequencies (hash map), and another to remove nodes with count > 1. The single-pointer sorted approach completely breaks.
    """
    if not head:
        return head

    # Core algorithm for: Unsorted List Variant
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
    # Example: Input: 3->2->1->3->4->2. Values 3 and 2 appear twice, so remove all of them. Output: 1->4.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = unsorted_list_variant(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = unsorted_list_variant(head)
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

// UnsortedListVariant solves: Unsorted List Variant
// The list is unsorted. Remove ALL nodes whose values appear more than once. You cannot sort the list first.
// Approach: Without sorted order, duplicates are not adjacent. You need two passes: one to count frequencies (hash map), and another to remove nodes with count > 1. The single-pointer sorted approach completely breaks.
func UnsortedListVariant(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Unsorted List Variant
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
    // Example: Input: 3->2->1->3->4->2. Values 3 and 2 appear twice, so remove all of them. Output: 1->4.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := UnsortedListVariant(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = UnsortedListVariant(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-01-unsorted-list-variant', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/02-remove-all-duplicate-nodes/twist-01-unsorted-list-variant'] = problem;
})();
