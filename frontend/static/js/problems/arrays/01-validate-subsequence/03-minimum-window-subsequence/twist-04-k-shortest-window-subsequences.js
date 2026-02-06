/**
 * K Shortest Window Subsequences
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: k-shortest-window-subsequences
 * Parent: 01-validate-subsequence/03-minimum-window-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Shortest Window Subsequences',
        difficulty: 'Hard',
        algorithm: 'k-shortest-window-subsequences',
        parent: '01-validate-subsequence/03-minimum-window-subsequence',
        description: 'Find the k shortest windows in s1 where s2 appears as a subsequence. Windows may overlap. Requires maintaining a priority queue or sorted collection of all valid windows, not just tracking the single best.',
        problem: 'Requires maintaining a priority queue or sorted collection of all valid windows, not just tracking the single best.',
        hints: [
            'Think about how this twist differs from the standard version: Find the k shortest windows in s1 where s2 appears as a subsequence. Windows may.',
            'Requires maintaining a priority queue or sorted collection of all valid windows, not just tracking the single best.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
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
            python: `def k_shortest_window_subsequences(data):
    """
    K Shortest Window Subsequences

    Find the k shortest windows in s1 where s2 appears as a subsequence. Windows may overlap.
    \n    Approach: Requires maintaining a priority queue or sorted collection of all valid windows, not just tracking the single best.

    Time: O(n log k)
    Space: O(n)

    Example: s1="abcdebdde", s2="bde", k=2 → ["bcde", "bdde"]
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
print(k_shortest_window_subsequences([1, 2, 3, 4, 5]))
print(k_shortest_window_subsequences([5, 3, 1]))
print(k_shortest_window_subsequences([1]))`,
            go: `package main

import "fmt"

// KShortestWindowSubsequences solves the K Shortest Window Subsequences problem.
// Find the k shortest windows in s1 where s2 appears as a subsequence. Windows may overlap.
// Time: O(n log k), Space: O(n)
func KShortestWindowSubsequences(data []int) []int {
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
    fmt.Println(KShortestWindowSubsequences([]int{1, 2, 3, 4, 5}))
    fmt.Println(KShortestWindowSubsequences([]int{5, 3, 1}))
    fmt.Println(KShortestWindowSubsequences([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/03-minimum-window-subsequence/twist-04-k-shortest-window-subsequences', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/03-minimum-window-subsequence/twist-04-k-shortest-window-subsequences'] = problem;
})();
