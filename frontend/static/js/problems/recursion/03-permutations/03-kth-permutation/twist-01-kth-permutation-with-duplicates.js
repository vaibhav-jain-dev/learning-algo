/**
 * Kth Permutation with Duplicates
 * Category: recursion
 * Difficulty: Very Hard
 * Algorithm: recursion-permutations
 * Parent: 03-permutations/03-kth-permutation
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Permutation with Duplicates',
        difficulty: 'Very Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/03-kth-permutation',
        description: 'Find the kth permutation sequence when the set contains duplicate elements, so not all n! permutations are unique.',
        problem: 'The factorial number system approach breaks because duplicate elements reduce the total count of unique permutations, requiring multinomial coefficient calculations.',
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
            python: `def kth_permutation_with_duplicates(n, k):
    """
    Kth Permutation with Duplicates

    Find the kth permutation sequence when the set contains duplicate elements, so not all n! permutations are unique.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for item in n:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(kth_permutation_with_duplicates(3, 3))  # Expected: "result"
print(kth_permutation_with_duplicates(0, 0))  # Expected: ""
`,
            go: `package main

import "fmt"

// KthPermutationWithDuplicates solves the Kth Permutation with Duplicates problem.
// Find the kth permutation sequence when the set contains duplicate elements, so not all n! permutations are unique.
// Time: O(?), Space: O(?)
func KthPermutationWithDuplicates(n int, k int) string {
	result := ""

	for _, v := range n {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(KthPermutationWithDuplicates(3, 3)) // Expected: "result"
	fmt.Println(KthPermutationWithDuplicates(0, 0)) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/03-kth-permutation/twist-01-kth-permutation-with-duplicates', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/03-kth-permutation/twist-01-kth-permutation-with-duplicates'] = problem;
})();
