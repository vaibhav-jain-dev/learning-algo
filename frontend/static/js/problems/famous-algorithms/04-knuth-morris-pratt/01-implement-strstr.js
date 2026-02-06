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
        explanation: 'Processing the input data produces the output. For input haystack=sadbutsad, needle=sad, the result is 0.'
    },
    {
        input: {
        "haystack": "leetcode",
        "needle": "leeto"
},
        output: -1,
        explanation: 'Processing the input data produces the output. For input haystack=leetcode, needle=leeto, the result is -1.'
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
            { title: 'Last Occurrence', difficulty: 'Easy', description: 'Find the index of the last occurrence of needle in haystack, instead of the first.', whyDifferent: 'Requires running KMP to completion instead of stopping at the first match, keeping track of the most recent match position found.', example: 'For haystack="sadbutsad", needle="sad", return 6 (last occurrence) instead of 0 (first occurrence).' },
            { title: 'All Occurrences', difficulty: 'Medium', description: 'Find all starting indices where needle appears in haystack, including overlapping occurrences.', whyDifferent: 'After each match, instead of returning immediately, use the LPS array to continue searching from the appropriate position for overlapping matches.', example: 'For haystack="AAAA", needle="AA", return [0,1,2] for all overlapping positions.' },
            { title: 'Case-Insensitive Search', difficulty: 'Easy', description: 'Implement strStr with case-insensitive matching, where "Hello" matches "hello" and "HELLO".', whyDifferent: 'Requires normalizing characters during comparison while preserving the original index positions, affecting both LPS building and matching phases.', example: 'For haystack="HelloWorld", needle="world", return 5 despite the case difference.' },
            { title: 'Rabin-Karp Alternative', difficulty: 'Medium', description: 'Implement strStr using the Rabin-Karp rolling hash algorithm instead of KMP.', whyDifferent: 'Uses a completely different approach based on hashing -- compute a rolling hash of each window and compare with the pattern hash, only doing full comparison on hash matches.', example: 'Hash "sad" = h1. Slide window over "sadbutsad", comparing rolling hash with h1. On match, verify character by character.' },
            { title: 'Search with Regex Dot', difficulty: 'Hard', description: 'Implement strStr where the needle can contain "." characters that match any single character (like simple regex).', whyDifferent: 'The dot wildcard means the LPS array cannot be built normally, and character comparisons must account for the special dot matching behavior.', example: 'For haystack="sadbutsad", needle="s.d", return 0 because "sad" matches "s.d" where . matches a.' }
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
