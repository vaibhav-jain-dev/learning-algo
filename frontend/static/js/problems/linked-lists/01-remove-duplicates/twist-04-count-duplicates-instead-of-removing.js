/**
 * Count Duplicates Instead of Removing
 * Category: linked-lists
 * Difficulty: Easy
 * Parent: 01-remove-duplicates
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Duplicates Instead of Removing',
        difficulty: 'Easy',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'Instead of modifying the list, return a count of how many duplicate nodes would be removed without actually removing them. Do this in O(1) space.',
        problem: 'Shifts the focus from pointer manipulation to pure counting logic. You still traverse the same way but the mental model changes from "rewiring" to "tallying."',
        hints: [
            'Instead of modifying the list, return a count of how many duplicate nodes would be removed without actually removing them',
            'Shifts the focus from pointer manipulation to pure counting logic',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: 1->1->3->4->4->4->5->6->6 => Output: 4 (four nodes would be removed).'
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

def count_duplicates_instead_of_removing(head, *args):
    """
    Count Duplicates Instead of Removing
    Instead of modifying the list, return a count of how many duplicate nodes would be removed without actually removing them. Do this in O(1) space.

    Approach: Shifts the focus from pointer manipulation to pure counting logic. You still traverse the same way but the mental model changes from "rewiring" to "tallying."
    """
    if not head:
        return head

    # Core algorithm for: Count Duplicates Instead of Removing
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
    # Example: Input: 1->1->3->4->4->4->5->6->6 => Output: 4 (four nodes would be removed).
    head = to_linked_list([1, 2, 3, 4, 5])
    result = count_duplicates_instead_of_removing(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = count_duplicates_instead_of_removing(head)
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

// CountDuplicatesInsteadOfRemoving solves: Count Duplicates Instead of Removing
// Instead of modifying the list, return a count of how many duplicate nodes would be removed without actually removing them. Do this in O(1) space.
// Approach: Shifts the focus from pointer manipulation to pure counting logic. You still traverse the same way but the mental model changes from "rewiring" to "tallying."
func CountDuplicatesInsteadOfRemoving(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Count Duplicates Instead of Removing
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
    // Example: Input: 1->1->3->4->4->4->5->6->6 => Output: 4 (four nodes would be removed).
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := CountDuplicatesInsteadOfRemoving(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = CountDuplicatesInsteadOfRemoving(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/twist-04-count-duplicates-instead-of-removing', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/twist-04-count-duplicates-instead-of-removing'] = problem;
})();
