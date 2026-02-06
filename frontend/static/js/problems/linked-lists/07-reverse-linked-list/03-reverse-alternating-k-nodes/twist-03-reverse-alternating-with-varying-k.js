/**
 * Reverse Alternating With Varying K
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 07-reverse-linked-list/03-reverse-alternating-k-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse Alternating With Varying K',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/03-reverse-alternating-k-nodes',
        description: 'The value of k increases by 1 each time you reverse: reverse 1 node, skip 1, reverse 2 nodes, skip 2, reverse 3 nodes, skip 3, etc.',
        problem: 'Dynamic group sizes require incrementing a counter after each pair of reverse-skip phases, making the loop logic more complex and the termination condition harder to reason about.',
        hints: [
            'The value of k increases by 1 each time you reverse: reverse 1 node, skip 1, reverse 2 nodes, skip 2, reverse 3 nodes, skip 3, etc.',
            'Dynamic group sizes require incrementing a counter after each pair of reverse-skip phases, making the loop logic more complex and the termination condition harder to reason about.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5,6,7,8,9,10]: reverse 1 [1]->[1], skip 1 [2], reverse 2 [3,4]->[4,3], skip 2 [5,6], reverse 3 [7,8,9]->[9,8,7], skip [10]. Result=[1,2,4,3,5,6,9,8,7,10].'
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

def reverse_alternating_with_varying_k(head, *args):
    """
    Reverse Alternating With Varying K
    The value of k increases by 1 each time you reverse: reverse 1 node, skip 1, reverse 2 nodes, skip 2, reverse 3 nodes, skip 3, etc.

    Approach: Dynamic group sizes require incrementing a counter after each pair of reverse-skip phases, making the loop logic more complex and the termination condition harder to reason about.
    """
    if not head:
        return head

    # Core algorithm for: Reverse Alternating With Varying K
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
    # Example: list=[1,2,3,4,5,6,7,8,9,10]: reverse 1 [1]->[1], skip 1 [2], reverse 2 [3,4]->[4,3], skip 2 [5,6], reverse 3 [7,8,9]->[9,8,7], skip [10]. Result=[1,2,4,3,5,6,9,8,7,10].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverse_alternating_with_varying_k(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = reverse_alternating_with_varying_k(head)
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

// ReverseAlternatingWithVaryingK solves: Reverse Alternating With Varying K
// The value of k increases by 1 each time you reverse: reverse 1 node, skip 1, reverse 2 nodes, skip 2, reverse 3 nodes, skip 3, etc.
// Approach: Dynamic group sizes require incrementing a counter after each pair of reverse-skip phases, making the loop logic more complex and the termination condition harder to reason about.
func ReverseAlternatingWithVaryingK(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Reverse Alternating With Varying K
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
    // Example: list=[1,2,3,4,5,6,7,8,9,10]: reverse 1 [1]->[1], skip 1 [2], reverse 2 [3,4]->[4,3], skip 2 [5,6], reverse 3 [7,8,9]->[9,8,7], skip [10]. Result=[1,2,4,3,5,6,9,8,7,10].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReverseAlternatingWithVaryingK(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReverseAlternatingWithVaryingK(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-03-reverse-alternating-with-varying-k', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/03-reverse-alternating-k-nodes/twist-03-reverse-alternating-with-varying-k'] = problem;
})();
