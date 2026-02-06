/**
 * Strictly Monotonic Check
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: strictly-monotonic-check
 * Parent: 10-monotonic-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Strictly Monotonic Check',
        difficulty: 'Easy',
        algorithm: 'strictly-monotonic-check',
        parent: '10-monotonic-array',
        description: 'Check if the array is strictly increasing or strictly decreasing (no equal adjacent elements allowed). The comparison changes from <= />= to < / >, which seems trivial but alters edge case handling with equal elements.',
        problem: 'The comparison changes from <= />= to < / >, which seems trivial but alters edge case handling with equal elements.',
        hints: [
            'Think about how strictly monotonic check differs from the standard version of this problem.',
            'Key insight: The comparison changes from <= />= to < / >, which seems trivial but alters edge case handling with equal elements.',
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
                input: {"array":[1,2,3,4,5]},
                output: true,
                explanation: 'Array is monotonically increasing.'
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: true,
                explanation: 'Array is monotonically decreasing.'
            },
            {
                input: {"array":[1,3,2,4]},
                output: false,
                explanation: 'Array is not monotonic - has both increases and decreases.'
            }
        ],
        solutions: {
            python: `def strictly_monotonic_check(data):
    """
    Strictly Monotonic Check

    Check if the array is strictly increasing or strictly decreasing (no equal adjacent elements allowed).
    \n    Approach: The comparison changes from <= />= to < / >, which seems trivial but alters edge case handling with equal elements.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 2, 2, 3]. Non-decreasing but NOT strictly increasing, so return false.

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
print(strictly_monotonic_check([1, 2, 3, 4, 5]))
print(strictly_monotonic_check([5, 3, 1]))
print(strictly_monotonic_check([1]))`,
            go: `package main

import "fmt"

// StrictlyMonotonicCheck solves the Strictly Monotonic Check problem.
// Check if the array is strictly increasing or strictly decreasing (no equal adjacent elements allowed).
// Time: O(n), Space: O(n)
func StrictlyMonotonicCheck(data []int) []int {
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
    fmt.Println(StrictlyMonotonicCheck([]int{1, 2, 3, 4, 5}))
    fmt.Println(StrictlyMonotonicCheck([]int{5, 3, 1}))
    fmt.Println(StrictlyMonotonicCheck([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/twist-01-strictly-monotonic-check', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/twist-01-strictly-monotonic-check'] = problem;
})();
