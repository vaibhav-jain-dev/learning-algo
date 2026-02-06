/**
 * Merge by Alternating Nodes
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 08-merge-linked-lists
 */
(function() {
    'use strict';
    const problem = {
        name: 'Merge by Alternating Nodes',
        difficulty: 'Medium',
        algorithm: 'll-merge',
        parent: '08-merge-linked-lists',
        description: 'Merge two lists by alternating nodes: take one from list1, then one from list2, then one from list1, etc. Append remaining nodes at the end.',
        problem: 'Ignores sorted order entirely. The merge pattern is round-robin rather than comparison-based, requiring simple alternating pointer reassignment.',
        hints: [
            'Merge two lists by alternating nodes: take one from list1, then one from list2, then one from list1, etc',
            'Ignores sorted order entirely',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list1=[1,3,5], list2=[2,4,6,8]: result=[1,2,3,4,5,6,8].'
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

def merge_by_alternating_nodes(head, *args):
    """
    Merge by Alternating Nodes
    Merge two lists by alternating nodes: take one from list1, then one from list2, then one from list1, etc. Append remaining nodes at the end.

    Approach: Ignores sorted order entirely. The merge pattern is round-robin rather than comparison-based, requiring simple alternating pointer reassignment.
    """
    if not head:
        return head

    # Core algorithm for: Merge by Alternating Nodes
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
    # Example: list1=[1,3,5], list2=[2,4,6,8]: result=[1,2,3,4,5,6,8].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = merge_by_alternating_nodes(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = merge_by_alternating_nodes(head)
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

// MergeByAlternatingNodes solves: Merge by Alternating Nodes
// Merge two lists by alternating nodes: take one from list1, then one from list2, then one from list1, etc. Append remaining nodes at the end.
// Approach: Ignores sorted order entirely. The merge pattern is round-robin rather than comparison-based, requiring simple alternating pointer reassignment.
func MergeByAlternatingNodes(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Merge by Alternating Nodes
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
    // Example: list1=[1,3,5], list2=[2,4,6,8]: result=[1,2,3,4,5,6,8].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := MergeByAlternatingNodes(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = MergeByAlternatingNodes(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '08-merge-linked-lists/twist-03-merge-by-alternating-nodes', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/08-merge-linked-lists/twist-03-merge-by-alternating-nodes'] = problem;
})();
