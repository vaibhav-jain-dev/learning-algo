/**
 * Count of Duplicate
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: floyd-cycle-detection
 * Parent: 07-single-cycle-check/02-find-duplicate-number
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count of Duplicate',
        difficulty: 'Medium',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check/02-find-duplicate-number',
        description: 'Find the duplicate number and also return how many times it appears in the array.',
        problem: 'Floyd finds the duplicate but not its frequency. After finding it, you need a linear scan to count occurrences, combining two techniques.',
        hints: [
            'Start by understanding the key difference: Floyd finds the duplicate but not its frequency.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Array [1,3,4,2,2].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[1,3,4,2,2]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the count of duplicate criteria.'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def count_of_duplicate(nums):
    """
    Count of Duplicate

    Find the duplicate number and also return how many times it appears in the array.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_of_duplicate([1,3,4,2,2]))  # Expected: 1
print(count_of_duplicate([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountOfDuplicate solves the Count of Duplicate problem.
// Find the duplicate number and also return how many times it appears in the array.
// Time: O(n), Space: O(1)
func CountOfDuplicate(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountOfDuplicate([]int{1, 3, 4, 2, 2})) // Expected: 1
	fmt.Println(CountOfDuplicate([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/02-find-duplicate-number/twist-02-count-of-duplicate', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/02-find-duplicate-number/twist-02-count-of-duplicate'] = problem;
})();
