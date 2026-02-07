/**
 * Inverse: Permutation to Rank
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-permutations
 * Parent: 03-permutations/03-kth-permutation
 */
(function() {
    'use strict';

    const problem = {
        name: 'Inverse: Permutation to Rank',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/03-kth-permutation',
        description: 'Given a specific permutation of [1..n], compute its 1-indexed rank in lexicographic order without enumerating all permutations.',
        problem: 'Reverses the original problem. Instead of mapping rank to permutation, you map permutation to rank, requiring counting smaller permutations using factorials.',
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
                input: {"n":3,"k":3},
                output: "result",
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"n":0,"k":0},
                output: "",
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def inverse_permutation_to_rank(n, k):
    """
    Inverse: Permutation to Rank

    Given a specific permutation of [1..n], compute its 1-indexed rank in lexicographic order without enumerating all permutations.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for item in n:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(inverse_permutation_to_rank(3, 3))  # Expected: "result"
print(inverse_permutation_to_rank(0, 0))  # Expected: ""
`,
            go: `package main

import "fmt"

// InversePermutationToRank solves the Inverse: Permutation to Rank problem.
// Given a specific permutation of [1..n], compute its 1-indexed rank in lexicographic order without enumerating all permutations.
// Time: O(?), Space: O(?)
func InversePermutationToRank(n int, k int) string {
	result := ""

	for _, v := range n {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(InversePermutationToRank(3, 3)) // Expected: "result"
	fmt.Println(InversePermutationToRank(0, 0)) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/03-kth-permutation/twist-02-inverse-permutation-to-rank', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/03-kth-permutation/twist-02-inverse-permutation-to-rank'] = problem;
})();
