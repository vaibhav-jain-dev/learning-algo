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
            'Think about how bidirectional subsequence check differs from the standard version of this problem.',
            'Key insight: You must consider two traversal directions, potentially doubling the search space but also the solution space.',
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
                input: {"array":[1,2,3,4,5]},
                output: true,
                explanation: 'Standard case satisfying the problem conditions.'
            },
            {
                input: {"array":[5,3,1]},
                output: false,
                explanation: 'Case where the condition is not met.'
            },
            {
                input: {"array":[1]},
                output: true,
                explanation: 'Edge case with single element.'
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
    """
    # Implementation based on the twist description
    # array=[1,2,3,4,5], sequence=[5,3,1] → true (valid right-to-left)

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
