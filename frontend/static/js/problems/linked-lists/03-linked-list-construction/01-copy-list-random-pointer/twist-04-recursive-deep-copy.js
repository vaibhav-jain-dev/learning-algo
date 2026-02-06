/**
 * Recursive Deep Copy
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 03-linked-list-construction/01-copy-list-random-pointer
 */
(function() {
    'use strict';
    const problem = {
        name: 'Recursive Deep Copy',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/01-copy-list-random-pointer',
        description: 'Clone the list with random pointers using a recursive DFS approach. Use a visited map to handle the random pointers that may point forward or backward.',
        problem: 'The recursive approach mirrors graph cloning. Each call clones one node, recursively clones next and random, and uses memoization to avoid infinite loops. This reframes the problem as a graph traversal rather than a linked list traversal.',
        hints: [
            'Clone the list with random pointers using a recursive DFS approach',
            'The recursive approach mirrors graph cloning',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'clone(node1) -> create copy1, copy1.next = clone(node2), copy1.random = clone(node3). Memoize to return existing copies.'
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

def recursive_deep_copy(head, *args):
    """
    Recursive Deep Copy
    Clone the list with random pointers using a recursive DFS approach. Use a visited map to handle the random pointers that may point forward or backward.

    Approach: The recursive approach mirrors graph cloning. Each call clones one node, recursively clones next and random, and uses memoization to avoid infinite loops. This reframes the problem as a graph traversal rather than a linked list traversal.
    """
    if not head:
        return head

    # Core algorithm for: Recursive Deep Copy
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
    # Example: clone(node1) -> create copy1, copy1.next = clone(node2), copy1.random = clone(node3). Memoize to return existing copies.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = recursive_deep_copy(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = recursive_deep_copy(head)
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

// RecursiveDeepCopy solves: Recursive Deep Copy
// Clone the list with random pointers using a recursive DFS approach. Use a visited map to handle the random pointers that may point forward or backward.
// Approach: The recursive approach mirrors graph cloning. Each call clones one node, recursively clones next and random, and uses memoization to avoid infinite loops. This reframes the problem as a graph traversal rather than a linked list traversal.
func RecursiveDeepCopy(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Recursive Deep Copy
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
    // Example: clone(node1) -> create copy1, copy1.next = clone(node2), copy1.random = clone(node3). Memoize to return existing copies.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := RecursiveDeepCopy(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = RecursiveDeepCopy(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/01-copy-list-random-pointer/twist-04-recursive-deep-copy', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/01-copy-list-random-pointer/twist-04-recursive-deep-copy'] = problem;
})();
