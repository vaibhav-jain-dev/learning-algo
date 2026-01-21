/**
 * Sum Root to Leaf Numbers
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sum Root to Leaf Numbers',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums',
        description: 'You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path in the tree represents a number formed by concatenating the digits. Return the total sum of all root-to-leaf numbers.',
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
        output: 25,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 1, \'left\': {\'value\': 2}, \'right\': {\'value\': 3}}, the result is 25.'
    },
    {
        input: {
        "tree": {
                "value": 4,
                "left": {
                        "value": 9,
                        "left": {
                                "value": 5
                        },
                        "right": {
                                "value": 1
                        }
                },
                "right": {
                        "value": 0
                }
        }
},
        output: 1026,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 4, \'left\': {\'value\': 9, \'left\': {\'value\': 5}, \'right\': {\'value\': 1}}, \'right\': {\'value\': 0}}, the result is 1026.'
    }
        ],
        solutions: {
            python: `def sumRootToLeafNumbers(data):
    """
    Sum Root to Leaf Numbers

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

// SumRootToLeafNumbers solves the Sum Root to Leaf Numbers problem.
// Time: O(n), Space: O(n)
func SumRootToLeafNumbers(data interface{}) interface{} {
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
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/03-sum-root-to-leaf-numbers', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/03-sum-root-to-leaf-numbers'] = problem;

})();
