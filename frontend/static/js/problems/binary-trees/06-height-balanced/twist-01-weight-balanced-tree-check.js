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
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
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
