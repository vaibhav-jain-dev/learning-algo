/**
 * Circular Unsorted List
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 01-remove-duplicates/01-remove-duplicates-unsorted
 */
(function() {
    'use strict';
    const problem = {
        name: 'Circular Unsorted List',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/01-remove-duplicates-unsorted',
        description: 'The unsorted list is circular. Remove duplicates keeping first occurrence. The list must remain circular after deduplication.',
        problem: 'With no null terminator, you must track the starting node to know when you have completed a full cycle. Using a hash set still works, but the loop termination condition fundamentally changes.',
        hints: [
            'The unsorted list is circular',
            'With no null terminator, you must track the starting node to know when you have completed a full cycle',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: ...->3->2->2->1->3->... (circular, 5 nodes). Output: ...->3->2->1->... (circular, 3 nodes).'
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

def circular_unsorted_list(head, *args):
    """
    Circular Unsorted List
    The unsorted list is circular. Remove duplicates keeping first occurrence. The list must remain circular after deduplication.

    Approach: With no null terminator, you must track the starting node to know when you have completed a full cycle. Using a hash set still works, but the loop termination condition fundamentally changes.
    """
    if not head:
        return head

    # Core algorithm for: Circular Unsorted List
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
    # Example: Input: ...->3->2->2->1->3->... (circular, 5 nodes). Output: ...->3->2->1->... (circular, 3 nodes).
    head = to_linked_list([1, 2, 3, 4, 5])
    result = circular_unsorted_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = circular_unsorted_list(head)
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

// CircularUnsortedList solves: Circular Unsorted List
// The unsorted list is circular. Remove duplicates keeping first occurrence. The list must remain circular after deduplication.
// Approach: With no null terminator, you must track the starting node to know when you have completed a full cycle. Using a hash set still works, but the loop termination condition fundamentally changes.
func CircularUnsortedList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Circular Unsorted List
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
    // Example: Input: ...->3->2->2->1->3->... (circular, 5 nodes). Output: ...->3->2->1->... (circular, 3 nodes).
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := CircularUnsortedList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = CircularUnsortedList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/01-remove-duplicates-unsorted/twist-04-circular-unsorted-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/01-remove-duplicates-unsorted/twist-04-circular-unsorted-list'] = problem;
})();
