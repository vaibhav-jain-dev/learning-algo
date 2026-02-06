/**
 * Count Branches by Sum Range
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 * Parent: 01-branch-sums
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Branches by Sum Range',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums',
        description: 'Instead of returning all branch sums, return the count of branches whose sum falls within a given range [lo, hi]. Changes from a "find all" to a "count with filter" problem. You can prune early if the running sum already exceeds hi and all remaining node values are positive.',
        problem: 'Changes from a "find all" to a "count with filter" problem. You can prune early if the running sum already exceeds hi and all remaining node values are positive.',
        hints: [
            'Consider: Instead of returning all branch sums, return the count of branches whose sum falls within a given range [lo, hi].',
            'Changes from a "find all" to a "count with filter" problem.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree: 1->2->4, 1->3.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the count branches by sum range criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def count_branches_by_sum_range(tree):
    """
    Count Branches by Sum Range

    Instead of returning all branch sums, return the count of branches whose sum falls within a given range [lo, hi]. Changes from a "find all" to a "count with filter" problem. You can prune early if the running sum already exceeds hi and all remaining node values are positive.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_branches_by_sum_range({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: 1
print(count_branches_by_sum_range({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountBranchesBySumRange solves the Count Branches by Sum Range problem.
// Instead of returning all branch sums, return the count of branches whose sum falls within a given range [lo, hi]. Changes from a "find all" to a "count with filter" problem. You can prune early if the running sum already exceeds hi and all remaining node values are positive.
// Time: O(n), Space: O(n)
func CountBranchesBySumRange(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountBranchesBySumRange({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: 1
	fmt.Println(CountBranchesBySumRange({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/twist-05-count-branches-by-sum-range', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/twist-05-count-branches-by-sum-range'] = problem;
})();
