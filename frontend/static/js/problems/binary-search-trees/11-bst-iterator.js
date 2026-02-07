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
        description: 'Implement the BSTIterator class that represents an iterator over the inorder traversal of a Binary Search Tree (BST): - BSTIterator(TreeNode root) - Initializes the iterator with the root of the BST. The pointer should be initialized to a non-existent number smaller than any element in the BST. - boolean hasNext() - Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false. - int next() - Moves the pointer to the right, then returns the number at.',
        problem: 'Leverage the BST property (left < root < right) to guide your decisions. At each node, the ordering property tells you which subtree to explore or how to restructure. This achieves O(1) average for next() and hasNext() time with O(h) space.',
        hints: [
            'The BST property means left < root < right. Use this to guide your search direction.',
            'Think about which traversal order (inorder, preorder, postorder) best suits this problem.',
            'Consider how the height of the tree affects your algorithm\'s complexity.',
            'For balanced BSTs, operations are O(log n). What happens with skewed trees?'
        ],

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
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
    }
        ],
        twists: [
            { id: '11-bst-iterator/twist-01-bidirectional-bst-iterator', name: 'Bidirectional BST Iterator', difficulty: 'Hard' },
            { id: '11-bst-iterator/twist-02-bst-iterator-with-peek', name: 'BST Iterator with Peek', difficulty: 'Medium' },
            { id: '11-bst-iterator/twist-03-reverse-order-bst-iterator', name: 'Reverse Order BST Iterator', difficulty: 'Medium' },
            { id: '11-bst-iterator/twist-04-merge-two-bst-iterators', name: 'Merge Two BST Iterators', difficulty: 'Hard' },
            { id: '11-bst-iterator/twist-05-bst-iterator-with-skip', name: 'BST Iterator with Skip', difficulty: 'Hard' }
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
