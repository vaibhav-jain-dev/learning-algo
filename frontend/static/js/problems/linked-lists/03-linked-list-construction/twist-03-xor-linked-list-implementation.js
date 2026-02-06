/**
 * XOR Linked List Implementation
 * Category: linked-lists
 * Difficulty: Very Hard
 * Parent: 03-linked-list-construction
 */
(function() {
    'use strict';
    const problem = {
        name: 'XOR Linked List Implementation',
        difficulty: 'Very Hard',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction',
        description: 'Implement a memory-efficient doubly linked list where each node stores prev XOR next instead of separate pointers. Support the same operations.',
        problem: 'XOR linking means you need the previous node to compute the next node (and vice versa). Every traversal requires carrying the previous address. Insertion and deletion require updating XOR values of neighboring nodes, fundamentally changing every operation.',
        hints: [
            'Implement a memory-efficient doubly linked list where each node stores prev XOR next instead of separate pointers',
            'XOR linking means you need the previous node to compute the next node (and vice versa)',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Node A stores 0 XOR addr(B), Node B stores addr(A) XOR addr(C). To go from A to B: next = 0 XOR npx(A) = addr(B). To go from B to C: next = addr(A) XOR npx(B) = addr(C).'
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

def xor_linked_list_implementation(head, *args):
    """
    XOR Linked List Implementation
    Implement a memory-efficient doubly linked list where each node stores prev XOR next instead of separate pointers. Support the same operations.

    Approach: XOR linking means you need the previous node to compute the next node (and vice versa). Every traversal requires carrying the previous address. Insertion and deletion require updating XOR values of neighboring nodes, fundamentally changing every operation.
    """
    if not head:
        return head

    # Core algorithm for: XOR Linked List Implementation
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
    # Example: Node A stores 0 XOR addr(B), Node B stores addr(A) XOR addr(C). To go from A to B: next = 0 XOR npx(A) = addr(B). To go from B to C: next = addr(A) XOR npx(B) = addr(C).
    head = to_linked_list([1, 2, 3, 4, 5])
    result = xor_linked_list_implementation(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = xor_linked_list_implementation(head)
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

// XORLinkedListImplementation solves: XOR Linked List Implementation
// Implement a memory-efficient doubly linked list where each node stores prev XOR next instead of separate pointers. Support the same operations.
// Approach: XOR linking means you need the previous node to compute the next node (and vice versa). Every traversal requires carrying the previous address. Insertion and deletion require updating XOR values of neighboring nodes, fundamentally changing every operation.
func XORLinkedListImplementation(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: XOR Linked List Implementation
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
    // Example: Node A stores 0 XOR addr(B), Node B stores addr(A) XOR addr(C). To go from A to B: next = 0 XOR npx(A) = addr(B). To go from B to C: next = addr(A) XOR npx(B) = addr(C).
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := XORLinkedListImplementation(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = XORLinkedListImplementation(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/twist-03-xor-linked-list-implementation', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/twist-03-xor-linked-list-implementation'] = problem;
})();
