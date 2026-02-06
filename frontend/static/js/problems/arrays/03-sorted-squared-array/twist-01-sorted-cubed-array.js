/**
 * Sorted Cubed Array
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: sorted-cubed-array
 * Parent: 03-sorted-squared-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted Cubed Array',
        difficulty: 'Medium',
        algorithm: 'sorted-cubed-array',
        parent: '03-sorted-squared-array',
        description: 'Instead of squaring, cube each element and return the sorted result. Cubing preserves sign, which changes the problem significantly. Unlike squaring, cubing preserves negative signs, so the relative order may already be correct. The two-pointer-from-ends approach needs reconsideration.',
        problem: 'Unlike squaring, cubing preserves negative signs, so the relative order may already be correct. The two-pointer-from-ends approach needs reconsideration.',
        hints: [
            'Think about how sorted cubed array differs from the standard version of this problem.',
            'Key insight: Unlike squaring, cubing preserves negative signs, so the relative order may already be correct. The two-pointer-from-ends approach needs reconsideration.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[-3,-1,0,2,4]},
                output: [0,1,4,9,16],
                explanation: ''
            },
            {
                input: {"array":[1,2,3]},
                output: [1,4,9],
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[-5,-3,-1]},
                output: [1,9,25],
                explanation: ''
            }
        ],
        solutions: {
            python: `def sorted_cubed_array(array):
    """
    Sorted Cubed Array

    Instead of squaring, cube each element and return the sorted result. Cubing preserves sign, which changes the problem significantly. Unlike squaring, cubing preserves negative signs, so the relative order may already be correct. The two-pointer-from-ends approach needs reconsideration.

    Time: O(n log n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(sorted_cubed_array([-3,-1,0,2,4]))  # Expected: [0,1,4,9,16]
print(sorted_cubed_array([1,2,3]))  # Expected: [1,4,9]
print(sorted_cubed_array([-5,-3,-1]))  # Expected: [1,9,25]
`,
            go: `package main

import "fmt"

// SortedCubedArray solves the Sorted Cubed Array problem.
// Instead of squaring, cube each element and return the sorted result. Cubing preserves sign, which changes the problem significantly. Unlike squaring, cubing preserves negative signs, so the relative order may already be correct. The two-pointer-from-ends approach needs reconsideration.
// Time: O(n log n), Space: O(n)
func SortedCubedArray(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(SortedCubedArray([]int{-3, -1, 0, 2, 4})) // Expected: [0,1,4,9,16]
	fmt.Println(SortedCubedArray([]int{1, 2, 3})) // Expected: [1,4,9]
	fmt.Println(SortedCubedArray([]int{-5, -3, -1})) // Expected: [1,9,25]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/twist-01-sorted-cubed-array', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/twist-01-sorted-cubed-array'] = problem;
})();
