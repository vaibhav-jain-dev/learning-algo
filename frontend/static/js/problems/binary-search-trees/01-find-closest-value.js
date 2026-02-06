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
        twists: [
            {
                title: 'Count Nodes Within Distance',
                difficulty: 'Medium',
                description: 'Instead of finding the single closest value, count how many nodes in the BST have values within a given distance D of the target.',
                whyDifferent: 'You can no longer prune an entire subtree just because the current node is farther than your best. Both subtrees might contain values within distance D, so you need a range-aware traversal strategy.',
                example: 'Tree: [10,5,15,2,5,13,22,1], target=12, D=3 -> Count=3 (values 10, 13, 15 are all within distance 3 of 12).'
            },
            {
                title: 'Closest Value Without Parent Pointers (Iterative)',
                difficulty: 'Easy',
                description: 'Solve the same problem but you must use an iterative approach with O(1) space -- no recursion allowed.',
                whyDifferent: 'Forces you to think about the traversal iteratively. While the logic is similar, managing state explicitly rather than via the call stack changes how you reason about the control flow.',
                example: 'Same input/output as base problem, but solution must use a while loop instead of recursion.'
            },
            {
                title: 'Closest Value in a Modified BST with Duplicates',
                difficulty: 'Medium',
                description: 'The BST may contain duplicate values (duplicates go to the right subtree). Find the closest value, and if there are ties, return the smallest one.',
                whyDifferent: 'Duplicates break the assumption of unique closest value. You must handle tie-breaking logic and cannot stop early when you find an exact match since duplicates may exist on either side.',
                example: 'Tree: [10,5,15,5,7,10,20], target=10 -> Return 10 (exact match exists, but you must find it among duplicates).'
            },
            {
                title: 'Closest Value in Each Subtree',
                difficulty: 'Hard',
                description: 'For every node in the BST, compute the closest value to the target within that node\'s subtree (including itself). Return a mapping of node value to its subtree\'s closest value.',
                whyDifferent: 'This is a bottom-up aggregation problem rather than a top-down search. You need to combine results from left and right subtrees at each node, completely changing the traversal pattern.',
                example: 'Tree: [10,5,15], target=12 -> {10: 10, 5: 5, 15: 15} (each node\'s subtree closest to 12).'
            },
            {
                title: 'Closest Value After Insertions',
                difficulty: 'Medium',
                description: 'Given a stream of values being inserted into an initially empty BST, after each insertion report the closest value in the current tree to a fixed target.',
                whyDifferent: 'The tree structure changes with each insertion. You must think about how insertions affect the search path and whether you can maintain the closest value incrementally rather than re-searching from scratch.',
                example: 'Target=12, insertions=[10,15,5,13,22] -> After each: [10, 10, 10, 13, 13].'
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
