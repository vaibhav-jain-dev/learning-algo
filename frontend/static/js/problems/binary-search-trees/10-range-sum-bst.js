/**
 * Range Sum of BST
 * Category: binary-search-trees
 * Difficulty: Easy
 * Algorithm: bst-range
 */
(function() {
    'use strict';

    const problem = {
        name: 'Range Sum of BST',
        difficulty: 'Easy',
        algorithm: 'bst-range',
        description: 'Given the root node of a Binary Search Tree (BST) and two integers low and high, return the sum of values of all nodes with a value in the inclusive range [low, high].',
        complexity: {
            time: 'O(n) worst, O(h + k) with pruning',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "tree": [
                10,
                5,
                15,
                3,
                7,
                null,
                18
        ],
        "low": 7,
        "high": 15
},
        output: 32,
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 18] (length 7), low=7, high=15, the result is 32.'
    },
    {
        input: {
        "tree": [
                10,
                5,
                15,
                3,
                7,
                13,
                18,
                1,
                null,
                6
        ],
        "low": 6,
        "high": 10
},
        output: 23,
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 6] (length 10), low=6, high=10, the result is 23.'
    }
        ],
        twists: [
            {
                title: 'Range Count in BST',
                difficulty: 'Easy',
                description: 'Instead of returning the sum of values in [low, high], return the count of nodes whose values fall within the range.',
                whyDifferent: 'The traversal and pruning logic remain the same, but you accumulate a count instead of a sum. This tests whether you understand the pruning is independent of the aggregation function.',
                example: 'BST [10, 5, 15, 3, 7, null, 18], low=7, high=15. Nodes in range: 7, 10, 15. Count = 3 (sum would be 32).'
            },
            {
                title: 'Range Product in BST',
                difficulty: 'Medium',
                description: 'Return the product of all node values in the range [low, high]. Handle the case where no nodes fall in the range by returning 1.',
                whyDifferent: 'Product accumulation means the identity element is 1 (not 0 like sum). More importantly, large products can overflow, so you may need to consider modular arithmetic or big integer handling.',
                example: 'BST [10, 5, 15, 3, 7, null, 18], low=7, high=15. Nodes in range: 7, 10, 15. Product = 7 * 10 * 15 = 1050.'
            },
            {
                title: 'Exclusive Range Sum',
                difficulty: 'Easy',
                description: 'Return the sum of values strictly between low and high (exclusive bounds, not inclusive).',
                whyDifferent: 'The boundary conditions change from <= to <, which affects how you prune at the boundaries. When the current node equals low or high, you must exclude it but still explore the appropriate subtree.',
                example: 'BST [10, 5, 15, 3, 7, null, 18], low=5, high=15. Exclusive range means only 7 and 10 are included. Sum = 17.'
            },
            {
                title: 'Range Sum with Updates',
                difficulty: 'Hard',
                description: 'Support two operations on the BST: update a node value, and query the range sum for [low, high]. Maintain BST validity after updates.',
                whyDifferent: 'Static range sum is a one-pass problem. With updates, you need to consider rebalancing and potentially augmenting nodes with subtree sums for efficient repeated queries, pushing toward a segment tree or BIT mindset.',
                example: 'BST [10, 5, 15, 3, 7, null, 18]. Query(7, 15) = 32. Update node 7 to 9. Query(7, 15) = 34. The BST property must be maintained after update.'
            },
            {
                title: 'Kth Smallest in Range',
                difficulty: 'Hard',
                description: 'Find the kth smallest value that falls within the range [low, high] in the BST.',
                whyDifferent: 'You combine range filtering with order statistics. You cannot simply do inorder traversal and count, because pruning for efficiency while tracking position within the filtered set requires careful state management.',
                example: 'BST [10, 5, 15, 3, 7, 13, 18, 1], low=5, high=15. Values in range sorted: [5, 7, 10, 13, 15]. k=3 returns 10.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '10-range-sum-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/10-range-sum-bst'] = problem;

})();
