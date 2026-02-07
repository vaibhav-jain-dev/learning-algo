/**
 * Leaf Traversal of N Trees
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 * Parent: 11-compare-leaf-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Leaf Traversal of N Trees',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '11-compare-leaf-traversal',
        description: 'Given N binary trees, determine if all of them have the same leaf traversal. With two trees, you compare one pair. With N trees, a naive approach makes N-1 comparisons. An optimization is to compute the leaf sequence once for the first tree and compare all others against it, or use hashing.',
        problem: 'With two trees, you compare one pair. With N trees, a naive approach makes N-1 comparisons. An optimization is to compute the leaf sequence once for the first tree and compare all others against it, or use hashing.',
        hints: [
            'Consider: Given N binary trees, determine if all of them have the same leaf traversal.',
            'With two trees, you compare one pair.',
            'Key insight: With N trees, a naive approach makes N-1 comparisons.',
            'An optimization is to compute the leaf sequence once for the first tree and compare all others against it, or use hashing.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree1":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"tree2":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}}},
                output: true,
                explanation: 'The leaf traversal of n trees condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree1":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"tree2":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}}},
                output: false,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def leaf_traversal_of_n_trees(tree1, tree2):
    """
    Leaf Traversal of N Trees

    Given N binary trees, determine if all of them have the same leaf traversal. With two trees, you compare one pair. With N trees, a naive approach makes N-1 comparisons. An optimization is to compute the leaf sequence once for the first tree and compare all others against it, or use hashing.

    Time: O(n)
    Space: O(n)
    """
    j = 0

    for i in range(len(tree1)):
        if j < len(tree2) and tree1[i] == tree2[j]:
            j += 1

    return j == len(tree2)


# Test cases
print(leaf_traversal_of_n_trees({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, {"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 7, "right": {"value": 5, "right": {"value": 6}}}}, "right": {"value": 3, "left": {"value": 8}}}))  # Expected: True
print(leaf_traversal_of_n_trees({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, {"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 7, "right": {"value": 5, "right": {"value": 6}}}}, "right": {"value": 3, "left": {"value": 8}}}))  # Expected: False
`,
            go: `package main

import "fmt"

// LeafTraversalOfNTrees solves the Leaf Traversal of N Trees problem.
// Given N binary trees, determine if all of them have the same leaf traversal. With two trees, you compare one pair. With N trees, a naive approach makes N-1 comparisons. An optimization is to compute the leaf sequence once for the first tree and compare all others against it, or use hashing.
// Time: O(n), Space: O(n)
func LeafTraversalOfNTrees(tree1 *TreeNode, tree2 *TreeNode) bool {
	j := 0

	for i := 0; i < len(tree1) && j < len(tree2); i++ {
		if tree1[i] == tree2[j] {
			j++
		}
	}

	return j == len(tree2)
}

func main() {
	fmt.Println(LeafTraversalOfNTrees({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, {"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}})) // Expected: true
	fmt.Println(LeafTraversalOfNTrees({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, {"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":7,"right":{"value":5,"right":{"value":6}}}},"right":{"value":3,"left":{"value":8}}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '11-compare-leaf-traversal/twist-05-leaf-traversal-of-n-trees', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/11-compare-leaf-traversal/twist-05-leaf-traversal-of-n-trees'] = problem;
})();
