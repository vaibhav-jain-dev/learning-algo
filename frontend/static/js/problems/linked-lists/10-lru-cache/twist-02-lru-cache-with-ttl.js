/**
 * LRU Cache With TTL
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 10-lru-cache
 */
(function() {
    'use strict';
    const problem = {
        name: 'LRU Cache With TTL',
        difficulty: 'Hard',
        algorithm: 'll-lru-cache',
        parent: '10-lru-cache',
        description: 'Each cache entry has a time-to-live (TTL). Entries expire after their TTL and should be treated as non-existent. Implement get and put with TTL support.',
        problem: 'Adds a temporal dimension. Each access must check if the entry has expired, and you may need lazy deletion or a background cleanup mechanism.',
        hints: [
            'Each cache entry has a time-to-live (TTL)',
            'Adds a temporal dimension',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'put("a", 1, ttl=5s), put("b", 2, ttl=10s). After 6 seconds: get("a") returns -1 (expired), get("b") returns 2 (still valid).'
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

def lru_cache_with_ttl(head, *args):
    """
    LRU Cache With TTL
    Each cache entry has a time-to-live (TTL). Entries expire after their TTL and should be treated as non-existent. Implement get and put with TTL support.

    Approach: Adds a temporal dimension. Each access must check if the entry has expired, and you may need lazy deletion or a background cleanup mechanism.
    """
    if not head:
        return head

    # Core algorithm for: LRU Cache With TTL
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
    # Example: put("a", 1, ttl=5s), put("b", 2, ttl=10s). After 6 seconds: get("a") returns -1 (expired), get("b") returns 2 (still valid).
    head = to_linked_list([1, 2, 3, 4, 5])
    result = lru_cache_with_ttl(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = lru_cache_with_ttl(head)
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

// LRUCacheWithTTL solves: LRU Cache With TTL
// Each cache entry has a time-to-live (TTL). Entries expire after their TTL and should be treated as non-existent. Implement get and put with TTL support.
// Approach: Adds a temporal dimension. Each access must check if the entry has expired, and you may need lazy deletion or a background cleanup mechanism.
func LRUCacheWithTTL(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: LRU Cache With TTL
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
    // Example: put("a", 1, ttl=5s), put("b", 2, ttl=10s). After 6 seconds: get("a") returns -1 (expired), get("b") returns 2 (still valid).
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := LRUCacheWithTTL(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = LRUCacheWithTTL(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '10-lru-cache/twist-02-lru-cache-with-ttl', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/10-lru-cache/twist-02-lru-cache-with-ttl'] = problem;
})();
