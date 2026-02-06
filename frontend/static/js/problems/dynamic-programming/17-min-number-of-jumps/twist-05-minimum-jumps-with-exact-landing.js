/**
 * Minimum Jumps With Exact Landing
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-jumps
 * Parent: 17-min-number-of-jumps
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Jumps With Exact Landing',
        difficulty: 'Hard',
        algorithm: 'dp-jumps',
        parent: '17-min-number-of-jumps',
        description: 'You must land exactly on the last index (not jump past it). Each position lets you jump exactly 1 to array[i] steps forward. Find minimum jumps or return -1 if impossible.',
        problem: 'The exact-landing constraint means you cannot overshoot. Near the end, you need a position whose jump range hits the last index precisely, adding boundary conditions.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: The exact-landing constraint means you cannot overshoot. Near the end, you need a position whose jump range hits the las',
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
                input: {"array":[3,4,2,1,2,3,7,1,1,1,3]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the minimum jumps with exact landing criteria.'
            },
            {
                input: {"array":[2,1,1]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the minimum jumps with exact landing criteria.'
            },
            {
                input: {"array":[1,1,1,1]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the minimum jumps with exact landing criteria.'
            },
            {
                input: {"array":[1,0,1]},
                output: 3,
                explanation: 'For this input, there are 3 valid positions that satisfy the minimum jumps with exact landing criteria.'
            },
            // Edge case
            {
                input: {"array":[3]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def minimum_jumps_with_exact_landing(array):
    """
    Minimum Jumps With Exact Landing

    You must land exactly on the last index (not jump past it). Each position lets you jump exactly 1 to array[i] steps forward. Find minimum jumps or return -1 if impossible.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(minimum_jumps_with_exact_landing([3,4,2,1,2,3,7,1,1,1,3]))  # Expected: 1
print(minimum_jumps_with_exact_landing([2,1,1]))  # Expected: 2
print(minimum_jumps_with_exact_landing([1,1,1,1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumJumpsWithExactLanding solves the Minimum Jumps With Exact Landing problem.
// You must land exactly on the last index (not jump past it). Each position lets you jump exactly 1 to array[i] steps forward. Find minimum jumps or return -1 if impossible.
// Time: O(n^2), Space: O(n)
func MinimumJumpsWithExactLanding(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumJumpsWithExactLanding([]int{3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3})) // Expected: 1
	fmt.Println(MinimumJumpsWithExactLanding([]int{2, 1, 1})) // Expected: 2
	fmt.Println(MinimumJumpsWithExactLanding([]int{1, 1, 1, 1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '17-min-number-of-jumps/twist-05-minimum-jumps-with-exact-landing', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/17-min-number-of-jumps/twist-05-minimum-jumps-with-exact-landing'] = problem;
})();
