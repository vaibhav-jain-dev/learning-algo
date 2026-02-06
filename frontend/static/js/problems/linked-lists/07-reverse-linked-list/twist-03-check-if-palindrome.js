/**
 * Check If Palindrome
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 07-reverse-linked-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Check If Palindrome',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Use linked list reversal as a subroutine to check if a singly linked list is a palindrome in O(n) time and O(1) space.',
        problem: 'Reversal is a tool here, not the goal. You reverse the second half, compare with the first half, then optionally re-reverse to restore the list.',
        hints: [
            'Use linked list reversal as a subroutine to check if a singly linked list is a palindrome in O(n) time and O(1) space.',
            'Reversal is a tool here, not the goal',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,2,1]: reverse second half [2,1] to [1,2]. Compare [1,2,3] with [1,2]: first two match, it is a palindrome.'
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

def check_if_palindrome(head, *args):
    """
    Check If Palindrome
    Use linked list reversal as a subroutine to check if a singly linked list is a palindrome in O(n) time and O(1) space.

    Approach: Reversal is a tool here, not the goal. You reverse the second half, compare with the first half, then optionally re-reverse to restore the list.
    """
    if not head:
        return head

    # Core algorithm for: Check If Palindrome
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
    # Example: list=[1,2,3,2,1]: reverse second half [2,1] to [1,2]. Compare [1,2,3] with [1,2]: first two match, it is a palindrome.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = check_if_palindrome(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = check_if_palindrome(head)
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

// CheckIfPalindrome solves: Check If Palindrome
// Use linked list reversal as a subroutine to check if a singly linked list is a palindrome in O(n) time and O(1) space.
// Approach: Reversal is a tool here, not the goal. You reverse the second half, compare with the first half, then optionally re-reverse to restore the list.
func CheckIfPalindrome(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Check If Palindrome
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
    // Example: list=[1,2,3,2,1]: reverse second half [2,1] to [1,2]. Compare [1,2,3] with [1,2]: first two match, it is a palindrome.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := CheckIfPalindrome(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = CheckIfPalindrome(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/twist-03-check-if-palindrome', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/twist-03-check-if-palindrome'] = problem;
})();
