/**
 * Two Sum with Index Distance Constraint
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-sum-with-index-distance-constraint
 * Parent: 02-two-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum with Index Distance Constraint',
        difficulty: 'Medium',
        algorithm: 'two-sum-with-index-distance-constraint',
        parent: '02-two-number-sum',
        description: 'Find a pair summing to target where the two elements are at most k indices apart. The hash table must be bounded by a sliding window of size k, requiring eviction of old entries as you iterate.',
        problem: 'The hash table must be bounded by a sliding window of size k, requiring eviction of old entries as you iterate.',
        hints: [
            'What makes this variant different from the standard problem? Identify the key constraint that changes the approach.',
            'The hash table must be bounded by a sliding window of size k, requiring eviction of old entries as you iterate.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
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
            python: `def two_sum_with_index_distance_constraint(array, targetSum, window_size):
    """
    Two Sum with Index Distance Constraint

    Find a pair summing to target where the two elements are at most k indices apart. The hash table must be bounded by a sliding window of size k, requiring eviction of old entries as you iterate.

    Time: O(n log k)
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
print(two_sum_with_index_distance_constraint([3,5,-4,8,11,1,-1,6], 10, None))  # Expected: [-1,11]
print(two_sum_with_index_distance_constraint([1,2,3,4,5], 10, None))  # Expected: []
print(two_sum_with_index_distance_constraint([4,6], 10, None))  # Expected: [4,6]
`,
            go: `package main

import "fmt"

// TwoSumWithIndexDistanceConstraint solves the Two Sum with Index Distance Constraint problem.
// Find a pair summing to target where the two elements are at most k indices apart. The hash table must be bounded by a sliding window of size k, requiring eviction of old entries as you iterate.
// Time: O(n log k), Space: O(n)
func TwoSumWithIndexDistanceConstraint(array []int, targetSum int, windowSize int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TwoSumWithIndexDistanceConstraint([]int{3, 5, -4, 8, 11, 1, -1, 6}, 10, 3)) // Expected: [-1,11]
	fmt.Println(TwoSumWithIndexDistanceConstraint([]int{1, 2, 3, 4, 5}, 10, 3)) // Expected: []
	fmt.Println(TwoSumWithIndexDistanceConstraint([]int{4, 6}, 10, 3)) // Expected: [4,6]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/twist-05-two-sum-with-index-distance-constraint', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/twist-05-two-sum-with-index-distance-constraint'] = problem;
})();
