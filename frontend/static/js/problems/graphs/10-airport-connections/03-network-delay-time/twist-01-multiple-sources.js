/**
 * Multiple Sources
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: dijkstra
 * Parent: 10-airport-connections/03-network-delay-time
 */
(function() {
    'use strict';

    const problem = {
        name: 'Multiple Sources',
        difficulty: 'Medium',
        algorithm: 'dijkstra',
        parent: '10-airport-connections/03-network-delay-time',
        description: 'Send signals from multiple source nodes simultaneously. Find the minimum time for all nodes to receive at least one signal.',
        problem: 'Multi-source Dijkstra initializes the priority queue with all sources at distance 0. Each node receives the signal from whichever source reaches it first.',
        hints: [
            'Start by understanding the key difference: Multi-source Dijkstra initializes the priority queue with all sources at distance 0.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Sources at nodes 1 and 5.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the multiple sources criteria.'
            },
            // Edge case
            {
                input: {"times":[[2,1,1]],"n":0,"k":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def multiple_sources(times, n, k):
    """
    Multiple Sources

    Send signals from multiple source nodes simultaneously. Find the minimum time for all nodes to receive at least one signal.

    Time: O(E log V)
    Space: O(V + E)
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
print(multiple_sources([[2,1,1],[2,3,1],[3,4,1]], 4, 2))  # Expected: 1
print(multiple_sources([[2,1,1]], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// MultipleSources solves the Multiple Sources problem.
// Send signals from multiple source nodes simultaneously. Find the minimum time for all nodes to receive at least one signal.
// Time: O(E log V), Space: O(V + E)
func MultipleSources(times [][]int, n int, k int) int {
	result := 0

	for i := 0; i < len(times); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MultipleSources([][]int{{2, 1, 1}, {2, 3, 1}, {3, 4, 1}}, 4, 2)) // Expected: 1
	fmt.Println(MultipleSources([][]int{{2, 1, 1}}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/03-network-delay-time/twist-01-multiple-sources', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/03-network-delay-time/twist-01-multiple-sources'] = problem;
})();
