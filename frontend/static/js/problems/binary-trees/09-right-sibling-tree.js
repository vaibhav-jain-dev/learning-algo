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
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4, \'left\': {\'value\': 8}, \'right\': {\'value\': 9}}, \'right\': {\'value\': 5, \'right\': {\'value\': 10}}}, \'right\': {\'value\': 3, \'left\': {\'value\': 6, \'left\': {\'value\': 11}, \'right\': {\'value\': 12}}, \'right\': {\'value\': 7}}}, the result is siblings connected at each level.'
    }
        ],
        twists: [
            {
                title: 'Left Sibling Tree',
                difficulty: 'Medium',
                description: 'Transform the tree so each node\'s left pointer points to its left sibling (the node immediately to its left on the same level) instead of its left child.',
                whyDifferent: 'The mirror transformation requires connecting nodes to their left sibling, meaning you process right-to-left at each level. The original right pointers must remain, so you lose left children instead of right children.',
                example: 'Tree [1, 2, 3, 4, 5, 6, 7]. After transform: node 3.left = 2 (sibling), node 5.left = 4 (sibling), node 7.left = 6 (sibling). Node 2.left = null (no left sibling).'
            },
            {
                title: 'Right Sibling Without Modifying Tree',
                difficulty: 'Medium',
                description: 'Return a mapping (dictionary) from each node value to its right sibling value without modifying the original tree structure.',
                whyDifferent: 'The original problem modifies pointers in-place. Building an external mapping means the tree stays intact, requiring a level-order traversal to identify siblings and store relationships separately.',
                example: 'Tree [1, 2, 3, 4, 5, 6, 7]. Output: {2: 3, 4: 5, 5: 6, 6: 7, 1: null, 3: null, 7: null}.'
            },
            {
                title: 'Next Right Pointer in Non-Perfect Tree',
                difficulty: 'Hard',
                description: 'Connect right sibling pointers in a binary tree that is NOT perfect (has missing nodes). Each node should point to the next node on the same level, skipping gaps.',
                whyDifferent: 'In a perfect tree, every level is full so siblings are straightforward. With missing nodes, finding the "next right" requires scanning across potentially many null children, making the pointer-chasing logic much more complex.',
                example: 'Tree [1, 2, 3, 4, 5, null, 7]. Node 4.right_sibling = 5, node 5.right_sibling = 7 (skipping the missing child of 3).'
            },
            {
                title: 'Right Sibling with O(1) Space',
                difficulty: 'Hard',
                description: 'Perform the right sibling transformation using only O(1) extra space (no queue, no recursion). Use the already-established sibling pointers from the previous level to traverse the current level.',
                whyDifferent: 'The standard BFS approach uses O(w) space for the queue. The O(1) approach uses previously linked levels as a "virtual linked list" to iterate and connect the next level, requiring a fundamentally different traversal pattern.',
                example: 'After connecting level 1 (nodes 2 and 3), use the 2->3 link to traverse level 1 and connect their children: 4->5->6->7, without any queue.'
            },
            {
                title: 'Rightmost Non-Null at Each Level',
                difficulty: 'Easy',
                description: 'Instead of connecting siblings, return a list of the rightmost non-null node value at each level of the tree.',
                whyDifferent: 'This simplifies to a right-side view problem. You only need the last node per level rather than linking all siblings, which can be solved with either BFS (last element per level) or DFS (right-first traversal).',
                example: 'Tree [1, 2, 3, 4, 5, null, 7]. Right view: [1, 3, 7]. These are the rightmost nodes at levels 0, 1, 2.'
            }
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
