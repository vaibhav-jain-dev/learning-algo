/**
 * Iterative In-Order Traversal
 * Category: binary-trees
 * Difficulty: Very
 * Algorithm: tree-iterative
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative In-Order Traversal',
        difficulty: 'Very',
        algorithm: 'tree-iterative',
        description: 'Write a function that takes in a binary tree and returns its in-order traversal as a list of values. **The catch:** You must do this **without using recursion AND without using a stack or any other auxiliary data structure** for storing nodes. In other words, achieve O(1) space complexity (excluding the output array). This requires implementing **Morris Traversal**, a technique that temporarily modifies the tree structure using threaded binary trees.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "tree": {
                "value": 4,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 1
                        },
                        "right": {
                                "value": 3
                        }
                },
                "right": {
                        "value": 6,
                        "left": {
                                "value": 5
                        },
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: [1, 2, 3, 4, 5, 6, 7],
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 4, \'left\': {\'value\': 2, \'left\': {\'value\': 1}, \'right\': {\'value\': 3}}, \'right\': {\'value\': 6, \'left\': {\'value\': 5}, \'right\': {\'value\': 7}}}, the result is [1, ..., 7] (length 7).'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "right": {
                        "value": 2,
                        "left": {
                                "value": 3
                        }
                }
        }
},
        output: [1, 3, 2],
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'right\': {\'value\': 2, \'left\': {\'value\': 3}}}, the result is [1, 3, 2].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '16-iterative-inorder-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/16-iterative-inorder-traversal'] = problem;

})();
