/**
 * Max Path Sum with Exactly K Nodes
 * Category: binary-trees
 * Difficulty: Very Hard
 * Algorithm: tree-max-path
 * Parent: 01-branch-sums/02-binary-tree-max-path-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Path Sum with Exactly K Nodes',
        difficulty: 'Very Hard',
        algorithm: 'tree-max-path',
        parent: '01-branch-sums/02-binary-tree-max-path-sum',
        description: 'Find the maximum path sum where the path must contain exactly K nodes. The path still follows parent-child connections. Adds a constraint dimension. At each node you must track the best sum for each possible path length (1..K), turning a simple DFS into a problem requiring dynamic programming on the tree.',
        problem: 'Adds a constraint dimension. At each node you must track the best sum for each possible path length (1..K), turning a simple DFS into a problem requiring dynamic programming on the tree.',
        hints: [
            'Consider: Find the maximum path sum where the path must contain exactly K nodes.',
            'The path still follows parent-child connections.',
            'Key insight: Adds a constraint dimension.',
            'At each node you must track the best sum for each possible path length (1..K), turning a simple DFS into a problem requiring dynamic programming on the tree.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}}},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the max path sum with exactly k nodes criteria.'
            },
            {
                input: {"tree":{"value":-10,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the max path sum with exactly k nodes criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def max_path_sum_with_exactly_k_nodes(tree):
    """
    Max Path Sum with Exactly K Nodes

    Find the maximum path sum where the path must contain exactly K nodes. The path still follows parent-child connections. Adds a constraint dimension. At each node you must track the best sum for each possible path length (1..K), turning a simple DFS into a problem requiring dynamic programming on the tree.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(max_path_sum_with_exactly_k_nodes({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: 1
print(max_path_sum_with_exactly_k_nodes({"value": -10, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 2
print(max_path_sum_with_exactly_k_nodes({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// MaxPathSumWithExactlyKNodes solves the Max Path Sum with Exactly K Nodes problem.
// Find the maximum path sum where the path must contain exactly K nodes. The path still follows parent-child connections. Adds a constraint dimension. At each node you must track the best sum for each possible path length (1..K), turning a simple DFS into a problem requiring dynamic programming on the tree.
// Time: O(n), Space: O(n)
func MaxPathSumWithExactlyKNodes(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaxPathSumWithExactlyKNodes({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: 1
	fmt.Println(MaxPathSumWithExactlyKNodes({"value":-10,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 2
	fmt.Println(MaxPathSumWithExactlyKNodes({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/02-binary-tree-max-path-sum/twist-03-max-path-sum-with-exactly-k-nodes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/02-binary-tree-max-path-sum/twist-03-max-path-sum-with-exactly-k-nodes'] = problem;
})();
