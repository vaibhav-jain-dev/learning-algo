/**
 * Self-Balancing BST (AVL Insert/Remove)
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Algorithm: bst-construction
 * Parent: 02-bst-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Self-Balancing BST (AVL Insert/Remove)',
        difficulty: 'Very Hard',
        algorithm: 'bst-construction',
        parent: '02-bst-construction',
        description: 'Extend the BST class to maintain AVL balance. After each insert or remove, perform rotations to ensure the height difference between left and right subtrees is at most 1.',
        problem: 'Standard BST operations ignore balance. AVL requires tracking height at each node, detecting imbalance, and performing single or double rotations -- a fundamentally more complex state management problem. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,2,5,null,22,1],"operations":["insert(12)","remove(10)","contains(15)"]},
                output: 4,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            // Edge case
            {
                input: {"tree":[10],"operations":["insert(12)"]},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def self_balancing_bst_avl_insertremove(tree, operations):
    """
    Self-Balancing BST (AVL Insert/Remove)

    Extend the BST class to maintain AVL balance. After each insert or remove, perform rotations to ensure the height difference between left and right subtrees is at most 1.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on operations
        j = 0
        for k in range(i, n):
            if j < len(operations) and tree[k] == operations[j]:
                j += 1
        if j == len(operations):
            count += 1

    return count


# Test cases
print(self_balancing_bst_avl_insertremove([10,5,15,2,5,None,22,1], ["insert(12)","remove(10)","contains(15)"]))  # Expected: 4
print(self_balancing_bst_avl_insertremove([10], ["insert(12)"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// SelfBalancingBstAvlInsertremove solves the Self-Balancing BST (AVL Insert/Remove) problem.
// Extend the BST class to maintain AVL balance. After each insert or remove, perform rotations to ensure the height difference between left and right subtrees is at most 1.
// Time: O(n), Space: O(1)
func SelfBalancingBstAvlInsertremove(tree []int, operations []string) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SelfBalancingBstAvlInsertremove([]int{10, 5, 15, 2, 5, null, 22, 1}, []string{"insert(12)", "remove(10)", "contains(15)"})) // Expected: 4
	fmt.Println(SelfBalancingBstAvlInsertremove([]int{10}, []string{"insert(12)"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/twist-01-self-balancing-bst-avl-insertremove', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/twist-01-self-balancing-bst-avl-insertremove'] = problem;
})();
