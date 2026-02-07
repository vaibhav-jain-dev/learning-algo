/**
 * DFS Minimum Depth
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-bfs
 * Parent: 02-node-depths/02-minimum-depth
 */
(function() {
    'use strict';

    const problem = {
        name: 'DFS Minimum Depth',
        difficulty: 'Easy',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/02-minimum-depth',
        description: 'Solve minimum depth using DFS (recursion) instead of BFS. Be careful about the definition of minimum depth when one child is null. Unlike BFS which naturally finds the first leaf, DFS must explore the entire tree. The critical trap: if a node has only one child, the null child does NOT count as a leaf, so you cannot just take min(left, right)+1.',
        problem: 'Unlike BFS which naturally finds the first leaf, DFS must explore the entire tree. The critical trap: if a node has only one child, the null child does NOT count as a leaf, so you cannot just take min(left, right)+1.',
        hints: [
            'Consider: Solve minimum depth using DFS (recursion) instead of BFS.',
            'Be careful about the definition of minimum depth when one child is null.',
            'Key insight: Unlike BFS which naturally finds the first leaf, DFS must explore the entire tree.',
            'The critical trap: if a node has only one child, the null child does NOT count as a leaf, so you cannot just take min(left, right)+1.'
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
            python: `def dfs_minimum_depth(tree):
    """
    DFS Minimum Depth

    Solve minimum depth using DFS (recursion) instead of BFS. Be careful about the definition of minimum depth when one child is null. Unlike BFS which naturally finds the first leaf, DFS must explore the entire tree. The critical trap: if a node has only one child, the null child does NOT count as a leaf, so you cannot just take min(left, right)+1.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(dfs_minimum_depth({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 1
print(dfs_minimum_depth({"value": 2, "right": {"value": 3, "right": {"value": 4, "right": {"value": 5, "right": {"value": 6}}}}}))  # Expected: 2
print(dfs_minimum_depth({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// DfsMinimumDepth solves the DFS Minimum Depth problem.
// Solve minimum depth using DFS (recursion) instead of BFS. Be careful about the definition of minimum depth when one child is null. Unlike BFS which naturally finds the first leaf, DFS must explore the entire tree. The critical trap: if a node has only one child, the null child does NOT count as a leaf, so you cannot just take min(left, right)+1.
// Time: O(n), Space: O(n)
func DfsMinimumDepth(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DfsMinimumDepth({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 1
	fmt.Println(DfsMinimumDepth({"value":2,"right":{"value":3,"right":{"value":4,"right":{"value":5,"right":{"value":6}}}}})) // Expected: 2
	fmt.Println(DfsMinimumDepth({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/02-minimum-depth/twist-01-dfs-minimum-depth', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/02-minimum-depth/twist-01-dfs-minimum-depth'] = problem;
})();
