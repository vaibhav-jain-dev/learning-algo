/**
 * Shortest Period
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kmp-algorithm
 * Parent: 04-knuth-morris-pratt/03-longest-happy-prefix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Period',
        difficulty: 'Hard',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/03-longest-happy-prefix',
        description: 'Find the shortest period of the string -- the smallest string p such that s is a prefix of p repeated infinitely.',
        problem: 'Directly derived from the LPS value: period = n - lps[n-1]. But understanding why this formula works requires deep insight into the KMP failure function.',
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
            python: `def shortest_period(s):
    """
    Shortest Period

    Find the shortest period of the string -- the smallest string p such that s is a prefix of p repeated infinitely.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(s)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(shortest_period("level"))  # Expected: 1
print(shortest_period("ababab"))  # Expected: 2
print(shortest_period(""))  # Expected: 0
`,
            go: `package main

import "fmt"

// ShortestPeriod solves the Shortest Period problem.
// Find the shortest period of the string -- the smallest string p such that s is a prefix of p repeated infinitely.
// Time: O(?), Space: O(?)
func ShortestPeriod(s string) int {
	result := 0

	for i := 0; i < len(s); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ShortestPeriod("level")) // Expected: 1
	fmt.Println(ShortestPeriod("ababab")) // Expected: 2
	fmt.Println(ShortestPeriod("")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/03-longest-happy-prefix/twist-05-shortest-period', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/03-longest-happy-prefix/twist-05-shortest-period'] = problem;
})();
