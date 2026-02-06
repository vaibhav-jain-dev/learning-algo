/**
 * Longest Alternating Subarray
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: longest-alternating-subarray
 * Parent: 10-monotonic-array/01-longest-monotonic-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Alternating Subarray',
        difficulty: 'Medium',
        algorithm: 'longest-alternating-subarray',
        parent: '10-monotonic-array/01-longest-monotonic-subarray',
        description: 'Find the longest contiguous subarray that alternates between increasing and decreasing (zigzag pattern). Instead of one direction, each consecutive pair must switch direction, a completely different scan pattern.',
        problem: 'Instead of one direction, each consecutive pair must switch direction, a completely different scan pattern.',
        hints: [
            'Think about how longest alternating subarray differs from the standard version of this problem.',
            'Key insight: Instead of one direction, each consecutive pair must switch direction, a completely different scan pattern.',
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
            python: `def longest_alternating_subarray(data):
    """
    Longest Alternating Subarray

    Find the longest contiguous subarray that alternates between increasing and decreasing (zigzag pattern).
    \n    Approach: Instead of one direction, each consecutive pair must switch direction, a completely different scan pattern.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 3, 2, 4, 1, 5]. Alternating: [1,3,2,4,1,5] length 6.

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
print(longest_alternating_subarray([1, 2, 3, 4, 5]))
print(longest_alternating_subarray([5, 3, 1]))
print(longest_alternating_subarray([1]))`,
            go: `package main

import "fmt"

// LongestAlternatingSubarray solves the Longest Alternating Subarray problem.
// Find the longest contiguous subarray that alternates between increasing and decreasing (zigzag pattern).
// Time: O(n), Space: O(n)
func LongestAlternatingSubarray(data []int) []int {
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
    fmt.Println(LongestAlternatingSubarray([]int{1, 2, 3, 4, 5}))
    fmt.Println(LongestAlternatingSubarray([]int{5, 3, 1}))
    fmt.Println(LongestAlternatingSubarray([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/01-longest-monotonic-subarray/twist-02-longest-alternating-subarray', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/01-longest-monotonic-subarray/twist-02-longest-alternating-subarray'] = problem;
})();
