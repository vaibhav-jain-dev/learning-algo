/**
 * Circular Linked List Middle
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 02-middle-node
 */
(function() {
    'use strict';
    const problem = {
        name: 'Circular Linked List Middle',
        difficulty: 'Medium',
        algorithm: 'll-middle',
        parent: '02-middle-node',
        description: 'Find the middle node of a circular singly linked list. You are given a pointer to one node in the cycle. Return the node that is floor(n/2) steps from the given node.',
        problem: 'The slow/fast pointer technique needs a different termination condition. Fast pointer will never hit null; instead you must detect when it returns to the start node. Also, you need to first determine the length of the cycle.',
        hints: [
            'Find the middle node of a circular singly linked list',
            'The slow/fast pointer technique needs a different termination condition',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Circular: 1->2->3->4->5->back to 1. Start at 1, n=5, middle is node 3 (floor(5/2)=2 steps from start).'
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

def circular_linked_list_middle(head, *args):
    """
    Circular Linked List Middle
    Find the middle node of a circular singly linked list. You are given a pointer to one node in the cycle. Return the node that is floor(n/2) steps from the given node.

    Approach: The slow/fast pointer technique needs a different termination condition. Fast pointer will never hit null; instead you must detect when it returns to the start node. Also, you need to first determine the length of the cycle.
    """
    if not head:
        return head

    # Core algorithm for: Circular Linked List Middle
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
    # Example: Circular: 1->2->3->4->5->back to 1. Start at 1, n=5, middle is node 3 (floor(5/2)=2 steps from start).
    head = to_linked_list([1, 2, 3, 4, 5])
    result = circular_linked_list_middle(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = circular_linked_list_middle(head)
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

// CircularLinkedListMiddle solves: Circular Linked List Middle
// Find the middle node of a circular singly linked list. You are given a pointer to one node in the cycle. Return the node that is floor(n/2) steps from the given node.
// Approach: The slow/fast pointer technique needs a different termination condition. Fast pointer will never hit null; instead you must detect when it returns to the start node. Also, you need to first determine the length of the cycle.
func CircularLinkedListMiddle(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Circular Linked List Middle
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
    // Example: Circular: 1->2->3->4->5->back to 1. Start at 1, n=5, middle is node 3 (floor(5/2)=2 steps from start).
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := CircularLinkedListMiddle(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = CircularLinkedListMiddle(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '02-middle-node/twist-01-circular-linked-list-middle', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/02-middle-node/twist-01-circular-linked-list-middle'] = problem;
})();
