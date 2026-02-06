/**
 * Compare Leaf Traversal
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Compare Leaf Traversal',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        description: 'Write a function that takes in the root nodes of two Binary Trees and returns a boolean representing whether their leaf traversals are the same. The leaf traversal of a Binary Tree is the left-to-right sequence of all the leaf nodes in the tree. A leaf node is any node that has no left or right children.',
        complexity: {
            time: 'O(n + m)',
            space: 'O(h1 + h2)'
        },
        examples: [
    {
        input: {
        "tree1": {
                "value": 1,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 4
                        },
                        "right": {
                                "value": 5,
                                "left": {
                                        "value": 7
                                },
                                "right": {
                                        "value": 8
                                }
                        }
                },
                "right": {
                        "value": 3,
                        "right": {
                                "value": 6
                        }
                }
        },
        "tree2": {
                "value": 1,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 4
                        },
                        "right": {
                                "value": 7,
                                "right": {
                                        "value": 5,
                                        "right": {
                                                "value": 6
                                        }
                                }
                        }
                },
                "right": {
                        "value": 3,
                        "left": {
                                "value": 8
                        }
                }
        }
},
        output: true,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree1={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 5, \'left\': {\'value\': 7}, \'right\': {\'value\': 8}}}, \'right\': {\'value\': 3, \'right\': {\'value\': 6}}}, tree2={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 7, \'right\': {\'value\': 5, \'right\': {\'value\': 6}}}}, \'right\': {\'value\': 3, \'left\': {\'value\': 8}}}, the result is true.'
    }
        ],
        twists: [
            {
                title: 'Compare Right-Edge Traversal',
                difficulty: 'Medium',
                description: 'Instead of comparing leaf sequences, compare the right-edge sequences of two binary trees. The right edge is the sequence of nodes visited by always going right from the root until reaching a null.',
                whyDifferent: 'Leaf traversal requires full tree DFS. Right-edge traversal is a simple linear path, but the conceptual shift from leaves (bottom of tree) to edges (side of tree) requires different thinking about what defines tree equivalence.',
                example: 'Tree1 [1, 2, 3, null, null, null, 4]. Right edge: [1, 3, 4]. Tree2 [1, 5, 3, null, null, null, 4]. Right edge: [1, 3, 4]. Same right edge despite different structures.'
            },
            {
                title: 'Compare Boundary Traversal',
                difficulty: 'Hard',
                description: 'Compare the full boundary traversals of two trees. The boundary includes left edge (top-down), leaves (left-to-right), and right edge (bottom-up), without duplicates.',
                whyDifferent: 'Boundary traversal combines three different traversal patterns into one sequence. You must handle corner cases where a node is part of multiple boundaries (e.g., leftmost leaf is both left edge and leaf).',
                example: 'Tree [1, 2, 3, 4, 5, 6, 7]. Boundary: [1, 2, 4, 5, 6, 7, 3]. Left edge: [1, 2, 4], Leaves: [4, 5, 6, 7], Right edge: [7, 3, 1], deduplicated.'
            },
            {
                title: 'Leaf Traversal with Depth',
                difficulty: 'Medium',
                description: 'Compare two trees leaf traversals where each leaf is represented as a (value, depth) pair. Both values and depths must match.',
                whyDifferent: 'Two trees can have the same leaf values in the same order but at different depths. Adding depth as a comparison criterion means structurally different trees with same leaf values will be distinguished.',
                example: 'Tree1 [1, 2, 3] has leaves (2, depth=1), (3, depth=1). Tree2 [1, null, 2, null, 3] has leaves (3, depth=2). Different despite leaf value 3 appearing in both.'
            },
            {
                title: 'Interleaved Leaf Comparison',
                difficulty: 'Hard',
                description: 'Compare leaf traversals of two trees one leaf at a time using iterators (generators), stopping as soon as a mismatch is found, without collecting all leaves first.',
                whyDifferent: 'Collecting all leaves uses O(n) space. Using coroutines or iterators, you yield one leaf at a time from each tree and compare lazily. This is an exercise in generator-based thinking and early termination.',
                example: 'Tree1 has 1000 leaves, Tree2 has 1000 leaves but the first leaf differs. The iterator approach compares just the first leaf and returns false immediately without traversing either full tree.'
            },
            {
                title: 'Leaf Traversal of N Trees',
                difficulty: 'Medium',
                description: 'Given N binary trees, determine if all of them have the same leaf traversal.',
                whyDifferent: 'With two trees, you compare one pair. With N trees, a naive approach makes N-1 comparisons. An optimization is to compute the leaf sequence once for the first tree and compare all others against it, or use hashing.',
                example: 'Trees: [1,2,3], [5,2,3], [1,null,2,null,3] all have leaf traversal [2,3]. But [1,3,2] has leaf traversal [3,2], so it does not match.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '11-compare-leaf-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/11-compare-leaf-traversal'] = problem;

})();
