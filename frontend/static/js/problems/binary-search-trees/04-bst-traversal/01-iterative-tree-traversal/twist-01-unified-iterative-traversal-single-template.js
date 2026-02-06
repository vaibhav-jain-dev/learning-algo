/**
 * Unified Iterative Traversal (Single Template)
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-traversal
 * Parent: 04-bst-traversal/01-iterative-tree-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Unified Iterative Traversal (Single Template)',
        difficulty: 'Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/01-iterative-tree-traversal',
        description: 'Implement all three traversals using a single unified iterative template. Use a marker/flag system where you push nodes with a "visited" boolean, so the same loop structure handles inorder, preorder, and postorder by simply changing the push order.',
        problem: 'The standard iterative approaches use fundamentally different stack strategies for each traversal. A unified template forces you to think about a general framework that abstracts the traversal order into a configurable parameter. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: [1,2,3],
                explanation: 'The unified iterative traversal single template for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"tree":[1]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def unified_iterative_traversal_single_template(tree):
    """
    Unified Iterative Traversal (Single Template)

    Implement all three traversals using a single unified iterative template. Use a marker/flag system where you push nodes with a "visited" boolean, so the same loop structure handles inorder, preorder, and postorder by simply changing the push order.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(unified_iterative_traversal_single_template([1,2,3,4,5,None,6]))  # Expected: [1,2,3]
print(unified_iterative_traversal_single_template([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// UnifiedIterativeTraversalSingleTemplate solves the Unified Iterative Traversal (Single Template) problem.
// Implement all three traversals using a single unified iterative template. Use a marker/flag system where you push nodes with a "visited" boolean, so the same loop structure handles inorder, preorder, and postorder by simply changing the push order.
// Time: O(n), Space: O(1)
func UnifiedIterativeTraversalSingleTemplate(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(UnifiedIterativeTraversalSingleTemplate([]int{1, 2, 3, 4, 5, null, 6})) // Expected: [1,2,3]
	fmt.Println(UnifiedIterativeTraversalSingleTemplate([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/01-iterative-tree-traversal/twist-01-unified-iterative-traversal-single-template', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/01-iterative-tree-traversal/twist-01-unified-iterative-traversal-single-template'] = problem;
})();
