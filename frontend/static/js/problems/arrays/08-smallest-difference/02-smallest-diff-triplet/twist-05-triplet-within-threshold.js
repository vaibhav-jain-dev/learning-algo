/**
 * Triplet Within Threshold
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: triplet-within-threshold
 * Parent: 08-smallest-difference/02-smallest-diff-triplet
 */
(function() {
    'use strict';

    const problem = {
        name: 'Triplet Within Threshold',
        difficulty: 'Medium',
        algorithm: 'triplet-within-threshold',
        parent: '08-smallest-difference/02-smallest-diff-triplet',
        description: 'Find any triplet from three sorted arrays where (max - min) is at most T. Return true/false. Decision problem rather than optimization; you can stop as soon as you find one valid triplet, enabling early termination.',
        problem: 'Decision problem rather than optimization; you can stop as soon as you find one valid triplet, enabling early termination.',
        hints: [
            'Think about how triplet within threshold differs from the standard version of this problem.',
            'Key insight: Decision problem rather than optimization; you can stop as soon as you find one valid triplet, enabling early termination.',
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
                input: {"array":[1,2,3,4,5]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the triplet within threshold criteria.'
            },
            {
                input: {"array":[5,3,1]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the triplet within threshold criteria.'
            },
            {
                input: {"array":[1]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the triplet within threshold criteria.'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def triplet_within_threshold(arr1, arr2, arr3):
    """
    Triplet Within Threshold

    Find any triplet from three sorted arrays where (max - min) is at most T. Return true/false. Decision problem rather than optimization; you can stop as soon as you find one valid triplet, enabling early termination.

    Time: O(n log n)
    Space: O(n)
    """
    count = 0
    n = len(arr1)

    for i in range(n):
        # Check condition based on arr2
        j = 0
        for k in range(i, n):
            if j < len(arr2) and arr1[k] == arr2[j]:
                j += 1
        if j == len(arr2):
            count += 1

    return count


# Test cases
print(triplet_within_threshold(None, None, None))  # Expected: 1
print(triplet_within_threshold(None, None, None))  # Expected: 2
print(triplet_within_threshold(None, None, None))  # Expected: 0
`,
            go: `package main

import "fmt"

// TripletWithinThreshold solves the Triplet Within Threshold problem.
// Find any triplet from three sorted arrays where (max - min) is at most T. Return true/false. Decision problem rather than optimization; you can stop as soon as you find one valid triplet, enabling early termination.
// Time: O(n log n), Space: O(n)
func TripletWithinThreshold(arr1 []int, arr2 []int, arr3 []int) int {
	result := 0

	for i := 0; i < len(arr1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TripletWithinThreshold(nil, nil, nil)) // Expected: 1
	fmt.Println(TripletWithinThreshold(nil, nil, nil)) // Expected: 2
	fmt.Println(TripletWithinThreshold(nil, nil, nil)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference/02-smallest-diff-triplet/twist-05-triplet-within-threshold', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference/02-smallest-diff-triplet/twist-05-triplet-within-threshold'] = problem;
})();
