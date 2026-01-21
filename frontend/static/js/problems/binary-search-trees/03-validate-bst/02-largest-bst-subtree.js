/**
 * Largest BST Subtree
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-validation
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest BST Subtree',
        difficulty: 'Medium',
        algorithm: 'bst-validation',
        parent: '03-validate-bst',
        description: 'Given the root of a binary tree, find the largest subtree which is a Binary Search Tree (BST), where the largest means subtree has the largest number of nodes. A **Binary Search Tree (BST)** is a tree in which all the nodes follow the below properties: - The left subtree values are less than the value of their parent node - The right subtree values are greater than the value of their parent node Return the size of the largest BST subtree.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
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
                10,
                5,
                15,
                1,
                8,
                null,
                7
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 7] (length 7), the result is 3.'
    },
    {
        input: {
        "tree": [
                2,
                1,
                3
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input tree=[2, 1, 3], the result is 3.'
    }
        ],
        solutions: {
            python: `def largestBstSubtree(data):
    """
    Largest BST Subtree

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

// LargestBstSubtree solves the Largest BST Subtree problem.
// Time: O(n), Space: O(n)
func LargestBstSubtree(data interface{}) interface{} {
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
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/02-largest-bst-subtree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/02-largest-bst-subtree'] = problem;

})();
