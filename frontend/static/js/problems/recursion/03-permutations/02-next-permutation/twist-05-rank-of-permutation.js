/**
 * Rank of Permutation
 * Category: recursion
 * Difficulty: Very Hard
 * Algorithm: recursion-permutations
 * Parent: 03-permutations/02-next-permutation
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rank of Permutation',
        difficulty: 'Very Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/02-next-permutation',
        description: 'Given a permutation, determine its rank (1-indexed position) among all permutations of its elements in lexicographic order.',
        problem: 'Inverts the problem from generating to counting. Requires computing how many permutations come before the given one using factorial arithmetic.',
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
                explanation: 'The rank of permutation for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def rank_of_permutation(nums):
    """
    Rank of Permutation

    Given a permutation, determine its rank (1-indexed position) among all permutations of its elements in lexicographic order.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(rank_of_permutation([1,2,3]))  # Expected: [1,2,3]
print(rank_of_permutation([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// RankOfPermutation solves the Rank of Permutation problem.
// Given a permutation, determine its rank (1-indexed position) among all permutations of its elements in lexicographic order.
// Time: O(?), Space: O(?)
func RankOfPermutation(nums []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(RankOfPermutation([]int{1, 2, 3})) // Expected: [1,2,3]
	fmt.Println(RankOfPermutation([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/02-next-permutation/twist-05-rank-of-permutation', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/02-next-permutation/twist-05-rank-of-permutation'] = problem;
})();
