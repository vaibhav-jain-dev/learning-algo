/**
 * Reverse Every Other Node
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 07-reverse-linked-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse Every Other Node',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Reverse only the nodes at odd positions (1st, 3rd, 5th...) while keeping even-positioned nodes in place. Positions are 1-indexed.',
        problem: 'Requires extracting specific nodes, reversing a subset, then interleaving them back in, combining list splitting with reversal and merging.',
        hints: [
            'Reverse only the nodes at odd positions (1st, 3rd, 5th...) while keeping even-positioned nodes in place',
            'Requires extracting specific nodes, reversing a subset, then interleaving them back in, combining list splitting with reversal and merging.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5]: odd-position values [1,3,5] reversed to [5,3,1]. Interleave with even [2,4]: result=[5,2,3,4,1].'
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

def reverse_every_other_node(head, *args):
    """
    Reverse Every Other Node
    Reverse only the nodes at odd positions (1st, 3rd, 5th...) while keeping even-positioned nodes in place. Positions are 1-indexed.

    Approach: Requires extracting specific nodes, reversing a subset, then interleaving them back in, combining list splitting with reversal and merging.
    """
    if not head:
        return head

    # Core algorithm for: Reverse Every Other Node
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
    # Example: list=[1,2,3,4,5]: odd-position values [1,3,5] reversed to [5,3,1]. Interleave with even [2,4]: result=[5,2,3,4,1].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverse_every_other_node(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = reverse_every_other_node(head)
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

// ReverseEveryOtherNode solves: Reverse Every Other Node
// Reverse only the nodes at odd positions (1st, 3rd, 5th...) while keeping even-positioned nodes in place. Positions are 1-indexed.
// Approach: Requires extracting specific nodes, reversing a subset, then interleaving them back in, combining list splitting with reversal and merging.
func ReverseEveryOtherNode(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Reverse Every Other Node
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
    // Example: list=[1,2,3,4,5]: odd-position values [1,3,5] reversed to [5,3,1]. Interleave with even [2,4]: result=[5,2,3,4,1].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReverseEveryOtherNode(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReverseEveryOtherNode(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/twist-02-reverse-every-other-node', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/twist-02-reverse-every-other-node'] = problem;
})();
