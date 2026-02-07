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
        problem: 'Leverage the BST property (left < root < right) to guide your decisions. At each node, the ordering property tells you which subtree to explore or how to restructure. This achieves O(n) worst, O(h + k) with pruning time with O(h) space.',
        hints: [
            'The BST property means left < root < right. Use this to guide your search direction.',
            'Think about which traversal order (inorder, preorder, postorder) best suits this problem.',
            'Consider how the height of the tree affects your algorithm\'s complexity.',
            'For balanced BSTs, operations are O(log n). What happens with skewed trees?'
        ],

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
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
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
        explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
    }
        ],
        twists: [
            { id: '10-range-sum-bst/twist-01-range-count-in-bst', name: 'Range Count in BST', difficulty: 'Easy' },
            { id: '10-range-sum-bst/twist-02-range-product-in-bst', name: 'Range Product in BST', difficulty: 'Medium' },
            { id: '10-range-sum-bst/twist-03-exclusive-range-sum', name: 'Exclusive Range Sum', difficulty: 'Easy' },
            { id: '10-range-sum-bst/twist-04-range-sum-with-updates', name: 'Range Sum with Updates', difficulty: 'Hard' },
            { id: '10-range-sum-bst/twist-05-kth-smallest-in-range', name: 'Kth Smallest in Range', difficulty: 'Hard' }
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
