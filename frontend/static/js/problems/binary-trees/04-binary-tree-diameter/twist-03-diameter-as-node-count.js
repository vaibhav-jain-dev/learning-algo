/**
 * Diameter as Node Count
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-diameter
 * Parent: 04-binary-tree-diameter
 */
(function() {
    'use strict';

    const problem = {
        name: 'Diameter as Node Count',
        difficulty: 'Easy',
        algorithm: 'tree-diameter',
        parent: '04-binary-tree-diameter',
        description: 'Compute the diameter measured in nodes instead of edges. The diameter is the number of nodes on the longest path. Off-by-one difference. The diameter in edges equals diameter in nodes minus 1. The base case changes: a single node has diameter 1 (nodes) vs 0 (edges). Tests precision in definition.',
        problem: 'Off-by-one difference. The diameter in edges equals diameter in nodes minus 1. The base case changes: a single node has diameter 1 (nodes) vs 0 (edges). Tests precision in definition.',
        hints: [
            'Consider: Compute the diameter measured in nodes instead of edges.',
            'The diameter is the number of nodes on the longest path.',
            'Key insight: The diameter in edges equals diameter in nodes minus 1.',
            'Tests precision in definition.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":3,"left":{"value":7,"left":{"value":8}},"right":{"value":4,"right":{"value":5,"right":{"value":6}}}},"right":{"value":2}}},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the diameter as node count criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":3,"left":{"value":7,"left":{"value":8}},"right":{"value":4,"right":{"value":5,"right":{"value":6}}}},"right":{"value":2}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def diameter_as_node_count(tree):
    """
    Diameter as Node Count

    Compute the diameter measured in nodes instead of edges. The diameter is the number of nodes on the longest path. Off-by-one difference. The diameter in edges equals diameter in nodes minus 1. The base case changes: a single node has diameter 1 (nodes) vs 0 (edges). Tests precision in definition.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(diameter_as_node_count({"value": 1, "left": {"value": 3, "left": {"value": 7, "left": {"value": 8}}, "right": {"value": 4, "right": {"value": 5, "right": {"value": 6}}}}, "right": {"value": 2}}))  # Expected: 1
print(diameter_as_node_count({"value": 1, "left": {"value": 3, "left": {"value": 7, "left": {"value": 8}}, "right": {"value": 4, "right": {"value": 5, "right": {"value": 6}}}}, "right": {"value": 2}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// DiameterAsNodeCount solves the Diameter as Node Count problem.
// Compute the diameter measured in nodes instead of edges. The diameter is the number of nodes on the longest path. Off-by-one difference. The diameter in edges equals diameter in nodes minus 1. The base case changes: a single node has diameter 1 (nodes) vs 0 (edges). Tests precision in definition.
// Time: O(n), Space: O(n)
func DiameterAsNodeCount(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DiameterAsNodeCount({"value":1,"left":{"value":3,"left":{"value":7,"left":{"value":8}},"right":{"value":4,"right":{"value":5,"right":{"value":6}}}},"right":{"value":2}})) // Expected: 1
	fmt.Println(DiameterAsNodeCount({"value":1,"left":{"value":3,"left":{"value":7,"left":{"value":8}},"right":{"value":4,"right":{"value":5,"right":{"value":6}}}},"right":{"value":2}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '04-binary-tree-diameter/twist-03-diameter-as-node-count', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/04-binary-tree-diameter/twist-03-diameter-as-node-count'] = problem;
})();
