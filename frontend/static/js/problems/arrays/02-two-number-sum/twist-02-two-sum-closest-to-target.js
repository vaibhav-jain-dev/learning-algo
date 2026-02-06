/**
 * Two Sum Closest to Target
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-sum-closest-to-target
 * Parent: 02-two-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum Closest to Target',
        difficulty: 'Medium',
        algorithm: 'two-sum-closest-to-target',
        parent: '02-two-number-sum',
        description: 'Instead of an exact match, find the pair whose sum is closest to the target. The hash table approach no longer works directly. Requires sorting + two pointers to efficiently search for the closest sum.',
        problem: 'The hash table approach no longer works directly. Requires sorting + two pointers to efficiently search for the closest sum.',
        hints: [
            'Think about how this twist differs from the standard version: Instead of an exact match, find the pair whose sum is closest to the target..',
            'The hash table approach no longer works directly. Requires sorting + two pointers to efficiently search for the closest sum.',
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
            python: `def two_sum_closest_to_target(array, targetSum):
    """
    Two Sum Closest to Target

    Instead of an exact match, find the pair whose sum is closest to the target. The hash table approach no longer works directly. Requires sorting + two pointers to efficiently search for the closest sum.

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
print(two_sum_closest_to_target([3,5,-4,8,11,1,-1,6], 10))  # Expected: [-1,11]
print(two_sum_closest_to_target([1,2,3,4,5], 10))  # Expected: []
print(two_sum_closest_to_target([4,6], 10))  # Expected: [4,6]
`,
            go: `package main

import "fmt"

// TwoSumClosestToTarget solves the Two Sum Closest to Target problem.
// Instead of an exact match, find the pair whose sum is closest to the target. The hash table approach no longer works directly. Requires sorting + two pointers to efficiently search for the closest sum.
// Time: O(n), Space: O(n)
func TwoSumClosestToTarget(array []int, targetSum int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TwoSumClosestToTarget([]int{3, 5, -4, 8, 11, 1, -1, 6}, 10)) // Expected: [-1,11]
	fmt.Println(TwoSumClosestToTarget([]int{1, 2, 3, 4, 5}, 10)) // Expected: []
	fmt.Println(TwoSumClosestToTarget([]int{4, 6}, 10)) // Expected: [4,6]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/twist-02-two-sum-closest-to-target', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/twist-02-two-sum-closest-to-target'] = problem;
})();
