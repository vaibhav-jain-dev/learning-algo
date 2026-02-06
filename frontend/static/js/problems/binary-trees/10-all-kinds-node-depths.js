/**
 * All Kinds of Node Depths
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Kinds of Node Depths',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        description: 'Write a function that takes in a Binary Tree and returns the sum of all the depths of all nodes in the tree, considering each node as a potential root. More formally, for every node in the tree, calculate the sum of its depths (treating that node as a root), and return the sum of all these values. This is different from the standard "sum of node depths" problem where you only consider depths from the actual root.',
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
                                "value": 4,
                                "left": {
                                        "value": 8
                                },
                                "right": {
                                        "value": 9
                                }
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
        output: 26,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 1, \'left\': {\'value\': 2, \'left\': {\'value\': 4, \'left\': {\'value\': 8}, \'right\': {\'value\': 9}}, \'right\': {\'value\': 5}}, \'right\': {\'value\': 3, \'left\': {\'value\': 6}, \'right\': {\'value\': 7}}}, the result is 26.'
    }
        ],
        twists: [
            {
                title: 'Sum of Pairwise Distances',
                difficulty: 'Very Hard',
                description: 'Instead of summing depths treating each node as root, compute the sum of distances between all pairs of nodes in the tree.',
                whyDifferent: 'Pairwise distances include horizontal paths (not just root-to-node). Each edge contributes to the total based on how many node pairs it separates, requiring you to count nodes on each side of every edge.',
                example: 'Tree [1, 2, 3]. Distances: d(1,2)=1, d(1,3)=1, d(2,3)=2. Total = 4. This is different from sum-of-all-depths which would be 0+1+1+1+1+2 = 6.'
            },
            {
                title: 'Weighted Node Depths',
                difficulty: 'Hard',
                description: 'Each node has a weight. For each node treated as root, compute the sum of (weight * depth) for all other nodes. Return the grand total.',
                whyDifferent: 'The uniform depth contribution becomes weighted, so you cannot use simple counting formulas. Each subtree traversal must track both the count and the sum of weights, adding a dimension to the recursive state.',
                example: 'Tree with values/weights: 1(w=3), 2(w=1), 3(w=2). As root=1: 1*1 + 1*2 = 3. As root=2: 1*3 + 2*2 = 7. As root=3: 1*3 + 2*1 = 5. Total = 15.'
            },
            {
                title: 'Average Node Depth Across All Roots',
                difficulty: 'Medium',
                description: 'Compute the average depth across all nodes when each node is treated as the root. Return a floating-point result.',
                whyDifferent: 'You need the same total as the original problem, but dividing by the correct normalization factor (n * (n-1) since each of n roots has n-1 other nodes). The math insight simplifies the problem but requires careful counting.',
                example: 'Tree [1, 2, 3, 4, 5]. Total from all-kinds = 26. There are 5 nodes, each with 4 others. Average = 26 / (5*4) = 1.3.'
            },
            {
                title: 'All Kinds of Node Heights',
                difficulty: 'Hard',
                description: 'For each node treated as root, compute the sum of heights (distance to deepest leaf in its subtree) instead of depths. Return the total across all nodes.',
                whyDifferent: 'Height is defined relative to leaves, not the root. Treating each node as a pseudo-root and computing "heights" requires re-rooting the tree and finding the farthest leaf from each node, which is related to tree diameter.',
                example: 'Tree [1, 2, 3, 4, 5]. From root 1: heights are h(1)=2, h(2)=1, h(3)=0, h(4)=0, h(5)=0. Sum=3. Repeat for each node as root and total all sums.'
            },
            {
                title: 'Node Depths for Only Leaf Nodes',
                difficulty: 'Medium',
                description: 'For each node treated as root, compute the sum of depths only for leaf nodes (not all nodes). Return the grand total.',
                whyDifferent: 'Filtering to only leaf nodes changes the counting. The formula approach from the original problem must be modified since non-leaf nodes at each depth no longer contribute, requiring separate tracking of leaf counts per subtree.',
                example: 'Tree [1, 2, 3, 4, 5]. Leaves are 4, 5, 3. As root=1: depth(4)=2, depth(5)=2, depth(3)=1. Leaf depth sum = 5. Repeat for all roots.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '10-all-kinds-node-depths', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/10-all-kinds-node-depths'] = problem;

})();
