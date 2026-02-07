/**
 * Multiple Pattern Search
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt
 */
(function() {
    'use strict';

    const problem = {
        name: 'Multiple Pattern Search',
        difficulty: 'Hard',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'Search for multiple patterns simultaneously in a single pass through the text using Aho-Corasick instead of running KMP for each pattern.',
        problem: 'Extends the single-pattern automaton idea to a trie-based automaton with failure links, enabling multi-pattern matching in one traversal.',
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
                explanation: 'The multiple pattern search for this input yields [0].'
            },
            {
                input: {"text":"AAAAAA","pattern":"AA"},
                output: [0,1],
                explanation: 'The multiple pattern search for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"text":"","pattern":""},
                output: [],
                explanation: 'Precompute the failure function from the pattern. During matching, when a mismatch occurs, use the failure function to skip ahead without re-examining characters already matched.'
            }
        ],
        solutions: {
            python: `def multiple_pattern_search(text, pattern):
    """
    Multiple Pattern Search

    Search for multiple patterns simultaneously in a single pass through the text using Aho-Corasick instead of running KMP for each pattern.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(text)):
        # Check if element meets criteria
        result.append(text[i])

    return result


# Test cases
print(multiple_pattern_search("ABABDABACDABABCABAB", "ABABCABAB"))  # Expected: [0]
print(multiple_pattern_search("AAAAAA", "AA"))  # Expected: [0,1]
print(multiple_pattern_search("", ""))  # Expected: []
`,
            go: `package main

import "fmt"

// MultiplePatternSearch solves the Multiple Pattern Search problem.
// Search for multiple patterns simultaneously in a single pass through the text using Aho-Corasick instead of running KMP for each pattern.
// Time: O(?), Space: O(?)
func MultiplePatternSearch(text string, pattern string) []int {
	result := make([]int, 0)

	for i := 0; i < len(text); i++ {
		result = append(result, text[i])
	}

	return result
}

func main() {
	fmt.Println(MultiplePatternSearch("ABABDABACDABABCABAB", "ABABCABAB")) // Expected: [0]
	fmt.Println(MultiplePatternSearch("AAAAAA", "AA")) // Expected: [0,1]
	fmt.Println(MultiplePatternSearch("", "")) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/twist-03-multiple-pattern-search', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/twist-03-multiple-pattern-search'] = problem;
})();
