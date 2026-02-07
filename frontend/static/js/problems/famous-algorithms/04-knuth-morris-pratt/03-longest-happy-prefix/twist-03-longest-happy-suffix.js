/**
 * Longest Happy Suffix
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt/03-longest-happy-prefix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Happy Suffix',
        difficulty: 'Easy',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/03-longest-happy-prefix',
        description: 'Find the longest proper suffix that is also a prefix (same as happy prefix but phrased differently to test understanding).',
        problem: 'This is actually the same problem -- a happy prefix IS a suffix by definition. The twist tests whether you recognize the symmetry.',
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
            python: `def longest_happy_suffix(s):
    """
    Longest Happy Suffix

    Find the longest proper suffix that is also a prefix (same as happy prefix but phrased differently to test understanding).

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(s)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(longest_happy_suffix("level"))  # Expected: 1
print(longest_happy_suffix("ababab"))  # Expected: 2
print(longest_happy_suffix(""))  # Expected: 0
`,
            go: `package main

import "fmt"

// LongestHappySuffix solves the Longest Happy Suffix problem.
// Find the longest proper suffix that is also a prefix (same as happy prefix but phrased differently to test understanding).
// Time: O(?), Space: O(?)
func LongestHappySuffix(s string) int {
	result := 0

	for i := 0; i < len(s); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LongestHappySuffix("level")) // Expected: 1
	fmt.Println(LongestHappySuffix("ababab")) // Expected: 2
	fmt.Println(LongestHappySuffix("")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/03-longest-happy-prefix/twist-03-longest-happy-suffix', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/03-longest-happy-prefix/twist-03-longest-happy-suffix'] = problem;
})();
