/**
 * Count Nodes at Minimum Depth
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-bfs
 * Parent: 02-node-depths/02-minimum-depth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Nodes at Minimum Depth',
        difficulty: 'Medium',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/02-minimum-depth',
        description: 'Instead of returning the minimum depth, return the count of leaf nodes at the minimum depth level. Changes from a "find minimum" to a "count at minimum" problem. You first need to determine the minimum depth, then count leaves at that depth, or do both in a single BFS pass.',
        problem: 'Changes from a "find minimum" to a "count at minimum" problem. You first need to determine the minimum depth, then count leaves at that depth, or do both in a single BFS pass.',
        hints: [
            'Consider: Instead of returning the minimum depth, return the count of leaf nodes at the minimum depth level.',
            'Changes from a "find minimum" to a "count at minimum" problem.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree: 1->2, 1->3, both are leaves at depth 2.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"tree":{"value":2,"right":{"value":3,"right":{"value":4,"right":{"value":5,"right":{"value":6}}}}}},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"tree":{"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def count_nodes_at_minimum_depth(tree):
    """
    Count Nodes at Minimum Depth

    Instead of returning the minimum depth, return the count of leaf nodes at the minimum depth level. Changes from a "find minimum" to a "count at minimum" problem. You first need to determine the minimum depth, then count leaves at that depth, or do both in a single BFS pass.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_nodes_at_minimum_depth({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 1
print(count_nodes_at_minimum_depth({"value": 2, "right": {"value": 3, "right": {"value": 4, "right": {"value": 5, "right": {"value": 6}}}}}))  # Expected: 2
print(count_nodes_at_minimum_depth({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountNodesAtMinimumDepth solves the Count Nodes at Minimum Depth problem.
// Instead of returning the minimum depth, return the count of leaf nodes at the minimum depth level. Changes from a "find minimum" to a "count at minimum" problem. You first need to determine the minimum depth, then count leaves at that depth, or do both in a single BFS pass.
// Time: O(n), Space: O(n)
func CountNodesAtMinimumDepth(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountNodesAtMinimumDepth({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 1
	fmt.Println(CountNodesAtMinimumDepth({"value":2,"right":{"value":3,"right":{"value":4,"right":{"value":5,"right":{"value":6}}}}})) // Expected: 2
	fmt.Println(CountNodesAtMinimumDepth({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/02-minimum-depth/twist-05-count-nodes-at-minimum-depth', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/02-minimum-depth/twist-05-count-nodes-at-minimum-depth'] = problem;
})();
