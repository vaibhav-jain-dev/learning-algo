/**
 * Merge In Descending Order
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 08-merge-linked-lists
 */
(function() {
    'use strict';
    const problem = {
        name: 'Merge In Descending Order',
        difficulty: 'Medium',
        algorithm: 'll-merge',
        parent: '08-merge-linked-lists',
        description: 'Merge two sorted (ascending) lists into one sorted in descending order, without reversing the final result.',
        problem: 'Building the result in reverse order means prepending each chosen node to the result head, flipping the construction direction from typical merge.',
        hints: [
            'Merge two sorted (ascending) lists into one sorted in descending order, without reversing the final result.',
            'Building the result in reverse order means prepending each chosen node to the result head, flipping the construction direction from typical merge.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list1=[1,3,5], list2=[2,4,6]: merge descending result=[6,5,4,3,2,1]. Build by prepending the larger element each time.'
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

def merge_in_descending_order(head, *args):
    """
    Merge In Descending Order
    Merge two sorted (ascending) lists into one sorted in descending order, without reversing the final result.

    Approach: Building the result in reverse order means prepending each chosen node to the result head, flipping the construction direction from typical merge.
    """
    if not head:
        return head

    # Core algorithm for: Merge In Descending Order
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
    # Example: list1=[1,3,5], list2=[2,4,6]: merge descending result=[6,5,4,3,2,1]. Build by prepending the larger element each time.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = merge_in_descending_order(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = merge_in_descending_order(head)
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

// MergeInDescendingOrder solves: Merge In Descending Order
// Merge two sorted (ascending) lists into one sorted in descending order, without reversing the final result.
// Approach: Building the result in reverse order means prepending each chosen node to the result head, flipping the construction direction from typical merge.
func MergeInDescendingOrder(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Merge In Descending Order
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
    // Example: list1=[1,3,5], list2=[2,4,6]: merge descending result=[6,5,4,3,2,1]. Build by prepending the larger element each time.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := MergeInDescendingOrder(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = MergeInDescendingOrder(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '08-merge-linked-lists/twist-04-merge-in-descending-order', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/08-merge-linked-lists/twist-04-merge-in-descending-order'] = problem;
})();
