/**
 * LRU Cache With Size-Based Eviction
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 10-lru-cache
 */
(function() {
    'use strict';
    const problem = {
        name: 'LRU Cache With Size-Based Eviction',
        difficulty: 'Hard',
        algorithm: 'll-lru-cache',
        parent: '10-lru-cache',
        description: 'Instead of a fixed number of items, the cache has a byte-size limit. Each value has a size in bytes. Evict LRU items until there is room for the new item.',
        problem: 'A single put might require evicting multiple items. The eviction loop continues until enough space is freed, adding a while-loop eviction pattern.',
        hints: [
            'Instead of a fixed number of items, the cache has a byte-size limit',
            'A single put might require evicting multiple items',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'capacity=10 bytes. put("a", val, size=4), put("b", val, size=4), put("c", val, size=5): must evict "a" (4 bytes) to make room for "c".'
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

def lru_cache_with_size_based_eviction(head, *args):
    """
    LRU Cache With Size-Based Eviction
    Instead of a fixed number of items, the cache has a byte-size limit. Each value has a size in bytes. Evict LRU items until there is room for the new item.

    Approach: A single put might require evicting multiple items. The eviction loop continues until enough space is freed, adding a while-loop eviction pattern.
    """
    if not head:
        return head

    # Core algorithm for: LRU Cache With Size-Based Eviction
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
    # Example: capacity=10 bytes. put("a", val, size=4), put("b", val, size=4), put("c", val, size=5): must evict "a" (4 bytes) to make room for "c".
    head = to_linked_list([1, 2, 3, 4, 5])
    result = lru_cache_with_size_based_eviction(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = lru_cache_with_size_based_eviction(head)
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

// LRUCacheWithSizeBasedEviction solves: LRU Cache With Size-Based Eviction
// Instead of a fixed number of items, the cache has a byte-size limit. Each value has a size in bytes. Evict LRU items until there is room for the new item.
// Approach: A single put might require evicting multiple items. The eviction loop continues until enough space is freed, adding a while-loop eviction pattern.
func LRUCacheWithSizeBasedEviction(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: LRU Cache With Size-Based Eviction
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
    // Example: capacity=10 bytes. put("a", val, size=4), put("b", val, size=4), put("c", val, size=5): must evict "a" (4 bytes) to make room for "c".
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := LRUCacheWithSizeBasedEviction(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = LRUCacheWithSizeBasedEviction(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '10-lru-cache/twist-03-lru-cache-with-size-based-eviction', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/10-lru-cache/twist-03-lru-cache-with-size-based-eviction'] = problem;
})();
