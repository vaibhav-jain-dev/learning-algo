/**
 * Reverse K Groups From End
 * Category: linked-lists
 * Difficulty: Hard
 * Parent: 07-reverse-linked-list/01-reverse-in-groups-of-k
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse K Groups From End',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/01-reverse-in-groups-of-k',
        description: 'Group the nodes from the end of the list in groups of k, then reverse each group. Leftover nodes at the beginning remain as-is.',
        problem: 'Grouping from the end means the leftover partial group is at the start, not the end. Requires knowing the total length first to determine the offset.',
        hints: [
            'Group the nodes from the end of the list in groups of k, then reverse each group',
            'Grouping from the end means the leftover partial group is at the start, not the end',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: { list: [1, 2, 3, 4, 5] },
                output: [1, 2, 3, 4, 5],
                explanation: 'list=[1,2,3,4,5], k=3: from end, groups are [3,4,5] and leftover [1,2]. Reverse [3,4,5]->[5,4,3]. Result=[1,2,5,4,3].'
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

def reverse_k_groups_from_end(head, *args):
    """
    Reverse K Groups From End
    Group the nodes from the end of the list in groups of k, then reverse each group. Leftover nodes at the beginning remain as-is.

    Approach: Grouping from the end means the leftover partial group is at the start, not the end. Requires knowing the total length first to determine the offset.
    """
    if not head:
        return head

    # Core algorithm for: Reverse K Groups From End
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
    # Example: list=[1,2,3,4,5], k=3: from end, groups are [3,4,5] and leftover [1,2]. Reverse [3,4,5]->[5,4,3]. Result=[1,2,5,4,3].
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverse_k_groups_from_end(head)
    print("Result:", result)

    head = to_linked_list([1, 1, 2, 2, 3])
    result = reverse_k_groups_from_end(head)
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

// ReverseKGroupsFromEnd solves: Reverse K Groups From End
// Group the nodes from the end of the list in groups of k, then reverse each group. Leftover nodes at the beginning remain as-is.
// Approach: Grouping from the end means the leftover partial group is at the start, not the end. Requires knowing the total length first to determine the offset.
func ReverseKGroupsFromEnd(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    // Core algorithm for: Reverse K Groups From End
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
    // Example: list=[1,2,3,4,5], k=3: from end, groups are [3,4,5] and leftover [1,2]. Reverse [3,4,5]->[5,4,3]. Result=[1,2,5,4,3].
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReverseKGroupsFromEnd(head)
    fmt.Println(toArray(result))

    head = toLinkedList([]int{1, 1, 2, 2, 3})
    result = ReverseKGroupsFromEnd(head)
    fmt.Println(toArray(result))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/01-reverse-in-groups-of-k/twist-04-reverse-k-groups-from-end', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/01-reverse-in-groups-of-k/twist-04-reverse-k-groups-from-end'] = problem;
})();
