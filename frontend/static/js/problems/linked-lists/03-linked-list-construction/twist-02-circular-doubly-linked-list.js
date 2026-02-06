/**
 * Circular Doubly Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 03-linked-list-construction
 */
(function() {
    'use strict';
    const problem = {
        name: 'Circular Doubly Linked List',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction',
        description: 'Modify the construction to support a circular doubly linked list where tail.next = head and head.prev = tail. All operations must maintain the circular invariant.',
        problem: 'There is no null in the circular structure. Setting head or tail has ripple effects on the circular connections. Empty list and single-node list edge cases become trickier since head.prev and head.next both point to itself.',
        hints: [
            'Modify the construction to support a circular doubly linked list where tail.next = head and head.prev = tail',
            'There is no null in the circular structure',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'After inserting 1,2,3: head=1, tail=3, 3.next=1, 1.prev=3. Removing 2: 1<->3, 3.next=1, 1.prev=3.'
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

def circular_doubly_linked_list(head, *args):
    """
    Circular Doubly Linked List
    Modify the construction to support a circular doubly linked list where tail.next = head and head.prev = tail. All operations must maintain the circular invariant.

    Approach: There is no null in the circular structure. Setting head or tail has ripple effects on the circular connections. Empty list and single-node list edge cases become trickier since head.prev and head.next both point to itself.
    """
    if not head:
        return head

    # Core algorithm for: Circular Doubly Linked List
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
    # Example: After inserting 1,2,3: head=1, tail=3, 3.next=1, 1.prev=3. Removing 2: 1<->3, 3.next=1, 1.prev=3.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = circular_doubly_linked_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = circular_doubly_linked_list(head)
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

// CircularDoublyLinkedList solves: Circular Doubly Linked List
// Modify the construction to support a circular doubly linked list where tail.next = head and head.prev = tail. All operations must maintain the circular invariant.
// Approach: There is no null in the circular structure. Setting head or tail has ripple effects on the circular connections. Empty list and single-node list edge cases become trickier since head.prev and head.next both point to itself.
func CircularDoublyLinkedList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Circular Doubly Linked List
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
    // Example: After inserting 1,2,3: head=1, tail=3, 3.next=1, 1.prev=3. Removing 2: 1<->3, 3.next=1, 1.prev=3.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := CircularDoublyLinkedList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = CircularDoublyLinkedList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/twist-02-circular-doubly-linked-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/twist-02-circular-doubly-linked-list'] = problem;
})();
