/**
 * All Kinds of Node Depths
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Kinds of Node Depths',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        description: 'Write a function that takes in a Binary Tree and returns the sum of all the depths of all nodes in the tree, considering each node as a potential root. More formally, for every node in the tree, calculate the sum of its depths (treating that node as a root), and return the sum of all these values. This is different from the standard "sum of node depths" problem where you only consider depths from the actual root.',
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
        output: 26,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4, \'left\': {\'value\': 8}, \'right\': {\'value\': 9}}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3, \'left\': {\'value\': 6}, \'right\': {\'value\': 7}}}, the result is 26.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '10-all-kinds-node-depths', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/10-all-kinds-node-depths'] = problem;

})();
