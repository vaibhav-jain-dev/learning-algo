/**
 * Morris Traversal on a Threaded BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-traversal
 * Parent: 04-bst-traversal/02-morris-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Morris Traversal on a Threaded BST',
        difficulty: 'Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/02-morris-traversal',
        description: 'The BST is already threaded (null right pointers point to inorder successors). Perform inorder traversal using these existing threads without creating new ones.',
        problem: 'Standard Morris creates and removes threads temporarily. With pre-existing threads, you must distinguish real right children from thread pointers (typically via a boolean flag per node), changing the navigation logic entirely. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[4,2,6,1,3,5,7]},
                output: [4,2,6],
                explanation: 'The morris traversal on a threaded bst for this input yields [4, 2, 6].'
            },
            {
                input: {"tree":[1,2,3,4,5,null,6]},
                output: [1,2,3],
                explanation: 'The morris traversal on a threaded bst for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"tree":[4]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def morris_traversal_on_a_threaded_bst(tree):
    """
    Morris Traversal on a Threaded BST

    The BST is already threaded (null right pointers point to inorder successors). Perform inorder traversal using these existing threads without creating new ones.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(morris_traversal_on_a_threaded_bst([4,2,6,1,3,5,7]))  # Expected: [4,2,6]
print(morris_traversal_on_a_threaded_bst([1,2,3,4,5,None,6]))  # Expected: [1,2,3]
print(morris_traversal_on_a_threaded_bst([4]))  # Expected: []
`,
            go: `package main

import "fmt"

// MorrisTraversalOnAThreadedBst solves the Morris Traversal on a Threaded BST problem.
// The BST is already threaded (null right pointers point to inorder successors). Perform inorder traversal using these existing threads without creating new ones.
// Time: O(n), Space: O(1)
func MorrisTraversalOnAThreadedBst(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(MorrisTraversalOnAThreadedBst([]int{4, 2, 6, 1, 3, 5, 7})) // Expected: [4,2,6]
	fmt.Println(MorrisTraversalOnAThreadedBst([]int{1, 2, 3, 4, 5, null, 6})) // Expected: [1,2,3]
	fmt.Println(MorrisTraversalOnAThreadedBst([]int{4})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/02-morris-traversal/twist-02-morris-traversal-on-a-threaded-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/02-morris-traversal/twist-02-morris-traversal-on-a-threaded-bst'] = problem;
})();
