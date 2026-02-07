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
        problem: 'Use depth-first search to explore all possible paths. Start from the root/source, go as deep as possible before backtracking. Track visited nodes to avoid cycles. This achieves O(n) time with O(h) space.',
        hints: [
            'Depth-first search explores as deep as possible before backtracking.',
            'Think about what state you need to track during the traversal.',
            'Consider using a visited set to avoid processing the same node twice.',
            'The recursion call stack naturally handles DFS backtracking for you.'
        ],

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
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    }
        ],
        twists: [
            { id: '10-all-kinds-node-depths/twist-01-sum-of-pairwise-distances', name: 'Sum of Pairwise Distances', difficulty: 'Very Hard' },
            { id: '10-all-kinds-node-depths/twist-02-weighted-node-depths', name: 'Weighted Node Depths', difficulty: 'Hard' },
            { id: '10-all-kinds-node-depths/twist-03-average-node-depth-across-all-roots', name: 'Average Node Depth Across All Roots', difficulty: 'Medium' },
            { id: '10-all-kinds-node-depths/twist-04-all-kinds-of-node-heights', name: 'All Kinds of Node Heights', difficulty: 'Hard' },
            { id: '10-all-kinds-node-depths/twist-05-node-depths-for-only-leaf-nodes', name: 'Node Depths for Only Leaf Nodes', difficulty: 'Medium' }
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
