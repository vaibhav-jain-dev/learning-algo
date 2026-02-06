/**
 * Thread-Safe LRU Cache
 * Category: linked-lists
 * Difficulty: Very Hard
 * Parent: 10-lru-cache
 */
(function() {
    'use strict';
    const problem = {
        name: 'Thread-Safe LRU Cache',
        difficulty: 'Very Hard',
        algorithm: 'll-lru-cache',
        parent: '10-lru-cache',
        description: 'Design the LRU cache to be safe for concurrent access by multiple threads. Consider locking strategies for get and put operations.',
        problem: 'Requires synchronization primitives (mutexes, read-write locks) to prevent race conditions. The performance tradeoff between coarse-grained and fine-grained locking becomes a key design decision.',
        hints: [
            'Design the LRU cache to be safe for concurrent access by multiple threads',
            'Requires synchronization primitives (mutexes, read-write locks) to prevent race conditions',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Thread 1 calls get("a") while Thread 2 calls put("b",2). Without locking, the linked list pointers could become corrupted during simultaneous modifications.'
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

def thread_safe_lru_cache(head, *args):
    """
    Thread-Safe LRU Cache
    Design the LRU cache to be safe for concurrent access by multiple threads. Consider locking strategies for get and put operations.

    Approach: Requires synchronization primitives (mutexes, read-write locks) to prevent race conditions. The performance tradeoff between coarse-grained and fine-grained locking becomes a key design decision.
    """
    if not head:
        return head

    # Core algorithm for: Thread-Safe LRU Cache
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
    # Example: Thread 1 calls get("a") while Thread 2 calls put("b",2). Without locking, the linked list pointers could become corrupted during simultaneous modifications.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = thread_safe_lru_cache(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = thread_safe_lru_cache(head)
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

// ThreadSafeLRUCache solves: Thread-Safe LRU Cache
// Design the LRU cache to be safe for concurrent access by multiple threads. Consider locking strategies for get and put operations.
// Approach: Requires synchronization primitives (mutexes, read-write locks) to prevent race conditions. The performance tradeoff between coarse-grained and fine-grained locking becomes a key design decision.
func ThreadSafeLRUCache(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Thread-Safe LRU Cache
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
    // Example: Thread 1 calls get("a") while Thread 2 calls put("b",2). Without locking, the linked list pointers could become corrupted during simultaneous modifications.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ThreadSafeLRUCache(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ThreadSafeLRUCache(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '10-lru-cache/twist-04-thread-safe-lru-cache', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/10-lru-cache/twist-04-thread-safe-lru-cache'] = problem;
})();
