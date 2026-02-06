/**
 * Circular Multilevel List
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 03-linked-list-construction/02-flatten-multilevel-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Circular Multilevel List',
        difficulty: 'Hard',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/02-flatten-multilevel-list',
        description: 'Each level of the multilevel list is circular. Flatten into a single-level circular doubly linked list.',
        problem: 'At each level, the tail points back to the head of that level. You must break the circular link before flattening, then re-establish a single circular link for the final flattened result. Detecting the end of each level requires tracking the start node.',
        hints: [
            'Each level of the multilevel list is circular',
            'At each level, the tail points back to the head of that level',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Level 0: 1<->2<->3<->back to 1 with 2.child pointing to level 1: 4<->5<->back to 4. Output: 1<->2<->4<->5<->3<->back to 1.'
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

def circular_multilevel_list(head, *args):
    """
    Circular Multilevel List
    Each level of the multilevel list is circular. Flatten into a single-level circular doubly linked list.

    Approach: At each level, the tail points back to the head of that level. You must break the circular link before flattening, then re-establish a single circular link for the final flattened result. Detecting the end of each level requires tracking the start node.
    """
    if not head:
        return head

    # Core algorithm for: Circular Multilevel List
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
    # Example: Level 0: 1<->2<->3<->back to 1 with 2.child pointing to level 1: 4<->5<->back to 4. Output: 1<->2<->4<->5<->3<->back to 1.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = circular_multilevel_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = circular_multilevel_list(head)
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

// CircularMultilevelList solves: Circular Multilevel List
// Each level of the multilevel list is circular. Flatten into a single-level circular doubly linked list.
// Approach: At each level, the tail points back to the head of that level. You must break the circular link before flattening, then re-establish a single circular link for the final flattened result. Detecting the end of each level requires tracking the start node.
func CircularMultilevelList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Circular Multilevel List
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
    // Example: Level 0: 1<->2<->3<->back to 1 with 2.child pointing to level 1: 4<->5<->back to 4. Output: 1<->2<->4<->5<->3<->back to 1.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := CircularMultilevelList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = CircularMultilevelList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/02-flatten-multilevel-list/twist-05-circular-multilevel-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/02-flatten-multilevel-list/twist-05-circular-multilevel-list'] = problem;
})();
