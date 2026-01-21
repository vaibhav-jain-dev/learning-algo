/**
 * Reverse Alternating K Nodes
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Alternating K Nodes',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Given the head of a linked list and an integer k, reverse the first k nodes, then skip the next k nodes, then reverse the next k nodes, and so on. If there are fewer than k nodes remaining (either for reversing or skipping), handle them accordingly: - If reversing: reverse all remaining nodes - If skipping: skip all remaining nodes',
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
                5,
                6,
                7,
                8
        ],
        "k": 2
},
        output: [2, 1, 3, 4, 6, 5, 7, 8],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, ..., 8] (length 8), k=2, the result is [2, ..., 8] (length 8).'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
        ],
        "k": 3
},
        output: [3, 2, 1, 4, 5, 6, 9, 8, 7, 10],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, ..., 10] (length 10), k=3, the result is [3, ..., 10] (length 10).'
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
        "k": 3
},
        output: [3, 2, 1, 4, 5],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], k=3, the result is [3, 2, 1, 4, 5].'
    }
        ],
        solutions: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseAlternatingKNodes(head, k):
    """
    Reverse Alternating K Nodes
    Reverse first k nodes, skip next k nodes, repeat.

    Time: O(n)
    Space: O(1)
    """
    if not head or k <= 1:
        return head

    dummy = ListNode(0)
    dummy.next = head
    prev_group_end = dummy
    current = head
    should_reverse = True

    while current:
        if should_reverse:
            # Reverse next k nodes (or all remaining if less than k)
            group_start = current
            prev = None
            count = 0

            while current and count < k:
                next_node = current.next
                current.next = prev
                prev = current
                current = next_node
                count += 1

            # Connect with previous part
            prev_group_end.next = prev  # prev is new head of reversed group
            group_start.next = current  # group_start is now tail

            # Move prev_group_end to end of this group
            prev_group_end = group_start

        else:
            # Skip next k nodes (don't reverse)
            count = 0
            while current and count < k:
                prev_group_end = current
                current = current.next
                count += 1

        # Toggle for next iteration
        should_reverse = not should_reverse

    return dummy.next


# Recursive approach
def reverseAlternatingKNodesRecursive(head, k):
    """
    Time: O(n), Space: O(n/k) for recursion
    """
    if not head or k <= 1:
        return head

    # Reverse first k nodes
    current = head
    prev = None
    count = 0

    while current and count < k:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
        count += 1

    # head is now tail of reversed portion
    # Skip next k nodes
    head.next = current
    skip_tail = head

    count = 0
    while current and count < k - 1:
        current = current.next
        count += 1

    if current:
        skip_tail = current
        current = current.next

    # Recursively process remaining
    if skip_tail:
        skip_tail.next = reverseAlternatingKNodesRecursive(current, k)

    return prev


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
    # Test case 1: [1,2,3,4,5,6,7,8], k=2 -> [2,1,3,4,6,5,7,8]
    head = to_linked_list([1, 2, 3, 4, 5, 6, 7, 8])
    result = reverseAlternatingKNodes(head, 2)
    print(to_array(result))  # [2, 1, 3, 4, 6, 5, 7, 8]

    # Test case 2: [1,2,3,4,5,6,7,8,9,10], k=3 -> [3,2,1,4,5,6,9,8,7,10]
    head = to_linked_list([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    result = reverseAlternatingKNodes(head, 3)
    print(to_array(result))  # [3, 2, 1, 4, 5, 6, 9, 8, 7, 10]`,
            go: `package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

// ReverseAlternatingKNodes reverses alternating groups of k nodes.
// Time: O(n), Space: O(1)
func ReverseAlternatingKNodes(head *ListNode, k int) *ListNode {
    if head == nil || k <= 1 {
        return head
    }

    dummy := &ListNode{Val: 0, Next: head}
    prevGroupEnd := dummy
    current := head
    shouldReverse := true

    for current != nil {
        if shouldReverse {
            // Reverse next k nodes
            groupStart := current
            var prev *ListNode
            count := 0

            for current != nil && count < k {
                nextNode := current.Next
                current.Next = prev
                prev = current
                current = nextNode
                count++
            }

            // Connect with previous part
            prevGroupEnd.Next = prev      // prev is new head
            groupStart.Next = current     // groupStart is now tail

            // Move prevGroupEnd to end of this group
            prevGroupEnd = groupStart

        } else {
            // Skip next k nodes
            count := 0
            for current != nil && count < k {
                prevGroupEnd = current
                current = current.Next
                count++
            }
        }

        // Toggle for next iteration
        shouldReverse = !shouldReverse
    }

    return dummy.Next
}

// ReverseAlternatingKNodesRecursive uses recursion.
// Time: O(n), Space: O(n/k)
func ReverseAlternatingKNodesRecursive(head *ListNode, k int) *ListNode {
    if head == nil || k <= 1 {
        return head
    }

    // Reverse first k nodes
    current := head
    var prev *ListNode
    count := 0

    for current != nil && count < k {
        nextNode := current.Next
        current.Next = prev
        prev = current
        current = nextNode
        count++
    }

    // head is now tail of reversed portion
    // Skip next k nodes
    head.Next = current
    skipTail := head

    count = 0
    for current != nil && count < k-1 {
        current = current.Next
        count++
    }

    if current != nil {
        skipTail = current
        current = current.Next
    }

    // Recursively process remaining
    if skipTail != nil {
        skipTail.Next = ReverseAlternatingKNodesRecursive(current, k)
    }

    return prev
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
    // Test case: [1,2,3,4,5,6,7,8], k=2 -> [2,1,3,4,6,5,7,8]
    head := toLinkedList([]int{1, 2, 3, 4, 5, 6, 7, 8})
    result := ReverseAlternatingKNodes(head, 2)
    fmt.Println(toArray(result)) // [2 1 3 4 6 5 7 8]
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/03-reverse-alternating-k-nodes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/03-reverse-alternating-k-nodes'] = problem;

})();
