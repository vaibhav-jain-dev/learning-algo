/**
 * Previous Permutation
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 * Parent: 03-permutations/02-next-permutation
 */
(function() {
    'use strict';

    const problem = {
        name: 'Previous Permutation',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/02-next-permutation',
        description: 'Instead of finding the next lexicographically greater permutation, find the previous lexicographically smaller permutation.',
        problem: 'Reverses the scanning direction logic -- you must find the first increasing pair from the right and swap with the largest smaller element, then reverse.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[1,2,3]},
                output: [1,2,3],
                explanation: 'The previous permutation for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def previous_permutation(nums):
    """
    Previous Permutation

    Instead of finding the next lexicographically greater permutation, find the previous lexicographically smaller permutation.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(previous_permutation([1,2,3]))  # Expected: [1,2,3]
print(previous_permutation([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// PreviousPermutation solves the Previous Permutation problem.
// Instead of finding the next lexicographically greater permutation, find the previous lexicographically smaller permutation.
// Time: O(?), Space: O(?)
func PreviousPermutation(nums []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(PreviousPermutation([]int{1, 2, 3})) // Expected: [1,2,3]
	fmt.Println(PreviousPermutation([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/02-next-permutation/twist-01-previous-permutation', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/02-next-permutation/twist-01-previous-permutation'] = problem;
})();
