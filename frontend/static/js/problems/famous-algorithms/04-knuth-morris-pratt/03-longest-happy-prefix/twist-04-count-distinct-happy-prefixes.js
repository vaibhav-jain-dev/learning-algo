/**
 * Count Distinct Happy Prefixes
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt/03-longest-happy-prefix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Distinct Happy Prefixes',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/03-longest-happy-prefix',
        description: 'Count how many distinct happy prefixes exist for the string.',
        problem: 'Requires traversing the full LPS chain from the end and counting distinct values, understanding the nested structure of prefix-suffix matches.',
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
            python: `def count_distinct_happy_prefixes(s):
    """
    Count Distinct Happy Prefixes

    Count how many distinct happy prefixes exist for the string.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(s)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_distinct_happy_prefixes("level"))  # Expected: 1
print(count_distinct_happy_prefixes("ababab"))  # Expected: 2
print(count_distinct_happy_prefixes(""))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountDistinctHappyPrefixes solves the Count Distinct Happy Prefixes problem.
// Count how many distinct happy prefixes exist for the string.
// Time: O(?), Space: O(?)
func CountDistinctHappyPrefixes(s string) int {
	result := 0

	for i := 0; i < len(s); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountDistinctHappyPrefixes("level")) // Expected: 1
	fmt.Println(CountDistinctHappyPrefixes("ababab")) // Expected: 2
	fmt.Println(CountDistinctHappyPrefixes("")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/03-longest-happy-prefix/twist-04-count-distinct-happy-prefixes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/03-longest-happy-prefix/twist-04-count-distinct-happy-prefixes'] = problem;
})();
