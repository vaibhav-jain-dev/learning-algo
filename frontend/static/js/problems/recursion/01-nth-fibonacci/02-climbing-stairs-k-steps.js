/**
 * Climbing Stairs with K Steps
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-staircase
 */
(function() {
    'use strict';

    const problem = {
        name: 'Climbing Stairs with K Steps',
        difficulty: 'Medium',
        algorithm: 'recursion-staircase',
        parent: '01-nth-fibonacci',
        description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 to k steps. In how many distinct ways can you climb to the top? This is a generalization of the classic "Climbing Stairs" problem where you can take 1 or 2 steps.',
        complexity: {
            time: 'O(n)',
            space: 'O(k)'
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
        "n": 4,
        "k": 2
},
        output: 5,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input n=4, k=2, the result is 5.'
    }
        ],
        solutions: {
            python: `def climbingStairsWithKSteps(data):
    """
    Climbing Stairs with K Steps

    Count distinct ways to climb n stairs taking 1 to k steps at a time.
    dp[i] = sum of dp[i-1], dp[i-2], ..., dp[i-k]

    Time: O(n * k) or O(n) with sliding window
    Space: O(k) using sliding window optimization
    """
    n = data.get("n") if isinstance(data, dict) else data
    k = data.get("k", 2) if isinstance(data, dict) else 2

    if n == 0:
        return 1
    if n == 1:
        return 1

    # dp[i] represents number of ways to reach step i
    # Use sliding window to keep only last k values
    dp = [0] * (k + 1)
    dp[0] = 1  # Base case: 1 way to stay at ground
    window_sum = 1

    for i in range(1, n + 1):
        idx = i % (k + 1)
        dp[idx] = window_sum
        window_sum += dp[idx]

        # Remove the element that's now out of window
        if i >= k:
            old_idx = (i - k) % (k + 1)
            window_sum -= dp[old_idx]

    return dp[n % (k + 1)]


# Test
if __name__ == "__main__":
    print(climbingStairsWithKSteps({"n": 4, "k": 2}))  # Output: 5
    print(climbingStairsWithKSteps({"n": 5, "k": 3}))  # Output: 13`,
            go: `package main

import "fmt"

// ClimbingStairsWithKSteps solves the Climbing Stairs with K Steps problem.
// Count distinct ways to climb n stairs taking 1 to k steps at a time.
// Time: O(n), Space: O(k) using sliding window optimization
func ClimbingStairsWithKSteps(data interface{}) interface{} {
    // Extract n and k from input
    var n, k int
    switch v := data.(type) {
    case map[string]interface{}:
        n = int(v["n"].(float64))
        if kVal, ok := v["k"]; ok {
            k = int(kVal.(float64))
        } else {
            k = 2
        }
    }

    if n == 0 || n == 1 {
        return 1
    }

    // Use sliding window to keep only last k values
    dp := make([]int, k+1)
    dp[0] = 1 // Base case: 1 way to stay at ground
    windowSum := 1

    for i := 1; i <= n; i++ {
        idx := i % (k + 1)
        dp[idx] = windowSum
        windowSum += dp[idx]

        // Remove the element that's now out of window
        if i >= k {
            oldIdx := (i - k) % (k + 1)
            windowSum -= dp[oldIdx]
        }
    }

    return dp[n%(k+1)]
}

func main() {
    fmt.Println(ClimbingStairsWithKSteps(map[string]interface{}{"n": float64(4), "k": float64(2)})) // Output: 5
    fmt.Println(ClimbingStairsWithKSteps(map[string]interface{}{"n": float64(5), "k": float64(3)})) // Output: 13
}`
        },
        twists: [
            {
                title: 'Generate All Paths vs Count',
                difficulty: 'Medium',
                description: 'Instead of counting the number of ways, generate and return all distinct step sequences. For example, for n=4, k=2, return [[1,1,1,1],[1,1,2],[1,2,1],[2,1,1],[2,2]].',
                whyDifferent: 'Counting uses DP with O(n) time, but generating all paths requires backtracking and produces exponential output. The problem shifts from dynamic programming to exhaustive enumeration.',
                example: 'n=3, k=2 -> [[1,1,1],[1,2],[2,1]]. You must backtrack through choices 1..k at each step, building the path incrementally.'
            },
            {
                title: 'Memoization Top-Down Approach',
                difficulty: 'Easy',
                description: 'Solve using pure top-down recursion with memoization instead of the bottom-up sliding window. Compare the trade-offs.',
                whyDifferent: 'Top-down memoization naturally follows the recursive definition but uses O(n) space for the cache. The sliding window optimization requires a fundamentally different way of thinking about the problem.',
                example: 'climb(n, k, memo) = sum of climb(n-i, k, memo) for i in 1..k. For n=4, k=2: climb(4) = climb(3) + climb(2), each cached after first computation.'
            },
            {
                title: 'Stack Overflow for Large Inputs',
                difficulty: 'Medium',
                description: 'The naive recursive solution fails for n=100000. Design an iterative solution using the sliding window technique that handles arbitrarily large n with O(k) space.',
                whyDifferent: 'Forces the transition from recursive thinking to iterative sliding window. You must maintain a running sum and efficiently remove the element leaving the window, which is a different mental model than recursion.',
                example: 'For n=100000, k=3: maintain a circular buffer of size 4, updating the window sum as you advance. No recursion, no stack overflow.'
            },
            {
                title: 'Steps with Costs',
                difficulty: 'Hard',
                description: 'Each step i has a cost cost[i]. Instead of counting paths, find the minimum cost to reach the top, where at each position you can take 1 to k steps.',
                whyDifferent: 'Changes the recurrence from summation to minimization. The same recursive/DP structure applies but the combining operation is min() instead of sum(), altering the optimization perspective.',
                example: 'n=4, k=2, costs=[1,3,2,4]. dp[0]=0, dp[1]=1, dp[2]=min(dp[1]+3, dp[0]+3)=4, dp[3]=min(dp[2]+2, dp[1]+2)=3, dp[4]=min(dp[3]+4, dp[2]+4)=7.'
            },
            {
                title: 'Time Complexity Analysis',
                difficulty: 'Medium',
                description: 'Analyze the time complexity of the naive recursive solution without memoization for general k. How does it compare to Fibonacci when k=2? What is the base of the exponential?',
                whyDifferent: 'Requires mathematical reasoning about k-way branching. For k=2 the base is phi~1.618, but for larger k the base approaches 2. Understanding this connection deepens insight into why memoization is critical.',
                example: 'For k=2: O(phi^n). For k=3: O(tribonacci_constant^n) where tribonacci_constant ~= 1.839. For k>=n: O(2^n) since every subset of steps is valid.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/02-climbing-stairs-k-steps', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/02-climbing-stairs-k-steps'] = problem;

})();
