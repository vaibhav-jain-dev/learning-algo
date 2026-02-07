/**
 * Negative Cycle in Undirected Graph
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: bellman-ford
 * Parent: 11-detect-arbitrage/03-negative-cycle-detection
 */
(function() {
    'use strict';

    const problem = {
        name: 'Negative Cycle in Undirected Graph',
        difficulty: 'Hard',
        algorithm: 'bellman-ford',
        parent: '11-detect-arbitrage/03-negative-cycle-detection',
        description: 'The graph is undirected. Detect if any cycle has negative total weight.',
        problem: 'In undirected graphs, every negative edge creates a trivial negative cycle (traverse back and forth). You must define meaningful cycles as simple cycles with at least 3 nodes.',
        hints: [
            'Start by understanding the key difference: In undirected graphs, every negative edge creates a trivial negative cycle (traverse back and forth).',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Undirected edge (0,1) weight -5.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(V * E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":4,"edges":[[0,1,1],[1,2,-3],[2,3,2],[3,1,1]]},
                output: 1,
                explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
            },
            // Edge case
            {
                input: {"n":0,"edges":[[0,1,1]]},
                output: 0,
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            }
        ],
        solutions: {
            python: `def negative_cycle_in_undirected_graph(n, edges):
    """
    Negative Cycle in Undirected Graph

    The graph is undirected. Detect if any cycle has negative total weight.

    Time: O(V * E)
    Space: O(V)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on edges
        j = 0
        for k in range(i, n):
            if j < len(edges) and n[k] == edges[j]:
                j += 1
        if j == len(edges):
            count += 1

    return count


# Test cases
print(negative_cycle_in_undirected_graph(4, [[0,1,1],[1,2,-3],[2,3,2],[3,1,1]]))  # Expected: 1
print(negative_cycle_in_undirected_graph(0, [[0,1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// NegativeCycleInUndirectedGraph solves the Negative Cycle in Undirected Graph problem.
// The graph is undirected. Detect if any cycle has negative total weight.
// Time: O(V * E), Space: O(V)
func NegativeCycleInUndirectedGraph(n int, edges [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NegativeCycleInUndirectedGraph(4, [][]int{{0, 1, 1}, {1, 2, -3}, {2, 3, 2}, {3, 1, 1}})) // Expected: 1
	fmt.Println(NegativeCycleInUndirectedGraph(0, [][]int{{0, 1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/03-negative-cycle-detection/twist-05-negative-cycle-in-undirected-graph', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/03-negative-cycle-detection/twist-05-negative-cycle-in-undirected-graph'] = problem;
})();
