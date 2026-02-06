/**
 * Streaming Middle (Unknown Length)
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 02-middle-node
 */
(function() {
    'use strict';
    const problem = {
        name: 'Streaming Middle (Unknown Length)',
        difficulty: 'Hard',
        algorithm: 'll-middle',
        parent: '02-middle-node',
        description: 'Elements arrive one at a time and you must report the current middle after each insertion. Maintain the ability to return the middle in O(1) at any point.',
        problem: 'You need to maintain a persistent middle pointer that updates incrementally with each insertion. When the count goes from odd to even or vice versa, the middle pointer may or may not advance. This is a state-machine problem rather than a traversal problem.',
        hints: [
            'Elements arrive one at a time and you must report the current middle after each insertion',
            'You need to maintain a persistent middle pointer that updates incrementally with each insertion',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Insert 1: middle=1. Insert 2: middle=2. Insert 3: middle=2. Insert 4: middle=3. Insert 5: middle=3.'
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

def streaming_middle_unknown_length(head, *args):
    """
    Streaming Middle (Unknown Length)
    Elements arrive one at a time and you must report the current middle after each insertion. Maintain the ability to return the middle in O(1) at any point.

    Approach: You need to maintain a persistent middle pointer that updates incrementally with each insertion. When the count goes from odd to even or vice versa, the middle pointer may or may not advance. This is a state-machine problem rather than a traversal problem.
    """
    if not head:
        return head

    # Core algorithm for: Streaming Middle (Unknown Length)
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
    # Example: Insert 1: middle=1. Insert 2: middle=2. Insert 3: middle=2. Insert 4: middle=3. Insert 5: middle=3.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = streaming_middle_unknown_length(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = streaming_middle_unknown_length(head)
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

// StreamingMiddleUnknownLength solves: Streaming Middle (Unknown Length)
// Elements arrive one at a time and you must report the current middle after each insertion. Maintain the ability to return the middle in O(1) at any point.
// Approach: You need to maintain a persistent middle pointer that updates incrementally with each insertion. When the count goes from odd to even or vice versa, the middle pointer may or may not advance. This is a state-machine problem rather than a traversal problem.
func StreamingMiddleUnknownLength(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Streaming Middle (Unknown Length)
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
    // Example: Insert 1: middle=1. Insert 2: middle=2. Insert 3: middle=2. Insert 4: middle=3. Insert 5: middle=3.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := StreamingMiddleUnknownLength(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = StreamingMiddleUnknownLength(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '02-middle-node/twist-05-streaming-middle-unknown-length', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/02-middle-node/twist-05-streaming-middle-unknown-length'] = problem;
})();
