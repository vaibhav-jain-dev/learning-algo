/**
 * Invert Binary Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-invert
 */
(function() {
    'use strict';

    const problem = {
        name: 'Invert Binary Tree',
        difficulty: 'Easy',
        algorithm: 'tree-invert',
        description: 'Write a function that takes in a Binary Tree and inverts it. In other words, the function should swap every left node in the tree for its corresponding right node. Inverting a binary tree means mirroring it along its vertical axis. After inversion, the left subtree becomes the right subtree and vice versa at every level.',
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
        output: {"value": 1, "left": {"value": 3, "left": {"value": 7}, "right": {"value": 6}}, "right": {"value": 2, "left": {"value": 5}, "right": {"value": 4, "left": {"value": 9}, "right": {"value": 8}}}},
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4, \'left\': {\'value\': 8}, \'right\': {\'value\': 9}}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3, \'left\': {\'value\': 6}, \'right\': {\'value\': 7}}}, the result is {\'value\': 1, \'left\': {\'value\': 3, \'left\': {\'value\': 7}, \'right\': {\'value\': 6}}, \'right\': {\'value\': 2, \'left\': {\'value\': 5}, \'right\': {\'value\': 4, \'left\': {\'value\': 9}, \'right\': {\'value\': 8}}}}.'
    }
        ],
        twists: [
            {
                title: 'Iterative Inversion with BFS',
                difficulty: 'Easy',
                description: 'Invert the binary tree using a queue-based BFS approach instead of recursion. Swap children at each node as you process it.',
                whyDifferent: 'Recursion naturally handles the tree bottom-up or top-down. With BFS, you process level by level and must swap children explicitly when dequeuing each node. The order of processing differs but the result is the same.',
                example: 'Queue: [1]. Dequeue 1, swap children (2,3)->(3,2), enqueue 3,2. Continue per level.'
            },
            {
                title: 'Invert N-ary Tree',
                difficulty: 'Medium',
                description: 'Invert an N-ary tree by reversing the order of children at every node.',
                whyDifferent: 'Instead of swapping left/right, you must reverse an entire children array at each node. The recursive structure changes from swap(left,right) to children.reverse().',
                example: 'Node(1, children=[A, B, C]) becomes Node(1, children=[C, B, A]), applied recursively.'
            },
            {
                title: 'Invert Only Specific Levels',
                difficulty: 'Medium',
                description: 'Invert the tree only at even-numbered levels (0-indexed). Odd levels remain unchanged.',
                whyDifferent: 'Requires tracking depth during traversal. You can no longer blindly swap at every node; you must conditionally swap based on the current level, adding a depth parameter to your recursion.',
                example: 'Level 0 (root): swap. Level 1: no swap. Level 2: swap. Creates a partially mirrored tree.'
            },
            {
                title: 'Detect If Already Inverted',
                difficulty: 'Medium',
                description: 'Given two trees, determine if one is the inversion of the other without actually inverting either tree.',
                whyDifferent: 'Instead of modifying the tree, you compare two trees simultaneously. At each node, the left of tree1 must match the right of tree2 and vice versa. This is a comparison, not a transformation.',
                example: 'Tree1: 1->2,3. Tree2: 1->3,2. Return true (tree2 is the inversion of tree1).'
            },
            {
                title: 'Invert Without Modifying Original',
                difficulty: 'Medium',
                description: 'Create a new inverted tree without modifying the original tree. Return the root of the new tree.',
                whyDifferent: 'You must allocate new nodes instead of swapping pointers in place. Each recursive call creates a new node with swapped children, resulting in O(n) additional space for the new tree.',
                example: 'Original tree remains unchanged. New tree is returned with all left/right swapped.'
            },
            {
                title: 'Concurrent Inversion Safety',
                difficulty: 'Hard',
                description: 'Multiple threads attempt to invert the same tree simultaneously. What happens? Design a thread-safe inversion.',
                whyDifferent: 'Double inversion restores the original tree. If two threads invert concurrently, partial inversions can corrupt the tree. Forces thinking about atomicity, locks, or copy-on-write strategies.',
                example: 'Thread 1 swaps node A\'s children. Thread 2 swaps the same node. Result: original state, but intermediate reads may see corrupted data.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '03-invert-tree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/03-invert-tree'] = problem;

})();
