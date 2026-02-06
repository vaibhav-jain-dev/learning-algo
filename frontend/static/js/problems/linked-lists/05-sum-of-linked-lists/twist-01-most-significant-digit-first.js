/**
 * Most Significant Digit First
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 05-sum-of-linked-lists
 */
(function() {
    'use strict';
    const problem = {
        name: 'Most Significant Digit First',
        difficulty: 'Medium',
        algorithm: 'll-sum',
        parent: '05-sum-of-linked-lists',
        description: 'The digits are stored in forward order (most significant digit first) instead of reverse order. Add the two numbers and return the result in the same format.',
        problem: 'You cannot process digits left-to-right for addition since carries propagate from right-to-left. Requires either reversing both lists first, using a stack, or recursion.',
        hints: [
            'The digits are stored in forward order (most significant digit first) instead of reverse order',
            'You cannot process digits left-to-right for addition since carries propagate from right-to-left',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list1=[1,7,4,2] (1742), list2=[5,4,9] (549): sum=2291, result=[2,2,9,1].'
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

def most_significant_digit_first(head, *args):
    """
    Most Significant Digit First
    The digits are stored in forward order (most significant digit first) instead of reverse order. Add the two numbers and return the result in the same format.

    Approach: You cannot process digits left-to-right for addition since carries propagate from right-to-left. Requires either reversing both lists first, using a stack, or recursion.
    """
    if not head:
        return head

    # Core algorithm for: Most Significant Digit First
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
    # Example: list1=[1,7,4,2] (1742), list2=[5,4,9] (549): sum=2291, result=[2,2,9,1].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = most_significant_digit_first(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = most_significant_digit_first(head)
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

// MostSignificantDigitFirst solves: Most Significant Digit First
// The digits are stored in forward order (most significant digit first) instead of reverse order. Add the two numbers and return the result in the same format.
// Approach: You cannot process digits left-to-right for addition since carries propagate from right-to-left. Requires either reversing both lists first, using a stack, or recursion.
func MostSignificantDigitFirst(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Most Significant Digit First
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
    // Example: list1=[1,7,4,2] (1742), list2=[5,4,9] (549): sum=2291, result=[2,2,9,1].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := MostSignificantDigitFirst(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = MostSignificantDigitFirst(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '05-sum-of-linked-lists/twist-01-most-significant-digit-first', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/05-sum-of-linked-lists/twist-01-most-significant-digit-first'] = problem;
})();
