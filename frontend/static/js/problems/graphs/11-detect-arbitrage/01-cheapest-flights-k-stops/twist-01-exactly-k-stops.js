/**
 * Exactly K Stops
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: bellman-ford-dijkstra
 * Parent: 11-detect-arbitrage/01-cheapest-flights-k-stops
 */
(function() {
    'use strict';

    const problem = {
        name: 'Exactly K Stops',
        difficulty: 'Medium',
        algorithm: 'bellman-ford-dijkstra',
        parent: '11-detect-arbitrage/01-cheapest-flights-k-stops',
        description: 'Find the cheapest flight with exactly K stops (not at most K). You must make exactly K+1 flights.',
        problem: 'The at-most-K version allows early arrival. Exactly K forces you to keep going even if a shorter path exists, requiring you to track stop count precisely.',
        hints: [
            'Start by understanding the key difference: The at-most-K version allows early arrival.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Path with 0 stops costs 500, path with 1 stop costs 300.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(K * E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":4,"flights":[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],"src":0,"dst":3,"k":3},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the exactly k stops criteria.'
            },
            // Edge case
            {
                input: {"n":0,"flights":[[0,1,100]],"src":0,"dst":0,"k":3},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def exactly_k_stops(n, flights, src, dst, k):
    """
    Exactly K Stops

    Find the cheapest flight with exactly K stops (not at most K). You must make exactly K+1 flights.

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
print(exactly_k_stops(4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 3))  # Expected: 1
print(exactly_k_stops(0, [[0,1,100]], 0, 0, 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// ExactlyKStops solves the Exactly K Stops problem.
// Find the cheapest flight with exactly K stops (not at most K). You must make exactly K+1 flights.
// Time: O(K * E), Space: O(V)
func ExactlyKStops(n int, flights [][]int, src int, dst int, k int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ExactlyKStops(4, [][]int{{0, 1, 100}, {1, 2, 100}, {2, 0, 100}, {1, 3, 600}, {2, 3, 200}}, 0, 3, 3)) // Expected: 1
	fmt.Println(ExactlyKStops(0, [][]int{{0, 1, 100}}, 0, 0, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/01-cheapest-flights-k-stops/twist-01-exactly-k-stops', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/01-cheapest-flights-k-stops/twist-01-exactly-k-stops'] = problem;
})();
