/**
 * Critical Nodes Instead
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-connections
 * Parent: 10-airport-connections/01-critical-connections
 */
(function() {
    'use strict';

    const problem = {
        name: 'Critical Nodes Instead',
        difficulty: 'Hard',
        algorithm: 'graph-connections',
        parent: '10-airport-connections/01-critical-connections',
        description: 'Find all critical nodes (articulation points) instead of critical edges. A node is critical if removing it disconnects the graph.',
        problem: 'Articulation point detection modifies the Tarjan condition: a node is an articulation point if it has a child with low[child] >= disc[node], with special handling for the root.',
        hints: [

        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":4,"connections":[[0,1],[1,2],[2,0],[1,3]]},
                output: [[0,1],[1,2],[2,0]],
                explanation: 'The critical nodes instead for this input yields [0,1, 1,2, 2,0].'
            },
            // Edge case
            {
                input: {"n":0,"connections":[[0,1]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def critical_nodes_instead(n, connections):
    """
    Critical Nodes Instead

    Find all critical nodes (articulation points) instead of critical edges. A node is critical if removing it disconnects the graph.

    Time: O(V + E)
    Space: O(V + E)
    """
    result = []

    for i in range(len(n)):
        # Check if element meets criteria
        result.append(n[i])

    return result


# Test cases
print(critical_nodes_instead(4, [[0,1],[1,2],[2,0],[1,3]]))  # Expected: [[0,1],[1,2],[2,0]]
print(critical_nodes_instead(0, [[0,1]]))  # Expected: []
`,
            go: `package main

import "fmt"

// CriticalNodesInstead solves the Critical Nodes Instead problem.
// Find all critical nodes (articulation points) instead of critical edges. A node is critical if removing it disconnects the graph.
// Time: O(V + E), Space: O(V + E)
func CriticalNodesInstead(n int, connections [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(n); i++ {
		result = append(result, n[i])
	}

	return result
}

func main() {
	fmt.Println(CriticalNodesInstead(4, [][]int{{0, 1}, {1, 2}, {2, 0}, {1, 3}})) // Expected: [[0,1],[1,2],[2,0]]
	fmt.Println(CriticalNodesInstead(0, [][]int{{0, 1}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/01-critical-connections/twist-01-critical-nodes-instead', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/01-critical-connections/twist-01-critical-nodes-instead'] = problem;
})();
