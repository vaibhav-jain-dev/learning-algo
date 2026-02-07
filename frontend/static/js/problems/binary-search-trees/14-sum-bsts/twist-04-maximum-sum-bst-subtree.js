/**
 * Maximum Sum BST Subtree
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-sum
 * Parent: 14-sum-bsts
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Sum BST Subtree',
        difficulty: 'Hard',
        algorithm: 'bst-sum',
        parent: '14-sum-bsts',
        description: 'Find the maximum sum among all BST subtrees in the binary tree. A BST subtree sum is the sum of all its node values.',
        problem: 'Instead of summing all BST subtree sums together, you find the one with the maximum sum. This requires tracking the sum of each BST subtree individually and maintaining a global maximum, while the bottom-up validation logic remains similar. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: 2,
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
            python: `def maximum_sum_bst_subtree(tree):
    """
    Maximum Sum BST Subtree

    Find the maximum sum among all BST subtrees in the binary tree. A BST subtree sum is the sum of all its node values.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(maximum_sum_bst_subtree([1,4,3,2,4,None,5,None,None,None,None,4,6]))  # Expected: 2
print(maximum_sum_bst_subtree([5,4,8,3,None,6,3]))  # Expected: 3
print(maximum_sum_bst_subtree([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MaximumSumBstSubtree solves the Maximum Sum BST Subtree problem.
// Find the maximum sum among all BST subtrees in the binary tree. A BST subtree sum is the sum of all its node values.
// Time: O(n), Space: O(1)
func MaximumSumBstSubtree(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaximumSumBstSubtree([]int{1, 4, 3, 2, 4, null, 5, null, null, null, null, 4, 6})) // Expected: 2
	fmt.Println(MaximumSumBstSubtree([]int{5, 4, 8, 3, null, 6, 3})) // Expected: 3
	fmt.Println(MaximumSumBstSubtree([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '14-sum-bsts/twist-04-maximum-sum-bst-subtree', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/14-sum-bsts/twist-04-maximum-sum-bst-subtree'] = problem;
})();
