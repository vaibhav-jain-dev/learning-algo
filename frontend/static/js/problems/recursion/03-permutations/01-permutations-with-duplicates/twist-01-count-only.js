/**
 * Count Only
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 * Parent: 03-permutations/01-permutations-with-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Only',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/01-permutations-with-duplicates',
        description: 'Instead of generating all unique permutations, return only the count of unique permutations without building them.',
        problem: 'Shifts from backtracking enumeration to a mathematical/combinatorial counting approach using factorial division by duplicate counts.',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the count only criteria.'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def count_only(nums):
    """
    Count Only

    Instead of generating all unique permutations, return only the count of unique permutations without building them.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_only([1,1,2]))  # Expected: 1
print(count_only([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountOnly solves the Count Only problem.
// Instead of generating all unique permutations, return only the count of unique permutations without building them.
// Time: O(?), Space: O(?)
func CountOnly(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountOnly([]int{1, 1, 2})) // Expected: 1
	fmt.Println(CountOnly([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/01-permutations-with-duplicates/twist-01-count-only', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/01-permutations-with-duplicates/twist-01-count-only'] = problem;
})();
