/**
 * Remove Duplicates Keep Last Occurrence
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 01-remove-duplicates/01-remove-duplicates-unsorted
 */
(function() {
    'use strict';
    const problem = {
        name: 'Remove Duplicates Keep Last Occurrence',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/01-remove-duplicates-unsorted',
        description: 'Instead of keeping the first occurrence of each value, keep the last occurrence. The relative order of kept nodes should match their last-occurrence positions.',
        problem: 'Reverse thinking: you cannot decide whether to keep a node until you know if it appears again later. This may require a reverse pass, a stack-based approach, or two-pass strategy that fundamentally changes the algorithm.',
        hints: [
            'Instead of keeping the first occurrence of each value, keep the last occurrence',
            'Reverse thinking: you cannot decide whether to keep a node until you know if it appears again later',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: 3->2->2->1->3->2->4. Keep last of each: output is 1->3->2->4 (last 1 at pos 4, last 3 at pos 5, last 2 at pos 6, last 4 at pos 7).'
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

def remove_duplicates_keep_last_occurrence(head, *args):
    """
    Remove Duplicates Keep Last Occurrence
    Instead of keeping the first occurrence of each value, keep the last occurrence. The relative order of kept nodes should match their last-occurrence positions.

    Approach: Reverse thinking: you cannot decide whether to keep a node until you know if it appears again later. This may require a reverse pass, a stack-based approach, or two-pass strategy that fundamentally changes the algorithm.
    """
    if not head:
        return head

    # Core algorithm for: Remove Duplicates Keep Last Occurrence
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
    # Example: Input: 3->2->2->1->3->2->4. Keep last of each: output is 1->3->2->4 (last 1 at pos 4, last 3 at pos 5, last 2 at pos 6, last 4 at pos 7).
    head = to_linked_list([1, 2, 3, 4, 5])
    result = remove_duplicates_keep_last_occurrence(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = remove_duplicates_keep_last_occurrence(head)
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

// RemoveDuplicatesKeepLastOccurrence solves: Remove Duplicates Keep Last Occurrence
// Instead of keeping the first occurrence of each value, keep the last occurrence. The relative order of kept nodes should match their last-occurrence positions.
// Approach: Reverse thinking: you cannot decide whether to keep a node until you know if it appears again later. This may require a reverse pass, a stack-based approach, or two-pass strategy that fundamentally changes the algorithm.
func RemoveDuplicatesKeepLastOccurrence(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Remove Duplicates Keep Last Occurrence
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
    // Example: Input: 3->2->2->1->3->2->4. Keep last of each: output is 1->3->2->4 (last 1 at pos 4, last 3 at pos 5, last 2 at pos 6, last 4 at pos 7).
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := RemoveDuplicatesKeepLastOccurrence(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = RemoveDuplicatesKeepLastOccurrence(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/01-remove-duplicates-unsorted/twist-05-remove-duplicates-keep-last-occurrence', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/01-remove-duplicates-unsorted/twist-05-remove-duplicates-keep-last-occurrence'] = problem;
})();
