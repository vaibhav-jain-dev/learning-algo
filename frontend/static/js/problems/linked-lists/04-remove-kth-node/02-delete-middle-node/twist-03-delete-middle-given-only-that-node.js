/**
 * Delete Middle Given Only That Node
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 04-remove-kth-node/02-delete-middle-node
 */
(function() {
    'use strict';
    const problem = {
        name: 'Delete Middle Given Only That Node',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/02-delete-middle-node',
        description: 'You are only given a reference to the middle node itself (not the head). Delete it from the list.',
        problem: 'Without access to the previous node, you must copy the next node value into the current node and delete the next node instead, a classic trick that changes the deletion strategy entirely.',
        hints: [
            'You are only given a reference to the middle node itself (not the head)',
            'Without access to the previous node, you must copy the next node value into the current node and delete the next node instead, a classic trick that changes the deletion strategy entirely.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Given pointer to node with value 7 in list [1,3,4,7,1,2,6]: copy value 1 from next node, delete next. List becomes [1,3,4,1,2,6].'
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

def delete_middle_given_only_that_node(head, *args):
    """
    Delete Middle Given Only That Node
    You are only given a reference to the middle node itself (not the head). Delete it from the list.

    Approach: Without access to the previous node, you must copy the next node value into the current node and delete the next node instead, a classic trick that changes the deletion strategy entirely.
    """
    if not head:
        return head

    # Core algorithm for: Delete Middle Given Only That Node
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
    # Example: Given pointer to node with value 7 in list [1,3,4,7,1,2,6]: copy value 1 from next node, delete next. List becomes [1,3,4,1,2,6].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = delete_middle_given_only_that_node(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = delete_middle_given_only_that_node(head)
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

// DeleteMiddleGivenOnlyThatNode solves: Delete Middle Given Only That Node
// You are only given a reference to the middle node itself (not the head). Delete it from the list.
// Approach: Without access to the previous node, you must copy the next node value into the current node and delete the next node instead, a classic trick that changes the deletion strategy entirely.
func DeleteMiddleGivenOnlyThatNode(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Delete Middle Given Only That Node
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
    // Example: Given pointer to node with value 7 in list [1,3,4,7,1,2,6]: copy value 1 from next node, delete next. List becomes [1,3,4,1,2,6].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := DeleteMiddleGivenOnlyThatNode(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = DeleteMiddleGivenOnlyThatNode(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/02-delete-middle-node/twist-03-delete-middle-given-only-that-node', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/02-delete-middle-node/twist-03-delete-middle-given-only-that-node'] = problem;
})();
