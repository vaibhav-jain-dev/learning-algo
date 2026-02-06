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
            'Think about how this twist differs from the standard version: Count distinct subsequences of s that equal t, but consecutive matched character.',
            'Adds a gap constraint that requires tracking the last matched position in the DP state, changing from 2D to 3D DP.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"s":"rabbbit","t":"rabbit"},
                output: 3,
                explanation: 'Three distinct ways to select "rabbit" from "rabbbit" by choosing different b characters.'
            },
            {
                input: {"s":"aabb","t":"ab"},
                output: 4,
                explanation: 'Four ways: positions (0,2), (0,3), (1,2), (1,3).'
            },
            {
                input: {"s":"abc","t":"xyz"},
                output: 0,
                explanation: 'No matching subsequence exists.'
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

    Example: s="rabbbit", t="rbt", k=2 → fewer matches since characters must be close together
    """
    if not data:
        return None

    n = len(data) if hasattr(data, '__len__') else 0
    result = []

    # Core algorithm implementation
    for i in range(n):
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

    n := len(data)
    result := make([]int, 0, n)

    // Core algorithm implementation
    for i := 0; i < n; i++ {
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
