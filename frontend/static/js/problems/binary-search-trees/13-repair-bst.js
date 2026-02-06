/**
 * Repair BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-repair
 */
(function() {
    'use strict';

    const problem = {
        name: 'Repair BST',
        difficulty: 'Hard',
        algorithm: 'bst-repair',
        description: 'You are given the root of a Binary Search Tree (BST), where the values of **exactly two nodes** of the tree were swapped by mistake. Your task is to recover the tree without changing its structure. In other words, find the two nodes that were swapped and swap their values back to restore the valid BST property.',
        complexity: {
            time: 'O(n)',
            space: 'O(1) with Morris, O(h) otherwise'
        },
        examples: [
    {
        input: {
        "tree": [
                1,
                3,
                null,
                null,
                2
        ]
},
        output: [3, 1, null, null, 2],
        explanation: 'Processing the input data produces the output. For input tree=[1, 3, None, None, 2], the result is [3, 1, None, None, 2].'
    },
    {
        input: {
        "tree": [
                3,
                1,
                4,
                null,
                null,
                2
        ]
},
        output: [2, 1, 4, null, null, 3],
        explanation: 'Processing the input data produces the output. For input tree=[3, 1, ..., 2] (length 6), the result is [2, ..., 3] (length 6).'
    }
        ],
        twists: [
            {
                title: 'Repair BST with K Swaps',
                difficulty: 'Very Hard',
                description: 'Instead of exactly two nodes being swapped, up to k pairs of nodes have been swapped. Identify all swapped pairs and restore the BST.',
                whyDifferent: 'With exactly two swapped nodes, the inorder traversal has at most two inversions. With k swaps, there can be up to 2k inversions, and you must correctly pair them, which is a much harder matching problem.',
                example: 'BST with inorder [1, 6, 3, 4, 5, 2, 7]. Two swaps occurred: (2,6) and (3,5) were swapped. You must identify both pairs and fix them.'
            },
            {
                title: 'Detect Swapped Nodes Only',
                difficulty: 'Medium',
                description: 'Find and return the values of the two swapped nodes without actually repairing the tree. Do this in O(n) time and O(1) space using Morris traversal.',
                whyDifferent: 'The focus shifts from repair to detection with strict space constraints. Morris traversal temporarily modifies the tree for O(1) space inorder traversal, requiring careful handling of threaded pointers while tracking inversions.',
                example: 'BST [3, 1, 4, null, null, 2]. Inorder gives [1, 3, 2, 4]. The inversion is at (3, 2). The swapped nodes are 3 and 2.'
            },
            {
                title: 'Repair BST by Rotation',
                difficulty: 'Hard',
                description: 'Instead of swapping values, fix the BST using only tree rotations. Find the minimum number of rotations needed to make it a valid BST.',
                whyDifferent: 'Swapping values is O(1) once found. Rotations change tree structure and may cascade. You need to understand how rotations fix local BST violations and may need multiple rotations to propagate the fix.',
                example: 'If nodes 3 and 7 are swapped in positions, a value swap is trivial. But using rotations, you might need to rotate 7 down and 3 up through intermediate nodes, potentially requiring O(h) rotations.'
            },
            {
                title: 'Verify Single Swap Can Fix',
                difficulty: 'Medium',
                description: 'Given a binary tree, determine whether it can be made into a valid BST by swapping exactly two nodes. Return true/false without performing the repair.',
                whyDifferent: 'You must verify feasibility rather than perform the repair. After finding the two inversion points, you need to check that swapping those specific values would actually fix ALL BST violations, not just the local ones.',
                example: 'Tree [5, 3, 9, 1, 8, 7, 10]. Inorder: [1, 3, 8, 5, 7, 9, 10]. Swapping 8 and 5 gives [1, 3, 5, 8, 7, 9, 10] which still has an inversion (8, 7). So single swap cannot fix this - return false.'
            },
            {
                title: 'Repair BST Serialization',
                difficulty: 'Hard',
                description: 'Given a level-order array representation of a BST where two values are swapped, find and swap them. You do not have access to the tree structure, only the array.',
                whyDifferent: 'Without tree pointers, you must reconstruct parent-child relationships from array indices (left child at 2i+1, right child at 2i+2). The inorder traversal must be computed from the array layout, adding an index-mapping layer.',
                example: 'Array [5, 7, 9, 1, 4, 3, 10]. This represents a tree where 3 and 7 are swapped. Compute inorder from array positions, find inversions, and swap values at the correct array indices.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '13-repair-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/13-repair-bst'] = problem;

})();
