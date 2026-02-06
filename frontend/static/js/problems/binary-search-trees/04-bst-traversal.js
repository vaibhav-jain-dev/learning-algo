/**
 * BST Traversal
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST Traversal',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        description: 'Write three functions that take in a Binary Search Tree (BST) and an empty array, traverse the BST, add its nodes\' values to the input array, and return that array. The three functions should traverse the BST using the in-order, pre-order, and post-order tree-traversal techniques, respectively.',
        complexity: {
            time: 'O(n)',
            space: 'O(n) for result, O(d) for call stack'
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
        ]
},
        output: {"inorder": [1, 2, 5, 5, 10, 15, 22], "preorder": [10, 5, 2, 1, 5, 15, 22], "postorder": [1, 2, 5, 5, 22, 15, 10]},
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 1] (length 8), the result is {\'inorder\': [1, 2, 5, 5, 10, 15, 22], \'preorder\': [10, 5, 2, 1, 5, 15, 22], \'postorder\': [1, 2, 5, 5, 22, 15, 10]}.'
    }
        ],
        twists: [
            {
                title: 'Boundary Traversal',
                difficulty: 'Hard',
                description: 'Return the boundary values of the BST: left boundary (top to bottom), all leaves (left to right), and right boundary (bottom to top), without duplicates.',
                whyDifferent: 'This is not a standard traversal order. You must combine three different traversal strategies (leftmost path, leaf detection, rightmost path in reverse) and handle overlap at corners where boundary paths meet leaves.',
                example: 'Tree: [10,5,15,2,5,null,22,1,null,null,null,null,null,null,25] -> Boundary: [10,5,2,1,25,22,15].'
            },
            {
                title: 'Vertical Order Traversal',
                difficulty: 'Medium',
                description: 'Traverse the BST in vertical order: group nodes by their horizontal distance from the root, then within each group order by level (top to bottom).',
                whyDifferent: 'None of the three standard traversals produce vertical ordering. You must track horizontal distance during traversal using BFS or DFS, then group and sort the results by column index.',
                example: 'Tree: [10,5,15,2,7,null,20] -> Columns: {-2:[2], -1:[5], 0:[10,7], 1:[15], 2:[20]}.'
            },
            {
                title: 'Diagonal Traversal',
                difficulty: 'Medium',
                description: 'Traverse the BST diagonally: all nodes reachable by going right from a starting node are on the same diagonal. Return nodes grouped by diagonal.',
                whyDifferent: 'Diagonal grouping requires tracking a diagonal index that increments only when going left (not right). This is a non-standard grouping that does not correspond to any of the three classic traversals.',
                example: 'Tree: [10,5,15,2,7,12,20] -> Diagonal 0: [10,15,20], Diagonal 1: [5,7,12], Diagonal 2: [2].'
            },
            {
                title: 'Traversal with Depth Callback',
                difficulty: 'Easy',
                description: 'Modify each traversal (inorder, preorder, postorder) to also provide the depth of each node to a callback function. Return an array of {value, depth} pairs.',
                whyDifferent: 'Adding depth tracking requires passing an additional parameter through the recursion. While simple for recursion, it changes how you think about the iterative stack-based versions since depth must be explicitly tracked.',
                example: 'Tree: [10,5,15]. Inorder with depth: [{value:5,depth:1}, {value:10,depth:0}, {value:15,depth:1}].'
            },
            {
                title: 'Reverse Postorder Without Reversing',
                difficulty: 'Medium',
                description: 'Generate the reverse of postorder traversal (which equals a modified preorder: root, right, left) directly without generating postorder first and reversing.',
                whyDifferent: 'Forces you to think about traversal order relationships. Reverse postorder is used in topological sorting and graph algorithms. Generating it directly requires visiting right before left in a preorder-like pattern.',
                example: 'Tree: [10,5,15,2,7,12,20]. Postorder: [2,7,5,12,20,15,10]. Reverse postorder (generated directly): [10,15,20,12,5,7,2].'
            }
        ],
        similar: [
    { id: '04-bst-traversal/01-iterative-tree-traversal', name: 'Iterative Tree Traversal', difficulty: 'Medium' },
    { id: '04-bst-traversal/02-morris-traversal', name: 'Morris Traversal', difficulty: 'Hard' },
    { id: '04-bst-traversal/03-level-order-zigzag', name: 'Binary Tree Zigzag Level Order Traversal', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal'] = problem;

})();
