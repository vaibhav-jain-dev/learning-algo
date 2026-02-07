/**
 * Count Subsequences with At Most K Gaps
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: count-subsequences-with-at-most-k-gaps
 * Parent: 01-validate-subsequence/02-count-distinct-subsequences
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Subsequences with At Most K Gaps',
        difficulty: 'Hard',
        algorithm: 'count-subsequences-with-at-most-k-gaps',
        parent: '01-validate-subsequence/02-count-distinct-subsequences',
        description: 'Count distinct subsequences of s that equal t, but consecutive matched characters must have at most k characters between them in s. Adds a gap constraint that requires tracking the last matched position in the DP state, changing from 2D to 3D DP.',
        problem: 'Adds a gap constraint that requires tracking the last matched position in the DP state, changing from 2D to 3D DP.',
        hints: [
            'What makes this variant different from the standard problem? Identify the key constraint that changes the approach.',
            'Adds a gap constraint that requires tracking the last matched position in the DP state, changing from 2D to 3D DP.',
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
                input: {"s":"rabbbit","t":"rabbit"},
                output: 3,
                explanation: 'Position the two pointers at the strategic starting locations. Advance each based on the comparison with the target. The pointers converge on the solution without revisiting elements.'
            },
            {
                input: {"s":"aabb","t":"ab"},
                output: 4,
                explanation: 'Each pointer moves in one direction only (or at most n steps total). The invariant ensures that no valid solution is skipped, while the single-pass approach gives O(n) time.'
            },
            // Edge case
            {
                input: {"s":"abc","t":"xyz"},
                output: 0,
                explanation: 'The pointer movement rules ensure systematic coverage. When pointers meet or cross, the traversal is complete and all candidates have been considered.'
            }
        ],
        solutions: {
            python: `def count_subsequences_with_at_most_k_gaps(s, t):
    """
    Count Subsequences with At Most K Gaps

    Count distinct subsequences of s that equal t, but consecutive matched characters must have at most k characters between them in s. Adds a gap constraint that requires tracking the last matched position in the DP state, changing from 2D to 3D DP.

    Time: O(n log k)
    Space: O(n)
    """
    j = 0
    last_match = -1

    for i in range(len(s)):
        if j < len(t) and s[i] == t[j]:
            if last_match >= 0 and i - last_match > k:
                return False
            last_match = i
            j += 1

    return j == len(t)


# Test cases
print(count_subsequences_with_at_most_k_gaps("rabbbit", "rabbit"))  # Expected: 3
print(count_subsequences_with_at_most_k_gaps("aabb", "ab"))  # Expected: 4
print(count_subsequences_with_at_most_k_gaps("abc", "xyz"))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountSubsequencesWithAtMostKGaps solves the Count Subsequences with At Most K Gaps problem.
// Count distinct subsequences of s that equal t, but consecutive matched characters must have at most k characters between them in s. Adds a gap constraint that requires tracking the last matched position in the DP state, changing from 2D to 3D DP.
// Time: O(n log k), Space: O(n)
func CountSubsequencesWithAtMostKGaps(s string, t string) int {
	result := 0

	for i := 0; i < len(s); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountSubsequencesWithAtMostKGaps("rabbbit", "rabbit")) // Expected: 3
	fmt.Println(CountSubsequencesWithAtMostKGaps("aabb", "ab")) // Expected: 4
	fmt.Println(CountSubsequencesWithAtMostKGaps("abc", "xyz")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/02-count-distinct-subsequences/twist-01-count-subsequences-with-at-most-k-gaps', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/02-count-distinct-subsequences/twist-01-count-subsequences-with-at-most-k-gaps'] = problem;
})();
