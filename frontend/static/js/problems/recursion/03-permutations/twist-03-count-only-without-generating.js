/**
 * Count Only Without Generating
 * Category: recursion
 * Difficulty: Easy
 * Algorithm: recursion-permutations
 * Parent: 03-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Only Without Generating',
        difficulty: 'Easy',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'Return only the count of permutations without generating them. Prove that the answer is always n! and explain why the recursive structure mirrors the factorial definition.',
        problem: 'Shifts from generation to combinatorial reasoning. The recursive decomposition of permutations (choose first element from n options, recurse on remaining n-1) directly mirrors n! = n * (n-1)!.',
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
                output: 1,
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def count_only_without_generating(array):
    """
    Count Only Without Generating

    Return only the count of permutations without generating them. Prove that the answer is always n! and explain why the recursive structure mirrors the factorial definition.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_only_without_generating([1,2,3]))  # Expected: 1
print(count_only_without_generating([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountOnlyWithoutGenerating solves the Count Only Without Generating problem.
// Return only the count of permutations without generating them. Prove that the answer is always n! and explain why the recursive structure mirrors the factorial definition.
// Time: O(?), Space: O(?)
func CountOnlyWithoutGenerating(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountOnlyWithoutGenerating([]int{1, 2, 3})) // Expected: 1
	fmt.Println(CountOnlyWithoutGenerating([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/twist-03-count-only-without-generating', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/twist-03-count-only-without-generating'] = problem;
})();
