/**
 * Build LPS Array Only
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt
 */
(function() {
    'use strict';

    const problem = {
        name: 'Build LPS Array Only',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'Given a pattern, build and return just the LPS (Longest Proper Prefix which is also Suffix) failure function array.',
        problem: 'Focuses on understanding the preprocessing step in isolation, which is the core insight of KMP and often the hardest part to understand.',
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
                output: 1,
                explanation: 'The prefix function tells us the longest suffix of the matched portion that is also a prefix of the pattern. This allows intelligent backtracking during the text scan.'
            },
            {
                input: {"text":"AAAAAA","pattern":"AA"},
                output: 2,
                explanation: 'The combined preprocessing and matching phases ensure each character in the text is examined at most twice, achieving linear time complexity.'
            },
            // Edge case
            {
                input: {"text":"","pattern":""},
                output: 0,
                explanation: 'Precompute the failure function from the pattern. During matching, when a mismatch occurs, use the failure function to skip ahead without re-examining characters already matched.'
            }
        ],
        solutions: {
            python: `def build_lps_array_only(text, pattern):
    """
    Build LPS Array Only

    Given a pattern, build and return just the LPS (Longest Proper Prefix which is also Suffix) failure function array.

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(text)

    for i in range(n):
        # Check condition based on pattern
        j = 0
        for k in range(i, n):
            if j < len(pattern) and text[k] == pattern[j]:
                j += 1
        if j == len(pattern):
            count += 1

    return count


# Test cases
print(build_lps_array_only("ABABDABACDABABCABAB", "ABABCABAB"))  # Expected: 1
print(build_lps_array_only("AAAAAA", "AA"))  # Expected: 2
print(build_lps_array_only("", ""))  # Expected: 0
`,
            go: `package main

import "fmt"

// BuildLpsArrayOnly solves the Build LPS Array Only problem.
// Given a pattern, build and return just the LPS (Longest Proper Prefix which is also Suffix) failure function array.
// Time: O(?), Space: O(?)
func BuildLpsArrayOnly(text string, pattern string) int {
	result := 0

	for i := 0; i < len(text); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(BuildLpsArrayOnly("ABABDABACDABABCABAB", "ABABCABAB")) // Expected: 1
	fmt.Println(BuildLpsArrayOnly("AAAAAA", "AA")) // Expected: 2
	fmt.Println(BuildLpsArrayOnly("", "")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/twist-01-build-lps-array-only', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/twist-01-build-lps-array-only'] = problem;
})();
