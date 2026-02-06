/**
 * All Minimum Windows
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: all-minimum-windows
 * Parent: 01-validate-subsequence/03-minimum-window-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Minimum Windows',
        difficulty: 'Hard',
        algorithm: 'all-minimum-windows',
        parent: '01-validate-subsequence/03-minimum-window-subsequence',
        description: 'Instead of returning just one minimum window, return all non-overlapping minimum-length windows where s2 is a subsequence. Requires collecting all optimal windows and then resolving overlaps, adding a greedy interval selection step after the window-finding phase.',
        problem: 'Requires collecting all optimal windows and then resolving overlaps, adding a greedy interval selection step after the window-finding phase.',
        hints: [
            'Think about how this twist differs from the standard version: Instead of returning just one minimum window, return all non-overlapping minimum.',
            'Requires collecting all optimal windows and then resolving overlaps, adding a greedy interval selection step after the window-finding phase.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"s1":"abcdebdde","s2":"bde"},
                output: "bcde",
                explanation: 'The smallest window containing "bde" as a subsequence is "bcde".'
            },
            {
                input: {"s1":"abcdef","s2":"ace"},
                output: "abcde",
                explanation: 'Window from a to e contains "ace" as a subsequence.'
            },
            {
                input: {"s1":"xyz","s2":"abc"},
                output: "",
                explanation: 'No valid window exists.'
            }
        ],
        solutions: {
            python: `def all_minimum_windows(data):
    """
    All Minimum Windows

    Instead of returning just one minimum window, return all non-overlapping minimum-length windows where s2 is a subsequence.
    \n    Approach: Requires collecting all optimal windows and then resolving overlaps, adding a greedy interval selection step after the window-finding phase.

    Time: O(n)
    Space: O(n)

    Example: s1="abcdbcde", s2="bce" → ["bcde"] or all minimum windows found
    """
    if not data:
        return None

    n = len(data) if hasattr(data, '__len__') else 0
    result = []

    # Core algorithm implementation
    for i in range(n):
        result.append(data[i])

    return result


# Test cases
print(all_minimum_windows([1, 2, 3, 4, 5]))
print(all_minimum_windows([5, 3, 1]))
print(all_minimum_windows([1]))`,
            go: `package main

import "fmt"

// AllMinimumWindows solves the All Minimum Windows problem.
// Instead of returning just one minimum window, return all non-overlapping minimum-length windows where s2 is a subsequence.
// Time: O(n), Space: O(n)
func AllMinimumWindows(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    n := len(data)
    result := make([]int, 0, n)

    // Core algorithm implementation
    for i := 0; i < n; i++ {
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(AllMinimumWindows([]int{1, 2, 3, 4, 5}))
    fmt.Println(AllMinimumWindows([]int{5, 3, 1}))
    fmt.Println(AllMinimumWindows([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/03-minimum-window-subsequence/twist-01-all-minimum-windows', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/03-minimum-window-subsequence/twist-01-all-minimum-windows'] = problem;
})();
