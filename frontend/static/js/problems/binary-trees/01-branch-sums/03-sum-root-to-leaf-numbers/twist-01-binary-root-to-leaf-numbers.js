/**
 * Binary Root-to-Leaf Numbers
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 * Parent: 01-branch-sums/03-sum-root-to-leaf-numbers
 */
(function() {
    'use strict';

    const problem = {
        name: 'Binary Root-to-Leaf Numbers',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/03-sum-root-to-leaf-numbers',
        description: 'Instead of decimal digits, each node contains a binary digit (0 or 1). Each root-to-leaf path represents a binary number. Return the sum of all binary numbers. The formula changes from num*10+digit to num*2+digit. Conceptually similar but tests whether you understand the generalization to any base, not just base 10.',
        problem: 'The formula changes from num*10+digit to num*2+digit. Conceptually similar but tests whether you understand the generalization to any base, not just base 10.',
        hints: [
            'Consider: Instead of decimal digits, each node contains a binary digit (0 or 1).',
            'Each root-to-leaf path represents a binary number.',
            'Key insight: Return the sum of all binary numbers.',
            'Conceptually similar but tests whether you understand the generalization to any base, not just base 10.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}}},
                output: [0],
                explanation: 'The binary root to leaf numbers for this input yields [0].'
            },
            {
                input: {"tree":{"value":4,"left":{"value":9,"left":{"value":5},"right":{"value":1}},"right":{"value":0}}},
                output: [0,1],
                explanation: 'The binary root to leaf numbers for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def binary_root_to_leaf_numbers(tree):
    """
    Binary Root-to-Leaf Numbers

    Instead of decimal digits, each node contains a binary digit (0 or 1). Each root-to-leaf path represents a binary number. Return the sum of all binary numbers. The formula changes from num*10+digit to num*2+digit. Conceptually similar but tests whether you understand the generalization to any base, not just base 10.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(binary_root_to_leaf_numbers({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: [0]
print(binary_root_to_leaf_numbers({"value": 4, "left": {"value": 9, "left": {"value": 5}, "right": {"value": 1}}, "right": {"value": 0}}))  # Expected: [0,1]
print(binary_root_to_leaf_numbers({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: []
`,
            go: `package main

import "fmt"

// BinaryRootToLeafNumbers solves the Binary Root-to-Leaf Numbers problem.
// Instead of decimal digits, each node contains a binary digit (0 or 1). Each root-to-leaf path represents a binary number. Return the sum of all binary numbers. The formula changes from num*10+digit to num*2+digit. Conceptually similar but tests whether you understand the generalization to any base, not just base 10.
// Time: O(n), Space: O(n)
func BinaryRootToLeafNumbers(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(BinaryRootToLeafNumbers({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: [0]
	fmt.Println(BinaryRootToLeafNumbers({"value":4,"left":{"value":9,"left":{"value":5},"right":{"value":1}},"right":{"value":0}})) // Expected: [0,1]
	fmt.Println(BinaryRootToLeafNumbers({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/03-sum-root-to-leaf-numbers/twist-01-binary-root-to-leaf-numbers', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/03-sum-root-to-leaf-numbers/twist-01-binary-root-to-leaf-numbers'] = problem;
})();
