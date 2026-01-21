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
        problem: 'Use DFS, passing the current depth as a parameter. Start with depth 0 at the root. For each node, add its depth to a running total, then recursively process children with depth+1. Alternatively, use BFS with a queue storing (node, depth) pairs.',
        hints: [
            'Each node contributes its depth to the total sum. How do you track depth as you traverse?',
            'Pass the current depth as a parameter in your recursive function.',
            'For each node: add depth to sum, then recurse on children with depth+1.',
            'Base case: if node is null, return 0 (contributes nothing to the sum).'
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
                "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5}},
                "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}
        }
        },
        output: 16,
        explanation: 'Depth 0: node 1 (contributes 0). Depth 1: nodes 2,3 (contributes 2). Depth 2: nodes 4,5,6,7 (contributes 8). Depth 3: nodes 8,9 (contributes 6). Total: 0+2+8+6 = 16.'
    }
        ],
        similar: [
    { id: '02-node-depths/02-node-depths/01-maximum-depth', name: 'Maximum Depth of Binary Tree', difficulty: 'Easy' },
    { id: '02-node-depths/02-minimum-depth', name: 'Minimum Depth of Binary Tree', difficulty: 'Easy' },
    { id: '02-node-depths/03-average-of-levels', name: 'Average of Levels in Binary Tree', difficulty: 'Easy' }
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
