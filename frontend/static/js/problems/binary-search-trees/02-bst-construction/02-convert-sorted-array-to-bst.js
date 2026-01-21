/**
 * Convert Sorted Array to BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-construction-balanced
 */
(function() {
    'use strict';

    const problem = {
        name: 'Convert Sorted Array to BST',
        difficulty: 'Medium',
        algorithm: 'bst-construction-balanced',
        parent: '02-bst-construction',
        description: 'Given an integer array nums where the elements are sorted in **ascending order**, convert it to a **height-balanced** binary search tree. A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(log n) recursion stack'
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
        "nums": [
                -10,
                -3,
                0,
                5,
                9
        ]
},
        output: [0, -3, 9, -10, null, 5],
        explanation: 'Processing the input data produces the output. For input nums=[-10, -3, 0, 5, 9], the result is [0, ..., 5] (length 6).'
    },
    {
        input: {
        "nums": [
                1,
                2,
                3,
                4,
                5,
                6,
                7
        ]
},
        output: [4, 2, 6, 1, 3, 5, 7],
        explanation: 'Processing the input data produces the output. For input nums=[1, 2, ..., 7] (length 7), the result is [4, ..., 7] (length 7).'
    }
        ],
        solutions: {
            python: `def convertSortedArrayToBst(data):
    """
    Convert Sorted Array to BST

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

// ConvertSortedArrayToBst solves the Convert Sorted Array to BST problem.
// Time: O(n), Space: O(n)
func ConvertSortedArrayToBst(data interface{}) interface{} {
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
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/02-convert-sorted-array-to-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/02-convert-sorted-array-to-bst'] = problem;

})();
