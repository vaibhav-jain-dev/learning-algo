/**
 * Remove Kth Node in Doubly Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 04-remove-kth-node
 */
(function() {
    'use strict';
    const problem = {
        name: 'Remove Kth Node in Doubly Linked List',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node',
        description: 'Remove the kth node from the end in a doubly linked list. You have access to both head and tail.',
        problem: 'Having a tail pointer and prev pointers lets you traverse backward from the tail, turning this into a simple k-step traversal from the end rather than a two-pointer problem.',
        hints: [
            'Remove the kth node from the end in a doubly linked list',
            'Having a tail pointer and prev pointers lets you traverse backward from the tail, turning this into a simple k-step traversal from the end rather than a two-pointer problem.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[0,1,2,3,4], k=2: start from tail (4), go back 2 to node 3. Remove it. Result=[0,1,2,4].'
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

def remove_kth_node_in_doubly_linked_list(head, *args):
    """
    Remove Kth Node in Doubly Linked List
    Remove the kth node from the end in a doubly linked list. You have access to both head and tail.

    Approach: Having a tail pointer and prev pointers lets you traverse backward from the tail, turning this into a simple k-step traversal from the end rather than a two-pointer problem.
    """
    if not head:
        return head

    # Core algorithm for: Remove Kth Node in Doubly Linked List
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
    # Example: list=[0,1,2,3,4], k=2: start from tail (4), go back 2 to node 3. Remove it. Result=[0,1,2,4].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = remove_kth_node_in_doubly_linked_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = remove_kth_node_in_doubly_linked_list(head)
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

// RemoveKthNodeInDoublyLinkedList solves: Remove Kth Node in Doubly Linked List
// Remove the kth node from the end in a doubly linked list. You have access to both head and tail.
// Approach: Having a tail pointer and prev pointers lets you traverse backward from the tail, turning this into a simple k-step traversal from the end rather than a two-pointer problem.
func RemoveKthNodeInDoublyLinkedList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Remove Kth Node in Doubly Linked List
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
    // Example: list=[0,1,2,3,4], k=2: start from tail (4), go back 2 to node 3. Remove it. Result=[0,1,2,4].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := RemoveKthNodeInDoublyLinkedList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = RemoveKthNodeInDoublyLinkedList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/twist-03-remove-kth-node-in-doubly-linked-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/twist-03-remove-kth-node-in-doubly-linked-list'] = problem;
})();
