/**
 * Remove Nodes With Greater Value on Right
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Nodes With Greater Value on Right',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node',
        description: 'Given the head of a singly linked list, remove all nodes that have a node with a **strictly greater value** anywhere to their right side. Return the head of the modified linked list.',
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
                5,
                2,
                13,
                3,
                8
        ]
},
        output: [13, 8],
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
        output: [1, 1, 1, 1],
        explanation: 'The single-pass traversal examines each node once. By the time we reach the relevant position, we have enough information to produce the correct result.'
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
        explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5
        ]
},
        output: [5],
        explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
    }
        ],
        solutions: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeNodesWithGreaterValueOnRight(head):
    """
    Remove Nodes With Greater Value on Right
    Remove all nodes that have a strictly greater value anywhere to their right.

    Time: O(n)
    Space: O(1) using reverse approach

    Approach: Reverse the list, then traverse keeping only nodes that are
    greater than or equal to all nodes seen so far, then reverse back.
    """
    if not head or not head.next:
        return head

    # Step 1: Reverse the linked list
    def reverse(node):
        prev = None
        current = node
        while current:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
        return prev

    # Reverse the list
    head = reverse(head)

    # Step 2: Traverse and keep nodes >= max seen so far
    # The last node (now first) is always kept
    max_val = head.val
    current = head

    while current.next:
        if current.next.val < max_val:
            # Remove this node
            current.next = current.next.next
        else:
            # Keep this node and update max
            max_val = current.next.val
            current = current.next

    # Step 3: Reverse back to original order
    return reverse(head)


# Alternative approach using stack
def removeNodesWithGreaterValueOnRightStack(head):
    """
    Time: O(n), Space: O(n) - using monotonic stack
    """
    if not head:
        return head

    stack = []
    current = head

    # Push nodes maintaining decreasing order
    while current:
        while stack and stack[-1].val < current.val:
            stack.pop()
        stack.append(current)
        current = current.next

    # Rebuild the list from stack
    for i in range(len(stack) - 1):
        stack[i].next = stack[i + 1]
    stack[-1].next = None

    return stack[0]


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
    # Test case 1: [5,2,13,3,8] -> [13,8]
    head = to_linked_list([5, 2, 13, 3, 8])
    result = removeNodesWithGreaterValueOnRight(head)
    print(to_array(result))  # [13, 8]

    # Test case 2: [1,2,3,4,5] -> [5]
    head = to_linked_list([1, 2, 3, 4, 5])
    result = removeNodesWithGreaterValueOnRight(head)
    print(to_array(result))  # [5]`,
            go: `package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

// RemoveNodesWithGreaterValueOnRight removes nodes with greater value on right.
// Time: O(n), Space: O(1)
func RemoveNodesWithGreaterValueOnRight(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }

    // Helper to reverse linked list
    reverse := func(node *ListNode) *ListNode {
        var prev *ListNode
        current := node
        for current != nil {
            nextNode := current.Next
            current.Next = prev
            prev = current
            current = nextNode
        }
        return prev
    }

    // Step 1: Reverse the list
    head = reverse(head)

    // Step 2: Traverse and keep nodes >= max seen so far
    maxVal := head.Val
    current := head

    for current.Next != nil {
        if current.Next.Val < maxVal {
            // Remove this node
            current.Next = current.Next.Next
        } else {
            // Keep this node and update max
            maxVal = current.Next.Val
            current = current.Next
        }
    }

    // Step 3: Reverse back to original order
    return reverse(head)
}

// RemoveNodesWithGreaterValueOnRightStack uses monotonic stack.
// Time: O(n), Space: O(n)
func RemoveNodesWithGreaterValueOnRightStack(head *ListNode) *ListNode {
    if head == nil {
        return head
    }

    stack := []*ListNode{}
    current := head

    // Push nodes maintaining decreasing order
    for current != nil {
        for len(stack) > 0 && stack[len(stack)-1].Val < current.Val {
            stack = stack[:len(stack)-1]
        }
        stack = append(stack, current)
        current = current.Next
    }

    // Rebuild the list from stack
    for i := 0; i < len(stack)-1; i++ {
        stack[i].Next = stack[i+1]
    }
    stack[len(stack)-1].Next = nil

    return stack[0]
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
    // Test case: [5,2,13,3,8] -> [13,8]
    head := toLinkedList([]int{5, 2, 13, 3, 8})
    result := RemoveNodesWithGreaterValueOnRight(head)
    fmt.Println(toArray(result)) // [13 8]
}`
        },
        twists: [
            { id: '04-remove-kth-node/01-remove-nodes-greater-right/twist-01-remove-nodes-with-smaller-value-on-right', name: 'Remove Nodes With Smaller Value on Right', difficulty: 'Medium' },
            { id: '04-remove-kth-node/01-remove-nodes-greater-right/twist-02-remove-nodes-greater-than-k', name: 'Remove Nodes Greater Than K', difficulty: 'Easy' },
            { id: '04-remove-kth-node/01-remove-nodes-greater-right/twist-03-keep-only-local-maxima', name: 'Keep Only Local Maxima', difficulty: 'Medium' },
            { id: '04-remove-kth-node/01-remove-nodes-greater-right/twist-04-remove-nodes-where-right-sum-is-greater', name: 'Remove Nodes Where Right Sum Is Greater', difficulty: 'Hard' },
            { id: '04-remove-kth-node/01-remove-nodes-greater-right/twist-05-mark-instead-of-remove', name: 'Mark Instead of Remove', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/01-remove-nodes-greater-right', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/01-remove-nodes-greater-right'] = problem;

})();
