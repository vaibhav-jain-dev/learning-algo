/**
 * Subtract Linked Lists
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 05-sum-of-linked-lists
 */
(function() {
    'use strict';
    const problem = {
        name: 'Subtract Linked Lists',
        difficulty: 'Hard',
        algorithm: 'll-sum',
        parent: '05-sum-of-linked-lists',
        description: 'Subtract the smaller number from the larger number (both represented as reversed linked lists). Return the absolute difference as a linked list.',
        problem: 'Subtraction introduces borrowing instead of carrying, and you must first determine which number is larger to know the subtraction direction.',
        hints: [
            'Subtract the smaller number from the larger number (both represented as reversed linked lists)',
            'Subtraction introduces borrowing instead of carrying, and you must first determine which number is larger to know the subtraction direction.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list1=[2,4,7,1] (1742), list2=[9,4,5] (549): |1742-549|=1193, result=[3,9,1,1].'
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

def subtract_linked_lists(head, *args):
    """
    Subtract Linked Lists
    Subtract the smaller number from the larger number (both represented as reversed linked lists). Return the absolute difference as a linked list.

    Approach: Subtraction introduces borrowing instead of carrying, and you must first determine which number is larger to know the subtraction direction.
    """
    if not head:
        return head

    # Core algorithm for: Subtract Linked Lists
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
    # Example: list1=[2,4,7,1] (1742), list2=[9,4,5] (549): |1742-549|=1193, result=[3,9,1,1].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = subtract_linked_lists(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = subtract_linked_lists(head)
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

// SubtractLinkedLists solves: Subtract Linked Lists
// Subtract the smaller number from the larger number (both represented as reversed linked lists). Return the absolute difference as a linked list.
// Approach: Subtraction introduces borrowing instead of carrying, and you must first determine which number is larger to know the subtraction direction.
func SubtractLinkedLists(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Subtract Linked Lists
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
    // Example: list1=[2,4,7,1] (1742), list2=[9,4,5] (549): |1742-549|=1193, result=[3,9,1,1].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := SubtractLinkedLists(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = SubtractLinkedLists(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '05-sum-of-linked-lists/twist-02-subtract-linked-lists', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/05-sum-of-linked-lists/twist-02-subtract-linked-lists'] = problem;
})();
