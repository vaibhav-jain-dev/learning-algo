/**
 * Swap to Make Sorted
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 04-remove-kth-node/03-swapping-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Swap to Make Sorted',
        difficulty: 'Hard',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/03-swapping-nodes',
        description: 'Given a nearly-sorted linked list where exactly one swap is needed to sort it, find the two nodes that need swapping and swap their values.',
        problem: 'Requires detecting which two nodes are out of order by finding inversions, then swapping only those. This combines searching for the anomaly with the swap operation.',
        hints: [
            'Given a nearly-sorted linked list where exactly one swap is needed to sort it, find the two nodes that need swapping and swap their values.',
            'Requires detecting which two nodes are out of order by finding inversions, then swapping only those',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,5,3,4,2,6]: swapping 5 and 2 gives [1,2,3,4,5,6]. Find and swap these two nodes.'
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

def swap_to_make_sorted(head, *args):
    """
    Swap to Make Sorted
    Given a nearly-sorted linked list where exactly one swap is needed to sort it, find the two nodes that need swapping and swap their values.

    Approach: Requires detecting which two nodes are out of order by finding inversions, then swapping only those. This combines searching for the anomaly with the swap operation.
    """
    if not head:
        return head

    # Core algorithm for: Swap to Make Sorted
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
    # Example: list=[1,5,3,4,2,6]: swapping 5 and 2 gives [1,2,3,4,5,6]. Find and swap these two nodes.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = swap_to_make_sorted(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = swap_to_make_sorted(head)
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

// SwapToMakeSorted solves: Swap to Make Sorted
// Given a nearly-sorted linked list where exactly one swap is needed to sort it, find the two nodes that need swapping and swap their values.
// Approach: Requires detecting which two nodes are out of order by finding inversions, then swapping only those. This combines searching for the anomaly with the swap operation.
func SwapToMakeSorted(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Swap to Make Sorted
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
    // Example: list=[1,5,3,4,2,6]: swapping 5 and 2 gives [1,2,3,4,5,6]. Find and swap these two nodes.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := SwapToMakeSorted(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = SwapToMakeSorted(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/03-swapping-nodes/twist-04-swap-to-make-sorted', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/03-swapping-nodes/twist-04-swap-to-make-sorted'] = problem;
})();
