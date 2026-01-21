/**
 * Average of Levels in Binary Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Average of Levels in Binary Tree',
        difficulty: 'Easy',
        algorithm: 'tree-bfs',
        description: 'Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10^-5 of the actual answer will be accepted.',
        complexity: {
            time: 'O(n)',
            space: 'O(w)'
        },
        examples: [
    {
        input: {
        "tree": {
                "value": 3,
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
        output: [3.0, 14.5, 11.0],
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input tree={\'value\': 3, \'left\': {\'value\': 9}, \'right\': {\'value\': 20, \'left\': {\'value\': 15}, \'right\': {\'value\': 7}}}, the result is [3.0, 14.5, 11.0].'
    },
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
                        "right": {
                                "value": 6
                        }
                }
        }
},
        output: [1.0, 2.5, 5.0],
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3, \'right\': {\'value\': 6}}}, the result is [1.0, 2.5, 5.0].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '03-average-of-levels', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/03-average-of-levels'] = problem;

})();
