/**
 * BST Iterator
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-iterator
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST Iterator',
        difficulty: 'Medium',
        algorithm: 'bst-iterator',
        description: 'Implement the BSTIterator class that represents an iterator over the inorder traversal of a Binary Search Tree (BST): - BSTIterator(TreeNode root) - Initializes the iterator with the root of the BST. The pointer should be initialized to a non-existent number smaller than any element in the BST. - boolean hasNext() - Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false. - int next() - Moves the pointer to the right, then returns the number at',
        complexity: {
            time: 'O(1) average for next() and hasNext()',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "tree": [
                7,
                3,
                15,
                null,
                null,
                9,
                20
        ],
        "operations": [
                "next",
                "next",
                "hasNext",
                "next",
                "hasNext",
                "next",
                "hasNext",
                "next",
                "hasNext"
        ]
},
        output: [3, 7, true, 9, true, 15, true, 20, false],
        explanation: 'Processing the input data produces the output. For input tree=[7, 3, ..., 20] (length 7), operations=[next, next, ..., hasNext] (length 9), the result is [3, ..., False] (length 9).'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '11-bst-iterator', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/11-bst-iterator'] = problem;

})();
