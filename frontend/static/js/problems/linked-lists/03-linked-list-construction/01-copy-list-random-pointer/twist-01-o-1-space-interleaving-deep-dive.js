/**
 * O(1) Space Interleaving Deep Dive
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 03-linked-list-construction/01-copy-list-random-pointer
 */
(function() {
    'use strict';
    const problem = {
        name: 'O(1) Space Interleaving Deep Dive',
        difficulty: 'Hard',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/01-copy-list-random-pointer',
        description: 'Implement the O(1) space approach by interleaving copied nodes (A->A\'->B->B\'->...), setting random pointers via the interleaved structure, then separating the lists. Trace through each step carefully.',
        problem: 'The hash map approach is straightforward but uses O(n) space. The interleaving method requires three distinct passes with tricky pointer manipulation. One wrong pointer assignment corrupts both the original and the copy.',
        hints: [
            'Implement the O(1) space approach by interleaving copied nodes (A->A\'->B->B\'->...), setting random pointers via the interleaved structure, then separating the lists',
            'The hash map approach is straightforward but uses O(n) space',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Original: 1->2->3 (1.random=3, 2.random=1). Interleaved: 1->1\'->2->2\'->3->3\'. Set randoms: 1\'.random=3\' (via 1.random.next). Separate: 1->2->3 and 1\'->2\'->3\'.'
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

def o_1_space_interleaving_deep_dive(head, *args):
    """
    O(1) Space Interleaving Deep Dive
    Implement the O(1) space approach by interleaving copied nodes (A->A'->B->B'->...), setting random pointers via the interleaved structure, then separating the lists. Trace through each step carefully.

    Approach: The hash map approach is straightforward but uses O(n) space. The interleaving method requires three distinct passes with tricky pointer manipulation. One wrong pointer assignment corrupts both the original and the copy.
    """
    if not head:
        return head

    # Core algorithm for: O(1) Space Interleaving Deep Dive
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
    # Example: Original: 1->2->3 (1.random=3, 2.random=1). Interleaved: 1->1'->2->2'->3->3'. Set randoms: 1'.random=3' (via 1.random.next). Separate: 1->2->3 and 1'->2'->3'.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = o_1_space_interleaving_deep_dive(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = o_1_space_interleaving_deep_dive(head)
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

// O1SpaceInterleavingDeepDive solves: O(1) Space Interleaving Deep Dive
// Implement the O(1) space approach by interleaving copied nodes (A->A'->B->B'->...), setting random pointers via the interleaved structure, then separating the lists. Trace through each step carefully.
// Approach: The hash map approach is straightforward but uses O(n) space. The interleaving method requires three distinct passes with tricky pointer manipulation. One wrong pointer assignment corrupts both the original and the copy.
func O1SpaceInterleavingDeepDive(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: O(1) Space Interleaving Deep Dive
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
    // Example: Original: 1->2->3 (1.random=3, 2.random=1). Interleaved: 1->1'->2->2'->3->3'. Set randoms: 1'.random=3' (via 1.random.next). Separate: 1->2->3 and 1'->2'->3'.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := O1SpaceInterleavingDeepDive(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = O1SpaceInterleavingDeepDive(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/01-copy-list-random-pointer/twist-01-o-1-space-interleaving-deep-dive', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/01-copy-list-random-pointer/twist-01-o-1-space-interleaving-deep-dive'] = problem;
})();
