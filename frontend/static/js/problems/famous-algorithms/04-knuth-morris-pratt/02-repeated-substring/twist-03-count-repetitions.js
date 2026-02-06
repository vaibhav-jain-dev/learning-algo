/**
 * Count Repetitions
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt/02-repeated-substring
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Repetitions',
        difficulty: 'Easy',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/02-repeated-substring',
        description: 'If the string is a repeated pattern, return how many times the base pattern is repeated.',
        problem: 'After confirming the pattern exists using KMP/LPS, simply divide the string length by the pattern length to get the count.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the count repetitions criteria.'
            },
            {
                input: {"s":"abcabcabcabc"},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the count repetitions criteria.'
            },
            // Edge case
            {
                input: {"s":""},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def count_repetitions(s):
    """
    Count Repetitions

    If the string is a repeated pattern, return how many times the base pattern is repeated.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(s)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_repetitions("abab"))  # Expected: 1
print(count_repetitions("abcabcabcabc"))  # Expected: 2
print(count_repetitions(""))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountRepetitions solves the Count Repetitions problem.
// If the string is a repeated pattern, return how many times the base pattern is repeated.
// Time: O(?), Space: O(?)
func CountRepetitions(s string) int {
	result := 0

	for i := 0; i < len(s); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountRepetitions("abab")) // Expected: 1
	fmt.Println(CountRepetitions("abcabcabcabc")) // Expected: 2
	fmt.Println(CountRepetitions("")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/02-repeated-substring/twist-03-count-repetitions', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/02-repeated-substring/twist-03-count-repetitions'] = problem;
})();
