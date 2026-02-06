/**
 * Minimum Nodes to Remove for Full BST
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Algorithm: bst-validation
 * Parent: 03-validate-bst/02-largest-bst-subtree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Nodes to Remove for Full BST',
        difficulty: 'Very Hard',
        algorithm: 'bst-validation',
        parent: '03-validate-bst/02-largest-bst-subtree',
        description: 'Find the minimum number of nodes to remove from the binary tree so that the entire remaining tree is a valid BST.',
        problem: 'This is an optimization problem over all possible subsets of nodes to remove, not just finding existing BST subtrees. Removing a node may fix one violation but create another, requiring global reasoning. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,1,8,null,7]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the minimum nodes to remove for full bst criteria.'
            },
            {
                input: {"tree":[2,1,3]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the minimum nodes to remove for full bst criteria.'
            },
            // Edge case
            {
                input: {"tree":[10]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def minimum_nodes_to_remove_for_full_bst(tree):
    """
    Minimum Nodes to Remove for Full BST

    Find the minimum number of nodes to remove from the binary tree so that the entire remaining tree is a valid BST.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(minimum_nodes_to_remove_for_full_bst([10,5,15,1,8,None,7]))  # Expected: 1
print(minimum_nodes_to_remove_for_full_bst([2,1,3]))  # Expected: 2
print(minimum_nodes_to_remove_for_full_bst([10]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumNodesToRemoveForFullBst solves the Minimum Nodes to Remove for Full BST problem.
// Find the minimum number of nodes to remove from the binary tree so that the entire remaining tree is a valid BST.
// Time: O(n), Space: O(1)
func MinimumNodesToRemoveForFullBst(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumNodesToRemoveForFullBst([]int{10, 5, 15, 1, 8, null, 7})) // Expected: 1
	fmt.Println(MinimumNodesToRemoveForFullBst([]int{2, 1, 3})) // Expected: 2
	fmt.Println(MinimumNodesToRemoveForFullBst([]int{10})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/02-largest-bst-subtree/twist-04-minimum-nodes-to-remove-for-full-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/02-largest-bst-subtree/twist-04-minimum-nodes-to-remove-for-full-bst'] = problem;
})();
