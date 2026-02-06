/**
 * Longest Common Subsequence
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: dp-2d
 * Parent: 01-validate-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Common Subsequence',
        difficulty: 'Medium',
        algorithm: 'dp-2d',
        parent: '01-validate-subsequence',
        description: 'Given two strings text1 and text2, return the length of their longest common subsequence. A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous. If there is no common subsequence, return 0.',
        problem: 'This is a classic 2D dynamic programming problem. We build a table where dp[i][j] represents the LCS length of text1[0:i] and text2[0:j]. If characters match, we add 1 to the diagonal value. Otherwise, we take the max from the left or top cell. The key insight is that matching characters extend the LCS, while mismatches inherit the best result so far.',
        hints: [
            'Consider what happens when the last characters of both strings match vs. when they don\'t match.',
            'If text1[i] == text2[j], we can extend the LCS of text1[0:i-1] and text2[0:j-1] by 1.',
            'If they don\'t match, the LCS is the max of: LCS(text1[0:i-1], text2[0:j]) or LCS(text1[0:i], text2[0:j-1]).',
            'Use a 2D table: dp[i][j] = length of LCS for text1[0:i] and text2[0:j].',
            'Can you optimize space from O(n×m) to O(min(n,m))?'
        ],
        complexity: {
            time: 'O(n × m)',
            space: 'O(n × m)'
        },
        examples: [
            {
                input: { text1: 'abcde', text2: 'ace' },
                output: 3,
                explanation: 'The longest common subsequence is "ace" with length 3. Characters a, c, e appear in the same order in both strings.'
            },
            {
                input: { text1: 'abc', text2: 'abc' },
                output: 3,
                explanation: 'The entire string "abc" is a common subsequence. When strings are identical, the LCS equals the string length.'
            },
            {
                input: { text1: 'abc', text2: 'def' },
                output: 0,
                explanation: 'There are no common characters, so the LCS length is 0.'
            }
        ],
        solutions: {
            python: `def longestCommonSubsequence(text1: str, text2: str) -> int:
    """
    Find the length of the longest common subsequence.
    Uses 2D DP where dp[i][j] = LCS length of text1[0:i] and text2[0:j].
    """
    m, n = len(text1), len(text2)

    # dp[i][j] = LCS of text1[0:i] and text2[0:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                # Characters match - extend LCS from diagonal
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                # No match - take best from left or top
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]


# Space-optimized version - O(min(m,n)) space
def longestCommonSubsequenceOptimized(text1: str, text2: str) -> int:
    # Ensure text2 is the shorter string for space optimization
    if len(text1) < len(text2):
        text1, text2 = text2, text1

    m, n = len(text1), len(text2)
    prev = [0] * (n + 1)
    curr = [0] * (n + 1)

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                curr[j] = prev[j-1] + 1
            else:
                curr[j] = max(prev[j], curr[j-1])
        prev, curr = curr, [0] * (n + 1)

    return prev[n]


# Test
print(longestCommonSubsequence("abcde", "ace"))  # 3
print(longestCommonSubsequence("abc", "abc"))    # 3
print(longestCommonSubsequence("abc", "def"))    # 0`,
            go: `package main

import "fmt"

// longestCommonSubsequence finds the length of the longest common subsequence.
// Uses 2D DP where dp[i][j] = LCS length of text1[0:i] and text2[0:j].
func longestCommonSubsequence(text1, text2 string) int {
    m, n := len(text1), len(text2)

    // dp[i][j] = LCS of text1[0:i] and text2[0:j]
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }

    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if text1[i-1] == text2[j-1] {
                // Characters match - extend LCS from diagonal
                dp[i][j] = dp[i-1][j-1] + 1
            } else {
                // No match - take best from left or top
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
            }
        }
    }

    return dp[m][n]
}

// Space-optimized version - O(min(m,n)) space
func longestCommonSubsequenceOptimized(text1, text2 string) int {
    // Ensure text2 is shorter for space optimization
    if len(text1) < len(text2) {
        text1, text2 = text2, text1
    }

    m, n := len(text1), len(text2)
    prev := make([]int, n+1)
    curr := make([]int, n+1)

    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if text1[i-1] == text2[j-1] {
                curr[j] = prev[j-1] + 1
            } else {
                curr[j] = max(prev[j], curr[j-1])
            }
        }
        prev, curr = curr, make([]int, n+1)
    }

    return prev[n]
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func main() {
    fmt.Println(longestCommonSubsequence("abcde", "ace")) // 3
    fmt.Println(longestCommonSubsequence("abc", "abc"))   // 3
    fmt.Println(longestCommonSubsequence("abc", "def"))   // 0
}`
        },
        twists: [
            { id: '01-validate-subsequence/01-longest-common-subsequence/twist-01-longest-common-subsequence-of-three-strings', name: 'Longest Common Subsequence of Three Strings', difficulty: 'Hard' },
            { id: '01-validate-subsequence/01-longest-common-subsequence/twist-02-print-all-longest-common-subsequences', name: 'Print All Longest Common Subsequences', difficulty: 'Hard' },
            { id: '01-validate-subsequence/01-longest-common-subsequence/twist-03-lcs-with-at-most-k-mismatches', name: 'LCS with At Most K Mismatches', difficulty: 'Hard' },
            { id: '01-validate-subsequence/01-longest-common-subsequence/twist-04-shortest-common-supersequence', name: 'Shortest Common Supersequence', difficulty: 'Hard' },
            { id: '01-validate-subsequence/01-longest-common-subsequence/twist-05-lcs-on-circular-strings', name: 'LCS on Circular Strings', difficulty: 'Very Hard' }
        ],
        similar: []
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/01-longest-common-subsequence', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/01-longest-common-subsequence'] = problem;

})();
