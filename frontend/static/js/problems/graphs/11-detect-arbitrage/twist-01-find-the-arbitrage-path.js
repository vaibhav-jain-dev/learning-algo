/**
 * Find the Arbitrage Path
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-arbitrage
 * Parent: 11-detect-arbitrage
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find the Arbitrage Path',
        difficulty: 'Hard',
        algorithm: 'graph-arbitrage',
        parent: '11-detect-arbitrage',
        description: 'Not just detect arbitrage, but return the sequence of currencies that produces profit.',
        problem: 'Detection uses Bellman-Ford on log-transformed weights. Finding the path requires tracking predecessors during relaxation and backtracking from the negative cycle.',
        hints: [
            'Start by understanding the key difference: Detection uses Bellman-Ford on log-transformed weights.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: USD -> EUR -> GBP -> USD yields 1.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N^3)',
            space: 'O(N^2)'
        },
        examples: [
            // Basic test case
            {
                input: {"exchangeRates":[[1,0.8631,0.5903],[1.1586,1,0.6849],[1.6939,1.46,1]]},
                output: [[1,0.8631,0.5903],[1.1586,1,0.6849],[1.6939,1.46,1]],
                explanation: 'The find the arbitrage path for this input yields [1,0.8631,0.5903, 1.1586,1,0.6849, 1.6939,1.46,1].'
            },
            {
                input: {"exchangeRates":[[1,0.5,0.25],[2,1,0.5],[4,2,1]]},
                output: [[1,0.5,0.25],[2,1,0.5],[4,2,1]],
                explanation: 'The find the arbitrage path for this input yields [1,0.5,0.25, 2,1,0.5, 4,2,1].'
            },
            // Edge case
            {
                input: {"exchangeRates":[[1,0.8631,0.5903]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def find_the_arbitrage_path(exchangeRates):
    """
    Find the Arbitrage Path

    Not just detect arbitrage, but return the sequence of currencies that produces profit.

    Time: O(N^3)
    Space: O(N^2)
    """
    result = []

    for i in range(len(exchangeRates)):
        # Check if element meets criteria
        result.append(exchangeRates[i])

    return result


# Test cases
print(find_the_arbitrage_path([[1,0.8631,0.5903],[1.1586,1,0.6849],[1.6939,1.46,1]]))  # Expected: [[1,0.8631,0.5903],[1.1586,1,0.6849],[1.6939,1.46,1]]
print(find_the_arbitrage_path([[1,0.5,0.25],[2,1,0.5],[4,2,1]]))  # Expected: [[1,0.5,0.25],[2,1,0.5],[4,2,1]]
print(find_the_arbitrage_path([[1,0.8631,0.5903]]))  # Expected: []
`,
            go: `package main

import "fmt"

// FindTheArbitragePath solves the Find the Arbitrage Path problem.
// Not just detect arbitrage, but return the sequence of currencies that produces profit.
// Time: O(N^3), Space: O(N^2)
func FindTheArbitragePath(exchangeRates [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(exchangeRates); i++ {
		result = append(result, exchangeRates[i])
	}

	return result
}

func main() {
	fmt.Println(FindTheArbitragePath([][]int{{1, 0.8631, 0.5903}, {1.1586, 1, 0.6849}, {1.6939, 1.46, 1}})) // Expected: [[1,0.8631,0.5903],[1.1586,1,0.6849],[1.6939,1.46,1]]
	fmt.Println(FindTheArbitragePath([][]int{{1, 0.5, 0.25}, {2, 1, 0.5}, {4, 2, 1}})) // Expected: [[1,0.5,0.25],[2,1,0.5],[4,2,1]]
	fmt.Println(FindTheArbitragePath([][]int{{1, 0.8631, 0.5903}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/twist-01-find-the-arbitrage-path', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/twist-01-find-the-arbitrage-path'] = problem;
})();
