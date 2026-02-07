/**
 * Remove Duplicates from Unsorted Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Duplicates from Unsorted Linked List',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'Given the head of an **unsorted** singly linked list, remove all duplicate values, keeping only the first occurrence of each value. Return the head of the modified linked list.',
        problem: 'Reverse links by maintaining three pointers: prev, curr, next. For each node, save next, point curr to prev, then advance. Handle edge cases for empty or single-node lists.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
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
                3,
                2,
                2,
                1,
                3,
                2,
                4
        ]
},
        output: [3, 2, 1, 4],
        explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
    },
    {
        input: {
        "list": [
                1,
                1,
                1,
                1
        ]
},
        output: [1],
        explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
    },
    {
        input: {
        "list": [
                5,
                4,
                3,
                2,
                1
        ]
},
        output: [5, 4, 3, 2, 1],
        explanation: 'The single-pass traversal examines each node once. By the time we reach the relevant position, we have enough information to produce the correct result.'
    }
        ],
        solutions: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeDuplicatesFromUnsortedLinkedList(head):
    """
    Remove Duplicates from Unsorted Linked List
    Keep only the first occurrence of each value.

    Time: O(n)
    Space: O(n) - for the hash set
    """
    if not head:
        return head

    # Use a set to track seen values
    seen = set()
    seen.add(head.val)

    current = head
    while current.next:
        if current.next.val in seen:
            # Skip the duplicate node
            current.next = current.next.next
        else:
            # Add to seen and move forward
            seen.add(current.next.val)
            current = current.next

    return head


# Helper to convert list to linked list and back
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
    # Test case 1: [3,2,2,1,3,2,4] -> [3,2,1,4]
    head = to_linked_list([3, 2, 2, 1, 3, 2, 4])
    result = removeDuplicatesFromUnsortedLinkedList(head)
    print(to_array(result))  # [3, 2, 1, 4]

    # Test case 2: [1,1,1,1] -> [1]
    head = to_linked_list([1, 1, 1, 1])
    result = removeDuplicatesFromUnsortedLinkedList(head)
    print(to_array(result))  # [1]`,
            go: `package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

// RemoveDuplicatesFromUnsortedLinkedList removes duplicates keeping first occurrence.
// Time: O(n), Space: O(n)
func RemoveDuplicatesFromUnsortedLinkedList(head *ListNode) *ListNode {
    if head == nil {
        return head
    }

    // Use a map to track seen values
    seen := make(map[int]bool)
    seen[head.Val] = true

    current := head
    for current.Next != nil {
        if seen[current.Next.Val] {
            // Skip the duplicate node
            current.Next = current.Next.Next
        } else {
            // Add to seen and move forward
            seen[current.Next.Val] = true
            current = current.Next
        }
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
    // Test case: [3,2,2,1,3,2,4] -> [3,2,1,4]
    head := toLinkedList([]int{3, 2, 2, 1, 3, 2, 4})
    result := RemoveDuplicatesFromUnsortedLinkedList(head)
    fmt.Println(toArray(result)) // [3 2 1 4]
}`
        },
        twists: [
            { id: '01-remove-duplicates/01-remove-duplicates-unsorted/twist-01-o-1-space-without-sorting', name: 'O(1) Space Without Sorting', difficulty: 'Hard' },
            { id: '01-remove-duplicates/01-remove-duplicates-unsorted/twist-02-doubly-linked-unsorted-list', name: 'Doubly Linked Unsorted List', difficulty: 'Medium' },
            { id: '01-remove-duplicates/01-remove-duplicates-unsorted/twist-03-streaming-online-deduplication', name: 'Streaming / Online Deduplication', difficulty: 'Hard' },
            { id: '01-remove-duplicates/01-remove-duplicates-unsorted/twist-04-circular-unsorted-list', name: 'Circular Unsorted List', difficulty: 'Medium' },
            { id: '01-remove-duplicates/01-remove-duplicates-unsorted/twist-05-remove-duplicates-keep-last-occurrence', name: 'Remove Duplicates Keep Last Occurrence', difficulty: 'Medium' },
            { id: '01-remove-duplicates/01-remove-duplicates-unsorted/twist-06-conceptual-trap-stable-vs-unstable-removal', name: 'Conceptual Trap: Stable vs Unstable Removal', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/01-remove-duplicates-unsorted', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/01-remove-duplicates-unsorted'] = problem;

})();
