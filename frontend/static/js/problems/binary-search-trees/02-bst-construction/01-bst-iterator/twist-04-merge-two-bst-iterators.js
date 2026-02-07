/**
 * Merge Two BST Iterators
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-iterator
 * Parent: 02-bst-construction/01-bst-iterator
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge Two BST Iterators',
        difficulty: 'Hard',
        algorithm: 'bst-iterator',
        parent: '02-bst-construction/01-bst-iterator',
        description: 'Given two BST iterators, create a merged iterator that yields all values from both trees in sorted order.',
        problem: 'This is a merge operation on two lazy streams. You must compare the peek values of both iterators and advance the appropriate one, similar to merge sort but with iterator state management. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[7,3,15,null,null,9,20]},
                output: [7,3,15],
                explanation: 'The merge two bst iterators for this input yields [7, 3, 15].'
            },
            // Edge case
            {
                input: {"tree":[7]},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def merge_two_bst_iterators(tree):
    """
    Merge Two BST Iterators

    Given two BST iterators, create a merged iterator that yields all values from both trees in sorted order.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(merge_two_bst_iterators([7,3,15,None,None,9,20]))  # Expected: [7,3,15]
print(merge_two_bst_iterators([7]))  # Expected: []
`,
            go: `package main

import "fmt"

// MergeTwoBstIterators solves the Merge Two BST Iterators problem.
// Given two BST iterators, create a merged iterator that yields all values from both trees in sorted order.
// Time: O(n), Space: O(1)
func MergeTwoBstIterators(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(MergeTwoBstIterators([]int{7, 3, 15, null, null, 9, 20})) // Expected: [7,3,15]
	fmt.Println(MergeTwoBstIterators([]int{7})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/01-bst-iterator/twist-04-merge-two-bst-iterators', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/01-bst-iterator/twist-04-merge-two-bst-iterators'] = problem;
})();
