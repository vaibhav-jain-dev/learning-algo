/**
 * Two-Pass Recursive Approach
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 * Parent: 02-product-sum/03-nested-list-weighted-sum-ii
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two-Pass Recursive Approach',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/03-nested-list-weighted-sum-ii',
        description: 'Solve using two separate recursive passes: first find the maximum depth, then compute the weighted sum using (maxDepth - currentDepth + 1) as the weight.',
        problem: 'The BFS level-accumulation trick avoids needing to know max depth upfront. The two-pass approach requires a fundamentally different strategy: decomposing the problem into two independent recursive traversals.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[[1,1],2,[1,1]]},
                output: 2,
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"array":[[1,1]]},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def two_pass_recursive_approach(array):
    """
    Two-Pass Recursive Approach

    Solve using two separate recursive passes: first find the maximum depth, then compute the weighted sum using (maxDepth - currentDepth + 1) as the weight.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(two_pass_recursive_approach([[1,1],2,[1,1]]))  # Expected: 2
print(two_pass_recursive_approach([[1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// TwoPassRecursiveApproach solves the Two-Pass Recursive Approach problem.
// Solve using two separate recursive passes: first find the maximum depth, then compute the weighted sum using (maxDepth - currentDepth + 1) as the weight.
// Time: O(?), Space: O(?)
func TwoPassRecursiveApproach(array [][]int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TwoPassRecursiveApproach([][]int{{1, 1}, 2, {1, 1}})) // Expected: 2
	fmt.Println(TwoPassRecursiveApproach([][]int{{1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/03-nested-list-weighted-sum-ii/twist-01-two-pass-recursive-approach', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/03-nested-list-weighted-sum-ii/twist-01-two-pass-recursive-approach'] = problem;
})();
