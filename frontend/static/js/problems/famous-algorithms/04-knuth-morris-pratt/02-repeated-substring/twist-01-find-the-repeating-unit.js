/**
 * Find the Repeating Unit
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt/02-repeated-substring
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find the Repeating Unit',
        difficulty: 'Easy',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/02-repeated-substring',
        description: 'If the string can be constructed from a repeated substring, return that shortest repeating unit.',
        problem: 'Extends from boolean detection to extraction -- use the same LPS approach but return the substring s[0:patternLen] instead of just true/false.',
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
                input: {"s":"abab"},
                output: 1,
                explanation: 'The prefix function tells us the longest suffix of the matched portion that is also a prefix of the pattern. This allows intelligent backtracking during the text scan.'
            },
            {
                input: {"s":"abcabcabcabc"},
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
            python: `def find_the_repeating_unit(s):
    """
    Find the Repeating Unit

    If the string can be constructed from a repeated substring, return that shortest repeating unit.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(s)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(find_the_repeating_unit("abab"))  # Expected: 1
print(find_the_repeating_unit("abcabcabcabc"))  # Expected: 2
print(find_the_repeating_unit(""))  # Expected: 0
`,
            go: `package main

import "fmt"

// FindTheRepeatingUnit solves the Find the Repeating Unit problem.
// If the string can be constructed from a repeated substring, return that shortest repeating unit.
// Time: O(?), Space: O(?)
func FindTheRepeatingUnit(s string) int {
	result := 0

	for i := 0; i < len(s); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(FindTheRepeatingUnit("abab")) // Expected: 1
	fmt.Println(FindTheRepeatingUnit("abcabcabcabc")) // Expected: 2
	fmt.Println(FindTheRepeatingUnit("")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/02-repeated-substring/twist-01-find-the-repeating-unit', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/02-repeated-substring/twist-01-find-the-repeating-unit'] = problem;
})();
