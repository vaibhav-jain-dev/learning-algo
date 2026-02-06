/**
 * Dutch National Flag on Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Parent: 11-rearrange-linked-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Dutch National Flag on Linked List',
        difficulty: 'Medium',
        algorithm: 'll-rearrange',
        parent: '11-rearrange-linked-list',
        description: 'The list contains only values 0, 1, and 2. Sort it in O(n) time and O(1) space by partitioning into three groups (all 0s, then 1s, then 2s).',
        problem: 'A constrained version of the partition problem with exactly three known values. Can use three pointer heads and append each node to the appropriate list.',
        hints: [
            'The list contains only values 0, 1, and 2',
            'A constrained version of the partition problem with exactly three known values',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[2,0,1,2,1,0]: rearrange to [0,0,1,1,2,2].'
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

def dutch_national_flag_on_linked_list(head, *args):
    """
    Dutch National Flag on Linked List
    The list contains only values 0, 1, and 2. Sort it in O(n) time and O(1) space by partitioning into three groups (all 0s, then 1s, then 2s).

    Approach: A constrained version of the partition problem with exactly three known values. Can use three pointer heads and append each node to the appropriate list.
    """
    if not head:
        return head

    # Core algorithm for: Dutch National Flag on Linked List
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
    # Example: list=[2,0,1,2,1,0]: rearrange to [0,0,1,1,2,2].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = dutch_national_flag_on_linked_list(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = dutch_national_flag_on_linked_list(head)
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

// DutchNationalFlagOnLinkedList solves: Dutch National Flag on Linked List
// The list contains only values 0, 1, and 2. Sort it in O(n) time and O(1) space by partitioning into three groups (all 0s, then 1s, then 2s).
// Approach: A constrained version of the partition problem with exactly three known values. Can use three pointer heads and append each node to the appropriate list.
func DutchNationalFlagOnLinkedList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Dutch National Flag on Linked List
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
    // Example: list=[2,0,1,2,1,0]: rearrange to [0,0,1,1,2,2].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := DutchNationalFlagOnLinkedList(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = DutchNationalFlagOnLinkedList(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '11-rearrange-linked-list/twist-04-dutch-national-flag-on-linked-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/11-rearrange-linked-list/twist-04-dutch-national-flag-on-linked-list'] = problem;
})();
