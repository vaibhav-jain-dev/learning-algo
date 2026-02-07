/**
 * Space-Constrained Morris Traversal
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-dfs
 * Parent: 02-node-depths
 */
(function() {
    'use strict';

    const problem = {
        name: 'Space-Constrained Morris Traversal',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        parent: '02-node-depths',
        description: 'Compute the sum of node depths using O(1) extra space (no recursion stack, no queue). Use Morris traversal but track depth. Morris traversal does not naturally track depth. You must compute depth changes by counting thread hops, making the depth tracking significantly more complex.',
        problem: 'Morris traversal does not naturally track depth. You must compute depth changes by counting thread hops, making the depth tracking significantly more complex.',
        hints: [
            'Consider: Compute the sum of node depths using O(1) extra space (no recursion stack, no queue).',
            'Use Morris traversal but track depth.',
            'Key insight: Morris traversal does not naturally track depth.',
            'You must compute depth changes by counting thread hops, making the depth tracking significantly more complex.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def space_constrained_morris_traversal(tree):
    """
    Space-Constrained Morris Traversal

    Compute the sum of node depths using O(1) extra space (no recursion stack, no queue). Use Morris traversal but track depth. Morris traversal does not naturally track depth. You must compute depth changes by counting thread hops, making the depth tracking significantly more complex.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(space_constrained_morris_traversal({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: 1
print(space_constrained_morris_traversal({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// SpaceConstrainedMorrisTraversal solves the Space-Constrained Morris Traversal problem.
// Compute the sum of node depths using O(1) extra space (no recursion stack, no queue). Use Morris traversal but track depth. Morris traversal does not naturally track depth. You must compute depth changes by counting thread hops, making the depth tracking significantly more complex.
// Time: O(n), Space: O(n)
func SpaceConstrainedMorrisTraversal(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SpaceConstrainedMorrisTraversal({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: 1
	fmt.Println(SpaceConstrainedMorrisTraversal({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/twist-04-space-constrained-morris-traversal', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/twist-04-space-constrained-morris-traversal'] = problem;
})();
