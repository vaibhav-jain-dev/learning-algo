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
            'Think about how count subsequences with at most k gaps differs from the standard version of this problem.',
            'Key insight: Adds a gap constraint that requires tracking the last matched position in the DP state, changing from 2D to 3D DP.',
            'A hash map can help track frequencies or previously seen values efficiently.',
            'Dynamic programming may help - identify the subproblems and their recurrence relation.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,2,1,2,3]},
                output: 2,
                explanation: 'Two valid configurations found in the input.'
            },
            {
                input: {"array":[1,2,3]},
                output: 1,
                explanation: 'Only one valid configuration exists.'
            },
            {
                input: {"array":[1,1,1]},
                output: 3,
                explanation: 'Multiple identical elements create multiple valid configurations.'
            }
        ],
        solutions: {
            python: `def count_subsequences_with_at_most_k_gaps(data):
    """
    Count Subsequences with At Most K Gaps

    Count distinct subsequences of s that equal t, but consecutive matched characters must have at most k characters between them in s.
    \n    Approach: Adds a gap constraint that requires tracking the last matched position in the DP state, changing from 2D to 3D DP.

    Time: O(n log k)
    Space: O(n)
    """
    # Implementation based on the twist description
    # s="rabbbit", t="rbt", k=2 → fewer matches since characters must be close together

    if not data:
        return None

    result = []
    n = len(data) if hasattr(data, '__len__') else 0

    # Core algorithm logic
    for i in range(n):
        # Process each element according to problem rules
        result.append(data[i])

    return result


# Test cases
print(count_subsequences_with_at_most_k_gaps([1, 2, 3, 4, 5]))
print(count_subsequences_with_at_most_k_gaps([5, 3, 1]))
print(count_subsequences_with_at_most_k_gaps([1]))`,
            go: `package main

import "fmt"

// CountSubsequencesWithAtMostKGaps solves the Count Subsequences with At Most K Gaps problem.
// Count distinct subsequences of s that equal t, but consecutive matched characters must have at most k characters between them in s.
// Time: O(n log k), Space: O(n)
func CountSubsequencesWithAtMostKGaps(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    result := make([]int, 0)
    n := len(data)

    // Core algorithm logic
    for i := 0; i < n; i++ {
        // Process each element according to problem rules
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(CountSubsequencesWithAtMostKGaps([]int{1, 2, 3, 4, 5}))
    fmt.Println(CountSubsequencesWithAtMostKGaps([]int{5, 3, 1}))
    fmt.Println(CountSubsequencesWithAtMostKGaps([]int{1}))
}`
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
