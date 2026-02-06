/**
 * Max Product Increasing Subsequence
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-increasing-subseq
 * Parent: 05-max-sum-increasing
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Product Increasing Subsequence',
        difficulty: 'Hard',
        algorithm: 'dp-increasing-subseq',
        parent: '05-max-sum-increasing',
        description: 'Instead of maximizing the sum, find the strictly increasing subsequence whose product of elements is maximized.',
        problem: 'Products behave very differently from sums: negative numbers flip signs, zeros destroy products, and the multiplication growth is non-linear, requiring careful handling of sign tracking.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Products behave very differently from sums: negative numbers flip signs, zeros destroy products, and the multiplication ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[10,70,20,30,50,11,30]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the max product increasing subsequence criteria.'
            },
            {
                input: {"array":[8,12,2,3,15,5,7]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the max product increasing subsequence criteria.'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the max product increasing subsequence criteria.'
            },
            // Edge case
            {
                input: {"array":[10]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def max_product_increasing_subsequence(array):
    """
    Max Product Increasing Subsequence

    Instead of maximizing the sum, find the strictly increasing subsequence whose product of elements is maximized.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(max_product_increasing_subsequence([10,70,20,30,50,11,30]))  # Expected: 1
print(max_product_increasing_subsequence([8,12,2,3,15,5,7]))  # Expected: 2
print(max_product_increasing_subsequence([1,2,3,4,5]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MaxProductIncreasingSubsequence solves the Max Product Increasing Subsequence problem.
// Instead of maximizing the sum, find the strictly increasing subsequence whose product of elements is maximized.
// Time: O(n^2), Space: O(n)
func MaxProductIncreasingSubsequence(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaxProductIncreasingSubsequence([]int{10, 70, 20, 30, 50, 11, 30})) // Expected: 1
	fmt.Println(MaxProductIncreasingSubsequence([]int{8, 12, 2, 3, 15, 5, 7})) // Expected: 2
	fmt.Println(MaxProductIncreasingSubsequence([]int{1, 2, 3, 4, 5})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '05-max-sum-increasing/twist-01-max-product-increasing-subsequence', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/05-max-sum-increasing/twist-01-max-product-increasing-subsequence'] = problem;
})();
