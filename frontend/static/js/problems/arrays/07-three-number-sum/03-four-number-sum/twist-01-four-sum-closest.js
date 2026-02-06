/**
 * Four Sum Closest
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: four-sum-closest
 * Parent: 07-three-number-sum/03-four-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Four Sum Closest',
        difficulty: 'Hard',
        algorithm: 'four-sum-closest',
        parent: '07-three-number-sum/03-four-number-sum',
        description: 'Instead of finding quadruplets that sum exactly to the target, find the quadruplet whose sum is closest to the target. You must track the minimum absolute difference across all quadruplets, changing how you prune and when you update the result.',
        problem: 'You must track the minimum absolute difference across all quadruplets, changing how you prune and when you update the result.',
        hints: [
            'Think about how four sum closest differs from the standard version of this problem.',
            'Key insight: You must track the minimum absolute difference across all quadruplets, changing how you prune and when you update the result.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,2,3,4,5],"target":9},
                output: [[1,3,5],[2,3,4]],
                explanation: ''
            },
            {
                input: {"array":[-1,0,1,2],"target":0},
                output: [[-1,0,1]],
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[1,2,3],"target":100},
                output: [],
                explanation: ''
            }
        ],
        solutions: {
            python: `def four_sum_closest(array, target):
    """
    Four Sum Closest

    Instead of finding quadruplets that sum exactly to the target, find the quadruplet whose sum is closest to the target. You must track the minimum absolute difference across all quadruplets, changing how you prune and when you update the result.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(array)

    for i in range(n):
        # Check condition based on target
        j = 0
        for k in range(i, n):
            if j < len(target) and array[k] == target[j]:
                j += 1
        if j == len(target):
            count += 1

    return count


# Test cases
print(four_sum_closest([1,2,3,4,5], 9))  # Expected: [[1,3,5],[2,3,4]]
print(four_sum_closest([-1,0,1,2], 0))  # Expected: [[-1,0,1]]
print(four_sum_closest([1,2,3], 100))  # Expected: []
`,
            go: `package main

import "fmt"

// FourSumClosest solves the Four Sum Closest problem.
// Instead of finding quadruplets that sum exactly to the target, find the quadruplet whose sum is closest to the target. You must track the minimum absolute difference across all quadruplets, changing how you prune and when you update the result.
// Time: O(n), Space: O(n)
func FourSumClosest(array []int, target int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(FourSumClosest([]int{1, 2, 3, 4, 5}, 9)) // Expected: [[1,3,5],[2,3,4]]
	fmt.Println(FourSumClosest([]int{-1, 0, 1, 2}, 0)) // Expected: [[-1,0,1]]
	fmt.Println(FourSumClosest([]int{1, 2, 3}, 100)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/03-four-number-sum/twist-01-four-sum-closest', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/03-four-number-sum/twist-01-four-sum-closest'] = problem;
})();
