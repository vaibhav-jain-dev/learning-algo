/**
 * Same AVL Trees
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Algorithm: bst-comparison
 * Parent: 08-same-bsts
 */
(function() {
    'use strict';

    const problem = {
        name: 'Same AVL Trees',
        difficulty: 'Very Hard',
        algorithm: 'bst-comparison',
        parent: '08-same-bsts',
        description: 'Given two arrays, determine if inserting them into an AVL tree (self-balancing BST) with rotations would produce the same AVL tree.',
        problem: 'AVL rotations change the tree structure during insertion, so two arrays producing the same BST might produce different AVL trees. You must simulate the AVL insertions with rotations, fundamentally changing the comparison logic. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"arrayOne":[10,15,8,12,94,81,5,2,11],"arrayTwo":[10,8,5,15,2,12,11,94,81]},
                output: true,
                explanation: 'The same avl trees condition is satisfied for this input.'
            },
            {
                input: {"arrayOne":[10,15,8,12,94,81,5,2,11],"arrayTwo":[10,8,5,15,2,12,94,81,11]},
                output: false,
                explanation: 'The same avl trees condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"arrayOne":[10],"arrayTwo":[10]},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def same_avl_trees(arrayOne, arrayTwo):
    """
    Same AVL Trees

    Given two arrays, determine if inserting them into an AVL tree (self-balancing BST) with rotations would produce the same AVL tree.

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(arrayOne)):
        if j < len(arrayTwo) and arrayOne[i] == arrayTwo[j]:
            j += 1

    return j == len(arrayTwo)


# Test cases
print(same_avl_trees([10,15,8,12,94,81,5,2,11], [10,8,5,15,2,12,11,94,81]))  # Expected: True
print(same_avl_trees([10,15,8,12,94,81,5,2,11], [10,8,5,15,2,12,94,81,11]))  # Expected: False
print(same_avl_trees([10], [10]))  # Expected: False
`,
            go: `package main

import "fmt"

// SameAvlTrees solves the Same AVL Trees problem.
// Given two arrays, determine if inserting them into an AVL tree (self-balancing BST) with rotations would produce the same AVL tree.
// Time: O(n), Space: O(1)
func SameAvlTrees(arrayOne []int, arrayTwo []int) bool {
	j := 0

	for i := 0; i < len(arrayOne) && j < len(arrayTwo); i++ {
		if arrayOne[i] == arrayTwo[j] {
			j++
		}
	}

	return j == len(arrayTwo)
}

func main() {
	fmt.Println(SameAvlTrees([]int{10, 15, 8, 12, 94, 81, 5, 2, 11}, []int{10, 8, 5, 15, 2, 12, 11, 94, 81})) // Expected: true
	fmt.Println(SameAvlTrees([]int{10, 15, 8, 12, 94, 81, 5, 2, 11}, []int{10, 8, 5, 15, 2, 12, 94, 81, 11})) // Expected: false
	fmt.Println(SameAvlTrees([]int{10}, []int{10})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '08-same-bsts/twist-05-same-avl-trees', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/08-same-bsts/twist-05-same-avl-trees'] = problem;
})();
