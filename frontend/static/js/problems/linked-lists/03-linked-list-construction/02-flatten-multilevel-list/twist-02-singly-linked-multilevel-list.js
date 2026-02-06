/**
 * Singly Linked Multilevel List
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 03-linked-list-construction/02-flatten-multilevel-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Singly Linked Multilevel List',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/02-flatten-multilevel-list',
        description: 'The multilevel list is singly linked (no prev pointers, only next and child). Flatten it into a single-level singly linked list.',
        problem: 'Without prev pointers, you cannot set the prev link when connecting child lists. The result is simpler in some ways (fewer pointers to manage) but you must be more careful about not losing references since you cannot traverse backward.',
        hints: [
            'The multilevel list is singly linked (no prev pointers, only next and child)',
            'Without prev pointers, you cannot set the prev link when connecting child lists',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: 1->2->3 with 2.child->4->5. Output: 1->2->4->5->3 (singly linked, no prev).'
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

def singly_linked_multilevel_list(head, *args):
    """
    Singly Linked Multilevel List
    The multilevel list is singly linked (no prev pointers, only next and child). Flatten it into a single-level singly linked list.

    Approach: Without prev pointers, you cannot set the prev link when connecting child lists. The result is simpler in some ways (fewer pointers to manage) but you must be more careful about not losing references since you cannot traverse backward.
    """
    if not head:
        return head

    # Core algorithm for: Singly Linked Multilevel List
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
    # Example: Input: 1->2->3 with 2.child->4->5. Output: 1->2->4->5->3 (singly linked, no prev).
    head = to_linked_list([1, 2, 3, 4, 5])
    result = singly_linked_multilevel_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = singly_linked_multilevel_list(head)
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

// SinglyLinkedMultilevelList solves: Singly Linked Multilevel List
// The multilevel list is singly linked (no prev pointers, only next and child). Flatten it into a single-level singly linked list.
// Approach: Without prev pointers, you cannot set the prev link when connecting child lists. The result is simpler in some ways (fewer pointers to manage) but you must be more careful about not losing references since you cannot traverse backward.
func SinglyLinkedMultilevelList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Singly Linked Multilevel List
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
    // Example: Input: 1->2->3 with 2.child->4->5. Output: 1->2->4->5->3 (singly linked, no prev).
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := SinglyLinkedMultilevelList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = SinglyLinkedMultilevelList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/02-flatten-multilevel-list/twist-02-singly-linked-multilevel-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/02-flatten-multilevel-list/twist-02-singly-linked-multilevel-list'] = problem;
})();
