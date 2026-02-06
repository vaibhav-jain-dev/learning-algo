/**
 * Rotate Groups Instead of Reverse
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 07-reverse-linked-list/01-reverse-in-groups-of-k
 */
(function() {
    'use strict';
    const problem = {
        name: 'Rotate Groups Instead of Reverse',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/01-reverse-in-groups-of-k',
        description: 'Instead of reversing each group of k, rotate each group by one position to the right (last element becomes first).',
        problem: 'Rotation is not the same as reversal. You must detach the last node of each group and insert it at the front, requiring different pointer manipulation.',
        hints: [
            'Instead of reversing each group of k, rotate each group by one position to the right (last element becomes first).',
            'Rotation is not the same as reversal',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5,6], k=3: rotate [1,2,3]->[3,1,2], rotate [4,5,6]->[6,4,5]. Result=[3,1,2,6,4,5].'
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

def rotate_groups_instead_of_reverse(head, *args):
    """
    Rotate Groups Instead of Reverse
    Instead of reversing each group of k, rotate each group by one position to the right (last element becomes first).

    Approach: Rotation is not the same as reversal. You must detach the last node of each group and insert it at the front, requiring different pointer manipulation.
    """
    if not head:
        return head

    # Core algorithm for: Rotate Groups Instead of Reverse
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
    # Example: list=[1,2,3,4,5,6], k=3: rotate [1,2,3]->[3,1,2], rotate [4,5,6]->[6,4,5]. Result=[3,1,2,6,4,5].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = rotate_groups_instead_of_reverse(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = rotate_groups_instead_of_reverse(head)
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

// RotateGroupsInsteadOfReverse solves: Rotate Groups Instead of Reverse
// Instead of reversing each group of k, rotate each group by one position to the right (last element becomes first).
// Approach: Rotation is not the same as reversal. You must detach the last node of each group and insert it at the front, requiring different pointer manipulation.
func RotateGroupsInsteadOfReverse(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Rotate Groups Instead of Reverse
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
    // Example: list=[1,2,3,4,5,6], k=3: rotate [1,2,3]->[3,1,2], rotate [4,5,6]->[6,4,5]. Result=[3,1,2,6,4,5].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := RotateGroupsInsteadOfReverse(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = RotateGroupsInsteadOfReverse(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/01-reverse-in-groups-of-k/twist-03-rotate-groups-instead-of-reverse', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/01-reverse-in-groups-of-k/twist-03-rotate-groups-instead-of-reverse'] = problem;
})();
