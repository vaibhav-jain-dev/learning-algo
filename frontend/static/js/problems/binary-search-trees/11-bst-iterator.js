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
        twists: [
            {
                title: 'Bidirectional BST Iterator',
                difficulty: 'Hard',
                description: 'Implement an iterator that supports both next() and prev() operations, allowing forward and backward traversal of the BST in sorted order.',
                whyDifferent: 'A single stack only handles one direction. Supporting prev() requires either a second stack, parent pointers, or a clever scheme to reverse direction mid-traversal. The state management becomes significantly more complex.',
                example: 'BST [7, 3, 15, null, null, 9, 20]. Calling next() three times gives 3, 7, 9. Calling prev() gives 7. Calling next() again gives 9.'
            },
            {
                title: 'BST Iterator with Peek',
                difficulty: 'Medium',
                description: 'Add a peek() method that returns the next value without advancing the iterator. The peek() call should not affect subsequent next() calls.',
                whyDifferent: 'You must separate the "look ahead" from the "advance" operation. This requires caching the next value or ensuring the stack state is preserved during peek, adding a layer of state management.',
                example: 'BST [7, 3, 15]. After calling next() -> 3, peek() -> 7, peek() -> 7 (same), next() -> 7, next() -> 15.'
            },
            {
                title: 'Reverse Order BST Iterator',
                difficulty: 'Medium',
                description: 'Implement an iterator that traverses the BST in reverse sorted order (largest to smallest) with O(h) space.',
                whyDifferent: 'The standard iterator pushes left children. A reverse iterator pushes right children and processes nodes in right-root-left order. It is the mirror image, testing if you understand the inorder traversal mechanics deeply enough to reverse them.',
                example: 'BST [7, 3, 15, null, null, 9, 20]. Calling next() returns 20, 15, 9, 7, 3 in sequence.'
            },
            {
                title: 'Merge Two BST Iterators',
                difficulty: 'Hard',
                description: 'Given two BSTs, create a merged iterator that yields all values from both trees in sorted order, using O(h1 + h2) space.',
                whyDifferent: 'You must manage two independent iterator states simultaneously and merge their outputs, similar to merging two sorted lists but with lazy evaluation. Each advance requires comparing the two peek values.',
                example: 'BST1 [3, 1, 5], BST2 [4, 2, 6]. Merged iteration yields: 1, 2, 3, 4, 5, 6.'
            },
            {
                title: 'BST Iterator with Skip',
                difficulty: 'Hard',
                description: 'Implement skip(target) that advances the iterator past all values less than target. The next call to next() should return the first value >= target.',
                whyDifferent: 'Simple iteration is O(1) amortized per step. Skip requires potentially jumping over many nodes efficiently, using BST search properties to prune the stack rather than iterating one by one.',
                example: 'BST [10, 5, 15, 3, 7, 12, 20]. After skip(11), next() returns 12, then next() returns 15. The nodes 3, 5, 7, 10 were skipped without visiting each one.'
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
