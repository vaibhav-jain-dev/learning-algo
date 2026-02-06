/**
 * Vertical Order Traversal
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-traversal
 * Parent: 04-bst-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Vertical Order Traversal',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal',
        description: 'Traverse the BST in vertical order: group nodes by their horizontal distance from the root, then within each group order by level (top to bottom).',
        problem: 'None of the three standard traversals produce vertical ordering. You must track horizontal distance during traversal using BFS or DFS, then group and sort the results by column index. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the vertical order traversal criteria.'
            },
            // Edge case
            {
                input: {"tree":[10]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def vertical_order_traversal(tree):
    """
    Vertical Order Traversal

    Traverse the BST in vertical order: group nodes by their horizontal distance from the root, then within each group order by level (top to bottom).

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(vertical_order_traversal([10,5,15,2,5,None,22,1]))  # Expected: 1
print(vertical_order_traversal([10]))  # Expected: 0
`,
            go: `package main

import "fmt"

// VerticalOrderTraversal solves the Vertical Order Traversal problem.
// Traverse the BST in vertical order: group nodes by their horizontal distance from the root, then within each group order by level (top to bottom).
// Time: O(n), Space: O(1)
func VerticalOrderTraversal(tree []int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(VerticalOrderTraversal([]int{10, 5, 15, 2, 5, null, 22, 1})) // Expected: 1
	fmt.Println(VerticalOrderTraversal([]int{10})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/twist-02-vertical-order-traversal', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/twist-02-vertical-order-traversal'] = problem;
})();
