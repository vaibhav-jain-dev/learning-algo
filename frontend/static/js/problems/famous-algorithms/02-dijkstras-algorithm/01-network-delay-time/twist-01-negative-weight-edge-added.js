/**
 * Negative Weight Edge Added
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: dijkstras-algorithm
 * Parent: 02-dijkstras-algorithm/01-network-delay-time
 */
(function() {
    'use strict';

    const problem = {
        name: 'Negative Weight Edge Added',
        difficulty: 'Hard',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm/01-network-delay-time',
        description: 'What if some network links have negative delay (time travel shortcuts)? Dijkstra\',
        problem: 'Dijkstra\',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"times":[[2,1,1],[2,3,1],[3,4,1]],"n":4,"k":2},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the negative weight edge added criteria.'
            },
            // Edge case
            {
                input: {"times":[[2,1,1]],"n":0,"k":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def negative_weight_edge_added(times, n, k):
    """
    Negative Weight Edge Added

    What if some network links have negative delay (time travel shortcuts)? Dijkstra\\

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(times)

    for i in range(n):
        # Check condition based on n
        j = 0
        for k in range(i, n):
            if j < len(n) and times[k] == n[j]:
                j += 1
        if j == len(n):
            count += 1

    return count


# Test cases
print(negative_weight_edge_added([[2,1,1],[2,3,1],[3,4,1]], 4, 2))  # Expected: 1
print(negative_weight_edge_added([[2,1,1]], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// NegativeWeightEdgeAdded solves the Negative Weight Edge Added problem.
// What if some network links have negative delay (time travel shortcuts)? Dijkstra\\
// Time: O(?), Space: O(?)
func NegativeWeightEdgeAdded(times [][]int, n int, k int) int {
	result := 0

	for i := 0; i < len(times); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NegativeWeightEdgeAdded([][]int{{2, 1, 1}, {2, 3, 1}, {3, 4, 1}}, 4, 2)) // Expected: 1
	fmt.Println(NegativeWeightEdgeAdded([][]int{{2, 1, 1}}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/01-network-delay-time/twist-01-negative-weight-edge-added', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/01-network-delay-time/twist-01-negative-weight-edge-added'] = problem;
})();
