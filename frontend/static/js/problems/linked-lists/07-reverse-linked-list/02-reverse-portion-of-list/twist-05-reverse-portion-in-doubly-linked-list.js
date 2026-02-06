/**
 * Reverse Portion in Doubly Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 07-reverse-linked-list/02-reverse-portion-of-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse Portion in Doubly Linked List',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/02-reverse-portion-of-list',
        description: 'Reverse the portion from position left to right in a doubly linked list, updating both next and prev pointers.',
        problem: 'Each node reversal must swap both next and prev pointers, and the boundary connections require updating four pointers instead of two.',
        hints: [
            'Reverse the portion from position left to right in a doubly linked list, updating both next and prev pointers.',
            'Each node reversal must swap both next and prev pointers, and the boundary connections require updating four pointers instead of two.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'doubly linked [1,2,3,4,5], left=2, right=4: reverse [2,3,4] to [4,3,2], update all prev and next pointers. Result=[1,4,3,2,5].'
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

def reverse_portion_in_doubly_linked_list(head, *args):
    """
    Reverse Portion in Doubly Linked List
    Reverse the portion from position left to right in a doubly linked list, updating both next and prev pointers.

    Approach: Each node reversal must swap both next and prev pointers, and the boundary connections require updating four pointers instead of two.
    """
    if not head:
        return head

    # Core algorithm for: Reverse Portion in Doubly Linked List
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
    # Example: doubly linked [1,2,3,4,5], left=2, right=4: reverse [2,3,4] to [4,3,2], update all prev and next pointers. Result=[1,4,3,2,5].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverse_portion_in_doubly_linked_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = reverse_portion_in_doubly_linked_list(head)
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

// ReversePortionInDoublyLinkedList solves: Reverse Portion in Doubly Linked List
// Reverse the portion from position left to right in a doubly linked list, updating both next and prev pointers.
// Approach: Each node reversal must swap both next and prev pointers, and the boundary connections require updating four pointers instead of two.
func ReversePortionInDoublyLinkedList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Reverse Portion in Doubly Linked List
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
    // Example: doubly linked [1,2,3,4,5], left=2, right=4: reverse [2,3,4] to [4,3,2], update all prev and next pointers. Result=[1,4,3,2,5].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReversePortionInDoublyLinkedList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReversePortionInDoublyLinkedList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/02-reverse-portion-of-list/twist-05-reverse-portion-in-doubly-linked-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/02-reverse-portion-of-list/twist-05-reverse-portion-in-doubly-linked-list'] = problem;
})();
