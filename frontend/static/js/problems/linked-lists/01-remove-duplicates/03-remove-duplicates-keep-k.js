/**
 * Remove Duplicates Keeping At Most K Occurrences
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Duplicates Keeping At Most K Occurrences',
        difficulty: 'Hard',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'Given the head of a **sorted** linked list and an integer k, remove duplicates such that each element appears at most k times. Return the linked list sorted.',
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
                1,
                1,
                2,
                2,
                3
        ],
        "k": 2
},
        output: [1, 1, 2, 2, 3],
        explanation: 'Processing the input data produces the output. For input list=[1, 1, ..., 3] (length 6), k=2, the result is [1, 1, 2, 2, 3].'
    },
    {
        input: {
        "list": [
                1,
                1,
                1,
                1,
                2,
                2,
                2
        ],
        "k": 1
},
        output: [1, 2],
        explanation: 'Processing the input data produces the output. For input list=[1, 1, ..., 2] (length 7), k=1, the result is [1, 2].'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                3,
                3,
                3,
                4
        ],
        "k": 3
},
        output: [1, 2, 3, 3, 3, 4],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, ..., 4] (length 7), k=3, the result is [1, ..., 4] (length 6).'
    }
        ],
        solutions: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeDuplicatesKeepingAtMostKOccurrences(head, k):
    """
    Remove Duplicates Keeping At Most K Occurrences (from sorted list)

    Time: O(n)
    Space: O(1)
    """
    if not head or k <= 0:
        return None if k <= 0 else head

    dummy = ListNode(0)
    dummy.next = head
    prev = dummy

    while head:
        # Count occurrences of current value
        count = 1
        current = head

        # Move through all nodes with same value
        while current.next and current.next.val == head.val:
            count += 1
            current = current.next

        if count <= k:
            # Keep all nodes, move prev to last node of this value
            prev = current
        else:
            # Keep only k nodes
            kept = head
            for _ in range(k - 1):
                kept = kept.next
            # Connect prev to first k nodes, then skip rest
            prev.next = head
            prev = kept
            prev.next = current.next

        head = current.next

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
    # Test case 1: [1,1,1,2,2,3], k=2 -> [1,1,2,2,3]
    head = to_linked_list([1, 1, 1, 2, 2, 3])
    result = removeDuplicatesKeepingAtMostKOccurrences(head, 2)
    print(to_array(result))  # [1, 1, 2, 2, 3]

    # Test case 2: [1,1,1,1,2,2,2], k=1 -> [1,2]
    head = to_linked_list([1, 1, 1, 1, 2, 2, 2])
    result = removeDuplicatesKeepingAtMostKOccurrences(head, 1)
    print(to_array(result))  # [1, 2]`,
            go: `package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

// RemoveDuplicatesKeepingAtMostKOccurrences keeps at most k occurrences.
// Time: O(n), Space: O(1)
func RemoveDuplicatesKeepingAtMostKOccurrences(head *ListNode, k int) *ListNode {
    if head == nil || k <= 0 {
        if k <= 0 {
            return nil
        }
        return head
    }

    dummy := &ListNode{Val: 0, Next: head}
    prev := dummy

    for head != nil {
        // Count occurrences of current value
        count := 1
        current := head

        // Move through all nodes with same value
        for current.Next != nil && current.Next.Val == head.Val {
            count++
            current = current.Next
        }

        if count <= k {
            // Keep all nodes, move prev to last node of this value
            prev = current
        } else {
            // Keep only k nodes
            kept := head
            for i := 0; i < k-1; i++ {
                kept = kept.Next
            }
            // Connect prev to first k nodes, then skip rest
            prev.Next = head
            prev = kept
            prev.Next = current.Next
        }

        head = current.Next
    }

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
    // Test case: [1,1,1,2,2,3], k=2 -> [1,1,2,2,3]
    head := toLinkedList([]int{1, 1, 1, 2, 2, 3})
    result := RemoveDuplicatesKeepingAtMostKOccurrences(head, 2)
    fmt.Println(toArray(result)) // [1 1 2 2 3]
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/03-remove-duplicates-keep-k', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/03-remove-duplicates-keep-k'] = problem;

})();
