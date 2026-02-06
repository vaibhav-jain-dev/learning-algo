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
        twists: [
            {
                title: 'N-ary Tree Node Depths',
                difficulty: 'Medium',
                description: 'Compute the sum of all node depths in an N-ary tree where each node can have any number of children.',
                whyDifferent: 'Instead of recursing on left/right, you iterate over a children array. The core logic stays similar but the traversal pattern and base cases change for variable branching.',
                example: 'Node(1, children=[Node(2, children=[Node(4)]), Node(3)]). Depths: 0+1+1+2=4.'
            },
            {
                title: 'Iterative BFS Node Depths',
                difficulty: 'Easy',
                description: 'Compute sum of node depths using BFS (level-order traversal) instead of DFS. Use the level number as the depth.',
                whyDifferent: 'BFS naturally tracks depth by level. Instead of passing depth as a recursive parameter, you use the queue level counter. All nodes at level k contribute k to the sum.',
                example: 'Level 0: 1 node (depth 0). Level 1: 2 nodes (depth 2). Level 2: 4 nodes (depth 8). Total: 10.'
            },
            {
                title: 'Weighted Node Depths',
                difficulty: 'Medium',
                description: 'Each node has a weight. The contribution of a node is weight * depth. Return the weighted depth sum.',
                whyDifferent: 'You cannot just count depth; you must multiply by each node\'s value. This changes the accumulation logic and prevents simple level-counting optimizations.',
                example: 'Tree: 1(w=3)->2(w=1)->4(w=2). Weighted depths: 3*0 + 1*1 + 2*2 = 5.'
            },
            {
                title: 'Space-Constrained Morris Traversal',
                difficulty: 'Hard',
                description: 'Compute the sum of node depths using O(1) extra space (no recursion stack, no queue). Use Morris traversal but track depth.',
                whyDifferent: 'Morris traversal does not naturally track depth. You must compute depth changes by counting thread hops, making the depth tracking significantly more complex.',
                example: 'Same result as base problem but achieved without any stack or queue data structure.'
            },
            {
                title: 'Streaming Node Insertions',
                difficulty: 'Hard',
                description: 'Nodes are inserted one at a time into a BST. After each insertion, report the current sum of all node depths without re-traversing.',
                whyDifferent: 'Each insertion changes the depth of zero existing nodes (BST insertion adds a leaf). You need to incrementally update the total by adding the depth of the new leaf, computed during the insertion path.',
                example: 'Insert 5: sum=0. Insert 3: sum=1. Insert 7: sum=2. Insert 1: sum=4 (new node at depth 2).'
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
