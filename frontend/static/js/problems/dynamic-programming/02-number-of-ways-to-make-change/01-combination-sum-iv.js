/**
 * Combination Sum IV
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Combination Sum IV',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change',
        description: 'Given an array of **distinct** integers nums and a target integer target, return the number of possible combinations that add up to target. **Note:** The different sequences are counted as different combinations (this is counting **permutations**, not combinations).',
        problem: 'Use 2D dynamic programming where dp[i][j] represents the optimal solution for subproblem (i,j). Build the table by considering all possible transitions from smaller subproblems.',
        complexity: {
            time: 'O(target * n)',
            space: 'O(target)'
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
                2,
                3
        ],
        "target": 4
},
        output: 7,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 2, 3], target=4, the result is 7.'
    },
    {
        input: {
        "nums": [
                9
        ],
        "target": 3
},
        output: 0,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[9], target=3, the result is 0.'
    }
        ],
        solutions: {
            python: `def combinationSumIv(data):
    """
    Combination Sum IV - Count permutations that sum to target.

    Key insight: This is an unbounded knapsack variant counting permutations.
    dp[i] = number of ways to reach sum i.
    For each target sum, try all numbers as the last number.

    Note: Order matters (permutations), so iterate target first, then nums.

    Time: O(target * n)
    Space: O(target)
    """
    nums = data["nums"]
    target = data["target"]

    # dp[i] = number of permutations that sum to i
    dp = [0] * (target + 1)
    dp[0] = 1  # One way to make sum 0: use nothing

    # For each sum from 1 to target
    for curr_sum in range(1, target + 1):
        # Try each number as the last number in the permutation
        for num in nums:
            if num <= curr_sum:
                dp[curr_sum] += dp[curr_sum - num]

    return dp[target]


# Test
if __name__ == "__main__":
    print(combinationSumIv({"nums": [1, 2, 3], "target": 4}))  # Expected: 7
    print(combinationSumIv({"nums": [9], "target": 3}))  # Expected: 0`,
            go: `package main

import "fmt"

// CombinationSumIv counts permutations that sum to target.
// Order matters, so we iterate target first, then nums.
// Time: O(target * n), Space: O(target)
func CombinationSumIv(data map[string]interface{}) int {
    numsInterface := data["nums"].([]interface{})
    nums := make([]int, len(numsInterface))
    for i, v := range numsInterface {
        nums[i] = int(v.(float64))
    }
    target := int(data["target"].(float64))

    // dp[i] = number of permutations that sum to i
    dp := make([]int, target+1)
    dp[0] = 1  // One way to make sum 0: use nothing

    // For each sum from 1 to target
    for currSum := 1; currSum <= target; currSum++ {
        // Try each number as the last number
        for _, num := range nums {
            if num <= currSum {
                dp[currSum] += dp[currSum-num]
            }
        }
    }

    return dp[target]
}

func main() {
    fmt.Println(CombinationSumIv(map[string]interface{}{
        "nums":   []interface{}{1.0, 2.0, 3.0},
        "target": 4.0,
    }))  // Expected: 7
    fmt.Println(CombinationSumIv(map[string]interface{}{
        "nums":   []interface{}{9.0},
        "target": 3.0,
    }))  // Expected: 0
}`
        },
        twists: [
            {
                title: 'Why This Counts Permutations, Not Combinations',
                difficulty: 'Medium',
                description: 'Explain precisely why iterating over target amounts in the outer loop and nums in the inner loop counts ordered sequences (permutations) rather than unordered combinations.',
                whyDifferent: 'This is the inverse of the coin change counting problem. The loop order determines whether [1,2,1] and [2,1,1] and [1,1,2] are counted as one way or three. You must understand what each DP cell represents under each ordering.',
                example: 'nums=[1,2,3], target=4. dp[4] includes 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2, 1+3, 3+1 = 7 permutations. If coins were outer loop, only {1,1,1,1}, {1,1,2}, {1,3}, {2,2} = 4 combinations.'
            },
            {
                title: 'Top-Down Memoization Version',
                difficulty: 'Medium',
                description: 'Rewrite the solution using recursive top-down with memoization. Define a function count(remaining) that returns the number of ways to reach exactly 0.',
                whyDifferent: 'Top-down naturally expresses "what are my choices from here?" which can be easier to reason about for permutation-style problems. Compare the recursion tree to the bottom-up table.',
                example: 'count(4) = count(3) + count(2) + count(1). count(3) = count(2) + count(1) + count(0). count(0) = 1 (base case). Memoize to avoid recomputation.'
            },
            {
                title: 'Generate All Permutations (Not Just Count)',
                difficulty: 'Hard',
                description: 'Instead of counting, generate and return all ordered sequences that sum to target. This requires backtracking or DP with path reconstruction.',
                whyDifferent: 'Counting is O(target * n) but generating all permutations can be exponential. You need a different algorithmic approach (backtracking with pruning) since the DP table alone cannot reconstruct all paths efficiently.',
                example: 'nums=[1,2,3], target=4: Output [[1,1,1,1],[1,1,2],[1,2,1],[1,3],[2,1,1],[2,2],[3,1]].'
            },
            {
                title: 'Handle Negative Numbers in nums',
                difficulty: 'Very Hard',
                description: 'What if nums can contain negative numbers? The standard DP breaks because the target range becomes unbounded. How would you handle this?',
                whyDifferent: 'Negative numbers mean you could theoretically increase and decrease the running sum infinitely. You need to either bound the number of elements used or prove convergence, fundamentally changing the problem structure.',
                example: 'nums=[-1, 1, 2], target=1. Infinite sequences exist: [1], [-1,2], [-1,-1,1,2], etc. You\'d need an additional constraint like "use at most k numbers" to make it finite.'
            },
            {
                title: 'Trace the DP Array',
                difficulty: 'Easy',
                description: 'For nums=[1,2,3] and target=4, build the DP array step by step. At each target value, show which nums contribute.',
                whyDifferent: 'Hand-tracing the permutation DP reveals the contribution of each number at each step and makes the additive accumulation pattern concrete.',
                example: 'dp[0]=1. dp[1]=dp[0]=1. dp[2]=dp[1]+dp[0]=2. dp[3]=dp[2]+dp[1]+dp[0]=4. dp[4]=dp[3]+dp[2]+dp[1]=4+2+1=7.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/01-combination-sum-iv', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/01-combination-sum-iv'] = problem;

})();
