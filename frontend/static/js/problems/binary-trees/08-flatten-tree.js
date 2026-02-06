/**
 * Flatten Binary Tree
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-flatten
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten Binary Tree',
        difficulty: 'Medium',
        algorithm: 'tree-flatten',
        description: 'Write a function that takes in a Binary Tree, flattens it, and returns its leftmost node. A flattened Binary Tree is a structure that\'s nearly identical to a Doubly Linked List (except that nodes have left and right pointers instead of prev and next pointers), where nodes follow the original tree\'s left-to-right order. After flattening, each node\'s left pointer should point to the previous node in the flattened structure, and its right pointer should point to the next node.',
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
                                "value": 5
                        }
                },
                "right": {
                        "value": 3,
                        "left": {
                                "value": 6
                        }
                }
        }
},
        output: "4 <-> 2 <-> 5 <-> 1 <-> 6 <-> 3",
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3, \'left\': {\'value\': 6}}}, the result is 4 <-> 2 <-> 5 <-> 1 <-> 6 <-> 3.'
    }
        ],
        twists: [
            { id: '08-flatten-tree/twist-01-flatten-to-right-skewed-list', name: 'Flatten to Right-Skewed List', difficulty: 'Medium' },
            { id: '08-flatten-tree/twist-02-flatten-to-circular-doubly-linked-list', name: 'Flatten to Circular Doubly Linked List', difficulty: 'Hard' },
            { id: '08-flatten-tree/twist-03-flatten-by-levels', name: 'Flatten by Levels', difficulty: 'Hard' },
            { id: '08-flatten-tree/twist-04-flatten-with-separator-nodes', name: 'Flatten with Separator Nodes', difficulty: 'Medium' },
            { id: '08-flatten-tree/twist-05-unflatten-back-to-original-tree', name: 'Unflatten Back to Original Tree', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '08-flatten-tree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/08-flatten-tree'] = problem;

})();
