/**
 * Sum of Nodes at Distance K
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-distance
 * Parent: 15-find-nodes-distance-k
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sum of Nodes at Distance K',
        difficulty: 'Medium',
        algorithm: 'tree-distance',
        parent: '15-find-nodes-distance-k',
        description: 'Instead of returning the list of nodes at distance k from the target, return the sum of their values. While the core algorithm is the same, the aggregation changes. This tests whether your approach cleanly separates the "find nodes" step from the "collect results" step.',
        problem: 'While the core algorithm is the same, the aggregation changes. This tests whether your approach cleanly separates the "find nodes" step from the "collect results" step.',
        hints: [
            'Consider: Instead of returning the list of nodes at distance k from the target, return the sum of their values.',
            'While the core algorithm is the same, the aggregation changes.',
            'Think about how the base case differs from the original problem.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"target":10,"k":2},
                output: [0],
                explanation: 'The sum of nodes at distance k for this input yields [0].'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}},"target":10,"k":1},
                output: [0,1],
                explanation: 'The sum of nodes at distance k for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"target":10,"k":0},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def sum_of_nodes_at_distance_k(tree, target, k):
    """
    Sum of Nodes at Distance K

    Instead of returning the list of nodes at distance k from the target, return the sum of their values. While the core algorithm is the same, the aggregation changes. This tests whether your approach cleanly separates the "find nodes" step from the "collect results" step.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(sum_of_nodes_at_distance_k({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, 10, 2))  # Expected: [0]
print(sum_of_nodes_at_distance_k({"value": 1, "left": {"value": 2}, "right": {"value": 3}}, 10, 1))  # Expected: [0,1]
print(sum_of_nodes_at_distance_k({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, 10, 0))  # Expected: []
`,
            go: `package main

import "fmt"

// SumOfNodesAtDistanceK solves the Sum of Nodes at Distance K problem.
// Instead of returning the list of nodes at distance k from the target, return the sum of their values. While the core algorithm is the same, the aggregation changes. This tests whether your approach cleanly separates the "find nodes" step from the "collect results" step.
// Time: O(n), Space: O(n)
func SumOfNodesAtDistanceK(tree *TreeNode, target int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(SumOfNodesAtDistanceK({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, 10, 2)) // Expected: [0]
	fmt.Println(SumOfNodesAtDistanceK({"value":1,"left":{"value":2},"right":{"value":3}}, 10, 1)) // Expected: [0,1]
	fmt.Println(SumOfNodesAtDistanceK({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, 10, 0)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '15-find-nodes-distance-k/twist-02-sum-of-nodes-at-distance-k', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/15-find-nodes-distance-k/twist-02-sum-of-nodes-at-distance-k'] = problem;
})();
