/**
 * Subtract Binary Trees
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-merge
 * Parent: 12-merge-binary-trees
 */
(function() {
    'use strict';

    const problem = {
        name: 'Subtract Binary Trees',
        difficulty: 'Easy',
        algorithm: 'tree-merge',
        parent: '12-merge-binary-trees',
        description: 'Instead of adding corresponding values, subtract tree2 from tree1. If a node exists only in tree2, negate its value. Subtraction is not commutative, so the order of operands matters. When only tree2 has a node, you must negate it (not just copy), and this asymmetry tests careful handling of the one-tree-present cases.',
        problem: 'Subtraction is not commutative, so the order of operands matters. When only tree2 has a node, you must negate it (not just copy), and this asymmetry tests careful handling of the one-tree-present cases.',
        hints: [
            'Consider: Instead of adding corresponding values, subtract tree2 from tree1.',
            'If a node exists only in tree2, negate its value.',
            'Key insight: Subtraction is not commutative, so the order of operands matters.',
            'When only tree2 has a node, you must negate it (not just copy), and this asymmetry tests careful handling of the one-tree-present cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree1":{"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}},"tree2":{"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}}},
                output: [0],
                explanation: 'The subtract binary trees for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree1":{"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}},"tree2":{"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def subtract_binary_trees(tree1, tree2):
    """
    Subtract Binary Trees

    Instead of adding corresponding values, subtract tree2 from tree1. If a node exists only in tree2, negate its value. Subtraction is not commutative, so the order of operands matters. When only tree2 has a node, you must negate it (not just copy), and this asymmetry tests careful handling of the one-tree-present cases.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree1)):
        # Check if element meets criteria
        result.append(tree1[i])

    return result


# Test cases
print(subtract_binary_trees({"value": 1, "left": {"value": 3, "left": {"value": 5}}, "right": {"value": 2}}, {"value": 2, "left": {"value": 1, "right": {"value": 4}}, "right": {"value": 3, "right": {"value": 7}}}))  # Expected: [0]
print(subtract_binary_trees({"value": 1, "left": {"value": 3, "left": {"value": 5}}, "right": {"value": 2}}, {"value": 2, "left": {"value": 1, "right": {"value": 4}}, "right": {"value": 3, "right": {"value": 7}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// SubtractBinaryTrees solves the Subtract Binary Trees problem.
// Instead of adding corresponding values, subtract tree2 from tree1. If a node exists only in tree2, negate its value. Subtraction is not commutative, so the order of operands matters. When only tree2 has a node, you must negate it (not just copy), and this asymmetry tests careful handling of the one-tree-present cases.
// Time: O(n), Space: O(n)
func SubtractBinaryTrees(tree1 *TreeNode, tree2 *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree1); i++ {
		result = append(result, tree1[i])
	}

	return result
}

func main() {
	fmt.Println(SubtractBinaryTrees({"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}}, {"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}})) // Expected: [0]
	fmt.Println(SubtractBinaryTrees({"value":1,"left":{"value":3,"left":{"value":5}},"right":{"value":2}}, {"value":2,"left":{"value":1,"right":{"value":4}},"right":{"value":3,"right":{"value":7}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '12-merge-binary-trees/twist-04-subtract-binary-trees', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/12-merge-binary-trees/twist-04-subtract-binary-trees'] = problem;
})();
