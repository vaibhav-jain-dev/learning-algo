/**
 * O(1) Space Without Sorting
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 01-remove-duplicates/01-remove-duplicates-unsorted
 */
(function() {
    'use strict';
    const problem = {
        name: 'O(1) Space Without Sorting',
        difficulty: 'Hard',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/01-remove-duplicates-unsorted',
        description: 'Remove duplicates from the unsorted list using O(1) extra space. You cannot use a hash set and you cannot sort the list first.',
        problem: 'Without a hash set, you must use a brute-force nested loop approach: for each node, scan ahead to remove all future occurrences. This changes the time complexity to O(n^2) and forces a fundamentally different two-pointer strategy.',
        hints: [
            'Remove duplicates from the unsorted list using O(1) extra space',
            'Without a hash set, you must use a brute-force nested loop approach: for each node, scan ahead to remove all future occurrences',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: 3->2->2->1->3->2->4. For node 3: scan and remove node at position 5. For node 2: scan and remove nodes at positions 3 and 6. Output: 3->2->1->4.'
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

def o_1_space_without_sorting(head, *args):
    """
    O(1) Space Without Sorting
    Remove duplicates from the unsorted list using O(1) extra space. You cannot use a hash set and you cannot sort the list first.

    Approach: Without a hash set, you must use a brute-force nested loop approach: for each node, scan ahead to remove all future occurrences. This changes the time complexity to O(n^2) and forces a fundamentally different two-pointer strategy.
    """
    if not head:
        return head

    # Core algorithm for: O(1) Space Without Sorting
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
    # Example: Input: 3->2->2->1->3->2->4. For node 3: scan and remove node at position 5. For node 2: scan and remove nodes at positions 3 and 6. Output: 3->2->1->4.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = o_1_space_without_sorting(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = o_1_space_without_sorting(head)
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

// O1SpaceWithoutSorting solves: O(1) Space Without Sorting
// Remove duplicates from the unsorted list using O(1) extra space. You cannot use a hash set and you cannot sort the list first.
// Approach: Without a hash set, you must use a brute-force nested loop approach: for each node, scan ahead to remove all future occurrences. This changes the time complexity to O(n^2) and forces a fundamentally different two-pointer strategy.
func O1SpaceWithoutSorting(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: O(1) Space Without Sorting
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
    // Example: Input: 3->2->2->1->3->2->4. For node 3: scan and remove node at position 5. For node 2: scan and remove nodes at positions 3 and 6. Output: 3->2->1->4.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := O1SpaceWithoutSorting(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = O1SpaceWithoutSorting(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/01-remove-duplicates-unsorted/twist-01-o-1-space-without-sorting', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/01-remove-duplicates-unsorted/twist-01-o-1-space-without-sorting'] = problem;
})();
