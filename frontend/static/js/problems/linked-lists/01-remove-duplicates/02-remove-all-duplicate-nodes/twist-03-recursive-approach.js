/**
 * Recursive Approach
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 01-remove-duplicates/02-remove-all-duplicate-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Recursive Approach',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/02-remove-all-duplicate-nodes',
        description: 'Solve this problem using pure recursion: the function takes a head and returns the head of a list with all duplicate-valued nodes removed.',
        problem: 'Recursion naturally processes from the tail backward. You must handle the "skip all nodes with this value" logic within the recursive structure, deciding at each level whether the current value matches the next.',
        hints: [
            'Solve this problem using pure recursion: the function takes a head and returns the head of a list with all duplicate-valued nodes removed.',
            'Recursion naturally processes from the tail backward',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'removeAllDups(1->2->3->3->4->4->5) => 1 linked to removeAllDups(2->3->3->4->4->5) => eventually 1->2->5.'
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

def recursive_approach(head, *args):
    """
    Recursive Approach
    Solve this problem using pure recursion: the function takes a head and returns the head of a list with all duplicate-valued nodes removed.

    Approach: Recursion naturally processes from the tail backward. You must handle the "skip all nodes with this value" logic within the recursive structure, deciding at each level whether the current value matches the next.
    """
    if not head:
        return head

    # Core algorithm for: Recursive Approach
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
    # Example: removeAllDups(1->2->3->3->4->4->5) => 1 linked to removeAllDups(2->3->3->4->4->5) => eventually 1->2->5.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = recursive_approach(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = recursive_approach(head)
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

// RecursiveApproach solves: Recursive Approach
// Solve this problem using pure recursion: the function takes a head and returns the head of a list with all duplicate-valued nodes removed.
// Approach: Recursion naturally processes from the tail backward. You must handle the "skip all nodes with this value" logic within the recursive structure, deciding at each level whether the current value matches the next.
func RecursiveApproach(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Recursive Approach
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
    // Example: removeAllDups(1->2->3->3->4->4->5) => 1 linked to removeAllDups(2->3->3->4->4->5) => eventually 1->2->5.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := RecursiveApproach(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = RecursiveApproach(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-03-recursive-approach', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/02-remove-all-duplicate-nodes/twist-03-recursive-approach'] = problem;
})();
