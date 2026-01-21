/**
 * Minimum Depth of Binary Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Depth of Binary Tree',
        difficulty: 'Easy',
        algorithm: 'tree-bfs',
        description: 'Given a binary tree, find its minimum depth. The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node. **Note:** A leaf is a node with no children.',
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
        output: 2,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input tree={\'value\': 3, \'left\': {\'value\': 9}, \'right\': {\'value\': 20, \'left\': {\'value\': 15}, \'right\': {\'value\': 7}}}, the result is 2.'
    },
    {
        input: {
        "tree": {
                "value": 2,
                "right": {
                        "value": 3,
                        "right": {
                                "value": 4,
                                "right": {
                                        "value": 5,
                                        "right": {
                                                "value": 6
                                        }
                                }
                        }
                }
        }
},
        output: 5,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input tree={\'value\': 2, \'right\': {\'value\': 3, \'right\': {\'value\': 4, \'right\': {\'value\': 5, \'right\': {\'value\': 6}}}}}, the result is 5.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-minimum-depth', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-minimum-depth'] = problem;

})();
