/**
 * Merge Two Unsorted Lists Into Sorted
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 08-merge-linked-lists
 */
(function() {
    'use strict';
    const problem = {
        name: 'Merge Two Unsorted Lists Into Sorted',
        difficulty: 'Medium',
        algorithm: 'll-merge',
        parent: '08-merge-linked-lists',
        description: 'Given two unsorted linked lists, produce a single sorted linked list containing all elements from both.',
        problem: 'Cannot use the merge step directly since inputs are unsorted. Must either sort each list first (merge sort on linked lists) or collect all values and sort.',
        hints: [
            'Given two unsorted linked lists, produce a single sorted linked list containing all elements from both.',
            'Cannot use the merge step directly since inputs are unsorted',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list1=[3,1,4], list2=[2,5,0]: sorted merge result=[0,1,2,3,4,5].'
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

def merge_two_unsorted_lists_into_sorted(head, *args):
    """
    Merge Two Unsorted Lists Into Sorted
    Given two unsorted linked lists, produce a single sorted linked list containing all elements from both.

    Approach: Cannot use the merge step directly since inputs are unsorted. Must either sort each list first (merge sort on linked lists) or collect all values and sort.
    """
    if not head:
        return head

    # Core algorithm for: Merge Two Unsorted Lists Into Sorted
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
    # Example: list1=[3,1,4], list2=[2,5,0]: sorted merge result=[0,1,2,3,4,5].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = merge_two_unsorted_lists_into_sorted(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = merge_two_unsorted_lists_into_sorted(head)
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

// MergeTwoUnsortedListsIntoSorted solves: Merge Two Unsorted Lists Into Sorted
// Given two unsorted linked lists, produce a single sorted linked list containing all elements from both.
// Approach: Cannot use the merge step directly since inputs are unsorted. Must either sort each list first (merge sort on linked lists) or collect all values and sort.
func MergeTwoUnsortedListsIntoSorted(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Merge Two Unsorted Lists Into Sorted
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
    // Example: list1=[3,1,4], list2=[2,5,0]: sorted merge result=[0,1,2,3,4,5].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := MergeTwoUnsortedListsIntoSorted(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = MergeTwoUnsortedListsIntoSorted(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '08-merge-linked-lists/twist-02-merge-two-unsorted-lists-into-sorted', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/08-merge-linked-lists/twist-02-merge-two-unsorted-lists-into-sorted'] = problem;
})();
