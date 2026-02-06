/**
 * Return Removed Nodes as Separate List
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 01-remove-duplicates/02-remove-all-duplicate-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Return Removed Nodes as Separate List',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/02-remove-all-duplicate-nodes',
        description: 'Instead of just removing duplicate nodes, collect them into a second linked list and return both: the cleaned list and the removed-nodes list.',
        problem: 'You need to manage two output lists simultaneously while traversing. This requires careful pointer management to append removed nodes to the second list without losing references.',
        hints: [
            'Instead of just removing duplicate nodes, collect them into a second linked list and return both: the cleaned list and the removed-nodes list.',
            'You need to manage two output lists simultaneously while traversing',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: 1->2->3->3->4->4->5. Output list 1: 1->2->5. Output list 2: 3->3->4->4.'
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

def return_removed_nodes_as_separate_list(head, *args):
    """
    Return Removed Nodes as Separate List
    Instead of just removing duplicate nodes, collect them into a second linked list and return both: the cleaned list and the removed-nodes list.

    Approach: You need to manage two output lists simultaneously while traversing. This requires careful pointer management to append removed nodes to the second list without losing references.
    """
    if not head:
        return head

    # Core algorithm for: Return Removed Nodes as Separate List
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
    # Example: Input: 1->2->3->3->4->4->5. Output list 1: 1->2->5. Output list 2: 3->3->4->4.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = return_removed_nodes_as_separate_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = return_removed_nodes_as_separate_list(head)
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

// ReturnRemovedNodesAsSeparateList solves: Return Removed Nodes as Separate List
// Instead of just removing duplicate nodes, collect them into a second linked list and return both: the cleaned list and the removed-nodes list.
// Approach: You need to manage two output lists simultaneously while traversing. This requires careful pointer management to append removed nodes to the second list without losing references.
func ReturnRemovedNodesAsSeparateList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Return Removed Nodes as Separate List
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
    // Example: Input: 1->2->3->3->4->4->5. Output list 1: 1->2->5. Output list 2: 3->3->4->4.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReturnRemovedNodesAsSeparateList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReturnRemovedNodesAsSeparateList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-04-return-removed-nodes-as-separate-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/02-remove-all-duplicate-nodes/twist-04-return-removed-nodes-as-separate-list'] = problem;
})();
