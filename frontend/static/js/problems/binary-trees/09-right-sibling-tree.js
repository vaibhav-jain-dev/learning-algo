/**
 * Right Sibling Tree
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-sibling
 */
(function() {
    'use strict';

    const problem = {
        name: 'Right Sibling Tree',
        difficulty: 'Medium',
        algorithm: 'tree-sibling',
        description: 'Write a function that takes in a Binary Tree, transforms it into a Right Sibling Tree, and returns its root. A Right Sibling Tree is obtained by making every node in a Binary Tree have its right property point to its right sibling instead of its right child. A node\'s right sibling is the node immediately to its right on the same level, or None/nil if there is no node immediately to its right. After the transformation, all nodes\' left pointers should remain unchanged.',
        problem: 'Use recursion to solve the problem for each subtree, then combine results at each node. The base case handles null nodes. Each node is visited once, giving O(n) time with O(w) space for the recursion stack.',
        hints: [
            'Think recursively: solve the problem for the left and right subtrees, then combine results.',
            'What information does each node need from its children to compute its result?',
            'Consider whether you need a top-down (preorder) or bottom-up (postorder) approach.',
            'Base case: what should happen when you reach a null/empty node?'
        ],

        complexity: {
            time: 'O(n)',
            space: 'O(w)'
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
                                        "value": 8
                                },
                                "right": {
                                        "value": 9
                                }
                        },
                        "right": {
                                "value": 5,
                                "right": {
                                        "value": 10
                                }
                        }
                },
                "right": {
                        "value": 3,
                        "left": {
                                "value": 6,
                                "left": {
                                        "value": 11
                                },
                                "right": {
                                        "value": 12
                                }
                        },
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: "siblings connected at each level",
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
    }
        ],
        twists: [
            { id: '09-right-sibling-tree/twist-01-left-sibling-tree', name: 'Left Sibling Tree', difficulty: 'Medium' },
            { id: '09-right-sibling-tree/twist-02-right-sibling-without-modifying-tree', name: 'Right Sibling Without Modifying Tree', difficulty: 'Medium' },
            { id: '09-right-sibling-tree/twist-03-next-right-pointer-in-non-perfect-tree', name: 'Next Right Pointer in Non-Perfect Tree', difficulty: 'Hard' },
            { id: '09-right-sibling-tree/twist-04-right-sibling-with-o1-space', name: 'Right Sibling with O(1) Space', difficulty: 'Hard' },
            { id: '09-right-sibling-tree/twist-05-rightmost-non-null-at-each-level', name: 'Rightmost Non-Null at Each Level', difficulty: 'Easy' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '09-right-sibling-tree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/09-right-sibling-tree'] = problem;

})();
