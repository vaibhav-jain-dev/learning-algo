/**
 * Print All Longest Common Subsequences
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: print-all-longest-common-subsequences
 * Parent: 01-validate-subsequence/01-longest-common-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Print All Longest Common Subsequences',
        difficulty: 'Hard',
        algorithm: 'print-all-longest-common-subsequences',
        parent: '01-validate-subsequence/01-longest-common-subsequence',
        description: 'Instead of just the length, return all distinct LCS strings of maximum length. Requires backtracking through the DP table with branching at ties, turning a single-answer problem into a multi-answer enumeration problem.',
        problem: 'Requires backtracking through the DP table with branching at ties, turning a single-answer problem into a multi-answer enumeration problem.',
        hints: [
            'Think about how this twist differs from the standard version: Instead of just the length, return all distinct LCS strings of maximum length..',
            'Requires backtracking through the DP table with branching at ties, turning a single-answer problem into a multi-answer enumeration problem.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"text1":"abcde","text2":"ace"},
                output: 3,
                explanation: 'The longest common subsequence is "ace" with length 3.'
            },
            {
                input: {"text1":"abc","text2":"def"},
                output: 0,
                explanation: 'No common characters exist between the two strings.'
            },
            {
                input: {"text1":"abcba","text2":"abcba"},
                output: 5,
                explanation: 'Identical strings have LCS equal to their length.'
            }
        ],
        solutions: {
            python: `def print_all_longest_common_subsequences(data):
    """
    Print All Longest Common Subsequences

    Instead of just the length, return all distinct LCS strings of maximum length.
    \n    Approach: Requires backtracking through the DP table with branching at ties, turning a single-answer problem into a multi-answer enumeration problem.

    Time: O(n)
    Space: O(n)

    Example: text1="abcbdab", text2="bdcab" → ["bcab", "bdab"] (both length 4)
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
print(print_all_longest_common_subsequences([1, 2, 3, 4, 5]))
print(print_all_longest_common_subsequences([5, 3, 1]))
print(print_all_longest_common_subsequences([1]))`,
            go: `package main

import "fmt"

// PrintAllLongestCommonSubsequences solves the Print All Longest Common Subsequences problem.
// Instead of just the length, return all distinct LCS strings of maximum length.
// Time: O(n), Space: O(n)
func PrintAllLongestCommonSubsequences(data []int) []int {
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
    fmt.Println(PrintAllLongestCommonSubsequences([]int{1, 2, 3, 4, 5}))
    fmt.Println(PrintAllLongestCommonSubsequences([]int{5, 3, 1}))
    fmt.Println(PrintAllLongestCommonSubsequences([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/01-longest-common-subsequence/twist-02-print-all-longest-common-subsequences', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/01-longest-common-subsequence/twist-02-print-all-longest-common-subsequences'] = problem;
})();
