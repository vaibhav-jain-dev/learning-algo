/**
 * Z-Algorithm Alternative
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt
 */
(function() {
    'use strict';

    const problem = {
        name: 'Z-Algorithm Alternative',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'Solve the same pattern matching problem using the Z-algorithm instead of KMP, and compare the approaches.',
        problem: 'The Z-array provides a different perspective -- Z[i] gives the length of the longest substring starting at i that matches a prefix of the string, offering an alternative to KMP.',
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
                explanation: 'The z algorithm alternative for this input yields [0].'
            },
            {
                input: {"text":"AAAAAA","pattern":"AA"},
                output: [0,1],
                explanation: 'The z algorithm alternative for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"text":"","pattern":""},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def z_algorithm_alternative(text, pattern):
    """
    Z-Algorithm Alternative

    Solve the same pattern matching problem using the Z-algorithm instead of KMP, and compare the approaches.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(text)):
        # Check if element meets criteria
        result.append(text[i])

    return result


# Test cases
print(z_algorithm_alternative("ABABDABACDABABCABAB", "ABABCABAB"))  # Expected: [0]
print(z_algorithm_alternative("AAAAAA", "AA"))  # Expected: [0,1]
print(z_algorithm_alternative("", ""))  # Expected: []
`,
            go: `package main

import "fmt"

// ZAlgorithmAlternative solves the Z-Algorithm Alternative problem.
// Solve the same pattern matching problem using the Z-algorithm instead of KMP, and compare the approaches.
// Time: O(?), Space: O(?)
func ZAlgorithmAlternative(text string, pattern string) []int {
	result := make([]int, 0)

	for i := 0; i < len(text); i++ {
		result = append(result, text[i])
	}

	return result
}

func main() {
	fmt.Println(ZAlgorithmAlternative("ABABDABACDABABCABAB", "ABABCABAB")) // Expected: [0]
	fmt.Println(ZAlgorithmAlternative("AAAAAA", "AA")) // Expected: [0,1]
	fmt.Println(ZAlgorithmAlternative("", "")) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/twist-05-z-algorithm-alternative', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/twist-05-z-algorithm-alternative'] = problem;
})();
