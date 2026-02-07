/**
 * Output Prediction Trap
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-max-path
 * Parent: 01-branch-sums/02-binary-tree-max-path-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Output Prediction Trap',
        difficulty: 'Medium',
        algorithm: 'tree-max-path',
        parent: '01-branch-sums/02-binary-tree-max-path-sum',
        description: 'Given tree [-1, -2, -3], what is the max path sum? Many people incorrectly say 0 (empty path) or -1. The path must contain at least one node. Tests understanding of the constraint that the path must be non-empty. When all values are negative, the answer is the single largest (least negative) value, not zero.',
        problem: 'Tests understanding of the constraint that the path must be non-empty. When all values are negative, the answer is the single largest (least negative) value, not zero.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}}},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":{"value":-10,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}}},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def output_prediction_trap(tree):
    """
    Output Prediction Trap

    Given tree [-1, -2, -3], what is the max path sum? Many people incorrectly say 0 (empty path) or -1. The path must contain at least one node. Tests understanding of the constraint that the path must be non-empty. When all values are negative, the answer is the single largest (least negative) value, not zero.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(output_prediction_trap({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: 1
print(output_prediction_trap({"value": -10, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 2
print(output_prediction_trap({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// OutputPredictionTrap solves the Output Prediction Trap problem.
// Given tree [-1, -2, -3], what is the max path sum? Many people incorrectly say 0 (empty path) or -1. The path must contain at least one node. Tests understanding of the constraint that the path must be non-empty. When all values are negative, the answer is the single largest (least negative) value, not zero.
// Time: O(n), Space: O(n)
func OutputPredictionTrap(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(OutputPredictionTrap({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: 1
	fmt.Println(OutputPredictionTrap({"value":-10,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 2
	fmt.Println(OutputPredictionTrap({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/02-binary-tree-max-path-sum/twist-05-output-prediction-trap', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/02-binary-tree-max-path-sum/twist-05-output-prediction-trap'] = problem;
})();
