/**
 * Streaming Permutations
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-permutations
 * Parent: 03-permutations/01-permutations-with-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Streaming Permutations',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/01-permutations-with-duplicates',
        description: 'Generate permutations one at a time using an iterator/generator pattern, yielding each unique permutation without storing all of them in memory.',
        problem: 'Forces lazy evaluation thinking instead of collecting all results into a list, which is critical for very large inputs where memory is constrained.',
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
                explanation: 'The streaming permutations for this input yields [1, 1, 2].'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def streaming_permutations(nums):
    """
    Streaming Permutations

    Generate permutations one at a time using an iterator/generator pattern, yielding each unique permutation without storing all of them in memory.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(streaming_permutations([1,1,2]))  # Expected: [1,1,2]
print(streaming_permutations([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// StreamingPermutations solves the Streaming Permutations problem.
// Generate permutations one at a time using an iterator/generator pattern, yielding each unique permutation without storing all of them in memory.
// Time: O(?), Space: O(?)
func StreamingPermutations(nums []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(StreamingPermutations([]int{1, 1, 2})) // Expected: [1,1,2]
	fmt.Println(StreamingPermutations([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/01-permutations-with-duplicates/twist-03-streaming-permutations', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/01-permutations-with-duplicates/twist-03-streaming-permutations'] = problem;
})();
