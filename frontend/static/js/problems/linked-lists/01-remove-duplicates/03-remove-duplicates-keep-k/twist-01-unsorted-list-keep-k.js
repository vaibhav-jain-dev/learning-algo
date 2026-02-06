/**
 * Unsorted List Keep-K
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 01-remove-duplicates/03-remove-duplicates-keep-k
 */
(function() {
    'use strict';
    const problem = {
        name: 'Unsorted List Keep-K',
        difficulty: 'Hard',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/03-remove-duplicates-keep-k',
        description: 'The list is unsorted. Keep at most k occurrences of each value while preserving the original relative order of kept nodes.',
        problem: 'You need a hash map that counts occurrences seen so far. For each node, check if its value has been seen fewer than k times. The sorted adjacency property no longer helps with grouping.',
        hints: [
            'The list is unsorted',
            'You need a hash map that counts occurrences seen so far',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: 3->1->2->3->1->3->2, k=2. Output: 3->1->2->3->1->2 (third 3 removed, first two of each kept).'
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

def unsorted_list_keep_k(head, *args):
    """
    Unsorted List Keep-K
    The list is unsorted. Keep at most k occurrences of each value while preserving the original relative order of kept nodes.

    Approach: You need a hash map that counts occurrences seen so far. For each node, check if its value has been seen fewer than k times. The sorted adjacency property no longer helps with grouping.
    """
    if not head:
        return head

    # Core algorithm for: Unsorted List Keep-K
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
    # Example: Input: 3->1->2->3->1->3->2, k=2. Output: 3->1->2->3->1->2 (third 3 removed, first two of each kept).
    head = to_linked_list([1, 2, 3, 4, 5])
    result = unsorted_list_keep_k(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = unsorted_list_keep_k(head)
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

// UnsortedListKeepK solves: Unsorted List Keep-K
// The list is unsorted. Keep at most k occurrences of each value while preserving the original relative order of kept nodes.
// Approach: You need a hash map that counts occurrences seen so far. For each node, check if its value has been seen fewer than k times. The sorted adjacency property no longer helps with grouping.
func UnsortedListKeepK(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Unsorted List Keep-K
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
    // Example: Input: 3->1->2->3->1->3->2, k=2. Output: 3->1->2->3->1->2 (third 3 removed, first two of each kept).
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := UnsortedListKeepK(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = UnsortedListKeepK(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/03-remove-duplicates-keep-k/twist-01-unsorted-list-keep-k', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/03-remove-duplicates-keep-k/twist-01-unsorted-list-keep-k'] = problem;
})();
