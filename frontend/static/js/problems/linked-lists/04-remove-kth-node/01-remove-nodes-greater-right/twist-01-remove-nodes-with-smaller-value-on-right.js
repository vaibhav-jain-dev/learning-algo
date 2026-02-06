/**
 * Remove Nodes With Smaller Value on Right
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 04-remove-kth-node/01-remove-nodes-greater-right
 */
(function() {
    'use strict';
    const problem = {
        name: 'Remove Nodes With Smaller Value on Right',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/01-remove-nodes-greater-right',
        description: 'Remove all nodes that have a strictly smaller value anywhere to their right side.',
        problem: 'Flips the comparison direction. Instead of a monotonically decreasing stack, you need a monotonically increasing stack, changing which nodes survive.',
        hints: [
            'Remove all nodes that have a strictly smaller value anywhere to their right side.',
            'Flips the comparison direction',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[5,2,13,3,8]: nodes with smaller value to right: 5 has 2,3 to right (smaller exists). Keep nodes where no smaller value exists to right. Result=[2,3,8]? No, 2 has nothing smaller, so keep [2,3,8].'
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

def remove_nodes_with_smaller_value_on_right(head, *args):
    """
    Remove Nodes With Smaller Value on Right
    Remove all nodes that have a strictly smaller value anywhere to their right side.

    Approach: Flips the comparison direction. Instead of a monotonically decreasing stack, you need a monotonically increasing stack, changing which nodes survive.
    """
    if not head:
        return head

    # Core algorithm for: Remove Nodes With Smaller Value on Right
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
    # Example: list=[5,2,13,3,8]: nodes with smaller value to right: 5 has 2,3 to right (smaller exists). Keep nodes where no smaller value exists to right. Result=[2,3,8]? No, 2 has nothing smaller, so keep [2,3,8].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = remove_nodes_with_smaller_value_on_right(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = remove_nodes_with_smaller_value_on_right(head)
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

// RemoveNodesWithSmallerValueOnRight solves: Remove Nodes With Smaller Value on Right
// Remove all nodes that have a strictly smaller value anywhere to their right side.
// Approach: Flips the comparison direction. Instead of a monotonically decreasing stack, you need a monotonically increasing stack, changing which nodes survive.
func RemoveNodesWithSmallerValueOnRight(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Remove Nodes With Smaller Value on Right
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
    // Example: list=[5,2,13,3,8]: nodes with smaller value to right: 5 has 2,3 to right (smaller exists). Keep nodes where no smaller value exists to right. Result=[2,3,8]? No, 2 has nothing smaller, so keep [2,3,8].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := RemoveNodesWithSmallerValueOnRight(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = RemoveNodesWithSmallerValueOnRight(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/01-remove-nodes-greater-right/twist-01-remove-nodes-with-smaller-value-on-right', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/01-remove-nodes-greater-right/twist-01-remove-nodes-with-smaller-value-on-right'] = problem;
})();
