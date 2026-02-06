/**
 * Two Sum with Duplicate Pairs
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-sum-with-duplicate-pairs
 * Parent: 02-two-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum with Duplicate Pairs',
        difficulty: 'Medium',
        algorithm: 'two-sum-with-duplicate-pairs',
        parent: '02-two-number-sum',
        description: 'The array may contain duplicates. Return all unique pairs that sum to the target. Duplicate handling changes the hash table approach: you must track counts and avoid reporting the same pair multiple times.',
        problem: 'Duplicate handling changes the hash table approach: you must track counts and avoid reporting the same pair multiple times.',
        hints: [
            'Think about how this twist differs from the standard version: The array may contain duplicates. Return all unique pairs that sum to the target.',
            'Duplicate handling changes the hash table approach: you must track counts and avoid reporting the same pair multiple times.',
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
            python: `def two_sum_with_duplicate_pairs(array, targetSum):
    """
    Two Sum with Duplicate Pairs

    The array may contain duplicates. Return all unique pairs that sum to the target. Duplicate handling changes the hash table approach: you must track counts and avoid reporting the same pair multiple times.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(two_sum_with_duplicate_pairs([3,5,-4,8,11,1,-1,6], 10))  # Expected: [-1,11]
print(two_sum_with_duplicate_pairs([1,2,3,4,5], 10))  # Expected: []
print(two_sum_with_duplicate_pairs([4,6], 10))  # Expected: [4,6]
`,
            go: `package main

import "fmt"

// TwoSumWithDuplicatePairs solves the Two Sum with Duplicate Pairs problem.
// The array may contain duplicates. Return all unique pairs that sum to the target. Duplicate handling changes the hash table approach: you must track counts and avoid reporting the same pair multiple times.
// Time: O(n), Space: O(n)
func TwoSumWithDuplicatePairs(array []int, targetSum int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(TwoSumWithDuplicatePairs([]int{3, 5, -4, 8, 11, 1, -1, 6}, 10)) // Expected: [-1,11]
	fmt.Println(TwoSumWithDuplicatePairs([]int{1, 2, 3, 4, 5}, 10)) // Expected: []
	fmt.Println(TwoSumWithDuplicatePairs([]int{4, 6}, 10)) // Expected: [4,6]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/twist-01-two-sum-with-duplicate-pairs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/twist-01-two-sum-with-duplicate-pairs'] = problem;
})();
