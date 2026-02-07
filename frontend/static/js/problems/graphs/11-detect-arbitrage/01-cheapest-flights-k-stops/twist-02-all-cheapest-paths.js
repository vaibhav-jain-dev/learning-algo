/**
 * All Cheapest Paths
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: bellman-ford-dijkstra
 * Parent: 11-detect-arbitrage/01-cheapest-flights-k-stops
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Cheapest Paths',
        difficulty: 'Hard',
        algorithm: 'bellman-ford-dijkstra',
        parent: '11-detect-arbitrage/01-cheapest-flights-k-stops',
        description: 'Find the cheapest price from src to dst for each possible number of stops from 0 to K. Return an array of K+1 prices.',
        problem: 'You need to record the best price at each stop level, maintaining a 2D DP table instead of a 1D distance array.',
        hints: [
            'Start by understanding the key difference: You need to record the best price at each stop level, maintaining a 2D DP table instead of a 1D distance array.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Stops 0: 500 (direct), Stops 1: 300 (via city A), Stops 2: 280 (via A and B).',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(K * E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":4,"flights":[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],"src":0,"dst":3,"k":1},
                output: 1,
                explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
            },
            // Edge case
            {
                input: {"n":0,"flights":[[0,1,100]],"src":0,"dst":0,"k":0},
                output: 0,
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            }
        ],
        solutions: {
            python: `def all_cheapest_paths(n, flights, src, dst, k):
    """
    All Cheapest Paths

    Find the cheapest price from src to dst for each possible number of stops from 0 to K. Return an array of K+1 prices.

    Time: O(K * E)
    Space: O(V)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on flights
        j = 0
        for k in range(i, n):
            if j < len(flights) and n[k] == flights[j]:
                j += 1
        if j == len(flights):
            count += 1

    return count


# Test cases
print(all_cheapest_paths(4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 1))  # Expected: 1
print(all_cheapest_paths(0, [[0,1,100]], 0, 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// AllCheapestPaths solves the All Cheapest Paths problem.
// Find the cheapest price from src to dst for each possible number of stops from 0 to K. Return an array of K+1 prices.
// Time: O(K * E), Space: O(V)
func AllCheapestPaths(n int, flights [][]int, src int, dst int, k int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(AllCheapestPaths(4, [][]int{{0, 1, 100}, {1, 2, 100}, {2, 0, 100}, {1, 3, 600}, {2, 3, 200}}, 0, 3, 1)) // Expected: 1
	fmt.Println(AllCheapestPaths(0, [][]int{{0, 1, 100}}, 0, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/01-cheapest-flights-k-stops/twist-02-all-cheapest-paths', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/01-cheapest-flights-k-stops/twist-02-all-cheapest-paths'] = problem;
})();
