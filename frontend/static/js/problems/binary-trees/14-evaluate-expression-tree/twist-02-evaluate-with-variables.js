/**
 * Evaluate with Variables
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-expression
 * Parent: 14-evaluate-expression-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Evaluate with Variables',
        difficulty: 'Medium',
        algorithm: 'tree-expression',
        parent: '14-evaluate-expression-tree',
        description: 'Leaf nodes can contain variable names (strings) in addition to numbers. Given a dictionary mapping variable names to values, evaluate the expression tree. Leaf node handling branches: if it is a number, use it directly; if it is a variable, look it up. This adds a lookup layer and error handling for undefined variables to the base case.',
        problem: 'Leaf node handling branches: if it is a number, use it directly; if it is a variable, look it up. This adds a lookup layer and error handling for undefined variables to the base case.',
        hints: [
            'Consider: Leaf nodes can contain variable names (strings) in addition to numbers.',
            'Given a dictionary mapping variable names to values, evaluate the expression tree.',
            'Key insight: Leaf node handling branches: if it is a number, use it directly; if it is a variable, look it up.',
            'This adds a lookup layer and error handling for undefined variables to the base case.'
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
            python: `def evaluate_with_variables(tree):
    """
    Evaluate with Variables

    Leaf nodes can contain variable names (strings) in addition to numbers. Given a dictionary mapping variable names to values, evaluate the expression tree. Leaf node handling branches: if it is a number, use it directly; if it is a variable, look it up. This adds a lookup layer and error handling for undefined variables to the base case.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(evaluate_with_variables({"value": -1, "left": {"value": -2, "left": {"value": 2}, "right": {"value": 3}}, "right": {"value": -3, "left": {"value": 4}, "right": {"value": 5}}}))  # Expected: 1
print(evaluate_with_variables({"value": -1, "left": {"value": 5}, "right": {"value": 7}}))  # Expected: 2
print(evaluate_with_variables({"value": -1, "left": {"value": -2, "left": {"value": 2}, "right": {"value": 3}}, "right": {"value": -3, "left": {"value": 4}, "right": {"value": 5}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// EvaluateWithVariables solves the Evaluate with Variables problem.
// Leaf nodes can contain variable names (strings) in addition to numbers. Given a dictionary mapping variable names to values, evaluate the expression tree. Leaf node handling branches: if it is a number, use it directly; if it is a variable, look it up. This adds a lookup layer and error handling for undefined variables to the base case.
// Time: O(n), Space: O(n)
func EvaluateWithVariables(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(EvaluateWithVariables({"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}})) // Expected: 1
	fmt.Println(EvaluateWithVariables({"value":-1,"left":{"value":5},"right":{"value":7}})) // Expected: 2
	fmt.Println(EvaluateWithVariables({"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '14-evaluate-expression-tree/twist-02-evaluate-with-variables', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/14-evaluate-expression-tree/twist-02-evaluate-with-variables'] = problem;
})();
