/**
 * Count Non-Overlapping Matches
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Non-Overlapping Matches',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'Find all non-overlapping occurrences of the pattern in the text, where after a match, the search continues from the end of the match.',
        problem: 'After finding a match, instead of using the LPS to find overlapping matches, you reset the pattern pointer to 0 and continue from position i, changing the match counting logic.',
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
                input: {"text":"ABABDABACDABABCABAB","pattern":"ABABCABAB"},
                output: [0],
                explanation: 'The count non overlapping matches for this input yields [0].'
            },
            {
                input: {"text":"AAAAAA","pattern":"AA"},
                output: [0,1],
                explanation: 'The count non overlapping matches for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"text":"","pattern":""},
                output: [],
                explanation: 'Precompute the failure function from the pattern. During matching, when a mismatch occurs, use the failure function to skip ahead without re-examining characters already matched.'
            }
        ],
        solutions: {
            python: `def count_non_overlapping_matches(text, pattern):
    """
    Count Non-Overlapping Matches

    Find all non-overlapping occurrences of the pattern in the text, where after a match, the search continues from the end of the match.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(text)):
        # Check if element meets criteria
        result.append(text[i])

    return result


# Test cases
print(count_non_overlapping_matches("ABABDABACDABABCABAB", "ABABCABAB"))  # Expected: [0]
print(count_non_overlapping_matches("AAAAAA", "AA"))  # Expected: [0,1]
print(count_non_overlapping_matches("", ""))  # Expected: []
`,
            go: `package main

import "fmt"

// CountNonOverlappingMatches solves the Count Non-Overlapping Matches problem.
// Find all non-overlapping occurrences of the pattern in the text, where after a match, the search continues from the end of the match.
// Time: O(?), Space: O(?)
func CountNonOverlappingMatches(text string, pattern string) []int {
	result := make([]int, 0)

	for i := 0; i < len(text); i++ {
		result = append(result, text[i])
	}

	return result
}

func main() {
	fmt.Println(CountNonOverlappingMatches("ABABDABACDABABCABAB", "ABABCABAB")) // Expected: [0]
	fmt.Println(CountNonOverlappingMatches("AAAAAA", "AA")) // Expected: [0,1]
	fmt.Println(CountNonOverlappingMatches("", "")) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/twist-02-count-non-overlapping-matches', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/twist-02-count-non-overlapping-matches'] = problem;
})();
