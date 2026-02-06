/**
 * Counting vs Optimization Duality
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 * Parent: 03-min-coins
 */
(function() {
    'use strict';

    const problem = {
        name: 'Counting vs Optimization Duality',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '03-min-coins',
        description: 'Compare Min Coins (minimize count) with Number of Ways to Make Change (count combinations). Both use the same state space but different operations. Write both recurrences side by side.',
        problem: 'Seeing the structural similarity deepens understanding of DP as a framework. Same subproblems, same transitions, but += for counting vs min() for optimization.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Seeing the structural similarity deepens understanding of DP as a framework. Same subproblems, same transitions, but += ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":7,"denoms":[1,5,10]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the counting vs optimization duality criteria.'
            },
            {
                input: {"n":6,"denoms":[1,2,4]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the counting vs optimization duality criteria.'
            },
            {
                input: {"n":3,"denoms":[2]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the counting vs optimization duality criteria.'
            },
            // Edge case
            {
                input: {"n":0,"denoms":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def counting_vs_optimization_duality(n, denoms):
    """
    Counting vs Optimization Duality

    Compare Min Coins (minimize count) with Number of Ways to Make Change (count combinations). Both use the same state space but different operations. Write both recurrences side by side.

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
print(counting_vs_optimization_duality(7, [1,5,10]))  # Expected: 1
print(counting_vs_optimization_duality(6, [1,2,4]))  # Expected: 2
print(counting_vs_optimization_duality(3, [2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountingVsOptimizationDuality solves the Counting vs Optimization Duality problem.
// Compare Min Coins (minimize count) with Number of Ways to Make Change (count combinations). Both use the same state space but different operations. Write both recurrences side by side.
// Time: O(n^2), Space: O(n)
func CountingVsOptimizationDuality(n int, denoms []int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountingVsOptimizationDuality(7, []int{1, 5, 10})) // Expected: 1
	fmt.Println(CountingVsOptimizationDuality(6, []int{1, 2, 4})) // Expected: 2
	fmt.Println(CountingVsOptimizationDuality(3, []int{2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins/twist-06-counting-vs-optimization-duality', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins/twist-06-counting-vs-optimization-duality'] = problem;
})();
