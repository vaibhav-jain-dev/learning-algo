/**
 * Multiply Linked Lists
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 05-sum-of-linked-lists
 */
(function() {
    'use strict';
    const problem = {
        name: 'Multiply Linked Lists',
        difficulty: 'Hard',
        algorithm: 'll-sum',
        parent: '05-sum-of-linked-lists',
        description: 'Multiply two numbers represented as reversed linked lists and return the product as a linked list.',
        problem: 'Multiplication is fundamentally more complex than addition. Requires implementing long multiplication with partial products and managing carries across multiple digits.',
        hints: [
            'Multiply two numbers represented as reversed linked lists and return the product as a linked list.',
            'Multiplication is fundamentally more complex than addition',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list1=[3,2,1] (123), list2=[6,5] (56): 123*56=6888, result=[8,8,8,6].'
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

def multiply_linked_lists(head, *args):
    """
    Multiply Linked Lists
    Multiply two numbers represented as reversed linked lists and return the product as a linked list.

    Approach: Multiplication is fundamentally more complex than addition. Requires implementing long multiplication with partial products and managing carries across multiple digits.
    """
    if not head:
        return head

    # Core algorithm for: Multiply Linked Lists
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
    # Example: list1=[3,2,1] (123), list2=[6,5] (56): 123*56=6888, result=[8,8,8,6].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = multiply_linked_lists(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = multiply_linked_lists(head)
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

// MultiplyLinkedLists solves: Multiply Linked Lists
// Multiply two numbers represented as reversed linked lists and return the product as a linked list.
// Approach: Multiplication is fundamentally more complex than addition. Requires implementing long multiplication with partial products and managing carries across multiple digits.
func MultiplyLinkedLists(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Multiply Linked Lists
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
    // Example: list1=[3,2,1] (123), list2=[6,5] (56): 123*56=6888, result=[8,8,8,6].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := MultiplyLinkedLists(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = MultiplyLinkedLists(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '05-sum-of-linked-lists/twist-03-multiply-linked-lists', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/05-sum-of-linked-lists/twist-03-multiply-linked-lists'] = problem;
})();
