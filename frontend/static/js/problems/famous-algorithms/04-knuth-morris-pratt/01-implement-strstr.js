/**
 * Implement strStr()
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: kmp-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Implement strStr()',
        difficulty: 'Easy',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n + m)',
            space: 'O(m)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "haystack": "sadbutsad",
        "needle": "sad"
},
        output: 0,
        explanation: 'The prefix function tells us the longest suffix of the matched portion that is also a prefix of the pattern. This allows intelligent backtracking during the text scan.'
    },
    {
        input: {
        "haystack": "leetcode",
        "needle": "leeto"
},
        output: -1,
        explanation: 'Precompute the failure function from the pattern. During matching, when a mismatch occurs, use the failure function to skip ahead without re-examining characters already matched.'
    }
        ],
        solutions: {
            python: `def strStr(haystack, needle):
    """
    Implement strStr() using KMP Algorithm

    Find first occurrence of needle in haystack.

    Time: O(n + m)
    Space: O(m) for the LPS array
    """
    if not needle:
        return 0

    # Build LPS (Longest Proper Prefix which is also Suffix) array
    def buildLPS(pattern):
        m = len(pattern)
        lps = [0] * m
        length = 0  # Length of previous longest prefix suffix
        i = 1

        while i < m:
            if pattern[i] == pattern[length]:
                length += 1
                lps[i] = length
                i += 1
            else:
                if length != 0:
                    length = lps[length - 1]
                else:
                    lps[i] = 0
                    i += 1
        return lps

    lps = buildLPS(needle)
    n, m = len(haystack), len(needle)
    i = j = 0  # Pointers for haystack and needle

    while i < n:
        if haystack[i] == needle[j]:
            i += 1
            j += 1

            if j == m:
                return i - j  # Found match

        else:
            if j != 0:
                j = lps[j - 1]  # Use LPS to skip
            else:
                i += 1

    return -1


# Test
if __name__ == "__main__":
    print(strStr("sadbutsad", "sad"))  # Output: 0
    print(strStr("leetcode", "leeto")) # Output: -1`,
            go: `package main

import "fmt"

// StrStr finds first occurrence of needle in haystack using KMP.
// Time: O(n + m), Space: O(m)
func StrStr(haystack string, needle string) int {
    if len(needle) == 0 {
        return 0
    }

    // Build LPS array
    buildLPS := func(pattern string) []int {
        m := len(pattern)
        lps := make([]int, m)
        length := 0
        i := 1

        for i < m {
            if pattern[i] == pattern[length] {
                length++
                lps[i] = length
                i++
            } else {
                if length != 0 {
                    length = lps[length-1]
                } else {
                    lps[i] = 0
                    i++
                }
            }
        }
        return lps
    }

    lps := buildLPS(needle)
    n, m := len(haystack), len(needle)
    i, j := 0, 0

    for i < n {
        if haystack[i] == needle[j] {
            i++
            j++

            if j == m {
                return i - j
            }
        } else {
            if j != 0 {
                j = lps[j-1]
            } else {
                i++
            }
        }
    }

    return -1
}

func main() {
    fmt.Println(StrStr("sadbutsad", "sad"))  // Output: 0
    fmt.Println(StrStr("leetcode", "leeto")) // Output: -1
}`
        },
        twists: [
            { id: '04-knuth-morris-pratt/01-implement-strstr/twist-01-last-occurrence', name: 'Last Occurrence', difficulty: 'Easy' },
            { id: '04-knuth-morris-pratt/01-implement-strstr/twist-02-all-occurrences', name: 'All Occurrences', difficulty: 'Medium' },
            { id: '04-knuth-morris-pratt/01-implement-strstr/twist-03-case-insensitive-search', name: 'Case-Insensitive Search', difficulty: 'Easy' },
            { id: '04-knuth-morris-pratt/01-implement-strstr/twist-04-rabin-karp-alternative', name: 'Rabin-Karp Alternative', difficulty: 'Medium' },
            { id: '04-knuth-morris-pratt/01-implement-strstr/twist-05-search-with-regex-dot', name: 'Search with Regex Dot', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/01-implement-strstr', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/01-implement-strstr'] = problem;

})();
