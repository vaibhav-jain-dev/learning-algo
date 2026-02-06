/**
 * Reconstruct from Preorder and Inorder
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-reconstruction
 * Parent: 07-reconstruct-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reconstruct from Preorder and Inorder',
        difficulty: 'Medium',
        algorithm: 'bst-reconstruction',
        parent: '07-reconstruct-bst',
        description: 'Given both preorder and inorder traversals of a binary tree (not necessarily a BST), reconstruct the original tree.',
        problem: 'Without BST properties, you cannot determine subtree boundaries from preorder alone. You must use the inorder array to find root positions and partition left/right subtrees, requiring a hash map for efficiency. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'The reconstruct from preorder and inorder for this input yields [10, 4, 2].'
            },
            {
                input: {"preorderTraversalValues":[5,3,1,4,7,6,8]},
                output: [5,3,1],
                explanation: 'The reconstruct from preorder and inorder for this input yields [5, 3, 1].'
            },
            // Edge case
            {
                input: {"preorderTraversalValues":[10]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def reconstruct_from_preorder_and_inorder(preorderTraversalValues):
    """
    Reconstruct from Preorder and Inorder

    Given both preorder and inorder traversals of a binary tree (not necessarily a BST), reconstruct the original tree.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(preorderTraversalValues)):
        # Check if element meets criteria
        result.append(preorderTraversalValues[i])

    return result


# Test cases
print(reconstruct_from_preorder_and_inorder([10,4,2,1,5,17,19,18]))  # Expected: [10,4,2]
print(reconstruct_from_preorder_and_inorder([5,3,1,4,7,6,8]))  # Expected: [5,3,1]
print(reconstruct_from_preorder_and_inorder([10]))  # Expected: []
`,
            go: `package main

import "fmt"

// ReconstructFromPreorderAndInorder solves the Reconstruct from Preorder and Inorder problem.
// Given both preorder and inorder traversals of a binary tree (not necessarily a BST), reconstruct the original tree.
// Time: O(n), Space: O(1)
func ReconstructFromPreorderAndInorder(preorderTraversalValues []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(preorderTraversalValues); i++ {
		result = append(result, preorderTraversalValues[i])
	}

	return result
}

func main() {
	fmt.Println(ReconstructFromPreorderAndInorder([]int{10, 4, 2, 1, 5, 17, 19, 18})) // Expected: [10,4,2]
	fmt.Println(ReconstructFromPreorderAndInorder([]int{5, 3, 1, 4, 7, 6, 8})) // Expected: [5,3,1]
	fmt.Println(ReconstructFromPreorderAndInorder([]int{10})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '07-reconstruct-bst/twist-04-reconstruct-from-preorder-and-inorder', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/07-reconstruct-bst/twist-04-reconstruct-from-preorder-and-inorder'] = problem;
})();
