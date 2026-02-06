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
        explanation: 'Processing the input data produces the output. For input list=[3, 2, ..., 4] (length 7), the result is [3, 2, 1, 4].'
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
        explanation: 'Processing the input data produces the output. For input list=[1, 1, 1, 1], the result is [1].'
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
        explanation: 'Processing the input data produces the output. For input list=[5, 4, 3, 2, 1], the result is [5, 4, 3, 2, 1].'
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
            {
                title: 'O(1) Space Without Sorting',
                difficulty: 'Hard',
                description: 'Remove duplicates from the unsorted list using O(1) extra space. You cannot use a hash set and you cannot sort the list first.',
                whyDifferent: 'Without a hash set, you must use a brute-force nested loop approach: for each node, scan ahead to remove all future occurrences. This changes the time complexity to O(n^2) and forces a fundamentally different two-pointer strategy.',
                example: 'Input: 3->2->2->1->3->2->4. For node 3: scan and remove node at position 5. For node 2: scan and remove nodes at positions 3 and 6. Output: 3->2->1->4.'
            },
            {
                title: 'Doubly Linked Unsorted List',
                difficulty: 'Medium',
                description: 'The unsorted list is doubly linked. Remove duplicates keeping first occurrence while maintaining valid prev pointers.',
                whyDifferent: 'Deletion is simpler because you can access the previous node directly through the prev pointer, but you must remember to update prev pointers for nodes after the removed node. The hash set approach still works, but rewiring logic doubles.',
                example: 'Input: null<->3<->2<->2<->1<->3. Remove second 2 and second 3. Output: null<->3<->2<->1 with valid prev links.'
            },
            {
                title: 'Streaming / Online Deduplication',
                difficulty: 'Hard',
                description: 'Nodes arrive one at a time via an append operation. After each append, the list must remain duplicate-free. Design a data structure that supports O(1) append-with-dedup.',
                whyDifferent: 'You cannot traverse the entire list on each insertion. You need a persistent hash set alongside the linked list, essentially designing a hybrid data structure rather than a one-pass algorithm.',
                example: 'append(3): list=[3]. append(2): list=[3,2]. append(2): duplicate, skip. append(1): list=[3,2,1]. append(3): duplicate, skip.'
            },
            {
                title: 'Circular Unsorted List',
                difficulty: 'Medium',
                description: 'The unsorted list is circular. Remove duplicates keeping first occurrence. The list must remain circular after deduplication.',
                whyDifferent: 'With no null terminator, you must track the starting node to know when you have completed a full cycle. Using a hash set still works, but the loop termination condition fundamentally changes.',
                example: 'Input: ...->3->2->2->1->3->... (circular, 5 nodes). Output: ...->3->2->1->... (circular, 3 nodes).'
            },
            {
                title: 'Remove Duplicates Keep Last Occurrence',
                difficulty: 'Medium',
                description: 'Instead of keeping the first occurrence of each value, keep the last occurrence. The relative order of kept nodes should match their last-occurrence positions.',
                whyDifferent: 'Reverse thinking: you cannot decide whether to keep a node until you know if it appears again later. This may require a reverse pass, a stack-based approach, or two-pass strategy that fundamentally changes the algorithm.',
                example: 'Input: 3->2->2->1->3->2->4. Keep last of each: output is 1->3->2->4 (last 1 at pos 4, last 3 at pos 5, last 2 at pos 6, last 4 at pos 7).'
            },
            {
                title: 'Conceptual Trap: Stable vs Unstable Removal',
                difficulty: 'Medium',
                description: 'What if the problem asked you to remove duplicates but you are allowed to reorder the remaining nodes? Could you achieve O(n) time and O(1) space on an unsorted list?',
                whyDifferent: 'If stability is not required, you could sort the list in O(n log n) then do the sorted dedup in O(n), or use other tricks. This twist challenges whether the O(n) space is truly necessary or just an artifact of the stability requirement.',
                example: 'Input: 3->2->2->1->3->4. Unstable output could be: 1->2->3->4 (sorted) instead of maintaining original order 3->2->1->4.'
            }
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
