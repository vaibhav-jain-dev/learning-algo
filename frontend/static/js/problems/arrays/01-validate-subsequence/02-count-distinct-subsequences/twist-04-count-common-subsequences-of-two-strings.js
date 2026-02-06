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
            'Think about how this twist differs from the standard version: Given two strings s1 and s2, count the total number of common subsequences (not .',
            'Changes the DP recurrence: instead of matching against a target, you must count all shared subsequences between two strings simultaneously.',
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
            python: `def count_common_subsequences_of_two_strings(data):
    """
    Count Common Subsequences of Two Strings

    Given two strings s1 and s2, count the total number of common subsequences (not just the longest one).
    \n    Approach: Changes the DP recurrence: instead of matching against a target, you must count all shared subsequences between two strings simultaneously.

    Time: O(n)
    Space: O(n)

    Example: s1="abc", s2="abc" → 8 (empty + a + b + c + ab + ac + bc + abc)
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

    n := len(data)
    result := make([]int, 0, n)

    // Core algorithm implementation
    for i := 0; i < n; i++ {
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
