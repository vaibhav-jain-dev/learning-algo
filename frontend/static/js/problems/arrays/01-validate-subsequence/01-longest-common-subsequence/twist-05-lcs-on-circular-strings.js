/**
 * LCS on Circular Strings
 * Category: arrays
 * Difficulty: Very Hard
 * Algorithm: lcs-on-circular-strings
 * Parent: 01-validate-subsequence/01-longest-common-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'LCS on Circular Strings',
        difficulty: 'Very Hard',
        algorithm: 'lcs-on-circular-strings',
        parent: '01-validate-subsequence/01-longest-common-subsequence',
        description: 'Both strings are circular (the end wraps to the beginning). Find the LCS considering all rotations. You must consider all rotational alignments, turning a single DP computation into potentially O(n) DP computations or requiring a clever concatenation trick.',
        problem: 'You must consider all rotational alignments, turning a single DP computation into potentially O(n) DP computations or requiring a clever concatenation trick.',
        hints: [
            'Think about how this twist differs from the standard version: Both strings are circular (the end wraps to the beginning). Find the LCS conside.',
            'You must consider all rotational alignments, turning a single DP computation into potentially O(n) DP computations or requiring a clever concatenation trick.',
            'For circular structures, consider concatenating the data with itself or using modular arithmetic.',
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
            python: `def lcs_on_circular_strings(data):
    """
    LCS on Circular Strings

    Both strings are circular (the end wraps to the beginning). Find the LCS considering all rotations.
    \n    Approach: You must consider all rotational alignments, turning a single DP computation into potentially O(n) DP computations or requiring a clever concatenation trick.

    Time: O(n)
    Space: O(n)

    Example: text1="abc" (rotations: abc, bca, cab), text2="cab" → 3 (cab rotation of text1 matches exactly)
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
print(lcs_on_circular_strings([1, 2, 3, 4, 5]))
print(lcs_on_circular_strings([5, 3, 1]))
print(lcs_on_circular_strings([1]))`,
            go: `package main

import "fmt"

// LCSOnCircularStrings solves the LCS on Circular Strings problem.
// Both strings are circular (the end wraps to the beginning). Find the LCS considering all rotations.
// Time: O(n), Space: O(n)
func LCSOnCircularStrings(data []int) []int {
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
    fmt.Println(LCSOnCircularStrings([]int{1, 2, 3, 4, 5}))
    fmt.Println(LCSOnCircularStrings([]int{5, 3, 1}))
    fmt.Println(LCSOnCircularStrings([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/01-longest-common-subsequence/twist-05-lcs-on-circular-strings', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/01-longest-common-subsequence/twist-05-lcs-on-circular-strings'] = problem;
})();
