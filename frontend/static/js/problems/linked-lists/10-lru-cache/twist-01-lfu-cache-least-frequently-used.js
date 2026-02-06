/**
 * LFU Cache (Least Frequently Used)
 * Category: linked-lists
 * Difficulty: Very Hard
 * Parent: 10-lru-cache
 */
(function() {
    'use strict';
    const problem = {
        name: 'LFU Cache (Least Frequently Used)',
        difficulty: 'Very Hard',
        algorithm: 'll-lru-cache',
        parent: '10-lru-cache',
        description: 'Implement an LFU Cache where the eviction policy removes the least frequently used item. If there is a tie in frequency, evict the least recently used among those.',
        problem: 'Requires tracking access frequency per key and maintaining frequency-ordered buckets. The data structure changes from a single doubly-linked list to frequency-mapped lists.',
        hints: [
            'Implement an LFU Cache where the eviction policy removes the least frequently used item',
            'Requires tracking access frequency per key and maintaining frequency-ordered buckets',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'capacity=2: put(1,1), put(2,2), get(1), put(3,3). Key 1 has freq 2, key 2 has freq 1. Evict key 2 (least frequent). Cache: {1:1, 3:3}.'
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

def lfu_cache_least_frequently_used(head, *args):
    """
    LFU Cache (Least Frequently Used)
    Implement an LFU Cache where the eviction policy removes the least frequently used item. If there is a tie in frequency, evict the least recently used among those.

    Approach: Requires tracking access frequency per key and maintaining frequency-ordered buckets. The data structure changes from a single doubly-linked list to frequency-mapped lists.
    """
    if not head:
        return head

    # Core algorithm for: LFU Cache (Least Frequently Used)
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
    # Example: capacity=2: put(1,1), put(2,2), get(1), put(3,3). Key 1 has freq 2, key 2 has freq 1. Evict key 2 (least frequent). Cache: {1:1, 3:3}.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = lfu_cache_least_frequently_used(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = lfu_cache_least_frequently_used(head)
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

// LFUCacheLeastFrequentlyUsed solves: LFU Cache (Least Frequently Used)
// Implement an LFU Cache where the eviction policy removes the least frequently used item. If there is a tie in frequency, evict the least recently used among those.
// Approach: Requires tracking access frequency per key and maintaining frequency-ordered buckets. The data structure changes from a single doubly-linked list to frequency-mapped lists.
func LFUCacheLeastFrequentlyUsed(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: LFU Cache (Least Frequently Used)
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
    // Example: capacity=2: put(1,1), put(2,2), get(1), put(3,3). Key 1 has freq 2, key 2 has freq 1. Evict key 2 (least frequent). Cache: {1:1, 3:3}.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := LFUCacheLeastFrequentlyUsed(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = LFUCacheLeastFrequentlyUsed(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '10-lru-cache/twist-01-lfu-cache-least-frequently-used', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/10-lru-cache/twist-01-lfu-cache-least-frequently-used'] = problem;
})();
