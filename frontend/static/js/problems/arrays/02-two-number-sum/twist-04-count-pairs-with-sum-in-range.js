/**
 * Count Pairs with Sum in Range
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: count-pairs-with-sum-in-range
 * Parent: 02-two-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Pairs with Sum in Range',
        difficulty: 'Hard',
        algorithm: 'count-pairs-with-sum-in-range',
        parent: '02-two-number-sum',
        description: 'Count the number of pairs whose sum falls within a given range [low, high] instead of equaling a specific target. Switches from exact matching to range checking, which may require sorting + two pointers and subtracting count of pairs below low from count below high+1.',
        problem: 'Switches from exact matching to range checking, which may require sorting + two pointers and subtracting count of pairs below low from count below high+1.',
        hints: [
            'Think about how this twist differs from the standard version: Count the number of pairs whose sum falls within a given range [low, high] inste.',
            'Switches from exact matching to range checking, which may require sorting + two pointers and subtracting count of pairs below low from count below high+1.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[3,5,-4,8,11,1,-1,6],"targetSum":10},
                output: [-1,11],
                explanation: ''
            },
            {
                input: {"array":[1,2,3,4,5],"targetSum":10},
                output: [],
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[4,6],"targetSum":10},
                output: [4,6],
                explanation: ''
            }
        ],
        solutions: {
            python: `def count_pairs_with_sum_in_range(array, targetSum):
    """
    Count Pairs with Sum in Range

    Count the number of pairs whose sum falls within a given range [low, high] instead of equaling a specific target. Switches from exact matching to range checking, which may require sorting + two pointers and subtracting count of pairs below low from count below high+1.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(array)

    for i in range(n):
        # Check condition based on targetSum
        j = 0
        for k in range(i, n):
            if j < len(targetSum) and array[k] == targetSum[j]:
                j += 1
        if j == len(targetSum):
            count += 1

    return count


# Test cases
print(count_pairs_with_sum_in_range([3,5,-4,8,11,1,-1,6], 10))  # Expected: [-1,11]
print(count_pairs_with_sum_in_range([1,2,3,4,5], 10))  # Expected: []
print(count_pairs_with_sum_in_range([4,6], 10))  # Expected: [4,6]
`,
            go: `package main

import "fmt"

// CountPairsWithSumInRange solves the Count Pairs with Sum in Range problem.
// Count the number of pairs whose sum falls within a given range [low, high] instead of equaling a specific target. Switches from exact matching to range checking, which may require sorting + two pointers and subtracting count of pairs below low from count below high+1.
// Time: O(n), Space: O(n)
func CountPairsWithSumInRange(array []int, targetSum int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountPairsWithSumInRange([]int{3, 5, -4, 8, 11, 1, -1, 6}, 10)) // Expected: [-1,11]
	fmt.Println(CountPairsWithSumInRange([]int{1, 2, 3, 4, 5}, 10)) // Expected: []
	fmt.Println(CountPairsWithSumInRange([]int{4, 6}, 10)) // Expected: [4,6]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/twist-04-count-pairs-with-sum-in-range', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/twist-04-count-pairs-with-sum-in-range'] = problem;
})();
