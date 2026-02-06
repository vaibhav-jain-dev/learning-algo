/**
 * Combinations vs Permutations: Why Loop Order Matters
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-coin-change
 * Parent: 02-number-of-ways-to-make-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Combinations vs Permutations: Why Loop Order Matters',
        difficulty: 'Hard',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change',
        description: 'The outer loop iterates over coins and the inner loop over amounts. What happens if you swap the loop order? Explain the difference and what each version counts.',
        problem: 'This is one of the most subtle distinctions in DP. Outer coins = combinations (order doesn\',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: This is one of the most subtle distinctions in DP. Outer coins = combinations (order doesn\',
            ',
            ',
            ',
            '
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":6,"denoms":[1,5]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the combinations vs permutations why loop order matters criteria.'
            },
            {
                input: {"n":10,"denoms":[1,5,10,25]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the combinations vs permutations why loop order matters criteria.'
            },
            {
                input: {"n":0,"denoms":[1,2]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the combinations vs permutations why loop order matters criteria.'
            },
            // Edge case
            {
                input: {"n":0,"denoms":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def combinations_vs_permutations_why_loop_order_matters(n, denoms):
    """
    Combinations vs Permutations: Why Loop Order Matters

    The outer loop iterates over coins and the inner loop over amounts. What happens if you swap the loop order? Explain the difference and what each version counts.

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on denoms
        j = 0
        for k in range(i, n):
            if j < len(denoms) and n[k] == denoms[j]:
                j += 1
        if j == len(denoms):
            count += 1

    return count


# Test cases
print(combinations_vs_permutations_why_loop_order_matters(6, [1,5]))  # Expected: 1
print(combinations_vs_permutations_why_loop_order_matters(10, [1,5,10,25]))  # Expected: 2
print(combinations_vs_permutations_why_loop_order_matters(0, [1,2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CombinationsVsPermutationsWhyLoopOrderMatters solves the Combinations vs Permutations: Why Loop Order Matters problem.
// The outer loop iterates over coins and the inner loop over amounts. What happens if you swap the loop order? Explain the difference and what each version counts.
// Time: O(n^2), Space: O(n)
func CombinationsVsPermutationsWhyLoopOrderMatters(n int, denoms []int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CombinationsVsPermutationsWhyLoopOrderMatters(6, []int{1, 5})) // Expected: 1
	fmt.Println(CombinationsVsPermutationsWhyLoopOrderMatters(10, []int{1, 5, 10, 25})) // Expected: 2
	fmt.Println(CombinationsVsPermutationsWhyLoopOrderMatters(0, []int{1, 2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/twist-01-combinations-vs-permutations-why-loop-order-matters', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/twist-01-combinations-vs-permutations-why-loop-order-matters'] = problem;
})();
