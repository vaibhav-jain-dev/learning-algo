/**
 * Node Depths
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Node Depths',
        difficulty: 'Easy',
        algorithm: 'tree-dfs',
        description: 'Given a binary tree, return the sum of all node depths. The depth of a node is defined as the distance from that node to the root of the tree. The root node has depth 0, its children have depth 1, and so on.',
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
        output: 16,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4, \'left\': {\'value\': 8}, \'right\': {\'value\': 9}}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3, \'left\': {\'value\': 6}, \'right\': {\'value\': 7}}}, the result is 16.'
    }
        ],
        similar: [
    { id: '01-maximum-depth', name: 'Maximum Depth of Binary Tree', difficulty: 'Easy' },
    { id: '02-minimum-depth', name: 'Minimum Depth of Binary Tree', difficulty: 'Easy' },
    { id: '03-average-of-levels', name: 'Average of Levels in Binary Tree', difficulty: 'Easy' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths'] = problem;

})();
