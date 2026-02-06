/**
 * Bidirectional Edges
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: dijkstra
 * Parent: 10-airport-connections/03-network-delay-time
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bidirectional Edges',
        difficulty: 'Easy',
        algorithm: 'dijkstra',
        parent: '10-airport-connections/03-network-delay-time',
        description: 'All connections are bidirectional with the same weight in both directions. Find network delay time.',
        problem: 'Each directed edge becomes two edges. The graph has more paths to explore, potentially finding shorter routes through reverse edges.',
        hints: [
            'Start by understanding the key difference: Each directed edge becomes two edges.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Edge [2,1,1] becomes both 2->1 and 1->2 with weight 1.',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the bidirectional edges criteria.'
            },
            // Edge case
            {
                input: {"times":[[2,1,1]],"n":0,"k":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def bidirectional_edges(times, n, k):
    """
    Bidirectional Edges

    All connections are bidirectional with the same weight in both directions. Find network delay time.

    Time: O(E log V)
    Space: O(V + E)
    """
    # Check forward
    j = 0
    for i in range(len(times)):
        if j < len(n) and times[i] == n[j]:
            j += 1
    if j == len(n):
        return True

    # Check backward
    j = 0
    for i in range(len(times) - 1, -1, -1):
        if j < len(n) and times[i] == n[j]:
            j += 1
    return j == len(n)


# Test cases
print(bidirectional_edges([[2,1,1],[2,3,1],[3,4,1]], 4, 2))  # Expected: 1
print(bidirectional_edges([[2,1,1]], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// BidirectionalEdges solves the Bidirectional Edges problem.
// All connections are bidirectional with the same weight in both directions. Find network delay time.
// Time: O(E log V), Space: O(V + E)
func BidirectionalEdges(times [][]int, n int, k int) int {
	// Check forward
	j := 0
	for i := 0; i < len(times) && j < len(n); i++ {
		if times[i] == n[j] {
			j++
		}
	}
	if j == len(n) {
		return true
	}

	// Check backward
	j = 0
	for i := len(times) - 1; i >= 0 && j < len(n); i-- {
		if times[i] == n[j] {
			j++
		}
	}
	return j == len(n)
}

func main() {
	fmt.Println(BidirectionalEdges([][]int{{2, 1, 1}, {2, 3, 1}, {3, 4, 1}}, 4, 2)) // Expected: 1
	fmt.Println(BidirectionalEdges([][]int{{2, 1, 1}}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/03-network-delay-time/twist-04-bidirectional-edges', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/03-network-delay-time/twist-04-bidirectional-edges'] = problem;
})();
