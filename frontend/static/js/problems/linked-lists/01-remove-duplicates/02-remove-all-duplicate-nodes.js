/**
 * Remove All Nodes with Duplicate Values
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove All Nodes with Duplicate Values',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'Given the head of a **sorted** linked list, delete all nodes that have duplicate values, leaving only **distinct** values from the original list. Return the linked list sorted as well. **Key Difference:** Remove ALL occurrences of duplicated values, not just the extras.',
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
                3,
                4,
                4,
                5
        ]
},
        output: [1, 2, 5],
        explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
    },
    {
        input: {
        "list": [
                1,
                1,
                1,
                2,
                3
        ]
},
        output: [2, 3],
        explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
    },
    {
        input: {
        "list": [
                1,
                1,
                2,
                2
        ]
},
        output: [],
        explanation: 'The single-pass traversal examines each node once. By the time we reach the relevant position, we have enough information to produce the correct result.'
    }
        ],
        solutions: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeAllNodesWithDuplicateValues(head):
    """
    Remove All Nodes with Duplicate Values (from sorted list)
    Delete ALL nodes that have duplicate values, not just extras.

    Time: O(n)
    Space: O(1)
    """
    # Use a dummy node to handle edge case where head needs removal
    dummy = ListNode(0)
    dummy.next = head

    prev = dummy  # Previous node (always points to last confirmed unique)

    while head:
        # Check if current node has duplicates
        if head.next and head.val == head.next.val:
            # Skip all nodes with this value
            while head.next and head.val == head.next.val:
                head = head.next
            # Skip the last duplicate too
            prev.next = head.next
        else:
            # No duplicate, move prev forward
            prev = prev.next

        head = head.next

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
    # Test case 1: [1,2,3,3,4,4,5] -> [1,2,5]
    head = to_linked_list([1, 2, 3, 3, 4, 4, 5])
    result = removeAllNodesWithDuplicateValues(head)
    print(to_array(result))  # [1, 2, 5]

    # Test case 2: [1,1,1,2,3] -> [2,3]
    head = to_linked_list([1, 1, 1, 2, 3])
    result = removeAllNodesWithDuplicateValues(head)
    print(to_array(result))  # [2, 3]`,
            go: `package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

// RemoveAllNodesWithDuplicateValues removes all nodes with duplicate values.
// Time: O(n), Space: O(1)
func RemoveAllNodesWithDuplicateValues(head *ListNode) *ListNode {
    // Use a dummy node to handle edge case where head needs removal
    dummy := &ListNode{Val: 0, Next: head}

    prev := dummy // Previous node (always points to last confirmed unique)

    for head != nil {
        // Check if current node has duplicates
        if head.Next != nil && head.Val == head.Next.Val {
            // Skip all nodes with this value
            for head.Next != nil && head.Val == head.Next.Val {
                head = head.Next
            }
            // Skip the last duplicate too
            prev.Next = head.Next
        } else {
            // No duplicate, move prev forward
            prev = prev.Next
        }

        head = head.Next
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
    // Test case: [1,2,3,3,4,4,5] -> [1,2,5]
    head := toLinkedList([]int{1, 2, 3, 3, 4, 4, 5})
    result := RemoveAllNodesWithDuplicateValues(head)
    fmt.Println(toArray(result)) // [1 2 5]
}`
        },
        twists: [
            { id: '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-01-unsorted-list-variant', name: 'Unsorted List Variant', difficulty: 'Hard' },
            { id: '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-02-doubly-linked-sorted-list', name: 'Doubly Linked Sorted List', difficulty: 'Medium' },
            { id: '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-03-recursive-approach', name: 'Recursive Approach', difficulty: 'Medium' },
            { id: '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-04-return-removed-nodes-as-separate-list', name: 'Return Removed Nodes as Separate List', difficulty: 'Medium' },
            { id: '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-05-sentinel-node-deep-dive', name: 'Sentinel Node Deep Dive', difficulty: 'Easy' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/02-remove-all-duplicate-nodes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/02-remove-all-duplicate-nodes'] = problem;

})();
