/**
 * All Occurrences
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt/01-implement-strstr
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Occurrences',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/01-implement-strstr',
        description: 'Find all starting indices where needle appears in haystack, including overlapping occurrences.',
        problem: 'After each match, instead of returning immediately, use the LPS array to continue searching from the appropriate position for overlapping matches.',
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
                output: [0],
                explanation: 'The all occurrences for this input yields [0].'
            },
            {
                input: {"haystack":"leetcode","needle":"leeto"},
                output: [0,1],
                explanation: 'The all occurrences for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"haystack":"","needle":""},
                output: [],
                explanation: 'Precompute the failure function from the pattern. During matching, when a mismatch occurs, use the failure function to skip ahead without re-examining characters already matched.'
            }
        ],
        solutions: {
            python: `def all_occurrences(haystack, needle):
    """
    All Occurrences

    Find all starting indices where needle appears in haystack, including overlapping occurrences.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(haystack)):
        # Check if element meets criteria
        result.append(haystack[i])

    return result


# Test cases
print(all_occurrences("sadbutsad", "sad"))  # Expected: [0]
print(all_occurrences("leetcode", "leeto"))  # Expected: [0,1]
print(all_occurrences("", ""))  # Expected: []
`,
            go: `package main

import "fmt"

// AllOccurrences solves the All Occurrences problem.
// Find all starting indices where needle appears in haystack, including overlapping occurrences.
// Time: O(?), Space: O(?)
func AllOccurrences(haystack string, needle string) []int {
	result := make([]int, 0)

	for i := 0; i < len(haystack); i++ {
		result = append(result, haystack[i])
	}

	return result
}

func main() {
	fmt.Println(AllOccurrences("sadbutsad", "sad")) // Expected: [0]
	fmt.Println(AllOccurrences("leetcode", "leeto")) // Expected: [0,1]
	fmt.Println(AllOccurrences("", "")) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/01-implement-strstr/twist-02-all-occurrences', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/01-implement-strstr/twist-02-all-occurrences'] = problem;
})();
