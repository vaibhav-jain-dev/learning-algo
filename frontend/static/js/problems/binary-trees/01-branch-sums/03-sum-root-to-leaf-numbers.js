/**
 * Sum Root to Leaf Numbers
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sum Root to Leaf Numbers',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        description: 'You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path in the tree represents a number formed by concatenating the digits. Return the total sum of all root-to-leaf numbers.',
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
                        "value": 2
                },
                "right": {
                        "value": 3
                }
        }
},
        output: 25,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 1, \'left\': {\'value\': 2}, \'right\': {\'value\': 3}}, the result is 25.'
    },
    {
        input: {
        "tree": {
                "value": 4,
                "left": {
                        "value": 9,
                        "left": {
                                "value": 5
                        },
                        "right": {
                                "value": 1
                        }
                },
                "right": {
                        "value": 0
                }
        }
},
        output: 1026,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 4, \'left\': {\'value\': 9, \'left\': {\'value\': 5}, \'right\': {\'value\': 1}}, \'right\': {\'value\': 0}}, the result is 1026.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/03-sum-root-to-leaf-numbers', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/03-sum-root-to-leaf-numbers'] = problem;

})();
