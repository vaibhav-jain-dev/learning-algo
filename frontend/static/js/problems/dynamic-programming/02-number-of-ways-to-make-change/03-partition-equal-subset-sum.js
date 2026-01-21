/**
 * Partition Equal Subset Sum
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Partition Equal Subset Sum',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change',
        description: 'Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or false otherwise.',
        problem: 'Use 2D dynamic programming where dp[i][j] represents the optimal solution for subproblem (i,j). Build the table by considering all possible transitions from smaller subproblems.',
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
                5,
                11,
                5
        ]
},
        output: true,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 5, 11, 5], the result is true.'
    },
    {
        input: {
        "nums": [
                1,
                2,
                3,
                5
        ]
},
        output: false,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 2, 3, 5], the result is false.'
    }
        ],
        solutions: {
            python: `def partitionEqualSubsetSum(data):
    """
    Partition Equal Subset Sum - Check if array can be split into two equal subsets.

    Key insight: If total sum is odd, impossible.
    Otherwise, find if a subset sums to total_sum / 2.
    This is the classic subset sum problem.

    Time: O(n * sum)
    Space: O(sum)
    """
    nums = data["nums"]

    total_sum = sum(nums)

    # If sum is odd, can't partition equally
    if total_sum % 2 != 0:
        return False

    target = total_sum // 2

    # dp[i] = True if we can make sum i with a subset
    dp = [False] * (target + 1)
    dp[0] = True  # Empty subset sums to 0

    # For each number, update dp from right to left
    for num in nums:
        for s in range(target, num - 1, -1):
            dp[s] = dp[s] or dp[s - num]

    return dp[target]


# Test
if __name__ == "__main__":
    print(partitionEqualSubsetSum({"nums": [1, 5, 11, 5]}))  # Expected: True
    print(partitionEqualSubsetSum({"nums": [1, 2, 3, 5]}))  # Expected: False`,
            go: `package main

import "fmt"

// PartitionEqualSubsetSum checks if array can be split into two equal subsets.
// Uses subset sum DP: can we find a subset that sums to totalSum/2?
// Time: O(n * sum), Space: O(sum)
func PartitionEqualSubsetSum(data map[string]interface{}) bool {
    numsInterface := data["nums"].([]interface{})
    nums := make([]int, len(numsInterface))
    totalSum := 0
    for i, v := range numsInterface {
        nums[i] = int(v.(float64))
        totalSum += nums[i]
    }

    // If sum is odd, can't partition equally
    if totalSum%2 != 0 {
        return false
    }

    target := totalSum / 2

    // dp[i] = true if we can make sum i with a subset
    dp := make([]bool, target+1)
    dp[0] = true  // Empty subset sums to 0

    // For each number, update dp from right to left
    for _, num := range nums {
        for s := target; s >= num; s-- {
            dp[s] = dp[s] || dp[s-num]
        }
    }

    return dp[target]
}

func main() {
    fmt.Println(PartitionEqualSubsetSum(map[string]interface{}{
        "nums": []interface{}{1.0, 5.0, 11.0, 5.0},
    }))  // Expected: true
    fmt.Println(PartitionEqualSubsetSum(map[string]interface{}{
        "nums": []interface{}{1.0, 2.0, 3.0, 5.0},
    }))  // Expected: false
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/03-partition-equal-subset-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/03-partition-equal-subset-sum'] = problem;

})();
