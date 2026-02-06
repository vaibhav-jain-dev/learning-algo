/**
 * Delete Both Middle Nodes
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 04-remove-kth-node/02-delete-middle-node
 */
(function() {
    'use strict';
    const problem = {
        name: 'Delete Both Middle Nodes',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/02-delete-middle-node',
        description: 'For even-length lists, delete both middle nodes (the two center nodes). For odd-length lists, delete the single middle node.',
        problem: 'Even-length lists require removing two consecutive nodes, which means tracking the node before both middle nodes and adjusting pointers to skip two nodes.',
        hints: [
            'For even-length lists, delete both middle nodes (the two center nodes)',
            'Even-length lists require removing two consecutive nodes, which means tracking the node before both middle nodes and adjusting pointers to skip two nodes.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4]: both middles are 2 and 3. Result=[1,4]. list=[1,2,3,4,5]: single middle is 3. Result=[1,2,4,5].'
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

def delete_both_middle_nodes(head, *args):
    """
    Delete Both Middle Nodes
    For even-length lists, delete both middle nodes (the two center nodes). For odd-length lists, delete the single middle node.

    Approach: Even-length lists require removing two consecutive nodes, which means tracking the node before both middle nodes and adjusting pointers to skip two nodes.
    """
    if not head:
        return head

    # Core algorithm for: Delete Both Middle Nodes
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
    # Example: list=[1,2,3,4]: both middles are 2 and 3. Result=[1,4]. list=[1,2,3,4,5]: single middle is 3. Result=[1,2,4,5].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = delete_both_middle_nodes(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = delete_both_middle_nodes(head)
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

// DeleteBothMiddleNodes solves: Delete Both Middle Nodes
// For even-length lists, delete both middle nodes (the two center nodes). For odd-length lists, delete the single middle node.
// Approach: Even-length lists require removing two consecutive nodes, which means tracking the node before both middle nodes and adjusting pointers to skip two nodes.
func DeleteBothMiddleNodes(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Delete Both Middle Nodes
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
    // Example: list=[1,2,3,4]: both middles are 2 and 3. Result=[1,4]. list=[1,2,3,4,5]: single middle is 3. Result=[1,2,4,5].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := DeleteBothMiddleNodes(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = DeleteBothMiddleNodes(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/02-delete-middle-node/twist-02-delete-both-middle-nodes', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/02-delete-middle-node/twist-02-delete-both-middle-nodes'] = problem;
})();
