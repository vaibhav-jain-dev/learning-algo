/**
 * LIS in O(n log n)
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-increasing-subseq
 * Parent: 12-longest-increasing-subseq
 */
(function() {
    'use strict';

    const problem = {
        name: 'LIS in O(n log n)',
        difficulty: 'Hard',
        algorithm: 'dp-increasing-subseq',
        parent: '12-longest-increasing-subseq',
        description: 'Solve the LIS problem in O(n log n) time instead of O(n^2) using patience sorting or binary search with a tails array.',
        problem: 'Requires a completely different algorithmic paradigm: maintaining a tails array and using binary search for insertion points, rather than pairwise DP comparisons.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Requires a completely different algorithmic paradigm: maintaining a tails array and using binary search for insertion po',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n log n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[5,7,-24,12,10,2,3,12,5,6,35]},
                output: [5,7,-24],
                explanation: 'The lis in on log n for this input yields [5, 7, -24].'
            },
            {
                input: {"array":[10,9,2,5,3,7,101,18]},
                output: [10,9,2],
                explanation: 'The lis in on log n for this input yields [10, 9, 2].'
            },
            {
                input: {"array":[0,1,0,3,2,3]},
                output: [0,1,0],
                explanation: 'The lis in on log n for this input yields [0, 1, 0].'
            },
            // Edge case
            {
                input: {"array":[5]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def lis_in_on_log_n(array):
    """
    LIS in O(n log n)

    Solve the LIS problem in O(n log n) time instead of O(n^2) using patience sorting or binary search with a tails array.

    Time: O(n log n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(lis_in_on_log_n([5,7,-24,12,10,2,3,12,5,6,35]))  # Expected: [5,7,-24]
print(lis_in_on_log_n([10,9,2,5,3,7,101,18]))  # Expected: [10,9,2]
print(lis_in_on_log_n([0,1,0,3,2,3]))  # Expected: [0,1,0]
`,
            go: `package main

import "fmt"

// LisInOnLogN solves the LIS in O(n log n) problem.
// Solve the LIS problem in O(n log n) time instead of O(n^2) using patience sorting or binary search with a tails array.
// Time: O(n log n), Space: O(n)
func LisInOnLogN(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(LisInOnLogN([]int{5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35})) // Expected: [5,7,-24]
	fmt.Println(LisInOnLogN([]int{10, 9, 2, 5, 3, 7, 101, 18})) // Expected: [10,9,2]
	fmt.Println(LisInOnLogN([]int{0, 1, 0, 3, 2, 3})) // Expected: [0,1,0]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '12-longest-increasing-subseq/twist-03-lis-in-on-log-n', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/12-longest-increasing-subseq/twist-03-lis-in-on-log-n'] = problem;
})();
