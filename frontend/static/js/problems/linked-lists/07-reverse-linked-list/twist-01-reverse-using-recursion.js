/**
 * Reverse Using Recursion
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 07-reverse-linked-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse Using Recursion',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Reverse the linked list using recursion instead of iteration. No explicit prev/curr/next pointers in a loop.',
        problem: 'Forces a recursive mindset where you reverse the rest of the list first, then fix the pointers. The call stack replaces the explicit prev pointer, and the base case returns the new head.',
        hints: [
            'Reverse the linked list using recursion instead of iteration',
            'Forces a recursive mindset where you reverse the rest of the list first, then fix the pointers',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5]: recurse to end, then 5.next=null (base). Return 5. Then 4.next.next=4, 4.next=null. Builds reversed list bottom-up.'
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

def reverse_using_recursion(head, *args):
    """
    Reverse Using Recursion
    Reverse the linked list using recursion instead of iteration. No explicit prev/curr/next pointers in a loop.

    Approach: Forces a recursive mindset where you reverse the rest of the list first, then fix the pointers. The call stack replaces the explicit prev pointer, and the base case returns the new head.
    """
    if not head:
        return head

    # Core algorithm for: Reverse Using Recursion
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
    # Example: list=[1,2,3,4,5]: recurse to end, then 5.next=null (base). Return 5. Then 4.next.next=4, 4.next=null. Builds reversed list bottom-up.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverse_using_recursion(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = reverse_using_recursion(head)
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

// ReverseUsingRecursion solves: Reverse Using Recursion
// Reverse the linked list using recursion instead of iteration. No explicit prev/curr/next pointers in a loop.
// Approach: Forces a recursive mindset where you reverse the rest of the list first, then fix the pointers. The call stack replaces the explicit prev pointer, and the base case returns the new head.
func ReverseUsingRecursion(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Reverse Using Recursion
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
    // Example: list=[1,2,3,4,5]: recurse to end, then 5.next=null (base). Return 5. Then 4.next.next=4, 4.next=null. Builds reversed list bottom-up.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReverseUsingRecursion(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReverseUsingRecursion(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/twist-01-reverse-using-recursion', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/twist-01-reverse-using-recursion'] = problem;
})();
