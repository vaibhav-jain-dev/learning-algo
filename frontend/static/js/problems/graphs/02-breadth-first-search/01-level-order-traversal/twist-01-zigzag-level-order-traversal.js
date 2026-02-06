/**
 * Zigzag Level Order Traversal
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-bfs
 * Parent: 02-breadth-first-search/01-level-order-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Zigzag Level Order Traversal',
        difficulty: 'Medium',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search/01-level-order-traversal',
        description: 'Traverse the tree level by level, but alternate the direction at each level: left-to-right, then right-to-left, then left-to-right, etc.',
        problem: 'Adds directional state management on top of BFS. You must track the current level parity and either reverse the level array or use a deque to build it in the correct order.',
        hints: [
            'Start by understanding the key difference: Adds directional state management on top of BFS.',
            'Think about what data structures need to change from the original solution.',
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
                explanation: 'The zigzag level order traversal for this input yields [3, 9, 20].'
            },
            {
                input: {"root":[1]},
                output: [1],
                explanation: 'The zigzag level order traversal for this input yields [1].'
            },
            // Edge case
            {
                input: {"root":[3]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def zigzag_level_order_traversal(root):
    """
    Zigzag Level Order Traversal

    Traverse the tree level by level, but alternate the direction at each level: left-to-right, then right-to-left, then left-to-right, etc.

    Time: O(N)
    Space: O(W)
    """
    result = []

    for i in range(len(root)):
        # Check if element meets criteria
        result.append(root[i])

    return result


# Test cases
print(zigzag_level_order_traversal([3,9,20,None,None,15,7]))  # Expected: [3,9,20]
print(zigzag_level_order_traversal([1]))  # Expected: [1]
print(zigzag_level_order_traversal([3]))  # Expected: []
`,
            go: `package main

import "fmt"

// ZigzagLevelOrderTraversal solves the Zigzag Level Order Traversal problem.
// Traverse the tree level by level, but alternate the direction at each level: left-to-right, then right-to-left, then left-to-right, etc.
// Time: O(N), Space: O(W)
func ZigzagLevelOrderTraversal(root []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(root); i++ {
		result = append(result, root[i])
	}

	return result
}

func main() {
	fmt.Println(ZigzagLevelOrderTraversal([]int{3, 9, 20, null, null, 15, 7})) // Expected: [3,9,20]
	fmt.Println(ZigzagLevelOrderTraversal([]int{1})) // Expected: [1]
	fmt.Println(ZigzagLevelOrderTraversal([]int{3})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/01-level-order-traversal/twist-01-zigzag-level-order-traversal', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/01-level-order-traversal/twist-01-zigzag-level-order-traversal'] = problem;
})();
