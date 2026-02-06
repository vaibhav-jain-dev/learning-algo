/**
 * Closest to Target Difference
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: closest-to-target-difference
 * Parent: 08-smallest-difference
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest to Target Difference',
        difficulty: 'Medium',
        algorithm: 'closest-to-target-difference',
        parent: '08-smallest-difference',
        description: 'Instead of finding the pair with the smallest absolute difference, find the pair whose absolute difference is closest to a given value D. The two-pointer logic changes because you are not minimizing toward zero but toward a specific target gap.',
        problem: 'The two-pointer logic changes because you are not minimizing toward zero but toward a specific target gap.',
        hints: [
            'Think about how closest to target difference differs from the standard version of this problem.',
            'Key insight: The two-pointer logic changes because you are not minimizing toward zero but toward a specific target gap.',
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
            python: `def closest_to_target_difference(arrayOne, arrayTwo, target):
    """
    Closest to Target Difference

    Instead of finding the pair with the smallest absolute difference, find the pair whose absolute difference is closest to a given value D. The two-pointer logic changes because you are not minimizing toward zero but toward a specific target gap.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(arrayOne)

    for i in range(n):
        # Check condition based on arrayTwo
        j = 0
        for k in range(i, n):
            if j < len(arrayTwo) and arrayOne[k] == arrayTwo[j]:
                j += 1
        if j == len(arrayTwo):
            count += 1

    return count


# Test cases
print(closest_to_target_difference(None, None, 9))  # Expected: [[1,3,5],[2,3,4]]
print(closest_to_target_difference(None, None, 0))  # Expected: [[-1,0,1]]
print(closest_to_target_difference(None, None, 100))  # Expected: []
`,
            go: `package main

import "fmt"

// ClosestToTargetDifference solves the Closest to Target Difference problem.
// Instead of finding the pair with the smallest absolute difference, find the pair whose absolute difference is closest to a given value D. The two-pointer logic changes because you are not minimizing toward zero but toward a specific target gap.
// Time: O(n), Space: O(n)
func ClosestToTargetDifference(arrayOne []int, arrayTwo []int, target int) int {
	result := 0

	for i := 0; i < len(arrayOne); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ClosestToTargetDifference(nil, nil, 9)) // Expected: [[1,3,5],[2,3,4]]
	fmt.Println(ClosestToTargetDifference(nil, nil, 0)) // Expected: [[-1,0,1]]
	fmt.Println(ClosestToTargetDifference(nil, nil, 100)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference/twist-01-closest-to-target-difference', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference/twist-01-closest-to-target-difference'] = problem;
})();
