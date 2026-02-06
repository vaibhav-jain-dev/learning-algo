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
        twists: [
            {
                title: 'Unsorted List Keep-K',
                difficulty: 'Hard',
                description: 'The list is unsorted. Keep at most k occurrences of each value while preserving the original relative order of kept nodes.',
                whyDifferent: 'You need a hash map that counts occurrences seen so far. For each node, check if its value has been seen fewer than k times. The sorted adjacency property no longer helps with grouping.',
                example: 'Input: 3->1->2->3->1->3->2, k=2. Output: 3->1->2->3->1->2 (third 3 removed, first two of each kept).'
            },
            {
                title: 'Doubly Linked Sorted List',
                difficulty: 'Medium',
                description: 'Apply the keep-at-most-k rule to a sorted doubly linked list. Maintain valid prev pointers after removals.',
                whyDifferent: 'The counting and skipping logic stays the same, but each removal requires updating the prev pointer of the next surviving node. Batch removals within a duplicate group need careful prev/next rewiring.',
                example: 'Input: null<->1<->1<->1<->2<->2<->3, k=2. Output: null<->1<->1<->2<->2<->3 with valid prev links.'
            },
            {
                title: 'Streaming Window Dedup',
                difficulty: 'Hard',
                description: 'Nodes arrive in a stream. Maintain a linked list where each value appears at most k times. When a new node arrives, either append it or reject it in O(1) time.',
                whyDifferent: 'Requires maintaining a persistent count map alongside the list. The challenge is making append O(1) while also supporting removal from arbitrary positions if the design changes.',
                example: 'k=2. Stream: 1,1,1,2,2,3. After processing: 1->1->2->2->3. The third 1 was rejected on arrival.'
            },
            {
                title: 'Reverse Thinking: Keep Only Duplicates',
                difficulty: 'Medium',
                description: 'Instead of removing extras, keep ONLY nodes that appear more than k times. Remove all values that appear k or fewer times.',
                whyDifferent: 'The filtering logic inverts completely. You now need to first count all occurrences (requiring a full pass or hash map), then do a second pass to remove nodes whose count is <= k.',
                example: 'Input: 1->1->1->2->2->3, k=2. Values with count > 2: only 1 (appears 3 times). Output: 1->1->1.'
            },
            {
                title: 'Circular Sorted List Keep-K',
                difficulty: 'Hard',
                description: 'The sorted list is circular. Keep at most k occurrences. The "sorted" property means values increase around the cycle with one wrap-around point.',
                whyDifferent: 'You must find the wrap-around point (where the value decreases) to establish a logical start. Duplicate groups might span the wrap-around point, complicating the count logic.',
                example: 'Circular: ...->4->5->5->5->1->1->2->3->... k=2. After: ...->4->5->5->1->1->2->3->... (one 5 removed).'
            }
        ],
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
