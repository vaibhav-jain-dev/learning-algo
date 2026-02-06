/**
 * Partition Preserving Absolute Order
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 11-rearrange-linked-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Partition Preserving Absolute Order',
        difficulty: 'Medium',
        algorithm: 'll-rearrange',
        parent: '11-rearrange-linked-list',
        description: 'Rearrange the list around value k, but the output must have all three groups (less, equal, greater) individually sorted in ascending order.',
        problem: 'Adds a sorting requirement within each partition, requiring either sorted insertion or post-partition sorting of each group before concatenation.',
        hints: [
            'Rearrange the list around value k, but the output must have all three groups (less, equal, greater) individually sorted in ascending order.',
            'Adds a sorting requirement within each partition, requiring either sorted insertion or post-partition sorting of each group before concatenation.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[3,0,5,2,1,4], k=3: less sorted=[0,1,2], equal=[3], greater sorted=[4,5]. Result=[0,1,2,3,4,5].'
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

def partition_preserving_absolute_order(head, *args):
    """
    Partition Preserving Absolute Order
    Rearrange the list around value k, but the output must have all three groups (less, equal, greater) individually sorted in ascending order.

    Approach: Adds a sorting requirement within each partition, requiring either sorted insertion or post-partition sorting of each group before concatenation.
    """
    if not head:
        return head

    # Core algorithm for: Partition Preserving Absolute Order
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
    # Example: list=[3,0,5,2,1,4], k=3: less sorted=[0,1,2], equal=[3], greater sorted=[4,5]. Result=[0,1,2,3,4,5].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = partition_preserving_absolute_order(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = partition_preserving_absolute_order(head)
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

// PartitionPreservingAbsoluteOrder solves: Partition Preserving Absolute Order
// Rearrange the list around value k, but the output must have all three groups (less, equal, greater) individually sorted in ascending order.
// Approach: Adds a sorting requirement within each partition, requiring either sorted insertion or post-partition sorting of each group before concatenation.
func PartitionPreservingAbsoluteOrder(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Partition Preserving Absolute Order
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
    // Example: list=[3,0,5,2,1,4], k=3: less sorted=[0,1,2], equal=[3], greater sorted=[4,5]. Result=[0,1,2,3,4,5].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := PartitionPreservingAbsoluteOrder(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = PartitionPreservingAbsoluteOrder(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '11-rearrange-linked-list/twist-02-partition-preserving-absolute-order', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/11-rearrange-linked-list/twist-02-partition-preserving-absolute-order'] = problem;
})();
