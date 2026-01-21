/**
 * Maximum Depth of Binary Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        algorithm: 'tree-dfs',
        parent: '02-node-depths',
        description: 'Given the root of a binary tree, return its maximum depth. A binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
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
                "value": 3,
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
        output: 3,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 3, \'left\': {\'value\': 9}, \'right\': {\'value\': 20, \'left\': {\'value\': 15}, \'right\': {\'value\': 7}}}, the result is 3.'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "right": {
                        "value": 2
                }
        }
},
        output: 2,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 1, \'right\': {\'value\': 2}}, the result is 2.'
    }
        ],
        solutions: {
            python: `def maximumDepthOfBinaryTree(data):
    """
    Maximum Depth of Binary Tree

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

// MaximumDepthOfBinaryTree solves the Maximum Depth of Binary Tree problem.
// Time: O(n), Space: O(n)
func MaximumDepthOfBinaryTree(data interface{}) interface{} {
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
        window.ProblemRenderer.register('binary-trees', '02-node-depths/01-maximum-depth', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/01-maximum-depth'] = problem;

})();
