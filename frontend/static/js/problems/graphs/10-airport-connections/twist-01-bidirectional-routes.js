/**
 * Bidirectional Routes
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-connections
 * Parent: 10-airport-connections
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bidirectional Routes',
        difficulty: 'Medium',
        algorithm: 'graph-connections',
        parent: '10-airport-connections',
        description: 'All routes are bidirectional instead of one-way. Find the minimum additional bidirectional routes needed.',
        problem: 'In undirected graphs, reachability is symmetric. You just need to connect all components to the starting airport component, simplifying to counting disconnected components minus 1.',
        hints: [
            'Start by understanding the key difference: In undirected graphs, reachability is symmetric.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: 5 airports in 3 connected components.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the bidirectional routes criteria.'
            },
            // Edge case
            {
                input: {"airports":["BGI"],"routes":[["DSM","ORD"]],"startingAirport":""},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bidirectional_routes(airports, routes, startingAirport):
    """
    Bidirectional Routes

    All routes are bidirectional instead of one-way. Find the minimum additional bidirectional routes needed.

    Time: O(A * (A + R))
    Space: O(A + R)
    """
    # Check forward
    j = 0
    for i in range(len(airports)):
        if j < len(routes) and airports[i] == routes[j]:
            j += 1
    if j == len(routes):
        return True

    # Check backward
    j = 0
    for i in range(len(airports) - 1, -1, -1):
        if j < len(routes) and airports[i] == routes[j]:
            j += 1
    return j == len(routes)


# Test cases
print(bidirectional_routes(["BGI","CDG","DEL","DOH","DSM","EWR","EYW","HND","ICN","JFK","LGA","LHR","ORD","SAN","SFO","SIN","TLV","BUD"], [["DSM","ORD"],["ORD","BGI"],["BGI","LGA"],["SIN","CDG"],["CDG","SIN"],["CDG","BUD"],["DEL","DOH"],["DEL","CDG"],["TLV","DEL"],["EWR","HND"],["HND","ICN"],["HND","JFK"],["ICN","JFK"],["JFK","LGA"],["EYW","LHR"],["LHR","SFO"],["SFO","SAN"],["SFO","DSM"],["SAN","EYW"]], "LGA"))  # Expected: 1
print(bidirectional_routes(["BGI"], [["DSM","ORD"]], ""))  # Expected: 0
`,
            go: `package main

import "fmt"

// BidirectionalRoutes solves the Bidirectional Routes problem.
// All routes are bidirectional instead of one-way. Find the minimum additional bidirectional routes needed.
// Time: O(A * (A + R)), Space: O(A + R)
func BidirectionalRoutes(airports []string, routes [][]int, startingAirport string) int {
	// Check forward
	j := 0
	for i := 0; i < len(airports) && j < len(routes); i++ {
		if airports[i] == routes[j] {
			j++
		}
	}
	if j == len(routes) {
		return true
	}

	// Check backward
	j = 0
	for i := len(airports) - 1; i >= 0 && j < len(routes); i-- {
		if airports[i] == routes[j] {
			j++
		}
	}
	return j == len(routes)
}

func main() {
	fmt.Println(BidirectionalRoutes([]string{"BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN", "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD"}, [][]int{{DSM, ORD}, {ORD, BGI}, {BGI, LGA}, {SIN, CDG}, {CDG, SIN}, {CDG, BUD}, {DEL, DOH}, {DEL, CDG}, {TLV, DEL}, {EWR, HND}, {HND, ICN}, {HND, JFK}, {ICN, JFK}, {JFK, LGA}, {EYW, LHR}, {LHR, SFO}, {SFO, SAN}, {SFO, DSM}, {SAN, EYW}}, "LGA")) // Expected: 1
	fmt.Println(BidirectionalRoutes([]string{"BGI"}, [][]int{{DSM, ORD}}, "")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/twist-01-bidirectional-routes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/twist-01-bidirectional-routes'] = problem;
})();
