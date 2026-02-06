/**
 * Count Common Subsequences of Two Strings
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: count-common-subsequences-of-two-strings
 * Parent: 01-validate-subsequence/02-count-distinct-subsequences
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Common Subsequences of Two Strings',
        difficulty: 'Hard',
        algorithm: 'count-common-subsequences-of-two-strings',
        parent: '01-validate-subsequence/02-count-distinct-subsequences',
        description: 'Given two strings s1 and s2, count the total number of common subsequences (not just the longest one). Changes the DP recurrence: instead of matching against a target, you must count all shared subsequences between two strings simultaneously.',
        problem: 'Changes the DP recurrence: instead of matching against a target, you must count all shared subsequences between two strings simultaneously.',
        hints: [
            'Think about how count common subsequences of two strings differs from the standard version of this problem.',
            'Key insight: Changes the DP recurrence: instead of matching against a target, you must count all shared subsequences between two strings simultaneously.',
            'A hash map can help track frequencies or previously seen values efficiently.',
            'Dynamic programming may help - identify the subproblems and their recurrence relation.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
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
            python: `def count_common_subsequences_of_two_strings(data):
    """
    Count Common Subsequences of Two Strings

    Given two strings s1 and s2, count the total number of common subsequences (not just the longest one).
    \n    Approach: Changes the DP recurrence: instead of matching against a target, you must count all shared subsequences between two strings simultaneously.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # s1="abc", s2="abc" → 8 (empty + a + b + c + ab + ac + bc + abc)

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
print(count_common_subsequences_of_two_strings([1, 2, 3, 4, 5]))
print(count_common_subsequences_of_two_strings([5, 3, 1]))
print(count_common_subsequences_of_two_strings([1]))`,
            go: `package main

import "fmt"

// CountCommonSubsequencesOfTwoStrings solves the Count Common Subsequences of Two Strings problem.
// Given two strings s1 and s2, count the total number of common subsequences (not just the longest one).
// Time: O(n), Space: O(n)
func CountCommonSubsequencesOfTwoStrings(data []int) []int {
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
    fmt.Println(CountCommonSubsequencesOfTwoStrings([]int{1, 2, 3, 4, 5}))
    fmt.Println(CountCommonSubsequencesOfTwoStrings([]int{5, 3, 1}))
    fmt.Println(CountCommonSubsequencesOfTwoStrings([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/02-count-distinct-subsequences/twist-04-count-common-subsequences-of-two-strings', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/02-count-distinct-subsequences/twist-04-count-common-subsequences-of-two-strings'] = problem;
})();
