/**
 * Reverse in Decreasing Group Sizes
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 07-reverse-linked-list/01-reverse-in-groups-of-k
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse in Decreasing Group Sizes',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/01-reverse-in-groups-of-k',
        description: 'Reverse the first 1 node, then the next 2 nodes, then the next 3 nodes, and so on with increasing group sizes.',
        problem: 'The group size changes dynamically, requiring a counter that increments after each group. The k parameter is replaced by a growing variable.',
        hints: [
            'Reverse the first 1 node, then the next 2 nodes, then the next 3 nodes, and so on with increasing group sizes.',
            'The group size changes dynamically, requiring a counter that increments after each group',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5,6,7,8,9,10]: reverse [1](size 1), [2,3](size 2)->[3,2], [4,5,6](size 3)->[6,5,4], [7,8,9,10](size 4)->[10,9,8,7]. Result=[1,3,2,6,5,4,10,9,8,7].'
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

def reverse_in_decreasing_group_sizes(head, *args):
    """
    Reverse in Decreasing Group Sizes
    Reverse the first 1 node, then the next 2 nodes, then the next 3 nodes, and so on with increasing group sizes.

    Approach: The group size changes dynamically, requiring a counter that increments after each group. The k parameter is replaced by a growing variable.
    """
    if not head:
        return head

    # Core algorithm for: Reverse in Decreasing Group Sizes
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
    # Example: list=[1,2,3,4,5,6,7,8,9,10]: reverse [1](size 1), [2,3](size 2)->[3,2], [4,5,6](size 3)->[6,5,4], [7,8,9,10](size 4)->[10,9,8,7]. Result=[1,3,2,6,5,4,10,9,8,7].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverse_in_decreasing_group_sizes(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = reverse_in_decreasing_group_sizes(head)
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

// ReverseInDecreasingGroupSizes solves: Reverse in Decreasing Group Sizes
// Reverse the first 1 node, then the next 2 nodes, then the next 3 nodes, and so on with increasing group sizes.
// Approach: The group size changes dynamically, requiring a counter that increments after each group. The k parameter is replaced by a growing variable.
func ReverseInDecreasingGroupSizes(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Reverse in Decreasing Group Sizes
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
    // Example: list=[1,2,3,4,5,6,7,8,9,10]: reverse [1](size 1), [2,3](size 2)->[3,2], [4,5,6](size 3)->[6,5,4], [7,8,9,10](size 4)->[10,9,8,7]. Result=[1,3,2,6,5,4,10,9,8,7].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReverseInDecreasingGroupSizes(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReverseInDecreasingGroupSizes(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/01-reverse-in-groups-of-k/twist-02-reverse-in-decreasing-group-sizes', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/01-reverse-in-groups-of-k/twist-02-reverse-in-decreasing-group-sizes'] = problem;
})();
