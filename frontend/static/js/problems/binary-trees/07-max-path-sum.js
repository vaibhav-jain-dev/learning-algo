/**
 * Max Path Sum in Binary Tree
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-max-path
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Path Sum in Binary Tree',
        difficulty: 'Hard',
        algorithm: 'tree-max-path',
        description: 'Write a function that takes in a Binary Tree and returns its max path sum. A path is a collection of connected nodes in a tree, where no node is connected to more than two other nodes. A path sum is the sum of the values of the nodes in a particular path. The path doesn\'t necessarily need to pass through the root, and it can start and end at any node. The path must contain at least one node.',
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
                        },
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: 18,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3, \'left\': {\'value\': 6}, \'right\': {\'value\': 7}}}, the result is 18.'
    },
    {
        input: {
        "tree": {
                "value": -10,
                "left": {
                        "value": 9
                },
                "right": {
                        "value": 20,
                        "left": {
                                "value": 15
                        },
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: 42,
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': -10, \'left\': {\'value\': 9}, \'right\': {\'value\': 20, \'left\': {\'value\': 15}, \'right\': {\'value\': 7}}}, the result is 42.'
    }
        ],
        twists: [
            {
                title: 'Max Path Sum with Exactly K Nodes',
                difficulty: 'Very Hard',
                description: 'Find the maximum path sum where the path must contain exactly K nodes. The path still follows parent-child connections.',
                whyDifferent: 'Adds a path-length constraint. At each node, you must track the best sum for each possible path length from 1 to K, turning the problem into tree DP where each node returns a length-indexed array of best sums.',
                example: 'Tree: 1->2->4, 1->2->5, 1->3->6, 1->3->7. K=3. Best 3-node path: 5+2+1=8 or 1+3+7=11. Answer: 11.'
            },
            {
                title: 'Min Path Sum Instead',
                difficulty: 'Medium',
                description: 'Find the minimum path sum in the tree. The path still follows parent-child connections and must contain at least one node.',
                whyDifferent: 'The pruning logic reverses: instead of ignoring negative branches (max with 0), you ignore positive branches (min with 0). Forces re-thinking the optimization direction and the handling of all-positive trees.',
                example: 'Tree: -10->9, -10->20->15, -10->20->7. Min path: -10 (just the root). All other paths are less negative.'
            },
            {
                title: 'Return the Path Itself',
                difficulty: 'Hard',
                description: 'Instead of just the maximum sum, return the actual list of node values forming the maximum path.',
                whyDifferent: 'Tracking the optimal sum is a scalar comparison. Tracking the actual path requires storing path segments at each recursive step and merging left-path + node + right-path when updating the global best.',
                example: 'Tree: -10->9, -10->20->15, -10->20->7. Max path: [15, 20, 7]. Return [15, 20, 7] with sum 42.'
            },
            {
                title: 'Max Path Sum in DAG (Not Tree)',
                difficulty: 'Very Hard',
                description: 'The structure is a DAG (directed acyclic graph) instead of a tree. Nodes can have multiple parents. Find the maximum path sum.',
                whyDifferent: 'With multiple parents, a node can appear in paths from different directions. You need to handle shared substructure, potentially using memoization, and ensure no node is counted twice in the same path.',
                example: 'Node 5 has parents 2 and 3. Path through 2->5 and path through 3->5 are both valid but 5 cannot appear twice.'
            },
            {
                title: 'Streaming Max Path Sum',
                difficulty: 'Hard',
                description: 'Node values can be updated at any time. After each update, report the new maximum path sum without full re-traversal.',
                whyDifferent: 'A single node value change can affect all paths through it. You need an efficient data structure to propagate changes upward, potentially using heavy-light decomposition or Euler tour techniques.',
                example: 'Initial max path sum: 42. Update node 15 to -100. New max path sum needs recomputation along affected paths.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '07-max-path-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/07-max-path-sum'] = problem;

})();
