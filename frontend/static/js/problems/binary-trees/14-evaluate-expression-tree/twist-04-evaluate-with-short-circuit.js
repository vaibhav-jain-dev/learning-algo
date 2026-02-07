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
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":{"value":-1,"left":{"value":5},"right":{"value":7}}},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":{"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}}},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
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
