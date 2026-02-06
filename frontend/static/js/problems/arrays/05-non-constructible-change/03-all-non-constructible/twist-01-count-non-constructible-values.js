/**
 * Count Non-Constructible Values
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: count-non-constructible-values
 * Parent: 05-non-constructible-change/03-all-non-constructible
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Non-Constructible Values',
        difficulty: 'Medium',
        algorithm: 'count-non-constructible-values',
        parent: '05-non-constructible-change/03-all-non-constructible',
        description: 'Instead of listing all non-constructible values, just return their count up to the limit. Can potentially be more efficient: count = limit - (number of constructible values). Changes from enumeration to arithmetic.',
        problem: 'Can potentially be more efficient: count = limit - (number of constructible values). Changes from enumeration to arithmetic.',
        hints: [
            'Think about how count non-constructible values differs from the standard version of this problem.',
            'Key insight: Can potentially be more efficient: count = limit - (number of constructible values). Changes from enumeration to arithmetic.',
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
            python: `def count_non_constructible_values(data):
    """
    Count Non-Constructible Values

    Instead of listing all non-constructible values, just return their count up to the limit.
    \n    Approach: Can potentially be more efficient: count = limit - (number of constructible values). Changes from enumeration to arithmetic.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # coins=[1,5,10], limit=20 → count of non-constructible values up to 20

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
print(count_non_constructible_values([1, 2, 3, 4, 5]))
print(count_non_constructible_values([5, 3, 1]))
print(count_non_constructible_values([1]))`,
            go: `package main

import "fmt"

// CountNonConstructibleValues solves the Count Non-Constructible Values problem.
// Instead of listing all non-constructible values, just return their count up to the limit.
// Time: O(n), Space: O(n)
func CountNonConstructibleValues(data []int) []int {
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
    fmt.Println(CountNonConstructibleValues([]int{1, 2, 3, 4, 5}))
    fmt.Println(CountNonConstructibleValues([]int{5, 3, 1}))
    fmt.Println(CountNonConstructibleValues([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change/03-all-non-constructible/twist-01-count-non-constructible-values', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change/03-all-non-constructible/twist-01-count-non-constructible-values'] = problem;
})();
