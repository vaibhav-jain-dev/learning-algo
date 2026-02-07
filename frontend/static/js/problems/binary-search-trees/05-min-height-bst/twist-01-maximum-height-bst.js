/**
 * Maximum Height BST
 * Category: binary-search-trees
 * Difficulty: Easy
 * Algorithm: bst-construction-balanced
 * Parent: 05-min-height-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Height BST',
        difficulty: 'Easy',
        algorithm: 'bst-construction-balanced',
        parent: '05-min-height-bst',
        description: 'Given a sorted array, construct a BST with the maximum possible height (essentially a linked list). Return the root.',
        problem: 'Instead of balancing by choosing the middle element, you must think about how insertion order creates degenerate trees, reversing the core intuition of the original problem. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,2,5,7,10,13,14,15,22]},
                output: [1,2,5],
                explanation: 'The maximum height bst for this input yields [1, 2, 5].'
            },
            {
                input: {"array":[1,2,3]},
                output: [1,2,3],
                explanation: 'The maximum height bst for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def maximum_height_bst(array):
    """
    Maximum Height BST

    Given a sorted array, construct a BST with the maximum possible height (essentially a linked list). Return the root.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(maximum_height_bst([1,2,5,7,10,13,14,15,22]))  # Expected: [1,2,5]
print(maximum_height_bst([1,2,3]))  # Expected: [1,2,3]
print(maximum_height_bst([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// MaximumHeightBst solves the Maximum Height BST problem.
// Given a sorted array, construct a BST with the maximum possible height (essentially a linked list). Return the root.
// Time: O(n), Space: O(1)
func MaximumHeightBst(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(MaximumHeightBst([]int{1, 2, 5, 7, 10, 13, 14, 15, 22})) // Expected: [1,2,5]
	fmt.Println(MaximumHeightBst([]int{1, 2, 3})) // Expected: [1,2,3]
	fmt.Println(MaximumHeightBst([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '05-min-height-bst/twist-01-maximum-height-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/05-min-height-bst/twist-01-maximum-height-bst'] = problem;
})();
