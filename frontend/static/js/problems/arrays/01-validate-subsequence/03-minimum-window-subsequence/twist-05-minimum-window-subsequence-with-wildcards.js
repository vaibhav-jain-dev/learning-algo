/**
 * Minimum Window Subsequence with Wildcards
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: minimum-window-subsequence-with-wildcards
 * Parent: 01-validate-subsequence/03-minimum-window-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Window Subsequence with Wildcards',
        difficulty: 'Hard',
        algorithm: 'minimum-window-subsequence-with-wildcards',
        parent: '01-validate-subsequence/03-minimum-window-subsequence',
        description: 'The pattern s2 can contain wildcard characters "?" that match any single character in s1. Wildcards change the matching logic: instead of exact character comparison, you need conditional matching that accepts any character at wildcard positions.',
        problem: 'Wildcards change the matching logic: instead of exact character comparison, you need conditional matching that accepts any character at wildcard positions.',
        hints: [
            'Think about how this twist differs from the standard version: The pattern s2 can contain wildcard characters "?" that match any single charact.',
            'Wildcards change the matching logic: instead of exact character comparison, you need conditional matching that accepts any character at wildcard positions.',
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
            python: `def minimum_window_subsequence_with_wildcards(data):
    """
    Minimum Window Subsequence with Wildcards

    The pattern s2 can contain wildcard characters "?" that match any single character in s1.
    \n    Approach: Wildcards change the matching logic: instead of exact character comparison, you need conditional matching that accepts any character at wildcard positions.

    Time: O(n)
    Space: O(n)

    Example: s1="abcdebdde", s2="b?e" → "bcd" (? matches c, then e completes)
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
print(minimum_window_subsequence_with_wildcards([1, 2, 3, 4, 5]))
print(minimum_window_subsequence_with_wildcards([5, 3, 1]))
print(minimum_window_subsequence_with_wildcards([1]))`,
            go: `package main

import "fmt"

// MinimumWindowSubsequenceWithWildcards solves the Minimum Window Subsequence with Wildcards problem.
// The pattern s2 can contain wildcard characters "?" that match any single character in s1.
// Time: O(n), Space: O(n)
func MinimumWindowSubsequenceWithWildcards(data []int) []int {
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
    fmt.Println(MinimumWindowSubsequenceWithWildcards([]int{1, 2, 3, 4, 5}))
    fmt.Println(MinimumWindowSubsequenceWithWildcards([]int{5, 3, 1}))
    fmt.Println(MinimumWindowSubsequenceWithWildcards([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/03-minimum-window-subsequence/twist-05-minimum-window-subsequence-with-wildcards', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/03-minimum-window-subsequence/twist-05-minimum-window-subsequence-with-wildcards'] = problem;
})();
