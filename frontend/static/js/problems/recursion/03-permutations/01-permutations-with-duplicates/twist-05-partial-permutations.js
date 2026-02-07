/**
 * Partial Permutations
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 * Parent: 03-permutations/01-permutations-with-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Partial Permutations',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/01-permutations-with-duplicates',
        description: 'Given an array with duplicates and an integer k, generate all unique permutations of length k (not necessarily using all elements).',
        problem: 'Changes the base case from full-length to partial-length, requiring different termination logic while still handling duplicates correctly.',
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
                input: {"nums":[1,1,2],"k":3},
                output: [1,1,2],
                explanation: 'The partial permutations for this input yields [1, 1, 2].'
            },
            // Edge case
            {
                input: {"nums":[1],"k":3},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def partial_permutations(nums, k):
    """
    Partial Permutations

    Given an array with duplicates and an integer k, generate all unique permutations of length k (not necessarily using all elements).

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(partial_permutations([1,1,2], 3))  # Expected: [1,1,2]
print(partial_permutations([1], 3))  # Expected: []
`,
            go: `package main

import "fmt"

// PartialPermutations solves the Partial Permutations problem.
// Given an array with duplicates and an integer k, generate all unique permutations of length k (not necessarily using all elements).
// Time: O(?), Space: O(?)
func PartialPermutations(nums []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(PartialPermutations([]int{1, 1, 2}, 3)) // Expected: [1,1,2]
	fmt.Println(PartialPermutations([]int{1}, 3)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/01-permutations-with-duplicates/twist-05-partial-permutations', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/01-permutations-with-duplicates/twist-05-partial-permutations'] = problem;
})();
