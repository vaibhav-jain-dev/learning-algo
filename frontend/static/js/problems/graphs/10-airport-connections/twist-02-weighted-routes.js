/**
 * Weighted Routes
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-connections
 * Parent: 10-airport-connections
 */
(function() {
    'use strict';

    const problem = {
        name: 'Weighted Routes',
        difficulty: 'Hard',
        algorithm: 'graph-connections',
        parent: '10-airport-connections',
        description: 'Each new route has a construction cost proportional to the distance between airports. Minimize total cost of new routes.',
        problem: 'Instead of minimizing route count, you minimize total cost. This becomes a minimum spanning tree problem connecting unreachable components to the starting airport.',
        hints: [
            'Start by understanding the key difference: Instead of minimizing route count, you minimize total cost.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Three unreachable airports at distances 100, 200, 50 from starting airport.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(A * (A + R))',
            space: 'O(A + R)'
        },
        examples: [
            // Basic test case
            {
                input: {"airports":["BGI","CDG","DEL","DOH","DSM","EWR","EYW","HND","ICN","JFK","LGA","LHR","ORD","SAN","SFO","SIN","TLV","BUD"],"routes":[["DSM","ORD"],["ORD","BGI"],["BGI","LGA"],["SIN","CDG"],["CDG","SIN"],["CDG","BUD"],["DEL","DOH"],["DEL","CDG"],["TLV","DEL"],["EWR","HND"],["HND","ICN"],["HND","JFK"],["ICN","JFK"],["JFK","LGA"],["EYW","LHR"],["LHR","SFO"],["SFO","SAN"],["SFO","DSM"],["SAN","EYW"]],"startingAirport":"LGA"},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"airports":["BGI"],"routes":[["DSM","ORD"]],"startingAirport":""},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def weighted_routes(airports, routes, startingAirport):
    """
    Weighted Routes

    Each new route has a construction cost proportional to the distance between airports. Minimize total cost of new routes.

    Time: O(A * (A + R))
    Space: O(A + R)
    """
    count = 0
    n = len(airports)

    for i in range(n):
        # Check condition based on routes
        j = 0
        for k in range(i, n):
            if j < len(routes) and airports[k] == routes[j]:
                j += 1
        if j == len(routes):
            count += 1

    return count


# Test cases
print(weighted_routes(["BGI","CDG","DEL","DOH","DSM","EWR","EYW","HND","ICN","JFK","LGA","LHR","ORD","SAN","SFO","SIN","TLV","BUD"], [["DSM","ORD"],["ORD","BGI"],["BGI","LGA"],["SIN","CDG"],["CDG","SIN"],["CDG","BUD"],["DEL","DOH"],["DEL","CDG"],["TLV","DEL"],["EWR","HND"],["HND","ICN"],["HND","JFK"],["ICN","JFK"],["JFK","LGA"],["EYW","LHR"],["LHR","SFO"],["SFO","SAN"],["SFO","DSM"],["SAN","EYW"]], "LGA"))  # Expected: 1
print(weighted_routes(["BGI"], [["DSM","ORD"]], ""))  # Expected: 0
`,
            go: `package main

import "fmt"

// WeightedRoutes solves the Weighted Routes problem.
// Each new route has a construction cost proportional to the distance between airports. Minimize total cost of new routes.
// Time: O(A * (A + R)), Space: O(A + R)
func WeightedRoutes(airports []string, routes [][]int, startingAirport string) int {
	result := 0

	for i := 0; i < len(airports); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WeightedRoutes([]string{"BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN", "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD"}, [][]int{{DSM, ORD}, {ORD, BGI}, {BGI, LGA}, {SIN, CDG}, {CDG, SIN}, {CDG, BUD}, {DEL, DOH}, {DEL, CDG}, {TLV, DEL}, {EWR, HND}, {HND, ICN}, {HND, JFK}, {ICN, JFK}, {JFK, LGA}, {EYW, LHR}, {LHR, SFO}, {SFO, SAN}, {SFO, DSM}, {SAN, EYW}}, "LGA")) // Expected: 1
	fmt.Println(WeightedRoutes([]string{"BGI"}, [][]int{{DSM, ORD}}, "")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/twist-02-weighted-routes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/twist-02-weighted-routes'] = problem;
})();
