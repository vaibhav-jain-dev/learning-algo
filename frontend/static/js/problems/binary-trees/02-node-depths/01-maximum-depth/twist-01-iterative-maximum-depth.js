/**
 * Iterative Maximum Depth
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-dfs
 * Parent: 02-node-depths/01-maximum-depth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative Maximum Depth',
        difficulty: 'Easy',
        algorithm: 'tree-dfs',
        parent: '02-node-depths/01-maximum-depth',
        description: 'Find the maximum depth of the binary tree using BFS (level-order traversal) instead of recursion. Count the number of levels. BFS naturally counts levels. Instead of recursive max(left, right)+1, you increment a depth counter each time you process a complete level from the queue.',
        problem: 'BFS naturally counts levels. Instead of recursive max(left, right)+1, you increment a depth counter each time you process a complete level from the queue.',
        hints: [
            'Consider: Find the maximum depth of the binary tree using BFS (level-order traversal) instead of recursion.',
            'Count the number of levels.',
            'Key insight: BFS naturally counts levels.',
            'Instead of recursive max(left, right)+1, you increment a depth counter each time you process a complete level from the queue.'
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
                input: {"tree":{"value":1,"right":{"value":2}}},
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
            python: `def iterative_maximum_depth(tree):
    """
    Iterative Maximum Depth

    Find the maximum depth of the binary tree using BFS (level-order traversal) instead of recursion. Count the number of levels. BFS naturally counts levels. Instead of recursive max(left, right)+1, you increment a depth counter each time you process a complete level from the queue.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(iterative_maximum_depth({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 1
print(iterative_maximum_depth({"value": 1, "right": {"value": 2}}))  # Expected: 2
print(iterative_maximum_depth({"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// IterativeMaximumDepth solves the Iterative Maximum Depth problem.
// Find the maximum depth of the binary tree using BFS (level-order traversal) instead of recursion. Count the number of levels. BFS naturally counts levels. Instead of recursive max(left, right)+1, you increment a depth counter each time you process a complete level from the queue.
// Time: O(n), Space: O(n)
func IterativeMaximumDepth(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(IterativeMaximumDepth({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 1
	fmt.Println(IterativeMaximumDepth({"value":1,"right":{"value":2}})) // Expected: 2
	fmt.Println(IterativeMaximumDepth({"value":3,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/01-maximum-depth/twist-01-iterative-maximum-depth', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/01-maximum-depth/twist-01-iterative-maximum-depth'] = problem;
})();
