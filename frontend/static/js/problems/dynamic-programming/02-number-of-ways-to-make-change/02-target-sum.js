/**
 * Target Sum
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Target Sum',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change',
        description: 'You are given an integer array nums and an integer target. You want to build an **expression** out of nums by adding one of the symbols \'+\' and \'-\' before each integer in nums and then concatenate all the integers. Return the number of different expressions that you can build, which evaluates to target.',
        problem: 'Build the solution using dynamic programming. Define the state, establish the base cases, and derive the recurrence relation. Fill in the DP table bottom-up (or use memoized recursion top-down). This achieves O(n * sum) time with O(sum) space.',
        complexity: {
            time: 'O(n * sum)',
            space: 'O(sum)'
        },
        hints: [
            'Define the state: what does dp[i][j] represent?',
            'Identify the base cases (usually dp[0][...] and dp[...][0]).',
            'Write the recurrence relation for dp[i][j].',
            'Determine the iteration order to ensure dependencies are computed first.',
            'Consider space optimization if only previous row/column is needed.'
        ],
        examples: [
    {
        input: {
        "nums": [
                1,
                1,
                1,
                1,
                1
        ],
        "target": 3
},
        output: 5,
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "nums": [
                1
        ],
        "target": 1
},
        output: 1,
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
    }
        ],
        solutions: {
            python: `def targetSum(data):
    """
    Target Sum - Count expressions with +/- that evaluate to target.

    Key insight: Transform into subset sum problem.
    Let P = sum of positive elements, N = sum of negative elements.
    P - N = target and P + N = total_sum
    => P = (target + total_sum) / 2

    So we need to count subsets that sum to (target + total_sum) / 2.

    Time: O(n * sum)
    Space: O(sum)
    """
    nums = data["nums"]
    target = data["target"]

    total_sum = sum(nums)

    # Check if solution is possible
    if (target + total_sum) % 2 != 0 or abs(target) > total_sum:
        return 0

    subset_sum = (target + total_sum) // 2

    # dp[i] = number of ways to achieve sum i
    dp = [0] * (subset_sum + 1)
    dp[0] = 1  # One way to make sum 0: choose nothing

    # For each number, update dp from right to left
    for num in nums:
        for s in range(subset_sum, num - 1, -1):
            dp[s] += dp[s - num]

    return dp[subset_sum]


# Test
if __name__ == "__main__":
    print(targetSum({"nums": [1, 1, 1, 1, 1], "target": 3}))  # Expected: 5
    print(targetSum({"nums": [1], "target": 1}))  # Expected: 1`,
            go: `package main

import "fmt"

// TargetSum counts expressions with +/- that evaluate to target.
// Transforms into subset sum: find subsets summing to (target + totalSum) / 2.
// Time: O(n * sum), Space: O(sum)
func TargetSum(data map[string]interface{}) int {
    numsInterface := data["nums"].([]interface{})
    nums := make([]int, len(numsInterface))
    totalSum := 0
    for i, v := range numsInterface {
        nums[i] = int(v.(float64))
        totalSum += nums[i]
    }
    target := int(data["target"].(float64))

    // Check if solution is possible
    if (target+totalSum)%2 != 0 {
        return 0
    }
    if target > totalSum || target < -totalSum {
        return 0
    }

    subsetSum := (target + totalSum) / 2
    if subsetSum < 0 {
        return 0
    }

    // dp[i] = number of ways to achieve sum i
    dp := make([]int, subsetSum+1)
    dp[0] = 1  // One way to make sum 0

    // For each number, update dp from right to left
    for _, num := range nums {
        for s := subsetSum; s >= num; s-- {
            dp[s] += dp[s-num]
        }
    }

    return dp[subsetSum]
}

func main() {
    fmt.Println(TargetSum(map[string]interface{}{
        "nums":   []interface{}{1.0, 1.0, 1.0, 1.0, 1.0},
        "target": 3.0,
    }))  // Expected: 5
    fmt.Println(TargetSum(map[string]interface{}{
        "nums":   []interface{}{1.0},
        "target": 1.0,
    }))  // Expected: 1
}`
        },
        twists: [
            { id: '02-number-of-ways-to-make-change/02-target-sum/twist-01-derive-the-subset-sum-transformation', name: 'Derive the Subset Sum Transformation', difficulty: 'Hard' },
            { id: '02-number-of-ways-to-make-change/02-target-sum/twist-02-top-down-with-offset-index', name: 'Top-Down with Offset Index', difficulty: 'Medium' },
            { id: '02-number-of-ways-to-make-change/02-target-sum/twist-03-print-all-valid-expressions', name: 'Print All Valid Expressions', difficulty: 'Hard' },
            { id: '02-number-of-ways-to-make-change/02-target-sum/twist-04-conceptual-trap-handling-zeros-in-the-array', name: 'Conceptual Trap: Handling Zeros in the Array', difficulty: 'Medium' },
            { id: '02-number-of-ways-to-make-change/02-target-sum/twist-05-2d-to-1d-space-reduction', name: '2D to 1D Space Reduction', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/02-target-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/02-target-sum'] = problem;

})();
