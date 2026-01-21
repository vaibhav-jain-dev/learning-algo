/**
 * Maximum Sum with at Least K Elements
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Sum with at Least K Elements',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'Given an array of integers and an integer k, find the maximum sum of a subarray that contains at least k elements.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
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
                1,
                -2,
                3,
                -1,
                5
        ],
        "k": 2
},
        output: 7,
        explanation: 'Processing the input data produces the output. For input nums=[1, -2, 3, -1, 5], k=2, the result is 7.'
    },
    {
        input: {
        "nums": [
                -1,
                -2,
                -3
        ],
        "k": 2
},
        output: -3,
        explanation: 'Processing the input data produces the output. For input nums=[-1, -2, -3], k=2, the result is -3.'
    }
        ],
        solutions: {
            python: `def maxSumWithAtLeastK(nums, k):
    """
    Maximum Sum with at Least K Elements

    Key insight: Use prefix sums and track the maximum sum
    we can extend from previous positions.

    Time: O(n)
    Space: O(n)
    """
    n = len(nums)
    if n < k:
        return 0

    # Compute prefix sums
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + nums[i]

    # Sum of first k elements
    result = prefix[k]

    # maxPrefixSum[i] = max sum we can add before position i-k
    # This represents the best positive extension we can add
    max_extension = 0

    for i in range(k, n):
        # Window of exactly k elements ending at i
        window_sum = prefix[i + 1] - prefix[i + 1 - k]

        # Best extension we can add (from elements before the window)
        # max_extension is the max of (prefix[j] - prefix[i-k]) for all valid j
        max_extension = max(max_extension, prefix[i + 1 - k] - prefix[i - k])

        # Update result: window + optional positive extension
        result = max(result, window_sum + max_extension)

    return result


# Test
if __name__ == "__main__":
    print(maxSumWithAtLeastK([1, -2, 3, -1, 5], 2))  # Output: 7
    print(maxSumWithAtLeastK([-1, -2, -3], 2))       # Output: -3`,
            go: `package main

import "fmt"

// MaxSumWithAtLeastK finds max sum of subarray with at least k elements.
// Time: O(n), Space: O(n)
func MaxSumWithAtLeastK(nums []int, k int) int {
    n := len(nums)
    if n < k {
        return 0
    }

    // Compute prefix sums
    prefix := make([]int, n+1)
    for i := 0; i < n; i++ {
        prefix[i+1] = prefix[i] + nums[i]
    }

    // Sum of first k elements
    result := prefix[k]

    // Track best extension we can add
    maxExtension := 0

    for i := k; i < n; i++ {
        // Window of exactly k elements ending at i
        windowSum := prefix[i+1] - prefix[i+1-k]

        // Update max extension
        ext := prefix[i+1-k] - prefix[i-k]
        if ext > maxExtension {
            maxExtension = ext
        }

        // Update result
        total := windowSum + maxExtension
        if total > result {
            result = total
        }
    }

    return result
}

func main() {
    fmt.Println(MaxSumWithAtLeastK([]int{1, -2, 3, -1, 5}, 2)) // Output: 7
    fmt.Println(MaxSumWithAtLeastK([]int{-1, -2, -3}, 2))      // Output: -3
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/03-max-sum-k-elements', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/03-max-sum-k-elements'] = problem;

})();
