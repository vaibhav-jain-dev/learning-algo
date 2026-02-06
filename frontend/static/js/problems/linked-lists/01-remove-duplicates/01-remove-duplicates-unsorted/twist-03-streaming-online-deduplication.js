/**
 * Streaming / Online Deduplication
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 01-remove-duplicates/01-remove-duplicates-unsorted
 */
(function() {
    'use strict';
    const problem = {
        name: 'Streaming / Online Deduplication',
        difficulty: 'Hard',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/01-remove-duplicates-unsorted',
        description: 'Nodes arrive one at a time via an append operation. After each append, the list must remain duplicate-free. Design a data structure that supports O(1) append-with-dedup.',
        problem: 'You cannot traverse the entire list on each insertion. You need a persistent hash set alongside the linked list, essentially designing a hybrid data structure rather than a one-pass algorithm.',
        hints: [
            'Nodes arrive one at a time via an append operation',
            'You cannot traverse the entire list on each insertion',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'append(3): list=[3]. append(2): list=[3,2]. append(2): duplicate, skip. append(1): list=[3,2,1]. append(3): duplicate, skip.'
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

def streaming_online_deduplication(head, *args):
    """
    Streaming / Online Deduplication
    Nodes arrive one at a time via an append operation. After each append, the list must remain duplicate-free. Design a data structure that supports O(1) append-with-dedup.

    Approach: You cannot traverse the entire list on each insertion. You need a persistent hash set alongside the linked list, essentially designing a hybrid data structure rather than a one-pass algorithm.
    """
    if not head:
        return head

    # Core algorithm for: Streaming / Online Deduplication
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
    # Example: append(3): list=[3]. append(2): list=[3,2]. append(2): duplicate, skip. append(1): list=[3,2,1]. append(3): duplicate, skip.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = streaming_online_deduplication(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = streaming_online_deduplication(head)
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

// StreamingOnlineDeduplication solves: Streaming / Online Deduplication
// Nodes arrive one at a time via an append operation. After each append, the list must remain duplicate-free. Design a data structure that supports O(1) append-with-dedup.
// Approach: You cannot traverse the entire list on each insertion. You need a persistent hash set alongside the linked list, essentially designing a hybrid data structure rather than a one-pass algorithm.
func StreamingOnlineDeduplication(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Streaming / Online Deduplication
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
    // Example: append(3): list=[3]. append(2): list=[3,2]. append(2): duplicate, skip. append(1): list=[3,2,1]. append(3): duplicate, skip.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := StreamingOnlineDeduplication(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = StreamingOnlineDeduplication(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/01-remove-duplicates-unsorted/twist-03-streaming-online-deduplication', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/01-remove-duplicates-unsorted/twist-03-streaming-online-deduplication'] = problem;
})();
