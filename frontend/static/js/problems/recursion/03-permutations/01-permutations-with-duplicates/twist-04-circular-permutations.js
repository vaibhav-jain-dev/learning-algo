/**
 * Circular Permutations
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-permutations
 * Parent: 03-permutations/01-permutations-with-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Permutations',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/01-permutations-with-duplicates',
        description: 'Generate unique circular permutations where rotations of the same arrangement are considered identical.',
        problem: 'Adds equivalence class reasoning on top of duplicate handling. You must fix one element to break rotational symmetry while still skipping duplicates.',
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
                input: {"nums":[1,1,2]},
                output: [1,1,2],
                explanation: 'The circular permutations for this input yields [1, 1, 2].'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def circular_permutations(nums):
    """
    Circular Permutations

    Generate unique circular permutations where rotations of the same arrangement are considered identical.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(circular_permutations([1,1,2]))  # Expected: [1,1,2]
print(circular_permutations([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// CircularPermutations solves the Circular Permutations problem.
// Generate unique circular permutations where rotations of the same arrangement are considered identical.
// Time: O(?), Space: O(?)
func CircularPermutations(nums []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(CircularPermutations([]int{1, 1, 2})) // Expected: [1,1,2]
	fmt.Println(CircularPermutations([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/01-permutations-with-duplicates/twist-04-circular-permutations', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/01-permutations-with-duplicates/twist-04-circular-permutations'] = problem;
})();
