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
        description: 'Given the root of a binary tree (not necessarily a BST), find the sum of values of all subtrees that are valid Binary Search Trees. A subtree rooted at node X is a valid BST if: 1. All values in the left subtree of X are less than X\'s value 2. All values in the right subtree of X are greater than X\'s value 3. Both the left and right subtrees are also BSTs A single node with no children is considered a valid BST. Return the total sum of all nodes that belong to BST subtrees. If a node is part of .',
        problem: 'Leverage the BST property (left < root < right) to guide your decisions. At each node, the ordering property tells you which subtree to explore or how to restructure. This achieves O(n) time with O(h) space.',
        hints: [
            'The BST property means left < root < right. Use this to guide your search direction.',
            'Think about which traversal order (inorder, preorder, postorder) best suits this problem.',
            'Consider how the height of the tree affects your algorithm\'s complexity.',
            'For balanced BSTs, operations are O(log n). What happens with skewed trees?'
        ],

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
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
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
        explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
    }
        ],
        twists: [
            { id: '14-sum-bsts/twist-01-largest-bst-subtree', name: 'Largest BST Subtree', difficulty: 'Hard' },
            { id: '14-sum-bsts/twist-02-count-bst-subtrees', name: 'Count BST Subtrees', difficulty: 'Medium' },
            { id: '14-sum-bsts/twist-03-sum-bsts-with-range-constraint', name: 'Sum BSTs with Range Constraint', difficulty: 'Hard' },
            { id: '14-sum-bsts/twist-04-maximum-sum-bst-subtree', name: 'Maximum Sum BST Subtree', difficulty: 'Hard' },
            { id: '14-sum-bsts/twist-05-sum-bsts-including-empty-subtrees', name: 'Sum BSTs Including Empty Subtrees', difficulty: 'Medium' },
            { id: '14-sum-bsts/twist-06-deepest-bst-subtree', name: 'Deepest BST Subtree', difficulty: 'Medium' }
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
