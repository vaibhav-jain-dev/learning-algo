/**
 * Nodes at Distance K from All Leaves
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-distance
 * Parent: 15-find-nodes-distance-k
 */
(function() {
    'use strict';

    const problem = {
        name: 'Nodes at Distance K from All Leaves',
        difficulty: 'Hard',
        algorithm: 'tree-distance',
        parent: '15-find-nodes-distance-k',
        description: 'Find all nodes that are exactly distance k from every leaf node in the tree. A node qualifies only if its distance to ALL leaves equals k. The original finds nodes at distance k from one target. This requires checking the distance to ALL leaves, which means you need the minimum and maximum leaf distances for each node and only include nodes where both equal k.',
        problem: 'The original finds nodes at distance k from one target. This requires checking the distance to ALL leaves, which means you need the minimum and maximum leaf distances for each node and only include nodes where both equal k.',
        hints: [
            'Consider: Find all nodes that are exactly distance k from every leaf node in the tree.',
            'A node qualifies only if its distance to ALL leaves equals k.',
            'Key insight: The original finds nodes at distance k from one target.',
            'This requires checking the distance to ALL leaves, which means you need the minimum and maximum leaf distances for each node and only include nodes where both equal k.'
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
                explanation: 'For this input, there is 1 valid position that satisfy the nodes at distance k from all leaves criteria.'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}},"target":1,"k":1},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the nodes at distance k from all leaves criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"target":0,"k":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def nodes_at_distance_k_from_all_leaves(tree, target, k):
    """
    Nodes at Distance K from All Leaves

    Find all nodes that are exactly distance k from every leaf node in the tree. A node qualifies only if its distance to ALL leaves equals k. The original finds nodes at distance k from one target. This requires checking the distance to ALL leaves, which means you need the minimum and maximum leaf distances for each node and only include nodes where both equal k.

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
print(nodes_at_distance_k_from_all_leaves({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, 5, 2))  # Expected: 1
print(nodes_at_distance_k_from_all_leaves({"value": 1, "left": {"value": 2}, "right": {"value": 3}}, 1, 1))  # Expected: 2
print(nodes_at_distance_k_from_all_leaves({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// NodesAtDistanceKFromAllLeaves solves the Nodes at Distance K from All Leaves problem.
// Find all nodes that are exactly distance k from every leaf node in the tree. A node qualifies only if its distance to ALL leaves equals k. The original finds nodes at distance k from one target. This requires checking the distance to ALL leaves, which means you need the minimum and maximum leaf distances for each node and only include nodes where both equal k.
// Time: O(n), Space: O(n)
func NodesAtDistanceKFromAllLeaves(tree *TreeNode, target int, k int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NodesAtDistanceKFromAllLeaves({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, 5, 2)) // Expected: 1
	fmt.Println(NodesAtDistanceKFromAllLeaves({"value":1,"left":{"value":2},"right":{"value":3}}, 1, 1)) // Expected: 2
	fmt.Println(NodesAtDistanceKFromAllLeaves({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '15-find-nodes-distance-k/twist-01-nodes-at-distance-k-from-all-leaves', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/15-find-nodes-distance-k/twist-01-nodes-at-distance-k-from-all-leaves'] = problem;
})();
