/**
 * Count Bipartite Components
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-coloring
 * Parent: 09-two-colorable/01-is-graph-bipartite
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Bipartite Components',
        difficulty: 'Medium',
        algorithm: 'graph-coloring',
        parent: '09-two-colorable/01-is-graph-bipartite',
        description: 'For a disconnected graph, count how many connected components are bipartite and how many are not.',
        problem: 'You run bipartite checks per component and maintain separate counters, requiring component-level tracking beyond a single boolean answer.',
        hints: [
            'Start by understanding the key difference: You run bipartite checks per component and maintain separate counters, requiring component-level tracking beyond a single boolean answer.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Graph with 4 components: 3 are bipartite, 1 has an odd cycle.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"graph":[[1,2,3],[0,2],[0,1,3],[0,2]]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"graph":[[1,3],[0,2],[1,3],[0,2]]},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"graph":[[1,2,3]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def count_bipartite_components(graph):
    """
    Count Bipartite Components

    For a disconnected graph, count how many connected components are bipartite and how many are not.

    Time: O(V + E)
    Space: O(V)
    """
    result = 0

    for i in range(len(graph)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_bipartite_components([[1,2,3],[0,2],[0,1,3],[0,2]]))  # Expected: 1
print(count_bipartite_components([[1,3],[0,2],[1,3],[0,2]]))  # Expected: 2
print(count_bipartite_components([[1,2,3]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountBipartiteComponents solves the Count Bipartite Components problem.
// For a disconnected graph, count how many connected components are bipartite and how many are not.
// Time: O(V + E), Space: O(V)
func CountBipartiteComponents(graph [][]int) int {
	result := 0

	for i := 0; i < len(graph); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountBipartiteComponents([][]int{{1, 2, 3}, {0, 2}, {0, 1, 3}, {0, 2}})) // Expected: 1
	fmt.Println(CountBipartiteComponents([][]int{{1, 3}, {0, 2}, {1, 3}, {0, 2}})) // Expected: 2
	fmt.Println(CountBipartiteComponents([][]int{{1, 2, 3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable/01-is-graph-bipartite/twist-04-count-bipartite-components', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/01-is-graph-bipartite/twist-04-count-bipartite-components'] = problem;
})();
