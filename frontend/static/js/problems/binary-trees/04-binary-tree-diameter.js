/**
 * Binary Tree Diameter
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-diameter
 */
(function() {
    'use strict';

    const problem = {
        name: 'Binary Tree Diameter',
        difficulty: 'Medium',
        algorithm: 'tree-diameter',
        description: 'Write a function that takes in a Binary Tree and returns its diameter. The diameter of a binary tree is the length of the longest path between any two nodes in the tree. This path may or may not pass through the root. The length of a path is measured by the number of edges between the two nodes (not the number of nodes).',
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
                        "value": 3,
                        "left": {
                                "value": 7,
                                "left": {
                                        "value": 8
                                }
                        },
                        "right": {
                                "value": 4,
                                "right": {
                                        "value": 5,
                                        "right": {
                                                "value": 6
                                        }
                                }
                        }
                },
                "right": {
                        "value": 2
                }
        }
},
        output: 6,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 3, \'left\': {\'value\': 7, \'left\': {\'value\': 8}}, \'right\': {\'value\': 4, \'right\': {\'value\': 5, \'right\': {\'value\': 6}}}}, \'right\': {\'value\': 2}}, the result is 6.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '04-binary-tree-diameter', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/04-binary-tree-diameter'] = problem;

})();
