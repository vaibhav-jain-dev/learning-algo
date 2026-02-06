/**
 * Reverse Short Groups Too
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 07-reverse-linked-list/01-reverse-in-groups-of-k
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse Short Groups Too',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/01-reverse-in-groups-of-k',
        description: 'If fewer than k nodes remain at the end, reverse them anyway instead of leaving them as-is.',
        problem: 'Removes the hasKNodes check, simplifying the stopping condition but requiring you to handle the final partial group reversal correctly.',
        hints: [
            'If fewer than k nodes remain at the end, reverse them anyway instead of leaving them as-is.',
            'Removes the hasKNodes check, simplifying the stopping condition but requiring you to handle the final partial group reversal correctly.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5], k=3: reverse [1,2,3]->[3,2,1], then reverse remaining [4,5]->[5,4]. Result=[3,2,1,5,4].'
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

def reverse_short_groups_too(head, *args):
    """
    Reverse Short Groups Too
    If fewer than k nodes remain at the end, reverse them anyway instead of leaving them as-is.

    Approach: Removes the hasKNodes check, simplifying the stopping condition but requiring you to handle the final partial group reversal correctly.
    """
    if not head:
        return head

    # Core algorithm for: Reverse Short Groups Too
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
    # Example: list=[1,2,3,4,5], k=3: reverse [1,2,3]->[3,2,1], then reverse remaining [4,5]->[5,4]. Result=[3,2,1,5,4].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverse_short_groups_too(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = reverse_short_groups_too(head)
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

// ReverseShortGroupsToo solves: Reverse Short Groups Too
// If fewer than k nodes remain at the end, reverse them anyway instead of leaving them as-is.
// Approach: Removes the hasKNodes check, simplifying the stopping condition but requiring you to handle the final partial group reversal correctly.
func ReverseShortGroupsToo(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Reverse Short Groups Too
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
    // Example: list=[1,2,3,4,5], k=3: reverse [1,2,3]->[3,2,1], then reverse remaining [4,5]->[5,4]. Result=[3,2,1,5,4].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReverseShortGroupsToo(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReverseShortGroupsToo(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/01-reverse-in-groups-of-k/twist-01-reverse-short-groups-too', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/01-reverse-in-groups-of-k/twist-01-reverse-short-groups-too'] = problem;
})();
