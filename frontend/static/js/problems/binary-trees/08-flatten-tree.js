/**
 * Flatten Binary Tree
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-flatten
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten Binary Tree',
        difficulty: 'Medium',
        algorithm: 'tree-flatten',
        description: 'Write a function that takes in a Binary Tree, flattens it, and returns its leftmost node. A flattened Binary Tree is a structure that\'s nearly identical to a Doubly Linked List (except that nodes have left and right pointers instead of prev and next pointers), where nodes follow the original tree\'s left-to-right order. After flattening, each node\'s left pointer should point to the previous node in the flattened structure, and its right pointer should point to the next node.',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 4
                        },
                        "right": {
                                "value": 5
                        }
                },
                "right": {
                        "value": 3,
                        "left": {
                                "value": 6
                        }
                }
        }
},
        output: "4 <-> 2 <-> 5 <-> 1 <-> 6 <-> 3",
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3, \'left\': {\'value\': 6}}}, the result is 4 <-> 2 <-> 5 <-> 1 <-> 6 <-> 3.'
    }
        ],
        twists: [
            {
                title: 'Flatten to Right-Skewed List',
                difficulty: 'Medium',
                description: 'Flatten the binary tree into a right-skewed linked list following preorder traversal order, where every node has no left child and the right pointer points to the next node.',
                whyDifferent: 'The original uses inorder (left-to-right) order with a doubly-linked structure. Preorder requires processing root before children, and the single-direction (right-only) linking means you must handle the left subtree displacement carefully.',
                example: 'Tree [1, 2, 5, 3, 4, null, 6] flattens to 1 -> 2 -> 3 -> 4 -> 5 -> 6 (all right pointers, all left pointers null).'
            },
            {
                title: 'Flatten to Circular Doubly Linked List',
                difficulty: 'Hard',
                description: 'Flatten the binary tree to a sorted circular doubly linked list in-place. The leftmost node connects back to the rightmost node and vice versa.',
                whyDifferent: 'The circular connection adds complexity to the base case and the final linking step. You must connect the last node back to the first, requiring you to track both the head and tail of the flattened structure.',
                example: 'Tree [4, 2, 5, 1, 3]. Flattened: 1 <-> 2 <-> 3 <-> 4 <-> 5 <-> (back to 1). The last node 5 right-points to 1, and 1 left-points to 5.'
            },
            {
                title: 'Flatten by Levels',
                difficulty: 'Hard',
                description: 'Flatten the binary tree into a linked list following level-order (BFS) instead of inorder. Each node right-pointer points to the next node in BFS order.',
                whyDifferent: 'Level-order is not naturally recursive like inorder. You need a queue-based approach or a clever way to link nodes across different subtrees at the same level, which breaks the recursive divide-and-conquer pattern.',
                example: 'Tree [1, 2, 3, 4, 5, 6, 7]. Level-order flatten: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7.'
            },
            {
                title: 'Flatten with Separator Nodes',
                difficulty: 'Medium',
                description: 'Flatten the tree inorder but insert a sentinel node with value -1 between each original node in the resulting linked list.',
                whyDifferent: 'You must create and insert new nodes during the flattening process. This means the output structure has more nodes than the input, requiring memory allocation decisions and careful pointer management.',
                example: 'Tree [2, 1, 3]. Inorder: 1, 2, 3. Flattened: 1 <-> -1 <-> 2 <-> -1 <-> 3.'
            },
            {
                title: 'Unflatten Back to Original Tree',
                difficulty: 'Very Hard',
                description: 'Given a flattened doubly linked list and the original tree structure (as a separate shape descriptor), reconstruct the original binary tree.',
                whyDifferent: 'This is the inverse operation. You must map a linear sequence back to a tree structure, which requires knowing the original shape. Without the shape, reconstruction is impossible, highlighting why flattening loses structural information.',
                example: 'Linked list: 1 <-> 2 <-> 3 <-> 4 <-> 5. Shape: root has left subtree of size 2 and right subtree of size 2. Reconstructed: [3, 1, 4, null, 2, null, 5].'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '08-flatten-tree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/08-flatten-tree'] = problem;

})();
