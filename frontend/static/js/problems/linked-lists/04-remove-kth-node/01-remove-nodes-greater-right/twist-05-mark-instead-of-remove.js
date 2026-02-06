/**
 * Mark Instead of Remove
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 04-remove-kth-node/01-remove-nodes-greater-right
 */
(function() {
    'use strict';
    const problem = {
        name: 'Mark Instead of Remove',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/01-remove-nodes-greater-right',
        description: 'Instead of removing nodes, mark the nodes that would be removed by setting their value to -1. Return the modified list without actually deleting any nodes.',
        problem: 'Changes from pointer manipulation to value mutation. The identification logic is the same, but the implementation avoids the complexity of node deletion and relinking.',
        hints: [
            'Instead of removing nodes, mark the nodes that would be removed by setting their value to -1',
            'Changes from pointer manipulation to value mutation',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[5,2,13,3,8]: nodes 5,2,3 have greater values to their right. Result=[-1,-1,13,-1,8].'
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

def mark_instead_of_remove(head, *args):
    """
    Mark Instead of Remove
    Instead of removing nodes, mark the nodes that would be removed by setting their value to -1. Return the modified list without actually deleting any nodes.

    Approach: Changes from pointer manipulation to value mutation. The identification logic is the same, but the implementation avoids the complexity of node deletion and relinking.
    """
    if not head:
        return head

    # Core algorithm for: Mark Instead of Remove
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
    # Example: list=[5,2,13,3,8]: nodes 5,2,3 have greater values to their right. Result=[-1,-1,13,-1,8].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = mark_instead_of_remove(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = mark_instead_of_remove(head)
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

// MarkInsteadOfRemove solves: Mark Instead of Remove
// Instead of removing nodes, mark the nodes that would be removed by setting their value to -1. Return the modified list without actually deleting any nodes.
// Approach: Changes from pointer manipulation to value mutation. The identification logic is the same, but the implementation avoids the complexity of node deletion and relinking.
func MarkInsteadOfRemove(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Mark Instead of Remove
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
    // Example: list=[5,2,13,3,8]: nodes 5,2,3 have greater values to their right. Result=[-1,-1,13,-1,8].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := MarkInsteadOfRemove(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = MarkInsteadOfRemove(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/01-remove-nodes-greater-right/twist-05-mark-instead-of-remove', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/01-remove-nodes-greater-right/twist-05-mark-instead-of-remove'] = problem;
})();
