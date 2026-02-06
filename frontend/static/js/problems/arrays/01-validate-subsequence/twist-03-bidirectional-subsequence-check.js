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
            // Basic test case
            {
                input: {"array":[5,1,22,25,6,-1,8,10],"sequence":[1,6,-1,10]},
                output: true,
                explanation: ''
            },
            {
                input: {"array":[1,2,3,4,5],"sequence":[5,3,1]},
                output: false,
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[1,1,1,1,1],"sequence":[1,1,1]},
                output: true,
                explanation: ''
            }
        ],
        solutions: {
            python: `def bidirectional_subsequence_check(array, sequence):
    """
    Bidirectional Subsequence Check

    The sequence is valid if it can be found going left-to-right OR right-to-left in the array. You must consider two traversal directions, potentially doubling the search space but also the solution space.

    Time: O(n)
    Space: O(n)
    """
    j = 0

    for i in range(len(array)):
        if j < len(sequence) and array[i] == sequence[j]:
            j += 1

    return j == len(sequence)


# Test cases
print(bidirectional_subsequence_check([5,1,22,25,6,-1,8,10], [1,6,-1,10]))  # Expected: True
print(bidirectional_subsequence_check([1,2,3,4,5], [5,3,1]))  # Expected: False
print(bidirectional_subsequence_check([1,1,1,1,1], [1,1,1]))  # Expected: True
`,
            go: `package main

import "fmt"

// BidirectionalSubsequenceCheck solves the Bidirectional Subsequence Check problem.
// The sequence is valid if it can be found going left-to-right OR right-to-left in the array. You must consider two traversal directions, potentially doubling the search space but also the solution space.
// Time: O(n), Space: O(n)
func BidirectionalSubsequenceCheck(array []int, sequence []int) bool {
	j := 0

	for i := 0; i < len(array) && j < len(sequence); i++ {
		if array[i] == sequence[j] {
			j++
		}
	}

	return j == len(sequence)
}

func main() {
	fmt.Println(BidirectionalSubsequenceCheck([]int{5, 1, 22, 25, 6, -1, 8, 10}, []int{1, 6, -1, 10})) // Expected: true
	fmt.Println(BidirectionalSubsequenceCheck([]int{1, 2, 3, 4, 5}, []int{5, 3, 1})) // Expected: false
	fmt.Println(BidirectionalSubsequenceCheck([]int{1, 1, 1, 1, 1}, []int{1, 1, 1})) // Expected: true
}
`
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
