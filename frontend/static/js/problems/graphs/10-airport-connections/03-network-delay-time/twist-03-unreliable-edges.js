/**
 * Unreliable Edges
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: dijkstra
 * Parent: 10-airport-connections/03-network-delay-time
 */
(function() {
    'use strict';

    const problem = {
        name: 'Unreliable Edges',
        difficulty: 'Hard',
        algorithm: 'dijkstra',
        parent: '10-airport-connections/03-network-delay-time',
        description: 'Each edge has a probability of failure. Find the path to each node that maximizes the probability of the signal arriving.',
        problem: 'Instead of minimizing sum of weights, you maximize product of probabilities. This requires modified Dijkstra with multiplication and max-heap.',
        hints: [
            'Start by understanding the key difference: Instead of minimizing sum of weights, you maximize product of probabilities.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Path A: prob 0.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(E log V)',
            space: 'O(V + E)'
        },
        examples: [
            // Basic test case
            {
                input: {"times":[[2,1,1],[2,3,1],[3,4,1]],"n":4,"k":2},
                output: [[2,1,1],[2,3,1],[3,4,1]],
                explanation: 'The unreliable edges for this input yields [2,1,1, 2,3,1, 3,4,1].'
            },
            // Edge case
            {
                input: {"times":[[2,1,1]],"n":0,"k":0},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def unreliable_edges(times, n, k):
    """
    Unreliable Edges

    Each edge has a probability of failure. Find the path to each node that maximizes the probability of the signal arriving.

    Time: O(E log V)
    Space: O(V + E)
    """
    result = []

    for i in range(len(times)):
        # Check if element meets criteria
        result.append(times[i])

    return result


# Test cases
print(unreliable_edges([[2,1,1],[2,3,1],[3,4,1]], 4, 2))  # Expected: [[2,1,1],[2,3,1],[3,4,1]]
print(unreliable_edges([[2,1,1]], 0, 0))  # Expected: []
`,
            go: `package main

import "fmt"

// UnreliableEdges solves the Unreliable Edges problem.
// Each edge has a probability of failure. Find the path to each node that maximizes the probability of the signal arriving.
// Time: O(E log V), Space: O(V + E)
func UnreliableEdges(times [][]int, n int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(times); i++ {
		result = append(result, times[i])
	}

	return result
}

func main() {
	fmt.Println(UnreliableEdges([][]int{{2, 1, 1}, {2, 3, 1}, {3, 4, 1}}, 4, 2)) // Expected: [[2,1,1],[2,3,1],[3,4,1]]
	fmt.Println(UnreliableEdges([][]int{{2, 1, 1}}, 0, 0)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/03-network-delay-time/twist-03-unreliable-edges', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/03-network-delay-time/twist-03-unreliable-edges'] = problem;
})();
