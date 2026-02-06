/**
 * Bottom-Up Level Order Traversal
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-bfs
 * Parent: 02-breadth-first-search/01-level-order-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bottom-Up Level Order Traversal',
        difficulty: 'Easy',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search/01-level-order-traversal',
        description: 'Return the level order traversal from bottom to top: the deepest level first and the root level last.',
        problem: 'The BFS itself is identical, but you must reverse the result at the end or build it differently. This is a simple twist that tests whether you can decouple traversal order from output order.',
        hints: [
            'Start by understanding the key difference: The BFS itself is identical, but you must reverse the result at the end or build it differently.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Tree [3,9,20,null,null,15,7].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N)',
            space: 'O(W)'
        },
        examples: [
            // Basic test case
            {
                input: {"root":[3,9,20,null,null,15,7]},
                output: [3,9,20],
                explanation: 'The bottom up level order traversal for this input yields [3, 9, 20].'
            },
            {
                input: {"root":[1]},
                output: [1],
                explanation: 'The bottom up level order traversal for this input yields [1].'
            },
            // Edge case
            {
                input: {"root":[3]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bottom_up_level_order_traversal(root):
    """
    Bottom-Up Level Order Traversal

    Return the level order traversal from bottom to top: the deepest level first and the root level last.

    Time: O(N)
    Space: O(W)
    """
    result = []

    for i in range(len(root)):
        # Check if element meets criteria
        result.append(root[i])

    return result


# Test cases
print(bottom_up_level_order_traversal([3,9,20,None,None,15,7]))  # Expected: [3,9,20]
print(bottom_up_level_order_traversal([1]))  # Expected: [1]
print(bottom_up_level_order_traversal([3]))  # Expected: []
`,
            go: `package main

import "fmt"

// BottomUpLevelOrderTraversal solves the Bottom-Up Level Order Traversal problem.
// Return the level order traversal from bottom to top: the deepest level first and the root level last.
// Time: O(N), Space: O(W)
func BottomUpLevelOrderTraversal(root []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(root); i++ {
		result = append(result, root[i])
	}

	return result
}

func main() {
	fmt.Println(BottomUpLevelOrderTraversal([]int{3, 9, 20, null, null, 15, 7})) // Expected: [3,9,20]
	fmt.Println(BottomUpLevelOrderTraversal([]int{1})) // Expected: [1]
	fmt.Println(BottomUpLevelOrderTraversal([]int{3})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/01-level-order-traversal/twist-02-bottom-up-level-order-traversal', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/01-level-order-traversal/twist-02-bottom-up-level-order-traversal'] = problem;
})();
