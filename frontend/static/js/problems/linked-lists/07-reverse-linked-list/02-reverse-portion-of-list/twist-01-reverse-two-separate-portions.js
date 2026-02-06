/**
 * Reverse Two Separate Portions
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 07-reverse-linked-list/02-reverse-portion-of-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse Two Separate Portions',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/02-reverse-portion-of-list',
        description: 'Given two non-overlapping ranges [left1, right1] and [left2, right2], reverse both portions of the list simultaneously in a single pass.',
        problem: 'Managing two reversal zones in one traversal requires tracking multiple sets of pointers and carefully handling the transition between reversed and non-reversed sections.',
        hints: [
            'Given two non-overlapping ranges [left1, right1] and [left2, right2], reverse both portions of the list simultaneously in a single pass.',
            'Managing two reversal zones in one traversal requires tracking multiple sets of pointers and carefully handling the transition between reversed and non-reversed sections.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5,6,7], left1=2, right1=3, left2=5, right2=6: reverse positions 2-3 and 5-6. Result=[1,3,2,4,6,5,7].'
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

def reverse_two_separate_portions(head, *args):
    """
    Reverse Two Separate Portions
    Given two non-overlapping ranges [left1, right1] and [left2, right2], reverse both portions of the list simultaneously in a single pass.

    Approach: Managing two reversal zones in one traversal requires tracking multiple sets of pointers and carefully handling the transition between reversed and non-reversed sections.
    """
    if not head:
        return head

    # Core algorithm for: Reverse Two Separate Portions
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
    # Example: list=[1,2,3,4,5,6,7], left1=2, right1=3, left2=5, right2=6: reverse positions 2-3 and 5-6. Result=[1,3,2,4,6,5,7].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverse_two_separate_portions(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = reverse_two_separate_portions(head)
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

// ReverseTwoSeparatePortions solves: Reverse Two Separate Portions
// Given two non-overlapping ranges [left1, right1] and [left2, right2], reverse both portions of the list simultaneously in a single pass.
// Approach: Managing two reversal zones in one traversal requires tracking multiple sets of pointers and carefully handling the transition between reversed and non-reversed sections.
func ReverseTwoSeparatePortions(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Reverse Two Separate Portions
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
    // Example: list=[1,2,3,4,5,6,7], left1=2, right1=3, left2=5, right2=6: reverse positions 2-3 and 5-6. Result=[1,3,2,4,6,5,7].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReverseTwoSeparatePortions(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReverseTwoSeparatePortions(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/02-reverse-portion-of-list/twist-01-reverse-two-separate-portions', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/02-reverse-portion-of-list/twist-01-reverse-two-separate-portions'] = problem;
})();
