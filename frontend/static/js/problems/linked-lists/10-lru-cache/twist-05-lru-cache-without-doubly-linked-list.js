/**
 * LRU Cache Without Doubly Linked List
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 10-lru-cache
 */
(function() {
    'use strict';
    const problem = {
        name: 'LRU Cache Without Doubly Linked List',
        difficulty: 'Hard',
        algorithm: 'll-lru-cache',
        parent: '10-lru-cache',
        description: 'Implement the LRU cache using only a hash map and a singly linked list (no prev pointers). Maintain O(1) operations.',
        problem: 'Without prev pointers, removing a node from the middle requires O(n) traversal unless you store the predecessor in the hash map, forcing a different mapping strategy.',
        hints: [
            'Implement the LRU cache using only a hash map and a singly linked list (no prev pointers)',
            'Without prev pointers, removing a node from the middle requires O(n) traversal unless you store the predecessor in the hash map, forcing a different mapping strategy.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Store hash[key] = predecessor_node instead of the node itself. This lets you delete in O(1) by accessing the predecessor directly.'
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

def lru_cache_without_doubly_linked_list(head, *args):
    """
    LRU Cache Without Doubly Linked List
    Implement the LRU cache using only a hash map and a singly linked list (no prev pointers). Maintain O(1) operations.

    Approach: Without prev pointers, removing a node from the middle requires O(n) traversal unless you store the predecessor in the hash map, forcing a different mapping strategy.
    """
    if not head:
        return head

    # Core algorithm for: LRU Cache Without Doubly Linked List
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
    # Example: Store hash[key] = predecessor_node instead of the node itself. This lets you delete in O(1) by accessing the predecessor directly.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = lru_cache_without_doubly_linked_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = lru_cache_without_doubly_linked_list(head)
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

// LRUCacheWithoutDoublyLinkedList solves: LRU Cache Without Doubly Linked List
// Implement the LRU cache using only a hash map and a singly linked list (no prev pointers). Maintain O(1) operations.
// Approach: Without prev pointers, removing a node from the middle requires O(n) traversal unless you store the predecessor in the hash map, forcing a different mapping strategy.
func LRUCacheWithoutDoublyLinkedList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: LRU Cache Without Doubly Linked List
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
    // Example: Store hash[key] = predecessor_node instead of the node itself. This lets you delete in O(1) by accessing the predecessor directly.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := LRUCacheWithoutDoublyLinkedList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = LRUCacheWithoutDoublyLinkedList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '10-lru-cache/twist-05-lru-cache-without-doubly-linked-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/10-lru-cache/twist-05-lru-cache-without-doubly-linked-list'] = problem;
})();
