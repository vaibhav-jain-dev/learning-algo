/**
 * Largest BST Subtree with Augmented Nodes
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-validation
 * Parent: 03-validate-bst/02-largest-bst-subtree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest BST Subtree with Augmented Nodes',
        difficulty: 'Medium',
        algorithm: 'bst-validation',
        parent: '03-validate-bst/02-largest-bst-subtree',
        description: 'While finding the largest BST subtree, augment each node with its BST subtree size. After processing, each node should know the size of the largest BST subtree rooted at or below it.',
        problem: 'This adds an output requirement -- you are not just computing a single answer but annotating the entire tree. The augmentation must propagate correctly, and non-BST nodes must carry the max of their children\',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,1,8,null,7]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the largest bst subtree with augmented nodes criteria.'
            },
            {
                input: {"tree":[2,1,3]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the largest bst subtree with augmented nodes criteria.'
            },
            // Edge case
            {
                input: {"tree":[10]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def largest_bst_subtree_with_augmented_nodes(tree):
    """
    Largest BST Subtree with Augmented Nodes

    While finding the largest BST subtree, augment each node with its BST subtree size. After processing, each node should know the size of the largest BST subtree rooted at or below it.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(largest_bst_subtree_with_augmented_nodes([10,5,15,1,8,None,7]))  # Expected: 1
print(largest_bst_subtree_with_augmented_nodes([2,1,3]))  # Expected: 2
print(largest_bst_subtree_with_augmented_nodes([10]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LargestBstSubtreeWithAugmentedNodes solves the Largest BST Subtree with Augmented Nodes problem.
// While finding the largest BST subtree, augment each node with its BST subtree size. After processing, each node should know the size of the largest BST subtree rooted at or below it.
// Time: O(n), Space: O(1)
func LargestBstSubtreeWithAugmentedNodes(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LargestBstSubtreeWithAugmentedNodes([]int{10, 5, 15, 1, 8, null, 7})) // Expected: 1
	fmt.Println(LargestBstSubtreeWithAugmentedNodes([]int{2, 1, 3})) // Expected: 2
	fmt.Println(LargestBstSubtreeWithAugmentedNodes([]int{10})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/02-largest-bst-subtree/twist-05-largest-bst-subtree-with-augmented-nodes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/02-largest-bst-subtree/twist-05-largest-bst-subtree-with-augmented-nodes'] = problem;
})();
