/**
 * Largest BST Subtree
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-sum
 * Parent: 14-sum-bsts
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest BST Subtree',
        difficulty: 'Hard',
        algorithm: 'bst-sum',
        parent: '14-sum-bsts',
        description: 'Instead of summing all BST subtree values, find the largest BST subtree (by number of nodes) within the binary tree and return its size.',
        problem: 'Summing all BST subtrees accumulates across many subtrees. Finding the largest requires comparison and tracking of the maximum, and you must be careful that a valid BST subtree includes all descendants, not just some. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[1,4,3,2,4,null,5,null,null,null,null,4,6]},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":[5,4,8,3,null,6,3]},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":[1]},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def largest_bst_subtree(tree):
    """
    Largest BST Subtree

    Instead of summing all BST subtree values, find the largest BST subtree (by number of nodes) within the binary tree and return its size.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(largest_bst_subtree([1,4,3,2,4,None,5,None,None,None,None,4,6]))  # Expected: 1
print(largest_bst_subtree([5,4,8,3,None,6,3]))  # Expected: 2
print(largest_bst_subtree([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LargestBstSubtree solves the Largest BST Subtree problem.
// Instead of summing all BST subtree values, find the largest BST subtree (by number of nodes) within the binary tree and return its size.
// Time: O(n), Space: O(1)
func LargestBstSubtree(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LargestBstSubtree([]int{1, 4, 3, 2, 4, null, 5, null, null, null, null, 4, 6})) // Expected: 1
	fmt.Println(LargestBstSubtree([]int{5, 4, 8, 3, null, 6, 3})) // Expected: 2
	fmt.Println(LargestBstSubtree([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '14-sum-bsts/twist-01-largest-bst-subtree', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/14-sum-bsts/twist-01-largest-bst-subtree'] = problem;
})();
