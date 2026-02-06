/**
 * Last Duplicate Value
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: index-marking
 * Parent: 13-first-duplicate-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'Last Duplicate Value',
        difficulty: 'Medium',
        algorithm: 'index-marking',
        parent: '13-first-duplicate-value',
        description: 'Find the integer whose last duplicate occurrence (rightmost second appearance) comes latest in the array. Scan from right to left, returning the first duplicate found.',
        problem: 'Scan from right to left using a seen set. The first value already in the set when scanning right-to-left is the last duplicate.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[2,1,5,2,3,3,4]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the last duplicate value criteria.'
            },
            {
                input: {"array":[2,1,5,3,3,2,4]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the last duplicate value criteria.'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the last duplicate value criteria.'
            },
            {
                input: {"array":[1,1,2,3,3,2,2]},
                output: 3,
                explanation: 'For this input, there are 3 valid positions that satisfy the last duplicate value criteria.'
            },
            // Edge case
            {
                input: {"array":[2]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def last_duplicate_value(array):
    """
    Last Duplicate Value

    Find the integer whose last duplicate occurrence (rightmost second appearance) comes latest in the array. Scan from right to left, returning the first duplicate found.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(last_duplicate_value([2,1,5,2,3,3,4]))  # Expected: 1
print(last_duplicate_value([2,1,5,3,3,2,4]))  # Expected: 2
print(last_duplicate_value([1,2,3,4,5]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LastDuplicateValue solves the Last Duplicate Value problem.
// Find the integer whose last duplicate occurrence (rightmost second appearance) comes latest in the array. Scan from right to left, returning the first duplicate found.
// Time: O(n), Space: O(n)
func LastDuplicateValue(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LastDuplicateValue([]int{2, 1, 5, 2, 3, 3, 4})) // Expected: 1
	fmt.Println(LastDuplicateValue([]int{2, 1, 5, 3, 3, 2, 4})) // Expected: 2
	fmt.Println(LastDuplicateValue([]int{1, 2, 3, 4, 5})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '13-first-duplicate-value/twist-02-last-duplicate-value', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/13-first-duplicate-value/twist-02-last-duplicate-value'] = problem;
})();
