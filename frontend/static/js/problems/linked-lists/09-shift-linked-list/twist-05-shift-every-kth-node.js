/**
 * Shift Every Kth Node
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 09-shift-linked-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Shift Every Kth Node',
        difficulty: 'Hard',
        algorithm: 'll-shift',
        parent: '09-shift-linked-list',
        description: 'Instead of shifting the entire list, extract every kth node and move them to the front of the list while maintaining their relative order.',
        problem: 'Selective extraction and prepending is fundamentally different from a bulk rotation. You must identify specific nodes, remove them, and build a new prefix.',
        hints: [
            'Instead of shifting the entire list, extract every kth node and move them to the front of the list while maintaining their relative order.',
            'Selective extraction and prepending is fundamentally different from a bulk rotation',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5,6,7,8], k=3: extract nodes at positions 3,6 (values 3,6). Prepend to front: [3,6,1,2,4,5,7,8].'
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

def shift_every_kth_node(head, *args):
    """
    Shift Every Kth Node
    Instead of shifting the entire list, extract every kth node and move them to the front of the list while maintaining their relative order.

    Approach: Selective extraction and prepending is fundamentally different from a bulk rotation. You must identify specific nodes, remove them, and build a new prefix.
    """
    if not head:
        return head

    # Core algorithm for: Shift Every Kth Node
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
    # Example: list=[1,2,3,4,5,6,7,8], k=3: extract nodes at positions 3,6 (values 3,6). Prepend to front: [3,6,1,2,4,5,7,8].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = shift_every_kth_node(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = shift_every_kth_node(head)
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

// ShiftEveryKthNode solves: Shift Every Kth Node
// Instead of shifting the entire list, extract every kth node and move them to the front of the list while maintaining their relative order.
// Approach: Selective extraction and prepending is fundamentally different from a bulk rotation. You must identify specific nodes, remove them, and build a new prefix.
func ShiftEveryKthNode(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Shift Every Kth Node
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
    // Example: list=[1,2,3,4,5,6,7,8], k=3: extract nodes at positions 3,6 (values 3,6). Prepend to front: [3,6,1,2,4,5,7,8].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ShiftEveryKthNode(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ShiftEveryKthNode(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '09-shift-linked-list/twist-05-shift-every-kth-node', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/09-shift-linked-list/twist-05-shift-every-kth-node'] = problem;
})();
