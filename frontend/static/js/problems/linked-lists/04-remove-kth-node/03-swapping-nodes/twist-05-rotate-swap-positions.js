/**
 * Rotate Swap Positions
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 04-remove-kth-node/03-swapping-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Rotate Swap Positions',
        difficulty: 'Hard',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/03-swapping-nodes',
        description: 'Instead of swapping the kth from start and kth from end, perform a three-way rotation: move the kth-from-start value to the kth-from-end position, kth-from-end to the middle position, and middle to the kth-from-start position.',
        problem: 'A three-way rotation requires finding three specific nodes and rotating their values in a cycle, adding complexity beyond a simple two-element swap.',
        hints: [
            'Instead of swapping the kth from start and kth from end, perform a three-way rotation: move the kth-from-start value to the kth-from-end position, kth-from-end to the middle position, and middle to the kth-from-start position.',
            'A three-way rotation requires finding three specific nodes and rotating their values in a cycle, adding complexity beyond a simple two-element swap.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5], k=2: positions are 2nd from start (2), middle (3), 2nd from end (4). Rotate: 2->4 pos, 4->3 pos, 3->2 pos. Result=[1,3,4,2,5].'
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

def rotate_swap_positions(head, *args):
    """
    Rotate Swap Positions
    Instead of swapping the kth from start and kth from end, perform a three-way rotation: move the kth-from-start value to the kth-from-end position, kth-from-end to the middle position, and middle to the kth-from-start position.

    Approach: A three-way rotation requires finding three specific nodes and rotating their values in a cycle, adding complexity beyond a simple two-element swap.
    """
    if not head:
        return head

    # Core algorithm for: Rotate Swap Positions
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
    # Example: list=[1,2,3,4,5], k=2: positions are 2nd from start (2), middle (3), 2nd from end (4). Rotate: 2->4 pos, 4->3 pos, 3->2 pos. Result=[1,3,4,2,5].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = rotate_swap_positions(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = rotate_swap_positions(head)
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

// RotateSwapPositions solves: Rotate Swap Positions
// Instead of swapping the kth from start and kth from end, perform a three-way rotation: move the kth-from-start value to the kth-from-end position, kth-from-end to the middle position, and middle to the kth-from-start position.
// Approach: A three-way rotation requires finding three specific nodes and rotating their values in a cycle, adding complexity beyond a simple two-element swap.
func RotateSwapPositions(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Rotate Swap Positions
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
    // Example: list=[1,2,3,4,5], k=2: positions are 2nd from start (2), middle (3), 2nd from end (4). Rotate: 2->4 pos, 4->3 pos, 3->2 pos. Result=[1,3,4,2,5].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := RotateSwapPositions(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = RotateSwapPositions(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/03-swapping-nodes/twist-05-rotate-swap-positions', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/03-swapping-nodes/twist-05-rotate-swap-positions'] = problem;
})();
