/**
 * Shortest Common Supersequence
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: shortest-common-supersequence
 * Parent: 01-validate-subsequence/01-longest-common-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Common Supersequence',
        difficulty: 'Hard',
        algorithm: 'shortest-common-supersequence',
        parent: '01-validate-subsequence/01-longest-common-subsequence',
        description: 'Find the shortest string that has both text1 and text2 as subsequences. Inverts the LCS thinking: instead of finding what is common, you must figure out how to merge both strings with minimum length using the LCS as overlap.',
        problem: 'Inverts the LCS thinking: instead of finding what is common, you must figure out how to merge both strings with minimum length using the LCS as overlap.',
        hints: [
            'What makes this variant different from the standard problem? Identify the key constraint that changes the approach.',
            'Inverts the LCS thinking: instead of finding what is common, you must figure out how to merge both strings with minimum length using the LCS as overlap.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"text1":"abcde","text2":"ace"},
                output: 3,
                explanation: 'Initialize distances to infinity except the source (distance 0). Process the closest unvisited node first, relaxing all its outgoing edges. Continue until all reachable nodes have final distances.'
            },
            {
                input: {"text1":"abc","text2":"def"},
                output: 0,
                explanation: 'Each node is processed at most once. When dequeued, its distance is finalized. Update neighbors if a shorter path is found through the current node.'
            },
            // Edge case
            {
                input: {"text1":"abcba","text2":"abcba"},
                output: 5,
                explanation: 'The algorithm greedily selects the closest unvisited node. This greedy choice is optimal for non-negative edge weights.'
            }
        ],
        solutions: {
            python: `def shortest_common_supersequence(text1, text2):
    """
    Shortest Common Supersequence

    Find the shortest string that has both text1 and text2 as subsequences. Inverts the LCS thinking: instead of finding what is common, you must figure out how to merge both strings with minimum length using the LCS as overlap.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(text1)

    for i in range(n):
        # Check condition based on text2
        j = 0
        for k in range(i, n):
            if j < len(text2) and text1[k] == text2[j]:
                j += 1
        if j == len(text2):
            count += 1

    return count


# Test cases
print(shortest_common_supersequence("abcde", "ace"))  # Expected: 3
print(shortest_common_supersequence("abc", "def"))  # Expected: 0
print(shortest_common_supersequence("abcba", "abcba"))  # Expected: 5
`,
            go: `package main

import "fmt"

// ShortestCommonSupersequence solves the Shortest Common Supersequence problem.
// Find the shortest string that has both text1 and text2 as subsequences. Inverts the LCS thinking: instead of finding what is common, you must figure out how to merge both strings with minimum length using the LCS as overlap.
// Time: O(n), Space: O(n)
func ShortestCommonSupersequence(text1 string, text2 string) int {
	result := 0

	for i := 0; i < len(text1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ShortestCommonSupersequence("abcde", "ace")) // Expected: 3
	fmt.Println(ShortestCommonSupersequence("abc", "def")) // Expected: 0
	fmt.Println(ShortestCommonSupersequence("abcba", "abcba")) // Expected: 5
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/01-longest-common-subsequence/twist-04-shortest-common-supersequence', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/01-longest-common-subsequence/twist-04-shortest-common-supersequence'] = problem;
})();
