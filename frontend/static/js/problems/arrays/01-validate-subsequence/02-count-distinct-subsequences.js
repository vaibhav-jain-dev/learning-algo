/**
 * Count Distinct Subsequences
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: dp-2d
 * Parent: 01-validate-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Distinct Subsequences',
        difficulty: 'Hard',
        algorithm: 'dp-2d',
        parent: '01-validate-subsequence',
        description: 'Given two strings s and t, return the number of distinct subsequences of s which equals t. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements. The answer is guaranteed to fit in a 32-bit signed integer.',
        problem: 'This is a classic dynamic programming problem. We use a 2D DP table where dp[i][j] represents the number of ways to form t[0:j] using s[0:i]. For each character, we have two choices: either we use the current character of s if it matches t, or we skip it. The recurrence relation is: if s[i-1] == t[j-1], dp[i][j] = dp[i-1][j-1] + dp[i-1][j] (use it or skip it). Otherwise, dp[i][j] = dp[i-1][j] (must skip). The key insight is that we can optimize space to O(m) by iterating j backwards.',
        hints: [
            'Think about this as a subsequence matching problem - for each character in s, decide whether to include it or not.',
            'Consider using dynamic programming. What state do you need? dp[i][j] = ways to match t[0:j] using s[0:i].',
            'When s[i] == t[j], you have two choices: use this match (dp[i-1][j-1]) or skip this character of s (dp[i-1][j]).',
            'Base case: dp[i][0] = 1 for all i (empty t is always achievable). dp[0][j] = 0 for j > 0 (empty s cannot form non-empty t).',
            'The final answer is dp[len(s)][len(t)]. Can you optimize space to O(m)?'
        ],
        complexity: {
            time: 'O(n × m)',
            space: 'O(m)'
        },
        examples: [
            {
                input: { s: 'rabbbit', t: 'rabbit' },
                output: 3,
                explanation: 'There are 3 ways to choose "rabbit" from "rabbbit": rabb_bit, rab_bbit, ra_bbbit (where _ shows the skipped b). The DP table fills by matching characters and counting paths.'
            },
            {
                input: { s: 'babgbag', t: 'bag' },
                output: 5,
                explanation: 'The 5 ways are: ba_g___, ba___ag, b__gb_g, _a_gbag (partial matches using different characters). Each b can pair with different a and g combinations.'
            }
        ],
        solutions: {
            python: `def numDistinct(s: str, t: str) -> int:
    """
    Count distinct subsequences of s that equal t.
    Uses space-optimized DP - O(m) space instead of O(n*m).
    """
    m, n = len(s), len(t)

    # dp[j] = number of ways to form t[0:j] using s[0:i]
    # We iterate j backwards to use previous values correctly
    dp = [0] * (n + 1)
    dp[0] = 1  # Empty t can always be formed

    for i in range(1, m + 1):
        # Iterate backwards to avoid using updated values
        for j in range(min(i, n), 0, -1):
            if s[i-1] == t[j-1]:
                # Use this match + skip this character
                dp[j] += dp[j-1]
            # If no match, dp[j] stays the same (skip s[i-1])

    return dp[n]


# Alternative: Full 2D DP for clarity
def numDistinct2D(s: str, t: str) -> int:
    m, n = len(s), len(t)

    # dp[i][j] = ways to form t[0:j] using s[0:i]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base case: empty t can be formed from any prefix of s
    for i in range(m + 1):
        dp[i][0] = 1

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s[i-1] == t[j-1]:
                # Match: use it or skip it
                dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
            else:
                # No match: must skip s[i-1]
                dp[i][j] = dp[i-1][j]

    return dp[m][n]


# Test
print(numDistinct("rabbbit", "rabbit"))  # 3
print(numDistinct("babgbag", "bag"))      # 5`,
            go: `package main

import "fmt"

// numDistinct counts distinct subsequences of s that equal t.
// Space-optimized DP solution - O(m) space.
func numDistinct(s, t string) int {
    m, n := len(s), len(t)

    // dp[j] = number of ways to form t[0:j] using s[0:i]
    dp := make([]int, n+1)
    dp[0] = 1 // Empty t can always be formed

    for i := 1; i <= m; i++ {
        // Iterate backwards to avoid using updated values
        for j := min(i, n); j >= 1; j-- {
            if s[i-1] == t[j-1] {
                // Match: use it or skip it
                dp[j] += dp[j-1]
            }
            // If no match, dp[j] stays the same
        }
    }

    return dp[n]
}

// numDistinct2D is the full 2D DP version for clarity
func numDistinct2D(s, t string) int {
    m, n := len(s), len(t)

    // dp[i][j] = ways to form t[0:j] using s[0:i]
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
        dp[i][0] = 1 // Empty t can be formed from any prefix
    }

    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if s[i-1] == t[j-1] {
                // Match: use it or skip it
                dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
            } else {
                // No match: must skip s[i-1]
                dp[i][j] = dp[i-1][j]
            }
        }
    }

    return dp[m][n]
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func main() {
    fmt.Println(numDistinct("rabbbit", "rabbit")) // 3
    fmt.Println(numDistinct("babgbag", "bag"))    // 5
}`
        },
        twists: [
            { id: '01-validate-subsequence/02-count-distinct-subsequences/twist-01-count-subsequences-with-at-most-k-gaps', name: 'Count Subsequences with At Most K Gaps', difficulty: 'Hard' },
            { id: '01-validate-subsequence/02-count-distinct-subsequences/twist-02-minimum-deletions-to-reach-exactly-k-subsequences', name: 'Minimum Deletions to Reach Exactly K Subsequences', difficulty: 'Very Hard' },
            { id: '01-validate-subsequence/02-count-distinct-subsequences/twist-03-count-distinct-subsequences-modulo-large-prime', name: 'Count Distinct Subsequences Modulo Large Prime', difficulty: 'Medium' },
            { id: '01-validate-subsequence/02-count-distinct-subsequences/twist-04-count-common-subsequences-of-two-strings', name: 'Count Common Subsequences of Two Strings', difficulty: 'Hard' },
            { id: '01-validate-subsequence/02-count-distinct-subsequences/twist-05-distinct-subsequences-with-character-substitution-budget', name: 'Distinct Subsequences with Character Substitution Budget', difficulty: 'Very Hard' }
        ],
        similar: []
    };

    // Register with ProblemRenderer - as sub-problem of 01-validate-subsequence
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/02-count-distinct-subsequences', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/02-count-distinct-subsequences'] = problem;

})();
