/**
 * Maximum Product Subarray
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Product Subarray',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'Given an integer array nums, find a contiguous subarray that has the largest product, and return the product.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "nums": [
                2,
                3,
                -2,
                4
        ]
},
        output: 6,
        explanation: 'Processing the input data produces the output. For input nums=[2, 3, -2, 4], the result is 6.'
    },
    {
        input: {
        "nums": [
                -2,
                0,
                -1
        ]
},
        output: 0,
        explanation: 'Processing the input data produces the output. For input nums=[-2, 0, -1], the result is 0.'
    }
        ],
        solutions: {
            python: `def maxProduct(nums):
    """
    Maximum Product Subarray

    Key insight: Track both max and min products because
    a negative number can turn min into max and vice versa.

    Time: O(n)
    Space: O(1)
    """
    if not nums:
        return 0

    result = nums[0]
    max_prod = nums[0]
    min_prod = nums[0]

    for i in range(1, len(nums)):
        num = nums[i]

        # When multiplying by negative, max becomes min and vice versa
        if num < 0:
            max_prod, min_prod = min_prod, max_prod

        # Max product ending at current position
        max_prod = max(num, max_prod * num)
        # Min product ending at current position
        min_prod = min(num, min_prod * num)

        result = max(result, max_prod)

    return result


# Test
if __name__ == "__main__":
    print(maxProduct([2, 3, -2, 4]))  # Output: 6
    print(maxProduct([-2, 0, -1]))    # Output: 0`,
            go: `package main

import "fmt"

// MaxProduct finds the contiguous subarray with largest product.
// Time: O(n), Space: O(1)
func MaxProduct(nums []int) int {
    if len(nums) == 0 {
        return 0
    }

    result := nums[0]
    maxProd := nums[0]
    minProd := nums[0]

    for i := 1; i < len(nums); i++ {
        num := nums[i]

        // When multiplying by negative, swap max and min
        if num < 0 {
            maxProd, minProd = minProd, maxProd
        }

        // Max product ending at current position
        if num > maxProd * num {
            maxProd = num
        } else {
            maxProd = maxProd * num
        }

        // Min product ending at current position
        if num < minProd * num {
            minProd = num
        } else {
            minProd = minProd * num
        }

        if maxProd > result {
            result = maxProd
        }
    }

    return result
}

func main() {
    fmt.Println(MaxProduct([]int{2, 3, -2, 4})) // Output: 6
    fmt.Println(MaxProduct([]int{-2, 0, -1}))   // Output: 0
}`
        },
        twists: [
            { id: '01-kadanes-algorithm/02-max-product-subarray/twist-01-proof-why-track-both-min-and-max', name: 'Proof: Why Track Both Min and Max', difficulty: 'Hard' },
            { id: '01-kadanes-algorithm/02-max-product-subarray/twist-02-when-greedy-fails-zero-handling', name: 'When Greedy Fails: Zero Handling', difficulty: 'Medium' },
            { id: '01-kadanes-algorithm/02-max-product-subarray/twist-03-approximation-logarithmic-transform', name: 'Approximation: Logarithmic Transform', difficulty: 'Hard' },
            { id: '01-kadanes-algorithm/02-max-product-subarray/twist-04-parallel-version', name: 'Parallel Version', difficulty: 'Very Hard' },
            { id: '01-kadanes-algorithm/02-max-product-subarray/twist-05-conceptual-trap-single-negative-element', name: 'Conceptual Trap: Single Negative Element', difficulty: 'Easy' },
            { id: '01-kadanes-algorithm/02-max-product-subarray/twist-06-implementation-without-swap', name: 'Implementation Without Swap', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/02-max-product-subarray', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/02-max-product-subarray'] = problem;

})();
