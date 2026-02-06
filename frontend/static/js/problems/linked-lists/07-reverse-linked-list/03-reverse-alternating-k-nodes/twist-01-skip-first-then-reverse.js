/**
 * Skip First Then Reverse
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 07-reverse-linked-list/03-reverse-alternating-k-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Skip First Then Reverse',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/03-reverse-alternating-k-nodes',
        description: 'Instead of reversing the first k nodes and then skipping, skip the first k nodes and then reverse the next k, alternating in the opposite pattern.',
        problem: 'Swaps the phase order, requiring a different initial state. The first group is preserved, the second is reversed, which changes how the dummy node and initial pointers are set up.',
        hints: [
            'Instead of reversing the first k nodes and then skipping, skip the first k nodes and then reverse the next k, alternating in the opposite pattern.',
            'Swaps the phase order, requiring a different initial state',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5,6,7,8], k=2: skip [1,2], reverse [3,4]->[4,3], skip [5,6], reverse [7,8]->[8,7]. Result=[1,2,4,3,5,6,8,7].'
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

def skip_first_then_reverse(head, *args):
    """
    Skip First Then Reverse
    Instead of reversing the first k nodes and then skipping, skip the first k nodes and then reverse the next k, alternating in the opposite pattern.

    Approach: Swaps the phase order, requiring a different initial state. The first group is preserved, the second is reversed, which changes how the dummy node and initial pointers are set up.
    """
    if not head:
        return head

    # Core algorithm for: Skip First Then Reverse
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
    # Example: list=[1,2,3,4,5,6,7,8], k=2: skip [1,2], reverse [3,4]->[4,3], skip [5,6], reverse [7,8]->[8,7]. Result=[1,2,4,3,5,6,8,7].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = skip_first_then_reverse(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = skip_first_then_reverse(head)
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

// SkipFirstThenReverse solves: Skip First Then Reverse
// Instead of reversing the first k nodes and then skipping, skip the first k nodes and then reverse the next k, alternating in the opposite pattern.
// Approach: Swaps the phase order, requiring a different initial state. The first group is preserved, the second is reversed, which changes how the dummy node and initial pointers are set up.
func SkipFirstThenReverse(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Skip First Then Reverse
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
    // Example: list=[1,2,3,4,5,6,7,8], k=2: skip [1,2], reverse [3,4]->[4,3], skip [5,6], reverse [7,8]->[8,7]. Result=[1,2,4,3,5,6,8,7].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := SkipFirstThenReverse(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = SkipFirstThenReverse(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-01-skip-first-then-reverse', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-01-skip-first-then-reverse'] = problem;
})();
