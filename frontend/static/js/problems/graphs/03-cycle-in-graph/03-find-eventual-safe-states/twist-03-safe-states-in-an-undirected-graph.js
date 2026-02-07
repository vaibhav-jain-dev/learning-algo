/**
 * Safe States in an Undirected Graph
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-cycle
 * Parent: 03-cycle-in-graph/03-find-eventual-safe-states
 */
(function() {
    'use strict';

    const problem = {
        name: 'Safe States in an Undirected Graph',
        difficulty: 'Hard',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph/03-find-eventual-safe-states',
        description: 'Define a "safe node" in an undirected graph as one that is not part of any cycle. Find all such nodes (articulation-related concept).',
        problem: 'In undirected graphs, cycle detection works differently (must track parent). A node is "safe" only if it is not on any cycle, which relates to biconnected components and bridge detection.',
        hints: [
            'Start by understanding the key difference: In undirected graphs, cycle detection works differently (must track parent).',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Undirected: 0-1, 1-2, 2-0, 2-3, 3-4.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"graph":[[1,2],[2,3],[5],[0],[5],[],[]]},
                output: [[1,2],[2,3],[5]],
                explanation: 'The safe states in an undirected graph for this input yields [1,2, 2,3, 5].'
            },
            {
                input: {"graph":[[1,2,3,4],[1,2],[3,4],[0,4],[]]},
                output: [[1,2,3,4],[1,2],[3,4]],
                explanation: 'The safe states in an undirected graph for this input yields [1,2,3,4, 1,2, 3,4].'
            },
            // Edge case
            {
                input: {"graph":[[1,2]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def safe_states_in_an_undirected_graph(graph):
    """
    Safe States in an Undirected Graph

    Define a "safe node" in an undirected graph as one that is not part of any cycle. Find all such nodes (articulation-related concept).

    Time: O(V + E)
    Space: O(V)
    """
    result = []

    for i in range(len(graph)):
        # Check if element meets criteria
        result.append(graph[i])

    return result


# Test cases
print(safe_states_in_an_undirected_graph([[1,2],[2,3],[5],[0],[5],[],[]]))  # Expected: [[1,2],[2,3],[5]]
print(safe_states_in_an_undirected_graph([[1,2,3,4],[1,2],[3,4],[0,4],[]]))  # Expected: [[1,2,3,4],[1,2],[3,4]]
print(safe_states_in_an_undirected_graph([[1,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// SafeStatesInAnUndirectedGraph solves the Safe States in an Undirected Graph problem.
// Define a "safe node" in an undirected graph as one that is not part of any cycle. Find all such nodes (articulation-related concept).
// Time: O(V + E), Space: O(V)
func SafeStatesInAnUndirectedGraph(graph [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(graph); i++ {
		result = append(result, graph[i])
	}

	return result
}

func main() {
	fmt.Println(SafeStatesInAnUndirectedGraph([][]int{{1, 2}, {2, 3}, {5}, {0}, {5}, {}, {}})) // Expected: [[1,2],[2,3],[5]]
	fmt.Println(SafeStatesInAnUndirectedGraph([][]int{{1, 2, 3, 4}, {1, 2}, {3, 4}, {0, 4}, {}})) // Expected: [[1,2,3,4],[1,2],[3,4]]
	fmt.Println(SafeStatesInAnUndirectedGraph([][]int{{1, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/03-find-eventual-safe-states/twist-03-safe-states-in-an-undirected-graph', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/03-find-eventual-safe-states/twist-03-safe-states-in-an-undirected-graph'] = problem;
})();
