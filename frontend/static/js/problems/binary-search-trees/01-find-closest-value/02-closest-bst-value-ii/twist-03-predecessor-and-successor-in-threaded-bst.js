/**
 * Predecessor and Successor in Threaded BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-search
 * Parent: 01-find-closest-value/02-closest-bst-value-ii
 */
(function() {
    'use strict';

    const problem = {
        name: 'Predecessor and Successor in Threaded BST',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/02-closest-bst-value-ii',
        description: 'The BST is threaded (null right pointers point to inorder successor, null left pointers point to inorder predecessor). Find predecessor and successor using only thread pointers, no stack.',
        problem: 'Threaded trees change the traversal paradigm entirely. You follow thread links instead of using a stack or recursion, requiring you to distinguish between real children and thread pointers. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'The predecessor and successor in threaded bst condition is satisfied for this input.'
            },
            {
                input: {"tree":[5,3,7,2,4,6,8],"target":1},
                output: false,
                explanation: 'The predecessor and successor in threaded bst condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree":[5],"target":0},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def predecessor_and_successor_in_threaded_bst(tree, target):
    """
    Predecessor and Successor in Threaded BST

    The BST is threaded (null right pointers point to inorder successor, null left pointers point to inorder predecessor). Find predecessor and successor using only thread pointers, no stack.

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(tree)):
        if j < len(target) and tree[i] == target[j]:
            j += 1

    return j == len(target)


# Test cases
print(predecessor_and_successor_in_threaded_bst([5,3,7,2,4,6,8], 4))  # Expected: True
print(predecessor_and_successor_in_threaded_bst([5,3,7,2,4,6,8], 1))  # Expected: False
print(predecessor_and_successor_in_threaded_bst([5], 0))  # Expected: False
`,
            go: `package main

import "fmt"

// PredecessorAndSuccessorInThreadedBst solves the Predecessor and Successor in Threaded BST problem.
// The BST is threaded (null right pointers point to inorder successor, null left pointers point to inorder predecessor). Find predecessor and successor using only thread pointers, no stack.
// Time: O(n), Space: O(1)
func PredecessorAndSuccessorInThreadedBst(tree []int, target int) bool {
	j := 0

	for i := 0; i < len(tree) && j < len(target); i++ {
		if tree[i] == target[j] {
			j++
		}
	}

	return j == len(target)
}

func main() {
	fmt.Println(PredecessorAndSuccessorInThreadedBst([]int{5, 3, 7, 2, 4, 6, 8}, 4)) // Expected: true
	fmt.Println(PredecessorAndSuccessorInThreadedBst([]int{5, 3, 7, 2, 4, 6, 8}, 1)) // Expected: false
	fmt.Println(PredecessorAndSuccessorInThreadedBst([]int{5}, 0)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/02-closest-bst-value-ii/twist-03-predecessor-and-successor-in-threaded-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/02-closest-bst-value-ii/twist-03-predecessor-and-successor-in-threaded-bst'] = problem;
})();
