/**
 * Max Path Sum in Binary Tree
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-max-path
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Path Sum in Binary Tree',
        difficulty: 'Hard',
        algorithm: 'tree-max-path',
        description: 'Write a function that takes in a Binary Tree and returns its max path sum. A path is a collection of connected nodes in a tree, where no node is connected to more than two other nodes. A path sum is the sum of the values of the nodes in a particular path. The path doesn\'t necessarily need to pass through the root, and it can start and end at any node. The path must contain at least one node.',
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
                        },
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: 18,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3, \'left\': {\'value\': 6}, \'right\': {\'value\': 7}}}, the result is 18.'
    },
    {
        input: {
        "tree": {
                "value": -10,
                "left": {
                        "value": 9
                },
                "right": {
                        "value": 20,
                        "left": {
                                "value": 15
                        },
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: 42,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': -10, \'left\': {\'value\': 9}, \'right\': {\'value\': 20, \'left\': {\'value\': 15}, \'right\': {\'value\': 7}}}, the result is 42.'
    }
        ],
        twists: [
            { id: '07-max-path-sum/twist-01-max-path-sum-with-exactly-k-nodes', name: 'Max Path Sum with Exactly K Nodes', difficulty: 'Very Hard' },
            { id: '07-max-path-sum/twist-02-min-path-sum-instead', name: 'Min Path Sum Instead', difficulty: 'Medium' },
            { id: '07-max-path-sum/twist-03-return-the-path-itself', name: 'Return the Path Itself', difficulty: 'Hard' },
            { id: '07-max-path-sum/twist-04-max-path-sum-in-dag-not-tree', name: 'Max Path Sum in DAG (Not Tree)', difficulty: 'Very Hard' },
            { id: '07-max-path-sum/twist-05-streaming-max-path-sum', name: 'Streaming Max Path Sum', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '07-max-path-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/07-max-path-sum'] = problem;

})();
