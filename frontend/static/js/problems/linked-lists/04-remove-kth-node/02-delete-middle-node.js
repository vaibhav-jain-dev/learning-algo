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
        twists: [
            { title: 'Delete Middle Without Slow-Fast', difficulty: 'Medium', description: 'Delete the middle node but you are not allowed to use the slow-fast pointer technique. Find another approach.', whyDifferent: 'Forces you to use a two-pass approach (count then delete) or a different single-pass technique like using a counter variable, rather than the elegant slow-fast trick.', example: 'list=[1,3,4,7,1,2,6]: first pass counts 7 nodes, middle index=3. Second pass deletes node at index 3 (value 7). Result=[1,3,4,1,2,6].' },
            { title: 'Delete Both Middle Nodes', difficulty: 'Medium', description: 'For even-length lists, delete both middle nodes (the two center nodes). For odd-length lists, delete the single middle node.', whyDifferent: 'Even-length lists require removing two consecutive nodes, which means tracking the node before both middle nodes and adjusting pointers to skip two nodes.', example: 'list=[1,2,3,4]: both middles are 2 and 3. Result=[1,4]. list=[1,2,3,4,5]: single middle is 3. Result=[1,2,4,5].' },
            { title: 'Delete Middle Given Only That Node', difficulty: 'Medium', description: 'You are only given a reference to the middle node itself (not the head). Delete it from the list.', whyDifferent: 'Without access to the previous node, you must copy the next node value into the current node and delete the next node instead, a classic trick that changes the deletion strategy entirely.', example: 'Given pointer to node with value 7 in list [1,3,4,7,1,2,6]: copy value 1 from next node, delete next. List becomes [1,3,4,1,2,6].' },
            { title: 'Move Middle to End', difficulty: 'Medium', description: 'Instead of deleting the middle node, move it to the end of the list while maintaining the relative order of all other nodes.', whyDifferent: 'Requires both finding the middle and relinking it at the tail. You need to detach the middle from its position and append it, requiring both predecessor and tail tracking.', example: 'list=[1,3,4,7,1,2,6]: move middle (7) to end. Result=[1,3,4,1,2,6,7].' },
            { title: 'Delete Every Kth Middle', difficulty: 'Hard', description: 'Repeatedly delete the middle node of the remaining list k times. Return the list after k deletions.', whyDifferent: 'Requires running the middle-finding algorithm k times on a shrinking list, where the list length and middle position change after each deletion.', example: 'list=[1,2,3,4,5,6,7], k=3: delete middle(4)->[1,2,3,5,6,7], delete middle(5)->[1,2,3,6,7], delete middle(3)->[1,2,6,7].' }
        ],
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
