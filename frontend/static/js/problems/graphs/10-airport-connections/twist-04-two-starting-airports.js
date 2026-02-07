/**
 * Two Starting Airports
 * Category: graphs
 * Difficulty: Very Hard
 * Algorithm: graph-connections
 * Parent: 10-airport-connections
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Starting Airports',
        difficulty: 'Very Hard',
        algorithm: 'graph-connections',
        parent: '10-airport-connections',
        description: 'There are two starting airports. Every other airport must be reachable from at least one starting airport. Minimize new routes.',
        problem: 'Unreachable components can be connected to either starting airport. You must optimally assign each component to one of the two starts, a set cover variant.',
        hints: [
            'Start by understanding the key difference: Unreachable components can be connected to either starting airport.',
            'This is significantly harder than the parent problem. Consider if a different algorithmic paradigm is needed.',
            'Consider the example: 3 unreachable components.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'Varies - see approach',
            space: 'Varies - see approach'
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
            python: `def two_starting_airports(airports, routes, startingAirport):
    """
    Two Starting Airports

    There are two starting airports. Every other airport must be reachable from at least one starting airport. Minimize new routes.

    Time: Varies - see approach
    Space: Varies - see approach
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
print(two_starting_airports(["BGI","CDG","DEL","DOH","DSM","EWR","EYW","HND","ICN","JFK","LGA","LHR","ORD","SAN","SFO","SIN","TLV","BUD"], [["DSM","ORD"],["ORD","BGI"],["BGI","LGA"],["SIN","CDG"],["CDG","SIN"],["CDG","BUD"],["DEL","DOH"],["DEL","CDG"],["TLV","DEL"],["EWR","HND"],["HND","ICN"],["HND","JFK"],["ICN","JFK"],["JFK","LGA"],["EYW","LHR"],["LHR","SFO"],["SFO","SAN"],["SFO","DSM"],["SAN","EYW"]], "LGA"))  # Expected: 1
print(two_starting_airports(["BGI"], [["DSM","ORD"]], ""))  # Expected: 0
`,
            go: `package main

import "fmt"

// TwoStartingAirports solves the Two Starting Airports problem.
// There are two starting airports. Every other airport must be reachable from at least one starting airport. Minimize new routes.
// Time: Varies - see approach, Space: Varies - see approach
func TwoStartingAirports(airports []string, routes [][]int, startingAirport string) int {
	result := 0

	for i := 0; i < len(airports); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TwoStartingAirports([]string{"BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN", "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD"}, [][]int{{DSM, ORD}, {ORD, BGI}, {BGI, LGA}, {SIN, CDG}, {CDG, SIN}, {CDG, BUD}, {DEL, DOH}, {DEL, CDG}, {TLV, DEL}, {EWR, HND}, {HND, ICN}, {HND, JFK}, {ICN, JFK}, {JFK, LGA}, {EYW, LHR}, {LHR, SFO}, {SFO, SAN}, {SFO, DSM}, {SAN, EYW}}, "LGA")) // Expected: 1
	fmt.Println(TwoStartingAirports([]string{"BGI"}, [][]int{{DSM, ORD}}, "")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/twist-04-two-starting-airports', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/twist-04-two-starting-airports'] = problem;
})();
