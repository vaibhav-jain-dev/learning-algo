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
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], k=2, the result is [1, 4, 3, 2, 5].'
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
        explanation: 'Processing the input data produces the output. For input list=[7, 9, ..., 5] (length 10), k=5, the result is [7, ..., 5] (length 10).'
    },
    {
        input: {
        "list": [
                1
        ],
        "k": 1
},
        output: [1],
        explanation: 'Processing the input data produces the output. For input list=[1], k=1, the result is [1].'
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
        explanation: 'Processing the input data produces the output. For input list=[1, 2], k=1, the result is [2, 1].'
    }
        ],
        solutions: {
            python: `def swappingNodesInALinkedList(data):
    """
    Swapping Nodes in a Linked List

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Identify the optimal data structure and algorithm

    result = None

    # Process input
    # ...

    return result


# Test
if __name__ == "__main__":
    # Add test cases
    pass`,
            go: `package main

import "fmt"

// SwappingNodesInALinkedList solves the Swapping Nodes in a Linked List problem.
// Time: O(n), Space: O(n)
func SwappingNodesInALinkedList(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Identify the optimal data structure and algorithm

    var result interface{}

    // Process input
    // ...

    return result
}

func main() {
    // Test cases
    fmt.Println("Test")
}`
        },
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
