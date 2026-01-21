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
