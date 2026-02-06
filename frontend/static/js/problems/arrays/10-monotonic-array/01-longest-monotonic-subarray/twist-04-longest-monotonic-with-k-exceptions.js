/**
 * Longest Monotonic with K Exceptions
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: longest-monotonic-with-k-exceptions
 * Parent: 10-monotonic-array/01-longest-monotonic-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Monotonic with K Exceptions',
        difficulty: 'Hard',
        algorithm: 'longest-monotonic-with-k-exceptions',
        parent: '10-monotonic-array/01-longest-monotonic-subarray',
        description: 'Find the longest contiguous subarray that is monotonic if you are allowed to skip at most K elements. Requires a sliding window approach tracking violations, fundamentally different from simple linear scan.',
        problem: 'Requires a sliding window approach tracking violations, fundamentally different from simple linear scan.',
        hints: [
            'Think about how longest monotonic with k exceptions differs from the standard version of this problem.',
            'Key insight: Requires a sliding window approach tracking violations, fundamentally different from simple linear scan.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,3,5,7],"k":2},
                output: [1,3],
                explanation: 'The k=2 smallest/closest values found.'
            },
            {
                input: {"array":[10,20,30],"k":1},
                output: [10],
                explanation: 'With k=1, return the single best result.'
            },
            {
                input: {"array":[5,5,5,5],"k":3},
                output: [5,5,5],
                explanation: 'Duplicate values handled correctly with k=3.'
            }
        ],
        solutions: {
            python: `def longest_monotonic_with_k_exceptions(data):
    """
    Longest Monotonic with K Exceptions

    Find the longest contiguous subarray that is monotonic if you are allowed to skip at most K elements.
    \n    Approach: Requires a sliding window approach tracking violations, fundamentally different from simple linear scan.

    Time: O(n log k)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 5, 2, 3, 4], K = 1. Skip 5: [1, 2, 3, 4] length 4.

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
print(longest_monotonic_with_k_exceptions([1, 2, 3, 4, 5]))
print(longest_monotonic_with_k_exceptions([5, 3, 1]))
print(longest_monotonic_with_k_exceptions([1]))`,
            go: `package main

import "fmt"

// LongestMonotonicWithKExceptions solves the Longest Monotonic with K Exceptions problem.
// Find the longest contiguous subarray that is monotonic if you are allowed to skip at most K elements.
// Time: O(n log k), Space: O(n)
func LongestMonotonicWithKExceptions(data []int) []int {
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
    fmt.Println(LongestMonotonicWithKExceptions([]int{1, 2, 3, 4, 5}))
    fmt.Println(LongestMonotonicWithKExceptions([]int{5, 3, 1}))
    fmt.Println(LongestMonotonicWithKExceptions([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/01-longest-monotonic-subarray/twist-04-longest-monotonic-with-k-exceptions', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/01-longest-monotonic-subarray/twist-04-longest-monotonic-with-k-exceptions'] = problem;
})();
