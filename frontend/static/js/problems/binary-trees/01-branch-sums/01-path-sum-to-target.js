/**
 * Path Sum to Target
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Path Sum to Target',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        description: 'Given a binary tree and a target sum, find all root-to-leaf paths where the sum of node values equals the target. A leaf is a node with no children. Return all paths as lists of node values from root to leaf.',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "tree": {
                "value": 5,
                "left": {
                        "value": 4,
                        "left": {
                                "value": 11,
                                "left": {
                                        "value": 7
                                },
                                "right": {
                                        "value": 2
                                }
                        }
                },
                "right": {
                        "value": 8,
                        "left": {
                                "value": 13
                        },
                        "right": {
                                "value": 4,
                                "left": {
                                        "value": 5
                                },
                                "right": {
                                        "value": 1
                                }
                        }
                }
        },
        "target": 22
},
        output: [[5, 4, 11, 2], [5, 8, 4, 5]],
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 5, \'left\': {\'value\': 4, \'left\': {\'value\': 11, \'left\': {\'value\': 7}, \'right\': {\'value\': 2}}}, \'right\': {\'value\': 8, \'left\': {\'value\': 13}, \'right\': {\'value\': 4, \'left\': {\'value\': 5}, \'right\': {\'value\': 1}}}}, target=22, the result is [[5, 4, 11, 2], [5, 8, 4, 5]].'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2
                },
                "right": {
                        "value": 3
                }
        },
        "target": 4
},
        output: [[1, 3]],
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 1, \'left\': {\'value\': 2}, \'right\': {\'value\': 3}}, target=4, the result is [[1, 3]].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/01-path-sum-to-target', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/01-path-sum-to-target'] = problem;

})();
