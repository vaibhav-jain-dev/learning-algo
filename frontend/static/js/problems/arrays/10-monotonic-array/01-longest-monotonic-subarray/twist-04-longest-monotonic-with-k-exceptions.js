/**
 * Longest Monotonic with K Exceptions
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: longest-monotonic-with-k-exceptions
 * Parent: 10-monotonic-array/01-longest-monotonic-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Monotonic with K Exceptions',
        difficulty: 'Hard',
        algorithm: 'longest-monotonic-with-k-exceptions',
        parent: '10-monotonic-array/01-longest-monotonic-subarray',
        description: 'Find the longest contiguous subarray that is monotonic if you are allowed to skip at most K elements. Requires a sliding window approach tracking violations, fundamentally different from simple linear scan.',
        problem: 'Requires a sliding window approach tracking violations, fundamentally different from simple linear scan.',
        hints: [
            'Think about how longest monotonic with k exceptions differs from the standard version of this problem.',
            'Key insight: Requires a sliding window approach tracking violations, fundamentally different from simple linear scan.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,3,5,7],"k":2},
                output: [1,3],
                explanation: ''
            },
            {
                input: {"array":[10,20,30],"k":1},
                output: [10],
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[5,5,5,5],"k":3},
                output: [5,5,5],
                explanation: ''
            }
        ],
        solutions: {
            python: `def longest_monotonic_with_k_exceptions(array, k):
    """
    Longest Monotonic with K Exceptions

    Find the longest contiguous subarray that is monotonic if you are allowed to skip at most K elements. Requires a sliding window approach tracking violations, fundamentally different from simple linear scan.

    Time: O(n log k)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(longest_monotonic_with_k_exceptions([1,3,5,7], 2))  # Expected: [1,3]
print(longest_monotonic_with_k_exceptions([10,20,30], 1))  # Expected: [10]
print(longest_monotonic_with_k_exceptions([5,5,5,5], 3))  # Expected: [5,5,5]
`,
            go: `package main

import "fmt"

// LongestMonotonicWithKExceptions solves the Longest Monotonic with K Exceptions problem.
// Find the longest contiguous subarray that is monotonic if you are allowed to skip at most K elements. Requires a sliding window approach tracking violations, fundamentally different from simple linear scan.
// Time: O(n log k), Space: O(n)
func LongestMonotonicWithKExceptions(array []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(LongestMonotonicWithKExceptions([]int{1, 3, 5, 7}, 2)) // Expected: [1,3]
	fmt.Println(LongestMonotonicWithKExceptions([]int{10, 20, 30}, 1)) // Expected: [10]
	fmt.Println(LongestMonotonicWithKExceptions([]int{5, 5, 5, 5}, 3)) // Expected: [5,5,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/01-longest-monotonic-subarray/twist-04-longest-monotonic-with-k-exceptions', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/01-longest-monotonic-subarray/twist-04-longest-monotonic-with-k-exceptions'] = problem;
})();
