/**
 * Invert Binary Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-invert
 */
(function() {
    'use strict';

    const problem = {
        name: 'Invert Binary Tree',
        difficulty: 'Easy',
        algorithm: 'tree-invert',
        description: 'Write a function that takes in a Binary Tree and inverts it. In other words, the function should swap every left node in the tree for its corresponding right node. Inverting a binary tree means mirroring it along its vertical axis. After inversion, the left subtree becomes the right subtree and vice versa at every level.',
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
                                "value": 4,
                                "left": {
                                        "value": 8
                                },
                                "right": {
                                        "value": 9
                                }
                        },
                        "right": {
                                "value": 5
                        }
                },
                "right": {
                        "value": 3,
                        "left": {
                                "value": 6
                        },
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: {"value": 1, "left": {"value": 3, "left": {"value": 7}, "right": {"value": 6}}, "right": {"value": 2, "left": {"value": 5}, "right": {"value": 4, "left": {"value": 9}, "right": {"value": 8}}}},
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4, \'left\': {\'value\': 8}, \'right\': {\'value\': 9}}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3, \'left\': {\'value\': 6}, \'right\': {\'value\': 7}}}, the result is {\'value\': 1, \'left\': {\'value\': 3, \'left\': {\'value\': 7}, \'right\': {\'value\': 6}}, \'right\': {\'value\': 2, \'left\': {\'value\': 5}, \'right\': {\'value\': 4, \'left\': {\'value\': 9}, \'right\': {\'value\': 8}}}}.'
    }
        ],
        twists: [
            { id: '03-invert-tree/twist-01-iterative-inversion-with-bfs', name: 'Iterative Inversion with BFS', difficulty: 'Easy' },
            { id: '03-invert-tree/twist-02-invert-n-ary-tree', name: 'Invert N-ary Tree', difficulty: 'Medium' },
            { id: '03-invert-tree/twist-03-invert-only-specific-levels', name: 'Invert Only Specific Levels', difficulty: 'Medium' },
            { id: '03-invert-tree/twist-04-detect-if-already-inverted', name: 'Detect If Already Inverted', difficulty: 'Medium' },
            { id: '03-invert-tree/twist-05-invert-without-modifying-original', name: 'Invert Without Modifying Original', difficulty: 'Medium' },
            { id: '03-invert-tree/twist-06-concurrent-inversion-safety', name: 'Concurrent Inversion Safety', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '03-invert-tree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/03-invert-tree'] = problem;

})();
