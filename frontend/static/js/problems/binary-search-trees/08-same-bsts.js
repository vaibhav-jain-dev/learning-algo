/**
 * Same BSTs
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-comparison
 */
(function() {
    'use strict';

    const problem = {
        name: 'Same BSTs',
        difficulty: 'Hard',
        algorithm: 'bst-comparison',
        description: 'Given two arrays of integers, determine if they would produce the same Binary Search Tree when elements are inserted in order. You must do this without actually constructing the BSTs. When constructing a BST by inserting elements one at a time from left to right, the first element becomes the root, and subsequent elements are inserted according to BST rules (smaller values go left, equal or larger values go right).',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n^2) for subarrays, or O(d) with index approach'
        },
        examples: [
    {
        input: {
        "arrayOne": [
                10,
                15,
                8,
                12,
                94,
                81,
                5,
                2,
                11
        ],
        "arrayTwo": [
                10,
                8,
                5,
                15,
                2,
                12,
                11,
                94,
                81
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input arrayOne=[10, 15, ..., 11] (length 9), arrayTwo=[10, 8, ..., 81] (length 9), the result is true.'
    },
    {
        input: {
        "arrayOne": [
                10,
                15,
                8,
                12,
                94,
                81,
                5,
                2,
                11
        ],
        "arrayTwo": [
                10,
                8,
                5,
                15,
                2,
                12,
                94,
                81,
                11
        ]
},
        output: false,
        explanation: 'Processing the input data produces the output. For input arrayOne=[10, 15, ..., 11] (length 9), arrayTwo=[10, 8, ..., 11] (length 9), the result is false.'
    }
        ],
        twists: [
            {
                title: 'Count Distinct BST Orderings',
                difficulty: 'Very Hard',
                description: 'Given a BST defined by one insertion order, count how many different insertion orderings would produce the same BST structure.',
                whyDifferent: 'Instead of comparing two specific arrays, you must count all valid topological orderings of the BST. This requires combinatorics: at each node, the left and right subtree orderings can be interleaved in C(n_left + n_right, n_left) ways.',
                example: 'For BST from [2, 1, 3], the orderings [2, 1, 3] and [2, 3, 1] both work. Answer is 2, since 2 must come first, then 1 and 3 can be in either order.'
            },
            {
                title: 'Same BSTs with O(1) Extra Space',
                difficulty: 'Hard',
                description: 'Determine if two arrays produce the same BST without creating any subarrays. Use only O(1) extra space beyond the input arrays.',
                whyDifferent: 'The standard recursive approach creates O(n^2) subarrays. The O(1) space version requires passing index bounds and using the original arrays, tracking min/max ranges to simulate the recursive partitioning in-place.',
                example: 'For [10, 15, 8, 12] and [10, 8, 15, 12], instead of extracting [15, 12] and [8], you pass range constraints (min=10, max=inf) and (min=-inf, max=10) to filter relevant elements from the original arrays.'
            },
            {
                title: 'Same BSTs for N Arrays',
                difficulty: 'Hard',
                description: 'Given N arrays (not just two), determine which arrays among them produce the same BST. Group them into equivalence classes.',
                whyDifferent: 'Pairwise comparison of all N arrays is O(N^2 * n^2). You need a canonical form or hash for each BST to group arrays efficiently, requiring you to think about BST fingerprinting.',
                example: 'Arrays: [3,1,5,2,4], [3,5,1,4,2], [3,1,5,4,2], [3,5,1,2,4]. Group 1: {[3,1,5,2,4], [3,1,5,4,2]} produce the same BST. Group 2: {[3,5,1,4,2], [3,5,1,2,4]} produce the same BST.'
            },
            {
                title: 'Minimum Swaps for Same BST',
                difficulty: 'Very Hard',
                description: 'Given two arrays that do NOT produce the same BST, find the minimum number of adjacent swaps in the second array to make it produce the same BST as the first.',
                whyDifferent: 'This transforms from a comparison problem into an optimization problem. You need to understand which elements are in the wrong relative order and compute the minimum inversions needed to fix the BST structure.',
                example: 'Array1: [10, 5, 15]. Array2: [10, 15, 5] (same BST). But [5, 10, 15] needs root 5 instead of 10. Swap 5 and 10 to get [10, 5, 15] which matches - 1 swap needed.'
            },
            {
                title: 'Same AVL Trees',
                difficulty: 'Very Hard',
                description: 'Given two arrays, determine if inserting them into an AVL tree (self-balancing BST) with rotations would produce the same AVL tree.',
                whyDifferent: 'AVL rotations change the tree structure during insertion, so two arrays producing the same BST might produce different AVL trees. You must simulate the AVL insertions with rotations, fundamentally changing the comparison logic.',
                example: 'Arrays [3, 2, 1] as BST gives a left-skewed tree, but as AVL gives a balanced tree [2, 1, 3] after rotation. [3, 1, 2] gives a different intermediate but same final AVL after double rotation.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '08-same-bsts', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/08-same-bsts'] = problem;

})();
