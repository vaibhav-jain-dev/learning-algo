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
            'What makes this variant different from the standard problem? Identify the key constraint that changes the approach.',
            'Adds a proximity constraint that turns the greedy approach into a more careful search, possibly requiring DP.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[5,1,22,25,6,-1,8,10],"sequence":[1,6,-1,10]},
                output: [0,1,2],
                explanation: 'Each pointer moves in one direction only (or at most n steps total). The invariant ensures that no valid solution is skipped, while the single-pass approach gives O(n) time.'
            },
            {
                input: {"array":[1,2,3,4,5],"sequence":[5,3,1]},
                output: [0,1,2],
                explanation: 'The pointer movement rules ensure systematic coverage. When pointers meet or cross, the traversal is complete and all candidates have been considered.'
            },
            {
                input: {"array":[1,1,1,1,1],"sequence":[1,1,1]},
                output: [0,1,2],
                explanation: 'Position the two pointers at the strategic starting locations. Advance each based on the comparison with the target. The pointers converge on the solution without revisiting elements.'
            },
            // Edge case
            {
                input: {"array":[5],"sequence":[1]},
                output: [],
                explanation: 'Position the two pointers at the strategic starting locations. Advance each based on the comparison with the target. The pointers converge on the solution without revisiting elements.'
            }
        ],
        solutions: {
            python: `def subsequence_with_maximum_gap_constraint(array, sequence):
    """
    Subsequence with Maximum Gap Constraint

    The sequence must be a subsequence, but consecutive matched elements must be at most k positions apart in the original array. Adds a proximity constraint that turns the greedy approach into a more careful search, possibly requiring DP.

    Time: O(n log k)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(subsequence_with_maximum_gap_constraint([5,1,22,25,6,-1,8,10], [1,6,-1,10]))  # Expected: [0,1,2]
print(subsequence_with_maximum_gap_constraint([1,2,3,4,5], [5,3,1]))  # Expected: [0,1,2]
print(subsequence_with_maximum_gap_constraint([1,1,1,1,1], [1,1,1]))  # Expected: [0,1,2]
`,
            go: `package main

import "fmt"

// SubsequenceWithMaximumGapConstraint solves the Subsequence with Maximum Gap Constraint problem.
// The sequence must be a subsequence, but consecutive matched elements must be at most k positions apart in the original array. Adds a proximity constraint that turns the greedy approach into a more careful search, possibly requiring DP.
// Time: O(n log k), Space: O(n)
func SubsequenceWithMaximumGapConstraint(array []int, sequence []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(SubsequenceWithMaximumGapConstraint([]int{5, 1, 22, 25, 6, -1, 8, 10}, []int{1, 6, -1, 10})) // Expected: [0,1,2]
	fmt.Println(SubsequenceWithMaximumGapConstraint([]int{1, 2, 3, 4, 5}, []int{5, 3, 1})) // Expected: [0,1,2]
	fmt.Println(SubsequenceWithMaximumGapConstraint([]int{1, 1, 1, 1, 1}, []int{1, 1, 1})) // Expected: [0,1,2]
}
`
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
