/**
 * Case-Insensitive Search
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt/01-implement-strstr
 */
(function() {
    'use strict';

    const problem = {
        name: 'Case-Insensitive Search',
        difficulty: 'Easy',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/01-implement-strstr',
        description: 'Implement strStr with case-insensitive matching, where "Hello" matches "hello" and "HELLO".',
        problem: 'Requires normalizing characters during comparison while preserving the original index positions, affecting both LPS building and matching phases.',
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
            python: `def case_insensitive_search(haystack, needle):
    """
    Case-Insensitive Search

    Implement strStr with case-insensitive matching, where "Hello" matches "hello" and "HELLO".

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
print(case_insensitive_search("sadbutsad", "sad"))  # Expected: 1
print(case_insensitive_search("leetcode", "leeto"))  # Expected: 2
print(case_insensitive_search("", ""))  # Expected: 0
`,
            go: `package main

import "fmt"

// CaseInsensitiveSearch solves the Case-Insensitive Search problem.
// Implement strStr with case-insensitive matching, where "Hello" matches "hello" and "HELLO".
// Time: O(?), Space: O(?)
func CaseInsensitiveSearch(haystack string, needle string) int {
	result := 0

	for i := 0; i < len(haystack); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CaseInsensitiveSearch("sadbutsad", "sad")) // Expected: 1
	fmt.Println(CaseInsensitiveSearch("leetcode", "leeto")) // Expected: 2
	fmt.Println(CaseInsensitiveSearch("", "")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/01-implement-strstr/twist-03-case-insensitive-search', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/01-implement-strstr/twist-03-case-insensitive-search'] = problem;
})();
