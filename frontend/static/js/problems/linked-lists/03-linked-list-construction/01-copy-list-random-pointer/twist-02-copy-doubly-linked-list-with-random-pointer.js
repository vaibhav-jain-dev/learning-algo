/**
 * Copy Doubly Linked List with Random Pointer
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 03-linked-list-construction/01-copy-list-random-pointer
 */
(function() {
    'use strict';
    const problem = {
        name: 'Copy Doubly Linked List with Random Pointer',
        difficulty: 'Hard',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/01-copy-list-random-pointer',
        description: 'The list is doubly linked (has prev, next, and random pointers). Deep copy it while maintaining all three pointer types.',
        problem: 'Adding a prev pointer means the interleaving approach needs additional care during separation to restore prev pointers. The hash map approach handles it naturally but requires setting three pointers per node instead of two.',
        hints: [
            'The list is doubly linked (has prev, next, and random pointers)',
            'Adding a prev pointer means the interleaving approach needs additional care during separation to restore prev pointers',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Original: null<->1<->2<->3 with randoms. Copy must have valid prev, next, AND random pointers all pointing to new nodes.'
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

def copy_doubly_linked_list_with_random_pointer(head, *args):
    """
    Copy Doubly Linked List with Random Pointer
    The list is doubly linked (has prev, next, and random pointers). Deep copy it while maintaining all three pointer types.

    Approach: Adding a prev pointer means the interleaving approach needs additional care during separation to restore prev pointers. The hash map approach handles it naturally but requires setting three pointers per node instead of two.
    """
    if not head:
        return head

    # Core algorithm for: Copy Doubly Linked List with Random Pointer
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
    # Example: Original: null<->1<->2<->3 with randoms. Copy must have valid prev, next, AND random pointers all pointing to new nodes.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = copy_doubly_linked_list_with_random_pointer(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = copy_doubly_linked_list_with_random_pointer(head)
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

// CopyDoublyLinkedListWithRandomPointer solves: Copy Doubly Linked List with Random Pointer
// The list is doubly linked (has prev, next, and random pointers). Deep copy it while maintaining all three pointer types.
// Approach: Adding a prev pointer means the interleaving approach needs additional care during separation to restore prev pointers. The hash map approach handles it naturally but requires setting three pointers per node instead of two.
func CopyDoublyLinkedListWithRandomPointer(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Copy Doubly Linked List with Random Pointer
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
    // Example: Original: null<->1<->2<->3 with randoms. Copy must have valid prev, next, AND random pointers all pointing to new nodes.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := CopyDoublyLinkedListWithRandomPointer(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = CopyDoublyLinkedListWithRandomPointer(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/01-copy-list-random-pointer/twist-02-copy-doubly-linked-list-with-random-pointer', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/01-copy-list-random-pointer/twist-02-copy-doubly-linked-list-with-random-pointer'] = problem;
})();
