/**
 * Find Successor
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-successor
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Successor',
        difficulty: 'Medium',
        algorithm: 'tree-successor',
        description: 'Write a function that takes in a Binary Tree (where nodes have an additional pointer to their parent node) and a target node contained in that tree. The function should return the in-order successor of the target node. The in-order successor of a node is the node that comes immediately after it in an in-order traversal of the tree. If the target node is the last node in the in-order traversal, return None/nil.',
        complexity: {
            time: 'O(h)',
            space: 'O(1)'
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
        },
        "target": 5
},
        output: 1,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4, \'left\': {\'value\': 6}}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3}}, target=5, the result is 1.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '05-find-successor', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/05-find-successor'] = problem;

})();
