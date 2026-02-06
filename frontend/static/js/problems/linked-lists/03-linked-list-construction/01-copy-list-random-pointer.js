/**
 * Copy List with Random Pointer
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Copy List with Random Pointer',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction',
        description: 'A linked list of length n is given such that each node contains an additional **random pointer**, which could point to any node in the list, or null. Construct a **deep copy** of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent ',
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
        "nodes": [
                [
                        7,
                        null
                ],
                [
                        13,
                        0
                ],
                [
                        11,
                        4
                ],
                [
                        10,
                        2
                ],
                [
                        1,
                        0
                ]
        ]
},
        output: [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]],
        explanation: 'Processing the input data produces the output. For input nodes=[[7, None], [13, 0], [11, 4], [10, 2], [1, 0]], the result is [[7, None], [13, 0], [11, 4], [10, 2], [1, 0]].'
    },
    {
        input: {
        "nodes": [
                [
                        1,
                        1
                ],
                [
                        2,
                        1
                ]
        ]
},
        output: [[1, 1], [2, 1]],
        explanation: 'Processing the input data produces the output. For input nodes=[[1, 1], [2, 1]], the result is [[1, 1], [2, 1]].'
    },
    {
        input: {
        "nodes": [
                [
                        3,
                        null
                ],
                [
                        3,
                        0
                ],
                [
                        3,
                        null
                ]
        ]
},
        output: [[3, null], [3, 0], [3, null]],
        explanation: 'Processing the input data produces the output. For input nodes=[[3, None], [3, 0], [3, None]], the result is [[3, None], [3, 0], [3, None]].'
    }
        ],
        solutions: {
            python: `class Node:
    def __init__(self, val=0, next=None, random=None):
        self.val = val
        self.next = next
        self.random = random

def copyListWithRandomPointer(head):
    """
    Copy List with Random Pointer
    Creates a deep copy of a linked list with random pointers.

    Time: O(n)
    Space: O(n) - for the hash map

    Approach: Use a hash map to map original nodes to their copies.
    """
    if not head:
        return None

    # Step 1: Create a mapping from original to copy
    old_to_new = {}

    # First pass: create all new nodes
    current = head
    while current:
        old_to_new[current] = Node(current.val)
        current = current.next

    # Second pass: set next and random pointers
    current = head
    while current:
        copy = old_to_new[current]
        copy.next = old_to_new.get(current.next)
        copy.random = old_to_new.get(current.random)
        current = current.next

    return old_to_new[head]


# Alternative O(1) space approach (interleaving method)
def copyListWithRandomPointerO1Space(head):
    """
    Time: O(n), Space: O(1)
    Interleave copied nodes with original nodes.
    """
    if not head:
        return None

    # Step 1: Create interleaved list (A -> A' -> B -> B' -> ...)
    current = head
    while current:
        copy = Node(current.val)
        copy.next = current.next
        current.next = copy
        current = copy.next

    # Step 2: Set random pointers for copied nodes
    current = head
    while current:
        if current.random:
            current.next.random = current.random.next
        current = current.next.next

    # Step 3: Separate the two lists
    current = head
    new_head = head.next
    while current:
        copy = current.next
        current.next = copy.next
        copy.next = copy.next.next if copy.next else None
        current = current.next

    return new_head


# Test
if __name__ == "__main__":
    # Create test list: 7 -> 13 -> 11 -> 10 -> 1
    nodes = [Node(7), Node(13), Node(11), Node(10), Node(1)]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    nodes[0].random = None
    nodes[1].random = nodes[0]
    nodes[2].random = nodes[4]
    nodes[3].random = nodes[2]
    nodes[4].random = nodes[0]

    copy = copyListWithRandomPointer(nodes[0])
    print("Copy created successfully")`,
            go: `package main

import "fmt"

type Node struct {
    Val    int
    Next   *Node
    Random *Node
}

// CopyListWithRandomPointer creates a deep copy of the list.
// Time: O(n), Space: O(n)
func CopyListWithRandomPointer(head *Node) *Node {
    if head == nil {
        return nil
    }

    // Map from original node to copied node
    oldToNew := make(map[*Node]*Node)

    // First pass: create all new nodes
    current := head
    for current != nil {
        oldToNew[current] = &Node{Val: current.Val}
        current = current.Next
    }

    // Second pass: set next and random pointers
    current = head
    for current != nil {
        copy := oldToNew[current]
        if current.Next != nil {
            copy.Next = oldToNew[current.Next]
        }
        if current.Random != nil {
            copy.Random = oldToNew[current.Random]
        }
        current = current.Next
    }

    return oldToNew[head]
}

// CopyListWithRandomPointerO1Space uses O(1) extra space.
// Time: O(n), Space: O(1)
func CopyListWithRandomPointerO1Space(head *Node) *Node {
    if head == nil {
        return nil
    }

    // Step 1: Create interleaved list (A -> A' -> B -> B' -> ...)
    current := head
    for current != nil {
        copy := &Node{Val: current.Val}
        copy.Next = current.Next
        current.Next = copy
        current = copy.Next
    }

    // Step 2: Set random pointers for copied nodes
    current = head
    for current != nil {
        if current.Random != nil {
            current.Next.Random = current.Random.Next
        }
        current = current.Next.Next
    }

    // Step 3: Separate the two lists
    current = head
    newHead := head.Next
    for current != nil {
        copy := current.Next
        current.Next = copy.Next
        if copy.Next != nil {
            copy.Next = copy.Next.Next
        }
        current = current.Next
    }

    return newHead
}

func main() {
    // Create test list
    nodes := []*Node{{Val: 7}, {Val: 13}, {Val: 11}, {Val: 10}, {Val: 1}}
    for i := 0; i < len(nodes)-1; i++ {
        nodes[i].Next = nodes[i+1]
    }
    nodes[1].Random = nodes[0]
    nodes[2].Random = nodes[4]
    nodes[3].Random = nodes[2]
    nodes[4].Random = nodes[0]

    copy := CopyListWithRandomPointer(nodes[0])
    fmt.Println("Copy created, first val:", copy.Val)
}`
        },
        twists: [
            { id: '03-linked-list-construction/01-copy-list-random-pointer/twist-01-o-1-space-interleaving-deep-dive', name: 'O(1) Space Interleaving Deep Dive', difficulty: 'Hard' },
            { id: '03-linked-list-construction/01-copy-list-random-pointer/twist-02-copy-doubly-linked-list-with-random-pointer', name: 'Copy Doubly Linked List with Random Pointer', difficulty: 'Hard' },
            { id: '03-linked-list-construction/01-copy-list-random-pointer/twist-03-copy-circular-list-with-random-pointer', name: 'Copy Circular List with Random Pointer', difficulty: 'Hard' },
            { id: '03-linked-list-construction/01-copy-list-random-pointer/twist-04-recursive-deep-copy', name: 'Recursive Deep Copy', difficulty: 'Medium' },
            { id: '03-linked-list-construction/01-copy-list-random-pointer/twist-05-verify-deep-copy-correctness', name: 'Verify Deep Copy Correctness', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/01-copy-list-random-pointer', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/01-copy-list-random-pointer'] = problem;

})();
