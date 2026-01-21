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
        explanation: 'Processing the input data produces the output. For input list=[5, 2, 13, 3, 8], the result is [13, 8].'
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
        explanation: 'Processing the input data produces the output. For input list=[1, 1, 1, 1], the result is [1, 1, 1, 1].'
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
        explanation: 'Processing the input data produces the output. For input list=[5, 4, 3, 2, 1], the result is [5, 4, 3, 2, 1].'
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
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], the result is [5].'
    }
        ],
        solutions: {
            python: `def removeNodesWithGreaterValueOnRight(data):
    """
    Remove Nodes With Greater Value on Right

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

// RemoveNodesWithGreaterValueOnRight solves the Remove Nodes With Greater Value on Right problem.
// Time: O(n), Space: O(n)
func RemoveNodesWithGreaterValueOnRight(data interface{}) interface{} {
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
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/01-remove-nodes-greater-right', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/01-remove-nodes-greater-right'] = problem;

})();
