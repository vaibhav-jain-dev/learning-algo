/**
 * Linked List Cycle
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: floyd-cycle-detection
 */
(function() {
    'use strict';

    const problem = {
        name: 'Linked List Cycle',
        difficulty: 'Easy',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check',
        description: 'Given head, the head of a linked list, determine if the linked list has a cycle in it. A cycle exists if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail\'s next pointer is connected to. Note that pos is not passed as a parameter. Return true if there is a cycle in the linked list. Otherwise, return false.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "head": [
                3,
                2,
                0,
                -4
        ],
        "pos": 1
},
        output: true,
        explanation: 'Processing the input data produces the output. For input head=[3, 2, 0, -4], pos=1, the result is true.'
    }
        ],
        solutions: {
            python: `class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

def hasCycle(head):
    """
    Linked List Cycle - Floyd's Cycle Detection

    Use two pointers: slow moves 1 step, fast moves 2 steps.
    If there's a cycle, they will eventually meet.

    Time: O(n)
    Space: O(1)
    """
    if not head or not head.next:
        return False

    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next        # Move 1 step
        fast = fast.next.next   # Move 2 steps

        if slow == fast:        # They meet - cycle exists
            return True

    return False  # Fast reached end - no cycle


def buildLinkedList(values, pos):
    """Helper to build linked list with cycle at position pos."""
    if not values:
        return None

    nodes = [ListNode(v) for v in values]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]

    # Create cycle if pos >= 0
    if pos >= 0:
        nodes[-1].next = nodes[pos]

    return nodes[0]


# Test
if __name__ == "__main__":
    # Test case 1: Cycle at position 1
    head = buildLinkedList([3, 2, 0, -4], 1)
    print(hasCycle(head))  # True

    # Test case 2: No cycle
    head = buildLinkedList([1, 2], -1)
    print(hasCycle(head))  # False`,
            go: `package main

import "fmt"

// ListNode represents a node in a linked list
type ListNode struct {
    Val  int
    Next *ListNode
}

// HasCycle detects if a linked list has a cycle using Floyd's algorithm
// Time: O(n), Space: O(1)
func HasCycle(head *ListNode) bool {
    if head == nil || head.Next == nil {
        return false
    }

    slow := head
    fast := head

    for fast != nil && fast.Next != nil {
        slow = slow.Next      // Move 1 step
        fast = fast.Next.Next // Move 2 steps

        if slow == fast { // They meet - cycle exists
            return true
        }
    }

    return false // Fast reached end - no cycle
}

// BuildLinkedList creates a linked list with optional cycle
func BuildLinkedList(values []int, pos int) *ListNode {
    if len(values) == 0 {
        return nil
    }

    nodes := make([]*ListNode, len(values))
    for i, v := range values {
        nodes[i] = &ListNode{Val: v}
    }

    for i := 0; i < len(nodes)-1; i++ {
        nodes[i].Next = nodes[i+1]
    }

    // Create cycle if pos >= 0
    if pos >= 0 && pos < len(nodes) {
        nodes[len(nodes)-1].Next = nodes[pos]
    }

    return nodes[0]
}

func main() {
    // Test case 1: Cycle at position 1
    head := BuildLinkedList([]int{3, 2, 0, -4}, 1)
    fmt.Println(HasCycle(head)) // true

    // Test case 2: No cycle
    head = BuildLinkedList([]int{1, 2}, -1)
    fmt.Println(HasCycle(head)) // false
}`
        },
        twists: [
            { id: '07-single-cycle-check/01-linked-list-cycle/twist-01-find-cycle-start', name: 'Find Cycle Start', difficulty: 'Medium' },
            { id: '07-single-cycle-check/01-linked-list-cycle/twist-02-cycle-length', name: 'Cycle Length', difficulty: 'Easy' },
            { id: '07-single-cycle-check/01-linked-list-cycle/twist-03-detect-cycle-with-hash-set', name: 'Detect Cycle with Hash Set', difficulty: 'Easy' },
            { id: '07-single-cycle-check/01-linked-list-cycle/twist-04-remove-the-cycle', name: 'Remove the Cycle', difficulty: 'Medium' },
            { id: '07-single-cycle-check/01-linked-list-cycle/twist-05-count-nodes-before-cycle', name: 'Count Nodes Before Cycle', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/01-linked-list-cycle', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/01-linked-list-cycle'] = problem;

})();
