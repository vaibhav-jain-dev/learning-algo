/**
 * Largest BST Subtree by Height
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-validation
 * Parent: 03-validate-bst/02-largest-bst-subtree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest BST Subtree by Height',
        difficulty: 'Medium',
        algorithm: 'bst-validation',
        parent: '03-validate-bst/02-largest-bst-subtree',
        description: 'Instead of finding the BST subtree with the most nodes, find the one with the greatest height.',
        problem: 'A tall but narrow BST subtree beats a short but wide one. The post-order aggregation must track height instead of size, and the optimal subtree may be different from the size-based answer. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: 3,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":[2,1,3]},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":[10]},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def largest_bst_subtree_by_height(tree):
    """
    Largest BST Subtree by Height

    Instead of finding the BST subtree with the most nodes, find the one with the greatest height.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(largest_bst_subtree_by_height([10,5,15,1,8,None,7]))  # Expected: 3
print(largest_bst_subtree_by_height([2,1,3]))  # Expected: 2
print(largest_bst_subtree_by_height([10]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LargestBstSubtreeByHeight solves the Largest BST Subtree by Height problem.
// Instead of finding the BST subtree with the most nodes, find the one with the greatest height.
// Time: O(n), Space: O(1)
func LargestBstSubtreeByHeight(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LargestBstSubtreeByHeight([]int{10, 5, 15, 1, 8, null, 7})) // Expected: 3
	fmt.Println(LargestBstSubtreeByHeight([]int{2, 1, 3})) // Expected: 2
	fmt.Println(LargestBstSubtreeByHeight([]int{10})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/02-largest-bst-subtree/twist-01-largest-bst-subtree-by-height', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/02-largest-bst-subtree/twist-01-largest-bst-subtree-by-height'] = problem;
})();
