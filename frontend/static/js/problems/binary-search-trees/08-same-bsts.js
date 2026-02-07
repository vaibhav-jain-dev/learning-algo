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
        problem: 'Leverage the BST property (left < root < right) to guide your decisions. At each node, the ordering property tells you which subtree to explore or how to restructure. This achieves O(n^2) time with O(n^2) for subarrays, or O(d) with index approach space.',
        hints: [
            'The BST property means left < root < right. Use this to guide your search direction.',
            'Think about which traversal order (inorder, preorder, postorder) best suits this problem.',
            'Consider how the height of the tree affects your algorithm\'s complexity.',
            'For balanced BSTs, operations are O(log n). What happens with skewed trees?'
        ],

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
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
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
        explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
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
