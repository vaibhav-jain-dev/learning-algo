/**
 * Height Balanced Binary Tree
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-balanced
 */
(function() {
    'use strict';

    const problem = {
        name: 'Height Balanced Binary Tree',
        difficulty: 'Medium',
        algorithm: 'tree-balanced',
        description: 'Write a function that takes in a Binary Tree and returns whether it is height-balanced. A binary tree is height-balanced if for each node in the tree, the difference between the height of its left subtree and the height of its right subtree is at most 1. An empty tree is considered height-balanced.',
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
                                "value": 4
                        },
                        "right": {
                                "value": 5,
                                "left": {
                                        "value": 7
                                },
                                "right": {
                                        "value": 8
                                }
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
        output: true,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 5, \'left\': {\'value\': 7}, \'right\': {\'value\': 8}}}, \'right\': {\'value\': 3, \'right\': {\'value\': 6}}}, the result is true.'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 4,
                                "left": {
                                        "value": 6
                                }
                        },
                        "right": {
                                "value": 5
                        }
                },
                "right": {
                        "value": 3
                }
        }
},
        output: false,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4, \'left\': {\'value\': 6}}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3}}, the result is false.'
    }
        ],
        twists: [
            {
                title: 'Weight-Balanced Tree Check',
                difficulty: 'Medium',
                description: 'Instead of height-balanced, check if the tree is weight-balanced: for each node, the number of nodes in the left subtree and right subtree differ by at most 1.',
                whyDifferent: 'Height-balanced compares subtree heights. Weight-balanced compares subtree node counts. The recursive return value changes from height to count, and the balance condition applies to counts instead.',
                example: 'Tree: 1->2->4, 1->3. Left subtree has 2 nodes, right has 1. Difference is 1, so weight-balanced.'
            },
            {
                title: 'Iterative Balance Check',
                difficulty: 'Medium',
                description: 'Determine if the tree is height-balanced without using recursion. Use iterative postorder traversal.',
                whyDifferent: 'Recursion naturally returns height bottom-up. Iteratively, you must use a stack for postorder traversal and a hash map to store computed heights, checking the balance condition when processing each node.',
                example: 'Process leaves first (height 0), store in map. When processing parent, look up children heights in map.'
            },
            {
                title: 'N-ary Tree Height-Balanced',
                difficulty: 'Medium',
                description: 'Check if an N-ary tree is height-balanced: for each node, the difference between the tallest and shortest child subtree heights is at most 1.',
                whyDifferent: 'With binary trees you compare two heights. With N-ary trees, you must find the max and min heights among all children, requiring a pass over the children array at each node.',
                example: 'Node(1, children=[Node(2, children=[Node(4)]), Node(3)]). Heights: [2, 1]. Diff=1, balanced.'
            },
            {
                title: 'Find the Unbalanced Node',
                difficulty: 'Medium',
                description: 'Instead of returning true/false, return the deepest node in the tree where the height-balanced property is violated. Return null if the tree is balanced.',
                whyDifferent: 'Changes from a boolean check to finding a specific node. You must continue traversal even after finding an imbalance to find the deepest one, rather than returning early.',
                example: 'Unbalanced tree: 1->2->4->6, 1->3. Node 2 (heights 2 vs 0) and node 1 (heights 3 vs 1) are both unbalanced. Deepest is node 2.'
            },
            {
                title: 'Conceptual Trap: Balanced vs Complete',
                difficulty: 'Easy',
                description: 'Is every height-balanced tree also a complete binary tree? Is every complete binary tree height-balanced? Explain the difference.',
                whyDifferent: 'Tests understanding of tree properties. A complete tree is always height-balanced, but a height-balanced tree is NOT necessarily complete (it can have gaps at the last level as long as heights differ by at most 1).',
                example: 'Tree: 1->2->4, 1->3->null,6. Height-balanced (heights 2 vs 2) but NOT complete (level 2 has a gap).'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '06-height-balanced', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/06-height-balanced'] = problem;

})();
