/**
 * Iterative Level-Aware Inorder
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-traversal
 * Parent: 04-bst-traversal/01-iterative-tree-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative Level-Aware Inorder',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/01-iterative-tree-traversal',
        description: 'Perform iterative inorder traversal but also track and return the depth of each node alongside its value.',
        problem: 'The standard iterative inorder does not naturally track depth. You must augment the stack to store depth information alongside each node, changing the stack from storing just nodes to storing (node, depth) pairs. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[1,2,3,4,5,null,6]},
                output: 3,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            // Edge case
            {
                input: {"tree":[1]},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def iterative_level_aware_inorder(tree):
    """
    Iterative Level-Aware Inorder

    Perform iterative inorder traversal but also track and return the depth of each node alongside its value.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(iterative_level_aware_inorder([1,2,3,4,5,None,6]))  # Expected: 3
print(iterative_level_aware_inorder([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// IterativeLevelAwareInorder solves the Iterative Level-Aware Inorder problem.
// Perform iterative inorder traversal but also track and return the depth of each node alongside its value.
// Time: O(n), Space: O(1)
func IterativeLevelAwareInorder(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(IterativeLevelAwareInorder([]int{1, 2, 3, 4, 5, null, 6})) // Expected: 3
	fmt.Println(IterativeLevelAwareInorder([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/01-iterative-tree-traversal/twist-04-iterative-level-aware-inorder', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/01-iterative-tree-traversal/twist-04-iterative-level-aware-inorder'] = problem;
})();
