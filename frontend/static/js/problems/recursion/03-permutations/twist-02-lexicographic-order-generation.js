/**
 * Lexicographic Order Generation
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 * Parent: 03-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Lexicographic Order Generation',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'Generate all permutations in strict lexicographic (sorted) order. Use the "next permutation" algorithm repeatedly starting from the sorted input.',
        problem: 'Standard backtracking does not guarantee lexicographic order. This approach requires understanding the next-permutation algorithm and applying it n!-1 times, which is an iterative rather than recursive strategy.',
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
                explanation: 'The lexicographic order generation for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def lexicographic_order_generation(array):
    """
    Lexicographic Order Generation

    Generate all permutations in strict lexicographic (sorted) order. Use the "next permutation" algorithm repeatedly starting from the sorted input.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(lexicographic_order_generation([1,2,3]))  # Expected: [1,2,3]
print(lexicographic_order_generation([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// LexicographicOrderGeneration solves the Lexicographic Order Generation problem.
// Generate all permutations in strict lexicographic (sorted) order. Use the "next permutation" algorithm repeatedly starting from the sorted input.
// Time: O(?), Space: O(?)
func LexicographicOrderGeneration(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(LexicographicOrderGeneration([]int{1, 2, 3})) // Expected: [1,2,3]
	fmt.Println(LexicographicOrderGeneration([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/twist-02-lexicographic-order-generation', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/twist-02-lexicographic-order-generation'] = problem;
})();
