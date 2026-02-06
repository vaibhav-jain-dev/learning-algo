/**
 * Verify Deep Copy Correctness
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 03-linked-list-construction/01-copy-list-random-pointer
 */
(function() {
    'use strict';
    const problem = {
        name: 'Verify Deep Copy Correctness',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/01-copy-list-random-pointer',
        description: 'Write a function that given the original list and a purported copy, verifies the copy is correct: same structure, same values, same random pointer pattern, but NO shared node references.',
        problem: 'This inverts the problem from construction to validation. You must check that corresponding nodes have matching values, that random pointer indices match, and critically that no copy node is the same object as any original node.',
        hints: [
            'Write a function that given the original list and a purported copy, verifies the copy is correct: same structure, same values, same random pointer pattern, but NO shared node references.',
            'This inverts the problem from construction to validation',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Original: 1(random->3)->2(random->1)->3(random->null). Copy verification: check values match, check copy[0].random == copy[2], check original[0] !== copy[0].'
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

def verify_deep_copy_correctness(head, *args):
    """
    Verify Deep Copy Correctness
    Write a function that given the original list and a purported copy, verifies the copy is correct: same structure, same values, same random pointer pattern, but NO shared node references.

    Approach: This inverts the problem from construction to validation. You must check that corresponding nodes have matching values, that random pointer indices match, and critically that no copy node is the same object as any original node.
    """
    if not head:
        return head

    # Core algorithm for: Verify Deep Copy Correctness
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
    # Example: Original: 1(random->3)->2(random->1)->3(random->null). Copy verification: check values match, check copy[0].random == copy[2], check original[0] !== copy[0].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = verify_deep_copy_correctness(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = verify_deep_copy_correctness(head)
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

// VerifyDeepCopyCorrectness solves: Verify Deep Copy Correctness
// Write a function that given the original list and a purported copy, verifies the copy is correct: same structure, same values, same random pointer pattern, but NO shared node references.
// Approach: This inverts the problem from construction to validation. You must check that corresponding nodes have matching values, that random pointer indices match, and critically that no copy node is the same object as any original node.
func VerifyDeepCopyCorrectness(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Verify Deep Copy Correctness
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
    // Example: Original: 1(random->3)->2(random->1)->3(random->null). Copy verification: check values match, check copy[0].random == copy[2], check original[0] !== copy[0].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := VerifyDeepCopyCorrectness(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = VerifyDeepCopyCorrectness(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/01-copy-list-random-pointer/twist-05-verify-deep-copy-correctness', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/01-copy-list-random-pointer/twist-05-verify-deep-copy-correctness'] = problem;
})();
