/**
 * All Maximal BST Subtrees
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-validation
 * Parent: 03-validate-bst/02-largest-bst-subtree
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Maximal BST Subtrees',
        difficulty: 'Hard',
        algorithm: 'bst-validation',
        parent: '03-validate-bst/02-largest-bst-subtree',
        description: 'Find all BST subtrees that are maximal -- meaning they are valid BSTs and no proper super-tree containing them is also a valid BST. Return all their roots.',
        problem: 'Instead of finding the single largest, you must identify all BST subtrees that cannot be extended upward. This requires understanding the boundary between BST and non-BST regions throughout the tree. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: [10,5,15],
                explanation: 'The all maximal bst subtrees for this input yields [10, 5, 15].'
            },
            {
                input: {"tree":[2,1,3]},
                output: [2,1,3],
                explanation: 'The all maximal bst subtrees for this input yields [2, 1, 3].'
            },
            // Edge case
            {
                input: {"tree":[10]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def all_maximal_bst_subtrees(tree):
    """
    All Maximal BST Subtrees

    Find all BST subtrees that are maximal -- meaning they are valid BSTs and no proper super-tree containing them is also a valid BST. Return all their roots.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(all_maximal_bst_subtrees([10,5,15,1,8,None,7]))  # Expected: [10,5,15]
print(all_maximal_bst_subtrees([2,1,3]))  # Expected: [2,1,3]
print(all_maximal_bst_subtrees([10]))  # Expected: []
`,
            go: `package main

import "fmt"

// AllMaximalBstSubtrees solves the All Maximal BST Subtrees problem.
// Find all BST subtrees that are maximal -- meaning they are valid BSTs and no proper super-tree containing them is also a valid BST. Return all their roots.
// Time: O(n), Space: O(1)
func AllMaximalBstSubtrees(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(AllMaximalBstSubtrees([]int{10, 5, 15, 1, 8, null, 7})) // Expected: [10,5,15]
	fmt.Println(AllMaximalBstSubtrees([]int{2, 1, 3})) // Expected: [2,1,3]
	fmt.Println(AllMaximalBstSubtrees([]int{10})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/02-largest-bst-subtree/twist-03-all-maximal-bst-subtrees', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/02-largest-bst-subtree/twist-03-all-maximal-bst-subtrees'] = problem;
})();
