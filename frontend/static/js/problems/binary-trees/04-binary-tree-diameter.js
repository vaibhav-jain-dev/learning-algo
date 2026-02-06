/**
 * Binary Tree Diameter
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-diameter
 */
(function() {
    'use strict';

    const problem = {
        name: 'Binary Tree Diameter',
        difficulty: 'Medium',
        algorithm: 'tree-diameter',
        description: 'Write a function that takes in a Binary Tree and returns its diameter. The diameter of a binary tree is the length of the longest path between any two nodes in the tree. This path may or may not pass through the root. The length of a path is measured by the number of edges between the two nodes (not the number of nodes).',
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
                        "value": 3,
                        "left": {
                                "value": 7,
                                "left": {
                                        "value": 8
                                }
                        },
                        "right": {
                                "value": 4,
                                "right": {
                                        "value": 5,
                                        "right": {
                                                "value": 6
                                        }
                                }
                        }
                },
                "right": {
                        "value": 2
                }
        }
},
        output: 6,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 3, \'left\': {\'value\': 7, \'left\': {\'value\': 8}}, \'right\': {\'value\': 4, \'right\': {\'value\': 5, \'right\': {\'value\': 6}}}}, \'right\': {\'value\': 2}}, the result is 6.'
    }
        ],
        twists: [
            {
                title: 'N-ary Tree Diameter',
                difficulty: 'Hard',
                description: 'Find the diameter of an N-ary tree where each node can have any number of children.',
                whyDifferent: 'In a binary tree, the diameter through a node is leftHeight + rightHeight. In an N-ary tree, you must find the two tallest subtrees among all children to compute the through-path, requiring sorting or tracking top-2 heights.',
                example: 'Node(1, children=[Node(2, children=[Node(5)]), Node(3), Node(4, children=[Node(6, children=[Node(7)])])]). Diameter = height(2-subtree) + height(4-subtree) = 2+3 = 5.'
            },
            {
                title: 'Iterative Diameter Computation',
                difficulty: 'Medium',
                description: 'Compute the diameter without recursion. Use iterative postorder traversal with an explicit stack.',
                whyDifferent: 'The recursive solution elegantly returns height while updating a global diameter. Iteratively, you need to process nodes in postorder and store computed heights in a hash map to look up when processing parent nodes.',
                example: 'Stack-based postorder: process leaves first, store their heights, then process parents using stored child heights.'
            },
            {
                title: 'Diameter as Node Count',
                difficulty: 'Easy',
                description: 'Compute the diameter measured in nodes instead of edges. The diameter is the number of nodes on the longest path.',
                whyDifferent: 'Off-by-one difference. The diameter in edges equals diameter in nodes minus 1. The base case changes: a single node has diameter 1 (nodes) vs 0 (edges). Tests precision in definition.',
                example: 'Path 8->7->3->4->5->6: 6 nodes, 5 edges. Node-diameter=6, edge-diameter=5.'
            },
            {
                title: 'Return the Diameter Path',
                difficulty: 'Hard',
                description: 'Instead of returning the diameter length, return the actual list of node values along the longest path.',
                whyDifferent: 'Tracking the length is O(1) per node, but reconstructing the actual path requires storing and merging path arrays at each node. The postorder logic must return both height and the path to the deepest leaf.',
                example: 'Tree from base problem: return [8, 7, 3, 4, 5, 6] as the diameter path.'
            },
            {
                title: 'Weighted Edge Diameter',
                difficulty: 'Hard',
                description: 'Each edge has a weight. The diameter is the longest path by total edge weight, not number of edges.',
                whyDifferent: 'Height is no longer just +1 per level. Each edge contributes its weight. You must track weighted path sums instead of simple heights, and the maximum through-path uses weighted sums.',
                example: 'Root->Left (weight 5), Root->Right (weight 1), Right->Leaf (weight 10). Diameter path is Left-Root-Right-Leaf = 5+1+10 = 16.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '04-binary-tree-diameter', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/04-binary-tree-diameter'] = problem;

})();
