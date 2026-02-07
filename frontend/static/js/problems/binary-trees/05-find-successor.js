/**
 * Find Successor
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-successor
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Successor',
        difficulty: 'Medium',
        algorithm: 'tree-successor',
        description: 'Write a function that takes in a Binary Tree (where nodes have an additional pointer to their parent node) and a target node contained in that tree. The function should return the in-order successor of the target node. The in-order successor of a node is the node that comes immediately after it in an in-order traversal of the tree. If the target node is the last node in the in-order traversal, return None/nil.',
        problem: 'Use recursion to solve the problem for each subtree, then combine results at each node. The base case handles null nodes. Each node is visited once, giving O(h) time with O(1) space for the recursion stack.',
        hints: [
            'Think recursively: solve the problem for the left and right subtrees, then combine results.',
            'What information does each node need from its children to compute its result?',
            'Consider whether you need a top-down (preorder) or bottom-up (postorder) approach.',
            'Base case: what should happen when you reach a null/empty node?'
        ],

        complexity: {
            time: 'O(h)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 4,
                                "left": {
                                        "value": 6
                                }
                        },
                        "right": {
                                "value": 5
                        }
                },
                "right": {
                        "value": 3
                }
        },
        "target": 5
},
        output: 1,
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
    }
        ],
        twists: [
            { id: '05-find-successor/twist-01-find-predecessor-instead', name: 'Find Predecessor Instead', difficulty: 'Medium' },
            { id: '05-find-successor/twist-02-successor-without-parent-pointers', name: 'Successor Without Parent Pointers', difficulty: 'Medium' },
            { id: '05-find-successor/twist-03-k-th-successor', name: 'K-th Successor', difficulty: 'Medium' },
            { id: '05-find-successor/twist-04-preorder-successor', name: 'Preorder Successor', difficulty: 'Medium' },
            { id: '05-find-successor/twist-05-threaded-binary-tree-successor', name: 'Threaded Binary Tree Successor', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '05-find-successor', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/05-find-successor'] = problem;

})();
