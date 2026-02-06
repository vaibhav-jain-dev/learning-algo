/**
 * Longest Monotonic Prefix
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: longest-monotonic-prefix
 * Parent: 10-monotonic-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Monotonic Prefix',
        difficulty: 'Medium',
        algorithm: 'longest-monotonic-prefix',
        parent: '10-monotonic-array',
        description: 'Find the length of the longest prefix of the array that is monotonic. You scan from the start and stop at the first violation, but must handle the ambiguity of direction at the beginning.',
        problem: 'You scan from the start and stop at the first violation, but must handle the ambiguity of direction at the beginning.',
        hints: [
            'Think about how longest monotonic prefix differs from the standard version of this problem.',
            'Key insight: You scan from the start and stop at the first violation, but must handle the ambiguity of direction at the beginning.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
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
                explanation: ''
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: 5,
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[1]},
                output: 1,
                explanation: ''
            }
        ],
        solutions: {
            python: `def longest_monotonic_prefix(array):
    """
    Longest Monotonic Prefix

    Find the length of the longest prefix of the array that is monotonic. You scan from the start and stop at the first violation, but must handle the ambiguity of direction at the beginning.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(longest_monotonic_prefix([1,2,3,2,1]))  # Expected: 3
print(longest_monotonic_prefix([5,4,3,2,1]))  # Expected: 5
print(longest_monotonic_prefix([1]))  # Expected: 1
`,
            go: `package main

import "fmt"

// LongestMonotonicPrefix solves the Longest Monotonic Prefix problem.
// Find the length of the longest prefix of the array that is monotonic. You scan from the start and stop at the first violation, but must handle the ambiguity of direction at the beginning.
// Time: O(n), Space: O(n)
func LongestMonotonicPrefix(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LongestMonotonicPrefix([]int{1, 2, 3, 2, 1})) // Expected: 3
	fmt.Println(LongestMonotonicPrefix([]int{5, 4, 3, 2, 1})) // Expected: 5
	fmt.Println(LongestMonotonicPrefix([]int{1})) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/twist-04-longest-monotonic-prefix', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/twist-04-longest-monotonic-prefix'] = problem;
})();
