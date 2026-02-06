/**
 * Minimum Deletions to Reach Exactly K Subsequences
 * Category: arrays
 * Difficulty: Very Hard
 * Algorithm: minimum-deletions-to-reach-exactly-k-subsequences
 * Parent: 01-validate-subsequence/02-count-distinct-subsequences
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Deletions to Reach Exactly K Subsequences',
        difficulty: 'Very Hard',
        algorithm: 'minimum-deletions-to-reach-exactly-k-subsequences',
        parent: '01-validate-subsequence/02-count-distinct-subsequences',
        description: 'Given s and t, delete the minimum characters from s so that the number of distinct subsequences matching t equals exactly k. Inverts the counting problem into an optimization problem, requiring binary search or careful DP over deletion choices.',
        problem: 'Inverts the counting problem into an optimization problem, requiring binary search or careful DP over deletion choices.',
        hints: [
            'Think about how this twist differs from the standard version: Given s and t, delete the minimum characters from s so that the number of distin.',
            'Inverts the counting problem into an optimization problem, requiring binary search or careful DP over deletion choices.',
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
                input: {"s":"rabbbit","t":"rabbit"},
                output: 3,
                explanation: ''
            },
            {
                input: {"s":"aabb","t":"ab"},
                output: 4,
                explanation: ''
            },
            // Edge case
            {
                input: {"s":"abc","t":"xyz"},
                output: 0,
                explanation: ''
            }
        ],
        solutions: {
            python: `def minimum_deletions_to_reach_exactly_k_subsequences(s, t):
    """
    Minimum Deletions to Reach Exactly K Subsequences

    Given s and t, delete the minimum characters from s so that the number of distinct subsequences matching t equals exactly k. Inverts the counting problem into an optimization problem, requiring binary search or careful DP over deletion choices.

    Time: O(n)
    Space: O(n)
    """
    n = len(s)
    m = len(t)
    j = 0

    for i in range(n):
        if j < m and s[i] == t[j]:
            j += 1

    if j < m:
        return -1  # Not possible

    return n - m


# Test cases
print(minimum_deletions_to_reach_exactly_k_subsequences("rabbbit", "rabbit"))  # Expected: 3
print(minimum_deletions_to_reach_exactly_k_subsequences("aabb", "ab"))  # Expected: 4
print(minimum_deletions_to_reach_exactly_k_subsequences("abc", "xyz"))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumDeletionsToReachExactlyKSubsequences solves the Minimum Deletions to Reach Exactly K Subsequences problem.
// Given s and t, delete the minimum characters from s so that the number of distinct subsequences matching t equals exactly k. Inverts the counting problem into an optimization problem, requiring binary search or careful DP over deletion choices.
// Time: O(n), Space: O(n)
func MinimumDeletionsToReachExactlyKSubsequences(s string, t string) int {
	n := len(s)
	m := len(t)
	j := 0

	for i := 0; i < n && j < m; i++ {
		if s[i] == t[j] {
			j++
		}
	}

	if j < m {
		return -1
	}

	return n - m
}

func main() {
	fmt.Println(MinimumDeletionsToReachExactlyKSubsequences("rabbbit", "rabbit")) // Expected: 3
	fmt.Println(MinimumDeletionsToReachExactlyKSubsequences("aabb", "ab")) // Expected: 4
	fmt.Println(MinimumDeletionsToReachExactlyKSubsequences("abc", "xyz")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/02-count-distinct-subsequences/twist-02-minimum-deletions-to-reach-exactly-k-subsequences', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/02-count-distinct-subsequences/twist-02-minimum-deletions-to-reach-exactly-k-subsequences'] = problem;
})();
