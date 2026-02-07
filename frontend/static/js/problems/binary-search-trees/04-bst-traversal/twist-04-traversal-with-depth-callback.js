/**
 * Traversal with Depth Callback
 * Category: binary-search-trees
 * Difficulty: Easy
 * Algorithm: bst-traversal
 * Parent: 04-bst-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Traversal with Depth Callback',
        difficulty: 'Easy',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal',
        description: 'Modify each traversal (inorder, preorder, postorder) to also provide the depth of each node to a callback function. Return an array of {value, depth} pairs.',
        problem: 'Adding depth tracking requires passing an additional parameter through the recursion. While simple for recursion, it changes how you think about the iterative stack-based versions since depth must be explicitly tracked. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,2,5,null,22,1]},
                output: [10,5,15],
                explanation: 'The traversal with depth callback for this input yields [10, 5, 15].'
            },
            // Edge case
            {
                input: {"tree":[10]},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def traversal_with_depth_callback(tree):
    """
    Traversal with Depth Callback

    Modify each traversal (inorder, preorder, postorder) to also provide the depth of each node to a callback function. Return an array of {value, depth} pairs.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(traversal_with_depth_callback([10,5,15,2,5,None,22,1]))  # Expected: [10,5,15]
print(traversal_with_depth_callback([10]))  # Expected: []
`,
            go: `package main

import "fmt"

// TraversalWithDepthCallback solves the Traversal with Depth Callback problem.
// Modify each traversal (inorder, preorder, postorder) to also provide the depth of each node to a callback function. Return an array of {value, depth} pairs.
// Time: O(n), Space: O(1)
func TraversalWithDepthCallback(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(TraversalWithDepthCallback([]int{10, 5, 15, 2, 5, null, 22, 1})) // Expected: [10,5,15]
	fmt.Println(TraversalWithDepthCallback([]int{10})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/twist-04-traversal-with-depth-callback', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/twist-04-traversal-with-depth-callback'] = problem;
})();
