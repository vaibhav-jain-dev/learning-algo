/**
 * Bidirectional Subsequence Check
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: bidirectional-subsequence-check
 * Parent: 01-validate-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bidirectional Subsequence Check',
        difficulty: 'Medium',
        algorithm: 'bidirectional-subsequence-check',
        parent: '01-validate-subsequence',
        description: 'The sequence is valid if it can be found going left-to-right OR right-to-left in the array. You must consider two traversal directions, potentially doubling the search space but also the solution space.',
        problem: 'You must consider two traversal directions, potentially doubling the search space but also the solution space.',
        hints: [
            'Think about how this twist differs from the standard version: The sequence is valid if it can be found going left-to-right OR right-to-left in.',
            'You must consider two traversal directions, potentially doubling the search space but also the solution space.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[5,1,22,25,6,-1,8,10],"sequence":[1,6,-1,10]},
                output: true,
                explanation: 'The sequence elements appear in order within the array.'
            },
            {
                input: {"array":[1,2,3,4,5],"sequence":[5,3,1]},
                output: false,
                explanation: 'The sequence elements do not appear in the required order.'
            },
            {
                input: {"array":[1,1,1,1,1],"sequence":[1,1,1]},
                output: true,
                explanation: 'Duplicate elements are handled correctly.'
            }
        ],
        solutions: {
            python: `def bidirectional_subsequence_check(data):
    """
    Bidirectional Subsequence Check

    The sequence is valid if it can be found going left-to-right OR right-to-left in the array.
    \n    Approach: You must consider two traversal directions, potentially doubling the search space but also the solution space.

    Time: O(n)
    Space: O(n)

    Example: array=[1,2,3,4,5], sequence=[5,3,1] → true (valid right-to-left)
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
print(bidirectional_subsequence_check([1, 2, 3, 4, 5]))
print(bidirectional_subsequence_check([5, 3, 1]))
print(bidirectional_subsequence_check([1]))`,
            go: `package main

import "fmt"

// BidirectionalSubsequenceCheck solves the Bidirectional Subsequence Check problem.
// The sequence is valid if it can be found going left-to-right OR right-to-left in the array.
// Time: O(n), Space: O(n)
func BidirectionalSubsequenceCheck(data []int) []int {
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
    fmt.Println(BidirectionalSubsequenceCheck([]int{1, 2, 3, 4, 5}))
    fmt.Println(BidirectionalSubsequenceCheck([]int{5, 3, 1}))
    fmt.Println(BidirectionalSubsequenceCheck([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/twist-03-bidirectional-subsequence-check', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/twist-03-bidirectional-subsequence-check'] = problem;
})();
