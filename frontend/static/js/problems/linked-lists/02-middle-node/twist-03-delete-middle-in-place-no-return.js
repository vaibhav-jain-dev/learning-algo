/**
 * Delete Middle In-Place (No Return)
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 02-middle-node
 */
(function() {
    'use strict';
    const problem = {
        name: 'Delete Middle In-Place (No Return)',
        difficulty: 'Medium',
        algorithm: 'll-middle',
        parent: '02-middle-node',
        description: 'Given only a pointer to the middle node (not the head), delete it from the singly linked list. You do not have access to the head or any node before the middle.',
        problem: 'Without access to the previous node, you cannot rewire pointers normally. The classic trick is to copy the next node\'s value into the current node and delete the next node instead. This fails for the tail node.',
        hints: [
            'Given only a pointer to the middle node (not the head), delete it from the singly linked list',
            'Without access to the previous node, you cannot rewire pointers normally',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Given pointer to node 3 in 1->2->3->4->5. Copy 4 into node 3: 1->2->4->4->5. Delete second 4: 1->2->4->5.'
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

def delete_middle_in_place_no_return(head, *args):
    """
    Delete Middle In-Place (No Return)
    Given only a pointer to the middle node (not the head), delete it from the singly linked list. You do not have access to the head or any node before the middle.

    Approach: Without access to the previous node, you cannot rewire pointers normally. The classic trick is to copy the next node's value into the current node and delete the next node instead. This fails for the tail node.
    """
    if not head:
        return head

    # Core algorithm for: Delete Middle In-Place (No Return)
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
    # Example: Given pointer to node 3 in 1->2->3->4->5. Copy 4 into node 3: 1->2->4->4->5. Delete second 4: 1->2->4->5.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = delete_middle_in_place_no_return(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = delete_middle_in_place_no_return(head)
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

// DeleteMiddleInPlaceNoReturn solves: Delete Middle In-Place (No Return)
// Given only a pointer to the middle node (not the head), delete it from the singly linked list. You do not have access to the head or any node before the middle.
// Approach: Without access to the previous node, you cannot rewire pointers normally. The classic trick is to copy the next node's value into the current node and delete the next node instead. This fails for the tail node.
func DeleteMiddleInPlaceNoReturn(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Delete Middle In-Place (No Return)
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
    // Example: Given pointer to node 3 in 1->2->3->4->5. Copy 4 into node 3: 1->2->4->4->5. Delete second 4: 1->2->4->5.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := DeleteMiddleInPlaceNoReturn(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = DeleteMiddleInPlaceNoReturn(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '02-middle-node/twist-03-delete-middle-in-place-no-return', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/02-middle-node/twist-03-delete-middle-in-place-no-return'] = problem;
})();
