/**
 * Morris Traversal
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Morris Traversal',
        difficulty: 'Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal',
        description: 'Implement **Morris Traversal** to perform inorder and preorder tree traversals with **O(1) space complexity** (no stack, no recursion). Morris Traversal achieves constant space by temporarily modifying the tree structure - creating threads from the rightmost node of left subtrees back to their ancestors.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
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
        "tree": [
                4,
                2,
                6,
                1,
                3,
                5,
                7
        ]
},
        output: [1, 2, 3, 4, 5, 6, 7],
        explanation: 'Processing the input data produces the output. For input tree=[4, 2, ..., 7] (length 7), the result is [1, ..., 7] (length 7).'
    },
    {
        input: {
        "tree": [
                1,
                2,
                3,
                4,
                5,
                null,
                6
        ]
},
        output: [4, 2, 5, 1, 3, 6],
        explanation: 'Processing the input data produces the output. For input tree=[1, 2, ..., 6] (length 7), the result is [4, ..., 6] (length 6).'
    }
        ],
        solutions: {
            python: `def morrisTraversal(data):
    """
    Morris Traversal

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

// MorrisTraversal solves the Morris Traversal problem.
// Time: O(n), Space: O(n)
func MorrisTraversal(data interface{}) interface{} {
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
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/02-morris-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/02-morris-traversal'] = problem;

})();
