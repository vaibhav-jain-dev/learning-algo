/**
 * Sum BSTs
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sum BSTs',
        difficulty: 'Hard',
        algorithm: 'bst-sum',
        description: 'Given the root of a binary tree (not necessarily a BST), find the sum of values of all subtrees that are valid Binary Search Trees. A subtree rooted at node X is a valid BST if: 1. All values in the left subtree of X are less than X\'s value 2. All values in the right subtree of X are greater than X\'s value 3. Both the left and right subtrees are also BSTs A single node with no children is considered a valid BST. Return the total sum of all nodes that belong to BST subtrees. If a node is part of ',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "tree": [
                1,
                4,
                3,
                2,
                4,
                null,
                5,
                null,
                null,
                null,
                null,
                4,
                6
        ]
},
        output: 49,
        explanation: 'Processing the input data produces the output. For input tree=[1, 4, ..., 6] (length 13), the result is 49.'
    },
    {
        input: {
        "tree": [
                5,
                4,
                8,
                3,
                null,
                6,
                3
        ]
},
        output: 7,
        explanation: 'Processing the input data produces the output. For input tree=[5, 4, ..., 3] (length 7), the result is 7.'
    }
        ],
        twists: [
            {
                title: 'Largest BST Subtree',
                difficulty: 'Hard',
                description: 'Instead of summing all BST subtree values, find the largest BST subtree (by number of nodes) within the binary tree and return its size.',
                whyDifferent: 'Summing all BST subtrees accumulates across many subtrees. Finding the largest requires comparison and tracking of the maximum, and you must be careful that a valid BST subtree includes all descendants, not just some.',
                example: 'Tree [10, 5, 15, 1, 8, null, 7]. The subtree rooted at 5 (with children 1, 8) is a valid BST of size 3. The full tree is not a valid BST because 7 < 15 is in the right subtree of 15 on the wrong side.'
            },
            {
                title: 'Count BST Subtrees',
                difficulty: 'Medium',
                description: 'Count the total number of subtrees in the binary tree that are valid BSTs. Single nodes count as valid BSTs.',
                whyDifferent: 'Instead of summing values, you count occurrences. The traversal is similar but the aggregation differs, and you must decide whether overlapping subtrees (a BST subtree within a larger BST subtree) should both be counted.',
                example: 'Tree [1, 4, 3, 2, 4, null, 5, null, null, null, null, 4, 6]. Each leaf is a BST (6 leaves). The subtree [3, null, 5, 4, 6] is also a BST. Total count = 9.'
            },
            {
                title: 'Sum BSTs with Range Constraint',
                difficulty: 'Hard',
                description: 'Find the sum of all BST subtree node values, but only count BST subtrees where all values fall within a given range [low, high].',
                whyDifferent: 'You need to validate both the BST property AND the range constraint simultaneously. A valid BST subtree might be excluded if any of its values fall outside the range, adding an extra filtering dimension to the bottom-up check.',
                example: 'Tree [10, 5, 15, 3, 7, 12, 20], range [5, 15]. Subtree at 5 (with 3, 7) is BST but 3 < 5, so excluded. Subtree at 12 is BST and in range. Leaf 7 is in range. Sum only qualifying subtrees.'
            },
            {
                title: 'Maximum Sum BST Subtree',
                difficulty: 'Hard',
                description: 'Find the maximum sum among all BST subtrees in the binary tree. A BST subtree sum is the sum of all its node values.',
                whyDifferent: 'Instead of summing all BST subtree sums together, you find the one with the maximum sum. This requires tracking the sum of each BST subtree individually and maintaining a global maximum, while the bottom-up validation logic remains similar.',
                example: 'Tree [1, 4, 3, 2, 4, null, 5, null, null, null, null, 4, 6]. BST subtree [3, null, 5, 4, 6] has sum 18. BST subtree [4, 2, 4] has sum 10. Maximum BST subtree sum is 18.'
            },
            {
                title: 'Sum BSTs Including Empty Subtrees',
                difficulty: 'Medium',
                description: 'Modify the definition so that null/empty children are always valid BSTs contributing 0 to the sum. Count how this changes the total compared to the standard definition.',
                whyDifferent: 'The original problem considers single nodes as minimal BSTs. Including empty trees as base cases changes the counting in subtle ways and tests your understanding of the recursive base case definition.',
                example: 'A leaf node has two null children, both are trivially valid BSTs. The sum contributed is still just the leaf value, but the count of BST subtrees increases by 2 for each leaf.'
            },
            {
                title: 'Deepest BST Subtree',
                difficulty: 'Medium',
                description: 'Find the BST subtree whose root is at the greatest depth in the binary tree. If there are ties, return the one with the largest sum.',
                whyDifferent: 'The aggregation priority shifts from sum to depth. You must track both depth and BST validity bottom-up, and the tie-breaking rule adds a secondary comparison dimension.',
                example: 'Tree [10, 5, 15, 1, 8, 12, 20, null, 3]. Node 3 at depth 3 is a single-node BST, which is deepest. If nodes at depth 3 included another single node with value 5, the one with larger value wins.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '14-sum-bsts', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/14-sum-bsts'] = problem;

})();
