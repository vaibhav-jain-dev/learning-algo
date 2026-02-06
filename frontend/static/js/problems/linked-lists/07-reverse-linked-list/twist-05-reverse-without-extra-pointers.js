/**
 * Reverse Without Extra Pointers
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 07-reverse-linked-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse Without Extra Pointers',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Reverse the linked list using only two pointer variables (not three). You may use XOR or other tricks to avoid the temp/next variable.',
        problem: 'Constraining to two variables forces creative solutions like using XOR swapping or reusing one of the node next fields as temporary storage.',
        hints: [
            'Reverse the linked list using only two pointer variables (not three)',
            'Constraining to two variables forces creative solutions like using XOR swapping or reusing one of the node next fields as temporary storage.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3]: normally need prev, curr, next. With two variables, use curr.next before overwriting it, or use XOR trick to store two values in one.'
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

def reverse_without_extra_pointers(head, *args):
    """
    Reverse Without Extra Pointers
    Reverse the linked list using only two pointer variables (not three). You may use XOR or other tricks to avoid the temp/next variable.

    Approach: Constraining to two variables forces creative solutions like using XOR swapping or reusing one of the node next fields as temporary storage.
    """
    if not head:
        return head

    # Core algorithm for: Reverse Without Extra Pointers
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
    # Example: list=[1,2,3]: normally need prev, curr, next. With two variables, use curr.next before overwriting it, or use XOR trick to store two values in one.
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverse_without_extra_pointers(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = reverse_without_extra_pointers(head)
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

// ReverseWithoutExtraPointers solves: Reverse Without Extra Pointers
// Reverse the linked list using only two pointer variables (not three). You may use XOR or other tricks to avoid the temp/next variable.
// Approach: Constraining to two variables forces creative solutions like using XOR swapping or reusing one of the node next fields as temporary storage.
func ReverseWithoutExtraPointers(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Reverse Without Extra Pointers
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
    // Example: list=[1,2,3]: normally need prev, curr, next. With two variables, use curr.next before overwriting it, or use XOR trick to store two values in one.
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReverseWithoutExtraPointers(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReverseWithoutExtraPointers(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/twist-05-reverse-without-extra-pointers', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/twist-05-reverse-without-extra-pointers'] = problem;
})();
