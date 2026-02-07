/**
 * Nodes at Distance K in a Graph
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-distance
 * Parent: 15-find-nodes-distance-k
 */
(function() {
    'use strict';

    const problem = {
        name: 'Nodes at Distance K in a Graph',
        difficulty: 'Hard',
        algorithm: 'tree-distance',
        parent: '15-find-nodes-distance-k',
        description: 'The same problem but the input is a general undirected graph (not a tree). Find all nodes at distance exactly k from a given source node. In a tree, there is exactly one path between any two nodes. In a graph with cycles, BFS naturally handles this, but you must track visited nodes to avoid infinite loops. The parent-mapping step from the tree version becomes unnecessary since the graph already has explicit edges.',
        problem: 'In a tree, there is exactly one path between any two nodes. In a graph with cycles, BFS naturally handles this, but you must track visited nodes to avoid infinite loops. The parent-mapping step from the tree version becomes unnecessary since the graph already has explicit edges.',
        hints: [
            'Consider: The same problem but the input is a general undirected graph (not a tree).',
            'Find all nodes at distance exactly k from a given source node.',
            'Key insight: In a tree, there is exactly one path between any two nodes.',
            'The parent-mapping step from the tree version becomes unnecessary since the graph already has explicit edges.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"target":5,"k":2},
                output: [0],
                explanation: 'The nodes at distance k in a graph for this input yields [0].'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}},"target":1,"k":1},
                output: [0,1],
                explanation: 'The nodes at distance k in a graph for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"target":0,"k":0},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def nodes_at_distance_k_in_a_graph(tree, target, k):
    """
    Nodes at Distance K in a Graph

    The same problem but the input is a general undirected graph (not a tree). Find all nodes at distance exactly k from a given source node. In a tree, there is exactly one path between any two nodes. In a graph with cycles, BFS naturally handles this, but you must track visited nodes to avoid infinite loops. The parent-mapping step from the tree version becomes unnecessary since the graph already has explicit edges.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(nodes_at_distance_k_in_a_graph({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, 5, 2))  # Expected: [0]
print(nodes_at_distance_k_in_a_graph({"value": 1, "left": {"value": 2}, "right": {"value": 3}}, 1, 1))  # Expected: [0,1]
print(nodes_at_distance_k_in_a_graph({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, 0, 0))  # Expected: []
`,
            go: `package main

import "fmt"

// NodesAtDistanceKInAGraph solves the Nodes at Distance K in a Graph problem.
// The same problem but the input is a general undirected graph (not a tree). Find all nodes at distance exactly k from a given source node. In a tree, there is exactly one path between any two nodes. In a graph with cycles, BFS naturally handles this, but you must track visited nodes to avoid infinite loops. The parent-mapping step from the tree version becomes unnecessary since the graph already has explicit edges.
// Time: O(n), Space: O(n)
func NodesAtDistanceKInAGraph(tree *TreeNode, target int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(NodesAtDistanceKInAGraph({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, 5, 2)) // Expected: [0]
	fmt.Println(NodesAtDistanceKInAGraph({"value":1,"left":{"value":2},"right":{"value":3}}, 1, 1)) // Expected: [0,1]
	fmt.Println(NodesAtDistanceKInAGraph({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, 0, 0)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '15-find-nodes-distance-k/twist-04-nodes-at-distance-k-in-a-graph', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/15-find-nodes-distance-k/twist-04-nodes-at-distance-k-in-a-graph'] = problem;
})();
