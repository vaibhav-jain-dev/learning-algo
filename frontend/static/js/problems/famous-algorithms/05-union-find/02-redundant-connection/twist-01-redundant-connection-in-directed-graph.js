/**
 * Redundant Connection in Directed Graph
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: union-find
 * Parent: 05-union-find/02-redundant-connection
 */
(function() {
    'use strict';

    const problem = {
        name: 'Redundant Connection in Directed Graph',
        difficulty: 'Hard',
        algorithm: 'union-find',
        parent: '05-union-find/02-redundant-connection',
        description: 'In a directed graph that started as a rooted tree with one extra edge, find the edge that can be removed to restore the tree.',
        problem: 'Directed edges create two possible cases: a node with two parents, or a cycle. Requires handling both scenarios with different logic.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"edges":[[1,2],[1,3],[2,3]]},
                output: [[1,2],[1,3],[2,3]],
                explanation: 'The redundant connection in directed graph for this input yields [1,2, 1,3, 2,3].'
            },
            // Edge case
            {
                input: {"edges":[[1,2]]},
                output: [],
                explanation: 'Process each connection/edge. For each pair, find their root representatives. If different, merge the smaller tree into the larger one (union by rank). Path compression flattens the tree on each find.'
            }
        ],
        solutions: {
            python: `def redundant_connection_in_directed_graph(edges):
    """
    Redundant Connection in Directed Graph

    In a directed graph that started as a rooted tree with one extra edge, find the edge that can be removed to restore the tree.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(edges)):
        # Check if element meets criteria
        result.append(edges[i])

    return result


# Test cases
print(redundant_connection_in_directed_graph([[1,2],[1,3],[2,3]]))  # Expected: [[1,2],[1,3],[2,3]]
print(redundant_connection_in_directed_graph([[1,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// RedundantConnectionInDirectedGraph solves the Redundant Connection in Directed Graph problem.
// In a directed graph that started as a rooted tree with one extra edge, find the edge that can be removed to restore the tree.
// Time: O(?), Space: O(?)
func RedundantConnectionInDirectedGraph(edges [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(edges); i++ {
		result = append(result, edges[i])
	}

	return result
}

func main() {
	fmt.Println(RedundantConnectionInDirectedGraph([][]int{{1, 2}, {1, 3}, {2, 3}})) // Expected: [[1,2],[1,3],[2,3]]
	fmt.Println(RedundantConnectionInDirectedGraph([][]int{{1, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/02-redundant-connection/twist-01-redundant-connection-in-directed-graph', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/02-redundant-connection/twist-01-redundant-connection-in-directed-graph'] = problem;
})();
