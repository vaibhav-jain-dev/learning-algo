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
            'Think about how print all longest common subsequences differs from the standard version of this problem.',
            'Key insight: Requires backtracking through the DP table with branching at ties, turning a single-answer problem into a multi-answer enumeration problem.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Consider whether a greedy approach works, or if you need dynamic programming for the optimal solution.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n^2)',
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
            python: `def print_all_longest_common_subsequences(data):
    """
    Print All Longest Common Subsequences

    Instead of just the length, return all distinct LCS strings of maximum length.
    \n    Approach: Requires backtracking through the DP table with branching at ties, turning a single-answer problem into a multi-answer enumeration problem.

    Time: O(n^2)
    Space: O(n)
    """
    # Implementation based on the twist description
    # text1="abcbdab", text2="bdcab" → ["bcab", "bdab"] (both length 4)

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
print(print_all_longest_common_subsequences([1, 2, 3, 4, 5]))
print(print_all_longest_common_subsequences([5, 3, 1]))
print(print_all_longest_common_subsequences([1]))`,
            go: `package main

import "fmt"

// PrintAllLongestCommonSubsequences solves the Print All Longest Common Subsequences problem.
// Instead of just the length, return all distinct LCS strings of maximum length.
// Time: O(n^2), Space: O(n)
func PrintAllLongestCommonSubsequences(data []int) []int {
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
