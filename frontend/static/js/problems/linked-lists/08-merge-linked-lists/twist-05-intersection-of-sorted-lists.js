/**
 * Intersection of Sorted Lists
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 08-merge-linked-lists
 */
(function() {
    'use strict';
    const problem = {
        name: 'Intersection of Sorted Lists',
        difficulty: 'Medium',
        algorithm: 'll-merge',
        parent: '08-merge-linked-lists',
        description: 'Given two sorted linked lists, create a new sorted list containing only the elements that appear in both lists.',
        problem: 'Instead of including all elements, you only include matches. The two-pointer technique advances the smaller pointer until values match, then captures the common element.',
        hints: [
            'Given two sorted linked lists, create a new sorted list containing only the elements that appear in both lists.',
            'Instead of including all elements, you only include matches',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list1=[1,2,3,4,6], list2=[2,4,6,8]: intersection=[2,4,6].'
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

def intersection_of_sorted_lists(head, *args):
    """
    Intersection of Sorted Lists
    Given two sorted linked lists, create a new sorted list containing only the elements that appear in both lists.

    Approach: Instead of including all elements, you only include matches. The two-pointer technique advances the smaller pointer until values match, then captures the common element.
    """
    if not head:
        return head

    # Core algorithm for: Intersection of Sorted Lists
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
    # Example: list1=[1,2,3,4,6], list2=[2,4,6,8]: intersection=[2,4,6].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = intersection_of_sorted_lists(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = intersection_of_sorted_lists(head)
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

// IntersectionOfSortedLists solves: Intersection of Sorted Lists
// Given two sorted linked lists, create a new sorted list containing only the elements that appear in both lists.
// Approach: Instead of including all elements, you only include matches. The two-pointer technique advances the smaller pointer until values match, then captures the common element.
func IntersectionOfSortedLists(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Intersection of Sorted Lists
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
    // Example: list1=[1,2,3,4,6], list2=[2,4,6,8]: intersection=[2,4,6].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := IntersectionOfSortedLists(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = IntersectionOfSortedLists(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '08-merge-linked-lists/twist-05-intersection-of-sorted-lists', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/08-merge-linked-lists/twist-05-intersection-of-sorted-lists'] = problem;
})();
