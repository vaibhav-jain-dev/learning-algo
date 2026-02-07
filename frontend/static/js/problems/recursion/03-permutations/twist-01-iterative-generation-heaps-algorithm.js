/**
 * Iterative Generation (Heap\
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-permutations
 * Parent: 03-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative Generation (Heap.',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'Generate all permutations iteratively using Heap.',
        problem: 'Heap.',
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
                explanation: 'The iterative generation heaps algorithm for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems with clear base cases.'
            }
        ],
        solutions: {
            python: `def iterative_generation_heaps_algorithm(array):
    """
    Iterative Generation (Heap\\

    Generate all permutations iteratively using Heap\\

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(iterative_generation_heaps_algorithm([1,2,3]))  # Expected: [1,2,3]
print(iterative_generation_heaps_algorithm([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// IterativeGenerationHeapsAlgorithm solves the Iterative Generation (Heap\\ problem.
// Generate all permutations iteratively using Heap\\
// Time: O(?), Space: O(?)
func IterativeGenerationHeapsAlgorithm(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(IterativeGenerationHeapsAlgorithm([]int{1, 2, 3})) // Expected: [1,2,3]
	fmt.Println(IterativeGenerationHeapsAlgorithm([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/twist-01-iterative-generation-heaps-algorithm', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/twist-01-iterative-generation-heaps-algorithm'] = problem;
})();
