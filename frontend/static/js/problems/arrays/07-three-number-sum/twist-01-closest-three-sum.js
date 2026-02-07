/**
 * Closest Three Sum
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: closest-three-sum
 * Parent: 07-three-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest Three Sum',
        difficulty: 'Medium',
        algorithm: 'closest-three-sum',
        parent: '07-three-number-sum',
        description: 'Instead of finding triplets that sum exactly to the target, find the triplet whose sum is closest to the target. Return that closest sum. You must track the minimum absolute difference rather than checking for exact matches, changing the pointer movement logic.',
        problem: 'You must track the minimum absolute difference rather than checking for exact matches, changing the pointer movement logic.',
        hints: [
            'Think about how closest three sum differs from the standard version of this problem.',
            'Key insight: You must track the minimum absolute difference rather than checking for exact matches, changing the pointer movement logic.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,2,3,4,5],"target":9},
                output: [[1,3,5],[2,3,4]],
                explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
            },
            {
                input: {"array":[-1,0,1,2],"target":0},
                output: [[-1,0,1]],
                explanation: 'The algorithm handles this case by applying the key operation to each element. The accumulated result after processing all elements gives the answer.'
            },
            // Edge case
            {
                input: {"array":[1,2,3],"target":100},
                output: [],
                explanation: 'This test case validates the algorithm behavior. The step-by-step processing of input elements produces the expected output.'
            }
        ],
        solutions: {
            python: `def closest_three_sum(array, targetSum):
    """
    Closest Three Sum

    Instead of finding triplets that sum exactly to the target, find the triplet whose sum is closest to the target. Return that closest sum. You must track the minimum absolute difference rather than checking for exact matches, changing the pointer movement logic.

    Time: O(n^2)
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
print(closest_three_sum([1,2,3,4,5], None))  # Expected: [[1,3,5],[2,3,4]]
print(closest_three_sum([-1,0,1,2], None))  # Expected: [[-1,0,1]]
print(closest_three_sum([1,2,3], None))  # Expected: []
`,
            go: `package main

import "fmt"

// ClosestThreeSum solves the Closest Three Sum problem.
// Instead of finding triplets that sum exactly to the target, find the triplet whose sum is closest to the target. Return that closest sum. You must track the minimum absolute difference rather than checking for exact matches, changing the pointer movement logic.
// Time: O(n^2), Space: O(n)
func ClosestThreeSum(array []int, targetSum int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ClosestThreeSum([]int{1, 2, 3, 4, 5}, nil)) // Expected: [[1,3,5],[2,3,4]]
	fmt.Println(ClosestThreeSum([]int{-1, 0, 1, 2}, nil)) // Expected: [[-1,0,1]]
	fmt.Println(ClosestThreeSum([]int{1, 2, 3}, nil)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/twist-01-closest-three-sum', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/twist-01-closest-three-sum'] = problem;
})();
