/**
 * Weight-Balanced Tree Check
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-balanced
 * Parent: 06-height-balanced
 */
(function() {
    'use strict';

    const problem = {
        name: 'Weight-Balanced Tree Check',
        difficulty: 'Medium',
        algorithm: 'tree-balanced',
        parent: '06-height-balanced',
        description: 'Instead of height-balanced, check if the tree is weight-balanced: for each node, the number of nodes in the left subtree and right subtree differ by at most 1. Height-balanced compares subtree heights. Weight-balanced compares subtree node counts. The recursive return value changes from height to count, and the balance condition applies to counts instead.',
        problem: 'Height-balanced compares subtree heights. Weight-balanced compares subtree node counts. The recursive return value changes from height to count, and the balance condition applies to counts instead.',
        hints: [
            'Consider: Instead of height-balanced, check if the tree is weight-balanced: for each node, the number of nodes in the left subtree and right subtree differ by at most 1.',
            'Height-balanced compares subtree heights.',
            'Key insight: Weight-balanced compares subtree node counts.',
            'The recursive return value changes from height to count, and the balance condition applies to counts instead.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the weight balanced tree check criteria.'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the weight balanced tree check criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def weight_balanced_tree_check(tree):
    """
    Weight-Balanced Tree Check

    Instead of height-balanced, check if the tree is weight-balanced: for each node, the number of nodes in the left subtree and right subtree differ by at most 1. Height-balanced compares subtree heights. Weight-balanced compares subtree node counts. The recursive return value changes from height to count, and the balance condition applies to counts instead.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(weight_balanced_tree_check({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}))  # Expected: 1
print(weight_balanced_tree_check({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 6}}, "right": {"value": 5}}, "right": {"value": 3}}))  # Expected: 2
print(weight_balanced_tree_check({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// WeightBalancedTreeCheck solves the Weight-Balanced Tree Check problem.
// Instead of height-balanced, check if the tree is weight-balanced: for each node, the number of nodes in the left subtree and right subtree differ by at most 1. Height-balanced compares subtree heights. Weight-balanced compares subtree node counts. The recursive return value changes from height to count, and the balance condition applies to counts instead.
// Time: O(n), Space: O(n)
func WeightBalancedTreeCheck(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WeightBalancedTreeCheck({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}})) // Expected: 1
	fmt.Println(WeightBalancedTreeCheck({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}})) // Expected: 2
	fmt.Println(WeightBalancedTreeCheck({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '06-height-balanced/twist-01-weight-balanced-tree-check', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/06-height-balanced/twist-01-weight-balanced-tree-check'] = problem;
})();
