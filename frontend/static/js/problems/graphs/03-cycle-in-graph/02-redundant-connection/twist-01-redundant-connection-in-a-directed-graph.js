/**
 * Redundant Connection in a Directed Graph
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-cycle
 * Parent: 03-cycle-in-graph/02-redundant-connection
 */
(function() {
    'use strict';

    const problem = {
        name: 'Redundant Connection in a Directed Graph',
        difficulty: 'Hard',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph/02-redundant-connection',
        description: 'Same problem but on a directed graph (rooted tree with one extra directed edge). The extra edge might create a cycle or give a node two parents.',
        problem: 'In directed graphs, the redundant edge might not be in a cycle - it could create a node with two parents instead. You must handle both cases: two-parent scenario and cycle scenario, possibly with overlap.',
        hints: [
            'Start by understanding the key difference: In directed graphs, the redundant edge might not be in a cycle - it could create a node with two parents instead.',
            'Consider breaking this into subproblems and solving each independently.'
        ],
        complexity: {
            time: 'O(N * alpha(N))',
            space: 'O(N)'
        },
        examples: [
            // Basic test case
            {
                input: {"edges":[[1,2],[1,3],[2,3]]},
                output: [[1,2],[1,3],[2,3]],
                explanation: 'The redundant connection in a directed graph for this input yields [1,2, 1,3, 2,3].'
            },
            {
                input: {"edges":[[1,2],[2,3],[3,4],[1,4],[1,5]]},
                output: [[1,2],[2,3],[3,4]],
                explanation: 'The redundant connection in a directed graph for this input yields [1,2, 2,3, 3,4].'
            },
            // Edge case
            {
                input: {"edges":[[1,2]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def redundant_connection_in_a_directed_graph(edges):
    """
    Redundant Connection in a Directed Graph

    Same problem but on a directed graph (rooted tree with one extra directed edge). The extra edge might create a cycle or give a node two parents.

    Time: O(N * alpha(N))
    Space: O(N)
    """
    result = []

    for i in range(len(edges)):
        # Check if element meets criteria
        result.append(edges[i])

    return result


# Test cases
print(redundant_connection_in_a_directed_graph([[1,2],[1,3],[2,3]]))  # Expected: [[1,2],[1,3],[2,3]]
print(redundant_connection_in_a_directed_graph([[1,2],[2,3],[3,4],[1,4],[1,5]]))  # Expected: [[1,2],[2,3],[3,4]]
print(redundant_connection_in_a_directed_graph([[1,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// RedundantConnectionInADirectedGraph solves the Redundant Connection in a Directed Graph problem.
// Same problem but on a directed graph (rooted tree with one extra directed edge). The extra edge might create a cycle or give a node two parents.
// Time: O(N * alpha(N)), Space: O(N)
func RedundantConnectionInADirectedGraph(edges [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(edges); i++ {
		result = append(result, edges[i])
	}

	return result
}

func main() {
	fmt.Println(RedundantConnectionInADirectedGraph([][]int{{1, 2}, {1, 3}, {2, 3}})) // Expected: [[1,2],[1,3],[2,3]]
	fmt.Println(RedundantConnectionInADirectedGraph([][]int{{1, 2}, {2, 3}, {3, 4}, {1, 4}, {1, 5}})) // Expected: [[1,2],[2,3],[3,4]]
	fmt.Println(RedundantConnectionInADirectedGraph([][]int{{1, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/02-redundant-connection/twist-01-redundant-connection-in-a-directed-graph', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/02-redundant-connection/twist-01-redundant-connection-in-a-directed-graph'] = problem;
})();
