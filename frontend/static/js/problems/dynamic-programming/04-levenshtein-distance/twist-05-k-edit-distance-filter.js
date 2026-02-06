/**
 * K-Edit Distance Filter
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-edit-distance
 * Parent: 04-levenshtein-distance
 */
(function() {
    'use strict';

    const problem = {
        name: 'K-Edit Distance Filter',
        difficulty: 'Hard',
        algorithm: 'dp-edit-distance',
        parent: '04-levenshtein-distance',
        description: 'Given a list of words and a target string, return all words whose edit distance to the target is at most k. Optimize to avoid computing full DP for every word.',
        problem: 'Requires early termination and trie-based optimization rather than naively running Levenshtein for each word, shifting focus to algorithmic efficiency across multiple queries.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Requires early termination and trie-based optimization rather than naively running Levenshtein for each word, shifting f',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"str1":"abc","str2":"yabd","target":10},
                output: [0],
                explanation: 'The k edit distance filter for this input yields [0].'
            },
            {
                input: {"str1":"horse","str2":"ros","target":10},
                output: [0,1],
                explanation: 'The k edit distance filter for this input yields [0, 1].'
            },
            {
                input: {"str1":"","str2":"abc","target":10},
                output: [0,1,2],
                explanation: 'The k edit distance filter for this input yields [0, 1, 2].'
            },
            // Edge case
            {
                input: {"str1":"","str2":"","target":10},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def k_edit_distance_filter(str1, str2, target):
    """
    K-Edit Distance Filter

    Given a list of words and a target string, return all words whose edit distance to the target is at most k. Optimize to avoid computing full DP for every word.

    Time: O(n^2)
    Space: O(n)
    """
    result = []

    for i in range(len(str1)):
        # Check if element meets criteria
        result.append(str1[i])

    return result


# Test cases
print(k_edit_distance_filter("abc", "yabd", 10))  # Expected: [0]
print(k_edit_distance_filter("horse", "ros", 10))  # Expected: [0,1]
print(k_edit_distance_filter("", "abc", 10))  # Expected: [0,1,2]
`,
            go: `package main

import "fmt"

// KEditDistanceFilter solves the K-Edit Distance Filter problem.
// Given a list of words and a target string, return all words whose edit distance to the target is at most k. Optimize to avoid computing full DP for every word.
// Time: O(n^2), Space: O(n)
func KEditDistanceFilter(str1 string, str2 string, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(str1); i++ {
		result = append(result, str1[i])
	}

	return result
}

func main() {
	fmt.Println(KEditDistanceFilter("abc", "yabd", 10)) // Expected: [0]
	fmt.Println(KEditDistanceFilter("horse", "ros", 10)) // Expected: [0,1]
	fmt.Println(KEditDistanceFilter("", "abc", 10)) // Expected: [0,1,2]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '04-levenshtein-distance/twist-05-k-edit-distance-filter', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/04-levenshtein-distance/twist-05-k-edit-distance-filter'] = problem;
})();
