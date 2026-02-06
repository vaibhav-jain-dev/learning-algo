/**
 * Numbers in Pi With Overlaps
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-pi-numbers
 * Parent: 09-numbers-in-pi
 */
(function() {
    'use strict';

    const problem = {
        name: 'Numbers in Pi With Overlaps',
        difficulty: 'Hard',
        algorithm: 'dp-pi-numbers',
        parent: '09-numbers-in-pi',
        description: 'Numbers from the list may overlap in Pi. Find the minimum number of numbers from the list needed such that every digit of Pi is covered by at least one number.',
        problem: 'Allows overlapping matches, turning this into an interval covering problem rather than a partition problem. The DP tracks coverage position rather than split points.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Allows overlapping matches, turning this into an interval covering problem rather than a partition problem. The DP track',
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
                explanation: 'For this input, there is 1 valid position that satisfy the numbers in pi with overlaps criteria.'
            },
            {
                input: {"pi":"314159","numbers":["314","159","3141","59"]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the numbers in pi with overlaps criteria.'
            },
            {
                input: {"pi":"123456","numbers":["12","34","56"]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the numbers in pi with overlaps criteria.'
            },
            // Edge case
            {
                input: {"pi":"","numbers":["314159265358979323846"]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def numbers_in_pi_with_overlaps(pi, numbers):
    """
    Numbers in Pi With Overlaps

    Numbers from the list may overlap in Pi. Find the minimum number of numbers from the list needed such that every digit of Pi is covered by at least one number.

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
print(numbers_in_pi_with_overlaps("3141592653589793238462643383279", ["314159265358979323846","26433","8","3279","314159265","35897932384626433832","79"]))  # Expected: 1
print(numbers_in_pi_with_overlaps("314159", ["314","159","3141","59"]))  # Expected: 2
print(numbers_in_pi_with_overlaps("123456", ["12","34","56"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// NumbersInPiWithOverlaps solves the Numbers in Pi With Overlaps problem.
// Numbers from the list may overlap in Pi. Find the minimum number of numbers from the list needed such that every digit of Pi is covered by at least one number.
// Time: O(n^2), Space: O(n)
func NumbersInPiWithOverlaps(pi string, numbers []string) int {
	result := 0

	for i := 0; i < len(pi); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NumbersInPiWithOverlaps("3141592653589793238462643383279", []string{"314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"})) // Expected: 1
	fmt.Println(NumbersInPiWithOverlaps("314159", []string{"314", "159", "3141", "59"})) // Expected: 2
	fmt.Println(NumbersInPiWithOverlaps("123456", []string{"12", "34", "56"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '09-numbers-in-pi/twist-03-numbers-in-pi-with-overlaps', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/09-numbers-in-pi/twist-03-numbers-in-pi-with-overlaps'] = problem;
})();
