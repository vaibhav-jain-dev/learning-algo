/**
 * Singly Linked List Construction
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 03-linked-list-construction
 */
(function() {
    'use strict';
    const problem = {
        name: 'Singly Linked List Construction',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction',
        description: 'Implement the same operations (setHead, setTail, insertBefore, insertAfter, insertAtPosition, removeNodesWithValue, remove, containsNodeWithValue) but for a SINGLY linked list with only next pointers.',
        problem: 'Without prev pointers, operations like insertBefore and remove become O(n) instead of O(1) because you must find the predecessor by traversing from the head. The entire design trade-off changes.',
        hints: [
            'Implement the same operations (setHead, setTail, insertBefore, insertAfter, insertAtPosition, removeNodesWithValue, remove, containsNodeWithValue) but for a SINGLY linked list with only next pointers.',
            'Without prev pointers, operations like insertBefore and remove become O(n) instead of O(1) because you must find the predecessor by traversing from the head',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'remove(node3) in singly linked 1->2->3->4: must traverse from head to find node2, then set node2.next = node4. Cannot directly access predecessor.'
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

def singly_linked_list_construction(head, *args):
    """
    Singly Linked List Construction
    Implement the same operations (setHead, setTail, insertBefore, insertAfter, insertAtPosition, removeNodesWithValue, remove, containsNodeWithValue) but for a SINGLY linked list with only next pointers.

    Approach: Without prev pointers, operations like insertBefore and remove become O(n) instead of O(1) because you must find the predecessor by traversing from the head. The entire design trade-off changes.
    """
    if not head:
        return head

    # Core algorithm for: Singly Linked List Construction
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
    # Example: remove(node3) in singly linked 1->2->3->4: must traverse from head to find node2, then set node2.next = node4. Cannot directly access predecessor.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = singly_linked_list_construction(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = singly_linked_list_construction(head)
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

// SinglyLinkedListConstruction solves: Singly Linked List Construction
// Implement the same operations (setHead, setTail, insertBefore, insertAfter, insertAtPosition, removeNodesWithValue, remove, containsNodeWithValue) but for a SINGLY linked list with only next pointers.
// Approach: Without prev pointers, operations like insertBefore and remove become O(n) instead of O(1) because you must find the predecessor by traversing from the head. The entire design trade-off changes.
func SinglyLinkedListConstruction(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Singly Linked List Construction
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
    // Example: remove(node3) in singly linked 1->2->3->4: must traverse from head to find node2, then set node2.next = node4. Cannot directly access predecessor.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := SinglyLinkedListConstruction(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = SinglyLinkedListConstruction(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/twist-01-singly-linked-list-construction', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/twist-01-singly-linked-list-construction'] = problem;
})();
