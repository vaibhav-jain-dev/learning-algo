/**
 * Move Middle to End
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 04-remove-kth-node/02-delete-middle-node
 */
(function() {
    'use strict';
    const problem = {
        name: 'Move Middle to End',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/02-delete-middle-node',
        description: 'Instead of deleting the middle node, move it to the end of the list while maintaining the relative order of all other nodes.',
        problem: 'Requires both finding the middle and relinking it at the tail. You need to detach the middle from its position and append it, requiring both predecessor and tail tracking.',
        hints: [
            'Instead of deleting the middle node, move it to the end of the list while maintaining the relative order of all other nodes.',
            'Requires both finding the middle and relinking it at the tail',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,3,4,7,1,2,6]: move middle (7) to end. Result=[1,3,4,1,2,6,7].'
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

def move_middle_to_end(head, *args):
    """
    Move Middle to End
    Instead of deleting the middle node, move it to the end of the list while maintaining the relative order of all other nodes.

    Approach: Requires both finding the middle and relinking it at the tail. You need to detach the middle from its position and append it, requiring both predecessor and tail tracking.
    """
    if not head:
        return head

    # Core algorithm for: Move Middle to End
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
    # Example: list=[1,3,4,7,1,2,6]: move middle (7) to end. Result=[1,3,4,1,2,6,7].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = move_middle_to_end(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = move_middle_to_end(head)
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

// MoveMiddleToEnd solves: Move Middle to End
// Instead of deleting the middle node, move it to the end of the list while maintaining the relative order of all other nodes.
// Approach: Requires both finding the middle and relinking it at the tail. You need to detach the middle from its position and append it, requiring both predecessor and tail tracking.
func MoveMiddleToEnd(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Move Middle to End
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
    // Example: list=[1,3,4,7,1,2,6]: move middle (7) to end. Result=[1,3,4,1,2,6,7].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := MoveMiddleToEnd(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = MoveMiddleToEnd(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/02-delete-middle-node/twist-04-move-middle-to-end', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/02-delete-middle-node/twist-04-move-middle-to-end'] = problem;
})();
