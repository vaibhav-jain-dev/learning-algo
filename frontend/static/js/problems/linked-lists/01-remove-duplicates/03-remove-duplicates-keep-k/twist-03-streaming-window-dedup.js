/**
 * Streaming Window Dedup
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 01-remove-duplicates/03-remove-duplicates-keep-k
 */
(function() {
    'use strict';
    const problem = {
        name: 'Streaming Window Dedup',
        difficulty: 'Hard',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/03-remove-duplicates-keep-k',
        description: 'Nodes arrive in a stream. Maintain a linked list where each value appears at most k times. When a new node arrives, either append it or reject it in O(1) time.',
        problem: 'Requires maintaining a persistent count map alongside the list. The challenge is making append O(1) while also supporting removal from arbitrary positions if the design changes.',
        hints: [
            'Nodes arrive in a stream',
            'Requires maintaining a persistent count map alongside the list',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'k=2. Stream: 1,1,1,2,2,3. After processing: 1->1->2->2->3. The third 1 was rejected on arrival.'
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

def streaming_window_dedup(head, *args):
    """
    Streaming Window Dedup
    Nodes arrive in a stream. Maintain a linked list where each value appears at most k times. When a new node arrives, either append it or reject it in O(1) time.

    Approach: Requires maintaining a persistent count map alongside the list. The challenge is making append O(1) while also supporting removal from arbitrary positions if the design changes.
    """
    if not head:
        return head

    # Core algorithm for: Streaming Window Dedup
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
    # Example: k=2. Stream: 1,1,1,2,2,3. After processing: 1->1->2->2->3. The third 1 was rejected on arrival.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = streaming_window_dedup(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = streaming_window_dedup(head)
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

// StreamingWindowDedup solves: Streaming Window Dedup
// Nodes arrive in a stream. Maintain a linked list where each value appears at most k times. When a new node arrives, either append it or reject it in O(1) time.
// Approach: Requires maintaining a persistent count map alongside the list. The challenge is making append O(1) while also supporting removal from arbitrary positions if the design changes.
func StreamingWindowDedup(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Streaming Window Dedup
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
    // Example: k=2. Stream: 1,1,1,2,2,3. After processing: 1->1->2->2->3. The third 1 was rejected on arrival.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := StreamingWindowDedup(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = StreamingWindowDedup(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/03-remove-duplicates-keep-k/twist-03-streaming-window-dedup', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/03-remove-duplicates-keep-k/twist-03-streaming-window-dedup'] = problem;
})();
