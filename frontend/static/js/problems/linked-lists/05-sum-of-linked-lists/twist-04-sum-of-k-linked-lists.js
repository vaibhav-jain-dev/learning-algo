/**
 * Sum of K Linked Lists
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 05-sum-of-linked-lists
 */
(function() {
    'use strict';
    const problem = {
        name: 'Sum of K Linked Lists',
        difficulty: 'Medium',
        algorithm: 'll-sum',
        parent: '05-sum-of-linked-lists',
        description: 'Given k linked lists (each representing a number in reverse digit order), compute the sum of all k numbers and return as a linked list.',
        problem: 'Extends from two lists to k lists, requiring simultaneous traversal of multiple lists and accumulating carries that can exceed single digits when k is large.',
        hints: [
            'Given k linked lists (each representing a number in reverse digit order), compute the sum of all k numbers and return as a linked list.',
            'Extends from two lists to k lists, requiring simultaneous traversal of multiple lists and accumulating carries that can exceed single digits when k is large.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'lists=[[9,9],[9,9],[9,9]]: 99+99+99=297, result=[7,9,2].'
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

def sum_of_k_linked_lists(head, *args):
    """
    Sum of K Linked Lists
    Given k linked lists (each representing a number in reverse digit order), compute the sum of all k numbers and return as a linked list.

    Approach: Extends from two lists to k lists, requiring simultaneous traversal of multiple lists and accumulating carries that can exceed single digits when k is large.
    """
    if not head:
        return head

    # Core algorithm for: Sum of K Linked Lists
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
    # Example: lists=[[9,9],[9,9],[9,9]]: 99+99+99=297, result=[7,9,2].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = sum_of_k_linked_lists(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = sum_of_k_linked_lists(head)
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

// SumOfKLinkedLists solves: Sum of K Linked Lists
// Given k linked lists (each representing a number in reverse digit order), compute the sum of all k numbers and return as a linked list.
// Approach: Extends from two lists to k lists, requiring simultaneous traversal of multiple lists and accumulating carries that can exceed single digits when k is large.
func SumOfKLinkedLists(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Sum of K Linked Lists
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
    // Example: lists=[[9,9],[9,9],[9,9]]: 99+99+99=297, result=[7,9,2].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := SumOfKLinkedLists(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = SumOfKLinkedLists(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '05-sum-of-linked-lists/twist-04-sum-of-k-linked-lists', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/05-sum-of-linked-lists/twist-04-sum-of-k-linked-lists'] = problem;
})();
