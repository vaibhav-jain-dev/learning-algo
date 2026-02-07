/**
 * Two Sum in a Circular Array
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-sum-in-a-circular-array
 * Parent: 02-two-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum in a Circular Array',
        difficulty: 'Medium',
        algorithm: 'two-sum-in-a-circular-array',
        parent: '02-two-number-sum',
        description: 'The array is circular, and you can only use elements that are within a window of size k in the circular arrangement. Introduces a spatial constraint on which pairs are valid, combining sliding window with two-sum logic.',
        problem: 'Introduces a spatial constraint on which pairs are valid, combining sliding window with two-sum logic.',
        hints: [
            'What makes this variant different from the standard problem? Identify the key constraint that changes the approach.',
            'Introduces a spatial constraint on which pairs are valid, combining sliding window with two-sum logic.',
            'For circular structures, consider concatenating the data with itself or using modular arithmetic.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[3,5,-4,8,11,1,-1,6],"targetSum":10},
                output: [-1,11],
                explanation: 'For each element, compute what complement is needed and check the hash table in O(1). If found, we have our answer. Otherwise, store the current element for future lookups.'
            },
            {
                input: {"array":[1,2,3,4,5],"targetSum":10},
                output: [],
                explanation: 'The hash table stores previously seen values, enabling instant lookups. A single pass through the array is sufficient to find the required pair/match.'
            },
            // Edge case
            {
                input: {"array":[4,6],"targetSum":10},
                output: [4,6],
                explanation: 'The space-time tradeoff is key: O(n) extra space for the hash table buys us O(1) per lookup, reducing overall time from O(n^2) to O(n).'
            }
        ],
        solutions: {
            python: `def two_sum_in_a_circular_array(array, targetSum, window_size):
    """
    Two Sum in a Circular Array

    The array is circular, and you can only use elements that are within a window of size k in the circular arrangement. Introduces a spatial constraint on which pairs are valid, combining sliding window with two-sum logic.

    Time: O(n log k)
    Space: O(n)
    """
    n = len(array)
    m = len(targetSum)
    doubled = array + array
    j = 0

    for i in range(min(2 * n, 2 * n)):
        if j < m and doubled[i] == targetSum[j]:
            j += 1
        if j == m:
            return True

    return False


# Test cases
print(two_sum_in_a_circular_array([3,5,-4,8,11,1,-1,6], 10, None))  # Expected: [-1,11]
print(two_sum_in_a_circular_array([1,2,3,4,5], 10, None))  # Expected: []
print(two_sum_in_a_circular_array([4,6], 10, None))  # Expected: [4,6]
`,
            go: `package main

import "fmt"

// TwoSumInACircularArray solves the Two Sum in a Circular Array problem.
// The array is circular, and you can only use elements that are within a window of size k in the circular arrangement. Introduces a spatial constraint on which pairs are valid, combining sliding window with two-sum logic.
// Time: O(n log k), Space: O(n)
func TwoSumInACircularArray(array []int, targetSum int, windowSize int) [][]int {
	n := len(array)
	m := len(targetSum)
	j := 0

	for i := 0; i < 2*n && j < m; i++ {
		if array[i%n] == targetSum[j] {
			j++
		}
	}

	return j == m
}

func main() {
	fmt.Println(TwoSumInACircularArray([]int{3, 5, -4, 8, 11, 1, -1, 6}, 10, 3)) // Expected: [-1,11]
	fmt.Println(TwoSumInACircularArray([]int{1, 2, 3, 4, 5}, 10, 3)) // Expected: []
	fmt.Println(TwoSumInACircularArray([]int{4, 6}, 10, 3)) // Expected: [4,6]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/twist-03-two-sum-in-a-circular-array', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/twist-03-two-sum-in-a-circular-array'] = problem;
})();
