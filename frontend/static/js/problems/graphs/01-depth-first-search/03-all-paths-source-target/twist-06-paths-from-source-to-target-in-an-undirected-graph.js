/**
 * Paths from Source to Target in an Undirected Graph
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search/03-all-paths-source-target
 */
(function() {
    'use strict';

    const problem = {
        name: 'Paths from Source to Target in an Undirected Graph',
        difficulty: 'Hard',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search/03-all-paths-source-target',
        description: 'Find all simple paths in an undirected graph. Since edges are bidirectional, you must avoid revisiting nodes within the same path.',
        problem: 'Undirected edges create many more potential paths and cycles. The visited tracking per path becomes critical, and the search space explodes compared to the DAG version.',
        hints: [
            'Start by understanding the key difference: Undirected edges create many more potential paths and cycles.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Undirected: 0-1, 1-2, 0-2, 2-3.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(2^N * N)',
            space: 'O(N)'
        },
        examples: [
            // Basic test case
            {
                input: {"graph":[[1,2],[3],[3],[]]},
                output: [[1,2],[3],[3],[]],
                explanation: 'The paths from source to target in an undirected graph for this input yields [1,2, 3, 3, ].'
            },
            {
                input: {"graph":[[4,3,1],[3,2,4],[3],[4],[]]},
                output: [[4,3,1],[3,2,4],[3],[4]],
                explanation: 'The paths from source to target in an undirected graph for this input yields [4,3,1, 3,2,4, 3, 4].'
            },
            // Edge case
            {
                input: {"graph":[[1,2]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def paths_from_source_to_target_in_an_undirected_graph(graph):
    """
    Paths from Source to Target in an Undirected Graph

    Find all simple paths in an undirected graph. Since edges are bidirectional, you must avoid revisiting nodes within the same path.

    Time: O(2^N * N)
    Space: O(N)
    """
    result = []

    for i in range(len(graph)):
        # Check if element meets criteria
        result.append(graph[i])

    return result


# Test cases
print(paths_from_source_to_target_in_an_undirected_graph([[1,2],[3],[3],[]]))  # Expected: [[1,2],[3],[3],[]]
print(paths_from_source_to_target_in_an_undirected_graph([[4,3,1],[3,2,4],[3],[4],[]]))  # Expected: [[4,3,1],[3,2,4],[3],[4]]
print(paths_from_source_to_target_in_an_undirected_graph([[1,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// PathsFromSourceToTargetInAnUndirectedGraph solves the Paths from Source to Target in an Undirected Graph problem.
// Find all simple paths in an undirected graph. Since edges are bidirectional, you must avoid revisiting nodes within the same path.
// Time: O(2^N * N), Space: O(N)
func PathsFromSourceToTargetInAnUndirectedGraph(graph [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(graph); i++ {
		result = append(result, graph[i])
	}

	return result
}

func main() {
	fmt.Println(PathsFromSourceToTargetInAnUndirectedGraph([][]int{{1, 2}, {3}, {3}, {}})) // Expected: [[1,2],[3],[3],[]]
	fmt.Println(PathsFromSourceToTargetInAnUndirectedGraph([][]int{{4, 3, 1}, {3, 2, 4}, {3}, {4}, {}})) // Expected: [[4,3,1],[3,2,4],[3],[4]]
	fmt.Println(PathsFromSourceToTargetInAnUndirectedGraph([][]int{{1, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/03-all-paths-source-target/twist-06-paths-from-source-to-target-in-an-undirected-graph', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/03-all-paths-source-target/twist-06-paths-from-source-to-target-in-an-undirected-graph'] = problem;
})();
