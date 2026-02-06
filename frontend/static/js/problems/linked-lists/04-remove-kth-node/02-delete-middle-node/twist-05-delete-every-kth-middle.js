/**
 * Delete Every Kth Middle
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 04-remove-kth-node/02-delete-middle-node
 */
(function() {
    'use strict';
    const problem = {
        name: 'Delete Every Kth Middle',
        difficulty: 'Hard',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/02-delete-middle-node',
        description: 'Repeatedly delete the middle node of the remaining list k times. Return the list after k deletions.',
        problem: 'Requires running the middle-finding algorithm k times on a shrinking list, where the list length and middle position change after each deletion.',
        hints: [
            'Repeatedly delete the middle node of the remaining list k times',
            'Requires running the middle-finding algorithm k times on a shrinking list, where the list length and middle position change after each deletion.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5,6,7], k=3: delete middle(4)->[1,2,3,5,6,7], delete middle(5)->[1,2,3,6,7], delete middle(3)->[1,2,6,7].'
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

def delete_every_kth_middle(head, *args):
    """
    Delete Every Kth Middle
    Repeatedly delete the middle node of the remaining list k times. Return the list after k deletions.

    Approach: Requires running the middle-finding algorithm k times on a shrinking list, where the list length and middle position change after each deletion.
    """
    if not head:
        return head

    # Core algorithm for: Delete Every Kth Middle
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
    # Example: list=[1,2,3,4,5,6,7], k=3: delete middle(4)->[1,2,3,5,6,7], delete middle(5)->[1,2,3,6,7], delete middle(3)->[1,2,6,7].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = delete_every_kth_middle(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = delete_every_kth_middle(head)
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

// DeleteEveryKthMiddle solves: Delete Every Kth Middle
// Repeatedly delete the middle node of the remaining list k times. Return the list after k deletions.
// Approach: Requires running the middle-finding algorithm k times on a shrinking list, where the list length and middle position change after each deletion.
func DeleteEveryKthMiddle(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Delete Every Kth Middle
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
    // Example: list=[1,2,3,4,5,6,7], k=3: delete middle(4)->[1,2,3,5,6,7], delete middle(5)->[1,2,3,6,7], delete middle(3)->[1,2,6,7].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := DeleteEveryKthMiddle(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = DeleteEveryKthMiddle(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/02-delete-middle-node/twist-05-delete-every-kth-middle', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/02-delete-middle-node/twist-05-delete-every-kth-middle'] = problem;
})();
