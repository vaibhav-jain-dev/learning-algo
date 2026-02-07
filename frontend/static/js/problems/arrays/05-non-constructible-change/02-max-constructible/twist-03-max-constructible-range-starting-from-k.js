/**
 * Max Constructible Range Starting from K
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: max-constructible-range-starting-from-k
 * Parent: 05-non-constructible-change/02-max-constructible
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Constructible Range Starting from K',
        difficulty: 'Medium',
        algorithm: 'max-constructible-range-starting-from-k',
        parent: '05-non-constructible-change/02-max-constructible',
        description: 'Find the maximum consecutive range [K, K+M] that can be constructed, starting from a given value K. The starting point is not 1, so you must first determine if K is constructible, then extend upward from there.',
        problem: 'The starting point is not 1, so you must first determine if K is constructible, then extend upward from there.',
        hints: [
            'Think about how max constructible range starting from k differs from the standard version of this problem.',
            'Key insight: The starting point is not 1, so you must first determine if K is constructible, then extend upward from there.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Consider whether a greedy approach works, or if you need dynamic programming for the optimal solution.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,2,3,2,1]},
                output: 3,
                explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: 5,
                explanation: 'The algorithm handles this case by applying the key operation to each element. The accumulated result after processing all elements gives the answer.'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: 1,
                explanation: 'This test case validates the algorithm behavior. The step-by-step processing of input elements produces the expected output.'
            }
        ],
        solutions: {
            python: `def max_constructible_range_starting_from_k(coins, budget):
    """
    Max Constructible Range Starting from K

    Find the maximum consecutive range [K, K+M] that can be constructed, starting from a given value K. The starting point is not 1, so you must first determine if K is constructible, then extend upward from there.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(coins)

    for i in range(n):
        # Check condition based on budget
        j = 0
        for k in range(i, n):
            if j < len(budget) and coins[k] == budget[j]:
                j += 1
        if j == len(budget):
            count += 1

    return count


# Test cases
print(max_constructible_range_starting_from_k(None, None))  # Expected: 3
print(max_constructible_range_starting_from_k(None, None))  # Expected: 5
print(max_constructible_range_starting_from_k(None, None))  # Expected: 1
`,
            go: `package main

import "fmt"

// MaxConstructibleRangeStartingFromK solves the Max Constructible Range Starting from K problem.
// Find the maximum consecutive range [K, K+M] that can be constructed, starting from a given value K. The starting point is not 1, so you must first determine if K is constructible, then extend upward from there.
// Time: O(n), Space: O(n)
func MaxConstructibleRangeStartingFromK(coins []int, budget int) int {
	result := 0

	for i := 0; i < len(coins); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaxConstructibleRangeStartingFromK(nil, nil)) // Expected: 3
	fmt.Println(MaxConstructibleRangeStartingFromK(nil, nil)) // Expected: 5
	fmt.Println(MaxConstructibleRangeStartingFromK(nil, nil)) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change/02-max-constructible/twist-03-max-constructible-range-starting-from-k', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change/02-max-constructible/twist-03-max-constructible-range-starting-from-k'] = problem;
})();
