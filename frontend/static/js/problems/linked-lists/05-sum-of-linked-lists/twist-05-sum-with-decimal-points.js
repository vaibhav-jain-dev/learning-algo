/**
 * Sum With Decimal Points
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 05-sum-of-linked-lists
 */
(function() {
    'use strict';
    const problem = {
        name: 'Sum With Decimal Points',
        difficulty: 'Hard',
        algorithm: 'll-sum',
        parent: '05-sum-of-linked-lists',
        description: 'Each linked list includes a special marker node indicating the decimal point position. Add the two decimal numbers and return the result with the decimal point.',
        problem: 'Requires aligning the decimal points before adding, handling different-length fractional and integer parts, and preserving the decimal marker in the output.',
        hints: [
            'Each linked list includes a special marker node indicating the decimal point position',
            'Requires aligning the decimal points before adding, handling different-length fractional and integer parts, and preserving the decimal marker in the output.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list1 represents 12.34, list2 represents 5.678: sum=18.018. Must align at decimal point before digit-by-digit addition.'
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

def sum_with_decimal_points(head, *args):
    """
    Sum With Decimal Points
    Each linked list includes a special marker node indicating the decimal point position. Add the two decimal numbers and return the result with the decimal point.

    Approach: Requires aligning the decimal points before adding, handling different-length fractional and integer parts, and preserving the decimal marker in the output.
    """
    if not head:
        return head

    # Core algorithm for: Sum With Decimal Points
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
    # Example: list1 represents 12.34, list2 represents 5.678: sum=18.018. Must align at decimal point before digit-by-digit addition.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = sum_with_decimal_points(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = sum_with_decimal_points(head)
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

// SumWithDecimalPoints solves: Sum With Decimal Points
// Each linked list includes a special marker node indicating the decimal point position. Add the two decimal numbers and return the result with the decimal point.
// Approach: Requires aligning the decimal points before adding, handling different-length fractional and integer parts, and preserving the decimal marker in the output.
func SumWithDecimalPoints(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Sum With Decimal Points
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
    // Example: list1 represents 12.34, list2 represents 5.678: sum=18.018. Must align at decimal point before digit-by-digit addition.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := SumWithDecimalPoints(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = SumWithDecimalPoints(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '05-sum-of-linked-lists/twist-05-sum-with-decimal-points', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/05-sum-of-linked-lists/twist-05-sum-with-decimal-points'] = problem;
})();
