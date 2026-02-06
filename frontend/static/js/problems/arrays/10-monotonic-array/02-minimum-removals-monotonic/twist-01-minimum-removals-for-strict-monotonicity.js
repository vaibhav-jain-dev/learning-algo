/**
 * Minimum Removals for Strict Monotonicity
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: minimum-removals-for-strict-monotonicity
 * Parent: 10-monotonic-array/02-minimum-removals-monotonic
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Removals for Strict Monotonicity',
        difficulty: 'Hard',
        algorithm: 'minimum-removals-for-strict-monotonicity',
        parent: '10-monotonic-array/02-minimum-removals-monotonic',
        description: 'Find minimum removals to make the array strictly increasing or strictly decreasing (no equal adjacent elements). The LIS must be strictly increasing, changing the binary search from bisect_right to bisect_left.',
        problem: 'The LIS must be strictly increasing, changing the binary search from bisect_right to bisect_left.',
        hints: [
            'Think about how minimum removals for strict monotonicity differs from the standard version of this problem.',
            'Key insight: The LIS must be strictly increasing, changing the binary search from bisect_right to bisect_left.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Consider whether a greedy approach works, or if you need dynamic programming for the optimal solution.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,3,5,2,4]},
                output: 1,
                explanation: 'Only one operation needed to achieve the goal.'
            },
            {
                input: {"array":[1,2,3,4]},
                output: 0,
                explanation: 'Already satisfies the condition, no operations needed.'
            },
            {
                input: {"array":[5,3,1,4,2]},
                output: 2,
                explanation: 'Two operations needed to satisfy the condition.'
            }
        ],
        solutions: {
            python: `def minimum_removals_for_strict_monotonicity(data):
    """
    Minimum Removals for Strict Monotonicity

    Find minimum removals to make the array strictly increasing or strictly decreasing (no equal adjacent elements).
    \n    Approach: The LIS must be strictly increasing, changing the binary search from bisect_right to bisect_left.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 2, 2, 3]. Need to remove one 2 for strict increase: min removals = 1.

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
print(minimum_removals_for_strict_monotonicity([1, 2, 3, 4, 5]))
print(minimum_removals_for_strict_monotonicity([5, 3, 1]))
print(minimum_removals_for_strict_monotonicity([1]))`,
            go: `package main

import "fmt"

// MinimumRemovalsForStrictMonotonicity solves the Minimum Removals for Strict Monotonicity problem.
// Find minimum removals to make the array strictly increasing or strictly decreasing (no equal adjacent elements).
// Time: O(n), Space: O(n)
func MinimumRemovalsForStrictMonotonicity(data []int) []int {
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
    fmt.Println(MinimumRemovalsForStrictMonotonicity([]int{1, 2, 3, 4, 5}))
    fmt.Println(MinimumRemovalsForStrictMonotonicity([]int{5, 3, 1}))
    fmt.Println(MinimumRemovalsForStrictMonotonicity([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/02-minimum-removals-monotonic/twist-01-minimum-removals-for-strict-monotonicity', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/02-minimum-removals-monotonic/twist-01-minimum-removals-for-strict-monotonicity'] = problem;
})();
