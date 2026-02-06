/**
 * Closest Node to Target
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-distance
 * Parent: 15-find-nodes-distance-k
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest Node to Target',
        difficulty: 'Medium',
        algorithm: 'tree-distance',
        parent: '15-find-nodes-distance-k',
        description: 'Given a target node and a set of special nodes, find which special node is closest to the target (minimum distance). Instead of finding all nodes at a fixed distance, you find the minimum distance to a subset of nodes. This requires BFS from the target, stopping at the first special node encountered.',
        problem: 'Instead of finding all nodes at a fixed distance, you find the minimum distance to a subset of nodes. This requires BFS from the target, stopping at the first special node encountered.',
        hints: [
            'Consider: Given a target node and a set of special nodes, find which special node is closest to the target (minimum distance).',
            'Instead of finding all nodes at a fixed distance, you find the minimum distance to a subset of nodes.',
            'Think about how the base case differs from the original problem.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"target":5,"k":2},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the closest node to target criteria.'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}},"target":1,"k":1},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the closest node to target criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"target":0,"k":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def closest_node_to_target(tree, target, k):
    """
    Closest Node to Target

    Given a target node and a set of special nodes, find which special node is closest to the target (minimum distance). Instead of finding all nodes at a fixed distance, you find the minimum distance to a subset of nodes. This requires BFS from the target, stopping at the first special node encountered.

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
print(closest_node_to_target({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, 5, 2))  # Expected: 1
print(closest_node_to_target({"value": 1, "left": {"value": 2}, "right": {"value": 3}}, 1, 1))  # Expected: 2
print(closest_node_to_target({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// ClosestNodeToTarget solves the Closest Node to Target problem.
// Given a target node and a set of special nodes, find which special node is closest to the target (minimum distance). Instead of finding all nodes at a fixed distance, you find the minimum distance to a subset of nodes. This requires BFS from the target, stopping at the first special node encountered.
// Time: O(n), Space: O(n)
func ClosestNodeToTarget(tree *TreeNode, target int, k int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ClosestNodeToTarget({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, 5, 2)) // Expected: 1
	fmt.Println(ClosestNodeToTarget({"value":1,"left":{"value":2},"right":{"value":3}}, 1, 1)) // Expected: 2
	fmt.Println(ClosestNodeToTarget({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '15-find-nodes-distance-k/twist-03-closest-node-to-target', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/15-find-nodes-distance-k/twist-03-closest-node-to-target'] = problem;
})();
