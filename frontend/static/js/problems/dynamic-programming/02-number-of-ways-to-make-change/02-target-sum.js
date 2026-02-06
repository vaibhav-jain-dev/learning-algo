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
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 1, 1, 1, 1], target=3, the result is 5.'
    },
    {
        input: {
        "nums": [
                1
        ],
        "target": 1
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1], target=1, the result is 1.'
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
            {
                title: 'Derive the Subset Sum Transformation',
                difficulty: 'Hard',
                description: 'Prove mathematically why Target Sum reduces to subset sum. If P is the sum of elements assigned + and N is the sum of elements assigned -, show that finding P = (target + totalSum) / 2 is equivalent.',
                whyDifferent: 'The mathematical transformation is the key insight that makes this problem tractable. Without it, you need O(n * 2*sum) states. With it, you need O(n * sum). Deriving it yourself is much harder than reading it.',
                example: 'P - N = target (definition). P + N = totalSum (all elements). Adding: 2P = target + totalSum, so P = (target + totalSum) / 2. If this is not an integer, answer is 0.'
            },
            {
                title: 'Top-Down with Offset Index',
                difficulty: 'Medium',
                description: 'Solve using top-down memoization where the state is (index, currentSum). Since currentSum can be negative, how do you handle the memo table?',
                whyDifferent: 'The top-down approach without the subset sum transformation must handle negative sums as states. This requires either a hash map or an offset to shift indices, which is a different mental model.',
                example: 'memo key = (i, sum). For nums=[1,1,1,1,1], target=3: start with count(0, 0). At each step, count(i+1, sum+nums[i]) + count(i+1, sum-nums[i]). Sum ranges from -5 to 5.'
            },
            {
                title: 'Print All Valid Expressions',
                difficulty: 'Hard',
                description: 'Instead of counting, generate all expressions (sign assignments) that evaluate to target. Return them as lists of +/- signs.',
                whyDifferent: 'Counting uses DP efficiently, but enumerating requires backtracking. The count can be exponential, so this is inherently more expensive. You must track the path through decisions.',
                example: 'nums=[1,1,1,1,1], target=3: Output [+,+,+,+,-], [+,+,+,-,+], [+,+,-,+,+], [+,-,+,+,+], [-,+,+,+,+] (5 expressions).'
            },
            {
                title: 'Conceptual Trap: Handling Zeros in the Array',
                difficulty: 'Medium',
                description: 'What happens when nums contains zeros? A zero with + or - both contribute 0, so each zero doubles the count. How does this affect the subset sum transformation?',
                whyDifferent: 'Zeros are a subtle edge case. In the subset sum formulation, a zero can be either in P or N without changing the sum, effectively doubling the count for each zero. The DP handles this correctly but understanding why requires care.',
                example: 'nums=[0,1], target=1. Expressions: +0+1=1, -0+1=1. Both valid. Answer: 2. The zero doubles the count. With two zeros: 4x multiplier.'
            },
            {
                title: '2D to 1D Space Reduction',
                difficulty: 'Medium',
                description: 'The naive 2D DP is dp[i][s] = number of ways to achieve sum s using first i elements. Show how this reduces to a 1D array by iterating in reverse.',
                whyDifferent: 'Understanding why reverse iteration prevents using the same element twice is a fundamental 0/1 knapsack insight. It tests whether you understand the dependency structure of the DP table.',
                example: 'dp[s] += dp[s - num] for each num, iterating s from subset_sum down to num. Reverse order ensures each num is used at most once because dp[s-num] still reflects the state before processing this num.'
            }
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
