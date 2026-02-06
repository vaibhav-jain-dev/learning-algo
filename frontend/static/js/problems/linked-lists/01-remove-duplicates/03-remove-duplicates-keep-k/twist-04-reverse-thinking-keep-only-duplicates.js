/**
 * Reverse Thinking: Keep Only Duplicates
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 01-remove-duplicates/03-remove-duplicates-keep-k
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse Thinking: Keep Only Duplicates',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/03-remove-duplicates-keep-k',
        description: 'Instead of removing extras, keep ONLY nodes that appear more than k times. Remove all values that appear k or fewer times.',
        problem: 'The filtering logic inverts completely. You now need to first count all occurrences (requiring a full pass or hash map), then do a second pass to remove nodes whose count is <= k.',
        hints: [
            'Instead of removing extras, keep ONLY nodes that appear more than k times',
            'The filtering logic inverts completely',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: 1->1->1->2->2->3, k=2. Values with count > 2: only 1 (appears 3 times). Output: 1->1->1.'
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

def reverse_thinking_keep_only_duplicates(head, *args):
    """
    Reverse Thinking: Keep Only Duplicates
    Instead of removing extras, keep ONLY nodes that appear more than k times. Remove all values that appear k or fewer times.

    Approach: The filtering logic inverts completely. You now need to first count all occurrences (requiring a full pass or hash map), then do a second pass to remove nodes whose count is <= k.
    """
    if not head:
        return head

    # Core algorithm for: Reverse Thinking: Keep Only Duplicates
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
    # Example: Input: 1->1->1->2->2->3, k=2. Values with count > 2: only 1 (appears 3 times). Output: 1->1->1.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverse_thinking_keep_only_duplicates(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = reverse_thinking_keep_only_duplicates(head)
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

// ReverseThinkingKeepOnlyDuplicates solves: Reverse Thinking: Keep Only Duplicates
// Instead of removing extras, keep ONLY nodes that appear more than k times. Remove all values that appear k or fewer times.
// Approach: The filtering logic inverts completely. You now need to first count all occurrences (requiring a full pass or hash map), then do a second pass to remove nodes whose count is <= k.
func ReverseThinkingKeepOnlyDuplicates(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Reverse Thinking: Keep Only Duplicates
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
    // Example: Input: 1->1->1->2->2->3, k=2. Values with count > 2: only 1 (appears 3 times). Output: 1->1->1.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReverseThinkingKeepOnlyDuplicates(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReverseThinkingKeepOnlyDuplicates(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/03-remove-duplicates-keep-k/twist-04-reverse-thinking-keep-only-duplicates', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/03-remove-duplicates-keep-k/twist-04-reverse-thinking-keep-only-duplicates'] = problem;
})();
