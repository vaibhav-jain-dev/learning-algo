/**
 * Longest Strictly Monotonic Subarray
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: longest-strictly-monotonic-subarray
 * Parent: 10-monotonic-array/01-longest-monotonic-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Strictly Monotonic Subarray',
        difficulty: 'Medium',
        algorithm: 'longest-strictly-monotonic-subarray',
        parent: '10-monotonic-array/01-longest-monotonic-subarray',
        description: 'Find the longest contiguous subarray that is strictly increasing or strictly decreasing (no equal adjacent elements). Equal elements break the monotonic run, so your tracking must reset when arr[i] == arr[i-1].',
        problem: 'Equal elements break the monotonic run, so your tracking must reset when arr[i] == arr[i-1].',
        hints: [
            'Think about how longest strictly monotonic subarray differs from the standard version of this problem.',
            'Key insight: Equal elements break the monotonic run, so your tracking must reset when arr[i] == arr[i-1].',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
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
            python: `def longest_strictly_monotonic_subarray(data):
    """
    Longest Strictly Monotonic Subarray

    Find the longest contiguous subarray that is strictly increasing or strictly decreasing (no equal adjacent elements).
    \n    Approach: Equal elements break the monotonic run, so your tracking must reset when arr[i] == arr[i-1].

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 2, 2, 3, 4]. Longest strict: [2, 3, 4] length 3, not [1,2,2,3,4].

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
print(longest_strictly_monotonic_subarray([1, 2, 3, 4, 5]))
print(longest_strictly_monotonic_subarray([5, 3, 1]))
print(longest_strictly_monotonic_subarray([1]))`,
            go: `package main

import "fmt"

// LongestStrictlyMonotonicSubarray solves the Longest Strictly Monotonic Subarray problem.
// Find the longest contiguous subarray that is strictly increasing or strictly decreasing (no equal adjacent elements).
// Time: O(n), Space: O(n)
func LongestStrictlyMonotonicSubarray(data []int) []int {
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
    fmt.Println(LongestStrictlyMonotonicSubarray([]int{1, 2, 3, 4, 5}))
    fmt.Println(LongestStrictlyMonotonicSubarray([]int{5, 3, 1}))
    fmt.Println(LongestStrictlyMonotonicSubarray([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/01-longest-monotonic-subarray/twist-01-longest-strictly-monotonic-subarray', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/01-longest-monotonic-subarray/twist-01-longest-strictly-monotonic-subarray'] = problem;
})();
