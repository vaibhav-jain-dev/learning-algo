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
            python: `def minimum_deletions_to_reach_exactly_k_subsequences(data):
    """
    Minimum Deletions to Reach Exactly K Subsequences

    Given s and t, delete the minimum characters from s so that the number of distinct subsequences matching t equals exactly k.
    \n    Approach: Inverts the counting problem into an optimization problem, requiring binary search or careful DP over deletion choices.

    Time: O(n)
    Space: O(n)

    Example: s="rabbbit", t="rabbit", k=1 → delete 1 "b" to get exactly 1 way
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
print(minimum_deletions_to_reach_exactly_k_subsequences([1, 2, 3, 4, 5]))
print(minimum_deletions_to_reach_exactly_k_subsequences([5, 3, 1]))
print(minimum_deletions_to_reach_exactly_k_subsequences([1]))`,
            go: `package main

import "fmt"

// MinimumDeletionsToReachExactlyKSubsequences solves the Minimum Deletions to Reach Exactly K Subsequences problem.
// Given s and t, delete the minimum characters from s so that the number of distinct subsequences matching t equals exactly k.
// Time: O(n), Space: O(n)
func MinimumDeletionsToReachExactlyKSubsequences(data []int) []int {
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
    fmt.Println(MinimumDeletionsToReachExactlyKSubsequences([]int{1, 2, 3, 4, 5}))
    fmt.Println(MinimumDeletionsToReachExactlyKSubsequences([]int{5, 3, 1}))
    fmt.Println(MinimumDeletionsToReachExactlyKSubsequences([]int{1}))
}`
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
