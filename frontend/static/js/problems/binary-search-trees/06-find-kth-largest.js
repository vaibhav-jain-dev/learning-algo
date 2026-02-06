/**
 * Find Kth Largest Value in BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-kth-largest
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Kth Largest Value in BST',
        difficulty: 'Medium',
        algorithm: 'bst-kth-largest',
        description: 'Write a function that takes in a Binary Search Tree (BST) and a positive integer k, and returns the kth largest integer contained in the BST. You can assume that there will only be integer values in the BST and that k is less than or equal to the number of nodes in the tree. Duplicate values should be treated as separate values. For example, in a BST with values [5, 5, 6], the second largest would be the second 5.',
        complexity: {
            time: 'O(h + k)',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "tree": [
                15,
                5,
                20,
                2,
                5,
                17,
                22,
                1
        ],
        "k": 3
},
        output: 17,
        explanation: 'Processing the input data produces the output. For input tree=[15, 5, ..., 1] (length 8), k=3, the result is 17.'
    },
    {
        input: {
        "tree": [
                15,
                5,
                20,
                2,
                5,
                17,
                22,
                1
        ],
        "k": 1
},
        output: 22,
        explanation: 'Processing the input data produces the output. For input tree=[15, 5, ..., 1] (length 8), k=1, the result is 22.'
    }
        ],
        twists: [
            {
                title: 'Kth Largest with Frequent Updates',
                difficulty: 'Hard',
                description: 'The BST receives frequent insertions and deletions. After each operation, efficiently return the kth largest value without traversing the tree from scratch each time.',
                whyDifferent: 'A single reverse inorder traversal is no longer sufficient. You need augmented BST nodes that store subtree sizes, enabling O(h) kth-largest queries even after modifications.',
                example: 'BST has [5, 10, 15, 20]. k=2 gives 15. Insert 17. Now k=2 gives 17. The augmented size field updates on insertion to avoid re-traversal.'
            },
            {
                title: 'Kth Smallest Instead',
                difficulty: 'Easy',
                description: 'Instead of finding the kth largest, find the kth smallest value in the BST.',
                whyDifferent: 'The traversal direction reverses: you use a standard inorder traversal (left-root-right) instead of reverse inorder (right-root-left), which seems trivial but tests whether you truly understand the symmetry.',
                example: 'For BST [15, 5, 20, 2, 5, 17, 22, 1] with k=3, the kth smallest is 5 (values in order: 1, 2, 5, 5, 15, 17, 20, 22).'
            },
            {
                title: 'Kth Largest in Range',
                difficulty: 'Hard',
                description: 'Find the kth largest value that falls within a given range [low, high]. Values outside the range are excluded from the ranking.',
                whyDifferent: 'You must combine range filtering with order statistics. A simple reverse inorder traversal needs an additional check to skip out-of-range nodes while still pruning subtrees for efficiency.',
                example: 'BST has values [1, 5, 10, 15, 20, 25]. Range [5, 20], k=2. Within range: [5, 10, 15, 20]. The 2nd largest in range is 15.'
            },
            {
                title: 'Median of BST',
                difficulty: 'Medium',
                description: 'Find the median value in the BST. If the tree has an even number of nodes, return the average of the two middle values.',
                whyDifferent: 'You need to know the total count of nodes first, then find the middle element(s). This combines counting with kth-element finding, and the even-case averaging adds complexity.',
                example: 'BST with values [1, 2, 5, 5, 15, 17, 20, 22] has 8 nodes. Median is average of 4th and 5th smallest: (5 + 15) / 2 = 10.'
            },
            {
                title: 'Kth Largest Without Parent Pointers',
                difficulty: 'Medium',
                description: 'Find the kth largest value using O(1) extra space (no recursion stack, no explicit stack). You may use Morris traversal concepts adapted for reverse inorder.',
                whyDifferent: 'The standard approach uses O(h) stack space. Achieving O(1) space requires Morris-style threading for reverse inorder, which is a fundamentally different traversal technique.',
                example: 'BST [15, 5, 20, 2, 5, 17, 22, 1], k=3. Using reverse Morris traversal, visit 22, 20, 17 and return 17 with O(1) extra space.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '06-find-kth-largest', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/06-find-kth-largest'] = problem;

})();
