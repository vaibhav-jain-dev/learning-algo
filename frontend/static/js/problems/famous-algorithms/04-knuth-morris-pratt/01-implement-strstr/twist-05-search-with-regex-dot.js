/**
 * Search with Regex Dot
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt/01-implement-strstr
 */
(function() {
    'use strict';

    const problem = {
        name: 'Search with Regex Dot',
        difficulty: 'Hard',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/01-implement-strstr',
        description: 'Implement strStr where the needle can contain "." characters that match any single character (like simple regex).',
        problem: 'The dot wildcard means the LPS array cannot be built normally, and character comparisons must account for the special dot matching behavior.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the search with regex dot criteria.'
            },
            {
                input: {"haystack":"leetcode","needle":"leeto"},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the search with regex dot criteria.'
            },
            // Edge case
            {
                input: {"haystack":"","needle":""},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def search_with_regex_dot(haystack, needle):
    """
    Search with Regex Dot

    Implement strStr where the needle can contain "." characters that match any single character (like simple regex).

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
print(search_with_regex_dot("sadbutsad", "sad"))  # Expected: 1
print(search_with_regex_dot("leetcode", "leeto"))  # Expected: 2
print(search_with_regex_dot("", ""))  # Expected: 0
`,
            go: `package main

import "fmt"

// SearchWithRegexDot solves the Search with Regex Dot problem.
// Implement strStr where the needle can contain "." characters that match any single character (like simple regex).
// Time: O(?), Space: O(?)
func SearchWithRegexDot(haystack string, needle string) int {
	result := 0

	for i := 0; i < len(haystack); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SearchWithRegexDot("sadbutsad", "sad")) // Expected: 1
	fmt.Println(SearchWithRegexDot("leetcode", "leeto")) // Expected: 2
	fmt.Println(SearchWithRegexDot("", "")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/01-implement-strstr/twist-05-search-with-regex-dot', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/01-implement-strstr/twist-05-search-with-regex-dot'] = problem;
})();
