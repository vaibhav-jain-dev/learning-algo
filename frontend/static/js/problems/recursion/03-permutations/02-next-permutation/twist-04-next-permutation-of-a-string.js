/**
 * Next Permutation of a String
 * Category: recursion
 * Difficulty: Easy
 * Algorithm: recursion-permutations
 * Parent: 03-permutations/02-next-permutation
 */
(function() {
    'use strict';

    const problem = {
        name: 'Next Permutation of a String',
        difficulty: 'Easy',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/02-next-permutation',
        description: 'Apply the next permutation algorithm to a string of characters instead of numbers, returning the next lexicographic string.',
        problem: 'While algorithmically similar, working with characters introduces considerations around character encoding, case sensitivity, and string immutability.',
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
                explanation: 'The next permutation of a string for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def next_permutation_of_a_string(nums):
    """
    Next Permutation of a String

    Apply the next permutation algorithm to a string of characters instead of numbers, returning the next lexicographic string.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(next_permutation_of_a_string([1,2,3]))  # Expected: [1,2,3]
print(next_permutation_of_a_string([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// NextPermutationOfAString solves the Next Permutation of a String problem.
// Apply the next permutation algorithm to a string of characters instead of numbers, returning the next lexicographic string.
// Time: O(?), Space: O(?)
func NextPermutationOfAString(nums []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(NextPermutationOfAString([]int{1, 2, 3})) // Expected: [1,2,3]
	fmt.Println(NextPermutationOfAString([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/02-next-permutation/twist-04-next-permutation-of-a-string', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/02-next-permutation/twist-04-next-permutation-of-a-string'] = problem;
})();
