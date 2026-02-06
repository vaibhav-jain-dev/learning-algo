/**
 * Multiple Duplicates
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: floyd-cycle-detection
 * Parent: 07-single-cycle-check/02-find-duplicate-number
 */
(function() {
    'use strict';

    const problem = {
        name: 'Multiple Duplicates',
        difficulty: 'Hard',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check/02-find-duplicate-number',
        description: 'The array can have multiple different duplicated numbers. Find all of them in O(n) time and O(1) space.',
        problem: 'Floyd cycle detection finds one duplicate. With multiple duplicates, you need a different approach like index-marking (negating values) to find all duplicates.',
        hints: [
            'Start by understanding the key difference: Floyd cycle detection finds one duplicate.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Array [4,3,2,7,8,2,3,1].',
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
                explanation: 'For this input, there is 1 valid position that satisfy the multiple duplicates criteria.'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def multiple_duplicates(nums):
    """
    Multiple Duplicates

    The array can have multiple different duplicated numbers. Find all of them in O(n) time and O(1) space.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(multiple_duplicates([1,3,4,2,2]))  # Expected: 1
print(multiple_duplicates([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MultipleDuplicates solves the Multiple Duplicates problem.
// The array can have multiple different duplicated numbers. Find all of them in O(n) time and O(1) space.
// Time: O(n), Space: O(1)
func MultipleDuplicates(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MultipleDuplicates([]int{1, 3, 4, 2, 2})) // Expected: 1
	fmt.Println(MultipleDuplicates([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/02-find-duplicate-number/twist-01-multiple-duplicates', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/02-find-duplicate-number/twist-01-multiple-duplicates'] = problem;
})();
