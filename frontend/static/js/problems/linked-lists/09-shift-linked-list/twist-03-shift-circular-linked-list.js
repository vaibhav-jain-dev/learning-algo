/**
 * Shift Circular Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 09-shift-linked-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Shift Circular Linked List',
        difficulty: 'Medium',
        algorithm: 'll-shift',
        parent: '09-shift-linked-list',
        description: 'The list is already circular. Shift it by k positions and return the new head. The tail already points to the head.',
        problem: 'No need to make the list circular first. You just need to find the new head position, which is (length - k % length) steps from current head, and update head reference.',
        hints: [
            'The list is already circular',
            'No need to make the list circular first',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'circular list=[0,1,2,3,4,5]->(back to 0), k=2: new head is node 4. Result starts at 4: [4,5,0,1,2,3].'
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

def shift_circular_linked_list(head, *args):
    """
    Shift Circular Linked List
    The list is already circular. Shift it by k positions and return the new head. The tail already points to the head.

    Approach: No need to make the list circular first. You just need to find the new head position, which is (length - k % length) steps from current head, and update head reference.
    """
    if not head:
        return head

    # Core algorithm for: Shift Circular Linked List
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
    # Example: circular list=[0,1,2,3,4,5]->(back to 0), k=2: new head is node 4. Result starts at 4: [4,5,0,1,2,3].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = shift_circular_linked_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = shift_circular_linked_list(head)
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

// ShiftCircularLinkedList solves: Shift Circular Linked List
// The list is already circular. Shift it by k positions and return the new head. The tail already points to the head.
// Approach: No need to make the list circular first. You just need to find the new head position, which is (length - k % length) steps from current head, and update head reference.
func ShiftCircularLinkedList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Shift Circular Linked List
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
    // Example: circular list=[0,1,2,3,4,5]->(back to 0), k=2: new head is node 4. Result starts at 4: [4,5,0,1,2,3].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ShiftCircularLinkedList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ShiftCircularLinkedList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '09-shift-linked-list/twist-03-shift-circular-linked-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/09-shift-linked-list/twist-03-shift-circular-linked-list'] = problem;
})();
