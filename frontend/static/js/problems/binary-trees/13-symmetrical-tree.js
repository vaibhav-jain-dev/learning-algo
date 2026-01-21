/**
 * Symmetrical Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-symmetry
 */
(function() {
    'use strict';

    const problem = {
        name: 'Symmetrical Tree',
        difficulty: 'Easy',
        algorithm: 'tree-symmetry',
        description: 'Write a function that takes in a Binary Tree and returns whether the tree is symmetric (a mirror of itself). A tree is symmetric if its left subtree is a mirror reflection of its right subtree. This means: - The root exists (or tree is empty, which is symmetric) - The left subtree\'s structure and values mirror the right subtree - For any node on the left, its left child mirrors the right child of the corresponding node on the right (and vice versa)',
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
                                "value": 3
                        },
                        "right": {
                                "value": 4
                        }
                },
                "right": {
                        "value": 2,
                        "left": {
                                "value": 4
                        },
                        "right": {
                                "value": 3
                        }
                }
        }
},
        output: true,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 3}, \'right\': {\'value\': 4}}, \'right\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 3}}}, the result is true.'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2,
                        "right": {
                                "value": 3
                        }
                },
                "right": {
                        "value": 2,
                        "right": {
                                "value": 3
                        }
                }
        }
},
        output: false,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'right\': {\'value\': 3}}, \'right\': {\'value\': 2, \'right\': {\'value\': 3}}}, the result is false.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '13-symmetrical-tree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/13-symmetrical-tree'] = problem;

})();
