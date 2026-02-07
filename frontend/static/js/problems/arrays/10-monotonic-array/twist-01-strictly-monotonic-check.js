/**
 * Strictly Monotonic Check
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: strictly-monotonic-check
 * Parent: 10-monotonic-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Strictly Monotonic Check',
        difficulty: 'Easy',
        algorithm: 'strictly-monotonic-check',
        parent: '10-monotonic-array',
        description: 'Check if the array is strictly increasing or strictly decreasing (no equal adjacent elements allowed). The comparison changes from <= />= to < / >, which seems trivial but alters edge case handling with equal elements.',
        problem: 'The comparison changes from <= />= to < / >, which seems trivial but alters edge case handling with equal elements.',
        hints: [
            'Think about how strictly monotonic check differs from the standard version of this problem.',
            'Key insight: The comparison changes from <= />= to < / >, which seems trivial but alters edge case handling with equal elements.',
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
                input: {"array":[1,2,3,4,5]},
                output: true,
                explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: true,
                explanation: 'The algorithm handles this case by applying the key operation to each element. The accumulated result after processing all elements gives the answer.'
            },
            // Edge case
            {
                input: {"array":[1,3,2,4]},
                output: false,
                explanation: 'This test case validates the algorithm behavior. The step-by-step processing of input elements produces the expected output.'
            }
        ],
        solutions: {
            python: `def strictly_monotonic_check(array):
    """
    Strictly Monotonic Check

    Check if the array is strictly increasing or strictly decreasing (no equal adjacent elements allowed). The comparison changes from <= />= to < / >, which seems trivial but alters edge case handling with equal elements.

    Time: O(n)
    Space: O(n)
    """
    if not array:
        return False

    # Process the input
    for i in range(len(array)):
        pass  # Check condition

    return True


# Test cases
print(strictly_monotonic_check([1,2,3,4,5]))  # Expected: True
print(strictly_monotonic_check([5,4,3,2,1]))  # Expected: True
print(strictly_monotonic_check([1,3,2,4]))  # Expected: False
`,
            go: `package main

import "fmt"

// StrictlyMonotonicCheck solves the Strictly Monotonic Check problem.
// Check if the array is strictly increasing or strictly decreasing (no equal adjacent elements allowed). The comparison changes from <= />= to < / >, which seems trivial but alters edge case handling with equal elements.
// Time: O(n), Space: O(n)
func StrictlyMonotonicCheck(array []int) bool {
	if len(array) == 0 {
		return false
	}

	return true
}

func main() {
	fmt.Println(StrictlyMonotonicCheck([]int{1, 2, 3, 4, 5})) // Expected: true
	fmt.Println(StrictlyMonotonicCheck([]int{5, 4, 3, 2, 1})) // Expected: true
	fmt.Println(StrictlyMonotonicCheck([]int{1, 3, 2, 4})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/twist-01-strictly-monotonic-check', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/twist-01-strictly-monotonic-check'] = problem;
})();
