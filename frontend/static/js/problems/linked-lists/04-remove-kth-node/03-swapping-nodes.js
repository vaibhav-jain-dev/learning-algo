/**
 * Swapping Nodes in a Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Swapping Nodes in a Linked List',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node',
        description: 'Given the head of a linked list and an integer k, return the head of the linked list after swapping the **values** of the k-th node from the beginning and the k-th node from the end (the list is 1-indexed).',
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
                4,
                5
        ],
        "k": 2
},
        output: [1, 4, 3, 2, 5],
        explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
    },
    {
        input: {
        "list": [
                7,
                9,
                6,
                6,
                7,
                8,
                3,
                0,
                9,
                5
        ],
        "k": 5
},
        output: [7, 9, 6, 6, 8, 7, 3, 0, 9, 5],
        explanation: 'The single-pass traversal examines each node once. By the time we reach the relevant position, we have enough information to produce the correct result.'
    },
    {
        input: {
        "list": [
                1
        ],
        "k": 1
},
        output: [1],
        explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
    },
    {
        input: {
        "list": [
                1,
                2
        ],
        "k": 1
},
        output: [2, 1],
        explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
    }
        ],
        solutions: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def swappingNodesInALinkedList(head, k):
    """
    Swapping Nodes in a Linked List
    Swap values of k-th node from beginning and k-th node from end (1-indexed).

    Time: O(n)
    Space: O(1)

    Approach:
    1. Find k-th node from beginning
    2. Use two-pointer technique to find k-th from end
       - Start second pointer when first reaches node k
       - When first reaches end, second is at k-th from end
    3. Swap their values
    """
    if not head:
        return head

    # Find the k-th node from the beginning
    first = head
    for _ in range(k - 1):
        first = first.next

    kth_from_start = first

    # Find the k-th node from the end using two pointers
    # Move first to the end, second starts from head
    second = head
    while first.next:
        first = first.next
        second = second.next

    kth_from_end = second

    # Swap values
    kth_from_start.val, kth_from_end.val = kth_from_end.val, kth_from_start.val

    return head


# Alternative: Use list to store all nodes
def swappingNodesWithList(head, k):
    """
    Time: O(n), Space: O(n)
    """
    nodes = []
    current = head
    while current:
        nodes.append(current)
        current = current.next

    n = len(nodes)
    # Swap values of k-th from start (index k-1) and k-th from end (index n-k)
    nodes[k - 1].val, nodes[n - k].val = nodes[n - k].val, nodes[k - 1].val

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
    # Test case 1: [1,2,3,4,5], k=2 -> [1,4,3,2,5]
    head = to_linked_list([1, 2, 3, 4, 5])
    result = swappingNodesInALinkedList(head, 2)
    print(to_array(result))  # [1, 4, 3, 2, 5]

    # Test case 2: [1,2], k=1 -> [2,1]
    head = to_linked_list([1, 2])
    result = swappingNodesInALinkedList(head, 1)
    print(to_array(result))  # [2, 1]`,
            go: `package main

import "fmt"

type ListNode struct {
    Val  int
    Next *ListNode
}

// SwappingNodesInALinkedList swaps k-th from start and k-th from end.
// Time: O(n), Space: O(1)
func SwappingNodesInALinkedList(head *ListNode, k int) *ListNode {
    if head == nil {
        return head
    }

    // Find the k-th node from the beginning
    first := head
    for i := 0; i < k-1; i++ {
        first = first.Next
    }

    kthFromStart := first

    // Find the k-th node from the end using two pointers
    // Move first to the end, second starts from head
    second := head
    for first.Next != nil {
        first = first.Next
        second = second.Next
    }

    kthFromEnd := second

    // Swap values
    kthFromStart.Val, kthFromEnd.Val = kthFromEnd.Val, kthFromStart.Val

    return head
}

// SwappingNodesWithSlice uses a slice to store all nodes.
// Time: O(n), Space: O(n)
func SwappingNodesWithSlice(head *ListNode, k int) *ListNode {
    nodes := []*ListNode{}
    current := head
    for current != nil {
        nodes = append(nodes, current)
        current = current.Next
    }

    n := len(nodes)
    // Swap values of k-th from start (index k-1) and k-th from end (index n-k)
    nodes[k-1].Val, nodes[n-k].Val = nodes[n-k].Val, nodes[k-1].Val

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
    // Test case: [1,2,3,4,5], k=2 -> [1,4,3,2,5]
    head := toLinkedList([]int{1, 2, 3, 4, 5})
    result := SwappingNodesInALinkedList(head, 2)
    fmt.Println(toArray(result)) // [1 4 3 2 5]
}`
        },
        twists: [
            { id: '04-remove-kth-node/03-swapping-nodes/twist-01-swap-nodes-not-values', name: 'Swap Nodes Not Values', difficulty: 'Hard' },
            { id: '04-remove-kth-node/03-swapping-nodes/twist-02-swap-kth-from-start-and-kth-from-start', name: 'Swap Kth From Start and Kth From Start', difficulty: 'Medium' },
            { id: '04-remove-kth-node/03-swapping-nodes/twist-03-swap-adjacent-pairs', name: 'Swap Adjacent Pairs', difficulty: 'Medium' },
            { id: '04-remove-kth-node/03-swapping-nodes/twist-04-swap-to-make-sorted', name: 'Swap to Make Sorted', difficulty: 'Hard' },
            { id: '04-remove-kth-node/03-swapping-nodes/twist-05-rotate-swap-positions', name: 'Rotate Swap Positions', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/03-swapping-nodes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/03-swapping-nodes'] = problem;

})();
