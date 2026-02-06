/**
 * Bidirectional Flights
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: bellman-ford-dijkstra
 * Parent: 11-detect-arbitrage/01-cheapest-flights-k-stops
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bidirectional Flights',
        difficulty: 'Easy',
        algorithm: 'bellman-ford-dijkstra',
        parent: '11-detect-arbitrage/01-cheapest-flights-k-stops',
        description: 'All flights are bidirectional with the same price. Find cheapest round-trip from src to dst and back with at most K total stops.',
        problem: 'Bidirectional doubles the edge set. Round-trip requires finding cheapest path there and back, but stops are shared across both directions.',
        hints: [
            'Start by understanding the key difference: Bidirectional doubles the edge set.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: One-way cheapest 0->3: cost 300 with 1 stop.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the bidirectional flights criteria.'
            },
            // Edge case
            {
                input: {"n":0,"flights":[[0,1,100]],"src":0,"dst":0,"k":3},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bidirectional_flights(n, flights, src, dst, k):
    """
    Bidirectional Flights

    All flights are bidirectional with the same price. Find cheapest round-trip from src to dst and back with at most K total stops.

    Time: O(K * E)
    Space: O(V)
    """
    # Check forward
    j = 0
    for i in range(len(n)):
        if j < len(flights) and n[i] == flights[j]:
            j += 1
    if j == len(flights):
        return True

    # Check backward
    j = 0
    for i in range(len(n) - 1, -1, -1):
        if j < len(flights) and n[i] == flights[j]:
            j += 1
    return j == len(flights)


# Test cases
print(bidirectional_flights(4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 3))  # Expected: 1
print(bidirectional_flights(0, [[0,1,100]], 0, 0, 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// BidirectionalFlights solves the Bidirectional Flights problem.
// All flights are bidirectional with the same price. Find cheapest round-trip from src to dst and back with at most K total stops.
// Time: O(K * E), Space: O(V)
func BidirectionalFlights(n int, flights [][]int, src int, dst int, k int) int {
	// Check forward
	j := 0
	for i := 0; i < len(n) && j < len(flights); i++ {
		if n[i] == flights[j] {
			j++
		}
	}
	if j == len(flights) {
		return true
	}

	// Check backward
	j = 0
	for i := len(n) - 1; i >= 0 && j < len(flights); i-- {
		if n[i] == flights[j] {
			j++
		}
	}
	return j == len(flights)
}

func main() {
	fmt.Println(BidirectionalFlights(4, [][]int{{0, 1, 100}, {1, 2, 100}, {2, 0, 100}, {1, 3, 600}, {2, 3, 200}}, 0, 3, 3)) // Expected: 1
	fmt.Println(BidirectionalFlights(0, [][]int{{0, 1, 100}}, 0, 0, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/01-cheapest-flights-k-stops/twist-05-bidirectional-flights', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/01-cheapest-flights-k-stops/twist-05-bidirectional-flights'] = problem;
})();
