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
            { id: '08-same-bsts/twist-01-count-distinct-bst-orderings', name: 'Count Distinct BST Orderings', difficulty: 'Very Hard' },
            { id: '08-same-bsts/twist-02-same-bsts-with-o1-extra-space', name: 'Same BSTs with O(1) Extra Space', difficulty: 'Hard' },
            { id: '08-same-bsts/twist-03-same-bsts-for-n-arrays', name: 'Same BSTs for N Arrays', difficulty: 'Hard' },
            { id: '08-same-bsts/twist-04-minimum-swaps-for-same-bst', name: 'Minimum Swaps for Same BST', difficulty: 'Very Hard' },
            { id: '08-same-bsts/twist-05-same-avl-trees', name: 'Same AVL Trees', difficulty: 'Very Hard' }
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
