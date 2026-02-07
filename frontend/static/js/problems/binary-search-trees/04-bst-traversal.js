/**
 * BST Traversal
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST Traversal',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        description: 'Write three functions that take in a Binary Search Tree (BST) and an empty array, traverse the BST, add its nodes\' values to the input array, and return that array. The three functions should traverse the BST using the in-order, pre-order, and post-order tree-traversal techniques, respectively.',
        problem: 'Leverage the BST property (left < root < right) to guide your decisions. At each node, the ordering property tells you which subtree to explore or how to restructure. This achieves O(n) time with O(n) for result, O(d) for call stack space.',
        hints: [
            'The BST property means left < root < right. Use this to guide your search direction.',
            'Think about which traversal order (inorder, preorder, postorder) best suits this problem.',
            'Consider how the height of the tree affects your algorithm\'s complexity.',
            'For balanced BSTs, operations are O(log n). What happens with skewed trees?'
        ],

        complexity: {
            time: 'O(n)',
            space: 'O(n) for result, O(d) for call stack'
        },
        examples: [
    {
        input: {
        "tree": [
                10,
                5,
                15,
                2,
                5,
                null,
                22,
                1
        ]
},
        output: {"inorder": [1, 2, 5, 5, 10, 15, 22], "preorder": [10, 5, 2, 1, 5, 15, 22], "postorder": [1, 2, 5, 5, 22, 15, 10]},
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
    }
        ],
        twists: [
            { id: '04-bst-traversal/twist-01-boundary-traversal', name: 'Boundary Traversal', difficulty: 'Hard' },
            { id: '04-bst-traversal/twist-02-vertical-order-traversal', name: 'Vertical Order Traversal', difficulty: 'Medium' },
            { id: '04-bst-traversal/twist-03-diagonal-traversal', name: 'Diagonal Traversal', difficulty: 'Medium' },
            { id: '04-bst-traversal/twist-04-traversal-with-depth-callback', name: 'Traversal with Depth Callback', difficulty: 'Easy' },
            { id: '04-bst-traversal/twist-05-reverse-postorder-without-reversing', name: 'Reverse Postorder Without Reversing', difficulty: 'Medium' }
        ],
        similar: [
    { id: '04-bst-traversal/01-iterative-tree-traversal', name: 'Iterative Tree Traversal', difficulty: 'Medium' },
    { id: '04-bst-traversal/02-morris-traversal', name: 'Morris Traversal', difficulty: 'Hard' },
    { id: '04-bst-traversal/03-level-order-zigzag', name: 'Binary Tree Zigzag Level Order Traversal', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal'] = problem;

})();
