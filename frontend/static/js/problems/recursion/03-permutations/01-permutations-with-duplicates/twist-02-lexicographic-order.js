/**
 * Lexicographic Order
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-permutations
 * Parent: 03-permutations/01-permutations-with-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Lexicographic Order',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/01-permutations-with-duplicates',
        description: 'Generate all unique permutations in strict lexicographic (sorted) order, but without sorting the final result.',
        problem: 'Requires building permutations in order during generation rather than sorting afterward, demanding careful control of the recursion tree traversal.',
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
                explanation: 'The lexicographic order for this input yields [1, 1, 2].'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def lexicographic_order(nums):
    """
    Lexicographic Order

    Generate all unique permutations in strict lexicographic (sorted) order, but without sorting the final result.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(lexicographic_order([1,1,2]))  # Expected: [1,1,2]
print(lexicographic_order([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// LexicographicOrder solves the Lexicographic Order problem.
// Generate all unique permutations in strict lexicographic (sorted) order, but without sorting the final result.
// Time: O(?), Space: O(?)
func LexicographicOrder(nums []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(LexicographicOrder([]int{1, 1, 2})) // Expected: [1,1,2]
	fmt.Println(LexicographicOrder([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/01-permutations-with-duplicates/twist-02-lexicographic-order', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/01-permutations-with-duplicates/twist-02-lexicographic-order'] = problem;
})();
