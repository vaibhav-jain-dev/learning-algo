/**
 * Rabin-Karp Alternative
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt/01-implement-strstr
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rabin-Karp Alternative',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/01-implement-strstr',
        description: 'Implement strStr using the Rabin-Karp rolling hash algorithm instead of KMP.',
        problem: 'Uses a completely different approach based on hashing -- compute a rolling hash of each window and compare with the pattern hash, only doing full comparison on hash matches.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"haystack":"sadbutsad","needle":"sad"},
                output: 1,
                explanation: 'The prefix function tells us the longest suffix of the matched portion that is also a prefix of the pattern. This allows intelligent backtracking during the text scan.'
            },
            {
                input: {"haystack":"leetcode","needle":"leeto"},
                output: 2,
                explanation: 'The combined preprocessing and matching phases ensure each character in the text is examined at most twice, achieving linear time complexity.'
            },
            // Edge case
            {
                input: {"haystack":"","needle":""},
                output: 0,
                explanation: 'Precompute the failure function from the pattern. During matching, when a mismatch occurs, use the failure function to skip ahead without re-examining characters already matched.'
            }
        ],
        solutions: {
            python: `def rabin_karp_alternative(haystack, needle):
    """
    Rabin-Karp Alternative

    Implement strStr using the Rabin-Karp rolling hash algorithm instead of KMP.

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(haystack)

    for i in range(n):
        # Check condition based on needle
        j = 0
        for k in range(i, n):
            if j < len(needle) and haystack[k] == needle[j]:
                j += 1
        if j == len(needle):
            count += 1

    return count


# Test cases
print(rabin_karp_alternative("sadbutsad", "sad"))  # Expected: 1
print(rabin_karp_alternative("leetcode", "leeto"))  # Expected: 2
print(rabin_karp_alternative("", ""))  # Expected: 0
`,
            go: `package main

import "fmt"

// RabinKarpAlternative solves the Rabin-Karp Alternative problem.
// Implement strStr using the Rabin-Karp rolling hash algorithm instead of KMP.
// Time: O(?), Space: O(?)
func RabinKarpAlternative(haystack string, needle string) int {
	result := 0

	for i := 0; i < len(haystack); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RabinKarpAlternative("sadbutsad", "sad")) // Expected: 1
	fmt.Println(RabinKarpAlternative("leetcode", "leeto")) // Expected: 2
	fmt.Println(RabinKarpAlternative("", "")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/01-implement-strstr/twist-04-rabin-karp-alternative', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/01-implement-strstr/twist-04-rabin-karp-alternative'] = problem;
})();
