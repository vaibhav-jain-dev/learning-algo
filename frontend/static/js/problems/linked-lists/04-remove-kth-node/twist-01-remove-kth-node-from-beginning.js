/**
 * Remove Kth Node From Beginning
 * Category: linked-lists
 * Difficulty: Easy
 * Parent: 04-remove-kth-node
 */
(function() {
    'use strict';
    const problem = {
        name: 'Remove Kth Node From Beginning',
        difficulty: 'Easy',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node',
        description: 'Remove the kth node from the beginning of the list instead of from the end. Do this in a single pass without knowing the length.',
        problem: 'Simplifies the two-pointer approach since you do not need the gap technique; just traverse k-1 nodes. But consider edge cases when k=1 (removing the head).',
        hints: [
            'Remove the kth node from the beginning of the list instead of from the end',
            'Simplifies the two-pointer approach since you do not need the gap technique; just traverse k-1 nodes',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[0,1,2,3,4,5], k=2: remove the 2nd node from start (value 1), result=[0,2,3,4,5].'
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

def remove_kth_node_from_beginning(head, *args):
    """
    Remove Kth Node From Beginning
    Remove the kth node from the beginning of the list instead of from the end. Do this in a single pass without knowing the length.

    Approach: Simplifies the two-pointer approach since you do not need the gap technique; just traverse k-1 nodes. But consider edge cases when k=1 (removing the head).
    """
    if not head:
        return head

    # Core algorithm for: Remove Kth Node From Beginning
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
    # Example: list=[0,1,2,3,4,5], k=2: remove the 2nd node from start (value 1), result=[0,2,3,4,5].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = remove_kth_node_from_beginning(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = remove_kth_node_from_beginning(head)
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

// RemoveKthNodeFromBeginning solves: Remove Kth Node From Beginning
// Remove the kth node from the beginning of the list instead of from the end. Do this in a single pass without knowing the length.
// Approach: Simplifies the two-pointer approach since you do not need the gap technique; just traverse k-1 nodes. But consider edge cases when k=1 (removing the head).
func RemoveKthNodeFromBeginning(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Remove Kth Node From Beginning
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
    // Example: list=[0,1,2,3,4,5], k=2: remove the 2nd node from start (value 1), result=[0,2,3,4,5].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := RemoveKthNodeFromBeginning(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = RemoveKthNodeFromBeginning(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/twist-01-remove-kth-node-from-beginning', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/twist-01-remove-kth-node-from-beginning'] = problem;
})();
