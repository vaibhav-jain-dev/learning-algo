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
