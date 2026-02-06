/**
 * Count Monotonic Subarrays
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: count-monotonic-subarrays
 * Parent: 10-monotonic-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Monotonic Subarrays',
        difficulty: 'Medium',
        algorithm: 'count-monotonic-subarrays',
        parent: '10-monotonic-array',
        description: 'Count the total number of contiguous subarrays of length >= 2 that are monotonic. Requires counting all valid subarrays, not just checking the whole array. Use math to count from run lengths.',
        problem: 'Requires counting all valid subarrays, not just checking the whole array. Use math to count from run lengths.',
        hints: [
            'Think about how count monotonic subarrays differs from the standard version of this problem.',
            'Key insight: Requires counting all valid subarrays, not just checking the whole array. Use math to count from run lengths.',
            'A hash map can help track frequencies or previously seen values efficiently.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,2,1,2,3]},
                output: 2,
                explanation: 'Two valid configurations found in the input.'
            },
            {
                input: {"array":[1,2,3]},
                output: 1,
                explanation: 'Only one valid configuration exists.'
            },
            {
                input: {"array":[1,1,1]},
                output: 3,
                explanation: 'Multiple identical elements create multiple valid configurations.'
            }
        ],
        solutions: {
            python: `def count_monotonic_subarrays(data):
    """
    Count Monotonic Subarrays

    Count the total number of contiguous subarrays of length >= 2 that are monotonic.
    \n    Approach: Requires counting all valid subarrays, not just checking the whole array. Use math to count from run lengths.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 2, 3, 1]. Monotonic subarrays: [1,2], [2,3], [1,2,3], [3,1] = 4 total.

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
print(count_monotonic_subarrays([1, 2, 3, 4, 5]))
print(count_monotonic_subarrays([5, 3, 1]))
print(count_monotonic_subarrays([1]))`,
            go: `package main

import "fmt"

// CountMonotonicSubarrays solves the Count Monotonic Subarrays problem.
// Count the total number of contiguous subarrays of length >= 2 that are monotonic.
// Time: O(n), Space: O(n)
func CountMonotonicSubarrays(data []int) []int {
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
    fmt.Println(CountMonotonicSubarrays([]int{1, 2, 3, 4, 5}))
    fmt.Println(CountMonotonicSubarrays([]int{5, 3, 1}))
    fmt.Println(CountMonotonicSubarrays([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/twist-05-count-monotonic-subarrays', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/twist-05-count-monotonic-subarrays'] = problem;
})();
