/**
 * Reverse Linked List in Groups of K
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Linked List in Groups of K',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k, the left-out nodes at the end should remain as they are. You may not alter the values in the list\'s nodes, only nodes themselves may be changed.',
        problem: 'Traverse the linked list with appropriate pointer management. Keep track of previous, current, and next nodes as needed. Be careful to update pointers in the correct order to avoid losing references. This achieves O(n) time with O(1) space.',
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
        "k": 2
},
        output: [2, 1, 4, 3, 5],
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
        ],
        "k": 3
},
        output: [3, 2, 1, 4, 5],
        explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
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
                8
        ],
        "k": 3
},
        output: [3, 2, 1, 6, 5, 4, 7, 8],
        explanation: 'The single-pass traversal examines each node once. By the time we reach the relevant position, we have enough information to produce the correct result.'
    }
        ],
        solutions: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseLinkedListInGroupsOfK(head, k):
    """
    Reverse Linked List in Groups of K
    If remaining nodes < k, leave them as is.

    Time: O(n)
    Space: O(1)
    """
    if not head or k == 1:
        return head

    # Check if there are at least k nodes remaining
    def hasKNodes(node, k):
        count = 0
        while node and count < k:
            count += 1
            node = node.next
        return count == k

    # Reverse k nodes starting from head, return new head and next group start
    def reverseKNodes(head, k):
        prev = None
        current = head
        for _ in range(k):
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
        # prev is new head, current is start of next group
        # head is now the tail of reversed group
        return prev, head, current

    dummy = ListNode(0)
    dummy.next = head
    group_prev = dummy

    while hasKNodes(group_prev.next, k):
        # Reverse k nodes
        new_head, new_tail, next_group = reverseKNodes(group_prev.next, k)

        # Connect with previous part
        group_prev.next = new_head

        # Connect tail with next group
        new_tail.next = next_group

        # Move group_prev to the tail for next iteration
        group_prev = new_tail

    return dummy.next


# Recursive approach
def reverseKGroupRecursive(head, k):
    """
    Time: O(n), Space: O(n/k) for recursion stack
    """
    # Check if there are k nodes
    current = head
    count = 0
    while current and count < k:
        current = current.next
        count += 1

    if count < k:
        return head  # Not enough nodes, return as is

    # Reverse first k nodes
    prev = None
    current = head
    for _ in range(k):
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node

    # head is now tail of reversed part
    # Recursively reverse rest and connect
    head.next = reverseKGroupRecursive(current, k)

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
    # Test case 1: [1,2,3,4,5], k=2 -> [2,1,4,3,5]
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverseLinkedListInGroupsOfK(head, 2)
    print(to_array(result))  # [2, 1, 4, 3, 5]

    # Test case 2: [1,2,3,4,5], k=3 -> [3,2,1,4,5]
    head = to_linked_list([1, 2, 3, 4, 5])
    result = reverseLinkedListInGroupsOfK(head, 3)
    print(to_array(result))  # [3, 2, 1, 4, 5]`,
            go: `package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

// ReverseLinkedListInGroupsOfK reverses nodes in groups of k.
// Time: O(n), Space: O(1)
func ReverseLinkedListInGroupsOfK(head *ListNode, k int) *ListNode {
    if head == nil || k == 1 {
        return head
    }

    // Check if there are at least k nodes remaining
    hasKNodes := func(node *ListNode, k int) bool {
        count := 0
        for node != nil && count < k {
            count++
            node = node.Next
        }
        return count == k
    }

    // Reverse k nodes starting from head
    // Returns: newHead, newTail, nextGroupStart
    reverseKNodes := func(head *ListNode, k int) (*ListNode, *ListNode, *ListNode) {
        var prev *ListNode
        current := head
        for i := 0; i < k; i++ {
            nextNode := current.Next
            current.Next = prev
            prev = current
            current = nextNode
        }
        return prev, head, current
    }

    dummy := &ListNode{Val: 0, Next: head}
    groupPrev := dummy

    for hasKNodes(groupPrev.Next, k) {
        // Reverse k nodes
        newHead, newTail, nextGroup := reverseKNodes(groupPrev.Next, k)

        // Connect with previous part
        groupPrev.Next = newHead

        // Connect tail with next group
        newTail.Next = nextGroup

        // Move groupPrev to the tail for next iteration
        groupPrev = newTail
    }

    return dummy.Next
}

// ReverseKGroupRecursive uses recursion.
// Time: O(n), Space: O(n/k)
func ReverseKGroupRecursive(head *ListNode, k int) *ListNode {
    // Check if there are k nodes
    current := head
    count := 0
    for current != nil && count < k {
        current = current.Next
        count++
    }

    if count < k {
        return head // Not enough nodes
    }

    // Reverse first k nodes
    var prev *ListNode
    current = head
    for i := 0; i < k; i++ {
        nextNode := current.Next
        current.Next = prev
        prev = current
        current = nextNode
    }

    // head is now tail, connect with recursively reversed rest
    head.Next = ReverseKGroupRecursive(current, k)

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
    // Test case: [1,2,3,4,5], k=2 -> [2,1,4,3,5]
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := ReverseLinkedListInGroupsOfK(head, 2)
    fmt.Println(toArray(result)) // [2 1 4 3 5]
}`
        },
        twists: [
            { id: '07-reverse-linked-list/01-reverse-in-groups-of-k/twist-01-reverse-short-groups-too', name: 'Reverse Short Groups Too', difficulty: 'Medium' },
            { id: '07-reverse-linked-list/01-reverse-in-groups-of-k/twist-02-reverse-in-decreasing-group-sizes', name: 'Reverse in Decreasing Group Sizes', difficulty: 'Hard' },
            { id: '07-reverse-linked-list/01-reverse-in-groups-of-k/twist-03-rotate-groups-instead-of-reverse', name: 'Rotate Groups Instead of Reverse', difficulty: 'Hard' },
            { id: '07-reverse-linked-list/01-reverse-in-groups-of-k/twist-04-reverse-k-groups-from-end', name: 'Reverse K Groups From End', difficulty: 'Hard' },
            { id: '07-reverse-linked-list/01-reverse-in-groups-of-k/twist-05-reverse-k-groups-and-sort-each', name: 'Reverse K Groups and Sort Each', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/01-reverse-in-groups-of-k', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/01-reverse-in-groups-of-k'] = problem;

})();
