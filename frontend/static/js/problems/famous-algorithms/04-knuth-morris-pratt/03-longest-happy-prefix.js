/**
 * Longest Happy Prefix
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kmp-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Happy Prefix',
        difficulty: 'Hard',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'A string is called a happy prefix if it is a non-empty prefix which is also a suffix (excluding itself). Given a string s, return the longest happy prefix. Return an empty string if no such prefix exists.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
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
        "s": "level"
},
        output: "l",
        explanation: 'Processing the input data produces the output. For input s=level, the result is l.'
    },
    {
        input: {
        "s": "ababab"
},
        output: "abab",
        explanation: 'Processing the input data produces the output. For input s=ababab, the result is abab.'
    }
        ],
        solutions: {
            python: `def longestPrefix(s):
    """
    Longest Happy Prefix using KMP LPS Array

    A "happy prefix" is a prefix that is also a suffix (excluding itself).
    The LPS array at the last position gives us exactly this.

    Time: O(n)
    Space: O(n)
    """
    n = len(s)
    if n == 0:
        return ""

    # Build LPS array
    lps = [0] * n
    length = 0
    i = 1

    while i < n:
        if s[i] == s[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1

    # The last value of LPS is the length of longest happy prefix
    happy_len = lps[n - 1]

    return s[:happy_len]


# Test
if __name__ == "__main__":
    print(longestPrefix("level"))   # Output: "l"
    print(longestPrefix("ababab"))  # Output: "abab"
    print(longestPrefix("abc"))     # Output: ""`,
            go: `package main

import "fmt"

// LongestPrefix finds the longest happy prefix of s.
// Time: O(n), Space: O(n)
func LongestPrefix(s string) string {
    n := len(s)
    if n == 0 {
        return ""
    }

    // Build LPS array
    lps := make([]int, n)
    length := 0
    i := 1

    for i < n {
        if s[i] == s[length] {
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

    // The last value of LPS is the length of longest happy prefix
    happyLen := lps[n-1]

    return s[:happyLen]
}

func main() {
    fmt.Println(LongestPrefix("level"))  // Output: "l"
    fmt.Println(LongestPrefix("ababab")) // Output: "abab"
    fmt.Println(LongestPrefix("abc"))    // Output: ""
}`
        },
        twists: [
            { id: '04-knuth-morris-pratt/03-longest-happy-prefix/twist-01-all-happy-prefixes', name: 'All Happy Prefixes', difficulty: 'Medium' },
            { id: '04-knuth-morris-pratt/03-longest-happy-prefix/twist-02-rolling-hash-approach', name: 'Rolling Hash Approach', difficulty: 'Medium' },
            { id: '04-knuth-morris-pratt/03-longest-happy-prefix/twist-03-longest-happy-suffix', name: 'Longest Happy Suffix', difficulty: 'Easy' },
            { id: '04-knuth-morris-pratt/03-longest-happy-prefix/twist-04-count-distinct-happy-prefixes', name: 'Count Distinct Happy Prefixes', difficulty: 'Medium' },
            { id: '04-knuth-morris-pratt/03-longest-happy-prefix/twist-05-shortest-period', name: 'Shortest Period', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/03-longest-happy-prefix', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/03-longest-happy-prefix'] = problem;

})();
