/**
 * Binary Tree Maximum Path Sum
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-max-path
 */
(function() {
    'use strict';

    const problem = {
        name: 'Binary Tree Maximum Path Sum',
        difficulty: 'Hard',
        algorithm: 'tree-max-path',
        parent: '01-branch-sums',
        description: 'Given a binary tree, find the maximum path sum. A path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain at least one node and does not need to go through the root.',
        problem: 'Use DFS (preorder, inorder, or postorder) to traverse the tree. Choose the traversal order based on when you need to process the node relative to its children.',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
        },
        hints: [
            'Preorder: process node, then left, then right.',
            'Inorder: process left, then node, then right (gives sorted order in BST).',
            'Postorder: process left, then right, then node.',
            'Use recursion or explicit stack.',
            'Pass accumulated values through parameters or return values.'
        ],
        examples: [
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2
                },
                "right": {
                        "value": 3
                }
        }
},
        output: 6,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2}, \'right\': {\'value\': 3}}, the result is 6.'
    },
    {
        input: {
        "tree": {
                "value": -10,
                "left": {
                        "value": 9
                },
                "right": {
                        "value": 20,
                        "left": {
                                "value": 15
                        },
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: 42,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': -10, \'left\': {\'value\': 9}, \'right\': {\'value\': 20, \'left\': {\'value\': 15}, \'right\': {\'value\': 7}}}, the result is 42.'
    }
        ],
        solutions: {
            python: `def binaryTreeMaximumPathSum(data):
    """
    Binary Tree Maximum Path Sum

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

// BinaryTreeMaximumPathSum solves the Binary Tree Maximum Path Sum problem.
// Time: O(n), Space: O(n)
func BinaryTreeMaximumPathSum(data interface{}) interface{} {
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
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/02-binary-tree-max-path-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/02-binary-tree-max-path-sum'] = problem;

})();
