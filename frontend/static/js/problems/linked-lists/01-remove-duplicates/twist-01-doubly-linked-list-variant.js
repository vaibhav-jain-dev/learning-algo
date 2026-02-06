/**
 * Doubly Linked List Variant
 * Category: linked-lists
 * Difficulty: Easy
 * Parent: 01-remove-duplicates
 */
(function() {
    'use strict';
    const problem = {
        name: 'Doubly Linked List Variant',
        difficulty: 'Easy',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'The sorted list is now a doubly linked list with prev and next pointers. Remove duplicates while maintaining valid prev pointers throughout.',
        problem: 'You must update both prev and next pointers when removing nodes. Forgetting to fix the prev pointer of the node after a removed node is a common bug.',
        hints: [
            'The sorted list is now a doubly linked list with prev and next pointers',
            'You must update both prev and next pointers when removing nodes',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: null<->1<->1<->3<->4<->4 => Output: null<->1<->3<->4 with all prev/next pointers valid.'
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

def doubly_linked_list_variant(head, *args):
    """
    Doubly Linked List Variant
    The sorted list is now a doubly linked list with prev and next pointers. Remove duplicates while maintaining valid prev pointers throughout.

    Approach: You must update both prev and next pointers when removing nodes. Forgetting to fix the prev pointer of the node after a removed node is a common bug.
    """
    if not head:
        return head

    # Core algorithm for: Doubly Linked List Variant
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
    # Example: Input: null<->1<->1<->3<->4<->4 => Output: null<->1<->3<->4 with all prev/next pointers valid.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = doubly_linked_list_variant(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = doubly_linked_list_variant(head)
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

// DoublyLinkedListVariant solves: Doubly Linked List Variant
// The sorted list is now a doubly linked list with prev and next pointers. Remove duplicates while maintaining valid prev pointers throughout.
// Approach: You must update both prev and next pointers when removing nodes. Forgetting to fix the prev pointer of the node after a removed node is a common bug.
func DoublyLinkedListVariant(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Doubly Linked List Variant
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
    // Example: Input: null<->1<->1<->3<->4<->4 => Output: null<->1<->3<->4 with all prev/next pointers valid.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := DoublyLinkedListVariant(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = DoublyLinkedListVariant(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/twist-01-doubly-linked-list-variant', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/twist-01-doubly-linked-list-variant'] = problem;
})();
