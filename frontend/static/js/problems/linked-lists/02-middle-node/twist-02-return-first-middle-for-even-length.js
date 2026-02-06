/**
 * Return First Middle for Even Length
 * Category: linked-lists
 * Difficulty: Easy
 * Parent: 02-middle-node
 */
(function() {
    'use strict';
    const problem = {
        name: 'Return First Middle for Even Length',
        difficulty: 'Easy',
        algorithm: 'll-middle',
        parent: '02-middle-node',
        description: 'If the list has even length, return the FIRST of the two middle nodes instead of the second. Adjust the slow/fast pointer approach accordingly.',
        problem: 'The standard approach returns the second middle because slow advances once per two fast steps. To get the first middle, you must either start fast one step ahead or use a prev pointer, subtly changing the pointer dance.',
        hints: [
            'If the list has even length, return the FIRST of the two middle nodes instead of the second',
            'The standard approach returns the second middle because slow advances once per two fast steps',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'Input: 1->2->3->4->5->6. Two middles: 3 and 4. Standard returns 4. This twist returns 3.'
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

def return_first_middle_for_even_length(head, *args):
    """
    Return First Middle for Even Length
    If the list has even length, return the FIRST of the two middle nodes instead of the second. Adjust the slow/fast pointer approach accordingly.

    Approach: The standard approach returns the second middle because slow advances once per two fast steps. To get the first middle, you must either start fast one step ahead or use a prev pointer, subtly changing the pointer dance.
    """
    if not head:
        return head

    # Core algorithm for: Return First Middle for Even Length
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
    # Example: Input: 1->2->3->4->5->6. Two middles: 3 and 4. Standard returns 4. This twist returns 3.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = return_first_middle_for_even_length(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = return_first_middle_for_even_length(head)
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

// ReturnFirstMiddleForEvenLength solves: Return First Middle for Even Length
// If the list has even length, return the FIRST of the two middle nodes instead of the second. Adjust the slow/fast pointer approach accordingly.
// Approach: The standard approach returns the second middle because slow advances once per two fast steps. To get the first middle, you must either start fast one step ahead or use a prev pointer, subtly changing the pointer dance.
func ReturnFirstMiddleForEvenLength(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Return First Middle for Even Length
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
    // Example: Input: 1->2->3->4->5->6. Two middles: 3 and 4. Standard returns 4. This twist returns 3.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReturnFirstMiddleForEvenLength(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReturnFirstMiddleForEvenLength(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '02-middle-node/twist-02-return-first-middle-for-even-length', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/02-middle-node/twist-02-return-first-middle-for-even-length'] = problem;
})();
