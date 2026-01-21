/**
 * Find Closest Value in BST
 * Category: binary-search-trees
 * Difficulty: Easy
 * Algorithm: bst-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Closest Value in BST',
        difficulty: 'Easy',
        algorithm: 'bst-search',
        description: 'Write a function that takes in a Binary Search Tree (BST) and a target integer value and returns the closest value to that target value contained in the BST. You can assume that there will only be one closest value.',
        problem: 'Use the BST property: if target < current node, the closest value is either the current node or somewhere in the left subtree. If target > current node, it\'s either current or in the right subtree. Track the closest value seen so far as you traverse, updating it whenever you find a node closer to the target.',
        hints: [
            'The BST property lets you eliminate half the tree at each step. If target < node value, can the closest be in the right subtree?',
            'Keep track of the closest value found so far as you traverse the tree.',
            'At each node, compare abs(node.value - target) with abs(closest - target) to decide whether to update closest.',
            'Move left if target < node.value, right if target > node.value. Stop when you reach a null node.'
        ],
        complexity: {
            time: 'O(log n) average, O(n) worst',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "tree": [10, 5, 15, 2, 5, 13, 22, 1, null, null, null, null, 14],
        "target": 12
        },
        output: 13,
        explanation: 'Start at 10: |10-12|=2, closest=10. Target 12 > 10, go right to 15: |15-12|=3 > 2, keep closest=10. Target 12 < 15, go left to 13: |13-12|=1 < 2, update closest=13. Target 12 < 13, go left to null. Return 13.'
    }
        ],
        similar: [
    { id: '01-find-closest-value/01-k-closest-values-bst', name: 'K Closest Values in BST', difficulty: 'Medium' },
    { id: '01-find-closest-value/02-closest-bst-value-ii', name: 'Inorder Predecessor and Successor', difficulty: 'Medium' },
    { id: '01-find-closest-value/03-two-sum-closest-bst', name: 'Two Sum Closest in BST', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value'] = problem;

})();
