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
            {
                title: 'Proof: Why Track Both Min and Max',
                difficulty: 'Hard',
                description: 'Prove that tracking both maxProd and minProd at each position is necessary and sufficient. Specifically, prove that the maximum product subarray ending at position i must equal either nums[i], maxProd[i-1]*nums[i], or minProd[i-1]*nums[i].',
                whyDifferent: 'Unlike sum where negative extensions are always bad, a negative product can become the maximum after multiplying by another negative. You must formally argue why two variables suffice.',
                example: 'Array [-2, 3, -4]: at index 2, maxProd[1]=3, minProd[1]=-6. Products: -4, 3*(-4)=-12, (-6)*(-4)=24. Max is 24, which comes from minProd. This proves min tracking is essential.'
            },
            {
                title: 'When Greedy Fails: Zero Handling',
                difficulty: 'Medium',
                description: 'Zeros break the product chain completely. Analyze how zeros partition the array into independent segments and why the greedy min/max tracking naturally handles this. What if you must include at least one zero in your subarray?',
                whyDifferent: 'Zero resets both maxProd and minProd to 0, effectively restarting. The twist of requiring a zero forces a completely different partitioning approach.',
                example: 'Array [2, 0, -3, 4]: without zero requirement, answer is 4. With zero requirement, you must include a 0, so best is [2, 0] or [0, -3, 4] = 0. Answer is 0.'
            },
            {
                title: 'Approximation: Logarithmic Transform',
                difficulty: 'Hard',
                description: 'Convert the product problem to a sum problem by taking logarithms of absolute values, then use Kadane\'s on the transformed array. Handle signs separately. Analyze when this approximation introduces floating-point errors.',
                whyDifferent: 'Transforms multiplication into addition, making it a direct Kadane application. But you must handle zeros (log undefined), negatives (sign tracking), and floating-point precision issues.',
                example: 'Array [2, 3, -2, 4]: logs = [0.69, 1.10, 0.69, 1.39], signs = [+, +, -, +]. Max sum of logs with even negatives gives the max product subarray.'
            },
            {
                title: 'Parallel Version',
                difficulty: 'Very Hard',
                description: 'Design a parallel divide-and-conquer algorithm for max product subarray. How do you merge product subarray information from two halves? What auxiliary information must each half export?',
                whyDifferent: 'Unlike max sum where you track prefix/suffix/total/max, products require tracking prefix/suffix/total products AND their sign patterns, since negative products from both halves can combine to form a positive.',
                example: 'Split [-2, 3, -4, 2] into [-2, 3] and [-4, 2]. Left exports: max=3, maxPrefix=-2, maxSuffix=3, total=-6. Right exports similarly. Cross products need careful sign analysis.'
            },
            {
                title: 'Conceptual Trap: Single Negative Element',
                difficulty: 'Easy',
                description: 'What does your algorithm return for the array [-5]? What about [0, -5, 0]? Trace through carefully. Many implementations fail when the entire array is a single negative number or when zeros surround negatives.',
                whyDifferent: 'Exposes initialization bugs. If maxProd starts at 0 or 1 instead of nums[0], single negative arrays return wrong results. Forces careful reasoning about base cases.',
                example: 'Input: [-5]. Correct output: -5. Input: [0, -5, 0]. Correct output: 0. If maxProd initialized to 1, [-5] wrongly returns 1.'
            },
            {
                title: 'Implementation Without Swap',
                difficulty: 'Medium',
                description: 'Rewrite the max product subarray algorithm without using the swap trick for negatives. Instead, compute all three candidates (nums[i], maxProd*nums[i], minProd*nums[i]) and take max/min directly. Compare clarity and correctness.',
                whyDifferent: 'The swap trick is elegant but can obscure the logic. Computing all candidates explicitly forces you to understand why exactly three candidates suffice and prevents off-by-one errors in the swap.',
                example: 'At index i with nums[i]=-2, maxProd=6, minProd=-3: candidates are -2, -12, 6. New maxProd=6, new minProd=-12. Same result as swap approach but logic is more transparent.'
            }
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
