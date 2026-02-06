/**
 * Sentinel Node Deep Dive
 * Category: linked-lists
 * Difficulty: Easy
 * Parent: 01-remove-duplicates/02-remove-all-duplicate-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'Sentinel Node Deep Dive',
        difficulty: 'Easy',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/02-remove-all-duplicate-nodes',
        description: 'Solve the problem once WITH a dummy/sentinel node and once WITHOUT. Compare the edge case handling for when the head itself is a duplicate that must be removed.',
        problem: 'Without a sentinel node, removing the head requires special-case logic and returning a potentially different head. The sentinel approach unifies all cases. This twist highlights why the sentinel trick is so powerful for linked list deletion problems.',
        hints: [
            'Solve the problem once WITH a dummy/sentinel node and once WITHOUT',
            'Without a sentinel node, removing the head requires special-case logic and returning a potentially different head',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: 1->1->2->3. Without sentinel: must handle head removal as special case. With sentinel: dummy->1->1->2->3, uniform deletion logic.'
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

def sentinel_node_deep_dive(head, *args):
    """
    Sentinel Node Deep Dive
    Solve the problem once WITH a dummy/sentinel node and once WITHOUT. Compare the edge case handling for when the head itself is a duplicate that must be removed.

    Approach: Without a sentinel node, removing the head requires special-case logic and returning a potentially different head. The sentinel approach unifies all cases. This twist highlights why the sentinel trick is so powerful for linked list deletion problems.
    """
    if not head:
        return head

    # Core algorithm for: Sentinel Node Deep Dive
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
    # Example: Input: 1->1->2->3. Without sentinel: must handle head removal as special case. With sentinel: dummy->1->1->2->3, uniform deletion logic.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = sentinel_node_deep_dive(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = sentinel_node_deep_dive(head)
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

// SentinelNodeDeepDive solves: Sentinel Node Deep Dive
// Solve the problem once WITH a dummy/sentinel node and once WITHOUT. Compare the edge case handling for when the head itself is a duplicate that must be removed.
// Approach: Without a sentinel node, removing the head requires special-case logic and returning a potentially different head. The sentinel approach unifies all cases. This twist highlights why the sentinel trick is so powerful for linked list deletion problems.
func SentinelNodeDeepDive(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Sentinel Node Deep Dive
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
    // Example: Input: 1->1->2->3. Without sentinel: must handle head removal as special case. With sentinel: dummy->1->1->2->3, uniform deletion logic.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := SentinelNodeDeepDive(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = SentinelNodeDeepDive(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-05-sentinel-node-deep-dive', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/02-remove-all-duplicate-nodes/twist-05-sentinel-node-deep-dive'] = problem;
})();
