/**
 * Merge Binary Trees
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-merge
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge Binary Trees',
        difficulty: 'Easy',
        algorithm: 'tree-merge',
        description: 'Write a function that takes in two Binary Trees and merges them. The merged tree should have nodes whose values are the sum of the corresponding nodes in the two input trees. If only one tree has a node at a particular position, that node\'s value should be used in the merged tree. The function should modify and return the first tree, or you may create a new tree.',
        problem: 'Use recursion to solve the problem for each subtree, then combine results at each node. The base case handles null nodes. Each node is visited once, giving O(min(n, m)) time with O(min(h1, h2)) space for the recursion stack.',
        hints: [
            'Think recursively: solve the problem for the left and right subtrees, then combine results.',
            'What information does each node need from its children to compute its result?',
            'Consider whether you need a top-down (preorder) or bottom-up (postorder) approach.',
            'Base case: what should happen when you reach a null/empty node?'
        ],

        complexity: {
            time: 'O(min(n, m))',
            space: 'O(min(h1, h2))'
        },
        examples: [
    {
        input: {
        "tree1": {
                "value": 1,
                "left": {
                        "value": 3,
                        "left": {
                                "value": 5
                        }
                },
                "right": {
                        "value": 2
                }
        },
        "tree2": {
                "value": 2,
                "left": {
                        "value": 1,
                        "right": {
                                "value": 4
                        }
                },
                "right": {
                        "value": 3,
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: {"value": 3, "left": {"value": 4, "left": {"value": 5}, "right": {"value": 4}}, "right": {"value": 5, "right": {"value": 7}}},
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
    }
        ],
        twists: [
            { id: '12-merge-binary-trees/twist-01-merge-with-custom-operation', name: 'Merge with Custom Operation', difficulty: 'Medium' },
            { id: '12-merge-binary-trees/twist-02-merge-three-binary-trees', name: 'Merge Three Binary Trees', difficulty: 'Medium' },
            { id: '12-merge-binary-trees/twist-03-merge-bsts-into-valid-bst', name: 'Merge BSTs into Valid BST', difficulty: 'Hard' },
            { id: '12-merge-binary-trees/twist-04-subtract-binary-trees', name: 'Subtract Binary Trees', difficulty: 'Easy' },
            { id: '12-merge-binary-trees/twist-05-merge-with-structure-priority', name: 'Merge with Structure Priority', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '12-merge-binary-trees', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/12-merge-binary-trees'] = problem;

})();
