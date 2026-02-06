/**
 * BST Construction
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST Construction',
        difficulty: 'Medium',
        algorithm: 'bst-construction',
        description: 'Write a BST class for a Binary Search Tree. The class should support: - Inserting values with the insert method - Checking if values are contained with the contains method - Removing values with the remove method (with proper handling of all cases) Note that you can\'t remove values that aren\'t in the tree.',
        complexity: {
            time: 'O(log n) average, O(n) worst',
            space: 'O(1)'
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
        ],
        "operations": [
                "insert(12)",
                "remove(10)",
                "contains(15)"
        ]
},
        output: [true, true, true],
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 1] (length 8), operations=[insert(12), remove(10), contains(15)], the result is [True, True, True].'
    }
        ],
        twists: [
            { id: '02-bst-construction/twist-01-self-balancing-bst-avl-insertremove', name: 'Self-Balancing BST (AVL Insert/Remove)', difficulty: 'Very Hard' },
            { id: '02-bst-construction/twist-02-bst-with-rank-order-statistics', name: 'BST with Rank (Order Statistics)', difficulty: 'Hard' },
            { id: '02-bst-construction/twist-03-persistent-bst', name: 'Persistent BST', difficulty: 'Very Hard' },
            { id: '02-bst-construction/twist-04-bst-with-lazy-deletion', name: 'BST with Lazy Deletion', difficulty: 'Medium' },
            { id: '02-bst-construction/twist-05-thread-safe-bst', name: 'Thread-Safe BST', difficulty: 'Hard' },
            { id: '02-bst-construction/twist-06-bst-remove-without-finding-minimum', name: 'BST Remove Without Finding Minimum', difficulty: 'Medium' }
        ],
        similar: [
    { id: '02-bst-construction/02-bst-construction/01-bst-iterator', name: 'BST Iterator', difficulty: 'Medium' },
    { id: '02-bst-construction/02-convert-sorted-array-to-bst', name: 'Convert Sorted Array to BST', difficulty: 'Medium' },
    { id: '02-bst-construction/03-serialize-deserialize-bst', name: 'Serialize and Deserialize BST', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction'] = problem;

})();
