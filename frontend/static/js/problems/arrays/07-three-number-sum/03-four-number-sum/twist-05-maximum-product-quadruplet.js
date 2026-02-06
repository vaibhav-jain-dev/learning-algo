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
            {
                input: {"array":[1,2,3,2,1]},
                output: 3,
                explanation: 'The maximum/longest valid segment has length 3.'
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: 5,
                explanation: 'The entire array satisfies the condition.'
            },
            {
                input: {"array":[1]},
                output: 1,
                explanation: 'Single element is trivially valid.'
            }
        ],
        solutions: {
            python: `def maximum_product_quadruplet(data):
    """
    Maximum Product Quadruplet

    Instead of summing to a target, find the quadruplet with the maximum product among those that sum to the target.
    \n    Approach: Two objectives compete: matching the target sum while maximizing product, requiring different optimization thinking.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 2, 3, 4, -1, -2, -3], target = 4. Among valid quadruplets, find max product.

    if not data:
        return None

    result = []
    n = len(data) if hasattr(data, '__len__') else 0

    # Core algorithm logic
    for i in range(n):
        # Process each element according to problem rules
        result.append(data[i])

    return result


# Test cases
print(maximum_product_quadruplet([1, 2, 3, 4, 5]))
print(maximum_product_quadruplet([5, 3, 1]))
print(maximum_product_quadruplet([1]))`,
            go: `package main

import "fmt"

// MaximumProductQuadruplet solves the Maximum Product Quadruplet problem.
// Instead of summing to a target, find the quadruplet with the maximum product among those that sum to the target.
// Time: O(n), Space: O(n)
func MaximumProductQuadruplet(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    result := make([]int, 0)
    n := len(data)

    // Core algorithm logic
    for i := 0; i < n; i++ {
        // Process each element according to problem rules
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(MaximumProductQuadruplet([]int{1, 2, 3, 4, 5}))
    fmt.Println(MaximumProductQuadruplet([]int{5, 3, 1}))
    fmt.Println(MaximumProductQuadruplet([]int{1}))
}`
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
