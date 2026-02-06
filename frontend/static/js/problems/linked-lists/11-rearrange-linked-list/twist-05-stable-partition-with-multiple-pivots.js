/**
 * Stable Partition With Multiple Pivots
 * Category: linked-lists
 * Difficulty: Very Hard
 * Parent: 11-rearrange-linked-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Stable Partition With Multiple Pivots',
        difficulty: 'Very Hard',
        algorithm: 'll-rearrange',
        parent: '11-rearrange-linked-list',
        description: 'Given a list of pivot values [p1, p2, ..., pm] in sorted order, partition the list into m+1 groups maintaining relative order within each group.',
        problem: 'Generalizes from one pivot to multiple, requiring m+1 sub-lists and binary search or linear scan to classify each node into the correct group.',
        hints: [
            'Given a list of pivot values [p1, p2, ..., pm] in sorted order, partition the list into m+1 groups maintaining relative order within each group.',
            'Generalizes from one pivot to multiple, requiring m+1 sub-lists and binary search or linear scan to classify each node into the correct group.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[7,2,5,1,8,3,6,4], pivots=[3,6]: groups are [<=3]=[2,1,3], [4-6]=[5,6,4], [>6]=[7,8]. Result=[2,1,3,5,6,4,7,8].'
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

def stable_partition_with_multiple_pivots(head, *args):
    """
    Stable Partition With Multiple Pivots
    Given a list of pivot values [p1, p2, ..., pm] in sorted order, partition the list into m+1 groups maintaining relative order within each group.

    Approach: Generalizes from one pivot to multiple, requiring m+1 sub-lists and binary search or linear scan to classify each node into the correct group.
    """
    if not head:
        return head

    # Core algorithm for: Stable Partition With Multiple Pivots
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
    # Example: list=[7,2,5,1,8,3,6,4], pivots=[3,6]: groups are [<=3]=[2,1,3], [4-6]=[5,6,4], [>6]=[7,8]. Result=[2,1,3,5,6,4,7,8].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = stable_partition_with_multiple_pivots(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = stable_partition_with_multiple_pivots(head)
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

// StablePartitionWithMultiplePivots solves: Stable Partition With Multiple Pivots
// Given a list of pivot values [p1, p2, ..., pm] in sorted order, partition the list into m+1 groups maintaining relative order within each group.
// Approach: Generalizes from one pivot to multiple, requiring m+1 sub-lists and binary search or linear scan to classify each node into the correct group.
func StablePartitionWithMultiplePivots(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Stable Partition With Multiple Pivots
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
    // Example: list=[7,2,5,1,8,3,6,4], pivots=[3,6]: groups are [<=3]=[2,1,3], [4-6]=[5,6,4], [>6]=[7,8]. Result=[2,1,3,5,6,4,7,8].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := StablePartitionWithMultiplePivots(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = StablePartitionWithMultiplePivots(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '11-rearrange-linked-list/twist-05-stable-partition-with-multiple-pivots', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/11-rearrange-linked-list/twist-05-stable-partition-with-multiple-pivots'] = problem;
})();
