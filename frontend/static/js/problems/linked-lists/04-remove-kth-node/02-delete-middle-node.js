/**
 * Delete the Middle Node of a Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Delete the Middle Node of a Linked List',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node',
        description: 'Given the head of a singly linked list, delete the **middle node** and return the head of the modified list. The middle node of a linked list of size n is the floor(n/2)-th node from the start (0-indexed). For a list with n nodes: - If n is odd: delete the exact middle node - If n is even: delete the second of the two middle nodes',
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
                3,
                4,
                7,
                1,
                2,
                6
        ]
},
        output: [1, 3, 4, 1, 2, 6],
        explanation: 'Processing the input data produces the output. For input list=[1, 3, ..., 6] (length 7), the result is [1, ..., 6] (length 6).'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4
        ]
},
        output: [1, 2, 4],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4], the result is [1, 2, 4].'
    },
    {
        input: {
        "list": [
                2,
                1
        ]
},
        output: [2],
        explanation: 'Processing the input data produces the output. For input list=[2, 1], the result is [2].'
    },
    {
        input: {
        "list": [
                1
        ]
},
        output: [],
        explanation: 'Processing the input data produces the output. For input list=[1], the result is [].'
    }
        ],
        solutions: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def deleteTheMiddleNodeOfALinkedList(head):
    """
    Delete the Middle Node of a Linked List
    Middle is floor(n/2)-th node (0-indexed).

    Time: O(n)
    Space: O(1)

    Approach: Use slow-fast pointer technique.
    Fast moves 2 steps, slow moves 1 step.
    When fast reaches end, slow is at middle.
    Use a prev pointer to delete the middle node.
    """
    # Edge case: single node - delete it
    if not head or not head.next:
        return None

    # Use dummy node to handle edge cases
    dummy = ListNode(0)
    dummy.next = head

    slow = dummy
    fast = head

    # Move fast by 2, slow by 1
    # When fast reaches end, slow.next is the middle
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    # Delete the middle node
    slow.next = slow.next.next

    return dummy.next


# Alternative: Count nodes first, then delete
def deleteMiddleCountFirst(head):
    """
    Time: O(n), Space: O(1)
    """
    if not head or not head.next:
        return None

    # Count total nodes
    count = 0
    current = head
    while current:
        count += 1
        current = current.next

    # Find middle index
    mid = count // 2

    # Delete node at mid index
    if mid == 0:
        return head.next

    current = head
    for _ in range(mid - 1):
        current = current.next

    current.next = current.next.next
    return head


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
    # Test case 1: [1,3,4,7,1,2,6] -> [1,3,4,1,2,6]
    head = to_linked_list([1, 3, 4, 7, 1, 2, 6])
    result = deleteTheMiddleNodeOfALinkedList(head)
    print(to_array(result))  # [1, 3, 4, 1, 2, 6]

    # Test case 2: [1,2,3,4] -> [1,2,4]
    head = to_linked_list([1, 2, 3, 4])
    result = deleteTheMiddleNodeOfALinkedList(head)
    print(to_array(result))  # [1, 2, 4]`,
            go: `package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

// DeleteTheMiddleNodeOfALinkedList deletes the middle node.
// Time: O(n), Space: O(1)
func DeleteTheMiddleNodeOfALinkedList(head *ListNode) *ListNode {
    // Edge case: single node - delete it
    if head == nil || head.Next == nil {
        return nil
    }

    // Use dummy node to handle edge cases
    dummy := &ListNode{Val: 0, Next: head}

    slow := dummy
    fast := head

    // Move fast by 2, slow by 1
    // When fast reaches end, slow.Next is the middle
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }

    // Delete the middle node
    slow.Next = slow.Next.Next

    return dummy.Next
}

// DeleteMiddleCountFirst counts nodes first, then deletes.
// Time: O(n), Space: O(1)
func DeleteMiddleCountFirst(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return nil
    }

    // Count total nodes
    count := 0
    current := head
    for current != nil {
        count++
        current = current.Next
    }

    // Find middle index
    mid := count / 2

    // Delete node at mid index
    if mid == 0 {
        return head.Next
    }

    current = head
    for i := 0; i < mid-1; i++ {
        current = current.Next
    }

    current.Next = current.Next.Next
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
    // Test case: [1,3,4,7,1,2,6] -> [1,3,4,1,2,6]
    head := toLinkedList([]int{1, 3, 4, 7, 1, 2, 6})
    result := DeleteTheMiddleNodeOfALinkedList(head)
    fmt.Println(toArray(result)) // [1 3 4 1 2 6]
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/02-delete-middle-node', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/02-delete-middle-node'] = problem;

})();
