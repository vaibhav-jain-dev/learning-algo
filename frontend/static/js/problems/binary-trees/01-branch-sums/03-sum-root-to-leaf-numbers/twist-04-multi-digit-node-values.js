/**
 * Multi-Digit Node Values
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-dfs
 * Parent: 01-branch-sums/03-sum-root-to-leaf-numbers
 */
(function() {
    'use strict';

    const problem = {
        name: 'Multi-Digit Node Values',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/03-sum-root-to-leaf-numbers',
        description: 'Nodes can contain multi-digit numbers (e.g., 12, 345). The path concatenation uses the full number, not just a single digit. The formula changes from num*10+digit to num*(10^numDigits)+value. You need to compute the number of digits in each node value to shift correctly.',
        problem: 'The formula changes from num*10+digit to num*(10^numDigits)+value. You need to compute the number of digits in each node value to shift correctly.',
        hints: [
            'Consider: Nodes can contain multi-digit numbers (e.g., 12, 345).',
            'The path concatenation uses the full number, not just a single digit.',
            'Key insight: The formula changes from num*10+digit to num*(10^numDigits)+value.',
            'You need to compute the number of digits in each node value to shift correctly.'
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
                explanation: 'For this input, there is 1 valid position that satisfy the multi digit node values criteria.'
            },
            {
                input: {"tree":{"value":4,"left":{"value":9,"left":{"value":5},"right":{"value":1}},"right":{"value":0}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the multi digit node values criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def multi_digit_node_values(tree):
    """
    Multi-Digit Node Values

    Nodes can contain multi-digit numbers (e.g., 12, 345). The path concatenation uses the full number, not just a single digit. The formula changes from num*10+digit to num*(10^numDigits)+value. You need to compute the number of digits in each node value to shift correctly.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(multi_digit_node_values({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: 1
print(multi_digit_node_values({"value": 4, "left": {"value": 9, "left": {"value": 5}, "right": {"value": 1}}, "right": {"value": 0}}))  # Expected: 2
print(multi_digit_node_values({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// MultiDigitNodeValues solves the Multi-Digit Node Values problem.
// Nodes can contain multi-digit numbers (e.g., 12, 345). The path concatenation uses the full number, not just a single digit. The formula changes from num*10+digit to num*(10^numDigits)+value. You need to compute the number of digits in each node value to shift correctly.
// Time: O(n), Space: O(n)
func MultiDigitNodeValues(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MultiDigitNodeValues({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: 1
	fmt.Println(MultiDigitNodeValues({"value":4,"left":{"value":9,"left":{"value":5},"right":{"value":1}},"right":{"value":0}})) // Expected: 2
	fmt.Println(MultiDigitNodeValues({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/03-sum-root-to-leaf-numbers/twist-04-multi-digit-node-values', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/03-sum-root-to-leaf-numbers/twist-04-multi-digit-node-values'] = problem;
})();
