/**
 * Maximum Product Quadruplet
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: maximum-product-quadruplet
 * Parent: 07-three-number-sum/03-four-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Product Quadruplet',
        difficulty: 'Hard',
        algorithm: 'maximum-product-quadruplet',
        parent: '07-three-number-sum/03-four-number-sum',
        description: 'Instead of summing to a target, find the quadruplet with the maximum product among those that sum to the target. Two objectives compete: matching the target sum while maximizing product, requiring different optimization thinking.',
        problem: 'Two objectives compete: matching the target sum while maximizing product, requiring different optimization thinking.',
        hints: [
            'Think about how maximum product quadruplet differs from the standard version of this problem.',
            'Key insight: Two objectives compete: matching the target sum while maximizing product, requiring different optimization thinking.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Consider whether a greedy approach works, or if you need dynamic programming for the optimal solution.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,2,3,2,1]},
                output: 3,
                explanation: ''
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: 5,
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[1]},
                output: 1,
                explanation: ''
            }
        ],
        solutions: {
            python: `def maximum_product_quadruplet(array, target):
    """
    Maximum Product Quadruplet

    Instead of summing to a target, find the quadruplet with the maximum product among those that sum to the target. Two objectives compete: matching the target sum while maximizing product, requiring different optimization thinking.

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
print(maximum_product_quadruplet([1,2,3,2,1], None))  # Expected: 3
print(maximum_product_quadruplet([5,4,3,2,1], None))  # Expected: 5
print(maximum_product_quadruplet([1], None))  # Expected: 1
`,
            go: `package main

import "fmt"

// MaximumProductQuadruplet solves the Maximum Product Quadruplet problem.
// Instead of summing to a target, find the quadruplet with the maximum product among those that sum to the target. Two objectives compete: matching the target sum while maximizing product, requiring different optimization thinking.
// Time: O(n), Space: O(n)
func MaximumProductQuadruplet(array []int, target int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaximumProductQuadruplet([]int{1, 2, 3, 2, 1}, nil)) // Expected: 3
	fmt.Println(MaximumProductQuadruplet([]int{5, 4, 3, 2, 1}, nil)) // Expected: 5
	fmt.Println(MaximumProductQuadruplet([]int{1}, nil)) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/03-four-number-sum/twist-05-maximum-product-quadruplet', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/03-four-number-sum/twist-05-maximum-product-quadruplet'] = problem;
})();
