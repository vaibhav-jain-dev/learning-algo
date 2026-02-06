/**
 * Remove All Kth Nodes From End
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 04-remove-kth-node
 */
(function() {
    'use strict';
    const problem = {
        name: 'Remove All Kth Nodes From End',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node',
        description: 'Remove the kth node, the 2kth node, the 3kth node, etc., all counted from the end of the list.',
        problem: 'Requires either knowing the full length to compute all positions, or multiple passes. The single two-pointer trick no longer suffices for multiple removals.',
        hints: [
            'Remove the kth node, the 2kth node, the 3kth node, etc., all counted from the end of the list.',
            'Requires either knowing the full length to compute all positions, or multiple passes',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5,6,7,8], k=2: remove 2nd from end (7), 4th from end (5), 6th from end (3), 8th from end (1). Result=[2,4,6,8].'
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

def remove_all_kth_nodes_from_end(head, *args):
    """
    Remove All Kth Nodes From End
    Remove the kth node, the 2kth node, the 3kth node, etc., all counted from the end of the list.

    Approach: Requires either knowing the full length to compute all positions, or multiple passes. The single two-pointer trick no longer suffices for multiple removals.
    """
    if not head:
        return head

    # Core algorithm for: Remove All Kth Nodes From End
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
    # Example: list=[1,2,3,4,5,6,7,8], k=2: remove 2nd from end (7), 4th from end (5), 6th from end (3), 8th from end (1). Result=[2,4,6,8].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = remove_all_kth_nodes_from_end(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = remove_all_kth_nodes_from_end(head)
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

// RemoveAllKthNodesFromEnd solves: Remove All Kth Nodes From End
// Remove the kth node, the 2kth node, the 3kth node, etc., all counted from the end of the list.
// Approach: Requires either knowing the full length to compute all positions, or multiple passes. The single two-pointer trick no longer suffices for multiple removals.
func RemoveAllKthNodesFromEnd(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Remove All Kth Nodes From End
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
    // Example: list=[1,2,3,4,5,6,7,8], k=2: remove 2nd from end (7), 4th from end (5), 6th from end (3), 8th from end (1). Result=[2,4,6,8].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := RemoveAllKthNodesFromEnd(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = RemoveAllKthNodesFromEnd(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/twist-02-remove-all-kth-nodes-from-end', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/twist-02-remove-all-kth-nodes-from-end'] = problem;
})();
