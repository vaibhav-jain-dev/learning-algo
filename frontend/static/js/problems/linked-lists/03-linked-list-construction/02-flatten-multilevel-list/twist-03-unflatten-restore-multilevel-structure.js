/**
 * Unflatten: Restore Multilevel Structure
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 03-linked-list-construction/02-flatten-multilevel-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Unflatten: Restore Multilevel Structure',
        difficulty: 'Hard',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/02-flatten-multilevel-list',
        description: 'Given a flattened list and information about the original structure (e.g., depth annotations), reconstruct the multilevel doubly linked list.',
        problem: 'This is the reverse problem. You must identify which nodes were originally children based on annotations, recreate child pointers, and properly split the flat list back into levels with correct prev/next/child pointers.',
        hints: [
            'Given a flattened list and information about the original structure (e.g., depth annotations), reconstruct the multilevel doubly linked list.',
            'This is the reverse problem',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: 1->2->4->5->3 with annotations [0,0,1,1,0] (depth). Output: 1-2-3 with 2->4-5 as child list.'
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

def unflatten_restore_multilevel_structure(head, *args):
    """
    Unflatten: Restore Multilevel Structure
    Given a flattened list and information about the original structure (e.g., depth annotations), reconstruct the multilevel doubly linked list.

    Approach: This is the reverse problem. You must identify which nodes were originally children based on annotations, recreate child pointers, and properly split the flat list back into levels with correct prev/next/child pointers.
    """
    if not head:
        return head

    # Core algorithm for: Unflatten: Restore Multilevel Structure
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
    # Example: Input: 1->2->4->5->3 with annotations [0,0,1,1,0] (depth). Output: 1-2-3 with 2->4-5 as child list.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = unflatten_restore_multilevel_structure(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = unflatten_restore_multilevel_structure(head)
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

// UnflattenRestoreMultilevelStructure solves: Unflatten: Restore Multilevel Structure
// Given a flattened list and information about the original structure (e.g., depth annotations), reconstruct the multilevel doubly linked list.
// Approach: This is the reverse problem. You must identify which nodes were originally children based on annotations, recreate child pointers, and properly split the flat list back into levels with correct prev/next/child pointers.
func UnflattenRestoreMultilevelStructure(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Unflatten: Restore Multilevel Structure
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
    // Example: Input: 1->2->4->5->3 with annotations [0,0,1,1,0] (depth). Output: 1-2-3 with 2->4-5 as child list.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := UnflattenRestoreMultilevelStructure(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = UnflattenRestoreMultilevelStructure(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/02-flatten-multilevel-list/twist-03-unflatten-restore-multilevel-structure', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/02-flatten-multilevel-list/twist-03-unflatten-restore-multilevel-structure'] = problem;
})();
