/**
 * Next Permutation with Constraints
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-permutations
 * Parent: 03-permutations/02-next-permutation
 */
(function() {
    'use strict';

    const problem = {
        name: 'Next Permutation with Constraints',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/02-next-permutation',
        description: 'Find the next permutation where certain positions are fixed and cannot be swapped.',
        problem: 'The standard pivot-and-swap approach breaks when some indices are immovable, requiring a constrained search that respects fixed positions.',
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
                output: [0,1,2],
                explanation: 'The next permutation with constraints for this input yields [0, 1, 2].'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def next_permutation_with_constraints(nums):
    """
    Next Permutation with Constraints

    Find the next permutation where certain positions are fixed and cannot be swapped.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(next_permutation_with_constraints([1,2,3]))  # Expected: [0,1,2]
print(next_permutation_with_constraints([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// NextPermutationWithConstraints solves the Next Permutation with Constraints problem.
// Find the next permutation where certain positions are fixed and cannot be swapped.
// Time: O(?), Space: O(?)
func NextPermutationWithConstraints(nums []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(NextPermutationWithConstraints([]int{1, 2, 3})) // Expected: [0,1,2]
	fmt.Println(NextPermutationWithConstraints([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/02-next-permutation/twist-03-next-permutation-with-constraints', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/02-next-permutation/twist-03-next-permutation-with-constraints'] = problem;
})();
