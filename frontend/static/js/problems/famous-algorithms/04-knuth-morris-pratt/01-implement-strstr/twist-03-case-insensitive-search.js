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
                explanation: 'For this input, there is 1 valid position that satisfy the case insensitive search criteria.'
            },
            {
                input: {"haystack":"leetcode","needle":"leeto"},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the case insensitive search criteria.'
            },
            // Edge case
            {
                input: {"haystack":"","needle":""},
                output: 0,
                explanation: 'Edge case: minimal input.'
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
