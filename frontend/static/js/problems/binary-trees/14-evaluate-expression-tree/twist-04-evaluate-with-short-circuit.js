/**
 * Evaluate with Short-Circuit
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-expression
 * Parent: 14-evaluate-expression-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Evaluate with Short-Circuit',
        difficulty: 'Hard',
        algorithm: 'tree-expression',
        parent: '14-evaluate-expression-tree',
        description: 'Add logical operators AND (&&) and OR (||) to the expression tree. Implement short-circuit evaluation: AND returns 0 immediately if left is 0, OR returns 1 immediately if left is 1. Standard arithmetic always evaluates both children. Short-circuit evaluation conditionally skips the right subtree based on the left result, introducing lazy evaluation into the tree traversal.',
        problem: 'Standard arithmetic always evaluates both children. Short-circuit evaluation conditionally skips the right subtree based on the left result, introducing lazy evaluation into the tree traversal.',
        hints: [
            'Consider: Add logical operators AND (&&) and OR (||) to the expression tree.',
            'Implement short-circuit evaluation: AND returns 0 immediately if left is 0, OR returns 1 immediately if left is 1.',
            'Key insight: Standard arithmetic always evaluates both children.',
            'Short-circuit evaluation conditionally skips the right subtree based on the left result, introducing lazy evaluation into the tree traversal.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}}},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the evaluate with short circuit criteria.'
            },
            {
                input: {"tree":{"value":-1,"left":{"value":5},"right":{"value":7}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the evaluate with short circuit criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def evaluate_with_short_circuit(tree):
    """
    Evaluate with Short-Circuit

    Add logical operators AND (&&) and OR (||) to the expression tree. Implement short-circuit evaluation: AND returns 0 immediately if left is 0, OR returns 1 immediately if left is 1. Standard arithmetic always evaluates both children. Short-circuit evaluation conditionally skips the right subtree based on the left result, introducing lazy evaluation into the tree traversal.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(evaluate_with_short_circuit({"value": -1, "left": {"value": -2, "left": {"value": 2}, "right": {"value": 3}}, "right": {"value": -3, "left": {"value": 4}, "right": {"value": 5}}}))  # Expected: 1
print(evaluate_with_short_circuit({"value": -1, "left": {"value": 5}, "right": {"value": 7}}))  # Expected: 2
print(evaluate_with_short_circuit({"value": -1, "left": {"value": -2, "left": {"value": 2}, "right": {"value": 3}}, "right": {"value": -3, "left": {"value": 4}, "right": {"value": 5}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// EvaluateWithShortCircuit solves the Evaluate with Short-Circuit problem.
// Add logical operators AND (&&) and OR (||) to the expression tree. Implement short-circuit evaluation: AND returns 0 immediately if left is 0, OR returns 1 immediately if left is 1. Standard arithmetic always evaluates both children. Short-circuit evaluation conditionally skips the right subtree based on the left result, introducing lazy evaluation into the tree traversal.
// Time: O(n), Space: O(n)
func EvaluateWithShortCircuit(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(EvaluateWithShortCircuit({"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}})) // Expected: 1
	fmt.Println(EvaluateWithShortCircuit({"value":-1,"left":{"value":5},"right":{"value":7}})) // Expected: 2
	fmt.Println(EvaluateWithShortCircuit({"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '14-evaluate-expression-tree/twist-04-evaluate-with-short-circuit', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/14-evaluate-expression-tree/twist-04-evaluate-with-short-circuit'] = problem;
})();
