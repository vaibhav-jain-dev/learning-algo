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
            python: `def copyListWithRandomPointer(data):
    """
    Copy List with Random Pointer

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

// CopyListWithRandomPointer solves the Copy List with Random Pointer problem.
// Time: O(n), Space: O(n)
func CopyListWithRandomPointer(data interface{}) interface{} {
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
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/01-copy-list-random-pointer', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/01-copy-list-random-pointer'] = problem;

})();
