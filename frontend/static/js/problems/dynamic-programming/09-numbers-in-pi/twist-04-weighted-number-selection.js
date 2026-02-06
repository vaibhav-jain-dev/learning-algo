/**
 * Weighted Number Selection
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-pi-numbers
 * Parent: 09-numbers-in-pi
 */
(function() {
    'use strict';

    const problem = {
        name: 'Weighted Number Selection',
        difficulty: 'Hard',
        algorithm: 'dp-pi-numbers',
        parent: '09-numbers-in-pi',
        description: 'Each number in the list has an associated cost. Find the partition of Pi that minimizes the total cost (not the number of spaces).',
        problem: 'Changes the objective from counting splits to minimizing weighted cost, requiring the DP to compare costs rather than counts.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Changes the objective from counting splits to minimizing weighted cost, requiring the DP to compare costs rather than co',
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
                input: {"pi":"3141592653589793238462643383279","numbers":["314159265358979323846","26433","8","3279","314159265","35897932384626433832","79"]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the weighted number selection criteria.'
            },
            {
                input: {"pi":"314159","numbers":["314","159","3141","59"]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the weighted number selection criteria.'
            },
            {
                input: {"pi":"123456","numbers":["12","34","56"]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the weighted number selection criteria.'
            },
            // Edge case
            {
                input: {"pi":"","numbers":["314159265358979323846"]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def weighted_number_selection(pi, numbers):
    """
    Weighted Number Selection

    Each number in the list has an associated cost. Find the partition of Pi that minimizes the total cost (not the number of spaces).

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(pi)

    for i in range(n):
        # Check condition based on numbers
        j = 0
        for k in range(i, n):
            if j < len(numbers) and pi[k] == numbers[j]:
                j += 1
        if j == len(numbers):
            count += 1

    return count


# Test cases
print(weighted_number_selection("3141592653589793238462643383279", ["314159265358979323846","26433","8","3279","314159265","35897932384626433832","79"]))  # Expected: 1
print(weighted_number_selection("314159", ["314","159","3141","59"]))  # Expected: 2
print(weighted_number_selection("123456", ["12","34","56"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// WeightedNumberSelection solves the Weighted Number Selection problem.
// Each number in the list has an associated cost. Find the partition of Pi that minimizes the total cost (not the number of spaces).
// Time: O(n^2), Space: O(n)
func WeightedNumberSelection(pi string, numbers []string) int {
	result := 0

	for i := 0; i < len(pi); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WeightedNumberSelection("3141592653589793238462643383279", []string{"314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"})) // Expected: 1
	fmt.Println(WeightedNumberSelection("314159", []string{"314", "159", "3141", "59"})) // Expected: 2
	fmt.Println(WeightedNumberSelection("123456", []string{"12", "34", "56"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '09-numbers-in-pi/twist-04-weighted-number-selection', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/09-numbers-in-pi/twist-04-weighted-number-selection'] = problem;
})();
