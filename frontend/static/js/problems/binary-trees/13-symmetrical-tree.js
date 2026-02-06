/**
 * Symmetrical Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-symmetry
 */
(function() {
    'use strict';

    const problem = {
        name: 'Symmetrical Tree',
        difficulty: 'Easy',
        algorithm: 'tree-symmetry',
        description: 'Write a function that takes in a Binary Tree and returns whether the tree is symmetric (a mirror of itself). A tree is symmetric if its left subtree is a mirror reflection of its right subtree. This means: - The root exists (or tree is empty, which is symmetric) - The left subtree\'s structure and values mirror the right subtree - For any node on the left, its left child mirrors the right child of the corresponding node on the right (and vice versa)',
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
                                "value": 3
                        },
                        "right": {
                                "value": 4
                        }
                },
                "right": {
                        "value": 2,
                        "left": {
                                "value": 4
                        },
                        "right": {
                                "value": 3
                        }
                }
        }
},
        output: true,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 3}, \'right\': {\'value\': 4}}, \'right\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 3}}}, the result is true.'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2,
                        "right": {
                                "value": 3
                        }
                },
                "right": {
                        "value": 2,
                        "right": {
                                "value": 3
                        }
                }
        }
},
        output: false,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'right\': {\'value\': 3}}, \'right\': {\'value\': 2, \'right\': {\'value\': 3}}}, the result is false.'
    }
        ],
        twists: [
            {
                title: 'Structurally Symmetric Only',
                difficulty: 'Easy',
                description: 'Determine if a binary tree is structurally symmetric (mirror shape) regardless of node values. Only the shape must be mirrored.',
                whyDifferent: 'The original checks both structure and values. Ignoring values simplifies the comparison but tests whether you understand that symmetry has two components: shape and content.',
                example: 'Tree [1, 2, 3, 4, null, null, 5] is structurally symmetric (left has left-child, right has right-child in mirror positions) even though values 2 != 3 and 4 != 5.'
            },
            {
                title: 'Fold Symmetry at Any Node',
                difficulty: 'Hard',
                description: 'Find all nodes in the tree where the subtree rooted at that node is symmetric. Return the list of such node values.',
                whyDifferent: 'Instead of checking the root once, you must check every subtree. A naive approach is O(n^2) but you can optimize by computing symmetry bottom-up, combining results from children.',
                example: 'Tree [1, 2, 2, 3, 4, 4, 3, null, null, 5, null, null, 5]. Root subtree is symmetric. Each leaf is trivially symmetric. Node 2 (left) with children [3, 4, null, null, 5] is not symmetric by itself.'
            },
            {
                title: 'Make Tree Symmetric',
                difficulty: 'Hard',
                description: 'Given a binary tree, find the minimum number of node value changes needed to make it symmetric. You can only change values, not structure.',
                whyDifferent: 'This transforms from a detection problem to an optimization problem. You must pair up mirror-position nodes and count how many pairs have different values. If the structure is not symmetric, it is impossible.',
                example: 'Tree [1, 2, 3, 4, 5, 5, 4]. Pairs: (2,3), (4,4), (5,5). Only pair (2,3) differs. Minimum changes = 1 (change 3 to 2 or 2 to 3).'
            },
            {
                title: 'Iterative Symmetry Check',
                difficulty: 'Medium',
                description: 'Check if the tree is symmetric using an iterative approach with a queue or stack, without any recursion.',
                whyDifferent: 'The recursive solution naturally mirrors the two-pointer comparison. Iteratively, you must enqueue pairs of nodes in the correct mirror order, which requires careful bookkeeping of which nodes to compare.',
                example: 'Tree [1, 2, 2, 3, 4, 4, 3]. Queue starts with [(2,2)]. Process: compare 2==2, enqueue [(3,4), (4,3)]. Compare 3==3, compare 4==4. All match, return true.'
            },
            {
                title: 'Quasi-Symmetric Tree',
                difficulty: 'Medium',
                description: 'A tree is quasi-symmetric if it becomes symmetric after at most one subtree swap (swapping left and right children of exactly one node). Determine if a tree is quasi-symmetric.',
                whyDifferent: 'You need to find where symmetry breaks and determine if a single swap can fix it. This requires identifying the first mismatch point and checking if swapping at that point resolves all remaining asymmetries.',
                example: 'Tree [1, 2, 2, 3, 4, 3, 4]. Not symmetric because left subtree [2, 3, 4] mirrors to expect [2, 4, 3] on right but finds [2, 3, 4]. Swapping children of right-2 gives [2, 4, 3], making it symmetric. Quasi-symmetric = true.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '13-symmetrical-tree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/13-symmetrical-tree'] = problem;

})();
