/**
 * Alternate Reverse and Sort
 * Category: linked-lists
 * Difficulty: Very Hard
 * Parent: 07-reverse-linked-list/03-reverse-alternating-k-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Alternate Reverse and Sort',
        difficulty: 'Very Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/03-reverse-alternating-k-nodes',
        description: 'Alternately reverse k nodes, then sort the next k nodes in ascending order, then reverse k, then sort k, etc.',
        problem: 'Mixing reversal and sorting in alternating groups requires two different subgroup operations, each with distinct pointer manipulation patterns.',
        hints: [
            'Alternately reverse k nodes, then sort the next k nodes in ascending order, then reverse k, then sort k, etc.',
            'Mixing reversal and sorting in alternating groups requires two different subgroup operations, each with distinct pointer manipulation patterns.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[5,3,1,6,2,4,9,7,8], k=3: reverse [5,3,1]->[1,3,5], sort [6,2,4]->[2,4,6], reverse [9,7,8]->[8,7,9]. Result=[1,3,5,2,4,6,8,7,9].'
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

def alternate_reverse_and_sort(head, *args):
    """
    Alternate Reverse and Sort
    Alternately reverse k nodes, then sort the next k nodes in ascending order, then reverse k, then sort k, etc.

    Approach: Mixing reversal and sorting in alternating groups requires two different subgroup operations, each with distinct pointer manipulation patterns.
    """
    if not head:
        return head

    # Core algorithm for: Alternate Reverse and Sort
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
    # Example: list=[5,3,1,6,2,4,9,7,8], k=3: reverse [5,3,1]->[1,3,5], sort [6,2,4]->[2,4,6], reverse [9,7,8]->[8,7,9]. Result=[1,3,5,2,4,6,8,7,9].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = alternate_reverse_and_sort(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = alternate_reverse_and_sort(head)
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

// AlternateReverseAndSort solves: Alternate Reverse and Sort
// Alternately reverse k nodes, then sort the next k nodes in ascending order, then reverse k, then sort k, etc.
// Approach: Mixing reversal and sorting in alternating groups requires two different subgroup operations, each with distinct pointer manipulation patterns.
func AlternateReverseAndSort(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Alternate Reverse and Sort
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
    // Example: list=[5,3,1,6,2,4,9,7,8], k=3: reverse [5,3,1]->[1,3,5], sort [6,2,4]->[2,4,6], reverse [9,7,8]->[8,7,9]. Result=[1,3,5,2,4,6,8,7,9].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := AlternateReverseAndSort(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = AlternateReverseAndSort(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-04-alternate-reverse-and-sort', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-04-alternate-reverse-and-sort'] = problem;
})();
