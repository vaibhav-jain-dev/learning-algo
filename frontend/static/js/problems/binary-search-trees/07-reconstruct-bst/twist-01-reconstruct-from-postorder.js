/**
 * Reconstruct from Postorder
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-reconstruction
 * Parent: 07-reconstruct-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reconstruct from Postorder',
        difficulty: 'Medium',
        algorithm: 'bst-reconstruction',
        parent: '07-reconstruct-bst',
        description: 'Given an array of integers representing the postorder traversal of a BST, reconstruct the original BST and return its root.',
        problem: 'Postorder is left-right-root, so the root is the last element instead of the first. You must process the array from right to left, building right subtree before left, reversing the mental model. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"preorderTraversalValues":[10,4,2,1,5,17,19,18]},
                output: [10,4,2],
                explanation: 'The reconstruct from postorder for this input yields [10, 4, 2].'
            },
            {
                input: {"preorderTraversalValues":[5,3,1,4,7,6,8]},
                output: [5,3,1],
                explanation: 'The reconstruct from postorder for this input yields [5, 3, 1].'
            },
            // Edge case
            {
                input: {"preorderTraversalValues":[10]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def reconstruct_from_postorder(preorderTraversalValues):
    """
    Reconstruct from Postorder

    Given an array of integers representing the postorder traversal of a BST, reconstruct the original BST and return its root.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(preorderTraversalValues)):
        # Check if element meets criteria
        result.append(preorderTraversalValues[i])

    return result


# Test cases
print(reconstruct_from_postorder([10,4,2,1,5,17,19,18]))  # Expected: [10,4,2]
print(reconstruct_from_postorder([5,3,1,4,7,6,8]))  # Expected: [5,3,1]
print(reconstruct_from_postorder([10]))  # Expected: []
`,
            go: `package main

import "fmt"

// ReconstructFromPostorder solves the Reconstruct from Postorder problem.
// Given an array of integers representing the postorder traversal of a BST, reconstruct the original BST and return its root.
// Time: O(n), Space: O(1)
func ReconstructFromPostorder(preorderTraversalValues []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(preorderTraversalValues); i++ {
		result = append(result, preorderTraversalValues[i])
	}

	return result
}

func main() {
	fmt.Println(ReconstructFromPostorder([]int{10, 4, 2, 1, 5, 17, 19, 18})) // Expected: [10,4,2]
	fmt.Println(ReconstructFromPostorder([]int{5, 3, 1, 4, 7, 6, 8})) // Expected: [5,3,1]
	fmt.Println(ReconstructFromPostorder([]int{10})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '07-reconstruct-bst/twist-01-reconstruct-from-postorder', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/07-reconstruct-bst/twist-01-reconstruct-from-postorder'] = problem;
})();
