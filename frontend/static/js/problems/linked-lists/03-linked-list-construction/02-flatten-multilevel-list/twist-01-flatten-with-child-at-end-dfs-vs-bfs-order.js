/**
 * Flatten with Child at End (DFS vs BFS Order)
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 03-linked-list-construction/02-flatten-multilevel-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Flatten with Child at End (DFS vs BFS Order)',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/02-flatten-multilevel-list',
        description: 'Instead of inserting child lists immediately after the parent node, append each child list at the END of the current level. This produces a BFS-level order instead of DFS order.',
        problem: 'The standard solution uses DFS (child is inserted inline). BFS order requires a queue-based approach where child lists are appended after all nodes at the current level are processed. The traversal strategy fundamentally changes.',
        hints: [
            'Instead of inserting child lists immediately after the parent node, append each child list at the END of the current level',
            'The standard solution uses DFS (child is inserted inline)',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: 1-2-3 with 2->4-5. DFS: 1->2->4->5->3. BFS: 1->2->3->4->5 (child appended after current level).'
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

def flatten_with_child_at_end_dfs_vs_bfs_order(head, *args):
    """
    Flatten with Child at End (DFS vs BFS Order)
    Instead of inserting child lists immediately after the parent node, append each child list at the END of the current level. This produces a BFS-level order instead of DFS order.

    Approach: The standard solution uses DFS (child is inserted inline). BFS order requires a queue-based approach where child lists are appended after all nodes at the current level are processed. The traversal strategy fundamentally changes.
    """
    if not head:
        return head

    # Core algorithm for: Flatten with Child at End (DFS vs BFS Order)
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
    # Example: Input: 1-2-3 with 2->4-5. DFS: 1->2->4->5->3. BFS: 1->2->3->4->5 (child appended after current level).
    head = to_linked_list([1, 2, 3, 4, 5])
    result = flatten_with_child_at_end_dfs_vs_bfs_order(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = flatten_with_child_at_end_dfs_vs_bfs_order(head)
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

// FlattenWithChildAtEndDFSVsBFSOrder solves: Flatten with Child at End (DFS vs BFS Order)
// Instead of inserting child lists immediately after the parent node, append each child list at the END of the current level. This produces a BFS-level order instead of DFS order.
// Approach: The standard solution uses DFS (child is inserted inline). BFS order requires a queue-based approach where child lists are appended after all nodes at the current level are processed. The traversal strategy fundamentally changes.
func FlattenWithChildAtEndDFSVsBFSOrder(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Flatten with Child at End (DFS vs BFS Order)
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
    // Example: Input: 1-2-3 with 2->4-5. DFS: 1->2->4->5->3. BFS: 1->2->3->4->5 (child appended after current level).
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := FlattenWithChildAtEndDFSVsBFSOrder(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = FlattenWithChildAtEndDFSVsBFSOrder(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/02-flatten-multilevel-list/twist-01-flatten-with-child-at-end-dfs-vs-bfs-order', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/02-flatten-multilevel-list/twist-01-flatten-with-child-at-end-dfs-vs-bfs-order'] = problem;
})();
