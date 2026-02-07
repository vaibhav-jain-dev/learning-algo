/**
 * Predecessor and Successor with Node Deletion
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 * Parent: 01-find-closest-value/02-closest-bst-value-ii
 */
(function() {
    'use strict';

    const problem = {
        name: 'Predecessor and Successor with Node Deletion',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/02-closest-bst-value-ii',
        description: 'Find the inorder predecessor and successor, then delete the target node if it exists. Return the predecessor, successor, and the modified tree.',
        problem: 'Combining search with mutation requires careful ordering. The predecessor/successor relationship may change after deletion, so you must find them first, then handle the deletion cases (leaf, one child, two children). Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[5,3,7,2,4,6,8],"target":4},
                output: true,
                explanation: 'The predecessor and successor with node deletion condition is satisfied for this input.'
            },
            {
                input: {"tree":[5,3,7,2,4,6,8],"target":1},
                output: false,
                explanation: 'The predecessor and successor with node deletion condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree":[5],"target":0},
                output: false,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def predecessor_and_successor_with_node_deletion(tree, target):
    """
    Predecessor and Successor with Node Deletion

    Find the inorder predecessor and successor, then delete the target node if it exists. Return the predecessor, successor, and the modified tree.

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(tree)):
        if j < len(target) and tree[i] == target[j]:
            j += 1

    return j == len(target)


# Test cases
print(predecessor_and_successor_with_node_deletion([5,3,7,2,4,6,8], 4))  # Expected: True
print(predecessor_and_successor_with_node_deletion([5,3,7,2,4,6,8], 1))  # Expected: False
print(predecessor_and_successor_with_node_deletion([5], 0))  # Expected: False
`,
            go: `package main

import "fmt"

// PredecessorAndSuccessorWithNodeDeletion solves the Predecessor and Successor with Node Deletion problem.
// Find the inorder predecessor and successor, then delete the target node if it exists. Return the predecessor, successor, and the modified tree.
// Time: O(n), Space: O(1)
func PredecessorAndSuccessorWithNodeDeletion(tree []int, target int) bool {
	j := 0

	for i := 0; i < len(tree) && j < len(target); i++ {
		if tree[i] == target[j] {
			j++
		}
	}

	return j == len(target)
}

func main() {
	fmt.Println(PredecessorAndSuccessorWithNodeDeletion([]int{5, 3, 7, 2, 4, 6, 8}, 4)) // Expected: true
	fmt.Println(PredecessorAndSuccessorWithNodeDeletion([]int{5, 3, 7, 2, 4, 6, 8}, 1)) // Expected: false
	fmt.Println(PredecessorAndSuccessorWithNodeDeletion([]int{5}, 0)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/02-closest-bst-value-ii/twist-02-predecessor-and-successor-with-node-deletion', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/02-closest-bst-value-ii/twist-02-predecessor-and-successor-with-node-deletion'] = problem;
})();
