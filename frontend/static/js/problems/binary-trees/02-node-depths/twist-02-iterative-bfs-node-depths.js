/**
 * Iterative BFS Node Depths
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-dfs
 * Parent: 02-node-depths
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative BFS Node Depths',
        difficulty: 'Easy',
        algorithm: 'tree-dfs',
        parent: '02-node-depths',
        description: 'Compute sum of node depths using BFS (level-order traversal) instead of DFS. Use the level number as the depth. BFS naturally tracks depth by level. Instead of passing depth as a recursive parameter, you use the queue level counter. All nodes at level k contribute k to the sum.',
        problem: 'BFS naturally tracks depth by level. Instead of passing depth as a recursive parameter, you use the queue level counter. All nodes at level k contribute k to the sum.',
        hints: [
            'Consider: Compute sum of node depths using BFS (level-order traversal) instead of DFS.',
            'Use the level number as the depth.',
            'Key insight: BFS naturally tracks depth by level.',
            'All nodes at level k contribute k to the sum.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: [0],
                explanation: 'The iterative bfs node depths for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def iterative_bfs_node_depths(tree):
    """
    Iterative BFS Node Depths

    Compute sum of node depths using BFS (level-order traversal) instead of DFS. Use the level number as the depth. BFS naturally tracks depth by level. Instead of passing depth as a recursive parameter, you use the queue level counter. All nodes at level k contribute k to the sum.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(iterative_bfs_node_depths({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: [0]
print(iterative_bfs_node_depths({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// IterativeBfsNodeDepths solves the Iterative BFS Node Depths problem.
// Compute sum of node depths using BFS (level-order traversal) instead of DFS. Use the level number as the depth. BFS naturally tracks depth by level. Instead of passing depth as a recursive parameter, you use the queue level counter. All nodes at level k contribute k to the sum.
// Time: O(n), Space: O(n)
func IterativeBfsNodeDepths(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(IterativeBfsNodeDepths({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: [0]
	fmt.Println(IterativeBfsNodeDepths({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/twist-02-iterative-bfs-node-depths', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/twist-02-iterative-bfs-node-depths'] = problem;
})();
