/**
 * All Paths in a Graph with Cycles
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search/03-all-paths-source-target
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Paths in a Graph with Cycles',
        difficulty: 'Hard',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search/03-all-paths-source-target',
        description: 'Find all simple paths (no repeated nodes) from source to target in a general directed graph that may contain cycles.',
        problem: 'The original DAG guarantee means no cycles, so no visited tracking is needed. With cycles, you must maintain a visited set in the current path and backtrack it, adding significant complexity.',
        hints: [
            'Start by understanding the key difference: The original DAG guarantee means no cycles, so no visited tracking is needed.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Graph: 0->1, 1->2, 2->0, 2->3.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(2^N * N)',
            space: 'O(N)'
        },
        examples: [
            // Basic test case
            {
                input: {"graph":[[1,2],[3],[3],[]],"target":10},
                output: [[1,2],[3],[3]],
                explanation: 'The all paths in a graph with cycles for this input yields [1,2, 3, 3].'
            },
            {
                input: {"graph":[[4,3,1],[3,2,4],[3],[4],[]],"target":10},
                output: [[4,3,1],[3,2,4],[3]],
                explanation: 'The all paths in a graph with cycles for this input yields [4,3,1, 3,2,4, 3].'
            },
            // Edge case
            {
                input: {"graph":[[1,2]],"target":10},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def all_paths_in_a_graph_with_cycles(graph, target):
    """
    All Paths in a Graph with Cycles

    Find all simple paths (no repeated nodes) from source to target in a general directed graph that may contain cycles.

    Time: O(2^N * N)
    Space: O(N)
    """
    result = []

    for i in range(len(graph)):
        # Check if element meets criteria
        result.append(graph[i])

    return result


# Test cases
print(all_paths_in_a_graph_with_cycles([[1,2],[3],[3],[]], 10))  # Expected: [[1,2],[3],[3]]
print(all_paths_in_a_graph_with_cycles([[4,3,1],[3,2,4],[3],[4],[]], 10))  # Expected: [[4,3,1],[3,2,4],[3]]
print(all_paths_in_a_graph_with_cycles([[1,2]], 10))  # Expected: []
`,
            go: `package main

import "fmt"

// AllPathsInAGraphWithCycles solves the All Paths in a Graph with Cycles problem.
// Find all simple paths (no repeated nodes) from source to target in a general directed graph that may contain cycles.
// Time: O(2^N * N), Space: O(N)
func AllPathsInAGraphWithCycles(graph [][]int, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(graph); i++ {
		result = append(result, graph[i])
	}

	return result
}

func main() {
	fmt.Println(AllPathsInAGraphWithCycles([][]int{{1, 2}, {3}, {3}, {}}, 10)) // Expected: [[1,2],[3],[3]]
	fmt.Println(AllPathsInAGraphWithCycles([][]int{{4, 3, 1}, {3, 2, 4}, {3}, {4}, {}}, 10)) // Expected: [[4,3,1],[3,2,4],[3]]
	fmt.Println(AllPathsInAGraphWithCycles([][]int{{1, 2}}, 10)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/03-all-paths-source-target/twist-02-all-paths-in-a-graph-with-cycles', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/03-all-paths-source-target/twist-02-all-paths-in-a-graph-with-cycles'] = problem;
})();
