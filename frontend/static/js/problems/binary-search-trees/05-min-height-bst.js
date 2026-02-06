/**
 * Min Height BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-construction-balanced
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Height BST',
        difficulty: 'Medium',
        algorithm: 'bst-construction-balanced',
        description: 'Write a function that takes in a non-empty sorted array of distinct integers, constructs a BST from the integers, and returns the root of the BST. The function should minimize the height of the BST. There can be more than one BST with minimum height; return any of them. A BST is a Binary Search Tree where each node\'s value is strictly greater than all values in its left subtree and less than or equal to all values in its right subtree.',
        complexity: {
            time: 'O(n)',
            space: 'O(n) for tree, O(log n) for recursion stack'
        },
        examples: [
    {
        input: {
        "array": [
                1,
                2,
                5,
                7,
                10,
                13,
                14,
                15,
                22
        ]
},
        output: [10, 2, 14, 1, 5, 13, 15, null, null, null, 7, null, null, null, 22],
        explanation: 'Processing the input data produces the output. For input array=[1, 2, ..., 22] (length 9), the result is [10, ..., 22] (length 15).'
    },
    {
        input: {
        "array": [
                1,
                2,
                3
        ]
},
        output: [2, 1, 3],
        explanation: 'Processing the input data produces the output. For input array=[1, 2, 3], the result is [2, 1, 3].'
    }
        ],
        twists: [
            {
                title: 'Maximum Height BST',
                difficulty: 'Easy',
                description: 'Given a sorted array, construct a BST with the maximum possible height (essentially a linked list). Return the root.',
                whyDifferent: 'Instead of balancing by choosing the middle element, you must think about how insertion order creates degenerate trees, reversing the core intuition of the original problem.',
                example: 'For [1, 2, 5, 7, 10], the max-height BST is a right-skewed chain: 1 -> 2 -> 5 -> 7 -> 10, with height 4.'
            },
            {
                title: 'Min Height BST with Weighted Nodes',
                difficulty: 'Hard',
                description: 'Each element has a weight. Construct a BST that minimizes the weighted path length (sum of weight * depth for all nodes), maintaining BST ordering.',
                whyDifferent: 'You can no longer simply pick the middle element. The optimal root depends on cumulative weights of left vs right partitions, requiring a dynamic programming approach similar to optimal BST construction.',
                example: 'For values [1, 2, 3] with weights [10, 1, 1], placing 1 as root (not 2) may yield a lower weighted path length since the heavily accessed node is at depth 0.'
            },
            {
                title: 'Min Height BST with Duplicates',
                difficulty: 'Medium',
                description: 'The sorted array may contain duplicate values. Construct a valid BST with minimum height where equal values go to the right subtree.',
                whyDifferent: 'Duplicates break the symmetry of the divide-and-conquer split. You must handle runs of identical values carefully, as placing the midpoint on a duplicate boundary can create unbalanced subtrees.',
                example: 'For [1, 2, 2, 2, 3], simply picking index 2 (value 2) as root works, but [2, 2, 2, 2, 2] requires careful handling to avoid a degenerate right-skewed tree.'
            },
            {
                title: 'Construct BST Within Height Limit',
                difficulty: 'Hard',
                description: 'Given a sorted array and a maximum height h, determine if a valid BST can be constructed within that height limit. If yes, return it; otherwise return null.',
                whyDifferent: 'You must reason about the relationship between array size and tree height. A balanced BST of height h holds at most 2^(h+1) - 1 nodes, adding a feasibility check before construction.',
                example: 'For array [1,2,3,4,5,6,7,8] with h=2, a height-2 BST holds at most 7 nodes, so return null. With h=3, it is feasible.'
            },
            {
                title: 'Min Height BST from Unsorted Array',
                difficulty: 'Medium',
                description: 'Given an unsorted array of distinct integers, construct a min-height BST. You may rearrange elements as needed.',
                whyDifferent: 'The original problem gives you a sorted array. Here you must first sort, but the twist is considering whether an O(n log n) sort-then-build approach can be beaten or if there are clever partitioning strategies.',
                example: 'For [7, 1, 10, 5, 2, 13, 14, 15, 22], sort to get [1,2,5,7,10,13,14,15,22] then apply the standard algorithm.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '05-min-height-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/05-min-height-bst'] = problem;

})();
