/**
 * Predecessor and Successor with Parent Pointers
 * Category: binary-search-trees
 * Difficulty: Easy
 * Algorithm: bst-search
 * Parent: 01-find-closest-value/02-closest-bst-value-ii
 */
(function() {
    'use strict';

    const problem = {
        name: 'Predecessor and Successor with Parent Pointers',
        difficulty: 'Easy',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/02-closest-bst-value-ii',
        description: 'Each node has a parent pointer. Given a direct reference to the target node (not the value), find its inorder predecessor and successor by traversing the tree using parent pointers.',
        problem: 'With parent pointers, you navigate up and down rather than from the root. The successor of a node with no right child is the first ancestor where the node is in its left subtree, which is a fundamentally different traversal pattern. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'The predecessor and successor with parent pointers condition is satisfied for this input.'
            },
            {
                input: {"tree":[5,3,7,2,4,6,8],"target":1},
                output: false,
                explanation: 'The predecessor and successor with parent pointers condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree":[5],"target":0},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def predecessor_and_successor_with_parent_pointers(tree, target):
    """
    Predecessor and Successor with Parent Pointers

    Each node has a parent pointer. Given a direct reference to the target node (not the value), find its inorder predecessor and successor by traversing the tree using parent pointers.

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(tree)):
        if j < len(target) and tree[i] == target[j]:
            j += 1

    return j == len(target)


# Test cases
print(predecessor_and_successor_with_parent_pointers([5,3,7,2,4,6,8], 4))  # Expected: True
print(predecessor_and_successor_with_parent_pointers([5,3,7,2,4,6,8], 1))  # Expected: False
print(predecessor_and_successor_with_parent_pointers([5], 0))  # Expected: False
`,
            go: `package main

import "fmt"

// PredecessorAndSuccessorWithParentPointers solves the Predecessor and Successor with Parent Pointers problem.
// Each node has a parent pointer. Given a direct reference to the target node (not the value), find its inorder predecessor and successor by traversing the tree using parent pointers.
// Time: O(n), Space: O(1)
func PredecessorAndSuccessorWithParentPointers(tree []int, target int) bool {
	j := 0

	for i := 0; i < len(tree) && j < len(target); i++ {
		if tree[i] == target[j] {
			j++
		}
	}

	return j == len(target)
}

func main() {
	fmt.Println(PredecessorAndSuccessorWithParentPointers([]int{5, 3, 7, 2, 4, 6, 8}, 4)) // Expected: true
	fmt.Println(PredecessorAndSuccessorWithParentPointers([]int{5, 3, 7, 2, 4, 6, 8}, 1)) // Expected: false
	fmt.Println(PredecessorAndSuccessorWithParentPointers([]int{5}, 0)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/02-closest-bst-value-ii/twist-05-predecessor-and-successor-with-parent-pointers', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/02-closest-bst-value-ii/twist-05-predecessor-and-successor-with-parent-pointers'] = problem;
})();
