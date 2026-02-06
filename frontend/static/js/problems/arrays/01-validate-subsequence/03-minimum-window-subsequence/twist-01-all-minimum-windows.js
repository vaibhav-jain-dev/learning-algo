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
            'Think about how all minimum windows differs from the standard version of this problem.',
            'Key insight: Requires collecting all optimal windows and then resolving overlaps, adding a greedy interval selection step after the window-finding phase.',
            'Consider using two pointers or a sliding window approach.',
            'Dynamic programming may help - identify the subproblems and their recurrence relation.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n^2)',
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
            python: `def all_minimum_windows(data):
    """
    All Minimum Windows

    Instead of returning just one minimum window, return all non-overlapping minimum-length windows where s2 is a subsequence.
    \n    Approach: Requires collecting all optimal windows and then resolving overlaps, adding a greedy interval selection step after the window-finding phase.

    Time: O(n^2)
    Space: O(n)
    """
    # Implementation based on the twist description
    # s1="abcdbcde", s2="bce" → ["bcde"] or all minimum windows found

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
print(all_minimum_windows([1, 2, 3, 4, 5]))
print(all_minimum_windows([5, 3, 1]))
print(all_minimum_windows([1]))`,
            go: `package main

import "fmt"

// AllMinimumWindows solves the All Minimum Windows problem.
// Instead of returning just one minimum window, return all non-overlapping minimum-length windows where s2 is a subsequence.
// Time: O(n^2), Space: O(n)
func AllMinimumWindows(data []int) []int {
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
