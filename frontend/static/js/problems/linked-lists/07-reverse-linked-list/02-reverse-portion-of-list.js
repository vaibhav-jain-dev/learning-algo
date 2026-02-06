/**
 * Reverse Linked List II (Reverse Portion)
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-reverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Linked List II (Reverse Portion)',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list. Positions are 1-indexed.',
        problem: 'Reverse links by maintaining three pointers: prev, curr, next. For each node, save next, point curr to prev, then advance. Handle edge cases for empty or single-node lists.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Use three pointers: previous, current, and next.',
            'Save the next node before changing the current link.',
            'Move all pointers forward after reversing each link.',
            'The new head is the last non-null current pointer.',
            'Consider recursive approach for cleaner code.'
        ],
        examples: [
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5
        ],
        "left": 2,
        "right": 4
},
        output: [1, 4, 3, 2, 5],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], left=2, right=4, the result is [1, 4, 3, 2, 5].'
    },
    {
        input: {
        "list": [
                5
        ],
        "left": 1,
        "right": 1
},
        output: [5],
        explanation: 'Processing the input data produces the output. For input list=[5], left=1, right=1, the result is [5].'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5
        ],
        "left": 1,
        "right": 5
},
        output: [5, 4, 3, 2, 1],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], left=1, right=5, the result is [5, 4, 3, 2, 1].'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5
        ],
        "left": 3,
        "right": 4
},
        output: [1, 2, 4, 3, 5],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], left=3, right=4, the result is [1, 2, 4, 3, 5].'
    }
        ],
        solutions: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseLinkedListIiReversePortion(head, left, right):
    """
    Reverse Linked List II (Reverse Portion)
    Reverse nodes from position left to right (1-indexed).

    Time: O(n)
    Space: O(1)
    """
    if not head or left == right:
        return head

    # Use dummy node for edge case when left=1
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy

    # Move prev to node just before position left
    for _ in range(left - 1):
        prev = prev.next

    # Start reversing from position left
    # prev points to node before left
    # current points to node at position left
    current = prev.next

    # Reverse nodes from left to right using insertion method
    # For each iteration, take the node after current and insert it after prev
    for _ in range(right - left):
        # Node to move
        node_to_move = current.next

        # Remove node_to_move from its position
        current.next = node_to_move.next

        # Insert node_to_move right after prev
        node_to_move.next = prev.next
        prev.next = node_to_move

    return dummy.next


# Alternative: Classic reverse approach
def reverseBetweenClassic(head, left, right):
    """
    Time: O(n), Space: O(1)
    """
    if not head or left == right:
        return head

    dummy = ListNode(0)
    dummy.next = head
    prev = dummy

    # Move to position before left
    for _ in range(left - 1):
        prev = prev.next

    # Reverse the sublist
    reverse_start = prev.next
    current = reverse_start
    rev_prev = None

    for _ in range(right - left + 1):
        next_node = current.next
        current.next = rev_prev
        rev_prev = current
        current = next_node

    # Connect the reversed portion
    prev.next = rev_prev  # Connect before to new head
    reverse_start.next = current  # Connect old head (now tail) to after

    return dummy.next


# Helper functions
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
    # Test case 1: [1,2,3,4,5], left=2, right=4 -> [1,4,3,2,5]
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverseLinkedListIiReversePortion(head, 2, 4)
    print(to_array(result))  # [1, 4, 3, 2, 5]

    # Test case 2: [1,2,3,4,5], left=1, right=5 -> [5,4,3,2,1]
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverseLinkedListIiReversePortion(head, 1, 5)
    print(to_array(result))  # [5, 4, 3, 2, 1]`,
            go: `package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

// ReverseLinkedListIiReversePortion reverses from position left to right.
// Time: O(n), Space: O(1)
func ReverseLinkedListIiReversePortion(head *ListNode, left int, right int) *ListNode {
    if head == nil || left == right {
        return head
    }

    // Use dummy node for edge case when left=1
    dummy := &ListNode{Val: 0, Next: head}
    prev := dummy

    // Move prev to node just before position left
    for i := 0; i < left-1; i++ {
        prev = prev.Next
    }

    // Start reversing from position left
    current := prev.Next

    // Reverse using insertion method
    for i := 0; i < right-left; i++ {
        // Node to move
        nodeToMove := current.Next

        // Remove nodeToMove from its position
        current.Next = nodeToMove.Next

        // Insert nodeToMove right after prev
        nodeToMove.Next = prev.Next
        prev.Next = nodeToMove
    }

    return dummy.Next
}

// ReverseBetweenClassic uses classic reverse approach.
// Time: O(n), Space: O(1)
func ReverseBetweenClassic(head *ListNode, left int, right int) *ListNode {
    if head == nil || left == right {
        return head
    }

    dummy := &ListNode{Val: 0, Next: head}
    prev := dummy

    // Move to position before left
    for i := 0; i < left-1; i++ {
        prev = prev.Next
    }

    // Reverse the sublist
    reverseStart := prev.Next
    current := reverseStart
    var revPrev *ListNode

    for i := 0; i < right-left+1; i++ {
        nextNode := current.Next
        current.Next = revPrev
        revPrev = current
        current = nextNode
    }

    // Connect the reversed portion
    prev.Next = revPrev           // Connect before to new head
    reverseStart.Next = current   // Connect old head (now tail) to after

    return dummy.Next
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
    // Test case: [1,2,3,4,5], left=2, right=4 -> [1,4,3,2,5]
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReverseLinkedListIiReversePortion(head, 2, 4)
    fmt.Println(toArray(result)) // [1 4 3 2 5]
}`
        },
        twists: [
            { id: '07-reverse-linked-list/02-reverse-portion-of-list/twist-01-reverse-two-separate-portions', name: 'Reverse Two Separate Portions', difficulty: 'Hard' },
            { id: '07-reverse-linked-list/02-reverse-portion-of-list/twist-02-reverse-portion-by-values', name: 'Reverse Portion by Values', difficulty: 'Medium' },
            { id: '07-reverse-linked-list/02-reverse-portion-of-list/twist-03-reverse-portion-and-sort-rest', name: 'Reverse Portion and Sort Rest', difficulty: 'Hard' },
            { id: '07-reverse-linked-list/02-reverse-portion-of-list/twist-04-cyclically-shift-portion', name: 'Cyclically Shift Portion', difficulty: 'Medium' },
            { id: '07-reverse-linked-list/02-reverse-portion-of-list/twist-05-reverse-portion-in-doubly-linked-list', name: 'Reverse Portion in Doubly Linked List', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/02-reverse-portion-of-list', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/02-reverse-portion-of-list'] = problem;

})();
