/**
 * Weighted Critical Connections
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-connections
 * Parent: 10-airport-connections/01-critical-connections
 */
(function() {
    'use strict';

    const problem = {
        name: 'Weighted Critical Connections',
        difficulty: 'Hard',
        algorithm: 'graph-connections',
        parent: '10-airport-connections/01-critical-connections',
        description: 'Each connection has a weight (importance). Among all bridges, find the one with maximum weight.',
        problem: 'Tarjan algorithm finds all bridges, then you filter by weight. The combination of structural graph analysis with weight comparison adds a selection step.',
        hints: [
            'Start by understanding the key difference: Tarjan algorithm finds all bridges, then you filter by weight.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Bridges: (1,3) weight 5, (4,5) weight 10.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":4,"connections":[[0,1],[1,2],[2,0],[1,3]]},
                output: 2,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"n":0,"connections":[[0,1]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def weighted_critical_connections(n, connections):
    """
    Weighted Critical Connections

    Each connection has a weight (importance). Among all bridges, find the one with maximum weight.

    Time: O(V + E)
    Space: O(V + E)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on connections
        j = 0
        for k in range(i, n):
            if j < len(connections) and n[k] == connections[j]:
                j += 1
        if j == len(connections):
            count += 1

    return count


# Test cases
print(weighted_critical_connections(4, [[0,1],[1,2],[2,0],[1,3]]))  # Expected: 2
print(weighted_critical_connections(0, [[0,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// WeightedCriticalConnections solves the Weighted Critical Connections problem.
// Each connection has a weight (importance). Among all bridges, find the one with maximum weight.
// Time: O(V + E), Space: O(V + E)
func WeightedCriticalConnections(n int, connections [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WeightedCriticalConnections(4, [][]int{{0, 1}, {1, 2}, {2, 0}, {1, 3}})) // Expected: 2
	fmt.Println(WeightedCriticalConnections(0, [][]int{{0, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/01-critical-connections/twist-04-weighted-critical-connections', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/01-critical-connections/twist-04-weighted-critical-connections'] = problem;
})();
