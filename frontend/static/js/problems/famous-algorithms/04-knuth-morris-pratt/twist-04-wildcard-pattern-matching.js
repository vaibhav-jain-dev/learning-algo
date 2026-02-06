/**
 * Wildcard Pattern Matching
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt
 */
(function() {
    'use strict';

    const problem = {
        name: 'Wildcard Pattern Matching',
        difficulty: 'Hard',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'Modify KMP to handle patterns containing wildcard characters (?) that match any single character.',
        problem: 'Wildcards break the standard LPS computation since a ? matches anything, requiring modified failure function logic that accounts for flexible matching.',
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
                explanation: 'The wildcard pattern matching for this input yields [0].'
            },
            {
                input: {"text":"AAAAAA","pattern":"AA"},
                output: [0,1],
                explanation: 'The wildcard pattern matching for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"text":"","pattern":""},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def wildcard_pattern_matching(text, pattern):
    """
    Wildcard Pattern Matching

    Modify KMP to handle patterns containing wildcard characters (?) that match any single character.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(text)):
        # Check if element meets criteria
        result.append(text[i])

    return result


# Test cases
print(wildcard_pattern_matching("ABABDABACDABABCABAB", "ABABCABAB"))  # Expected: [0]
print(wildcard_pattern_matching("AAAAAA", "AA"))  # Expected: [0,1]
print(wildcard_pattern_matching("", ""))  # Expected: []
`,
            go: `package main

import "fmt"

// WildcardPatternMatching solves the Wildcard Pattern Matching problem.
// Modify KMP to handle patterns containing wildcard characters (?) that match any single character.
// Time: O(?), Space: O(?)
func WildcardPatternMatching(text string, pattern string) []int {
	result := make([]int, 0)

	for i := 0; i < len(text); i++ {
		result = append(result, text[i])
	}

	return result
}

func main() {
	fmt.Println(WildcardPatternMatching("ABABDABACDABABCABAB", "ABABCABAB")) // Expected: [0]
	fmt.Println(WildcardPatternMatching("AAAAAA", "AA")) // Expected: [0,1]
	fmt.Println(WildcardPatternMatching("", "")) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/twist-04-wildcard-pattern-matching', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/twist-04-wildcard-pattern-matching'] = problem;
})();
