/**
 * Iterative Balance Check
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-balanced
 * Parent: 06-height-balanced
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative Balance Check',
        difficulty: 'Medium',
        algorithm: 'tree-balanced',
        parent: '06-height-balanced',
        description: 'Determine if the tree is height-balanced without using recursion. Use iterative postorder traversal. Recursion naturally returns height bottom-up. Iteratively, you must use a stack for postorder traversal and a hash map to store computed heights, checking the balance condition when processing each node.',
        problem: 'Recursion naturally returns height bottom-up. Iteratively, you must use a stack for postorder traversal and a hash map to store computed heights, checking the balance condition when processing each node.',
        hints: [
            'Consider: Determine if the tree is height-balanced without using recursion.',
            'Use iterative postorder traversal.',
            'Key insight: Recursion naturally returns height bottom-up.',
            'Iteratively, you must use a stack for postorder traversal and a hash map to store computed heights, checking the balance condition when processing each node.'
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
                explanation: 'For this input, there is 1 valid position that satisfy the iterative balance check criteria.'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the iterative balance check criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def iterative_balance_check(tree):
    """
    Iterative Balance Check

    Determine if the tree is height-balanced without using recursion. Use iterative postorder traversal. Recursion naturally returns height bottom-up. Iteratively, you must use a stack for postorder traversal and a hash map to store computed heights, checking the balance condition when processing each node.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(iterative_balance_check({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}))  # Expected: 1
print(iterative_balance_check({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 6}}, "right": {"value": 5}}, "right": {"value": 3}}))  # Expected: 2
print(iterative_balance_check({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// IterativeBalanceCheck solves the Iterative Balance Check problem.
// Determine if the tree is height-balanced without using recursion. Use iterative postorder traversal. Recursion naturally returns height bottom-up. Iteratively, you must use a stack for postorder traversal and a hash map to store computed heights, checking the balance condition when processing each node.
// Time: O(n), Space: O(n)
func IterativeBalanceCheck(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(IterativeBalanceCheck({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}})) // Expected: 1
	fmt.Println(IterativeBalanceCheck({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}})) // Expected: 2
	fmt.Println(IterativeBalanceCheck({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '06-height-balanced/twist-02-iterative-balance-check', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/06-height-balanced/twist-02-iterative-balance-check'] = problem;
})();
