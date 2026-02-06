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
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], k=2, the result is [2, 1, 4, 3, 5].'
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
        explanation: 'Processing the input data produces the output. For input list=[1, 2, ..., 8] (length 8), k=3, the result is [3, ..., 8] (length 8).'
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
            { title: 'Reverse Short Groups Too', difficulty: 'Medium', description: 'If fewer than k nodes remain at the end, reverse them anyway instead of leaving them as-is.', whyDifferent: 'Removes the hasKNodes check, simplifying the stopping condition but requiring you to handle the final partial group reversal correctly.', example: 'list=[1,2,3,4,5], k=3: reverse [1,2,3]->[3,2,1], then reverse remaining [4,5]->[5,4]. Result=[3,2,1,5,4].' },
            { title: 'Reverse in Decreasing Group Sizes', difficulty: 'Hard', description: 'Reverse the first 1 node, then the next 2 nodes, then the next 3 nodes, and so on with increasing group sizes.', whyDifferent: 'The group size changes dynamically, requiring a counter that increments after each group. The k parameter is replaced by a growing variable.', example: 'list=[1,2,3,4,5,6,7,8,9,10]: reverse [1](size 1), [2,3](size 2)->[3,2], [4,5,6](size 3)->[6,5,4], [7,8,9,10](size 4)->[10,9,8,7]. Result=[1,3,2,6,5,4,10,9,8,7].' },
            { title: 'Rotate Groups Instead of Reverse', difficulty: 'Hard', description: 'Instead of reversing each group of k, rotate each group by one position to the right (last element becomes first).', whyDifferent: 'Rotation is not the same as reversal. You must detach the last node of each group and insert it at the front, requiring different pointer manipulation.', example: 'list=[1,2,3,4,5,6], k=3: rotate [1,2,3]->[3,1,2], rotate [4,5,6]->[6,4,5]. Result=[3,1,2,6,4,5].' },
            { title: 'Reverse K Groups From End', difficulty: 'Hard', description: 'Group the nodes from the end of the list in groups of k, then reverse each group. Leftover nodes at the beginning remain as-is.', whyDifferent: 'Grouping from the end means the leftover partial group is at the start, not the end. Requires knowing the total length first to determine the offset.', example: 'list=[1,2,3,4,5], k=3: from end, groups are [3,4,5] and leftover [1,2]. Reverse [3,4,5]->[5,4,3]. Result=[1,2,5,4,3].' },
            { title: 'Reverse K Groups and Sort Each', difficulty: 'Hard', description: 'Instead of reversing each group of k nodes, sort each group in ascending order while keeping the groups in their original relative positions.', whyDifferent: 'Sorting a linked list segment is fundamentally different from reversing. You need insertion sort or extraction-based sorting within each k-group.', example: 'list=[3,1,2,6,4,5], k=3: sort [3,1,2]->[1,2,3], sort [6,4,5]->[4,5,6]. Result=[1,2,3,4,5,6].' }
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
