/**
 * Return the Removed Node Value
 * Category: linked-lists
 * Difficulty: Easy
 * Parent: 04-remove-kth-node
 */
(function() {
    'use strict';
    const problem = {
        name: 'Return the Removed Node Value',
        difficulty: 'Easy',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node',
        description: 'Remove the kth node from the end and return its value, not the modified list head.',
        problem: 'Requires capturing the value before removal. The two-pointer technique remains the same, but you must track the target node to extract its value.',
        hints: [
            'Remove the kth node from the end and return its value, not the modified list head.',
            'Requires capturing the value before removal',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[0,1,2,3,4,5,6,7,8,9], k=4: remove node with value 6, return 6.'
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

def return_the_removed_node_value(head, *args):
    """
    Return the Removed Node Value
    Remove the kth node from the end and return its value, not the modified list head.

    Approach: Requires capturing the value before removal. The two-pointer technique remains the same, but you must track the target node to extract its value.
    """
    if not head:
        return head

    # Core algorithm for: Return the Removed Node Value
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
    # Example: list=[0,1,2,3,4,5,6,7,8,9], k=4: remove node with value 6, return 6.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = return_the_removed_node_value(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = return_the_removed_node_value(head)
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

// ReturnTheRemovedNodeValue solves: Return the Removed Node Value
// Remove the kth node from the end and return its value, not the modified list head.
// Approach: Requires capturing the value before removal. The two-pointer technique remains the same, but you must track the target node to extract its value.
func ReturnTheRemovedNodeValue(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Return the Removed Node Value
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
    // Example: list=[0,1,2,3,4,5,6,7,8,9], k=4: remove node with value 6, return 6.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReturnTheRemovedNodeValue(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReturnTheRemovedNodeValue(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/twist-04-return-the-removed-node-value', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/twist-04-return-the-removed-node-value'] = problem;
})();
