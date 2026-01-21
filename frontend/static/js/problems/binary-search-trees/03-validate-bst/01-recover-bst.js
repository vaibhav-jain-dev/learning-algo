/**
 * Recover Binary Search Tree
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-repair
 */
(function() {
    'use strict';

    const problem = {
        name: 'Recover Binary Search Tree',
        difficulty: 'Medium',
        algorithm: 'bst-repair',
        parent: '03-validate-bst',
        description: 'You are given the root of a binary search tree (BST), where the values of **exactly two** nodes of the tree were swapped by mistake. Recover the tree without changing its structure.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(h) with recursion, O(1) with Morris'
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
        "tree": [
                1,
                3,
                null,
                null,
                2
        ]
},
        output: [3, 1, null, null, 2],
        explanation: 'Processing the input data produces the output. For input tree=[1, 3, None, None, 2], the result is [3, 1, None, None, 2].'
    },
    {
        input: {
        "tree": [
                3,
                1,
                4,
                null,
                null,
                2
        ]
},
        output: [2, 1, 4, null, null, 3],
        explanation: 'Processing the input data produces the output. For input tree=[3, 1, ..., 2] (length 6), the result is [2, ..., 3] (length 6).'
    }
        ],
        solutions: {
            python: `def recoverBinarySearchTree(data):
    """
    Recover Binary Search Tree

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

// RecoverBinarySearchTree solves the Recover Binary Search Tree problem.
// Time: O(n), Space: O(n)
func RecoverBinarySearchTree(data interface{}) interface{} {
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
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/01-recover-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/01-recover-bst'] = problem;

})();
