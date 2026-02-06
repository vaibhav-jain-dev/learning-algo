/**
 * Reverse Doubly Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 07-reverse-linked-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse Doubly Linked List',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Reverse a doubly linked list in place, updating both next and prev pointers for every node.',
        problem: 'Each node has two pointers to swap (next and prev), and you must update both correctly. The head becomes the tail and vice versa.',
        hints: [
            'Reverse a doubly linked list in place, updating both next and prev pointers for every node.',
            'Each node has two pointers to swap (next and prev), and you must update both correctly',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list: null<-1<->2<->3<->4->null becomes null<-4<->3<->2<->1->null.'
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

def reverse_doubly_linked_list(head, *args):
    """
    Reverse Doubly Linked List
    Reverse a doubly linked list in place, updating both next and prev pointers for every node.

    Approach: Each node has two pointers to swap (next and prev), and you must update both correctly. The head becomes the tail and vice versa.
    """
    if not head:
        return head

    # Core algorithm for: Reverse Doubly Linked List
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
    # Example: list: null<-1<->2<->3<->4->null becomes null<-4<->3<->2<->1->null.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverse_doubly_linked_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = reverse_doubly_linked_list(head)
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

// ReverseDoublyLinkedList solves: Reverse Doubly Linked List
// Reverse a doubly linked list in place, updating both next and prev pointers for every node.
// Approach: Each node has two pointers to swap (next and prev), and you must update both correctly. The head becomes the tail and vice versa.
func ReverseDoublyLinkedList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Reverse Doubly Linked List
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
    // Example: list: null<-1<->2<->3<->4->null becomes null<-4<->3<->2<->1->null.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReverseDoublyLinkedList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReverseDoublyLinkedList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/twist-04-reverse-doubly-linked-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/twist-04-reverse-doubly-linked-list'] = problem;
})();
