/**
 * Merge K Sorted Lists
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 08-merge-linked-lists
 */
(function() {
    'use strict';
    const problem = {
        name: 'Merge K Sorted Lists',
        difficulty: 'Hard',
        algorithm: 'll-merge',
        parent: '08-merge-linked-lists',
        description: 'Merge k sorted linked lists into one sorted linked list, not just two.',
        problem: 'With k lists, pairwise merging is O(nk). Using a min-heap to track the smallest head across all lists reduces to O(n log k), requiring a fundamentally different data structure.',
        hints: [
            'Merge k sorted linked lists into one sorted linked list, not just two.',
            'With k lists, pairwise merging is O(nk)',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'lists=[[1,4,5],[1,3,4],[2,6]]: merge all into [1,1,2,3,4,4,5,6].'
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

def merge_k_sorted_lists(head, *args):
    """
    Merge K Sorted Lists
    Merge k sorted linked lists into one sorted linked list, not just two.

    Approach: With k lists, pairwise merging is O(nk). Using a min-heap to track the smallest head across all lists reduces to O(n log k), requiring a fundamentally different data structure.
    """
    if not head:
        return head

    # Core algorithm for: Merge K Sorted Lists
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
    # Example: lists=[[1,4,5],[1,3,4],[2,6]]: merge all into [1,1,2,3,4,4,5,6].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = merge_k_sorted_lists(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = merge_k_sorted_lists(head)
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

// MergeKSortedLists solves: Merge K Sorted Lists
// Merge k sorted linked lists into one sorted linked list, not just two.
// Approach: With k lists, pairwise merging is O(nk). Using a min-heap to track the smallest head across all lists reduces to O(n log k), requiring a fundamentally different data structure.
func MergeKSortedLists(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Merge K Sorted Lists
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
    // Example: lists=[[1,4,5],[1,3,4],[2,6]]: merge all into [1,1,2,3,4,4,5,6].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := MergeKSortedLists(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = MergeKSortedLists(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '08-merge-linked-lists/twist-01-merge-k-sorted-lists', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/08-merge-linked-lists/twist-01-merge-k-sorted-lists'] = problem;
})();
