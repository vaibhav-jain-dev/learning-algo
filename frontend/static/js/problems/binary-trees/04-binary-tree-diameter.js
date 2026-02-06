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
        twists: [
            { id: '04-binary-tree-diameter/twist-01-n-ary-tree-diameter', name: 'N-ary Tree Diameter', difficulty: 'Hard' },
            { id: '04-binary-tree-diameter/twist-02-iterative-diameter-computation', name: 'Iterative Diameter Computation', difficulty: 'Medium' },
            { id: '04-binary-tree-diameter/twist-03-diameter-as-node-count', name: 'Diameter as Node Count', difficulty: 'Easy' },
            { id: '04-binary-tree-diameter/twist-04-return-the-diameter-path', name: 'Return the Diameter Path', difficulty: 'Hard' },
            { id: '04-binary-tree-diameter/twist-05-weighted-edge-diameter', name: 'Weighted Edge Diameter', difficulty: 'Hard' }
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
