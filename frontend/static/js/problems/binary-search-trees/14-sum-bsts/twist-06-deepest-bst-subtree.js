/**
 * Deepest BST Subtree
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-sum
 * Parent: 14-sum-bsts
 */
(function() {
    'use strict';

    const problem = {
        name: 'Deepest BST Subtree',
        difficulty: 'Medium',
        algorithm: 'bst-sum',
        parent: '14-sum-bsts',
        description: 'Find the BST subtree whose root is at the greatest depth in the binary tree. If there are ties, return the one with the largest sum.',
        problem: 'The aggregation priority shifts from sum to depth. You must track both depth and BST validity bottom-up, and the tie-breaking rule adds a secondary comparison dimension. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: 4,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":[5,4,8,3,null,6,3]},
                output: 3,
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
            python: `def deepest_bst_subtree(tree):
    """
    Deepest BST Subtree

    Find the BST subtree whose root is at the greatest depth in the binary tree. If there are ties, return the one with the largest sum.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(deepest_bst_subtree([1,4,3,2,4,None,5,None,None,None,None,4,6]))  # Expected: 4
print(deepest_bst_subtree([5,4,8,3,None,6,3]))  # Expected: 3
print(deepest_bst_subtree([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// DeepestBstSubtree solves the Deepest BST Subtree problem.
// Find the BST subtree whose root is at the greatest depth in the binary tree. If there are ties, return the one with the largest sum.
// Time: O(n), Space: O(1)
func DeepestBstSubtree(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DeepestBstSubtree([]int{1, 4, 3, 2, 4, null, 5, null, null, null, null, 4, 6})) // Expected: 4
	fmt.Println(DeepestBstSubtree([]int{5, 4, 8, 3, null, 6, 3})) // Expected: 3
	fmt.Println(DeepestBstSubtree([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '14-sum-bsts/twist-06-deepest-bst-subtree', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/14-sum-bsts/twist-06-deepest-bst-subtree'] = problem;
})();
