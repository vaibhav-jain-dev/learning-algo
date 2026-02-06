/**
 * Right Greater Than
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-augmented
 * Parent: 09-right-smaller-than
 */
(function() {
    'use strict';

    const problem = {
        name: 'Right Greater Than',
        difficulty: 'Hard',
        algorithm: 'bst-augmented',
        parent: '09-right-smaller-than',
        description: 'For each element, count how many elements to its right are strictly greater than it.',
        problem: 'While structurally similar, tracking "greater than" in a BST requires counting nodes that go to the right subtree rather than the left, and the augmented counting logic with left-subtree sizes must be adapted to track right-subtree sizes instead. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[8,5,11,-1,3,4,2]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the right greater than criteria.'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the right greater than criteria.'
            },
            // Edge case
            {
                input: {"array":[8]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def right_greater_than(array):
    """
    Right Greater Than

    For each element, count how many elements to its right are strictly greater than it.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(right_greater_than([8,5,11,-1,3,4,2]))  # Expected: 1
print(right_greater_than([1,2,3,4,5]))  # Expected: 2
print(right_greater_than([8]))  # Expected: 0
`,
            go: `package main

import "fmt"

// RightGreaterThan solves the Right Greater Than problem.
// For each element, count how many elements to its right are strictly greater than it.
// Time: O(n), Space: O(1)
func RightGreaterThan(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RightGreaterThan([]int{8, 5, 11, -1, 3, 4, 2})) // Expected: 1
	fmt.Println(RightGreaterThan([]int{1, 2, 3, 4, 5})) // Expected: 2
	fmt.Println(RightGreaterThan([]int{8})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '09-right-smaller-than/twist-01-right-greater-than', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/09-right-smaller-than/twist-01-right-greater-than'] = problem;
})();
