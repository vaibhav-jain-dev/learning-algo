/**
 * Find Loop in Doubly Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 06-find-loop
 */
(function() {
    'use strict';
    const problem = {
        name: 'Find Loop in Doubly Linked List',
        difficulty: 'Medium',
        algorithm: 'll-find-loop',
        parent: '06-find-loop',
        description: 'The list is doubly linked (each node has both next and prev). Detect if there is a cycle in the next pointers and find its origin.',
        problem: 'The prev pointers can create inconsistencies: if node A.next = B but B.prev != A, there may be structural corruption. Floyd\'s algorithm still works on next pointers, but prev adds diagnostic possibilities.',
        hints: [
            'The list is doubly linked (each node has both next and prev)',
            'The prev pointers can create inconsistencies: if node A.next = B but B.prev != A, there may be structural corruption',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Doubly linked list where last node\'s next points back to an earlier node: Floyd\'s works the same on next pointers, but you can also verify prev consistency.'
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

def find_loop_in_doubly_linked_list(head, *args):
    """
    Find Loop in Doubly Linked List
    The list is doubly linked (each node has both next and prev). Detect if there is a cycle in the next pointers and find its origin.

    Approach: The prev pointers can create inconsistencies: if node A.next = B but B.prev != A, there may be structural corruption. Floyd's algorithm still works on next pointers, but prev adds diagnostic possibilities.
    """
    if not head:
        return head

    # Core algorithm for: Find Loop in Doubly Linked List
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
    # Example: Doubly linked list where last node's next points back to an earlier node: Floyd's works the same on next pointers, but you can also verify prev consistency.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = find_loop_in_doubly_linked_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = find_loop_in_doubly_linked_list(head)
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

// FindLoopInDoublyLinkedList solves: Find Loop in Doubly Linked List
// The list is doubly linked (each node has both next and prev). Detect if there is a cycle in the next pointers and find its origin.
// Approach: The prev pointers can create inconsistencies: if node A.next = B but B.prev != A, there may be structural corruption. Floyd's algorithm still works on next pointers, but prev adds diagnostic possibilities.
func FindLoopInDoublyLinkedList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Find Loop in Doubly Linked List
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
    // Example: Doubly linked list where last node's next points back to an earlier node: Floyd's works the same on next pointers, but you can also verify prev consistency.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := FindLoopInDoublyLinkedList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = FindLoopInDoublyLinkedList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '06-find-loop/twist-05-find-loop-in-doubly-linked-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/06-find-loop/twist-05-find-loop-in-doubly-linked-list'] = problem;
})();
