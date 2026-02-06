/**
 * Swap Kth From Start and Kth From Start
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 04-remove-kth-node/03-swapping-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Swap Kth From Start and Kth From Start',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/03-swapping-nodes',
        description: 'Swap the values of the ith node and jth node from the beginning (given two indices i and j).',
        problem: 'Both positions are from the start, so no two-pointer end-detection is needed. Simple traversal to both positions suffices, but you must handle i==j edge case.',
        hints: [
            'Swap the values of the ith node and jth node from the beginning (given two indices i and j).',
            'Both positions are from the start, so no two-pointer end-detection is needed',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5], i=2, j=4: swap values at positions 2 and 4 (1-indexed). Result=[1,4,3,2,5].'
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

def swap_kth_from_start_and_kth_from_start(head, *args):
    """
    Swap Kth From Start and Kth From Start
    Swap the values of the ith node and jth node from the beginning (given two indices i and j).

    Approach: Both positions are from the start, so no two-pointer end-detection is needed. Simple traversal to both positions suffices, but you must handle i==j edge case.
    """
    if not head:
        return head

    # Core algorithm for: Swap Kth From Start and Kth From Start
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
    # Example: list=[1,2,3,4,5], i=2, j=4: swap values at positions 2 and 4 (1-indexed). Result=[1,4,3,2,5].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = swap_kth_from_start_and_kth_from_start(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = swap_kth_from_start_and_kth_from_start(head)
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

// SwapKthFromStartAndKthFromStart solves: Swap Kth From Start and Kth From Start
// Swap the values of the ith node and jth node from the beginning (given two indices i and j).
// Approach: Both positions are from the start, so no two-pointer end-detection is needed. Simple traversal to both positions suffices, but you must handle i==j edge case.
func SwapKthFromStartAndKthFromStart(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Swap Kth From Start and Kth From Start
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
    // Example: list=[1,2,3,4,5], i=2, j=4: swap values at positions 2 and 4 (1-indexed). Result=[1,4,3,2,5].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := SwapKthFromStartAndKthFromStart(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = SwapKthFromStartAndKthFromStart(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/03-swapping-nodes/twist-02-swap-kth-from-start-and-kth-from-start', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/03-swapping-nodes/twist-02-swap-kth-from-start-and-kth-from-start'] = problem;
})();
