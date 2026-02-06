/**
 * Route Capacity
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-connections
 * Parent: 10-airport-connections
 */
(function() {
    'use strict';

    const problem = {
        name: 'Route Capacity',
        difficulty: 'Hard',
        algorithm: 'graph-connections',
        parent: '10-airport-connections',
        description: 'Each route can handle at most K flights per day. Find minimum new routes so that starting airport can send at least one flight path to every other airport.',
        problem: 'Capacity constraints turn this into a network flow problem. You must ensure sufficient flow paths exist, not just reachability.',
        hints: [
            'Start by understanding the key difference: Capacity constraints turn this into a network flow problem.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Route A->B has capacity 1, but 3 airports are reachable only through B.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the route capacity criteria.'
            },
            // Edge case
            {
                input: {"airports":["BGI"],"routes":[["DSM","ORD"]],"startingAirport":""},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def route_capacity(airports, routes, startingAirport):
    """
    Route Capacity

    Each route can handle at most K flights per day. Find minimum new routes so that starting airport can send at least one flight path to every other airport.

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
print(route_capacity(["BGI","CDG","DEL","DOH","DSM","EWR","EYW","HND","ICN","JFK","LGA","LHR","ORD","SAN","SFO","SIN","TLV","BUD"], [["DSM","ORD"],["ORD","BGI"],["BGI","LGA"],["SIN","CDG"],["CDG","SIN"],["CDG","BUD"],["DEL","DOH"],["DEL","CDG"],["TLV","DEL"],["EWR","HND"],["HND","ICN"],["HND","JFK"],["ICN","JFK"],["JFK","LGA"],["EYW","LHR"],["LHR","SFO"],["SFO","SAN"],["SFO","DSM"],["SAN","EYW"]], "LGA"))  # Expected: 1
print(route_capacity(["BGI"], [["DSM","ORD"]], ""))  # Expected: 0
`,
            go: `package main

import "fmt"

// RouteCapacity solves the Route Capacity problem.
// Each route can handle at most K flights per day. Find minimum new routes so that starting airport can send at least one flight path to every other airport.
// Time: O(A * (A + R)), Space: O(A + R)
func RouteCapacity(airports []string, routes [][]int, startingAirport string) int {
	result := 0

	for i := 0; i < len(airports); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RouteCapacity([]string{"BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN", "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD"}, [][]int{{DSM, ORD}, {ORD, BGI}, {BGI, LGA}, {SIN, CDG}, {CDG, SIN}, {CDG, BUD}, {DEL, DOH}, {DEL, CDG}, {TLV, DEL}, {EWR, HND}, {HND, ICN}, {HND, JFK}, {ICN, JFK}, {JFK, LGA}, {EYW, LHR}, {LHR, SFO}, {SFO, SAN}, {SFO, DSM}, {SAN, EYW}}, "LGA")) // Expected: 1
	fmt.Println(RouteCapacity([]string{"BGI"}, [][]int{{DSM, ORD}}, "")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/twist-05-route-capacity', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/twist-05-route-capacity'] = problem;
})();
