/**
 * Iterative In-Order Traversal
 * Category: binary-trees
 * Difficulty: Very
 * Algorithm: tree-iterative
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative In-Order Traversal',
        difficulty: 'Very',
        algorithm: 'tree-iterative',
        description: 'Write a function that takes in a binary tree and returns its in-order traversal as a list of values. **The catch:** You must do this **without using recursion AND without using a stack or any other auxiliary data structure** for storing nodes. In other words, achieve O(1) space complexity (excluding the output array). This requires implementing **Morris Traversal**, a technique that temporarily modifies the tree structure using threaded binary trees.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "tree": {
                "value": 4,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 1
                        },
                        "right": {
                                "value": 3
                        }
                },
                "right": {
                        "value": 6,
                        "left": {
                                "value": 5
                        },
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: [1, 2, 3, 4, 5, 6, 7],
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 4, \'left\': {\'value\': 2, \'left\': {\'value\': 1}, \'right\': {\'value\': 3}}, \'right\': {\'value\': 6, \'left\': {\'value\': 5}, \'right\': {\'value\': 7}}}, the result is [1, ..., 7] (length 7).'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "right": {
                        "value": 2,
                        "left": {
                                "value": 3
                        }
                }
        }
},
        output: [1, 3, 2],
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'right\': {\'value\': 2, \'left\': {\'value\': 3}}}, the result is [1, 3, 2].'
    }
        ],
        twists: [
            {
                title: 'Morris Preorder Traversal',
                difficulty: 'Hard',
                description: 'Implement preorder traversal using Morris traversal (O(1) space, no recursion, no stack). Output nodes in preorder: root, left, right.',
                whyDifferent: 'Morris inorder processes the node when revisiting via the thread. Morris preorder processes the node when first visiting it (before creating the thread), changing when you add to the result relative to the threading logic.',
                example: 'Tree [4, 2, 6, 1, 3, 5, 7]. Preorder: [4, 2, 1, 3, 6, 5, 7]. The node is processed on first visit, not when the inorder predecessor thread is found.'
            },
            {
                title: 'Morris Postorder Traversal',
                difficulty: 'Very Hard',
                description: 'Implement postorder traversal using Morris traversal with O(1) space.',
                whyDifferent: 'Postorder (left, right, root) is the hardest to achieve with Morris because there is no natural point to process a node "after" both subtrees. The trick involves reversing right edges of left subtrees, adding significant complexity.',
                example: 'Tree [4, 2, 6, 1, 3, 5, 7]. Postorder: [1, 3, 2, 5, 7, 6, 4]. Requires reverse-printing right-edge paths when a thread is detected.'
            },
            {
                title: 'Iterative Inorder with Stack',
                difficulty: 'Medium',
                description: 'Implement inorder traversal iteratively using an explicit stack (O(h) space). Compare the approach with Morris traversal.',
                whyDifferent: 'The stack-based approach is more intuitive: push all left children, pop and process, then move to right child. It uses O(h) space but does not modify the tree, trading space for simplicity and safety.',
                example: 'Tree [4, 2, 6, 1, 3, 5, 7]. Stack approach: push 4,2,1. Pop 1 (process), pop 2 (process), push 3, pop 3 (process), pop 4 (process), push 6,5, pop 5, pop 6, push 7, pop 7. Output: [1,2,3,4,5,6,7].'
            },
            {
                title: 'Detect If Tree Was Modified',
                difficulty: 'Hard',
                description: 'After performing Morris traversal, verify that the tree structure is fully restored to its original form. Return true if no threading artifacts remain.',
                whyDifferent: 'Morris traversal temporarily creates threads (pointers from inorder predecessors back to successors). A bug in cleanup leaves dangling threads. This twist requires understanding the threading mechanism deeply enough to verify its correctness.',
                example: 'After Morris inorder on [4, 2, 6, 1, 3, 5, 7], check that node 3 right pointer is null (not pointing back to 4), node 1 right pointer is null (not pointing back to 2), etc.'
            },
            {
                title: 'Kth Inorder Element with O(1) Space',
                difficulty: 'Hard',
                description: 'Find the kth element in inorder traversal using O(1) extra space. Stop as soon as the kth element is found without completing the full traversal.',
                whyDifferent: 'Morris traversal normally completes the full inorder. Early termination requires carefully cleaning up any remaining threads before returning, or the tree is left in a corrupted state with dangling thread pointers.',
                example: 'Tree [4, 2, 6, 1, 3, 5, 7], k=3. Inorder is [1,2,3,4,5,6,7]. The 3rd element is 3. Stop Morris traversal after processing 3 and clean up any active threads.'
            },
            {
                title: 'Threaded Binary Tree Construction',
                difficulty: 'Hard',
                description: 'Instead of temporarily threading and unthreading, permanently convert the binary tree into a threaded binary tree where every null right pointer points to the inorder successor.',
                whyDifferent: 'Morris traversal creates temporary threads and removes them. This twist makes the threads permanent, requiring a flag on each node to distinguish thread pointers from child pointers, which changes the data structure definition itself.',
                example: 'Tree [4, 2, 6, 1, 3, 5, 7]. After threading: node 1 right -> 2 (thread), node 3 right -> 4 (thread), node 5 right -> 6 (thread), node 7 right -> null. Nodes 2, 4, 6 keep their original right children.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '16-iterative-inorder-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/16-iterative-inorder-traversal'] = problem;

})();
