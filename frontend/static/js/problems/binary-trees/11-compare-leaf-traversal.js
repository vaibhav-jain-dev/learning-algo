/**
 * Compare Leaf Traversal
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Compare Leaf Traversal',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        description: 'Write a function that takes in the root nodes of two Binary Trees and returns a boolean representing whether their leaf traversals are the same. The leaf traversal of a Binary Tree is the left-to-right sequence of all the leaf nodes in the tree. A leaf node is any node that has no left or right children.',
        complexity: {
            time: 'O(n + m)',
            space: 'O(h1 + h2)'
        },
        examples: [
    {
        input: {
        "tree1": {
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
        },
        "tree2": {
                "value": 1,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 4
                        },
                        "right": {
                                "value": 7,
                                "right": {
                                        "value": 5,
                                        "right": {
                                                "value": 6
                                        }
                                }
                        }
                },
                "right": {
                        "value": 3,
                        "left": {
                                "value": 8
                        }
                }
        }
},
        output: true,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree1={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 5, \'left\': {\'value\': 7}, \'right\': {\'value\': 8}}}, \'right\': {\'value\': 3, \'right\': {\'value\': 6}}}, tree2={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 7, \'right\': {\'value\': 5, \'right\': {\'value\': 6}}}}, \'right\': {\'value\': 3, \'left\': {\'value\': 8}}}, the result is true.'
    }
        ],
        twists: [
            { id: '11-compare-leaf-traversal/twist-01-compare-right-edge-traversal', name: 'Compare Right-Edge Traversal', difficulty: 'Medium' },
            { id: '11-compare-leaf-traversal/twist-02-compare-boundary-traversal', name: 'Compare Boundary Traversal', difficulty: 'Hard' },
            { id: '11-compare-leaf-traversal/twist-03-leaf-traversal-with-depth', name: 'Leaf Traversal with Depth', difficulty: 'Medium' },
            { id: '11-compare-leaf-traversal/twist-04-interleaved-leaf-comparison', name: 'Interleaved Leaf Comparison', difficulty: 'Hard' },
            { id: '11-compare-leaf-traversal/twist-05-leaf-traversal-of-n-trees', name: 'Leaf Traversal of N Trees', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '11-compare-leaf-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/11-compare-leaf-traversal'] = problem;

})();
