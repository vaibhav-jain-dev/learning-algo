/**
 * Closest Path Sum
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 * Parent: 01-branch-sums/01-path-sum-to-target
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest Path Sum',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/01-path-sum-to-target',
        description: 'If no exact path sum equals the target, return the path whose sum is closest to the target. If there is a tie, return the shorter path. Changes from an exact match to an optimization problem. You must track the best candidate path and its difference from target throughout the entire traversal, never pruning early.',
        problem: 'Changes from an exact match to an optimization problem. You must track the best candidate path and its difference from target throughout the entire traversal, never pruning early.',
        hints: [
            'Consider: If no exact path sum equals the target, return the path whose sum is closest to the target.',
            'If there is a tie, return the shorter path.',
            'Key insight: Changes from an exact match to an optimization problem.',
            'You must track the best candidate path and its difference from target throughout the entire traversal, never pruning early.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":5,"left":{"value":4,"left":{"value":11,"left":{"value":7},"right":{"value":2}}},"right":{"value":8,"left":{"value":13},"right":{"value":4,"left":{"value":5},"right":{"value":1}}}},"target":10},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}},"target":10},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"tree":{"value":5,"left":{"value":4,"left":{"value":11,"left":{"value":7},"right":{"value":2}}},"right":{"value":8,"left":{"value":13},"right":{"value":4,"left":{"value":5},"right":{"value":1}}}},"target":10},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def closest_path_sum(tree, target):
    """
    Closest Path Sum

    If no exact path sum equals the target, return the path whose sum is closest to the target. If there is a tie, return the shorter path. Changes from an exact match to an optimization problem. You must track the best candidate path and its difference from target throughout the entire traversal, never pruning early.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on target
        j = 0
        for k in range(i, n):
            if j < len(target) and tree[k] == target[j]:
                j += 1
        if j == len(target):
            count += 1

    return count


# Test cases
print(closest_path_sum({"value": 5, "left": {"value": 4, "left": {"value": 11, "left": {"value": 7}, "right": {"value": 2}}}, "right": {"value": 8, "left": {"value": 13}, "right": {"value": 4, "left": {"value": 5}, "right": {"value": 1}}}}, 10))  # Expected: 1
print(closest_path_sum({"value": 1, "left": {"value": 2}, "right": {"value": 3}}, 10))  # Expected: 2
print(closest_path_sum({"value": 5, "left": {"value": 4, "left": {"value": 11, "left": {"value": 7}, "right": {"value": 2}}}, "right": {"value": 8, "left": {"value": 13}, "right": {"value": 4, "left": {"value": 5}, "right": {"value": 1}}}}, 10))  # Expected: 0
`,
            go: `package main

import "fmt"

// ClosestPathSum solves the Closest Path Sum problem.
// If no exact path sum equals the target, return the path whose sum is closest to the target. If there is a tie, return the shorter path. Changes from an exact match to an optimization problem. You must track the best candidate path and its difference from target throughout the entire traversal, never pruning early.
// Time: O(n), Space: O(n)
func ClosestPathSum(tree *TreeNode, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ClosestPathSum({"value":5,"left":{"value":4,"left":{"value":11,"left":{"value":7},"right":{"value":2}}},"right":{"value":8,"left":{"value":13},"right":{"value":4,"left":{"value":5},"right":{"value":1}}}}, 10)) // Expected: 1
	fmt.Println(ClosestPathSum({"value":1,"left":{"value":2},"right":{"value":3}}, 10)) // Expected: 2
	fmt.Println(ClosestPathSum({"value":5,"left":{"value":4,"left":{"value":11,"left":{"value":7},"right":{"value":2}}},"right":{"value":8,"left":{"value":13},"right":{"value":4,"left":{"value":5},"right":{"value":1}}}}, 10)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/01-path-sum-to-target/twist-05-closest-path-sum', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/01-path-sum-to-target/twist-05-closest-path-sum'] = problem;
})();
