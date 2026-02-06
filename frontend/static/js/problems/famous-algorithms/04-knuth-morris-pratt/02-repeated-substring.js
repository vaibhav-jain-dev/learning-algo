/**
 * Repeated Substring Pattern
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: kmp-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Repeated Substring Pattern',
        difficulty: 'Easy',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'Given a string s, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.',
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
        "s": "abab"
},
        output: true,
        explanation: 'Processing the input data produces the output. For input s=abab, the result is true.'
    },
    {
        input: {
        "s": "abcabcabcabc"
},
        output: true,
        explanation: 'Processing the input data produces the output. For input s=abcabcabcabc, the result is true.'
    }
        ],
        solutions: {
            python: `def repeatedSubstringPattern(s):
    """
    Repeated Substring Pattern using KMP

    Key insight: If s can be constructed from repeated substring,
    then the LPS value at the last position tells us the pattern length.
    Pattern length = n - lps[n-1], and n must be divisible by it.

    Time: O(n)
    Space: O(n)
    """
    n = len(s)
    if n == 0:
        return False

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

    # Check if string can be formed by repeating a pattern
    # Pattern length = n - lps[n-1]
    pattern_len = n - lps[n - 1]

    # Pattern must divide string length and lps must be non-zero
    return lps[n - 1] > 0 and n % pattern_len == 0


# Test
if __name__ == "__main__":
    print(repeatedSubstringPattern("abab"))        # Output: True
    print(repeatedSubstringPattern("abcabcabcabc")) # Output: True
    print(repeatedSubstringPattern("abc"))          # Output: False`,
            go: `package main

import "fmt"

// RepeatedSubstringPattern checks if s can be constructed by repeating a substring.
// Time: O(n), Space: O(n)
func RepeatedSubstringPattern(s string) bool {
    n := len(s)
    if n == 0 {
        return false
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

    // Check if string can be formed by repeating a pattern
    patternLen := n - lps[n-1]

    return lps[n-1] > 0 && n%patternLen == 0
}

func main() {
    fmt.Println(RepeatedSubstringPattern("abab"))         // Output: true
    fmt.Println(RepeatedSubstringPattern("abcabcabcabc")) // Output: true
    fmt.Println(RepeatedSubstringPattern("abc"))          // Output: false
}`
        },
        twists: [
            { title: 'Find the Repeating Unit', difficulty: 'Easy', description: 'If the string can be constructed from a repeated substring, return that shortest repeating unit.', whyDifferent: 'Extends from boolean detection to extraction -- use the same LPS approach but return the substring s[0:patternLen] instead of just true/false.', example: 'For "abcabcabc", return "abc". For "abab", return "ab". For "abc", return "" (no repeating unit).' },
            { title: 'Minimum Appends for Repetition', difficulty: 'Medium', description: 'Find the minimum number of characters to append to the string so that it becomes a repeated pattern.', whyDifferent: 'Uses the LPS array to find the longest suffix-prefix overlap, then computes how many more characters are needed to complete the next repetition.', example: 'For "abcab", the pattern is "abc" and we need to append "c" (1 character) to get "abcabc".' },
            { title: 'Count Repetitions', difficulty: 'Easy', description: 'If the string is a repeated pattern, return how many times the base pattern is repeated.', whyDifferent: 'After confirming the pattern exists using KMP/LPS, simply divide the string length by the pattern length to get the count.', example: 'For "abcabcabc", the pattern "abc" repeats 3 times. Return 3.' },
            { title: 'Double String Method', difficulty: 'Medium', description: 'Solve the repeated substring problem by checking if s exists in (s + s) with the first and last characters removed.', whyDifferent: 'Uses a completely different mathematical insight -- if s is a repeated pattern, removing a character from each end of s+s still contains s. No LPS needed.', example: 'For s="abab", s+s="abababab". Remove first and last: "babababa". Does "abab" appear in it? Yes, so it is a repeated pattern.' },
            { title: 'Longest Repeated Substring', difficulty: 'Hard', description: 'Find the longest substring that appears at least twice in the string (not necessarily as a full repetition pattern).', whyDifferent: 'A fundamentally different problem that requires binary search + rolling hash or suffix array approaches, not just LPS analysis.', example: 'For "banana", the longest repeated substring is "ana" which appears at positions 1 and 3.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/02-repeated-substring', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/02-repeated-substring'] = problem;

})();
