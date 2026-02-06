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
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4, \'left\': {\'value\': 6}}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3}}, target=5, the result is 1.'
    }
        ],
        twists: [
            {
                title: 'Find Predecessor Instead',
                difficulty: 'Medium',
                description: 'Find the in-order predecessor of a given node (the node that comes immediately before it in in-order traversal).',
                whyDifferent: 'The logic is mirrored: instead of going to the right subtree and finding the leftmost, go to the left subtree and find the rightmost. The parent traversal direction also reverses.',
                example: 'In-order: 6,4,2,5,1,3. Predecessor of 1 is 5. Predecessor of 6 is null.'
            },
            {
                title: 'Successor Without Parent Pointers',
                difficulty: 'Medium',
                description: 'Find the in-order successor when nodes do NOT have parent pointers. You only have the root of the tree and the target value.',
                whyDifferent: 'Without parent pointers, you cannot walk up. You must traverse from the root, tracking the last node where you went left (potential successor) while searching for the target.',
                example: 'Tree rooted at 1. To find successor of 5, search from root, tracking last left-turn ancestor.'
            },
            {
                title: 'K-th Successor',
                difficulty: 'Medium',
                description: 'Find the k-th in-order successor of the target node (the node that is k positions after it in in-order traversal).',
                whyDifferent: 'Instead of returning the immediate next, you need to advance k steps in in-order traversal. This may cross multiple subtree boundaries and parent links, requiring a general in-order iteration mechanism.',
                example: 'In-order: 6,4,2,5,1,3. 2nd successor of 4 is 5. 3rd successor of 4 is 1.'
            },
            {
                title: 'Preorder Successor',
                difficulty: 'Medium',
                description: 'Find the preorder successor instead of the in-order successor. Preorder visits: node, left, right.',
                whyDifferent: 'Preorder successor logic is different: if the node has a left child, successor is the left child. If it has only a right child, successor is the right child. If it is a leaf, walk up to find the first ancestor whose right subtree has not been visited.',
                example: 'Preorder: 1,2,4,6,5,3. Preorder successor of 6 is 5. Preorder successor of 5 is 3.'
            },
            {
                title: 'Threaded Binary Tree Successor',
                difficulty: 'Hard',
                description: 'The tree is a threaded binary tree where null right pointers are replaced with threads to the in-order successor. Find the successor using threads.',
                whyDifferent: 'Threaded trees encode successor information directly in the tree structure. If the right pointer is a thread, the successor is immediate. If it is a real child, find the leftmost node of the right subtree. You must distinguish threads from real children.',
                example: 'Node 5 has a thread (not a real right child) pointing to node 1. Successor of 5 is 1 via the thread.'
            }
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
