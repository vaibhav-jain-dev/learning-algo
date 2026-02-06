/**
 * Three Sum Without Sorting
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: three-sum-without-sorting
 * Parent: 07-three-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum Without Sorting',
        difficulty: 'Hard',
        algorithm: 'three-sum-without-sorting',
        parent: '07-three-number-sum',
        description: 'Find all triplets summing to target but you are not allowed to sort the array. Use a hash-based approach instead. Removes the two-pointer technique entirely, forcing a hash map approach with careful deduplication.',
        problem: 'Removes the two-pointer technique entirely, forcing a hash map approach with careful deduplication.',
        hints: [
            'Think about how three sum without sorting differs from the standard version of this problem.',
            'Key insight: Removes the two-pointer technique entirely, forcing a hash map approach with careful deduplication.',
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
            python: `def three_sum_without_sorting(array, targetSum):
    """
    Three Sum Without Sorting

    Find all triplets summing to target but you are not allowed to sort the array. Use a hash-based approach instead. Removes the two-pointer technique entirely, forcing a hash map approach with careful deduplication.

    Time: O(n log n)
    Space: O(n)
    """
    result = []
    n = len(array)

    for i in range(n):
        for j in range(i + 1, n):
            result.append([array[i], array[j]])

    return result


# Test cases
print(three_sum_without_sorting([-3,-1,0,2,4], None))  # Expected: [0,1,4,9,16]
print(three_sum_without_sorting([1,2,3], None))  # Expected: [1,4,9]
print(three_sum_without_sorting([-5,-3,-1], None))  # Expected: [1,9,25]
`,
            go: `package main

import "fmt"

// ThreeSumWithoutSorting solves the Three Sum Without Sorting problem.
// Find all triplets summing to target but you are not allowed to sort the array. Use a hash-based approach instead. Removes the two-pointer technique entirely, forcing a hash map approach with careful deduplication.
// Time: O(n log n), Space: O(n)
func ThreeSumWithoutSorting(array []int, targetSum int) [][]int {
	result := make([][]int, 0)

	for i := 0; i < len(array); i++ {
		for j := i + 1; j < len(array); j++ {
			result = append(result, []int{array[i], array[j]})
		}
	}

	return result
}

func main() {
	fmt.Println(ThreeSumWithoutSorting([]int{-3, -1, 0, 2, 4}, nil)) // Expected: [0,1,4,9,16]
	fmt.Println(ThreeSumWithoutSorting([]int{1, 2, 3}, nil)) // Expected: [1,4,9]
	fmt.Println(ThreeSumWithoutSorting([]int{-5, -3, -1}, nil)) // Expected: [1,9,25]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/twist-03-three-sum-without-sorting', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/twist-03-three-sum-without-sorting'] = problem;
})();
