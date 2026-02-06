/**
 * BFS on a Directed Graph with Unreachable Nodes
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-bfs
 * Parent: 02-breadth-first-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'BFS on a Directed Graph with Unreachable Nodes',
        difficulty: 'Medium',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search',
        description: 'Perform BFS on a directed graph starting from a given node. Some nodes may be unreachable. Return both the traversal order and the set of unreachable nodes.',
        problem: 'In a tree, all nodes are reachable from root. In a directed graph, some nodes may have no incoming path from the start. You must identify which nodes were never visited after BFS completes.',
        hints: [
            'Start by understanding the key difference: In a tree, all nodes are reachable from root.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Directed graph: A->B, A->C, D->C.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}},
                output: [0],
                explanation: 'The bfs on a directed graph with unreachable nodes for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bfs_on_a_directed_graph_with_unreachable_nodes(tree):
    """
    BFS on a Directed Graph with Unreachable Nodes

    Perform BFS on a directed graph starting from a given node. Some nodes may be unreachable. Return both the traversal order and the set of unreachable nodes.

    Time: O(V + E)
    Space: O(V)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(bfs_on_a_directed_graph_with_unreachable_nodes({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}))  # Expected: [0]
print(bfs_on_a_directed_graph_with_unreachable_nodes({"name": "A", "children": [{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}))  # Expected: []
`,
            go: `package main

import "fmt"

// BfsOnADirectedGraphWithUnreachableNodes solves the BFS on a Directed Graph with Unreachable Nodes problem.
// Perform BFS on a directed graph starting from a given node. Some nodes may be unreachable. Return both the traversal order and the set of unreachable nodes.
// Time: O(V + E), Space: O(V)
func BfsOnADirectedGraphWithUnreachableNodes(tree map[string]interface{}) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(BfsOnADirectedGraphWithUnreachableNodes({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]})) // Expected: [0]
	fmt.Println(BfsOnADirectedGraphWithUnreachableNodes({"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/twist-02-bfs-on-a-directed-graph-with-unreachable-nodes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/twist-02-bfs-on-a-directed-graph-with-unreachable-nodes'] = problem;
})();
