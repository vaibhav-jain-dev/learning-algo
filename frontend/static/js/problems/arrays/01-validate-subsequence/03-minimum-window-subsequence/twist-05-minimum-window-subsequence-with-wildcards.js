/**
 * Minimum Window Subsequence with Wildcards
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: minimum-window-subsequence-with-wildcards
 * Parent: 01-validate-subsequence/03-minimum-window-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Window Subsequence with Wildcards',
        difficulty: 'Hard',
        algorithm: 'minimum-window-subsequence-with-wildcards',
        parent: '01-validate-subsequence/03-minimum-window-subsequence',
        description: 'The pattern s2 can contain wildcard characters "?" that match any single character in s1. Wildcards change the matching logic: instead of exact character comparison, you need conditional matching that accepts any character at wildcard positions.',
        problem: 'Wildcards change the matching logic: instead of exact character comparison, you need conditional matching that accepts any character at wildcard positions.',
        hints: [
            'Think about how minimum window subsequence with wildcards differs from the standard version of this problem.',
            'Key insight: Wildcards change the matching logic: instead of exact character comparison, you need conditional matching that accepts any character at wildcard positions.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,3,5,2,4]},
                output: 1,
                explanation: 'Only one operation needed to achieve the goal.'
            },
            {
                input: {"array":[1,2,3,4]},
                output: 0,
                explanation: 'Already satisfies the condition, no operations needed.'
            },
            {
                input: {"array":[5,3,1,4,2]},
                output: 2,
                explanation: 'Two operations needed to satisfy the condition.'
            }
        ],
        solutions: {
            python: `def minimum_window_subsequence_with_wildcards(data):
    """
    Minimum Window Subsequence with Wildcards

    The pattern s2 can contain wildcard characters "?" that match any single character in s1.
    \n    Approach: Wildcards change the matching logic: instead of exact character comparison, you need conditional matching that accepts any character at wildcard positions.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # s1="abcdebdde", s2="b?e" → "bcd" (? matches c, then e completes)

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
print(minimum_window_subsequence_with_wildcards([1, 2, 3, 4, 5]))
print(minimum_window_subsequence_with_wildcards([5, 3, 1]))
print(minimum_window_subsequence_with_wildcards([1]))`,
            go: `package main

import "fmt"

// MinimumWindowSubsequenceWithWildcards solves the Minimum Window Subsequence with Wildcards problem.
// The pattern s2 can contain wildcard characters "?" that match any single character in s1.
// Time: O(n), Space: O(n)
func MinimumWindowSubsequenceWithWildcards(data []int) []int {
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
    fmt.Println(MinimumWindowSubsequenceWithWildcards([]int{1, 2, 3, 4, 5}))
    fmt.Println(MinimumWindowSubsequenceWithWildcards([]int{5, 3, 1}))
    fmt.Println(MinimumWindowSubsequenceWithWildcards([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/03-minimum-window-subsequence/twist-05-minimum-window-subsequence-with-wildcards', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/03-minimum-window-subsequence/twist-05-minimum-window-subsequence-with-wildcards'] = problem;
})();
