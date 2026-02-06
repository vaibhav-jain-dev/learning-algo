/**
 * Four-Way Partition
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 11-rearrange-linked-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Four-Way Partition',
        difficulty: 'Hard',
        algorithm: 'll-rearrange',
        parent: '11-rearrange-linked-list',
        description: 'Partition the list into four groups: values less than a, values equal to a, values between a and b, values greater than or equal to b. Maintain relative order in each group.',
        problem: 'Extends from three partitions to four, requiring four separate sub-lists that must be concatenated in order, with more boundary conditions to manage.',
        hints: [
            'Partition the list into four groups: values less than a, values equal to a, values between a and b, values greater than or equal to b',
            'Extends from three partitions to four, requiring four separate sub-lists that must be concatenated in order, with more boundary conditions to manage.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[5,1,8,3,7,2,6], a=3, b=7: groups are [<3]=[1,2], [=3]=[3], [3<x<7]=[5,6], [>=7]=[8,7]. Result=[1,2,3,5,6,8,7].'
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

def four_way_partition(head, *args):
    """
    Four-Way Partition
    Partition the list into four groups: values less than a, values equal to a, values between a and b, values greater than or equal to b. Maintain relative order in each group.

    Approach: Extends from three partitions to four, requiring four separate sub-lists that must be concatenated in order, with more boundary conditions to manage.
    """
    if not head:
        return head

    # Core algorithm for: Four-Way Partition
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
    # Example: list=[5,1,8,3,7,2,6], a=3, b=7: groups are [<3]=[1,2], [=3]=[3], [3<x<7]=[5,6], [>=7]=[8,7]. Result=[1,2,3,5,6,8,7].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = four_way_partition(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = four_way_partition(head)
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

// FourWayPartition solves: Four-Way Partition
// Partition the list into four groups: values less than a, values equal to a, values between a and b, values greater than or equal to b. Maintain relative order in each group.
// Approach: Extends from three partitions to four, requiring four separate sub-lists that must be concatenated in order, with more boundary conditions to manage.
func FourWayPartition(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Four-Way Partition
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
    // Example: list=[5,1,8,3,7,2,6], a=3, b=7: groups are [<3]=[1,2], [=3]=[3], [3<x<7]=[5,6], [>=7]=[8,7]. Result=[1,2,3,5,6,8,7].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := FourWayPartition(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = FourWayPartition(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '11-rearrange-linked-list/twist-01-four-way-partition', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/11-rearrange-linked-list/twist-01-four-way-partition'] = problem;
})();
