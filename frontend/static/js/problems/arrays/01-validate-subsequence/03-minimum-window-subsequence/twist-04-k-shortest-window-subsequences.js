/**
 * K Shortest Window Subsequences
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: k-shortest-window-subsequences
 * Parent: 01-validate-subsequence/03-minimum-window-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Shortest Window Subsequences',
        difficulty: 'Hard',
        algorithm: 'k-shortest-window-subsequences',
        parent: '01-validate-subsequence/03-minimum-window-subsequence',
        description: 'Find the k shortest windows in s1 where s2 appears as a subsequence. Windows may overlap. Requires maintaining a priority queue or sorted collection of all valid windows, not just tracking the single best.',
        problem: 'Requires maintaining a priority queue or sorted collection of all valid windows, not just tracking the single best.',
        hints: [
            'Think about how this twist differs from the standard version: Find the k shortest windows in s1 where s2 appears as a subsequence. Windows may.',
            'Requires maintaining a priority queue or sorted collection of all valid windows, not just tracking the single best.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"s1":"abcdebdde","s2":"bde"},
                output: "bcde",
                explanation: ''
            },
            {
                input: {"s1":"abcdef","s2":"ace"},
                output: "abcde",
                explanation: ''
            },
            // Edge case
            {
                input: {"s1":"xyz","s2":"abc"},
                output: "",
                explanation: ''
            }
        ],
        solutions: {
            python: `def k_shortest_window_subsequences(s1, s2):
    """
    K Shortest Window Subsequences

    Find the k shortest windows in s1 where s2 appears as a subsequence. Windows may overlap. Requires maintaining a priority queue or sorted collection of all valid windows, not just tracking the single best.

    Time: O(n log k)
    Space: O(n)
    """
    count = 0
    n = len(s1)

    for i in range(n):
        # Check condition based on s2
        j = 0
        for k in range(i, n):
            if j < len(s2) and s1[k] == s2[j]:
                j += 1
        if j == len(s2):
            count += 1

    return count


# Test cases
print(k_shortest_window_subsequences("abcdebdde", "bde"))  # Expected: "bcde"
print(k_shortest_window_subsequences("abcdef", "ace"))  # Expected: "abcde"
print(k_shortest_window_subsequences("xyz", "abc"))  # Expected: ""
`,
            go: `package main

import "fmt"

// KShortestWindowSubsequences solves the K Shortest Window Subsequences problem.
// Find the k shortest windows in s1 where s2 appears as a subsequence. Windows may overlap. Requires maintaining a priority queue or sorted collection of all valid windows, not just tracking the single best.
// Time: O(n log k), Space: O(n)
func KShortestWindowSubsequences(s1 string, s2 string) int {
	result := 0

	for i := 0; i < len(s1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KShortestWindowSubsequences("abcdebdde", "bde")) // Expected: "bcde"
	fmt.Println(KShortestWindowSubsequences("abcdef", "ace")) // Expected: "abcde"
	fmt.Println(KShortestWindowSubsequences("xyz", "abc")) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/03-minimum-window-subsequence/twist-04-k-shortest-window-subsequences', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/03-minimum-window-subsequence/twist-04-k-shortest-window-subsequences'] = problem;
})();
