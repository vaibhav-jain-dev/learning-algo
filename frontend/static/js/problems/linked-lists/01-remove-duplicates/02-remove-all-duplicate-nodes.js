/**
 * Remove All Nodes with Duplicate Values
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove All Nodes with Duplicate Values',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'Given the head of a **sorted** linked list, delete all nodes that have duplicate values, leaving only **distinct** values from the original list. Return the linked list sorted as well. **Key Difference:** Remove ALL occurrences of duplicated values, not just the extras.',
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
                3,
                4,
                4,
                5
        ]
},
        output: [1, 2, 5],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, ..., 5] (length 7), the result is [1, 2, 5].'
    },
    {
        input: {
        "list": [
                1,
                1,
                1,
                2,
                3
        ]
},
        output: [2, 3],
        explanation: 'Processing the input data produces the output. For input list=[1, 1, 1, 2, 3], the result is [2, 3].'
    },
    {
        input: {
        "list": [
                1,
                1,
                2,
                2
        ]
},
        output: [],
        explanation: 'Processing the input data produces the output. For input list=[1, 1, 2, 2], the result is [].'
    }
        ],
        solutions: {
            python: `def removeAllNodesWithDuplicateValues(data):
    """
    Remove All Nodes with Duplicate Values

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

// RemoveAllNodesWithDuplicateValues solves the Remove All Nodes with Duplicate Values problem.
// Time: O(n), Space: O(n)
func RemoveAllNodesWithDuplicateValues(data interface{}) interface{} {
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
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/02-remove-all-duplicate-nodes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/02-remove-all-duplicate-nodes'] = problem;

})();
