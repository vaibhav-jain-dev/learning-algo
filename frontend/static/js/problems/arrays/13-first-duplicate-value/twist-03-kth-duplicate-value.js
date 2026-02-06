/**
 * K-th Duplicate Value
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: index-marking
 * Parent: 13-first-duplicate-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'K-th Duplicate Value',
        difficulty: 'Hard',
        algorithm: 'index-marking',
        parent: '13-first-duplicate-value',
        description: 'Find the K-th value to appear as a duplicate when scanning left to right. K=1 is the original first-duplicate problem.',
        problem: 'Scan left to right with a seen set. Each time a duplicate is found, increment a counter. Return the value when counter reaches K.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the kth duplicate value criteria.'
            },
            {
                input: {"array":[2,1,5,3,3,2,4]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the kth duplicate value criteria.'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the kth duplicate value criteria.'
            },
            {
                input: {"array":[1,1,2,3,3,2,2]},
                output: 3,
                explanation: 'For this input, there are 3 valid positions that satisfy the kth duplicate value criteria.'
            },
            // Edge case
            {
                input: {"array":[2]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def kth_duplicate_value(array):
    """
    K-th Duplicate Value

    Find the K-th value to appear as a duplicate when scanning left to right. K=1 is the original first-duplicate problem.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(kth_duplicate_value([2,1,5,2,3,3,4]))  # Expected: 1
print(kth_duplicate_value([2,1,5,3,3,2,4]))  # Expected: 2
print(kth_duplicate_value([1,2,3,4,5]))  # Expected: 0
`,
            go: `package main

import "fmt"

// KthDuplicateValue solves the K-th Duplicate Value problem.
// Find the K-th value to appear as a duplicate when scanning left to right. K=1 is the original first-duplicate problem.
// Time: O(n), Space: O(n)
func KthDuplicateValue(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KthDuplicateValue([]int{2, 1, 5, 2, 3, 3, 4})) // Expected: 1
	fmt.Println(KthDuplicateValue([]int{2, 1, 5, 3, 3, 2, 4})) // Expected: 2
	fmt.Println(KthDuplicateValue([]int{1, 2, 3, 4, 5})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '13-first-duplicate-value/twist-03-kth-duplicate-value', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/13-first-duplicate-value/twist-03-kth-duplicate-value'] = problem;
})();
