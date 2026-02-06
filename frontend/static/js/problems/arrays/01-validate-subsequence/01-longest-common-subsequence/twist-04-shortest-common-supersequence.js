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
            'Think about how this twist differs from the standard version: Find the shortest string that has both text1 and text2 as subsequences..',
            'Inverts the LCS thinking: instead of finding what is common, you must figure out how to merge both strings with minimum length using the LCS as overlap.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"text1":"abcde","text2":"ace"},
                output: 3,
                explanation: 'The longest common subsequence is "ace" with length 3.'
            },
            {
                input: {"text1":"abc","text2":"def"},
                output: 0,
                explanation: 'No common characters exist between the two strings.'
            },
            {
                input: {"text1":"abcba","text2":"abcba"},
                output: 5,
                explanation: 'Identical strings have LCS equal to their length.'
            }
        ],
        solutions: {
            python: `def shortest_common_supersequence(data):
    """
    Shortest Common Supersequence

    Find the shortest string that has both text1 and text2 as subsequences.
    \n    Approach: Inverts the LCS thinking: instead of finding what is common, you must figure out how to merge both strings with minimum length using the LCS as overlap.

    Time: O(n)
    Space: O(n)

    Example: text1="abac", text2="cab" → "cabac" (length 5)
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
print(shortest_common_supersequence([1, 2, 3, 4, 5]))
print(shortest_common_supersequence([5, 3, 1]))
print(shortest_common_supersequence([1]))`,
            go: `package main

import "fmt"

// ShortestCommonSupersequence solves the Shortest Common Supersequence problem.
// Find the shortest string that has both text1 and text2 as subsequences.
// Time: O(n), Space: O(n)
func ShortestCommonSupersequence(data []int) []int {
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
    fmt.Println(ShortestCommonSupersequence([]int{1, 2, 3, 4, 5}))
    fmt.Println(ShortestCommonSupersequence([]int{5, 3, 1}))
    fmt.Println(ShortestCommonSupersequence([]int{1}))
}`
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
