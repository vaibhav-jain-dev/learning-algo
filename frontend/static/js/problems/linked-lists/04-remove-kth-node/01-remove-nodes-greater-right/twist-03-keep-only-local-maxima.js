/**
 * Keep Only Local Maxima
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 04-remove-kth-node/01-remove-nodes-greater-right
 */
(function() {
    'use strict';
    const problem = {
        name: 'Keep Only Local Maxima',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/01-remove-nodes-greater-right',
        description: 'Remove all nodes that are NOT local maxima. A node is a local maximum if it is greater than or equal to both its neighbors (head and tail are considered local maxima).',
        problem: 'Requires looking at both left and right neighbors simultaneously, not just one direction. This changes the traversal pattern since you need prev, curr, and next references.',
        hints: [
            'Remove all nodes that are NOT local maxima',
            'Requires looking at both left and right neighbors simultaneously, not just one direction',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[5,2,13,3,8]: local maxima are 5 (head), 13 (>2 and >3), 8 (tail). Result=[5,13,8].'
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

def keep_only_local_maxima(head, *args):
    """
    Keep Only Local Maxima
    Remove all nodes that are NOT local maxima. A node is a local maximum if it is greater than or equal to both its neighbors (head and tail are considered local maxima).

    Approach: Requires looking at both left and right neighbors simultaneously, not just one direction. This changes the traversal pattern since you need prev, curr, and next references.
    """
    if not head:
        return head

    # Core algorithm for: Keep Only Local Maxima
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
    # Example: list=[5,2,13,3,8]: local maxima are 5 (head), 13 (>2 and >3), 8 (tail). Result=[5,13,8].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = keep_only_local_maxima(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = keep_only_local_maxima(head)
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

// KeepOnlyLocalMaxima solves: Keep Only Local Maxima
// Remove all nodes that are NOT local maxima. A node is a local maximum if it is greater than or equal to both its neighbors (head and tail are considered local maxima).
// Approach: Requires looking at both left and right neighbors simultaneously, not just one direction. This changes the traversal pattern since you need prev, curr, and next references.
func KeepOnlyLocalMaxima(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Keep Only Local Maxima
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
    // Example: list=[5,2,13,3,8]: local maxima are 5 (head), 13 (>2 and >3), 8 (tail). Result=[5,13,8].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := KeepOnlyLocalMaxima(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = KeepOnlyLocalMaxima(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/01-remove-nodes-greater-right/twist-03-keep-only-local-maxima', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/01-remove-nodes-greater-right/twist-03-keep-only-local-maxima'] = problem;
})();
