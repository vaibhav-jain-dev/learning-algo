/**
 * Three Sum With Multiplicity
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: three-sum-with-multiplicity
 * Parent: 07-three-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum With Multiplicity',
        difficulty: 'Hard',
        algorithm: 'three-sum-with-multiplicity',
        parent: '07-three-number-sum',
        description: 'Given an array that may contain duplicates, count all ordered triplet indices (i, j, k) where i < j < k and array[i] + array[j] + array[k] = target. Instead of unique value triplets, you count index-based combinations, requiring combinatorial math when duplicates exist.',
        problem: 'Instead of unique value triplets, you count index-based combinations, requiring combinatorial math when duplicates exist.',
        hints: [
            'Think about how three sum with multiplicity differs from the standard version of this problem.',
            'Key insight: Instead of unique value triplets, you count index-based combinations, requiring combinatorial math when duplicates exist.',
            'Consider whether sorting can help simplify the approach.',
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
            python: `def three_sum_with_multiplicity(array, targetSum):
    """
    Three Sum With Multiplicity

    Given an array that may contain duplicates, count all ordered triplet indices (i, j, k) where i < j < k and array[i] + array[j] + array[k] = target. Instead of unique value triplets, you count index-based combinations, requiring combinatorial math when duplicates exist.

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
print(three_sum_with_multiplicity([1,2,3,4,5], None))  # Expected: [[1,3,5],[2,3,4]]
print(three_sum_with_multiplicity([-1,0,1,2], None))  # Expected: [[-1,0,1]]
print(three_sum_with_multiplicity([1,2,3], None))  # Expected: []
`,
            go: `package main

import "fmt"

// ThreeSumWithMultiplicity solves the Three Sum With Multiplicity problem.
// Given an array that may contain duplicates, count all ordered triplet indices (i, j, k) where i < j < k and array[i] + array[j] + array[k] = target. Instead of unique value triplets, you count index-based combinations, requiring combinatorial math when duplicates exist.
// Time: O(n^2), Space: O(n)
func ThreeSumWithMultiplicity(array []int, targetSum int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ThreeSumWithMultiplicity([]int{1, 2, 3, 4, 5}, nil)) // Expected: [[1,3,5],[2,3,4]]
	fmt.Println(ThreeSumWithMultiplicity([]int{-1, 0, 1, 2}, nil)) // Expected: [[-1,0,1]]
	fmt.Println(ThreeSumWithMultiplicity([]int{1, 2, 3}, nil)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/twist-05-three-sum-with-multiplicity', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/twist-05-three-sum-with-multiplicity'] = problem;
})();
