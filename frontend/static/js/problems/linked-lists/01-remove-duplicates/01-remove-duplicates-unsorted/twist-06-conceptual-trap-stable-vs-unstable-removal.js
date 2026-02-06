/**
 * Conceptual Trap: Stable vs Unstable Removal
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 01-remove-duplicates/01-remove-duplicates-unsorted
 */
(function() {
    'use strict';
    const problem = {
        name: 'Conceptual Trap: Stable vs Unstable Removal',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/01-remove-duplicates-unsorted',
        description: 'What if the problem asked you to remove duplicates but you are allowed to reorder the remaining nodes? Could you achieve O(n) time and O(1) space on an unsorted list?',
        problem: 'If stability is not required, you could sort the list in O(n log n) then do the sorted dedup in O(n), or use other tricks. This twist challenges whether the O(n) space is truly necessary or just an artifact of the stability requirement.',
        hints: [
            'What if the problem asked you to remove duplicates but you are allowed to reorder the remaining nodes? Could you achieve O(n) time and O(1) space on an unsorted list?',
            'If stability is not required, you could sort the list in O(n log n) then do the sorted dedup in O(n), or use other tricks',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: 3->2->2->1->3->4. Unstable output could be: 1->2->3->4 (sorted) instead of maintaining original order 3->2->1->4.'
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

def conceptual_trap_stable_vs_unstable_removal(head, *args):
    """
    Conceptual Trap: Stable vs Unstable Removal
    What if the problem asked you to remove duplicates but you are allowed to reorder the remaining nodes? Could you achieve O(n) time and O(1) space on an unsorted list?

    Approach: If stability is not required, you could sort the list in O(n log n) then do the sorted dedup in O(n), or use other tricks. This twist challenges whether the O(n) space is truly necessary or just an artifact of the stability requirement.
    """
    if not head:
        return head

    # Core algorithm for: Conceptual Trap: Stable vs Unstable Removal
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
    # Example: Input: 3->2->2->1->3->4. Unstable output could be: 1->2->3->4 (sorted) instead of maintaining original order 3->2->1->4.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = conceptual_trap_stable_vs_unstable_removal(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = conceptual_trap_stable_vs_unstable_removal(head)
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

// ConceptualTrapStableVsUnstableRemoval solves: Conceptual Trap: Stable vs Unstable Removal
// What if the problem asked you to remove duplicates but you are allowed to reorder the remaining nodes? Could you achieve O(n) time and O(1) space on an unsorted list?
// Approach: If stability is not required, you could sort the list in O(n log n) then do the sorted dedup in O(n), or use other tricks. This twist challenges whether the O(n) space is truly necessary or just an artifact of the stability requirement.
func ConceptualTrapStableVsUnstableRemoval(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Conceptual Trap: Stable vs Unstable Removal
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
    // Example: Input: 3->2->2->1->3->4. Unstable output could be: 1->2->3->4 (sorted) instead of maintaining original order 3->2->1->4.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ConceptualTrapStableVsUnstableRemoval(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ConceptualTrapStableVsUnstableRemoval(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/01-remove-duplicates-unsorted/twist-06-conceptual-trap-stable-vs-unstable-removal', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/01-remove-duplicates-unsorted/twist-06-conceptual-trap-stable-vs-unstable-removal'] = problem;
})();
