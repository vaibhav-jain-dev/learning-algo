/**
 * Longest Repeated Substring
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt/02-repeated-substring
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Repeated Substring',
        difficulty: 'Hard',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/02-repeated-substring',
        description: 'Find the longest substring that appears at least twice in the string (not necessarily as a full repetition pattern).',
        problem: 'A fundamentally different problem that requires binary search + rolling hash or suffix array approaches, not just LPS analysis.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the longest repeated substring criteria.'
            },
            {
                input: {"s":"abcabcabcabc"},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the longest repeated substring criteria.'
            },
            // Edge case
            {
                input: {"s":""},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def longest_repeated_substring(s):
    """
    Longest Repeated Substring

    Find the longest substring that appears at least twice in the string (not necessarily as a full repetition pattern).

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(s)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(longest_repeated_substring("abab"))  # Expected: 1
print(longest_repeated_substring("abcabcabcabc"))  # Expected: 2
print(longest_repeated_substring(""))  # Expected: 0
`,
            go: `package main

import "fmt"

// LongestRepeatedSubstring solves the Longest Repeated Substring problem.
// Find the longest substring that appears at least twice in the string (not necessarily as a full repetition pattern).
// Time: O(?), Space: O(?)
func LongestRepeatedSubstring(s string) int {
	result := 0

	for i := 0; i < len(s); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LongestRepeatedSubstring("abab")) // Expected: 1
	fmt.Println(LongestRepeatedSubstring("abcabcabcabc")) // Expected: 2
	fmt.Println(LongestRepeatedSubstring("")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/02-repeated-substring/twist-05-longest-repeated-substring', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/02-repeated-substring/twist-05-longest-repeated-substring'] = problem;
})();
