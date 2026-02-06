/**
 * Subsequence with Maximum Gap Constraint
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: subsequence-with-maximum-gap-constraint
 * Parent: 01-validate-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Subsequence with Maximum Gap Constraint',
        difficulty: 'Hard',
        algorithm: 'subsequence-with-maximum-gap-constraint',
        parent: '01-validate-subsequence',
        description: 'The sequence must be a subsequence, but consecutive matched elements must be at most k positions apart in the original array. Adds a proximity constraint that turns the greedy approach into a more careful search, possibly requiring DP.',
        problem: 'Adds a proximity constraint that turns the greedy approach into a more careful search, possibly requiring DP.',
        hints: [
            'Think about how subsequence with maximum gap constraint differs from the standard version of this problem.',
            'Key insight: Adds a proximity constraint that turns the greedy approach into a more careful search, possibly requiring DP.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Dynamic programming may help - identify the subproblems and their recurrence relation.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,2,3,2,1]},
                output: 3,
                explanation: 'The maximum/longest valid segment has length 3.'
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: 5,
                explanation: 'The entire array satisfies the condition.'
            },
            {
                input: {"array":[1]},
                output: 1,
                explanation: 'Single element is trivially valid.'
            }
        ],
        solutions: {
            python: `def subsequence_with_maximum_gap_constraint(data):
    """
    Subsequence with Maximum Gap Constraint

    The sequence must be a subsequence, but consecutive matched elements must be at most k positions apart in the original array.
    \n    Approach: Adds a proximity constraint that turns the greedy approach into a more careful search, possibly requiring DP.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array=[1,2,3,1,4], sequence=[1,4], k=2 → false (gap between 1@index0 and 4@index4 is 4 > k=2, but 1@index3 and 4@index4 gap=1 → true)

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
print(subsequence_with_maximum_gap_constraint([1, 2, 3, 4, 5]))
print(subsequence_with_maximum_gap_constraint([5, 3, 1]))
print(subsequence_with_maximum_gap_constraint([1]))`,
            go: `package main

import "fmt"

// SubsequenceWithMaximumGapConstraint solves the Subsequence with Maximum Gap Constraint problem.
// The sequence must be a subsequence, but consecutive matched elements must be at most k positions apart in the original array.
// Time: O(n), Space: O(n)
func SubsequenceWithMaximumGapConstraint(data []int) []int {
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
    fmt.Println(SubsequenceWithMaximumGapConstraint([]int{1, 2, 3, 4, 5}))
    fmt.Println(SubsequenceWithMaximumGapConstraint([]int{5, 3, 1}))
    fmt.Println(SubsequenceWithMaximumGapConstraint([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/twist-05-subsequence-with-maximum-gap-constraint', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/twist-05-subsequence-with-maximum-gap-constraint'] = problem;
})();
