/**
 * Branch Sums
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Branch Sums',
        difficulty: 'Easy',
        algorithm: 'tree-dfs',
        description: 'Write a function that takes in a Binary Tree and returns a list of its branch sums ordered from leftmost branch sum to rightmost branch sum. A branch sum is the sum of all values in a Binary Tree branch. A Binary Tree branch is a path of nodes in a tree that starts at the root node and ends at any leaf node.',
        problem: 'Use DFS to traverse the tree while keeping a running sum. Pass the current sum down to each child. When you reach a leaf node (no children), add the running sum to your results. Process left subtree before right subtree to maintain left-to-right order in the results.',
        hints: [
            'A branch ends at a leaf node. How do you identify a leaf node?',
            'As you traverse down, you need to track the sum of all nodes in the current path.',
            'Use recursion: pass the running sum as a parameter, adding each node\'s value as you go deeper.',
            'When you reach a leaf (no left or right child), the running sum is a complete branch sum - add it to results.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "tree": {
                "value": 1,
                "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}},
                "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}
        }
        },
        output: [15, 16, 18, 10, 11],
        explanation: 'Branch 1→2→4→8: sum=15. Branch 1→2→4→9: sum=16. Branch 1→2→5→10: sum=18. Branch 1→3→6: sum=10. Branch 1→3→7: sum=11. Traversing left subtrees first gives left-to-right ordering.'
    }
        ],
        twists: [
            {
                title: 'N-ary Tree Branch Sums',
                difficulty: 'Medium',
                description: 'Instead of a binary tree, compute branch sums for an N-ary tree where each node can have any number of children.',
                whyDifferent: 'You can no longer check just left/right for leaf detection. You must iterate over a children array and handle the variable branching factor.',
                example: 'Node(1, children=[Node(2, children=[Node(4)]), Node(3)]) => [7, 4]. Path 1->2->4=7, Path 1->3=4.'
            },
            {
                title: 'Iterative Branch Sums',
                difficulty: 'Medium',
                description: 'Compute branch sums without recursion, using an explicit stack. Maintain left-to-right ordering of results.',
                whyDifferent: 'Recursion naturally passes the running sum down the call stack. Iteratively, you must pair each node with its accumulated sum on the stack, and push right before left to maintain order.',
                example: 'Same tree as base problem, but solved with a stack of (node, runningSum) pairs.'
            },
            {
                title: 'Streaming Branch Sums',
                difficulty: 'Hard',
                description: 'Nodes are added to the tree one at a time via an insert stream. After each insertion, output the current list of branch sums without re-traversing the entire tree.',
                whyDifferent: 'Instead of a one-shot traversal, you need to maintain state about existing branch sums and efficiently update them when a leaf gains a child or a new leaf appears.',
                example: 'Insert 1 (root) => [1]. Insert 2 (left of 1) => [3]. Insert 3 (right of 1) => [3, 4].'
            },
            {
                title: 'Branch Sums with Parent Pointers',
                difficulty: 'Easy',
                description: 'Each node has a parent pointer. Given any leaf node, compute its branch sum by walking up to the root instead of down from the root.',
                whyDifferent: 'Reverses the direction of thinking: instead of top-down DFS passing sums down, you walk bottom-up from each leaf accumulating values toward the root.',
                example: 'Given leaf node with value 8, walk up: 8->4->2->1, branch sum = 15.'
            },
            {
                title: 'Count Branches by Sum Range',
                difficulty: 'Medium',
                description: 'Instead of returning all branch sums, return the count of branches whose sum falls within a given range [lo, hi].',
                whyDifferent: 'Changes from a "find all" to a "count with filter" problem. You can prune early if the running sum already exceeds hi and all remaining node values are positive.',
                example: 'Tree: 1->2->4, 1->3. Range [4,6] => 1 (only branch 1->3=4 is in range, 1->2->4=7 is out).'
            }
        ],
        similar: [
    { id: '01-branch-sums/01-path-sum-to-target', name: 'Path Sum to Target', difficulty: 'Medium' },
    { id: '01-branch-sums/02-binary-tree-max-path-sum', name: 'Binary Tree Maximum Path Sum', difficulty: 'Hard' },
    { id: '01-branch-sums/03-sum-root-to-leaf-numbers', name: 'Sum Root to Leaf Numbers', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums'] = problem;

})();
