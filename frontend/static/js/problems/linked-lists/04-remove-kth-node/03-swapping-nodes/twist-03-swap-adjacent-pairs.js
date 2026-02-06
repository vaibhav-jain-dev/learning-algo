/**
 * Swap Adjacent Pairs
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 04-remove-kth-node/03-swapping-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Swap Adjacent Pairs',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/03-swapping-nodes',
        description: 'Swap every two adjacent nodes in the list. If the list has odd length, the last node remains in place.',
        problem: 'Instead of swapping two specific nodes, you must iterate through the entire list swapping pairs, requiring careful pointer management in a loop.',
        hints: [
            'Swap every two adjacent nodes in the list',
            'Instead of swapping two specific nodes, you must iterate through the entire list swapping pairs, requiring careful pointer management in a loop.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5]: swap (1,2), (3,4), leave 5. Result=[2,1,4,3,5].'
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

def swap_adjacent_pairs(head, *args):
    """
    Swap Adjacent Pairs
    Swap every two adjacent nodes in the list. If the list has odd length, the last node remains in place.

    Approach: Instead of swapping two specific nodes, you must iterate through the entire list swapping pairs, requiring careful pointer management in a loop.
    """
    if not head:
        return head

    # Core algorithm for: Swap Adjacent Pairs
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
    # Example: list=[1,2,3,4,5]: swap (1,2), (3,4), leave 5. Result=[2,1,4,3,5].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = swap_adjacent_pairs(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = swap_adjacent_pairs(head)
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

// SwapAdjacentPairs solves: Swap Adjacent Pairs
// Swap every two adjacent nodes in the list. If the list has odd length, the last node remains in place.
// Approach: Instead of swapping two specific nodes, you must iterate through the entire list swapping pairs, requiring careful pointer management in a loop.
func SwapAdjacentPairs(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Swap Adjacent Pairs
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
    // Example: list=[1,2,3,4,5]: swap (1,2), (3,4), leave 5. Result=[2,1,4,3,5].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := SwapAdjacentPairs(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = SwapAdjacentPairs(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/03-swapping-nodes/twist-03-swap-adjacent-pairs', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/03-swapping-nodes/twist-03-swap-adjacent-pairs'] = problem;
})();
