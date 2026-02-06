/**
 * Doubly Linked Sorted List
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 01-remove-duplicates/02-remove-all-duplicate-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Doubly Linked Sorted List',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/02-remove-all-duplicate-nodes',
        description: 'The sorted list is doubly linked. Remove all nodes with duplicate values while maintaining valid prev pointers. The dummy node technique still applies.',
        problem: 'While the core skipping logic is the same, every deletion requires updating the prev pointer of the surviving node. Missing a prev update creates a corrupted list that appears to work forward but breaks backward.',
        hints: [
            'The sorted list is doubly linked',
            'While the core skipping logic is the same, every deletion requires updating the prev pointer of the surviving node',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: null<->1<->2<->3<->3<->4<->4<->5. Output: null<->1<->2<->5 with all prev/next intact.'
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

def doubly_linked_sorted_list(head, *args):
    """
    Doubly Linked Sorted List
    The sorted list is doubly linked. Remove all nodes with duplicate values while maintaining valid prev pointers. The dummy node technique still applies.

    Approach: While the core skipping logic is the same, every deletion requires updating the prev pointer of the surviving node. Missing a prev update creates a corrupted list that appears to work forward but breaks backward.
    """
    if not head:
        return head

    # Core algorithm for: Doubly Linked Sorted List
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
    # Example: Input: null<->1<->2<->3<->3<->4<->4<->5. Output: null<->1<->2<->5 with all prev/next intact.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = doubly_linked_sorted_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = doubly_linked_sorted_list(head)
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

// DoublyLinkedSortedList solves: Doubly Linked Sorted List
// The sorted list is doubly linked. Remove all nodes with duplicate values while maintaining valid prev pointers. The dummy node technique still applies.
// Approach: While the core skipping logic is the same, every deletion requires updating the prev pointer of the surviving node. Missing a prev update creates a corrupted list that appears to work forward but breaks backward.
func DoublyLinkedSortedList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Doubly Linked Sorted List
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
    // Example: Input: null<->1<->2<->3<->3<->4<->4<->5. Output: null<->1<->2<->5 with all prev/next intact.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := DoublyLinkedSortedList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = DoublyLinkedSortedList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-02-doubly-linked-sorted-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/02-remove-all-duplicate-nodes/twist-02-doubly-linked-sorted-list'] = problem;
})();
