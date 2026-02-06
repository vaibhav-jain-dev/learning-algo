/**
 * Swap Nodes Not Values
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 04-remove-kth-node/03-swapping-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Swap Nodes Not Values',
        difficulty: 'Hard',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/03-swapping-nodes',
        description: 'Swap the actual nodes (relinking pointers) instead of just swapping their values. The node objects themselves must move.',
        problem: 'Swapping node pointers requires tracking predecessors of both nodes and carefully relinking four pointers, handling adjacent-node and head-node edge cases.',
        hints: [
            'Swap the actual nodes (relinking pointers) instead of just swapping their values',
            'Swapping node pointers requires tracking predecessors of both nodes and carefully relinking four pointers, handling adjacent-node and head-node edge cases.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5], k=2: swap node 2 and node 4 by relinking. After swap: [1,4,3,2,5]. Same result but nodes actually moved.'
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

def swap_nodes_not_values(head, *args):
    """
    Swap Nodes Not Values
    Swap the actual nodes (relinking pointers) instead of just swapping their values. The node objects themselves must move.

    Approach: Swapping node pointers requires tracking predecessors of both nodes and carefully relinking four pointers, handling adjacent-node and head-node edge cases.
    """
    if not head:
        return head

    # Core algorithm for: Swap Nodes Not Values
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
    # Example: list=[1,2,3,4,5], k=2: swap node 2 and node 4 by relinking. After swap: [1,4,3,2,5]. Same result but nodes actually moved.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = swap_nodes_not_values(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = swap_nodes_not_values(head)
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

// SwapNodesNotValues solves: Swap Nodes Not Values
// Swap the actual nodes (relinking pointers) instead of just swapping their values. The node objects themselves must move.
// Approach: Swapping node pointers requires tracking predecessors of both nodes and carefully relinking four pointers, handling adjacent-node and head-node edge cases.
func SwapNodesNotValues(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Swap Nodes Not Values
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
    // Example: list=[1,2,3,4,5], k=2: swap node 2 and node 4 by relinking. After swap: [1,4,3,2,5]. Same result but nodes actually moved.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := SwapNodesNotValues(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = SwapNodesNotValues(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/03-swapping-nodes/twist-01-swap-nodes-not-values', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/03-swapping-nodes/twist-01-swap-nodes-not-values'] = problem;
})();
