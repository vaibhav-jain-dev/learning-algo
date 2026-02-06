/**
 * Three Sums Within Epsilon of Target
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: three-sums-within-epsilon-of-target
 * Parent: 02-two-number-sum/01-three-sum-closest
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sums Within Epsilon of Target',
        difficulty: 'Medium',
        algorithm: 'three-sums-within-epsilon-of-target',
        parent: '02-two-number-sum/01-three-sum-closest',
        description: 'Return all unique triplets whose sum is within epsilon distance of the target. Changes from finding one optimal answer to collecting all answers within a range, requiring careful enumeration without early termination.',
        problem: 'Changes from finding one optimal answer to collecting all answers within a range, requiring careful enumeration without early termination.',
        hints: [
            'Think about how this twist differs from the standard version: Return all unique triplets whose sum is within epsilon distance of the target..',
            'Changes from finding one optimal answer to collecting all answers within a range, requiring careful enumeration without early termination.',
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
                input: {"nums":[-1,2,1,-4],"target":1},
                output: 2,
                explanation: ''
            },
            {
                input: {"nums":[0,0,0],"target":1},
                output: 0,
                explanation: ''
            },
            // Edge case
            {
                input: {"nums":[1,2,3,4,5],"target":10},
                output: 10,
                explanation: ''
            }
        ],
        solutions: {
            python: `def three_sums_within_epsilon_of_target(nums, target):
    """
    Three Sums Within Epsilon of Target

    Return all unique triplets whose sum is within epsilon distance of the target. Changes from finding one optimal answer to collecting all answers within a range, requiring careful enumeration without early termination.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(nums)

    for i in range(n):
        # Check condition based on target
        j = 0
        for k in range(i, n):
            if j < len(target) and nums[k] == target[j]:
                j += 1
        if j == len(target):
            count += 1

    return count


# Test cases
print(three_sums_within_epsilon_of_target([-1,2,1,-4], 1))  # Expected: 2
print(three_sums_within_epsilon_of_target([0,0,0], 1))  # Expected: 0
print(three_sums_within_epsilon_of_target([1,2,3,4,5], 10))  # Expected: 10
`,
            go: `package main

import "fmt"

// ThreeSumsWithinEpsilonOfTarget solves the Three Sums Within Epsilon of Target problem.
// Return all unique triplets whose sum is within epsilon distance of the target. Changes from finding one optimal answer to collecting all answers within a range, requiring careful enumeration without early termination.
// Time: O(n), Space: O(n)
func ThreeSumsWithinEpsilonOfTarget(nums []int, target int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ThreeSumsWithinEpsilonOfTarget([]int{-1, 2, 1, -4}, 1)) // Expected: 2
	fmt.Println(ThreeSumsWithinEpsilonOfTarget([]int{0, 0, 0}, 1)) // Expected: 0
	fmt.Println(ThreeSumsWithinEpsilonOfTarget([]int{1, 2, 3, 4, 5}, 10)) // Expected: 10
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/01-three-sum-closest/twist-04-three-sums-within-epsilon-of-target', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/01-three-sum-closest/twist-04-three-sums-within-epsilon-of-target'] = problem;
})();
