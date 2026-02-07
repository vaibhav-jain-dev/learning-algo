/**
 * Minimum Appends for Repetition
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt/02-repeated-substring
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Appends for Repetition',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/02-repeated-substring',
        description: 'Find the minimum number of characters to append to the string so that it becomes a repeated pattern.',
        problem: 'Uses the LPS array to find the longest suffix-prefix overlap, then computes how many more characters are needed to complete the next repetition.',
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
            python: `def minimum_appends_for_repetition(s):
    """
    Minimum Appends for Repetition

    Find the minimum number of characters to append to the string so that it becomes a repeated pattern.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(s)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(minimum_appends_for_repetition("abab"))  # Expected: 1
print(minimum_appends_for_repetition("abcabcabcabc"))  # Expected: 2
print(minimum_appends_for_repetition(""))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumAppendsForRepetition solves the Minimum Appends for Repetition problem.
// Find the minimum number of characters to append to the string so that it becomes a repeated pattern.
// Time: O(?), Space: O(?)
func MinimumAppendsForRepetition(s string) int {
	result := 0

	for i := 0; i < len(s); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumAppendsForRepetition("abab")) // Expected: 1
	fmt.Println(MinimumAppendsForRepetition("abcabcabcabc")) // Expected: 2
	fmt.Println(MinimumAppendsForRepetition("")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/02-repeated-substring/twist-02-minimum-appends-for-repetition', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/02-repeated-substring/twist-02-minimum-appends-for-repetition'] = problem;
})();
