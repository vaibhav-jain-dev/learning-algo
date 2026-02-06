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
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree1={\'value\': 1, \'left\': {\'value\': 3, \'left\': {\'value\': 5}}, \'right\': {\'value\': 2}}, tree2={\'value\': 2, \'left\': {\'value\': 1, \'right\': {\'value\': 4}}, \'right\': {\'value\': 3, \'right\': {\'value\': 7}}}, the result is {\'value\': 3, \'left\': {\'value\': 4, \'left\': {\'value\': 5}, \'right\': {\'value\': 4}}, \'right\': {\'value\': 5, \'right\': {\'value\': 7}}}.'
    }
        ],
        twists: [
            {
                title: 'Merge with Custom Operation',
                difficulty: 'Medium',
                description: 'Instead of summing overlapping node values, apply a custom operation: take the maximum of the two values when both nodes exist.',
                whyDifferent: 'The traversal structure is identical but the merge operation changes. This tests whether you can parameterize the merge function and highlights that the tree-merging pattern is independent of the value combination strategy.',
                example: 'Tree1 [1, 3, 2], Tree2 [2, 1, 3]. Merged (max): [2, 3, 3]. Node-by-node: max(1,2)=2, max(3,1)=3, max(2,3)=3.'
            },
            {
                title: 'Merge Three Binary Trees',
                difficulty: 'Medium',
                description: 'Merge three binary trees by summing corresponding node values. If a position exists in any tree, include it in the result.',
                whyDifferent: 'With two trees, you have 2^2 - 1 = 3 cases per node (both exist, only left, only right). With three trees, you have 2^3 - 1 = 7 cases, significantly increasing the conditional logic at each step.',
                example: 'Tree1 [1, 2], Tree2 [3, null, 4], Tree3 [5, 6, 7]. Merged: [9, 8, 11]. Root: 1+3+5=9, Left: 2+0+6=8, Right: 0+4+7=11.'
            },
            {
                title: 'Merge BSTs into Valid BST',
                difficulty: 'Hard',
                description: 'Given two BSTs, merge them into a single valid BST (not just overlaying positions). The result must maintain BST ordering.',
                whyDifferent: 'Simple position-based merging does not preserve BST ordering. You must extract all values from both trees, sort them, and build a balanced BST from the merged sorted array, which is a completely different approach.',
                example: 'BST1 [3, 1, 5], BST2 [4, 2, 6]. Position-merge would give [7, 3, 11] which is not a valid BST. Correct merge: sorted values [1,2,3,4,5,6], build balanced BST [3, 1, 5, null, 2, 4, 6].'
            },
            {
                title: 'Subtract Binary Trees',
                difficulty: 'Easy',
                description: 'Instead of adding corresponding values, subtract tree2 from tree1. If a node exists only in tree2, negate its value.',
                whyDifferent: 'Subtraction is not commutative, so the order of operands matters. When only tree2 has a node, you must negate it (not just copy), and this asymmetry tests careful handling of the one-tree-present cases.',
                example: 'Tree1 [5, 3, 8], Tree2 [2, 4, null, 1]. Subtracted: [3, -1, 8, -1]. Node values: 5-2=3, 3-4=-1, 8-0=8, 0-1=-1.'
            },
            {
                title: 'Merge with Structure Priority',
                difficulty: 'Hard',
                description: 'Merge two trees, but when both trees have a node at the same position, use tree1 value and tree1 structure (ignore tree2 subtree). Only use tree2 nodes where tree1 has no node.',
                whyDifferent: 'This is not a value merge but a structural overlay. Tree1 takes priority, and tree2 fills gaps. You must stop descending into tree2 branches that are shadowed by tree1, which changes the recursion logic.',
                example: 'Tree1 [1, 2, null, 3], Tree2 [5, 6, 7, 8, 9]. Result: [1, 2, 7, 3, null, null, null]. Tree1 structure preserved where it exists; tree2 right subtree (7) fills the gap.'
            }
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
