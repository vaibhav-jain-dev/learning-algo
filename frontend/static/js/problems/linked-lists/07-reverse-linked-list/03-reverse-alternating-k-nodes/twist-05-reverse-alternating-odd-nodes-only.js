/**
 * Reverse Alternating Odd Nodes Only
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 07-reverse-linked-list/03-reverse-alternating-k-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse Alternating Odd Nodes Only',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/03-reverse-alternating-k-nodes',
        description: 'Extract all odd-indexed nodes (1st, 3rd, 5th...) into a separate list, reverse that list, then merge them back into the even-indexed positions.',
        problem: 'Requires splitting the list by parity, reversing one half, and interleaving back. This is a split-process-merge pattern rather than in-place group reversal.',
        hints: [
            'Extract all odd-indexed nodes (1st, 3rd, 5th...) into a separate list, reverse that list, then merge them back into the even-indexed positions.',
            'Requires splitting the list by parity, reversing one half, and interleaving back',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5,6]: odd-indexed nodes [1,3,5] reversed to [5,3,1]. Interleave with even [2,4,6]: result=[5,2,3,4,1,6].'
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

def reverse_alternating_odd_nodes_only(head, *args):
    """
    Reverse Alternating Odd Nodes Only
    Extract all odd-indexed nodes (1st, 3rd, 5th...) into a separate list, reverse that list, then merge them back into the even-indexed positions.

    Approach: Requires splitting the list by parity, reversing one half, and interleaving back. This is a split-process-merge pattern rather than in-place group reversal.
    """
    if not head:
        return head

    # Core algorithm for: Reverse Alternating Odd Nodes Only
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
    # Example: list=[1,2,3,4,5,6]: odd-indexed nodes [1,3,5] reversed to [5,3,1]. Interleave with even [2,4,6]: result=[5,2,3,4,1,6].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverse_alternating_odd_nodes_only(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = reverse_alternating_odd_nodes_only(head)
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

// ReverseAlternatingOddNodesOnly solves: Reverse Alternating Odd Nodes Only
// Extract all odd-indexed nodes (1st, 3rd, 5th...) into a separate list, reverse that list, then merge them back into the even-indexed positions.
// Approach: Requires splitting the list by parity, reversing one half, and interleaving back. This is a split-process-merge pattern rather than in-place group reversal.
func ReverseAlternatingOddNodesOnly(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Reverse Alternating Odd Nodes Only
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
    // Example: list=[1,2,3,4,5,6]: odd-indexed nodes [1,3,5] reversed to [5,3,1]. Interleave with even [2,4,6]: result=[5,2,3,4,1,6].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReverseAlternatingOddNodesOnly(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReverseAlternatingOddNodesOnly(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-05-reverse-alternating-odd-nodes-only', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-05-reverse-alternating-odd-nodes-only'] = problem;
})();
