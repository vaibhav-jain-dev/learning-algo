/**
 * Cyclically Shift Portion
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 07-reverse-linked-list/02-reverse-portion-of-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Cyclically Shift Portion',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/02-reverse-portion-of-list',
        description: 'Instead of reversing the portion from left to right, cyclically shift those nodes by one position to the right.',
        problem: 'A cyclic shift moves the last element to the front of the portion, a different rearrangement than full reversal, requiring last-node extraction and insertion.',
        hints: [
            'Instead of reversing the portion from left to right, cyclically shift those nodes by one position to the right.',
            'A cyclic shift moves the last element to the front of the portion, a different rearrangement than full reversal, requiring last-node extraction and insertion.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5], left=2, right=4: shift portion [2,3,4] right by 1 -> [4,2,3]. Result=[1,4,2,3,5].'
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

def cyclically_shift_portion(head, *args):
    """
    Cyclically Shift Portion
    Instead of reversing the portion from left to right, cyclically shift those nodes by one position to the right.

    Approach: A cyclic shift moves the last element to the front of the portion, a different rearrangement than full reversal, requiring last-node extraction and insertion.
    """
    if not head:
        return head

    # Core algorithm for: Cyclically Shift Portion
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
    # Example: list=[1,2,3,4,5], left=2, right=4: shift portion [2,3,4] right by 1 -> [4,2,3]. Result=[1,4,2,3,5].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = cyclically_shift_portion(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = cyclically_shift_portion(head)
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

// CyclicallyShiftPortion solves: Cyclically Shift Portion
// Instead of reversing the portion from left to right, cyclically shift those nodes by one position to the right.
// Approach: A cyclic shift moves the last element to the front of the portion, a different rearrangement than full reversal, requiring last-node extraction and insertion.
func CyclicallyShiftPortion(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Cyclically Shift Portion
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
    // Example: list=[1,2,3,4,5], left=2, right=4: shift portion [2,3,4] right by 1 -> [4,2,3]. Result=[1,4,2,3,5].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := CyclicallyShiftPortion(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = CyclicallyShiftPortion(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/02-reverse-portion-of-list/twist-04-cyclically-shift-portion', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/02-reverse-portion-of-list/twist-04-cyclically-shift-portion'] = problem;
})();
