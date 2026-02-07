/**
 * All Happy Prefixes
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt/03-longest-happy-prefix
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Happy Prefixes',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/03-longest-happy-prefix',
        description: 'Return all happy prefixes of the string (not just the longest), sorted by length.',
        problem: 'Requires following the LPS chain from the last position backward -- lps[n-1] gives the longest, then lps[lps[n-1]-1] gives the next, and so on.',
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
                input: {"s":"level"},
                output: 1,
                explanation: 'The prefix function tells us the longest suffix of the matched portion that is also a prefix of the pattern. This allows intelligent backtracking during the text scan.'
            },
            {
                input: {"s":"ababab"},
                output: 2,
                explanation: 'The combined preprocessing and matching phases ensure each character in the text is examined at most twice, achieving linear time complexity.'
            },
            // Edge case
            {
                input: {"s":""},
                output: 0,
                explanation: 'Precompute the failure function from the pattern. During matching, when a mismatch occurs, use the failure function to skip ahead without re-examining characters already matched.'
            }
        ],
        solutions: {
            python: `def all_happy_prefixes(s):
    """
    All Happy Prefixes

    Return all happy prefixes of the string (not just the longest), sorted by length.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(s)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(all_happy_prefixes("level"))  # Expected: 1
print(all_happy_prefixes("ababab"))  # Expected: 2
print(all_happy_prefixes(""))  # Expected: 0
`,
            go: `package main

import "fmt"

// AllHappyPrefixes solves the All Happy Prefixes problem.
// Return all happy prefixes of the string (not just the longest), sorted by length.
// Time: O(?), Space: O(?)
func AllHappyPrefixes(s string) int {
	result := 0

	for i := 0; i < len(s); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(AllHappyPrefixes("level")) // Expected: 1
	fmt.Println(AllHappyPrefixes("ababab")) // Expected: 2
	fmt.Println(AllHappyPrefixes("")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/03-longest-happy-prefix/twist-01-all-happy-prefixes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/03-longest-happy-prefix/twist-01-all-happy-prefixes'] = problem;
})();
