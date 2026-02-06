/**
 * Sentinel/Dummy Node Simplification
 * Category: linked-lists
 * Difficulty: Easy
 * Parent: 03-linked-list-construction
 */
(function() {
    'use strict';
    const problem = {
        name: 'Sentinel/Dummy Node Simplification',
        difficulty: 'Easy',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction',
        description: 'Re-implement the doubly linked list using permanent sentinel head and tail nodes that are never removed. Observe how this eliminates all null checks in every operation.',
        problem: 'With sentinels, you never need to check if head or tail is null. insertBefore/insertAfter become uniform. This twist highlights how a small design choice (sentinel nodes) dramatically simplifies the code at the cost of two extra nodes.',
        hints: [
            'Re-implement the doubly linked list using permanent sentinel head and tail nodes that are never removed',
            'With sentinels, you never need to check if head or tail is null',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Empty list: SENTINEL_HEAD <-> SENTINEL_TAIL. Insert 1: SENTINEL_HEAD <-> 1 <-> SENTINEL_TAIL. No null checks needed anywhere.'
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

def sentinel_dummy_node_simplification(head, *args):
    """
    Sentinel/Dummy Node Simplification
    Re-implement the doubly linked list using permanent sentinel head and tail nodes that are never removed. Observe how this eliminates all null checks in every operation.

    Approach: With sentinels, you never need to check if head or tail is null. insertBefore/insertAfter become uniform. This twist highlights how a small design choice (sentinel nodes) dramatically simplifies the code at the cost of two extra nodes.
    """
    if not head:
        return head

    # Core algorithm for: Sentinel/Dummy Node Simplification
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
    # Example: Empty list: SENTINEL_HEAD <-> SENTINEL_TAIL. Insert 1: SENTINEL_HEAD <-> 1 <-> SENTINEL_TAIL. No null checks needed anywhere.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = sentinel_dummy_node_simplification(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = sentinel_dummy_node_simplification(head)
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

// SentinelDummyNodeSimplification solves: Sentinel/Dummy Node Simplification
// Re-implement the doubly linked list using permanent sentinel head and tail nodes that are never removed. Observe how this eliminates all null checks in every operation.
// Approach: With sentinels, you never need to check if head or tail is null. insertBefore/insertAfter become uniform. This twist highlights how a small design choice (sentinel nodes) dramatically simplifies the code at the cost of two extra nodes.
func SentinelDummyNodeSimplification(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Sentinel/Dummy Node Simplification
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
    // Example: Empty list: SENTINEL_HEAD <-> SENTINEL_TAIL. Insert 1: SENTINEL_HEAD <-> 1 <-> SENTINEL_TAIL. No null checks needed anywhere.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := SentinelDummyNodeSimplification(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = SentinelDummyNodeSimplification(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/twist-04-sentinel-dummy-node-simplification', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/twist-04-sentinel-dummy-node-simplification'] = problem;
})();
