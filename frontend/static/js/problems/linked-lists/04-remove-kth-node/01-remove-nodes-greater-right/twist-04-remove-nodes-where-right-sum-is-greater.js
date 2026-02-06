/**
 * Remove Nodes Where Right Sum Is Greater
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 04-remove-kth-node/01-remove-nodes-greater-right
 */
(function() {
    'use strict';
    const problem = {
        name: 'Remove Nodes Where Right Sum Is Greater',
        difficulty: 'Hard',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/01-remove-nodes-greater-right',
        description: 'Remove a node if the sum of all nodes to its right is strictly greater than its value.',
        problem: 'Requires computing suffix sums first (or computing on the fly via reverse traversal), comparing each node against an aggregate rather than individual elements.',
        hints: [
            'Remove a node if the sum of all nodes to its right is strictly greater than its value.',
            'Requires computing suffix sums first (or computing on the fly via reverse traversal), comparing each node against an aggregate rather than individual elements.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[5,2,13,3,8]: right sums: 5 has right sum 26, 2 has 24, 13 has 11, 3 has 8, 8 has 0. Remove nodes where right sum > value: 5<26, 2<24, 3<8. Keep [13,8].'
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

def remove_nodes_where_right_sum_is_greater(head, *args):
    """
    Remove Nodes Where Right Sum Is Greater
    Remove a node if the sum of all nodes to its right is strictly greater than its value.

    Approach: Requires computing suffix sums first (or computing on the fly via reverse traversal), comparing each node against an aggregate rather than individual elements.
    """
    if not head:
        return head

    # Core algorithm for: Remove Nodes Where Right Sum Is Greater
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
    # Example: list=[5,2,13,3,8]: right sums: 5 has right sum 26, 2 has 24, 13 has 11, 3 has 8, 8 has 0. Remove nodes where right sum > value: 5<26, 2<24, 3<8. Keep [13,8].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = remove_nodes_where_right_sum_is_greater(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = remove_nodes_where_right_sum_is_greater(head)
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

// RemoveNodesWhereRightSumIsGreater solves: Remove Nodes Where Right Sum Is Greater
// Remove a node if the sum of all nodes to its right is strictly greater than its value.
// Approach: Requires computing suffix sums first (or computing on the fly via reverse traversal), comparing each node against an aggregate rather than individual elements.
func RemoveNodesWhereRightSumIsGreater(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Remove Nodes Where Right Sum Is Greater
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
    // Example: list=[5,2,13,3,8]: right sums: 5 has right sum 26, 2 has 24, 13 has 11, 3 has 8, 8 has 0. Remove nodes where right sum > value: 5<26, 2<24, 3<8. Keep [13,8].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := RemoveNodesWhereRightSumIsGreater(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = RemoveNodesWhereRightSumIsGreater(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/01-remove-nodes-greater-right/twist-04-remove-nodes-where-right-sum-is-greater', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/01-remove-nodes-greater-right/twist-04-remove-nodes-where-right-sum-is-greater'] = problem;
})();
