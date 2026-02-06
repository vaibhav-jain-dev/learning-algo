/**
 * Minimum Window Subsequence
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: two-pointer-sliding
 * Parent: 01-validate-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Window Subsequence',
        difficulty: 'Hard',
        algorithm: 'two-pointer-sliding',
        parent: '01-validate-subsequence',
        description: 'Given strings s1 and s2, return the minimum contiguous substring of s1 such that s2 is a subsequence of that substring. If there is no such window, return an empty string. If there are multiple answer windows of the same length, return the one with the smallest starting index.',
        problem: 'Use a two-pointer/sliding window approach. First, find a valid window by iterating forward through s1 while matching characters to s2. Once we find a complete match, we backtrack from the end to find the minimum window starting point. Then continue searching for potentially smaller windows. The key insight is that after finding a valid window, we can optimize by contracting from the left.',
        hints: [
            'Start with two pointers: one for s1 (i) and one for s2 (j). Move i forward, incrementing j when characters match.',
            'When j reaches the end of s2, you\'ve found a valid window ending at i.',
            'To minimize the window, backtrack from the end: decrement i and j when s1[i] == s2[j].',
            'The window start is where j reaches -1. Record this window if it\'s smaller than the previous best.',
            'Continue searching from the start position + 1 for potentially smaller windows.'
        ],
        complexity: {
            time: 'O(n × m)',
            space: 'O(1)'
        },
        examples: [
            {
                input: { s1: 'abcdebdde', s2: 'bde' },
                output: 'bcde',
                explanation: '"bcde" is the smallest window where "bde" is a subsequence. There\'s also "bdde" but "bcde" appears first and is shorter.'
            },
            {
                input: { s1: 'jmeqksfrsdcmsiwvaovztaqenprpvnbstl', s2: 'u' },
                output: '',
                explanation: 'There is no \'u\' in s1, so no valid window exists.'
            },
            {
                input: { s1: 'abcdef', s2: 'ace' },
                output: 'abcde',
                explanation: 'The window from \'a\' to \'e\' (positions 0-4) contains "ace" as a subsequence.'
            }
        ],
        solutions: {
            python: `def minWindow(s1: str, s2: str) -> str:
    """
    Find minimum window substring of s1 where s2 is a subsequence.
    Two-pointer approach: find window, then contract.
    """
    m, n = len(s1), len(s2)
    min_len = float('inf')
    result = ""

    i = 0
    while i < m:
        j = 0

        # Forward pass: find a valid window
        while i < m:
            if s1[i] == s2[j]:
                j += 1
            if j == n:
                break
            i += 1

        if j < n:  # No valid window found
            break

        # Found valid window ending at i
        end = i

        # Backward pass: minimize the window
        j = n - 1
        while j >= 0:
            if s1[i] == s2[j]:
                j -= 1
            i -= 1

        i += 1  # i now points to window start
        start = i

        # Update result if this window is smaller
        window_len = end - start + 1
        if window_len < min_len:
            min_len = window_len
            result = s1[start:end + 1]

        # Continue searching from start + 1
        i = start + 1

    return result


# Alternative: DP approach for reference
def minWindowDP(s1: str, s2: str) -> str:
    """DP solution: dp[i][j] = starting index of shortest window
    ending at s1[i] that contains s2[0:j] as subsequence."""
    m, n = len(s1), len(s2)

    # dp[i][j] = start index, -1 if not possible
    dp = [[-1] * (n + 1) for _ in range(m + 1)]

    # Base case: empty s2 can match at any position
    for i in range(m + 1):
        dp[i][0] = i

    min_len = float('inf')
    result = ""

    for i in range(1, m + 1):
        for j in range(1, min(i, n) + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = dp[i-1][j]

        # Check if we found a valid window
        if dp[i][n] != -1:
            start = dp[i][n]
            window_len = i - start
            if window_len < min_len:
                min_len = window_len
                result = s1[start:i]

    return result


# Test
print(minWindow("abcdebdde", "bde"))  # "bcde"
print(minWindow("jmeqksfrsdcmsiwvaovztaqenprpvnbstl", "u"))  # ""
print(minWindow("abcdef", "ace"))     # "abcde"`,
            go: `package main

import "fmt"

// minWindow finds minimum window substring of s1 where s2 is a subsequence.
// Two-pointer approach: find window, then contract.
func minWindow(s1, s2 string) string {
    m, n := len(s1), len(s2)
    minLen := m + 1
    result := ""

    i := 0
    for i < m {
        j := 0

        // Forward pass: find a valid window
        for i < m {
            if s1[i] == s2[j] {
                j++
            }
            if j == n {
                break
            }
            i++
        }

        if j < n { // No valid window found
            break
        }

        // Found valid window ending at i
        end := i

        // Backward pass: minimize the window
        j = n - 1
        for j >= 0 {
            if s1[i] == s2[j] {
                j--
            }
            i--
        }

        i++ // i now points to window start
        start := i

        // Update result if this window is smaller
        windowLen := end - start + 1
        if windowLen < minLen {
            minLen = windowLen
            result = s1[start : end+1]
        }

        // Continue searching from start + 1
        i = start + 1
    }

    return result
}

// minWindowDP is the DP approach solution.
// dp[i][j] = starting index of shortest window ending at s1[i]
// that contains s2[0:j] as subsequence.
func minWindowDP(s1, s2 string) string {
    m, n := len(s1), len(s2)

    // dp[i][j] = start index, -1 if not possible
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
        dp[i][0] = i // Empty s2 matches at position i
    }

    minLen := m + 1
    result := ""

    for i := 1; i <= m; i++ {
        for j := 1; j <= min(i, n); j++ {
            if s1[i-1] == s2[j-1] {
                dp[i][j] = dp[i-1][j-1]
            } else {
                dp[i][j] = dp[i-1][j]
            }
        }

        // Check if we found a valid window
        if dp[i][n] != -1 {
            start := dp[i][n]
            windowLen := i - start
            if windowLen < minLen {
                minLen = windowLen
                result = s1[start:i]
            }
        }
    }

    return result
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func main() {
    fmt.Println(minWindow("abcdebdde", "bde"))                     // "bcde"
    fmt.Println(minWindow("jmeqksfrsdcmsiwvaovztaqenprpvnbstl", "u")) // ""
    fmt.Println(minWindow("abcdef", "ace"))                        // "abcde"
}`
        },
        twists: [
            {
                title: 'All Minimum Windows',
                difficulty: 'Hard',
                description: 'Instead of returning just one minimum window, return all non-overlapping minimum-length windows where s2 is a subsequence.',
                whyDifferent: 'Requires collecting all optimal windows and then resolving overlaps, adding a greedy interval selection step after the window-finding phase.',
                example: 's1="abcdbcde", s2="bce" → ["bcde"] or all minimum windows found'
            },
            {
                title: 'Minimum Window with Character Order Relaxed',
                difficulty: 'Medium',
                description: 'Find the minimum window that contains all characters of s2 (as an anagram, not a subsequence).',
                whyDifferent: 'Changes from subsequence matching to frequency matching, converting the problem to a classic sliding window with character counts.',
                example: 's1="adobecodebanc", s2="abc" → "banc" (contains a, b, c in any order)'
            },
            {
                title: 'Minimum Window Subsequence in Circular String',
                difficulty: 'Very Hard',
                description: 'The string s1 is circular. Find the minimum window where s2 is a subsequence, allowing wrap-around.',
                whyDifferent: 'The circular nature means windows can span the wrap-around point, requiring concatenation tricks or careful modular index handling.',
                example: 's1="cdeab", s2="abc" → "abc" via wrap-around (a at index 3, b at index 4, c at index 0)'
            },
            {
                title: 'K Shortest Window Subsequences',
                difficulty: 'Hard',
                description: 'Find the k shortest windows in s1 where s2 appears as a subsequence. Windows may overlap.',
                whyDifferent: 'Requires maintaining a priority queue or sorted collection of all valid windows, not just tracking the single best.',
                example: 's1="abcdebdde", s2="bde", k=2 → ["bcde", "bdde"]'
            },
            {
                title: 'Minimum Window Subsequence with Wildcards',
                difficulty: 'Hard',
                description: 'The pattern s2 can contain wildcard characters "?" that match any single character in s1.',
                whyDifferent: 'Wildcards change the matching logic: instead of exact character comparison, you need conditional matching that accepts any character at wildcard positions.',
                example: 's1="abcdebdde", s2="b?e" → "bcd" (? matches c, then e completes)'
            }
        ],
        similar: []
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/03-minimum-window-subsequence', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/03-minimum-window-subsequence'] = problem;

})();
