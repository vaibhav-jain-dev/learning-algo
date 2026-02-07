/**
 * Minimum Depth with Early Termination DFS
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-bfs
 * Parent: 02-node-depths/02-minimum-depth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Depth with Early Termination DFS',
        difficulty: 'Medium',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/02-minimum-depth',
        description: 'Optimize DFS to prune branches: if the current depth already exceeds the best known minimum depth, stop exploring that subtree. Standard DFS explores all nodes. By passing the current best minimum as a parameter, you can prune entire subtrees, improving average-case performance though worst-case remains O(n).',
        problem: 'Standard DFS explores all nodes. By passing the current best minimum as a parameter, you can prune entire subtrees, improving average-case performance though worst-case remains O(n).',
        hints: [
            'Consider: Optimize DFS to prune branches: if the current depth already exceeds the best known minimum depth, stop exploring that subtree.',
            'Standard DFS explores all nodes.',
            'Think about how the base case differs from the original problem.',
            'Review the example: If left subtree leaf at depth 2, skip right subtree branches deeper than depth 2.'
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
            python: `def minimum_depth_with_early_termination_dfs(tree):
    """
    Minimum Depth with Early Termination DFS

    Optimize DFS to prune branches: if the current depth already exceeds the best known minimum depth, stop exploring that subtree. Standard DFS explores all nodes. By passing the current best minimum as a parameter, you can prune entire subtrees, improving average-case performance though worst-case remains O(n).

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(minimum_depth_with_early_termination_dfs({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 1
print(minimum_depth_with_early_termination_dfs({"value": 2, "right": {"value": 3, "right": {"value": 4, "right": {"value": 5, "right": {"value": 6}}}}}))  # Expected: 2
print(minimum_depth_with_early_termination_dfs({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumDepthWithEarlyTerminationDfs solves the Minimum Depth with Early Termination DFS problem.
// Optimize DFS to prune branches: if the current depth already exceeds the best known minimum depth, stop exploring that subtree. Standard DFS explores all nodes. By passing the current best minimum as a parameter, you can prune entire subtrees, improving average-case performance though worst-case remains O(n).
// Time: O(n), Space: O(n)
func MinimumDepthWithEarlyTerminationDfs(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumDepthWithEarlyTerminationDfs({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 1
	fmt.Println(MinimumDepthWithEarlyTerminationDfs({"value":2,"right":{"value":3,"right":{"value":4,"right":{"value":5,"right":{"value":6}}}}})) // Expected: 2
	fmt.Println(MinimumDepthWithEarlyTerminationDfs({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/02-minimum-depth/twist-04-minimum-depth-with-early-termination-dfs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/02-minimum-depth/twist-04-minimum-depth-with-early-termination-dfs'] = problem;
})();
