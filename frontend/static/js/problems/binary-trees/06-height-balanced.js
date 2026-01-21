/**
 * Height Balanced Binary Tree
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-balanced
 */
(function() {
    'use strict';

    const problem = {
        name: 'Height Balanced Binary Tree',
        difficulty: 'Medium',
        algorithm: 'tree-balanced',
        description: 'Write a function that takes in a Binary Tree and returns whether it is height-balanced. A binary tree is height-balanced if for each node in the tree, the difference between the height of its left subtree and the height of its right subtree is at most 1. An empty tree is considered height-balanced.',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 4
                        },
                        "right": {
                                "value": 5,
                                "left": {
                                        "value": 7
                                },
                                "right": {
                                        "value": 8
                                }
                        }
                },
                "right": {
                        "value": 3,
                        "right": {
                                "value": 6
                        }
                }
        }
},
        output: true,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 5, \'left\': {\'value\': 7}, \'right\': {\'value\': 8}}}, \'right\': {\'value\': 3, \'right\': {\'value\': 6}}}, the result is true.'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 4,
                                "left": {
                                        "value": 6
                                }
                        },
                        "right": {
                                "value": 5
                        }
                },
                "right": {
                        "value": 3
                }
        }
},
        output: false,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4, \'left\': {\'value\': 6}}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3}}, the result is false.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '06-height-balanced', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/06-height-balanced'] = problem;

})();
