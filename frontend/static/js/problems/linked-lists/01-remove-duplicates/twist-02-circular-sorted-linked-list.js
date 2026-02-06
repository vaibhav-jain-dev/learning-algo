/**
 * Circular Sorted Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 01-remove-duplicates
 */
(function() {
    'use strict';
    const problem = {
        name: 'Circular Sorted Linked List',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'The sorted linked list is circular (tail points back to head). Remove duplicates while keeping the list circular. The list is sorted, but the "start" could be at any point in the cycle.',
        problem: 'There is no null terminator to signal the end of traversal. You need a way to detect when you have completed one full cycle without breaking the circular structure.',
        hints: [
            'The sorted linked list is circular (tail points back to head)',
            'There is no null terminator to signal the end of traversal',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: ...->1->1->3->4->4->... (circular) => Output: ...->1->3->4->... (circular, 3 nodes).'
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

def circular_sorted_linked_list(head, *args):
    """
    Circular Sorted Linked List
    The sorted linked list is circular (tail points back to head). Remove duplicates while keeping the list circular. The list is sorted, but the "start" could be at any point in the cycle.

    Approach: There is no null terminator to signal the end of traversal. You need a way to detect when you have completed one full cycle without breaking the circular structure.
    """
    if not head:
        return head

    # Core algorithm for: Circular Sorted Linked List
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
    # Example: Input: ...->1->1->3->4->4->... (circular) => Output: ...->1->3->4->... (circular, 3 nodes).
    head = to_linked_list([1, 2, 3, 4, 5])
    result = circular_sorted_linked_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = circular_sorted_linked_list(head)
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

// CircularSortedLinkedList solves: Circular Sorted Linked List
// The sorted linked list is circular (tail points back to head). Remove duplicates while keeping the list circular. The list is sorted, but the "start" could be at any point in the cycle.
// Approach: There is no null terminator to signal the end of traversal. You need a way to detect when you have completed one full cycle without breaking the circular structure.
func CircularSortedLinkedList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Circular Sorted Linked List
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
    // Example: Input: ...->1->1->3->4->4->... (circular) => Output: ...->1->3->4->... (circular, 3 nodes).
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := CircularSortedLinkedList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = CircularSortedLinkedList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/twist-02-circular-sorted-linked-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/twist-02-circular-sorted-linked-list'] = problem;
})();
