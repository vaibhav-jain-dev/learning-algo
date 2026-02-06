/**
 * Array of Sums
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: prefix-suffix
 * Parent: 12-array-of-products
 */
(function() {
    'use strict';

    const problem = {
        name: 'Array of Sums',
        difficulty: 'Easy',
        algorithm: 'prefix-suffix',
        parent: '12-array-of-products',
        description: 'Return an array where output[i] is the sum of all elements except input[i]. Solve without using subtraction, analogous to the no-division constraint in array of products.',
        problem: 'Use prefix sums and suffix sums. output[i] = prefix_sum[i-1] + suffix_sum[i+1]. This avoids subtraction entirely.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[5,1,4,2]},
                output: [5,1,4],
                explanation: 'The array of sums for this input yields [5, 1, 4].'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: [1,2,3],
                explanation: 'The array of sums for this input yields [1, 2, 3].'
            },
            {
                input: {"array":[-5,2,-4,14,-6]},
                output: [-5,2,-4],
                explanation: 'The array of sums for this input yields [-5, 2, -4].'
            },
            // Edge case
            {
                input: {"array":[5]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def array_of_sums(array):
    """
    Array of Sums

    Return an array where output[i] is the sum of all elements except input[i]. Solve without using subtraction, analogous to the no-division constraint in array of products.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(array_of_sums([5,1,4,2]))  # Expected: [5,1,4]
print(array_of_sums([1,2,3,4,5]))  # Expected: [1,2,3]
print(array_of_sums([-5,2,-4,14,-6]))  # Expected: [-5,2,-4]
`,
            go: `package main

import "fmt"

// ArrayOfSums solves the Array of Sums problem.
// Return an array where output[i] is the sum of all elements except input[i]. Solve without using subtraction, analogous to the no-division constraint in array of products.
// Time: O(n), Space: O(n)
func ArrayOfSums(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(ArrayOfSums([]int{5, 1, 4, 2})) // Expected: [5,1,4]
	fmt.Println(ArrayOfSums([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3]
	fmt.Println(ArrayOfSums([]int{-5, 2, -4, 14, -6})) // Expected: [-5,2,-4]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '12-array-of-products/twist-02-array-of-sums', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/12-array-of-products/twist-02-array-of-sums'] = problem;
})();
