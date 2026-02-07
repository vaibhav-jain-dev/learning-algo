/**
 * Subsets of Fixed Size k
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-powerset
 * Parent: 04-powerset
 */
(function() {
    'use strict';

    const problem = {
        name: 'Subsets of Fixed Size k',
        difficulty: 'Medium',
        algorithm: 'recursion-powerset',
        parent: '04-powerset',
        description: 'Instead of all subsets, generate only subsets of exactly size k from the array.',
        problem: 'Changes the recursion from unbounded include/exclude to a combination-selection pattern with a target size constraint, pruning branches early when insufficient elements remain.',
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
                input: {"array":[1,2,3]},
                output: [1,2,3],
                explanation: 'The subsets of fixed size k for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def subsets_of_fixed_size_k(array):
    """
    Subsets of Fixed Size k

    Instead of all subsets, generate only subsets of exactly size k from the array.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(subsets_of_fixed_size_k([1,2,3]))  # Expected: [1,2,3]
print(subsets_of_fixed_size_k([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// SubsetsOfFixedSizeK solves the Subsets of Fixed Size k problem.
// Instead of all subsets, generate only subsets of exactly size k from the array.
// Time: O(?), Space: O(?)
func SubsetsOfFixedSizeK(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(SubsetsOfFixedSizeK([]int{1, 2, 3})) // Expected: [1,2,3]
	fmt.Println(SubsetsOfFixedSizeK([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '04-powerset/twist-02-subsets-of-fixed-size-k', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/04-powerset/twist-02-subsets-of-fixed-size-k'] = problem;
})();
